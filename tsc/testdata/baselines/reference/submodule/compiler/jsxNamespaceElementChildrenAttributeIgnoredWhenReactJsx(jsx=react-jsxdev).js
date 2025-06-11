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


//// [jsx-dev-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_dev_runtime_1 = require("/jsx/jsx-dev-runtime");
const _jsxFileName = "/test.tsx";
const Title = (props) => jsx_dev_runtime_1.jsxDEV("h1", { children: props.children }, void 0, false, { fileName: _jsxFileName, lineNumber: 1, columnNumber: 47 }, this);
jsx_dev_runtime_1.jsxDEV(Title, { children: "Hello, world!" }, void 0, false, { fileName: _jsxFileName, lineNumber: 1, columnNumber: 74 }, this);
const Wrong = (props) => jsx_dev_runtime_1.jsxDEV("h1", { children: props.offspring }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 48 }, this);
jsx_dev_runtime_1.jsxDEV(Wrong, { children: "Byebye, world!" }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 76 }, this);
//// [jsx-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
