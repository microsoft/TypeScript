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
export {};
//// [test.js]
import { jsx as _jsx } from "/jsx/jsx-runtime";
const Title = (props) => _jsx("h1", { children: props.children });
const element = _jsx(Title, { children: "Hello, world!" });
//// [jsx-dev-runtime.js]
export {};
