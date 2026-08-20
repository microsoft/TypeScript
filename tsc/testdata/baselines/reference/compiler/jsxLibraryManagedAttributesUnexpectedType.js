//// [tests/cases/compiler/jsxLibraryManagedAttributesUnexpectedType.tsx] ////

//// [jsxLibraryManagedAttributesUnexpectedType.tsx]
declare namespace JSX {
  enum LibraryManagedAttributes {}
}

declare const C: () => any;

const x = <C />;


//// [jsxLibraryManagedAttributesUnexpectedType.js]
"use strict";
const x = React.createElement(C, null);
