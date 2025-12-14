import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import type { AdminUser } from './types';
import apiService from './services/api';

const App: React.FC = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');

    if (!token || !savedUser) {
      setLoading(false);
      return;
    }

    try {
      // Verify token with backend
      const response = await apiService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // Token invalid
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    message.success('已退出登录');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: 48,
      }}>
        🔐
      </div>
    );
  }

  const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div style={{ textAlign: 'center', padding: 100 }}>
      <h2>{title}</h2>
      <p>功能开发中...</p>
    </div>
  );

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          {user ? (
            <Route path="/" element={<MainLayout user={user} onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="groups" element={<PlaceholderPage title="群组管理" />} />
              <Route path="messages" element={<PlaceholderPage title="消息管理" />} />
              <Route path="security" element={<PlaceholderPage title="安全中心" />} />
              <Route path="email" element={<PlaceholderPage title="邮件系统" />} />
              <Route path="analytics" element={<PlaceholderPage title="数据分析" />} />
              <Route path="settings" element={<PlaceholderPage title="系统设置" />} />
              <Route path="logs" element={<PlaceholderPage title="操作日志" />} />
              <Route path="admins" element={<PlaceholderPage title="管理员管理" />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
