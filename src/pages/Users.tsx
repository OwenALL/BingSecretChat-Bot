import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Space, Button, Input, Select, Modal, message, Typography, Avatar } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import apiService from '../services/api';
import type { User } from '../types';

const { Title } = Typography;
const { Search } = Input;

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, [pagination.current, pagination.pageSize, searchText, statusFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUsers({
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: searchText,
        status: statusFilter,
      });
      
      if (response.success && response.data) {
        setUsers(response.data.users);
        setPagination({
          ...pagination,
          total: response.data.total,
        });
      }
    } catch (error) {
      console.error('Failed to load users:', error);
      message.error('加载用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = (userId: number) => {
    Modal.confirm({
      title: '确认封禁用户？',
      content: '封禁后用户将无法登录和使用应用',
      okText: '确认封禁',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          const response = await apiService.banUser(userId);
          if (response.success) {
            message.success('用户已封禁');
            loadUsers();
          } else {
            message.error(response.message || '封禁失败');
          }
        } catch (error) {
          message.error('封禁失败');
        }
      },
    });
  };

  const handleUnbanUser = async (userId: number) => {
    try {
      const response = await apiService.unbanUser(userId);
      if (response.success) {
        message.success('用户已解封');
        loadUsers();
      } else {
        message.error(response.message || '解封失败');
      }
    } catch (error) {
      message.error('解封失败');
    }
  };

  const handleDeleteUser = (userId: number) => {
    Modal.confirm({
      title: '确认删除用户？',
      content: '删除操作不可逆，用户的所有数据将被永久删除',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          const response = await apiService.deleteUser(userId);
          if (response.success) {
            message.success('用户已删除');
            loadUsers();
          } else {
            message.error(response.message || '删除失败');
          }
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户信息',
      key: 'user_info',
      render: (_, record) => (
        <Space>
          <Avatar
            src={record.avatar_url}
            icon={!record.avatar_url && <UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.nickname}</div>
            {record.username && (
              <div style={{ fontSize: 12, color: '#999' }}>@{record.username}</div>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: 'Telegram ID',
      dataIndex: 'telegram_id',
      key: 'telegram_id',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '邮箱',
      key: 'email',
      render: (_, record) => (
        record.email ? (
          <Space>
            <MailOutlined />
            <span>{record.email}</span>
            {record.email_verified ? (
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            )}
          </Space>
        ) : (
          <Tag>未绑定</Tag>
        )
      ),
    },
    {
      title: '锁屏',
      dataIndex: 'lock_enabled',
      key: 'lock_enabled',
      render: (enabled) => (
        enabled ? (
          <Tag icon={<LockOutlined />} color="success">已启用</Tag>
        ) : (
          <Tag>未启用</Tag>
        )
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors: Record<string, string> = {
          active: 'success',
          locked: 'warning',
          banned: 'error',
        };
        const labels: Record<string, string> = {
          active: '正常',
          locked: '锁定',
          banned: '封禁',
        };
        return <Tag color={colors[status]}>{labels[status] || status}</Tag>;
      },
    },
    {
      title: '注册时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => message.info('查看详情功能开发中')}
          >
            详情
          </Button>
          {record.status === 'active' ? (
            <Button
              type="link"
              size="small"
              danger
              icon={<LockOutlined />}
              onClick={() => handleBanUser(record.id)}
            >
              封禁
            </Button>
          ) : record.status === 'banned' ? (
            <Button
              type="link"
              size="small"
              icon={<UnlockOutlined />}
              onClick={() => handleUnbanUser(record.id)}
            >
              解封
            </Button>
          ) : null}
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        用户管理
      </Title>

      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Search
            placeholder="搜索用户名、昵称、Telegram ID"
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
            onSearch={setSearchText}
          />
          <Select
            placeholder="状态筛选"
            allowClear
            style={{ width: 120 }}
            onChange={setStatusFilter}
            options={[
              { label: '全部', value: '' },
              { label: '正常', value: 'active' },
              { label: '锁定', value: 'locked' },
              { label: '封禁', value: 'banned' },
            ]}
          />
          <Button type="primary" onClick={loadUsers}>
            刷新
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default Users;
