// @module: commonjs
// @skipLibCheck: true
// @includebuiltfile: typescriptServices.d.ts
// @noImplicitAny:true
// @strictNullChecks:true

// @filename: node_modules/typescript/index.d.ts
declare module "typescript" {
    export = ts;
}

// @filename: APISample_parseConfig.ts
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var os: any;

import ts = require("typescript");

function printError(error: ts.Diagnostic): void {
    if (!error) {
        return;
    }
    console.log(`${error.file && error.file.fileName}: ${error.messageText}`);
}

export function createProgram(rootFiles: string[], compilerOptionsJson: string): ts.Program | undefined {
    const { config, error } = ts.parseConfigFileTextToJson("tsconfig.json", compilerOptionsJson)
    if (error) {
        printError(error);
        return undefined;
    }
    const basePath: string = process.cwd();
    const settings = ts.convertCompilerOptionsFromJson(config.config["compilerOptions"], basePath);
    if (!settings.options) {
        for (const err of settings.errors) {
            printError(err);
        }
        return undefined;
    }
    return ts.createProgram(rootFiles, settings.options);
}