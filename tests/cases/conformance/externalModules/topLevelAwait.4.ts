// @target: esnext
// @module: esnext
// @noEmit: true

(await
 WebAssembly.instantiateStreaming(fetch("")));

export class BitSet {}
