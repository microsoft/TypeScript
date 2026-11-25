import {
    type CompilerOptions,
    ModuleDetectionKind,
    NewLineKind,
    type PluginImport,
    type RootedDirectoryPath,
    type RootedFilePath,
    type RootedPath,
    ScriptTarget,
} from "@typescript/typescript/async";
import assert from "node:assert/strict";
import { test } from "node:test";

test("compiler option types and enum values are available from the async API", () => {
    const paths: { directory?: RootedDirectoryPath; file?: RootedFilePath; project?: RootedPath; } = {};
    const plugin: PluginImport = { name: "test" };
    const options: CompilerOptions = {
        target: ScriptTarget.ESNext,
        moduleDetection: ModuleDetectionKind.Force,
        newLine: NewLineKind.LF,
        declarationDir: paths.directory,
        tsBuildInfoFile: paths.file,
        project: paths.project,
        plugins: [plugin],
    };
    assert.equal(options.target, ScriptTarget.ESNext);
    assert.equal(options.moduleDetection, ModuleDetectionKind.Force);
    assert.equal(options.newLine, NewLineKind.LF);
});
