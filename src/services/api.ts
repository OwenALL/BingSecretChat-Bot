import axios, { type AxiosInstance, AxiosError } from 'axios';
import type { ApiResponse, AdminUser, DashboardStats, User, Group, Message, AuditLog } from '../types';

// API Base URL - will be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://755360e3.webapp-1vu.pages.dev';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth APIs
  async login(username: string, password: string): Promise<ApiResponse<{ token: string; user: AdminUser }>> {
    const response = await this.api.post('/api/admin/auth/login', { username, password });
    return response.data;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.api.post('/api/admin/auth/logout');
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse<AdminUser>> {
    const response = await this.api.get('/api/admin/auth/me');
    return response.data;
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await this.api.get('/api/admin/dashboard/stats');
    return response.data;
  }

  // User APIs
  async getUsers(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
  }): Promise<ApiResponse<{ users: User[]; total: number }>> {
    const response = await this.api.get('/api/admin/users', { params });
    return response.data;
  }

  async getUser(userId: number): Promise<ApiResponse<User>> {
    const response = await this.api.get(`/api/admin/users/${userId}`);
    return response.data;
  }

  async updateUser(userId: number, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.api.put(`/api/admin/users/${userId}`, data);
    return response.data;
  }

  async banUser(userId: number, reason?: string): Promise<ApiResponse> {
    const response = await this.api.post(`/api/admin/users/${userId}/ban`, { reason });
    return response.data;
  }

  async unbanUser(userId: number): Promise<ApiResponse> {
    const response = await this.api.post(`/api/admin/users/${userId}/unban`);
    return response.data;
  }

  async deleteUser(userId: number): Promise<ApiResponse> {
    const response = await this.api.delete(`/api/admin/users/${userId}`);
    return response.data;
  }

  // Group APIs
  async getGroups(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    privacy_type?: string;
  }): Promise<ApiResponse<{ groups: Group[]; total: number }>> {
    const response = await this.api.get('/api/admin/groups', { params });
    return response.data;
  }

  async getGroup(groupId: number): Promise<ApiResponse<Group>> {
    const response = await this.api.get(`/api/admin/groups/${groupId}`);
    return response.data;
  }

  async updateGroup(groupId: number, data: Partial<Group>): Promise<ApiResponse<Group>> {
    const response = await this.api.put(`/api/admin/groups/${groupId}`, data);
    return response.data;
  }

  async lockGroup(groupId: number, reason?: string): Promise<ApiResponse> {
    const response = await this.api.post(`/api/admin/groups/${groupId}/lock`, { reason });
    return response.data;
  }

  async unlockGroup(groupId: number): Promise<ApiResponse> {
    const response = await this.api.post(`/api/admin/groups/${groupId}/unlock`);
    return response.data;
  }

  async deleteGroup(groupId: number): Promise<ApiResponse> {
    const response = await this.api.delete(`/api/admin/groups/${groupId}`);
    return response.data;
  }

  // Message APIs (Only metadata - messages are encrypted)
  async getMessages(params?: {
    page?: number;
    pageSize?: number;
    group_id?: number;
    message_type?: string;
  }): Promise<ApiResponse<{ messages: Message[]; total: number }>> {
    const response = await this.api.get('/api/admin/messages', { params });
    return response.data;
  }

  async deleteMessage(messageId: number, reason?: string): Promise<ApiResponse> {
    const response = await this.api.delete(`/api/admin/messages/${messageId}`, {
      data: { reason },
    });
    return response.data;
  }

  // Audit Log APIs
  async getAuditLogs(params?: {
    page?: number;
    pageSize?: number;
    admin_id?: number;
    action?: string;
    resource_type?: string;
  }): Promise<ApiResponse<{ logs: AuditLog[]; total: number }>> {
    const response = await this.api.get('/api/admin/logs/audit', { params });
    return response.data;
  }

  // Admin Management APIs
  async getAdmins(params?: {
    page?: number;
    pageSize?: number;
    role?: string;
  }): Promise<ApiResponse<{ admins: AdminUser[]; total: number }>> {
    const response = await this.api.get('/api/admin/admins', { params });
    return response.data;
  }

  async createAdmin(data: {
    username: string;
    email: string;
    password: string;
    role: AdminUser['role'];
    name: string;
  }): Promise<ApiResponse<AdminUser>> {
    const response = await this.api.post('/api/admin/admins', data);
    return response.data;
  }

  async updateAdmin(adminId: number, data: Partial<AdminUser>): Promise<ApiResponse<AdminUser>> {
    const response = await this.api.put(`/api/admin/admins/${adminId}`, data);
    return response.data;
  }

  async deleteAdmin(adminId: number): Promise<ApiResponse> {
    const response = await this.api.delete(`/api/admin/admins/${adminId}`);
    return response.data;
  }

  // Analytics APIs
  async getAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    metrics?: string[];
  }): Promise<ApiResponse<any>> {
    const response = await this.api.get('/api/admin/analytics', { params });
    return response.data;
  }

  async exportData(params?: {
    type: 'users' | 'groups' | 'messages' | 'logs';
    format: 'csv' | 'json';
    filters?: Record<string, any>;
  }): Promise<Blob> {
    const response = await this.api.post('/api/admin/analytics/export', params, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
