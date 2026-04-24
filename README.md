# ChurnAI Frontend

Production-ready dashboard for churn prediction.

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install --force
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Backend Connection**
   - Ensure the Node.js backend is running on `http://localhost:3000`.
   - The frontend calls `/api/dashboard` for stats and `/api/predict-user` for inference.

## 🛠️ Tech Stack

- **React (Vite)**
- **Tailwind CSS v4** (Modern, fast, CSS-driven)
- **Recharts** (Visualizations)
- **Lucide React** (Iconography)
- **Axios** (API requests)

## 📁 Structure

- `src/components`: UI building blocks (StatCard, RiskBadge, etc.)
- `src/pages`: Main application views
- `src/services`: API integration layer
- `src/hooks`: Custom React hooks for business logic
- `src/utils`: Formatting and helpers
