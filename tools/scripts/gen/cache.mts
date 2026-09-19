import { createHash } from "node:crypto";
import * as fs from "node:fs";
import path from "node:path";
import { x } from "tinyexec";
import { GeneratedFile } from "./generatedFile.mts";
import {
    goInputs,
    parseGeneratorArgs,
    repoRoot,
} from "./utils.mts";

export interface CacheOptions {
    inputs: string[];
    outputs: string[];
    commands: string[][];
    cwd?: string;
    exclude?: string[];
    envInputs?: string[];
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
    force = false,
}: CacheOptions): Promise<boolean> {
    if (!outputs.length || !commands.length || commands.some(command => !command.length)) {
        throw new Error("Cached generation requires outputs and nonempty commands.");
    }
    cwd = path.resolve(cwd);
    const snapshotInputs = () => {
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
                hash.update(JSON.stringify([file, createHash("sha256").update(fs.readFileSync(file)).digest("hex")]));
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
                environment: envInputs.map(name => [name, process.env[name]]),
            })
        );
    const previous = artifacts(outputFiles());
    const complete = () => outputs.every(pattern => expand([pattern], cwd).some(file => fs.statSync(file).isFile()));
    if (complete() && previous.every(file => file.isCurrent(force))) {
        console.log("Codegen outputs are up to date.");
        return true;
    }

    for (const file of previous) file.invalidate();
    for (const [command, ...args] of commands) {
        await x(command, args, { throwOnError: true, nodeOptions: { cwd, stdio: "inherit" } });
    }
    if (!complete()) throw new Error(`Generation did not produce all declared outputs: ${outputs.join(", ")}`);
    if (snapshotInputs().hash === before.hash) {
        for (const file of artifacts(outputFiles())) file.markCurrent();
    }
    console.log("Generated codegen outputs.");
    return false;
}

if (process.argv[1] === import.meta.filename) {
    const args = process.argv.slice(2);
    const cwd = process.env.npm_lifecycle_event === "cache" ? process.env.INIT_CWD ?? process.cwd() : process.cwd();
    const commandStart = args.indexOf("--command");
    const { values, force } = parseGeneratorArgs({
        input: { type: "string", multiple: true },
        output: { type: "string", multiple: true },
        exclude: { type: "string", multiple: true },
        env: { type: "string", multiple: true },
        cwd: { type: "string" },
    }, commandStart < 0 ? args : args.slice(0, commandStart));
    const commands: string[][] = [];
    if (commandStart >= 0) {
        for (const arg of args.slice(commandStart)) {
            if (arg === "--command") commands.push([]);
            else commands[commands.length - 1].push(arg);
        }
    }
    await cache({ inputs: values.input ?? [], outputs: values.output ?? [], commands, cwd: path.resolve(cwd, values.cwd ?? "."), exclude: values.exclude, envInputs: values.env, force });
}
