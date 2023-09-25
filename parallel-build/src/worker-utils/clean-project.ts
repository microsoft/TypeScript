import * as fs from "node:fs";
import * as path from "node:path";

import ts, {} from "typescript";

import type {
    Message,
} from "../protocol.js";
import {
    withTrace,
} from "./utils.js";

export function cleanProjectOutput(value: Extract<Message, { type: "clean"; }>) {
    const { parsedConfig } = withTrace("read-config", () => {
        const configFile = ts.readConfigFile(value.project, ts.sys.readFile);
        const rootPath = path.dirname(value.project);
        configFile.config.compilerOptions = {
            ...configFile.config.compilerOptions,
            ...value.tsconfigOverrides,
        };
        const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, rootPath);

        return { parsedConfig };
    });

    const tsBuildInfo = value.project.substring(0, value.project.length - ".json".length) + ".tsbuildinfo";
    if (fs.existsSync(tsBuildInfo)) {
        fs.rmSync(tsBuildInfo);
    }
    if (parsedConfig.options.outDir && fs.existsSync(parsedConfig.options.outDir)) {
        fs.rmSync(parsedConfig.options.outDir, { recursive: true });
    }

    if (parsedConfig.options.declarationDir && fs.existsSync(parsedConfig.options.declarationDir)) {
        fs.rmSync(parsedConfig.options.declarationDir, { recursive: true });
    }
}
