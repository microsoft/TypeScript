//// [topLevelAwait.ts]
export const x = 1;
await x;

await (async () => {})();

//// [topLevelAwait.js]
export const x = 1;
await x;
await (async () => { })();
