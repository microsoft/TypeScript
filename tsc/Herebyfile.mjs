// @ts-check

import { $ as _$ } from "execa";
import { task } from "hereby";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const $pipe = _$({ verbose: "short" });
const $ = _$({ verbose: "short", stdio: "inherit" });

const typeScriptSubmodulePath = path.join(__dirname, "_submodules", "TypeScript");

function assertTypeScriptCloned() {
    try {
        const stat = fs.statSync(path.join(typeScriptSubmodulePath, "package.json"));
        if (stat.isFile()) {
            return;
        }
    }
    catch {}

    console.error("_submodules/TypeScript does not exist; try running `git submodule update --init --recursive`");
    process.exit(1);
}

export const build = task({
    name: "build",
    run: async () => {
        await $`go build ./...`;
    },
});

export const generate = task({
    name: "generate",
    run: async () => {
        assertTypeScriptCloned();
        await $`go generate ./...`;
    },
});

export const test = task({
    name: "test",
    run: async () => {
        assertTypeScriptCloned();
        await $`go test -bench=. -benchtime=1x ./...`;
    },
});

export const lint = task({
    name: "lint",
    run: async () => {
        await $`go vet ./...`;
    },
});

export const format = task({
    name: "format",
    run: async () => {
        await $`dprint fmt`;
    },
});

export const checkFormat = task({
    name: "check:format",
    run: async () => {
        await $`dprint check`;
    },
});
