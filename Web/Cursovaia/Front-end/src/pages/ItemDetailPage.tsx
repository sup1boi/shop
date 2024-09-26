import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, CardContent, CardMedia, Typography, Button, Grid, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    imagePath: string;
}

interface Category {
    id: number;
    name: string;
}

const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

    useEffect(() => {
        const fetchItem = async () => {
            const response = await axios.get(`https://localhost:7009/api/Items/${id}`);
            setItem(response.data);
        };

        const fetchCategories = async () => {
            const response = await axios.get('https://localhost:7009/api/Categories');
            setCategories(response.data);
        };

        fetchItem();
        fetchCategories();
    }, [id]);

    const addToCart = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Получаем userId из localStorage
            if (!userId) {
                setNotification({ open: true, message: 'Пожалуйста, войдите в систему, чтобы добавить товар в корзину.', severity: 'warning' });
                return;
            }
            await axios.post(`https://localhost:7009/api/Cart/${item?.id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${userId}`
                }
            });
            setNotification({ open: true, message: 'Товар добавлен в корзину', severity: 'success' });
        } catch (error) {
            console.error('Error adding item to cart:', error);
            if ((error as any).response && (error as any).response.status === 401) {
                setNotification({ open: true, message: 'Ваша сессия истекла. Пожалуйста, войдите в систему снова.', severity: 'error' });
            } else {
                setNotification({ open: true, message: 'Произошла ошибка при добавлении товара в корзину.', severity: 'error' });
            }
        }
    };

    const handleNotificationClose = () => {
        setNotification({ ...notification, open: false });
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <Container style={{ padding: '20px' }}>
            <Card>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={`https://localhost:7009/${item.imagePath}`}
                            alt={item.name}
                            style={{ objectFit: 'contain' }} // Изменено на 'contain'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Категория: {categories.find(category => category.id === item.categoryId)?.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Цена: {item.price} ₽
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Количество на складе: {item.stock}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={addToCart} sx={{ mt: 2 }}>
                                Купить
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ItemDetailPage;
