# Vercel Deployment Configuration

## Project Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Environment Variables Setup

⚠️ **PENTING**: File .env tidak masuk ke GitHub (ada di .gitignore)

### Cara Setup Environment Variables di Vercel:

#### Method 1: Via Vercel Dashboard (Recommended)

1. **Login ke [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Pilih Project "mind-clear-alpha"**
3. **Go to Settings → Environment Variables**
4. **Add New Variable #1:**

   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `[PASTE_YOUR_ACTUAL_API_KEY_HERE]`
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

5. **Add New Variable #2:**

   - **Name**: `VITE_APP_NAME`
   - **Value**: `MindClear+`
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

6. **Add New Variable #3:**
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: ✅ Production

#### Method 2: Via Vercel CLI

```bash
# Set environment variables via CLI
vercel env add VITE_GEMINI_API_KEY production
vercel env add VITE_APP_NAME production
vercel env add NODE_ENV production
```

⚠️ **PENTING**: Setelah menambah environment variables, **Redeploy** project!

### � **KEAMANAN API KEY:**

- **JANGAN PERNAH** commit API key ke GitHub
- **SELALU** gunakan Environment Variables di Vercel
- **COPY** API key dari file .env lokal Anda
- **PASTE** langsung di Vercel Dashboard

### �📸 Screenshot Vercel Environment Variables:

```
VITE_GEMINI_API_KEY = [YOUR_ACTUAL_API_KEY]
VITE_APP_NAME = MindClear+
```

## Build Configuration

The project uses:

- React 18 with Vite
- No SSR required (SPA mode)
- Static assets in public/ folder
- Audio files fallback to procedural generation

## Domain Setup

After deployment, you can:

1. Use provided vercel.app domain
2. Connect custom domain
3. Configure HTTPS (automatic)

## Step-by-Step Deployment:

### Method 1: Via Vercel Website (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Login dengan GitHub account**
3. **Click "New Project"**
4. **Import from GitHub**: `Riskihidayatt/MindClear`
5. **Configure Project:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Setup Environment Variables** (lihat di atas)
7. **Click "Deploy"**

### Method 2: Via CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Post-Deployment

- Auto-deployment pada setiap push ke master branch
- Environment variables aman (tidak di commit ke GitHub)
- SSL/HTTPS otomatis aktif
- CDN global untuk performa optimal

## Troubleshooting

- Jika build gagal: cek Environment Variables sudah di-set
- Jika API error: pastikan VITE_GEMINI_API_KEY benar
- Jika 404 errors: cek vercel.json routing configuration
