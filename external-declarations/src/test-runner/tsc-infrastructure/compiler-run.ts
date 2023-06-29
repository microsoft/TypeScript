import { CompilerOptions, Diagnostic } from "typescript";
import * as ts from "typescript";
import { startsWith, map, compareStringsCaseSensitive, hasProperty } from "../../compiler/lang-utils";
import * as opts from "./options";
import * as TestCaseParser from "./test-file-parser";
import * as vfs from "./vfs";
import * as vpath from "./vpath";
import { parseCustomTypeOption, parseListTypeOption } from "./options";
import { fileExtensionIs, getNormalizedAbsolutePath, normalizeSlashes, toPath } from "../../compiler/path-utils";
import { cloneCompilerOptions, getEmitScriptTarget } from "../../compiler/utils";
import * as documents from './test-document';
import { createGetCanonicalFileName } from "../../compiler/path-utils";
import * as compiler from './compiler';
import * as fakes from './fakesHosts';
import { IO } from "./io";

interface HarnessOptions {
    useCaseSensitiveFileNames?: boolean;
    includeBuiltFile?: string;
    baselineFile?: string;
    libFiles?: string;
    noTypesAndSymbols?: boolean;
}

// Additional options not already in ts.optionDeclarations
const harnessOptionDeclarations: opts.CommandLineOption[] = [
    { name: "allowNonTsExtensions", type: "boolean", defaultValueDescription: false },
    { name: "useCaseSensitiveFileNames", type: "boolean", defaultValueDescription: false },
    { name: "baselineFile", type: "string" },
    { name: "includeBuiltFile", type: "string" },
    { name: "fileName", type: "string" },
    { name: "libFiles", type: "string" },
    { name: "noErrorTruncation", type: "boolean", defaultValueDescription: false },
    { name: "suppressOutputPathCheck", type: "boolean", defaultValueDescription: false },
    { name: "noImplicitReferences", type: "boolean", defaultValueDescription: false },
    { name: "currentDirectory", type: "string" },
    { name: "symlink", type: "string" },
    { name: "link", type: "string" },
    { name: "noTypesAndSymbols", type: "boolean", defaultValueDescription: false },
    // Emitted js baseline will print full paths for every output file
    { name: "fullEmitPaths", type: "boolean", defaultValueDescription: false },
];

let optionsIndex: Map<string, opts.CommandLineOption>;
function getCommandLineOption(name: string): opts.CommandLineOption | undefined {
    if (!optionsIndex) {
        optionsIndex = new Map<string, opts.CommandLineOption>();
        const optionDeclarations = harnessOptionDeclarations.concat(opts.optionDeclarations);
        for (const option of optionDeclarations) {
            optionsIndex.set(option.name.toLowerCase(), option);
        }
    }
    return optionsIndex.get(name.toLowerCase());
}
export function setCompilerOptionsFromHarnessSetting(settings: TestCaseParser.CompilerSettings, options: CompilerOptions & HarnessOptions): void {
    for (const name in settings) {
        if (hasProperty(settings, name)) {
            const value = settings[name];
            if (value === undefined) {
                throw new Error(`Cannot have undefined value for compiler option '${name}'.`);
            }
            const option = getCommandLineOption(name);
            if (option) {
                const errors: Diagnostic[] = [];
                options[option.name] = optionValue(option, value, errors);
                if (errors.length > 0) {
                    throw new Error(`Unknown value '${value}' for compiler option '${name}'.`);
                }
            }
        }
    }
}


function optionValue(option: opts.CommandLineOption, value: string, errors: Diagnostic[]): any {
    switch (option.type) {
        case "boolean":
            return value.toLowerCase() === "true";
        case "string":
            return value;
        case "number": {
            const numverValue = parseInt(value, 10);
            if (isNaN(numverValue)) {
                throw new Error(`Value must be a number, got: ${JSON.stringify(value)}`);
            }
            return numverValue;
        }
        // If not a primitive, the possible types are specified in what is effectively a map of options.
        case "list":
            return parseListTypeOption(option, value, errors);
        default:
            return parseCustomTypeOption(option as opts.CommandLineOptionOfCustomType, value, errors);
    }
}

export interface TestFile {
    unitName: string;
    content: string;
    fileOptions?: any;
}

export function compileFiles(
    inputFiles: TestFile[],
    otherFiles: TestFile[],
    harnessSettings: TestCaseParser.CompilerSettings | undefined,
    compilerOptions: ts.CompilerOptions | undefined,
    // Current directory is needed for rwcRunner to be able to use currentDirectory defined in json file
    currentDirectory: string | undefined,
    symlinks?: vfs.FileSet
): compiler.CompilationResult {
    const options: ts.CompilerOptions & HarnessOptions = compilerOptions ? cloneCompilerOptions(compilerOptions) : { noResolve: false };
    options.target = getEmitScriptTarget(options);
    options.newLine = options.newLine || ts.NewLineKind.CarriageReturnLineFeed;
    options.noErrorTruncation = true;
    options.skipDefaultLibCheck = typeof options.skipDefaultLibCheck === "undefined" ? true : options.skipDefaultLibCheck;

    if (typeof currentDirectory === "undefined") {
        currentDirectory = vfs.srcFolder;
    }

    // Parse settings
    if (harnessSettings) {
        setCompilerOptionsFromHarnessSetting(harnessSettings, options);
    }
    if (options.rootDirs) {
        options.rootDirs = map(options.rootDirs, d => getNormalizedAbsolutePath(d, currentDirectory));
    }

    const useCaseSensitiveFileNames = options.useCaseSensitiveFileNames !== undefined ? options.useCaseSensitiveFileNames : true;
    const programFileNames = inputFiles.map(file => file.unitName).filter(fileName => !fileExtensionIs(fileName, ts.Extension.Json));

    // Files from built\local that are requested by test "@includeBuiltFiles" to be in the context.
    // Treat them as library files, so include them in build, but not in baselines.
    if (options.includeBuiltFile) {
        programFileNames.push(vpath.combine(vfs.builtFolder, options.includeBuiltFile));
    }

    // Files from tests\lib that are requested by "@libFiles"
    if (options.libFiles) {
        for (const fileName of options.libFiles.split(",")) {
            programFileNames.push(vpath.combine(vfs.testLibFolder, fileName));
        }

    }
    const docs = inputFiles.concat(otherFiles).map(documents.TextDocument.fromTestFile);
    const fs = vfs.createFromFileSystem(IO, !useCaseSensitiveFileNames, { documents: docs, cwd: currentDirectory });
    if (symlinks) {
        fs.apply(symlinks);
    }
    const host = new fakes.CompilerHost(fs, options);
    const result = compiler.compileFiles(host, programFileNames, options);
    result.symlinks = symlinks;
    return result;
}


export function* iterateOutputs(outputFiles: Iterable<documents.TextDocument>): IterableIterator<[string, string]> {
    // Collect, test, and sort the fileNames
    const files = Array.from(outputFiles);
    files.slice().sort((a, b) => compareStringsCaseSensitive(cleanName(a.file), cleanName(b.file)));
    const dupeCase = new Map<string, number>();
    // Yield them
    for (const outputFile of files) {
        yield [checkDuplicatedFileName(outputFile.file, dupeCase), "/*====== " + outputFile.file + " ======*/\r\n" + Utils.removeByteOrderMark(outputFile.text)];
    }

    function cleanName(fn: string) {
        const lastSlash = normalizeSlashes(fn).lastIndexOf("/");
        return fn.substr(lastSlash + 1).toLowerCase();
    }
}

function checkDuplicatedFileName(resultName: string, dupeCase: Map<string, number>): string {
    resultName = sanitizeTestFilePath(resultName);
    if (dupeCase.has(resultName)) {
        // A different baseline filename should be manufactured if the names differ only in case, for windows compat
        const count = 1 + dupeCase.get(resultName)!;
        dupeCase.set(resultName, count);
        resultName = `${resultName}.dupe${count}`;
    }
    else {
        dupeCase.set(resultName, 0);
    }
    return resultName;
}

export function sanitizeTestFilePath(name: string) {
    const path = toPath(normalizeSlashes(name.replace(/[\^<>:"|?*%]/g, "_")).replace(/\.\.\//g, "__dotdot/"), "", Utils.canonicalizeForHarness);
    if (startsWith(path, "/")) {
        return path.substring(1);
    }
    return path;
}

export namespace Utils {
    export const canonicalizeForHarness = createGetCanonicalFileName(/*caseSensitive*/ false); // This is done so tests work on windows _and_ linux

    export function removeByteOrderMark(text: string): string {
        const length = getByteOrderMarkLength(text);
        return length ? text.slice(length) : text;
    }
    
    export function getByteOrderMarkLength(text: string): number {
        if (text.length >= 1) {
            const ch0 = text.charCodeAt(0);
            if (ch0 === 0xfeff) return 1;
            if (ch0 === 0xfe) return text.length >= 2 && text.charCodeAt(1) === 0xff ? 2 : 0;
            if (ch0 === 0xff) return text.length >= 2 && text.charCodeAt(1) === 0xfe ? 2 : 0;
            if (ch0 === 0xef) return text.length >= 3 && text.charCodeAt(1) === 0xbb && text.charCodeAt(2) === 0xbf ? 3 : 0;
        }
        return 0;
    }
    
    export function addUTF8ByteOrderMark(text: string) {
        return getByteOrderMarkLength(text) === 0 ? "\u00EF\u00BB\u00BF" + text : text;
    }
}