# MindClear+ 🌙✨

**Ruang aman untuk journaling emosi dan self-healing dengan bantuan AI**

> _"Kadang kamu cuma butuh ruang untuk menumpahkan semuanya — tanpa dinilai, tanpa dibebani. Di sini, kamu bisa mulai."_

## 🌟 Fitur Utama

- **📝 Journaling Bebas**: Tulis apa yang ada di pikiran tanpa batasan
- **🤖 Analisis AI**: Menggunakan Gemini AI untuk memahami emosi
- **🎨 Background Dinamis**: Background berubah sesuai emosi yang terdeteksi
- **🔥 Bakar Pikiran**: Fitur untuk "membakar" tulisan dengan animasi yang menenangkan
- **💙 Pesan Comfort**: Lebih dari 60 pesan penyemangat yang dipilih secara random
- **📱 Responsive**: Bekerja sempurna di semua device (mobile, tablet, desktop)
- **🎵 Background Music**: Musik lo-fi untuk menemani sesi journaling

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Buat file `.env` di root project:

```bash
# .env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
VITE_APP_NAME=MindClear+
```

**Cara mendapatkan Gemini API Key:**

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google Account
3. Create new API key
4. Copy dan paste ke file `.env`

### 3. Run Development Server

```bash
npm run dev
```

Buka http://localhost:3000 di browser.

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS dengan custom animations
- **AI**: Google Gemini Pro API
- **Build Tool**: Vite (super fast HMR)
- **Deployment**: Ready untuk Netlify/Vercel/GitHub Pages

## 📱 Responsive Design

Website ini dioptimalkan untuk semua ukuran device:

- **Mobile** (320px - 768px): Touch-friendly interface
- **Tablet** (768px - 1024px): Balanced layout
- **Desktop** (1024px+): Full-featured experience

## 🎨 Emotion-Based Backgrounds

- **😰 Cemas**: Gradient biru dengan floating clouds
- **😫 Stres**: Pink gradient yang menenangkan
- **😢 Sedih**: Biru gelap dengan efek hujan
- **😡 Marah**: Merah dengan partikel api
- **🤔 Bingung**: Gradient aqua dengan spiral animation
- **😊 Bahagia**: Kuning cerah dengan bintang-bintang

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Made with 💙 for mental health awareness**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
