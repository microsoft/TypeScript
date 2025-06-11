//// [tests/cases/compiler/jsxNamespaceElementChildrenAttributeIgnoredWhenReactJsx.tsx] ////

//// [jsx.d.ts]
declare namespace JSX {
  interface IntrinsicElements {
    h1: { children: string }
  }

  type Element = string;

  interface ElementChildrenAttribute {
    offspring: any;
  }
}

//// [test.tsx]
const Title = (props: { children: string }) => <h1>{props.children}</h1>;

<Title>Hello, world!</Title>;

const Wrong = (props: { offspring: string }) => <h1>{props.offspring}</h1>;

<Wrong>Byebye, world!</Wrong>

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
jsx_runtime_1.jsx(Title, { children: "Hello, world!" });
const Wrong = (props) => jsx_runtime_1.jsx("h1", { children: props.offspring });
jsx_runtime_1.jsx(Wrong, { children: "Byebye, world!" });
//// [jsx-dev-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
