//// [tests/cases/compiler/jsxNamespaceNoElementChildrenAttributeReactJsx.tsx] ////

//// [jsx.d.ts]
declare namespace JSX {
  interface IntrinsicElements {
    h1: { children: string }
  }

  type Element = string;
}

//// [test.tsx]
const Title = (props: { children: string }) => <h1>{props.children}</h1>;

const element = <Title>Hello, world!</Title>;

//// [jsx-runtime.ts]
export {};
//// [jsx-dev-runtime.ts]
export {};

//// [jsx-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("/jsx/jsx-runtime");
const Title = (props) => jsx_runtime_1.jsx("h1", { children: props.children });
const element = jsx_runtime_1.jsx(Title, { children: "Hello, world!" });
//// [jsx-dev-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
