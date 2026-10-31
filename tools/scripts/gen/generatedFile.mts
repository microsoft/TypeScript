import { createHash } from "node:crypto";
import * as fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
    getFileFingerprint,
    invalidateFileFingerprints,
    repoRoot,
} from "./utils.mts";

const commonInputs = [
    import.meta.filename,
    path.join(import.meta.dirname, "utils.mts"),
    path.join(repoRoot, "package-lock.json"),
    path.join(repoRoot, ".dprint.jsonc"),
];

function digest(value: string | Buffer): string {
    return createHash("sha256").update(value).digest("hex");
}

export const defaultCacheDirectory = path.join(os.tmpdir(), "typescript-codegen", digest(repoRoot));

function readIfExists(file: string): Buffer | undefined {
    try {
        return fs.readFileSync(file);
    }
    catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
}

export class GeneratedFile {
    readonly fileName: string;
    private readonly inputs: readonly string[];
    private readonly inputHash: string;
    private readonly cacheFile: string;
    private readonly key: unknown;

    constructor(fileName: string, inputs: readonly string[], cacheDirectory = defaultCacheDirectory, key?: unknown) {
        this.fileName = path.resolve(fileName);
        this.inputs = [...new Set([...commonInputs, ...inputs].map(file => path.resolve(file)))].sort();
        this.key = key;
        this.inputHash = this.hashInputs();
        this.cacheFile = path.join(cacheDirectory, digest(this.fileName) + ".json");
    }

    private hashInputs(fresh = false): string {
        return digest(JSON.stringify([
            process.version,
            process.platform,
            process.arch,
            this.key,
            this.inputs.map(file => [file, getFileFingerprint(file, fresh)]),
        ]));
    }

    private state(output: Buffer): string {
        return JSON.stringify([this.inputHash, digest(output)]);
    }

    isCurrent(force = false): boolean {
        if (force) return false;
        const output = readIfExists(this.fileName);
        return output !== undefined && readIfExists(this.cacheFile)?.toString() === this.state(output);
    }

    invalidate(): void {
        invalidateFileFingerprints(this.fileName);
        fs.rmSync(this.cacheFile, { force: true });
    }

    write(content: string): void {
        this.invalidate();
        fs.mkdirSync(path.dirname(this.fileName), { recursive: true });
        fs.writeFileSync(this.fileName, content);
    }

    markCurrent(): void {
        invalidateFileFingerprints(this.fileName);
        if (this.inputHash !== this.hashInputs(true)) return;
        const state = this.state(fs.readFileSync(this.fileName));
        fs.mkdirSync(path.dirname(this.cacheFile), { recursive: true });
        fs.writeFileSync(this.cacheFile, state);
    }
}
