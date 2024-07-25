//// [tests/cases/compiler/jsxChildWrongType.tsx] ////

//// [index.tsx]
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const a = (
  <main>
    {(<div />) as unknown}
    <span />
  </main>
);


//// [index.js]
"use strict";
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
const a = (React.createElement("main", null,
    (React.createElement("div", null)),
    React.createElement("span", null)));
