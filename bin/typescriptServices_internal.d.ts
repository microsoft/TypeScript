/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare module ts {
    const enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1,
    }
    const enum Comparison {
        LessThan = -1,
        EqualTo = 0,
        GreaterThan = 1,
    }
    interface StringSet extends Map<any> {
    }
    function forEach<T, U>(array: T[], callback: (element: T) => U): U;
    function contains<T>(array: T[], value: T): boolean;
    function indexOf<T>(array: T[], value: T): number;
    function countWhere<T>(array: T[], predicate: (x: T) => boolean): number;
    function filter<T>(array: T[], f: (x: T) => boolean): T[];
    function map<T, U>(array: T[], f: (x: T) => U): U[];
    function concatenate<T>(array1: T[], array2: T[]): T[];
    function deduplicate<T>(array: T[]): T[];
    function sum(array: any[], prop: string): number;
    /**
     * Returns the last element of an array if non-empty, undefined otherwise.
     */
    function lastOrUndefined<T>(array: T[]): T;
    function binarySearch(array: number[], value: number): number;
    function hasProperty<T>(map: Map<T>, key: string): boolean;
    function getProperty<T>(map: Map<T>, key: string): T;
    function isEmpty<T>(map: Map<T>): boolean;
    function clone<T>(object: T): T;
    function forEachValue<T, U>(map: Map<T>, callback: (value: T) => U): U;
    function forEachKey<T, U>(map: Map<T>, callback: (key: string) => U): U;
    function lookUp<T>(map: Map<T>, key: string): T;
    function mapToArray<T>(map: Map<T>): T[];
    /**
     * Creates a map from the elements of an array.
     *
     * @param array the array of input elements.
     * @param makeKey a function that produces a key for a given element.
     *
     * This function makes no effort to avoid collisions; if any two elements produce
     * the same key with the given 'makeKey' function, then the element with the higher
     * index in the array will be the one associated with the produced key.
     */
    function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<T>;
    var localizedDiagnosticMessages: Map<string>;
    function getLocaleSpecificMessage(message: string): string;
    function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: any[]): Diagnostic;
    function createCompilerDiagnostic(message: DiagnosticMessage, ...args: any[]): Diagnostic;
    function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: any[]): DiagnosticMessageChain;
    function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain;
    function flattenDiagnosticChain(file: SourceFile, start: number, length: number, diagnosticChain: DiagnosticMessageChain, newLine: string): Diagnostic;
    function compareValues<T>(a: T, b: T): Comparison;
    function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): number;
    function deduplicateSortedDiagnostics(diagnostics: Diagnostic[]): Diagnostic[];
    function normalizeSlashes(path: string): string;
    function getRootLength(path: string): number;
    var directorySeparator: string;
    function normalizePath(path: string): string;
    function getDirectoryPath(path: string): string;
    function isUrl(path: string): boolean;
    function isRootedDiskPath(path: string): boolean;
    function getNormalizedPathComponents(path: string, currentDirectory: string): string[];
    function getNormalizedAbsolutePath(filename: string, currentDirectory: string): string;
    function getNormalizedPathFromPathComponents(pathComponents: string[]): string;
    function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: (fileName: string) => string, isAbsolutePathAnUrl: boolean): string;
    function getBaseFilename(path: string): string;
    function combinePaths(path1: string, path2: string): string;
    function fileExtensionIs(path: string, extension: string): boolean;
    function removeFileExtension(path: string): string;
    /** NOTE: This *does not* support the full escape characters, it only supports the subset that can be used in file names
      * or string literals. If the information encoded in the map changes, this needs to be revisited. */
    function escapeString(s: string): string;
    interface ObjectAllocator {
        getNodeConstructor(kind: SyntaxKind): new () => Node;
        getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
    }
    var objectAllocator: ObjectAllocator;
    const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }
    module Debug {
        function shouldAssert(level: AssertionLevel): boolean;
        function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void;
        function fail(message?: string): void;
    }
}
declare module ts {
    interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        readFile(fileName: string, encoding?: string): string;
        writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void;
        watchFile?(fileName: string, callback: (fileName: string) => void): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(directoryName: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
    }
    interface FileWatcher {
        close(): void;
    }
    var sys: System;
}
declare module ts {
    interface ReferencePathMatchResult {
        fileReference?: FileReference;
        diagnosticMessage?: DiagnosticMessage;
        isNoDefaultLib?: boolean;
    }
    function getDeclarationOfKind(symbol: Symbol, kind: SyntaxKind): Declaration;
    interface StringSymbolWriter extends SymbolWriter {
        string(): string;
    }
    function getSingleLineStringWriter(): StringSymbolWriter;
    function releaseStringWriter(writer: StringSymbolWriter): void;
    function getFullWidth(node: Node): number;
    function hasFlag(val: number, flag: number): boolean;
    function containsParseError(node: Node): boolean;
    function getSourceFileOfNode(node: Node): SourceFile;
    function nodePosToString(node: Node): string;
    function getStartPosOfNode(node: Node): number;
    function isMissingNode(node: Node): boolean;
    function getTokenPosOfNode(node: Node, sourceFile?: SourceFile): number;
    function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node): string;
    function getTextOfNodeFromSourceText(sourceText: string, node: Node): string;
    function getTextOfNode(node: Node): string;
    function escapeIdentifier(identifier: string): string;
    function unescapeIdentifier(identifier: string): string;
    function declarationNameToString(name: DeclarationName): string;
    function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): Diagnostic;
    function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain, newLine: string): Diagnostic;
    function getErrorSpanForNode(node: Node): Node;
    function isExternalModule(file: SourceFile): boolean;
    function isDeclarationFile(file: SourceFile): boolean;
    function isConstEnumDeclaration(node: Node): boolean;
    function isConst(node: Node): boolean;
    function isLet(node: Node): boolean;
    function isPrologueDirective(node: Node): boolean;
    function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode?: SourceFile): CommentRange[];
    function getJsDocComments(node: Node, sourceFileOfNode: SourceFile): CommentRange[];
    var fullTripleSlashReferencePathRegEx: RegExp;
    function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T;
    function isAnyFunction(node: Node): boolean;
    function isFunctionBlock(node: Node): boolean;
    function isObjectLiteralMethod(node: Node): boolean;
    function getContainingFunction(node: Node): FunctionLikeDeclaration;
    function getThisContainer(node: Node, includeArrowFunctions: boolean): Node;
    function getSuperContainer(node: Node): Node;
    function getInvokedExpression(node: CallLikeExpression): Expression;
    function isExpression(node: Node): boolean;
    function isExternalModuleImportDeclaration(node: Node): boolean;
    function getExternalModuleImportDeclarationExpression(node: Node): Expression;
    function isInternalModuleImportDeclaration(node: Node): boolean;
    function hasDotDotDotToken(node: Node): boolean;
    function hasQuestionToken(node: Node): boolean;
    function hasRestParameters(s: SignatureDeclaration): boolean;
    function isLiteralKind(kind: SyntaxKind): boolean;
    function isTextualLiteralKind(kind: SyntaxKind): boolean;
    function isTemplateLiteralKind(kind: SyntaxKind): boolean;
    function isInAmbientContext(node: Node): boolean;
    function isDeclaration(node: Node): boolean;
    function isStatement(n: Node): boolean;
    function isDeclarationOrFunctionExpressionOrCatchVariableName(name: Node): boolean;
    function getClassBaseTypeNode(node: ClassDeclaration): TypeReferenceNode;
    function getClassImplementedTypeNodes(node: ClassDeclaration): NodeArray<TypeReferenceNode>;
    function getInterfaceBaseTypeNodes(node: InterfaceDeclaration): NodeArray<TypeReferenceNode>;
    function getHeritageClause(clauses: NodeArray<HeritageClause>, kind: SyntaxKind): HeritageClause;
    function tryResolveScriptReference(program: Program, sourceFile: SourceFile, reference: FileReference): SourceFile;
    function getAncestor(node: Node, kind: SyntaxKind): Node;
    function getFileReferenceFromReferencePath(comment: string, commentRange: CommentRange): ReferencePathMatchResult;
    function isKeyword(token: SyntaxKind): boolean;
    function isTrivia(token: SyntaxKind): boolean;
    function isModifier(token: SyntaxKind): boolean;
}
declare module ts {
    interface ListItemInfo {
        listItemIndex: number;
        list: Node;
    }
    function getEndLinePosition(line: number, sourceFile: SourceFile): number;
    function getStartPositionOfLine(line: number, sourceFile: SourceFile): number;
    function getStartLinePositionForPosition(position: number, sourceFile: SourceFile): number;
    function rangeContainsRange(r1: TextRange, r2: TextRange): boolean;
    function startEndContainsRange(start: number, end: number, range: TextRange): boolean;
    function rangeContainsStartEnd(range: TextRange, start: number, end: number): boolean;
    function rangeOverlapsWithStartEnd(r1: TextRange, start: number, end: number): boolean;
    function startEndOverlapsWithStartEnd(start1: number, end1: number, start2: number, end2: number): boolean;
    function findListItemInfo(node: Node): ListItemInfo;
    function findChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFile): Node;
    function findContainingList(node: Node): Node;
    function getTouchingWord(sourceFile: SourceFile, position: number): Node;
    function getTouchingPropertyName(sourceFile: SourceFile, position: number): Node;
    /** Returns the token if position is in [start, end) or if position === end and includeItemAtEndPosition(token) === true */
    function getTouchingToken(sourceFile: SourceFile, position: number, includeItemAtEndPosition?: (n: Node) => boolean): Node;
    /** Returns a token if position is in [start-of-leading-trivia, end) */
    function getTokenAtPosition(sourceFile: SourceFile, position: number): Node;
    /**
      * The token on the left of the position is the token that strictly includes the position
      * or sits to the left of the cursor if it is on a boundary. For example
      *
      *   fo|o               -> will return foo
      *   foo <comment> |bar -> will return foo
      *
      */
    function findTokenOnLeftOfPosition(file: SourceFile, position: number): Node;
    function findNextToken(previousToken: Node, parent: Node): Node;
    function findPrecedingToken(position: number, sourceFile: SourceFile, startNode?: Node): Node;
    function getNodeModifiers(node: Node): string;
    function getTypeArgumentOrTypeParameterList(node: Node): NodeArray<Node>;
    function isToken(n: Node): boolean;
    function isComment(kind: SyntaxKind): boolean;
    function isPunctuation(kind: SyntaxKind): boolean;
    function isInsideTemplateLiteral(node: LiteralExpression, position: number): boolean;
    function compareDataObjects(dst: any, src: any): boolean;
}
declare module ts {
    function isFirstDeclarationOfSymbolParameter(symbol: Symbol): boolean;
    function symbolPart(text: string, symbol: Symbol): SymbolDisplayPart;
    function displayPart(text: string, kind: SymbolDisplayPartKind, symbol?: Symbol): SymbolDisplayPart;
    function spacePart(): SymbolDisplayPart;
    function keywordPart(kind: SyntaxKind): SymbolDisplayPart;
    function punctuationPart(kind: SyntaxKind): SymbolDisplayPart;
    function operatorPart(kind: SyntaxKind): SymbolDisplayPart;
    function textPart(text: string): SymbolDisplayPart;
    function lineBreakPart(): SymbolDisplayPart;
    function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[];
    function typeToDisplayParts(typechecker: TypeChecker, type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[];
    function symbolToDisplayParts(typeChecker: TypeChecker, symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): SymbolDisplayPart[];
    function signatureToDisplayParts(typechecker: TypeChecker, signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[];
}
