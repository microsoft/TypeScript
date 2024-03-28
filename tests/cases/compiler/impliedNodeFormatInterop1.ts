// @module: es2020
// @moduleResolution: node10
// @esModuleInterop: true

// @Filename: /node_modules/highlight.js/package.json
{
  "name": "highlight.js",
  "type": "commonjs",
  "types": "index.d.ts"
}

// @Filename: /node_modules/highlight.js/index.d.ts
declare module "highlight.js" {
  export interface HighlightAPI {
    highlight(code: string): string;
  }
  const hljs: HighlightAPI;
  export default hljs;
}

// @Filename: /node_modules/highlight.js/lib/core.d.ts
import hljs from "highlight.js";
export default hljs;

// @Filename: /index.ts
import hljs from "highlight.js/lib/core";
hljs.highlight("code");
