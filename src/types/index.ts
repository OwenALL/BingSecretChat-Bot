// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Admin User Types
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'viewer';
  name: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'locked';
  created_at: string;
  last_login?: string;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalGroups: number;
  totalMessages: number;
  newUsersToday: number;
  newGroupsToday: number;
  activeGroupsToday: number;
}

// User Types
export interface User {
  id: number;
  telegram_id: string;
  username?: string;
  nickname: string;
  avatar_url?: string;
  email?: string;
  email_verified: boolean;
  lock_enabled: boolean;
  status: 'active' | 'locked' | 'banned';
  created_at: string;
  last_active?: string;
}

// Group Types
export interface Group {
  id: number;
  group_code: string;
  name: string;
  description?: string;
  privacy_type: 'public' | 'private';
  approval_required: boolean;
  owner_id: number;
  member_count: number;
  message_count: number;
  status: 'active' | 'locked' | 'archived';
  created_at: string;
  last_message_at?: string;
}

// Message Types (Encrypted - only metadata visible)
export interface Message {
  id: number;
  group_id: number;
  sender_anonymous_id: number;
  message_type: 'text' | 'image' | 'voice' | 'system';
  encrypted: boolean;
  has_translation: boolean;
  created_at: string;
}

// Audit Log Types
export interface AuditLog {
  id: number;
  admin_id: number;
  admin_username: string;
  action: string;
  resource_type: string;
  resource_id?: number;
  ip_address: string;
  user_agent: string;
  details?: Record<string, any>;
  created_at: string;
}

// Permission Types
export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Users
  VIEW_USERS: 'view_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  BAN_USERS: 'ban_users',
  
  // Groups
  VIEW_GROUPS: 'view_groups',
  EDIT_GROUPS: 'edit_groups',
  DELETE_GROUPS: 'delete_groups',
  LOCK_GROUPS: 'lock_groups',
  
  // Messages
  VIEW_MESSAGES: 'view_messages',
  DELETE_MESSAGES: 'delete_messages',
  
  // Security
  VIEW_SECURITY: 'view_security',
  MANAGE_SECURITY: 'manage_security',
  
  // Email
  VIEW_EMAIL: 'view_email',
  SEND_EMAIL: 'send_email',
  
  // Analytics
  VIEW_ANALYTICS: 'view_analytics',
  EXPORT_DATA: 'export_data',
  
  // Settings
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  
  // Logs
  VIEW_LOGS: 'view_logs',
  
  // Admins
  VIEW_ADMINS: 'view_admins',
  CREATE_ADMINS: 'create_admins',
  EDIT_ADMINS: 'edit_admins',
  DELETE_ADMINS: 'delete_admins',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role Permissions Map
export const ROLE_PERMISSIONS: Record<AdminUser['role'], Permission[]> = {
  super_admin: Object.values(PERMISSIONS),
  admin: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.BAN_USERS,
    PERMISSIONS.VIEW_GROUPS,
    PERMISSIONS.EDIT_GROUPS,
    PERMISSIONS.LOCK_GROUPS,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.DELETE_MESSAGES,
    PERMISSIONS.VIEW_SECURITY,
    PERMISSIONS.VIEW_EMAIL,
    PERMISSIONS.SEND_EMAIL,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_LOGS,
  ],
  moderator: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_GROUPS,
    PERMISSIONS.EDIT_GROUPS,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.DELETE_MESSAGES,
    PERMISSIONS.VIEW_LOGS,
  ],
  viewer: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_GROUPS,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.VIEW_LOGS,
  ],
};
