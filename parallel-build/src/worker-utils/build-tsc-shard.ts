import fs from "node:fs";
import * as path from "node:path";

import * as perf from "external-declarations/build/compiler/perf-tracer.js";
import {
    projectFilesTransformer,
} from "external-declarations/build/compiler/transform-project.js";
import ts, {} from "typescript";

import type {
    Message,
} from "../protocol.js";
import {
    taskNameLog,
} from "../utils.js";
import {
    installCache,
} from "./cache.js";
import {
    withTrace,
} from "./utils.js";

function assignFilesToShards(fileNames: string[], shardCount: number) {
    const tsFiles = fileNames.filter(f => (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".d.ts"));
    const dtsFiles = fileNames.filter(f => f.endsWith(".d.ts"));
    const fileStats = tsFiles.map(name => ({
        name,
        size: fs.statSync(name).size,
    })).sort((a, b) => b.size - a.size);

    const shardSizes: number[] = Array(shardCount).fill(0);
    const shardFiles: string[][] = Array.from({ length: shardCount }).map(() => []);

    const selectShard = () => shardSizes.reduce((minIndex, v, index) => shardSizes[minIndex] > v ? index : minIndex, 0);
    for (const file of fileStats) {
        const shardIndex = selectShard();
        shardSizes[shardIndex] += file.size;
        shardFiles[shardIndex].push(file.name);
    }
    return { dtsFiles, shardFiles };
}
function changeExtension(fileName: string, newExtension: string) {
    const index = fileName.lastIndexOf(".");
    return fileName.substring(0, index) + newExtension;
}

function installShardHost(parsedConfig: ts.ParsedCommandLine, host: ts.CompilerHost, value: Extract<Message, { type: "tsc-shard"; }>) {
    const shards = withTrace("shardFiles", () => assignFilesToShards(parsedConfig.fileNames, value.shardCount));
    const declarationFile = (f: string) => changeExtension(f, ".d.ts");
    const otherShardFiles = new Map<string, string>();
    const otherFilesReverseLookup = new Map<string, string>();

    shards.shardFiles.forEach((v, i) => {
        if (i !== value.shard) {
            v.forEach(f => {
                const declFileName = declarationFile(f);
                otherShardFiles.set(declFileName, f);
                otherFilesReverseLookup.set(f, declFileName);
            });
        }
    });

    const finalFiles = [...shards.dtsFiles, ...shards.shardFiles[value.shard]];
    parsedConfig.fileNames = finalFiles;
    const originalReadFile = host.readFile.bind(host);
    const originalFileExists = host.fileExists.bind(host);
    const rootPath = path.resolve(path.dirname(value.project));
    const transformer = projectFilesTransformer(rootPath, parsedConfig.options);
    const declarationHost = ts.createCompilerHost(parsedConfig.options, /*setParentNodes*/ true);
    installCache(declarationHost, () => true);

    host.fileExists = (fileName: string) => {
        if (otherFilesReverseLookup.has(fileName)) {
            // Hide original source files from the compiler
            return false;
        }
        const sourceFile = otherShardFiles.get(fileName);
        if (!sourceFile) {
            return originalFileExists(fileName);
        }
        return originalFileExists(sourceFile);
    };
    const declarationFileCache = new Map<string, string | false>();
    host.readFile = (fileName: string) => {
        const sourceFile = otherShardFiles.get(fileName);
        if (!sourceFile) {
            return originalReadFile(fileName);
        }
        if (originalFileExists(fileName)) {
            return originalReadFile(fileName);
        }

        const cachedResult = declarationFileCache.get(fileName);
        if (cachedResult) {
            return cachedResult;
        }
        if (cachedResult === false) {
            return undefined;
        }
        perf.tracer.current?.increment("generate-dts");
        return withTrace("generate-dts-time", () => {
            const outputDeclarationFile = transformer(sourceFile, declarationHost);
            const code = outputDeclarationFile ? host.readFile(outputDeclarationFile) : undefined;
            declarationFileCache.set(fileName, code ?? false);
            return code;
        });
    };
}
export function buildTSCShard(name: string, value: Extract<Message, { type: "tsc-shard"; }>) {
    const { parsedConfig, host } = withTrace("read-config", () => {
        const configFile = ts.readConfigFile(value.project, ts.sys.readFile);
        const rootPath = path.resolve(path.dirname(value.project));
        configFile.config.compilerOptions = {
            ...configFile.config.compilerOptions,
            ...value.tsconfigOverrides,
        };
        const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, rootPath);
        const host = ts.createCompilerHost(parsedConfig.options);
        installCache(host);
        return { parsedConfig, rootPath, host };
    });

    installShardHost(parsedConfig, host, value);

    const program = withTrace("create-program", () =>
        ts.createProgram({
            rootNames: parsedConfig.fileNames,
            options: parsedConfig.options,
            projectReferences: parsedConfig.projectReferences,
            host,
        }));

    const emitResult = value.tsconfigOverrides.noEmit ? undefined : withTrace("emit-js", () =>
        program.emit(
            /*targetSourceFile*/ undefined,
            /*writeFile*/ undefined,
            /*cancellationToken*/ undefined,
            /*emitOnly*/ !parsedConfig.options.declaration ? 0 as any : undefined, // Use undocumented emit only JS flag.
        ));
    const diagnostics = [
        ...withTrace("syntactic-diagnostic", () => program.getSyntacticDiagnostics()),
        ...withTrace("semantic-diagnostic", () => program.getSemanticDiagnostics()),
        ...withTrace("declaration-diagnostic", () => {
            try {
                return program.getDeclarationDiagnostics();
            }
            catch (e) {
                console.log(`${taskNameLog(name)}: Fatal Error ${(e as any).message}`);
                return [];
            }
        }),
        ...(emitResult?.diagnostics ?? []),
    ];

    if (diagnostics.length > 0) {
        console.log(`${taskNameLog(name)}: Has Errors ${diagnostics.length}`);
        diagnostics.forEach(diagnostic => {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
                console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                console.log(message);
            }
        });
    }
}
