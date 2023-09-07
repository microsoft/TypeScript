import * as ts from "typescript";
import { Path } from "typescript";

import { find, forEach, orderedRemoveItemAt } from "../../compiler/lang-utils";
import { getBaseFileName, getDirectoryPath, getNormalizedAbsolutePath, normalizePath } from "../../compiler/path-utils";
import * as vfs from "./vfs";

/** all the necessary information to set the right compiler settings */
export interface CompilerSettings {
    [name: string]: string;
}
/** All the necessary information to turn a multi file test into useful units for later compilation */
export interface TestUnitData {
    content: string;
    name: string;
    fileOptions: any;
    originalFilePath: string;
    references: string[];
    startLine: number;
    endLine: number;
}
export interface ParseConfigHost {
    useCaseSensitiveFileNames: boolean;

    readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];

    /**
     * Gets a value indicating whether the specified path exists and is a file.
     * @param path The path to test.
     */
    fileExists(path: string): boolean;

    readFile(path: string): string | undefined;
    trace?(s: string): void;
}

const optionRegex = /^[/]{2}\s*@(\w+)\s*:\s*([^\r\n]*)/gm; // multiple matches on multiple lines
const linkRegex = /^[/]{2}\s*@link\s*:\s*([^\r\n]*)\s*->\s*([^\r\n]*)/gm; // multiple matches on multiple lines

export function extractCompilerSettings(content: string): CompilerSettings {
    const opts: CompilerSettings = {};

    let match: RegExpExecArray | null;
    while ((match = optionRegex.exec(content)) !== null) { // eslint-disable-line no-null/no-null
        opts[match[1]] = match[2].trim();
    }

    return opts;
}

/** Splits the given string on \r\n, or on only \n if that fails, or on only \r if *that* fails. */
export function splitContentByNewlines(content: string) {
    const split = (delimiter: string) => Object.assign(content.split(delimiter), { delimiter });
    // Split up the input file by line
    // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
    // we have to use string-based splitting instead and try to figure out the delimiting chars
    let lines = split("\r\n");
    if (lines.length === 1) {
        lines = split("\n");

        if (lines.length === 1) {
            lines = split("\r");
        }
    }
    return lines;
}


export function getConfigNameFromFileName(filename: string): "tsconfig.json" | "jsconfig.json" | undefined {
    const flc = getBaseFileName(filename).toLowerCase();
    return find(["tsconfig.json" as const, "jsconfig.json" as const], x => x === flc);
}


export function parseSymlinkFromTest(line: string, symlinks: vfs.FileSet | undefined) {
    const linkMetaData = linkRegex.exec(line);
    linkRegex.lastIndex = 0;
    if (!linkMetaData) return undefined;

    if (!symlinks) symlinks = {};
    symlinks[linkMetaData[2].trim()] = new vfs.Symlink(linkMetaData[1].trim());
    return symlinks;
}


export interface TestCaseContent {
    settings: CompilerSettings;
    testUnitData: TestUnitData[];
    tsConfig: ts.ParsedCommandLine | undefined;
    tsConfigFileUnitData: TestUnitData | undefined;
    symlinks?: vfs.FileSet;
    code: string;
}

/** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
export function makeUnitsFromTest(code: string, fileName: string, rootDir?: string, settings = extractCompilerSettings(code)): TestCaseContent {
    // List of all the subfiles we've parsed out
    const testUnitData: TestUnitData[] = [];

    const lines = splitContentByNewlines(code);

    // Stuff related to the subfile we're parsing
    let currentFileContent: string | undefined;
    let currentFileOptions: any = {};
    let currentFileName: any;
    let currentFileStartLine = 0;
    let currentFileEndLine = 0;
    let refs: string[] = [];
    let symlinks: vfs.FileSet | undefined;
    let lineIndex = -1;
    for (const line of lines) {
        lineIndex++;
        let testMetaData: RegExpExecArray | null;
        const possiblySymlinks = parseSymlinkFromTest(line, symlinks);
        if (possiblySymlinks) {
            symlinks = possiblySymlinks;
        }
        else if (testMetaData = optionRegex.exec(line)) {
            // Comment line, check for global/file @options and record them
            optionRegex.lastIndex = 0;
            const metaDataName = testMetaData[1].toLowerCase();
            currentFileOptions[testMetaData[1]] = testMetaData[2].trim();
            if (metaDataName !== "filename") {
                continue;
            }

            // New metadata statement after having collected some code to go with the previous metadata
            if (currentFileName) {
                // Store result file
                const newTestFile = {
                    content: currentFileContent!, // TODO: GH#18217
                    name: currentFileName,
                    fileOptions: currentFileOptions,
                    originalFilePath: fileName,
                    references: refs,
                    startLine: currentFileStartLine,
                    endLine: currentFileEndLine,
                };
                testUnitData.push(newTestFile);

                // Reset local data
                currentFileContent = undefined;
                currentFileOptions = {};
                currentFileName = testMetaData[2].trim();
                currentFileStartLine = lineIndex + 1;
                refs = [];
            }
            else {
                // First metadata marker in the file
                currentFileName = testMetaData[2].trim();
                currentFileStartLine = lineIndex + 1;
                currentFileContent = undefined;
            }
        }
        else {
            currentFileEndLine = lineIndex;
            // Subfile content line
            // Append to the current subfile content, inserting a newline needed
            if (currentFileContent === undefined) {
                currentFileContent = "";
                currentFileStartLine = lineIndex;
            }
            else {
                // End-of-line
                currentFileContent = currentFileContent + "\n";
            }
            currentFileContent = currentFileContent + line;
        }
    }

    // normalize the fileName for the single file case
    currentFileName = testUnitData.length > 0 || currentFileName ? currentFileName : getBaseFileName(fileName);

    // EOF, push whatever remains
    const newTestFile2 = {
        content: currentFileContent || "",
        name: currentFileName,
        fileOptions: currentFileOptions,
        originalFilePath: fileName,
        references: refs,
        startLine: currentFileStartLine,
        endLine: currentFileEndLine,
    };
    testUnitData.push(newTestFile2);

    // unit tests always list files explicitly
    const parseConfigHost: ts.ParseConfigHost = {
        useCaseSensitiveFileNames: false,
        readDirectory: () => [],
        fileExists: () => true,
        readFile: (name) => forEach(testUnitData, data => data.name.toLowerCase() === name.toLowerCase() ? data.content : undefined)
    };

    // check if project has tsconfig.json in the list of files
    let tsConfig: ts.ParsedCommandLine | undefined;
    let tsConfigFileUnitData: TestUnitData | undefined;
    for (let i = 0; i < testUnitData.length; i++) {
        const data = testUnitData[i];
        if (getConfigNameFromFileName(data.name)) {
            const configJson = ts.parseJsonText(data.name, data.content);
            let baseDir = normalizePath(getDirectoryPath(data.name));
            if (rootDir) {
                baseDir = getNormalizedAbsolutePath(baseDir, rootDir);
            }
            tsConfig = ts.parseJsonSourceFileConfigFileContent(configJson, parseConfigHost, baseDir);
            tsConfig.options.configFilePath = data.name as Path;
            tsConfigFileUnitData = data;

            // delete entry from the list
            orderedRemoveItemAt(testUnitData, i);

            break;
        }
    }
    return { settings, testUnitData, tsConfig, tsConfigFileUnitData, symlinks, code };
}
