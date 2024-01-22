// @declaration: true
// @module: nodenext
// @target: esnext

// @filename: /case0.ts
export default 0;

// @filename: /case1.ts
export default 1;

// @filename: /caseFallback.ts
export default 'fallback';

// @filename: /index.ts
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