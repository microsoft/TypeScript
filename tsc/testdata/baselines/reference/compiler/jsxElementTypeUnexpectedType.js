//// [tests/cases/compiler/jsxElementTypeUnexpectedType.tsx] ////

//// [jsxElementTypeUnexpectedType.tsx]
declare namespace JSX {
  enum ElementType {}
}

declare const C: () => any;

const x = <C />;


//// [jsxElementTypeUnexpectedType.js]
"use strict";
const x = React.createElement(C, null);
