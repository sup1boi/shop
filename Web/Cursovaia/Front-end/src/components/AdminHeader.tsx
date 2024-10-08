import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const AdminHeader: React.FC = () => {
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
                    КиберМагазин Панель администратора
                </Typography>
                <Button color="inherit" onClick={() => navigate('/items')}>Товары</Button>
                <Button color="inherit" onClick={() => navigate('/add-item')}>Добавить товар</Button>
                <Button color="inherit" onClick={() => navigate('/allorders')}>Заказы</Button>
                <Button color="inherit" onClick={handleLogout}>Выйти</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
