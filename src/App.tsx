
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { WhatsAppFAB } from './components/shared/WhatsAppFAB';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />

          {/* ── VENTURES UNDER DEVELOPMENT ── */}
          <Route path="/projects/la-essence" element={<ComingSoon />} />
          <Route path="/pharma" element={<ComingSoon />} />
          <Route path="/sports" element={<ComingSoon />} />

          {/* ── FALLBACK ── */}
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </main>
      <WhatsAppFAB />
    </BrowserRouter>
  );
}

export default App;
