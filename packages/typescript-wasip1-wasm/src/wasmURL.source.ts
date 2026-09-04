/** URL of the locally built TypeScript WASI module when using source conditions. */
export const wasmURL: URL = new URL("../dist/tsc.wasm", import.meta.url);
