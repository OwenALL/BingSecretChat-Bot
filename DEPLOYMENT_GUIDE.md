# 🚀 BingSecretChat 管理后台部署指南

## 📋 部署概述

**项目信息**
- **项目名称**: BingSecretChat Admin Dashboard
- **技术栈**: React 19 + TypeScript + Ant Design 6 + Vite 7
- **部署平台**: Vercel
- **后端 API**: https://755360e3.webapp-1vu.pages.dev

## 🔧 部署前准备

### 1. GitHub 仓库设置

#### 方式一：通过 GitHub Web 界面（推荐）

1. 访问 GitHub: https://github.com/new
2. 创建新仓库：
   - Repository name: `bingsecretchat-admin`
   - Description: `BingSecretChat 管理后台`
   - Visibility: Private（推荐）或 Public
   - 不要勾选 "Initialize this repository with a README"
3. 创建后复制仓库 URL（例如: `https://github.com/username/bingsecretchat-admin.git`）

#### 方式二：使用命令行

```bash
# 在 /home/user/webapp-admin 目录下执行
cd /home/user/webapp-admin

# 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/YOUR_USERNAME/bingsecretchat-admin.git

# 推送代码
git push -u origin main
```

### 2. Vercel 部署设置

#### 步骤 1：导入 GitHub 仓库

1. 访问 Vercel: https://vercel.com
2. 点击 "Add New" → "Project"
3. 导入刚创建的 GitHub 仓库 `bingsecretchat-admin`

#### 步骤 2：配置项目设置

**Framework Preset**: Vite
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

#### 步骤 3：配置环境变量

在 Vercel 项目设置中添加环境变量：

| 变量名 | 值 | 描述 |
|--------|-----|------|
| `VITE_API_BASE_URL` | `https://755360e3.webapp-1vu.pages.dev` | 后端 API 地址 |
| `VITE_ENV` | `production` | 运行环境 |

#### 步骤 4：部署

1. 点击 "Deploy" 开始部署
2. 等待部署完成（通常需要 1-3 分钟）
3. 部署成功后会获得 Vercel 域名（例如: `https://bingsecretchat-admin.vercel.app`）

## 🔐 后端 API 集成

### 需要在主应用中实现的管理后台 API

管理后台前端已经创建完成，但后端 API 还需要在主应用（webapp）中实现。

#### 必需的 API 端点

```typescript
// 1. 认证相关 (Priority: P0)
POST   /api/admin/auth/login        // 管理员登录
POST   /api/admin/auth/logout       // 管理员登出
GET    /api/admin/auth/me           // 获取当前管理员信息

// 2. 控制台数据 (Priority: P0)
GET    /api/admin/dashboard/stats   // 获取控制台统计数据

// 3. 用户管理 (Priority: P1)
GET    /api/admin/users             // 获取用户列表（分页、搜索）
GET    /api/admin/users/:id         // 获取用户详情
PUT    /api/admin/users/:id         // 更新用户信息
POST   /api/admin/users/:id/ban     // 封禁用户
POST   /api/admin/users/:id/unban   // 解封用户
DELETE /api/admin/users/:id         // 删除用户

// 4. 群组管理 (Priority: P1)
GET    /api/admin/groups            // 获取群组列表
GET    /api/admin/groups/:id        // 获取群组详情
PUT    /api/admin/groups/:id        // 更新群组信息
POST   /api/admin/groups/:id/lock   // 锁定群组
POST   /api/admin/groups/:id/unlock // 解锁群组
DELETE /api/admin/groups/:id        // 删除群组

// 5. 消息管理 (Priority: P2)
GET    /api/admin/messages          // 获取消息元数据列表（不包含解密内容）
DELETE /api/admin/messages/:id      // 删除消息

// 6. 操作日志 (Priority: P2)
GET    /api/admin/logs/audit        // 获取操作审计日志

// 7. 管理员管理 (Priority: P2)
GET    /api/admin/admins            // 获取管理员列表
POST   /api/admin/admins            // 创建管理员
PUT    /api/admin/admins/:id        // 更新管理员
DELETE /api/admin/admins/:id        // 删除管理员
```

### 数据库 Schema 扩展

需要在 D1 数据库中添加以下表：

```sql
-- 管理员用户表
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('super_admin', 'admin', 'moderator', 'viewer')),
  name TEXT NOT NULL,
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'locked')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- 管理员操作日志表
CREATE TABLE admin_operation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id)
);

-- 管理员会话表
CREATE TABLE admin_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id)
);

-- 创建索引
CREATE INDEX idx_admin_logs_admin_id ON admin_operation_logs(admin_id);
CREATE INDEX idx_admin_logs_created_at ON admin_operation_logs(created_at);
CREATE INDEX idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX idx_admin_sessions_admin_id ON admin_sessions(admin_id);
```

### 创建初始管理员账号

```sql
-- 注意：实际使用时需要用 bcrypt 或其他安全方式加密密码
INSERT INTO admin_users (username, email, password_hash, role, name)
VALUES ('admin', 'admin@example.com', 'hashed_password_here', 'super_admin', '系统管理员');
```

## 📊 当前实现状态

### ✅ 已完成
- [x] 前端项目架构搭建
- [x] 登录页面 UI
- [x] 主布局和导航
- [x] 控制台页面 UI
- [x] 用户管理页面 UI
- [x] API 服务封装
- [x] 权限类型定义
- [x] 路由配置

### 🚧 待实现
- [ ] 后端管理 API（在 webapp 项目中实现）
- [ ] 数据库 Schema 扩展
- [ ] 其他管理页面 UI（群组、消息、日志等）
- [ ] 数据图表和分析功能

## 🧪 本地开发测试

### 启动开发服务器

```bash
cd /home/user/webapp-admin

# 方式一：使用 npm
npm run dev

# 方式二：使用 PM2
fuser -k 3001/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# 访问
# http://localhost:3001
```

### Mock 数据测试

目前前端使用 Mock 数据进行界面展示。真实数据需要后端 API 实现后才能使用。

## 🔒 安全注意事项

### 1. 环境变量安全
- ✅ `.env` 文件已加入 `.gitignore`
- ✅ 使用 `.env.example` 作为配置模板
- ⚠️ 不要在代码中硬编码敏感信息

### 2. API 认证
- ✅ 使用 JWT Token 进行认证
- ✅ Token 存储在 localStorage
- ✅ 自动添加 Authorization Header
- ✅ 401 响应自动跳转登录

### 3. 权限控制
- ✅ 基于角色的访问控制（RBAC）
- ✅ 4 种角色：super_admin, admin, moderator, viewer
- ⚠️ 后端需实现权限验证中间件

### 4. 操作审计
- ✅ 前端设计了审计日志表
- ⚠️ 后端需记录所有管理操作
- ⚠️ 包括 IP、User-Agent、操作详情

## 📝 项目文件结构

```
webapp-admin/
├── src/
│   ├── components/           # 可复用组件（待扩展）
│   ├── pages/                # 页面组件
│   │   ├── Login.tsx         # ✅ 登录页
│   │   ├── Dashboard.tsx     # ✅ 控制台
│   │   └── Users.tsx         # ✅ 用户管理
│   ├── layouts/              # 布局组件
│   │   └── MainLayout.tsx    # ✅ 主布局
│   ├── services/             # API 服务
│   │   └── api.ts            # ✅ API 封装
│   ├── types/                # TypeScript 类型
│   │   └── index.ts          # ✅ 类型定义
│   ├── utils/                # 工具函数（待扩展）
│   ├── App.tsx               # ✅ 应用入口
│   ├── main.tsx              # ✅ React 渲染入口
│   └── index.css             # ✅ 全局样式
├── public/                   # 静态资源
├── .env                      # ✅ 环境变量（不提交）
├── .env.example              # ✅ 环境变量模板
├── .gitignore                # ✅ Git 忽略配置
├── vercel.json               # ✅ Vercel 配置
├── ecosystem.config.cjs      # ✅ PM2 配置
├── package.json              # ✅ 项目配置
├── vite.config.ts            # ✅ Vite 配置
├── tsconfig.json             # ✅ TypeScript 配置
├── README.md                 # ✅ 项目说明
└── DEPLOYMENT_GUIDE.md       # ✅ 部署指南（本文件）
```

## 🎯 下一步计划

### Phase 1: 后端 API 实现（1-2周）
1. 在 webapp 项目中创建 `/api/admin/*` 路由
2. 实现认证和授权中间件
3. 实现核心管理 API
4. 扩展数据库 Schema

### Phase 2: 前端功能完善（1-2周）
5. 实现群组管理页面
6. 实现消息管理页面
7. 实现操作日志页面
8. 实现管理员管理页面

### Phase 3: 高级功能（2-3周）
9. 数据分析图表
10. 实时监控面板
11. 批量操作功能
12. 数据导出功能

## 📞 支持联系

如有问题，请联系：
- **开发者**: Owen
- **Telegram Bot**: @BingSecretChatBot
- **主应用**: https://755360e3.webapp-1vu.pages.dev

---

© 2024 BingSecretChat. All rights reserved.
