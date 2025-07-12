import fs from 'fs/promises';
import { commitBlueprintSequencial } from './codexGitHubBridge.mjs';

// Lê o JSON diretamente do arquivo
const blueprintPath = path.join(__dirname, '..', '..', 'atom_blueprint.json');
const blueprint = JSON.parse(await fs.readFile(blueprintPath, 'utf-8'));

await commitBlueprintSequencial(blueprint);
