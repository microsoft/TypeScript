//// [tests/cases/conformance/importAttributes/importAttributes10.ts] ////

//// [a.json]
{ "key": "value" }

//// [b.ts]
declare global {
    interface ImportAttributes {
        type: "json"
    }
}

export type Test1 = typeof import("./a.json", {
  with: {
    type: "json"
  },
});

export type Test2 = typeof import("./a.json", {
  with: {
    type: "json",
  }
});

export type Test3 = typeof import("./a.json", {
  with: {
    type: "json"
  },,
});

export type Test4 = typeof import("./a.json", {
  with: {
    type: "json",,
  }
});


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
