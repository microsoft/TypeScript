//// [topLevelAwaitErrors.12.ts]
export {};
declare namespace foo { const await: any; }

// await disallowed in import=namespace when in a module
import await = foo.await;


//// [topLevelAwaitErrors.12.js]
export {};
