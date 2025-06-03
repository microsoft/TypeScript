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

//// [test.js]
const Title = (props) => <h1>{props.children}</h1>;
const element = <Title>Hello, world!</Title>;
//// [jsx-dev-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [jsx-runtime.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
