import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Card, CardContent, CardActions, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalNotification from '../components/ModalNotification';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

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

const ItemsListPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://localhost:7009/api/Items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7009/api/Categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchItems();
        fetchCategories();
    }, []);

    const handleDelete = async () => {
        if (itemToDelete !== null) {
            try {
                await axios.delete(`https://localhost:7009/api/Items/${itemToDelete}`);
                setModalMessage('Товар успешно удален');
                setModalOpen(true);
                setItems(items.filter(item => item.id !== itemToDelete));
            } catch (error) {
                console.error('Error deleting item:', error);
                setModalMessage('Ошибка при удалении товара');
                setModalOpen(true);
            } finally {
                setItemToDelete(null);
                setConfirmDialogOpen(false);
            }
        }
    };

    const openConfirmDialog = (id: number) => {
        setItemToDelete(id);
        setConfirmDialogOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleConfirmDialogClose = () => {
        setConfirmDialogOpen(false);
    };

    return (
        <Container>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Список товаров
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/add-item')} sx={{ marginBottom: 2 }}>
                    Добавить новый товар
                </Button>
                <Grid container spacing={3}>
                    {items.map(item => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 600, height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Категория: {categories.find(category => category.id === item.categoryId)?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Цена: {item.price} ₽
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Количество на складе: {item.stock}
                                    </Typography>
                                    {item.imagePath && (
                                        <Box sx={{ height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={`https://localhost:7009${item.imagePath}`} alt={item.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                        </Box>
                                    )}
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        onClick={() => navigate(`/edit-item/${item.id}`)}
                                        fullWidth
                                    >
                                        Редактировать
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={() => openConfirmDialog(item.id)}
                                        fullWidth
                                    >
                                        Удалить
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <ModalNotification
                open={modalOpen}
                message={modalMessage}
                onClose={handleModalClose}
            />
            <ConfirmDeleteDialog
                open={confirmDialogOpen}
                title="Подтверждение удаления"
                description="Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить."
                onConfirm={handleDelete}
                onCancel={handleConfirmDialogClose}
            />
        </Container>
    );
};

export default ItemsListPage;
