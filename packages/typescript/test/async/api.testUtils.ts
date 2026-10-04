import {
    API,
    type APIOptions,
} from "@typescript/typescript/unstable/async";
import { fileURLToPath } from "node:url";
import { createVirtualFileSystem } from "../testUtils.ts";

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
