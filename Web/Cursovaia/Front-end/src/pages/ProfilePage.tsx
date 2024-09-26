import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const ProfilePage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7009/api/Account/${userId}`);
                setLogin(response.data.login);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        try {
            await axios.put(`https://localhost:7009/api/Account/${userId}`, { login, password });
            setNotification({ open: true, message: 'Profile updated successfully', severity: 'success' });
        } catch (error) {
            console.error('Error updating profile:', error);
            setNotification({ open: true, message: 'Error updating profile', severity: 'error' });
        }
    };

    const handleNotificationClose = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    alt="Profile Picture"
                    src="https://localhost:7009/ProfImages/profile.jpg"
                    sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography component="h1" variant="h5">
                    Профиль
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Новый пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Обновить
                    </Button>
                </Box>
                <Notification
                    open={notification.open}
                    message={notification.message}
                    severity={notification.severity}
                    onClose={handleNotificationClose}
                />
            </Box>
        </Container>
    );
};

export default ProfilePage;
