import { createHash } from "node:crypto";
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

const fileFingerprints = new Map<string, { stats: fs.BigIntStats; hash: string; }>();
let fileFingerprintCacheScopes = 0;
let activeFingerprintWriters = 0;

export function enableFileFingerprintCache(): () => void {
    fileFingerprintCacheScopes++;
    fileFingerprints.clear();
    let enabled = true;
    return () => {
        if (!enabled) return;
        enabled = false;
        fileFingerprintCacheScopes--;
        fileFingerprints.clear();
    };
}

export function invalidateFileFingerprints(file?: string): void {
    if (file === undefined) fileFingerprints.clear();
    else fileFingerprints.delete(path.resolve(file));
}

function beginFileFingerprintWrite(): () => void {
    activeFingerprintWriters++;
    invalidateFileFingerprints();
    return () => {
        activeFingerprintWriters--;
        invalidateFileFingerprints();
    };
}

export function getFileFingerprint(file: string, fresh = false): string {
    file = path.resolve(file);
    fresh ||= activeFingerprintWriters > 0;
    const previous = fileFingerprints.get(file);
    if (!fresh && fileFingerprintCacheScopes > 0 && previous) return previous.hash;
    const stats = fs.statSync(file, { bigint: true });
    if (
        !fresh && previous
        && previous.stats.dev === stats.dev
        && previous.stats.ino === stats.ino
        && previous.stats.size === stats.size
        && previous.stats.mtimeNs === stats.mtimeNs
        && previous.stats.ctimeNs === stats.ctimeNs
    ) {
        return previous.hash;
    }
    const hash = createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    fileFingerprints.set(file, { stats, hash });
    return hash;
}

export interface RunOptions {
    captureOutput?: boolean;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    signal?: AbortSignal;
}

export function formatCommandArg(arg: string) {
    return arg && /^[\w@%+=:,./-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

export async function run(command: string, args: readonly string[] = [], options: RunOptions = {}) {
    console.log("$ " + [command, ...args].map(formatCommandArg).join(" "));
    const finishWrite = beginFileFingerprintWrite();
    try {
        return await x(command, args, {
            throwOnError: true,
            ...(options.signal ? { signal: options.signal } : {}),
            nodeOptions: {
                cwd: options.cwd,
                env: options.env ? { ...process.env, ...options.env } : undefined,
                stdio: options.captureOutput ? "pipe" : "inherit",
            },
        });
    }
    finally {
        finishWrite();
    }
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
    const finishWrite = beginFileFingerprintWrite();
    try {
        await x("dprint", ["fmt", ...files], { throwOnError: true, nodeOptions: { cwd: repoRoot, stdio: "inherit" } });
    }
    finally {
        finishWrite();
    }
}

export function formatFilesSync(files: string[]): void {
    const finishWrite = beginFileFingerprintWrite();
    try {
        xSync("dprint", ["fmt", ...files], { throwOnError: true, nodeOptions: { cwd: repoRoot, stdio: "inherit" } });
    }
    finally {
        finishWrite();
    }
}
