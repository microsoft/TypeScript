import { TextDocument } from "./documents";
import { TextWriter } from "./textWriter";
import * as ts from "./api";
import * as vpath from "./vpath";
import { getLinesAndLineStarts } from "./utils";

const optionRegExp = /^\/{2}\s*@(\w+)\s*:\s*(.*?)\s*$/;

export interface TestCaseOptions extends ts.CompilerOptions {
    allowNonTsExtensions?: boolean;
    baselineFile?: string;
    currentDirectory?: string;
    fullEmitPaths?: boolean;
    includeBuiltFile?: string;
    libFiles?: string[];
    noErrorTruncation?: boolean;
    noImplicitReferences?: boolean;
    noSymbolsBaseline?: boolean;
    noTypesBaseline?: boolean;
    useCaseSensitiveFileNames?: boolean;
}

export interface TestCaseParseResult {
    meta: Map<string, any>;
    options: TestCaseOptions;
    documents: TextDocument[];
}

const testCaseOptions: ts.CommandLineOption[] = [
    { name: "allowNonTsExtensions", type: "boolean" },
    { name: "baselineFile", type: "string" },
    { name: "currentDirectory", type: "string" },
    { name: "fullEmitPaths", type: "boolean" }, // Emitted js baseline will print full paths for every output file
    { name: "includeBuiltFile", type: "string" },
    { name: "libFiles", type: "list", element: { name: "libFiles", type: "string" } },
    { name: "suppressOutputPathCheck", type: "boolean" },
    { name: "noErrorTruncation", type: "boolean" },
    { name: "noImplicitReferences", type: "boolean" },
    { name: "noSymbolsBaseline", type: "boolean" },
    { name: "noTypesBaseline", type: "boolean" },
    { name: "useCaseSensitiveFileNames", type: "boolean" },
];

let testCaseOptionsMap: Map<string, ts.CommandLineOption> | undefined;
function getCommandLineOption(name: string) {
    if (!testCaseOptionsMap) {
        testCaseOptionsMap = new Map<string, ts.CommandLineOption>();
        for (const opt of testCaseOptions) {
            testCaseOptionsMap.set(opt.name.toLowerCase(), opt);
        }
        for (const opt of ts.optionDeclarations) {
            testCaseOptionsMap.set(opt.name.toLowerCase(), opt);
        }
    }
    return testCaseOptionsMap.get(name.toLowerCase());
}

function parseOption(opt: ts.CommandLineOption, value: string, diagnostics: ts.Diagnostic[]) {
    switch (opt.type) {
        case "boolean":
            return value.toLowerCase() === "true";
        case "string":
            return value;
        case "number":
            const number = parseInt(value, 10);
            if (isNaN(number)) throw new Error(`Value must be a number, got: ${JSON.stringify(value)}`);
            return number;
        case "list":
            return ts.parseListTypeOption(<ts.CommandLineOptionOfListType>opt, value, diagnostics);
        default:
            return ts.parseCustomTypeOption(<ts.CommandLineOptionOfCustomType>opt, value, diagnostics);
    }
}

export function parseTestCaseOptions(map: Map<string, string>) {
    const options: TestCaseOptions = { };
    const diagnostics: ts.Diagnostic[] = [];
    map.forEach((value, key) => {
        const opt = getCommandLineOption(key);
        if (!opt) throw new Error(`Unknown compiler option '${key}'.`);
        options[opt.name] = parseOption(opt, value, diagnostics);
        if (diagnostics.length > 0) throw new Error(`Unrecognized value '${value}' for compiler option '${key}'.`);
    });
    return options;
}

function isDocumentMetadata(key: string) {
    return key === "symlink";
}

export function parseTestCase(document: TextDocument): TestCaseParseResult {
    const text = document.text;
    const meta = new Map<string, string>();
    const documents: TextDocument[] = [];
    const dirname = vpath.dirname(document.file);
    // NOTE: Old compiler is inconsistent as it uses `\n` instead of `\r\n` here.
    const writer = new TextWriter(/*text*/ undefined, { eol: "\n" });
    let documentName: string | undefined;
    let documentMeta: Map<string, string> | undefined;
    let preserveLines = false;
    let needsSeparator = false;
    const { lines, lineStarts } = getLinesAndLineStarts(text);
    for (let i = 0; i < lineStarts.length; i++) {
        const line = lines[i];
        const match = optionRegExp.exec(line);
        if (match) {
            const key = match[1].trim();
            const keyLower = key.toLowerCase();
            const value = match[2].trim();
            if (keyLower === "filename") {
                // add previous document
                if (documentName && documentMeta) {
                    documents.push(new TextDocument(documentName, writer.toString(), documentMeta));
                    writer.clear();
                    needsSeparator = false;
                }

                // start new document
                documentName = vpath.combine(dirname, value);
                documentMeta = new Map<string, string>();
                documentMeta.set("filename", documentName);
            }
            else if (keyLower === "preservelines") {
                preserveLines = value.toLowerCase() === "true";
            }
            else if (isDocumentMetadata(keyLower)) {
                if (documentMeta) {
                    documentMeta.set(key, value);
                }
            }
            else {
                meta.set(key, value);
            }
        }
        else {
            if (needsSeparator) {
                writer.writeln();
            }
            if (preserveLines) {
                const lineStart = lineStarts[i];
                const lineEnd = i < lineStarts.length - 1 ? lineStarts[i + 1] : text.length;
                writer.write(text.slice(lineStart, lineEnd));
                if (needsSeparator && writer.size > 0) {
                    needsSeparator = false;
                }
            }
            else {
                writer.write(line);
                if (!needsSeparator && writer.size > 0) {
                    needsSeparator = true;
                }
            }
        }
    }

    // Add remaining document
    documents.push(new TextDocument(documentName || document.file, writer.toString(), documentMeta || meta));
    return { meta, options: parseTestCaseOptions(meta), documents };
}