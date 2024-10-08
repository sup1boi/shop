﻿import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }

            // Получаем заказы пользователя
            const response = await axios.get(`https://localhost:7009/api/Order/${userId}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Мои заказы
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="body1">Заказы не найдены</Typography>
            ) : (
                <Grid container spacing={2}>
                    {orders.map((order: any) => (
                        <Grid item xs={12} key={order.orderId}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Заказ №{order.orderId}</Typography>

                                    {/* Проверяем наличие товаров в заказе */}
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item: any, index: number) => (
                                            <Grid container spacing={2} key={index}>
                                                <Grid item xs={8}>
                                                    <Typography variant="h6">
                                                        {item.productName}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Количество: {item.quantity}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Typography variant="body2">Товары не найдены</Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default OrdersPage;
