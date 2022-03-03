//// [importMetaNarrowing.ts]
declare global { interface ImportMeta {foo?: () => void} };

if (import.meta.foo) {
  import.meta.foo();
}


//// [importMetaNarrowing.js]
;
if (import.meta.foo) {
    import.meta.foo();
}
export {};
