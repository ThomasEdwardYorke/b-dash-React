import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Header from './components/Header';
import axios from 'axios';

const App = () => {
  const [subject, setSubject] = useState('');
  const [intro, setIntro] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [recommendationIds, setRecommendationIds] = useState([]);


  const handleMassEmail = async () => {
    const emailData = { subject, intro, contentTitle, url };
    try {
      const response = await axios.post('http://your-api-endpoint/send-email', emailData, {
        withCredentials: true, // クッキーを送信するために必要
      });
      alert('メールが正常に送信されました。');
    } catch (error) {
      console.error('メール送信中にエラーが発生しました:', error);
      alert('メール送信中にエラーが発生しました。');
    }
  };

  const handleMassEmailTest = async () => {
    const emailData = { subject, intro, contentTitle, url };

    try {
      console.log('送信データ:', emailData);
      // テスト用のダミーレスポンス
      setTimeout(() => alert('ダミーのメール送信が成功しました。'), 1000);
    } catch (error) {
      console.error('ダミーのメール送信中にエラーが発生しました:', error);
      alert('ダミーのメール送信中にエラーが発生しました。');
    }
  };

    const handleRecommendation = async () => {
      if (!/^\d+$/.test(userId)) {
        alert('ユーザーIDは数字のみを入力してください。');
        return;
      }

      try {
        const recommendResponse = await axios.get(`http://127.0.0.1:8000/user_id?user_id=${userId}`);
        const recommendIds = recommendResponse.data.recommend_content;
        setRecommendationIds(recommendIds);

        if (recommendIds.length > 0) {
          const intUserId = parseInt(userId, 10);
          const intRecommendIds = recommendIds.map(id => parseInt(id, 10));

          const emailData = { user_id: intUserId, recommend_ids: intRecommendIds };

          await axios.post('http://localhost:8001/send-recommendation-email', emailData)
            .then(response => {
              console.log(response.data);
              alert('メールが正常に送信されました。');
            })
            .catch(error => {
              console.error('Error:', error);
              alert('エラーが発生しました。');
            });
        } else {
          alert('リコメンドIDが取得できませんでした。');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('エラーが発生しました。');
      }
    };

  return (
    <Container maxWidth="sm">
      <Header /> {/* Header コンポーネントをここで使用 */}
      <Box sx={{ my: 4 }}>
        <TextField
          fullWidth
          label="メール件名（フリーテキスト）"
          variant="outlined"
          margin="normal"
          value={subject} // 追加: valueプロパティを設定
          onChange={(e) => setSubject(e.target.value)} // 追加: onChangeハンドラを設定
        />
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            メール本文
          </Typography>
          <TextField
            fullWidth
            label="導入文"
            variant="outlined"
            margin="normal"
            multiline // これにより複数行の入力が可能になる
            rows={3} // 初期状態で表示する行数
            value={intro} // 追加: valueプロパティを設定
            onChange={(e) => setIntro(e.target.value)} // 追加: onChangeハンドラを設定
          />
          <TextField
            fullWidth
            label="コンテンツタイトル"
            variant="outlined"
            margin="normal"
            multiline // これにより複数行の入力が可能になる
            rows={2} // 初期状態で表示する行数
            value={contentTitle} // 追加: valueプロパティを設定
            onChange={(e) => setContentTitle(e.target.value)} // 追加: onChangeハンドラを設定
          />
          <TextField
            fullWidth
            label="URL"
            variant="outlined"
            margin="normal"
            multiline // これにより複数行の入力が可能になる
            rows={2} // 初期状態で表示する行数
            value={url} // 追加: valueプロパティを設定
            onChange={(e) => setUrl(e.target.value)} // 追加: onChangeハンドラを設定
          />
        </Paper>
        {/* ボタンの配置は同じまま */}
      <Box sx={{ mt: 2 }}> {/* mt（margin-top）を追加して間隔を開ける */}
        <Grid container spacing={2} alignItems="flex-end" justifyContent="space-between">
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleMassEmailTest}
            >
              一斉配信
            </Button>
          </Grid>
          <Grid item xs={6}>
        {/* ユーザーID入力フィールドの追加 */}
        <Grid container spacing={2} alignItems="flex-end">

          <Grid item xs={8}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleRecommendation}
            >
              レコメンド自動配信
            </Button>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="UserID"
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Grid>
        </Grid>
        {recommendationIds.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">レコメンドID:</Typography>
            <ul>
              {recommendationIds.map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          </Box>
        )}
          </Grid>
        </Grid>
      </Box>
    </Box>

    </Container>
  );
};

export default App;
