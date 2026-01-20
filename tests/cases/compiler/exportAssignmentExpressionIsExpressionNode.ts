// @strict: true
// @module: nodenext
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/eslint-plugin-import-x/package.json
{
  "name": "eslint-plugin-import-x",
  "version": "1.0.0",
  "main": "index.cjs"
}

// @Filename: /node_modules/eslint-plugin-import-x/index.d.cts
declare const eslintPluginImportX: typeof import("./lib/index.js");
export = eslintPluginImportX;

// @Filename: /node_modules/eslint-plugin-import-x/lib/index.d.ts
interface PluginConfig {
  parser?: string | null;
}
declare const configs: {
    'stage-0': PluginConfig;
};
declare const _default: {
    configs: {
        'stage-0': PluginConfig;
    };
};
export default _default;
export { configs };

// @Filename: /index.ts
import * as pluginImportX from 'eslint-plugin-import-x'

interface Plugin {
  configs?: Record<string, { parser: string | null }>
}

const p: Plugin = pluginImportX;
