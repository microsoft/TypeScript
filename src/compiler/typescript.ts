//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='references.ts' />

if (Error) (<any>Error).stackTraceLimit = 1000;

module TypeScript {

    declare var IO: any;

    export var fileResolutionTime = 0;
    export var fileResolutionIOTime = 0;
    export var fileResolutionScanImportsTime = 0;
    export var fileResolutionImportFileSearchTime = 0;
    export var fileResolutionGetDefaultLibraryTime = 0;
    export var sourceCharactersCompiled = 0;
    export var syntaxTreeParseTime = 0;
    export var syntaxDiagnosticsTime = 0;
    export var astTranslationTime = 0;
    export var typeCheckTime = 0;

    export var compilerResolvePathTime = 0;
    export var compilerDirectoryNameTime = 0;
    export var compilerDirectoryExistsTime = 0;
    export var compilerFileExistsTime = 0;

    export var emitTime = 0;
    export var emitWriteFileTime = 0;

    export var declarationEmitTime = 0;
    export var declarationEmitIsExternallyVisibleTime = 0;
    export var declarationEmitTypeSignatureTime = 0;
    export var declarationEmitGetBoundDeclTypeTime = 0;
    export var declarationEmitIsOverloadedCallSignatureTime = 0;
    export var declarationEmitFunctionDeclarationGetSymbolTime = 0;
    export var declarationEmitGetBaseTypeTime = 0;
    export var declarationEmitGetAccessorFunctionTime = 0;
    export var declarationEmitGetTypeParameterSymbolTime = 0;
    export var declarationEmitGetImportDeclarationSymbolTime = 0;

    export var ioHostResolvePathTime = 0;
    export var ioHostDirectoryNameTime = 0;
    export var ioHostCreateDirectoryStructureTime = 0;
    export var ioHostWriteFileTime = 0;

    export interface PullSymbolInfo {
        symbol: PullSymbol;
        aliasSymbol: PullTypeAliasSymbol;
        ast: AST;
        enclosingScopeSymbol: PullSymbol;
    }

    export interface PullCallSymbolInfo {
        targetSymbol: PullSymbol;
        resolvedSignatures: TypeScript.PullSignatureSymbol[];
        candidateSignature: TypeScript.PullSignatureSymbol;
        isConstructorCall: boolean;
        ast: AST;
        enclosingScopeSymbol: PullSymbol;
    }

    export interface PullVisibleSymbolsInfo {
        symbols: PullSymbol[];
        enclosingScopeSymbol: PullSymbol;
    }

    export enum EmitOutputResult {
        Succeeded,
        FailedBecauseOfSyntaxErrors,
        FailedBecauseOfCompilerOptionsErrors,
        FailedToGenerateDeclarationsBecauseOfSemanticErrors
    }

    export class EmitOutput {
        public outputFiles: OutputFile[] = [];
        public emitOutputResult: EmitOutputResult;
        constructor(emitOutputResult = EmitOutputResult.Succeeded) {
            this.emitOutputResult = emitOutputResult;
        }
    }

    export enum OutputFileType {
        JavaScript,
        SourceMap,
        Declaration
    }

    export class OutputFile {
        constructor(public name: string,
            public writeByteOrderMark: boolean,
            public text: string,
            public fileType: OutputFileType,
            public sourceMapEntries: SourceMapEntry[] = []) {
        }
    }

    // Represents the results of the last "pull" on the compiler when using the streaming
    // 'compile' method.  The compile result for a single pull can have diagnostics (if 
    // something went wrong), and/or OutputFiles that need to get written.
    export class CompileResult {
        public diagnostics: Diagnostic[] = [];
        public outputFiles: OutputFile[] = [];

        public static fromDiagnostics(diagnostics: Diagnostic[]): CompileResult {
            var result = new CompileResult();
            result.diagnostics = diagnostics;
            return result;
        }

        public static fromOutputFiles(outputFiles: OutputFile[]): CompileResult {
            var result = new CompileResult();
            result.outputFiles = outputFiles;
            return result;
        }
    }

    export class TypeScriptCompiler {
        private semanticInfoChain: SemanticInfoChain = null;

        constructor(public logger: ILogger = new NullLogger(),
                    private _settings: ImmutableCompilationSettings = ImmutableCompilationSettings.defaultSettings()) {
            this.semanticInfoChain = new SemanticInfoChain(this, logger);
        }

        public compilationSettings(): ImmutableCompilationSettings {
            return this._settings;
        }

        public setCompilationSettings(newSettings: ImmutableCompilationSettings) {
            var oldSettings = this._settings;
            this._settings = newSettings;

            if (!compareDataObjects(oldSettings, newSettings)) {
                // If our options have changed at all, we have to consider any cached semantic 
                // data we have invalid.
                this.semanticInfoChain.invalidate(oldSettings, newSettings);
            }
        }

        public getDocument(fileName: string): Document {
            fileName = TypeScript.switchToForwardSlashes(fileName);
            return this.semanticInfoChain.getDocument(fileName);
        }

        public cleanupSemanticCache(): void {
            this.semanticInfoChain.invalidate();
        }

        public addFile(fileName: string,
            scriptSnapshot: IScriptSnapshot,
            byteOrderMark: ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[] = []): void {

            fileName = TypeScript.switchToForwardSlashes(fileName);

            TypeScript.sourceCharactersCompiled += scriptSnapshot.getLength();

            var document = Document.create(this, this.semanticInfoChain, fileName, scriptSnapshot, byteOrderMark, version, isOpen, referencedFiles);

            this.semanticInfoChain.addDocument(document);
        }

        public updateFile(fileName: string, scriptSnapshot: IScriptSnapshot, version: number, isOpen: boolean, textChangeRange: TextChangeRange): void {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var document = this.getDocument(fileName);
            var updatedDocument = document.update(scriptSnapshot, version, isOpen, textChangeRange);

            // Note: the semantic info chain will recognize that this is a replacement of an
            // existing script, and will handle it appropriately.
            this.semanticInfoChain.addDocument(updatedDocument);
        }

        public removeFile(fileName: string): void {
            fileName = TypeScript.switchToForwardSlashes(fileName);
            this.semanticInfoChain.removeDocument(fileName);
        }

        public mapOutputFileName(document: Document, emitOptions: EmitOptions, extensionChanger: (fname: string, wholeFileNameReplaced: boolean) => string) {
            if (document.emitToOwnOutputFile()) {
                var updatedFileName = document.fileName;
                if (emitOptions.outputDirectory() !== "") {
                    // Replace the common directory path with the option specified
                    updatedFileName = document.fileName.replace(emitOptions.commonDirectoryPath(), "");
                    updatedFileName = emitOptions.outputDirectory() + updatedFileName;
                }
                return extensionChanger(updatedFileName, false);
            }
            else {
                return extensionChanger(emitOptions.sharedOutputFile(), true);
            }
        }

        private writeByteOrderMarkForDocument(document: Document) {
            // Set this to 'true' if you want to know why the compiler emitted a document with a 
            // byte order mark.
            var printReason = false;

            // If module its always emitted in its own file
            if (document.emitToOwnOutputFile()) {
                var result = document.byteOrderMark !== ByteOrderMark.None;
                if (printReason) {
                    Environment.standardOut.WriteLine("Emitting byte order mark because of: " + document.fileName);
                }
                return result;
            }
            else {
                var fileNames = this.fileNames();

                var result = false;
                for (var i = 0, n = fileNames.length; i < n; i++) {
                    var document = this.getDocument(fileNames[i]);

                    if (document.isExternalModule()) {
                        // Dynamic module never contributes to the single file
                        continue;
                    }

                    if (document.byteOrderMark !== ByteOrderMark.None) {
                        if (printReason) {
                            Environment.standardOut.WriteLine("Emitting byte order mark because of: " + document.fileName);
                            result = true;
                        }
                        else {
                            return true;
                        }
                    }
                }

                return result;
            }
        }

        static mapToDTSFileName(fileName: string, wholeFileNameReplaced: boolean) {
            return getDeclareFilePath(fileName);
        }

        public _shouldEmit(document: Document) {
            // If its already a declare file or is resident or does not contain body 
            return !document.isDeclareFile();
        }

        public _shouldEmitDeclarations(document: Document) {
            if (!this.compilationSettings().generateDeclarationFiles()) {
                return false;
            }

            return this._shouldEmit(document);
        }

        // Does the actual work of emittin the declarations from the provided document into the
        // provided emitter.  If no emitter is provided a new one is created.  
        private emitDocumentDeclarationsWorker(
            document: Document,
            emitOptions: EmitOptions,
            declarationEmitter?: DeclarationEmitter): DeclarationEmitter {

            var sourceUnit = document.sourceUnit();
            Debug.assert(this._shouldEmitDeclarations(document));

            if (declarationEmitter) {
                declarationEmitter.document = document;
            }
            else {
                var declareFileName = this.mapOutputFileName(document, emitOptions, TypeScriptCompiler.mapToDTSFileName);
                declarationEmitter = new DeclarationEmitter(declareFileName, document, this, emitOptions, this.semanticInfoChain);
            }

            declarationEmitter.emitDeclarations(sourceUnit);
            return declarationEmitter;
        }

        public _emitDocumentDeclarations(
            document: Document,
            emitOptions: EmitOptions,
            onSingleFileEmitComplete: (files: OutputFile) => void,
            sharedEmitter: DeclarationEmitter): DeclarationEmitter {

            if (this._shouldEmitDeclarations(document)) {
                if (document.emitToOwnOutputFile()) {
                    var singleEmitter = this.emitDocumentDeclarationsWorker(document, emitOptions);
                    if (singleEmitter) {
                        onSingleFileEmitComplete(singleEmitter.getOutputFile());
                    }
                }
                else {
                    // Create or reuse file
                    sharedEmitter = this.emitDocumentDeclarationsWorker(document, emitOptions, sharedEmitter);
                }
            }

            return sharedEmitter;
        }

        // Will not throw exceptions.
        public emitAllDeclarations(resolvePath: (path: string) => string): EmitOutput {
            var start = new Date().getTime();
            var emitOutput = new EmitOutput();

            var emitOptions = new EmitOptions(this, resolvePath);
            if (emitOptions.diagnostic()) {
                emitOutput.emitOutputResult = EmitOutputResult.FailedBecauseOfCompilerOptionsErrors;
                return emitOutput;
            }

            var sharedEmitter: DeclarationEmitter = null;
            var fileNames = this.fileNames();

            for (var i = 0, n = fileNames.length; i < n; i++) {
                var fileName = fileNames[i];

                var document = this.getDocument(fileNames[i]);

                sharedEmitter = this._emitDocumentDeclarations(document, emitOptions,
                    file => emitOutput.outputFiles.push(file), sharedEmitter);
            }

            if (sharedEmitter) {
                emitOutput.outputFiles.push(sharedEmitter.getOutputFile());
            }

            declarationEmitTime += new Date().getTime() - start;

            return emitOutput;
        }

        // Will not throw exceptions.
        public emitDeclarations(fileName: string, resolvePath: (path: string) => string): EmitOutput {
            fileName = TypeScript.switchToForwardSlashes(fileName);
            var emitOutput = new EmitOutput();

            var emitOptions = new EmitOptions(this, resolvePath);
            if (emitOptions.diagnostic()) {
                emitOutput.emitOutputResult = EmitOutputResult.FailedBecauseOfCompilerOptionsErrors;
                return emitOutput;
            }

            var document = this.getDocument(fileName);

            // Emitting module or multiple files, always goes to single file
            if (document.emitToOwnOutputFile()) {
                this._emitDocumentDeclarations(document, emitOptions,
                    file => emitOutput.outputFiles.push(file), /*sharedEmitter:*/ null);
                return emitOutput;
            }
            else {
                return this.emitAllDeclarations(resolvePath);
            }
        }

        public canEmitDeclarations(fileName: string) {
            fileName = TypeScript.switchToForwardSlashes(fileName);
            var document = this.getDocument(fileName);
            return this._shouldEmitDeclarations(document);
        }

        static mapToFileNameExtension(extension: string, fileName: string, wholeFileNameReplaced: boolean) {
            if (wholeFileNameReplaced) {
                // The complete output is redirected in this file so do not change extension
                return fileName;
            }
            else {
                // Change the extension of the file
                var splitFname = fileName.split(".");
                splitFname.pop();
                return splitFname.join(".") + extension;
            }
        }

        static mapToJSFileName(fileName: string, wholeFileNameReplaced: boolean) {
            return TypeScriptCompiler.mapToFileNameExtension(".js", fileName, wholeFileNameReplaced);
        }

        // Caller is responsible for closing the returned emitter.
        // May throw exceptions.
        private emitDocumentWorker(document: Document, emitOptions: EmitOptions, emitter?: Emitter): Emitter {
            var sourceUnit = document.sourceUnit();
            Debug.assert(this._shouldEmit(document));

            var typeScriptFileName = document.fileName;
            if (!emitter) {
                var javaScriptFileName = this.mapOutputFileName(document, emitOptions, TypeScriptCompiler.mapToJSFileName);
                var outFile = new TextWriter(javaScriptFileName, this.writeByteOrderMarkForDocument(document), OutputFileType.JavaScript);

                emitter = new Emitter(javaScriptFileName, outFile, emitOptions, this.semanticInfoChain);

                if (this.compilationSettings().mapSourceFiles()) {
                    // We always create map files next to the jsFiles
                    var sourceMapFile = new TextWriter(javaScriptFileName + SourceMapper.MapFileExtension, /*writeByteOrderMark:*/ false, OutputFileType.SourceMap); 
                    emitter.createSourceMapper(document, javaScriptFileName, outFile, sourceMapFile, emitOptions.resolvePath);
                }
            }
            else if (this.compilationSettings().mapSourceFiles()) {
                // Already emitting into js file, update the mapper for new source info
                emitter.setSourceMapperNewSourceFile(document);
            }

            // Set location info
            emitter.setDocument(document);
            emitter.emitJavascript(sourceUnit, /*startLine:*/false);

            return emitter;
        }

        // Private.  only for use by compiler or CompilerIterator
        public _emitDocument(
            document: Document,
            emitOptions: EmitOptions,
            onSingleFileEmitComplete: (files: OutputFile[]) => void,
            sharedEmitter: Emitter): Emitter {

            // Emitting module or multiple files, always goes to single file
                if (this._shouldEmit(document)) {
                if (document.emitToOwnOutputFile()) {
                    // We're outputting to mulitple files.  We don't want to reuse an emitter in that case.
                    var singleEmitter = this.emitDocumentWorker(document, emitOptions);
                    if (singleEmitter) {
                        onSingleFileEmitComplete(singleEmitter.getOutputFiles());
                    }
                }
                else {
                    // We're not outputting to multiple files.  Keep using the same emitter and don't
                    // close until below.
                    sharedEmitter = this.emitDocumentWorker(document, emitOptions, sharedEmitter);
                }
            }

            return sharedEmitter;
        }

        // Will not throw exceptions.
        public emitAll(resolvePath: (path: string) => string): EmitOutput {
            var start = new Date().getTime();
            var emitOutput = new EmitOutput();

            var emitOptions = new EmitOptions(this, resolvePath);
            if (emitOptions.diagnostic()) {
                emitOutput.emitOutputResult = EmitOutputResult.FailedBecauseOfCompilerOptionsErrors;
                return emitOutput;
            }

            var fileNames = this.fileNames();
            var sharedEmitter: Emitter = null;

            // Iterate through the files, as long as we don't get an error.
            for (var i = 0, n = fileNames.length; i < n; i++) {
                var fileName = fileNames[i];

                var document = this.getDocument(fileName);

                sharedEmitter = this._emitDocument(document, emitOptions,
                    files => emitOutput.outputFiles.push.apply(emitOutput.outputFiles, files),
                    sharedEmitter);
            }

            if (sharedEmitter) {
                emitOutput.outputFiles.push.apply(emitOutput.outputFiles, sharedEmitter.getOutputFiles());
            }

            emitTime += new Date().getTime() - start;
            return emitOutput;
        }

        // Emit single file if outputMany is specified, else emit all
        // Will not throw exceptions.
        public emit(fileName: string, resolvePath: (path: string) => string): EmitOutput {
            fileName = TypeScript.switchToForwardSlashes(fileName);
            var emitOutput = new EmitOutput();

            var emitOptions = new EmitOptions(this, resolvePath);
            if (emitOptions.diagnostic()) {
                emitOutput.emitOutputResult = EmitOutputResult.FailedBecauseOfCompilerOptionsErrors;
                return emitOutput;
            }

            var document = this.getDocument(fileName);
            // Emitting module or multiple files, always goes to single file
            if (document.emitToOwnOutputFile()) {
                this._emitDocument(document, emitOptions,
                    files => emitOutput.outputFiles.push.apply(emitOutput.outputFiles, files), /*sharedEmitter:*/ null);
                return emitOutput;
            }
            else {
                // In output Single file mode, emit everything
                return this.emitAll(resolvePath);
            }
        }

        // Returns an iterator that will stream compilation results from this compiler.  Syntactic
        // diagnostics will be returned first, then semantic diagnostics, then emit results, then
        // declaration emit results.
        //
        // The continueOnDiagnostics flag governs whether or not iteration follows the batch compiler
        // logic and doesn't perform further analysis once diagnostics are produced.  For example,
        // in batch compilation nothing is done if there are any syntactic diagnostics.  Clients
        // can override this if they still want to procede in those cases.
        public compile(resolvePath: (path: string) => string, continueOnDiagnostics = false): Iterator<CompileResult> {
            return new CompilerIterator(this, resolvePath, continueOnDiagnostics);
        }

        //
        // Pull typecheck infrastructure
        //

        public getSyntacticDiagnostics(fileName: string): Diagnostic[] {
            fileName = TypeScript.switchToForwardSlashes(fileName)
            return this.getDocument(fileName).diagnostics();
        }

        /** Used for diagnostics in tests */
        private getSyntaxTree(fileName: string): SyntaxTree {
            return this.getDocument(fileName).syntaxTree();
        }

        private getSourceUnit(fileName: string): SourceUnit {
            return this.getDocument(fileName).sourceUnit();
        }

        public getSemanticDiagnostics(fileName: string): Diagnostic[] {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var document = this.getDocument(fileName);

            var startTime = (new Date()).getTime();
            PullTypeResolver.typeCheck(this.compilationSettings(), this.semanticInfoChain, document)
            var endTime = (new Date()).getTime();

            typeCheckTime += endTime - startTime;

            var errors = this.semanticInfoChain.getDiagnostics(fileName);

            errors = ArrayUtilities.distinct(errors, Diagnostic.equals);
            errors.sort((d1, d2) => {
                if (d1.fileName() < d2.fileName()) {
                    return -1;
                }
                else if (d1.fileName() > d2.fileName()) {
                    return 1;
                }

                if (d1.start() < d2.start()) {
                    return -1;
                }
                else if (d1.start() > d2.start()) {
                    return 1;
                }

                // For multiple errors reported on the same file at the same position.
                var code1 = diagnosticInformationMap[d1.diagnosticKey()].code;
                var code2 = diagnosticInformationMap[d2.diagnosticKey()].code;
                if (code1 < code2) {
                    return -1;
                }
                else if (code1 > code2) {
                    return 1;
                }

                return 0;
            });

            return errors;
        }

        public getCompilerOptionsDiagnostics(resolvePath: (path: string) => string): Diagnostic[] {
            var emitOptions = new EmitOptions(this, resolvePath);
            var emitDiagnostic = emitOptions.diagnostic();
            if (emitDiagnostic) {
                return [emitDiagnostic];
            }
            return sentinelEmptyArray;
        }

        public resolveAllFiles() {
            var fileNames = this.fileNames();
            for (var i = 0, n = fileNames.length; i < n; i++) {
                this.getSemanticDiagnostics(fileNames[i]);
            }
        }

        public getSymbolOfDeclaration(decl: PullDecl): PullSymbol {
            if (!decl) {
                return null;
            }

            var resolver = this.semanticInfoChain.getResolver();
            var ast = this.semanticInfoChain.getASTForDecl(decl);
            if (!ast) {
                return null;
            }

            var enclosingDecl = resolver.getEnclosingDecl(decl);
            if (ast.kind() === SyntaxKind.GetAccessor || ast.kind() === SyntaxKind.SetAccessor) {
                return this.getSymbolOfDeclaration(enclosingDecl);
            }

            return resolver.resolveAST(ast, /*inContextuallyTypedAssignment:*/false, new PullTypeResolutionContext(resolver));
        }

        private extractResolutionContextFromAST(resolver: PullTypeResolver, ast: AST, document: Document, propagateContextualTypes: boolean): { ast: AST; enclosingDecl: PullDecl; resolutionContext: PullTypeResolutionContext; inContextuallyTypedAssignment: boolean; inWithBlock: boolean; } {
            var scriptName = document.fileName;

            var enclosingDecl: PullDecl = null;
            var enclosingDeclAST: AST = null;
            var inContextuallyTypedAssignment = false;
            var inWithBlock = false;

            var resolutionContext = new PullTypeResolutionContext(resolver);

            if (!ast) {
                return null;
            }

            var path = this.getASTPath(ast);

            // Extract infromation from path
            for (var i = 0 , n = path.length; i < n; i++) {
                var current = path[i];

                switch (current.kind()) {
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.SimpleArrowFunctionExpression:
                    case SyntaxKind.ParenthesizedArrowFunctionExpression:
                        if (propagateContextualTypes) {
                            resolver.resolveAST(current, /*inContextuallyTypedAssignment*/ true, resolutionContext);
                        }
                        break;

                    //case SyntaxKind.Parameter:
                    //    var parameter = <Parameter> current;
                    //    inContextuallyTypedAssignment = parameter.typeExpr !== null;

                    //    this.extractResolutionContextForVariable(inContextuallyTypedAssignment, propagateContextualTypes, resolver, resolutionContext, enclosingDecl, parameter, parameter.init);
                    //    break;

                    case SyntaxKind.MemberVariableDeclaration:
                        var memberVariable = <MemberVariableDeclaration> current;
                        inContextuallyTypedAssignment = memberVariable.variableDeclarator.typeAnnotation !== null;

                        this.extractResolutionContextForVariable(inContextuallyTypedAssignment, propagateContextualTypes, resolver, resolutionContext, enclosingDecl, memberVariable, memberVariable.variableDeclarator.equalsValueClause);
                        break;

                    case SyntaxKind.VariableDeclarator:
                        var variableDeclarator = <VariableDeclarator>current;
                        inContextuallyTypedAssignment = variableDeclarator.typeAnnotation !== null;

                        this.extractResolutionContextForVariable(inContextuallyTypedAssignment, propagateContextualTypes, resolver, resolutionContext, enclosingDecl, variableDeclarator, variableDeclarator.equalsValueClause);
                        break;

                    case SyntaxKind.InvocationExpression:
                    case SyntaxKind.ObjectCreationExpression:
                        if (propagateContextualTypes) {
                            var isNew = current.kind() === SyntaxKind.ObjectCreationExpression;
                            var callExpression = <InvocationExpression>current;
                            var contextualType: PullTypeSymbol = null;

                            // Check if we are in an argumnt for a call, propagate the contextual typing
                            if ((i + 2 < n) && callExpression.argumentList === path[i + 1] && callExpression.argumentList.arguments === path[i + 2]) {
                                var callResolutionResults = new PullAdditionalCallResolutionData();
                                if (isNew) {
                                    resolver.resolveObjectCreationExpression(callExpression, resolutionContext, callResolutionResults);
                                }
                                else {
                                    resolver.resolveInvocationExpression(callExpression, resolutionContext, callResolutionResults);
                                }

                                // Find the index in the arguments list
                                if (callResolutionResults.actualParametersContextTypeSymbols) {
                                    var argExpression = path[i + 3];
                                    if (argExpression) {
                                        for (var j = 0, m = callExpression.argumentList.arguments.nonSeparatorCount(); j < m; j++) {
                                            if (callExpression.argumentList.arguments.nonSeparatorAt(j) === argExpression) {
                                                var callContextualType = callResolutionResults.actualParametersContextTypeSymbols[j];
                                                if (callContextualType) {
                                                    contextualType = callContextualType;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                // Just resolve the call expression
                                if (isNew) {
                                    resolver.resolveObjectCreationExpression(callExpression, resolutionContext);
                                }
                                else {
                                    resolver.resolveInvocationExpression(callExpression, resolutionContext);
                                }
                            }

                            resolutionContext.pushNewContextualType(contextualType);
                        }

                        break;

                    case SyntaxKind.ArrayLiteralExpression:
                        if (propagateContextualTypes) {
                            // Propagate the child element type
                            var contextualType: PullTypeSymbol = null;
                            var currentContextualType = resolutionContext.getContextualType();
                            if (currentContextualType && currentContextualType.isArrayNamedTypeReference()) {
                                contextualType = currentContextualType.getElementType();
                            }

                            resolutionContext.pushNewContextualType(contextualType);
                        }

                        break;

                    case SyntaxKind.ObjectLiteralExpression:
                        if (propagateContextualTypes) {
                            var objectLiteralExpression = <ObjectLiteralExpression>current;
                            var objectLiteralResolutionContext = new PullAdditionalObjectLiteralResolutionData();
                            resolver.resolveObjectLiteralExpression(objectLiteralExpression, inContextuallyTypedAssignment, resolutionContext, objectLiteralResolutionContext);

                            // find the member in the path
                            var memeberAST = (path[i + 1] && path[i + 1].kind() === SyntaxKind.SeparatedList) ? path[i + 2] : path[i + 1];
                            if (memeberAST) {
                                // Propagate the member contextual type
                                var contextualType: PullTypeSymbol = null;
                                var memberDecls = objectLiteralExpression.propertyAssignments;
                                if (memberDecls && objectLiteralResolutionContext.membersContextTypeSymbols) {
                                    for (var j = 0, m = memberDecls.nonSeparatorCount(); j < m; j++) {
                                        if (memberDecls.nonSeparatorAt(j) === memeberAST) {
                                            var memberContextualType = objectLiteralResolutionContext.membersContextTypeSymbols[j];
                                            if (memberContextualType) {
                                                contextualType = memberContextualType;
                                                break;
                                            }
                                        }
                                    }
                                }

                                resolutionContext.pushNewContextualType(contextualType);
                            }
                        }

                        break;

                    case SyntaxKind.AssignmentExpression:
                        if (propagateContextualTypes) {
                            var assignmentExpression = <BinaryExpression>current;
                            var contextualType: PullTypeSymbol = null;

                            if (path[i + 1] && path[i + 1] === assignmentExpression.right) {
                                // propagate the left hand side type as a contextual type
                                var leftType = resolver.resolveAST(assignmentExpression.left, inContextuallyTypedAssignment, resolutionContext).type;
                                if (leftType) {
                                    inContextuallyTypedAssignment = true;
                                    contextualType = leftType;
                                }
                            }

                            resolutionContext.pushNewContextualType(contextualType);
                        }

                        break;

                    case SyntaxKind.CastExpression:
                        var castExpression = <CastExpression>current;
                        if (!(i + 1 < n && path[i + 1] === castExpression.type)) {
                            // We are outside the cast term
                            if (propagateContextualTypes) {
                                var contextualType: PullTypeSymbol = null;
                                var typeSymbol = resolver.resolveAST(castExpression, inContextuallyTypedAssignment, resolutionContext).type;

                                // Set the context type
                                if (typeSymbol) {
                                    inContextuallyTypedAssignment = true;
                                    contextualType = typeSymbol;
                                }

                                resolutionContext.pushNewContextualType(contextualType);
                            }
                        }

                        break;

                    case SyntaxKind.ReturnStatement:
                        if (propagateContextualTypes) {
                            var returnStatement = <ReturnStatement>current;
                            var contextualType: PullTypeSymbol = null;

                            if (enclosingDecl && (enclosingDecl.kind & PullElementKind.SomeFunction)) {
                                var typeAnnotation = ASTHelpers.getType(enclosingDeclAST);
                                if (typeAnnotation) {
                                    // The containing function has a type annotation, propagate it as the contextual type
                                    var returnTypeSymbol = resolver.resolveTypeReference(typeAnnotation, resolutionContext);
                                    if (returnTypeSymbol) {
                                        inContextuallyTypedAssignment = true;
                                        contextualType = returnTypeSymbol;
                                    }
                                }
                                else {
                                    // No type annotation, check if there is a contextual type enforced on the function, and propagate that
                                    var currentContextualType = resolutionContext.getContextualType();
                                if (currentContextualType && currentContextualType.isFunction()) {
                                    var contextualSignatures = currentContextualType.kind == PullElementKind.ConstructorType
                                        ? currentContextualType.getConstructSignatures()
                                        : currentContextualType.getCallSignatures();
                                    var currentContextualTypeSignatureSymbol = contextualSignatures[0];
                                        var currentContextualTypeReturnTypeSymbol = currentContextualTypeSignatureSymbol.returnType;
                                        if (currentContextualTypeReturnTypeSymbol) {
                                            inContextuallyTypedAssignment = true;
                                            contextualType = currentContextualTypeReturnTypeSymbol;
                                        }
                                    }
                                }
                            }

                            resolutionContext.pushNewContextualType(contextualType);
                        }

                        break;

                    case SyntaxKind.ObjectType:
                        // ObjectType are just like Object Literals are bound when needed, ensure we have a decl, by forcing it to be 
                        // resolved before descending into it.
                        if (propagateContextualTypes && TypeScript.isTypesOnlyLocation(current)) {
                            resolver.resolveAST(current, /*inContextuallyTypedAssignment*/ false, resolutionContext);
                        }

                        break;

                    case SyntaxKind.WithStatement:
                        inWithBlock = true;
                        break;

                    case SyntaxKind.Block:
                        inContextuallyTypedAssignment = false;
                        break;
                }

                // Record enclosing Decl
                var decl = this.semanticInfoChain.getDeclForAST(current);
                if (decl) {
                    enclosingDecl = decl;
                    enclosingDeclAST = current;
                }
            }

            // if the found AST is a named, we want to check for previous dotted expressions,
            // since those will give us the right typing
            if (ast && ast.parent && ast.kind() === SyntaxKind.IdentifierName) {
                if (ast.parent.kind() === SyntaxKind.MemberAccessExpression) {
                    if ((<MemberAccessExpression>ast.parent).name === ast) {
                        ast = ast.parent;
                    }
                }
                else if (ast.parent.kind() === SyntaxKind.QualifiedName) {
                    if ((<QualifiedName>ast.parent).right === ast) {
                        ast = ast.parent;
                    }
                }
            }

            return {
                ast: ast,
                enclosingDecl: enclosingDecl,
                resolutionContext: resolutionContext,
                inContextuallyTypedAssignment: inContextuallyTypedAssignment,
                inWithBlock: inWithBlock
            };
        }

        private extractResolutionContextForVariable(
            inContextuallyTypedAssignment: boolean,
            propagateContextualTypes: boolean,
            resolver: PullTypeResolver,
            resolutionContext: PullTypeResolutionContext,
            enclosingDecl: PullDecl,
            assigningAST: AST,
            init: AST): void {
            if (inContextuallyTypedAssignment) {
                if (propagateContextualTypes) {
                    resolver.resolveAST(assigningAST, /*inContextuallyTypedAssignment*/false, resolutionContext);
                    var varSymbol = this.semanticInfoChain.getSymbolForAST(assigningAST);

                    var contextualType: PullTypeSymbol = null;
                    if (varSymbol && inContextuallyTypedAssignment) {
                        contextualType = varSymbol.type;
                    }

                    resolutionContext.pushNewContextualType(contextualType);

                    if (init) {
                        resolver.resolveAST(init, inContextuallyTypedAssignment, resolutionContext);
                    }
                }
            }
        }

        private getASTPath(ast: AST): AST[] {
            var result: AST[] = [];

            while (ast) {
                result.unshift(ast);
                ast = ast.parent;
            }

            return result;
        }

        public pullGetSymbolInformationFromAST(ast: AST, document: Document): PullSymbolInfo {
            var resolver = this.semanticInfoChain.getResolver();
            var context = this.extractResolutionContextFromAST(resolver, ast, document, /*propagateContextualTypes*/ true);
            if (!context || context.inWithBlock) {
                return null;
            }

            ast = context.ast;
            var symbol = resolver.resolveAST(ast, context.inContextuallyTypedAssignment, context.resolutionContext);

            if (!symbol) {
                Debug.assert(
                    ast.kind() === SyntaxKind.SourceUnit,
                    "No symbol was found for ast and ast was not source unit. Ast Kind: " + SyntaxKind[ast.kind()] );
                return null;
            }

            if (symbol.isTypeReference()) {
                symbol = (<PullTypeReferenceSymbol>symbol).getReferencedTypeSymbol();
            }

            var aliasSymbol = this.semanticInfoChain.getAliasSymbolForAST(ast);

            return {
                symbol: symbol,
                aliasSymbol: aliasSymbol,
                ast: ast,
                enclosingScopeSymbol: this.getSymbolOfDeclaration(context.enclosingDecl)
            };
        }

        public pullGetCallInformationFromAST(ast: AST, document: Document): PullCallSymbolInfo {
            // AST has to be a call expression
            if (ast.kind() !== SyntaxKind.InvocationExpression && ast.kind() !== SyntaxKind.ObjectCreationExpression) {
                return null;
            }

            var isNew = ast.kind() === SyntaxKind.ObjectCreationExpression;

            var resolver = this.semanticInfoChain.getResolver();
            var context = this.extractResolutionContextFromAST(resolver, ast, document, /*propagateContextualTypes*/ true);
            if (!context || context.inWithBlock) {
                return null;
            }

            var callResolutionResults = new PullAdditionalCallResolutionData();

            if (isNew) {
                resolver.resolveObjectCreationExpression(<ObjectCreationExpression>ast, context.resolutionContext, callResolutionResults);
            }
            else {
                resolver.resolveInvocationExpression(<InvocationExpression>ast, context.resolutionContext, callResolutionResults);
            }

            return {
                targetSymbol: callResolutionResults.targetSymbol,
                resolvedSignatures: callResolutionResults.resolvedSignatures,
                candidateSignature: callResolutionResults.candidateSignature,
                ast: ast,
                enclosingScopeSymbol: this.getSymbolOfDeclaration(context.enclosingDecl),
                isConstructorCall: isNew
            };
        }

        public pullGetVisibleMemberSymbolsFromAST(ast: AST, document: Document): PullVisibleSymbolsInfo {
            var resolver = this.semanticInfoChain.getResolver();
            var context = this.extractResolutionContextFromAST(resolver, ast, document, /*propagateContextualTypes*/ true);
            if (!context || context.inWithBlock) {
                return null;
            }

            var symbols = resolver.getVisibleMembersFromExpression(ast, context.enclosingDecl, context.resolutionContext);
            if (!symbols) {
                return null;
            }

            return {
                symbols: symbols,
                enclosingScopeSymbol: this.getSymbolOfDeclaration(context.enclosingDecl)
            };
        }

        public pullGetVisibleDeclsFromAST(ast: AST, document: Document): PullDecl[] {
            var resolver = this.semanticInfoChain.getResolver();
            var context = this.extractResolutionContextFromAST(resolver, ast, document, /*propagateContextualTypes*/ false);
            if (!context || context.inWithBlock) {
                return null;
            }

            return resolver.getVisibleDecls(context.enclosingDecl);
        }

        public pullGetContextualMembersFromAST(ast: AST, document: Document): PullVisibleSymbolsInfo {
            // Input has to be an object literal
            if (ast.kind() !== SyntaxKind.ObjectLiteralExpression) {
                return null;
            }

            var resolver = this.semanticInfoChain.getResolver();
            var context = this.extractResolutionContextFromAST(resolver, ast, document, /*propagateContextualTypes*/ true);
            if (!context || context.inWithBlock) {
                return null;
            }

            var members = resolver.getVisibleContextSymbols(context.enclosingDecl, context.resolutionContext);

            return {
                symbols: members,
                enclosingScopeSymbol: this.getSymbolOfDeclaration(context.enclosingDecl)
            };
        }

        public pullGetDeclInformation(decl: PullDecl, ast: AST, document: Document): PullSymbolInfo {
            var resolver = this.semanticInfoChain.getResolver();

            // Note: we not only need to resolve down to the path the ast is at, but we also need to 
            // resolve the path to where the decl is at.  This is because, currently, some decls 
            // can't fin their symbols unless they are first resolved.  For example, a property of 
            // an object literal must be resolved before its symbol can be retrieved.
            var context = this.extractResolutionContextFromAST(resolver, ast, document, /*propagateContextualTypes*/ true);
            if (!context || context.inWithBlock) {
                return null;
            }

            var astForDecl = decl.ast();
            if (!astForDecl) {
                return null;
            }

            var astForDeclContext = this.extractResolutionContextFromAST(resolver, astForDecl, this.getDocument(astForDecl.fileName()), /*propagateContextualTypes*/ true);
            if (!astForDeclContext) {
                return null;
            }

            var symbol = decl.getSymbol();
            resolver.resolveDeclaredSymbol(symbol, context.resolutionContext);
            symbol.setUnresolved();

            return {
                symbol: symbol,
                aliasSymbol: null,
                ast: ast,
                enclosingScopeSymbol: this.getSymbolOfDeclaration(context.enclosingDecl)
            };
        }

        public topLevelDeclaration(fileName: string) : PullDecl {
            return this.semanticInfoChain.topLevelDecl(fileName);
        }

        public getDeclForAST(ast: AST): PullDecl {
            return this.semanticInfoChain.getDeclForAST(ast);
        }

        public fileNames(): string[] {
            return this.semanticInfoChain.fileNames();
        }

        public topLevelDecl(fileName: string): PullDecl {
            return this.semanticInfoChain.topLevelDecl(fileName);
        }

        private static getLocationText(location: Location, resolvePath: (path: string) => string): string {
            return resolvePath(location.fileName()) + "(" + (location.line() + 1) + "," + (location.character() + 1) + ")";
        }

        public static getFullDiagnosticText(diagnostic: Diagnostic, resolvePath: (path: string) => string): string {
            var result = "";
            if (diagnostic.fileName()) {
                result += this.getLocationText(diagnostic, resolvePath) + ": ";
            }

            result += diagnostic.message();

            var additionalLocations = diagnostic.additionalLocations();
            if (additionalLocations.length > 0) {
                result += " " + getLocalizedText(DiagnosticCode.Additional_locations, null) + Environment.newLine;

                for (var i = 0, n = additionalLocations.length; i < n; i++) {
                    result += "\t" + this.getLocationText(additionalLocations[i], resolvePath) + Environment.newLine;
                }
            }
            else {
                result += Environment.newLine;
            }

            return result;
        }
    }

    enum CompilerPhase {
        Syntax,
        Semantics,
        EmitOptionsValidation,
        Emit,
        DeclarationEmit,
    }

    class CompilerIterator implements Iterator<CompileResult> {
        private compilerPhase: CompilerPhase;
        private index: number = -1;
        private fileNames: string[] = null;
        private _current: CompileResult = null;
        private _emitOptions: EmitOptions = null;
        private _sharedEmitter: Emitter = null;
        private _sharedDeclarationEmitter: DeclarationEmitter = null;
        private hadSyntacticDiagnostics: boolean = false;
        private hadSemanticDiagnostics: boolean = false;
        private hadEmitDiagnostics: boolean = false;

        constructor(private compiler: TypeScriptCompiler,
                    private resolvePath: (path: string) => string,
                    private continueOnDiagnostics: boolean,
                    startingPhase = CompilerPhase.Syntax) {
            this.fileNames = compiler.fileNames();
            this.compilerPhase = startingPhase;
        }

        public current(): CompileResult {
            return this._current;
        }

        public moveNext(): boolean {
            this._current = null;

            // Attempt to move the iterator 'one step' forward.  Note: this may produce no result
            // (for example, if we're emitting everything to a single file).  So only return once
            // we actually have a result, or we're done enumerating.
            while (this.moveNextInternal()) {
                if (this._current) {
                    return true;
                }
            }

            return false;
        }

        private moveNextInternal(): boolean {
            this.index++;

            // If we're at the end of hte set of files the compiler knows about, then move to the
            // next phase of compilation.
            while (this.shouldMoveToNextPhase()) {
                this.index = 0;
                this.compilerPhase++;
            }

            if (this.compilerPhase > CompilerPhase.DeclarationEmit) {
                // We're totally done.
                return false;
            }

            switch (this.compilerPhase) {
                case CompilerPhase.Syntax:
                    return this.moveNextSyntaxPhase();
                case CompilerPhase.Semantics:
                    return this.moveNextSemanticsPhase();
                case CompilerPhase.EmitOptionsValidation:
                    return this.moveNextEmitOptionsValidationPhase();
                case CompilerPhase.Emit:
                    return this.moveNextEmitPhase();
                case CompilerPhase.DeclarationEmit:
                    return this.moveNextDeclarationEmitPhase();
            }
        }

        private shouldMoveToNextPhase(): boolean {
            switch (this.compilerPhase) {
                case CompilerPhase.EmitOptionsValidation:
                    // Only one step in emit validation.  We're done once we do that step.
                    return this.index === 1;

                case CompilerPhase.Syntax:
                case CompilerPhase.Semantics:
                    // Each of these phases are done when we've processed the last file.
                    return this.index === this.fileNames.length;

                case CompilerPhase.Emit:
                case CompilerPhase.DeclarationEmit:
                    // Emitting is done when we get 'one' past the end of hte file list.  This is
                    // because we use that step to collect the results from the shared emitter.
                    return this.index === (this.fileNames.length + 1);
            }

            return false;
        }

        private moveNextSyntaxPhase(): boolean {
            Debug.assert(this.index >= 0 && this.index < this.fileNames.length);
            var fileName = this.fileNames[this.index];

            var diagnostics = this.compiler.getSyntacticDiagnostics(fileName);
            if (diagnostics.length) {
                if (!this.continueOnDiagnostics) {
                    this.hadSyntacticDiagnostics = true;
                }

                this._current = CompileResult.fromDiagnostics(diagnostics);
            }

            return true;
        }

        private moveNextSemanticsPhase(): boolean {
            // Don't move forward if there were syntax diagnostics.
            if (this.hadSyntacticDiagnostics) {
                return false;
            }

            Debug.assert(this.index >= 0 && this.index < this.fileNames.length);
            var fileName = this.fileNames[this.index];
            var diagnostics = this.compiler.getSemanticDiagnostics(fileName);
            if (diagnostics.length) {
                if (!this.continueOnDiagnostics) {
                    this.hadSemanticDiagnostics = true;
                }

                this._current = CompileResult.fromDiagnostics(diagnostics);
            }

            return true;
        }

        private moveNextEmitOptionsValidationPhase(): boolean {
            Debug.assert(!this.hadSyntacticDiagnostics);

            if (!this._emitOptions) {
                this._emitOptions = new EmitOptions(this.compiler, this.resolvePath);
            }

            if (this._emitOptions.diagnostic()) {
                if (!this.continueOnDiagnostics) {
                    this.hadEmitDiagnostics = true;
                }

                this._current = CompileResult.fromDiagnostics([this._emitOptions.diagnostic()]);
            }

            return true;
        }

        private moveNextEmitPhase(): boolean {
            Debug.assert(!this.hadSyntacticDiagnostics);
            Debug.assert(this._emitOptions);

            if (this.hadEmitDiagnostics) {
                return false;
            }

            Debug.assert(this.index >= 0 && this.index <= this.fileNames.length);
            if (this.index < this.fileNames.length) {
                var fileName = this.fileNames[this.index];
                var document = this.compiler.getDocument(fileName);

                // Try to emit this single document.  It will either get emitted to its own file
                // (in which case we'll have our call back triggered), or it will get added to the
                // shared emitter (and we'll take care of it after all the files are done.
                this._sharedEmitter = this.compiler._emitDocument(
                    document, this._emitOptions,
                    outputFiles => { this._current = CompileResult.fromOutputFiles(outputFiles) },
                    this._sharedEmitter);
                return true;
            }

            // If we've moved past all the files, and we have a multi-input->single-output
            // emitter set up.  Then add the outputs of that emitter to the results.
            if (this.index === this.fileNames.length && this._sharedEmitter) {
                // Collect shared emit result.
                this._current = CompileResult.fromOutputFiles(this._sharedEmitter.getOutputFiles());
            }

            return true;
        }

        private moveNextDeclarationEmitPhase(): boolean {
            Debug.assert(!this.hadSyntacticDiagnostics);
            Debug.assert(!this.hadEmitDiagnostics);
            if (this.hadSemanticDiagnostics) {
                return false;
            }

            if (!this.compiler.compilationSettings().generateDeclarationFiles()) {
                return false;
            }

            Debug.assert(this.index >= 0 && this.index <= this.fileNames.length);
            if (this.index < this.fileNames.length) {
                var fileName = this.fileNames[this.index];
                var document = this.compiler.getDocument(fileName);

                this._sharedDeclarationEmitter = this.compiler._emitDocumentDeclarations(
                    document, this._emitOptions,
                    file => { this._current = CompileResult.fromOutputFiles([file]); },
                    this._sharedDeclarationEmitter);
                return true;
            }

            // If we've moved past all the files, and we have a multi-input->single-output
            // emitter set up.  Then add the outputs of that emitter to the results.
            if (this.index === this.fileNames.length && this._sharedDeclarationEmitter) {
                this._current = CompileResult.fromOutputFiles([this._sharedDeclarationEmitter.getOutputFile()]);
            }

            return true;
        }
    }

    export function compareDataObjects(dst: any, src: any): boolean {
        for (var e in dst) {
            if (typeof dst[e] === "object") {
                if (!compareDataObjects(dst[e], src[e]))
                    return false;
            }
            else if (typeof dst[e] !== "function") {
                if (dst[e] !== src[e])
                    return false;
            }
        }
        return true;
    }
}