import { createHash } from "node:crypto";
import * as fs from "node:fs";
import path from "node:path";
import { GeneratedFile } from "./generatedFile.mts";
import {
    formatCommandArg,
    getFileFingerprint,
    goInputs,
    repoRoot,
    run,
} from "./utils.mts";

export interface CacheOptions {
    inputs: string[];
    outputs: string[];
    commands: string[][];
    cwd?: string;
    exclude?: string[];
    envInputs?: string[];
    env?: NodeJS.ProcessEnv;
    force?: boolean;
}

function expand(patterns: string[], cwd: string, exclude: string[] = []) {
    return [...new Set(fs.globSync(patterns, { cwd, exclude }).map(file => path.resolve(cwd, file)))].sort();
}

export default async function cache({
    inputs,
    outputs,
    commands,
    cwd = process.cwd(),
    exclude = [],
    envInputs = ["GOOS", "GOARCH", "GOFLAGS", "GOTOOLCHAIN", "GOEXPERIMENT", "CGO_ENABLED", "GOWORK"],
    env,
    force = false,
}: CacheOptions): Promise<boolean> {
    if (!outputs.length || !commands.length || commands.some(command => !command.length)) {
        throw new Error("Cached generation requires outputs and nonempty commands.");
    }
    cwd = path.resolve(cwd);
    const environment = { ...process.env, ...env };
    const snapshotInputs = (fresh = false) => {
        const entries = [
            ...new Set([
                import.meta.filename,
                path.join(import.meta.dirname, "generatedFile.mts"),
                path.join(repoRoot, "package-lock.json"),
                path.join(repoRoot, ".dprint.jsonc"),
                ...goInputs(),
                ...inputs.flatMap(pattern => {
                    const matches = expand([pattern], cwd, exclude);
                    if (!matches.length) throw new Error(`No inputs matched: ${pattern}`);
                    return matches;
                }),
            ]),
        ].sort();
        const files: string[] = [];
        const hash = createHash("sha256");
        for (const file of entries) {
            if (fs.statSync(file).isDirectory()) {
                hash.update(JSON.stringify([file, "directory"]));
            }
            else {
                files.push(file);
                hash.update(JSON.stringify([file, getFileFingerprint(file, fresh)]));
            }
        }
        return { files, hash: hash.digest("hex") };
    };
    const before = snapshotInputs();
    const outputFiles = () => expand(outputs, cwd).filter(file => fs.statSync(file).isFile());
    const artifacts = (files: string[]) =>
        files.map(file =>
            new GeneratedFile(file, before.files, undefined, {
                cwd,
                commands,
                inputs,
                outputs,
                exclude,
                inputHash: before.hash,
                outputFiles: files,
                environment: envInputs.map(name => [name, environment[name]]),
            })
        );
    const previous = artifacts(outputFiles());
    const complete = () => outputs.every(pattern => expand([pattern], cwd).some(file => fs.statSync(file).isFile()));
    const commandText = commands.map(command => command.map(formatCommandArg).join(" ")).join("; ");
    if (complete() && previous.every(file => file.isCurrent(force))) {
        console.log(`skipped ${commandText}: codegen outputs are already up to date`);
        return true;
    }
    for (const file of previous) file.invalidate();
    for (const [command, ...args] of commands) {
        await run(command, args, { cwd, env: environment });
    }
    if (!complete()) throw new Error(`Generation did not produce all declared outputs: ${outputs.join(", ")}`);
    if (snapshotInputs(true).hash === before.hash) {
        for (const file of artifacts(outputFiles())) file.markCurrent();
    }
    return false;
}
