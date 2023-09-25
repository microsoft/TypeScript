import * as path from "node:path";

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

const logErrors = process.argv.indexOf("--log-errors") !== -1;

export function buildTSC(name: string, value: Extract<Message, { type: "tsc"; }>) {
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
