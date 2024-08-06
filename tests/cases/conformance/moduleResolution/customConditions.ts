// @module: preserve
// @moduleResolution: bundler
// @customConditions: webpack, browser
// @resolvePackageJsonExports: true, false
// @traceResolution: true

// @Filename: /node_modules/lodash/package.json
{
    "name": "lodash",
    "version": "1.0.0",
    "main": "index.js",
    "exports": {
        "browser": "./browser.js",
        "webpack": "./webpack.js",
        "default": "./index.js"
    }
}

// @Filename: /node_modules/lodash/index.d.ts
declare const _: "index";
export = _;

// @Filename: /node_modules/lodash/browser.d.ts
declare const _: "browser";
export default _;

// @Filename: /node_modules/lodash/webpack.d.ts
declare const _: "webpack";
export = _;

// @Filename: /index.ts
import _ from "lodash";
