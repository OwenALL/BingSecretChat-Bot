# 🚀 一键部署到 Vercel

## ✅ 代码已成功推送到 GitHub！

**GitHub 仓库**: https://github.com/OwenALL/BingSecretChat-Bot  
**分支**: `admin`  
**直接链接**: https://github.com/OwenALL/BingSecretChat-Bot/tree/admin

---

## 🎯 立即部署（2种方式）

### 方式 1: 一键导入（最快，3分钟）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OwenALL/BingSecretChat-Bot/tree/admin&env=VITE_API_BASE_URL,VITE_ENV&envDescription=API%20配置&envLink=https://github.com/OwenALL/BingSecretChat-Bot/tree/admin&project-name=bingsecretchat-admin&repository-name=BingSecretChat-Admin)

**或者直接访问**:
```
https://vercel.com/new/clone?repository-url=https://github.com/OwenALL/BingSecretChat-Bot/tree/admin&project-name=bingsecretchat-admin
```

**配置环境变量**:
```
VITE_API_BASE_URL = https://755360e3.webapp-1vu.pages.dev
VITE_ENV = production
```

### 方式 2: 手动导入（5分钟）

1. **访问 Vercel**: https://vercel.com/new

2. **导入 Git 仓库**:
   - 点击 "Import Git Repository"
   - 选择 `BingSecretChat-Bot` 仓库
   - ⚠️ **重要**: 点击分支选择，选择 `admin` 分支

3. **项目配置**（自动检测）:
   ```
   Project Name: bingsecretchat-admin
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **环境变量**:
   点击 "Environment Variables" 添加:
   ```
   Name: VITE_API_BASE_URL
   Value: https://755360e3.webapp-1vu.pages.dev
   
   Name: VITE_ENV
   Value: production
   ```

5. **部署**: 点击 "Deploy" 按钮

6. **等待**: 2-3 分钟构建完成

---

## 🎨 备用方案: 静态 Demo（30秒）

如果构建失败或想快速预览：

1. 访问: https://vercel.com/new
2. 拖拽 `/home/user/webapp-admin/dist` 文件夹到页面
3. 等待上传完成
4. 立即可用！

---

## 📊 部署后你会获得

- ✅ 公开 URL: `https://bingsecretchat-admin-xxx.vercel.app`
- ✅ 自动部署: 推送到 `admin` 分支自动更新
- ✅ 全球 CDN: 快速访问
- ✅ HTTPS: 自动 SSL
- ✅ 性能监控: Vercel Dashboard

---

## 🔗 重要链接

- **Vercel 部署**: https://vercel.com/new
- **GitHub 仓库**: https://github.com/OwenALL/BingSecretChat-Bot/tree/admin
- **主应用**: https://755360e3.webapp-1vu.pages.dev
- **文档**: 查看 FINAL_DEPLOYMENT_INSTRUCTIONS.md

---

## ❓ 常见问题

### Q: 找不到 admin 分支？
A: 确保在 Vercel 导入时点击分支选择器，选择 `admin` 而不是默认的 `main`。

### Q: 构建失败？
A: 
1. 检查 Vercel 构建日志
2. 确认环境变量已设置
3. 尝试静态 Demo 部署

### Q: 如何更新代码？
A: 推送到 GitHub `admin` 分支，Vercel 自动重新部署。

---

**准备好了吗？** 点击上面的按钮或访问链接开始部署！🚀

© 2024 BingSecretChat. All rights reserved.
