import { createRoot, hydrateRoot } from 'react-dom/client';
import './style.css';
import AutomotiveShowcase from './AutomotiveShowcase.jsx';

const root = document.getElementById('root');
const path = root.dataset.showcasePath || window.location.pathname;
const page = <AutomotiveShowcase path={path} />;

if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
