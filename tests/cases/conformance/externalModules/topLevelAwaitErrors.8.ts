// @target: esnext
// @module: esnext

// @filename: index.ts
// await disallowed in default import
import await from "./other";

// @filename: other.ts
declare const _await: any;
export default _await;
