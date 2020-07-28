// @experimentalWasmModules: true
// @target: es2020
// @moduleResolution: node
import * as mod from "/.lib/test.wasm";

let running = 0;
for (let i = 0; i < 10; i++) {
    running += mod.addTwo(i, i);
}
