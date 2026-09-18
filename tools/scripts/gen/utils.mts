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

export function goEnvironment(): Record<string, string | undefined> {
    return Object.fromEntries(["GOOS", "GOARCH", "GOFLAGS", "GOTOOLCHAIN", "GOEXPERIMENT", "CGO_ENABLED", "GOWORK"].map(name => [name, process.env[name]]));
}

export function resolveForce(force?: boolean, environment = process.env.TSGO_HEREBY_FORCE): boolean {
    return force ?? /^(1|true|yes|on)$/i.test(environment ?? "");
}

export function parseGeneratorArgs<const Options extends ParseArgsOptionsConfig>(options: Options, args = process.argv.slice(2), goStyle = false) {
    const { values, positionals, tokens } = parseArgs({
        args: goStyle ? args.map(arg => arg.replace(/^-(?=[a-z])/, "--")) : args,
        options: { ...options, force: { type: "boolean" as const } },
        allowPositionals: goStyle,
        allowNegative: true,
        tokens: true,
    });
    const toolArgs = tokens.flatMap(token => {
        if (token.kind === "positional") return [token.value];
        if (token.kind !== "option" || ["force", "no-force", "input"].includes(token.name)) return [];
        return args.slice(token.index, token.index + (token.value !== undefined && !token.inlineValue ? 2 : 1));
    });
    return { values, positionals, toolArgs, force: resolveForce((values as { force?: boolean; }).force) };
}

export async function runGo(args: string[], cwd = repoRoot): Promise<void> {
    await x("go", args, { throwOnError: true, nodeOptions: { cwd, stdio: "inherit" } });
}

export async function formatFiles(files: string[]): Promise<void> {
    await x("dprint", ["fmt", ...files], { throwOnError: true, nodeOptions: { cwd: repoRoot, stdio: "inherit" } });
}

export function formatFilesSync(files: string[]): void {
    xSync("dprint", ["fmt", ...files], { throwOnError: true, nodeOptions: { cwd: repoRoot, stdio: "inherit" } });
}
