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

export interface RunOptions {
    captureOutput?: boolean;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    signal?: AbortSignal;
}

function formatCommandArg(arg: string) {
    return arg && /^[\w@%+=:,./-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

export function run(command: string, args: readonly string[] = [], options: RunOptions = {}) {
    console.log("$ " + [command, ...args].map(formatCommandArg).join(" "));
    return x(command, args, {
        throwOnError: true,
        ...(options.signal ? { signal: options.signal } : {}),
        nodeOptions: {
            cwd: options.cwd,
            env: options.env ? { ...process.env, ...options.env } : undefined,
            stdio: options.captureOutput ? "pipe" : "inherit",
        },
    });
}

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
