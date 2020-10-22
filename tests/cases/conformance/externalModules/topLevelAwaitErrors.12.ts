// @target: esnext
// @module: esnext

export {};
declare namespace foo { const await: any; }

// await disallowed in import=namespace when in a module
import await = foo.await;
