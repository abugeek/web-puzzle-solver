# 🚀 Deployment Guide

This guide covers deploying your Puzzle Solver app to the web using **Vercel** (recommended) or **GitHub Pages**.

---

## 📦 Option 1: Vercel (Recommended - Full Stack)

Vercel is the **easiest** way to deploy full-stack apps with both frontend and backend.

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Step 1: Push to GitHub

```bash
cd /Users/abugeeek/PycharmProjects/tgphonefinder/web-puzzle-solver

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Puzzle Solver MVP"

# Create repo on GitHub (go to github.com and create new repo)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/puzzle-solver.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Connect your GitHub account
4. Select your `puzzle-solver` repository
5. Configure project:
   - **Framework Preset**: Other
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `pip install -r requirements.txt && cd frontend && npm install`

6. Click **Deploy**

### Step 3: Configure Environment Variables (Optional)

In Vercel dashboard:
- Go to **Settings** → **Environment Variables**
- Add:
  - `FLASK_ENV` = `production`
  - `SECRET_KEY` = `your-random-secret-key-here`

### Step 4: Done! 🎉

Your app will be live at: `https://puzzle-solver.vercel.app` (or your custom domain)

**Vercel automatically:**
- ✅ Builds frontend on every push
- ✅ Deploys backend API
- ✅ Provides HTTPS
- ✅ Gives you a free domain
- ✅ Auto-redeploys on git push

---

## 📄 Option 2: GitHub Pages (Frontend Only)

GitHub Pages is **free** but **only hosts static sites** (frontend only, no backend).

### ⚠️ Limitation
Backend API won't work on GitHub Pages. You'll need to deploy backend separately to:
- **Heroku** (free tier)
- **Railway** (free tier)
- **PythonAnywhere** (free tier)
- **Your own server**

### Deploy Frontend to GitHub Pages

```bash
cd /Users/abugeeek/PycharmProjects/tgphonefinder/web-puzzle-solver

# Build frontend
cd frontend
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy scripts to package.json
```

Add to `frontend/package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/puzzle-solver"
}
```

```bash
# Deploy
npm run deploy
```

Frontend will be live at: `https://YOUR_USERNAME.github.io/puzzle-solver`

Then update frontend API base URL to point to your backend server.

---

## 🔥 Option 3: Railway (Full Stack Alternative)

Railway is another great option for full-stack deployment.

### Prerequisites
- GitHub account
- Railway account (free at [railway.app](https://railway.app))

### Steps

1. Push code to GitHub (see Vercel Step 1)
2. Go to [railway.app](https://railway.app)
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway auto-detects Flask + React
6. Click **Deploy**

Railway provides:
- ✅ Free hosting (500 hours/month)
- ✅ Automatic HTTPS
- ✅ Environment variables
- ✅ PostgreSQL database (if needed later)

---

## 🌍 Custom Domain (Optional)

### For Vercel:
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)

### For GitHub Pages:
1. Go to repo **Settings** → **Pages**
2. Add custom domain
3. Update DNS CNAME record

---

## 📝 Pre-Deployment Checklist

- ✅ All code committed to git
- ✅ `requirements.txt` updated
- ✅ Frontend builds successfully (`npm run build`)
- ✅ Backend runs without errors
- ✅ Environment variables configured
- ✅ CORS configured for production domain
- ✅ API endpoints tested

---

## 🛠️ Production Configuration

### Update Flask for Production

Edit `app.py`:

```python
import os

# Get secret key from environment
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Update CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://your-domain.vercel.app",  # Add your production domain
            "https://yourdomain.com"
        ]
    }
})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 50000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

### Update Frontend API URL

If deploying frontend and backend separately, update `frontend/src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://your-backend-api.com/api'  // Production backend
    : '/api',  // Local development
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 🔍 Troubleshooting

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Verify all dependencies in `package.json`

### Backend API Not Working
- Check CORS settings
- Verify API routes in Vercel logs
- Test API endpoints directly: `https://your-app.vercel.app/api/presets`

### Frontend Shows Blank Page
- Check browser console for errors
- Verify build output in `frontend/dist`
- Check base URL in Vite config

### 502 Bad Gateway
- Backend crashed - check Vercel function logs
- Python dependencies missing - check `requirements.txt`

---

## 📊 Deployment Comparison

| Feature | Vercel | GitHub Pages | Railway |
|---------|--------|--------------|---------|
| **Frontend** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Backend** | ✅ Yes | ❌ No | ✅ Yes |
| **Free Tier** | ✅ Generous | ✅ Unlimited | ✅ 500hrs/mo |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Database** | ❌ No | ❌ No | ✅ PostgreSQL |

---

## 🎯 Recommended: Vercel

For this full-stack app with React + Flask, **Vercel is the best choice** because:

1. ✅ **Easiest Setup**: Just connect GitHub and deploy
2. ✅ **Full Stack**: Frontend + Backend together
3. ✅ **Free**: Generous free tier
4. ✅ **Fast**: Global CDN for frontend
5. ✅ **Auto Deploy**: Push to git = auto deploy
6. ✅ **Preview URLs**: Every PR gets a preview URL

---

## 🚀 Quick Start (Vercel)

```bash
# 1. Build locally to test
cd frontend && npm run build

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 3. Go to vercel.com
# 4. Click "Import Project"
# 5. Select your repo
# 6. Click "Deploy"
# 7. Done! 🎉
```

Your app will be live in ~2 minutes!

---

## 📧 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)

---

**Happy Deploying! 🚀**
