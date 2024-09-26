// EditItemPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, MenuItem } from '@mui/material';
import axios from 'axios';
import ModalNotification from '../components/ModalNotification';

const EditItemPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            if (!id) {
                console.error('No item ID provided');
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7009/api/Items/${id}`);
                const item = response.data;
                setName(item.name);
                setDescription(item.description);
                setPrice(item.price.toString());
                setStock(item.stock.toString());
                setCategoryId(item.categoryId.toString());
                setPreview(item.imagePath ? `https://localhost:7009${item.imagePath}` : null);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem();
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7009/api/Categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!id) {
            console.error('No item ID provided');
            return;
        }

        try {
            let imagePath = preview;

            if (image) {
                const formData = new FormData();
                formData.append('file', image);

                const imageResponse = await axios.post('https://localhost:7009/api/ImageUpload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                imagePath = imageResponse.data.filePath;
            }

            const updatedItem = {
                id: parseInt(id, 10),
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                categoryId: parseInt(categoryId, 10),
                imagePath: imagePath?.replace('https://localhost:7009', ''),
            };

            await axios.put(`https://localhost:7009/api/Items/${id}`, updatedItem);
            setModalMessage('Товар успешно обновлен');
            setModalOpen(true);
        } catch (error) {
            console.error('Error updating item:', error);
            setModalMessage('Ошибка при обновлении товара');
            setModalOpen(true);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        navigate('/items'); // Redirect to items list page
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
                    Редактировать товар
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Название"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Описание"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Цена, ₽"
                        name="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Количество на складе"
                        name="stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Категория"
                        name="category"
                        select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Загрузить изображение
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                    {preview && (
                        <Box sx={{ mt: 2, mb: 2 }}>
                            <img src={preview} alt="Превью" style={{ width: '100%' }} />
                            <Button variant="contained" color="secondary" fullWidth onClick={handleRemoveImage}>
                                Удалить изображение
                            </Button>
                        </Box>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Обновить товар
                    </Button>
                </Box>
                <ModalNotification
                    open={modalOpen}
                    message={modalMessage}
                    onClose={handleModalClose}
                />
            </Box>
        </Container>
    );
};

export default EditItemPage;
