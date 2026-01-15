// @allowJs: true
// @noImplicitReferences: true
// @maxNodeModuleJsDepth: 0

// @Filename: /node_modules/foo/index.js
exports.x = 0;

// @Filename: /src/index.ts
import { y } from "../node_modules/foo";
