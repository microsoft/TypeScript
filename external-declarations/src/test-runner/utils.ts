import * as fsp from "fs/promises";
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
    readonly declarationMap: string | undefined;
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
        declarationMap: "true",
        removeComments: "false",
    }, settings);

    const files = caseData.testUnitData
        .filter(isRelevantTestFile)
        .flatMap(file => {
            const declarationFile = changeExtension(file.name, getDeclarationExtension(file.name));
            const resolvedDeclarationFile = vpath.resolve(result.vfs.cwd(), declarationFile);
            const declaration = result.dts.get(resolvedDeclarationFile);
            const declarationMap = result.maps.get(resolvedDeclarationFile + ".map");
            return [{
                content: declaration?.text ?? "",
                fileName: declarationFile,
                declarationMap: declarationMap?.text ?? "",
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

export function runDeclarationTransformEmitter(caseData: TestCaseParser.TestCaseContent, settings: ts.CompilerOptions): TestCompilationResult {
    settings = {
        ...settings,
        isolatedDeclarations: true,
    };

    const diagnostics: ts.Diagnostic[] = [];
    const files = caseData.testUnitData
        .filter(isRelevantTestFile)
        .map(file => {
            const sourceFile = ts.createSourceFile(
                file.name,
                Utils.removeByteOrderMark(file.content),
                settings.target ?? ts.ScriptTarget.ES2015,
                /*setParentNodes*/ true,
                file.name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
            );
            const { code, diagnostics, declarationMap } = ts.emitDeclarationsForFile(sourceFile, settings);
            diagnostics.push(...diagnostics);
            return {
                content: settings.emitBOM ? Utils.addUTF8ByteOrderMark(code) : code,
                fileName: changeExtension(file.name, getDeclarationExtension(file.name)),
                declarationMap,
            };
        });
    return { files, diagnostics };
}
