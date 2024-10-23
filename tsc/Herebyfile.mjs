// @ts-check

import { $ as _$ } from "execa";
import { task } from "hereby";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { parseArgs } from "node:util";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const $pipe = _$({ verbose: "short" });
const $ = _$({ verbose: "short", stdio: "inherit" });

const { values: options } = parseArgs({
    args: process.argv.slice(2),
    options: {
        race: { type: "boolean" },
    },
    strict: false,
    allowPositionals: true,
    allowNegative: true,
});

const typeScriptSubmodulePath = path.join(__dirname, "_submodules", "TypeScript");

function assertTypeScriptCloned() {
    try {
        const stat = fs.statSync(path.join(typeScriptSubmodulePath, "package.json"));
        if (stat.isFile()) {
            return;
        }
    }
    catch {}

    throw new Error("_submodules/TypeScript does not exist; try running `git submodule update --init --recursive`");
}

export const build = task({
    name: "build",
    run: async () => {
        await $`go build -o ./bin/ ./cmd/...`;
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
        await $`go test ${options.race ? ["-race"] : []} ./...`;
        // Run the benchmarks once to ensure they compile and run without errors.
        await $`go test ${options.race ? ["-race"] : []} -run=- -bench=. -benchtime=1x ./...`;
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

export const postinstall = task({
    name: "postinstall",
    hiddenFromTaskList: true,
    run: () => {
        // Ensure the go command doesn't waste time looking into node_modules.
        // Remove once https://github.com/golang/go/issues/42965 is fixed.
        fs.writeFileSync(path.join(__dirname, "node_modules", "go.mod"), `module example.org/ignoreme\n`);
    },
});
