//// [tests/cases/compiler/impliedNodeFormatInterop1.ts] ////

//// [package.json]
{
  "name": "highlight.js",
  "type": "commonjs",
  "types": "index.d.ts"
}

//// [index.d.ts]
declare module "highlight.js" {
  export interface HighlightAPI {
    highlight(code: string): string;
  }
  const hljs: HighlightAPI;
  export default hljs;
}

//// [core.d.ts]
import hljs from "highlight.js";
export default hljs;

//// [index.ts]
import hljs from "highlight.js/lib/core";
hljs.highlight("code");


//// [index.js]
import hljs from "highlight.js/lib/core";
hljs.highlight("code");
