/// <no-default-lib/>

/// <reference path="..\..\lib\lib.core.d.ts"/>
/// <reference path="analyzerEnv.ts"/>
/// <reference path="..\compiler\types.ts"/>
/// <reference path="..\compiler\core.ts"/>
/// <reference path="..\compiler\sys.ts"/>
/// <reference path="..\compiler\commandLineParser.ts"/>
/// <reference path="services.ts"/>
/// <reference path="utilities.ts"/>
/// <reference path="shims.ts"/>

interface AnalyzisError {
    message: string;
    stack: string;
}

interface Hyperlink {
    sourceFile: string;
    start: number;
    symbolId: string;
}

interface ClassifiedRange {
    classification: string;
    start: number;
    length: number;
    hyperlinks: Hyperlink[];
    definitionSymbolId?: string;
    definitionKind?: string;
    searchString?: string;
    fullName?: string;
}

interface AnalyzedFile {
    fileName: string;
    syntacticClassifications: ClassifiedRange[];
    semanticClassifications: ClassifiedRange[];
    fileSymbolId: string;
}

interface ProcessedFile {
    index: number;
    fileName: string;
}

function log<T>(text: string, f: () => T): T {
    let start = new Date().getTime();
    let result = f();
    let end = new Date().getTime();
    ts.sys.write(text + ": " + (end - start) + " ms" + ts.sys.newLine)
    return result;
}

function analyze(libFileName: string, files: string[], outputFolder: string): ProcessedFile[]{

    let sourceFileVersion = "1";
    let sourceFileIsOpen = false;


    let program = log("createProgram", () => createProgram(files));
    let fileNames = ts.map(program.getSourceFiles(), f => f.fileName);
    let scriptSnapshots: ts.Map<ts.IScriptSnapshot> = {};

    let checker = log("getTypeChecker", () => program.getTypeChecker());

    ts.forEach(program.getSourceFiles(), f => {
        scriptSnapshots[f.fileName] = ts.ScriptSnapshot.fromString(f.text);
    });
    
    const hostCancellationToken: ts.HostCancellationToken = {
        isCancellationRequested: () => false
    }
    
    let host: ts.LanguageServiceHost = {
        getCancellationToken: () => hostCancellationToken,
        getCompilationSettings: () => { return {}; },
        getDefaultLibFileName: () => libFileName,
        getCurrentDirectory: () => ".",
        getLocalizedDiagnosticMessages: () => undefined,
        getScriptFileNames: () => fileNames,
        getScriptVersion: _ => sourceFileVersion,
        getScriptSnapshot: name => scriptSnapshots[name],
        log: (s) => { },
        trace: (s) => { },
        error: (s) => { }
    };

    let documentRegistry: ts.DocumentRegistry = {
        acquireDocument: (fileName, settings, snapshot, version) => program.getSourceFile(fileName),
        releaseDocument: (fileName, settings) => { },
        updateDocument: (fileName, settings, snapshot, version) => program.getSourceFile(fileName),
        reportStats: () => ""
    };
    let ls = ts.createLanguageService(host, documentRegistry);

    let sourceFiles = program.getSourceFiles();
    let processedFiles: ProcessedFile[] = [];
    for (let i = 0, len = sourceFiles.length; i < len; ++i) {
        var f = sourceFiles[i];
        var fileSpan = ts.createTextSpan(0, f.text.length);
        let result = log("getClassifications '" + f.fileName + "'", () => {
            let syntacticClassifications = ls.getSyntacticClassifications(f.fileName, fileSpan);
            let convertedSyntactic = convertClassifications(syntacticClassifications, f, /*addHyperlinks*/ true);

            let semanticClassifications = ls.getSemanticClassifications(f.fileName, fileSpan);
            let convertedSemantic = convertClassifications(semanticClassifications, f, /*addHyperlinks*/ false);

            return {
                fileName: f.fileName,
                syntacticClassifications: convertedSyntactic,
                semanticClassifications: convertedSemantic,
                fileSymbolId: makeSymbolId(f.fileName, 0)
            };
        });

        let json = JSON.stringify(result);
        let path = ts.combinePaths(outputFolder, i + ".json");
        ts.sys.writeFile(path, json, /*writeByteOrderMark*/ false);
        processedFiles.push({ fileName: f.fileName, index: i });
    }
    return processedFiles;

    // local functions

    function skipClassification(c: string) {
        switch (c) {
            case ts.ClassificationTypeNames.whiteSpace:
            case ts.ClassificationTypeNames.punctuation:
            case ts.ClassificationTypeNames.operator:
                return true;
            default:
                return false;
        }
    }

    function getDeclarationForName(n: ts.Node): ts.Declaration {
        switch (n.kind) {
            case ts.SyntaxKind.ConstructorKeyword:
                return <ts.Declaration>n.parent;
            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.StringLiteral:
                if (n.parent && ts.isDeclaration(n.parent) && (<ts.Declaration>n.parent).name === n) {
                    return <ts.Declaration>n.parent;
                }
        }
        return undefined;
    }

    function getDeclarationName(decl: ts.Node): string {
        switch (decl.kind) {
            case ts.SyntaxKind.TypeAliasDeclaration:
                return "type alias";
            case ts.SyntaxKind.Constructor:
                return "constructor";
            case ts.SyntaxKind.TypeParameter:
                return "type parameter";
            case ts.SyntaxKind.Parameter:
                return "parameter";
            case ts.SyntaxKind.VariableDeclaration:
                return "variable";
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertyAssignment:
                return "property";
            case ts.SyntaxKind.EnumMember:
                return "enum member"
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.MethodDeclaration:
                return "method";
            case ts.SyntaxKind.FunctionDeclaration:
                return "function";
            case ts.SyntaxKind.GetAccessor:
                return "get accessor";
            case ts.SyntaxKind.SetAccessor:
                return "set accessor";
            case ts.SyntaxKind.ClassDeclaration:
                return "class";
            case ts.SyntaxKind.InterfaceDeclaration:
                return "interface";
            case ts.SyntaxKind.EnumDeclaration:
                return "enum";
            case ts.SyntaxKind.ModuleDeclaration:
                return "module";
            case ts.SyntaxKind.ImportDeclaration:
                return "import";
        }
    }

    function getQualifiedName(decl: ts.Declaration): string {
        // TODO: should be revised when TS have local types
        let curr: ts.Node = decl;
        let name = "";
        while (curr) {
            switch (curr.kind) {
                case ts.SyntaxKind.Constructor:
                    if (curr !== decl) {
                        return "constructor"
                    }
                    else {
                        name = "constructor";
                    }
                    curr = curr.parent;
                    break;
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.TypeParameter:
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.FunctionDeclaration:
                    return ts.declarationNameToString((<ts.Declaration>decl).name); // take a shortcut
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.PropertyAssignment:
                    if (curr.parent && curr.parent.kind === ts.SyntaxKind.TypeLiteral) {
                        return ts.declarationNameToString((<ts.Declaration>decl).name); // take a shortcut
                    }
                case ts.SyntaxKind.EnumMember:
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.ModuleDeclaration:
                case ts.SyntaxKind.ImportDeclaration:
                    let currName = ts.declarationNameToString((<ts.Declaration>curr).name);
                    name = name.length ? currName + "." + name : currName;
                default:
                    curr = curr.parent;
            }
        }
        return name;
    }

    function convertClassifications(classifications: ts.ClassifiedSpan[], f: ts.SourceFile, addHyperlinks: boolean): ClassifiedRange[]{
        let ranges: ClassifiedRange[] = [];

        if (addHyperlinks) {
            ts.forEach(f.referencedFiles, r => {
                let hyperlinks = addHyperlinksForDefinition(r.pos, /*hyperlinks*/ undefined);
                // push hyperlinks for tripleslash refs
                if (hyperlinks) {
                    let range: ClassifiedRange = {
                        start: r.pos,
                        length: r.end - r.pos,
                        hyperlinks: hyperlinks,
                        classification: ts.ClassificationTypeNames.stringLiteral,
                    }
                    ranges.push(range);
                }
            });
        }

        ts.forEach(classifications, c => {
            if (skipClassification(c.classificationType)) {
                return;
            }

            let classification = c.classificationType;
            let start = c.textSpan.start;
            let length = c.textSpan.length;
            let hyperlinks: Hyperlink[];

            let definitionSymbolId: string;
            let definitionKind: string;
            let fullName: string;
            let searchString: string;

            if (addHyperlinks) {
                switch (c.classificationType) {
                    case ts.ClassificationTypeNames.comment:
                    case ts.ClassificationTypeNames.operator:
                    case ts.ClassificationTypeNames.punctuation:
                    case ts.ClassificationTypeNames.whiteSpace:
                        break;
                    default:
                        let token = ts.getTokenAtPosition(f, start);
                        // yield definition info only for constructors
                        if (c.classificationType === ts.ClassificationTypeNames.keyword && token && token.kind !== ts.SyntaxKind.ConstructorKeyword) {
                            break;
                        }
                        let declaration = token && getDeclarationForName(token);
                        if (declaration) {
                            searchString = declaration.name && ts.declarationNameToString(declaration.name);
                            definitionKind = getDeclarationName(declaration);
                            fullName = getQualifiedName(declaration);
                            if (declaration.name) {
                                definitionSymbolId = makeSymbolId(f.fileName, declaration.name.getStart());
                            }
                            else {
                                definitionSymbolId = makeSymbolId(f.fileName, declaration.getStart());
                            }
                        }
                        else if (token.kind === ts.SyntaxKind.Identifier && token.parent && token.parent.kind === ts.SyntaxKind.LabeledStatement) {
                            // label
                            definitionKind = "label";
                            fullName = ts.declarationNameToString(<ts.Identifier>token);
                            definitionSymbolId = makeSymbolId(f.fileName, token.getStart());
                        }
                        else  {
                            hyperlinks = addHyperlinksForDefinition(start, hyperlinks);
                        }
                }
            }

            let converted: ClassifiedRange = {
                classification: classification,
                start: start,
                length: length,
                hyperlinks: hyperlinks,
                definitionSymbolId: definitionSymbolId,
                searchString: searchString,
                fullName: fullName,
                definitionKind: definitionKind
            };
            ranges.push(converted);

        });
        return ranges;
    }

    function addHyperlinksForDefinition(start: number, hyperlinks: Hyperlink[]): Hyperlink[] {
        let defs = ls.getDefinitionAtPosition(f.fileName, start);
        if (defs) {
            ts.forEach(defs, d => {
                if (!hyperlinks) {
                    hyperlinks = [];
                }

                let defStart = d.textSpan.start;
                let defFile = program.getSourceFile(d.fileName);

                let token = ts.getTouchingToken(defFile, defStart, /*includeItemAtEndPosition*/ undefined);
                if (token && token.kind !== ts.SyntaxKind.SourceFile) {
                    // point definition to name if possible
                    let target =
                        ts.isDeclaration(token)
                        ? (<ts.Declaration>token).name
                        : token.parent && ts.isDeclaration(token.parent)
                        ? (<ts.Declaration>token.parent).name
                        : token;
                    if (target) {
                        defStart = target.getStart();
                    }
                }
                let link: Hyperlink = {
                    sourceFile: d.fileName,
                    start: d.textSpan.start,
                    symbolId: makeSymbolId(d.fileName, defStart)
                };
                hyperlinks.push(link);
            });
        }

        return hyperlinks;
    }

    function makeSymbolId(fileName: string, start: number): string {
        return fileName + "|" + start;
    }

    const cancellationToken: ts.CancellationToken = {
        isCancellationRequested: () => false,
        throwIfCancellationRequested: () => {}
    }
    function createProgram(files: string[]): ts.Program {
        let host: ts.CompilerHost = {
            getSourceFile: (filename, languageVersion) => {
                if (ts.sys.fileExists(filename)) {
                    let text = ts.sys.readFile(filename);
                    let sourceFile = ts.createSourceFile(filename, text, languageVersion);
                    sourceFile.version = sourceFileVersion;
                    return sourceFile;
                }
            },
            getCancellationToken: () => cancellationToken,
            getCanonicalFileName: (filename) => ts.sys.useCaseSensitiveFileNames ? filename : filename.toLowerCase(),
            useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
            getNewLine: () => "\r\n",
            getDefaultLibFileName: (): string => {
                return libFileName;
            },
            writeFile: (filename, data, writeByteOrderMark) => {
                throw new Error("NYI");
            },
            getCurrentDirectory: (): string => {
                return ts.sys.getCurrentDirectory();
            },
            fileExists: fileName => ts.sys.fileExists(fileName),
            readFile: fileName => ts.sys.readFile(fileName)
        };
        return ts.createProgram(files, { target: ts.ScriptTarget.ES5 }, host)
    }
}

function analyzeShim(json: string): boolean {
    let args = <{ fileNames: string[]; libFile: string; outputFolder?: string }>JSON.parse(json);
    let outputFolder = args.outputFolder || "output";
    if (!ts.sys.directoryExists(outputFolder)) {
        ts.sys.createDirectory(outputFolder);
    }
    try {
        let results = analyze(args.libFile, args.fileNames, outputFolder);
        ts.sys.writeFile(ts.combinePaths(outputFolder, "ok.json"), JSON.stringify(results));
        return true;
    }
    catch (e) {
        ts.sys.writeFile(ts.combinePaths(outputFolder, "error.json"), JSON.stringify({ message: e.message, stack: e.stack }));
        return false;
    }
}
declare let module: any;
declare let process: any;
if (typeof module !== "undefined" && module.exports && process.argv.length === 3) {
    analyzeShim(ts.sys.readFile(process.argv[2]));
}

analyzeShim
