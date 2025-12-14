import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await apiService.login(values.username, values.password);
      
      if (response.success && response.data) {
        // Save token and user info
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        
        message.success('登录成功');
        navigate('/dashboard');
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          borderRadius: 8,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            BingSecretChat
          </h1>
          <p style={{ color: '#999', marginTop: 8 }}>管理后台</p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ height: 45 }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div style={{
          marginTop: 24,
          padding: 16,
          background: '#f5f5f5',
          borderRadius: 4,
          textAlign: 'center',
        }}>
          <Space direction="vertical" size={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <SafetyOutlined style={{ color: '#52c41a' }} />
              <span style={{ fontSize: 12, color: '#666' }}>
                安全访问 · 权限控制 · 操作审计
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 8 }}>
              © 2024 BingSecretChat. All rights reserved.
            </div>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
