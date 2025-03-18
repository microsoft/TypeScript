//// [tests/cases/compiler/dynamicImportsDeclaration.ts] ////

//// [case0.ts]
export default 0;

//// [case1.ts]
export default 1;

//// [caseFallback.ts]
export default 'fallback';

//// [index.ts]
export const mod = await (async () => {
  const x: number = 0;
  switch (x) {
    case 0:
      return await import("./case0.js");
    case 1:
      return await import("./case1.js");
    default:
      return await import("./caseFallback.js");
  }
})();

//// [case0.js]
export default 0;
//// [case1.js]
export default 1;
//// [caseFallback.js]
export default 'fallback';
//// [index.js]
export const mod = await (async () => {
    const x = 0;
    switch (x) {
        case 0:
            return await import("./case0.js");
        case 1:
            return await import("./case1.js");
        default:
            return await import("./caseFallback.js");
    }
})();
