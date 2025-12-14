# 🎛️ BingSecretChat 管理后台

BingSecretChat 端到端加密匿名群聊机器人的管理后台系统。

## ✨ 功能特性

### 已实现功能
- ✅ **登录系统**: 管理员认证和权限控制
- ✅ **控制台**: 实时数据统计展示
- ✅ **用户管理**: 用户列表、查询、封禁、解封、删除

### 开发中功能
- 🚧 **群组管理**: 群组列表、查询、锁定、删除
- 🚧 **消息管理**: 消息元数据查看（加密内容不可见）
- 🚧 **安全中心**: 安全事件监控和处理
- 🚧 **邮件系统**: 邮件发送记录和管理
- 🚧 **数据分析**: 用户、群组、消息统计图表
- 🚧 **系统设置**: 系统配置管理
- 🚧 **操作日志**: 管理员操作审计
- 🚧 **管理员管理**: 管理员账号管理

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **UI 组件库**: Ant Design 6
- **路由管理**: React Router DOM 7
- **HTTP 客户端**: Axios
- **构建工具**: Vite 7
- **部署平台**: Vercel

## 📦 项目结构

```
webapp-admin/
├── src/
│   ├── components/      # 可复用组件
│   ├── pages/           # 页面组件
│   │   ├── Login.tsx    # 登录页
│   │   ├── Dashboard.tsx # 控制台
│   │   └── Users.tsx    # 用户管理
│   ├── layouts/         # 布局组件
│   │   └── MainLayout.tsx # 主布局
│   ├── services/        # API 服务
│   │   └── api.ts       # API 封装
│   ├── types/           # TypeScript 类型定义
│   │   └── index.ts     # 类型定义
│   ├── utils/           # 工具函数
│   ├── App.tsx          # 应用主入口
│   ├── main.tsx         # React 渲染入口
│   └── index.css        # 全局样式
├── public/              # 静态资源
├── .env                 # 环境变量
├── .env.example         # 环境变量示例
├── vercel.json          # Vercel 配置
├── vite.config.ts       # Vite 配置
├── package.json         # 项目配置
└── README.md            # 项目说明
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
# 启动开发服务器（端口 3001）
npm run dev

# 或使用 PM2（推荐）
fuser -k 3001/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 📡 API 配置

后端 API 地址在 `.env` 文件中配置：

```env
VITE_API_BASE_URL=https://755360e3.webapp-1vu.pages.dev
```

## 🔐 权限系统

系统支持 4 种角色权限：

1. **超级管理员 (super_admin)**: 完整权限
2. **管理员 (admin)**: 用户、群组、消息管理权限
3. **协管员 (moderator)**: 查看和基础管理权限
4. **查看者 (viewer)**: 只读权限

## 📝 开发规范

### Git 提交规范
```bash
# 初始化提交
npm run git:init

# 日常提交
npm run git:commit "feat: 添加新功能"
```

### 提交类型
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具链更新

## 🚢 部署到 Vercel

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 首次部署
```bash
vercel
```

### 4. 生产部署
```bash
vercel --prod
```

### 5. 配置环境变量

在 Vercel 项目设置中添加环境变量：
- `VITE_API_BASE_URL`: 后端 API 地址

## 📊 当前状态

- **版本**: v1.0.0
- **状态**: 🚧 开发中
- **最后更新**: 2024-12-14

## 🔗 相关链接

- **主应用**: https://755360e3.webapp-1vu.pages.dev
- **Telegram Bot**: @BingSecretChatBot
- **GitHub**: (待配置)

## 👥 团队

- **开发**: Owen
- **设计**: Owen

## 📄 License

MIT License

---

© 2024 BingSecretChat. All rights reserved.
