// @allowJs: true
// @checkJs: true
// @emitDeclarationOnly: true
// @module: commonjs
// @declaration: true
// @strict: true
// @esModuleInterop: true
// @outFile: ./js/index.js
// @filename: js/versions.static.js
export default {
    "@a/b": "1.0.0",
    "@a/c": "1.2.3"
};
// @filename: js/index.js
import versions from './versions.static.js';

export {
    versions
};
