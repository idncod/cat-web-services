import { Navigate, Route, Routes } from 'react-router-dom';
import { CwsConsolePage } from '@/pages/CwsConsolePage/CwsConsolePage';
import { DemoPage } from '@/pages/DemoPage/DemoPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<CwsConsolePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}

export default App;