# Vercel 部署说明

## 方式 1: 通过 Vercel Web 界面（推荐）

1. 访问: https://vercel.com/new
2. 选择 "Import Git Repository"
3. 选择 `BingSecretChat-Bot` 仓库
4. **重要**: 选择 `admin` 分支
5. 配置:
   - Framework: Vite
   - Build Command: npm run build
   - Output Directory: dist
   - Root Directory: ./
6. 添加环境变量:
   - VITE_API_BASE_URL: https://755360e3.webapp-1vu.pages.dev
   - VITE_ENV: production
7. 点击 "Deploy"

## 方式 2: 快速静态 Demo

1. 访问: https://vercel.com/new
2. 拖拽 `dist` 文件夹
3. 等待上传完成

## GitHub URL
https://github.com/OwenALL/BingSecretChat-Bot/tree/admin
