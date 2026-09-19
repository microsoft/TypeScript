import * as fs from "node:fs";
import path from "node:path";
import {
    parseArgs,
    type ParseArgsOptionsConfig,
} from "node:util";
import {
    x,
    xSync,
} from "tinyexec";

export const repoRoot = path.resolve(import.meta.dirname, "../../..");

export function globInputs(patterns: string[], exclude: string[] = []): string[] {
    return fs.globSync(patterns, { cwd: repoRoot, exclude }).map(file => path.join(repoRoot, file));
}

export function goInputs(): string[] {
    return [import.meta.filename, ...globInputs(["go.work", "go.work.sum", "{tsc,tools}/go.{mod,sum}"])];
}

export function resolveForce(force?: boolean, environment = process.env.TSGO_HEREBY_FORCE): boolean {
    return force ?? /^(1|true|yes|on)$/i.test(environment ?? "");
}

export function parseGeneratorArgs<const Options extends ParseArgsOptionsConfig>(options: Options, args = process.argv.slice(2)) {
    const { values } = parseArgs({
        args,
        options: { ...options, force: { type: "boolean" as const } },
        allowNegative: true,
    });
    return { values, force: resolveForce((values as { force?: boolean; }).force) };
}

export async function formatFiles(files: string[]): Promise<void> {
    await x("dprint", ["fmt", ...files], { throwOnError: true, nodeOptions: { cwd: repoRoot, stdio: "inherit" } });
}

export function formatFilesSync(files: string[]): void {
    xSync("dprint", ["fmt", ...files], { throwOnError: true, nodeOptions: { cwd: repoRoot, stdio: "inherit" } });
}
