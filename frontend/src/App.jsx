import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-green text-gray-800 font-sans">
        <header className="sticky top-0 z-50 bg-primary-green text-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold flex items-center gap-2">
              🌿 {t('title')}
            </h1>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;