//// [tests/cases/compiler/jsxIntrinsicElementsExtendsRecord.tsx] ////

//// [index.tsx]
declare namespace JSX {
  interface IntrinsicElements extends Record<string, any> {}
}

<a />;


//// [index.jsx]
<a />;
