import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HyperliquidReport from './HyperliquidReport.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HyperliquidReport />
  </StrictMode>,
)
