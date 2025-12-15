# 🚀 Vercel 一键部署指南

## 📋 准备工作

**你已经有的信息：**
- ✅ Vercel 部署 API Token: `vck_2nxRjAScwfcrnunMfor07485e8Xzk6iEqBR0WMDBt8ekZ9FcLR1POXuJ`
- ✅ 后端 API 地址: `https://755360e3.webapp-1vu.pages.dev`
- ✅ 项目已构建完成，代码位于: `/home/user/webapp-admin`

## 🎯 方式一：通过 Vercel CLI 部署（推荐）

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2：使用 Token 登录

```bash
# 设置 Vercel Token
export VERCEL_TOKEN=vck_2nxRjAScwfcrnunMfor07485e8Xzk6iEqBR0WMDBt8ekZ9FcLR1POXuJ

# 或者交互式登录
vercel login
```

### 步骤 3：部署到 Vercel

```bash
cd /home/user/webapp-admin

# 首次部署（会询问配置）
vercel

# 或直接部署到生产环境
vercel --prod
```

配置选项：
- Set up and deploy? **Y**
- Which scope? **选择你的账号**
- Link to existing project? **N**
- What's your project's name? **bingsecretchat-admin**
- In which directory is your code located? **./（当前目录）**
- Want to override the settings? **N**

### 步骤 4：设置环境变量

```bash
# 添加后端 API 地址
vercel env add VITE_API_BASE_URL production
# 输入值: https://755360e3.webapp-1vu.pages.dev

# 添加环境标识
vercel env add VITE_ENV production
# 输入值: production
```

### 步骤 5：重新部署应用环境变量

```bash
vercel --prod
```

## 🎯 方式二：通过 Vercel Web 界面部署

### 步骤 1：推送代码到 GitHub

```bash
cd /home/user/webapp-admin

# 如果还没有添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/bingsecretchat-admin.git

# 推送代码
git push -u origin main
```

### 步骤 2：在 Vercel 导入项目

1. 访问: https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择 `bingsecretchat-admin` 仓库
4. 配置项目：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 步骤 3：添加环境变量

在 "Environment Variables" 部分添加：

```
VITE_API_BASE_URL = https://755360e3.webapp-1vu.pages.dev
VITE_ENV = production
```

### 步骤 4：点击 Deploy

等待部署完成（1-3分钟）。

## ✅ 部署完成后

部署成功后，你会获得：

### 生产环境 URL
```
https://bingsecretchat-admin.vercel.app
```
或
```
https://bingsecretchat-admin-xxx.vercel.app
```

### 验证部署

1. 访问 Vercel URL
2. 应该看到登录页面
3. 尝试登录（需要后端 API 实现）

## 🔧 常见问题

### Q1: 构建失败怎么办？

**A**: Vercel 会在他们的服务器上构建，如果失败：
1. 检查 Vercel 构建日志
2. 确认 `package.json` 中的依赖正确
3. 确认 TypeScript 没有错误

### Q2: 页面空白或 404？

**A**: 检查 `vercel.json` 中的路由配置：
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Q3: API 请求失败？

**A**: 检查环境变量：
1. 在 Vercel 项目设置中确认 `VITE_API_BASE_URL` 已设置
2. 确认后端 API 地址正确
3. 检查浏览器控制台的网络请求

### Q4: 如何更新部署？

**A**: 
```bash
# 提交代码更改
git add .
git commit -m "feat: 更新功能"
git push origin main

# Vercel 会自动重新部署
# 或手动触发
vercel --prod
```

## 📊 部署状态监控

### Vercel Dashboard
访问: https://vercel.com/dashboard

可以看到：
- 部署历史
- 构建日志
- 性能指标
- 域名配置
- 环境变量

### 部署分支策略

- **main 分支**: 自动部署到生产环境
- **其他分支**: 自动部署到预览环境

## 🌐 自定义域名（可选）

### 步骤 1：在 Vercel 添加域名

1. 进入项目设置 → Domains
2. 添加自定义域名（例如: `admin.bingsecretchat.com`）
3. 按照 Vercel 提示配置 DNS

### 步骤 2：配置 DNS

在你的域名提供商添加记录：
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

## 🔐 安全建议

1. ✅ 使用 HTTPS（Vercel 自动提供）
2. ✅ 环境变量不要提交到 Git
3. ✅ 定期更新依赖包
4. ✅ 启用 Vercel 的安全头配置

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] 环境变量已配置
- [ ] 首次部署成功
- [ ] 登录页面可访问
- [ ] API 地址配置正确
- [ ] 后端 API 已实现（待完成）

## 📞 获取帮助

如果遇到问题：
1. 查看 Vercel 构建日志
2. 检查浏览器控制台
3. 查看网络请求
4. 联系开发者 Owen

---

**当前项目状态：** 🟢 前端已完成，等待后端 API 实现

**下一步：** 在 webapp 项目中实现管理后台 API

© 2024 BingSecretChat
