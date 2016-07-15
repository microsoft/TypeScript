/// <reference path="checker.ts"/>
/// <reference path="sourcemap.ts" />
/// <reference path="declarationEmitter.ts"/>

/* @internal */
namespace ts {
    export function getResolvedExternalModuleName(host: EmitHost, file: SourceFile): string {
        return file.moduleName || getExternalModuleNameFromPath(host, file.fileName);
    }

    export function getExternalModuleNameFromDeclaration(host: EmitHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration): string {
        const file = resolver.getExternalModuleFileFromDeclaration(declaration);
        if (!file || isDeclarationFile(file)) {
            return undefined;
        }
        return getResolvedExternalModuleName(host, file);
    }

    type DependencyGroup = Array<ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration>;

    const enum Jump {
        Break       = 1 << 1,
        Continue    = 1 << 2,
        Return      = 1 << 3
    }

    const entities: Map<number> = {
        "quot": 0x0022,
        "amp": 0x0026,
        "apos": 0x0027,
        "lt": 0x003C,
        "gt": 0x003E,
        "nbsp": 0x00A0,
        "iexcl": 0x00A1,
        "cent": 0x00A2,
        "pound": 0x00A3,
        "curren": 0x00A4,
        "yen": 0x00A5,
        "brvbar": 0x00A6,
        "sect": 0x00A7,
        "uml": 0x00A8,
        "copy": 0x00A9,
        "ordf": 0x00AA,
        "laquo": 0x00AB,
        "not": 0x00AC,
        "shy": 0x00AD,
        "reg": 0x00AE,
        "macr": 0x00AF,
        "deg": 0x00B0,
        "plusmn": 0x00B1,
        "sup2": 0x00B2,
        "sup3": 0x00B3,
        "acute": 0x00B4,
        "micro": 0x00B5,
        "para": 0x00B6,
        "middot": 0x00B7,
        "cedil": 0x00B8,
        "sup1": 0x00B9,
        "ordm": 0x00BA,
        "raquo": 0x00BB,
        "frac14": 0x00BC,
        "frac12": 0x00BD,
        "frac34": 0x00BE,
        "iquest": 0x00BF,
        "Agrave": 0x00C0,
        "Aacute": 0x00C1,
        "Acirc": 0x00C2,
        "Atilde": 0x00C3,
        "Auml": 0x00C4,
        "Aring": 0x00C5,
        "AElig": 0x00C6,
        "Ccedil": 0x00C7,
        "Egrave": 0x00C8,
        "Eacute": 0x00C9,
        "Ecirc": 0x00CA,
        "Euml": 0x00CB,
        "Igrave": 0x00CC,
        "Iacute": 0x00CD,
        "Icirc": 0x00CE,
        "Iuml": 0x00CF,
        "ETH": 0x00D0,
        "Ntilde": 0x00D1,
        "Ograve": 0x00D2,
        "Oacute": 0x00D3,
        "Ocirc": 0x00D4,
        "Otilde": 0x00D5,
        "Ouml": 0x00D6,
        "times": 0x00D7,
        "Oslash": 0x00D8,
        "Ugrave": 0x00D9,
        "Uacute": 0x00DA,
        "Ucirc": 0x00DB,
        "Uuml": 0x00DC,
        "Yacute": 0x00DD,
        "THORN": 0x00DE,
        "szlig": 0x00DF,
        "agrave": 0x00E0,
        "aacute": 0x00E1,
        "acirc": 0x00E2,
        "atilde": 0x00E3,
        "auml": 0x00E4,
        "aring": 0x00E5,
        "aelig": 0x00E6,
        "ccedil": 0x00E7,
        "egrave": 0x00E8,
        "eacute": 0x00E9,
        "ecirc": 0x00EA,
        "euml": 0x00EB,
        "igrave": 0x00EC,
        "iacute": 0x00ED,
        "icirc": 0x00EE,
        "iuml": 0x00EF,
        "eth": 0x00F0,
        "ntilde": 0x00F1,
        "ograve": 0x00F2,
        "oacute": 0x00F3,
        "ocirc": 0x00F4,
        "otilde": 0x00F5,
        "ouml": 0x00F6,
        "divide": 0x00F7,
        "oslash": 0x00F8,
        "ugrave": 0x00F9,
        "uacute": 0x00FA,
        "ucirc": 0x00FB,
        "uuml": 0x00FC,
        "yacute": 0x00FD,
        "thorn": 0x00FE,
        "yuml": 0x00FF,
        "OElig": 0x0152,
        "oelig": 0x0153,
        "Scaron": 0x0160,
        "scaron": 0x0161,
        "Yuml": 0x0178,
        "fnof": 0x0192,
        "circ": 0x02C6,
        "tilde": 0x02DC,
        "Alpha": 0x0391,
        "Beta": 0x0392,
        "Gamma": 0x0393,
        "Delta": 0x0394,
        "Epsilon": 0x0395,
        "Zeta": 0x0396,
        "Eta": 0x0397,
        "Theta": 0x0398,
        "Iota": 0x0399,
        "Kappa": 0x039A,
        "Lambda": 0x039B,
        "Mu": 0x039C,
        "Nu": 0x039D,
        "Xi": 0x039E,
        "Omicron": 0x039F,
        "Pi": 0x03A0,
        "Rho": 0x03A1,
        "Sigma": 0x03A3,
        "Tau": 0x03A4,
        "Upsilon": 0x03A5,
        "Phi": 0x03A6,
        "Chi": 0x03A7,
        "Psi": 0x03A8,
        "Omega": 0x03A9,
        "alpha": 0x03B1,
        "beta": 0x03B2,
        "gamma": 0x03B3,
        "delta": 0x03B4,
        "epsilon": 0x03B5,
        "zeta": 0x03B6,
        "eta": 0x03B7,
        "theta": 0x03B8,
        "iota": 0x03B9,
        "kappa": 0x03BA,
        "lambda": 0x03BB,
        "mu": 0x03BC,
        "nu": 0x03BD,
        "xi": 0x03BE,
        "omicron": 0x03BF,
        "pi": 0x03C0,
        "rho": 0x03C1,
        "sigmaf": 0x03C2,
        "sigma": 0x03C3,
        "tau": 0x03C4,
        "upsilon": 0x03C5,
        "phi": 0x03C6,
        "chi": 0x03C7,
        "psi": 0x03C8,
        "omega": 0x03C9,
        "thetasym": 0x03D1,
        "upsih": 0x03D2,
        "piv": 0x03D6,
        "ensp": 0x2002,
        "emsp": 0x2003,
        "thinsp": 0x2009,
        "zwnj": 0x200C,
        "zwj": 0x200D,
        "lrm": 0x200E,
        "rlm": 0x200F,
        "ndash": 0x2013,
        "mdash": 0x2014,
        "lsquo": 0x2018,
        "rsquo": 0x2019,
        "sbquo": 0x201A,
        "ldquo": 0x201C,
        "rdquo": 0x201D,
        "bdquo": 0x201E,
        "dagger": 0x2020,
        "Dagger": 0x2021,
        "bull": 0x2022,
        "hellip": 0x2026,
        "permil": 0x2030,
        "prime": 0x2032,
        "Prime": 0x2033,
        "lsaquo": 0x2039,
        "rsaquo": 0x203A,
        "oline": 0x203E,
        "frasl": 0x2044,
        "euro": 0x20AC,
        "image": 0x2111,
        "weierp": 0x2118,
        "real": 0x211C,
        "trade": 0x2122,
        "alefsym": 0x2135,
        "larr": 0x2190,
        "uarr": 0x2191,
        "rarr": 0x2192,
        "darr": 0x2193,
        "harr": 0x2194,
        "crarr": 0x21B5,
        "lArr": 0x21D0,
        "uArr": 0x21D1,
        "rArr": 0x21D2,
        "dArr": 0x21D3,
        "hArr": 0x21D4,
        "forall": 0x2200,
        "part": 0x2202,
        "exist": 0x2203,
        "empty": 0x2205,
        "nabla": 0x2207,
        "isin": 0x2208,
        "notin": 0x2209,
        "ni": 0x220B,
        "prod": 0x220F,
        "sum": 0x2211,
        "minus": 0x2212,
        "lowast": 0x2217,
        "radic": 0x221A,
        "prop": 0x221D,
        "infin": 0x221E,
        "ang": 0x2220,
        "and": 0x2227,
        "or": 0x2228,
        "cap": 0x2229,
        "cup": 0x222A,
        "int": 0x222B,
        "there4": 0x2234,
        "sim": 0x223C,
        "cong": 0x2245,
        "asymp": 0x2248,
        "ne": 0x2260,
        "equiv": 0x2261,
        "le": 0x2264,
        "ge": 0x2265,
        "sub": 0x2282,
        "sup": 0x2283,
        "nsub": 0x2284,
        "sube": 0x2286,
        "supe": 0x2287,
        "oplus": 0x2295,
        "otimes": 0x2297,
        "perp": 0x22A5,
        "sdot": 0x22C5,
        "lceil": 0x2308,
        "rceil": 0x2309,
        "lfloor": 0x230A,
        "rfloor": 0x230B,
        "lang": 0x2329,
        "rang": 0x232A,
        "loz": 0x25CA,
        "spades": 0x2660,
        "clubs": 0x2663,
        "hearts": 0x2665,
        "diams": 0x2666
    };

    // Flags enum to track count of temp variables and a few dedicated names
    const enum TempFlags {
        Auto      = 0x00000000,  // No preferred name
        CountMask = 0x0FFFFFFF,  // Temp variable counter
        _i        = 0x10000000,  // Use/preference flag for '_i'
    }

    const enum CopyDirection {
        ToOriginal,
        ToOutParameter
    }

    /**
     * If loop contains block scoped binding captured in some function then loop body is converted to a function.
     * Lexical bindings declared in loop initializer will be passed into the loop body function as parameters,
     * however if this binding is modified inside the body - this new value should be propagated back to the original binding.
     * This is done by declaring new variable (out parameter holder) outside of the loop for every binding that is reassigned inside the body.
     * On every iteration this variable is initialized with value of corresponding binding.
     * At every point where control flow leaves the loop either explicitly (break/continue) or implicitly (at the end of loop body)
     * we copy the value inside the loop to the out parameter holder.
     *
     * for (let x;;) {
     *     let a = 1;
     *     let b = () => a;
     *     x++
     *     if (...) break;
     *     ...
     * }
     *
     * will be converted to
     *
     * var out_x;
     * var loop = function(x) {
     *     var a = 1;
     *     var b = function() { return a; }
     *     x++;
     *     if (...) return out_x = x, "break";
     *     ...
     *     out_x = x;
     * }
     * for (var x;;) {
     *     out_x = x;
     *     var state = loop(x);
     *     x = out_x;
     *     if (state === "break") break;
     * }
     *
     * NOTE: values to out parameters are not copies if loop is abrupted with 'return' - in this case this will end the entire enclosing function
     * so nobody can observe this new value.
     */
    interface LoopOutParameter {
        originalName: Identifier;
        outParamName: string;
    }

    // targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
    export function emitFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile): EmitResult {
        // emit output for the __extends helper function
        const extendsHelper = `
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};`;

        const assignHelper = `
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};`;

        // emit output for the __decorate helper function
        const decorateHelper = `
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};`;

        // emit output for the __metadata helper function
        const metadataHelper = `
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};`;

        // emit output for the __param helper function
        const paramHelper = `
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};`;

        const awaiterHelper = `
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};`;

        const compilerOptions = host.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const modulekind = getEmitModuleKind(compilerOptions);
        const sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? [] : undefined;
        const emittedFilesList: string[] = compilerOptions.listEmittedFiles ? [] : undefined;
        const emitterDiagnostics = createDiagnosticCollection();
        let emitSkipped = false;
        const newLine = host.getNewLine();

        const emitJavaScript = createFileEmitter();
        forEachExpectedEmitFile(host, emitFile, targetSourceFile);

        return {
            emitSkipped,
            diagnostics: emitterDiagnostics.getDiagnostics(),
            emittedFiles: emittedFilesList,
            sourceMaps: sourceMapDataList
        };

        function isUniqueLocalName(name: string, container: Node): boolean {
            for (let node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && hasProperty(node.locals, name)) {
                    // We conservatively include alias symbols to cover cases where they're emitted as locals
                    if (node.locals[name].flags & (SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias)) {
                        return false;
                    }
                }
            }
            return true;
        }

        interface ConvertedLoopState {
            /*
             * set of labels that occurred inside the converted loop
             * used to determine if labeled jump can be emitted as is or it should be dispatched to calling code
             */
            labels?: Map<string>;
            /*
             * collection of labeled jumps that transfer control outside the converted loop.
             * maps store association 'label -> labelMarker' where
             * - label - value of label as it appear in code
             * - label marker - return value that should be interpreted by calling code as 'jump to <label>'
             */
            labeledNonLocalBreaks?: Map<string>;
            labeledNonLocalContinues?: Map<string>;

            /*
             * set of non-labeled jumps that transfer control outside the converted loop
             * used to emit dispatching logic in the caller of converted loop
             */
            nonLocalJumps?: Jump;

            /*
             * set of non-labeled jumps that should be interpreted as local
             * i.e. if converted loop contains normal loop or switch statement then inside this loop break should be treated as local jump
             */
            allowedNonLabeledJumps?: Jump;

            /*
             * alias for 'arguments' object from the calling code stack frame
             * i.e.
             * for (let x;;) <statement that captures x in closure and uses 'arguments'>
             * should be converted to
             * var loop = function(x) { <code where 'arguments' is replaced with 'arguments_1'> }
             * var arguments_1 = arguments
             * for (var x;;) loop(x);
             * otherwise semantics of the code will be different since 'arguments' inside converted loop body
             * will refer to function that holds converted loop.
             * This value is set on demand.
             */
            argumentsName?: string;

            /*
             * alias for 'this' from the calling code stack frame in case if this was used inside the converted loop
             */
            thisName?: string;

            /*
             * list of non-block scoped variable declarations that appear inside converted loop
             * such variable declarations should be moved outside the loop body
             * for (let x;;) {
             *     var y = 1;
             *     ...
             * }
             * should be converted to
             * var loop = function(x) {
             *    y = 1;
             *    ...
             * }
             * var y;
             * for (var x;;) loop(x);
             */
            hoistedLocalVariables?: Identifier[];

            /**
             * List of loop out parameters - detailed descripion can be found in the comment to LoopOutParameter
             */
            loopOutParameters?: LoopOutParameter[];
        }

        function setLabeledJump(state: ConvertedLoopState, isBreak: boolean, labelText: string, labelMarker: string): void {
            if (isBreak) {
                if (!state.labeledNonLocalBreaks) {
                    state.labeledNonLocalBreaks = {};
                }
                state.labeledNonLocalBreaks[labelText] = labelMarker;
            }
            else {
                if (!state.labeledNonLocalContinues) {
                    state.labeledNonLocalContinues = {};
                }
                state.labeledNonLocalContinues[labelText] = labelMarker;
            }
        }

        function hoistVariableDeclarationFromLoop(state: ConvertedLoopState, declaration: VariableDeclaration): void {
            if (!state.hoistedLocalVariables) {
                state.hoistedLocalVariables = [];
            }

            visit(declaration.name);

            function visit(node: Identifier | BindingPattern) {
                if (node.kind === SyntaxKind.Identifier) {
                    state.hoistedLocalVariables.push((<Identifier>node));
                }
                else {
                    for (const element of (<BindingPattern>node).elements) {
                        visit(element.name);
                    }
                }
            }
        }

        function createFileEmitter(): (jsFilePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean) => void {
            const writer = createTextWriter(newLine);
            const { write, writeTextOfNode, writeLine, increaseIndent, decreaseIndent } = writer;

            let sourceMap = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? createSourceMapWriter(host, writer) : getNullSourceMapWriter();
            let { setSourceFile, emitStart, emitEnd, emitPos } = sourceMap;

            let currentSourceFile: SourceFile;
            let currentText: string;
            let currentLineMap: number[];
            let currentFileIdentifiers: Map<string>;
            let renamedDependencies: Map<string>;
            let isEs6Module: boolean;
            let isCurrentFileExternalModule: boolean;

            // name of an exporter function if file is a System external module
            // System.register([...], function (<exporter>) {...})
            // exporting in System modules looks like:
            // export var x; ... x = 1
            // =>
            // var x;... exporter("x", x = 1)
            let exportFunctionForFile: string;
            let contextObjectForFile: string;

            let generatedNameSet: Map<string>;
            let nodeToGeneratedName: string[];
            let computedPropertyNamesToGeneratedNames: string[];
            let decoratedClassAliases: string[];

            let convertedLoopState: ConvertedLoopState;

            let extendsEmitted: boolean;
            let assignEmitted: boolean;
            let decorateEmitted: boolean;
            let paramEmitted: boolean;
            let awaiterEmitted: boolean;
            let tempFlags: TempFlags = 0;
            let tempVariables: Identifier[];
            let tempParameters: Identifier[];
            let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
            let exportSpecifiers: Map<ExportSpecifier[]>;
            let exportEquals: ExportAssignment;
            let hasExportStarsToExportValues: boolean;

            let detachedCommentsInfo: { nodePos: number; detachedCommentEndPos: number }[];

            /** Sourcemap data that will get encoded */
            let sourceMapData: SourceMapData;

            /** Is the file being emitted into its own file */
            let isOwnFileEmit: boolean;

            /** If removeComments is true, no leading-comments needed to be emitted **/
            const emitLeadingCommentsOfPosition = compilerOptions.removeComments ? function (pos: number) { } : emitLeadingCommentsOfPositionWorker;

            const setSourceMapWriterEmit = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? changeSourceMapEmit : function (writer: SourceMapWriter) { };

            const moduleEmitDelegates: Map<(node: SourceFile, emitRelativePathAsModuleName?: boolean) => void> = {
                [ModuleKind.ES6]: emitES6Module,
                [ModuleKind.AMD]: emitAMDModule,
                [ModuleKind.System]: emitSystemModule,
                [ModuleKind.UMD]: emitUMDModule,
                [ModuleKind.CommonJS]: emitCommonJSModule,
            };

            const bundleEmitDelegates: Map<(node: SourceFile, emitRelativePathAsModuleName?: boolean) => void> = {
                [ModuleKind.ES6]() {},
                [ModuleKind.AMD]: emitAMDModule,
                [ModuleKind.System]: emitSystemModule,
                [ModuleKind.UMD]() {},
                [ModuleKind.CommonJS]() {},
            };

            return doEmit;

            function doEmit(jsFilePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean) {
                sourceMap.initialize(jsFilePath, sourceMapFilePath, sourceFiles, isBundledEmit);
                generatedNameSet = {};
                nodeToGeneratedName = [];
                decoratedClassAliases = [];
                isOwnFileEmit = !isBundledEmit;

                // Emit helpers from all the files
                if (isBundledEmit && modulekind) {
                    forEach(sourceFiles, emitEmitHelpers);
                }

                // Do not call emit directly. It does not set the currentSourceFile.
                forEach(sourceFiles, emitSourceFile);

                writeLine();

                const sourceMappingURL = sourceMap.getSourceMappingURL();
                if (sourceMappingURL) {
                    write(`//# sourceMappingURL=${sourceMappingURL}`);
                }

                writeEmittedFiles(writer.getText(), jsFilePath, sourceMapFilePath, /*writeByteOrderMark*/ compilerOptions.emitBOM, sourceFiles);

                // reset the state
                sourceMap.reset();
                writer.reset();
                currentSourceFile = undefined;
                currentText = undefined;
                currentLineMap = undefined;
                exportFunctionForFile = undefined;
                contextObjectForFile = undefined;
                generatedNameSet = undefined;
                nodeToGeneratedName = undefined;
                decoratedClassAliases = undefined;
                computedPropertyNamesToGeneratedNames = undefined;
                convertedLoopState = undefined;
                extendsEmitted = false;
                decorateEmitted = false;
                paramEmitted = false;
                awaiterEmitted = false;
                assignEmitted = false;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStarsToExportValues = undefined;
                detachedCommentsInfo = undefined;
                sourceMapData = undefined;
                isEs6Module = false;
                renamedDependencies = undefined;
                isCurrentFileExternalModule = false;
            }

            function emitSourceFile(sourceFile: SourceFile): void {
                currentSourceFile = sourceFile;

                currentText = sourceFile.text;
                currentLineMap = getLineStarts(sourceFile);
                exportFunctionForFile = undefined;
                contextObjectForFile = undefined;
                isEs6Module = sourceFile.symbol && sourceFile.symbol.exports && !!sourceFile.symbol.exports["___esModule"];
                renamedDependencies = sourceFile.renamedDependencies;
                currentFileIdentifiers = sourceFile.identifiers;
                isCurrentFileExternalModule = isExternalModule(sourceFile);

                setSourceFile(sourceFile);
                emitNodeWithCommentsAndWithoutSourcemap(sourceFile);
            }

            function isUniqueName(name: string): boolean {
                return !resolver.hasGlobalName(name) &&
                    !hasProperty(currentFileIdentifiers, name) &&
                    !hasProperty(generatedNameSet, name);
            }

            // Return the next available name in the pattern _a ... _z, _0, _1, ...
            // TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
            // Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
            function makeTempVariableName(flags: TempFlags): string {
                if (flags && !(tempFlags & flags)) {
                    const name = flags === TempFlags._i ? "_i" : "_n";
                    if (isUniqueName(name)) {
                        tempFlags |= flags;
                        return name;
                    }
                }
                while (true) {
                    const count = tempFlags & TempFlags.CountMask;
                    tempFlags++;
                    // Skip over 'i' and 'n'
                    if (count !== 8 && count !== 13) {
                        const name = count < 26 ? "_" + String.fromCharCode(CharacterCodes.a + count) : "_" + (count - 26);
                        if (isUniqueName(name)) {
                            return name;
                        }
                    }
                }
            }

            // Generate a name that is unique within the current file and doesn't conflict with any names
            // in global scope. The name is formed by adding an '_n' suffix to the specified base name,
            // where n is a positive integer. Note that names generated by makeTempVariableName and
            // makeUniqueName are guaranteed to never conflict.
            function makeUniqueName(baseName: string): string {
                // Find the first unique 'name_n', where n is a positive number
                if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
                    baseName += "_";
                }
                let i = 1;
                while (true) {
                    const generatedName = baseName + i;
                    if (isUniqueName(generatedName)) {
                        return generatedNameSet[generatedName] = generatedName;
                    }
                    i++;
                }
            }

            function generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
                const name = node.name.text;
                // Use module/enum name itself if it is unique, otherwise make a unique variation
                return isUniqueLocalName(name, node) ? name : makeUniqueName(name);
            }

            function generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
                const expr = getExternalModuleName(node);
                const baseName = expr.kind === SyntaxKind.StringLiteral ?
                    escapeIdentifier(makeIdentifierFromModuleName((<LiteralExpression>expr).text)) : "module";
                return makeUniqueName(baseName);
            }

            function generateNameForExportDefault() {
                return makeUniqueName("default");
            }

            function generateNameForClassExpression() {
                return makeUniqueName("class");
            }

            function generateNameForNode(node: Node) {
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                        return makeUniqueName((<Identifier>node).text);
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.EnumDeclaration:
                        return generateNameForModuleOrEnum(<ModuleDeclaration | EnumDeclaration>node);
                    case SyntaxKind.ImportDeclaration:
                    case SyntaxKind.ExportDeclaration:
                        return generateNameForImportOrExportDeclaration(<ImportDeclaration | ExportDeclaration>node);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ExportAssignment:
                        return generateNameForExportDefault();
                    case SyntaxKind.ClassExpression:
                        return generateNameForClassExpression();
                    default:
                        Debug.fail();
                }
            }

            function getGeneratedNameForNode(node: Node) {
                const id = getNodeId(node);
                return nodeToGeneratedName[id] || (nodeToGeneratedName[id] = unescapeIdentifier(generateNameForNode(node)));
            }

            /** Write emitted output to disk */
            function writeEmittedFiles(emitOutput: string, jsFilePath: string, sourceMapFilePath: string, writeByteOrderMark: boolean, sourceFiles: SourceFile[]) {
                if (compilerOptions.sourceMap && !compilerOptions.inlineSourceMap) {
                    writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap.getText(), /*writeByteOrderMark*/ false, sourceFiles);
                }

                if (sourceMapDataList) {
                    sourceMapDataList.push(sourceMap.getSourceMapData());
                }

                writeFile(host, emitterDiagnostics, jsFilePath, emitOutput, writeByteOrderMark, sourceFiles);
            }

            // Create a temporary variable with a unique unused name.
            function createTempVariable(flags: TempFlags): Identifier {
                const result = <Identifier>createSynthesizedNode(SyntaxKind.Identifier);
                result.text = makeTempVariableName(flags);
                return result;
            }

            function recordTempDeclaration(name: Identifier): void {
                if (!tempVariables) {
                    tempVariables = [];
                }
                tempVariables.push(name);
            }

            function createAndRecordTempVariable(flags: TempFlags): Identifier {
                const temp = createTempVariable(flags);
                recordTempDeclaration(temp);

                return temp;
            }

            function emitTempDeclarations(newLine: boolean) {
                if (tempVariables) {
                    if (newLine) {
                        writeLine();
                    }
                    else {
                        write(" ");
                    }
                    write("var ");
                    emitCommaList(tempVariables);
                    write(";");
                }
            }

            /** Emit the text for the given token that comes after startPos
              * This by default writes the text provided with the given tokenKind
              * but if optional emitFn callback is provided the text is emitted using the callback instead of default text
              * @param tokenKind the kind of the token to search and emit
              * @param startPos the position in the source to start searching for the token
              * @param emitFn if given will be invoked to emit the text instead of actual token emit */
            function emitToken(tokenKind: SyntaxKind, startPos: number, emitFn?: () => void) {
                const tokenStartPos = skipTrivia(currentText, startPos);
                emitPos(tokenStartPos);

                const tokenString = tokenToString(tokenKind);
                if (emitFn) {
                    emitFn();
                }
                else {
                    write(tokenString);
                }

                const tokenEndPos = tokenStartPos + tokenString.length;
                emitPos(tokenEndPos);
                return tokenEndPos;
            }

            function emitOptional(prefix: string, node: Node) {
                if (node) {
                    write(prefix);
                    emit(node);
                }
            }

            function emitParenthesizedIf(node: Node, parenthesized: boolean) {
                if (parenthesized) {
                    write("(");
                }
                emit(node);
                if (parenthesized) {
                    write(")");
                }
            }

            function emitLinePreservingList(parent: Node, nodes: NodeArray<Node>, allowTrailingComma: boolean, spacesBetweenBraces: boolean) {
                Debug.assert(nodes.length > 0);

                increaseIndent();

                if (nodeStartPositionsAreOnSameLine(parent, nodes[0])) {
                    if (spacesBetweenBraces) {
                        write(" ");
                    }
                }
                else {
                    writeLine();
                }

                for (let i = 0, n = nodes.length; i < n; i++) {
                    if (i) {
                        if (nodeEndIsOnSameLineAsNodeStart(nodes[i - 1], nodes[i])) {
                            write(", ");
                        }
                        else {
                            write(",");
                            writeLine();
                        }
                    }

                    emit(nodes[i]);
                }

                if (nodes.hasTrailingComma && allowTrailingComma) {
                    write(",");
                }

                decreaseIndent();

                if (nodeEndPositionsAreOnSameLine(parent, lastOrUndefined(nodes))) {
                    if (spacesBetweenBraces) {
                        write(" ");
                    }
                }
                else {
                    writeLine();
                }
            }

            function emitList<TNode extends Node>(nodes: TNode[], start: number, count: number, multiLine: boolean, trailingComma: boolean, leadingComma?: boolean, noTrailingNewLine?: boolean, emitNode?: (node: TNode) => void): number {
                if (!emitNode) {
                    emitNode = emit;
                }

                for (let i = 0; i < count; i++) {
                    if (multiLine) {
                        if (i || leadingComma) {
                            write(",");
                        }
                        writeLine();
                    }
                    else {
                        if (i || leadingComma) {
                            write(", ");
                        }
                    }
                    const node = nodes[start + i];
                    // This emitting is to make sure we emit following comment properly
                    //   ...(x, /*comment1*/ y)...
                    //         ^ => node.pos
                    // "comment1" is not considered leading comment for "y" but rather
                    // considered as trailing comment of the previous node.
                    emitTrailingCommentsOfPosition(node.pos);
                    emitNode(node);
                    leadingComma = true;
                }
                if (trailingComma) {
                    write(",");
                }
                if (multiLine && !noTrailingNewLine) {
                    writeLine();
                }

                return count;
            }

            function emitCommaList(nodes: Node[]) {
                if (nodes) {
                    emitList(nodes, 0, nodes.length, /*multiLine*/ false, /*trailingComma*/ false);
                }
            }

            function emitLines(nodes: Node[]) {
                emitLinesStartingAt(nodes, /*startIndex*/ 0);
            }

            function emitLinesStartingAt(nodes: Node[], startIndex: number): void {
                for (let i = startIndex; i < nodes.length; i++) {
                    writeLine();
                    emit(nodes[i]);
                }
            }

            function isBinaryOrOctalIntegerLiteral(node: LiteralLikeNode, text: string): boolean {
                if (node.kind === SyntaxKind.NumericLiteral && text.length > 1) {
                    switch (text.charCodeAt(1)) {
                        case CharacterCodes.b:
                        case CharacterCodes.B:
                        case CharacterCodes.o:
                        case CharacterCodes.O:
                            return true;
                    }
                }

                return false;
            }

            function emitLiteral(node: LiteralExpression | TemplateLiteralFragment) {
                const text = getLiteralText(node);

                if ((compilerOptions.sourceMap || compilerOptions.inlineSourceMap) && (node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind))) {
                    writer.writeLiteral(text);
                }
                // For versions below ES6, emit binary & octal literals in their canonical decimal form.
                else if (languageVersion < ScriptTarget.ES6 && isBinaryOrOctalIntegerLiteral(node, text)) {
                    write(node.text);
                }
                else {
                    write(text);
                }
            }

            function getLiteralText(node: LiteralExpression | TemplateLiteralFragment) {
                // Any template literal or string literal with an extended escape
                // (e.g. "\u{0067}") will need to be downleveled as a escaped string literal.
                if (languageVersion < ScriptTarget.ES6 && (isTemplateLiteralKind(node.kind) || node.hasExtendedUnicodeEscape)) {
                    return getQuotedEscapedLiteralText('"', node.text, '"');
                }

                // If we don't need to downlevel and we can reach the original source text using
                // the node's parent reference, then simply get the text as it was originally written.
                if (node.parent) {
                    return getTextOfNodeFromSourceText(currentText, node);
                }

                // If we can't reach the original source text, use the canonical form if it's a number,
                // or an escaped quoted form of the original text if it's string-like.
                switch (node.kind) {
                    case SyntaxKind.StringLiteral:
                        return getQuotedEscapedLiteralText('"', node.text, '"');
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                        return getQuotedEscapedLiteralText("`", node.text, "`");
                    case SyntaxKind.TemplateHead:
                        return getQuotedEscapedLiteralText("`", node.text, "${");
                    case SyntaxKind.TemplateMiddle:
                        return getQuotedEscapedLiteralText("}", node.text, "${");
                    case SyntaxKind.TemplateTail:
                        return getQuotedEscapedLiteralText("}", node.text, "`");
                    case SyntaxKind.NumericLiteral:
                        return node.text;
                }

                Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
            }

            function getQuotedEscapedLiteralText(leftQuote: string, text: string, rightQuote: string) {
                return leftQuote + escapeNonAsciiCharacters(escapeString(text)) + rightQuote;
            }

            function emitDownlevelRawTemplateLiteral(node: LiteralExpression) {
                // Find original source text, since we need to emit the raw strings of the tagged template.
                // The raw strings contain the (escaped) strings of what the user wrote.
                // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
                let text = getTextOfNodeFromSourceText(currentText, node);

                // text contains the original source, it will also contain quotes ("`"), dollar signs and braces ("${" and "}"),
                // thus we need to remove those characters.
                // First template piece starts with "`", others with "}"
                // Last template piece ends with "`", others with "${"
                const isLast = node.kind === SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === SyntaxKind.TemplateTail;
                text = text.substring(1, text.length - (isLast ? 1 : 2));

                // Newline normalization:
                // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
                // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
                text = text.replace(/\r\n?/g, "\n");
                text = escapeString(text);

                write(`"${text}"`);
            }

            function emitDownlevelTaggedTemplateArray(node: TaggedTemplateExpression, literalEmitter: (literal: LiteralExpression | TemplateLiteralFragment) => void) {
                write("[");
                if (node.template.kind === SyntaxKind.NoSubstitutionTemplateLiteral) {
                    literalEmitter(<LiteralExpression>node.template);
                }
                else {
                    literalEmitter((<TemplateExpression>node.template).head);
                    forEach((<TemplateExpression>node.template).templateSpans, (child) => {
                        write(", ");
                        literalEmitter(child.literal);
                    });
                }
                write("]");
            }

            function emitDownlevelTaggedTemplate(node: TaggedTemplateExpression) {
                const tempVariable = createAndRecordTempVariable(TempFlags.Auto);
                write("(");
                emit(tempVariable);
                write(" = ");
                emitDownlevelTaggedTemplateArray(node, emit);
                write(", ");

                emit(tempVariable);
                write(".raw = ");
                emitDownlevelTaggedTemplateArray(node, emitDownlevelRawTemplateLiteral);
                write(", ");

                emitParenthesizedIf(node.tag, needsParenthesisForPropertyAccessOrInvocation(node.tag));
                write("(");
                emit(tempVariable);

                // Now we emit the expressions
                if (node.template.kind === SyntaxKind.TemplateExpression) {
                    forEach((<TemplateExpression>node.template).templateSpans, templateSpan => {
                        write(", ");
                        const needsParens = templateSpan.expression.kind === SyntaxKind.BinaryExpression
                            && (<BinaryExpression>templateSpan.expression).operatorToken.kind === SyntaxKind.CommaToken;
                        emitParenthesizedIf(templateSpan.expression, needsParens);
                    });
                }
                write("))");
            }

            function emitTemplateExpression(node: TemplateExpression): void {
                // In ES6 mode and above, we can simply emit each portion of a template in order, but in
                // ES3 & ES5 we must convert the template expression into a series of string concatenations.
                if (languageVersion >= ScriptTarget.ES6) {
                    forEachChild(node, emit);
                    return;
                }

                const emitOuterParens = isExpression(node.parent)
                    && templateNeedsParens(node, <Expression>node.parent);

                if (emitOuterParens) {
                    write("(");
                }

                let headEmitted = false;
                if (shouldEmitTemplateHead()) {
                    emitLiteral(node.head);
                    headEmitted = true;
                }

                for (let i = 0, n = node.templateSpans.length; i < n; i++) {
                    const templateSpan = node.templateSpans[i];

                    // Check if the expression has operands and binds its operands less closely than binary '+'.
                    // If it does, we need to wrap the expression in parentheses. Otherwise, something like
                    //    `abc${ 1 << 2 }`
                    // becomes
                    //    "abc" + 1 << 2 + ""
                    // which is really
                    //    ("abc" + 1) << (2 + "")
                    // rather than
                    //    "abc" + (1 << 2) + ""
                    const needsParens = templateSpan.expression.kind !== SyntaxKind.ParenthesizedExpression
                        && comparePrecedenceToBinaryPlus(templateSpan.expression) !== Comparison.GreaterThan;

                    if (i > 0 || headEmitted) {
                        // If this is the first span and the head was not emitted, then this templateSpan's
                        // expression will be the first to be emitted. Don't emit the preceding ' + ' in that
                        // case.
                        write(" + ");
                    }

                    emitParenthesizedIf(templateSpan.expression, needsParens);

                    // Only emit if the literal is non-empty.
                    // The binary '+' operator is left-associative, so the first string concatenation
                    // with the head will force the result up to this point to be a string.
                    // Emitting a '+ ""' has no semantic effect for middles and tails.
                    if (templateSpan.literal.text.length !== 0) {
                        write(" + ");
                        emitLiteral(templateSpan.literal);
                    }
                }

                if (emitOuterParens) {
                    write(")");
                }

                function shouldEmitTemplateHead() {
                    // If this expression has an empty head literal and the first template span has a non-empty
                    // literal, then emitting the empty head literal is not necessary.
                    //     `${ foo } and ${ bar }`
                    // can be emitted as
                    //     foo + " and " + bar
                    // This is because it is only required that one of the first two operands in the emit
                    // output must be a string literal, so that the other operand and all following operands
                    // are forced into strings.
                    //
                    // If the first template span has an empty literal, then the head must still be emitted.
                    //     `${ foo }${ bar }`
                    // must still be emitted as
                    //     "" + foo + bar

                    // There is always atleast one templateSpan in this code path, since
                    // NoSubstitutionTemplateLiterals are directly emitted via emitLiteral()
                    Debug.assert(node.templateSpans.length !== 0);

                    return node.head.text.length !== 0 || node.templateSpans[0].literal.text.length === 0;
                }

                function templateNeedsParens(template: TemplateExpression, parent: Expression) {
                    switch (parent.kind) {
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                            return (<CallExpression>parent).expression === template;
                        case SyntaxKind.TaggedTemplateExpression:
                        case SyntaxKind.ParenthesizedExpression:
                            return false;
                        default:
                            return comparePrecedenceToBinaryPlus(parent) !== Comparison.LessThan;
                    }
                }

                /**
                 * Returns whether the expression has lesser, greater,
                 * or equal precedence to the binary '+' operator
                 */
                function comparePrecedenceToBinaryPlus(expression: Expression): Comparison {
                    // All binary expressions have lower precedence than '+' apart from '*', '/', and '%'
                    // which have greater precedence and '-' which has equal precedence.
                    // All unary operators have a higher precedence apart from yield.
                    // Arrow functions and conditionals have a lower precedence,
                    // although we convert the former into regular function expressions in ES5 mode,
                    // and in ES6 mode this function won't get called anyway.
                    //
                    // TODO (drosen): Note that we need to account for the upcoming 'yield' and
                    //                spread ('...') unary operators that are anticipated for ES6.
                    switch (expression.kind) {
                        case SyntaxKind.BinaryExpression:
                            switch ((<BinaryExpression>expression).operatorToken.kind) {
                                case SyntaxKind.AsteriskToken:
                                case SyntaxKind.SlashToken:
                                case SyntaxKind.PercentToken:
                                    return Comparison.GreaterThan;
                                case SyntaxKind.PlusToken:
                                case SyntaxKind.MinusToken:
                                    return Comparison.EqualTo;
                                default:
                                    return Comparison.LessThan;
                            }
                        case SyntaxKind.YieldExpression:
                        case SyntaxKind.ConditionalExpression:
                            return Comparison.LessThan;
                        default:
                            return Comparison.GreaterThan;
                    }
                }
            }

            function emitTemplateSpan(span: TemplateSpan) {
                emit(span.expression);
                emit(span.literal);
            }

            function jsxEmitReact(node: JsxElement | JsxSelfClosingElement) {
                /// Emit a tag name, which is either '"div"' for lower-cased names, or
                /// 'Div' for upper-cased or dotted names
                function emitTagName(name: LeftHandSideExpression) {
                    if (name.kind === SyntaxKind.Identifier && isIntrinsicJsxName((<Identifier>name).text)) {
                        write('"');
                        emit(name);
                        write('"');
                    }
                    else {
                        emit(name);
                    }
                }

                /// Emit an attribute name, which is quoted if it needs to be quoted. Because
                /// these emit into an object literal property name, we don't need to be worried
                /// about keywords, just non-identifier characters
                function emitAttributeName(name: Identifier) {
                    if (/^[A-Za-z_]\w*$/.test(name.text)) {
                        emit(name);
                    }
                    else {
                        write('"');
                        emit(name);
                        write('"');
                    }
                }

                /// Emit an name/value pair for an attribute (e.g. "x: 3")
                function emitJsxAttribute(node: JsxAttribute) {
                    emitAttributeName(node.name);
                    write(": ");
                    if (node.initializer) {
                        emit(node.initializer);
                    }
                    else {
                        write("true");
                    }
                }

                function emitJsxElement(openingNode: JsxOpeningLikeElement, children?: JsxChild[]) {
                    const syntheticReactRef = <Identifier>createSynthesizedNode(SyntaxKind.Identifier);
                    syntheticReactRef.text = compilerOptions.reactNamespace ? compilerOptions.reactNamespace : "React";
                    syntheticReactRef.parent = openingNode;

                    // Call React.createElement(tag, ...
                    emitLeadingComments(openingNode);
                    emitExpressionIdentifier(syntheticReactRef);
                    write(".createElement(");
                    emitTagName(openingNode.tagName);
                    write(", ");

                    // Attribute list
                    if (openingNode.attributes.length === 0) {
                        // When there are no attributes, React wants "null"
                        write("null");
                    }
                    else {
                        // Either emit one big object literal (no spread attribs), or
                        // a call to the __assign helper
                        const attrs = openingNode.attributes;
                        if (forEach(attrs, attr => attr.kind === SyntaxKind.JsxSpreadAttribute)) {
                            write("__assign(");

                            let haveOpenedObjectLiteral = false;
                            for (let i = 0; i < attrs.length; i++) {
                                if (attrs[i].kind === SyntaxKind.JsxSpreadAttribute) {
                                    // If this is the first argument, we need to emit a {} as the first argument
                                    if (i === 0) {
                                        write("{}, ");
                                    }

                                    if (haveOpenedObjectLiteral) {
                                        write("}");
                                        haveOpenedObjectLiteral = false;
                                    }
                                    if (i > 0) {
                                        write(", ");
                                    }
                                    emit((<JsxSpreadAttribute>attrs[i]).expression);
                                }
                                else {
                                    Debug.assert(attrs[i].kind === SyntaxKind.JsxAttribute);
                                    if (haveOpenedObjectLiteral) {
                                        write(", ");
                                    }
                                    else {
                                        haveOpenedObjectLiteral = true;
                                        if (i > 0) {
                                            write(", ");
                                        }
                                        write("{");
                                    }
                                    emitJsxAttribute(<JsxAttribute>attrs[i]);
                                }
                            }
                            if (haveOpenedObjectLiteral) write("}");

                            write(")"); // closing paren to React.__spread(
                        }
                        else {
                            // One object literal with all the attributes in them
                            write("{");
                            for (let i = 0, n = attrs.length; i < n; i++) {
                                if (i > 0) {
                                    write(", ");
                                }
                                emitJsxAttribute(<JsxAttribute>attrs[i]);
                            }
                            write("}");
                        }
                    }

                    // Children
                    if (children) {
                        let firstChild: JsxChild;
                        let multipleEmittableChildren = false;

                        for (let i = 0, n = children.length; i < n; i++) {
                            const jsxChild = children[i];

                            if (isJsxChildEmittable(jsxChild)) {
                                // we need to decide whether to emit in single line or multiple lines as indented list
                                // store firstChild reference, if we see another emittable child, then emit accordingly
                                if (!firstChild) {
                                    write(", ");
                                    firstChild = jsxChild;
                                }
                                else {
                                    // more than one emittable child, emit indented list
                                    if (!multipleEmittableChildren) {
                                        multipleEmittableChildren = true;
                                        increaseIndent();
                                        writeLine();
                                        emit(firstChild);
                                    }

                                    write(", ");
                                    writeLine();
                                    emit(jsxChild);
                                }
                            }
                        }

                        if (multipleEmittableChildren) {
                            decreaseIndent();
                        }
                        else if (firstChild) {
                            if (firstChild.kind !== SyntaxKind.JsxElement && firstChild.kind !== SyntaxKind.JsxSelfClosingElement) {
                                emit(firstChild);
                            }
                            else {
                                // If the only child is jsx element, put it on a new indented line
                                increaseIndent();
                                writeLine();
                                emit(firstChild);
                                writeLine();
                                decreaseIndent();
                            }
                        }
                    }

                    // Closing paren
                    write(")"); // closes "React.createElement("
                    emitTrailingComments(openingNode);
                }

                if (node.kind === SyntaxKind.JsxElement) {
                    emitJsxElement((<JsxElement>node).openingElement, (<JsxElement>node).children);
                }
                else {
                    Debug.assert(node.kind === SyntaxKind.JsxSelfClosingElement);
                    emitJsxElement(<JsxSelfClosingElement>node);
                }
            }

            function jsxEmitPreserve(node: JsxElement | JsxSelfClosingElement) {
                function emitJsxAttribute(node: JsxAttribute) {
                    emit(node.name);
                    if (node.initializer) {
                        write("=");
                        emit(node.initializer);
                    }
                }

                function emitJsxSpreadAttribute(node: JsxSpreadAttribute) {
                    write("{...");
                    emit(node.expression);
                    write("}");
                }

                function emitAttributes(attribs: NodeArray<JsxAttribute | JsxSpreadAttribute>) {
                    for (let i = 0, n = attribs.length; i < n; i++) {
                        if (i > 0) {
                            write(" ");
                        }

                        if (attribs[i].kind === SyntaxKind.JsxSpreadAttribute) {
                            emitJsxSpreadAttribute(<JsxSpreadAttribute>attribs[i]);
                        }
                        else {
                            Debug.assert(attribs[i].kind === SyntaxKind.JsxAttribute);
                            emitJsxAttribute(<JsxAttribute>attribs[i]);
                        }
                    }
                }

                function emitJsxOpeningOrSelfClosingElement(node: JsxOpeningElement | JsxSelfClosingElement) {
                    write("<");
                    emit(node.tagName);
                    if (node.attributes.length > 0 || (node.kind === SyntaxKind.JsxSelfClosingElement)) {
                        write(" ");
                    }

                    emitAttributes(node.attributes);

                    if (node.kind === SyntaxKind.JsxSelfClosingElement) {
                        write("/>");
                    }
                    else {
                        write(">");
                    }
                }

                function emitJsxClosingElement(node: JsxClosingElement) {
                    write("</");
                    emit(node.tagName);
                    write(">");
                }

                function emitJsxElement(node: JsxElement) {
                    emitJsxOpeningOrSelfClosingElement(node.openingElement);

                    for (let i = 0, n = node.children.length; i < n; i++) {
                        emit(node.children[i]);
                    }

                    emitJsxClosingElement(node.closingElement);
                }

                if (node.kind === SyntaxKind.JsxElement) {
                    emitJsxElement(<JsxElement>node);
                }
                else {
                    Debug.assert(node.kind === SyntaxKind.JsxSelfClosingElement);
                    emitJsxOpeningOrSelfClosingElement(<JsxSelfClosingElement>node);
                }
            }

            // This function specifically handles numeric/string literals for enum and accessor 'identifiers'.
            // In a sense, it does not actually emit identifiers as much as it declares a name for a specific property.
            // For example, this is utilized when feeding in a result to Object.defineProperty.
            function emitExpressionForPropertyName(node: DeclarationName) {
                Debug.assert(node.kind !== SyntaxKind.BindingElement);

                if (node.kind === SyntaxKind.StringLiteral) {
                    emitLiteral(<LiteralExpression>node);
                }
                else if (node.kind === SyntaxKind.ComputedPropertyName) {
                    // if this is a decorated computed property, we will need to capture the result
                    // of the property expression so that we can apply decorators later. This is to ensure
                    // we don't introduce unintended side effects:
                    //
                    //   class C {
                    //     [_a = x]() { }
                    //   }
                    //
                    // The emit for the decorated computed property decorator is:
                    //
                    //   __decorate([dec], C.prototype, _a, Object.getOwnPropertyDescriptor(C.prototype, _a));
                    //
                    if (nodeIsDecorated(node.parent)) {
                        if (!computedPropertyNamesToGeneratedNames) {
                            computedPropertyNamesToGeneratedNames = [];
                        }

                        let generatedName = computedPropertyNamesToGeneratedNames[getNodeId(node)];
                        if (generatedName) {
                            // we have already generated a variable for this node, write that value instead.
                            write(generatedName);
                            return;
                        }

                        generatedName = createAndRecordTempVariable(TempFlags.Auto).text;
                        computedPropertyNamesToGeneratedNames[getNodeId(node)] = generatedName;
                        write(generatedName);
                        write(" = ");
                    }

                    emit((<ComputedPropertyName>node).expression);
                }
                else {
                    write('"');

                    if (node.kind === SyntaxKind.NumericLiteral) {
                        write((<LiteralExpression>node).text);
                    }
                    else {
                        writeTextOfNode(currentText, node);
                    }

                    write('"');
                }
            }

            function isExpressionIdentifier(node: Node): boolean {
                const parent = node.parent;
                switch (parent.kind) {
                    case SyntaxKind.ArrayLiteralExpression:
                    case SyntaxKind.AsExpression:
                    case SyntaxKind.AwaitExpression:
                    case SyntaxKind.BinaryExpression:
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.ComputedPropertyName:
                    case SyntaxKind.ConditionalExpression:
                    case SyntaxKind.Decorator:
                    case SyntaxKind.DeleteExpression:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.ElementAccessExpression:
                    case SyntaxKind.ExportAssignment:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ExpressionWithTypeArguments:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForOfStatement:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.JsxClosingElement:
                    case SyntaxKind.JsxSelfClosingElement:
                    case SyntaxKind.JsxOpeningElement:
                    case SyntaxKind.JsxSpreadAttribute:
                    case SyntaxKind.JsxExpression:
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.NonNullExpression:
                    case SyntaxKind.ParenthesizedExpression:
                    case SyntaxKind.PostfixUnaryExpression:
                    case SyntaxKind.PrefixUnaryExpression:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.ShorthandPropertyAssignment:
                    case SyntaxKind.SpreadElementExpression:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.TaggedTemplateExpression:
                    case SyntaxKind.TemplateSpan:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.TypeAssertionExpression:
                    case SyntaxKind.TypeOfExpression:
                    case SyntaxKind.VoidExpression:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.YieldExpression:
                        return true;
                    case SyntaxKind.BindingElement:
                    case SyntaxKind.EnumMember:
                    case SyntaxKind.Parameter:
                    case SyntaxKind.PropertyAssignment:
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.VariableDeclaration:
                        return (<BindingElement | EnumMember | ParameterDeclaration | PropertyAssignment | PropertyDeclaration | VariableDeclaration>parent).initializer === node;
                    case SyntaxKind.PropertyAccessExpression:
                        return (<ExpressionStatement>parent).expression === node;
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.FunctionExpression:
                        return (<FunctionLikeDeclaration>parent).body === node;
                    case SyntaxKind.ImportEqualsDeclaration:
                        return (<ImportEqualsDeclaration>parent).moduleReference === node;
                    case SyntaxKind.QualifiedName:
                        return (<QualifiedName>parent).left === node;
                }
                return false;
            }

            function emitExpressionIdentifier(node: Identifier) {
                const container = resolver.getReferencedExportContainer(node);
                if (container) {
                    if (container.kind === SyntaxKind.SourceFile) {
                        // Identifier references module export
                        if (modulekind !== ModuleKind.ES6 && modulekind !== ModuleKind.System) {
                            write("exports.");
                        }
                    }
                    else {
                        // Identifier references namespace export
                        write(getGeneratedNameForNode(container));
                        write(".");
                    }
                }
                else {
                    if (modulekind !== ModuleKind.ES6) {
                        const declaration = resolver.getReferencedImportDeclaration(node);
                        if (declaration) {
                            if (declaration.kind === SyntaxKind.ImportClause) {
                                // Identifier references default import
                                write(getGeneratedNameForNode(<ImportDeclaration>declaration.parent));
                                write(languageVersion === ScriptTarget.ES3 ? '["default"]' : ".default");
                                return;
                            }
                            else if (declaration.kind === SyntaxKind.ImportSpecifier) {
                                // Identifier references named import
                                write(getGeneratedNameForNode(<ImportDeclaration>declaration.parent.parent.parent));
                                const name =  (<ImportSpecifier>declaration).propertyName || (<ImportSpecifier>declaration).name;
                                const identifier = getTextOfNodeFromSourceText(currentText, name);
                                if (languageVersion === ScriptTarget.ES3 && identifier === "default") {
                                    write('["default"]');
                                }
                                else {
                                    write(".");
                                    write(identifier);
                                }
                                return;
                            }
                        }
                    }

                    if (languageVersion < ScriptTarget.ES6) {
                        const declaration = resolver.getReferencedDeclarationWithCollidingName(node);
                        if (declaration) {
                            write(getGeneratedNameForNode(declaration.name));
                            return;
                        }
                    }
                    else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.BodyScopedClassBinding) {
                        // Due to the emit for class decorators, any reference to the class from inside of the class body
                        // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
                        // behavior of class names in ES6.
                        const declaration = resolver.getReferencedValueDeclaration(node);
                        if (declaration) {
                            const classAlias = decoratedClassAliases[getNodeId(declaration)];
                            if (classAlias !== undefined) {
                                write(classAlias);
                                return;
                            }
                        }
                    }
                }

                if (nodeIsSynthesized(node)) {
                    write(node.text);
                }
                else {
                    writeTextOfNode(currentText, node);
                }
            }

            function isNameOfNestedBlockScopedRedeclarationOrCapturedBinding(node: Identifier) {
                if (languageVersion < ScriptTarget.ES6) {
                    const parent = node.parent;
                    switch (parent.kind) {
                        case SyntaxKind.BindingElement:
                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.EnumDeclaration:
                        case SyntaxKind.VariableDeclaration:
                            return (<Declaration>parent).name === node && resolver.isDeclarationWithCollidingName(<Declaration>parent);
                    }
                }
                return false;
            }

            function getClassExpressionInPropertyAccessInStaticPropertyDeclaration(node: Identifier) {
                if (languageVersion >= ScriptTarget.ES6) {
                    let parent = node.parent;
                    if (parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>parent).expression === node) {
                        parent = parent.parent;
                        while (parent && parent.kind !== SyntaxKind.PropertyDeclaration) {
                            parent = parent.parent;
                        }
                        return parent && parent.kind === SyntaxKind.PropertyDeclaration && (parent.flags & NodeFlags.Static) !== 0 &&
                            parent.parent.kind === SyntaxKind.ClassExpression ? parent.parent : undefined;
                    }
                }
                return undefined;
            }

            function emitIdentifier(node: Identifier) {
                if (convertedLoopState) {
                    if (node.text == "arguments" && resolver.isArgumentsLocalBinding(node)) {
                        // in converted loop body arguments cannot be used directly.
                        const name = convertedLoopState.argumentsName || (convertedLoopState.argumentsName = makeUniqueName("arguments"));
                        write(name);
                        return;
                    }
                }

                if (!node.parent) {
                    write(node.text);
                }
                else if (isExpressionIdentifier(node)) {
                    const classExpression = getClassExpressionInPropertyAccessInStaticPropertyDeclaration(node);
                    if (classExpression) {
                        const declaration = resolver.getReferencedValueDeclaration(node);
                        if (declaration === classExpression) {
                            write(getGeneratedNameForNode(declaration.name));
                            return;
                        }
                    }
                    emitExpressionIdentifier(node);
                }
                else if (isNameOfNestedBlockScopedRedeclarationOrCapturedBinding(node)) {
                    write(getGeneratedNameForNode(node));
                }
                else if (nodeIsSynthesized(node)) {
                    write(node.text);
                }
                else {
                    writeTextOfNode(currentText, node);
                }
            }

            function emitThis(node: Node) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalThis) {
                    write("_this");
                }
                else if (convertedLoopState) {
                    write(convertedLoopState.thisName || (convertedLoopState.thisName = makeUniqueName("this")));
                }
                else {
                    write("this");
                }
            }

            function emitSuper(node: Node) {
                if (languageVersion >= ScriptTarget.ES6) {
                    write("super");
                }
                else {
                    const flags = resolver.getNodeCheckFlags(node);
                    if (flags & NodeCheckFlags.SuperInstance) {
                        write("_super.prototype");
                    }
                    else {
                        write("_super");
                    }
                }
            }

            function emitObjectBindingPattern(node: BindingPattern) {
                write("{ ");
                const elements = node.elements;
                emitList(elements, 0, elements.length, /*multiLine*/ false, /*trailingComma*/ elements.hasTrailingComma);
                write(" }");
            }

            function emitArrayBindingPattern(node: BindingPattern) {
                write("[");
                const elements = node.elements;
                emitList(elements, 0, elements.length, /*multiLine*/ false, /*trailingComma*/ elements.hasTrailingComma);
                write("]");
            }

            function emitBindingElement(node: BindingElement) {
                if (node.propertyName) {
                    emit(node.propertyName);
                    write(": ");
                }
                if (node.dotDotDotToken) {
                    write("...");
                }
                if (isBindingPattern(node.name)) {
                    emit(node.name);
                }
                else {
                    emitModuleMemberName(node);
                }
                emitOptional(" = ", node.initializer);
            }

            function emitSpreadElementExpression(node: SpreadElementExpression) {
                write("...");
                emit((<SpreadElementExpression>node).expression);
            }

            function emitYieldExpression(node: YieldExpression) {
                write(tokenToString(SyntaxKind.YieldKeyword));
                if (node.asteriskToken) {
                    write("*");
                }
                if (node.expression) {
                    write(" ");
                    emit(node.expression);
                }
            }

            function emitAwaitExpression(node: AwaitExpression) {
                const needsParenthesis = needsParenthesisForAwaitExpressionAsYield(node);
                if (needsParenthesis) {
                    write("(");
                }
                write(tokenToString(SyntaxKind.YieldKeyword));
                write(" ");
                emit(node.expression);
                if (needsParenthesis) {
                    write(")");
                }
            }

            function needsParenthesisForAwaitExpressionAsYield(node: AwaitExpression) {
                if (node.parent.kind === SyntaxKind.BinaryExpression && !isAssignmentOperator((<BinaryExpression>node.parent).operatorToken.kind)) {
                    return true;
                }
                else if (node.parent.kind === SyntaxKind.ConditionalExpression && (<ConditionalExpression>node.parent).condition === node) {
                    return true;
                }

                return false;
            }

            function needsParenthesisForPropertyAccessOrInvocation(node: Expression) {
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                    case SyntaxKind.ArrayLiteralExpression:
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.ElementAccessExpression:
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.ParenthesizedExpression:
                        // This list is not exhaustive and only includes those cases that are relevant
                        // to the check in emitArrayLiteral. More cases can be added as needed.
                        return false;
                }
                return true;
            }

            function emitListWithSpread(elements: Expression[], needsUniqueCopy: boolean, multiLine: boolean, trailingComma: boolean, useConcat: boolean) {
                let pos = 0;
                let group = 0;
                const length = elements.length;
                while (pos < length) {
                    // Emit using the pattern <group0>.concat(<group1>, <group2>, ...)
                    if (group === 1 && useConcat) {
                        write(".concat(");
                    }
                    else if (group > 0) {
                        write(", ");
                    }
                    let e = elements[pos];
                    if (e.kind === SyntaxKind.SpreadElementExpression) {
                        e = (<SpreadElementExpression>e).expression;
                        emitParenthesizedIf(e, /*parenthesized*/ group === 0 && needsParenthesisForPropertyAccessOrInvocation(e));
                        pos++;
                        if (pos === length && group === 0 && needsUniqueCopy && e.kind !== SyntaxKind.ArrayLiteralExpression) {
                            write(".slice()");
                        }
                    }
                    else {
                        let i = pos;
                        while (i < length && elements[i].kind !== SyntaxKind.SpreadElementExpression) {
                            i++;
                        }
                        write("[");
                        if (multiLine) {
                            increaseIndent();
                        }
                        emitList(elements, pos, i - pos, multiLine, trailingComma && i === length);
                        if (multiLine) {
                            decreaseIndent();
                        }
                        write("]");
                        pos = i;
                    }
                    group++;
                }
                if (group > 1) {
                    if (useConcat) {
                        write(")");
                    }
                }
            }

            function isSpreadElementExpression(node: Node) {
                return node.kind === SyntaxKind.SpreadElementExpression;
            }

            function emitArrayLiteral(node: ArrayLiteralExpression) {
                const elements = node.elements;
                if (elements.length === 0) {
                    write("[]");
                }
                else if (languageVersion >= ScriptTarget.ES6 || !forEach(elements, isSpreadElementExpression)) {
                    write("[");
                    emitLinePreservingList(node, node.elements, elements.hasTrailingComma, /*spacesBetweenBraces*/ false);
                    write("]");
                }
                else {
                    emitListWithSpread(elements, /*needsUniqueCopy*/ true, /*multiLine*/ node.multiLine,
                        /*trailingComma*/ elements.hasTrailingComma, /*useConcat*/ true);
                }
            }

            function emitObjectLiteralBody(node: ObjectLiteralExpression, numElements: number): void {
                if (numElements === 0) {
                    write("{}");
                    return;
                }

                write("{");

                if (numElements > 0) {
                    const properties = node.properties;

                    // If we are not doing a downlevel transformation for object literals,
                    // then try to preserve the original shape of the object literal.
                    // Otherwise just try to preserve the formatting.
                    if (numElements === properties.length) {
                        emitLinePreservingList(node, properties, /*allowTrailingComma*/ languageVersion >= ScriptTarget.ES5, /*spacesBetweenBraces*/ true);
                    }
                    else {
                        const multiLine = node.multiLine;
                        if (!multiLine) {
                            write(" ");
                        }
                        else {
                            increaseIndent();
                        }

                        emitList(properties, 0, numElements, /*multiLine*/ multiLine, /*trailingComma*/ false);

                        if (!multiLine) {
                            write(" ");
                        }
                        else {
                            decreaseIndent();
                        }
                    }
                }

                write("}");
            }

            function emitDownlevelObjectLiteralWithComputedProperties(node: ObjectLiteralExpression, firstComputedPropertyIndex: number) {
                const multiLine = node.multiLine;
                const properties = node.properties;

                write("(");

                if (multiLine) {
                    increaseIndent();
                }

                // For computed properties, we need to create a unique handle to the object
                // literal so we can modify it without risking internal assignments tainting the object.
                const tempVar = createAndRecordTempVariable(TempFlags.Auto);

                // Write out the first non-computed properties
                // (or all properties if none of them are computed),
                // then emit the rest through indexing on the temp variable.
                emit(tempVar);
                write(" = ");
                emitObjectLiteralBody(node, firstComputedPropertyIndex);

                for (let i = firstComputedPropertyIndex, n = properties.length; i < n; i++) {
                    writeComma();

                    const property = properties[i];

                    emitStart(property);
                    if (property.kind === SyntaxKind.GetAccessor || property.kind === SyntaxKind.SetAccessor) {
                        // TODO (drosen): Reconcile with 'emitMemberFunctions'.
                        const accessors = getAllAccessorDeclarations(node.properties, <AccessorDeclaration>property);
                        if (property !== accessors.firstAccessor) {
                            continue;
                        }
                        write("Object.defineProperty(");
                        emit(tempVar);
                        write(", ");
                        emitStart(property.name);
                        emitExpressionForPropertyName(property.name);
                        emitEnd(property.name);
                        write(", {");
                        increaseIndent();
                        if (accessors.getAccessor) {
                            writeLine();
                            emitLeadingComments(accessors.getAccessor);
                            write("get: ");
                            emitStart(accessors.getAccessor);
                            write("function ");
                            emitSignatureAndBody(accessors.getAccessor);
                            emitEnd(accessors.getAccessor);
                            emitTrailingComments(accessors.getAccessor);
                            write(",");
                        }
                        if (accessors.setAccessor) {
                            writeLine();
                            emitLeadingComments(accessors.setAccessor);
                            write("set: ");
                            emitStart(accessors.setAccessor);
                            write("function ");
                            emitSignatureAndBody(accessors.setAccessor);
                            emitEnd(accessors.setAccessor);
                            emitTrailingComments(accessors.setAccessor);
                            write(",");
                        }
                        writeLine();
                        write("enumerable: true,");
                        writeLine();
                        write("configurable: true");
                        decreaseIndent();
                        writeLine();
                        write("})");
                        emitEnd(property);
                    }
                    else {
                        emitLeadingComments(property);
                        emitStart(property.name);
                        emit(tempVar);
                        emitMemberAccessForPropertyName(property.name);
                        emitEnd(property.name);

                        write(" = ");

                        if (property.kind === SyntaxKind.PropertyAssignment) {
                            emit((<PropertyAssignment>property).initializer);
                        }
                        else if (property.kind === SyntaxKind.ShorthandPropertyAssignment) {
                            emitExpressionIdentifier((<ShorthandPropertyAssignment>property).name);
                        }
                        else if (property.kind === SyntaxKind.MethodDeclaration) {
                            emitFunctionDeclaration(<MethodDeclaration>property);
                        }
                        else {
                            Debug.fail("ObjectLiteralElement type not accounted for: " + property.kind);
                        }
                    }

                    emitEnd(property);
                }

                writeComma();
                emit(tempVar);

                if (multiLine) {
                    decreaseIndent();
                    writeLine();
                }

                write(")");

                function writeComma() {
                    if (multiLine) {
                        write(",");
                        writeLine();
                    }
                    else {
                        write(", ");
                    }
                }
            }

            function emitObjectLiteral(node: ObjectLiteralExpression): void {
                const properties = node.properties;

                if (languageVersion < ScriptTarget.ES6) {
                    const numProperties = properties.length;

                    // Find the first computed property.
                    // Everything until that point can be emitted as part of the initial object literal.
                    let numInitialNonComputedProperties = numProperties;
                    for (let i = 0, n = properties.length; i < n; i++) {
                        if (properties[i].name.kind === SyntaxKind.ComputedPropertyName) {
                            numInitialNonComputedProperties = i;
                            break;
                        }
                    }

                    const hasComputedProperty = numInitialNonComputedProperties !== properties.length;
                    if (hasComputedProperty) {
                        emitDownlevelObjectLiteralWithComputedProperties(node, numInitialNonComputedProperties);
                        return;
                    }
                }

                // Ordinary case: either the object has no computed properties
                // or we're compiling with an ES6+ target.
                emitObjectLiteralBody(node, properties.length);
            }

            function createBinaryExpression(left: Expression, operator: SyntaxKind, right: Expression, startsOnNewLine?: boolean): BinaryExpression {
                const result = <BinaryExpression>createSynthesizedNode(SyntaxKind.BinaryExpression, startsOnNewLine);
                result.operatorToken = createSynthesizedNode(operator);
                result.left = left;
                result.right = right;

                return result;
            }

            function createPropertyAccessExpression(expression: Expression, name: Identifier): PropertyAccessExpression {
                const result = <PropertyAccessExpression>createSynthesizedNode(SyntaxKind.PropertyAccessExpression);
                result.expression = parenthesizeForAccess(expression);
                result.name = name;
                return result;
            }

            function createElementAccessExpression(expression: Expression, argumentExpression: Expression): ElementAccessExpression {
                const result = <ElementAccessExpression>createSynthesizedNode(SyntaxKind.ElementAccessExpression);
                result.expression = parenthesizeForAccess(expression);
                result.argumentExpression = argumentExpression;

                return result;
            }

            function parenthesizeForAccess(expr: Expression): LeftHandSideExpression {
                // When diagnosing whether the expression needs parentheses, the decision should be based
                // on the innermost expression in a chain of nested type assertions.
                while (expr.kind === SyntaxKind.TypeAssertionExpression ||
                    expr.kind === SyntaxKind.AsExpression ||
                    expr.kind === SyntaxKind.NonNullExpression) {
                    expr = (<AssertionExpression | NonNullExpression>expr).expression;
                }

                // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
                // to parenthesize the expression before a dot. The known exceptions are:
                //
                //    NewExpression:
                //       new C.x        -> not the same as (new C).x
                //    NumberLiteral
                //       1.x            -> not the same as (1).x
                //
                if (isLeftHandSideExpression(expr) &&
                    expr.kind !== SyntaxKind.NewExpression &&
                    expr.kind !== SyntaxKind.NumericLiteral) {

                    return <LeftHandSideExpression>expr;
                }
                const node = <ParenthesizedExpression>createSynthesizedNode(SyntaxKind.ParenthesizedExpression);
                node.expression = expr;
                return node;
            }

            function emitComputedPropertyName(node: ComputedPropertyName) {
                write("[");
                emitExpressionForPropertyName(node);
                write("]");
            }

            function emitMethod(node: MethodDeclaration) {
                if (languageVersion >= ScriptTarget.ES6 && node.asteriskToken) {
                    write("*");
                }

                emit(node.name);
                if (languageVersion < ScriptTarget.ES6) {
                    write(": function ");
                }
                emitSignatureAndBody(node);
            }

            function emitPropertyAssignment(node: PropertyDeclaration) {
                emit(node.name);
                write(": ");
                // This is to ensure that we emit comment in the following case:
                //      For example:
                //          obj = {
                //              id: /*comment1*/ ()=>void
                //          }
                // "comment1" is not considered to be leading comment for node.initializer
                // but rather a trailing comment on the previous node.
                emitTrailingCommentsOfPosition(node.initializer.pos);
                emit(node.initializer);
            }

            // Return true if identifier resolves to an exported member of a namespace
            function isExportReference(node: Identifier) {
                const container = resolver.getReferencedExportContainer(node);
                return !!container;
            }

            // Return true if identifier resolves to an imported identifier
            function isImportedReference(node: Identifier) {
                const declaration = resolver.getReferencedImportDeclaration(node);
                return declaration && (declaration.kind === SyntaxKind.ImportClause || declaration.kind === SyntaxKind.ImportSpecifier);
            }

            function emitShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
                // The name property of a short-hand property assignment is considered an expression position, so here
                // we manually emit the identifier to avoid rewriting.
                writeTextOfNode(currentText, node.name);
                // If emitting pre-ES6 code, or if the name requires rewriting when resolved as an expression identifier,
                // we emit a normal property assignment. For example:
                //   module m {
                //       export let y;
                //   }
                //   module m {
                //       let obj = { y };
                //   }
                // Here we need to emit obj = { y : m.y } regardless of the output target.
                // The same rules apply for imported identifiers when targeting module formats with indirect access to
                // the imported identifiers. For example, when targeting CommonJS:
                //
                //   import {foo} from './foo';
                //   export const baz = { foo };
                //
                // Must be transformed into:
                //
                //   const foo_1 = require('./foo');
                //   exports.baz = { foo: foo_1.foo };
                //
                if (languageVersion < ScriptTarget.ES6 || (modulekind !== ModuleKind.ES6 && isImportedReference(node.name)) || isExportReference(node.name)) {
                    // Emit identifier as an identifier
                    write(": ");
                    emitExpressionIdentifier(node.name);
                }

                if (languageVersion >= ScriptTarget.ES6 && node.objectAssignmentInitializer) {
                    write(" = ");
                    emit(node.objectAssignmentInitializer);
                }
            }

            function tryEmitConstantValue(node: PropertyAccessExpression | ElementAccessExpression): boolean {
                const constantValue = tryGetConstEnumValue(node);
                if (constantValue !== undefined) {
                    write(constantValue.toString());
                    if (!compilerOptions.removeComments) {
                        const propertyName: string = node.kind === SyntaxKind.PropertyAccessExpression ? declarationNameToString((<PropertyAccessExpression>node).name) : getTextOfNode((<ElementAccessExpression>node).argumentExpression);
                        write(" /* " + propertyName + " */");
                    }
                    return true;
                }
                return false;
            }

            function tryGetConstEnumValue(node: Node): number {
                if (compilerOptions.isolatedModules) {
                    return undefined;
                }

                return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression
                    ? resolver.getConstantValue(<PropertyAccessExpression | ElementAccessExpression>node)
                    : undefined;
            }

            // Returns 'true' if the code was actually indented, false otherwise.
            // If the code is not indented, an optional valueToWriteWhenNotIndenting will be
            // emitted instead.
            function indentIfOnDifferentLines(parent: Node, node1: TextRange, node2: TextRange, valueToWriteWhenNotIndenting?: string): boolean {
                const realNodesAreOnDifferentLines = !nodeIsSynthesized(parent) && !nodeEndIsOnSameLineAsNodeStart(node1, node2);

                // Always use a newline for synthesized code if the synthesizer desires it.
                const synthesizedNodeIsOnDifferentLine = synthesizedNodeStartsOnNewLine(node2 as Node);

                if (realNodesAreOnDifferentLines || synthesizedNodeIsOnDifferentLine) {
                    increaseIndent();
                    writeLine();
                    return true;
                }
                else {
                    if (valueToWriteWhenNotIndenting) {
                        write(valueToWriteWhenNotIndenting);
                    }
                    return false;
                }
            }

            function emitPropertyAccess(node: PropertyAccessExpression) {
                if (tryEmitConstantValue(node)) {
                    return;
                }

                if (languageVersion === ScriptTarget.ES6 &&
                    node.expression.kind === SyntaxKind.SuperKeyword &&
                    isInAsyncMethodWithSuperInES6(node)) {
                    const name = <StringLiteral>createSynthesizedNode(SyntaxKind.StringLiteral);
                    name.text = node.name.text;
                    emitSuperAccessInAsyncMethod(node.expression, name);
                    return;
                }

                emit(node.expression);
                const dotRangeStart = nodeIsSynthesized(node.expression) ? -1 : node.expression.end;
                const dotRangeEnd = nodeIsSynthesized(node.expression) ? -1 : skipTrivia(currentText, node.expression.end) + 1;
                const dotToken = <TextRange>{ pos: dotRangeStart, end: dotRangeEnd };
                const indentedBeforeDot = indentIfOnDifferentLines(node, node.expression, dotToken);

                // 1 .toString is a valid property access, emit a space after the literal
                // Also emit a space if expression is a integer const enum value - it will appear in generated code as numeric literal
                let shouldEmitSpace = false;
                if (!indentedBeforeDot) {
                    if (node.expression.kind === SyntaxKind.NumericLiteral) {
                        // check if numeric literal was originally written with a dot
                        const text = getTextOfNodeFromSourceText(currentText, node.expression);
                        shouldEmitSpace = text.indexOf(tokenToString(SyntaxKind.DotToken)) < 0;
                    }
                    else {
                        // check if constant enum value is integer
                        const constantValue = tryGetConstEnumValue(node.expression);
                        // isFinite handles cases when constantValue is undefined
                        shouldEmitSpace = isFinite(constantValue) && Math.floor(constantValue) === constantValue;
                    }
                }

                if (shouldEmitSpace) {
                    write(" .");
                }
                else {
                    write(".");
                }

                const indentedAfterDot = indentIfOnDifferentLines(node, dotToken, node.name);
                emit(node.name);
                decreaseIndentIf(indentedBeforeDot, indentedAfterDot);
            }

            function emitQualifiedName(node: QualifiedName) {
                emit(node.left);
                write(".");
                emit(node.right);
            }

            function emitQualifiedNameAsExpression(node: QualifiedName, useFallback: boolean) {
                if (node.left.kind === SyntaxKind.Identifier) {
                    emitEntityNameAsExpression(node.left, useFallback);
                }
                else if (useFallback) {
                    const temp = createAndRecordTempVariable(TempFlags.Auto);
                    write("(");
                    emitNodeWithoutSourceMap(temp);
                    write(" = ");
                    emitEntityNameAsExpression(node.left, /*useFallback*/ true);
                    write(") && ");
                    emitNodeWithoutSourceMap(temp);
                }
                else {
                    emitEntityNameAsExpression(node.left, /*useFallback*/ false);
                }

                write(".");
                emit(node.right);
            }

            function emitEntityNameAsExpression(node: EntityName | Expression, useFallback: boolean) {
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                        if (useFallback) {
                            write("typeof ");
                            emitExpressionIdentifier(<Identifier>node);
                            write(" !== 'undefined' && ");
                        }

                        emitExpressionIdentifier(<Identifier>node);
                        break;

                    case SyntaxKind.QualifiedName:
                        emitQualifiedNameAsExpression(<QualifiedName>node, useFallback);
                        break;

                    default:
                        emitNodeWithoutSourceMap(node);
                        break;
                }
            }

            function emitIndexedAccess(node: ElementAccessExpression) {
                if (tryEmitConstantValue(node)) {
                    return;
                }

                if (languageVersion === ScriptTarget.ES6 &&
                    node.expression.kind === SyntaxKind.SuperKeyword &&
                    isInAsyncMethodWithSuperInES6(node)) {
                    emitSuperAccessInAsyncMethod(node.expression, node.argumentExpression);
                    return;
                }

                emit(node.expression);
                write("[");
                emit(node.argumentExpression);
                write("]");
            }

            function hasSpreadElement(elements: Expression[]) {
                return forEach(elements, e => e.kind === SyntaxKind.SpreadElementExpression);
            }

            function skipParentheses(node: Expression): Expression {
                while (node.kind === SyntaxKind.ParenthesizedExpression ||
                    node.kind === SyntaxKind.TypeAssertionExpression ||
                    node.kind === SyntaxKind.AsExpression ||
                    node.kind === SyntaxKind.NonNullExpression) {
                    node = (<ParenthesizedExpression | AssertionExpression | NonNullExpression>node).expression;
                }
                return node;
            }

            function emitCallTarget(node: Expression): Expression {
                if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisKeyword || node.kind === SyntaxKind.SuperKeyword) {
                    emit(node);
                    return node;
                }
                const temp = createAndRecordTempVariable(TempFlags.Auto);

                write("(");
                emit(temp);
                write(" = ");
                emit(node);
                write(")");
                return temp;
            }

            function emitCallWithSpread(node: CallExpression) {
                let target: Expression;
                const expr = skipParentheses(node.expression);
                if (expr.kind === SyntaxKind.PropertyAccessExpression) {
                    // Target will be emitted as "this" argument
                    target = emitCallTarget((<PropertyAccessExpression>expr).expression);
                    write(".");
                    emit((<PropertyAccessExpression>expr).name);
                }
                else if (expr.kind === SyntaxKind.ElementAccessExpression) {
                    // Target will be emitted as "this" argument
                    target = emitCallTarget((<PropertyAccessExpression>expr).expression);
                    write("[");
                    emit((<ElementAccessExpression>expr).argumentExpression);
                    write("]");
                }
                else if (expr.kind === SyntaxKind.SuperKeyword) {
                    target = expr;
                    write("_super");
                }
                else {
                    emit(node.expression);
                }
                write(".apply(");
                if (target) {
                    if (target.kind === SyntaxKind.SuperKeyword) {
                        // Calls of form super(...) and super.foo(...)
                        emitThis(target);
                    }
                    else {
                        // Calls of form obj.foo(...)
                        emit(target);
                    }
                }
                else {
                    // Calls of form foo(...)
                    write("void 0");
                }
                write(", ");
                emitListWithSpread(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false, /*trailingComma*/ false, /*useConcat*/ true);
                write(")");
            }

            function isInAsyncMethodWithSuperInES6(node: Node) {
                if (languageVersion === ScriptTarget.ES6) {
                    const container = getSuperContainer(node, /*includeFunctions*/ false);
                    if (container && resolver.getNodeCheckFlags(container) & (NodeCheckFlags.AsyncMethodWithSuper | NodeCheckFlags.AsyncMethodWithSuperBinding)) {
                        return true;
                    }
                }

                return false;
            }

            function emitSuperAccessInAsyncMethod(superNode: Node, argumentExpression: Expression) {
                const container = getSuperContainer(superNode, /*includeFunctions*/ false);
                const isSuperBinding = resolver.getNodeCheckFlags(container) & NodeCheckFlags.AsyncMethodWithSuperBinding;
                write("_super(");
                emit(argumentExpression);
                write(isSuperBinding ? ").value" : ")");
            }

            function emitCallExpression(node: CallExpression) {
                if (languageVersion < ScriptTarget.ES6 && hasSpreadElement(node.arguments)) {
                    emitCallWithSpread(node);
                    return;
                }

                const expression = node.expression;
                let superCall = false;
                let isAsyncMethodWithSuper = false;
                if (expression.kind === SyntaxKind.SuperKeyword) {
                    emitSuper(expression);
                    superCall = true;
                }
                else {
                    superCall = isSuperPropertyOrElementAccess(expression);
                    isAsyncMethodWithSuper = superCall && isInAsyncMethodWithSuperInES6(node);
                    emit(expression);
                }

                if (superCall && (languageVersion < ScriptTarget.ES6 || isAsyncMethodWithSuper)) {
                    write(".call(");
                    emitThis(expression);
                    if (node.arguments.length) {
                        write(", ");
                        emitCommaList(node.arguments);
                    }
                    write(")");
                }
                else {
                    write("(");
                    emitCommaList(node.arguments);
                    write(")");
                }
            }

            function emitNewExpression(node: NewExpression) {
                write("new ");

                // Spread operator logic is supported in new expressions in ES5 using a combination
                // of Function.prototype.bind() and Function.prototype.apply().
                //
                //     Example:
                //
                //         var args = [1, 2, 3, 4, 5];
                //         new Array(...args);
                //
                //     is compiled into the following ES5:
                //
                //         var args = [1, 2, 3, 4, 5];
                //         new (Array.bind.apply(Array, [void 0].concat(args)));
                //
                // The 'thisArg' to 'bind' is ignored when invoking the result of 'bind' with 'new',
                // Thus, we set it to undefined ('void 0').
                if (languageVersion === ScriptTarget.ES5 &&
                    node.arguments &&
                    hasSpreadElement(node.arguments)) {

                    write("(");
                    const target = emitCallTarget(node.expression);
                    write(".bind.apply(");
                    emit(target);
                    write(", [void 0].concat(");
                    emitListWithSpread(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false, /*trailingComma*/ false, /*useConcat*/ false);
                    write(")))");
                    write("()");
                }
                else {
                    emit(node.expression);
                    if (node.arguments) {
                        write("(");
                        emitCommaList(node.arguments);
                        write(")");
                    }
                }
            }

            function emitTaggedTemplateExpression(node: TaggedTemplateExpression): void {
                if (languageVersion >= ScriptTarget.ES6) {
                    emit(node.tag);
                    write(" ");
                    emit(node.template);
                }
                else {
                    emitDownlevelTaggedTemplate(node);
                }
            }

            function emitParenExpression(node: ParenthesizedExpression) {
                // If the node is synthesized, it means the emitter put the parentheses there,
                // not the user. If we didn't want them, the emitter would not have put them
                // there.
                if (!nodeIsSynthesized(node) && node.parent.kind !== SyntaxKind.ArrowFunction) {
                    if (node.expression.kind === SyntaxKind.TypeAssertionExpression ||
                        node.expression.kind === SyntaxKind.AsExpression ||
                        node.expression.kind === SyntaxKind.NonNullExpression) {
                        let operand = (<TypeAssertion | NonNullExpression>node.expression).expression;

                        // Make sure we consider all nested cast expressions, e.g.:
                        // (<any><number><any>-A).x;
                        while (operand.kind === SyntaxKind.TypeAssertionExpression ||
                            operand.kind === SyntaxKind.AsExpression ||
                            operand.kind === SyntaxKind.NonNullExpression) {
                            operand = (<TypeAssertion | NonNullExpression>operand).expression;
                        }

                        // We have an expression of the form: (<Type>SubExpr)
                        // Emitting this as (SubExpr) is really not desirable. We would like to emit the subexpr as is.
                        // Omitting the parentheses, however, could cause change in the semantics of the generated
                        // code if the casted expression has a lower precedence than the rest of the expression, e.g.:
                        //      (<any>new A).foo should be emitted as (new A).foo and not new A.foo
                        //      (<any>typeof A).toString() should be emitted as (typeof A).toString() and not typeof A.toString()
                        //      new (<any>A()) should be emitted as new (A()) and not new A()
                        //      (<any>function foo() { })() should be emitted as an IIF (function foo(){})() and not declaration function foo(){} ()
                        if (operand.kind !== SyntaxKind.PrefixUnaryExpression &&
                            operand.kind !== SyntaxKind.VoidExpression &&
                            operand.kind !== SyntaxKind.TypeOfExpression &&
                            operand.kind !== SyntaxKind.DeleteExpression &&
                            operand.kind !== SyntaxKind.PostfixUnaryExpression &&
                            operand.kind !== SyntaxKind.NewExpression &&
                            !(operand.kind === SyntaxKind.CallExpression && node.parent.kind === SyntaxKind.NewExpression) &&
                            !(operand.kind === SyntaxKind.FunctionExpression && node.parent.kind === SyntaxKind.CallExpression) &&
                            !(operand.kind === SyntaxKind.NumericLiteral && node.parent.kind === SyntaxKind.PropertyAccessExpression)) {
                            emit(operand);
                            return;
                        }
                    }
                }

                write("(");
                emit(node.expression);
                write(")");
            }

            function emitDeleteExpression(node: DeleteExpression) {
                write(tokenToString(SyntaxKind.DeleteKeyword));
                write(" ");
                emit(node.expression);
            }

            function emitVoidExpression(node: VoidExpression) {
                write(tokenToString(SyntaxKind.VoidKeyword));
                write(" ");
                emit(node.expression);
            }

            function emitTypeOfExpression(node: TypeOfExpression) {
                write(tokenToString(SyntaxKind.TypeOfKeyword));
                write(" ");
                emit(node.expression);
            }

            function isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node: Node): boolean {
                if (!isCurrentFileSystemExternalModule() || node.kind !== SyntaxKind.Identifier || nodeIsSynthesized(node)) {
                    return false;
                }

                const isVariableDeclarationOrBindingElement =
                    node.parent && (node.parent.kind === SyntaxKind.VariableDeclaration || node.parent.kind === SyntaxKind.BindingElement);

                const targetDeclaration =
                    isVariableDeclarationOrBindingElement
                        ? <Declaration>node.parent
                        : resolver.getReferencedValueDeclaration(<Identifier>node);

                return isSourceFileLevelDeclarationInSystemJsModule(targetDeclaration, /*isExported*/ true);
            }

            function isNameOfExportedDeclarationInNonES6Module(node: Node): boolean {
                if (modulekind === ModuleKind.System || node.kind !== SyntaxKind.Identifier || nodeIsSynthesized(node)) {
                    return false;
                }

                return !exportEquals && exportSpecifiers && hasProperty(exportSpecifiers, (<Identifier>node).text);
            }

            function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
                const isPlusPlusOrMinusMinus = (node.operator === SyntaxKind.PlusPlusToken
                    || node.operator === SyntaxKind.MinusMinusToken);
                const externalExportChanged = isPlusPlusOrMinusMinus &&
                    isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.operand);

                if (externalExportChanged) {
                    // emit
                    // ++x
                    // as
                    // exports('x', ++x)
                    write(`${exportFunctionForFile}("`);
                    emitNodeWithoutSourceMap(node.operand);
                    write(`", `);
                }
                const internalExportChanged = isPlusPlusOrMinusMinus &&
                    isNameOfExportedDeclarationInNonES6Module(node.operand);

                if (internalExportChanged) {
                    emitAliasEqual(<Identifier> node.operand);
                }

                write(tokenToString(node.operator));
                // In some cases, we need to emit a space between the operator and the operand. One obvious case
                // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
                // and minus expressions in certain cases. Specifically, consider the following two cases (parens
                // are just for clarity of exposition, and not part of the source code):
                //
                //  (+(+1))
                //  (+(++1))
                //
                // We need to emit a space in both cases. In the first case, the absence of a space will make
                // the resulting expression a prefix increment operation. And in the second, it will make the resulting
                // expression a prefix increment whose operand is a plus expression - (++(+x))
                // The same is true of minus of course.
                if (node.operand.kind === SyntaxKind.PrefixUnaryExpression) {
                    const operand = <PrefixUnaryExpression>node.operand;
                    if (node.operator === SyntaxKind.PlusToken && (operand.operator === SyntaxKind.PlusToken || operand.operator === SyntaxKind.PlusPlusToken)) {
                        write(" ");
                    }
                    else if (node.operator === SyntaxKind.MinusToken && (operand.operator === SyntaxKind.MinusToken || operand.operator === SyntaxKind.MinusMinusToken)) {
                        write(" ");
                    }
                }
                emit(node.operand);

                if (externalExportChanged) {
                    write(")");
                }
            }

            function emitPostfixUnaryExpression(node: PostfixUnaryExpression) {
                const externalExportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.operand);
                const internalExportChanged = isNameOfExportedDeclarationInNonES6Module(node.operand);

                if (externalExportChanged) {
                    // export function returns the value that was passes as the second argument
                    // however for postfix unary expressions result value should be the value before modification.
                    // emit 'x++' as '(export('x', ++x) - 1)' and 'x--' as '(export('x', --x) + 1)'
                    write(`(${exportFunctionForFile}("`);
                    emitNodeWithoutSourceMap(node.operand);
                    write(`", `);

                    write(tokenToString(node.operator));
                    emit(node.operand);

                    if (node.operator === SyntaxKind.PlusPlusToken) {
                        write(") - 1)");
                    }
                    else {
                        write(") + 1)");
                    }
                }
                else if (internalExportChanged) {
                    emitAliasEqual(<Identifier> node.operand);
                    emit(node.operand);
                    if (node.operator === SyntaxKind.PlusPlusToken) {
                        write(" += 1");
                    }
                    else {
                        write(" -= 1");
                    }
                }
                else {
                    emit(node.operand);
                    write(tokenToString(node.operator));
                }
            }

            function shouldHoistDeclarationInSystemJsModule(node: Node): boolean {
                return isSourceFileLevelDeclarationInSystemJsModule(node, /*isExported*/ false);
            }

            /*
             * Checks if given node is a source file level declaration (not nested in module/function).
             * If 'isExported' is true - then declaration must also be exported.
             * This function is used in two cases:
             * - check if node is a exported source file level value to determine
             *   if we should also export the value after its it changed
             * - check if node is a source level declaration to emit it differently,
             *   i.e non-exported variable statement 'var x = 1' is hoisted so
             *   we we emit variable statement 'var' should be dropped.
             */
            function isSourceFileLevelDeclarationInSystemJsModule(node: Node, isExported: boolean): boolean {
                if (!node || !isCurrentFileSystemExternalModule()) {
                    return false;
                }

                let current = getRootDeclaration(node).parent;
                while (current) {
                    if (current.kind === SyntaxKind.SourceFile) {
                        return !isExported || ((getCombinedNodeFlags(node) & NodeFlags.Export) !== 0);
                    }
                    else if (isDeclaration(current)) {
                        return false;
                    }
                    else {
                        current = current.parent;
                    }
                }
            }

            /**
             * Emit ES7 exponentiation operator downlevel using Math.pow
             * @param node a binary expression node containing exponentiationOperator (**, **=)
             */
            function emitExponentiationOperator(node: BinaryExpression) {
                const leftHandSideExpression = node.left;
                if (node.operatorToken.kind === SyntaxKind.AsteriskAsteriskEqualsToken) {
                    let synthesizedLHS: ElementAccessExpression | PropertyAccessExpression;
                    let shouldEmitParentheses = false;
                    if (isElementAccessExpression(leftHandSideExpression)) {
                        shouldEmitParentheses = true;
                        write("(");

                        synthesizedLHS = <ElementAccessExpression>createSynthesizedNode(SyntaxKind.ElementAccessExpression, /*startsOnNewLine*/ false);

                        const identifier = emitTempVariableAssignment(leftHandSideExpression.expression, /*canDefineTempVariablesInPlace*/ false, /*shouldEmitCommaBeforeAssignment*/ false);
                        synthesizedLHS.expression = identifier;

                        if (leftHandSideExpression.argumentExpression.kind !== SyntaxKind.NumericLiteral &&
                            leftHandSideExpression.argumentExpression.kind !== SyntaxKind.StringLiteral) {
                            const tempArgumentExpression = createAndRecordTempVariable(TempFlags._i);
                            (<ElementAccessExpression>synthesizedLHS).argumentExpression = tempArgumentExpression;
                            emitAssignment(tempArgumentExpression, leftHandSideExpression.argumentExpression, /*shouldEmitCommaBeforeAssignment*/ true, leftHandSideExpression.expression);
                        }
                        else {
                            (<ElementAccessExpression>synthesizedLHS).argumentExpression = leftHandSideExpression.argumentExpression;
                        }
                        write(", ");
                    }
                    else if (isPropertyAccessExpression(leftHandSideExpression)) {
                        shouldEmitParentheses = true;
                        write("(");
                        synthesizedLHS = <PropertyAccessExpression>createSynthesizedNode(SyntaxKind.PropertyAccessExpression, /*startsOnNewLine*/ false);

                        const identifier = emitTempVariableAssignment(leftHandSideExpression.expression, /*canDefineTempVariablesInPlace*/ false, /*shouldEmitCommaBeforeAssignment*/ false);
                        synthesizedLHS.expression = identifier;

                        (<PropertyAccessExpression>synthesizedLHS).name = leftHandSideExpression.name;
                        write(", ");
                    }

                    emit(synthesizedLHS || leftHandSideExpression);
                    write(" = ");
                    write("Math.pow(");
                    emit(synthesizedLHS || leftHandSideExpression);
                    write(", ");
                    emit(node.right);
                    write(")");
                    if (shouldEmitParentheses) {
                        write(")");
                    }
                }
                else {
                    write("Math.pow(");
                    emit(leftHandSideExpression);
                    write(", ");
                    emit(node.right);
                    write(")");
                }
            }

            function emitAliasEqual(name: Identifier): boolean {
                for (const specifier of exportSpecifiers[name.text]) {
                    emitStart(specifier.name);
                    emitContainingModuleName(specifier);
                    if (languageVersion === ScriptTarget.ES3 && name.text === "default") {
                        write('["default"]');
                    }
                    else {
                        write(".");
                        emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
                    }
                    emitEnd(specifier.name);
                    write(" = ");
                }
                return true;
            }

            function emitBinaryExpression(node: BinaryExpression) {
                if (languageVersion < ScriptTarget.ES6 && node.operatorToken.kind === SyntaxKind.EqualsToken &&
                    (node.left.kind === SyntaxKind.ObjectLiteralExpression || node.left.kind === SyntaxKind.ArrayLiteralExpression)) {
                    emitDestructuring(node, node.parent.kind === SyntaxKind.ExpressionStatement);
                }
                else {
                    const isAssignment = isAssignmentOperator(node.operatorToken.kind);

                    const externalExportChanged = isAssignment &&
                        isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.left);

                    if (externalExportChanged) {
                        // emit assignment 'x <op> y' as 'exports("x", x <op> y)'
                        write(`${exportFunctionForFile}("`);
                        emitNodeWithoutSourceMap(node.left);
                        write(`", `);
                    }

                    const internalExportChanged = isAssignment &&
                        isNameOfExportedDeclarationInNonES6Module(node.left);

                    if (internalExportChanged) {
                        // export { foo }
                        // emit foo = 2 as exports.foo = foo = 2
                        emitAliasEqual(<Identifier>node.left);
                    }

                    if (node.operatorToken.kind === SyntaxKind.AsteriskAsteriskToken || node.operatorToken.kind === SyntaxKind.AsteriskAsteriskEqualsToken) {
                        // Downleveled emit exponentiation operator using Math.pow
                        emitExponentiationOperator(node);
                    }
                    else {
                        emit(node.left);
                        // Add indentation before emit the operator if the operator is on different line
                        // For example:
                        //      3
                        //      + 2;
                        //   emitted as
                        //      3
                        //          + 2;
                        const indentedBeforeOperator = indentIfOnDifferentLines(node, node.left, node.operatorToken, node.operatorToken.kind !== SyntaxKind.CommaToken ? " " : undefined);
                        write(tokenToString(node.operatorToken.kind));
                        const indentedAfterOperator = indentIfOnDifferentLines(node, node.operatorToken, node.right, " ");
                        emit(node.right);
                        decreaseIndentIf(indentedBeforeOperator, indentedAfterOperator);
                    }

                    if (externalExportChanged) {
                        write(")");
                    }
                }
            }

            function synthesizedNodeStartsOnNewLine(node: Node) {
                return nodeIsSynthesized(node) && (<SynthesizedNode>node).startsOnNewLine;
            }

            function emitConditionalExpression(node: ConditionalExpression) {
                emit(node.condition);
                const indentedBeforeQuestion = indentIfOnDifferentLines(node, node.condition, node.questionToken, " ");
                write("?");
                const indentedAfterQuestion = indentIfOnDifferentLines(node, node.questionToken, node.whenTrue, " ");
                emit(node.whenTrue);
                decreaseIndentIf(indentedBeforeQuestion, indentedAfterQuestion);
                const indentedBeforeColon = indentIfOnDifferentLines(node, node.whenTrue, node.colonToken, " ");
                write(":");
                const indentedAfterColon = indentIfOnDifferentLines(node, node.colonToken, node.whenFalse, " ");
                emit(node.whenFalse);
                decreaseIndentIf(indentedBeforeColon, indentedAfterColon);
            }

            // Helper function to decrease the indent if we previously indented.  Allows multiple
            // previous indent values to be considered at a time.  This also allows caller to just
            // call this once, passing in all their appropriate indent values, instead of needing
            // to call this helper function multiple times.
            function decreaseIndentIf(value1: boolean, value2?: boolean) {
                if (value1) {
                    decreaseIndent();
                }
                if (value2) {
                    decreaseIndent();
                }
            }

            function isSingleLineEmptyBlock(node: Node) {
                if (node && node.kind === SyntaxKind.Block) {
                    const block = <Block>node;
                    return block.statements.length === 0 && nodeEndIsOnSameLineAsNodeStart(block, block);
                }
            }

            function emitBlock(node: Block) {
                if (isSingleLineEmptyBlock(node)) {
                    emitToken(SyntaxKind.OpenBraceToken, node.pos);
                    write(" ");
                    emitToken(SyntaxKind.CloseBraceToken, node.statements.end);
                    return;
                }

                emitToken(SyntaxKind.OpenBraceToken, node.pos);
                increaseIndent();
                if (node.kind === SyntaxKind.ModuleBlock) {
                    Debug.assert(node.parent.kind === SyntaxKind.ModuleDeclaration);
                    emitCaptureThisForNodeIfNecessary(node.parent);
                }
                emitLines(node.statements);
                if (node.kind === SyntaxKind.ModuleBlock) {
                    emitTempDeclarations(/*newLine*/ true);
                }
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.statements.end);
            }

            function emitEmbeddedStatement(node: Node) {
                if (node.kind === SyntaxKind.Block) {
                    write(" ");
                    emit(<Block>node);
                }
                else {
                    increaseIndent();
                    writeLine();
                    emit(node);
                    decreaseIndent();
                }
            }

            function emitExpressionStatement(node: ExpressionStatement) {
                emitParenthesizedIf(node.expression, /*parenthesized*/ node.expression.kind === SyntaxKind.ArrowFunction);
                write(";");
            }

            function emitIfStatement(node: IfStatement) {
                let endPos = emitToken(SyntaxKind.IfKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
                emit(node.expression);
                emitToken(SyntaxKind.CloseParenToken, node.expression.end);
                emitEmbeddedStatement(node.thenStatement);
                if (node.elseStatement) {
                    writeLine();
                    emitToken(SyntaxKind.ElseKeyword, node.thenStatement.end);
                    if (node.elseStatement.kind === SyntaxKind.IfStatement) {
                        write(" ");
                        emit(node.elseStatement);
                    }
                    else {
                        emitEmbeddedStatement(node.elseStatement);
                    }
                }
            }

            function emitDoStatement(node: DoStatement) {
                emitLoop(node, emitDoStatementWorker);
            }

            function emitDoStatementWorker(node: DoStatement, loop: ConvertedLoop) {
                write("do");
                if (loop) {
                    emitConvertedLoopCall(loop, /*emitAsBlock*/ true);
                }
                else {
                    emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ true);
                }
                if (node.statement.kind === SyntaxKind.Block) {
                    write(" ");
                }
                else {
                    writeLine();
                }
                write("while (");
                emit(node.expression);
                write(");");
            }

            function emitWhileStatement(node: WhileStatement) {
                emitLoop(node, emitWhileStatementWorker);
            }

            function emitWhileStatementWorker(node: WhileStatement, loop: ConvertedLoop) {
                write("while (");
                emit(node.expression);
                write(")");

                if (loop) {
                    emitConvertedLoopCall(loop, /*emitAsBlock*/ true);
                }
                else {
                    emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ true);
                }
            }

            /**
             * Returns true if start of variable declaration list was emitted.
             * Returns false if nothing was written - this can happen for source file level variable declarations
             *     in system modules where such variable declarations are hoisted.
             */
            function tryEmitStartOfVariableDeclarationList(decl: VariableDeclarationList): boolean {
                if (shouldHoistVariable(decl, /*checkIfSourceFileLevelDecl*/ true)) {
                    // variables in variable declaration list were already hoisted
                    return false;
                }

                if (convertedLoopState && (getCombinedNodeFlags(decl) & NodeFlags.BlockScoped) === 0) {
                    // we are inside a converted loop - this can only happen in downlevel scenarios
                    // record names for all variable declarations
                    for (const varDecl of decl.declarations) {
                        hoistVariableDeclarationFromLoop(convertedLoopState, varDecl);
                    }
                    return false;
                }

                emitStart(decl);
                if (decl && languageVersion >= ScriptTarget.ES6) {
                    if (isLet(decl)) {
                        write("let ");
                    }
                    else if (isConst(decl)) {
                        write("const ");
                    }
                    else {
                        write("var ");
                    }
                }
                else {
                    write("var ");
                }
                // Note here we specifically dont emit end so that if we are going to emit binding pattern
                // we can alter the source map correctly
                return true;
            }

            function emitVariableDeclarationListSkippingUninitializedEntries(list: VariableDeclarationList): boolean {
                let started = false;
                for (const decl of list.declarations) {
                    if (!decl.initializer) {
                        continue;
                    }

                    if (!started) {
                        started = true;
                    }
                    else {
                        write(", ");
                    }

                    emit(decl);
                }

                return started;
            }

            interface ConvertedLoop {
                functionName: string;
                paramList: string;
                state: ConvertedLoopState;
            }

            function shouldConvertLoopBody(node: IterationStatement): boolean {
                return languageVersion < ScriptTarget.ES6 &&
                    (resolver.getNodeCheckFlags(node) & NodeCheckFlags.LoopWithCapturedBlockScopedBinding) !== 0;
            }

            function emitLoop(node: IterationStatement, loopEmitter: (n: IterationStatement, convertedLoop: ConvertedLoop) => void): void {
                const shouldConvert = shouldConvertLoopBody(node);
                if (!shouldConvert) {
                    loopEmitter(node, /* convertedLoop*/ undefined);
                }
                else {
                    const loop = convertLoopBody(node);
                    if (node.parent.kind === SyntaxKind.LabeledStatement) {
                        // if parent of the loop was labeled statement - attach the label to loop skipping converted loop body
                        emitLabelAndColon(<LabeledStatement>node.parent);
                    }
                    loopEmitter(node, loop);
                }
            }

            function convertLoopBody(node: IterationStatement): ConvertedLoop {
                const functionName = makeUniqueName("_loop");

                let loopInitializer: VariableDeclarationList;
                switch (node.kind) {
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForOfStatement:
                        const initializer = (<ForStatement | ForInStatement | ForOfStatement>node).initializer;
                        if (initializer && initializer.kind === SyntaxKind.VariableDeclarationList) {
                            loopInitializer = <VariableDeclarationList>(<ForStatement | ForInStatement | ForOfStatement>node).initializer;
                        }
                        break;
                }

                let loopParameters: string[];
                let loopOutParameters: LoopOutParameter[];
                if (loopInitializer && (getCombinedNodeFlags(loopInitializer) & NodeFlags.BlockScoped)) {
                    // if loop initializer contains block scoped variables - they should be passed to converted loop body as parameters
                    loopParameters = [];
                    for (const varDeclaration of loopInitializer.declarations) {
                        processVariableDeclaration(varDeclaration.name);
                    }
                }

                const bodyIsBlock = node.statement.kind === SyntaxKind.Block;
                const paramList = loopParameters ? loopParameters.join(", ") : "";

                writeLine();
                write(`var ${functionName} = function(${paramList})`);

                const convertedOuterLoopState = convertedLoopState;
                convertedLoopState = { loopOutParameters };

                if (convertedOuterLoopState) {
                    // convertedOuterLoopState !== undefined means that this converted loop is nested in another converted loop.
                    // if outer converted loop has already accumulated some state - pass it through
                    if (convertedOuterLoopState.argumentsName) {
                        // outer loop has already used 'arguments' so we've already have some name to alias it
                        // use the same name in all nested loops
                        convertedLoopState.argumentsName = convertedOuterLoopState.argumentsName;
                    }

                    if (convertedOuterLoopState.thisName) {
                        // outer loop has already used 'this' so we've already have some name to alias it
                        // use the same name in all nested loops
                        convertedLoopState.thisName = convertedOuterLoopState.thisName;
                    }

                    if (convertedOuterLoopState.hoistedLocalVariables) {
                        // we've already collected some non-block scoped variable declarations in enclosing loop
                        // use the same storage in nested loop
                        convertedLoopState.hoistedLocalVariables = convertedOuterLoopState.hoistedLocalVariables;
                    }
                }

                write(" {");
                writeLine();
                increaseIndent();

                if (bodyIsBlock) {
                    emitLines((<Block>node.statement).statements);
                }
                else {
                    emit(node.statement);
                }

                writeLine();
                // end of loop body -> copy out parameter
                copyLoopOutParameters(convertedLoopState, CopyDirection.ToOutParameter, /*emitAsStatements*/true);

                decreaseIndent();
                writeLine();
                write("};");
                writeLine();

                if (loopOutParameters) {
                    // declare variables to hold out params for loop body
                    write(`var `);
                    for (let i = 0; i < loopOutParameters.length; i++) {
                        if (i !== 0) {
                            write(", ");
                        }
                        write(loopOutParameters[i].outParamName);
                    }
                    write(";");
                    writeLine();
                }
                if (convertedLoopState.argumentsName) {
                    // if alias for arguments is set
                    if (convertedOuterLoopState) {
                        // pass it to outer converted loop
                        convertedOuterLoopState.argumentsName = convertedLoopState.argumentsName;
                    }
                    else {
                        // this is top level converted loop and we need to create an alias for 'arguments' object
                        write(`var ${convertedLoopState.argumentsName} = arguments;`);
                        writeLine();
                    }
                }
                if (convertedLoopState.thisName) {
                    // if alias for this is set
                    if (convertedOuterLoopState) {
                        // pass it to outer converted loop
                        convertedOuterLoopState.thisName = convertedLoopState.thisName;
                    }
                    else {
                        // this is top level converted loop so we need to create an alias for 'this' here
                        // NOTE:
                        // if converted loops were all nested in arrow function then we'll always emit '_this' so convertedLoopState.thisName will not be set.
                        // If it is set this means that all nested loops are not nested in arrow function and it is safe to capture 'this'.
                        write(`var ${convertedLoopState.thisName} = this;`);
                        writeLine();
                    }
                }

                if (convertedLoopState.hoistedLocalVariables) {
                    // if hoistedLocalVariables !== undefined this means that we've possibly collected some variable declarations to be hoisted later
                    if (convertedOuterLoopState) {
                        // pass them to outer converted loop
                        convertedOuterLoopState.hoistedLocalVariables = convertedLoopState.hoistedLocalVariables;
                    }
                    else {
                        // deduplicate and hoist collected variable declarations
                        write("var ");
                        let seen: Map<string>;
                        for (const id of convertedLoopState.hoistedLocalVariables) {
                           // Don't initialize seen unless we have at least one element.
                           // Emit a comma to separate for all but the first element.
                           if (!seen) {
                               seen = {};
                           }
                           else {
                               write(", ");
                           }

                           if (!hasProperty(seen, id.text)) {
                               emit(id);
                               seen[id.text] = id.text;
                           }
                        }
                        write(";");
                        writeLine();
                    }
                }

                const currentLoopState = convertedLoopState;
                convertedLoopState = convertedOuterLoopState;

                return { functionName, paramList, state: currentLoopState };

                function processVariableDeclaration(name: Identifier | BindingPattern): void {
                    if (name.kind === SyntaxKind.Identifier) {
                        const nameText = isNameOfNestedBlockScopedRedeclarationOrCapturedBinding(<Identifier>name)
                            ? getGeneratedNameForNode(name)
                            : (<Identifier>name).text;

                        loopParameters.push(nameText);
                        if (resolver.getNodeCheckFlags(name.parent) & NodeCheckFlags.NeedsLoopOutParameter) {
                            const reassignedVariable = { originalName: <Identifier>name, outParamName: makeUniqueName(`out_${nameText}`) };
                            (loopOutParameters || (loopOutParameters = [])).push(reassignedVariable);
                        }
                    }
                    else {
                        for (const element of (<BindingPattern>name).elements) {
                            processVariableDeclaration(element.name);
                        }
                    }
                }
            }

            function emitNormalLoopBody(node: IterationStatement, emitAsEmbeddedStatement: boolean): void {
                let saveAllowedNonLabeledJumps: Jump;
                if (convertedLoopState) {
                    // we get here if we are trying to emit normal loop loop inside converted loop
                    // set allowedNonLabeledJumps to Break | Continue to mark that break\continue inside the loop should be emitted as is
                    saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                    convertedLoopState.allowedNonLabeledJumps = Jump.Break | Jump.Continue;
                }

                if (emitAsEmbeddedStatement) {
                    emitEmbeddedStatement(node.statement);
                }
                else if (node.statement.kind === SyntaxKind.Block) {
                    emitLines((<Block>node.statement).statements);
                }
                else {
                    writeLine();
                    emit(node.statement);
                }

                if (convertedLoopState) {
                    convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
                }
            }

            function copyLoopOutParameters(state: ConvertedLoopState, copyDirection: CopyDirection, emitAsStatements: boolean) {
                if (state.loopOutParameters) {
                    for (const outParam of state.loopOutParameters) {
                        if (copyDirection === CopyDirection.ToOriginal) {
                            emitIdentifier(outParam.originalName);
                            write(` = ${outParam.outParamName}`);
                        }
                        else {
                            write(`${outParam.outParamName} = `);
                            emitIdentifier(outParam.originalName);
                        }
                        if (emitAsStatements) {
                            write(";");
                            writeLine();
                        }
                        else {
                            write(", ");
                        }
                    }
                }
            }

            function emitConvertedLoopCall(loop: ConvertedLoop, emitAsBlock: boolean): void {
                if (emitAsBlock) {
                    write(" {");
                    writeLine();
                    increaseIndent();
                }

                // loop is considered simple if it does not have any return statements or break\continue that transfer control outside of the loop
                // simple loops are emitted as just 'loop()';
                // NOTE: if loop uses only 'continue' it still will be emitted as simple loop
                const isSimpleLoop =
                    !(loop.state.nonLocalJumps & ~Jump.Continue) &&
                    !loop.state.labeledNonLocalBreaks &&
                    !loop.state.labeledNonLocalContinues;

                const loopResult = makeUniqueName("state");
                if (!isSimpleLoop) {
                    write(`var ${loopResult} = `);
                }

                write(`${loop.functionName}(${loop.paramList});`);
                writeLine();

                copyLoopOutParameters(loop.state, CopyDirection.ToOriginal, /*emitAsStatements*/ true);

                if (!isSimpleLoop) {
                    // for non simple loops we need to store result returned from converted loop function and use it to do dispatching
                    // converted loop function can return:
                    // - object - used when body of the converted loop contains return statement. Property "value" of this object stores retuned value
                    // - string - used to dispatch jumps. "break" and "continue" are used to non-labeled jumps, other values are used to transfer control to
                    //   different labels
                    writeLine();
                    if (loop.state.nonLocalJumps & Jump.Return) {
                        write(`if (typeof ${loopResult} === "object") `);
                        if (convertedLoopState) {
                            // we are currently nested in another converted loop - return unwrapped result
                            write(`return ${loopResult};`);
                            // propagate 'hasReturn' flag to outer loop
                            convertedLoopState.nonLocalJumps |= Jump.Return;
                        }
                        else {
                            // top level converted loop - return unwrapped value
                            write(`return ${loopResult}.value;`);
                        }
                        writeLine();
                    }

                    if (loop.state.nonLocalJumps & Jump.Break) {
                        write(`if (${loopResult} === "break") break;`);
                        writeLine();
                    }

                    // in case of labeled breaks emit code that either breaks to some known label inside outer loop or delegates jump decision to outer loop
                    emitDispatchTableForLabeledJumps(loopResult, loop.state, convertedLoopState);
                    // in case of 'continue' we'll just fallthough here
                }

                if (emitAsBlock) {
                    writeLine();
                    decreaseIndent();
                    write("}");
                }

                function emitDispatchTableForLabeledJumps(loopResultVariable: string, currentLoop: ConvertedLoopState, outerLoop: ConvertedLoopState) {
                    if (!currentLoop.labeledNonLocalBreaks && !currentLoop.labeledNonLocalContinues) {
                        return;
                    }

                    write(`switch(${loopResultVariable}) {`);
                    increaseIndent();

                    emitDispatchEntriesForLabeledJumps(currentLoop.labeledNonLocalBreaks, /*isBreak*/ true, loopResultVariable, outerLoop);
                    emitDispatchEntriesForLabeledJumps(currentLoop.labeledNonLocalContinues, /*isBreak*/ false, loopResultVariable, outerLoop);

                    decreaseIndent();
                    writeLine();
                    write("}");
                }

                function emitDispatchEntriesForLabeledJumps(table: Map<string>, isBreak: boolean, loopResultVariable: string, outerLoop: ConvertedLoopState): void {
                    if (!table) {
                        return;
                    }

                    for (const labelText in table) {
                        const labelMarker = table[labelText];
                        writeLine();
                        write(`case "${labelMarker}": `);
                        // if there are no outer converted loop or outer label in question is located inside outer converted loop
                        // then emit labeled break\continue
                        // otherwise propagate pair 'label -> marker' to outer converted loop and emit 'return labelMarker' so outer loop can later decide what to do
                        if (!outerLoop || (outerLoop.labels && outerLoop.labels[labelText])) {
                            if (isBreak) {
                                write("break ");
                            }
                            else {
                                write("continue ");
                            }
                            write(`${labelText};`);
                        }
                        else {
                            setLabeledJump(outerLoop, isBreak, labelText, labelMarker);
                            write(`return ${loopResultVariable};`);
                        }
                    }
                }
            }

            function emitForStatement(node: ForStatement) {
                emitLoop(node, emitForStatementWorker);
            }

            function emitForStatementWorker(node: ForStatement, loop: ConvertedLoop) {
                let endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
                if (node.initializer && node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    const variableDeclarationList = <VariableDeclarationList>node.initializer;
                    const startIsEmitted = tryEmitStartOfVariableDeclarationList(variableDeclarationList);
                    if (startIsEmitted) {
                        emitCommaList(variableDeclarationList.declarations);
                    }
                    else {
                        emitVariableDeclarationListSkippingUninitializedEntries(variableDeclarationList);
                    }
                }
                else if (node.initializer) {
                    emit(node.initializer);
                }
                write(";");
                emitOptional(" ", node.condition);
                write(";");
                emitOptional(" ", node.incrementor);
                write(")");

                if (loop) {
                    emitConvertedLoopCall(loop, /*emitAsBlock*/ true);
                }
                else {
                    emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ true);
                }
            }

            function emitForInOrForOfStatement(node: ForInStatement | ForOfStatement) {
                if (languageVersion < ScriptTarget.ES6 && node.kind === SyntaxKind.ForOfStatement) {
                    emitLoop(node, emitDownLevelForOfStatementWorker);
                }
                else {
                    emitLoop(node, emitForInOrForOfStatementWorker);
                }
            }

            function emitForInOrForOfStatementWorker(node: ForInStatement | ForOfStatement, loop: ConvertedLoop) {
                let endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
                if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    const variableDeclarationList = <VariableDeclarationList>node.initializer;
                    if (variableDeclarationList.declarations.length >= 1) {
                        tryEmitStartOfVariableDeclarationList(variableDeclarationList);
                        emit(variableDeclarationList.declarations[0]);
                    }
                }
                else {
                    emit(node.initializer);
                }

                if (node.kind === SyntaxKind.ForInStatement) {
                    write(" in ");
                }
                else {
                    write(" of ");
                }
                emit(node.expression);
                emitToken(SyntaxKind.CloseParenToken, node.expression.end);

                if (loop) {
                    emitConvertedLoopCall(loop, /*emitAsBlock*/ true);
                }
                else {
                    emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ true);
                }
            }

            function emitDownLevelForOfStatementWorker(node: ForOfStatement, loop: ConvertedLoop) {
                // The following ES6 code:
                //
                //    for (let v of expr) { }
                //
                // should be emitted as
                //
                //    for (let _i = 0, _a = expr; _i < _a.length; _i++) {
                //        let v = _a[_i];
                //    }
                //
                // where _a and _i are temps emitted to capture the RHS and the counter,
                // respectively.
                // When the left hand side is an expression instead of a let declaration,
                // the "let v" is not emitted.
                // When the left hand side is a let/const, the v is renamed if there is
                // another v in scope.
                // Note that all assignments to the LHS are emitted in the body, including
                // all destructuring.
                // Note also that because an extra statement is needed to assign to the LHS,
                // for-of bodies are always emitted as blocks.

                let endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);

                // Do not emit the LHS let declaration yet, because it might contain destructuring.

                // Do not call recordTempDeclaration because we are declaring the temps
                // right here. Recording means they will be declared later.
                // In the case where the user wrote an identifier as the RHS, like this:
                //
                //     for (let v of arr) { }
                //
                // we can't reuse 'arr' because it might be modified within the body of the loop.
                const counter = createTempVariable(TempFlags._i);
                const rhsReference = createSynthesizedNode(SyntaxKind.Identifier) as Identifier;
                rhsReference.text = node.expression.kind === SyntaxKind.Identifier ?
                    makeUniqueName((<Identifier>node.expression).text) :
                    makeTempVariableName(TempFlags.Auto);

                // This is the let keyword for the counter and rhsReference. The let keyword for
                // the LHS will be emitted inside the body.
                emitStart(node.expression);
                write("var ");

                // _i = 0
                emitNodeWithoutSourceMap(counter);
                write(" = 0");
                emitEnd(node.expression);

                // , _a = expr
                write(", ");
                emitStart(node.expression);
                emitNodeWithoutSourceMap(rhsReference);
                write(" = ");
                emitNodeWithoutSourceMap(node.expression);
                emitEnd(node.expression);

                write("; ");

                // _i < _a.length;
                emitStart(node.expression);
                emitNodeWithoutSourceMap(counter);
                write(" < ");

                emitNodeWithCommentsAndWithoutSourcemap(rhsReference);
                write(".length");

                emitEnd(node.expression);
                write("; ");

                // _i++)
                emitStart(node.expression);
                emitNodeWithoutSourceMap(counter);
                write("++");
                emitEnd(node.expression);
                emitToken(SyntaxKind.CloseParenToken, node.expression.end);

                // Body
                write(" {");
                writeLine();
                increaseIndent();

                // Initialize LHS
                // let v = _a[_i];
                const rhsIterationValue = createElementAccessExpression(rhsReference, counter);
                emitStart(node.initializer);
                if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    write("var ");
                    const variableDeclarationList = <VariableDeclarationList>node.initializer;
                    if (variableDeclarationList.declarations.length > 0) {
                        const declaration = variableDeclarationList.declarations[0];
                        if (isBindingPattern(declaration.name)) {
                            // This works whether the declaration is a var, let, or const.
                            // It will use rhsIterationValue _a[_i] as the initializer.
                            emitDestructuring(declaration, /*isAssignmentExpressionStatement*/ false, rhsIterationValue);
                        }
                        else {
                            // The following call does not include the initializer, so we have
                            // to emit it separately.
                            emitNodeWithCommentsAndWithoutSourcemap(declaration);
                            write(" = ");
                            emitNodeWithoutSourceMap(rhsIterationValue);
                        }
                    }
                    else {
                        // It's an empty declaration list. This can only happen in an error case, if the user wrote
                        //     for (let of []) {}
                        emitNodeWithoutSourceMap(createTempVariable(TempFlags.Auto));
                        write(" = ");
                        emitNodeWithoutSourceMap(rhsIterationValue);
                    }
                }
                else {
                    // Initializer is an expression. Emit the expression in the body, so that it's
                    // evaluated on every iteration.
                    const assignmentExpression = createBinaryExpression(<Expression>node.initializer, SyntaxKind.EqualsToken, rhsIterationValue, /*startsOnNewLine*/ false);
                    if (node.initializer.kind === SyntaxKind.ArrayLiteralExpression || node.initializer.kind === SyntaxKind.ObjectLiteralExpression) {
                        // This is a destructuring pattern, so call emitDestructuring instead of emit. Calling emit will not work, because it will cause
                        // the BinaryExpression to be passed in instead of the expression statement, which will cause emitDestructuring to crash.
                        emitDestructuring(assignmentExpression, /*isAssignmentExpressionStatement*/ true, /*value*/ undefined);
                    }
                    else {
                        emitNodeWithCommentsAndWithoutSourcemap(assignmentExpression);
                    }
                }
                emitEnd(node.initializer);
                write(";");

                if (loop) {
                    writeLine();
                    emitConvertedLoopCall(loop, /*emitAsBlock*/ false);
                }
                else {
                    emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ false);
                }

                writeLine();
                decreaseIndent();
                write("}");
            }

            function emitBreakOrContinueStatement(node: BreakOrContinueStatement) {
                if (convertedLoopState) {
                    // check if we can emit break\continue as is
                    // it is possible if either
                    //   - break\continue is statement labeled and label is located inside the converted loop
                    //   - break\continue is non-labeled and located in non-converted loop\switch statement
                    const jump = node.kind === SyntaxKind.BreakStatement ? Jump.Break : Jump.Continue;
                    const canUseBreakOrContinue =
                        (node.label && convertedLoopState.labels && convertedLoopState.labels[node.label.text]) ||
                        (!node.label && (convertedLoopState.allowedNonLabeledJumps & jump));

                    if (!canUseBreakOrContinue) {
                        write ("return ");
                        // explicit exit from loop -> copy out parameters
                        copyLoopOutParameters(convertedLoopState, CopyDirection.ToOutParameter, /*emitAsStatements*/ false);
                        if (!node.label) {
                            if (node.kind === SyntaxKind.BreakStatement) {
                                convertedLoopState.nonLocalJumps |= Jump.Break;
                                write(`"break";`);
                            }
                            else {
                                convertedLoopState.nonLocalJumps |= Jump.Continue;
                                // note: return value is emitted only to simplify debugging, call to converted loop body does not do any dispatching on it.
                                write(`"continue";`);
                            }
                        }
                        else {
                            let labelMarker: string;
                            if (node.kind === SyntaxKind.BreakStatement) {
                                labelMarker = `break-${node.label.text}`;
                                setLabeledJump(convertedLoopState, /*isBreak*/ true, node.label.text, labelMarker);
                            }
                            else {
                                labelMarker = `continue-${node.label.text}`;
                                setLabeledJump(convertedLoopState, /*isBreak*/ false, node.label.text, labelMarker);
                            }
                            write(`"${labelMarker}";`);
                        }

                        return;
                    }
                }

                emitToken(node.kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword, node.pos);
                emitOptional(" ", node.label);
                write(";");
            }

            function emitReturnStatement(node: ReturnStatement) {
                if (convertedLoopState) {
                    convertedLoopState.nonLocalJumps |= Jump.Return;
                    write("return { value: ");
                    if (node.expression) {
                        emit(node.expression);
                    }
                    else {
                        write("void 0");
                    }
                    write(" };");
                    return;
                }

                emitToken(SyntaxKind.ReturnKeyword, node.pos);
                emitOptional(" ", node.expression);
                write(";");
            }

            function emitWithStatement(node: WithStatement) {
                write("with (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitSwitchStatement(node: SwitchStatement) {
                let endPos = emitToken(SyntaxKind.SwitchKeyword, node.pos);
                write(" ");
                emitToken(SyntaxKind.OpenParenToken, endPos);
                emit(node.expression);
                endPos = emitToken(SyntaxKind.CloseParenToken, node.expression.end);
                write(" ");

                let saveAllowedNonLabeledJumps: Jump;
                if (convertedLoopState) {
                    saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                    // for switch statement allow only non-labeled break
                    convertedLoopState.allowedNonLabeledJumps |= Jump.Break;
                }
                emitCaseBlock(node.caseBlock, endPos);
                if (convertedLoopState) {
                    convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
                }
            }

            function emitCaseBlock(node: CaseBlock, startPos: number): void {
                emitToken(SyntaxKind.OpenBraceToken, startPos);
                increaseIndent();
                emitLines(node.clauses);
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.clauses.end);
            }

            function nodeStartPositionsAreOnSameLine(node1: Node, node2: Node) {
                return getLineOfLocalPositionFromLineMap(currentLineMap, skipTrivia(currentText, node1.pos)) ===
                    getLineOfLocalPositionFromLineMap(currentLineMap, skipTrivia(currentText, node2.pos));
            }

            function nodeEndPositionsAreOnSameLine(node1: Node, node2: Node) {
                return getLineOfLocalPositionFromLineMap(currentLineMap, node1.end) ===
                    getLineOfLocalPositionFromLineMap(currentLineMap, node2.end);
            }

            function nodeEndIsOnSameLineAsNodeStart(node1: TextRange, node2: TextRange) {
                return getLineOfLocalPositionFromLineMap(currentLineMap, node1.end) ===
                    getLineOfLocalPositionFromLineMap(currentLineMap, skipTrivia(currentText, node2.pos));
            }

            function emitCaseOrDefaultClause(node: CaseOrDefaultClause) {
                if (node.kind === SyntaxKind.CaseClause) {
                    write("case ");
                    emit((<CaseClause>node).expression);
                    write(":");
                }
                else {
                    write("default:");
                }

                if (node.statements.length === 1 && nodeStartPositionsAreOnSameLine(node, node.statements[0])) {
                    write(" ");
                    emit(node.statements[0]);
                }
                else {
                    increaseIndent();
                    emitLines(node.statements);
                    decreaseIndent();
                }
            }

            function emitThrowStatement(node: ThrowStatement) {
                write("throw ");
                emit(node.expression);
                write(";");
            }

            function emitTryStatement(node: TryStatement) {
                write("try ");
                emit(node.tryBlock);
                emit(node.catchClause);
                if (node.finallyBlock) {
                    writeLine();
                    write("finally ");
                    emit(node.finallyBlock);
                }
            }

            function emitCatchClause(node: CatchClause) {
                writeLine();
                const endPos = emitToken(SyntaxKind.CatchKeyword, node.pos);
                write(" ");
                emitToken(SyntaxKind.OpenParenToken, endPos);
                emit(node.variableDeclaration);
                emitToken(SyntaxKind.CloseParenToken, node.variableDeclaration ? node.variableDeclaration.end : endPos);
                write(" ");
                emitBlock(node.block);
            }

            function emitDebuggerStatement(node: Node) {
                emitToken(SyntaxKind.DebuggerKeyword, node.pos);
                write(";");
            }

            function emitLabelAndColon(node: LabeledStatement): void {
                emit(node.label);
                write(": ");
            }

            function emitLabeledStatement(node: LabeledStatement) {
                if (!isIterationStatement(node.statement, /* lookInLabeledStatements */ false) || !shouldConvertLoopBody(<IterationStatement>node.statement)) {
                    emitLabelAndColon(node);
                }

                if (convertedLoopState) {
                    if (!convertedLoopState.labels) {
                        convertedLoopState.labels = {};
                    }
                    convertedLoopState.labels[node.label.text] = node.label.text;
                }

                emit(node.statement);

                if (convertedLoopState) {
                    convertedLoopState.labels[node.label.text] = undefined;
                }
            }

            function getContainingModule(node: Node): ModuleDeclaration {
                do {
                    node = node.parent;
                } while (node && node.kind !== SyntaxKind.ModuleDeclaration);
                return <ModuleDeclaration>node;
            }

            function emitContainingModuleName(node: Node) {
                const container = getContainingModule(node);
                write(container ? getGeneratedNameForNode(container) : "exports");
            }

            function emitModuleMemberName(node: Declaration) {
                emitStart(node.name);
                if (getCombinedNodeFlags(node) & NodeFlags.Export) {
                    const container = getContainingModule(node);
                    if (container) {
                        write(getGeneratedNameForNode(container));
                        write(".");
                    }
                    else if (modulekind !== ModuleKind.ES6 && modulekind !== ModuleKind.System) {
                        write("exports.");
                    }
                }
                emitNodeWithCommentsAndWithoutSourcemap(node.name);
                emitEnd(node.name);
            }

            function createVoidZero(): Expression {
                const zero = <LiteralExpression>createSynthesizedNode(SyntaxKind.NumericLiteral);
                zero.text = "0";
                const result = <VoidExpression>createSynthesizedNode(SyntaxKind.VoidExpression);
                result.expression = zero;
                return result;
            }

            function emitEs6ExportDefaultCompat(node: Node) {
                if (node.parent.kind === SyntaxKind.SourceFile) {
                    Debug.assert(!!(node.flags & NodeFlags.Default) || node.kind === SyntaxKind.ExportAssignment);
                    // only allow export default at a source file level
                    if (modulekind === ModuleKind.CommonJS || modulekind === ModuleKind.AMD || modulekind === ModuleKind.UMD) {
                        if (!isEs6Module) {
                            if (languageVersion !== ScriptTarget.ES3) {
                                // default value of configurable, enumerable, writable are `false`.
                                write('Object.defineProperty(exports, "__esModule", { value: true });');
                                writeLine();
                            }
                            else {
                                write("exports.__esModule = true;");
                                writeLine();
                            }
                        }
                    }
                }
            }

            function emitExportMemberAssignment(node: FunctionLikeDeclaration | ClassDeclaration) {
                if (node.flags & NodeFlags.Export) {
                    writeLine();
                    emitStart(node);

                    // emit call to exporter only for top level nodes
                    if (modulekind === ModuleKind.System && node.parent === currentSourceFile) {
                        // emit export default <smth> as
                        // export("default", <smth>)
                        write(`${exportFunctionForFile}("`);
                        if (node.flags & NodeFlags.Default) {
                            write("default");
                        }
                        else {
                            emitNodeWithCommentsAndWithoutSourcemap(node.name);
                        }
                        write(`", `);
                        emitDeclarationName(node);
                        write(")");
                    }
                    else {
                        if (node.flags & NodeFlags.Default) {
                            emitEs6ExportDefaultCompat(node);
                            if (languageVersion === ScriptTarget.ES3) {
                                write('exports["default"]');
                            }
                            else {
                                write("exports.default");
                            }
                        }
                        else {
                            emitModuleMemberName(node);
                        }
                        write(" = ");
                        emitDeclarationName(node);
                    }
                    emitEnd(node);
                    write(";");
                }
            }

            function emitExportMemberAssignments(name: Identifier) {
                if (modulekind === ModuleKind.System) {
                    return;
                }

                if (!exportEquals && exportSpecifiers && hasProperty(exportSpecifiers, name.text)) {
                    for (const specifier of exportSpecifiers[name.text]) {
                        writeLine();
                        emitStart(specifier.name);
                        emitContainingModuleName(specifier);
                        write(".");
                        emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
                        emitEnd(specifier.name);
                        write(" = ");
                        emitExpressionIdentifier(name);
                        write(";");
                    }
                }
            }

            function emitExportSpecifierInSystemModule(specifier: ExportSpecifier): void {
                Debug.assert(modulekind === ModuleKind.System);

                if (!resolver.getReferencedValueDeclaration(specifier.propertyName || specifier.name) && !resolver.isValueAliasDeclaration(specifier) ) {
                    return;
                }

                writeLine();
                emitStart(specifier.name);
                write(`${exportFunctionForFile}("`);
                emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
                write(`", `);
                emitExpressionIdentifier(specifier.propertyName || specifier.name);
                write(")");
                emitEnd(specifier.name);
                write(";");
            }

            /**
             * Emit an assignment to a given identifier, 'name', with a given expression, 'value'.
             * @param name an identifier as a left-hand-side operand of the assignment
             * @param value an expression as a right-hand-side operand of the assignment
             * @param shouldEmitCommaBeforeAssignment a boolean indicating whether to prefix an assignment with comma
             */
            function emitAssignment(name: Identifier, value: Expression, shouldEmitCommaBeforeAssignment: boolean, nodeForSourceMap: Node) {
                if (shouldEmitCommaBeforeAssignment) {
                    write(", ");
                }

                const exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(name);

                if (exportChanged) {
                    write(`${exportFunctionForFile}("`);
                    emitNodeWithCommentsAndWithoutSourcemap(name);
                    write(`", `);
                }

                const isVariableDeclarationOrBindingElement =
                    name.parent && (name.parent.kind === SyntaxKind.VariableDeclaration || name.parent.kind === SyntaxKind.BindingElement);

                // If this is first var declaration, we need to start at var/let/const keyword instead
                // otherwise use nodeForSourceMap as the start position
                emitStart(isFirstVariableDeclaration(nodeForSourceMap) ? nodeForSourceMap.parent : nodeForSourceMap);
                withTemporaryNoSourceMap(() => {
                    if (isVariableDeclarationOrBindingElement) {
                        emitModuleMemberName(<Declaration>name.parent);
                    }
                    else {
                        emit(name);
                    }

                    write(" = ");
                    emit(value);
                });
                emitEnd(nodeForSourceMap, /*stopOverridingSpan*/true);

                if (exportChanged) {
                    write(")");
                }
            }

            /**
             * Create temporary variable, emit an assignment of the variable the given expression
             * @param expression an expression to assign to the newly created temporary variable
             * @param canDefineTempVariablesInPlace a boolean indicating whether you can define the temporary variable at an assignment location
             * @param shouldEmitCommaBeforeAssignment a boolean indicating whether an assignment should prefix with comma
             */
            function emitTempVariableAssignment(expression: Expression, canDefineTempVariablesInPlace: boolean, shouldEmitCommaBeforeAssignment: boolean, sourceMapNode?: Node): Identifier {
                const identifier = createTempVariable(TempFlags.Auto);
                if (!canDefineTempVariablesInPlace) {
                    recordTempDeclaration(identifier);
                }
                emitAssignment(identifier, expression, shouldEmitCommaBeforeAssignment, sourceMapNode || expression.parent);
                return identifier;
            }

            function isFirstVariableDeclaration(root: Node) {
                return root.kind === SyntaxKind.VariableDeclaration &&
                    root.parent.kind === SyntaxKind.VariableDeclarationList &&
                    (<VariableDeclarationList>root.parent).declarations[0] === root;
            }

            function emitDestructuring(root: BinaryExpression | VariableDeclaration | ParameterDeclaration, isAssignmentExpressionStatement: boolean, value?: Expression) {
                let emitCount = 0;

                // An exported declaration is actually emitted as an assignment (to a property on the module object), so
                // temporary variables in an exported declaration need to have real declarations elsewhere
                // Also temporary variables should be explicitly allocated for source level declarations when module target is system
                // because actual variable declarations are hoisted
                let canDefineTempVariablesInPlace = false;
                if (root.kind === SyntaxKind.VariableDeclaration) {
                    const isExported = getCombinedNodeFlags(root) & NodeFlags.Export;
                    const isSourceLevelForSystemModuleKind = shouldHoistDeclarationInSystemJsModule(root);
                    canDefineTempVariablesInPlace = !isExported && !isSourceLevelForSystemModuleKind;
                }
                else if (root.kind === SyntaxKind.Parameter) {
                    canDefineTempVariablesInPlace = true;
                }

                if (root.kind === SyntaxKind.BinaryExpression) {
                    emitAssignmentExpression(<BinaryExpression>root);
                }
                else {
                    Debug.assert(!isAssignmentExpressionStatement);
                    // If first variable declaration of variable statement correct the start location
                    if (isFirstVariableDeclaration(root)) {
                        // Use emit location of "var " as next emit start entry
                        sourceMap.changeEmitSourcePos();
                    }
                    emitBindingElement(<BindingElement>root, value);
                }


                /**
                 * Ensures that there exists a declared identifier whose value holds the given expression.
                 * This function is useful to ensure that the expression's value can be read from in subsequent expressions.
                 * Unless 'reuseIdentifierExpressions' is false, 'expr' will be returned if it is just an identifier.
                 *
                 * @param expr the expression whose value needs to be bound.
                 * @param reuseIdentifierExpressions true if identifier expressions can simply be returned;
                 *                                   false if it is necessary to always emit an identifier.
                 */
                function ensureIdentifier(expr: Expression, reuseIdentifierExpressions: boolean, sourceMapNode: Node): Expression {
                    if (expr.kind === SyntaxKind.Identifier && reuseIdentifierExpressions) {
                        return expr;
                    }

                    const identifier = emitTempVariableAssignment(expr, canDefineTempVariablesInPlace, emitCount > 0, sourceMapNode);
                    emitCount++;
                    return identifier;
                }

                function createDefaultValueCheck(value: Expression, defaultValue: Expression, sourceMapNode: Node): Expression {
                    // The value expression will be evaluated twice, so for anything but a simple identifier
                    // we need to generate a temporary variable
                    // If the temporary variable needs to be emitted use the source Map node for assignment of that statement
                    value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, sourceMapNode);
                    // Return the expression 'value === void 0 ? defaultValue : value'
                    const equals = <BinaryExpression>createSynthesizedNode(SyntaxKind.BinaryExpression);
                    equals.left = value;
                    equals.operatorToken = createSynthesizedNode(SyntaxKind.EqualsEqualsEqualsToken);
                    equals.right = createVoidZero();
                    return createConditionalExpression(equals, defaultValue, value);
                }

                function createConditionalExpression(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
                    const cond = <ConditionalExpression>createSynthesizedNode(SyntaxKind.ConditionalExpression);
                    cond.condition = condition;
                    cond.questionToken = createSynthesizedNode(SyntaxKind.QuestionToken);
                    cond.whenTrue = whenTrue;
                    cond.colonToken = createSynthesizedNode(SyntaxKind.ColonToken);
                    cond.whenFalse = whenFalse;
                    return cond;
                }

                function createNumericLiteral(value: number) {
                    const node = <LiteralExpression>createSynthesizedNode(SyntaxKind.NumericLiteral);
                    node.text = "" + value;
                    return node;
                }

                function createPropertyAccessForDestructuringProperty(object: Expression, propName: PropertyName): Expression {
                    let index: Expression;
                    const nameIsComputed = propName.kind === SyntaxKind.ComputedPropertyName;
                    if (nameIsComputed) {
                        // TODO to handle when we look into sourcemaps for computed properties, for now use propName
                        index = ensureIdentifier((<ComputedPropertyName>propName).expression, /*reuseIdentifierExpressions*/ false, propName);
                    }
                    else {
                        // We create a synthetic copy of the identifier in order to avoid the rewriting that might
                        // otherwise occur when the identifier is emitted.
                        index = <Identifier | LiteralExpression>createSynthesizedNode(propName.kind);
                        // We need to unescape identifier here because when parsing an identifier prefixing with "__"
                        // the parser need to append "_" in order to escape colliding with magic identifiers such as "__proto__"
                        // Therefore, in order to correctly emit identifiers that are written in original TypeScript file,
                        // we will unescapeIdentifier to remove additional underscore (if no underscore is added, the function will return original input string)
                        (<Identifier | LiteralExpression>index).text = unescapeIdentifier((<Identifier | LiteralExpression>propName).text);
                    }

                    return !nameIsComputed && index.kind === SyntaxKind.Identifier
                        ? createPropertyAccessExpression(object, <Identifier>index)
                        : createElementAccessExpression(object, index);
                }

                function createSliceCall(value: Expression, sliceIndex: number): CallExpression {
                    const call = <CallExpression>createSynthesizedNode(SyntaxKind.CallExpression);
                    const sliceIdentifier = <Identifier>createSynthesizedNode(SyntaxKind.Identifier);
                    sliceIdentifier.text = "slice";
                    call.expression = createPropertyAccessExpression(value, sliceIdentifier);
                    call.arguments = <NodeArray<LiteralExpression>>createSynthesizedNodeArray();
                    call.arguments[0] = createNumericLiteral(sliceIndex);
                    return call;
                }

                function emitObjectLiteralAssignment(target: ObjectLiteralExpression, value: Expression, sourceMapNode: Node) {
                    const properties = target.properties;
                    if (properties.length !== 1) {
                        // For anything but a single element destructuring we need to generate a temporary
                        // to ensure value is evaluated exactly once.
                        // When doing so we want to highlight the passed in source map node since thats the one needing this temp assignment
                        value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, sourceMapNode);
                    }
                    for (const p of properties) {
                        if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                            const propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
                            const target = p.kind === SyntaxKind.ShorthandPropertyAssignment ? <ShorthandPropertyAssignment>p : (<PropertyAssignment>p).initializer || propName;
                            // Assignment for target = value.propName should highlight whole property, hence use p as source map node
                            emitDestructuringAssignment(target, createPropertyAccessForDestructuringProperty(value, propName), p);
                        }
                    }
                }

                function emitArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, sourceMapNode: Node) {
                    const elements = target.elements;
                    if (elements.length !== 1) {
                        // For anything but a single element destructuring we need to generate a temporary
                        // to ensure value is evaluated exactly once.
                        // When doing so we want to highlight the passed in source map node since thats the one needing this temp assignment
                        value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, sourceMapNode);
                    }
                    for (let i = 0; i < elements.length; i++) {
                        const e = elements[i];
                        if (e.kind !== SyntaxKind.OmittedExpression) {
                            // Assignment for target = value.propName should highlight whole property, hence use e as source map node
                            if (e.kind !== SyntaxKind.SpreadElementExpression) {
                                emitDestructuringAssignment(e, createElementAccessExpression(value, createNumericLiteral(i)), e);
                            }
                            else if (i === elements.length - 1) {
                                emitDestructuringAssignment((<SpreadElementExpression>e).expression, createSliceCall(value, i), e);
                            }
                        }
                    }
                }

                function emitDestructuringAssignment(target: Expression | ShorthandPropertyAssignment, value: Expression, sourceMapNode: Node) {
                    // When emitting target = value use source map node to highlight, including any temporary assignments needed for this
                    if (target.kind === SyntaxKind.ShorthandPropertyAssignment) {
                        if ((<ShorthandPropertyAssignment>target).objectAssignmentInitializer) {
                            value = createDefaultValueCheck(value, (<ShorthandPropertyAssignment>target).objectAssignmentInitializer, sourceMapNode);
                        }
                        target = (<ShorthandPropertyAssignment>target).name;
                    }
                    else if (target.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>target).operatorToken.kind === SyntaxKind.EqualsToken) {
                        value = createDefaultValueCheck(value, (<BinaryExpression>target).right, sourceMapNode);
                        target = (<BinaryExpression>target).left;
                    }
                    if (target.kind === SyntaxKind.ObjectLiteralExpression) {
                        emitObjectLiteralAssignment(<ObjectLiteralExpression>target, value, sourceMapNode);
                    }
                    else if (target.kind === SyntaxKind.ArrayLiteralExpression) {
                        emitArrayLiteralAssignment(<ArrayLiteralExpression>target, value, sourceMapNode);
                    }
                    else {
                        emitAssignment(<Identifier>target, value, /*shouldEmitCommaBeforeAssignment*/ emitCount > 0, sourceMapNode);
                        emitCount++;
                    }
                }

                function emitAssignmentExpression(root: BinaryExpression) {
                    const target = root.left;
                    let value = root.right;

                    if (isEmptyObjectLiteralOrArrayLiteral(target)) {
                        emit(value);
                    }
                    else if (isAssignmentExpressionStatement) {
                        // Source map node for root.left = root.right is root
                        // but if root is synthetic, which could be in below case, use the target which is { a }
                        // for ({a} of {a: string}) {
                        // }
                        emitDestructuringAssignment(target, value, nodeIsSynthesized(root) ? target : root);
                    }
                    else {
                        if (root.parent.kind !== SyntaxKind.ParenthesizedExpression) {
                            write("(");
                        }
                        // Temporary assignment needed to emit root should highlight whole binary expression
                        value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, root);
                        // Source map node for root.left = root.right is root
                        emitDestructuringAssignment(target, value, root);
                        write(", ");
                        emit(value);
                        if (root.parent.kind !== SyntaxKind.ParenthesizedExpression) {
                            write(")");
                        }
                    }
                }

                function emitBindingElement(target: BindingElement | VariableDeclaration, value: Expression) {
                    // Any temporary assignments needed to emit target = value should point to target
                    if (target.initializer) {
                        // Combine value and initializer
                        value = value ? createDefaultValueCheck(value, target.initializer, target) : target.initializer;
                    }
                    else if (!value) {
                        // Use 'void 0' in absence of value and initializer
                        value = createVoidZero();
                    }
                    if (isBindingPattern(target.name)) {
                        const pattern = <BindingPattern>target.name;
                        const elements = pattern.elements;
                        const numElements = elements.length;

                        if (numElements !== 1) {
                            // For anything other than a single-element destructuring we need to generate a temporary
                            // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                            // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                            // so in that case, we'll intentionally create that temporary.
                            value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ numElements !== 0, target);
                        }

                        for (let i = 0; i < numElements; i++) {
                            const element = elements[i];
                            if (pattern.kind === SyntaxKind.ObjectBindingPattern) {
                                // Rewrite element to a declaration with an initializer that fetches property
                                const propName = element.propertyName || <Identifier>element.name;
                                emitBindingElement(element, createPropertyAccessForDestructuringProperty(value, propName));
                            }
                            else if (element.kind !== SyntaxKind.OmittedExpression) {
                                if (!element.dotDotDotToken) {
                                    // Rewrite element to a declaration that accesses array element at index i
                                    emitBindingElement(element, createElementAccessExpression(value, createNumericLiteral(i)));
                                }
                                else if (i === numElements - 1) {
                                    emitBindingElement(element, createSliceCall(value, i));
                                }
                            }
                        }
                    }
                    else {
                        emitAssignment(<Identifier>target.name, value, /*shouldEmitCommaBeforeAssignment*/ emitCount > 0, target);
                        emitCount++;
                    }
                }
            }

            function emitVariableDeclaration(node: VariableDeclaration) {
                if (isBindingPattern(node.name)) {
                    const isExported = getCombinedNodeFlags(node) & NodeFlags.Export;
                    if (languageVersion >= ScriptTarget.ES6 && (!isExported || modulekind === ModuleKind.ES6)) {
                        // emit ES6 destructuring only if target module is ES6 or variable is not exported
                        // exported variables in CJS/AMD are prefixed with 'exports.' so result javascript { exports.toString } = 1; is illegal

                        const isTopLevelDeclarationInSystemModule =
                            modulekind === ModuleKind.System &&
                            shouldHoistVariable(node, /*checkIfSourceFileLevelDecl*/true);

                        if (isTopLevelDeclarationInSystemModule) {
                            // In System modules top level variables are hoisted
                            // so variable declarations with destructuring are turned into destructuring assignments.
                            // As a result, they will need parentheses to disambiguate object binding assignments from blocks.
                            write("(");
                        }

                        emit(node.name);
                        emitOptional(" = ", node.initializer);

                        if (isTopLevelDeclarationInSystemModule) {
                            write(")");
                        }
                    }
                    else {
                        emitDestructuring(node, /*isAssignmentExpressionStatement*/ false);
                    }
                }
                else {
                    let initializer = node.initializer;
                    if (!initializer &&
                        languageVersion < ScriptTarget.ES6 &&
                        // for names - binding patterns that lack initializer there is no point to emit explicit initializer
                        // since downlevel codegen for destructuring will fail in the absence of initializer so all binding elements will say uninitialized
                        node.name.kind === SyntaxKind.Identifier) {

                        const container = getEnclosingBlockScopeContainer(node);
                        const flags = resolver.getNodeCheckFlags(node);

                        // nested let bindings might need to be initialized explicitly to preserve ES6 semantic
                        // { let x = 1; }
                        // { let x; } // x here should be undefined. not 1
                        // NOTES:
                        // Top level bindings never collide with anything and thus don't require explicit initialization.
                        // As for nested let bindings there are two cases:
                        // - nested let bindings that were not renamed definitely should be initialized explicitly
                        //   { let x = 1; }
                        //   { let x; if (some-condition) { x = 1}; if (x) { /*1*/ } }
                        //   Without explicit initialization code in /*1*/ can be executed even if some-condition is evaluated to false
                        // - renaming introduces fresh name that should not collide with any existing names, however renamed bindings sometimes also should be
                        //   explicitly initialized. One particular case: non-captured binding declared inside loop body (but not in loop initializer)
                        //   let x;
                        //   for (;;) {
                        //       let x;
                        //   }
                        //   in downlevel codegen inner 'x' will be renamed so it won't collide with outer 'x' however it will should be reset on every iteration
                        //   as if it was declared anew.
                        //   * Why non-captured binding - because if loop contains block scoped binding captured in some function then loop body will be rewritten
                        //   to have a fresh scope on every iteration so everything will just work.
                        //   * Why loop initializer is excluded - since we've introduced a fresh name it already will be undefined.
                        const isCapturedInFunction = flags & NodeCheckFlags.CapturedBlockScopedBinding;
                        const isDeclaredInLoop = flags & NodeCheckFlags.BlockScopedBindingInLoop;

                        const emittedAsTopLevel =
                            isBlockScopedContainerTopLevel(container) ||
                            (isCapturedInFunction && isDeclaredInLoop && container.kind === SyntaxKind.Block && isIterationStatement(container.parent, /*lookInLabeledStatements*/ false));

                        const emittedAsNestedLetDeclaration =
                            getCombinedNodeFlags(node) & NodeFlags.Let &&
                            !emittedAsTopLevel;

                        const emitExplicitInitializer =
                            emittedAsNestedLetDeclaration &&
                            container.kind !== SyntaxKind.ForInStatement &&
                            container.kind !== SyntaxKind.ForOfStatement &&
                            (
                                !resolver.isDeclarationWithCollidingName(node) ||
                                (isDeclaredInLoop && !isCapturedInFunction && !isIterationStatement(container, /*lookInLabeledStatements*/ false))
                            );
                        if (emitExplicitInitializer) {
                            initializer = createVoidZero();
                        }
                    }

                    const exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.name);

                    if (exportChanged) {
                        write(`${exportFunctionForFile}("`);
                        emitNodeWithCommentsAndWithoutSourcemap(node.name);
                        write(`", `);
                    }

                    emitModuleMemberName(node);
                    emitOptional(" = ", initializer);

                    if (exportChanged) {
                        write(")");
                    }
                }
            }

            function emitExportVariableAssignments(node: VariableDeclaration | BindingElement) {
                if (node.kind === SyntaxKind.OmittedExpression) {
                    return;
                }
                const name = node.name;
                if (name.kind === SyntaxKind.Identifier) {
                    emitExportMemberAssignments(<Identifier>name);
                }
                else if (isBindingPattern(name)) {
                    forEach((<BindingPattern>name).elements, emitExportVariableAssignments);
                }
            }

            function isES6ExportedDeclaration(node: Node) {
                return !!(node.flags & NodeFlags.Export) &&
                    modulekind === ModuleKind.ES6 &&
                    node.parent.kind === SyntaxKind.SourceFile;
            }

            function emitVariableStatement(node: VariableStatement) {
                let startIsEmitted = false;

                if (node.flags & NodeFlags.Export) {
                    if (isES6ExportedDeclaration(node)) {
                        // Exported ES6 module member
                        write("export ");
                        startIsEmitted = tryEmitStartOfVariableDeclarationList(node.declarationList);
                    }
                }
                else {
                    startIsEmitted = tryEmitStartOfVariableDeclarationList(node.declarationList);
                }

                if (startIsEmitted) {
                    emitCommaList(node.declarationList.declarations);
                    write(";");
                }
                else {
                    const atLeastOneItem = emitVariableDeclarationListSkippingUninitializedEntries(node.declarationList);
                    if (atLeastOneItem) {
                        write(";");
                    }
                }
                if (modulekind !== ModuleKind.ES6 && node.parent === currentSourceFile) {
                    forEach(node.declarationList.declarations, emitExportVariableAssignments);
                }
            }

            function shouldEmitLeadingAndTrailingCommentsForVariableStatement(node: VariableStatement) {
                // If we're not exporting the variables, there's nothing special here.
                // Always emit comments for these nodes.
                if (!(node.flags & NodeFlags.Export)) {
                    return true;
                }

                // If we are exporting, but it's a top-level ES6 module exports,
                // we'll emit the declaration list verbatim, so emit comments too.
                if (isES6ExportedDeclaration(node)) {
                    return true;
                }

                // Otherwise, only emit if we have at least one initializer present.
                for (const declaration of node.declarationList.declarations) {
                    if (declaration.initializer) {
                        return true;
                    }
                }
                return false;
            }

            function emitParameter(node: ParameterDeclaration) {
                if (languageVersion < ScriptTarget.ES6) {
                    if (isBindingPattern(node.name)) {
                        const name = createTempVariable(TempFlags.Auto);
                        if (!tempParameters) {
                            tempParameters = [];
                        }
                        tempParameters.push(name);
                        emit(name);
                    }
                    else {
                        emit(node.name);
                    }
                }
                else {
                    if (node.dotDotDotToken) {
                        write("...");
                    }
                    emit(node.name);
                    emitOptional(" = ", node.initializer);
                }
            }

            function emitDefaultValueAssignments(node: FunctionLikeDeclaration) {
                if (languageVersion < ScriptTarget.ES6) {
                    let tempIndex = 0;
                    forEach(node.parameters, parameter => {
                        // A rest parameter cannot have a binding pattern or an initializer,
                        // so let's just ignore it.
                        if (parameter.dotDotDotToken) {
                            return;
                        }

                        const { name: paramName, initializer } = parameter;
                        if (isBindingPattern(paramName)) {
                            // In cases where a binding pattern is simply '[]' or '{}',
                            // we usually don't want to emit a var declaration; however, in the presence
                            // of an initializer, we must emit that expression to preserve side effects.
                            const hasBindingElements = paramName.elements.length > 0;
                            if (hasBindingElements || initializer) {
                                writeLine();
                                write("var ");

                                if (hasBindingElements) {
                                    emitDestructuring(parameter, /*isAssignmentExpressionStatement*/ false, tempParameters[tempIndex]);
                                }
                                else {
                                    emit(tempParameters[tempIndex]);
                                    write(" = ");
                                    emit(initializer);
                                }

                                write(";");
                            }
                            // Regardless of whether we will emit a var declaration for the binding pattern, we generate the temporary
                            // variable for the parameter (see: emitParameter)
                            tempIndex++;
                        }
                        else if (initializer) {
                            writeLine();
                            emitStart(parameter);
                            write("if (");
                            emitNodeWithoutSourceMap(paramName);
                            write(" === void 0)");
                            emitEnd(parameter);
                            write(" { ");
                            emitStart(parameter);
                            emitNodeWithCommentsAndWithoutSourcemap(paramName);
                            write(" = ");
                            emitNodeWithCommentsAndWithoutSourcemap(initializer);
                            emitEnd(parameter);
                            write("; }");
                        }
                    });
                }
            }

            function emitRestParameter(node: FunctionLikeDeclaration) {
                if (languageVersion < ScriptTarget.ES6 && hasDeclaredRestParameter(node)) {
                    const restIndex = node.parameters.length - 1;
                    const restParam = node.parameters[restIndex];

                    // A rest parameter cannot have a binding pattern, so let's just ignore it if it does.
                    if (isBindingPattern(restParam.name)) {
                        return;
                    }

                    const tempName = createTempVariable(TempFlags._i).text;
                    writeLine();
                    emitLeadingComments(restParam);
                    emitStart(restParam);
                    write("var ");
                    emitNodeWithCommentsAndWithoutSourcemap(restParam.name);
                    write(" = [];");
                    emitEnd(restParam);
                    emitTrailingComments(restParam);
                    writeLine();
                    write("for (");
                    emitStart(restParam);
                    write("var " + tempName + " = " + restIndex + ";");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write(tempName + " < arguments.length;");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write(tempName + "++");
                    emitEnd(restParam);
                    write(") {");
                    increaseIndent();
                    writeLine();
                    emitStart(restParam);
                    emitNodeWithCommentsAndWithoutSourcemap(restParam.name);
                    write("[" + tempName + " - " + restIndex + "] = arguments[" + tempName + "];");
                    emitEnd(restParam);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }

            function emitAccessor(node: AccessorDeclaration) {
                write(node.kind === SyntaxKind.GetAccessor ? "get " : "set ");
                emit(node.name);
                emitSignatureAndBody(node);
            }

            function shouldEmitAsArrowFunction(node: FunctionLikeDeclaration): boolean {
                return node.kind === SyntaxKind.ArrowFunction && languageVersion >= ScriptTarget.ES6;
            }

            function emitDeclarationName(node: Declaration) {
                if (node.name) {
                    emitNodeWithCommentsAndWithoutSourcemap(node.name);
                }
                else {
                    write(getGeneratedNameForNode(node));
                }
            }

            function shouldEmitFunctionName(node: FunctionLikeDeclaration) {
                if (node.kind === SyntaxKind.FunctionExpression) {
                    // Emit name if one is present
                    return !!node.name;
                }
                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    // Emit name if one is present, or emit generated name in down-level case (for export default case)
                    return !!node.name || modulekind !== ModuleKind.ES6;
                }
            }

            function emitFunctionDeclaration(node: FunctionLikeDeclaration) {
                if (nodeIsMissing(node.body)) {
                    return emitCommentsOnNotEmittedNode(node);
                }

                // TODO (yuisu) : we should not have special cases to condition emitting comments
                // but have one place to fix check for these conditions.
                const { kind, parent } = node;
                if (kind !== SyntaxKind.MethodDeclaration &&
                    kind !== SyntaxKind.MethodSignature &&
                    parent &&
                    parent.kind !== SyntaxKind.PropertyAssignment &&
                    parent.kind !== SyntaxKind.CallExpression &&
                    parent.kind !== SyntaxKind.ArrayLiteralExpression) {
                    // 1. Methods will emit comments at their assignment declaration sites.
                    //
                    // 2. If the function is a property of object literal, emitting leading-comments
                    //    is done by emitNodeWithoutSourceMap which then call this function.
                    //    In particular, we would like to avoid emit comments twice in following case:
                    //
                    //          var obj = {
                    //              id:
                    //                  /*comment*/ () => void
                    //          }
                    //
                    // 3. If the function is an argument in call expression, emitting of comments will be
                    //    taken care of in emit list of arguments inside of 'emitCallExpression'.
                    //
                    // 4. If the function is in an array literal, 'emitLinePreservingList' will take care
                    //    of leading comments.
                    emitLeadingComments(node);
                }

                emitStart(node);
                // For targeting below es6, emit functions-like declaration including arrow function using function keyword.
                // When targeting ES6, emit arrow function natively in ES6 by omitting function keyword and using fat arrow instead
                if (!shouldEmitAsArrowFunction(node)) {
                    if (isES6ExportedDeclaration(node)) {
                        write("export ");
                        if (node.flags & NodeFlags.Default) {
                            write("default ");
                        }
                    }

                    write("function");
                    if (languageVersion >= ScriptTarget.ES6 && node.asteriskToken) {
                        write("*");
                    }
                    write(" ");
                }

                if (shouldEmitFunctionName(node)) {
                    emitDeclarationName(node);
                }

                emitSignatureAndBody(node);
                if (modulekind !== ModuleKind.ES6 && kind === SyntaxKind.FunctionDeclaration && parent === currentSourceFile && node.name) {
                    emitExportMemberAssignments((<FunctionDeclaration>node).name);
                }

                emitEnd(node);
                if (kind !== SyntaxKind.MethodDeclaration &&
                    kind !== SyntaxKind.MethodSignature &&
                    kind !== SyntaxKind.ArrowFunction) {
                    emitTrailingComments(node);
                }
            }

            function emitCaptureThisForNodeIfNecessary(node: Node): void {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureThis) {
                    writeLine();
                    emitStart(node);
                    write("var _this = this;");
                    emitEnd(node);
                }
            }

            function emitSignatureParameters(node: FunctionLikeDeclaration) {
                increaseIndent();
                write("(");
                if (node) {
                    const parameters = node.parameters;
                    const skipCount = node.parameters.length && (<Identifier>node.parameters[0].name).text === "this" ? 1 : 0;
                    const omitCount = languageVersion < ScriptTarget.ES6 && hasDeclaredRestParameter(node) ? 1 : 0;
                    emitList(parameters, skipCount, parameters.length - omitCount - skipCount, /*multiLine*/ false, /*trailingComma*/ false);
                }
                write(")");
                decreaseIndent();
            }

            function emitSignatureParametersForArrow(node: FunctionLikeDeclaration) {
                // Check whether the parameter list needs parentheses and preserve no-parenthesis
                if (node.parameters.length === 1 && node.pos === node.parameters[0].pos) {
                    emit(node.parameters[0]);
                    return;
                }

                emitSignatureParameters(node);
            }

            function emitAsyncFunctionBodyForES6(node: FunctionLikeDeclaration) {
                const promiseConstructor = getEntityNameFromTypeNode(node.type);
                const isArrowFunction = node.kind === SyntaxKind.ArrowFunction;
                const hasLexicalArguments = (resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureArguments) !== 0;

                // An async function is emit as an outer function that calls an inner
                // generator function. To preserve lexical bindings, we pass the current
                // `this` and `arguments` objects to `__awaiter`. The generator function
                // passed to `__awaiter` is executed inside of the callback to the
                // promise constructor.
                //
                // The emit for an async arrow without a lexical `arguments` binding might be:
                //
                //  // input
                //  let a = async (b) => { await b; }
                //
                //  // output
                //  let a = (b) => __awaiter(this, void 0, void 0, function* () {
                //      yield b;
                //  });
                //
                // The emit for an async arrow with a lexical `arguments` binding might be:
                //
                //  // input
                //  let a = async (b) => { await arguments[0]; }
                //
                //  // output
                //  let a = (b) => __awaiter(this, arguments, void 0, function* (arguments) {
                //      yield arguments[0];
                //  });
                //
                // The emit for an async function expression without a lexical `arguments` binding
                // might be:
                //
                //  // input
                //  let a = async function (b) {
                //      await b;
                //  }
                //
                //  // output
                //  let a = function (b) {
                //      return __awaiter(this, void 0, void 0, function* () {
                //          yield b;
                //      });
                //  }
                //
                // The emit for an async function expression with a lexical `arguments` binding
                // might be:
                //
                //  // input
                //  let a = async function (b) {
                //      await arguments[0];
                //  }
                //
                //  // output
                //  let a = function (b) {
                //      return __awaiter(this, arguments, void 0, function* (_arguments) {
                //          yield _arguments[0];
                //      });
                //  }
                //
                // The emit for an async function expression with a lexical `arguments` binding
                // and a return type annotation might be:
                //
                //  // input
                //  let a = async function (b): MyPromise<any> {
                //      await arguments[0];
                //  }
                //
                //  // output
                //  let a = function (b) {
                //      return __awaiter(this, arguments, MyPromise, function* (_arguments) {
                //          yield _arguments[0];
                //      });
                //  }
                //

                // If this is not an async arrow, emit the opening brace of the function body
                // and the start of the return statement.
                if (!isArrowFunction) {
                    write(" {");
                    increaseIndent();
                    writeLine();

                    if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                        writeLines(`
const _super = (function (geti, seti) {
    const cache = Object.create(null);
    return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
})(name => super[name], (name, value) => super[name] = value);`);
                        writeLine();
                    }
                    else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                        write(`const _super = name => super[name];`);
                        writeLine();
                    }

                    write("return");
                }

                write(" __awaiter(this");
                if (hasLexicalArguments) {
                    write(", arguments, ");
                }
                else {
                    write(", void 0, ");
                }

                if (languageVersion >= ScriptTarget.ES6 || !promiseConstructor) {
                    write("void 0");
                }
                else {
                    emitEntityNameAsExpression(promiseConstructor, /*useFallback*/ false);
                }

                // Emit the call to __awaiter.
                write(", function* ()");

                // Emit the signature and body for the inner generator function.
                emitFunctionBody(node);
                write(")");

                // If this is not an async arrow, emit the closing brace of the outer function body.
                if (!isArrowFunction) {
                    write(";");
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }

            function emitFunctionBody(node: FunctionLikeDeclaration) {
                if (!node.body) {
                    // There can be no body when there are parse errors.  Just emit an empty block
                    // in that case.
                    write(" { }");
                }
                else {
                    if (node.body.kind === SyntaxKind.Block) {
                        emitBlockFunctionBody(node, <Block>node.body);
                    }
                    else {
                        emitExpressionFunctionBody(node, <Expression>node.body);
                    }
                }
            }

            function emitSignatureAndBody(node: FunctionLikeDeclaration) {
                const saveConvertedLoopState = convertedLoopState;
                const saveTempFlags = tempFlags;
                const saveTempVariables = tempVariables;
                const saveTempParameters = tempParameters;

                convertedLoopState = undefined;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;

                // When targeting ES6, emit arrow function natively in ES6
                if (shouldEmitAsArrowFunction(node)) {
                    emitSignatureParametersForArrow(node);
                    write(" =>");
                }
                else {
                    emitSignatureParameters(node);
                }

                const isAsync = isAsyncFunctionLike(node);
                if (isAsync) {
                    emitAsyncFunctionBodyForES6(node);
                }
                else {
                    emitFunctionBody(node);
                }

                if (!isES6ExportedDeclaration(node)) {
                    emitExportMemberAssignment(node);
                }

                Debug.assert(convertedLoopState === undefined);
                convertedLoopState = saveConvertedLoopState;

                tempFlags = saveTempFlags;
                tempVariables = saveTempVariables;
                tempParameters = saveTempParameters;
            }

            // Returns true if any preamble code was emitted.
            function emitFunctionBodyPreamble(node: FunctionLikeDeclaration): void {
                emitCaptureThisForNodeIfNecessary(node);
                emitDefaultValueAssignments(node);
                emitRestParameter(node);
            }

            function emitExpressionFunctionBody(node: FunctionLikeDeclaration, body: Expression) {
                if (languageVersion < ScriptTarget.ES6 || node.flags & NodeFlags.Async) {
                    emitDownLevelExpressionFunctionBody(node, body);
                    return;
                }

                // For es6 and higher we can emit the expression as is.  However, in the case
                // where the expression might end up looking like a block when emitted, we'll
                // also wrap it in parentheses first.  For example if you have: a => <foo>{}
                // then we need to generate: a => ({})
                write(" ");

                // Unwrap all type assertions.
                let current = body;
                while (current.kind === SyntaxKind.TypeAssertionExpression) {
                    current = (<TypeAssertion>current).expression;
                }

                emitParenthesizedIf(body, current.kind === SyntaxKind.ObjectLiteralExpression);
            }

            function emitDownLevelExpressionFunctionBody(node: FunctionLikeDeclaration, body: Expression) {
                write(" {");
                increaseIndent();
                const outPos = writer.getTextPos();
                emitDetachedCommentsAndUpdateCommentsInfo(node.body);
                emitFunctionBodyPreamble(node);
                const preambleEmitted = writer.getTextPos() !== outPos;
                decreaseIndent();

                // If we didn't have to emit any preamble code, then attempt to keep the arrow
                // function on one line.
                if (!preambleEmitted && nodeStartPositionsAreOnSameLine(node, body)) {
                    write(" ");
                    emitStart(body);
                    write("return ");
                    emit(body);
                    emitEnd(body);
                    write(";");
                    emitTempDeclarations(/*newLine*/ false);
                    write(" ");
                }
                else {
                    increaseIndent();
                    writeLine();
                    emitLeadingComments(node.body);
                    emitStart(body);
                    write("return ");
                    emit(body);
                    emitEnd(body);
                    write(";");
                    emitTrailingComments(node.body);

                    emitTempDeclarations(/*newLine*/ true);
                    decreaseIndent();
                    writeLine();
                }

                emitStart(node.body);
                write("}");
                emitEnd(node.body);
            }

            function emitBlockFunctionBody(node: FunctionLikeDeclaration, body: Block) {
                write(" {");
                const initialTextPos = writer.getTextPos();

                increaseIndent();
                emitDetachedCommentsAndUpdateCommentsInfo(body.statements);

                // Emit all the directive prologues (like "use strict").  These have to come before
                // any other preamble code we write (like parameter initializers).
                const startIndex = emitDirectivePrologues(body.statements, /*startWithNewLine*/ true);
                emitFunctionBodyPreamble(node);
                decreaseIndent();

                const preambleEmitted = writer.getTextPos() !== initialTextPos;

                if (!preambleEmitted && nodeEndIsOnSameLineAsNodeStart(body, body)) {
                    for (const statement of body.statements) {
                        write(" ");
                        emit(statement);
                    }
                    emitTempDeclarations(/*newLine*/ false);
                    write(" ");
                    emitLeadingCommentsOfPosition(body.statements.end);
                }
                else {
                    increaseIndent();
                    emitLinesStartingAt(body.statements, startIndex);
                    emitTempDeclarations(/*newLine*/ true);

                    writeLine();
                    emitLeadingCommentsOfPosition(body.statements.end);
                    decreaseIndent();
                }

                emitToken(SyntaxKind.CloseBraceToken, body.statements.end);
            }

            /**
             * Return the statement at a given index if it is a super-call statement
             * @param ctor a constructor declaration
             * @param index an index to constructor's body to check
             */
            function getSuperCallAtGivenIndex(ctor: ConstructorDeclaration, index: number): ExpressionStatement {
                if (!ctor.body) {
                    return undefined;
                }
                const statements = ctor.body.statements;

                if (!statements || index >= statements.length) {
                    return undefined;
                }

                const statement = statements[index];
                if (statement.kind === SyntaxKind.ExpressionStatement) {
                    return isSuperCallExpression((<ExpressionStatement>statement).expression) ? <ExpressionStatement>statement : undefined;
                }
            }

            function emitParameterPropertyAssignments(node: ConstructorDeclaration) {
                forEach(node.parameters, param => {
                    if (param.flags & NodeFlags.ParameterPropertyModifier) {
                        writeLine();
                        emitStart(param);
                        emitStart(param.name);
                        write("this.");
                        emitNodeWithoutSourceMap(param.name);
                        emitEnd(param.name);
                        write(" = ");
                        emit(param.name);
                        write(";");
                        emitEnd(param);
                    }
                });
            }

            function emitMemberAccessForPropertyName(memberName: DeclarationName) {
                // This does not emit source map because it is emitted by caller as caller
                // is aware how the property name changes to the property access
                // eg. public x = 10; becomes this.x and static x = 10 becomes className.x
                if (memberName.kind === SyntaxKind.StringLiteral || memberName.kind === SyntaxKind.NumericLiteral) {
                    write("[");
                    emitNodeWithCommentsAndWithoutSourcemap(memberName);
                    write("]");
                }
                else if (memberName.kind === SyntaxKind.ComputedPropertyName) {
                    emitComputedPropertyName(<ComputedPropertyName>memberName);
                }
                else {
                    write(".");
                    emitNodeWithCommentsAndWithoutSourcemap(memberName);
                }
            }

            function getInitializedProperties(node: ClassLikeDeclaration, isStatic: boolean) {
                const properties: PropertyDeclaration[] = [];
                for (const member of node.members) {
                    if (member.kind === SyntaxKind.PropertyDeclaration && isStatic === ((member.flags & NodeFlags.Static) !== 0) && (<PropertyDeclaration>member).initializer) {
                        properties.push(<PropertyDeclaration>member);
                    }
                }

                return properties;
            }

            function emitPropertyDeclarations(node: ClassLikeDeclaration, properties: PropertyDeclaration[]) {
                for (const property of properties) {
                    emitPropertyDeclaration(node, property);
                }
            }

            function emitPropertyDeclaration(node: ClassLikeDeclaration, property: PropertyDeclaration, receiver?: string, isExpression?: boolean) {
                writeLine();
                emitLeadingComments(property);
                emitStart(property);
                emitStart(property.name);
                if (receiver) {
                    write(receiver);
                }
                else {
                    if (property.flags & NodeFlags.Static) {
                        emitDeclarationName(node);
                    }
                    else {
                        write("this");
                    }
                }
                emitMemberAccessForPropertyName(property.name);
                emitEnd(property.name);
                write(" = ");
                emit(property.initializer);
                if (!isExpression) {
                    write(";");
                }

                emitEnd(property);
                emitTrailingComments(property);
            }

            function emitMemberFunctionsForES5AndLower(node: ClassLikeDeclaration) {
                forEach(node.members, member => {
                    if (member.kind === SyntaxKind.SemicolonClassElement) {
                        writeLine();
                        write(";");
                    }
                    else if (member.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature) {
                        if (!(<MethodDeclaration>member).body) {
                            return emitCommentsOnNotEmittedNode(member);
                        }

                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        emitStart((<MethodDeclaration>member).name);
                        emitClassMemberPrefix(node, member);
                        emitMemberAccessForPropertyName((<MethodDeclaration>member).name);
                        emitEnd((<MethodDeclaration>member).name);
                        write(" = ");
                        emitFunctionDeclaration(<MethodDeclaration>member);
                        emitEnd(member);
                        write(";");
                        emitTrailingComments(member);
                    }
                    else if (member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor) {
                        const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
                        if (member === accessors.firstAccessor) {
                            writeLine();
                            emitStart(member);
                            write("Object.defineProperty(");
                            emitStart((<AccessorDeclaration>member).name);
                            emitClassMemberPrefix(node, member);
                            write(", ");
                            emitExpressionForPropertyName((<AccessorDeclaration>member).name);
                            emitEnd((<AccessorDeclaration>member).name);
                            write(", {");
                            increaseIndent();
                            if (accessors.getAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.getAccessor);
                                write("get: ");
                                emitStart(accessors.getAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.getAccessor);
                                emitEnd(accessors.getAccessor);
                                emitTrailingComments(accessors.getAccessor);
                                write(",");
                            }
                            if (accessors.setAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.setAccessor);
                                write("set: ");
                                emitStart(accessors.setAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.setAccessor);
                                emitEnd(accessors.setAccessor);
                                emitTrailingComments(accessors.setAccessor);
                                write(",");
                            }
                            writeLine();
                            write("enumerable: true,");
                            writeLine();
                            write("configurable: true");
                            decreaseIndent();
                            writeLine();
                            write("});");
                            emitEnd(member);
                        }
                    }
                });
            }

            function emitMemberFunctionsForES6AndHigher(node: ClassLikeDeclaration) {
                for (const member of node.members) {
                    if ((member.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature) && !(<MethodDeclaration>member).body) {
                        emitCommentsOnNotEmittedNode(member);
                    }
                    else if (member.kind === SyntaxKind.MethodDeclaration ||
                        member.kind === SyntaxKind.GetAccessor ||
                        member.kind === SyntaxKind.SetAccessor) {
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        if (member.flags & NodeFlags.Static) {
                            write("static ");
                        }

                        if (member.kind === SyntaxKind.GetAccessor) {
                            write("get ");
                        }
                        else if (member.kind === SyntaxKind.SetAccessor) {
                            write("set ");
                        }
                        if ((<MethodDeclaration>member).asteriskToken) {
                            write("*");
                        }
                        emit((<MethodDeclaration>member).name);
                        emitSignatureAndBody(<MethodDeclaration>member);
                        emitEnd(member);
                        emitTrailingComments(member);
                    }
                    else if (member.kind === SyntaxKind.SemicolonClassElement) {
                        writeLine();
                        write(";");
                    }
                }
            }

            function emitConstructor(node: ClassLikeDeclaration, baseTypeElement: ExpressionWithTypeArguments) {
                const saveConvertedLoopState = convertedLoopState;
                const saveTempFlags = tempFlags;
                const saveTempVariables = tempVariables;
                const saveTempParameters = tempParameters;

                convertedLoopState = undefined;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;

                emitConstructorWorker(node, baseTypeElement);

                Debug.assert(convertedLoopState === undefined);
                convertedLoopState = saveConvertedLoopState;

                tempFlags = saveTempFlags;
                tempVariables = saveTempVariables;
                tempParameters = saveTempParameters;
            }

            function emitConstructorWorker(node: ClassLikeDeclaration, baseTypeElement: ExpressionWithTypeArguments) {
                // Check if we have property assignment inside class declaration.
                // If there is property assignment, we need to emit constructor whether users define it or not
                // If there is no property assignment, we can omit constructor if users do not define it
                let hasInstancePropertyWithInitializer = false;

                // Emit the constructor overload pinned comments
                forEach(node.members, member => {
                    if (member.kind === SyntaxKind.Constructor && !(<ConstructorDeclaration>member).body) {
                        emitCommentsOnNotEmittedNode(member);
                    }
                    // Check if there is any non-static property assignment
                    if (member.kind === SyntaxKind.PropertyDeclaration && (<PropertyDeclaration>member).initializer && (member.flags & NodeFlags.Static) === 0) {
                        hasInstancePropertyWithInitializer = true;
                    }
                });

                const ctor = getFirstConstructorWithBody(node);

                // For target ES6 and above, if there is no user-defined constructor and there is no property assignment
                // do not emit constructor in class declaration.
                if (languageVersion >= ScriptTarget.ES6 && !ctor && !hasInstancePropertyWithInitializer) {
                    return;
                }

                if (ctor) {
                    emitLeadingComments(ctor);
                }
                emitStart(ctor || node);

                if (languageVersion < ScriptTarget.ES6) {
                    write("function ");
                    emitDeclarationName(node);
                    emitSignatureParameters(ctor);
                }
                else {
                    write("constructor");
                    if (ctor) {
                        emitSignatureParameters(ctor);
                    }
                    else {
                        // Based on EcmaScript6 section 14.5.14: Runtime Semantics: ClassDefinitionEvaluation.
                        // If constructor is empty, then,
                        //      If ClassHeritageopt is present, then
                        //          Let constructor be the result of parsing the String "constructor(... args){ super (...args);}" using the syntactic grammar with the goal symbol MethodDefinition.
                        //      Else,
                        //          Let constructor be the result of parsing the String "constructor( ){ }" using the syntactic grammar with the goal symbol MethodDefinition
                        if (baseTypeElement) {
                            write("(...args)");
                        }
                        else {
                            write("()");
                        }
                    }
                }

                let startIndex = 0;

                write(" {");
                increaseIndent();
                if (ctor) {
                    // Emit all the directive prologues (like "use strict").  These have to come before
                    // any other preamble code we write (like parameter initializers).
                    startIndex = emitDirectivePrologues(ctor.body.statements, /*startWithNewLine*/ true);
                    emitDetachedCommentsAndUpdateCommentsInfo(ctor.body.statements);
                }
                emitCaptureThisForNodeIfNecessary(node);
                let superCall: ExpressionStatement;
                if (ctor) {
                    emitDefaultValueAssignments(ctor);
                    emitRestParameter(ctor);

                    if (baseTypeElement) {
                        superCall = getSuperCallAtGivenIndex(ctor, startIndex);
                        if (superCall) {
                            writeLine();
                            emit(superCall);
                        }
                    }

                    emitParameterPropertyAssignments(ctor);
                }
                else {
                    if (baseTypeElement) {
                        writeLine();
                        emitStart(baseTypeElement);
                        if (languageVersion < ScriptTarget.ES6) {
                            write("_super.apply(this, arguments);");
                        }
                        else {
                            write("super(...args);");
                        }
                        emitEnd(baseTypeElement);
                    }
                }
                emitPropertyDeclarations(node, getInitializedProperties(node, /*isStatic*/ false));
                if (ctor) {
                    let statements: Node[] = (<Block>ctor.body).statements;
                    if (superCall) {
                        statements = statements.slice(1);
                    }
                    emitLinesStartingAt(statements, startIndex);
                }
                emitTempDeclarations(/*newLine*/ true);
                writeLine();
                if (ctor) {
                    emitLeadingCommentsOfPosition((<Block>ctor.body).statements.end);
                }
                decreaseIndent();
                emitToken(SyntaxKind.CloseBraceToken, ctor ? (<Block>ctor.body).statements.end : node.members.end);
                emitEnd(<Node>ctor || node);
                if (ctor) {
                    emitTrailingComments(ctor);
                }
            }

            function emitClassExpression(node: ClassExpression) {
                return emitClassLikeDeclaration(node);
            }

            function emitClassDeclaration(node: ClassDeclaration) {
                return emitClassLikeDeclaration(node);
            }

            function emitClassLikeDeclaration(node: ClassLikeDeclaration) {
                if (languageVersion < ScriptTarget.ES6) {
                    emitClassLikeDeclarationBelowES6(node);
                }
                else {
                    emitClassLikeDeclarationForES6AndHigher(node);
                }
                if (modulekind !== ModuleKind.ES6 && node.parent === currentSourceFile && node.name) {
                    emitExportMemberAssignments(node.name);
                }
            }

            function emitClassLikeDeclarationForES6AndHigher(node: ClassLikeDeclaration) {
                let decoratedClassAlias: string;
                const isHoistedDeclarationInSystemModule = shouldHoistDeclarationInSystemJsModule(node);
                const isDecorated = nodeIsDecorated(node);
                const rewriteAsClassExpression = isDecorated || isHoistedDeclarationInSystemModule;
                if (node.kind === SyntaxKind.ClassDeclaration) {
                    if (rewriteAsClassExpression) {
                        // When we emit an ES6 class that has a class decorator, we must tailor the
                        // emit to certain specific cases.
                        //
                        // In the simplest case, we emit the class declaration as a let declaration, and
                        // evaluate decorators after the close of the class body:
                        //
                        //  TypeScript                      | Javascript
                        //  --------------------------------|------------------------------------
                        //  @dec                            | let C = class C {
                        //  class C {                       | }
                        //  }                               | C = __decorate([dec], C);
                        //  --------------------------------|------------------------------------
                        //  @dec                            | export let C = class C {
                        //  export class C {                | }
                        //  }                               | C = __decorate([dec], C);
                        //  ---------------------------------------------------------------------
                        //  [Example 1]
                        //
                        // If a class declaration contains a reference to itself *inside* of the class body,
                        // this introduces two bindings to the class: One outside of the class body, and one
                        // inside of the class body. If we apply decorators as in [Example 1] above, there
                        // is the possibility that the decorator `dec` will return a new value for the
                        // constructor, which would result in the binding inside of the class no longer
                        // pointing to the same reference as the binding outside of the class.
                        //
                        // As a result, we must instead rewrite all references to the class *inside* of the
                        // class body to instead point to a local temporary alias for the class:
                        //
                        //  TypeScript                      | Javascript
                        //  --------------------------------|------------------------------------
                        //  @dec                            | let C_1 = class C {
                        //  class C {                       |   static x() { return C_1.y; }
                        //    static x() { return C.y; }    | }
                        //    static y = 1;                 | let C = C_1;
                        //  }                               | C.y = 1;
                        //                                  | C = C_1 = __decorate([dec], C);
                        //  --------------------------------|------------------------------------
                        //  @dec                            | let C_1 = class C {
                        //  export class C {                |   static x() { return C_1.y; }
                        //    static x() { return C.y; }    | }
                        //    static y = 1;                 | export let C = C_1;
                        //  }                               | C.y = 1;
                        //                                  | C = C_1 = __decorate([dec], C);
                        //  ---------------------------------------------------------------------
                        //  [Example 2]
                        //
                        // If a class declaration is the default export of a module, we instead emit
                        // the export after the decorated declaration:
                        //
                        //  TypeScript                      | Javascript
                        //  --------------------------------|------------------------------------
                        //  @dec                            | let default_1 = class {
                        //  export default class {          | }
                        //  }                               | default_1 = __decorate([dec], default_1);
                        //                                  | export default default_1;
                        //  --------------------------------|------------------------------------
                        //  @dec                            | let C = class C {
                        //  export default class {          | }
                        //  }                               | C = __decorate([dec], C);
                        //                                  | export default C;
                        //  ---------------------------------------------------------------------
                        //  [Example 3]
                        //
                        // If the class declaration is the default export and a reference to itself
                        // inside of the class body, we must emit both an alias for the class *and*
                        // move the export after the declaration:
                        //
                        //  TypeScript                      | Javascript
                        //  --------------------------------|------------------------------------
                        //  @dec                            | let C_1 = class C {
                        //  export default class C {        |   static x() { return C_1.y; }
                        //    static x() { return C.y; }    | };
                        //    static y = 1;                 | let C = C_1;
                        //  }                               | C.y = 1;
                        //                                  | C = C_1 = __decorate([dec], C);
                        //                                  | export default C;
                        //  ---------------------------------------------------------------------
                        //  [Example 4]
                        //

                        // NOTE: we reuse the same rewriting logic for cases when targeting ES6 and module kind is System.
                        // Because of hoisting top level class declaration need to be emitted as class expressions.
                        // Double bind case is only required if node is decorated.
                        if (isDecorated && resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithBodyScopedClassBinding) {
                            decoratedClassAlias = unescapeIdentifier(makeUniqueName(node.name ? node.name.text : "default"));
                            decoratedClassAliases[getNodeId(node)] = decoratedClassAlias;
                        }

                        if (isES6ExportedDeclaration(node) && !(node.flags & NodeFlags.Default) && decoratedClassAlias === undefined) {
                            write("export ");
                        }

                        if (!isHoistedDeclarationInSystemModule) {
                            write("let ");
                        }
                        if (decoratedClassAlias !== undefined) {
                            write(`${decoratedClassAlias}`);
                        }
                        else {
                            emitDeclarationName(node);
                        }

                        write(" = ");
                    }
                    else if (isES6ExportedDeclaration(node)) {
                        write("export ");
                        if (node.flags & NodeFlags.Default) {
                            write("default ");
                        }
                    }
                }

                // If the class has static properties, and it's a class expression, then we'll need
                // to specialize the emit a bit.  for a class expression of the form:
                //
                //      class C { static a = 1; static b = 2; ... }
                //
                // We'll emit:
                //
                //      (_temp = class C { ... }, _temp.a = 1, _temp.b = 2, _temp)
                //
                // This keeps the expression as an expression, while ensuring that the static parts
                // of it have been initialized by the time it is used.
                const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
                const isClassExpressionWithStaticProperties = staticProperties.length > 0 && node.kind === SyntaxKind.ClassExpression;
                let generatedName: string;

                if (isClassExpressionWithStaticProperties) {
                    generatedName = getGeneratedNameForNode(node.name);
                    const synthesizedNode = <Identifier>createSynthesizedNode(SyntaxKind.Identifier);
                    synthesizedNode.text = generatedName;
                    recordTempDeclaration(synthesizedNode);
                    write("(");
                    increaseIndent();
                    emit(synthesizedNode);
                    write(" = ");
                }

                write("class");

                // emit name if
                // - node has a name
                // - this is default export with static initializers
                if (node.name || (node.flags & NodeFlags.Default && (staticProperties.length > 0 || modulekind !== ModuleKind.ES6) && !rewriteAsClassExpression)) {
                    write(" ");
                    emitDeclarationName(node);
                }

                const baseTypeNode = getClassExtendsHeritageClauseElement(node);
                if (baseTypeNode) {
                    write(" extends ");
                    emit(baseTypeNode.expression);
                }

                write(" {");
                increaseIndent();
                writeLine();
                emitConstructor(node, baseTypeNode);
                emitMemberFunctionsForES6AndHigher(node);
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.members.end);

                if (rewriteAsClassExpression) {
                    if (decoratedClassAlias !== undefined) {
                        write(";");
                        writeLine();
                        if (isES6ExportedDeclaration(node) && !(node.flags & NodeFlags.Default)) {
                            write("export ");
                        }
                        write("let ");
                        emitDeclarationName(node);
                        write(` = ${decoratedClassAlias}`);
                    }
                    decoratedClassAliases[getNodeId(node)] = undefined;
                    write(";");
                }

                // Emit static property assignment. Because classDeclaration is lexically evaluated,
                // it is safe to emit static property assignment after classDeclaration
                // From ES6 specification:
                //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
                //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.

                if (isClassExpressionWithStaticProperties) {
                    for (const property of staticProperties) {
                        write(",");
                        writeLine();
                        emitPropertyDeclaration(node, property, /*receiver*/ generatedName, /*isExpression*/ true);
                    }
                    write(",");
                    writeLine();
                    write(generatedName);
                    decreaseIndent();
                    write(")");
                }
                else {
                    writeLine();
                    emitPropertyDeclarations(node, staticProperties);
                    emitDecoratorsOfClass(node, decoratedClassAlias);
                }

                if (!(node.flags & NodeFlags.Export)) {
                    return;
                }
                if (modulekind !== ModuleKind.ES6) {
                    emitExportMemberAssignment(node as ClassDeclaration);
                }
                else {
                    // If this is an exported class, but not on the top level (i.e. on an internal
                    // module), export it
                    if (node.flags & NodeFlags.Default) {
                        // if this is a top level default export of decorated class, write the export after the declaration.
                        if (isDecorated) {
                            writeLine();
                            write("export default ");
                            emitDeclarationName(node);
                            write(";");
                        }
                    }
                    else if (node.parent.kind !== SyntaxKind.SourceFile) {
                        writeLine();
                        emitStart(node);
                        emitModuleMemberName(node);
                        write(" = ");
                        emitDeclarationName(node);
                        emitEnd(node);
                        write(";");
                    }
                }
            }

            function emitClassLikeDeclarationBelowES6(node: ClassLikeDeclaration) {
                const isES6ExportedClass = isES6ExportedDeclaration(node);
                if (node.kind === SyntaxKind.ClassDeclaration) {
                    if (isES6ExportedClass && !(node.flags & NodeFlags.Default)) {
                        write("export ");
                    }
                    // source file level classes in system modules are hoisted so 'var's for them are already defined
                    if (!shouldHoistDeclarationInSystemJsModule(node)) {
                        write("var ");
                    }
                    emitDeclarationName(node);
                    write(" = ");
                }

                write("(function (");
                const baseTypeNode = getClassExtendsHeritageClauseElement(node);
                if (baseTypeNode) {
                    write("_super");
                }
                write(") {");
                const saveTempFlags = tempFlags;
                const saveTempVariables = tempVariables;
                const saveTempParameters = tempParameters;
                const saveComputedPropertyNamesToGeneratedNames = computedPropertyNamesToGeneratedNames;
                const saveConvertedLoopState = convertedLoopState;

                convertedLoopState = undefined;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;
                computedPropertyNamesToGeneratedNames = undefined;
                increaseIndent();
                if (baseTypeNode) {
                    writeLine();
                    emitStart(baseTypeNode);
                    write("__extends(");
                    emitDeclarationName(node);
                    write(", _super);");
                    emitEnd(baseTypeNode);
                }
                writeLine();
                emitConstructor(node, baseTypeNode);
                emitMemberFunctionsForES5AndLower(node);
                emitPropertyDeclarations(node, getInitializedProperties(node, /*isStatic*/ true));
                writeLine();
                emitDecoratorsOfClass(node, /*decoratedClassAlias*/ undefined);
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.members.end, () => {
                    write("return ");
                    emitDeclarationName(node);
                });
                write(";");
                emitTempDeclarations(/*newLine*/ true);

                Debug.assert(convertedLoopState === undefined);
                convertedLoopState = saveConvertedLoopState;

                tempFlags = saveTempFlags;
                tempVariables = saveTempVariables;
                tempParameters = saveTempParameters;
                computedPropertyNamesToGeneratedNames = saveComputedPropertyNamesToGeneratedNames;
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.members.end);
                emitStart(node);
                write("(");
                if (baseTypeNode) {
                    emit(baseTypeNode.expression);
                }
                write("))");
                if (node.kind === SyntaxKind.ClassDeclaration) {
                    write(";");
                }
                emitEnd(node);

                if (node.kind === SyntaxKind.ClassDeclaration && !isES6ExportedClass) {
                    emitExportMemberAssignment(<ClassDeclaration>node);
                }
                else if (isES6ExportedClass && (node.flags & NodeFlags.Default)) {
                    writeLine();
                    write("export default ");
                    emitDeclarationName(node);
                    write(";");
                }
            }

            function emitClassMemberPrefix(node: ClassLikeDeclaration, member: Node) {
                emitDeclarationName(node);
                if (!(member.flags & NodeFlags.Static)) {
                    write(".prototype");
                }
            }

            function emitDecoratorsOfClass(node: ClassLikeDeclaration, decoratedClassAlias: string) {
                emitDecoratorsOfMembers(node, /*staticFlag*/ 0);
                emitDecoratorsOfMembers(node, NodeFlags.Static);
                emitDecoratorsOfConstructor(node, decoratedClassAlias);
            }

            function emitDecoratorsOfConstructor(node: ClassLikeDeclaration, decoratedClassAlias: string) {
                const decorators = node.decorators;
                const constructor = getFirstConstructorWithBody(node);
                const firstParameterDecorator = constructor && forEach(constructor.parameters, parameter => parameter.decorators);

                // skip decoration of the constructor if neither it nor its parameters are decorated
                if (!decorators && !firstParameterDecorator) {
                    return;
                }

                // Emit the call to __decorate. Given the class:
                //
                //   @dec
                //   class C {
                //   }
                //
                // The emit for the class is:
                //
                //   C = __decorate([dec], C);
                //

                writeLine();
                emitStart(node.decorators || firstParameterDecorator);
                emitDeclarationName(node);
                if (decoratedClassAlias !== undefined) {
                    write(` = ${decoratedClassAlias}`);
                }

                write(" = __decorate([");
                increaseIndent();
                writeLine();

                const decoratorCount = decorators ? decorators.length : 0;
                let argumentsWritten = emitList(decorators, 0, decoratorCount, /*multiLine*/ true, /*trailingComma*/ false, /*leadingComma*/ false, /*noTrailingNewLine*/ true,
                    decorator => emit(decorator.expression));
                if (firstParameterDecorator) {
                    argumentsWritten += emitDecoratorsOfParameters(constructor, /*leadingComma*/ argumentsWritten > 0);
                }
                emitSerializedTypeMetadata(node, /*leadingComma*/ argumentsWritten >= 0);

                decreaseIndent();
                writeLine();
                write("], ");
                emitDeclarationName(node);
                write(")");
                emitEnd(node.decorators || firstParameterDecorator);
                write(";");
                writeLine();
            }

            function emitDecoratorsOfMembers(node: ClassLikeDeclaration, staticFlag: NodeFlags) {
                for (const member of node.members) {
                    // only emit members in the correct group
                    if ((member.flags & NodeFlags.Static) !== staticFlag) {
                        continue;
                    }

                    // skip members that cannot be decorated (such as the constructor)
                    if (!nodeCanBeDecorated(member)) {
                        continue;
                    }

                    // skip an accessor declaration if it is not the first accessor
                    let decorators: NodeArray<Decorator>;
                    let functionLikeMember: FunctionLikeDeclaration;
                    if (isAccessor(member)) {
                        const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
                        if (member !== accessors.firstAccessor) {
                            continue;
                        }

                        // get the decorators from the first accessor with decorators
                        decorators = accessors.firstAccessor.decorators;
                        if (!decorators && accessors.secondAccessor) {
                            decorators = accessors.secondAccessor.decorators;
                        }

                        // we only decorate parameters of the set accessor
                        functionLikeMember = accessors.setAccessor;
                    }
                    else {
                        decorators = member.decorators;

                        // we only decorate the parameters here if this is a method
                        if (member.kind === SyntaxKind.MethodDeclaration) {
                            functionLikeMember = <MethodDeclaration>member;
                        }
                    }
                    const firstParameterDecorator = functionLikeMember && forEach(functionLikeMember.parameters, parameter => parameter.decorators);

                    // skip a member if it or any of its parameters are not decorated
                    if (!decorators && !firstParameterDecorator) {
                        continue;
                    }

                    // Emit the call to __decorate. Given the following:
                    //
                    //   class C {
                    //     @dec method(@dec2 x) {}
                    //     @dec get accessor() {}
                    //     @dec prop;
                    //   }
                    //
                    // The emit for a method is:
                    //
                    //   __decorate([
                    //       dec,
                    //       __param(0, dec2),
                    //       __metadata("design:type", Function),
                    //       __metadata("design:paramtypes", [Object]),
                    //       __metadata("design:returntype", void 0)
                    //   ], C.prototype, "method", undefined);
                    //
                    // The emit for an accessor is:
                    //
                    //   __decorate([
                    //       dec
                    //   ], C.prototype, "accessor", undefined);
                    //
                    // The emit for a property is:
                    //
                    //   __decorate([
                    //       dec
                    //   ], C.prototype, "prop");
                    //

                    writeLine();
                    emitStart(decorators || firstParameterDecorator);
                    write("__decorate([");
                    increaseIndent();
                    writeLine();

                    const decoratorCount = decorators ? decorators.length : 0;
                    let argumentsWritten = emitList(decorators, 0, decoratorCount, /*multiLine*/ true, /*trailingComma*/ false, /*leadingComma*/ false, /*noTrailingNewLine*/ true,
                        decorator => emit(decorator.expression));

                    if (firstParameterDecorator) {
                        argumentsWritten += emitDecoratorsOfParameters(functionLikeMember, argumentsWritten > 0);
                    }
                    emitSerializedTypeMetadata(member, argumentsWritten > 0);

                    decreaseIndent();
                    writeLine();
                    write("], ");
                    emitClassMemberPrefix(node, member);
                    write(", ");
                    emitExpressionForPropertyName(member.name);

                    if (languageVersion > ScriptTarget.ES3) {
                        if (member.kind !== SyntaxKind.PropertyDeclaration) {
                            // We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
                            // We have this extra argument here so that we can inject an explicit property descriptor at a later date.
                            write(", null");
                        }
                        else {
                            // We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
                            // should not invoke `Object.getOwnPropertyDescriptor`.
                            write(", void 0");
                        }
                    }

                    write(")");
                    emitEnd(decorators || firstParameterDecorator);
                    write(";");
                    writeLine();
                }
            }

            function emitDecoratorsOfParameters(node: FunctionLikeDeclaration, leadingComma: boolean): number {
                let argumentsWritten = 0;
                if (node) {
                    let parameterIndex = 0;
                    for (const parameter of node.parameters) {
                        if (nodeIsDecorated(parameter)) {
                            const decorators = parameter.decorators;
                            argumentsWritten += emitList(decorators, 0, decorators.length, /*multiLine*/ true, /*trailingComma*/ false, /*leadingComma*/ leadingComma, /*noTrailingNewLine*/ true, decorator => {
                                write(`__param(${parameterIndex}, `);
                                emit(decorator.expression);
                                write(")");
                            });
                            leadingComma = true;
                        }
                        parameterIndex++;
                    }
                }
                return argumentsWritten;
            }

            function shouldEmitTypeMetadata(node: Declaration): boolean {
                // This method determines whether to emit the "design:type" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
                // compiler option is set.
                switch (node.kind) {
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.PropertyDeclaration:
                        return true;
                }

                return false;
            }

            function shouldEmitReturnTypeMetadata(node: Declaration): boolean {
                // This method determines whether to emit the "design:returntype" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
                // compiler option is set.
                switch (node.kind) {
                    case SyntaxKind.MethodDeclaration:
                        return true;
                }
                return false;
            }

            function shouldEmitParamTypesMetadata(node: Declaration): boolean {
                // This method determines whether to emit the "design:paramtypes" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
                // compiler option is set.
                switch (node.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.SetAccessor:
                        return true;
                }
                return false;
            }

            /** Serializes the type of a declaration to an appropriate JS constructor value. Used by the __metadata decorator for a class member. */
            function emitSerializedTypeOfNode(node: Node) {
                // serialization of the type of a declaration uses the following rules:
                //
                // * The serialized type of a ClassDeclaration is "Function"
                // * The serialized type of a ParameterDeclaration is the serialized type of its type annotation.
                // * The serialized type of a PropertyDeclaration is the serialized type of its type annotation.
                // * The serialized type of an AccessorDeclaration is the serialized type of the return type annotation of its getter or parameter type annotation of its setter.
                // * The serialized type of any other FunctionLikeDeclaration is "Function".
                // * The serialized type of any other node is "void 0".
                //
                // For rules on serializing type annotations, see `serializeTypeNode`.
                switch (node.kind) {
                    case SyntaxKind.ClassDeclaration:
                        write("Function");
                        return;

                    case SyntaxKind.PropertyDeclaration:
                        emitSerializedTypeNode((<PropertyDeclaration>node).type);
                        return;

                    case SyntaxKind.Parameter:
                        emitSerializedTypeNode((<ParameterDeclaration>node).type);
                        return;

                    case SyntaxKind.GetAccessor:
                        emitSerializedTypeNode((<AccessorDeclaration>node).type);
                        return;

                    case SyntaxKind.SetAccessor:
                        emitSerializedTypeNode(getSetAccessorTypeAnnotationNode(<AccessorDeclaration>node));
                        return;

                }

                if (isFunctionLike(node)) {
                    write("Function");
                    return;
                }

                write("void 0");
            }

            function emitSerializedTypeNode(node: TypeNode) {
                if (node) {
                    switch (node.kind) {
                        case SyntaxKind.VoidKeyword:
                            write("void 0");
                            return;

                        case SyntaxKind.ParenthesizedType:
                            emitSerializedTypeNode((<ParenthesizedTypeNode>node).type);
                            return;

                        case SyntaxKind.FunctionType:
                        case SyntaxKind.ConstructorType:
                            write("Function");
                            return;

                        case SyntaxKind.ArrayType:
                        case SyntaxKind.TupleType:
                            write("Array");
                            return;

                        case SyntaxKind.TypePredicate:
                        case SyntaxKind.BooleanKeyword:
                            write("Boolean");
                            return;

                        case SyntaxKind.StringKeyword:
                        case SyntaxKind.StringLiteralType:
                            write("String");
                            return;

                        case SyntaxKind.NumberKeyword:
                            write("Number");
                            return;

                        case SyntaxKind.SymbolKeyword:
                            write("Symbol");
                            return;

                        case SyntaxKind.TypeReference:
                            emitSerializedTypeReferenceNode(<TypeReferenceNode>node);
                            return;

                        case SyntaxKind.TypeQuery:
                        case SyntaxKind.TypeLiteral:
                        case SyntaxKind.UnionType:
                        case SyntaxKind.IntersectionType:
                        case SyntaxKind.AnyKeyword:
                        case SyntaxKind.ThisType:
                            break;

                        default:
                            Debug.fail("Cannot serialize unexpected type node.");
                            break;
                    }
                }
                write("Object");
            }

            /** Serializes a TypeReferenceNode to an appropriate JS constructor value. Used by the __metadata decorator. */
            function emitSerializedTypeReferenceNode(node: TypeReferenceNode) {
                let location: Node = node.parent;
                while (isDeclaration(location) || isTypeNode(location)) {
                    location = location.parent;
                }

                // Clone the type name and parent it to a location outside of the current declaration.
                const typeName = cloneEntityName(node.typeName, location);
                const result = resolver.getTypeReferenceSerializationKind(typeName);
                switch (result) {
                    case TypeReferenceSerializationKind.Unknown:
                        let temp = createAndRecordTempVariable(TempFlags.Auto);
                        write("(typeof (");
                        emitNodeWithoutSourceMap(temp);
                        write(" = ");
                        emitEntityNameAsExpression(typeName, /*useFallback*/ true);
                        write(") === 'function' && ");
                        emitNodeWithoutSourceMap(temp);
                        write(") || Object");
                        break;

                    case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                        emitEntityNameAsExpression(typeName, /*useFallback*/ false);
                        break;

                    case TypeReferenceSerializationKind.VoidType:
                        write("void 0");
                        break;

                    case TypeReferenceSerializationKind.BooleanType:
                        write("Boolean");
                        break;

                    case TypeReferenceSerializationKind.NumberLikeType:
                        write("Number");
                        break;

                    case TypeReferenceSerializationKind.StringLikeType:
                        write("String");
                        break;

                    case TypeReferenceSerializationKind.ArrayLikeType:
                        write("Array");
                        break;

                    case TypeReferenceSerializationKind.ESSymbolType:
                        if (languageVersion < ScriptTarget.ES6) {
                            write("typeof Symbol === 'function' ? Symbol : Object");
                        }
                        else {
                            write("Symbol");
                        }
                        break;

                    case TypeReferenceSerializationKind.TypeWithCallSignature:
                        write("Function");
                        break;

                    case TypeReferenceSerializationKind.ObjectType:
                        write("Object");
                        break;
                }
            }

            /** Serializes the parameter types of a function or the constructor of a class. Used by the __metadata decorator for a method or set accessor. */
            function emitSerializedParameterTypesOfNode(node: Node) {
                // serialization of parameter types uses the following rules:
                //
                // * If the declaration is a class, the parameters of the first constructor with a body are used.
                // * If the declaration is function-like and has a body, the parameters of the function are used.
                //
                // For the rules on serializing the type of each parameter declaration, see `serializeTypeOfDeclaration`.
                if (node) {
                    let valueDeclaration: FunctionLikeDeclaration;
                    if (node.kind === SyntaxKind.ClassDeclaration) {
                        valueDeclaration = getFirstConstructorWithBody(<ClassDeclaration>node);
                    }
                    else if (isFunctionLike(node) && nodeIsPresent((<FunctionLikeDeclaration>node).body)) {
                        valueDeclaration = <FunctionLikeDeclaration>node;
                    }

                    if (valueDeclaration) {
                        const parameters = valueDeclaration.parameters;
                        const parameterCount = parameters.length;
                        if (parameterCount > 0) {
                            for (let i = 0; i < parameterCount; i++) {
                                if (i > 0) {
                                    write(", ");
                                }

                                if (parameters[i].dotDotDotToken) {
                                    let parameterType = parameters[i].type;
                                    if (parameterType && parameterType.kind === SyntaxKind.ArrayType) {
                                        parameterType = (<ArrayTypeNode>parameterType).elementType;
                                    }
                                    else if (parameterType && parameterType.kind === SyntaxKind.TypeReference && (<TypeReferenceNode>parameterType).typeArguments && (<TypeReferenceNode>parameterType).typeArguments.length === 1) {
                                        parameterType = (<TypeReferenceNode>parameterType).typeArguments[0];
                                    }
                                    else {
                                        parameterType = undefined;
                                    }

                                    emitSerializedTypeNode(parameterType);
                                }
                                else {
                                    emitSerializedTypeOfNode(parameters[i]);
                                }
                            }
                        }
                    }
                }
            }

            /** Serializes the return type of function. Used by the __metadata decorator for a method. */
            function emitSerializedReturnTypeOfNode(node: Node) {
                if (node && isFunctionLike(node)) {
                    if ((<FunctionLikeDeclaration>node).type) {
                        emitSerializedTypeNode((<FunctionLikeDeclaration>node).type);
                        return;
                    }
                    else if (isAsyncFunctionLike(<FunctionLikeDeclaration>node)) {
                        write("Promise");
                        return;
                    }
                }

                write("void 0");
            }


            function emitSerializedTypeMetadata(node: Declaration, writeComma: boolean): number {
                // This method emits the serialized type metadata for a decorator target.
                // The caller should have already tested whether the node has decorators.
                let argumentsWritten = 0;
                if (compilerOptions.emitDecoratorMetadata) {
                    if (shouldEmitTypeMetadata(node)) {
                        if (writeComma) {
                            write(", ");
                        }
                        writeLine();
                        write("__metadata('design:type', ");
                        emitSerializedTypeOfNode(node);
                        write(")");
                        argumentsWritten++;
                    }
                    if (shouldEmitParamTypesMetadata(node)) {
                        if (writeComma || argumentsWritten) {
                            write(", ");
                        }
                        writeLine();
                        write("__metadata('design:paramtypes', [");
                        emitSerializedParameterTypesOfNode(node);
                        write("])");
                        argumentsWritten++;
                    }
                    if (shouldEmitReturnTypeMetadata(node)) {
                        if (writeComma || argumentsWritten) {
                            write(", ");
                        }

                        writeLine();
                        write("__metadata('design:returntype', ");
                        emitSerializedReturnTypeOfNode(node);
                        write(")");
                        argumentsWritten++;
                    }
                }

                return argumentsWritten;
            }

            function emitInterfaceDeclaration(node: InterfaceDeclaration) {
                emitCommentsOnNotEmittedNode(node);
            }

            function shouldEmitEnumDeclaration(node: EnumDeclaration) {
                const isConstEnum = isConst(node);
                return !isConstEnum || compilerOptions.preserveConstEnums || compilerOptions.isolatedModules;
            }

            function emitEnumDeclaration(node: EnumDeclaration) {
                // const enums are completely erased during compilation.
                if (!shouldEmitEnumDeclaration(node)) {
                    return;
                }

                if (!shouldHoistDeclarationInSystemJsModule(node)) {
                    // do not emit var if variable was already hoisted

                    const isES6ExportedEnum = isES6ExportedDeclaration(node);
                    if (!(node.flags & NodeFlags.Export) || (isES6ExportedEnum && isFirstDeclarationOfKind(node, node.symbol && node.symbol.declarations, SyntaxKind.EnumDeclaration))) {
                        emitStart(node);
                        if (isES6ExportedEnum) {
                            write("export ");
                        }
                        write("var ");
                        emit(node.name);
                        emitEnd(node);
                        write(";");
                    }
                }
                writeLine();
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(getGeneratedNameForNode(node));
                emitEnd(node.name);
                write(") {");
                increaseIndent();
                emitLines(node.members);
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.members.end);
                write(")(");
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (!isES6ExportedDeclaration(node) && node.flags & NodeFlags.Export && !shouldHoistDeclarationInSystemJsModule(node)) {
                    // do not emit var if variable was already hoisted
                    writeLine();
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    write(" = ");
                    emitModuleMemberName(node);
                    emitEnd(node);
                    write(";");
                }
                if (modulekind !== ModuleKind.ES6 && node.parent === currentSourceFile) {
                    if (modulekind === ModuleKind.System && (node.flags & NodeFlags.Export)) {
                        // write the call to exporter for enum
                        writeLine();
                        write(`${exportFunctionForFile}("`);
                        emitDeclarationName(node);
                        write(`", `);
                        emitDeclarationName(node);
                        write(");");
                    }
                    emitExportMemberAssignments(node.name);
                }
            }

            function emitEnumMember(node: EnumMember) {
                const enumParent = <EnumDeclaration>node.parent;
                emitStart(node);
                write(getGeneratedNameForNode(enumParent));
                write("[");
                write(getGeneratedNameForNode(enumParent));
                write("[");
                emitExpressionForPropertyName(node.name);
                write("] = ");
                writeEnumMemberDeclarationValue(node);
                write("] = ");
                emitExpressionForPropertyName(node.name);
                emitEnd(node);
                write(";");
            }

            function writeEnumMemberDeclarationValue(member: EnumMember) {
                const value = resolver.getConstantValue(member);
                if (value !== undefined) {
                    write(value.toString());
                    return;
                }
                else if (member.initializer) {
                    emit(member.initializer);
                }
                else {
                    write("undefined");
                }
            }

            function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration: ModuleDeclaration): ModuleDeclaration {
                if (moduleDeclaration.body && moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                    const recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(<ModuleDeclaration>moduleDeclaration.body);
                    return recursiveInnerModule || <ModuleDeclaration>moduleDeclaration.body;
                }
            }

            function shouldEmitModuleDeclaration(node: ModuleDeclaration) {
                return isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
            }

            function isModuleMergedWithES6Class(node: ModuleDeclaration) {
                return languageVersion === ScriptTarget.ES6 && !!(resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalModuleMergesWithClass);
            }

            function isFirstDeclarationOfKind(node: Declaration, declarations: Declaration[], kind: SyntaxKind) {
                return !forEach(declarations, declaration => declaration.kind === kind && declaration.pos < node.pos);
            }

            function emitModuleDeclaration(node: ModuleDeclaration) {
                // Emit only if this module is non-ambient.
                const shouldEmit = shouldEmitModuleDeclaration(node);

                if (!shouldEmit) {
                    return emitCommentsOnNotEmittedNode(node);
                }
                const hoistedInDeclarationScope = shouldHoistDeclarationInSystemJsModule(node);
                const emitVarForModule = !hoistedInDeclarationScope && !isModuleMergedWithES6Class(node);

                if (emitVarForModule) {
                    const isES6ExportedNamespace = isES6ExportedDeclaration(node);
                    if (!isES6ExportedNamespace || isFirstDeclarationOfKind(node, node.symbol && node.symbol.declarations, SyntaxKind.ModuleDeclaration)) {
                        emitStart(node);
                        if (isES6ExportedNamespace) {
                            write("export ");
                        }
                        write("var ");
                        emit(node.name);
                        write(";");
                        emitEnd(node);
                        writeLine();
                    }
                }

                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(getGeneratedNameForNode(node));
                emitEnd(node.name);
                write(") ");
                Debug.assert(node.body !== undefined); // node.body must exist, as this is a non-ambient module
                if (node.body.kind === SyntaxKind.ModuleBlock) {
                    const saveConvertedLoopState = convertedLoopState;
                    const saveTempFlags = tempFlags;
                    const saveTempVariables = tempVariables;
                    convertedLoopState = undefined;
                    tempFlags = 0;
                    tempVariables = undefined;

                    emit(node.body);

                    Debug.assert(convertedLoopState === undefined);
                    convertedLoopState = saveConvertedLoopState;

                    tempFlags = saveTempFlags;
                    tempVariables = saveTempVariables;
                }
                else {
                    write("{");
                    increaseIndent();
                    emitCaptureThisForNodeIfNecessary(node);
                    writeLine();
                    emit(node.body);
                    decreaseIndent();
                    writeLine();
                    const moduleBlock = <ModuleBlock>getInnerMostModuleDeclarationFromDottedModule(node).body;
                    emitToken(SyntaxKind.CloseBraceToken, moduleBlock.statements.end);
                }
                write(")(");
                // write moduleDecl = containingModule.m only if it is not exported es6 module member
                if ((node.flags & NodeFlags.Export) && !isES6ExportedDeclaration(node)) {
                    emit(node.name);
                    write(" = ");
                }
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (!isES6ExportedDeclaration(node) && node.name.kind === SyntaxKind.Identifier && node.parent === currentSourceFile) {
                    if (modulekind === ModuleKind.System && (node.flags & NodeFlags.Export)) {
                        writeLine();
                        write(`${exportFunctionForFile}("`);
                        emitDeclarationName(node);
                        write(`", `);
                        emitDeclarationName(node);
                        write(");");
                    }
                    emitExportMemberAssignments(<Identifier>node.name);
                }
            }

            /*
             * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
             * Here we check if alternative name was provided for a given moduleName and return it if possible.
             */
            function tryRenameExternalModule(moduleName: LiteralExpression): string {
                if (renamedDependencies && hasProperty(renamedDependencies, moduleName.text)) {
                    return `"${renamedDependencies[moduleName.text]}"`;
                }
                return undefined;
            }

            function emitRequire(moduleName: Expression) {
                if (moduleName.kind === SyntaxKind.StringLiteral) {
                    write("require(");
                    const text = tryRenameExternalModule(<LiteralExpression>moduleName);
                    if (text) {
                        write(text);
                    }
                    else {
                        emitStart(moduleName);
                        emitLiteral(<LiteralExpression>moduleName);
                        emitEnd(moduleName);
                    }
                    emitToken(SyntaxKind.CloseParenToken, moduleName.end);
                }
                else {
                    write("require()");
                }
            }

            function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
                if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
                    return <ImportEqualsDeclaration>node;
                }
                const importClause = (<ImportDeclaration>node).importClause;
                if (importClause && importClause.namedBindings && importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                    return <NamespaceImport>importClause.namedBindings;
                }
            }

            function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
                return node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).importClause && !!(<ImportDeclaration>node).importClause.name;
            }

            function emitExportImportAssignments(node: Node) {
                if (isAliasSymbolDeclaration(node) && resolver.isValueAliasDeclaration(node)) {
                    emitExportMemberAssignments(<Identifier>(<Declaration>node).name);
                }
                forEachChild(node, emitExportImportAssignments);
            }

            function emitImportDeclaration(node: ImportDeclaration) {
                if (modulekind !== ModuleKind.ES6) {
                    return emitExternalImportDeclaration(node);
                }

                // ES6 import
                if (node.importClause) {
                    const shouldEmitDefaultBindings = resolver.isReferencedAliasDeclaration(node.importClause);
                    const shouldEmitNamedBindings = node.importClause.namedBindings && resolver.isReferencedAliasDeclaration(node.importClause.namedBindings, /* checkChildren */ true);
                    if (shouldEmitDefaultBindings || shouldEmitNamedBindings) {
                        write("import ");
                        emitStart(node.importClause);
                        if (shouldEmitDefaultBindings) {
                            emit(node.importClause.name);
                            if (shouldEmitNamedBindings) {
                                write(", ");
                            }
                        }
                        if (shouldEmitNamedBindings) {
                            emitLeadingComments(node.importClause.namedBindings);
                            emitStart(node.importClause.namedBindings);
                            if (node.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                                write("* as ");
                                emit((<NamespaceImport>node.importClause.namedBindings).name);
                            }
                            else {
                                write("{ ");
                                emitExportOrImportSpecifierList((<NamedImports>node.importClause.namedBindings).elements, resolver.isReferencedAliasDeclaration);
                                write(" }");
                            }
                            emitEnd(node.importClause.namedBindings);
                            emitTrailingComments(node.importClause.namedBindings);
                        }

                        emitEnd(node.importClause);
                        write(" from ");
                        emit(node.moduleSpecifier);
                        write(";");
                    }
                }
                else {
                    write("import ");
                    emit(node.moduleSpecifier);
                    write(";");
                }
            }

            function emitExternalImportDeclaration(node: ImportDeclaration | ImportEqualsDeclaration) {
                if (contains(externalImports, node)) {
                    const isExportedImport = node.kind === SyntaxKind.ImportEqualsDeclaration && (node.flags & NodeFlags.Export) !== 0;
                    const namespaceDeclaration = getNamespaceDeclarationNode(node);
                    const varOrConst = (languageVersion <= ScriptTarget.ES5) ? "var " : "const ";

                    if (modulekind !== ModuleKind.AMD) {
                        emitLeadingComments(node);
                        emitStart(node);
                        if (namespaceDeclaration && !isDefaultImport(node)) {
                            // import x = require("foo")
                            // import * as x from "foo"
                            if (!isExportedImport) {
                                write(varOrConst);
                            };
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                        }
                        else {
                            // import "foo"
                            // import x from "foo"
                            // import { x, y } from "foo"
                            // import d, * as x from "foo"
                            // import d, { x, y } from "foo"
                            const isNakedImport = SyntaxKind.ImportDeclaration && !(<ImportDeclaration>node).importClause;
                            if (!isNakedImport) {
                                write(varOrConst);
                                write(getGeneratedNameForNode(<ImportDeclaration>node));
                                write(" = ");
                            }
                        }
                        emitRequire(getExternalModuleName(node));
                        if (namespaceDeclaration && isDefaultImport(node)) {
                            // import d, * as x from "foo"
                            write(", ");
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                            write(getGeneratedNameForNode(<ImportDeclaration>node));
                        }
                        write(";");
                        emitEnd(node);
                        emitExportImportAssignments(node);
                        emitTrailingComments(node);
                    }
                    else {
                        if (isExportedImport) {
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                            emit(namespaceDeclaration.name);
                            write(";");
                        }
                        else if (namespaceDeclaration && isDefaultImport(node)) {
                            // import d, * as x from "foo"
                            write(varOrConst);
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                            write(getGeneratedNameForNode(<ImportDeclaration>node));
                            write(";");
                        }
                        emitExportImportAssignments(node);
                    }
                }
            }

            function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
                if (isExternalModuleImportEqualsDeclaration(node)) {
                    emitExternalImportDeclaration(node);
                    return;
                }
                // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
                // - current file is not external module
                // - import declaration is top level and target is value imported by entity name
                if (resolver.isReferencedAliasDeclaration(node) ||
                    (!isCurrentFileExternalModule && resolver.isTopLevelValueImportEqualsWithEntityName(node))) {
                    emitLeadingComments(node);
                    emitStart(node);

                    // variable declaration for import-equals declaration can be hoisted in system modules
                    // in this case 'var' should be omitted and emit should contain only initialization
                    const variableDeclarationIsHoisted = shouldHoistVariable(node, /*checkIfSourceFileLevelDecl*/ true);

                    // is it top level export import v = a.b.c in system module?
                    // if yes - it needs to be rewritten as exporter('v', v = a.b.c)
                    const isExported = isSourceFileLevelDeclarationInSystemJsModule(node, /*isExported*/ true);

                    if (!variableDeclarationIsHoisted) {
                        Debug.assert(!isExported);

                        if (isES6ExportedDeclaration(node)) {
                            write("export ");
                            write("var ");
                        }
                        else if (!(node.flags & NodeFlags.Export)) {
                            write("var ");
                        }
                    }


                    if (isExported) {
                        write(`${exportFunctionForFile}("`);
                        emitNodeWithoutSourceMap(node.name);
                        write(`", `);
                    }

                    emitModuleMemberName(node);
                    write(" = ");
                    emit(node.moduleReference);

                    if (isExported) {
                        write(")");
                    }

                    write(";");
                    emitEnd(node);
                    emitExportImportAssignments(node);
                    emitTrailingComments(node);
                }
            }

            function emitExportDeclaration(node: ExportDeclaration) {
                Debug.assert(modulekind !== ModuleKind.System);

                if (modulekind !== ModuleKind.ES6) {
                    if (node.moduleSpecifier && (!node.exportClause || resolver.isValueAliasDeclaration(node))) {
                        emitStart(node);
                        const generatedName = getGeneratedNameForNode(node);
                        if (node.exportClause) {
                            // export { x, y, ... } from "foo"
                            if (modulekind !== ModuleKind.AMD) {
                                write("var ");
                                write(generatedName);
                                write(" = ");
                                emitRequire(getExternalModuleName(node));
                                write(";");
                            }
                            for (const specifier of node.exportClause.elements) {
                                if (resolver.isValueAliasDeclaration(specifier)) {
                                    writeLine();
                                    emitStart(specifier);
                                    emitContainingModuleName(specifier);
                                    write(".");
                                    emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
                                    write(" = ");
                                    write(generatedName);
                                    write(".");
                                    emitNodeWithCommentsAndWithoutSourcemap(specifier.propertyName || specifier.name);
                                    write(";");
                                    emitEnd(specifier);
                                }
                            }
                        }
                        else {
                            // export * from "foo"
                            if (hasExportStarsToExportValues && resolver.moduleExportsSomeValue(node.moduleSpecifier)) {
                                writeLine();
                                write("__export(");
                                if (modulekind !== ModuleKind.AMD) {
                                    emitRequire(getExternalModuleName(node));
                                }
                                else {
                                    write(generatedName);
                                }
                                write(");");
                            }
                        }
                        emitEnd(node);
                    }
                }
                else {
                    if (!node.exportClause || resolver.isValueAliasDeclaration(node)) {
                        write("export ");
                        if (node.exportClause) {
                            // export { x, y, ... }
                            write("{ ");
                            emitExportOrImportSpecifierList(node.exportClause.elements, resolver.isValueAliasDeclaration);
                            write(" }");
                        }
                        else {
                            write("*");
                        }
                        if (node.moduleSpecifier) {
                            write(" from ");
                            emit(node.moduleSpecifier);
                        }
                        write(";");
                    }
                }
            }

            function emitExportOrImportSpecifierList(specifiers: ImportOrExportSpecifier[], shouldEmit: (node: Node) => boolean) {
                Debug.assert(modulekind === ModuleKind.ES6);

                let needsComma = false;
                for (const specifier of specifiers) {
                    if (shouldEmit(specifier)) {
                        if (needsComma) {
                            write(", ");
                        }
                        if (specifier.propertyName) {
                            emit(specifier.propertyName);
                            write(" as ");
                        }
                        emit(specifier.name);
                        needsComma = true;
                    }
                }
            }

            function emitExportAssignment(node: ExportAssignment) {
                if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
                    if (modulekind === ModuleKind.ES6) {
                        writeLine();
                        emitStart(node);
                        write("export default ");
                        const expression = node.expression;
                        emit(expression);
                        if (expression.kind !== SyntaxKind.FunctionDeclaration &&
                            expression.kind !== SyntaxKind.ClassDeclaration) {
                            write(";");
                        }
                        emitEnd(node);
                    }
                    else {
                        writeLine();
                        emitStart(node);
                        if (modulekind === ModuleKind.System) {
                            write(`${exportFunctionForFile}("default",`);
                            emit(node.expression);
                            write(")");
                        }
                        else {
                            emitEs6ExportDefaultCompat(node);
                            emitContainingModuleName(node);
                            if (languageVersion === ScriptTarget.ES3) {
                                write('["default"] = ');
                            }
                            else {
                                write(".default = ");
                            }
                            emit(node.expression);
                        }
                        write(";");
                        emitEnd(node);
                    }
                }
            }

            function collectExternalModuleInfo(sourceFile: SourceFile) {
                externalImports = [];
                exportSpecifiers = {};
                exportEquals = undefined;
                hasExportStarsToExportValues = false;
                for (const node of sourceFile.statements) {
                    switch (node.kind) {
                        case SyntaxKind.ImportDeclaration:
                            if (!(<ImportDeclaration>node).importClause ||
                                resolver.isReferencedAliasDeclaration((<ImportDeclaration>node).importClause, /*checkChildren*/ true)) {
                                // import "mod"
                                // import x from "mod" where x is referenced
                                // import * as x from "mod" where x is referenced
                                // import { x, y } from "mod" where at least one import is referenced
                                externalImports.push(<ImportDeclaration>node);
                            }
                            break;
                        case SyntaxKind.ImportEqualsDeclaration:
                            if ((<ImportEqualsDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference && resolver.isReferencedAliasDeclaration(node)) {
                                // import x = require("mod") where x is referenced
                                externalImports.push(<ImportEqualsDeclaration>node);
                            }
                            break;
                        case SyntaxKind.ExportDeclaration:
                            if ((<ExportDeclaration>node).moduleSpecifier) {
                                if (!(<ExportDeclaration>node).exportClause) {
                                    // export * from "mod"
                                    if (resolver.moduleExportsSomeValue((<ExportDeclaration>node).moduleSpecifier)) {
                                        externalImports.push(<ExportDeclaration>node);
                                        hasExportStarsToExportValues = true;
                                    }
                                }
                                else if (resolver.isValueAliasDeclaration(node)) {
                                    // export { x, y } from "mod" where at least one export is a value symbol
                                    externalImports.push(<ExportDeclaration>node);
                                }
                            }
                            else {
                                // export { x, y }
                                for (const specifier of (<ExportDeclaration>node).exportClause.elements) {
                                    const name = (specifier.propertyName || specifier.name).text;
                                    (exportSpecifiers[name] || (exportSpecifiers[name] = [])).push(specifier);
                                }
                            }
                            break;
                        case SyntaxKind.ExportAssignment:
                            if ((<ExportAssignment>node).isExportEquals && !exportEquals) {
                                // export = x
                                exportEquals = <ExportAssignment>node;
                            }
                            break;
                    }
                }
            }

            function emitExportStarHelper() {
                if (hasExportStarsToExportValues) {
                    writeLine();
                    write("function __export(m) {");
                    increaseIndent();
                    writeLine();
                    write("for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];");
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }

            function getLocalNameForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration): string {
                const namespaceDeclaration = getNamespaceDeclarationNode(node);
                if (namespaceDeclaration && !isDefaultImport(node)) {
                    return getTextOfNodeFromSourceText(currentText, namespaceDeclaration.name);
                }
                if (node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).importClause) {
                    return getGeneratedNameForNode(node);
                }
                if (node.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>node).moduleSpecifier) {
                    return getGeneratedNameForNode(node);
                }
            }

            function getExternalModuleNameText(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, emitRelativePathAsModuleName: boolean): string {
                if (emitRelativePathAsModuleName) {
                    const name = getExternalModuleNameFromDeclaration(host, resolver, importNode);
                    if (name) {
                        return `"${name}"`;
                    }
                }
                const moduleName = getExternalModuleName(importNode);
                if (moduleName.kind === SyntaxKind.StringLiteral) {
                    return tryRenameExternalModule(<LiteralExpression>moduleName) || getLiteralText(<LiteralExpression>moduleName);
                }

                return undefined;
            }

            function emitVariableDeclarationsForImports(): void {
                if (externalImports.length === 0) {
                    return;
                }

                writeLine();
                let started = false;
                for (const importNode of externalImports) {
                    // do not create variable declaration for exports and imports that lack import clause
                    const skipNode =
                        importNode.kind === SyntaxKind.ExportDeclaration ||
                        (importNode.kind === SyntaxKind.ImportDeclaration && !(<ImportDeclaration>importNode).importClause);

                    if (skipNode) {
                        continue;
                    }

                    if (!started) {
                        write("var ");
                        started = true;
                    }
                    else {
                        write(", ");
                    }

                    write(getLocalNameForExternalImport(importNode));
                }

                if (started) {
                    write(";");
                }
            }

            function emitLocalStorageForExportedNamesIfNecessary(exportedDeclarations: (Identifier | Declaration)[]): string {
                // when resolving exports local exported entries/indirect exported entries in the module
                // should always win over entries with similar names that were added via star exports
                // to support this we store names of local/indirect exported entries in a set.
                // this set is used to filter names brought by star exports.
                if (!hasExportStarsToExportValues) {
                    // local names set is needed only in presence of star exports
                    return undefined;
                }

                // local names set should only be added if we have anything exported
                if (!exportedDeclarations && isEmpty(exportSpecifiers)) {
                    // no exported declarations (export var ...) or export specifiers (export {x})
                    // check if we have any non star export declarations.
                    let hasExportDeclarationWithExportClause = false;
                    for (const externalImport of externalImports) {
                        if (externalImport.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>externalImport).exportClause) {
                            hasExportDeclarationWithExportClause = true;
                            break;
                        }
                    }

                    if (!hasExportDeclarationWithExportClause) {
                        // we still need to emit exportStar helper
                        return emitExportStarFunction(/*localNames*/ undefined);
                    }
                }

                const exportedNamesStorageRef = makeUniqueName("exportedNames");

                writeLine();
                write(`var ${exportedNamesStorageRef} = {`);
                increaseIndent();

                let started = false;
                if (exportedDeclarations) {
                    for (let i = 0; i < exportedDeclarations.length; i++) {
                        // write name of exported declaration, i.e 'export var x...'
                        writeExportedName(exportedDeclarations[i]);
                    }
                }

                if (exportSpecifiers) {
                    for (const n in exportSpecifiers) {
                        for (const specifier of exportSpecifiers[n]) {
                            // write name of export specified, i.e. 'export {x}'
                            writeExportedName(specifier.name);
                        }
                    }
                }

                for (const externalImport of externalImports) {
                    if (externalImport.kind !== SyntaxKind.ExportDeclaration) {
                        continue;
                    }

                    const exportDecl = <ExportDeclaration>externalImport;
                    if (!exportDecl.exportClause) {
                        // export * from ...
                        continue;
                    }

                    for (const element of exportDecl.exportClause.elements) {
                        // write name of indirectly exported entry, i.e. 'export {x} from ...'
                        writeExportedName(element.name || element.propertyName);
                    }
                }

                decreaseIndent();
                writeLine();
                write("};");

                return emitExportStarFunction(exportedNamesStorageRef);

                function emitExportStarFunction(localNames: string): string {
                    const exportStarFunction = makeUniqueName("exportStar");

                    writeLine();

                    // define an export star helper function
                    write(`function ${exportStarFunction}(m) {`);
                    increaseIndent();
                    writeLine();
                    write(`var exports = {};`);
                    writeLine();
                    write(`for(var n in m) {`);
                    increaseIndent();
                    writeLine();
                    write(`if (n !== "default"`);
                    if (localNames) {
                        write(`&& !${localNames}.hasOwnProperty(n)`);
                    }
                    write(`) exports[n] = m[n];`);
                    decreaseIndent();
                    writeLine();
                    write("}");
                    writeLine();
                    write(`${exportFunctionForFile}(exports);`);
                    decreaseIndent();
                    writeLine();
                    write("}");

                    return exportStarFunction;
                }

                function writeExportedName(node: Identifier | Declaration): void {
                    // do not record default exports
                    // they are local to module and never overwritten (explicitly skipped) by star export
                    if (node.kind !== SyntaxKind.Identifier && node.flags & NodeFlags.Default) {
                        return;
                    }

                    if (started) {
                        write(",");
                    }
                    else {
                        started = true;
                    }

                    writeLine();
                    write("'");
                    if (node.kind === SyntaxKind.Identifier) {
                        emitNodeWithCommentsAndWithoutSourcemap(node);
                    }
                    else {
                        emitDeclarationName(<Declaration>node);
                    }

                    write("': true");
                }
            }

            function processTopLevelVariableAndFunctionDeclarations(node: SourceFile): (Identifier | Declaration)[] {
                // per ES6 spec:
                // 15.2.1.16.4 ModuleDeclarationInstantiation() Concrete Method
                // - var declarations are initialized to undefined - 14.a.ii
                // - function/generator declarations are instantiated - 16.a.iv
                // this means that after module is instantiated but before its evaluation
                // exported functions are already accessible at import sites
                // in theory we should hoist only exported functions and its dependencies
                // in practice to simplify things we'll hoist all source level functions and variable declaration
                // including variables declarations for module and class declarations
                let hoistedVars: (Identifier | ClassDeclaration | ModuleDeclaration | EnumDeclaration)[];
                let hoistedFunctionDeclarations: FunctionDeclaration[];
                let exportedDeclarations: (Identifier | Declaration)[];

                visit(node);

                if (hoistedVars) {
                    writeLine();
                    write("var ");
                    const seen: Map<string> = {};
                    for (let i = 0; i < hoistedVars.length; i++) {
                        const local = hoistedVars[i];
                        const name = local.kind === SyntaxKind.Identifier
                            ? <Identifier>local
                            : <Identifier>(<ClassDeclaration | ModuleDeclaration | EnumDeclaration>local).name;

                        if (name) {
                            // do not emit duplicate entries (in case of declaration merging) in the list of hoisted variables
                            const text = unescapeIdentifier(name.text);
                            if (hasProperty(seen, text)) {
                                continue;
                            }
                            else {
                                seen[text] = text;
                            }
                        }

                        if (i !== 0) {
                            write(", ");
                        }

                        if (local.kind === SyntaxKind.ClassDeclaration || local.kind === SyntaxKind.ModuleDeclaration || local.kind === SyntaxKind.EnumDeclaration) {
                            emitDeclarationName(<ClassDeclaration | ModuleDeclaration | EnumDeclaration>local);
                        }
                        else {
                            emit(local);
                        }

                        const flags = getCombinedNodeFlags(local.kind === SyntaxKind.Identifier ? local.parent : local);
                        if (flags & NodeFlags.Export) {
                            if (!exportedDeclarations) {
                                exportedDeclarations = [];
                            }
                            exportedDeclarations.push(local);
                        }
                    }
                    write(";");
                }

                if (hoistedFunctionDeclarations) {
                    for (const f of hoistedFunctionDeclarations) {
                        writeLine();
                        emit(f);

                        if (f.flags & NodeFlags.Export) {
                            if (!exportedDeclarations) {
                                exportedDeclarations = [];
                            }
                            exportedDeclarations.push(f);
                        }
                    }
                }

                return exportedDeclarations;

                function visit(node: Node): void {
                    if (node.flags & NodeFlags.Ambient) {
                        return;
                    }

                    if (node.kind === SyntaxKind.FunctionDeclaration) {
                        if (!hoistedFunctionDeclarations) {
                            hoistedFunctionDeclarations = [];
                        }

                        hoistedFunctionDeclarations.push(<FunctionDeclaration>node);
                        return;
                    }

                    if (node.kind === SyntaxKind.ClassDeclaration) {
                        if (!hoistedVars) {
                            hoistedVars = [];
                        }

                        hoistedVars.push(<ClassDeclaration>node);
                        return;
                    }

                    if (node.kind === SyntaxKind.EnumDeclaration) {
                        if (shouldEmitEnumDeclaration(<EnumDeclaration>node)) {
                            if (!hoistedVars) {
                                hoistedVars = [];
                            }

                            hoistedVars.push(<ModuleDeclaration>node);
                        }

                        return;
                    }

                    if (node.kind === SyntaxKind.ModuleDeclaration) {
                        if (shouldEmitModuleDeclaration(<ModuleDeclaration>node)) {
                            if (!hoistedVars) {
                                hoistedVars = [];
                            }

                            hoistedVars.push(<ModuleDeclaration>node);
                        }
                        return;
                    }

                    if (node.kind === SyntaxKind.VariableDeclaration || node.kind === SyntaxKind.BindingElement) {
                        if (shouldHoistVariable(<VariableDeclaration | BindingElement>node, /*checkIfSourceFileLevelDecl*/ false)) {
                            const name = (<VariableDeclaration | BindingElement>node).name;
                            if (name.kind === SyntaxKind.Identifier) {
                                if (!hoistedVars) {
                                    hoistedVars = [];
                                }

                                hoistedVars.push(<Identifier>name);
                            }
                            else {
                                forEachChild(name, visit);
                            }
                        }
                        return;
                    }

                    if (isInternalModuleImportEqualsDeclaration(node) && resolver.isValueAliasDeclaration(node)) {
                        if (!hoistedVars) {
                            hoistedVars = [];
                        }

                        hoistedVars.push(node.name);
                        return;
                    }

                    if (isBindingPattern(node)) {
                        forEach((<BindingPattern>node).elements, visit);
                        return;
                    }

                    if (!isDeclaration(node)) {
                        forEachChild(node, visit);
                    }
                }
            }

            function shouldHoistVariable(node: VariableDeclaration | VariableDeclarationList | BindingElement, checkIfSourceFileLevelDecl: boolean): boolean {
                if (checkIfSourceFileLevelDecl && !shouldHoistDeclarationInSystemJsModule(node)) {
                    return false;
                }
                // hoist variable if
                // - it is not block scoped
                // - it is top level block scoped
                // if block scoped variables are nested in some another block then
                // no other functions can use them except ones that are defined at least in the same block
                return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === 0 ||
                    getEnclosingBlockScopeContainer(node).kind === SyntaxKind.SourceFile;
            }

            function isCurrentFileSystemExternalModule() {
                return modulekind === ModuleKind.System && isCurrentFileExternalModule;
            }

            function emitSystemModuleBody(node: SourceFile, dependencyGroups: DependencyGroup[], startIndex: number): void {
                // shape of the body in system modules:
                // function (exports) {
                //     <list of local aliases for imports>
                //     <hoisted function declarations>
                //     <hoisted variable declarations>
                //     return {
                //         setters: [
                //             <list of setter function for imports>
                //         ],
                //         execute: function() {
                //             <module statements>
                //         }
                //     }
                //     <temp declarations>
                // }
                // I.e:
                // import {x} from 'file1'
                // var y = 1;
                // export function foo() { return y + x(); }
                // console.log(y);
                // will be transformed to
                // function(exports) {
                //     var file1; // local alias
                //     var y;
                //     function foo() { return y + file1.x(); }
                //     exports("foo", foo);
                //     return {
                //         setters: [
                //             function(v) { file1 = v }
                //         ],
                //         execute(): function() {
                //             y = 1;
                //             console.log(y);
                //         }
                //     };
                // }
                emitVariableDeclarationsForImports();
                writeLine();
                const exportedDeclarations = processTopLevelVariableAndFunctionDeclarations(node);
                const exportStarFunction = emitLocalStorageForExportedNamesIfNecessary(exportedDeclarations);
                writeLine();
                write("return {");
                increaseIndent();
                writeLine();
                emitSetters(exportStarFunction, dependencyGroups);
                writeLine();
                emitExecute(node, startIndex);
                decreaseIndent();
                writeLine();
                write("}"); // return
                emitTempDeclarations(/*newLine*/ true);
            }

            function emitSetters(exportStarFunction: string, dependencyGroups: DependencyGroup[]) {
                write("setters:[");

                for (let i = 0; i < dependencyGroups.length; i++) {
                    if (i !== 0) {
                        write(",");
                    }

                    writeLine();
                    increaseIndent();

                    const group = dependencyGroups[i];

                    // derive a unique name for parameter from the first named entry in the group
                    const parameterName = makeUniqueName(forEach(group, getLocalNameForExternalImport) || "");
                    write(`function (${parameterName}) {`);
                    increaseIndent();

                    for (const entry of group) {
                        const importVariableName = getLocalNameForExternalImport(entry) || "";

                        switch (entry.kind) {
                            case SyntaxKind.ImportDeclaration:
                                if (!(<ImportDeclaration>entry).importClause) {
                                    // 'import "..."' case
                                    // module is imported only for side-effects, no emit required
                                    break;
                                }
                            // fall-through
                            case SyntaxKind.ImportEqualsDeclaration:
                                Debug.assert(importVariableName !== "");

                                writeLine();
                                // save import into the local
                                write(`${importVariableName} = ${parameterName};`);
                                writeLine();
                                break;
                            case SyntaxKind.ExportDeclaration:
                                Debug.assert(importVariableName !== "");

                                if ((<ExportDeclaration>entry).exportClause) {
                                    // export {a, b as c} from 'foo'
                                    // emit as:
                                    // exports_({
                                    //    "a": _["a"],
                                    //    "c": _["b"]
                                    // });
                                    writeLine();
                                    write(`${exportFunctionForFile}({`);
                                    writeLine();
                                    increaseIndent();
                                    for (let i = 0, len = (<ExportDeclaration>entry).exportClause.elements.length; i < len; i++) {
                                        if (i !== 0) {
                                            write(",");
                                            writeLine();
                                        }

                                        const e = (<ExportDeclaration>entry).exportClause.elements[i];
                                        write(`"`);
                                        emitNodeWithCommentsAndWithoutSourcemap(e.name);
                                        write(`": ${parameterName}["`);
                                        emitNodeWithCommentsAndWithoutSourcemap(e.propertyName || e.name);
                                        write(`"]`);
                                    }
                                    decreaseIndent();
                                    writeLine();
                                    write("});");
                                }
                                else {
                                    // collectExternalModuleInfo prefilters star exports to keep only ones that export values
                                    // this means that check 'resolver.moduleExportsSomeValue' is redundant and can be omitted here
                                    writeLine();
                                    // export * from 'foo'
                                    // emit as:
                                    // exportStar(_foo);
                                    write(`${exportStarFunction}(${parameterName});`);
                                }

                                writeLine();
                                break;
                        }

                    }

                    decreaseIndent();

                    write("}");
                    decreaseIndent();
                }
                write("],");
            }

            function emitExecute(node: SourceFile, startIndex: number) {
                write("execute: function() {");
                increaseIndent();
                writeLine();
                for (let i = startIndex; i < node.statements.length; i++) {
                    const statement = node.statements[i];
                    switch (statement.kind) {
                        // - function declarations are not emitted because they were already hoisted
                        // - import declarations are not emitted since they are already handled in setters
                        // - export declarations with module specifiers are not emitted since they were already written in setters
                        // - export declarations without module specifiers are emitted preserving the order
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.ImportDeclaration:
                            continue;
                        case SyntaxKind.ExportDeclaration:
                            if (!(<ExportDeclaration>statement).moduleSpecifier) {
                                for (const element of (<ExportDeclaration>statement).exportClause.elements) {
                                    // write call to exporter function for every export specifier in exports list
                                    emitExportSpecifierInSystemModule(element);
                                }
                            }
                            continue;
                        case SyntaxKind.ImportEqualsDeclaration:
                            if (!isInternalModuleImportEqualsDeclaration(statement)) {
                                // - import equals declarations that import external modules are not emitted
                                continue;
                            }
                            // fall-though for import declarations that import internal modules
                        default:
                            writeLine();
                            emit(statement);
                    }
                }
                decreaseIndent();
                writeLine();
                write("}"); // execute
            }

            function writeModuleName(node: SourceFile, emitRelativePathAsModuleName?: boolean): void {
                let moduleName = node.moduleName;
                if (moduleName || (emitRelativePathAsModuleName && (moduleName = getResolvedExternalModuleName(host, node)))) {
                    write(`"${moduleName}", `);
                }
            }

            function emitSystemModule(node: SourceFile,  emitRelativePathAsModuleName?: boolean): void {
                collectExternalModuleInfo(node);
                // System modules has the following shape
                // System.register(['dep-1', ... 'dep-n'], function(exports) {/* module body function */})
                // 'exports' here is a function 'exports<T>(name: string, value: T): T' that is used to publish exported values.
                // 'exports' returns its 'value' argument so in most cases expressions
                // that mutate exported values can be rewritten as:
                // expr -> exports('name', expr).
                // The only exception in this rule is postfix unary operators,
                // see comment to 'emitPostfixUnaryExpression' for more details
                Debug.assert(!exportFunctionForFile);
                // make sure that  name of 'exports' function does not conflict with existing identifiers
                exportFunctionForFile = makeUniqueName("exports");
                contextObjectForFile = makeUniqueName("context");
                writeLine();
                write("System.register(");
                writeModuleName(node, emitRelativePathAsModuleName);
                write("[");

                const groupIndices: Map<number> = {};
                const dependencyGroups: DependencyGroup[] = [];

                for (let i = 0; i < externalImports.length; i++) {
                    const text = getExternalModuleNameText(externalImports[i], emitRelativePathAsModuleName);
                    if (text === undefined) {
                        continue;
                    }

                    // text should be quoted string
                    // for deduplication purposes in key remove leading and trailing quotes so 'a' and "a" will be considered the same
                    const key = text.substr(1, text.length - 2);

                    if (hasProperty(groupIndices, key)) {
                        // deduplicate/group entries in dependency list by the dependency name
                        const groupIndex = groupIndices[key];
                        dependencyGroups[groupIndex].push(externalImports[i]);
                        continue;
                    }
                    else {
                        groupIndices[key] = dependencyGroups.length;
                        dependencyGroups.push([externalImports[i]]);
                    }

                    if (i !== 0) {
                        write(", ");
                    }

                    write(text);
                }
                write(`], function(${exportFunctionForFile}, ${contextObjectForFile}) {`);
                writeLine();
                increaseIndent();
                const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ true, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
                writeLine();
                write(`var __moduleName = ${contextObjectForFile} && ${contextObjectForFile}.id;`);
                writeLine();
                emitEmitHelpers(node);
                emitCaptureThisForNodeIfNecessary(node);
                emitSystemModuleBody(node, dependencyGroups, startIndex);
                decreaseIndent();
                writeLine();
                write("});");
            }

            interface AMDDependencyNames {
                aliasedModuleNames: string[];
                unaliasedModuleNames: string[];
                importAliasNames: string[];
            }

            function getAMDDependencyNames(node: SourceFile, includeNonAmdDependencies: boolean, emitRelativePathAsModuleName?: boolean): AMDDependencyNames {
                // names of modules with corresponding parameter in the factory function
                const aliasedModuleNames: string[] = [];
                // names of modules with no corresponding parameters in factory function
                const unaliasedModuleNames: string[] = [];
                const importAliasNames: string[] = [];     // names of the parameters in the factory function; these
                // parameters need to match the indexes of the corresponding
                // module names in aliasedModuleNames.

                // Fill in amd-dependency tags
                for (const amdDependency of node.amdDependencies) {
                    if (amdDependency.name) {
                        aliasedModuleNames.push('"' + amdDependency.path + '"');
                        importAliasNames.push(amdDependency.name);
                    }
                    else {
                        unaliasedModuleNames.push('"' + amdDependency.path + '"');
                    }
                }

                for (const importNode of externalImports) {
                    // Find the name of the external module
                    const externalModuleName = getExternalModuleNameText(importNode, emitRelativePathAsModuleName);

                    // Find the name of the module alias, if there is one
                    const importAliasName = getLocalNameForExternalImport(importNode);
                    if (includeNonAmdDependencies && importAliasName) {
                        aliasedModuleNames.push(externalModuleName);
                        importAliasNames.push(importAliasName);
                    }
                    else {
                        unaliasedModuleNames.push(externalModuleName);
                    }
                }

                return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
            }

            function emitAMDDependencies(node: SourceFile, includeNonAmdDependencies: boolean, emitRelativePathAsModuleName?: boolean) {
                // An AMD define function has the following shape:
                //     define(id?, dependencies?, factory);
                //
                // This has the shape of
                //     define(name, ["module1", "module2"], function (module1Alias) {
                // The location of the alias in the parameter list in the factory function needs to
                // match the position of the module name in the dependency list.
                //
                // To ensure this is true in cases of modules with no aliases, e.g.:
                // `import "module"` or `<amd-dependency path= "a.css" />`
                // we need to add modules without alias names to the end of the dependencies list

                const dependencyNames = getAMDDependencyNames(node, includeNonAmdDependencies, emitRelativePathAsModuleName);
                emitAMDDependencyList(dependencyNames);
                write(", ");
                emitAMDFactoryHeader(dependencyNames);
            }

            function emitAMDDependencyList({ aliasedModuleNames, unaliasedModuleNames }: AMDDependencyNames) {
                write('["require", "exports"');
                if (aliasedModuleNames.length) {
                    write(", ");
                    write(aliasedModuleNames.join(", "));
                }
                if (unaliasedModuleNames.length) {
                    write(", ");
                    write(unaliasedModuleNames.join(", "));
                }
                write("]");
            }

            function emitAMDFactoryHeader({ importAliasNames }: AMDDependencyNames) {
                write("function (require, exports");
                if (importAliasNames.length) {
                    write(", ");
                    write(importAliasNames.join(", "));
                }
                write(") {");
            }

            function emitAMDModule(node: SourceFile, emitRelativePathAsModuleName?: boolean) {
                emitEmitHelpers(node);
                collectExternalModuleInfo(node);

                writeLine();
                write("define(");
                writeModuleName(node, emitRelativePathAsModuleName);
                emitAMDDependencies(node, /*includeNonAmdDependencies*/ true, emitRelativePathAsModuleName);
                increaseIndent();
                const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ true, /*ensureUseStrict*/!compilerOptions.noImplicitUseStrict);
                emitExportStarHelper();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitExportEquals(/*emitAsReturn*/ true);
                emitTempDeclarations(/*newLine*/ true);
                decreaseIndent();
                writeLine();
                write("});");
            }

            function emitCommonJSModule(node: SourceFile) {
                const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ false, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
                emitEmitHelpers(node);
                collectExternalModuleInfo(node);
                emitExportStarHelper();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitExportEquals(/*emitAsReturn*/ false);
                emitTempDeclarations(/*newLine*/ true);
            }

            function emitUMDModule(node: SourceFile) {
                emitEmitHelpers(node);
                collectExternalModuleInfo(node);

                const dependencyNames = getAMDDependencyNames(node, /*includeNonAmdDependencies*/ false);

                // Module is detected first to support Browserify users that load into a browser with an AMD loader
                writeLines(`(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(`);
                emitAMDDependencyList(dependencyNames);
                write(", factory);");
                writeLines(`    }
})(`);
                emitAMDFactoryHeader(dependencyNames);
                increaseIndent();
                const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ true, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
                emitExportStarHelper();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitExportEquals(/*emitAsReturn*/ true);
                emitTempDeclarations(/*newLine*/ true);
                decreaseIndent();
                writeLine();
                write("});");
            }

            function emitES6Module(node: SourceFile) {
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStarsToExportValues = false;
                const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ false);
                emitEmitHelpers(node);
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitTempDeclarations(/*newLine*/ true);
                // Emit exportDefault if it exists will happen as part
                // or normal statement emit.
            }

            function emitExportEquals(emitAsReturn: boolean) {
                if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                    writeLine();
                    emitStart(exportEquals);
                    write(emitAsReturn ? "return " : "module.exports = ");
                    emit((<ExportAssignment>exportEquals).expression);
                    write(";");
                    emitEnd(exportEquals);
                }
            }

            function emitJsxElement(node: JsxElement | JsxSelfClosingElement) {
                switch (compilerOptions.jsx) {
                    case JsxEmit.React:
                        jsxEmitReact(node);
                        break;
                    case JsxEmit.Preserve:
                    // Fall back to preserve if None was specified (we'll error earlier)
                    default:
                        jsxEmitPreserve(node);
                        break;
                }
            }

            function trimReactWhitespaceAndApplyEntities(node: JsxText): string {
                let result: string = undefined;
                const text = getTextOfNode(node, /*includeTrivia*/ true);
                let firstNonWhitespace = 0;
                let lastNonWhitespace = -1;

                // JSX trims whitespace at the end and beginning of lines, except that the
                // start/end of a tag is considered a start/end of a line only if that line is
                // on the same line as the closing tag. See examples in tests/cases/conformance/jsx/tsxReactEmitWhitespace.tsx
                for (let i = 0; i < text.length; i++) {
                    const c = text.charCodeAt(i);
                    if (isLineBreak(c)) {
                        if (firstNonWhitespace !== -1 && (lastNonWhitespace - firstNonWhitespace + 1 > 0)) {
                            const part = text.substr(firstNonWhitespace, lastNonWhitespace - firstNonWhitespace + 1);
                            result = (result ? result + `" + ' ' + "` : "") + escapeString(part);
                        }
                        firstNonWhitespace = -1;
                    }
                    else if (!isWhiteSpaceSingleLine(c)) {
                        lastNonWhitespace = i;
                        if (firstNonWhitespace === -1) {
                            firstNonWhitespace = i;
                        }
                    }
                }

                if (firstNonWhitespace !== -1) {
                    const part = text.substr(firstNonWhitespace);
                    result = (result ? result + "\" + ' ' + \"" : "") + escapeString(part);
                }

                if (result) {
                    // Replace entities like &nbsp;
                    result = result.replace(/&(\w+);/g, function(s: any, m: string) {
                        if (entities[m] !== undefined) {
                            const ch = String.fromCharCode(entities[m]);
                            // &quot; needs to be escaped
                            return ch === '"' ? "\\\"" : ch;
                        }
                        else {
                            return s;
                        }
                    });
                }

                return result;
            }

            function isJsxChildEmittable(child: JsxChild): boolean  {
                if (child.kind === SyntaxKind.JsxExpression) {
                    // Don't emit empty expressions
                    return !!(<JsxExpression>child).expression;

                }
                else if (child.kind === SyntaxKind.JsxText) {
                    // Don't emit empty strings
                    return !!getTextToEmit(<JsxText>child);
                }

                return true;
            };

            function getTextToEmit(node: JsxText): string {
                switch (compilerOptions.jsx) {
                    case JsxEmit.React:
                        let text = trimReactWhitespaceAndApplyEntities(node);
                        if (text === undefined || text.length === 0) {
                            return undefined;
                        }
                        else {
                            return text;
                        }
                    case JsxEmit.Preserve:
                    default:
                        return getTextOfNode(node, /*includeTrivia*/ true);
                }
            }

            function emitJsxText(node: JsxText) {
                switch (compilerOptions.jsx) {
                    case JsxEmit.React:
                        write('"');
                        write(trimReactWhitespaceAndApplyEntities(node));
                        write('"');
                        break;

                    case JsxEmit.Preserve:
                    default: // Emit JSX-preserve as default when no --jsx flag is specified
                        writer.writeLiteral(getTextOfNode(node, /*includeTrivia*/ true));
                        break;
                }
            }

            function emitJsxExpression(node: JsxExpression) {
                if (node.expression) {
                    switch (compilerOptions.jsx) {
                        case JsxEmit.Preserve:
                        default:
                            write("{");
                            emit(node.expression);
                            write("}");
                            break;
                        case JsxEmit.React:
                            emit(node.expression);
                            break;
                    }
                }
            }

            function isUseStrictPrologue(node: ExpressionStatement): boolean {
                return (node.expression as StringLiteral).text === "use strict";
            }

            function ensureUseStrictPrologue(startWithNewLine: boolean, writeUseStrict: boolean) {
                if (writeUseStrict) {
                    if (startWithNewLine) {
                        writeLine();
                    }
                    write("\"use strict\";");
                }
            }

            function emitDirectivePrologues(statements: Node[], startWithNewLine: boolean, ensureUseStrict?: boolean): number {
                let foundUseStrict = false;
                for (let i = 0; i < statements.length; i++) {
                    if (isPrologueDirective(statements[i])) {
                        if (isUseStrictPrologue(statements[i] as ExpressionStatement)) {
                            foundUseStrict = true;
                        }
                        if (startWithNewLine || i > 0) {
                            writeLine();
                        }
                        emit(statements[i]);
                    }
                    else {
                        ensureUseStrictPrologue(startWithNewLine || i > 0, !foundUseStrict && ensureUseStrict);
                        // return index of the first non prologue directive
                        return i;
                    }
                }
                ensureUseStrictPrologue(startWithNewLine, !foundUseStrict && ensureUseStrict);
                return statements.length;
            }

            function writeLines(text: string): void {
                const lines = text.split(/\r\n|\r|\n/g);
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.length) {
                        writeLine();
                        write(line);
                    }
                }
            }

            function emitEmitHelpers(node: SourceFile): void {
                // Only emit helpers if the user did not say otherwise.
                if (!compilerOptions.noEmitHelpers) {
                    // Only Emit __extends function when target ES5.
                    // For target ES6 and above, we can emit classDeclaration as is.
                    if (languageVersion < ScriptTarget.ES6 && !extendsEmitted && node.flags & NodeFlags.HasClassExtends) {
                        writeLines(extendsHelper);
                        extendsEmitted = true;
                    }

                    if (compilerOptions.jsx !== JsxEmit.Preserve && !assignEmitted && (node.flags & NodeFlags.HasJsxSpreadAttribute)) {
                        writeLines(assignHelper);
                        assignEmitted = true;
                    }

                    if (!decorateEmitted && node.flags & NodeFlags.HasDecorators) {
                        writeLines(decorateHelper);
                        if (compilerOptions.emitDecoratorMetadata) {
                            writeLines(metadataHelper);
                        }
                        decorateEmitted = true;
                    }

                    if (!paramEmitted && node.flags & NodeFlags.HasParamDecorators) {
                        writeLines(paramHelper);
                        paramEmitted = true;
                    }

                    if (!awaiterEmitted && node.flags & NodeFlags.HasAsyncFunctions) {
                        writeLines(awaiterHelper);
                        awaiterEmitted = true;
                    }
                }
            }

            function emitSourceFileNode(node: SourceFile) {
                // Start new file on new line
                writeLine();
                emitShebang();
                emitDetachedCommentsAndUpdateCommentsInfo(node);

                if (isExternalModule(node) || compilerOptions.isolatedModules) {
                    if (isOwnFileEmit || (!isExternalModule(node) && compilerOptions.isolatedModules)) {
                        const emitModule = moduleEmitDelegates[modulekind] || moduleEmitDelegates[ModuleKind.CommonJS];
                        emitModule(node);
                    }
                    else {
                        bundleEmitDelegates[modulekind](node, /*emitRelativePathAsModuleName*/true);
                    }
                }
                else {
                    // emit prologue directives prior to __extends
                    const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ false);
                    externalImports = undefined;
                    exportSpecifiers = undefined;
                    exportEquals = undefined;
                    hasExportStarsToExportValues = false;
                    emitEmitHelpers(node);
                    emitCaptureThisForNodeIfNecessary(node);
                    emitLinesStartingAt(node.statements, startIndex);
                    emitTempDeclarations(/*newLine*/ true);
                }

                emitLeadingComments(node.endOfFileToken);
            }

            function emit(node: Node): void {
                emitNodeConsideringCommentsOption(node, emitNodeWithSourceMap);
            }

            function emitNodeWithCommentsAndWithoutSourcemap(node: Node): void {
                emitNodeConsideringCommentsOption(node, emitNodeWithoutSourceMap);
            }

            function emitNodeConsideringCommentsOption(node: Node, emitNodeConsideringSourcemap: (node: Node) => void): void {
                if (node) {
                    if (node.flags & NodeFlags.Ambient) {
                        return emitCommentsOnNotEmittedNode(node);
                    }

                    if (isSpecializedCommentHandling(node)) {
                        // This is the node that will handle its own comments and sourcemap
                        return emitNodeWithoutSourceMap(node);
                    }

                    const emitComments = shouldEmitLeadingAndTrailingComments(node);
                    if (emitComments) {
                        emitLeadingComments(node);
                    }

                    emitNodeConsideringSourcemap(node);

                    if (emitComments) {
                        emitTrailingComments(node);
                    }
                }
            }

            function emitNodeWithSourceMap(node: Node): void {
                if (node) {
                    emitStart(node);
                    emitNodeWithoutSourceMap(node);
                    emitEnd(node);
                }
            }

            function emitNodeWithoutSourceMap(node: Node): void {
                if (node) {
                    emitJavaScriptWorker(node);
                }
            }

            function changeSourceMapEmit(writer: SourceMapWriter) {
                sourceMap = writer;
                emitStart = writer.emitStart;
                emitEnd = writer.emitEnd;
                emitPos = writer.emitPos;
                setSourceFile = writer.setSourceFile;
            }

            function withTemporaryNoSourceMap(callback: () => void) {
                const prevSourceMap = sourceMap;
                setSourceMapWriterEmit(getNullSourceMapWriter());
                callback();
                setSourceMapWriterEmit(prevSourceMap);
            }

            function isSpecializedCommentHandling(node: Node): boolean {
                switch (node.kind) {
                    // All of these entities are emitted in a specialized fashion.  As such, we allow
                    // the specialized methods for each to handle the comments on the nodes.
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ImportDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                    case SyntaxKind.ExportAssignment:
                        return true;
                }
            }

            function shouldEmitLeadingAndTrailingComments(node: Node) {
                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        return shouldEmitLeadingAndTrailingCommentsForVariableStatement(<VariableStatement>node);

                    case SyntaxKind.ModuleDeclaration:
                        // Only emit the leading/trailing comments for a module if we're actually
                        // emitting the module as well.
                        return shouldEmitModuleDeclaration(<ModuleDeclaration>node);

                    case SyntaxKind.EnumDeclaration:
                        // Only emit the leading/trailing comments for an enum if we're actually
                        // emitting the module as well.
                        return shouldEmitEnumDeclaration(<EnumDeclaration>node);
                }

                // If the node is emitted in specialized fashion, dont emit comments as this node will handle
                // emitting comments when emitting itself
                Debug.assert(!isSpecializedCommentHandling(node));

                // If this is the expression body of an arrow function that we're down-leveling,
                // then we don't want to emit comments when we emit the body.  It will have already
                // been taken care of when we emitted the 'return' statement for the function
                // expression body.
                if (node.kind !== SyntaxKind.Block &&
                    node.parent &&
                    node.parent.kind === SyntaxKind.ArrowFunction &&
                    (<ArrowFunction>node.parent).body === node &&
                    languageVersion <= ScriptTarget.ES5) {

                    return false;
                }

                // Emit comments for everything else.
                return true;
            }

            function emitJavaScriptWorker(node: Node) {
                // Check if the node can be emitted regardless of the ScriptTarget
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                        return emitIdentifier(<Identifier>node);
                    case SyntaxKind.Parameter:
                        return emitParameter(<ParameterDeclaration>node);
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        return emitMethod(<MethodDeclaration>node);
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        return emitAccessor(<AccessorDeclaration>node);
                    case SyntaxKind.ThisKeyword:
                        return emitThis(node);
                    case SyntaxKind.SuperKeyword:
                        return emitSuper(node);
                    case SyntaxKind.NullKeyword:
                        return write("null");
                    case SyntaxKind.TrueKeyword:
                        return write("true");
                    case SyntaxKind.FalseKeyword:
                        return write("false");
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                    case SyntaxKind.TemplateHead:
                    case SyntaxKind.TemplateMiddle:
                    case SyntaxKind.TemplateTail:
                        return emitLiteral(<LiteralExpression>node);
                    case SyntaxKind.TemplateExpression:
                        return emitTemplateExpression(<TemplateExpression>node);
                    case SyntaxKind.TemplateSpan:
                        return emitTemplateSpan(<TemplateSpan>node);
                    case SyntaxKind.JsxElement:
                    case SyntaxKind.JsxSelfClosingElement:
                        return emitJsxElement(<JsxElement | JsxSelfClosingElement>node);
                    case SyntaxKind.JsxText:
                        return emitJsxText(<JsxText>node);
                    case SyntaxKind.JsxExpression:
                        return emitJsxExpression(<JsxExpression>node);
                    case SyntaxKind.QualifiedName:
                        return emitQualifiedName(<QualifiedName>node);
                    case SyntaxKind.ObjectBindingPattern:
                        return emitObjectBindingPattern(<BindingPattern>node);
                    case SyntaxKind.ArrayBindingPattern:
                        return emitArrayBindingPattern(<BindingPattern>node);
                    case SyntaxKind.BindingElement:
                        return emitBindingElement(<BindingElement>node);
                    case SyntaxKind.ArrayLiteralExpression:
                        return emitArrayLiteral(<ArrayLiteralExpression>node);
                    case SyntaxKind.ObjectLiteralExpression:
                        return emitObjectLiteral(<ObjectLiteralExpression>node);
                    case SyntaxKind.PropertyAssignment:
                        return emitPropertyAssignment(<PropertyDeclaration>node);
                    case SyntaxKind.ShorthandPropertyAssignment:
                        return emitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
                    case SyntaxKind.ComputedPropertyName:
                        return emitComputedPropertyName(<ComputedPropertyName>node);
                    case SyntaxKind.PropertyAccessExpression:
                        return emitPropertyAccess(<PropertyAccessExpression>node);
                    case SyntaxKind.ElementAccessExpression:
                        return emitIndexedAccess(<ElementAccessExpression>node);
                    case SyntaxKind.CallExpression:
                        return emitCallExpression(<CallExpression>node);
                    case SyntaxKind.NewExpression:
                        return emitNewExpression(<NewExpression>node);
                    case SyntaxKind.TaggedTemplateExpression:
                        return emitTaggedTemplateExpression(<TaggedTemplateExpression>node);
                    case SyntaxKind.TypeAssertionExpression:
                    case SyntaxKind.AsExpression:
                    case SyntaxKind.NonNullExpression:
                        return emit((<AssertionExpression | NonNullExpression>node).expression);
                    case SyntaxKind.ParenthesizedExpression:
                        return emitParenExpression(<ParenthesizedExpression>node);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        return emitFunctionDeclaration(<FunctionLikeDeclaration>node);
                    case SyntaxKind.DeleteExpression:
                        return emitDeleteExpression(<DeleteExpression>node);
                    case SyntaxKind.TypeOfExpression:
                        return emitTypeOfExpression(<TypeOfExpression>node);
                    case SyntaxKind.VoidExpression:
                        return emitVoidExpression(<VoidExpression>node);
                    case SyntaxKind.AwaitExpression:
                        return emitAwaitExpression(<AwaitExpression>node);
                    case SyntaxKind.PrefixUnaryExpression:
                        return emitPrefixUnaryExpression(<PrefixUnaryExpression>node);
                    case SyntaxKind.PostfixUnaryExpression:
                        return emitPostfixUnaryExpression(<PostfixUnaryExpression>node);
                    case SyntaxKind.BinaryExpression:
                        return emitBinaryExpression(<BinaryExpression>node);
                    case SyntaxKind.ConditionalExpression:
                        return emitConditionalExpression(<ConditionalExpression>node);
                    case SyntaxKind.SpreadElementExpression:
                        return emitSpreadElementExpression(<SpreadElementExpression>node);
                    case SyntaxKind.YieldExpression:
                        return emitYieldExpression(<YieldExpression>node);
                    case SyntaxKind.OmittedExpression:
                        return;
                    case SyntaxKind.Block:
                    case SyntaxKind.ModuleBlock:
                        return emitBlock(<Block>node);
                    case SyntaxKind.VariableStatement:
                        return emitVariableStatement(<VariableStatement>node);
                    case SyntaxKind.EmptyStatement:
                        return write(";");
                    case SyntaxKind.ExpressionStatement:
                        return emitExpressionStatement(<ExpressionStatement>node);
                    case SyntaxKind.IfStatement:
                        return emitIfStatement(<IfStatement>node);
                    case SyntaxKind.DoStatement:
                        return emitDoStatement(<DoStatement>node);
                    case SyntaxKind.WhileStatement:
                        return emitWhileStatement(<WhileStatement>node);
                    case SyntaxKind.ForStatement:
                        return emitForStatement(<ForStatement>node);
                    case SyntaxKind.ForOfStatement:
                    case SyntaxKind.ForInStatement:
                        return emitForInOrForOfStatement(<ForInStatement>node);
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.BreakStatement:
                        return emitBreakOrContinueStatement(<BreakOrContinueStatement>node);
                    case SyntaxKind.ReturnStatement:
                        return emitReturnStatement(<ReturnStatement>node);
                    case SyntaxKind.WithStatement:
                        return emitWithStatement(<WithStatement>node);
                    case SyntaxKind.SwitchStatement:
                        return emitSwitchStatement(<SwitchStatement>node);
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                        return emitCaseOrDefaultClause(<CaseOrDefaultClause>node);
                    case SyntaxKind.LabeledStatement:
                        return emitLabeledStatement(<LabeledStatement>node);
                    case SyntaxKind.ThrowStatement:
                        return emitThrowStatement(<ThrowStatement>node);
                    case SyntaxKind.TryStatement:
                        return emitTryStatement(<TryStatement>node);
                    case SyntaxKind.CatchClause:
                        return emitCatchClause(<CatchClause>node);
                    case SyntaxKind.DebuggerStatement:
                        return emitDebuggerStatement(node);
                    case SyntaxKind.VariableDeclaration:
                        return emitVariableDeclaration(<VariableDeclaration>node);
                    case SyntaxKind.ClassExpression:
                        return emitClassExpression(<ClassExpression>node);
                    case SyntaxKind.ClassDeclaration:
                        return emitClassDeclaration(<ClassDeclaration>node);
                    case SyntaxKind.InterfaceDeclaration:
                        return emitInterfaceDeclaration(<InterfaceDeclaration>node);
                    case SyntaxKind.EnumDeclaration:
                        return emitEnumDeclaration(<EnumDeclaration>node);
                    case SyntaxKind.EnumMember:
                        return emitEnumMember(<EnumMember>node);
                    case SyntaxKind.ModuleDeclaration:
                        return emitModuleDeclaration(<ModuleDeclaration>node);
                    case SyntaxKind.ImportDeclaration:
                        return emitImportDeclaration(<ImportDeclaration>node);
                    case SyntaxKind.ImportEqualsDeclaration:
                        return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                    case SyntaxKind.ExportDeclaration:
                        return emitExportDeclaration(<ExportDeclaration>node);
                    case SyntaxKind.ExportAssignment:
                        return emitExportAssignment(<ExportAssignment>node);
                    case SyntaxKind.SourceFile:
                        return emitSourceFileNode(<SourceFile>node);
                }
            }

            function hasDetachedComments(pos: number) {
                return detachedCommentsInfo !== undefined && lastOrUndefined(detachedCommentsInfo).nodePos === pos;
            }

            function getLeadingCommentsWithoutDetachedComments() {
                // get the leading comments from detachedPos
                const leadingComments = getLeadingCommentRanges(currentText,
                    lastOrUndefined(detachedCommentsInfo).detachedCommentEndPos);
                if (detachedCommentsInfo.length - 1) {
                    detachedCommentsInfo.pop();
                }
                else {
                    detachedCommentsInfo = undefined;
                }

                return leadingComments;
            }

            /**
             * Determine if the given comment is a triple-slash
             *
             * @return true if the comment is a triple-slash comment else false
             **/
            function isTripleSlashComment(comment: CommentRange) {
                // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
                // so that we don't end up computing comment string and doing match for all // comments
                if (currentText.charCodeAt(comment.pos + 1) === CharacterCodes.slash &&
                    comment.pos + 2 < comment.end &&
                    currentText.charCodeAt(comment.pos + 2) === CharacterCodes.slash) {
                    const textSubStr = currentText.substring(comment.pos, comment.end);
                    return textSubStr.match(fullTripleSlashReferencePathRegEx) ||
                        textSubStr.match(fullTripleSlashAMDReferencePathRegEx) ?
                        true : false;
                }
                return false;
            }

            function getLeadingCommentsToEmit(node: Node) {
                // Emit the leading comments only if the parent's pos doesn't match because parent should take care of emitting these comments
                if (node.parent) {
                    if (node.parent.kind === SyntaxKind.SourceFile || node.pos !== node.parent.pos) {
                        if (hasDetachedComments(node.pos)) {
                            // get comments without detached comments
                            return getLeadingCommentsWithoutDetachedComments();
                        }
                        else {
                            // get the leading comments from the node
                            return getLeadingCommentRangesOfNodeFromText(node, currentText);
                        }
                    }
                }
            }

            function getTrailingCommentsToEmit(node: Node) {
                // Emit the trailing comments only if the parent's pos doesn't match because parent should take care of emitting these comments
                if (node.parent) {
                    if (node.parent.kind === SyntaxKind.SourceFile || node.end !== node.parent.end) {
                        return getTrailingCommentRanges(currentText, node.end);
                    }
                }
            }

            /**
             * Emit comments associated with node that will not be emitted into JS file
             */
            function emitCommentsOnNotEmittedNode(node: Node) {
                emitLeadingCommentsWorker(node, /*isEmittedNode*/ false);
            }

            function emitLeadingComments(node: Node) {
                return emitLeadingCommentsWorker(node, /*isEmittedNode*/ true);
            }

            function emitLeadingCommentsWorker(node: Node, isEmittedNode: boolean) {
                if (compilerOptions.removeComments) {
                    return;
                }

                let leadingComments: CommentRange[];
                if (isEmittedNode) {
                    leadingComments = getLeadingCommentsToEmit(node);
                }
                else {
                    // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
                    // unless it is a triple slash comment at the top of the file.
                    // For Example:
                    //      /// <reference-path ...>
                    //      declare var x;
                    //      /// <reference-path ...>
                    //      interface F {}
                    //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
                    if (node.pos === 0) {
                        leadingComments = filter(getLeadingCommentsToEmit(node), isTripleSlashComment);
                    }
                }

                emitNewLineBeforeLeadingComments(currentLineMap, writer, node, leadingComments);

                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentText, currentLineMap, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitTrailingComments(node: Node) {
                if (compilerOptions.removeComments) {
                    return;
                }

                // Emit the trailing comments only if the parent's end doesn't match
                const trailingComments = getTrailingCommentsToEmit(node);

                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                emitComments(currentText, currentLineMap, writer, trailingComments, /*trailingSeparator*/ false, newLine, writeComment);
            }

            /**
             * Emit trailing comments at the position. The term trailing comment is used here to describe following comment:
             *      x, /comment1/ y
             *        ^ => pos; the function will emit "comment1" in the emitJS
             */
            function emitTrailingCommentsOfPosition(pos: number) {
                if (compilerOptions.removeComments) {
                    return;
                }

                const trailingComments = getTrailingCommentRanges(currentText, pos);

                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                emitComments(currentText, currentLineMap, writer, trailingComments, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitLeadingCommentsOfPositionWorker(pos: number) {
                if (compilerOptions.removeComments) {
                    return;
                }

                let leadingComments: CommentRange[];
                if (hasDetachedComments(pos)) {
                    // get comments without detached comments
                    leadingComments = getLeadingCommentsWithoutDetachedComments();
                }
                else {
                    // get the leading comments from the node
                    leadingComments = getLeadingCommentRanges(currentText, pos);
                }

                emitNewLineBeforeLeadingComments(currentLineMap, writer, { pos: pos, end: pos }, leadingComments);

                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentText, currentLineMap, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitDetachedCommentsAndUpdateCommentsInfo(node: TextRange) {
                const currentDetachedCommentInfo = emitDetachedComments(currentText, currentLineMap, writer, writeComment, node, newLine, compilerOptions.removeComments);

                if (currentDetachedCommentInfo) {
                    if (detachedCommentsInfo) {
                        detachedCommentsInfo.push(currentDetachedCommentInfo);
                    }
                    else {
                        detachedCommentsInfo = [currentDetachedCommentInfo];
                    }
                }
            }

            function writeComment(text: string, lineMap: number[], writer: EmitTextWriter, comment: CommentRange, newLine: string) {
                emitPos(comment.pos);
                writeCommentRange(text, lineMap, writer, comment, newLine);
                emitPos(comment.end);
            }

            function emitShebang() {
                const shebang = getShebang(currentText);
                if (shebang) {
                    write(shebang);
                    writeLine();
                }
            }
        }

        function emitFile({ jsFilePath, sourceMapFilePath, declarationFilePath}: { jsFilePath: string, sourceMapFilePath: string, declarationFilePath: string },
            sourceFiles: SourceFile[], isBundledEmit: boolean) {
            // Make sure not to write js File and source map file if any of them cannot be written
            if (!host.isEmitBlocked(jsFilePath) && !compilerOptions.noEmit) {
                emitJavaScript(jsFilePath, sourceMapFilePath, sourceFiles, isBundledEmit);
            }
            else {
                emitSkipped = true;
            }

            if (declarationFilePath) {
                emitSkipped = writeDeclarationFile(declarationFilePath, sourceFiles, isBundledEmit, host, resolver, emitterDiagnostics) || emitSkipped;
            }

            if (!emitSkipped && emittedFilesList) {
                emittedFilesList.push(jsFilePath);
                if (sourceMapFilePath) {
                    emittedFilesList.push(sourceMapFilePath);
                }
                if (declarationFilePath) {
                    emittedFilesList.push(declarationFilePath);
                }
            }
        }
    }
}
