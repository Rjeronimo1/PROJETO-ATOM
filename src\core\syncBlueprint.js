// src/core/syncBlueprint.js
import { commitBlueprintSequencial } from './codexGitHubBridge.mjs';
import blueprint from '../../atom_blueprint.json' assert { type: 'json' };

await commitBlueprintSequencial(blueprint);
