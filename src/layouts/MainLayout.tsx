import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Badge, theme } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  SafetyOutlined,
  MailOutlined,
  BarChartOutlined,
  SettingOutlined,
  FileTextOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
import type { AdminUser } from '../types';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  user: AdminUser;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu items
  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '控制台',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/groups',
      icon: <TeamOutlined />,
      label: '群组管理',
    },
    {
      key: '/messages',
      icon: <MessageOutlined />,
      label: '消息管理',
    },
    {
      key: '/security',
      icon: <SafetyOutlined />,
      label: '安全中心',
    },
    {
      key: '/email',
      icon: <MailOutlined />,
      label: '邮件系统',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: '数据分析',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      key: '/logs',
      icon: <FileTextOutlined />,
      label: '操作日志',
    },
    {
      key: '/admins',
      icon: <LockOutlined />,
      label: '管理员',
    },
  ];

  // User dropdown menu
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      onLogout();
    } else {
      navigate(`/${key}`);
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role: AdminUser['role']) => {
    switch (role) {
      case 'super_admin':
        return 'red';
      case 'admin':
        return 'blue';
      case 'moderator':
        return 'green';
      case 'viewer':
        return 'default';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role: AdminUser['role']) => {
    switch (role) {
      case 'super_admin':
        return '超级管理员';
      case 'admin':
        return '管理员';
      case 'moderator':
        return '协管员';
      case 'viewer':
        return '查看者';
      default:
        return role;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: collapsed ? 20 : 18,
          fontWeight: 'bold',
          padding: '0 16px',
        }}>
          {collapsed ? '🔐' : '🔐 BingSC Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              style: { fontSize: 18, cursor: 'pointer' },
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <Space size="large">
            <Badge count={0} showZero={false}>
              <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  src={user.avatar}
                  icon={!user.avatar && <UserOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                <Space direction="vertical" size={0}>
                  <span style={{ fontWeight: 500 }}>{user.name}</span>
                  <span style={{ fontSize: 12, color: '#999' }}>
                    <Badge
                      color={getRoleBadgeColor(user.role)}
                      text={getRoleLabel(user.role)}
                    />
                  </span>
                </Space>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
