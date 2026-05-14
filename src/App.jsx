import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import AuthGuard from './components/AuthGuard';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0d2218',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '12px',
              padding: '12px 20px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            },
            success: { iconTheme: { primary: '#0f6e56', secondary: '#fff' } },
            error: { iconTheme: { primary: '#e24b4a', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Home />} />
          <Route path="/orders" element={<Home />} />
          <Route path="/profile" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <Admin />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
