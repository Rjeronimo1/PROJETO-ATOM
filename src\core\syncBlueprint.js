import fs from 'fs/promises';
import { commitBlueprintSequencial } from './codexGitHubBridge.mjs';

// Lê o JSON diretamente do arquivo
const blueprintData = await fs.readFile('../../atom_blueprint.json', 'utf-8');
const blueprint = JSON.parse(blueprintData);

await commitBlueprintSequencial(blueprint);
