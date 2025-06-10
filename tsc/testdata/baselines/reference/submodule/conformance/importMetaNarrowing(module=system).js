//// [tests/cases/conformance/es2019/importMeta/importMetaNarrowing.ts] ////

//// [importMetaNarrowing.ts]
declare global { interface ImportMeta {foo?: () => void} };

if (import.meta.foo) {
  import.meta.foo();
}


//// [importMetaNarrowing.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
if (import.meta.foo) {
    import.meta.foo();
}
