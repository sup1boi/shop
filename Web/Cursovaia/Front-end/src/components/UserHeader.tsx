import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const UserHeader: React.FC = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    КиберМагазин
                </Typography>
                <Button color="inherit" onClick={() => navigate('/user-items')}>Товары</Button>
                <Button color="inherit" onClick={() => navigate('/cart')}>Корзина</Button>
                <Button color="inherit" onClick={() => navigate('/profile')}>Профиль</Button>
                <Button color="inherit" onClick={handleLogout}>Выйти</Button>
            </Toolbar>
        </AppBar>
    );
};

export default UserHeader;
