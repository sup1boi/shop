import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import {login_} from '../api/auth';

interface LoginPageProps {
    onLogin: (role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login_(login, password);
            const role = response.role;
            const userId = response.userId;
            if (role && userId) {
                localStorage.setItem('userRole', role);
                localStorage.setItem('userId', userId);
                onLogin(role);
                if (role === 'admin') {
                    navigate('/items');
                } else if (role === 'user') {
                    navigate('/user-items');
                }
            } else {
                console.error('No role or userId received from the server');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
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
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Войти
                    </Button>
                    <Link to="/register">
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                        >
                            Зарегистрироваться
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
