import { spawnSync } from "node:child_process";
import {
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const tscDir = path.join(repoRoot, "tsc");
export const tscBin = path.join(tscDir, "tsc");

/** Builds the `tsc` CLI from the current sources so the tests always exercise the checked-in implementation. */
export function buildTsc(): void {
    const result = spawnSync("go", ["build", "-o", "tsc", "./cmd/tsc"], { cwd: tscDir, encoding: "utf8" });
    if (result.status !== 0) {
        throw new Error(`Failed to build tsc:\n${result.stdout}\n${result.stderr}`);
    }
}

export interface CompileResult {
    /** Exit status of the `tsc` process. */
    status: number;
    /** Raw stdout produced by `tsc`. */
    stdout: string;
    /** Raw stderr produced by `tsc`. */
    stderr: string;
    /** Absolute path to the emit directory. */
    outDir: string;
    /** Returns true when the emitted file exists. */
    exists(fileName: string): boolean;
    /** Reads the emitted file as UTF-8. */
    read(fileName: string): string;
}

const defaultCompilerOptions = {
    target: "esnext",
    module: "esnext",
    moduleResolution: "bundler",
    declaration: true,
    strict: true,
    skipLibCheck: true,
    outDir: "out",
};

/**
 * Writes the provided files into a fresh temporary directory, runs the `tsc` CLI against them, and returns the
 * diagnostics together with helpers for inspecting the emitted output.
 */
export function compile(files: Record<string, string>, compilerOptions: Record<string, unknown> = {}): CompileResult {
    const dir = mkdtempSync(path.join(tmpdir(), "ts-module-expressions-"));

    for (const [fileName, contents] of Object.entries(files)) {
        const fullPath = path.join(dir, fileName);
        mkdirSync(path.dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, contents);
    }

    writeFileSync(
        path.join(dir, "tsconfig.json"),
        JSON.stringify({
            compilerOptions: { ...defaultCompilerOptions, ...compilerOptions },
            files: Object.keys(files),
        }),
    );

    const result = spawnSync(tscBin, ["-p", "tsconfig.json", "--pretty", "false"], { cwd: dir, encoding: "utf8" });
    const outDir = path.join(dir, "out");

    return {
        status: result.status ?? -1,
        stdout: result.stdout ?? "",
        stderr: result.stderr ?? "",
        outDir,
        exists: (fileName: string) => existsSync(path.join(outDir, fileName)),
        read: (fileName: string) => readFileSync(path.join(outDir, fileName), "utf8"),
    };
}

/** Returns the combined diagnostics reported by a compile result, stripped of trailing whitespace. */
export function diagnostics(result: CompileResult): string {
    return `${result.stdout}${result.stderr}`.trim();
}
