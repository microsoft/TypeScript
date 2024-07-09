// @target: esnext
// @module: es2022,esnext

declare namespace foo { const await: any; }

// await allowed in import=namespace when not a module
import await = foo.await;
