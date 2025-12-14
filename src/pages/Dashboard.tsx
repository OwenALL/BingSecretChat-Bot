import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Typography, Spin } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  RiseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import apiService from '../services/api';
import type { DashboardStats } from '../types';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDashboardStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Mock recent activity data
  const recentActivity = [
    {
      key: '1',
      action: '新用户注册',
      user: 'user_12345',
      time: '2 分钟前',
      status: 'success',
    },
    {
      key: '2',
      action: '创建新群组',
      user: 'Anonymous #A1B2',
      time: '15 分钟前',
      status: 'success',
    },
    {
      key: '3',
      action: '发送消息',
      user: 'Anonymous #C3D4',
      time: '1 小时前',
      status: 'success',
    },
  ];

  const activityColumns = [
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          成功
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        控制台
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
              <Space>
                <RiseOutlined style={{ color: '#3f8600' }} />
                今日新增: {stats.newUsersToday}
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={stats.activeUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
              占比: {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总群组数"
              value={stats.totalGroups}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
              <Space>
                <RiseOutlined style={{ color: '#3f8600' }} />
                今日新增: {stats.newGroupsToday}
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总消息数"
              value={stats.totalMessages}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
              今日活跃群组: {stats.activeGroupsToday}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="最近活动" extra={<a href="/logs">查看全部</a>}>
            <Table
              columns={activityColumns}
              dataSource={recentActivity}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="系统状态">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Cloudflare Workers</span>
                <Tag color="success">正常</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>D1 数据库</span>
                <Tag color="success">正常</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Telegram Bot API</span>
                <Tag color="success">正常</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>邮件服务 (Resend)</span>
                <Tag color="success">正常</Tag>
              </div>
            </Space>
          </Card>

          <Card title="安全警报" style={{ marginTop: 16 }}>
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#52c41a' }}>
              <CheckCircleOutlined style={{ fontSize: 48 }} />
              <div style={{ marginTop: 16 }}>无安全警报</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
