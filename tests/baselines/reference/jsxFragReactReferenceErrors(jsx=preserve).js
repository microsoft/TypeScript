//// [tests/cases/compiler/jsxFragReactReferenceErrors.tsx] ////

//// [jsxFragReactReferenceErrors.tsx]
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />
export function Component(){

return <>
  </>
}

//// [jsxFragReactReferenceErrors.jsx]
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
export function Component() {
    return <>
  </>;
}
