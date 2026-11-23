// @target: es2015
// @module: esnext
// @moduleResolution: bundler
// @strict: true
// @noEmit: true
// @traceResolution: true
// @noImplicitReferences: true

// @filename: /node_modules/theme/package.json
{
    "exports": {
        "./tokens": {
            "types": "./tokens.d.ts",
            "import": "./tokens.mjs",
            "default": "./tokens.mjs"
        }
    }
}
// @filename: /node_modules/theme/tokens.mjs
export default "blue";
// @filename: /node_modules/theme/tokens.d.mts
declare const color: string;
export default color;
// @filename: /index.mts
import color from "theme/tokens";
color;
