import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Remove the explicit import of flowbite CSS as it's causing conflicts
// Import the JS only
import 'flowbite';

createRoot(document.getElementById("root")!).render(
  <App />
);
