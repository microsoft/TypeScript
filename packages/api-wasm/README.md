# `@typescript/api-wasm`

WebAssembly transport for the TypeScript API.

```ts
import { API } from "typescript/unstable/async";
import {
    instantiateWasm,
    WasmTransport,
    wasmURL,
} from "@typescript/api-wasm";

const response = await fetch(wasmURL);
const module = await WebAssembly.compileStreaming(response);
const instance = await instantiateWasm(module);

const transport = new WasmTransport({ instance });
const api = new API({ transport });
```

Use `typescript/unstable/sync` instead for the synchronous API.
