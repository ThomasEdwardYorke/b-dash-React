import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#eceff1' }}>
      <Toolbar>
        {/* ここにロゴやナビゲーションリンクなどを配置 */}
        <Typography variant="h5" sx={{ color: 'black' }}>
        メール配信システム α版
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;




