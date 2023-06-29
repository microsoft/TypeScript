
import * as ts from 'typescript'
import { compileFiles, TestFile, Utils } from "./tsc-infrastructure/compiler-run";
import * as TestCaseParser from "./tsc-infrastructure/test-file-parser";
import * as fsp from 'fs/promises'
import { getDeclarationExtension, isDeclarationFile, isTypeScriptFile } from '../compiler/path-utils';
import { changeExtension } from './tsc-infrastructure/vpath';
import * as vpath from "./tsc-infrastructure/vpath";
import { libs } from './tsc-infrastructure/options';
import { ModuleKind } from 'typescript';
import { transformFile } from '../compiler/transform-file';

export interface FileContent {
    content: string,
    fileName: string
}

export async function loadTestCase(fileName: string) {
    const rawText = await fsp.readFile(fileName, { encoding: "utf-8" });
    const test = {
        content: Utils.removeByteOrderMark(rawText),
        file: fileName,
    }
    return Object.assign(TestCaseParser.makeUnitsFromTest(test.content, test.file), {
        BOM: rawText.substring(0, Utils.getByteOrderMarkLength(rawText))
    });
}
export function runTypeScript(caseData: TestCaseParser.TestCaseContent, settings: ts.CompilerOptions): FileContent[] {
    function createHarnessTestFile(lastUnit: TestCaseParser.TestUnitData): TestFile {
        return { unitName: lastUnit.name, content: lastUnit.content, fileOptions: lastUnit.fileOptions };
    }

    const toBeCompiled = caseData.testUnitData.map(unit => {
        return createHarnessTestFile(unit);
    });

    if (settings.isolatedDeclarations === undefined) {
        settings.isolatedDeclarations = true;
    }
    const result = compileFiles(toBeCompiled, [], {
        declaration: "true",
        // declarationMap: "true",
        removeComments: "false",
    }, settings, undefined);

    return caseData.testUnitData
        .filter(isRelevantTestFile)
        .flatMap(file => {
            const declarationFile = changeExtension(file.name, getDeclarationExtension(file.name));
            // const declarationMapFile = declarationFile + ".map";
            const resolvedDeclarationFile = vpath.resolve(result.vfs.cwd(), declarationFile);
            // const resolvedDeclarationMapFile = vpath.resolve(result.vfs.cwd(), declarationMapFile);
            const declaration = result.dts.get(resolvedDeclarationFile)
            // const declarationMap = result.maps.get(resolvedDeclarationMapFile)
            return [{
                content: declaration?.text ?? "",
                fileName: declarationFile,
            }
            // , {
            //     content: declarationMap?.text ?? "",
            //     fileName: declarationMapFile,
            // }
            ];
        })
}
export function isRelevantTestFile(f: TestCaseParser.TestUnitData) {
    return isTypeScriptFile(f.name) && !isDeclarationFile(f.name) && f.content !== undefined
}


export function runIsolated(caseData: TestCaseParser.TestCaseContent, libFiles: string[], settings: ts.CompilerOptions): FileContent[] {
    const toSrc = (n: string) => vpath.combine('/src', n);
    const projectFiles = [...caseData.testUnitData.map(o => toSrc(o.name)), ...libFiles];
    settings = {
        ...settings,
        isolatedDeclarations: true,
    }

    const packageJson = caseData.testUnitData.find(f => f.name === "/package.json");
    let packageResolution: ts.ResolutionMode = ts.ModuleKind.CommonJS
    if (packageJson) {
        packageResolution = JSON.parse(packageJson.content)?.type === "module" ? ModuleKind.ESNext : ModuleKind.CommonJS
    }

    const results = caseData.testUnitData
        .filter(isRelevantTestFile)
        .map(file => {
            const sourceFile = ts.createSourceFile(toSrc(file.name), Utils.removeByteOrderMark(file.content), settings.target ?? ts.ScriptTarget.ES2015, true,
                file.name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
            const declaration = transformFile(sourceFile, projectFiles, libs, settings, packageResolution)
            return {
                content: declaration.code,
                fileName: changeExtension(file.name, getDeclarationExtension(file.name)),
            };
        })
    return results;
}


