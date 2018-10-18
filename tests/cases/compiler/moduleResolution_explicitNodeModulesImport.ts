// @allowJs: true
// @noImplicitReferences: true
// @maxNodeModuleJsDepth: 1

// @Filename: /node_modules/foo/index.js
exports.x = 0;

// @Filename: /src/index.ts
import { x } from "../node_modules/foo";
