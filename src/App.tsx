
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { WhatsAppFAB } from './components/shared/WhatsAppFAB';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/dera-bassi" element={<ProjectPage />} />
        </Routes>
      </main>
      <WhatsAppFAB />
    </BrowserRouter>
  );
}

export default App;
