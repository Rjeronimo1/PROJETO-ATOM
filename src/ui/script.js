import { ATOM_CONFIG } from '../config/config.js';

console.log("Configuração carregada:", ATOM_CONFIG);

document.querySelector('main').innerHTML += `
  <pre style="margin-top: 24px; background: #111; color: #0f0; padding: 16px; border-radius: 8px;">
    ${JSON.stringify(ATOM_CONFIG, null, 2)}
  </pre>
`;
