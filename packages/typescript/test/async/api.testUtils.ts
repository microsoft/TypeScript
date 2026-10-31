import {
    API as NativeAPI,
    type APIOptions,
} from "@typescript/typescript/async";
import { fileURLToPath } from "node:url";
import { createVirtualFileSystem } from "../testUtils.ts";
import { withWasm } from "../wasm.ts";

export const API = process.env.TS_API_TEST_WASM ? withWasm(NativeAPI) : NativeAPI;
export type API<FromLSP extends boolean = false> = NativeAPI<FromLSP>;

export const defaultFiles = {
    "/tsconfig.json": "{}",
    "/src/index.ts": `import { foo } from './foo';`,
    "/src/foo.ts": `export const foo = 42;`,
};

export function spawnAPI(files: Record<string, string> = { ...defaultFiles }, options: Omit<APIOptions, "cwd" | "fs"> = {}) {
    return new API({
        ...options,
        cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}
