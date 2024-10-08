import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ItemsListPage from './pages/ItemsListPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import UserItemsListPage from './pages/UserItemsListPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import OrdersAdminPage from './pages/OrdersAdminPage';
import ProfilePage from './pages/ProfilePage';
import AdminHeader from './components/AdminHeader';
import UserHeader from './components/UserHeader';
import LoginHeader from './components/LoginHeader';

const App: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserRole(role);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<>
                    <LoginHeader />
                    <LoginPage onLogin={(role) => setUserRole(role)} />
                </>} />
                <Route path="/register" element={<>
                    <LoginHeader />
                    <RegisterPage />
                </>} />
                {userRole === 'admin' ? (
                    <>
                        <Route path="/items" element={<>
                            <AdminHeader />
                            <ItemsListPage />
                        </>} />
                        <Route path="/add-item" element={<>
                            <AdminHeader />
                            <AddItemPage />
                        </>} />
                        <Route path="/allorders" element={<>
                            <AdminHeader />
                            <OrdersAdminPage />
                        </>} />
                        <Route path="/edit-item/:id" element={<>
                            <AdminHeader />
                            <EditItemPage />
                        </>} />
                        <Route path="/" element={<Navigate to="/items" />} />
                    </>
                ) : userRole === 'user' ? (
                    <>
                        <Route path="/user-items" element={<>
                            <UserHeader />
                            <UserItemsListPage />
                        </>} />
                        <Route path="/item/:id" element={<>
                            <UserHeader />
                            <ItemDetailPage />
                        </>} />
                        <Route path="/cart" element={<>
                            <UserHeader />
                            <CartPage />
                        </>} />
                        <Route path="/orders" element={<>
                            <UserHeader />
                            <OrdersPage />
                        </>} />
                        <Route path="/profile" element={<>
                            <UserHeader />
                            <ProfilePage />
                        </>} />
                        <Route path="/" element={<Navigate to="/user-items" />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
