import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for production
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>JRB Gold</h1>
      <p>Loading application...</p>
      <p style="color: #666; font-size: 14px;">If this message persists, please refresh the page.</p>
    </div>
  `;
}
