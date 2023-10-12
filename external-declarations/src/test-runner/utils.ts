import * as fsp from "fs/promises";
import * as path from "path";
import * as ts from "typescript";

import {
    getDeclarationExtension,
    isDeclarationFile,
    isTypeScriptFile,
} from "../compiler/path-utils";
import {
    compileFiles,
    TestFile,
    Utils,
} from "./tsc-infrastructure/compiler-run";
import {
    libs,
} from "./tsc-infrastructure/options";
import * as TestCaseParser from "./tsc-infrastructure/test-file-parser";
import {
    changeExtension,
} from "./tsc-infrastructure/vpath";
import * as vpath from "./tsc-infrastructure/vpath";

export interface TestCompilationResult {
    files: readonly FileContent[];
    diagnostics: readonly ts.Diagnostic[] | Error;
}
export interface FileContent {
    readonly content: string;
    readonly fileName: string;
}

export interface TestCaseWithBOM extends Awaited<ReturnType<typeof loadTestCase>> {
}
export async function loadTestCase(fileName: string) {
    const rawText = await fsp.readFile(fileName, { encoding: "utf-8" });
    const test = {
        content: Utils.removeByteOrderMark(rawText),
        file: fileName,
    };
    return Object.assign(TestCaseParser.makeUnitsFromTest(test.content, test.file), {
        BOM: rawText.substring(0, Utils.getByteOrderMarkLength(rawText)),
    });
}

export function runTypeScript(caseData: TestCaseParser.TestCaseContent, settings: ts.CompilerOptions): TestCompilationResult {
    function createHarnessTestFile(lastUnit: TestCaseParser.TestUnitData): TestFile {
        return { unitName: lastUnit.name, content: lastUnit.content, fileOptions: lastUnit.fileOptions };
    }

    const toBeCompiled = caseData.testUnitData.map(unit => {
        return createHarnessTestFile(unit);
    });

    const result = compileFiles(toBeCompiled, [], {
        declaration: "true",
        // declarationMap: "true",
        removeComments: "false",
    }, settings);

    const files = caseData.testUnitData
        .filter(isRelevantTestFile)
        .flatMap(file => {
            const declarationFile = changeExtension(file.name, getDeclarationExtension(file.name));
            const resolvedDeclarationFile = vpath.resolve(result.vfs.cwd(), declarationFile);
            const declaration = result.dts.get(resolvedDeclarationFile);
            return [{
                content: declaration?.text ?? "",
                fileName: declarationFile,
            }];
        });
    return {
        files,
        diagnostics: result.diagnostics,
    };
}
export function isRelevantTestFile(f: TestCaseParser.TestUnitData) {
    return isTypeScriptFile(f.name) && !isDeclarationFile(f.name) && f.content !== undefined;
}

export function runDeclarationTransformEmitter(caseData: TestCaseParser.TestCaseContent, libFiles: string[], settings: ts.CompilerOptions): TestCompilationResult {
    const toSrc = (n: string) => vpath.combine("/src", n);
    const projectFiles = [...caseData.testUnitData.map(o => toSrc(o.name)), ...libFiles];
    settings = {
        ...settings,
        isolatedDeclarations: true,
    };

    const diagnostics: ts.Diagnostic[] = [];
    const files = caseData.testUnitData
        .filter(isRelevantTestFile)
        .map(file => {
            const sourceFile = ts.createSourceFile(
                toSrc(file.name),
                Utils.removeByteOrderMark(file.content),
                settings.target ?? ts.ScriptTarget.ES2015,
                /*setParentNodes*/ true,
                file.name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
            );
            const declaration = ts.emitDeclarationsForFile(sourceFile, projectFiles, libs, settings);
            diagnostics.push(...declaration.diagnostics);
            return {
                content: settings.emitBOM ? Utils.addUTF8ByteOrderMark(declaration.code) : declaration.code,
                fileName: changeExtension(file.name, getDeclarationExtension(file.name)),
            };
        });
    return { files, diagnostics };
}

export async function readDirRecursive(dir: string, relativePath = ""): Promise<string[]> {
    const content = await fsp.readdir(dir);
    const result: string[] = [];
    for (const entry of content) {
        const relativeChildPath = path.join(relativePath, entry);
        const fsPath = path.join(dir, entry);
        const stat = await fsp.stat(fsPath);
        if (stat.isDirectory()) {
            result.push(...await readDirRecursive(fsPath, relativeChildPath));
        }
        else {
            result.push(relativeChildPath);
        }
    }
    return result;
}
