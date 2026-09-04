# `@typescript/typescript-wasip1-wasm`

The TypeScript compiler and language server for `wasip1/wasm`, with helpers for
using the TypeScript API in JavaScript hosts.

The package contains one `tsc.wasm` module. Run it as a standard WASI command
for the compiler, `--lsp --stdio`, or `--api`:

```sh
wasmtime run --dir=.::/ node_modules/@typescript/typescript-wasip1-wasm/dist/tsc.wasm --version
```

Installing this package alongside `typescript` also lets the `tsc` JavaScript
launcher use the WASI module when a native platform package is unavailable.
That fallback requires Node.js 23 or newer.

The same module is a reactor for in-process API use:

```ts
import { API } from "typescript/unstable/async";
import {
    instantiateWasm,
    WasmTransport,
    wasmURL,
} from "@typescript/typescript-wasip1-wasm";

const response = await fetch(wasmURL);
const module = await WebAssembly.compileStreaming(response);
const instance = await instantiateWasm(module);

const transport = new WasmTransport({ instance });
const api = new API({ transport });
```

Use `typescript/unstable/sync` instead for the synchronous API.
