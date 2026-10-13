import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import {
    dirname,
    join,
    resolve,
} from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
export const artifactRoot = fileURLToPath(new URL("../", import.meta.url));
export const runtimeRoot = resolve(process.env.API_BENCHMARK_ROOT ?? join(artifactRoot, "runtime"));
export const outputRoot = resolve(process.env.API_OUTPUT_DIR ?? join(artifactRoot, "runs"));
export const generatedRoot = join(outputRoot, "generated");
export const caseRoot = join(runtimeRoot, "cases", process.env.API_BENCHMARK_CASE ?? "files-1024-layout-even-rules-recommended-singlerun-false-types-native");
export const clientRoot = resolve(process.env.API_CLIENT_ROOT ?? join(repoRoot, "packages/typescript"));
export const binary = resolve(process.env.API_BINARY ?? join(repoRoot, "built/local/tsc"));
export const variantNames = new Set(["scanner-pool", "pooled-buffers", "handle-cache", "string-cache", "method-sidecar", "bound-methods"]);

export function checkVariant(variant) {
    if (variant === "baseline" || variant === "") return;
    const names = variant.split(",");
    if (names.some(name => !variantNames.has(name)) || new Set(names).size !== names.length) throw new Error(`Invalid variant: ${variant}`);
    if (names.includes("method-sidecar") && names.includes("bound-methods")) throw new Error("method-sidecar and bound-methods replace the same module");
}

export function eslintCLI() {
    const path = createRequire(join(runtimeRoot, "package.json")).resolve("eslint/package.json");
    const manifest = JSON.parse(readFileSync(path, "utf8"));
    return join(dirname(path), manifest.bin.eslint);
}
