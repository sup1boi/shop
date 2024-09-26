import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Snackbar } from '@mui/material';
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

const UserItemsListPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('https://localhost:7009/api/Items');
            setItems(response.data);
        };

        const fetchCategories = async () => {
            const response = await axios.get('https://localhost:7009/api/Categories');
            setCategories(response.data);
        };

        fetchItems();
        fetchCategories();
    }, []);

    const addToCart = async (itemId: number) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setNotification({ open: true, message: 'Пожалуйста, войдите в систему, чтобы добавить товар в корзину.', severity: 'warning' });
                return;
            }
            await axios.post(`https://localhost:7009/api/Cart/${itemId}`, {}, {
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

    return (
        <Grid container spacing={2} style={{ padding: '20px' }}>
            {items.map(item => (
                <Grid item xs={12} key={item.id}>
                    <Card style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <CardMedia
                            component="img"
                            style={{ width: 150, height: 150, objectFit: 'contain' }}
                            image={`https://localhost:7009/${item.imagePath}`}
                            alt={item.name}
                        />
                        <CardContent style={{ flex: 1 }}>
                            <Link to={`/item/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Категория: {categories.find(category => category.id === item.categoryId)?.name}
                                </Typography>
                            </Link>
                        </CardContent>
                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography variant="h6" component="div">
                                Цена: {item.price} ₽
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: 'auto' }} onClick={() => addToCart(item.id)}>
                                Купить
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default UserItemsListPage;
