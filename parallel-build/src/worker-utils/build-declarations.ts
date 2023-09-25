import * as path from "node:path";

import {
    transformProject,
} from "external-declarations/build/compiler/transform-project.js";
import ts, {
    CompilerOptions,
} from "typescript";

import type {
    Message,
} from "../protocol.js";
import {
    installCache,
} from "./cache.js";
import {
    withTrace,
} from "./utils.js";

export function buildDeclarations(name: string, value: Extract<Message, { type: "declaration"; }>) {
    const { host, parsedConfig, rootPath } = withTrace("read-config", () => {
        const configFile = ts.readConfigFile(value.project, ts.sys.readFile);
        const rootPath = path.resolve(path.dirname(value.project));
        const compilerOptions: CompilerOptions = configFile.config.compilerOptions = {
            ...configFile.config.compilerOptions,
            ...value.tsconfigOverrides,
            isolatedDeclarations: true,
        };
        configFile.config.compilerOptions = compilerOptions;
        const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, rootPath);
        const host = ts.createCompilerHost(parsedConfig.options, /*setParentNodes*/ true);
        installCache(host);
        return { rootPath, parsedConfig, host };
    });

    transformProject(
        rootPath,
        /*files*/ undefined,
        parsedConfig.options,
        host,
    );
}
