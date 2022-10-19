import * as ts from "./_namespaces/ts";

/** @internal */
export const resolvingEmptyArray: never[] = [];

/** @internal */
export const externalHelpersModuleNameText = "tslib";

/** @internal */
export const defaultMaximumTruncationLength = 160;
/** @internal */
export const noTruncationMaximumTruncationLength = 1_000_000;

/** @internal */
export function getDeclarationOfKind<T extends ts.Declaration>(symbol: ts.Symbol, kind: T["kind"]): T | undefined {
    const declarations = symbol.declarations;
    if (declarations) {
        for (const declaration of declarations) {
            if (declaration.kind === kind) {
                return declaration as T;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getDeclarationsOfKind<T extends ts.Declaration>(symbol: ts.Symbol, kind: T["kind"]): T[] {
    return ts.filter(symbol.declarations || ts.emptyArray, d => d.kind === kind) as T[];
}

/** @internal */
export function createSymbolTable(symbols?: readonly ts.Symbol[]): ts.SymbolTable {
    const result = new ts.Map<ts.__String, ts.Symbol>();
    if (symbols) {
        for (const symbol of symbols) {
            result.set(symbol.escapedName, symbol);
        }
    }
    return result;
}

/** @internal */
export function isTransientSymbol(symbol: ts.Symbol): symbol is ts.TransientSymbol {
    return (symbol.flags & ts.SymbolFlags.Transient) !== 0;
}

const stringWriter = createSingleLineStringWriter();

function createSingleLineStringWriter(): ts.EmitTextWriter {
    let str = "";
    const writeText: (text: string) => void = text => str += text;
    return {
        getText: () => str,
        write: writeText,
        rawWrite: writeText,
        writeKeyword: writeText,
        writeOperator: writeText,
        writePunctuation: writeText,
        writeSpace: writeText,
        writeStringLiteral: writeText,
        writeLiteral: writeText,
        writeParameter: writeText,
        writeProperty: writeText,
        writeSymbol: (s, _) => writeText(s),
        writeTrailingSemicolon: writeText,
        writeComment: writeText,
        getTextPos: () => str.length,
        getLine: () => 0,
        getColumn: () => 0,
        getIndent: () => 0,
        isAtStartOfLine: () => false,
        hasTrailingComment: () => false,
        hasTrailingWhitespace: () => !!str.length && ts.isWhiteSpaceLike(str.charCodeAt(str.length - 1)),

        // Completely ignore indentation for string writers.  And map newlines to
        // a single space.
        writeLine: () => str += " ",
        increaseIndent: ts.noop,
        decreaseIndent: ts.noop,
        clear: () => str = "",
        trackSymbol: () => false,
        reportInaccessibleThisError: ts.noop,
        reportInaccessibleUniqueSymbolError: ts.noop,
        reportPrivateInBaseOfClassExpression: ts.noop,
    };
}

/** @internal */
export function changesAffectModuleResolution(oldOptions: ts.CompilerOptions, newOptions: ts.CompilerOptions): boolean {
    return oldOptions.configFilePath !== newOptions.configFilePath ||
        optionsHaveModuleResolutionChanges(oldOptions, newOptions);
}

/** @internal */
export function optionsHaveModuleResolutionChanges(oldOptions: ts.CompilerOptions, newOptions: ts.CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, ts.moduleResolutionOptionDeclarations);
}

/** @internal */
export function changesAffectingProgramStructure(oldOptions: ts.CompilerOptions, newOptions: ts.CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, ts.optionsAffectingProgramStructure);
}

/** @internal */
export function optionsHaveChanges(oldOptions: ts.CompilerOptions, newOptions: ts.CompilerOptions, optionDeclarations: readonly ts.CommandLineOption[]) {
    return oldOptions !== newOptions && optionDeclarations.some(o =>
        !isJsonEqual(getCompilerOptionValue(oldOptions, o), getCompilerOptionValue(newOptions, o)));
}

/** @internal */
export function forEachAncestor<T>(node: ts.Node, callback: (n: ts.Node) => T | undefined | "quit"): T | undefined {
    while (true) {
        const res = callback(node);
        if (res === "quit") return undefined;
        if (res !== undefined) return res;
        if (ts.isSourceFile(node)) return undefined;
        node = node.parent;
    }
}

/** @internal */
/**
 * Calls `callback` for each entry in the map, returning the first truthy result.
 * Use `map.forEach` instead for normal iteration.
 */
export function forEachEntry<K, V, U>(map: ts.ReadonlyESMap<K, V>, callback: (value: V, key: K) => U | undefined): U | undefined {
    const iterator = map.entries();
    for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
        const [key, value] = iterResult.value;
        const result = callback(value, key);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/** @internal */
/** `forEachEntry` for just keys. */
export function forEachKey<K, T>(map: ts.ReadonlyCollection<K>, callback: (key: K) => T | undefined): T | undefined {
    const iterator = map.keys();
    for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
        const result = callback(iterResult.value);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/** @internal */
/** Copy entries from `source` to `target`. */
export function copyEntries<K, V>(source: ts.ReadonlyESMap<K, V>, target: ts.ESMap<K, V>): void {
    source.forEach((value, key) => {
        target.set(key, value);
    });
}

/** @internal */
export function usingSingleLineStringWriter(action: (writer: ts.EmitTextWriter) => void): string {
    const oldString = stringWriter.getText();
    try {
        action(stringWriter);
        return stringWriter.getText();
    }
    finally {
        stringWriter.clear();
        stringWriter.writeKeyword(oldString);
    }
}

/** @internal */
export function getFullWidth(node: ts.Node) {
    return node.end - node.pos;
}

/** @internal */
export function getResolvedModule(sourceFile: ts.SourceFile | undefined, moduleNameText: string, mode: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined): ts.ResolvedModuleFull | undefined {
    return sourceFile && sourceFile.resolvedModules && sourceFile.resolvedModules.get(moduleNameText, mode);
}

/** @internal */
export function setResolvedModule(sourceFile: ts.SourceFile, moduleNameText: string, resolvedModule: ts.ResolvedModuleFull | undefined, mode: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined): void {
    if (!sourceFile.resolvedModules) {
        sourceFile.resolvedModules = ts.createModeAwareCache();
    }

    sourceFile.resolvedModules.set(moduleNameText, mode, resolvedModule);
}

/** @internal */
export function setResolvedTypeReferenceDirective(sourceFile: ts.SourceFile, typeReferenceDirectiveName: string, resolvedTypeReferenceDirective?: ts.ResolvedTypeReferenceDirective): void {
    if (!sourceFile.resolvedTypeReferenceDirectiveNames) {
        sourceFile.resolvedTypeReferenceDirectiveNames = ts.createModeAwareCache();
    }

    sourceFile.resolvedTypeReferenceDirectiveNames.set(typeReferenceDirectiveName, /*mode*/ undefined, resolvedTypeReferenceDirective);
}

/** @internal */
export function projectReferenceIsEqualTo(oldRef: ts.ProjectReference, newRef: ts.ProjectReference) {
    return oldRef.path === newRef.path &&
        !oldRef.prepend === !newRef.prepend &&
        !oldRef.circular === !newRef.circular;
}

/** @internal */
export function moduleResolutionIsEqualTo(oldResolution: ts.ResolvedModuleFull, newResolution: ts.ResolvedModuleFull): boolean {
    return oldResolution.isExternalLibraryImport === newResolution.isExternalLibraryImport &&
        oldResolution.extension === newResolution.extension &&
        oldResolution.resolvedFileName === newResolution.resolvedFileName &&
        oldResolution.originalPath === newResolution.originalPath &&
        packageIdIsEqual(oldResolution.packageId, newResolution.packageId);
}

function packageIdIsEqual(a: ts.PackageId | undefined, b: ts.PackageId | undefined): boolean {
    return a === b || !!a && !!b && a.name === b.name && a.subModuleName === b.subModuleName && a.version === b.version;
}

/** @internal */
export function packageIdToPackageName({ name, subModuleName }: ts.PackageId): string {
    return subModuleName ? `${name}/${subModuleName}` : name;
}

/** @internal */
export function packageIdToString(packageId: ts.PackageId): string {
    return `${packageIdToPackageName(packageId)}@${packageId.version}`;
}

/** @internal */
export function typeDirectiveIsEqualTo(oldResolution: ts.ResolvedTypeReferenceDirective, newResolution: ts.ResolvedTypeReferenceDirective): boolean {
    return oldResolution.resolvedFileName === newResolution.resolvedFileName
        && oldResolution.primary === newResolution.primary
        && oldResolution.originalPath === newResolution.originalPath;
}

/** @internal */
export function hasChangesInResolutions<T>(
    names: readonly string[] | readonly ts.FileReference[],
    newResolutions: readonly T[],
    oldResolutions: ts.ModeAwareCache<T> | undefined,
    oldSourceFile: ts.SourceFile | undefined,
    comparer: (oldResolution: T, newResolution: T) => boolean): boolean {
    ts.Debug.assert(names.length === newResolutions.length);

    for (let i = 0; i < names.length; i++) {
        const newResolution = newResolutions[i];
        const entry = names[i];
        // We lower-case all type references because npm automatically lowercases all packages. See GH#9824.
        const name = !ts.isString(entry) ? entry.fileName.toLowerCase() : entry;
        const mode = !ts.isString(entry) ? ts.getModeForFileReference(entry, oldSourceFile?.impliedNodeFormat) : oldSourceFile && ts.getModeForResolutionAtIndex(oldSourceFile, i);
        const oldResolution = oldResolutions && oldResolutions.get(name, mode);
        const changed =
            oldResolution
                ? !newResolution || !comparer(oldResolution, newResolution)
                : newResolution;
        if (changed) {
            return true;
        }
    }
    return false;
}

// Returns true if this node contains a parse error anywhere underneath it.
/** @internal */
export function containsParseError(node: ts.Node): boolean {
    aggregateChildData(node);
    return (node.flags & ts.NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
}

function aggregateChildData(node: ts.Node): void {
    if (!(node.flags & ts.NodeFlags.HasAggregatedChildData)) {
        // A node is considered to contain a parse error if:
        //  a) the parser explicitly marked that it had an error
        //  b) any of it's children reported that it had an error.
        const thisNodeOrAnySubNodesHasError = ((node.flags & ts.NodeFlags.ThisNodeHasError) !== 0) ||
            ts.forEachChild(node, containsParseError);

        // If so, mark ourselves accordingly.
        if (thisNodeOrAnySubNodesHasError) {
            (node as Mutable<ts.Node>).flags |= ts.NodeFlags.ThisNodeOrAnySubNodesHasError;
        }

        // Also mark that we've propagated the child information to this node.  This way we can
        // always consult the bit directly on this node without needing to check its children
        // again.
        (node as Mutable<ts.Node>).flags |= ts.NodeFlags.HasAggregatedChildData;
    }
}

/** @internal */
export function getSourceFileOfNode(node: ts.Node): ts.SourceFile;
/** @internal */
export function getSourceFileOfNode(node: ts.Node | undefined): ts.SourceFile | undefined;
/** @internal */
export function getSourceFileOfNode(node: ts.Node): ts.SourceFile {
    while (node && node.kind !== ts.SyntaxKind.SourceFile) {
        node = node.parent;
    }
    return node as ts.SourceFile;
}

/** @internal */
export function getSourceFileOfModule(module: ts.Symbol) {
    return getSourceFileOfNode(module.valueDeclaration || getNonAugmentationDeclaration(module));
}

/** @internal */
export function isPlainJsFile(file: ts.SourceFile | undefined, checkJs: boolean | undefined): boolean {
    return !!file && (file.scriptKind === ts.ScriptKind.JS || file.scriptKind === ts.ScriptKind.JSX) && !file.checkJsDirective && checkJs === undefined;
}

/** @internal */
export function isStatementWithLocals(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
            return true;
    }
    return false;
}

/** @internal */
export function getStartPositionOfLine(line: number, sourceFile: ts.SourceFileLike): number {
    ts.Debug.assert(line >= 0);
    return ts.getLineStarts(sourceFile)[line];
}

// This is a useful function for debugging purposes.
/** @internal */
export function nodePosToString(node: ts.Node): string {
    const file = getSourceFileOfNode(node);
    const loc = ts.getLineAndCharacterOfPosition(file, node.pos);
    return `${file.fileName}(${loc.line + 1},${loc.character + 1})`;
}

/** @internal */
export function getEndLinePosition(line: number, sourceFile: ts.SourceFileLike): number {
    ts.Debug.assert(line >= 0);
    const lineStarts = ts.getLineStarts(sourceFile);

    const lineIndex = line;
    const sourceText = sourceFile.text;
    if (lineIndex + 1 === lineStarts.length) {
        // last line - return EOF
        return sourceText.length - 1;
    }
    else {
        // current line start
        const start = lineStarts[lineIndex];
        // take the start position of the next line - 1 = it should be some line break
        let pos = lineStarts[lineIndex + 1] - 1;
        ts.Debug.assert(ts.isLineBreak(sourceText.charCodeAt(pos)));
        // walk backwards skipping line breaks, stop the the beginning of current line.
        // i.e:
        // <some text>
        // $ <- end of line for this position should match the start position
        while (start <= pos && ts.isLineBreak(sourceText.charCodeAt(pos))) {
            pos--;
        }
        return pos;
    }
}

/** @internal */
/**
 * Returns a value indicating whether a name is unique globally or within the current file.
 * Note: This does not consider whether a name appears as a free identifier or not, so at the expression `x.y` this includes both `x` and `y`.
 */
export function isFileLevelUniqueName(sourceFile: ts.SourceFile, name: string, hasGlobalName?: ts.PrintHandlers["hasGlobalName"]): boolean {
    return !(hasGlobalName && hasGlobalName(name)) && !sourceFile.identifiers.has(name);
}

// Returns true if this node is missing from the actual source code. A 'missing' node is different
// from 'undefined/defined'. When a node is undefined (which can happen for optional nodes
// in the tree), it is definitely missing. However, a node may be defined, but still be
// missing.  This happens whenever the parser knows it needs to parse something, but can't
// get anything in the source code that it expects at that location. For example:
//
//          let a: ;
//
// Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source
// code). So the parser will attempt to parse out a type, and will create an actual node.
// However, this node will be 'missing' in the sense that no actual source-code/tokens are
// contained within it.
/** @internal */
export function nodeIsMissing(node: ts.Node | undefined): boolean {
    if (node === undefined) {
        return true;
    }

    return node.pos === node.end && node.pos >= 0 && node.kind !== ts.SyntaxKind.EndOfFileToken;
}

/** @internal */
export function nodeIsPresent(node: ts.Node | undefined): boolean {
    return !nodeIsMissing(node);
}

function insertStatementsAfterPrologue<T extends ts.Statement>(to: T[], from: readonly T[] | undefined, isPrologueDirective: (node: ts.Node) => boolean): T[] {
    if (from === undefined || from.length === 0) return to;
    let statementIndex = 0;
    // skip all prologue directives to insert at the correct position
    for (; statementIndex < to.length; ++statementIndex) {
        if (!isPrologueDirective(to[statementIndex])) {
            break;
        }
    }
    to.splice(statementIndex, 0, ...from);
    return to;
}

function insertStatementAfterPrologue<T extends ts.Statement>(to: T[], statement: T | undefined, isPrologueDirective: (node: ts.Node) => boolean): T[] {
    if (statement === undefined) return to;
    let statementIndex = 0;
    // skip all prologue directives to insert at the correct position
    for (; statementIndex < to.length; ++statementIndex) {
        if (!isPrologueDirective(to[statementIndex])) {
            break;
        }
    }
    to.splice(statementIndex, 0, statement);
    return to;
}


function isAnyPrologueDirective(node: ts.Node) {
    return isPrologueDirective(node) || !!(getEmitFlags(node) & ts.EmitFlags.CustomPrologue);
}

/** @internal */
/**
 * Prepends statements to an array while taking care of prologue directives.
 */
export function insertStatementsAfterStandardPrologue<T extends ts.Statement>(to: T[], from: readonly T[] | undefined): T[] {
    return insertStatementsAfterPrologue(to, from, isPrologueDirective);
}

/** @internal */
export function insertStatementsAfterCustomPrologue<T extends ts.Statement>(to: T[], from: readonly T[] | undefined): T[] {
    return insertStatementsAfterPrologue(to, from, isAnyPrologueDirective);
}

/** @internal */
/**
 * Prepends statements to an array while taking care of prologue directives.
 */
export function insertStatementAfterStandardPrologue<T extends ts.Statement>(to: T[], statement: T | undefined): T[] {
    return insertStatementAfterPrologue(to, statement, isPrologueDirective);
}

/** @internal */
export function insertStatementAfterCustomPrologue<T extends ts.Statement>(to: T[], statement: T | undefined): T[] {
    return insertStatementAfterPrologue(to, statement, isAnyPrologueDirective);
}

/** @internal */
/**
 * Determine if the given comment is a triple-slash
 *
 * @return true if the comment is a triple-slash comment else false
 */
export function isRecognizedTripleSlashComment(text: string, commentPos: number, commentEnd: number) {
    // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
    // so that we don't end up computing comment string and doing match for all // comments
    if (text.charCodeAt(commentPos + 1) === ts.CharacterCodes.slash &&
        commentPos + 2 < commentEnd &&
        text.charCodeAt(commentPos + 2) === ts.CharacterCodes.slash) {
        const textSubStr = text.substring(commentPos, commentEnd);
        return fullTripleSlashReferencePathRegEx.test(textSubStr) ||
            fullTripleSlashAMDReferencePathRegEx.test(textSubStr) ||
            fullTripleSlashReferenceTypeReferenceDirectiveRegEx.test(textSubStr) ||
            defaultLibReferenceRegEx.test(textSubStr) ?
            true : false;
    }
    return false;
}

/** @internal */
export function isPinnedComment(text: string, start: number) {
    return text.charCodeAt(start + 1) === ts.CharacterCodes.asterisk &&
        text.charCodeAt(start + 2) === ts.CharacterCodes.exclamation;
}

/** @internal */
export function createCommentDirectivesMap(sourceFile: ts.SourceFile, commentDirectives: ts.CommentDirective[]): ts.CommentDirectivesMap {
    const directivesByLine = new ts.Map(
        commentDirectives.map(commentDirective => ([
            `${ts.getLineAndCharacterOfPosition(sourceFile, commentDirective.range.end).line}`,
            commentDirective,
        ]))
    );

    const usedLines = new ts.Map<string, boolean>();

    return { getUnusedExpectations, markUsed };

    function getUnusedExpectations() {
        return ts.arrayFrom(directivesByLine.entries())
            .filter(([line, directive]) => directive.type === ts.CommentDirectiveType.ExpectError && !usedLines.get(line))
            .map(([_, directive]) => directive);
    }

    function markUsed(line: number) {
        if (!directivesByLine.has(`${line}`)) {
            return false;
        }

        usedLines.set(`${line}`, true);
        return true;
    }
}

/** @internal */
export function getTokenPosOfNode(node: ts.Node, sourceFile?: ts.SourceFileLike, includeJsDoc?: boolean): number {
    // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
    // want to skip trivia because this will launch us forward to the next token.
    if (nodeIsMissing(node)) {
        return node.pos;
    }

    if (ts.isJSDocNode(node) || node.kind === ts.SyntaxKind.JsxText) {
        // JsxText cannot actually contain comments, even though the scanner will think it sees comments
        return ts.skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
    }

    if (includeJsDoc && ts.hasJSDocNodes(node)) {
        return getTokenPosOfNode(node.jsDoc![0], sourceFile);
    }

    // For a syntax list, it is possible that one of its children has JSDocComment nodes, while
    // the syntax list itself considers them as normal trivia. Therefore if we simply skip
    // trivia for the list, we may have skipped the JSDocComment as well. So we should process its
    // first child to determine the actual position of its first token.
    if (node.kind === ts.SyntaxKind.SyntaxList && (node as ts.SyntaxList)._children.length > 0) {
        return getTokenPosOfNode((node as ts.SyntaxList)._children[0], sourceFile, includeJsDoc);
    }

    return ts.skipTrivia(
        (sourceFile || getSourceFileOfNode(node)).text,
        node.pos,
        /*stopAfterLineBreak*/ false,
        /*stopAtComments*/ false,
        isInJSDoc(node));
}

/** @internal */
export function getNonDecoratorTokenPosOfNode(node: ts.Node, sourceFile?: ts.SourceFileLike): number {
    const lastDecorator = !nodeIsMissing(node) && ts.canHaveModifiers(node) ? ts.findLast(node.modifiers, ts.isDecorator) : undefined;
    if (!lastDecorator) {
        return getTokenPosOfNode(node, sourceFile);
    }

    return ts.skipTrivia((sourceFile || getSourceFileOfNode(node)).text, lastDecorator.end);
}

/** @internal */
export function getSourceTextOfNodeFromSourceFile(sourceFile: ts.SourceFile, node: ts.Node, includeTrivia = false): string {
    return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
}

function isJSDocTypeExpressionOrChild(node: ts.Node): boolean {
    return !!ts.findAncestor(node, ts.isJSDocTypeExpression);
}

/** @internal */
export function isExportNamespaceAsDefaultDeclaration(node: ts.Node): boolean {
    return !!(ts.isExportDeclaration(node) && node.exportClause && ts.isNamespaceExport(node.exportClause) && node.exportClause.name.escapedText === "default");
}

/** @internal */
export function getTextOfNodeFromSourceText(sourceText: string, node: ts.Node, includeTrivia = false): string {
    if (nodeIsMissing(node)) {
        return "";
    }

    let text = sourceText.substring(includeTrivia ? node.pos : ts.skipTrivia(sourceText, node.pos), node.end);

    if (isJSDocTypeExpressionOrChild(node)) {
        // strip space + asterisk at line start
        text = text.split(/\r\n|\n|\r/).map(line => ts.trimStringStart(line.replace(/^\s*\*/, ""))).join("\n");
    }

    return text;
}

/** @internal */
export function getTextOfNode(node: ts.Node, includeTrivia = false): string {
    return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
}

function getPos(range: ts.Node) {
    return range.pos;
}

/** @internal */
/**
 * Note: it is expected that the `nodeArray` and the `node` are within the same file.
 * For example, searching for a `SourceFile` in a `SourceFile[]` wouldn't work.
 */
export function indexOfNode(nodeArray: readonly ts.Node[], node: ts.Node) {
    return ts.binarySearch(nodeArray, node, getPos, ts.compareValues);
}

/** @internal */
/**
 * Gets flags that control emit behavior of a node.
 */
export function getEmitFlags(node: ts.Node): ts.EmitFlags {
    const emitNode = node.emitNode;
    return emitNode && emitNode.flags || 0;
}

interface ScriptTargetFeatures {
    [key: string]: { [key: string]: string[] | undefined };
}

/** @internal */
export function getScriptTargetFeatures(): ScriptTargetFeatures {
    return {
        es2015: {
            Array: ["find", "findIndex", "fill", "copyWithin", "entries", "keys", "values"],
            RegExp: ["flags", "sticky", "unicode"],
            Reflect: ["apply", "construct", "defineProperty", "deleteProperty", "get"," getOwnPropertyDescriptor", "getPrototypeOf", "has", "isExtensible", "ownKeys", "preventExtensions", "set", "setPrototypeOf"],
            ArrayConstructor: ["from", "of"],
            ObjectConstructor: ["assign", "getOwnPropertySymbols", "keys", "is", "setPrototypeOf"],
            NumberConstructor: ["isFinite", "isInteger", "isNaN", "isSafeInteger", "parseFloat", "parseInt"],
            Math: ["clz32", "imul", "sign", "log10", "log2", "log1p", "expm1", "cosh", "sinh", "tanh", "acosh", "asinh", "atanh", "hypot", "trunc", "fround", "cbrt"],
            Map: ["entries", "keys", "values"],
            Set: ["entries", "keys", "values"],
            Promise: ts.emptyArray,
            PromiseConstructor: ["all", "race", "reject", "resolve"],
            Symbol: ["for", "keyFor"],
            WeakMap: ["entries", "keys", "values"],
            WeakSet: ["entries", "keys", "values"],
            Iterator: ts.emptyArray,
            AsyncIterator: ts.emptyArray,
            String: ["codePointAt", "includes", "endsWith", "normalize", "repeat", "startsWith", "anchor", "big", "blink", "bold", "fixed", "fontcolor", "fontsize", "italics", "link", "small", "strike", "sub", "sup"],
            StringConstructor: ["fromCodePoint", "raw"]
        },
        es2016: {
            Array: ["includes"]
        },
        es2017: {
            Atomics: ts.emptyArray,
            SharedArrayBuffer: ts.emptyArray,
            String: ["padStart", "padEnd"],
            ObjectConstructor: ["values", "entries", "getOwnPropertyDescriptors"],
            DateTimeFormat: ["formatToParts"]
        },
        es2018: {
            Promise: ["finally"],
            RegExpMatchArray: ["groups"],
            RegExpExecArray: ["groups"],
            RegExp: ["dotAll"],
            Intl: ["PluralRules"],
            AsyncIterable: ts.emptyArray,
            AsyncIterableIterator: ts.emptyArray,
            AsyncGenerator: ts.emptyArray,
            AsyncGeneratorFunction: ts.emptyArray,
            NumberFormat: ["formatToParts"]
        },
        es2019: {
            Array: ["flat", "flatMap"],
            ObjectConstructor: ["fromEntries"],
            String: ["trimStart", "trimEnd", "trimLeft", "trimRight"],
            Symbol: ["description"]
        },
        es2020: {
            BigInt: ts.emptyArray,
            BigInt64Array: ts.emptyArray,
            BigUint64Array: ts.emptyArray,
            PromiseConstructor: ["allSettled"],
            SymbolConstructor: ["matchAll"],
            String: ["matchAll"],
            DataView: ["setBigInt64", "setBigUint64", "getBigInt64", "getBigUint64"],
            RelativeTimeFormat: ["format", "formatToParts", "resolvedOptions"]
        },
        es2021: {
            PromiseConstructor: ["any"],
            String: ["replaceAll"]
        },
        es2022: {
            Array: ["at"],
            String: ["at"],
            Int8Array: ["at"],
            Uint8Array: ["at"],
            Uint8ClampedArray: ["at"],
            Int16Array: ["at"],
            Uint16Array: ["at"],
            Int32Array: ["at"],
            Uint32Array: ["at"],
            Float32Array: ["at"],
            Float64Array: ["at"],
            BigInt64Array: ["at"],
            BigUint64Array: ["at"],
            ObjectConstructor: ["hasOwn"],
            Error: ["cause"]
        }
    };
}

/** @internal */
export const enum GetLiteralTextFlags {
    None = 0,
    NeverAsciiEscape = 1 << 0,
    JsxAttributeEscape = 1 << 1,
    TerminateUnterminatedLiterals = 1 << 2,
    AllowNumericSeparator = 1 << 3
}

/** @internal */
export function getLiteralText(node: ts.LiteralLikeNode, sourceFile: ts.SourceFile | undefined, flags: GetLiteralTextFlags) {
    // If we don't need to downlevel and we can reach the original source text using
    // the node's parent reference, then simply get the text as it was originally written.
    if (sourceFile && canUseOriginalText(node, flags)) {
        return getSourceTextOfNodeFromSourceFile(sourceFile, node);
    }

    // If we can't reach the original source text, use the canonical form if it's a number,
    // or a (possibly escaped) quoted form of the original text if it's string-like.
    switch (node.kind) {
        case ts.SyntaxKind.StringLiteral: {
            const escapeText = flags & GetLiteralTextFlags.JsxAttributeEscape ? escapeJsxAttributeString :
                flags & GetLiteralTextFlags.NeverAsciiEscape || (getEmitFlags(node) & ts.EmitFlags.NoAsciiEscaping) ? escapeString :
                escapeNonAsciiString;
            if ((node as ts.StringLiteral).singleQuote) {
                return "'" + escapeText(node.text, ts.CharacterCodes.singleQuote) + "'";
            }
            else {
                return '"' + escapeText(node.text, ts.CharacterCodes.doubleQuote) + '"';
            }
        }
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateHead:
        case ts.SyntaxKind.TemplateMiddle:
        case ts.SyntaxKind.TemplateTail: {
            // If a NoSubstitutionTemplateLiteral appears to have a substitution in it, the original text
            // had to include a backslash: `not \${a} substitution`.
            const escapeText = flags & GetLiteralTextFlags.NeverAsciiEscape || (getEmitFlags(node) & ts.EmitFlags.NoAsciiEscaping) ? escapeString :
                escapeNonAsciiString;

            const rawText = (node as ts.TemplateLiteralLikeNode).rawText ?? escapeTemplateSubstitution(escapeText(node.text, ts.CharacterCodes.backtick));
            switch (node.kind) {
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                    return "`" + rawText + "`";
                case ts.SyntaxKind.TemplateHead:
                    return "`" + rawText + "${";
                case ts.SyntaxKind.TemplateMiddle:
                    return "}" + rawText + "${";
                case ts.SyntaxKind.TemplateTail:
                    return "}" + rawText + "`";
            }
            break;
        }
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.BigIntLiteral:
            return node.text;
        case ts.SyntaxKind.RegularExpressionLiteral:
            if (flags & GetLiteralTextFlags.TerminateUnterminatedLiterals && node.isUnterminated) {
                return node.text + (node.text.charCodeAt(node.text.length - 1) === ts.CharacterCodes.backslash ? " /" : "/");
            }
            return node.text;
    }

    return ts.Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
}

function canUseOriginalText(node: ts.LiteralLikeNode, flags: GetLiteralTextFlags): boolean {
    if (nodeIsSynthesized(node) || !node.parent || (flags & GetLiteralTextFlags.TerminateUnterminatedLiterals && node.isUnterminated)) {
        return false;
    }

    if (ts.isNumericLiteral(node) && node.numericLiteralFlags & ts.TokenFlags.ContainsSeparator) {
        return !!(flags & GetLiteralTextFlags.AllowNumericSeparator);
    }

    return !ts.isBigIntLiteral(node);
}

/** @internal */
export function getTextOfConstantValue(value: string | number) {
    return ts.isString(value) ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
}

// Make an identifier from an external module name by extracting the string after the last "/" and replacing
// all non-alphanumeric characters with underscores
/** @internal */
export function makeIdentifierFromModuleName(moduleName: string): string {
    return ts.getBaseFileName(moduleName).replace(/^(\d)/, "_$1").replace(/\W/g, "_");
}

/** @internal */
export function isBlockOrCatchScoped(declaration: ts.Declaration) {
    return (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.BlockScoped) !== 0 ||
        isCatchClauseVariableDeclarationOrBindingElement(declaration);
}

/** @internal */
export function isCatchClauseVariableDeclarationOrBindingElement(declaration: ts.Declaration) {
    const node = getRootDeclaration(declaration);
    return node.kind === ts.SyntaxKind.VariableDeclaration && node.parent.kind === ts.SyntaxKind.CatchClause;
}

/** @internal */
export function isAmbientModule(node: ts.Node): node is ts.AmbientModuleDeclaration {
    return ts.isModuleDeclaration(node) && (node.name.kind === ts.SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
}

/** @internal */
export function isModuleWithStringLiteralName(node: ts.Node): node is ts.ModuleDeclaration {
    return ts.isModuleDeclaration(node) && node.name.kind === ts.SyntaxKind.StringLiteral;
}

/** @internal */
export function isNonGlobalAmbientModule(node: ts.Node): node is ts.ModuleDeclaration & { name: ts.StringLiteral } {
    return ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name);
}

/** @internal */
/**
 * An effective module (namespace) declaration is either
 * 1. An actual declaration: namespace X { ... }
 * 2. A Javascript declaration, which is:
 *    An identifier in a nested property access expression: Y in `X.Y.Z = { ... }`
 */
export function isEffectiveModuleDeclaration(node: ts.Node) {
    return ts.isModuleDeclaration(node) || ts.isIdentifier(node);
}

/** @internal */
/** Given a symbol for a module, checks that it is a shorthand ambient module. */
export function isShorthandAmbientModuleSymbol(moduleSymbol: ts.Symbol): boolean {
    return isShorthandAmbientModule(moduleSymbol.valueDeclaration);
}

function isShorthandAmbientModule(node: ts.Node | undefined): boolean {
    // The only kind of module that can be missing a body is a shorthand ambient module.
    return !!node && node.kind === ts.SyntaxKind.ModuleDeclaration && (!(node as ts.ModuleDeclaration).body);
}

/** @internal */
export function isBlockScopedContainerTopLevel(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.SourceFile ||
        node.kind === ts.SyntaxKind.ModuleDeclaration ||
        ts.isFunctionLikeOrClassStaticBlockDeclaration(node);
}

/** @internal */
export function isGlobalScopeAugmentation(module: ts.ModuleDeclaration): boolean {
    return !!(module.flags & ts.NodeFlags.GlobalAugmentation);
}

/** @internal */
export function isExternalModuleAugmentation(node: ts.Node): node is ts.AmbientModuleDeclaration {
    return isAmbientModule(node) && isModuleAugmentationExternal(node);
}

/** @internal */
export function isModuleAugmentationExternal(node: ts.AmbientModuleDeclaration) {
    // external module augmentation is a ambient module declaration that is either:
    // - defined in the top level scope and source file is an external module
    // - defined inside ambient module declaration located in the top level scope and source file not an external module
    switch (node.parent.kind) {
        case ts.SyntaxKind.SourceFile:
            return ts.isExternalModule(node.parent);
        case ts.SyntaxKind.ModuleBlock:
            return isAmbientModule(node.parent.parent) && ts.isSourceFile(node.parent.parent.parent) && !ts.isExternalModule(node.parent.parent.parent);
    }
    return false;
}

/** @internal */
export function getNonAugmentationDeclaration(symbol: ts.Symbol) {
    return symbol.declarations?.find(d => !isExternalModuleAugmentation(d) && !(ts.isModuleDeclaration(d) && isGlobalScopeAugmentation(d)));
}

function isCommonJSContainingModuleKind(kind: ts.ModuleKind) {
    return kind === ts.ModuleKind.CommonJS || kind === ts.ModuleKind.Node16 || kind === ts.ModuleKind.NodeNext;
}

/** @internal */
export function isEffectiveExternalModule(node: ts.SourceFile, compilerOptions: ts.CompilerOptions) {
    return ts.isExternalModule(node) || compilerOptions.isolatedModules || (isCommonJSContainingModuleKind(getEmitModuleKind(compilerOptions)) && !!node.commonJsModuleIndicator);
}

/** @internal */
/**
 * Returns whether the source file will be treated as if it were in strict mode at runtime.
 */
export function isEffectiveStrictModeSourceFile(node: ts.SourceFile, compilerOptions: ts.CompilerOptions) {
    // We can only verify strict mode for JS/TS files
    switch (node.scriptKind) {
        case ts.ScriptKind.JS:
        case ts.ScriptKind.TS:
        case ts.ScriptKind.JSX:
        case ts.ScriptKind.TSX:
            break;
        default:
            return false;
    }
    // Strict mode does not matter for declaration files.
    if (node.isDeclarationFile) {
        return false;
    }
    // If `alwaysStrict` is set, then treat the file as strict.
    if (getStrictOptionValue(compilerOptions, "alwaysStrict")) {
        return true;
    }
    // Starting with a "use strict" directive indicates the file is strict.
    if (ts.startsWithUseStrict(node.statements)) {
        return true;
    }
    if (ts.isExternalModule(node) || compilerOptions.isolatedModules) {
        // ECMAScript Modules are always strict.
        if (getEmitModuleKind(compilerOptions) >= ts.ModuleKind.ES2015) {
            return true;
        }
        // Other modules are strict unless otherwise specified.
        return !compilerOptions.noImplicitUseStrict;
    }
    return false;
}

/** @internal */
export function isAmbientPropertyDeclaration(node: ts.PropertyDeclaration) {
    return !!(node.flags & ts.NodeFlags.Ambient) || hasSyntacticModifier(node, ts.ModifierFlags.Ambient);
}

/** @internal */
export function isBlockScope(node: ts.Node, parentNode: ts.Node | undefined): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.SourceFile:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.CatchClause:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.ClassStaticBlockDeclaration:
            return true;

        case ts.SyntaxKind.Block:
            // function block is not considered block-scope container
            // see comment in binder.ts: bind(...), case for SyntaxKind.Block
            return !ts.isFunctionLikeOrClassStaticBlockDeclaration(parentNode);
    }

    return false;
}

/** @internal */
export function isDeclarationWithTypeParameters(node: ts.Node): node is ts.DeclarationWithTypeParameters;
/** @internal */
export function isDeclarationWithTypeParameters(node: ts.DeclarationWithTypeParameters): node is ts.DeclarationWithTypeParameters {
    switch (node.kind) {
        case ts.SyntaxKind.JSDocCallbackTag:
        case ts.SyntaxKind.JSDocTypedefTag:
        case ts.SyntaxKind.JSDocSignature:
            return true;
        default:
            ts.assertType<ts.DeclarationWithTypeParameterChildren>(node);
            return isDeclarationWithTypeParameterChildren(node);
    }
}

/** @internal */
export function isDeclarationWithTypeParameterChildren(node: ts.Node): node is ts.DeclarationWithTypeParameterChildren;
/** @internal */
export function isDeclarationWithTypeParameterChildren(node: ts.DeclarationWithTypeParameterChildren): node is ts.DeclarationWithTypeParameterChildren {
    switch (node.kind) {
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.JSDocFunctionType:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.JSDocTemplateTag:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return true;
        default:
            ts.assertType<never>(node);
            return false;
    }
}

/** @internal */
export function isAnyImportSyntax(node: ts.Node): node is ts.AnyImportSyntax {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isAnyImportOrBareOrAccessedRequire(node: ts.Node): node is ts.AnyImportOrBareOrAccessedRequire {
    return isAnyImportSyntax(node) || isVariableDeclarationInitializedToBareOrAccessedRequire(node);
}

/** @internal */
export function isLateVisibilityPaintedStatement(node: ts.Node): node is ts.LateVisibilityPaintedStatement {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function hasPossibleExternalModuleReference(node: ts.Node): node is ts.AnyImportOrReExport | ts.ModuleDeclaration | ts.ImportTypeNode | ts.ImportCall {
    return isAnyImportOrReExport(node) || ts.isModuleDeclaration(node) || ts.isImportTypeNode(node) || isImportCall(node);
}

/** @internal */
export function isAnyImportOrReExport(node: ts.Node): node is ts.AnyImportOrReExport {
    return isAnyImportSyntax(node) || ts.isExportDeclaration(node);
}

// Gets the nearest enclosing block scope container that has the provided node
// as a descendant, that is not the provided node.
/** @internal */
export function getEnclosingBlockScopeContainer(node: ts.Node): ts.Node {
    return ts.findAncestor(node.parent, current => isBlockScope(current, current.parent))!;
}

/** @internal */
export function forEachEnclosingBlockScopeContainer(node: ts.Node, cb: (container: ts.Node) => void): void {
    let container = getEnclosingBlockScopeContainer(node);
    while (container) {
        cb(container);
        container = getEnclosingBlockScopeContainer(container);
    }
}

// Return display name of an identifier
// Computed property names will just be emitted as "[<expr>]", where <expr> is the source
// text of the expression in the computed property.
/** @internal */
export function declarationNameToString(name: ts.DeclarationName | ts.QualifiedName | undefined) {
    return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
}

/** @internal */
export function getNameFromIndexInfo(info: ts.IndexInfo): string | undefined {
    return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
}

/** @internal */
export function isComputedNonLiteralName(name: ts.PropertyName): boolean {
    return name.kind === ts.SyntaxKind.ComputedPropertyName && !isStringOrNumericLiteralLike(name.expression);
}

/** @internal */
export function tryGetTextOfPropertyName(name: ts.PropertyName | ts.NoSubstitutionTemplateLiteral): ts.__String | undefined {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.PrivateIdentifier:
            return name.autoGenerateFlags ? undefined : name.escapedText;
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            return ts.escapeLeadingUnderscores(name.text);
        case ts.SyntaxKind.ComputedPropertyName:
            if (isStringOrNumericLiteralLike(name.expression)) return ts.escapeLeadingUnderscores(name.expression.text);
            return undefined;
        default:
            return ts.Debug.assertNever(name);
    }
}

/** @internal */
export function getTextOfPropertyName(name: ts.PropertyName | ts.NoSubstitutionTemplateLiteral): ts.__String {
    return ts.Debug.checkDefined(tryGetTextOfPropertyName(name));
}

/** @internal */
export function entityNameToString(name: ts.EntityNameOrEntityNameExpression | ts.JSDocMemberName | ts.JsxTagNameExpression | ts.PrivateIdentifier): string {
    switch (name.kind) {
        case ts.SyntaxKind.ThisKeyword:
            return "this";
        case ts.SyntaxKind.PrivateIdentifier:
        case ts.SyntaxKind.Identifier:
            return getFullWidth(name) === 0 ? ts.idText(name) : getTextOfNode(name);
        case ts.SyntaxKind.QualifiedName:
            return entityNameToString(name.left) + "." + entityNameToString(name.right);
        case ts.SyntaxKind.PropertyAccessExpression:
            if (ts.isIdentifier(name.name) || ts.isPrivateIdentifier(name.name)) {
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            }
            else {
                return ts.Debug.assertNever(name.name);
            }
        case ts.SyntaxKind.JSDocMemberName:
            return entityNameToString(name.left) + entityNameToString(name.right);
        default:
            return ts.Debug.assertNever(name);
    }
}

/** @internal */
export function createDiagnosticForNode(node: ts.Node, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): ts.DiagnosticWithLocation {
    const sourceFile = getSourceFileOfNode(node);
    return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3);
}

/** @internal */
export function createDiagnosticForNodeArray(sourceFile: ts.SourceFile, nodes: ts.NodeArray<ts.Node>, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): ts.DiagnosticWithLocation {
    const start = ts.skipTrivia(sourceFile.text, nodes.pos);
    return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2, arg3);
}

/** @internal */
export function createDiagnosticForNodeInSourceFile(sourceFile: ts.SourceFile, node: ts.Node, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): ts.DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2, arg3);
}

/** @internal */
export function createDiagnosticForNodeFromMessageChain(node: ts.Node, messageChain: ts.DiagnosticMessageChain, relatedInformation?: ts.DiagnosticRelatedInformation[]): ts.DiagnosticWithLocation {
    const sourceFile = getSourceFileOfNode(node);
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnosticFromMessageChain(sourceFile, span.start, span.length, messageChain, relatedInformation);
}

function assertDiagnosticLocation(file: ts.SourceFile | undefined, start: number, length: number) {
    ts.Debug.assertGreaterThanOrEqual(start, 0);
    ts.Debug.assertGreaterThanOrEqual(length, 0);

    if (file) {
        ts.Debug.assertLessThanOrEqual(start, file.text.length);
        ts.Debug.assertLessThanOrEqual(start + length, file.text.length);
    }
}

/** @internal */
export function createFileDiagnosticFromMessageChain(file: ts.SourceFile, start: number, length: number, messageChain: ts.DiagnosticMessageChain, relatedInformation?: ts.DiagnosticRelatedInformation[]): ts.DiagnosticWithLocation {
    assertDiagnosticLocation(file, start, length);
    return {
        file,
        start,
        length,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation
    };
}

/** @internal */
export function createDiagnosticForFileFromMessageChain(sourceFile: ts.SourceFile, messageChain: ts.DiagnosticMessageChain, relatedInformation?: ts.DiagnosticRelatedInformation[]): ts.DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: 0,
        length: 0,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation
    };
}

/** @internal */
export function createDiagnosticMessageChainFromDiagnostic(diagnostic: ts.DiagnosticRelatedInformation): ts.DiagnosticMessageChain {
    return typeof diagnostic.messageText === "string" ? {
        code: diagnostic.code,
        category: diagnostic.category,
        messageText: diagnostic.messageText,
        next: (diagnostic as ts.DiagnosticMessageChain).next,
    } : diagnostic.messageText;
}

/** @internal */
export function createDiagnosticForRange(sourceFile: ts.SourceFile, range: ts.TextRange, message: ts.DiagnosticMessage): ts.DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: range.pos,
        length: range.end - range.pos,
        code: message.code,
        category: message.category,
        messageText: message.message,
    };
}

/** @internal */
export function getSpanOfTokenAtPosition(sourceFile: ts.SourceFile, pos: number): ts.TextSpan {
    const scanner = ts.createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError:*/ undefined, pos);
    scanner.scan();
    const start = scanner.getTokenPos();
    return ts.createTextSpanFromBounds(start, scanner.getTextPos());
}

function getErrorSpanForArrowFunction(sourceFile: ts.SourceFile, node: ts.ArrowFunction): ts.TextSpan {
    const pos = ts.skipTrivia(sourceFile.text, node.pos);
    if (node.body && node.body.kind === ts.SyntaxKind.Block) {
        const { line: startLine } = ts.getLineAndCharacterOfPosition(sourceFile, node.body.pos);
        const { line: endLine } = ts.getLineAndCharacterOfPosition(sourceFile, node.body.end);
        if (startLine < endLine) {
            // The arrow function spans multiple lines,
            // make the error span be the first line, inclusive.
            return ts.createTextSpan(pos, getEndLinePosition(startLine, sourceFile) - pos + 1);
        }
    }
    return ts.createTextSpanFromBounds(pos, node.end);
}

/** @internal */
export function getErrorSpanForNode(sourceFile: ts.SourceFile, node: ts.Node): ts.TextSpan {
    let errorNode: ts.Node | undefined = node;
    switch (node.kind) {
        case ts.SyntaxKind.SourceFile:
            const pos = ts.skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
            if (pos === sourceFile.text.length) {
                // file is empty - return span for the beginning of the file
                return ts.createTextSpan(0, 0);
            }
            return getSpanOfTokenAtPosition(sourceFile, pos);
        // This list is a work in progress. Add missing node kinds to improve their error
        // spans.
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.NamespaceImport:
            errorNode = (node as ts.NamedDeclaration).name;
            break;
        case ts.SyntaxKind.ArrowFunction:
            return getErrorSpanForArrowFunction(sourceFile, node as ts.ArrowFunction);
        case ts.SyntaxKind.CaseClause:
        case ts.SyntaxKind.DefaultClause:
            const start = ts.skipTrivia(sourceFile.text, (node as ts.CaseOrDefaultClause).pos);
            const end = (node as ts.CaseOrDefaultClause).statements.length > 0 ? (node as ts.CaseOrDefaultClause).statements[0].pos : (node as ts.CaseOrDefaultClause).end;
            return ts.createTextSpanFromBounds(start, end);
    }

    if (errorNode === undefined) {
        // If we don't have a better node, then just set the error on the first token of
        // construct.
        return getSpanOfTokenAtPosition(sourceFile, node.pos);
    }

    ts.Debug.assert(!ts.isJSDoc(errorNode));

    const isMissing = nodeIsMissing(errorNode);
    const pos = isMissing || ts.isJsxText(node)
        ? errorNode.pos
        : ts.skipTrivia(sourceFile.text, errorNode.pos);

    // These asserts should all be satisfied for a properly constructed `errorNode`.
    if (isMissing) {
        ts.Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        ts.Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }
    else {
        ts.Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        ts.Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }

    return ts.createTextSpanFromBounds(pos, errorNode.end);
}

/** @internal */
export function isExternalOrCommonJsModule(file: ts.SourceFile): boolean {
    return (file.externalModuleIndicator || file.commonJsModuleIndicator) !== undefined;
}


/** @internal */
export function isJsonSourceFile(file: ts.SourceFile): file is ts.JsonSourceFile {
    return file.scriptKind === ts.ScriptKind.JSON;
}

/** @internal */
export function isEnumConst(node: ts.EnumDeclaration): boolean {
    return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Const);
}

/** @internal */
export function isDeclarationReadonly(declaration: ts.Declaration): boolean {
    return !!(ts.getCombinedModifierFlags(declaration) & ts.ModifierFlags.Readonly && !ts.isParameterPropertyDeclaration(declaration, declaration.parent));
}

/** @internal */
export function isVarConst(node: ts.VariableDeclaration | ts.VariableDeclarationList): boolean {
    return !!(ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const);
}

/** @internal */
export function isLet(node: ts.Node): boolean {
    return !!(ts.getCombinedNodeFlags(node) & ts.NodeFlags.Let);
}

/** @internal */
export function isSuperCall(n: ts.Node): n is ts.SuperCall {
    return n.kind === ts.SyntaxKind.CallExpression && (n as ts.CallExpression).expression.kind === ts.SyntaxKind.SuperKeyword;
}

/** @internal */
export function isImportCall(n: ts.Node): n is ts.ImportCall {
    return n.kind === ts.SyntaxKind.CallExpression && (n as ts.CallExpression).expression.kind === ts.SyntaxKind.ImportKeyword;
}

/** @internal */
export function isImportMeta(n: ts.Node): n is ts.ImportMetaProperty {
    return ts.isMetaProperty(n)
        && n.keywordToken === ts.SyntaxKind.ImportKeyword
        && n.name.escapedText === "meta";
}

/** @internal */
export function isLiteralImportTypeNode(n: ts.Node): n is ts.LiteralImportTypeNode {
    return ts.isImportTypeNode(n) && ts.isLiteralTypeNode(n.argument) && ts.isStringLiteral(n.argument.literal);
}

/** @internal */
export function isPrologueDirective(node: ts.Node): node is ts.PrologueDirective {
    return node.kind === ts.SyntaxKind.ExpressionStatement
        && (node as ts.ExpressionStatement).expression.kind === ts.SyntaxKind.StringLiteral;
}

/** @internal */
export function isCustomPrologue(node: ts.Statement) {
    return !!(getEmitFlags(node) & ts.EmitFlags.CustomPrologue);
}

/** @internal */
export function isHoistedFunction(node: ts.Statement) {
    return isCustomPrologue(node)
        && ts.isFunctionDeclaration(node);
}

function isHoistedVariable(node: ts.VariableDeclaration) {
    return ts.isIdentifier(node.name)
        && !node.initializer;
}

/** @internal */
export function isHoistedVariableStatement(node: ts.Statement) {
    return isCustomPrologue(node)
        && ts.isVariableStatement(node)
        && ts.every(node.declarationList.declarations, isHoistedVariable);
}

/** @internal */
export function getLeadingCommentRangesOfNode(node: ts.Node, sourceFileOfNode: ts.SourceFile) {
    return node.kind !== ts.SyntaxKind.JsxText ? ts.getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : undefined;
}

/** @internal */
export function getJSDocCommentRanges(node: ts.Node, text: string) {
    const commentRanges = (node.kind === ts.SyntaxKind.Parameter ||
        node.kind === ts.SyntaxKind.TypeParameter ||
        node.kind === ts.SyntaxKind.FunctionExpression ||
        node.kind === ts.SyntaxKind.ArrowFunction ||
        node.kind === ts.SyntaxKind.ParenthesizedExpression ||
        node.kind === ts.SyntaxKind.VariableDeclaration ||
        node.kind === ts.SyntaxKind.ExportSpecifier) ?
        ts.concatenate(ts.getTrailingCommentRanges(text, node.pos), ts.getLeadingCommentRanges(text, node.pos)) :
        ts.getLeadingCommentRanges(text, node.pos);
    // True if the comment starts with '/**' but not if it is '/**/'
    return ts.filter(commentRanges, comment =>
        text.charCodeAt(comment.pos + 1) === ts.CharacterCodes.asterisk &&
        text.charCodeAt(comment.pos + 2) === ts.CharacterCodes.asterisk &&
        text.charCodeAt(comment.pos + 3) !== ts.CharacterCodes.slash);
}

/** @internal */
export const fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
const fullTripleSlashReferenceTypeReferenceDirectiveRegEx = /^(\/\/\/\s*<reference\s+types\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
/** @internal */
export const fullTripleSlashAMDReferencePathRegEx = /^(\/\/\/\s*<amd-dependency\s+path\s*=\s*)(('[^']*')|("[^"]*")).*?\/>/;
const defaultLibReferenceRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)(('[^']*')|("[^"]*"))\s*\/>/;

/** @internal */
export function isPartOfTypeNode(node: ts.Node): boolean {
    if (ts.SyntaxKind.FirstTypeNode <= node.kind && node.kind <= ts.SyntaxKind.LastTypeNode) {
        return true;
    }

    switch (node.kind) {
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.NeverKeyword:
            return true;
        case ts.SyntaxKind.VoidKeyword:
            return node.parent.kind !== ts.SyntaxKind.VoidExpression;
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return ts.isHeritageClause(node.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(node);
        case ts.SyntaxKind.TypeParameter:
            return node.parent.kind === ts.SyntaxKind.MappedType || node.parent.kind === ts.SyntaxKind.InferType;

        // Identifiers and qualified names may be type nodes, depending on their context. Climb
        // above them to find the lowest container
        case ts.SyntaxKind.Identifier:
            // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
            if (node.parent.kind === ts.SyntaxKind.QualifiedName && (node.parent as ts.QualifiedName).right === node) {
                node = node.parent;
            }
            else if (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && (node.parent as ts.PropertyAccessExpression).name === node) {
                node = node.parent;
            }
            // At this point, node is either a qualified name or an identifier
            ts.Debug.assert(node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.QualifiedName || node.kind === ts.SyntaxKind.PropertyAccessExpression,
                "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
            // falls through

        case ts.SyntaxKind.QualifiedName:
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.ThisKeyword: {
            const { parent } = node;
            if (parent.kind === ts.SyntaxKind.TypeQuery) {
                return false;
            }
            if (parent.kind === ts.SyntaxKind.ImportType) {
                return !(parent as ts.ImportTypeNode).isTypeOf;
            }
            // Do not recursively call isPartOfTypeNode on the parent. In the example:
            //
            //     let a: A.B.C;
            //
            // Calling isPartOfTypeNode would consider the qualified name A.B a type node.
            // Only C and A.B.C are type nodes.
            if (ts.SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= ts.SyntaxKind.LastTypeNode) {
                return true;
            }
            switch (parent.kind) {
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                    return ts.isHeritageClause(parent.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(parent);
                case ts.SyntaxKind.TypeParameter:
                    return node === (parent as ts.TypeParameterDeclaration).constraint;
                case ts.SyntaxKind.JSDocTemplateTag:
                    return node === (parent as ts.JSDocTemplateTag).constraint;
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.VariableDeclaration:
                    return node === (parent as ts.HasType).type;
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                    return node === (parent as ts.FunctionLikeDeclaration).type;
                case ts.SyntaxKind.CallSignature:
                case ts.SyntaxKind.ConstructSignature:
                case ts.SyntaxKind.IndexSignature:
                    return node === (parent as ts.SignatureDeclaration).type;
                case ts.SyntaxKind.TypeAssertionExpression:
                    return node === (parent as ts.TypeAssertion).type;
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.NewExpression:
                    return ts.contains((parent as ts.CallExpression).typeArguments, node);
                case ts.SyntaxKind.TaggedTemplateExpression:
                    // TODO (drosen): TaggedTemplateExpressions may eventually support type arguments.
                    return false;
            }
        }
    }

    return false;
}

/** @internal */
export function isChildOfNodeWithKind(node: ts.Node, kind: ts.SyntaxKind): boolean {
    while (node) {
        if (node.kind === kind) {
            return true;
        }
        node = node.parent;
    }
    return false;
}

// Warning: This has the same semantics as the forEach family of functions,
//          in that traversal terminates in the event that 'visitor' supplies a truthy value.
/** @internal */
export function forEachReturnStatement<T>(body: ts.Block | ts.Statement, visitor: (stmt: ts.ReturnStatement) => T): T | undefined {

    return traverse(body);

    function traverse(node: ts.Node): T | undefined {
        switch (node.kind) {
            case ts.SyntaxKind.ReturnStatement:
                return visitor(node as ts.ReturnStatement);
            case ts.SyntaxKind.CaseBlock:
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.WithStatement:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.DefaultClause:
            case ts.SyntaxKind.LabeledStatement:
            case ts.SyntaxKind.TryStatement:
            case ts.SyntaxKind.CatchClause:
                return ts.forEachChild(node, traverse);
        }
    }
}

/** @internal */
export function forEachYieldExpression(body: ts.Block, visitor: (expr: ts.YieldExpression) => void): void {

    return traverse(body);

    function traverse(node: ts.Node): void {
        switch (node.kind) {
            case ts.SyntaxKind.YieldExpression:
                visitor(node as ts.YieldExpression);
                const operand = (node as ts.YieldExpression).expression;
                if (operand) {
                    traverse(operand);
                }
                return;
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
                // These are not allowed inside a generator now, but eventually they may be allowed
                // as local types. Regardless, skip them to avoid the work.
                return;
            default:
                if (ts.isFunctionLike(node)) {
                    if (node.name && node.name.kind === ts.SyntaxKind.ComputedPropertyName) {
                        // Note that we will not include methods/accessors of a class because they would require
                        // first descending into the class. This is by design.
                        traverse(node.name.expression);
                        return;
                    }
                }
                else if (!isPartOfTypeNode(node)) {
                    // This is the general case, which should include mostly expressions and statements.
                    // Also includes NodeArrays.
                    ts.forEachChild(node, traverse);
                }
        }
    }
}

/** @internal */
/**
 * Gets the most likely element type for a TypeNode. This is not an exhaustive test
 * as it assumes a rest argument can only be an array type (either T[], or Array<T>).
 *
 * @param node The type node.
 */
export function getRestParameterElementType(node: ts.TypeNode | undefined) {
    if (node && node.kind === ts.SyntaxKind.ArrayType) {
        return (node as ts.ArrayTypeNode).elementType;
    }
    else if (node && node.kind === ts.SyntaxKind.TypeReference) {
        return ts.singleOrUndefined((node as ts.TypeReferenceNode).typeArguments);
    }
    else {
        return undefined;
    }
}

/** @internal */
export function getMembersOfDeclaration(node: ts.Declaration): ts.NodeArray<ts.ClassElement | ts.TypeElement | ts.ObjectLiteralElement> | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.TypeLiteral:
            return (node as ts.ObjectTypeDeclaration).members;
        case ts.SyntaxKind.ObjectLiteralExpression:
            return (node as ts.ObjectLiteralExpression).properties;
    }
}

/** @internal */
export function isVariableLike(node: ts.Node): node is ts.VariableLikeDeclaration {
    if (node) {
        switch (node.kind) {
            case ts.SyntaxKind.BindingElement:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
            case ts.SyntaxKind.VariableDeclaration:
                return true;
        }
    }
    return false;
}

/** @internal */
export function isVariableLikeOrAccessor(node: ts.Node): node is ts.AccessorDeclaration | ts.VariableLikeDeclaration {
    return isVariableLike(node) || ts.isAccessor(node);
}

/** @internal */
export function isVariableDeclarationInVariableStatement(node: ts.VariableDeclaration) {
    return node.parent.kind === ts.SyntaxKind.VariableDeclarationList
        && node.parent.parent.kind === ts.SyntaxKind.VariableStatement;
}

/** @internal */
export function isCommonJsExportedExpression(node: ts.Node) {
    if (!isInJSFile(node)) return false;
    return (ts.isObjectLiteralExpression(node.parent) && ts.isBinaryExpression(node.parent.parent) && getAssignmentDeclarationKind(node.parent.parent) === ts.AssignmentDeclarationKind.ModuleExports) ||
        isCommonJsExportPropertyAssignment(node.parent);
}

/** @internal */
export function isCommonJsExportPropertyAssignment(node: ts.Node) {
    if (!isInJSFile(node)) return false;
    return (ts.isBinaryExpression(node) && getAssignmentDeclarationKind(node) === ts.AssignmentDeclarationKind.ExportsProperty);
}

/** @internal */
export function isValidESSymbolDeclaration(node: ts.Node): boolean {
    return (ts.isVariableDeclaration(node) ? isVarConst(node) && ts.isIdentifier(node.name) && isVariableDeclarationInVariableStatement(node) :
        ts.isPropertyDeclaration(node) ? hasEffectiveReadonlyModifier(node) && hasStaticModifier(node) :
        ts.isPropertySignature(node) && hasEffectiveReadonlyModifier(node)) || isCommonJsExportPropertyAssignment(node);
}

/** @internal */
export function introducesArgumentsExoticObject(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
            return true;
    }
    return false;
}

/** @internal */
export function unwrapInnermostStatementOfLabel(node: ts.LabeledStatement, beforeUnwrapLabelCallback?: (node: ts.LabeledStatement) => void): ts.Statement {
    while (true) {
        if (beforeUnwrapLabelCallback) {
            beforeUnwrapLabelCallback(node);
        }
        if (node.statement.kind !== ts.SyntaxKind.LabeledStatement) {
            return node.statement;
        }
        node = node.statement as ts.LabeledStatement;
    }
}

/** @internal */
export function isFunctionBlock(node: ts.Node): boolean {
    return node && node.kind === ts.SyntaxKind.Block && ts.isFunctionLike(node.parent);
}

/** @internal */
export function isObjectLiteralMethod(node: ts.Node): node is ts.MethodDeclaration {
    return node && node.kind === ts.SyntaxKind.MethodDeclaration && node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression;
}

/** @internal */
export function isObjectLiteralOrClassExpressionMethodOrAccessor(node: ts.Node): node is ts.MethodDeclaration {
    return (node.kind === ts.SyntaxKind.MethodDeclaration || node.kind === ts.SyntaxKind.GetAccessor || node.kind === ts.SyntaxKind.SetAccessor) &&
        (node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression ||
            node.parent.kind === ts.SyntaxKind.ClassExpression);
}

/** @internal */
export function isIdentifierTypePredicate(predicate: ts.TypePredicate): predicate is ts.IdentifierTypePredicate {
    return predicate && predicate.kind === ts.TypePredicateKind.Identifier;
}

/** @internal */
export function isThisTypePredicate(predicate: ts.TypePredicate): predicate is ts.ThisTypePredicate {
    return predicate && predicate.kind === ts.TypePredicateKind.This;
}

/** @internal */
export function getPropertyAssignment(objectLiteral: ts.ObjectLiteralExpression, key: string, key2?: string): readonly ts.PropertyAssignment[] {
    return objectLiteral.properties.filter((property): property is ts.PropertyAssignment => {
        if (property.kind === ts.SyntaxKind.PropertyAssignment) {
            const propName = tryGetTextOfPropertyName(property.name);
            return key === propName || (!!key2 && key2 === propName);
        }
        return false;
    });
}

/** @internal */
export function getPropertyArrayElementValue(objectLiteral: ts.ObjectLiteralExpression, propKey: string, elementValue: string): ts.StringLiteral | undefined {
    return ts.firstDefined(getPropertyAssignment(objectLiteral, propKey), property =>
        ts.isArrayLiteralExpression(property.initializer) ?
            ts.find(property.initializer.elements, (element): element is ts.StringLiteral => ts.isStringLiteral(element) && element.text === elementValue) :
            undefined);
}

/** @internal */
export function getTsConfigObjectLiteralExpression(tsConfigSourceFile: ts.TsConfigSourceFile | undefined): ts.ObjectLiteralExpression | undefined {
    if (tsConfigSourceFile && tsConfigSourceFile.statements.length) {
        const expression = tsConfigSourceFile.statements[0].expression;
        return ts.tryCast(expression, ts.isObjectLiteralExpression);
    }
}

/** @internal */
export function getTsConfigPropArrayElementValue(tsConfigSourceFile: ts.TsConfigSourceFile | undefined, propKey: string, elementValue: string): ts.StringLiteral | undefined {
    return ts.firstDefined(getTsConfigPropArray(tsConfigSourceFile, propKey), property =>
        ts.isArrayLiteralExpression(property.initializer) ?
            ts.find(property.initializer.elements, (element): element is ts.StringLiteral => ts.isStringLiteral(element) && element.text === elementValue) :
            undefined);
}

/** @internal */
export function getTsConfigPropArray(tsConfigSourceFile: ts.TsConfigSourceFile | undefined, propKey: string): readonly ts.PropertyAssignment[] {
    const jsonObjectLiteral = getTsConfigObjectLiteralExpression(tsConfigSourceFile);
    return jsonObjectLiteral ? getPropertyAssignment(jsonObjectLiteral, propKey) : ts.emptyArray;
}

/** @internal */
export function getContainingFunction(node: ts.Node): ts.SignatureDeclaration | undefined {
    return ts.findAncestor(node.parent, ts.isFunctionLike);
}

/** @internal */
export function getContainingFunctionDeclaration(node: ts.Node): ts.FunctionLikeDeclaration | undefined {
    return ts.findAncestor(node.parent, ts.isFunctionLikeDeclaration);
}

/** @internal */
export function getContainingClass(node: ts.Node): ts.ClassLikeDeclaration | undefined {
    return ts.findAncestor(node.parent, ts.isClassLike);
}

/** @internal */
export function getContainingClassStaticBlock(node: ts.Node): ts.Node | undefined {
    return ts.findAncestor(node.parent, n => {
        if (ts.isClassLike(n) || ts.isFunctionLike(n)) {
            return "quit";
        }
        return ts.isClassStaticBlockDeclaration(n);
    });
}

/** @internal */
export function getContainingFunctionOrClassStaticBlock(node: ts.Node): ts.SignatureDeclaration | ts.ClassStaticBlockDeclaration | undefined {
    return ts.findAncestor(node.parent, ts.isFunctionLikeOrClassStaticBlockDeclaration);
}

/** @internal */
export function getThisContainer(node: ts.Node, includeArrowFunctions: boolean): ts.Node {
    ts.Debug.assert(node.kind !== ts.SyntaxKind.SourceFile);
    while (true) {
        node = node.parent;
        if (!node) {
            return ts.Debug.fail(); // If we never pass in a SourceFile, this should be unreachable, since we'll stop when we reach that.
        }
        switch (node.kind) {
            case ts.SyntaxKind.ComputedPropertyName:
                // If the grandparent node is an object literal (as opposed to a class),
                // then the computed property is not a 'this' container.
                // A computed property name in a class needs to be a this container
                // so that we can error on it.
                if (ts.isClassLike(node.parent.parent)) {
                    return node;
                }
                // If this is a computed property, then the parent should not
                // make it a this container. The parent might be a property
                // in an object literal, like a method or accessor. But in order for
                // such a parent to be a this container, the reference must be in
                // the *body* of the container.
                node = node.parent;
                break;
            case ts.SyntaxKind.Decorator:
                // Decorators are always applied outside of the body of a class or method.
                if (node.parent.kind === ts.SyntaxKind.Parameter && ts.isClassElement(node.parent.parent)) {
                    // If the decorator's parent is a Parameter, we resolve the this container from
                    // the grandparent class declaration.
                    node = node.parent.parent;
                }
                else if (ts.isClassElement(node.parent)) {
                    // If the decorator's parent is a class element, we resolve the 'this' container
                    // from the parent class declaration.
                    node = node.parent;
                }
                break;
            case ts.SyntaxKind.ArrowFunction:
                if (!includeArrowFunctions) {
                    continue;
                }
                // falls through

            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.IndexSignature:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.SourceFile:
                return node;
        }
    }
}

/** @internal */
/**
 * @returns Whether the node creates a new 'this' scope for its children.
 */
export function isThisContainerOrFunctionBlock(node: ts.Node): boolean {
    switch (node.kind) {
        // Arrow functions use the same scope, but may do so in a "delayed" manner
        // For example, `const getThis = () => this` may be before a super() call in a derived constructor
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.PropertyDeclaration:
            return true;
        case ts.SyntaxKind.Block:
            switch (node.parent.kind) {
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                    // Object properties can have computed names; only method-like bodies start a new scope
                    return true;
                default:
                    return false;
            }
        default:
            return false;
    }
}

/** @internal */
export function isInTopLevelContext(node: ts.Node) {
    // The name of a class or function declaration is a BindingIdentifier in its surrounding scope.
    if (ts.isIdentifier(node) && (ts.isClassDeclaration(node.parent) || ts.isFunctionDeclaration(node.parent)) && node.parent.name === node) {
        node = node.parent;
    }
    const container = getThisContainer(node, /*includeArrowFunctions*/ true);
    return ts.isSourceFile(container);
}

/** @internal */
export function getNewTargetContainer(node: ts.Node) {
    const container = getThisContainer(node, /*includeArrowFunctions*/ false);
    if (container) {
        switch (container.kind) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                return container;
        }
    }

    return undefined;
}

/** @internal */
/**
 * Given an super call/property node, returns the closest node where
 * - a super call/property access is legal in the node and not legal in the parent node the node.
 *   i.e. super call is legal in constructor but not legal in the class body.
 * - the container is an arrow function (so caller might need to call getSuperContainer again in case it needs to climb higher)
 * - a super call/property is definitely illegal in the container (but might be legal in some subnode)
 *   i.e. super property access is illegal in function declaration but can be legal in the statement list
 */
export function getSuperContainer(node: ts.Node, stopOnFunctions: boolean): ts.Node {
    while (true) {
        node = node.parent;
        if (!node) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.ComputedPropertyName:
                node = node.parent;
                break;
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
                if (!stopOnFunctions) {
                    continue;
                }
                // falls through

            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                return node;
            case ts.SyntaxKind.Decorator:
                // Decorators are always applied outside of the body of a class or method.
                if (node.parent.kind === ts.SyntaxKind.Parameter && ts.isClassElement(node.parent.parent)) {
                    // If the decorator's parent is a Parameter, we resolve the this container from
                    // the grandparent class declaration.
                    node = node.parent.parent;
                }
                else if (ts.isClassElement(node.parent)) {
                    // If the decorator's parent is a class element, we resolve the 'this' container
                    // from the parent class declaration.
                    node = node.parent;
                }
                break;
        }
    }
}

/** @internal */
export function getImmediatelyInvokedFunctionExpression(func: ts.Node): ts.CallExpression | undefined {
    if (func.kind === ts.SyntaxKind.FunctionExpression || func.kind === ts.SyntaxKind.ArrowFunction) {
        let prev = func;
        let parent = func.parent;
        while (parent.kind === ts.SyntaxKind.ParenthesizedExpression) {
            prev = parent;
            parent = parent.parent;
        }
        if (parent.kind === ts.SyntaxKind.CallExpression && (parent as ts.CallExpression).expression === prev) {
            return parent as ts.CallExpression;
        }
    }
}

/** @internal */
export function isSuperOrSuperProperty(node: ts.Node): node is ts.SuperExpression | ts.SuperProperty {
    return node.kind === ts.SyntaxKind.SuperKeyword
        || isSuperProperty(node);
}

/** @internal */
/**
 * Determines whether a node is a property or element access expression for `super`.
 */
export function isSuperProperty(node: ts.Node): node is ts.SuperProperty {
    const kind = node.kind;
    return (kind === ts.SyntaxKind.PropertyAccessExpression || kind === ts.SyntaxKind.ElementAccessExpression)
        && (node as ts.PropertyAccessExpression | ts.ElementAccessExpression).expression.kind === ts.SyntaxKind.SuperKeyword;
}

/** @internal */
/**
 * Determines whether a node is a property or element access expression for `this`.
 */
export function isThisProperty(node: ts.Node): boolean {
    const kind = node.kind;
    return (kind === ts.SyntaxKind.PropertyAccessExpression || kind === ts.SyntaxKind.ElementAccessExpression)
        && (node as ts.PropertyAccessExpression | ts.ElementAccessExpression).expression.kind === ts.SyntaxKind.ThisKeyword;
}

/** @internal */
export function isThisInitializedDeclaration(node: ts.Node | undefined): boolean {
    return !!node && ts.isVariableDeclaration(node) && node.initializer?.kind === ts.SyntaxKind.ThisKeyword;
}

/** @internal */
export function isThisInitializedObjectBindingExpression(node: ts.Node | undefined): boolean {
    return !!node
        && (ts.isShorthandPropertyAssignment(node) || ts.isPropertyAssignment(node))
        && ts.isBinaryExpression(node.parent.parent)
        && node.parent.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
        && node.parent.parent.right.kind === ts.SyntaxKind.ThisKeyword;
}

/** @internal */
export function getEntityNameFromTypeNode(node: ts.TypeNode): ts.EntityNameOrEntityNameExpression | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.TypeReference:
            return (node as ts.TypeReferenceNode).typeName;

        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return isEntityNameExpression((node as ts.ExpressionWithTypeArguments).expression)
                ? (node as ts.ExpressionWithTypeArguments).expression as ts.EntityNameExpression
                : undefined;

        // TODO(rbuckton): These aren't valid TypeNodes, but we treat them as such because of `isPartOfTypeNode`, which returns `true` for things that aren't `TypeNode`s.
        case ts.SyntaxKind.Identifier as ts.TypeNodeSyntaxKind:
        case ts.SyntaxKind.QualifiedName as ts.TypeNodeSyntaxKind:
            return (node as ts.Node as ts.EntityName);
    }

    return undefined;
}

/** @internal */
export function getInvokedExpression(node: ts.CallLikeExpression): ts.Expression {
    switch (node.kind) {
        case ts.SyntaxKind.TaggedTemplateExpression:
            return node.tag;
        case ts.SyntaxKind.JsxOpeningElement:
        case ts.SyntaxKind.JsxSelfClosingElement:
            return node.tagName;
        default:
            return node.expression;
    }
}

/** @internal */
export function nodeCanBeDecorated(node: ts.ClassDeclaration): true;
/** @internal */
export function nodeCanBeDecorated(node: ts.ClassElement, parent: ts.Node): boolean;
/** @internal */
export function nodeCanBeDecorated(node: ts.Node, parent: ts.Node, grandparent: ts.Node): boolean;
/** @internal */
export function nodeCanBeDecorated(node: ts.Node, parent?: ts.Node, grandparent?: ts.Node): boolean {
    // private names cannot be used with decorators yet
    if (ts.isNamedDeclaration(node) && ts.isPrivateIdentifier(node.name)) {
        return false;
    }
    switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
            // classes are valid targets
            return true;

        case ts.SyntaxKind.PropertyDeclaration:
            // property declarations are valid if their parent is a class declaration.
            return parent!.kind === ts.SyntaxKind.ClassDeclaration;

        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.MethodDeclaration:
            // if this method has a body and its parent is a class declaration, this is a valid target.
            return (node as ts.FunctionLikeDeclaration).body !== undefined
                && parent!.kind === ts.SyntaxKind.ClassDeclaration;

        case ts.SyntaxKind.Parameter:
            // if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target;
            return (parent as ts.FunctionLikeDeclaration).body !== undefined
                && (parent!.kind === ts.SyntaxKind.Constructor
                    || parent!.kind === ts.SyntaxKind.MethodDeclaration
                    || parent!.kind === ts.SyntaxKind.SetAccessor)
                && grandparent!.kind === ts.SyntaxKind.ClassDeclaration;
    }

    return false;
}

/** @internal */
export function nodeIsDecorated(node: ts.ClassDeclaration): boolean;
/** @internal */
export function nodeIsDecorated(node: ts.ClassElement, parent: ts.Node): boolean;
/** @internal */
export function nodeIsDecorated(node: ts.Node, parent: ts.Node, grandparent: ts.Node): boolean;
/** @internal */
export function nodeIsDecorated(node: ts.Node, parent?: ts.Node, grandparent?: ts.Node): boolean {
    return hasDecorators(node)
        && nodeCanBeDecorated(node, parent!, grandparent!); // TODO: GH#18217
}

/** @internal */
export function nodeOrChildIsDecorated(node: ts.ClassDeclaration): boolean;
/** @internal */
export function nodeOrChildIsDecorated(node: ts.ClassElement, parent: ts.Node): boolean;
/** @internal */
export function nodeOrChildIsDecorated(node: ts.Node, parent: ts.Node, grandparent: ts.Node): boolean;
/** @internal */
export function nodeOrChildIsDecorated(node: ts.Node, parent?: ts.Node, grandparent?: ts.Node): boolean {
    return nodeIsDecorated(node, parent!, grandparent!) || childIsDecorated(node, parent!); // TODO: GH#18217
}

/** @internal */
export function childIsDecorated(node: ts.ClassDeclaration): boolean;
/** @internal */
export function childIsDecorated(node: ts.Node, parent: ts.Node): boolean;
/** @internal */
export function childIsDecorated(node: ts.Node, parent?: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
            return ts.some((node as ts.ClassDeclaration).members, m => nodeOrChildIsDecorated(m, node, parent!)); // TODO: GH#18217
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.Constructor:
            return ts.some((node as ts.FunctionLikeDeclaration).parameters, p => nodeIsDecorated(p, node, parent!)); // TODO: GH#18217
        default:
            return false;
    }
}

/** @internal */
export function classOrConstructorParameterIsDecorated(node: ts.ClassDeclaration): boolean {
    if (nodeIsDecorated(node)) return true;
    const constructor = getFirstConstructorWithBody(node);
    return !!constructor && childIsDecorated(constructor, node);
}

/** @internal */
export function isJSXTagName(node: ts.Node) {
    const { parent } = node;
    if (parent.kind === ts.SyntaxKind.JsxOpeningElement ||
        parent.kind === ts.SyntaxKind.JsxSelfClosingElement ||
        parent.kind === ts.SyntaxKind.JsxClosingElement) {
        return (parent as ts.JsxOpeningLikeElement).tagName === node;
    }
    return false;
}

/** @internal */
export function isExpressionNode(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.SuperKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.RegularExpressionLiteral:
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.ElementAccessExpression:
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.TaggedTemplateExpression:
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.SatisfiesExpression:
        case ts.SyntaxKind.NonNullExpression:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.VoidExpression:
        case ts.SyntaxKind.DeleteExpression:
        case ts.SyntaxKind.TypeOfExpression:
        case ts.SyntaxKind.PrefixUnaryExpression:
        case ts.SyntaxKind.PostfixUnaryExpression:
        case ts.SyntaxKind.BinaryExpression:
        case ts.SyntaxKind.ConditionalExpression:
        case ts.SyntaxKind.SpreadElement:
        case ts.SyntaxKind.TemplateExpression:
        case ts.SyntaxKind.OmittedExpression:
        case ts.SyntaxKind.JsxElement:
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxFragment:
        case ts.SyntaxKind.YieldExpression:
        case ts.SyntaxKind.AwaitExpression:
        case ts.SyntaxKind.MetaProperty:
            return true;
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return !ts.isHeritageClause(node.parent);
        case ts.SyntaxKind.QualifiedName:
            while (node.parent.kind === ts.SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return node.parent.kind === ts.SyntaxKind.TypeQuery || ts.isJSDocLinkLike(node.parent) || ts.isJSDocNameReference(node.parent) || ts.isJSDocMemberName(node.parent) || isJSXTagName(node);
        case ts.SyntaxKind.JSDocMemberName:
            while (ts.isJSDocMemberName(node.parent)) {
                node = node.parent;
            }
            return node.parent.kind === ts.SyntaxKind.TypeQuery || ts.isJSDocLinkLike(node.parent) || ts.isJSDocNameReference(node.parent) || ts.isJSDocMemberName(node.parent) || isJSXTagName(node);
        case ts.SyntaxKind.PrivateIdentifier:
            return ts.isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === ts.SyntaxKind.InKeyword;
        case ts.SyntaxKind.Identifier:
            if (node.parent.kind === ts.SyntaxKind.TypeQuery || ts.isJSDocLinkLike(node.parent) || ts.isJSDocNameReference(node.parent) || ts.isJSDocMemberName(node.parent) || isJSXTagName(node)) {
                return true;
            }
            // falls through

        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.BigIntLiteral:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.ThisKeyword:
            return isInExpressionContext(node);
        default:
            return false;
    }
}

/** @internal */
export function isInExpressionContext(node: ts.Node): boolean {
    const { parent } = node;
    switch (parent.kind) {
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.BindingElement:
            return (parent as ts.HasInitializer).initializer === node;
        case ts.SyntaxKind.ExpressionStatement:
        case ts.SyntaxKind.IfStatement:
        case ts.SyntaxKind.DoStatement:
        case ts.SyntaxKind.WhileStatement:
        case ts.SyntaxKind.ReturnStatement:
        case ts.SyntaxKind.WithStatement:
        case ts.SyntaxKind.SwitchStatement:
        case ts.SyntaxKind.CaseClause:
        case ts.SyntaxKind.ThrowStatement:
            return (parent as ts.ExpressionStatement).expression === node;
        case ts.SyntaxKind.ForStatement:
            const forStatement = parent as ts.ForStatement;
            return (forStatement.initializer === node && forStatement.initializer.kind !== ts.SyntaxKind.VariableDeclarationList) ||
                forStatement.condition === node ||
                forStatement.incrementor === node;
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
            const forInStatement = parent as ts.ForInStatement | ts.ForOfStatement;
            return (forInStatement.initializer === node && forInStatement.initializer.kind !== ts.SyntaxKind.VariableDeclarationList) ||
                forInStatement.expression === node;
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.AsExpression:
            return node === (parent as ts.AssertionExpression).expression;
        case ts.SyntaxKind.TemplateSpan:
            return node === (parent as ts.TemplateSpan).expression;
        case ts.SyntaxKind.ComputedPropertyName:
            return node === (parent as ts.ComputedPropertyName).expression;
        case ts.SyntaxKind.Decorator:
        case ts.SyntaxKind.JsxExpression:
        case ts.SyntaxKind.JsxSpreadAttribute:
        case ts.SyntaxKind.SpreadAssignment:
            return true;
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return (parent as ts.ExpressionWithTypeArguments).expression === node && !isPartOfTypeNode(parent);
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            return (parent as ts.ShorthandPropertyAssignment).objectAssignmentInitializer === node;
        case ts.SyntaxKind.SatisfiesExpression:
            return node === (parent as ts.SatisfiesExpression).expression;
        default:
            return isExpressionNode(parent);
    }
}

/** @internal */
export function isPartOfTypeQuery(node: ts.Node) {
    while (node.kind === ts.SyntaxKind.QualifiedName || node.kind === ts.SyntaxKind.Identifier) {
        node = node.parent;
    }
    return node.kind === ts.SyntaxKind.TypeQuery;
}

/** @internal */
export function isNamespaceReexportDeclaration(node: ts.Node): boolean {
    return ts.isNamespaceExport(node) && !!node.parent.moduleSpecifier;
}

/** @internal */
export function isExternalModuleImportEqualsDeclaration(node: ts.Node): node is ts.ImportEqualsDeclaration & { moduleReference: ts.ExternalModuleReference } {
    return node.kind === ts.SyntaxKind.ImportEqualsDeclaration && (node as ts.ImportEqualsDeclaration).moduleReference.kind === ts.SyntaxKind.ExternalModuleReference;
}

/** @internal */
export function getExternalModuleImportEqualsDeclarationExpression(node: ts.Node) {
    ts.Debug.assert(isExternalModuleImportEqualsDeclaration(node));
    return ((node as ts.ImportEqualsDeclaration).moduleReference as ts.ExternalModuleReference).expression;
}

/** @internal */
export function getExternalModuleRequireArgument(node: ts.Node) {
    return isVariableDeclarationInitializedToBareOrAccessedRequire(node) && (getLeftmostAccessExpression(node.initializer) as ts.CallExpression).arguments[0] as ts.StringLiteral;
}

/** @internal */
export function isInternalModuleImportEqualsDeclaration(node: ts.Node): node is ts.ImportEqualsDeclaration {
    return node.kind === ts.SyntaxKind.ImportEqualsDeclaration && (node as ts.ImportEqualsDeclaration).moduleReference.kind !== ts.SyntaxKind.ExternalModuleReference;
}

/** @internal */
export function isSourceFileJS(file: ts.SourceFile): boolean {
    return isInJSFile(file);
}

/** @internal */
export function isSourceFileNotJS(file: ts.SourceFile): boolean {
    return !isInJSFile(file);
}

/** @internal */
export function isInJSFile(node: ts.Node | undefined): boolean {
    return !!node && !!(node.flags & ts.NodeFlags.JavaScriptFile);
}

/** @internal */
export function isInJsonFile(node: ts.Node | undefined): boolean {
    return !!node && !!(node.flags & ts.NodeFlags.JsonFile);
}

/** @internal */
export function isSourceFileNotJson(file: ts.SourceFile) {
    return !isJsonSourceFile(file);
}

/** @internal */
export function isInJSDoc(node: ts.Node | undefined): boolean {
    return !!node && !!(node.flags & ts.NodeFlags.JSDoc);
}

/** @internal */
export function isJSDocIndexSignature(node: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments) {
    return ts.isTypeReferenceNode(node) &&
        ts.isIdentifier(node.typeName) &&
        node.typeName.escapedText === "Object" &&
        node.typeArguments && node.typeArguments.length === 2 &&
        (node.typeArguments[0].kind === ts.SyntaxKind.StringKeyword || node.typeArguments[0].kind === ts.SyntaxKind.NumberKeyword);
}

/** @internal */
/**
 * Returns true if the node is a CallExpression to the identifier 'require' with
 * exactly one argument (of the form 'require("name")').
 * This function does not test if the node is in a JavaScript file or not.
 */
export function isRequireCall(callExpression: ts.Node, requireStringLiteralLikeArgument: true): callExpression is ts.RequireOrImportCall & { expression: ts.Identifier, arguments: [ts.StringLiteralLike] };
/** @internal */
export function isRequireCall(callExpression: ts.Node, requireStringLiteralLikeArgument: boolean): callExpression is ts.CallExpression;
/** @internal */
export function isRequireCall(callExpression: ts.Node, requireStringLiteralLikeArgument: boolean): callExpression is ts.CallExpression {
    if (callExpression.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    const { expression, arguments: args } = callExpression as ts.CallExpression;

    if (expression.kind !== ts.SyntaxKind.Identifier || (expression as ts.Identifier).escapedText !== "require") {
        return false;
    }

    if (args.length !== 1) {
        return false;
    }
    const arg = args[0];
    return !requireStringLiteralLikeArgument || ts.isStringLiteralLike(arg);
}

/** @internal */
/**
 * Returns true if the node is a VariableDeclaration initialized to a require call (see `isRequireCall`).
 * This function does not test if the node is in a JavaScript file or not.
 */
export function isVariableDeclarationInitializedToRequire(node: ts.Node): node is ts.VariableDeclarationInitializedTo<ts.RequireOrImportCall> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ false);
}

/** @internal */
/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 */
export function isVariableDeclarationInitializedToBareOrAccessedRequire(node: ts.Node): node is ts.VariableDeclarationInitializedTo<ts.RequireOrImportCall | ts.AccessExpression> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ true);
}

function isVariableDeclarationInitializedWithRequireHelper(node: ts.Node, allowAccessedRequire: boolean) {
    return ts.isVariableDeclaration(node) &&
        !!node.initializer &&
        isRequireCall(allowAccessedRequire ? getLeftmostAccessExpression(node.initializer) : node.initializer, /*requireStringLiteralLikeArgument*/ true);
}

/** @internal */
export function isRequireVariableStatement(node: ts.Node): node is ts.RequireVariableStatement {
    return ts.isVariableStatement(node)
        && node.declarationList.declarations.length > 0
        && ts.every(node.declarationList.declarations, decl => isVariableDeclarationInitializedToRequire(decl));
}

/** @internal */
export function isSingleOrDoubleQuote(charCode: number) {
    return charCode === ts.CharacterCodes.singleQuote || charCode === ts.CharacterCodes.doubleQuote;
}

/** @internal */
export function isStringDoubleQuoted(str: ts.StringLiteralLike, sourceFile: ts.SourceFile): boolean {
    return getSourceTextOfNodeFromSourceFile(sourceFile, str).charCodeAt(0) === ts.CharacterCodes.doubleQuote;
}

/** @internal */
export function isAssignmentDeclaration(decl: ts.Declaration) {
    return ts.isBinaryExpression(decl) || isAccessExpression(decl) || ts.isIdentifier(decl) || ts.isCallExpression(decl);
}

/** @internal */
/** Get the initializer, taking into account defaulted Javascript initializers */
export function getEffectiveInitializer(node: ts.HasExpressionInitializer) {
    if (isInJSFile(node) && node.initializer &&
        ts.isBinaryExpression(node.initializer) &&
            (node.initializer.operatorToken.kind === ts.SyntaxKind.BarBarToken || node.initializer.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) &&
        node.name && isEntityNameExpression(node.name) && isSameEntityName(node.name, node.initializer.left)) {
        return node.initializer.right;
    }
    return node.initializer;
}

/** @internal */
/** Get the declaration initializer when it is container-like (See getExpandoInitializer). */
export function getDeclaredExpandoInitializer(node: ts.HasExpressionInitializer) {
    const init = getEffectiveInitializer(node);
    return init && getExpandoInitializer(init, isPrototypeAccess(node.name));
}

function hasExpandoValueProperty(node: ts.ObjectLiteralExpression, isPrototypeAssignment: boolean) {
    return ts.forEach(node.properties, p =>
        ts.isPropertyAssignment(p) &&
        ts.isIdentifier(p.name) &&
        p.name.escapedText === "value" &&
        p.initializer &&
        getExpandoInitializer(p.initializer, isPrototypeAssignment));
}

/** @internal */
/**
 * Get the assignment 'initializer' -- the righthand side-- when the initializer is container-like (See getExpandoInitializer).
 * We treat the right hand side of assignments with container-like initializers as declarations.
 */
export function getAssignedExpandoInitializer(node: ts.Node | undefined): ts.Expression | undefined {
    if (node && node.parent && ts.isBinaryExpression(node.parent) && node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        const isPrototypeAssignment = isPrototypeAccess(node.parent.left);
        return getExpandoInitializer(node.parent.right, isPrototypeAssignment) ||
            getDefaultedExpandoInitializer(node.parent.left, node.parent.right, isPrototypeAssignment);
    }
    if (node && ts.isCallExpression(node) && isBindableObjectDefinePropertyCall(node)) {
        const result = hasExpandoValueProperty(node.arguments[2], node.arguments[1].text === "prototype");
        if (result) {
            return result;
        }
    }
}

/** @internal */
/**
 * Recognized expando initializers are:
 * 1. (function() {})() -- IIFEs
 * 2. function() { } -- Function expressions
 * 3. class { } -- Class expressions
 * 4. {} -- Empty object literals
 * 5. { ... } -- Non-empty object literals, when used to initialize a prototype, like `C.prototype = { m() { } }`
 *
 * This function returns the provided initializer, or undefined if it is not valid.
 */
export function getExpandoInitializer(initializer: ts.Node, isPrototypeAssignment: boolean): ts.Expression | undefined {
    if (ts.isCallExpression(initializer)) {
        const e = skipParentheses(initializer.expression);
        return e.kind === ts.SyntaxKind.FunctionExpression || e.kind === ts.SyntaxKind.ArrowFunction ? initializer : undefined;
    }
    if (initializer.kind === ts.SyntaxKind.FunctionExpression ||
        initializer.kind === ts.SyntaxKind.ClassExpression ||
        initializer.kind === ts.SyntaxKind.ArrowFunction) {
        return initializer as ts.Expression;
    }
    if (ts.isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAssignment)) {
        return initializer;
    }
}

/**
 * A defaulted expando initializer matches the pattern
 * `Lhs = Lhs || ExpandoInitializer`
 * or `var Lhs = Lhs || ExpandoInitializer`
 *
 * The second Lhs is required to be the same as the first except that it may be prefixed with
 * 'window.', 'global.' or 'self.' The second Lhs is otherwise ignored by the binder and checker.
 */
function getDefaultedExpandoInitializer(name: ts.Expression, initializer: ts.Expression, isPrototypeAssignment: boolean) {
    const e = ts.isBinaryExpression(initializer)
        && (initializer.operatorToken.kind === ts.SyntaxKind.BarBarToken || initializer.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
        && getExpandoInitializer(initializer.right, isPrototypeAssignment);
    if (e && isSameEntityName(name, initializer.left)) {
        return e;
    }
}

/** @internal */
export function isDefaultedExpandoInitializer(node: ts.BinaryExpression) {
    const name = ts.isVariableDeclaration(node.parent) ? node.parent.name :
        ts.isBinaryExpression(node.parent) && node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken ? node.parent.left :
        undefined;
    return name && getExpandoInitializer(node.right, isPrototypeAccess(name)) && isEntityNameExpression(name) && isSameEntityName(name, node.left);
}

/** @internal */
/** Given an expando initializer, return its declaration name, or the left-hand side of the assignment if it's part of an assignment declaration. */
export function getNameOfExpando(node: ts.Declaration): ts.DeclarationName | undefined {
    if (ts.isBinaryExpression(node.parent)) {
        const parent = ((node.parent.operatorToken.kind === ts.SyntaxKind.BarBarToken || node.parent.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) && ts.isBinaryExpression(node.parent.parent)) ? node.parent.parent : node.parent;
        if (parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(parent.left)) {
            return parent.left;
        }
    }
    else if (ts.isVariableDeclaration(node.parent)) {
        return node.parent.name;
    }
}

/** @internal */
/**
 * Is the 'declared' name the same as the one in the initializer?
 * @return true for identical entity names, as well as ones where the initializer is prefixed with
 * 'window', 'self' or 'global'. For example:
 *
 * var my = my || {}
 * var min = window.min || {}
 * my.app = self.my.app || class { }
 */
export function isSameEntityName(name: ts.Expression, initializer: ts.Expression): boolean {
    if (isPropertyNameLiteral(name) && isPropertyNameLiteral(initializer)) {
        return getTextOfIdentifierOrLiteral(name) === getTextOfIdentifierOrLiteral(initializer);
    }
    if (ts.isMemberName(name) && isLiteralLikeAccess(initializer) &&
        (initializer.expression.kind === ts.SyntaxKind.ThisKeyword ||
            ts.isIdentifier(initializer.expression) &&
            (initializer.expression.escapedText === "window" ||
                initializer.expression.escapedText === "self" ||
                initializer.expression.escapedText === "global"))) {
        return isSameEntityName(name, getNameOrArgument(initializer));
    }
    if (isLiteralLikeAccess(name) && isLiteralLikeAccess(initializer)) {
        return getElementOrPropertyAccessName(name) === getElementOrPropertyAccessName(initializer)
            && isSameEntityName(name.expression, initializer.expression);
    }
    return false;
}

/** @internal */
export function getRightMostAssignedExpression(node: ts.Expression): ts.Expression {
    while (isAssignmentExpression(node, /*excludeCompoundAssignments*/ true)) {
        node = node.right;
    }
    return node;
}

/** @internal */
export function isExportsIdentifier(node: ts.Node) {
    return ts.isIdentifier(node) && node.escapedText === "exports";
}

/** @internal */
export function isModuleIdentifier(node: ts.Node) {
    return ts.isIdentifier(node) && node.escapedText === "module";
}

/** @internal */
export function isModuleExportsAccessExpression(node: ts.Node): node is ts.LiteralLikeElementAccessExpression & { expression: ts.Identifier } {
    return (ts.isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node))
        && isModuleIdentifier(node.expression)
        && getElementOrPropertyAccessName(node) === "exports";
}

/// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
/// assignments we treat as special in the binder
/** @internal */
export function getAssignmentDeclarationKind(expr: ts.BinaryExpression | ts.CallExpression): ts.AssignmentDeclarationKind {
    const special = getAssignmentDeclarationKindWorker(expr);
    return special === ts.AssignmentDeclarationKind.Property || isInJSFile(expr) ? special : ts.AssignmentDeclarationKind.None;
}

/** @internal */
export function isBindableObjectDefinePropertyCall(expr: ts.CallExpression): expr is ts.BindableObjectDefinePropertyCall {
    return ts.length(expr.arguments) === 3 &&
        ts.isPropertyAccessExpression(expr.expression) &&
        ts.isIdentifier(expr.expression.expression) &&
        ts.idText(expr.expression.expression) === "Object" &&
        ts.idText(expr.expression.name) === "defineProperty" &&
        isStringOrNumericLiteralLike(expr.arguments[1]) &&
        isBindableStaticNameExpression(expr.arguments[0], /*excludeThisKeyword*/ true);
}

/** @internal */
/** x.y OR x[0] */
export function isLiteralLikeAccess(node: ts.Node): node is ts.LiteralLikeElementAccessExpression | ts.PropertyAccessExpression {
    return ts.isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node);
}

/** @internal */
/** x[0] OR x['a'] OR x[Symbol.y] */
export function isLiteralLikeElementAccess(node: ts.Node): node is ts.LiteralLikeElementAccessExpression {
    return ts.isElementAccessExpression(node) && isStringOrNumericLiteralLike(node.argumentExpression);
}

/** @internal */
/** Any series of property and element accesses. */
export function isBindableStaticAccessExpression(node: ts.Node, excludeThisKeyword?: boolean): node is ts.BindableStaticAccessExpression {
    return ts.isPropertyAccessExpression(node) && (!excludeThisKeyword && node.expression.kind === ts.SyntaxKind.ThisKeyword || ts.isIdentifier(node.name) && isBindableStaticNameExpression(node.expression, /*excludeThisKeyword*/ true))
        || isBindableStaticElementAccessExpression(node, excludeThisKeyword);
}

/** @internal */
/** Any series of property and element accesses, ending in a literal element access */
export function isBindableStaticElementAccessExpression(node: ts.Node, excludeThisKeyword?: boolean): node is ts.BindableStaticElementAccessExpression {
    return isLiteralLikeElementAccess(node)
        && ((!excludeThisKeyword && node.expression.kind === ts.SyntaxKind.ThisKeyword) ||
            isEntityNameExpression(node.expression) ||
            isBindableStaticAccessExpression(node.expression, /*excludeThisKeyword*/ true));
}

/** @internal */
export function isBindableStaticNameExpression(node: ts.Node, excludeThisKeyword?: boolean): node is ts.BindableStaticNameExpression {
    return isEntityNameExpression(node) || isBindableStaticAccessExpression(node, excludeThisKeyword);
}

/** @internal */
export function getNameOrArgument(expr: ts.PropertyAccessExpression | ts.LiteralLikeElementAccessExpression) {
    if (ts.isPropertyAccessExpression(expr)) {
        return expr.name;
    }
    return expr.argumentExpression;
}

function getAssignmentDeclarationKindWorker(expr: ts.BinaryExpression | ts.CallExpression): ts.AssignmentDeclarationKind {
    if (ts.isCallExpression(expr)) {
        if (!isBindableObjectDefinePropertyCall(expr)) {
            return ts.AssignmentDeclarationKind.None;
        }
        const entityName = expr.arguments[0];
        if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
            return ts.AssignmentDeclarationKind.ObjectDefinePropertyExports;
        }
        if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
            return ts.AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
        }
        return ts.AssignmentDeclarationKind.ObjectDefinePropertyValue;
    }
    if (expr.operatorToken.kind !== ts.SyntaxKind.EqualsToken || !isAccessExpression(expr.left) || isVoidZero(getRightMostAssignedExpression(expr))) {
        return ts.AssignmentDeclarationKind.None;
    }
    if (isBindableStaticNameExpression(expr.left.expression, /*excludeThisKeyword*/ true) && getElementOrPropertyAccessName(expr.left) === "prototype" && ts.isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
        // F.prototype = { ... }
        return ts.AssignmentDeclarationKind.Prototype;
    }
    return getAssignmentDeclarationPropertyAccessKind(expr.left);
}

function isVoidZero(node: ts.Node) {
    return ts.isVoidExpression(node) && ts.isNumericLiteral(node.expression) && node.expression.text === "0";
}

/**
 * Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
 * throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
 */
/* @internal */
export function getElementOrPropertyAccessArgumentExpressionOrName(node: ts.AccessExpression): ts.Identifier | ts.PrivateIdentifier | ts.StringLiteralLike | ts.NumericLiteral | ts.ElementAccessExpression | undefined {
    if (ts.isPropertyAccessExpression(node)) {
        return node.name;
    }
    const arg = skipParentheses(node.argumentExpression);
    if (ts.isNumericLiteral(arg) || ts.isStringLiteralLike(arg)) {
        return arg;
    }
    return node;
}

/* @internal */
export function getElementOrPropertyAccessName(node: ts.LiteralLikeElementAccessExpression | ts.PropertyAccessExpression): ts.__String;
/** @internal */
export function getElementOrPropertyAccessName(node: ts.AccessExpression): ts.__String | undefined;
/** @internal */
export function getElementOrPropertyAccessName(node: ts.AccessExpression): ts.__String | undefined {
    const name = getElementOrPropertyAccessArgumentExpressionOrName(node);
    if (name) {
        if (ts.isIdentifier(name)) {
            return name.escapedText;
        }
        if (ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) {
            return ts.escapeLeadingUnderscores(name.text);
        }
    }
    return undefined;
}

/** @internal */
export function getAssignmentDeclarationPropertyAccessKind(lhs: ts.AccessExpression): ts.AssignmentDeclarationKind {
    if (lhs.expression.kind === ts.SyntaxKind.ThisKeyword) {
        return ts.AssignmentDeclarationKind.ThisProperty;
    }
    else if (isModuleExportsAccessExpression(lhs)) {
        // module.exports = expr
        return ts.AssignmentDeclarationKind.ModuleExports;
    }
    else if (isBindableStaticNameExpression(lhs.expression, /*excludeThisKeyword*/ true)) {
        if (isPrototypeAccess(lhs.expression)) {
            // F.G....prototype.x = expr
            return ts.AssignmentDeclarationKind.PrototypeProperty;
        }

        let nextToLast = lhs;
        while (!ts.isIdentifier(nextToLast.expression)) {
            nextToLast = nextToLast.expression as Exclude<ts.BindableStaticNameExpression, ts.Identifier>;
        }
        const id = nextToLast.expression;
        if ((id.escapedText === "exports" ||
            id.escapedText === "module" && getElementOrPropertyAccessName(nextToLast) === "exports") &&
            // ExportsProperty does not support binding with computed names
            isBindableStaticAccessExpression(lhs)) {
            // exports.name = expr OR module.exports.name = expr OR exports["name"] = expr ...
            return ts.AssignmentDeclarationKind.ExportsProperty;
        }
        if (isBindableStaticNameExpression(lhs, /*excludeThisKeyword*/ true) || (ts.isElementAccessExpression(lhs) && isDynamicName(lhs))) {
            // F.G...x = expr
            return ts.AssignmentDeclarationKind.Property;
        }
    }

    return ts.AssignmentDeclarationKind.None;
}

/** @internal */
export function getInitializerOfBinaryExpression(expr: ts.BinaryExpression) {
    while (ts.isBinaryExpression(expr.right)) {
        expr = expr.right;
    }
    return expr.right;
}

/** @internal */
export function isPrototypePropertyAssignment(node: ts.Node): node is ts.BinaryExpression {
    return ts.isBinaryExpression(node) && getAssignmentDeclarationKind(node) === ts.AssignmentDeclarationKind.PrototypeProperty;
}

/** @internal */
export function isSpecialPropertyDeclaration(expr: ts.PropertyAccessExpression | ts.ElementAccessExpression): expr is ts.PropertyAccessExpression | ts.LiteralLikeElementAccessExpression {
    return isInJSFile(expr) &&
        expr.parent && expr.parent.kind === ts.SyntaxKind.ExpressionStatement &&
        (!ts.isElementAccessExpression(expr) || isLiteralLikeElementAccess(expr)) &&
        !!ts.getJSDocTypeTag(expr.parent);
}

/** @internal */
export function setValueDeclaration(symbol: ts.Symbol, node: ts.Declaration): void {
    const { valueDeclaration } = symbol;
    if (!valueDeclaration ||
        !(node.flags & ts.NodeFlags.Ambient && !(valueDeclaration.flags & ts.NodeFlags.Ambient)) &&
        (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
        (valueDeclaration.kind !== node.kind && isEffectiveModuleDeclaration(valueDeclaration))) {
        // other kinds of value declarations take precedence over modules and assignment declarations
        symbol.valueDeclaration = node;
    }
}

/** @internal */
export function isFunctionSymbol(symbol: ts.Symbol | undefined) {
    if (!symbol || !symbol.valueDeclaration) {
        return false;
    }
    const decl = symbol.valueDeclaration;
    return decl.kind === ts.SyntaxKind.FunctionDeclaration || ts.isVariableDeclaration(decl) && decl.initializer && ts.isFunctionLike(decl.initializer);
}

/** @internal */
export function tryGetModuleSpecifierFromDeclaration(node: ts.AnyImportOrBareOrAccessedRequire): ts.StringLiteralLike | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.VariableDeclaration:
            return ts.findAncestor(node.initializer, (node): node is ts.RequireOrImportCall => isRequireCall(node, /*requireStringLiteralLikeArgument*/ true))?.arguments[0];
        case ts.SyntaxKind.ImportDeclaration:
            return ts.tryCast(node.moduleSpecifier, ts.isStringLiteralLike);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return ts.tryCast(ts.tryCast(node.moduleReference, ts.isExternalModuleReference)?.expression, ts.isStringLiteralLike);
        default:
            ts.Debug.assertNever(node);
    }
}

/** @internal */
export function importFromModuleSpecifier(node: ts.StringLiteralLike): ts.AnyValidImportOrReExport {
    return tryGetImportFromModuleSpecifier(node) || ts.Debug.failBadSyntaxKind(node.parent);
}

/** @internal */
export function tryGetImportFromModuleSpecifier(node: ts.StringLiteralLike): ts.AnyValidImportOrReExport | undefined {
    switch (node.parent.kind) {
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ExportDeclaration:
            return node.parent as ts.AnyValidImportOrReExport;
        case ts.SyntaxKind.ExternalModuleReference:
            return (node.parent as ts.ExternalModuleReference).parent as ts.AnyValidImportOrReExport;
        case ts.SyntaxKind.CallExpression:
            return isImportCall(node.parent) || isRequireCall(node.parent, /*checkArg*/ false) ? node.parent as ts.RequireOrImportCall : undefined;
        case ts.SyntaxKind.LiteralType:
            ts.Debug.assert(ts.isStringLiteral(node));
            return ts.tryCast(node.parent.parent, ts.isImportTypeNode) as ts.ValidImportTypeNode | undefined;
        default:
            return undefined;
    }
}

/** @internal */
export function getExternalModuleName(node: ts.AnyImportOrReExport | ts.ImportTypeNode | ts.ImportCall | ts.ModuleDeclaration): ts.Expression | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ExportDeclaration:
            return node.moduleSpecifier;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return node.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference ? node.moduleReference.expression : undefined;
        case ts.SyntaxKind.ImportType:
            return isLiteralImportTypeNode(node) ? node.argument.literal : undefined;
        case ts.SyntaxKind.CallExpression:
            return node.arguments[0];
        case ts.SyntaxKind.ModuleDeclaration:
            return node.name.kind === ts.SyntaxKind.StringLiteral ? node.name : undefined;
        default:
            return ts.Debug.assertNever(node);
    }
}

/** @internal */
export function getNamespaceDeclarationNode(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration): ts.ImportEqualsDeclaration | ts.NamespaceImport | ts.NamespaceExport | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            return node.importClause && ts.tryCast(node.importClause.namedBindings, ts.isNamespaceImport);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return node;
        case ts.SyntaxKind.ExportDeclaration:
            return node.exportClause && ts.tryCast(node.exportClause, ts.isNamespaceExport);
        default:
            return ts.Debug.assertNever(node);
    }
}

/** @internal */
export function isDefaultImport(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration): boolean {
    return node.kind === ts.SyntaxKind.ImportDeclaration && !!node.importClause && !!node.importClause.name;
}

/** @internal */
export function forEachImportClauseDeclaration<T>(node: ts.ImportClause, action: (declaration: ts.ImportClause | ts.NamespaceImport | ts.ImportSpecifier) => T | undefined): T | undefined {
    if (node.name) {
        const result = action(node);
        if (result) return result;
    }
    if (node.namedBindings) {
        const result = ts.isNamespaceImport(node.namedBindings)
            ? action(node.namedBindings)
            : ts.forEach(node.namedBindings.elements, action);
        if (result) return result;
    }
}

/** @internal */
export function hasQuestionToken(node: ts.Node) {
    if (node) {
        switch (node.kind) {
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.PropertySignature:
                return (node as ts.ParameterDeclaration | ts.MethodDeclaration | ts.PropertyDeclaration).questionToken !== undefined;
        }
    }

    return false;
}

/** @internal */
export function isJSDocConstructSignature(node: ts.Node) {
    const param = ts.isJSDocFunctionType(node) ? ts.firstOrUndefined(node.parameters) : undefined;
    const name = ts.tryCast(param && param.name, ts.isIdentifier);
    return !!name && name.escapedText === "new";
}

/** @internal */
export function isJSDocTypeAlias(node: ts.Node): node is ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag {
    return node.kind === ts.SyntaxKind.JSDocTypedefTag || node.kind === ts.SyntaxKind.JSDocCallbackTag || node.kind === ts.SyntaxKind.JSDocEnumTag;
}

/** @internal */
export function isTypeAlias(node: ts.Node): node is ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag | ts.TypeAliasDeclaration {
    return isJSDocTypeAlias(node) || ts.isTypeAliasDeclaration(node);
}

function getSourceOfAssignment(node: ts.Node): ts.Node | undefined {
    return ts.isExpressionStatement(node) &&
        ts.isBinaryExpression(node.expression) &&
        node.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken
        ? getRightMostAssignedExpression(node.expression)
        : undefined;
}

function getSourceOfDefaultedAssignment(node: ts.Node): ts.Node | undefined {
    return ts.isExpressionStatement(node) &&
        ts.isBinaryExpression(node.expression) &&
        getAssignmentDeclarationKind(node.expression) !== ts.AssignmentDeclarationKind.None &&
        ts.isBinaryExpression(node.expression.right) &&
        (node.expression.right.operatorToken.kind === ts.SyntaxKind.BarBarToken || node.expression.right.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
        ? node.expression.right.right
        : undefined;
}

/** @internal */
export function getSingleInitializerOfVariableStatementOrPropertyDeclaration(node: ts.Node): ts.Expression | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.VariableStatement:
            const v = getSingleVariableOfVariableStatement(node);
            return v && v.initializer;
        case ts.SyntaxKind.PropertyDeclaration:
            return (node as ts.PropertyDeclaration).initializer;
        case ts.SyntaxKind.PropertyAssignment:
            return (node as ts.PropertyAssignment).initializer;
    }
}

/** @internal */
export function getSingleVariableOfVariableStatement(node: ts.Node): ts.VariableDeclaration | undefined {
    return ts.isVariableStatement(node) ? ts.firstOrUndefined(node.declarationList.declarations) : undefined;
}

function getNestedModuleDeclaration(node: ts.Node): ts.Node | undefined {
    return ts.isModuleDeclaration(node) &&
        node.body &&
        node.body.kind === ts.SyntaxKind.ModuleDeclaration
        ? node.body
        : undefined;
}

/** @internal */
export function getJSDocCommentsAndTags(hostNode: ts.Node, noCache?: boolean): readonly (ts.JSDoc | ts.JSDocTag)[] {
    let result: (ts.JSDoc | ts.JSDocTag)[] | undefined;
    // Pull parameter comments from declaring function as well
    if (isVariableLike(hostNode) && ts.hasInitializer(hostNode) && ts.hasJSDocNodes(hostNode.initializer!)) {
        result = ts.addRange(result, filterOwnedJSDocTags(hostNode, ts.last((hostNode.initializer as ts.HasJSDoc).jsDoc!)));
    }

    let node: ts.Node | undefined = hostNode;
    while (node && node.parent) {
        if (ts.hasJSDocNodes(node)) {
            result = ts.addRange(result, filterOwnedJSDocTags(hostNode, ts.last(node.jsDoc!)));
        }

        if (node.kind === ts.SyntaxKind.Parameter) {
            result = ts.addRange(result, (noCache ? ts.getJSDocParameterTagsNoCache : ts.getJSDocParameterTags)(node as ts.ParameterDeclaration));
            break;
        }
        if (node.kind === ts.SyntaxKind.TypeParameter) {
            result = ts.addRange(result, (noCache ? ts.getJSDocTypeParameterTagsNoCache : ts.getJSDocTypeParameterTags)(node as ts.TypeParameterDeclaration));
            break;
        }
        node = getNextJSDocCommentLocation(node);
    }
    return result || ts.emptyArray;
}

function filterOwnedJSDocTags(hostNode: ts.Node, jsDoc: ts.JSDoc | ts.JSDocTag) {
    if (ts.isJSDoc(jsDoc)) {
        const ownedTags = ts.filter(jsDoc.tags, tag => ownsJSDocTag(hostNode, tag));
        return jsDoc.tags === ownedTags ? [jsDoc] : ownedTags;
    }
    return ownsJSDocTag(hostNode, jsDoc) ? [jsDoc] : undefined;
}

/**
 * Determines whether a host node owns a jsDoc tag. A `@type` tag attached to a
 * a ParenthesizedExpression belongs only to the ParenthesizedExpression.
 */
function ownsJSDocTag(hostNode: ts.Node, tag: ts.JSDocTag) {
    return !ts.isJSDocTypeTag(tag)
        || !tag.parent
        || !ts.isJSDoc(tag.parent)
        || !ts.isParenthesizedExpression(tag.parent.parent)
        || tag.parent.parent === hostNode;
}

/** @internal */
export function getNextJSDocCommentLocation(node: ts.Node) {
    const parent = node.parent;
    if (parent.kind === ts.SyntaxKind.PropertyAssignment ||
        parent.kind === ts.SyntaxKind.ExportAssignment ||
        parent.kind === ts.SyntaxKind.PropertyDeclaration ||
        parent.kind === ts.SyntaxKind.ExpressionStatement && node.kind === ts.SyntaxKind.PropertyAccessExpression ||
        parent.kind === ts.SyntaxKind.ReturnStatement ||
        getNestedModuleDeclaration(parent) ||
        ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        return parent;
    }
    // Try to recognize this pattern when node is initializer of variable declaration and JSDoc comments are on containing variable statement.
    // /**
    //   * @param {number} name
    //   * @returns {number}
    //   */
    // var x = function(name) { return name.length; }
    else if (parent.parent &&
        (getSingleVariableOfVariableStatement(parent.parent) === node ||
        ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken)) {
        return parent.parent;
    }
    else if (parent.parent && parent.parent.parent &&
        (getSingleVariableOfVariableStatement(parent.parent.parent) ||
        getSingleInitializerOfVariableStatementOrPropertyDeclaration(parent.parent.parent) === node ||
        getSourceOfDefaultedAssignment(parent.parent.parent))) {
        return parent.parent.parent;
    }
}

/** @internal */
/** Does the opposite of `getJSDocParameterTags`: given a JSDoc parameter, finds the parameter corresponding to it. */
export function getParameterSymbolFromJSDoc(node: ts.JSDocParameterTag): ts.Symbol | undefined {
    if (node.symbol) {
        return node.symbol;
    }
    if (!ts.isIdentifier(node.name)) {
        return undefined;
    }
    const name = node.name.escapedText;
    const decl = getHostSignatureFromJSDoc(node);
    if (!decl) {
        return undefined;
    }
    const parameter = ts.find(decl.parameters, p => p.name.kind === ts.SyntaxKind.Identifier && p.name.escapedText === name);
    return parameter && parameter.symbol;
}

/** @internal */
export function getEffectiveContainerForJSDocTemplateTag(node: ts.JSDocTemplateTag) {
    if (ts.isJSDoc(node.parent) && node.parent.tags) {
        // A @template tag belongs to any @typedef, @callback, or @enum tags in the same comment block, if they exist.
        const typeAlias = ts.find(node.parent.tags, isJSDocTypeAlias);
        if (typeAlias) {
            return typeAlias;
        }
    }
    // otherwise it belongs to the host it annotates
    return getHostSignatureFromJSDoc(node);
}

/** @internal */
export function getHostSignatureFromJSDoc(node: ts.Node): ts.SignatureDeclaration | undefined {
    const host = getEffectiveJSDocHost(node);
    if (host) {
        return ts.isPropertySignature(host) && host.type && ts.isFunctionLike(host.type) ? host.type :
            ts.isFunctionLike(host) ? host : undefined;
    }
    return undefined;
}

/** @internal */
export function getEffectiveJSDocHost(node: ts.Node): ts.Node | undefined {
    const host = getJSDocHost(node);
    if (host) {
        return getSourceOfDefaultedAssignment(host)
            || getSourceOfAssignment(host)
            || getSingleInitializerOfVariableStatementOrPropertyDeclaration(host)
            || getSingleVariableOfVariableStatement(host)
            || getNestedModuleDeclaration(host)
            || host;
    }
}

/** @internal */
/** Use getEffectiveJSDocHost if you additionally need to look for jsdoc on parent nodes, like assignments. */
export function getJSDocHost(node: ts.Node): ts.HasJSDoc | undefined {
    const jsDoc = getJSDocRoot(node);
    if (!jsDoc) {
        return undefined;
    }

    const host = jsDoc.parent;
    if (host && host.jsDoc && jsDoc === ts.lastOrUndefined(host.jsDoc)) {
        return host;
    }
}

/** @internal */
export function getJSDocRoot(node: ts.Node): ts.JSDoc | undefined {
    return ts.findAncestor(node.parent, ts.isJSDoc);
}

/** @internal */
export function getTypeParameterFromJsDoc(node: ts.TypeParameterDeclaration & { parent: ts.JSDocTemplateTag }): ts.TypeParameterDeclaration | undefined {
    const name = node.name.escapedText;
    const { typeParameters } = (node.parent.parent.parent as ts.SignatureDeclaration | ts.InterfaceDeclaration | ts.ClassDeclaration);
    return typeParameters && ts.find(typeParameters, p => p.name.escapedText === name);
}

/** @internal */
export function hasTypeArguments(node: ts.Node): node is ts.HasTypeArguments {
    return !!(node as ts.HasTypeArguments).typeArguments;
}

/** @internal */
export const enum AssignmentKind {
    None, Definite, Compound
}

/** @internal */
export function getAssignmentTargetKind(node: ts.Node): AssignmentKind {
    let parent = node.parent;
    while (true) {
        switch (parent.kind) {
            case ts.SyntaxKind.BinaryExpression:
                const binaryOperator = (parent as ts.BinaryExpression).operatorToken.kind;
                return isAssignmentOperator(binaryOperator) && (parent as ts.BinaryExpression).left === node ?
                    binaryOperator === ts.SyntaxKind.EqualsToken || isLogicalOrCoalescingAssignmentOperator(binaryOperator) ? AssignmentKind.Definite : AssignmentKind.Compound :
                    AssignmentKind.None;
            case ts.SyntaxKind.PrefixUnaryExpression:
            case ts.SyntaxKind.PostfixUnaryExpression:
                const unaryOperator = (parent as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression).operator;
                return unaryOperator === ts.SyntaxKind.PlusPlusToken || unaryOperator === ts.SyntaxKind.MinusMinusToken ? AssignmentKind.Compound : AssignmentKind.None;
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
                return (parent as ts.ForInOrOfStatement).initializer === node ? AssignmentKind.Definite : AssignmentKind.None;
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
            case ts.SyntaxKind.SpreadElement:
            case ts.SyntaxKind.NonNullExpression:
                node = parent;
                break;
            case ts.SyntaxKind.SpreadAssignment:
                node = parent.parent;
                break;
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                if ((parent as ts.ShorthandPropertyAssignment).name !== node) {
                    return AssignmentKind.None;
                }
                node = parent.parent;
                break;
            case ts.SyntaxKind.PropertyAssignment:
                if ((parent as ts.ShorthandPropertyAssignment).name === node) {
                    return AssignmentKind.None;
                }
                node = parent.parent;
                break;
            default:
                return AssignmentKind.None;
        }
        parent = node.parent;
    }
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
/** @internal */
export function isAssignmentTarget(node: ts.Node): boolean {
    return getAssignmentTargetKind(node) !== AssignmentKind.None;
}

/** @internal */
export type NodeWithPossibleHoistedDeclaration =
    | ts.Block
    | ts.VariableStatement
    | ts.WithStatement
    | ts.IfStatement
    | ts.SwitchStatement
    | ts.CaseBlock
    | ts.CaseClause
    | ts.DefaultClause
    | ts.LabeledStatement
    | ts.ForStatement
    | ts.ForInStatement
    | ts.ForOfStatement
    | ts.DoStatement
    | ts.WhileStatement
    | ts.TryStatement
    | ts.CatchClause;

/** @internal */
/**
 * Indicates whether a node could contain a `var` VariableDeclarationList that contributes to
 * the same `var` declaration scope as the node's parent.
 */
export function isNodeWithPossibleHoistedDeclaration(node: ts.Node): node is NodeWithPossibleHoistedDeclaration {
    switch (node.kind) {
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.WithStatement:
        case ts.SyntaxKind.IfStatement:
        case ts.SyntaxKind.SwitchStatement:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.CaseClause:
        case ts.SyntaxKind.DefaultClause:
        case ts.SyntaxKind.LabeledStatement:
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.DoStatement:
        case ts.SyntaxKind.WhileStatement:
        case ts.SyntaxKind.TryStatement:
        case ts.SyntaxKind.CatchClause:
            return true;
    }
    return false;
}

/** @internal */
export type ValueSignatureDeclaration =
    | ts.FunctionDeclaration
    | ts.MethodDeclaration
    | ts.ConstructorDeclaration
    | ts.AccessorDeclaration
    | ts.FunctionExpression
    | ts.ArrowFunction;

/** @internal */
export function isValueSignatureDeclaration(node: ts.Node): node is ValueSignatureDeclaration {
    return ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodOrAccessor(node) || ts.isFunctionDeclaration(node) || ts.isConstructorDeclaration(node);
}

function walkUp(node: ts.Node, kind: ts.SyntaxKind) {
    while (node && node.kind === kind) {
        node = node.parent;
    }
    return node;
}

/** @internal */
export function walkUpParenthesizedTypes(node: ts.Node) {
    return walkUp(node, ts.SyntaxKind.ParenthesizedType);
}

/** @internal */
export function walkUpParenthesizedExpressions(node: ts.Node) {
    return walkUp(node, ts.SyntaxKind.ParenthesizedExpression);
}

/** @internal */
/**
 * Walks up parenthesized types.
 * It returns both the outermost parenthesized type and its parent.
 * If given node is not a parenthesiezd type, undefined is return as the former.
 */
export function walkUpParenthesizedTypesAndGetParentAndChild(node: ts.Node): [ts.ParenthesizedTypeNode | undefined, ts.Node] {
    let child: ts.ParenthesizedTypeNode | undefined;
    while (node && node.kind === ts.SyntaxKind.ParenthesizedType) {
        child = node as ts.ParenthesizedTypeNode;
        node = node.parent;
    }
    return [child, node];
}

/** @internal */
export function skipTypeParentheses(node: ts.TypeNode): ts.TypeNode {
    while (ts.isParenthesizedTypeNode(node)) node = node.type;
    return node;
}

/** @internal */
export function skipParentheses(node: ts.Expression, excludeJSDocTypeAssertions?: boolean): ts.Expression;
/** @internal */
export function skipParentheses(node: ts.Node, excludeJSDocTypeAssertions?: boolean): ts.Node;
/** @internal */
export function skipParentheses(node: ts.Node, excludeJSDocTypeAssertions?: boolean): ts.Node {
    const flags = excludeJSDocTypeAssertions ?
        ts.OuterExpressionKinds.Parentheses | ts.OuterExpressionKinds.ExcludeJSDocTypeAssertion :
        ts.OuterExpressionKinds.Parentheses;
    return ts.skipOuterExpressions(node, flags);
}

// a node is delete target iff. it is PropertyAccessExpression/ElementAccessExpression with parentheses skipped
/** @internal */
export function isDeleteTarget(node: ts.Node): boolean {
    if (node.kind !== ts.SyntaxKind.PropertyAccessExpression && node.kind !== ts.SyntaxKind.ElementAccessExpression) {
        return false;
    }
    node = walkUpParenthesizedExpressions(node.parent);
    return node && node.kind === ts.SyntaxKind.DeleteExpression;
}

/** @internal */
export function isNodeDescendantOf(node: ts.Node, ancestor: ts.Node | undefined): boolean {
    while (node) {
        if (node === ancestor) return true;
        node = node.parent;
    }
    return false;
}

// True if `name` is the name of a declaration node
/** @internal */
export function isDeclarationName(name: ts.Node): boolean {
    return !ts.isSourceFile(name) && !ts.isBindingPattern(name) && ts.isDeclaration(name.parent) && name.parent.name === name;
}

// See GH#16030
/** @internal */
export function getDeclarationFromName(name: ts.Node): ts.Declaration | undefined {
    const parent = name.parent;
    switch (name.kind) {
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.NumericLiteral:
            if (ts.isComputedPropertyName(parent)) return parent.parent;
            // falls through
        case ts.SyntaxKind.Identifier:
            if (ts.isDeclaration(parent)) {
                return parent.name === name ? parent : undefined;
            }
            else if (ts.isQualifiedName(parent)) {
                const tag = parent.parent;
                return ts.isJSDocParameterTag(tag) && tag.name === parent ? tag : undefined;
            }
            else {
                const binExp = parent.parent;
                return ts.isBinaryExpression(binExp) &&
                    getAssignmentDeclarationKind(binExp) !== ts.AssignmentDeclarationKind.None &&
                    (binExp.left.symbol || binExp.symbol) &&
                    ts.getNameOfDeclaration(binExp) === name
                    ? binExp
                    : undefined;
            }
        case ts.SyntaxKind.PrivateIdentifier:
            return ts.isDeclaration(parent) && parent.name === name ? parent : undefined;
        default:
            return undefined;
    }
}

/** @internal */
export function isLiteralComputedPropertyDeclarationName(node: ts.Node) {
    return isStringOrNumericLiteralLike(node) &&
        node.parent.kind === ts.SyntaxKind.ComputedPropertyName &&
        ts.isDeclaration(node.parent.parent);
}

// Return true if the given identifier is classified as an IdentifierName
/** @internal */
export function isIdentifierName(node: ts.Identifier): boolean {
    const parent = node.parent;
    switch (parent.kind) {
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.PropertyAccessExpression:
            // Name in member declaration or property name in property access
            return (parent as ts.NamedDeclaration | ts.PropertyAccessExpression).name === node;
        case ts.SyntaxKind.QualifiedName:
            // Name on right hand side of dot in a type query or type reference
            return (parent as ts.QualifiedName).right === node;
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.ImportSpecifier:
            // Property name in binding element or import specifier
            return (parent as ts.BindingElement | ts.ImportSpecifier).propertyName === node;
        case ts.SyntaxKind.ExportSpecifier:
        case ts.SyntaxKind.JsxAttribute:
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxOpeningElement:
        case ts.SyntaxKind.JsxClosingElement:
            // Any name in an export specifier or JSX Attribute or Jsx Element
            return true;
    }
    return false;
}

// An alias symbol is created by one of the following declarations:
// import <symbol> = ...
// import <symbol> from ...
// import * as <symbol> from ...
// import { x as <symbol> } from ...
// export { x as <symbol> } from ...
// export * as ns <symbol> from ...
// export = <EntityNameExpression>
// export default <EntityNameExpression>
// module.exports = <EntityNameExpression>
// module.exports.x = <EntityNameExpression>
// const x = require("...")
// const { x } = require("...")
// const x = require("...").y
// const { x } = require("...").y
/** @internal */
export function isAliasSymbolDeclaration(node: ts.Node): boolean {
    if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration ||
        node.kind === ts.SyntaxKind.NamespaceExportDeclaration ||
        node.kind === ts.SyntaxKind.ImportClause && !!(node as ts.ImportClause).name ||
        node.kind === ts.SyntaxKind.NamespaceImport ||
        node.kind === ts.SyntaxKind.NamespaceExport ||
        node.kind === ts.SyntaxKind.ImportSpecifier ||
        node.kind === ts.SyntaxKind.ExportSpecifier ||
        node.kind === ts.SyntaxKind.ExportAssignment && exportAssignmentIsAlias(node as ts.ExportAssignment)
    ) {
        return true;
    }

    return isInJSFile(node) && (
        ts.isBinaryExpression(node) && getAssignmentDeclarationKind(node) === ts.AssignmentDeclarationKind.ModuleExports && exportAssignmentIsAlias(node) ||
        ts.isPropertyAccessExpression(node)
            && ts.isBinaryExpression(node.parent)
            && node.parent.left === node
            && node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
            && isAliasableExpression(node.parent.right));
}

/** @internal */
export function getAliasDeclarationFromName(node: ts.EntityName): ts.Declaration | undefined {
    switch (node.parent.kind) {
        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.NamespaceImport:
        case ts.SyntaxKind.ExportSpecifier:
        case ts.SyntaxKind.ExportAssignment:
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.NamespaceExport:
            return node.parent as ts.Declaration;
        case ts.SyntaxKind.QualifiedName:
            do {
                node = node.parent as ts.QualifiedName;
            } while (node.parent.kind === ts.SyntaxKind.QualifiedName);
            return getAliasDeclarationFromName(node);
    }
}

/** @internal */
export function isAliasableExpression(e: ts.Expression) {
    return isEntityNameExpression(e) || ts.isClassExpression(e);
}

/** @internal */
export function exportAssignmentIsAlias(node: ts.ExportAssignment | ts.BinaryExpression): boolean {
    const e = getExportAssignmentExpression(node);
    return isAliasableExpression(e);
}

/** @internal */
export function getExportAssignmentExpression(node: ts.ExportAssignment | ts.BinaryExpression): ts.Expression {
    return ts.isExportAssignment(node) ? node.expression : node.right;
}

/** @internal */
export function getPropertyAssignmentAliasLikeExpression(node: ts.PropertyAssignment | ts.ShorthandPropertyAssignment | ts.PropertyAccessExpression): ts.Expression {
    return node.kind === ts.SyntaxKind.ShorthandPropertyAssignment ? node.name : node.kind === ts.SyntaxKind.PropertyAssignment ? node.initializer :
        (node.parent as ts.BinaryExpression).right;
}

/** @internal */
export function getEffectiveBaseTypeNode(node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration) {
    const baseType = getClassExtendsHeritageElement(node);
    if (baseType && isInJSFile(node)) {
        // Prefer an @augments tag because it may have type parameters.
        const tag = ts.getJSDocAugmentsTag(node);
        if (tag) {
            return tag.class;
        }
    }
    return baseType;
}

/** @internal */
export function getClassExtendsHeritageElement(node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration) {
    const heritageClause = getHeritageClause(node.heritageClauses, ts.SyntaxKind.ExtendsKeyword);
    return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
}

/** @internal */
export function getEffectiveImplementsTypeNodes(node: ts.ClassLikeDeclaration): undefined | readonly ts.ExpressionWithTypeArguments[]{
    if (isInJSFile(node)) {
        return ts.getJSDocImplementsTags(node).map(n => n.class);
    }
    else {
        const heritageClause = getHeritageClause(node.heritageClauses, ts.SyntaxKind.ImplementsKeyword);
        return heritageClause?.types;
    }
}

/** @internal */
/** Returns the node in an `extends` or `implements` clause of a class or interface. */
export function getAllSuperTypeNodes(node: ts.Node): readonly ts.TypeNode[] {
    return ts.isInterfaceDeclaration(node) ? getInterfaceBaseTypeNodes(node) || ts.emptyArray :
        ts.isClassLike(node) ? ts.concatenate(ts.singleElementArray(getEffectiveBaseTypeNode(node)), getEffectiveImplementsTypeNodes(node)) || ts.emptyArray :
        ts.emptyArray;
}

/** @internal */
export function getInterfaceBaseTypeNodes(node: ts.InterfaceDeclaration) {
    const heritageClause = getHeritageClause(node.heritageClauses, ts.SyntaxKind.ExtendsKeyword);
    return heritageClause ? heritageClause.types : undefined;
}

/** @internal */
export function getHeritageClause(clauses: ts.NodeArray<ts.HeritageClause> | undefined, kind: ts.SyntaxKind) {
    if (clauses) {
        for (const clause of clauses) {
            if (clause.token === kind) {
                return clause;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getAncestor(node: ts.Node | undefined, kind: ts.SyntaxKind): ts.Node | undefined {
    while (node) {
        if (node.kind === kind) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/** @internal */
export function isKeyword(token: ts.SyntaxKind): token is ts.KeywordSyntaxKind {
    return ts.SyntaxKind.FirstKeyword <= token && token <= ts.SyntaxKind.LastKeyword;
}

/** @internal */
export function isContextualKeyword(token: ts.SyntaxKind): boolean {
    return ts.SyntaxKind.FirstContextualKeyword <= token && token <= ts.SyntaxKind.LastContextualKeyword;
}

/** @internal */
export function isNonContextualKeyword(token: ts.SyntaxKind): boolean {
    return isKeyword(token) && !isContextualKeyword(token);
}

/** @internal */
export function isFutureReservedKeyword(token: ts.SyntaxKind): boolean {
    return ts.SyntaxKind.FirstFutureReservedWord <= token && token <= ts.SyntaxKind.LastFutureReservedWord;
}

/** @internal */
export function isStringANonContextualKeyword(name: string) {
    const token = ts.stringToToken(name);
    return token !== undefined && isNonContextualKeyword(token);
}

/** @internal */
export function isStringAKeyword(name: string) {
    const token = ts.stringToToken(name);
    return token !== undefined && isKeyword(token);
}

/** @internal */
export function isIdentifierANonContextualKeyword({ originalKeywordKind }: ts.Identifier): boolean {
    return !!originalKeywordKind && !isContextualKeyword(originalKeywordKind);
}

/** @internal */
export function isTrivia(token: ts.SyntaxKind): token is ts.TriviaSyntaxKind {
    return ts.SyntaxKind.FirstTriviaToken <= token && token <= ts.SyntaxKind.LastTriviaToken;
}

/** @internal */
export const enum FunctionFlags {
    Normal = 0,             // Function is a normal function
    Generator = 1 << 0,     // Function is a generator function or async generator function
    Async = 1 << 1,         // Function is an async function or an async generator function
    Invalid = 1 << 2,       // Function is a signature or overload and does not have a body.
    AsyncGenerator = Async | Generator, // Function is an async generator function
}

/** @internal */
export function getFunctionFlags(node: ts.SignatureDeclaration | undefined) {
    if (!node) {
        return FunctionFlags.Invalid;
    }

    let flags = FunctionFlags.Normal;
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.MethodDeclaration:
            if (node.asteriskToken) {
                flags |= FunctionFlags.Generator;
            }
            // falls through

        case ts.SyntaxKind.ArrowFunction:
            if (hasSyntacticModifier(node, ts.ModifierFlags.Async)) {
                flags |= FunctionFlags.Async;
            }
            break;
    }

    if (!(node as ts.FunctionLikeDeclaration).body) {
        flags |= FunctionFlags.Invalid;
    }

    return flags;
}

/** @internal */
export function isAsyncFunction(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.MethodDeclaration:
            return (node as ts.FunctionLikeDeclaration).body !== undefined
                && (node as ts.FunctionLikeDeclaration).asteriskToken === undefined
                && hasSyntacticModifier(node, ts.ModifierFlags.Async);
    }
    return false;
}

/** @internal */
export function isStringOrNumericLiteralLike(node: ts.Node): node is ts.StringLiteralLike | ts.NumericLiteral {
    return ts.isStringLiteralLike(node) || ts.isNumericLiteral(node);
}

/** @internal */
export function isSignedNumericLiteral(node: ts.Node): node is ts.PrefixUnaryExpression & { operand: ts.NumericLiteral } {
    return ts.isPrefixUnaryExpression(node) && (node.operator === ts.SyntaxKind.PlusToken || node.operator === ts.SyntaxKind.MinusToken) && ts.isNumericLiteral(node.operand);
}

/** @internal */
/**
 * A declaration has a dynamic name if all of the following are true:
 *   1. The declaration has a computed property name.
 *   2. The computed name is *not* expressed as a StringLiteral.
 *   3. The computed name is *not* expressed as a NumericLiteral.
 *   4. The computed name is *not* expressed as a PlusToken or MinusToken
 *      immediately followed by a NumericLiteral.
 */
export function hasDynamicName(declaration: ts.Declaration): declaration is ts.DynamicNamedDeclaration | ts.DynamicNamedBinaryExpression {
    const name = ts.getNameOfDeclaration(declaration);
    return !!name && isDynamicName(name);
}

/** @internal */
export function isDynamicName(name: ts.DeclarationName): boolean {
    if (!(name.kind === ts.SyntaxKind.ComputedPropertyName || name.kind === ts.SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    const expr = ts.isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
    return !isStringOrNumericLiteralLike(expr) &&
        !isSignedNumericLiteral(expr);
}

/** @internal */
export function getPropertyNameForPropertyNameNode(name: ts.PropertyName): ts.__String | undefined {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.PrivateIdentifier:
            return name.escapedText;
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return ts.escapeLeadingUnderscores(name.text);
        case ts.SyntaxKind.ComputedPropertyName:
            const nameExpression = name.expression;
            if (isStringOrNumericLiteralLike(nameExpression)) {
                return ts.escapeLeadingUnderscores(nameExpression.text);
            }
            else if (isSignedNumericLiteral(nameExpression)) {
                if (nameExpression.operator === ts.SyntaxKind.MinusToken) {
                    return ts.tokenToString(nameExpression.operator) + nameExpression.operand.text as ts.__String;
                }
                return nameExpression.operand.text as ts.__String;
            }
            return undefined;
        default:
            return ts.Debug.assertNever(name);
    }
}

/** @internal */
export function isPropertyNameLiteral(node: ts.Node): node is ts.PropertyNameLiteral {
    switch (node.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return true;
        default:
            return false;
    }
}
/** @internal */
export function getTextOfIdentifierOrLiteral(node: ts.PropertyNameLiteral | ts.PrivateIdentifier): string {
    return ts.isMemberName(node) ? ts.idText(node) : node.text;
}

/** @internal */
export function getEscapedTextOfIdentifierOrLiteral(node: ts.PropertyNameLiteral): ts.__String {
    return ts.isMemberName(node) ? node.escapedText : ts.escapeLeadingUnderscores(node.text);
}

/** @internal */
export function getPropertyNameForUniqueESSymbol(symbol: ts.Symbol): ts.__String {
    return `__@${ts.getSymbolId(symbol)}@${symbol.escapedName}` as ts.__String;
}

/** @internal */
export function getSymbolNameForPrivateIdentifier(containingClassSymbol: ts.Symbol, description: ts.__String): ts.__String {
    return `__#${ts.getSymbolId(containingClassSymbol)}@${description}` as ts.__String;
}

/** @internal */
export function isKnownSymbol(symbol: ts.Symbol): boolean {
    return ts.startsWith(symbol.escapedName as string, "__@");
}

/** @internal */
export function isPrivateIdentifierSymbol(symbol: ts.Symbol): boolean {
    return ts.startsWith(symbol.escapedName as string, "__#");
}

/** @internal */
/**
 * Includes the word "Symbol" with unicode escapes
 */
export function isESSymbolIdentifier(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.Identifier && (node as ts.Identifier).escapedText === "Symbol";
}

/** @internal */
export function isPushOrUnshiftIdentifier(node: ts.Identifier) {
    return node.escapedText === "push" || node.escapedText === "unshift";
}

/** @internal */
export function isParameterDeclaration(node: ts.VariableLikeDeclaration): boolean {
    const root = getRootDeclaration(node);
    return root.kind === ts.SyntaxKind.Parameter;
}

/** @internal */
export function getRootDeclaration(node: ts.Node): ts.Node {
    while (node.kind === ts.SyntaxKind.BindingElement) {
        node = node.parent.parent;
    }
    return node;
}

/** @internal */
export function nodeStartsNewLexicalEnvironment(node: ts.Node): boolean {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.FunctionExpression
        || kind === ts.SyntaxKind.FunctionDeclaration
        || kind === ts.SyntaxKind.ArrowFunction
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor
        || kind === ts.SyntaxKind.ModuleDeclaration
        || kind === ts.SyntaxKind.SourceFile;
}

/** @internal */
export function nodeIsSynthesized(range: ts.TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}

/** @internal */
export function getOriginalSourceFile(sourceFile: ts.SourceFile) {
    return ts.getParseTreeNode(sourceFile, ts.isSourceFile) || sourceFile;
}

/** @internal */
export const enum Associativity {
    Left,
    Right
}

/** @internal */
export function getExpressionAssociativity(expression: ts.Expression) {
    const operator = getOperator(expression);
    const hasArguments = expression.kind === ts.SyntaxKind.NewExpression && (expression as ts.NewExpression).arguments !== undefined;
    return getOperatorAssociativity(expression.kind, operator, hasArguments);
}

/** @internal */
export function getOperatorAssociativity(kind: ts.SyntaxKind, operator: ts.SyntaxKind, hasArguments?: boolean) {
    switch (kind) {
        case ts.SyntaxKind.NewExpression:
            return hasArguments ? Associativity.Left : Associativity.Right;

        case ts.SyntaxKind.PrefixUnaryExpression:
        case ts.SyntaxKind.TypeOfExpression:
        case ts.SyntaxKind.VoidExpression:
        case ts.SyntaxKind.DeleteExpression:
        case ts.SyntaxKind.AwaitExpression:
        case ts.SyntaxKind.ConditionalExpression:
        case ts.SyntaxKind.YieldExpression:
            return Associativity.Right;

        case ts.SyntaxKind.BinaryExpression:
            switch (operator) {
                case ts.SyntaxKind.AsteriskAsteriskToken:
                case ts.SyntaxKind.EqualsToken:
                case ts.SyntaxKind.PlusEqualsToken:
                case ts.SyntaxKind.MinusEqualsToken:
                case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
                case ts.SyntaxKind.AsteriskEqualsToken:
                case ts.SyntaxKind.SlashEqualsToken:
                case ts.SyntaxKind.PercentEqualsToken:
                case ts.SyntaxKind.LessThanLessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.AmpersandEqualsToken:
                case ts.SyntaxKind.CaretEqualsToken:
                case ts.SyntaxKind.BarEqualsToken:
                case ts.SyntaxKind.BarBarEqualsToken:
                case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
                case ts.SyntaxKind.QuestionQuestionEqualsToken:
                    return Associativity.Right;
            }
    }
    return Associativity.Left;
}

/** @internal */
export function getExpressionPrecedence(expression: ts.Expression) {
    const operator = getOperator(expression);
    const hasArguments = expression.kind === ts.SyntaxKind.NewExpression && (expression as ts.NewExpression).arguments !== undefined;
    return getOperatorPrecedence(expression.kind, operator, hasArguments);
}

/** @internal */
export function getOperator(expression: ts.Expression): ts.SyntaxKind {
    if (expression.kind === ts.SyntaxKind.BinaryExpression) {
        return (expression as ts.BinaryExpression).operatorToken.kind;
    }
    else if (expression.kind === ts.SyntaxKind.PrefixUnaryExpression || expression.kind === ts.SyntaxKind.PostfixUnaryExpression) {
        return (expression as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression).operator;
    }
    else {
        return expression.kind;
    }
}

/** @internal */
export const enum OperatorPrecedence {
    // Expression:
    //     AssignmentExpression
    //     Expression `,` AssignmentExpression
    Comma,

    // NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
    // SpreadElement:
    //     `...` AssignmentExpression
    Spread,

    // AssignmentExpression:
    //     ConditionalExpression
    //     YieldExpression
    //     ArrowFunction
    //     AsyncArrowFunction
    //     LeftHandSideExpression `=` AssignmentExpression
    //     LeftHandSideExpression AssignmentOperator AssignmentExpression
    //
    // NOTE: AssignmentExpression is broken down into several precedences due to the requirements
    //       of the parenthesizer rules.

    // AssignmentExpression: YieldExpression
    // YieldExpression:
    //     `yield`
    //     `yield` AssignmentExpression
    //     `yield` `*` AssignmentExpression
    Yield,

    // AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
    // AssignmentExpression: LeftHandSideExpression AssignmentOperator AssignmentExpression
    // AssignmentOperator: one of
    //     `*=` `/=` `%=` `+=` `-=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `**=`
    Assignment,

    // NOTE: `Conditional` is considered higher than `Assignment` here, but in reality they have
    //       the same precedence.
    // AssignmentExpression: ConditionalExpression
    // ConditionalExpression:
    //     ShortCircuitExpression
    //     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
    // ShortCircuitExpression:
    //     LogicalORExpression
    //     CoalesceExpression
    Conditional,

    // CoalesceExpression:
    //     CoalesceExpressionHead `??` BitwiseORExpression
    // CoalesceExpressionHead:
    //     CoalesceExpression
    //     BitwiseORExpression
    Coalesce = Conditional, // NOTE: This is wrong

    // LogicalORExpression:
    //     LogicalANDExpression
    //     LogicalORExpression `||` LogicalANDExpression
    LogicalOR,

    // LogicalANDExpression:
    //     BitwiseORExpression
    //     LogicalANDExprerssion `&&` BitwiseORExpression
    LogicalAND,

    // BitwiseORExpression:
    //     BitwiseXORExpression
    //     BitwiseORExpression `^` BitwiseXORExpression
    BitwiseOR,

    // BitwiseXORExpression:
    //     BitwiseANDExpression
    //     BitwiseXORExpression `^` BitwiseANDExpression
    BitwiseXOR,

    // BitwiseANDExpression:
    //     EqualityExpression
    //     BitwiseANDExpression `^` EqualityExpression
    BitwiseAND,

    // EqualityExpression:
    //     RelationalExpression
    //     EqualityExpression `==` RelationalExpression
    //     EqualityExpression `!=` RelationalExpression
    //     EqualityExpression `===` RelationalExpression
    //     EqualityExpression `!==` RelationalExpression
    Equality,

    // RelationalExpression:
    //     ShiftExpression
    //     RelationalExpression `<` ShiftExpression
    //     RelationalExpression `>` ShiftExpression
    //     RelationalExpression `<=` ShiftExpression
    //     RelationalExpression `>=` ShiftExpression
    //     RelationalExpression `instanceof` ShiftExpression
    //     RelationalExpression `in` ShiftExpression
    //     [+TypeScript] RelationalExpression `as` Type
    Relational,

    // ShiftExpression:
    //     AdditiveExpression
    //     ShiftExpression `<<` AdditiveExpression
    //     ShiftExpression `>>` AdditiveExpression
    //     ShiftExpression `>>>` AdditiveExpression
    Shift,

    // AdditiveExpression:
    //     MultiplicativeExpression
    //     AdditiveExpression `+` MultiplicativeExpression
    //     AdditiveExpression `-` MultiplicativeExpression
    Additive,

    // MultiplicativeExpression:
    //     ExponentiationExpression
    //     MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
    // MultiplicativeOperator: one of `*`, `/`, `%`
    Multiplicative,

    // ExponentiationExpression:
    //     UnaryExpression
    //     UpdateExpression `**` ExponentiationExpression
    Exponentiation,

    // UnaryExpression:
    //     UpdateExpression
    //     `delete` UnaryExpression
    //     `void` UnaryExpression
    //     `typeof` UnaryExpression
    //     `+` UnaryExpression
    //     `-` UnaryExpression
    //     `~` UnaryExpression
    //     `!` UnaryExpression
    //     AwaitExpression
    // UpdateExpression:            // TODO: Do we need to investigate the precedence here?
    //     `++` UnaryExpression
    //     `--` UnaryExpression
    Unary,


    // UpdateExpression:
    //     LeftHandSideExpression
    //     LeftHandSideExpression `++`
    //     LeftHandSideExpression `--`
    Update,

    // LeftHandSideExpression:
    //     NewExpression
    //     CallExpression
    // NewExpression:
    //     MemberExpression
    //     `new` NewExpression
    LeftHandSide,

    // CallExpression:
    //     CoverCallExpressionAndAsyncArrowHead
    //     SuperCall
    //     ImportCall
    //     CallExpression Arguments
    //     CallExpression `[` Expression `]`
    //     CallExpression `.` IdentifierName
    //     CallExpression TemplateLiteral
    // MemberExpression:
    //     PrimaryExpression
    //     MemberExpression `[` Expression `]`
    //     MemberExpression `.` IdentifierName
    //     MemberExpression TemplateLiteral
    //     SuperProperty
    //     MetaProperty
    //     `new` MemberExpression Arguments
    Member,

    // TODO: JSXElement?
    // PrimaryExpression:
    //     `this`
    //     IdentifierReference
    //     Literal
    //     ArrayLiteral
    //     ObjectLiteral
    //     FunctionExpression
    //     ClassExpression
    //     GeneratorExpression
    //     AsyncFunctionExpression
    //     AsyncGeneratorExpression
    //     RegularExpressionLiteral
    //     TemplateLiteral
    //     CoverParenthesizedExpressionAndArrowParameterList
    Primary,

    Highest = Primary,
    Lowest = Comma,
    // -1 is lower than all other precedences. Returning it will cause binary expression
    // parsing to stop.
    Invalid = -1,
}

/** @internal */
export function getOperatorPrecedence(nodeKind: ts.SyntaxKind, operatorKind: ts.SyntaxKind, hasArguments?: boolean) {
    switch (nodeKind) {
        case ts.SyntaxKind.CommaListExpression:
            return OperatorPrecedence.Comma;

        case ts.SyntaxKind.SpreadElement:
            return OperatorPrecedence.Spread;

        case ts.SyntaxKind.YieldExpression:
            return OperatorPrecedence.Yield;

        case ts.SyntaxKind.ConditionalExpression:
            return OperatorPrecedence.Conditional;

        case ts.SyntaxKind.BinaryExpression:
            switch (operatorKind) {
                case ts.SyntaxKind.CommaToken:
                    return OperatorPrecedence.Comma;

                case ts.SyntaxKind.EqualsToken:
                case ts.SyntaxKind.PlusEqualsToken:
                case ts.SyntaxKind.MinusEqualsToken:
                case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
                case ts.SyntaxKind.AsteriskEqualsToken:
                case ts.SyntaxKind.SlashEqualsToken:
                case ts.SyntaxKind.PercentEqualsToken:
                case ts.SyntaxKind.LessThanLessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.AmpersandEqualsToken:
                case ts.SyntaxKind.CaretEqualsToken:
                case ts.SyntaxKind.BarEqualsToken:
                case ts.SyntaxKind.BarBarEqualsToken:
                case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
                case ts.SyntaxKind.QuestionQuestionEqualsToken:
                    return OperatorPrecedence.Assignment;

                default:
                    return getBinaryOperatorPrecedence(operatorKind);
            }

        // TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.NonNullExpression:
        case ts.SyntaxKind.PrefixUnaryExpression:
        case ts.SyntaxKind.TypeOfExpression:
        case ts.SyntaxKind.VoidExpression:
        case ts.SyntaxKind.DeleteExpression:
        case ts.SyntaxKind.AwaitExpression:
            return OperatorPrecedence.Unary;

        case ts.SyntaxKind.PostfixUnaryExpression:
            return OperatorPrecedence.Update;

        case ts.SyntaxKind.CallExpression:
            return OperatorPrecedence.LeftHandSide;

        case ts.SyntaxKind.NewExpression:
            return hasArguments ? OperatorPrecedence.Member : OperatorPrecedence.LeftHandSide;

        case ts.SyntaxKind.TaggedTemplateExpression:
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.ElementAccessExpression:
        case ts.SyntaxKind.MetaProperty:
            return OperatorPrecedence.Member;

        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.SatisfiesExpression:
            return OperatorPrecedence.Relational;

        case ts.SyntaxKind.ThisKeyword:
        case ts.SyntaxKind.SuperKeyword:
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.PrivateIdentifier:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.BigIntLiteral:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.RegularExpressionLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateExpression:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.OmittedExpression:
        case ts.SyntaxKind.JsxElement:
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxFragment:
            return OperatorPrecedence.Primary;

        default:
            return OperatorPrecedence.Invalid;
    }
}

/** @internal */
export function getBinaryOperatorPrecedence(kind: ts.SyntaxKind): OperatorPrecedence {
    switch (kind) {
        case ts.SyntaxKind.QuestionQuestionToken:
            return OperatorPrecedence.Coalesce;
        case ts.SyntaxKind.BarBarToken:
            return OperatorPrecedence.LogicalOR;
        case ts.SyntaxKind.AmpersandAmpersandToken:
            return OperatorPrecedence.LogicalAND;
        case ts.SyntaxKind.BarToken:
            return OperatorPrecedence.BitwiseOR;
        case ts.SyntaxKind.CaretToken:
            return OperatorPrecedence.BitwiseXOR;
        case ts.SyntaxKind.AmpersandToken:
            return OperatorPrecedence.BitwiseAND;
        case ts.SyntaxKind.EqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsToken:
        case ts.SyntaxKind.EqualsEqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
            return OperatorPrecedence.Equality;
        case ts.SyntaxKind.LessThanToken:
        case ts.SyntaxKind.GreaterThanToken:
        case ts.SyntaxKind.LessThanEqualsToken:
        case ts.SyntaxKind.GreaterThanEqualsToken:
        case ts.SyntaxKind.InstanceOfKeyword:
        case ts.SyntaxKind.InKeyword:
        case ts.SyntaxKind.AsKeyword:
        case ts.SyntaxKind.SatisfiesKeyword:
            return OperatorPrecedence.Relational;
        case ts.SyntaxKind.LessThanLessThanToken:
        case ts.SyntaxKind.GreaterThanGreaterThanToken:
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            return OperatorPrecedence.Shift;
        case ts.SyntaxKind.PlusToken:
        case ts.SyntaxKind.MinusToken:
            return OperatorPrecedence.Additive;
        case ts.SyntaxKind.AsteriskToken:
        case ts.SyntaxKind.SlashToken:
        case ts.SyntaxKind.PercentToken:
            return OperatorPrecedence.Multiplicative;
        case ts.SyntaxKind.AsteriskAsteriskToken:
            return OperatorPrecedence.Exponentiation;
    }

    // -1 is lower than all other precedences.  Returning it will cause binary expression
    // parsing to stop.
    return -1;
}

/** @internal */
export function getSemanticJsxChildren(children: readonly ts.JsxChild[]) {
    return ts.filter(children, i => {
        switch (i.kind) {
            case ts.SyntaxKind.JsxExpression:
                return !!i.expression;
            case ts.SyntaxKind.JsxText:
                return !i.containsOnlyTriviaWhiteSpaces;
            default:
                return true;
        }
    });
}

/** @internal */
export function createDiagnosticCollection(): ts.DiagnosticCollection {
    let nonFileDiagnostics = [] as ts.Diagnostic[] as ts.SortedArray<ts.Diagnostic>; // See GH#19873
    const filesWithDiagnostics = [] as string[] as ts.SortedArray<string>;
    const fileDiagnostics = new ts.Map<string, ts.SortedArray<ts.DiagnosticWithLocation>>();
    let hasReadNonFileDiagnostics = false;

    return {
        add,
        lookup,
        getGlobalDiagnostics,
        getDiagnostics,
    };

    function lookup(diagnostic: ts.Diagnostic): ts.Diagnostic | undefined {
        let diagnostics: ts.SortedArray<ts.Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
        }
        else {
            diagnostics = nonFileDiagnostics;
        }
        if (!diagnostics) {
            return undefined;
        }
        const result = ts.binarySearch(diagnostics, diagnostic, ts.identity, compareDiagnosticsSkipRelatedInformation);
        if (result >= 0) {
            return diagnostics[result];
        }
        return undefined;
    }

    function add(diagnostic: ts.Diagnostic): void {
        let diagnostics: ts.SortedArray<ts.Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
            if (!diagnostics) {
                diagnostics = [] as ts.Diagnostic[] as ts.SortedArray<ts.DiagnosticWithLocation>; // See GH#19873
                fileDiagnostics.set(diagnostic.file.fileName, diagnostics as ts.SortedArray<ts.DiagnosticWithLocation>);
                ts.insertSorted(filesWithDiagnostics, diagnostic.file.fileName, ts.compareStringsCaseSensitive);
            }
        }
        else {
            // If we've already read the non-file diagnostics, do not modify the existing array.
            if (hasReadNonFileDiagnostics) {
                hasReadNonFileDiagnostics = false;
                nonFileDiagnostics = nonFileDiagnostics.slice() as ts.SortedArray<ts.Diagnostic>;
            }

            diagnostics = nonFileDiagnostics;
        }

        ts.insertSorted(diagnostics, diagnostic, compareDiagnosticsSkipRelatedInformation);
    }

    function getGlobalDiagnostics(): ts.Diagnostic[] {
        hasReadNonFileDiagnostics = true;
        return nonFileDiagnostics;
    }

    function getDiagnostics(fileName: string): ts.DiagnosticWithLocation[];
    function getDiagnostics(): ts.Diagnostic[];
    function getDiagnostics(fileName?: string): ts.Diagnostic[] {
        if (fileName) {
            return fileDiagnostics.get(fileName) || [];
        }

        const fileDiags: ts.Diagnostic[] = ts.flatMapToMutable(filesWithDiagnostics, f => fileDiagnostics.get(f));
        if (!nonFileDiagnostics.length) {
            return fileDiags;
        }
        fileDiags.unshift(...nonFileDiagnostics);
        return fileDiags;
    }
}

const templateSubstitutionRegExp = /\$\{/g;
function escapeTemplateSubstitution(str: string): string {
    return str.replace(templateSubstitutionRegExp, "\\${");
}

/** @internal */
export function hasInvalidEscape(template: ts.TemplateLiteral): boolean {
    return template && !!(ts.isNoSubstitutionTemplateLiteral(template)
        ? template.templateFlags
        : (template.head.templateFlags || ts.some(template.templateSpans, span => !!span.literal.templateFlags)));
}

// This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated. Note that this regexp *does not* include the 'delete' character.
// There is no reason for this other than that JSON.stringify does not handle it either.
const doubleQuoteEscapedCharsRegExp = /[\\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
const singleQuoteEscapedCharsRegExp = /[\\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
// Template strings preserve simple LF newlines, still encode CRLF (or CR)
const backtickQuoteEscapedCharsRegExp = /\r\n|[\\\`\u0000-\u001f\t\v\f\b\r\u2028\u2029\u0085]/g;
const escapedCharsMap = new ts.Map(ts.getEntries({
    "\t": "\\t",
    "\v": "\\v",
    "\f": "\\f",
    "\b": "\\b",
    "\r": "\\r",
    "\n": "\\n",
    "\\": "\\\\",
    "\"": "\\\"",
    "\'": "\\\'",
    "\`": "\\\`",
    "\u2028": "\\u2028", // lineSeparator
    "\u2029": "\\u2029", // paragraphSeparator
    "\u0085": "\\u0085", // nextLine
    "\r\n": "\\r\\n", // special case for CRLFs in backticks
}));

function encodeUtf16EscapeSequence(charCode: number): string {
    const hexCharCode = charCode.toString(16).toUpperCase();
    const paddedHexCode = ("0000" + hexCharCode).slice(-4);
    return "\\u" + paddedHexCode;
}

function getReplacement(c: string, offset: number, input: string) {
    if (c.charCodeAt(0) === ts.CharacterCodes.nullCharacter) {
        const lookAhead = input.charCodeAt(offset + c.length);
        if (lookAhead >= ts.CharacterCodes._0 && lookAhead <= ts.CharacterCodes._9) {
            // If the null character is followed by digits, print as a hex escape to prevent the result from parsing as an octal (which is forbidden in strict mode)
            return "\\x00";
        }
        // Otherwise, keep printing a literal \0 for the null character
        return "\\0";
    }
    return escapedCharsMap.get(c) || encodeUtf16EscapeSequence(c.charCodeAt(0));
}

/** @internal */
/**
 * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
 * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
 * Note that this doesn't actually wrap the input in double quotes.
 */
export function escapeString(s: string, quoteChar?: ts.CharacterCodes.doubleQuote | ts.CharacterCodes.singleQuote | ts.CharacterCodes.backtick): string {
    const escapedCharsRegExp =
        quoteChar === ts.CharacterCodes.backtick ? backtickQuoteEscapedCharsRegExp :
        quoteChar === ts.CharacterCodes.singleQuote ? singleQuoteEscapedCharsRegExp :
        doubleQuoteEscapedCharsRegExp;
    return s.replace(escapedCharsRegExp, getReplacement);
}

const nonAsciiCharacters = /[^\u0000-\u007F]/g;
/** @internal */
export function escapeNonAsciiString(s: string, quoteChar?: ts.CharacterCodes.doubleQuote | ts.CharacterCodes.singleQuote | ts.CharacterCodes.backtick): string {
    s = escapeString(s, quoteChar);
    // Replace non-ASCII characters with '\uNNNN' escapes if any exist.
    // Otherwise just return the original string.
    return nonAsciiCharacters.test(s) ?
        s.replace(nonAsciiCharacters, c => encodeUtf16EscapeSequence(c.charCodeAt(0))) :
        s;
}

// This consists of the first 19 unprintable ASCII characters, JSX canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated.
const jsxDoubleQuoteEscapedCharsRegExp = /[\"\u0000-\u001f\u2028\u2029\u0085]/g;
const jsxSingleQuoteEscapedCharsRegExp = /[\'\u0000-\u001f\u2028\u2029\u0085]/g;
const jsxEscapedCharsMap = new ts.Map(ts.getEntries({
    "\"": "&quot;",
    "\'": "&apos;"
}));

function encodeJsxCharacterEntity(charCode: number): string {
    const hexCharCode = charCode.toString(16).toUpperCase();
    return "&#x" + hexCharCode + ";";
}

function getJsxAttributeStringReplacement(c: string) {
    if (c.charCodeAt(0) === ts.CharacterCodes.nullCharacter) {
        return "&#0;";
    }
    return jsxEscapedCharsMap.get(c) || encodeJsxCharacterEntity(c.charCodeAt(0));
}

/** @internal */
export function escapeJsxAttributeString(s: string, quoteChar?: ts.CharacterCodes.doubleQuote | ts.CharacterCodes.singleQuote) {
    const escapedCharsRegExp =
        quoteChar === ts.CharacterCodes.singleQuote ? jsxSingleQuoteEscapedCharsRegExp :
        jsxDoubleQuoteEscapedCharsRegExp;
    return s.replace(escapedCharsRegExp, getJsxAttributeStringReplacement);
}

/** @internal */
/**
 * Strip off existed surrounding single quotes, double quotes, or backticks from a given string
 *
 * @return non-quoted string
 */
export function stripQuotes(name: string) {
    const length = name.length;
    if (length >= 2 && name.charCodeAt(0) === name.charCodeAt(length - 1) && isQuoteOrBacktick(name.charCodeAt(0))) {
        return name.substring(1, length - 1);
    }
    return name;
}

function isQuoteOrBacktick(charCode: number) {
    return charCode === ts.CharacterCodes.singleQuote ||
        charCode === ts.CharacterCodes.doubleQuote ||
        charCode === ts.CharacterCodes.backtick;
}

/** @internal */
export function isIntrinsicJsxName(name: ts.__String | string) {
    const ch = (name as string).charCodeAt(0);
    return (ch >= ts.CharacterCodes.a && ch <= ts.CharacterCodes.z) || ts.stringContains((name as string), "-") || ts.stringContains((name as string), ":");
}

const indentStrings: string[] = ["", "    "];
/** @internal */
export function getIndentString(level: number) {
    // prepopulate cache
    const singleLevel = indentStrings[1];
    for (let current = indentStrings.length; current <= level; current++) {
        indentStrings.push(indentStrings[current - 1] + singleLevel);
    }
    return indentStrings[level];
}

/** @internal */
export function getIndentSize() {
    return indentStrings[1].length;
}

/** @internal */
export function isNightly() {
    return ts.stringContains(ts.version, "-dev") || ts.stringContains(ts.version, "-insiders");
}

/** @internal */
export function createTextWriter(newLine: string): ts.EmitTextWriter {
    let output: string;
    let indent: number;
    let lineStart: boolean;
    let lineCount: number;
    let linePos: number;
    let hasTrailingComment = false;

    function updateLineCountAndPosFor(s: string) {
        const lineStartsOfS = ts.computeLineStarts(s);
        if (lineStartsOfS.length > 1) {
            lineCount = lineCount + lineStartsOfS.length - 1;
            linePos = output.length - s.length + ts.last(lineStartsOfS);
            lineStart = (linePos - output.length) === 0;
        }
        else {
            lineStart = false;
        }
    }

    function writeText(s: string) {
        if (s && s.length) {
            if (lineStart) {
                s = getIndentString(indent) + s;
                lineStart = false;
            }
            output += s;
            updateLineCountAndPosFor(s);
        }
    }

    function write(s: string) {
        if (s) hasTrailingComment = false;
        writeText(s);
    }

    function writeComment(s: string) {
        if (s) hasTrailingComment = true;
        writeText(s);
    }

    function reset(): void {
        output = "";
        indent = 0;
        lineStart = true;
        lineCount = 0;
        linePos = 0;
        hasTrailingComment = false;
    }

    function rawWrite(s: string) {
        if (s !== undefined) {
            output += s;
            updateLineCountAndPosFor(s);
            hasTrailingComment = false;
        }
    }

    function writeLiteral(s: string) {
        if (s && s.length) {
            write(s);
        }
    }

    function writeLine(force?: boolean) {
        if (!lineStart || force) {
            output += newLine;
            lineCount++;
            linePos = output.length;
            lineStart = true;
            hasTrailingComment = false;
        }
    }

    function getTextPosWithWriteLine() {
        return lineStart ? output.length : (output.length + newLine.length);
    }

    reset();

    return {
        write,
        rawWrite,
        writeLiteral,
        writeLine,
        increaseIndent: () => { indent++; },
        decreaseIndent: () => { indent--; },
        getIndent: () => indent,
        getTextPos: () => output.length,
        getLine: () => lineCount,
        getColumn: () => lineStart ? indent * getIndentSize() : output.length - linePos,
        getText: () => output,
        isAtStartOfLine: () => lineStart,
        hasTrailingComment: () => hasTrailingComment,
        hasTrailingWhitespace: () => !!output.length && ts.isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
        clear: reset,
        reportInaccessibleThisError: ts.noop,
        reportPrivateInBaseOfClassExpression: ts.noop,
        reportInaccessibleUniqueSymbolError: ts.noop,
        trackSymbol: () => false,
        writeKeyword: write,
        writeOperator: write,
        writeParameter: write,
        writeProperty: write,
        writePunctuation: write,
        writeSpace: write,
        writeStringLiteral: write,
        writeSymbol: (s, _) => write(s),
        writeTrailingSemicolon: write,
        writeComment,
        getTextPosWithWriteLine
    };
}

/** @internal */
export function getTrailingSemicolonDeferringWriter(writer: ts.EmitTextWriter): ts.EmitTextWriter {
    let pendingTrailingSemicolon = false;

    function commitPendingTrailingSemicolon() {
        if (pendingTrailingSemicolon) {
            writer.writeTrailingSemicolon(";");
            pendingTrailingSemicolon = false;
        }
    }

    return {
        ...writer,
        writeTrailingSemicolon() {
            pendingTrailingSemicolon = true;
        },
        writeLiteral(s) {
            commitPendingTrailingSemicolon();
            writer.writeLiteral(s);
        },
        writeStringLiteral(s) {
            commitPendingTrailingSemicolon();
            writer.writeStringLiteral(s);
        },
        writeSymbol(s, sym) {
            commitPendingTrailingSemicolon();
            writer.writeSymbol(s, sym);
        },
        writePunctuation(s) {
            commitPendingTrailingSemicolon();
            writer.writePunctuation(s);
        },
        writeKeyword(s) {
            commitPendingTrailingSemicolon();
            writer.writeKeyword(s);
        },
        writeOperator(s) {
            commitPendingTrailingSemicolon();
            writer.writeOperator(s);
        },
        writeParameter(s) {
            commitPendingTrailingSemicolon();
            writer.writeParameter(s);
        },
        writeSpace(s) {
            commitPendingTrailingSemicolon();
            writer.writeSpace(s);
        },
        writeProperty(s) {
            commitPendingTrailingSemicolon();
            writer.writeProperty(s);
        },
        writeComment(s) {
            commitPendingTrailingSemicolon();
            writer.writeComment(s);
        },
        writeLine() {
            commitPendingTrailingSemicolon();
            writer.writeLine();
        },
        increaseIndent() {
            commitPendingTrailingSemicolon();
            writer.increaseIndent();
        },
        decreaseIndent() {
            commitPendingTrailingSemicolon();
            writer.decreaseIndent();
        },
    };
}

/** @internal */
export function hostUsesCaseSensitiveFileNames(host: { useCaseSensitiveFileNames?(): boolean; }): boolean {
    return host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : false;
}

/** @internal */
export function hostGetCanonicalFileName(host: { useCaseSensitiveFileNames?(): boolean; }): ts.GetCanonicalFileName {
    return ts.createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host));
}

/** @internal */
export interface ResolveModuleNameResolutionHost {
    getCanonicalFileName(p: string): string;
    getCommonSourceDirectory(): string;
    getCurrentDirectory(): string;
}

/** @internal */
export function getResolvedExternalModuleName(host: ResolveModuleNameResolutionHost, file: ts.SourceFile, referenceFile?: ts.SourceFile): string {
    return file.moduleName || getExternalModuleNameFromPath(host, file.fileName, referenceFile && referenceFile.fileName);
}

function getCanonicalAbsolutePath(host: ResolveModuleNameResolutionHost, path: string) {
    return host.getCanonicalFileName(ts.getNormalizedAbsolutePath(path, host.getCurrentDirectory()));
}

/** @internal */
export function getExternalModuleNameFromDeclaration(host: ResolveModuleNameResolutionHost, resolver: ts.EmitResolver, declaration: ts.ImportEqualsDeclaration | ts.ImportDeclaration | ts.ExportDeclaration | ts.ModuleDeclaration | ts.ImportTypeNode): string | undefined {
    const file = resolver.getExternalModuleFileFromDeclaration(declaration);
    if (!file || file.isDeclarationFile) {
        return undefined;
    }
    // If the declaration already uses a non-relative name, and is outside the common source directory, continue to use it
    const specifier = getExternalModuleName(declaration);
    if (specifier && ts.isStringLiteralLike(specifier) && !ts.pathIsRelative(specifier.text) &&
        getCanonicalAbsolutePath(host, file.path).indexOf(getCanonicalAbsolutePath(host, ts.ensureTrailingDirectorySeparator(host.getCommonSourceDirectory()))) === -1) {
        return undefined;
    }
    return getResolvedExternalModuleName(host, file);
}

/** @internal */
/**
 * Resolves a local path to a path which is absolute to the base of the emit
 */
export function getExternalModuleNameFromPath(host: ResolveModuleNameResolutionHost, fileName: string, referencePath?: string): string {
    const getCanonicalFileName = (f: string) => host.getCanonicalFileName(f);
    const dir = ts.toPath(referencePath ? ts.getDirectoryPath(referencePath) : host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
    const filePath = ts.getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
    const relativePath = ts.getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    const extensionless = removeFileExtension(relativePath);
    return referencePath ? ts.ensurePathIsNonModuleName(extensionless) : extensionless;
}

/** @internal */
export function getOwnEmitOutputFilePath(fileName: string, host: ts.EmitHost, extension: string) {
    const compilerOptions = host.getCompilerOptions();
    let emitOutputFilePathWithoutExtension: string;
    if (compilerOptions.outDir) {
        emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(fileName, host, compilerOptions.outDir));
    }
    else {
        emitOutputFilePathWithoutExtension = removeFileExtension(fileName);
    }

    return emitOutputFilePathWithoutExtension + extension;
}

/** @internal */
export function getDeclarationEmitOutputFilePath(fileName: string, host: ts.EmitHost) {
    return getDeclarationEmitOutputFilePathWorker(fileName, host.getCompilerOptions(), host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getDeclarationEmitOutputFilePathWorker(fileName: string, options: ts.CompilerOptions, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: ts.GetCanonicalFileName): string {
    const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified

    const path = outputDir
        ? getSourceFilePathInNewDirWorker(fileName, outputDir, currentDirectory, commonSourceDirectory, getCanonicalFileName)
        : fileName;
    const declarationExtension = getDeclarationEmitExtensionForPath(path);
    return removeFileExtension(path) + declarationExtension;
}

/** @internal */
export function getDeclarationEmitExtensionForPath(path: string) {
    return ts.fileExtensionIsOneOf(path, [ts.Extension.Mjs, ts.Extension.Mts]) ? ts.Extension.Dmts :
        ts.fileExtensionIsOneOf(path, [ts.Extension.Cjs, ts.Extension.Cts]) ? ts.Extension.Dcts :
        ts.fileExtensionIsOneOf(path, [ts.Extension.Json]) ? `.json.d.ts` : // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
        ts.Extension.Dts;
}

/** @internal */
/**
 * This function is an inverse of `getDeclarationEmitExtensionForPath`.
 */
export function getPossibleOriginalInputExtensionForExtension(path: string) {
    return ts.fileExtensionIsOneOf(path, [ts.Extension.Dmts, ts.Extension.Mjs, ts.Extension.Mts]) ? [ts.Extension.Mts, ts.Extension.Mjs] :
        ts.fileExtensionIsOneOf(path, [ts.Extension.Dcts, ts.Extension.Cjs, ts.Extension.Cts]) ? [ts.Extension.Cts, ts.Extension.Cjs]:
        ts.fileExtensionIsOneOf(path, [`.json.d.ts`]) ? [ts.Extension.Json] :
        [ts.Extension.Tsx, ts.Extension.Ts, ts.Extension.Jsx, ts.Extension.Js];
}

/** @internal */
export function outFile(options: ts.CompilerOptions) {
    return options.outFile || options.out;
}

/** @internal */
/** Returns 'undefined' if and only if 'options.paths' is undefined. */
export function getPathsBasePath(options: ts.CompilerOptions, host: { getCurrentDirectory?(): string }) {
    if (!options.paths) return undefined;
    return options.baseUrl ?? ts.Debug.checkDefined(options.pathsBasePath || host.getCurrentDirectory?.(), "Encountered 'paths' without a 'baseUrl', config file, or host 'getCurrentDirectory'.");
}

/** @internal */
export interface EmitFileNames {
    jsFilePath?: string | undefined;
    sourceMapFilePath?: string | undefined;
    declarationFilePath?: string | undefined;
    declarationMapPath?: string | undefined;
    buildInfoPath?: string | undefined;
}

/** @internal */
/**
 * Gets the source files that are expected to have an emit output.
 *
 * Originally part of `forEachExpectedEmitFile`, this functionality was extracted to support
 * transformations.
 *
 * @param host An EmitHost.
 * @param targetSourceFile An optional target source file to emit.
 */
export function getSourceFilesToEmit(host: ts.EmitHost, targetSourceFile?: ts.SourceFile, forceDtsEmit?: boolean): readonly ts.SourceFile[] {
    const options = host.getCompilerOptions();
    if (outFile(options)) {
        const moduleKind = getEmitModuleKind(options);
        const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === ts.ModuleKind.AMD || moduleKind === ts.ModuleKind.System;
        // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
        return ts.filter(
            host.getSourceFiles(),
            sourceFile =>
                (moduleEmitEnabled || !ts.isExternalModule(sourceFile)) &&
                sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
        );
    }
    else {
        const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
        return ts.filter(
            sourceFiles,
            sourceFile => sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
        );
    }
}

/** @internal */
/** Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks. */
export function sourceFileMayBeEmitted(sourceFile: ts.SourceFile, host: ts.SourceFileMayBeEmittedHost, forceDtsEmit?: boolean) {
    const options = host.getCompilerOptions();
    return !(options.noEmitForJsFiles && isSourceFileJS(sourceFile)) &&
        !sourceFile.isDeclarationFile &&
        !host.isSourceFileFromExternalLibrary(sourceFile) &&
        (forceDtsEmit || (
            !(isJsonSourceFile(sourceFile) && host.getResolvedProjectReferenceToRedirect(sourceFile.fileName)) &&
            !host.isSourceOfProjectReferenceRedirect(sourceFile.fileName)
        ));
}

/** @internal */
export function getSourceFilePathInNewDir(fileName: string, host: ts.EmitHost, newDirPath: string): string {
    return getSourceFilePathInNewDirWorker(fileName, newDirPath, host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getSourceFilePathInNewDirWorker(fileName: string, newDirPath: string, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: ts.GetCanonicalFileName): string {
    let sourceFilePath = ts.getNormalizedAbsolutePath(fileName, currentDirectory);
    const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
    sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
    return ts.combinePaths(newDirPath, sourceFilePath);
}

/** @internal */
export function writeFile(host: { writeFile: ts.WriteFileCallback; }, diagnostics: ts.DiagnosticCollection, fileName: string, text: string, writeByteOrderMark: boolean, sourceFiles?: readonly ts.SourceFile[], data?: ts.WriteFileCallbackData) {
    host.writeFile(fileName, text, writeByteOrderMark, hostErrorMessage => {
        diagnostics.add(createCompilerDiagnostic(ts.Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
    }, sourceFiles, data);
}

function ensureDirectoriesExist(
    directoryPath: string,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean): void {
    if (directoryPath.length > ts.getRootLength(directoryPath) && !directoryExists(directoryPath)) {
        const parentDirectory = ts.getDirectoryPath(directoryPath);
        ensureDirectoriesExist(parentDirectory, createDirectory, directoryExists);
        createDirectory(directoryPath);
    }
}

/** @internal */
export function writeFileEnsuringDirectories(
    path: string,
    data: string,
    writeByteOrderMark: boolean,
    writeFile: (path: string, data: string, writeByteOrderMark: boolean) => void,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean): void {

    // PERF: Checking for directory existence is expensive.  Instead, assume the directory exists
    // and fall back to creating it if the file write fails.
    try {
        writeFile(path, data, writeByteOrderMark);
    }
    catch {
        ensureDirectoriesExist(ts.getDirectoryPath(ts.normalizePath(path)), createDirectory, directoryExists);
        writeFile(path, data, writeByteOrderMark);
    }
}

/** @internal */
export function getLineOfLocalPosition(sourceFile: ts.SourceFile, pos: number) {
    const lineStarts = ts.getLineStarts(sourceFile);
    return ts.computeLineOfPosition(lineStarts, pos);
}

/** @internal */
export function getLineOfLocalPositionFromLineMap(lineMap: readonly number[], pos: number) {
    return ts.computeLineOfPosition(lineMap, pos);
}

/** @internal */
export function getFirstConstructorWithBody(node: ts.ClassLikeDeclaration): ts.ConstructorDeclaration & { body: ts.FunctionBody } | undefined {
    return ts.find(node.members, (member): member is ts.ConstructorDeclaration & { body: ts.FunctionBody } => ts.isConstructorDeclaration(member) && nodeIsPresent(member.body));
}

/** @internal */
export function getSetAccessorValueParameter(accessor: ts.SetAccessorDeclaration): ts.ParameterDeclaration | undefined {
    if (accessor && accessor.parameters.length > 0) {
        const hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
        return accessor.parameters[hasThis ? 1 : 0];
    }
}

/** @internal */
/** Get the type annotation for the value parameter. */
export function getSetAccessorTypeAnnotationNode(accessor: ts.SetAccessorDeclaration): ts.TypeNode | undefined {
    const parameter = getSetAccessorValueParameter(accessor);
    return parameter && parameter.type;
}

/** @internal */
export function getThisParameter(signature: ts.SignatureDeclaration | ts.JSDocSignature): ts.ParameterDeclaration | undefined {
    // callback tags do not currently support this parameters
    if (signature.parameters.length && !ts.isJSDocSignature(signature)) {
        const thisParameter = signature.parameters[0];
        if (parameterIsThisKeyword(thisParameter)) {
            return thisParameter;
        }
    }
}

/** @internal */
export function parameterIsThisKeyword(parameter: ts.ParameterDeclaration): boolean {
    return isThisIdentifier(parameter.name);
}

/** @internal */
export function isThisIdentifier(node: ts.Node | undefined): boolean {
    return !!node && node.kind === ts.SyntaxKind.Identifier && identifierIsThisKeyword(node as ts.Identifier);
}

/** @internal */
export function isThisInTypeQuery(node: ts.Node): boolean {
    if (!isThisIdentifier(node)) {
        return false;
    }

    while (ts.isQualifiedName(node.parent) && node.parent.left === node) {
        node = node.parent;
    }

    return node.parent.kind === ts.SyntaxKind.TypeQuery;
}

/** @internal */
export function identifierIsThisKeyword(id: ts.Identifier): boolean {
    return id.originalKeywordKind === ts.SyntaxKind.ThisKeyword;
}

/** @internal */
export function getAllAccessorDeclarations(declarations: readonly ts.Declaration[], accessor: ts.AccessorDeclaration): ts.AllAccessorDeclarations {
    // TODO: GH#18217
    let firstAccessor!: ts.AccessorDeclaration;
    let secondAccessor!: ts.AccessorDeclaration;
    let getAccessor!: ts.GetAccessorDeclaration;
    let setAccessor!: ts.SetAccessorDeclaration;
    if (hasDynamicName(accessor)) {
        firstAccessor = accessor;
        if (accessor.kind === ts.SyntaxKind.GetAccessor) {
            getAccessor = accessor;
        }
        else if (accessor.kind === ts.SyntaxKind.SetAccessor) {
            setAccessor = accessor;
        }
        else {
            ts.Debug.fail("Accessor has wrong kind");
        }
    }
    else {
        ts.forEach(declarations, member => {
            if (ts.isAccessor(member)
                && isStatic(member) === isStatic(accessor)) {
                const memberName = getPropertyNameForPropertyNameNode(member.name);
                const accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                if (memberName === accessorName) {
                    if (!firstAccessor) {
                        firstAccessor = member;
                    }
                    else if (!secondAccessor) {
                        secondAccessor = member;
                    }

                    if (member.kind === ts.SyntaxKind.GetAccessor && !getAccessor) {
                        getAccessor = member;
                    }

                    if (member.kind === ts.SyntaxKind.SetAccessor && !setAccessor) {
                        setAccessor = member;
                    }
                }
            }
        });
    }
    return {
        firstAccessor,
        secondAccessor,
        getAccessor,
        setAccessor
    };
}

/** @internal */
/**
 * Gets the effective type annotation of a variable, parameter, or property. If the node was
 * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
 * functions only the JSDoc case.
 */
export function getEffectiveTypeAnnotationNode(node: ts.Node): ts.TypeNode | undefined {
    if (!isInJSFile(node) && ts.isFunctionDeclaration(node)) return undefined;
    const type = (node as ts.HasType).type;
    if (type || !isInJSFile(node)) return type;
    return ts.isJSDocPropertyLikeTag(node) ? node.typeExpression && node.typeExpression.type : ts.getJSDocType(node);
}

/** @internal */
export function getTypeAnnotationNode(node: ts.Node): ts.TypeNode | undefined {
    return (node as ts.HasType).type;
}

/** @internal */
/**
 * Gets the effective return type annotation of a signature. If the node was parsed in a
 * JavaScript file, gets the return type annotation from JSDoc.
 */
export function getEffectiveReturnTypeNode(node: ts.SignatureDeclaration | ts.JSDocSignature): ts.TypeNode | undefined {
    return ts.isJSDocSignature(node) ?
        node.type && node.type.typeExpression && node.type.typeExpression.type :
        node.type || (isInJSFile(node) ? ts.getJSDocReturnType(node) : undefined);
}

/** @internal */
export function getJSDocTypeParameterDeclarations(node: ts.DeclarationWithTypeParameters): readonly ts.TypeParameterDeclaration[] {
    return ts.flatMap(ts.getJSDocTags(node), tag => isNonTypeAliasTemplate(tag) ? tag.typeParameters : undefined);
}

/** template tags are only available when a typedef isn't already using them */
function isNonTypeAliasTemplate(tag: ts.JSDocTag): tag is ts.JSDocTemplateTag {
    return ts.isJSDocTemplateTag(tag) && !(tag.parent.kind === ts.SyntaxKind.JSDoc && tag.parent.tags!.some(isJSDocTypeAlias));
}

/** @internal */
/**
 * Gets the effective type annotation of the value parameter of a set accessor. If the node
 * was parsed in a JavaScript file, gets the type annotation from JSDoc.
 */
export function getEffectiveSetAccessorTypeAnnotationNode(node: ts.SetAccessorDeclaration): ts.TypeNode | undefined {
    const parameter = getSetAccessorValueParameter(node);
    return parameter && getEffectiveTypeAnnotationNode(parameter);
}

/** @internal */
export function emitNewLineBeforeLeadingComments(lineMap: readonly number[], writer: ts.EmitTextWriter, node: ts.TextRange, leadingComments: readonly ts.CommentRange[] | undefined) {
    emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
}

/** @internal */
export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: readonly number[], writer: ts.EmitTextWriter, pos: number, leadingComments: readonly ts.CommentRange[] | undefined) {
    // If the leading comments start on different line than the start of node, write new line
    if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
        getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
        writer.writeLine();
    }
}

/** @internal */
export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: readonly number[], writer: ts.EmitTextWriter, pos: number, commentPos: number) {
    // If the leading comments start on different line than the start of node, write new line
    if (pos !== commentPos &&
        getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
        writer.writeLine();
    }
}

/** @internal */
export function emitComments(
    text: string,
    lineMap: readonly number[],
    writer: ts.EmitTextWriter,
    comments: readonly ts.CommentRange[] | undefined,
    leadingSeparator: boolean,
    trailingSeparator: boolean,
    newLine: string,
    writeComment: (text: string, lineMap: readonly number[], writer: ts.EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void) {
    if (comments && comments.length > 0) {
        if (leadingSeparator) {
            writer.writeSpace(" ");
        }

        let emitInterveningSeparator = false;
        for (const comment of comments) {
            if (emitInterveningSeparator) {
                writer.writeSpace(" ");
                emitInterveningSeparator = false;
            }

            writeComment(text, lineMap, writer, comment.pos, comment.end, newLine);
            if (comment.hasTrailingNewLine) {
                writer.writeLine();
            }
            else {
                emitInterveningSeparator = true;
            }
        }

        if (emitInterveningSeparator && trailingSeparator) {
            writer.writeSpace(" ");
        }
    }
}

/** @internal */
/**
 * Detached comment is a comment at the top of file or function body that is separated from
 * the next statement by space.
 */
export function emitDetachedComments(text: string, lineMap: readonly number[], writer: ts.EmitTextWriter,
    writeComment: (text: string, lineMap: readonly number[], writer: ts.EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
    node: ts.TextRange, newLine: string, removeComments: boolean) {
    let leadingComments: ts.CommentRange[] | undefined;
    let currentDetachedCommentInfo: { nodePos: number, detachedCommentEndPos: number } | undefined;
    if (removeComments) {
        // removeComments is true, only reserve pinned comment at the top of file
        // For example:
        //      /*! Pinned Comment */
        //
        //      var x = 10;
        if (node.pos === 0) {
            leadingComments = ts.filter(ts.getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
        }
    }
    else {
        // removeComments is false, just get detached as normal and bypass the process to filter comment
        leadingComments = ts.getLeadingCommentRanges(text, node.pos);
    }

    if (leadingComments) {
        const detachedComments: ts.CommentRange[] = [];
        let lastComment: ts.CommentRange | undefined;

        for (const comment of leadingComments) {
            if (lastComment) {
                const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastComment.end);
                const commentLine = getLineOfLocalPositionFromLineMap(lineMap, comment.pos);

                if (commentLine >= lastCommentLine + 2) {
                    // There was a blank line between the last comment and this comment.  This
                    // comment is not part of the copyright comments.  Return what we have so
                    // far.
                    break;
                }
            }

            detachedComments.push(comment);
            lastComment = comment;
        }

        if (detachedComments.length) {
            // All comments look like they could have been part of the copyright header.  Make
            // sure there is at least one blank line between it and the node.  If not, it's not
            // a copyright header.
            const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, ts.last(detachedComments).end);
            const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, ts.skipTrivia(text, node.pos));
            if (nodeLine >= lastCommentLine + 2) {
                // Valid detachedComments
                emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                emitComments(text, lineMap, writer, detachedComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: ts.last(detachedComments).end };
            }
        }
    }

    return currentDetachedCommentInfo;

    function isPinnedCommentLocal(comment: ts.CommentRange) {
        return isPinnedComment(text, comment.pos);
    }

}

/** @internal */
export function writeCommentRange(text: string, lineMap: readonly number[], writer: ts.EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
    if (text.charCodeAt(commentPos + 1) === ts.CharacterCodes.asterisk) {
        const firstCommentLineAndCharacter = ts.computeLineAndCharacterOfPosition(lineMap, commentPos);
        const lineCount = lineMap.length;
        let firstCommentLineIndent: number | undefined;
        for (let pos = commentPos, currentLine = firstCommentLineAndCharacter.line; pos < commentEnd; currentLine++) {
            const nextLineStart = (currentLine + 1) === lineCount
                ? text.length + 1
                : lineMap[currentLine + 1];

            if (pos !== commentPos) {
                // If we are not emitting first line, we need to write the spaces to adjust the alignment
                if (firstCommentLineIndent === undefined) {
                    firstCommentLineIndent = calculateIndent(text, lineMap[firstCommentLineAndCharacter.line], commentPos);
                }

                // These are number of spaces writer is going to write at current indent
                const currentWriterIndentSpacing = writer.getIndent() * getIndentSize();

                // Number of spaces we want to be writing
                // eg: Assume writer indent
                // module m {
                //         /* starts at character 9 this is line 1
                //    * starts at character pos 4 line                        --1  = 8 - 8 + 3
                //   More left indented comment */                            --2  = 8 - 8 + 2
                //     class c { }
                // }
                // module m {
                //     /* this is line 1 -- Assume current writer indent 8
                //      * line                                                --3 = 8 - 4 + 5
                //            More right indented comment */                  --4 = 8 - 4 + 11
                //     class c { }
                // }
                const spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart);
                if (spacesToEmit > 0) {
                    let numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                    const indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());

                    // Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
                    writer.rawWrite(indentSizeSpaceString);

                    // Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
                    while (numberOfSingleSpacesToEmit) {
                        writer.rawWrite(" ");
                        numberOfSingleSpacesToEmit--;
                    }
                }
                else {
                    // No spaces to emit write empty string
                    writer.rawWrite("");
                }
            }

            // Write the comment line text
            writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart);

            pos = nextLineStart;
        }
    }
    else {
        // Single line comment of style //....
        writer.writeComment(text.substring(commentPos, commentEnd));
    }
}

function writeTrimmedCurrentLine(text: string, commentEnd: number, writer: ts.EmitTextWriter, newLine: string, pos: number, nextLineStart: number) {
    const end = Math.min(commentEnd, nextLineStart - 1);
    const currentLineText = ts.trimString(text.substring(pos, end));
    if (currentLineText) {
        // trimmed forward and ending spaces text
        writer.writeComment(currentLineText);
        if (end !== commentEnd) {
            writer.writeLine();
        }
    }
    else {
        // Empty string - make sure we write empty line
        writer.rawWrite(newLine);
    }
}

function calculateIndent(text: string, pos: number, end: number) {
    let currentLineIndent = 0;
    for (; pos < end && ts.isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
        if (text.charCodeAt(pos) === ts.CharacterCodes.tab) {
            // Tabs = TabSize = indent size and go to next tabStop
            currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
        }
        else {
            // Single space
            currentLineIndent++;
        }
    }

    return currentLineIndent;
}

/** @internal */
export function hasEffectiveModifiers(node: ts.Node) {
    return getEffectiveModifierFlags(node) !== ts.ModifierFlags.None;
}

/** @internal */
export function hasSyntacticModifiers(node: ts.Node) {
    return getSyntacticModifierFlags(node) !== ts.ModifierFlags.None;
}

/** @internal */
export function hasEffectiveModifier(node: ts.Node, flags: ts.ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
export function hasSyntacticModifier(node: ts.Node, flags: ts.ModifierFlags): boolean {
    return !!getSelectedSyntacticModifierFlags(node, flags);
}

/** @internal */
export function isStatic(node: ts.Node) {
    // https://tc39.es/ecma262/#sec-static-semantics-isstatic
    return ts.isClassElement(node) && hasStaticModifier(node) || ts.isClassStaticBlockDeclaration(node);
}

/** @internal */
export function hasStaticModifier(node: ts.Node): boolean {
    return hasSyntacticModifier(node, ts.ModifierFlags.Static);
}

/** @internal */
export function hasOverrideModifier(node: ts.Node): boolean {
    return hasEffectiveModifier(node, ts.ModifierFlags.Override);
}

/** @internal */
export function hasAbstractModifier(node: ts.Node): boolean {
    return hasSyntacticModifier(node, ts.ModifierFlags.Abstract);
}

/** @internal */
export function hasAmbientModifier(node: ts.Node): boolean {
    return hasSyntacticModifier(node, ts.ModifierFlags.Ambient);
}

/** @internal */
export function hasAccessorModifier(node: ts.Node): boolean {
    return hasSyntacticModifier(node, ts.ModifierFlags.Accessor);
}

/** @internal */
export function hasEffectiveReadonlyModifier(node: ts.Node): boolean {
    return hasEffectiveModifier(node, ts.ModifierFlags.Readonly);
}

/** @internal */
export function hasDecorators(node: ts.Node): boolean {
    return hasSyntacticModifier(node, ts.ModifierFlags.Decorator);
}

/** @internal */
export function getSelectedEffectiveModifierFlags(node: ts.Node, flags: ts.ModifierFlags): ts.ModifierFlags {
    return getEffectiveModifierFlags(node) & flags;
}

/** @internal */
export function getSelectedSyntacticModifierFlags(node: ts.Node, flags: ts.ModifierFlags): ts.ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}

function getModifierFlagsWorker(node: ts.Node, includeJSDoc: boolean, alwaysIncludeJSDoc?: boolean): ts.ModifierFlags {
    if (node.kind >= ts.SyntaxKind.FirstToken && node.kind <= ts.SyntaxKind.LastToken) {
        return ts.ModifierFlags.None;
    }

    if (!(node.modifierFlagsCache & ts.ModifierFlags.HasComputedFlags)) {
        node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ts.ModifierFlags.HasComputedFlags;
    }

    if (includeJSDoc && !(node.modifierFlagsCache & ts.ModifierFlags.HasComputedJSDocModifiers) && (alwaysIncludeJSDoc || isInJSFile(node)) && node.parent) {
        node.modifierFlagsCache |= getJSDocModifierFlagsNoCache(node) | ts.ModifierFlags.HasComputedJSDocModifiers;
    }

    return node.modifierFlagsCache & ~(ts.ModifierFlags.HasComputedFlags | ts.ModifierFlags.HasComputedJSDocModifiers);
}

/** @internal */
/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function may use `parent` pointers.
 */
export function getEffectiveModifierFlags(node: ts.Node): ts.ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
}

/** @internal */
export function getEffectiveModifierFlagsAlwaysIncludeJSDoc(node: ts.Node): ts.ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDOc*/ true, /*alwaysIncludeJSDOc*/ true);
}

/** @internal */
/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 */
export function getSyntacticModifierFlags(node: ts.Node): ts.ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ false);
}

function getJSDocModifierFlagsNoCache(node: ts.Node): ts.ModifierFlags {
    let flags = ts.ModifierFlags.None;
    if (!!node.parent && !ts.isParameter(node)) {
        if (isInJSFile(node)) {
            if (ts.getJSDocPublicTagNoCache(node)) flags |= ts.ModifierFlags.Public;
            if (ts.getJSDocPrivateTagNoCache(node)) flags |= ts.ModifierFlags.Private;
            if (ts.getJSDocProtectedTagNoCache(node)) flags |= ts.ModifierFlags.Protected;
            if (ts.getJSDocReadonlyTagNoCache(node)) flags |= ts.ModifierFlags.Readonly;
            if (ts.getJSDocOverrideTagNoCache(node)) flags |= ts.ModifierFlags.Override;
        }
        if (ts.getJSDocDeprecatedTagNoCache(node)) flags |= ts.ModifierFlags.Deprecated;
    }

    return flags;
}

/** @internal */
/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function may use `parent` pointers.
 */
export function getEffectiveModifierFlagsNoCache(node: ts.Node): ts.ModifierFlags {
    return getSyntacticModifierFlagsNoCache(node) | getJSDocModifierFlagsNoCache(node);
}

/** @internal */
/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 */
export function getSyntacticModifierFlagsNoCache(node: ts.Node): ts.ModifierFlags {
    let flags = ts.canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ts.ModifierFlags.None;
    if (node.flags & ts.NodeFlags.NestedNamespace || (node.kind === ts.SyntaxKind.Identifier && (node as ts.Identifier).isInJSDocNamespace)) {
        flags |= ts.ModifierFlags.Export;
    }
    return flags;
}

/** @internal */
export function modifiersToFlags(modifiers: readonly ts.ModifierLike[] | undefined) {
    let flags = ts.ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

/** @internal */
export function modifierToFlag(token: ts.SyntaxKind): ts.ModifierFlags {
    switch (token) {
        case ts.SyntaxKind.StaticKeyword: return ts.ModifierFlags.Static;
        case ts.SyntaxKind.PublicKeyword: return ts.ModifierFlags.Public;
        case ts.SyntaxKind.ProtectedKeyword: return ts.ModifierFlags.Protected;
        case ts.SyntaxKind.PrivateKeyword: return ts.ModifierFlags.Private;
        case ts.SyntaxKind.AbstractKeyword: return ts.ModifierFlags.Abstract;
        case ts.SyntaxKind.AccessorKeyword: return ts.ModifierFlags.Accessor;
        case ts.SyntaxKind.ExportKeyword: return ts.ModifierFlags.Export;
        case ts.SyntaxKind.DeclareKeyword: return ts.ModifierFlags.Ambient;
        case ts.SyntaxKind.ConstKeyword: return ts.ModifierFlags.Const;
        case ts.SyntaxKind.DefaultKeyword: return ts.ModifierFlags.Default;
        case ts.SyntaxKind.AsyncKeyword: return ts.ModifierFlags.Async;
        case ts.SyntaxKind.ReadonlyKeyword: return ts.ModifierFlags.Readonly;
        case ts.SyntaxKind.OverrideKeyword: return ts.ModifierFlags.Override;
        case ts.SyntaxKind.InKeyword: return ts.ModifierFlags.In;
        case ts.SyntaxKind.OutKeyword: return ts.ModifierFlags.Out;
        case ts.SyntaxKind.Decorator: return ts.ModifierFlags.Decorator;
    }
    return ts.ModifierFlags.None;
}

/** @internal */
export function isLogicalOperator(token: ts.SyntaxKind): boolean {
    return token === ts.SyntaxKind.BarBarToken
        || token === ts.SyntaxKind.AmpersandAmpersandToken
        || token === ts.SyntaxKind.ExclamationToken;
}

/** @internal */
export function isLogicalOrCoalescingAssignmentOperator(token: ts.SyntaxKind): token is ts.LogicalOrCoalescingAssignmentOperator {
    return token === ts.SyntaxKind.BarBarEqualsToken
        || token === ts.SyntaxKind.AmpersandAmpersandEqualsToken
        || token === ts.SyntaxKind.QuestionQuestionEqualsToken;
}

/** @internal */
export function isLogicalOrCoalescingAssignmentExpression(expr: ts.BinaryExpression): expr is ts.AssignmentExpression<ts.Token<ts.LogicalOrCoalescingAssignmentOperator>> {
    return isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
}

/** @internal */
export function isAssignmentOperator(token: ts.SyntaxKind): boolean {
    return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
}

/** @internal */
/** Get `C` given `N` if `N` is in the position `class C extends N` where `N` is an ExpressionWithTypeArguments. */
export function tryGetClassExtendingExpressionWithTypeArguments(node: ts.Node): ts.ClassLikeDeclaration | undefined {
    const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
    return cls && !cls.isImplements ? cls.class : undefined;
}

/** @internal */
export interface ClassImplementingOrExtendingExpressionWithTypeArguments {
    readonly class: ts.ClassLikeDeclaration;
    readonly isImplements: boolean;
}
/** @internal */
export function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: ts.Node): ClassImplementingOrExtendingExpressionWithTypeArguments | undefined {
    return ts.isExpressionWithTypeArguments(node)
        && ts.isHeritageClause(node.parent)
        && ts.isClassLike(node.parent.parent)
        ? { class: node.parent.parent, isImplements: node.parent.token === ts.SyntaxKind.ImplementsKeyword }
        : undefined;
}

/** @internal */
export function isAssignmentExpression(node: ts.Node, excludeCompoundAssignment: true): node is ts.AssignmentExpression<ts.EqualsToken>;
/** @internal */
export function isAssignmentExpression(node: ts.Node, excludeCompoundAssignment?: false): node is ts.AssignmentExpression<ts.AssignmentOperatorToken>;
/** @internal */
export function isAssignmentExpression(node: ts.Node, excludeCompoundAssignment?: boolean): node is ts.AssignmentExpression<ts.AssignmentOperatorToken> {
    return ts.isBinaryExpression(node)
        && (excludeCompoundAssignment
            ? node.operatorToken.kind === ts.SyntaxKind.EqualsToken
            : isAssignmentOperator(node.operatorToken.kind))
        && ts.isLeftHandSideExpression(node.left);
}

/** @internal */
export function isLeftHandSideOfAssignment(node: ts.Node) {
    return isAssignmentExpression(node.parent) && node.parent.left === node;
}
/** @internal */
export function isDestructuringAssignment(node: ts.Node): node is ts.DestructuringAssignment {
    if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
        const kind = node.left.kind;
        return kind === ts.SyntaxKind.ObjectLiteralExpression
            || kind === ts.SyntaxKind.ArrayLiteralExpression;
    }

    return false;
}

/** @internal */
export function isExpressionWithTypeArgumentsInClassExtendsClause(node: ts.Node): node is ts.ExpressionWithTypeArguments {
    return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
}

/** @internal */
export function isEntityNameExpression(node: ts.Node): node is ts.EntityNameExpression {
    return node.kind === ts.SyntaxKind.Identifier || isPropertyAccessEntityNameExpression(node);
}

/** @internal */
export function getFirstIdentifier(node: ts.EntityNameOrEntityNameExpression): ts.Identifier {
    switch (node.kind) {
        case ts.SyntaxKind.Identifier:
            return node;
        case ts.SyntaxKind.QualifiedName:
            do {
                node = node.left;
            } while (node.kind !== ts.SyntaxKind.Identifier);
            return node;
        case ts.SyntaxKind.PropertyAccessExpression:
            do {
                node = node.expression;
            } while (node.kind !== ts.SyntaxKind.Identifier);
            return node;
    }
}

/** @internal */
export function isDottedName(node: ts.Expression): boolean {
    return node.kind === ts.SyntaxKind.Identifier
        || node.kind === ts.SyntaxKind.ThisKeyword
        || node.kind === ts.SyntaxKind.SuperKeyword
        || node.kind === ts.SyntaxKind.MetaProperty
        || node.kind === ts.SyntaxKind.PropertyAccessExpression && isDottedName((node as ts.PropertyAccessExpression).expression)
        || node.kind === ts.SyntaxKind.ParenthesizedExpression && isDottedName((node as ts.ParenthesizedExpression).expression);
}

/** @internal */
export function isPropertyAccessEntityNameExpression(node: ts.Node): node is ts.PropertyAccessEntityNameExpression {
    return ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name) && isEntityNameExpression(node.expression);
}

/** @internal */
export function tryGetPropertyAccessOrIdentifierToString(expr: ts.Expression): string | undefined {
    if (ts.isPropertyAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined) {
            return baseStr + "." + entityNameToString(expr.name);
        }
    }
    else if (ts.isElementAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined && ts.isPropertyName(expr.argumentExpression)) {
            return baseStr + "." + getPropertyNameForPropertyNameNode(expr.argumentExpression);
        }
    }
    else if (ts.isIdentifier(expr)) {
        return ts.unescapeLeadingUnderscores(expr.escapedText);
    }
    return undefined;
}

/** @internal */
export function isPrototypeAccess(node: ts.Node): node is ts.BindableStaticAccessExpression {
    return isBindableStaticAccessExpression(node) && getElementOrPropertyAccessName(node) === "prototype";
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccess(node: ts.Node) {
    return (node.parent.kind === ts.SyntaxKind.QualifiedName && (node.parent as ts.QualifiedName).right === node) ||
        (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && (node.parent as ts.PropertyAccessExpression).name === node);
}

/** @internal */
export function isRightSideOfAccessExpression(node: ts.Node) {
    return ts.isPropertyAccessExpression(node.parent) && node.parent.name === node
        || ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(node: ts.Node) {
    return ts.isQualifiedName(node.parent) && node.parent.right === node
        || ts.isPropertyAccessExpression(node.parent) && node.parent.name === node
        || ts.isJSDocMemberName(node.parent) && node.parent.right === node;
}

/** @internal */
export function isEmptyObjectLiteral(expression: ts.Node): boolean {
    return expression.kind === ts.SyntaxKind.ObjectLiteralExpression &&
        (expression as ts.ObjectLiteralExpression).properties.length === 0;
}

/** @internal */
export function isEmptyArrayLiteral(expression: ts.Node): boolean {
    return expression.kind === ts.SyntaxKind.ArrayLiteralExpression &&
        (expression as ts.ArrayLiteralExpression).elements.length === 0;
}

/** @internal */
export function getLocalSymbolForExportDefault(symbol: ts.Symbol) {
    if (!isExportDefaultSymbol(symbol) || !symbol.declarations) return undefined;
    for (const decl of symbol.declarations) {
        if (decl.localSymbol) return decl.localSymbol;
    }
    return undefined;
}

function isExportDefaultSymbol(symbol: ts.Symbol): boolean {
    return symbol && ts.length(symbol.declarations) > 0 && hasSyntacticModifier(symbol.declarations![0], ts.ModifierFlags.Default);
}

/** @internal */
/** Return ".ts", ".d.ts", or ".tsx", if that is the extension. */
export function tryExtractTSExtension(fileName: string): string | undefined {
    return ts.find(supportedTSExtensionsForExtractExtension, extension => ts.fileExtensionIs(fileName, extension));
}
/**
 * Replace each instance of non-ascii characters by one, two, three, or four escape sequences
 * representing the UTF-8 encoding of the character, and return the expanded char code list.
 */
function getExpandedCharCodes(input: string): number[] {
    const output: number[] = [];
    const length = input.length;

    for (let i = 0; i < length; i++) {
        const charCode = input.charCodeAt(i);

        // handle utf8
        if (charCode < 0x80) {
            output.push(charCode);
        }
        else if (charCode < 0x800) {
            output.push((charCode >> 6) | 0B11000000);
            output.push((charCode & 0B00111111) | 0B10000000);
        }
        else if (charCode < 0x10000) {
            output.push((charCode >> 12) | 0B11100000);
            output.push(((charCode >> 6) & 0B00111111) | 0B10000000);
            output.push((charCode & 0B00111111) | 0B10000000);
        }
        else if (charCode < 0x20000) {
            output.push((charCode >> 18) | 0B11110000);
            output.push(((charCode >> 12) & 0B00111111) | 0B10000000);
            output.push(((charCode >> 6) & 0B00111111) | 0B10000000);
            output.push((charCode & 0B00111111) | 0B10000000);
        }
        else {
            ts.Debug.assert(false, "Unexpected code point");
        }
    }

    return output;
}

const base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/** @internal */
/**
 * Converts a string to a base-64 encoded ASCII string.
 */
export function convertToBase64(input: string): string {
    let result = "";
    const charCodes = getExpandedCharCodes(input);
    let i = 0;
    const length = charCodes.length;
    let byte1: number, byte2: number, byte3: number, byte4: number;

    while (i < length) {
        // Convert every 6-bits in the input 3 character points
        // into a base64 digit
        byte1 = charCodes[i] >> 2;
        byte2 = (charCodes[i] & 0B00000011) << 4 | charCodes[i + 1] >> 4;
        byte3 = (charCodes[i + 1] & 0B00001111) << 2 | charCodes[i + 2] >> 6;
        byte4 = charCodes[i + 2] & 0B00111111;

        // We are out of characters in the input, set the extra
        // digits to 64 (padding character).
        if (i + 1 >= length) {
            byte3 = byte4 = 64;
        }
        else if (i + 2 >= length) {
            byte4 = 64;
        }

        // Write to the output
        result += base64Digits.charAt(byte1) + base64Digits.charAt(byte2) + base64Digits.charAt(byte3) + base64Digits.charAt(byte4);

        i += 3;
    }

    return result;
}

function getStringFromExpandedCharCodes(codes: number[]): string {
    let output = "";
    let i = 0;
    const length = codes.length;
    while (i < length) {
        const charCode = codes[i];

        if (charCode < 0x80) {
            output += String.fromCharCode(charCode);
            i++;
        }
        else if ((charCode & 0B11000000) === 0B11000000) {
            let value = charCode & 0B00111111;
            i++;
            let nextCode: number = codes[i];
            while ((nextCode & 0B11000000) === 0B10000000) {
                value = (value << 6) | (nextCode & 0B00111111);
                i++;
                nextCode = codes[i];
            }
            // `value` may be greater than 10FFFF (the maximum unicode codepoint) - JS will just make this into an invalid character for us
            output += String.fromCharCode(value);
        }
        else {
            // We don't want to kill the process when decoding fails (due to a following char byte not
            // following a leading char), so we just print the (bad) value
            output += String.fromCharCode(charCode);
            i++;
        }
    }
    return output;
}

/** @internal */
export function base64encode(host: { base64encode?(input: string): string } | undefined, input: string): string {
    if (host && host.base64encode) {
        return host.base64encode(input);
    }
    return convertToBase64(input);
}

/** @internal */
export function base64decode(host: { base64decode?(input: string): string } | undefined, input: string): string {
    if (host && host.base64decode) {
        return host.base64decode(input);
    }
    const length = input.length;
    const expandedCharCodes: number[] = [];
    let i = 0;
    while (i < length) {
        // Stop decoding once padding characters are present
        if (input.charCodeAt(i) === base64Digits.charCodeAt(64)) {
            break;
        }
        // convert 4 input digits into three characters, ignoring padding characters at the end
        const ch1 = base64Digits.indexOf(input[i]);
        const ch2 = base64Digits.indexOf(input[i + 1]);
        const ch3 = base64Digits.indexOf(input[i + 2]);
        const ch4 = base64Digits.indexOf(input[i + 3]);

        const code1 = ((ch1 & 0B00111111) << 2) | ((ch2 >> 4) & 0B00000011);
        const code2 = ((ch2 & 0B00001111) << 4) | ((ch3 >> 2) & 0B00001111);
        const code3 = ((ch3 & 0B00000011) << 6) | (ch4 & 0B00111111);

        if (code2 === 0 && ch3 !== 0) { // code2 decoded to zero, but ch3 was padding - elide code2 and code3
            expandedCharCodes.push(code1);
        }
        else if (code3 === 0 && ch4 !== 0) { // code3 decoded to zero, but ch4 was padding, elide code3
            expandedCharCodes.push(code1, code2);
        }
        else {
            expandedCharCodes.push(code1, code2, code3);
        }
        i += 4;
    }
    return getStringFromExpandedCharCodes(expandedCharCodes);
}

/** @internal */
export function readJsonOrUndefined(path: string, hostOrText: { readFile(fileName: string): string | undefined } | string): object | undefined {
    const jsonText = ts.isString(hostOrText) ? hostOrText : hostOrText.readFile(path);
    if (!jsonText) return undefined;
    // gracefully handle if readFile fails or returns not JSON
    const result = ts.parseConfigFileTextToJson(path, jsonText);
    return !result.error ? result.config : undefined;
}

/** @internal */
export function readJson(path: string, host: { readFile(fileName: string): string | undefined }): object {
    return readJsonOrUndefined(path, host) || {};
}

/** @internal */
export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean }): boolean {
    // if host does not support 'directoryExists' assume that directory will exist
    return !host.directoryExists || host.directoryExists(directoryName);
}

const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";
/** @internal */
export function getNewLineCharacter(options: ts.CompilerOptions | ts.PrinterOptions, getNewLine?: () => string): string {
    switch (options.newLine) {
        case ts.NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case ts.NewLineKind.LineFeed:
            return lineFeed;
    }
    return getNewLine ? getNewLine() : ts.sys ? ts.sys.newLine : carriageReturnLineFeed;
}

/** @internal */
/**
 * Creates a new TextRange from the provided pos and end.
 *
 * @param pos The start position.
 * @param end The end position.
 */
export function createRange(pos: number, end: number = pos): ts.TextRange {
    ts.Debug.assert(end >= pos || end === -1);
    return { pos, end };
}

/** @internal */
/**
 * Creates a new TextRange from a provided range with a new end position.
 *
 * @param range A TextRange.
 * @param end The new end position.
 */
export function moveRangeEnd(range: ts.TextRange, end: number): ts.TextRange {
    return createRange(range.pos, end);
}

/** @internal */
/**
 * Creates a new TextRange from a provided range with a new start position.
 *
 * @param range A TextRange.
 * @param pos The new Start position.
 */
export function moveRangePos(range: ts.TextRange, pos: number): ts.TextRange {
    return createRange(pos, range.end);
}

/** @internal */
/**
 * Moves the start position of a range past any decorators.
 */
export function moveRangePastDecorators(node: ts.Node): ts.TextRange {
    const lastDecorator = ts.canHaveModifiers(node) ? ts.findLast(node.modifiers, ts.isDecorator) : undefined;
    return lastDecorator && !positionIsSynthesized(lastDecorator.end)
        ? moveRangePos(node, lastDecorator.end)
        : node;
}

/** @internal */
/**
 * Moves the start position of a range past any decorators or modifiers.
 */
export function moveRangePastModifiers(node: ts.Node): ts.TextRange {
    const lastModifier = ts.canHaveModifiers(node) ? ts.lastOrUndefined(node.modifiers) : undefined;
    return lastModifier && !positionIsSynthesized(lastModifier.end)
        ? moveRangePos(node, lastModifier.end)
        : moveRangePastDecorators(node);
}

/** @internal */
/**
 * Determines whether a TextRange has the same start and end positions.
 *
 * @param range A TextRange.
 */
export function isCollapsedRange(range: ts.TextRange) {
    return range.pos === range.end;
}

/** @internal */
/**
 * Creates a new TextRange for a token at the provides start position.
 *
 * @param pos The start position.
 * @param token The token.
 */
export function createTokenRange(pos: number, token: ts.SyntaxKind): ts.TextRange {
    return createRange(pos, pos + ts.tokenToString(token)!.length);
}

/** @internal */
export function rangeIsOnSingleLine(range: ts.TextRange, sourceFile: ts.SourceFile) {
    return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
}

/** @internal */
export function rangeStartPositionsAreOnSameLine(range1: ts.TextRange, range2: ts.TextRange, sourceFile: ts.SourceFile) {
    return positionsAreOnSameLine(
        getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false),
        getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false),
        sourceFile);
}

/** @internal */
export function rangeEndPositionsAreOnSameLine(range1: ts.TextRange, range2: ts.TextRange, sourceFile: ts.SourceFile) {
    return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
}

/** @internal */
export function rangeStartIsOnSameLineAsRangeEnd(range1: ts.TextRange, range2: ts.TextRange, sourceFile: ts.SourceFile) {
    return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false), range2.end, sourceFile);
}

/** @internal */
export function rangeEndIsOnSameLineAsRangeStart(range1: ts.TextRange, range2: ts.TextRange, sourceFile: ts.SourceFile) {
    return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false), sourceFile);
}

/** @internal */
export function getLinesBetweenRangeEndAndRangeStart(range1: ts.TextRange, range2: ts.TextRange, sourceFile: ts.SourceFile, includeSecondRangeComments: boolean) {
    const range2Start = getStartPositionOfRange(range2, sourceFile, includeSecondRangeComments);
    return ts.getLinesBetweenPositions(sourceFile, range1.end, range2Start);
}

/** @internal */
export function getLinesBetweenRangeEndPositions(range1: ts.TextRange, range2: ts.TextRange, sourceFile: ts.SourceFile) {
    return ts.getLinesBetweenPositions(sourceFile, range1.end, range2.end);
}

/** @internal */
export function isNodeArrayMultiLine(list: ts.NodeArray<ts.Node>, sourceFile: ts.SourceFile): boolean {
    return !positionsAreOnSameLine(list.pos, list.end, sourceFile);
}

/** @internal */
export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: ts.SourceFile) {
    return ts.getLinesBetweenPositions(sourceFile, pos1, pos2) === 0;
}

/** @internal */
export function getStartPositionOfRange(range: ts.TextRange, sourceFile: ts.SourceFile, includeComments: boolean) {
    return positionIsSynthesized(range.pos) ? -1 : ts.skipTrivia(sourceFile.text, range.pos, /*stopAfterLineBreak*/ false, includeComments);
}

/** @internal */
export function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: ts.SourceFile, includeComments?: boolean) {
    const startPos = ts.skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
    const prevPos = getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile);
    return ts.getLinesBetweenPositions(sourceFile, prevPos ?? stopPos, startPos);
}

/** @internal */
export function getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: ts.SourceFile, includeComments?: boolean) {
    const nextPos = ts.skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
    return ts.getLinesBetweenPositions(sourceFile, pos, Math.min(stopPos, nextPos));
}

function getPreviousNonWhitespacePosition(pos: number, stopPos = 0, sourceFile: ts.SourceFile) {
    while (pos-- > stopPos) {
        if (!ts.isWhiteSpaceLike(sourceFile.text.charCodeAt(pos))) {
            return pos;
        }
    }
}

/** @internal */
/**
 * Determines whether a name was originally the declaration name of an enum or namespace
 * declaration.
 */
export function isDeclarationNameOfEnumOrNamespace(node: ts.Identifier) {
    const parseNode = ts.getParseTreeNode(node);
    if (parseNode) {
        switch (parseNode.parent.kind) {
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
                return parseNode === (parseNode.parent as ts.EnumDeclaration | ts.ModuleDeclaration).name;
        }
    }
    return false;
}

/** @internal */
export function getInitializedVariables(node: ts.VariableDeclarationList) {
    return ts.filter(node.declarations, isInitializedVariable);
}

function isInitializedVariable(node: ts.VariableDeclaration): node is ts.InitializedVariableDeclaration {
    return node.initializer !== undefined;
}

/** @internal */
export function isWatchSet(options: ts.CompilerOptions) {
    // Firefox has Object.prototype.watch
    return options.watch && ts.hasProperty(options, "watch");
}

/** @internal */
export function closeFileWatcher(watcher: ts.FileWatcher) {
    watcher.close();
}

/** @internal */
export function getCheckFlags(symbol: ts.Symbol): ts.CheckFlags {
    return symbol.flags & ts.SymbolFlags.Transient ? (symbol as ts.TransientSymbol).checkFlags : 0;
}

/** @internal */
export function getDeclarationModifierFlagsFromSymbol(s: ts.Symbol, isWrite = false): ts.ModifierFlags {
    if (s.valueDeclaration) {
        const declaration = (isWrite && s.declarations && ts.find(s.declarations, ts.isSetAccessorDeclaration))
            || (s.flags & ts.SymbolFlags.GetAccessor && ts.find(s.declarations, ts.isGetAccessorDeclaration)) || s.valueDeclaration;
        const flags = ts.getCombinedModifierFlags(declaration);
        return s.parent && s.parent.flags & ts.SymbolFlags.Class ? flags : flags & ~ts.ModifierFlags.AccessibilityModifier;
    }
    if (getCheckFlags(s) & ts.CheckFlags.Synthetic) {
        const checkFlags = (s as ts.TransientSymbol).checkFlags;
        const accessModifier = checkFlags & ts.CheckFlags.ContainsPrivate ? ts.ModifierFlags.Private :
            checkFlags & ts.CheckFlags.ContainsPublic ? ts.ModifierFlags.Public :
            ts.ModifierFlags.Protected;
        const staticModifier = checkFlags & ts.CheckFlags.ContainsStatic ? ts.ModifierFlags.Static : 0;
        return accessModifier | staticModifier;
    }
    if (s.flags & ts.SymbolFlags.Prototype) {
        return ts.ModifierFlags.Public | ts.ModifierFlags.Static;
    }
    return 0;
}

/** @internal */
export function skipAlias(symbol: ts.Symbol, checker: ts.TypeChecker) {
    return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

/** @internal */
/** See comment on `declareModuleMember` in `binder.ts`. */
export function getCombinedLocalAndExportSymbolFlags(symbol: ts.Symbol): ts.SymbolFlags {
    return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
}

/** @internal */
export function isWriteOnlyAccess(node: ts.Node) {
    return accessKind(node) === AccessKind.Write;
}

/** @internal */
export function isWriteAccess(node: ts.Node) {
    return accessKind(node) !== AccessKind.Read;
}

const enum AccessKind {
    /** Only reads from a variable. */
    Read,
    /** Only writes to a variable without using the result. E.g.: `x++;`. */
    Write,
    /** Writes to a variable and uses the result as an expression. E.g.: `f(x++);`. */
    ReadWrite
}
function accessKind(node: ts.Node): AccessKind {
    const { parent } = node;
    if (!parent) return AccessKind.Read;

    switch (parent.kind) {
        case ts.SyntaxKind.ParenthesizedExpression:
            return accessKind(parent);
        case ts.SyntaxKind.PostfixUnaryExpression:
        case ts.SyntaxKind.PrefixUnaryExpression:
            const { operator } = parent as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression;
            return operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken ? writeOrReadWrite() : AccessKind.Read;
        case ts.SyntaxKind.BinaryExpression:
            const { left, operatorToken } = parent as ts.BinaryExpression;
            return left === node && isAssignmentOperator(operatorToken.kind) ?
                operatorToken.kind === ts.SyntaxKind.EqualsToken ? AccessKind.Write : writeOrReadWrite()
                : AccessKind.Read;
        case ts.SyntaxKind.PropertyAccessExpression:
            return (parent as ts.PropertyAccessExpression).name !== node ? AccessKind.Read : accessKind(parent);
        case ts.SyntaxKind.PropertyAssignment: {
            const parentAccess = accessKind(parent.parent);
            // In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
            return node === (parent as ts.PropertyAssignment).name ? reverseAccessKind(parentAccess) : parentAccess;
        }
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            // Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
            return node === (parent as ts.ShorthandPropertyAssignment).objectAssignmentInitializer ? AccessKind.Read : accessKind(parent.parent);
        case ts.SyntaxKind.ArrayLiteralExpression:
            return accessKind(parent);
        default:
            return AccessKind.Read;
    }

    function writeOrReadWrite(): AccessKind {
        // If grandparent is not an ExpressionStatement, this is used as an expression in addition to having a side effect.
        return parent.parent && walkUpParenthesizedExpressions(parent.parent).kind === ts.SyntaxKind.ExpressionStatement ? AccessKind.Write : AccessKind.ReadWrite;
    }
}
function reverseAccessKind(a: AccessKind): AccessKind {
    switch (a) {
        case AccessKind.Read:
            return AccessKind.Write;
        case AccessKind.Write:
            return AccessKind.Read;
        case AccessKind.ReadWrite:
            return AccessKind.ReadWrite;
        default:
            return ts.Debug.assertNever(a);
    }
}

/** @internal */
export function compareDataObjects(dst: any, src: any): boolean {
    if (!dst || !src || Object.keys(dst).length !== Object.keys(src).length) {
        return false;
    }

    for (const e in dst) {
        if (typeof dst[e] === "object") {
            if (!compareDataObjects(dst[e], src[e])) {
                return false;
            }
        }
        else if (typeof dst[e] !== "function") {
            if (dst[e] !== src[e]) {
                return false;
            }
        }
    }
    return true;
}

/** @internal */
/**
 * clears already present map by calling onDeleteExistingValue callback before deleting that key/value
 */
export function clearMap<K, T>(map: { forEach: ts.ESMap<K, T>["forEach"]; clear: ts.ESMap<K, T>["clear"]; }, onDeleteValue: (valueInMap: T, key: K) => void) {
    // Remove all
    map.forEach(onDeleteValue);
    map.clear();
}

/** @internal */
export interface MutateMapSkippingNewValuesOptions<K, T, U> {
    onDeleteValue(existingValue: T, key: K): void;

    /**
     * If present this is called with the key when there is value for that key both in new map as well as existing map provided
     * Caller can then decide to update or remove this key.
     * If the key is removed, caller will get callback of createNewValue for that key.
     * If this callback is not provided, the value of such keys is not updated.
     */
    onExistingValue?(existingValue: T, valueInNewMap: U, key: K): void;
}

/** @internal */
/**
 * Mutates the map with newMap such that keys in map will be same as newMap.
 */
export function mutateMapSkippingNewValues<K, T, U>(
    map: ts.ESMap<K, T>,
    newMap: ts.ReadonlyESMap<K, U>,
    options: MutateMapSkippingNewValuesOptions<K, T, U>
) {
    const { onDeleteValue, onExistingValue } = options;
    // Needs update
    map.forEach((existingValue, key) => {
        const valueInNewMap = newMap.get(key);
        // Not present any more in new map, remove it
        if (valueInNewMap === undefined) {
            map.delete(key);
            onDeleteValue(existingValue, key);
        }
        // If present notify about existing values
        else if (onExistingValue) {
            onExistingValue(existingValue, valueInNewMap, key);
        }
    });
}

/** @internal */
export interface MutateMapOptions<K, T, U> extends MutateMapSkippingNewValuesOptions<K, T, U> {
    createNewValue(key: K, valueInNewMap: U): T;
}

/** @internal */
/**
 * Mutates the map with newMap such that keys in map will be same as newMap.
 */
export function mutateMap<K, T, U>(map: ts.ESMap<K, T>, newMap: ts.ReadonlyESMap<K, U>, options: MutateMapOptions<K, T, U>) {
    // Needs update
    mutateMapSkippingNewValues(map, newMap, options);

    const { createNewValue } = options;
    // Add new values that are not already present
    newMap.forEach((valueInNewMap, key) => {
        if (!map.has(key)) {
            // New values
            map.set(key, createNewValue(key, valueInNewMap));
        }
    });
}

/** @internal */
export function isAbstractConstructorSymbol(symbol: ts.Symbol): boolean {
    if (symbol.flags & ts.SymbolFlags.Class) {
        const declaration = getClassLikeDeclarationOfSymbol(symbol);
        return !!declaration && hasSyntacticModifier(declaration, ts.ModifierFlags.Abstract);
    }
    return false;
}

/** @internal */
export function getClassLikeDeclarationOfSymbol(symbol: ts.Symbol): ts.ClassLikeDeclaration | undefined {
    return symbol.declarations?.find(ts.isClassLike);
}

/** @internal */
export function getObjectFlags(type: ts.Type): ts.ObjectFlags {
    return type.flags & ts.TypeFlags.ObjectFlagsType ? (type as ts.ObjectFlagsType).objectFlags : 0;
}

/** @internal */
export function typeHasCallOrConstructSignatures(type: ts.Type, checker: ts.TypeChecker) {
    return checker.getSignaturesOfType(type, ts.SignatureKind.Call).length !== 0 || checker.getSignaturesOfType(type, ts.SignatureKind.Construct).length !== 0;
}

/** @internal */
export function forSomeAncestorDirectory(directory: string, callback: (directory: string) => boolean): boolean {
    return !!ts.forEachAncestorDirectory(directory, d => callback(d) ? true : undefined);
}

/** @internal */
export function isUMDExportSymbol(symbol: ts.Symbol | undefined): boolean {
    return !!symbol && !!symbol.declarations && !!symbol.declarations[0] && ts.isNamespaceExportDeclaration(symbol.declarations[0]);
}

/** @internal */
export function showModuleSpecifier({ moduleSpecifier }: ts.ImportDeclaration): string {
    return ts.isStringLiteral(moduleSpecifier) ? moduleSpecifier.text : getTextOfNode(moduleSpecifier);
}

/** @internal */
export function getLastChild(node: ts.Node): ts.Node | undefined {
    let lastChild: ts.Node | undefined;
    ts.forEachChild(node,
        child => {
            if (nodeIsPresent(child)) lastChild = child;
        },
        children => {
            // As an optimization, jump straight to the end of the list.
            for (let i = children.length - 1; i >= 0; i--) {
                if (nodeIsPresent(children[i])) {
                    lastChild = children[i];
                    break;
                }
            }
        });
    return lastChild;
}

/** @internal */
/** Add a value to a set, and return true if it wasn't already present. */
export function addToSeen<K>(seen: ts.ESMap<K, true>, key: K): boolean;
/** @internal */
export function addToSeen<K, T>(seen: ts.ESMap<K, T>, key: K, value: T): boolean;
/** @internal */
export function addToSeen<K, T>(seen: ts.ESMap<K, T>, key: K, value: T = true as any): boolean {
    if (seen.has(key)) {
        return false;
    }
    seen.set(key, value);
    return true;
}

/** @internal */
export function isObjectTypeDeclaration(node: ts.Node): node is ts.ObjectTypeDeclaration {
    return ts.isClassLike(node) || ts.isInterfaceDeclaration(node) || ts.isTypeLiteralNode(node);
}

/** @internal */
export function isTypeNodeKind(kind: ts.SyntaxKind): kind is ts.TypeNodeSyntaxKind {
    return (kind >= ts.SyntaxKind.FirstTypeNode && kind <= ts.SyntaxKind.LastTypeNode)
        || kind === ts.SyntaxKind.AnyKeyword
        || kind === ts.SyntaxKind.UnknownKeyword
        || kind === ts.SyntaxKind.NumberKeyword
        || kind === ts.SyntaxKind.BigIntKeyword
        || kind === ts.SyntaxKind.ObjectKeyword
        || kind === ts.SyntaxKind.BooleanKeyword
        || kind === ts.SyntaxKind.StringKeyword
        || kind === ts.SyntaxKind.SymbolKeyword
        || kind === ts.SyntaxKind.VoidKeyword
        || kind === ts.SyntaxKind.UndefinedKeyword
        || kind === ts.SyntaxKind.NeverKeyword
        || kind === ts.SyntaxKind.ExpressionWithTypeArguments
        || kind === ts.SyntaxKind.JSDocAllType
        || kind === ts.SyntaxKind.JSDocUnknownType
        || kind === ts.SyntaxKind.JSDocNullableType
        || kind === ts.SyntaxKind.JSDocNonNullableType
        || kind === ts.SyntaxKind.JSDocOptionalType
        || kind === ts.SyntaxKind.JSDocFunctionType
        || kind === ts.SyntaxKind.JSDocVariadicType;
}

/** @internal */
export function isAccessExpression(node: ts.Node): node is ts.AccessExpression {
    return node.kind === ts.SyntaxKind.PropertyAccessExpression || node.kind === ts.SyntaxKind.ElementAccessExpression;
}

/** @internal */
export function getNameOfAccessExpression(node: ts.AccessExpression) {
    if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
        return node.name;
    }
    ts.Debug.assert(node.kind === ts.SyntaxKind.ElementAccessExpression);
    return node.argumentExpression;
}

/** @internal */
export function isBundleFileTextLike(section: ts.BundleFileSection): section is ts.BundleFileTextLike {
    switch (section.kind) {
        case ts.BundleFileSectionKind.Text:
        case ts.BundleFileSectionKind.Internal:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isNamedImportsOrExports(node: ts.Node): node is ts.NamedImportsOrExports {
    return node.kind === ts.SyntaxKind.NamedImports || node.kind === ts.SyntaxKind.NamedExports;
}

/** @internal */
export function getLeftmostAccessExpression(expr: ts.Expression): ts.Expression {
    while (isAccessExpression(expr)) {
        expr = expr.expression;
    }
    return expr;
}

/** @internal */
export function forEachNameInAccessChainWalkingLeft<T>(name: ts.MemberName | ts.StringLiteralLike, action: (name: ts.MemberName | ts.StringLiteralLike) => T | undefined): T | undefined {
    if (isAccessExpression(name.parent) && isRightSideOfAccessExpression(name)) {
        return walkAccessExpression(name.parent);
    }

    function walkAccessExpression(access: ts.AccessExpression): T | undefined {
        if (access.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const res = action(access.name);
            if (res !== undefined) {
                return res;
            }
        }
        else if (access.kind === ts.SyntaxKind.ElementAccessExpression) {
            if (ts.isIdentifier(access.argumentExpression) || ts.isStringLiteralLike(access.argumentExpression)) {
                const res = action(access.argumentExpression);
                if (res !== undefined) {
                    return res;
                }
            }
            else {
                // Chain interrupted by non-static-name access 'x[expr()].y.z'
                return undefined;
            }
        }

        if (isAccessExpression(access.expression)) {
            return walkAccessExpression(access.expression);
        }
        if (ts.isIdentifier(access.expression)) {
            // End of chain at Identifier 'x.y.z'
            return action(access.expression);
        }
        // End of chain at non-Identifier 'x().y.z'
        return undefined;
    }
}



/** @internal */
export function getLeftmostExpression(node: ts.Expression, stopAtCallExpressions: boolean) {
    while (true) {
        switch (node.kind) {
            case ts.SyntaxKind.PostfixUnaryExpression:
                node = (node as ts.PostfixUnaryExpression).operand;
                continue;

            case ts.SyntaxKind.BinaryExpression:
                node = (node as ts.BinaryExpression).left;
                continue;

            case ts.SyntaxKind.ConditionalExpression:
                node = (node as ts.ConditionalExpression).condition;
                continue;

            case ts.SyntaxKind.TaggedTemplateExpression:
                node = (node as ts.TaggedTemplateExpression).tag;
                continue;

            case ts.SyntaxKind.CallExpression:
                if (stopAtCallExpressions) {
                    return node;
                }
                // falls through
            case ts.SyntaxKind.AsExpression:
            case ts.SyntaxKind.ElementAccessExpression:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.NonNullExpression:
            case ts.SyntaxKind.PartiallyEmittedExpression:
            case ts.SyntaxKind.SatisfiesExpression:
                node = (node as ts.CallExpression | ts.PropertyAccessExpression | ts.ElementAccessExpression | ts.AsExpression | ts.NonNullExpression | ts.PartiallyEmittedExpression | ts.SatisfiesExpression).expression;
                continue;
        }

        return node;
    }
}

/** @internal */
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
    getTokenConstructor(): new <TKind extends ts.SyntaxKind>(kind: TKind, pos?: number, end?: number) => ts.Token<TKind>;
    getIdentifierConstructor(): new (kind: ts.SyntaxKind.Identifier, pos?: number, end?: number) => ts.Identifier;
    getPrivateIdentifierConstructor(): new (kind: ts.SyntaxKind.PrivateIdentifier, pos?: number, end?: number) => ts.PrivateIdentifier;
    getSourceFileConstructor(): new (kind: ts.SyntaxKind.SourceFile, pos?: number, end?: number) => ts.SourceFile;
    getSymbolConstructor(): new (flags: ts.SymbolFlags, name: ts.__String) => ts.Symbol;
    getTypeConstructor(): new (checker: ts.TypeChecker, flags: ts.TypeFlags) => ts.Type;
    getSignatureConstructor(): new (checker: ts.TypeChecker, flags: ts.SignatureFlags) => ts.Signature;
    getSourceMapSourceConstructor(): new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => ts.SourceMapSource;
}

function Symbol(this: ts.Symbol, flags: ts.SymbolFlags, name: ts.__String) {
    this.flags = flags;
    this.escapedName = name;
    this.declarations = undefined;
    this.valueDeclaration = undefined;
    this.id = undefined;
    this.mergeId = undefined;
    this.parent = undefined;
}

function Type(this: ts.Type, checker: ts.TypeChecker, flags: ts.TypeFlags) {
    this.flags = flags;
    if (ts.Debug.isDebugging || ts.tracing) {
        this.checker = checker;
    }
}

function Signature(this: ts.Signature, checker: ts.TypeChecker, flags: ts.SignatureFlags) {
    this.flags = flags;
    if (ts.Debug.isDebugging) {
        this.checker = checker;
    }
}

function Node(this: Mutable<ts.Node>, kind: ts.SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = ts.NodeFlags.None;
    this.modifierFlagsCache = ts.ModifierFlags.None;
    this.transformFlags = ts.TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
}

function Token(this: Mutable<ts.Node>, kind: ts.SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = ts.NodeFlags.None;
    this.transformFlags = ts.TransformFlags.None;
    this.parent = undefined!;
}

function Identifier(this: Mutable<ts.Node>, kind: ts.SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = ts.NodeFlags.None;
    this.transformFlags = ts.TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
    this.flowNode = undefined;
}

function SourceMapSource(this: ts.SourceMapSource, fileName: string, text: string, skipTrivia?: (pos: number) => number) {
    this.fileName = fileName;
    this.text = text;
    this.skipTrivia = skipTrivia || (pos => pos);
}

// eslint-disable-next-line prefer-const
/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,
    getPrivateIdentifierConstructor: () => Node as any,
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    getTypeConstructor: () => Type as any,
    getSignatureConstructor: () => Signature as any,
    getSourceMapSourceConstructor: () => SourceMapSource as any,
};

/** @internal */
export function setObjectAllocator(alloc: ObjectAllocator) {
    Object.assign(objectAllocator, alloc);
}

/** @internal */
export function formatStringFromArgs(text: string, args: ArrayLike<string | number>, baseIndex = 0): string {
    return text.replace(/{(\d+)}/g, (_match, index: string) => "" + ts.Debug.checkDefined(args[+index + baseIndex]));
}

let localizedDiagnosticMessages: ts.MapLike<string> | undefined;

/* @internal */
export function setLocalizedDiagnosticMessages(messages: typeof localizedDiagnosticMessages) {
    localizedDiagnosticMessages = messages;
}

/* @internal */
// If the localized messages json is unset, and if given function use it to set the json

export function maybeSetLocalizedDiagnosticMessages(getMessages: undefined | (() => typeof localizedDiagnosticMessages)) {
    if (!localizedDiagnosticMessages && getMessages) {
        localizedDiagnosticMessages = getMessages();
    }
}

/** @internal */
export function getLocaleSpecificMessage(message: ts.DiagnosticMessage) {
    return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
}

/** @internal */
export function createDetachedDiagnostic(fileName: string, start: number, length: number, message: ts.DiagnosticMessage, ...args: (string | number | undefined)[]): ts.DiagnosticWithDetachedLocation;
/** @internal */
export function createDetachedDiagnostic(fileName: string, start: number, length: number, message: ts.DiagnosticMessage): ts.DiagnosticWithDetachedLocation {
    assertDiagnosticLocation(/*file*/ undefined, start, length);
    let text = getLocaleSpecificMessage(message);

    if (arguments.length > 4) {
        text = formatStringFromArgs(text, arguments, 4);
    }

    return {
        file: undefined,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        fileName,
    };
}

function isDiagnosticWithDetachedLocation(diagnostic: ts.DiagnosticRelatedInformation | ts.DiagnosticWithDetachedLocation): diagnostic is ts.DiagnosticWithDetachedLocation {
    return diagnostic.file === undefined
        && diagnostic.start !== undefined
        && diagnostic.length !== undefined
        && typeof (diagnostic as ts.DiagnosticWithDetachedLocation).fileName === "string";
}

function attachFileToDiagnostic(diagnostic: ts.DiagnosticWithDetachedLocation, file: ts.SourceFile): ts.DiagnosticWithLocation {
    const fileName = file.fileName || "";
    const length = file.text.length;
    ts.Debug.assertEqual(diagnostic.fileName, fileName);
    ts.Debug.assertLessThanOrEqual(diagnostic.start, length);
    ts.Debug.assertLessThanOrEqual(diagnostic.start + diagnostic.length, length);
    const diagnosticWithLocation: ts.DiagnosticWithLocation = {
        file,
        start: diagnostic.start,
        length: diagnostic.length,
        messageText: diagnostic.messageText,
        category: diagnostic.category,
        code: diagnostic.code,
        reportsUnnecessary: diagnostic.reportsUnnecessary
    };
    if (diagnostic.relatedInformation) {
        diagnosticWithLocation.relatedInformation = [];
        for (const related of diagnostic.relatedInformation) {
            if (isDiagnosticWithDetachedLocation(related) && related.fileName === fileName) {
                ts.Debug.assertLessThanOrEqual(related.start, length);
                ts.Debug.assertLessThanOrEqual(related.start + related.length, length);
                diagnosticWithLocation.relatedInformation.push(attachFileToDiagnostic(related, file));
            }
            else {
                diagnosticWithLocation.relatedInformation.push(related);
            }
        }
    }
    return diagnosticWithLocation;
}

/** @internal */
export function attachFileToDiagnostics(diagnostics: ts.DiagnosticWithDetachedLocation[], file: ts.SourceFile): ts.DiagnosticWithLocation[] {
    const diagnosticsWithLocation: ts.DiagnosticWithLocation[] = [];
    for (const diagnostic of diagnostics) {
        diagnosticsWithLocation.push(attachFileToDiagnostic(diagnostic, file));
    }
    return diagnosticsWithLocation;
}

/** @internal */
export function createFileDiagnostic(file: ts.SourceFile, start: number, length: number, message: ts.DiagnosticMessage, ...args: (string | number | undefined)[]): ts.DiagnosticWithLocation;
/** @internal */
export function createFileDiagnostic(file: ts.SourceFile, start: number, length: number, message: ts.DiagnosticMessage): ts.DiagnosticWithLocation {
    assertDiagnosticLocation(file, start, length);

    let text = getLocaleSpecificMessage(message);

    if (arguments.length > 4) {
        text = formatStringFromArgs(text, arguments, 4);
    }

    return {
        file,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated
    };
}

/** @internal */
export function formatMessage(_dummy: any, message: ts.DiagnosticMessage, ...args: (string | number | undefined)[]): string;
/** @internal */
export function formatMessage(_dummy: any, message: ts.DiagnosticMessage): string {
    let text = getLocaleSpecificMessage(message);

    if (arguments.length > 2) {
        text = formatStringFromArgs(text, arguments, 2);
    }

    return text;
}

/** @internal */
export function createCompilerDiagnostic(message: ts.DiagnosticMessage, ...args: (string | number | undefined)[]): ts.Diagnostic;
/** @internal */
export function createCompilerDiagnostic(message: ts.DiagnosticMessage): ts.Diagnostic {
    let text = getLocaleSpecificMessage(message);

    if (arguments.length > 1) {
        text = formatStringFromArgs(text, arguments, 1);
    }

    return {
        file: undefined,
        start: undefined,
        length: undefined,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated
    };
}

/** @internal */
export function createCompilerDiagnosticFromMessageChain(chain: ts.DiagnosticMessageChain, relatedInformation?: ts.DiagnosticRelatedInformation[]): ts.Diagnostic {
    return {
        file: undefined,
        start: undefined,
        length: undefined,

        code: chain.code,
        category: chain.category,
        messageText: chain.next ? chain : chain.messageText,
        relatedInformation
    };
}

/** @internal */
export function chainDiagnosticMessages(details: ts.DiagnosticMessageChain | ts.DiagnosticMessageChain[] | undefined, message: ts.DiagnosticMessage, ...args: (string | number | undefined)[]): ts.DiagnosticMessageChain;
/** @internal */
export function chainDiagnosticMessages(details: ts.DiagnosticMessageChain | ts.DiagnosticMessageChain[] | undefined, message: ts.DiagnosticMessage): ts.DiagnosticMessageChain {
    let text = getLocaleSpecificMessage(message);

    if (arguments.length > 2) {
        text = formatStringFromArgs(text, arguments, 2);
    }
    return {
        messageText: text,
        category: message.category,
        code: message.code,

        next: details === undefined || Array.isArray(details) ? details : [details]
    };
}

/** @internal */
export function concatenateDiagnosticMessageChains(headChain: ts.DiagnosticMessageChain, tailChain: ts.DiagnosticMessageChain): void {
    let lastChain = headChain;
    while (lastChain.next) {
        lastChain = lastChain.next[0];
    }

    lastChain.next = [tailChain];
}

function getDiagnosticFilePath(diagnostic: ts.Diagnostic): string | undefined {
    return diagnostic.file ? diagnostic.file.path : undefined;
}

/** @internal */
export function compareDiagnostics(d1: ts.Diagnostic, d2: ts.Diagnostic): ts.Comparison {
    return compareDiagnosticsSkipRelatedInformation(d1, d2) ||
        compareRelatedInformation(d1, d2) ||
        ts.Comparison.EqualTo;
}

/** @internal */
export function compareDiagnosticsSkipRelatedInformation(d1: ts.Diagnostic, d2: ts.Diagnostic): ts.Comparison {
    return ts.compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) ||
        ts.compareValues(d1.start, d2.start) ||
        ts.compareValues(d1.length, d2.length) ||
        ts.compareValues(d1.code, d2.code) ||
        compareMessageText(d1.messageText, d2.messageText) ||
        ts.Comparison.EqualTo;
}

function compareRelatedInformation(d1: ts.Diagnostic, d2: ts.Diagnostic): ts.Comparison {
    if (!d1.relatedInformation && !d2.relatedInformation) {
        return ts.Comparison.EqualTo;
    }
    if (d1.relatedInformation && d2.relatedInformation) {
        return ts.compareValues(d1.relatedInformation.length, d2.relatedInformation.length) || ts.forEach(d1.relatedInformation, (d1i, index) => {
            const d2i = d2.relatedInformation![index];
            return compareDiagnostics(d1i, d2i); // EqualTo is 0, so falsy, and will cause the next item to be compared
        }) || ts.Comparison.EqualTo;
    }
    return d1.relatedInformation ? ts.Comparison.LessThan : ts.Comparison.GreaterThan;
}

function compareMessageText(t1: string | ts.DiagnosticMessageChain, t2: string | ts.DiagnosticMessageChain): ts.Comparison {
    if (typeof t1 === "string" && typeof t2 === "string") {
        return ts.compareStringsCaseSensitive(t1, t2);
    }
    else if (typeof t1 === "string") {
        return ts.Comparison.LessThan;
    }
    else if (typeof t2 === "string") {
        return ts.Comparison.GreaterThan;
    }
    let res = ts.compareStringsCaseSensitive(t1.messageText, t2.messageText);
    if (res) {
        return res;
    }
    if (!t1.next && !t2.next) {
        return ts.Comparison.EqualTo;
    }
    if (!t1.next) {
        return ts.Comparison.LessThan;
    }
    if (!t2.next) {
        return ts.Comparison.GreaterThan;
    }
    const len = Math.min(t1.next.length, t2.next.length);
    for (let i = 0; i < len; i++) {
        res = compareMessageText(t1.next[i], t2.next[i]);
        if (res) {
            return res;
        }
    }
    if (t1.next.length < t2.next.length) {
        return ts.Comparison.LessThan;
    }
    else if (t1.next.length > t2.next.length) {
        return ts.Comparison.GreaterThan;
    }
    return ts.Comparison.EqualTo;
}

/** @internal */
export function getLanguageVariant(scriptKind: ts.ScriptKind) {
    // .tsx and .jsx files are treated as jsx language variant.
    return scriptKind === ts.ScriptKind.TSX || scriptKind === ts.ScriptKind.JSX || scriptKind === ts.ScriptKind.JS || scriptKind === ts.ScriptKind.JSON ? ts.LanguageVariant.JSX : ts.LanguageVariant.Standard;
}

/**
 * This is a somewhat unavoidable full tree walk to locate a JSX tag - `import.meta` requires the same,
 * but we avoid that walk (or parts of it) if at all possible using the `PossiblyContainsImportMeta` node flag.
 * Unfortunately, there's no `NodeFlag` space to do the same for JSX.
 */
function walkTreeForJSXTags(node: ts.Node): ts.Node | undefined {
    if (!(node.transformFlags & ts.TransformFlags.ContainsJsx)) return undefined;
    return ts.isJsxOpeningLikeElement(node) || ts.isJsxFragment(node) ? node : ts.forEachChild(node, walkTreeForJSXTags);
}

function isFileModuleFromUsingJSXTag(file: ts.SourceFile): ts.Node | undefined {
    // Excludes declaration files - they still require an explicit `export {}` or the like
    // for back compat purposes. (not that declaration files should contain JSX tags!)
    return !file.isDeclarationFile ? walkTreeForJSXTags(file) : undefined;
}

/**
 * Note that this requires file.impliedNodeFormat be set already; meaning it must be set very early on
 * in SourceFile construction.
 */
function isFileForcedToBeModuleByFormat(file: ts.SourceFile): true | undefined {
    // Excludes declaration files - they still require an explicit `export {}` or the like
    // for back compat purposes. The only non-declaration files _not_ forced to be a module are `.js` files
    // that aren't esm-mode (meaning not in a `type: module` scope).
    return (file.impliedNodeFormat === ts.ModuleKind.ESNext || (ts.fileExtensionIsOneOf(file.fileName, [ts.Extension.Cjs, ts.Extension.Cts, ts.Extension.Mjs, ts.Extension.Mts]))) && !file.isDeclarationFile ? true : undefined;
}

/** @internal */
export function getSetExternalModuleIndicator(options: ts.CompilerOptions): (file: ts.SourceFile) => void {
    // TODO: Should this callback be cached?
    switch (getEmitModuleDetectionKind(options)) {
        case ts.ModuleDetectionKind.Force:
            // All non-declaration files are modules, declaration files still do the usual isFileProbablyExternalModule
            return (file: ts.SourceFile) => {
                file.externalModuleIndicator = ts.isFileProbablyExternalModule(file) || !file.isDeclarationFile || undefined;
            };
        case ts.ModuleDetectionKind.Legacy:
            // Files are modules if they have imports, exports, or import.meta
            return (file: ts.SourceFile) => {
                file.externalModuleIndicator = ts.isFileProbablyExternalModule(file);
            };
        case ts.ModuleDetectionKind.Auto:
            // If module is nodenext or node16, all esm format files are modules
            // If jsx is react-jsx or react-jsxdev then jsx tags force module-ness
            // otherwise, the presence of import or export statments (or import.meta) implies module-ness
            const checks: ((file: ts.SourceFile) => ts.Node | true | undefined)[] = [ts.isFileProbablyExternalModule];
            if (options.jsx === ts.JsxEmit.ReactJSX || options.jsx === ts.JsxEmit.ReactJSXDev) {
                checks.push(isFileModuleFromUsingJSXTag);
            }
            checks.push(isFileForcedToBeModuleByFormat);
            const combined = ts.or(...checks);
            const callback = (file: ts.SourceFile) => void (file.externalModuleIndicator = combined(file));
            return callback;
    }
}

/** @internal */
export function getEmitScriptTarget(compilerOptions: {module?: ts.CompilerOptions["module"], target?: ts.CompilerOptions["target"]}) {
    return compilerOptions.target ||
        (compilerOptions.module === ts.ModuleKind.Node16 && ts.ScriptTarget.ES2022) ||
        (compilerOptions.module === ts.ModuleKind.NodeNext && ts.ScriptTarget.ESNext) ||
        ts.ScriptTarget.ES3;
}

/** @internal */
export function getEmitModuleKind(compilerOptions: {module?: ts.CompilerOptions["module"], target?: ts.CompilerOptions["target"]}) {
    return typeof compilerOptions.module === "number" ?
        compilerOptions.module :
        getEmitScriptTarget(compilerOptions) >= ts.ScriptTarget.ES2015 ? ts.ModuleKind.ES2015 : ts.ModuleKind.CommonJS;
}

/** @internal */
export function getEmitModuleResolutionKind(compilerOptions: ts.CompilerOptions) {
    let moduleResolution = compilerOptions.moduleResolution;
    if (moduleResolution === undefined) {
        switch (getEmitModuleKind(compilerOptions)) {
            case ts.ModuleKind.CommonJS:
                moduleResolution = ts.ModuleResolutionKind.NodeJs;
                break;
            case ts.ModuleKind.Node16:
                moduleResolution = ts.ModuleResolutionKind.Node16;
                break;
            case ts.ModuleKind.NodeNext:
                moduleResolution = ts.ModuleResolutionKind.NodeNext;
                break;
            default:
                moduleResolution = ts.ModuleResolutionKind.Classic;
                break;
        }
    }
    return moduleResolution;
}

/** @internal */
export function getEmitModuleDetectionKind(options: ts.CompilerOptions) {
    return options.moduleDetection ||
        (getEmitModuleKind(options) === ts.ModuleKind.Node16 || getEmitModuleKind(options) === ts.ModuleKind.NodeNext ? ts.ModuleDetectionKind.Force : ts.ModuleDetectionKind.Auto);
}

/** @internal */
export function hasJsonModuleEmitEnabled(options: ts.CompilerOptions) {
    switch (getEmitModuleKind(options)) {
        case ts.ModuleKind.CommonJS:
        case ts.ModuleKind.AMD:
        case ts.ModuleKind.ES2015:
        case ts.ModuleKind.ES2020:
        case ts.ModuleKind.ES2022:
        case ts.ModuleKind.ESNext:
        case ts.ModuleKind.Node16:
        case ts.ModuleKind.NodeNext:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function unreachableCodeIsError(options: ts.CompilerOptions): boolean {
    return options.allowUnreachableCode === false;
}

/** @internal */
export function unusedLabelIsError(options: ts.CompilerOptions): boolean {
    return options.allowUnusedLabels === false;
}

/** @internal */
export function getAreDeclarationMapsEnabled(options: ts.CompilerOptions) {
    return !!(getEmitDeclarations(options) && options.declarationMap);
}

/** @internal */
export function getESModuleInterop(compilerOptions: ts.CompilerOptions) {
    if (compilerOptions.esModuleInterop !== undefined) {
        return compilerOptions.esModuleInterop;
    }
    switch (getEmitModuleKind(compilerOptions)) {
        case ts.ModuleKind.Node16:
        case ts.ModuleKind.NodeNext:
            return true;
    }
    return undefined;
}

/** @internal */
export function getAllowSyntheticDefaultImports(compilerOptions: ts.CompilerOptions) {
    const moduleKind = getEmitModuleKind(compilerOptions);
    return compilerOptions.allowSyntheticDefaultImports !== undefined
        ? compilerOptions.allowSyntheticDefaultImports
        : getESModuleInterop(compilerOptions) ||
        moduleKind === ts.ModuleKind.System;
}

/** @internal */
export function getEmitDeclarations(compilerOptions: ts.CompilerOptions): boolean {
    return !!(compilerOptions.declaration || compilerOptions.composite);
}

/** @internal */
export function shouldPreserveConstEnums(compilerOptions: ts.CompilerOptions): boolean {
    return !!(compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
}

/** @internal */
export function isIncrementalCompilation(options: ts.CompilerOptions) {
    return !!(options.incremental || options.composite);
}

/** @internal */
export type StrictOptionName =
    | "noImplicitAny"
    | "noImplicitThis"
    | "strictNullChecks"
    | "strictFunctionTypes"
    | "strictBindCallApply"
    | "strictPropertyInitialization"
    | "alwaysStrict"
    | "useUnknownInCatchVariables"
    ;

/** @internal */
export function getStrictOptionValue(compilerOptions: ts.CompilerOptions, flag: StrictOptionName): boolean {
    return compilerOptions[flag] === undefined ? !!compilerOptions.strict : !!compilerOptions[flag];
}

/** @internal */
export function getAllowJSCompilerOption(compilerOptions: ts.CompilerOptions): boolean {
    return compilerOptions.allowJs === undefined ? !!compilerOptions.checkJs : compilerOptions.allowJs;
}

/** @internal */
export function getUseDefineForClassFields(compilerOptions: ts.CompilerOptions): boolean {
    return compilerOptions.useDefineForClassFields === undefined ? getEmitScriptTarget(compilerOptions) >= ts.ScriptTarget.ES2022 : compilerOptions.useDefineForClassFields;
}

/** @internal */
export function compilerOptionsAffectSemanticDiagnostics(newOptions: ts.CompilerOptions, oldOptions: ts.CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, ts.semanticDiagnosticsOptionDeclarations);
}

/** @internal */
export function compilerOptionsAffectEmit(newOptions: ts.CompilerOptions, oldOptions: ts.CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, ts.affectsEmitOptionDeclarations);
}

/** @internal */
export function compilerOptionsAffectDeclarationPath(newOptions: ts.CompilerOptions, oldOptions: ts.CompilerOptions): boolean {
    return optionsHaveChanges(oldOptions, newOptions, ts.affectsDeclarationPathOptionDeclarations);
}

/** @internal */
export function getCompilerOptionValue(options: ts.CompilerOptions, option: ts.CommandLineOption): unknown {
    return option.strictFlag ? getStrictOptionValue(options, option.name as StrictOptionName) : options[option.name];
}

/** @internal */
export function getJSXTransformEnabled(options: ts.CompilerOptions): boolean {
    const jsx = options.jsx;
    return jsx === ts.JsxEmit.React || jsx === ts.JsxEmit.ReactJSX || jsx === ts.JsxEmit.ReactJSXDev;
}

/** @internal */
export function getJSXImplicitImportBase(compilerOptions: ts.CompilerOptions, file?: ts.SourceFile): string | undefined {
    const jsxImportSourcePragmas = file?.pragmas.get("jsximportsource");
    const jsxImportSourcePragma = ts.isArray(jsxImportSourcePragmas) ? jsxImportSourcePragmas[jsxImportSourcePragmas.length - 1] : jsxImportSourcePragmas;
    return compilerOptions.jsx === ts.JsxEmit.ReactJSX ||
        compilerOptions.jsx === ts.JsxEmit.ReactJSXDev ||
        compilerOptions.jsxImportSource ||
        jsxImportSourcePragma ?
            jsxImportSourcePragma?.arguments.factory || compilerOptions.jsxImportSource || "react" :
            undefined;
}

/** @internal */
export function getJSXRuntimeImport(base: string | undefined, options: ts.CompilerOptions) {
    return base ? `${base}/${options.jsx === ts.JsxEmit.ReactJSXDev ? "jsx-dev-runtime" : "jsx-runtime"}` : undefined;
}

/** @internal */
export function hasZeroOrOneAsteriskCharacter(str: string): boolean {
    let seenAsterisk = false;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) === ts.CharacterCodes.asterisk) {
            if (!seenAsterisk) {
                seenAsterisk = true;
            }
            else {
                // have already seen asterisk
                return false;
            }
        }
    }
    return true;
}

/** @internal */
export interface SymlinkedDirectory {
    /** Matches the casing returned by `realpath`.  Used to compute the `realpath` of children. */
    real: string;
    /** toPath(real).  Stored to avoid repeated recomputation. */
    realPath: ts.Path;
}

/** @internal */
export interface SymlinkCache {
    /** Gets a map from symlink to realpath. Keys have trailing directory separators. */
    getSymlinkedDirectories(): ts.ReadonlyESMap<ts.Path, SymlinkedDirectory | false> | undefined;
    /** Gets a map from realpath to symlinks. Keys have trailing directory separators. */
    getSymlinkedDirectoriesByRealpath(): ts.MultiMap<ts.Path, string> | undefined;
    /** Gets a map from symlink to realpath */
    getSymlinkedFiles(): ts.ReadonlyESMap<ts.Path, string> | undefined;
    setSymlinkedDirectory(symlink: string, real: SymlinkedDirectory | false): void;
    setSymlinkedFile(symlinkPath: ts.Path, real: string): void;
    /**
     * @internal
     * Uses resolvedTypeReferenceDirectives from program instead of from files, since files
     * don't include automatic type reference directives. Must be called only when
     * `hasProcessedResolutions` returns false (once per cache instance).
     */
    setSymlinksFromResolutions(files: readonly ts.SourceFile[], typeReferenceDirectives: ts.ModeAwareCache<ts.ResolvedTypeReferenceDirective | undefined> | undefined): void;
    /**
     * @internal
     * Whether `setSymlinksFromResolutions` has already been called.
     */
    hasProcessedResolutions(): boolean;
}

/** @internal */
export function createSymlinkCache(cwd: string, getCanonicalFileName: ts.GetCanonicalFileName): SymlinkCache {
    let symlinkedDirectories: ts.ESMap<ts.Path, SymlinkedDirectory | false> | undefined;
    let symlinkedDirectoriesByRealpath: ts.MultiMap<ts.Path, string> | undefined;
    let symlinkedFiles: ts.ESMap<ts.Path, string> | undefined;
    let hasProcessedResolutions = false;
    return {
        getSymlinkedFiles: () => symlinkedFiles,
        getSymlinkedDirectories: () => symlinkedDirectories,
        getSymlinkedDirectoriesByRealpath: () => symlinkedDirectoriesByRealpath,
        setSymlinkedFile: (path, real) => (symlinkedFiles || (symlinkedFiles = new ts.Map())).set(path, real),
        setSymlinkedDirectory: (symlink, real) => {
            // Large, interconnected dependency graphs in pnpm will have a huge number of symlinks
            // where both the realpath and the symlink path are inside node_modules/.pnpm. Since
            // this path is never a candidate for a module specifier, we can ignore it entirely.
            let symlinkPath = ts.toPath(symlink, cwd, getCanonicalFileName);
            if (!containsIgnoredPath(symlinkPath)) {
                symlinkPath = ts.ensureTrailingDirectorySeparator(symlinkPath);
                if (real !== false && !symlinkedDirectories?.has(symlinkPath)) {
                    (symlinkedDirectoriesByRealpath ||= ts.createMultiMap()).add(ts.ensureTrailingDirectorySeparator(real.realPath), symlink);
                }
                (symlinkedDirectories || (symlinkedDirectories = new ts.Map())).set(symlinkPath, real);
            }
        },
        setSymlinksFromResolutions(files, typeReferenceDirectives) {
            ts.Debug.assert(!hasProcessedResolutions);
            hasProcessedResolutions = true;
            for (const file of files) {
                file.resolvedModules?.forEach(resolution => processResolution(this, resolution));
            }
            typeReferenceDirectives?.forEach(resolution => processResolution(this, resolution));
        },
        hasProcessedResolutions: () => hasProcessedResolutions,
    };

    function processResolution(cache: SymlinkCache, resolution: ts.ResolvedModuleFull | ts.ResolvedTypeReferenceDirective | undefined) {
        if (!resolution || !resolution.originalPath || !resolution.resolvedFileName) return;
        const { resolvedFileName, originalPath } = resolution;
        cache.setSymlinkedFile(ts.toPath(originalPath, cwd, getCanonicalFileName), resolvedFileName);
        const [commonResolved, commonOriginal] = guessDirectorySymlink(resolvedFileName, originalPath, cwd, getCanonicalFileName) || ts.emptyArray;
        if (commonResolved && commonOriginal) {
            cache.setSymlinkedDirectory(
                commonOriginal,
                { real: commonResolved, realPath: ts.toPath(commonResolved, cwd, getCanonicalFileName) });
        }
    }
}

function guessDirectorySymlink(a: string, b: string, cwd: string, getCanonicalFileName: ts.GetCanonicalFileName): [string, string] | undefined {
    const aParts = ts.getPathComponents(ts.getNormalizedAbsolutePath(a, cwd));
    const bParts = ts.getPathComponents(ts.getNormalizedAbsolutePath(b, cwd));
    let isDirectory = false;
    while (
        aParts.length >= 2 && bParts.length >= 2 &&
        !isNodeModulesOrScopedPackageDirectory(aParts[aParts.length - 2], getCanonicalFileName) &&
        !isNodeModulesOrScopedPackageDirectory(bParts[bParts.length - 2], getCanonicalFileName) &&
        getCanonicalFileName(aParts[aParts.length - 1]) === getCanonicalFileName(bParts[bParts.length - 1])
    ) {
        aParts.pop();
        bParts.pop();
        isDirectory = true;
    }
    return isDirectory ? [ts.getPathFromPathComponents(aParts), ts.getPathFromPathComponents(bParts)] : undefined;
}

// KLUDGE: Don't assume one 'node_modules' links to another. More likely a single directory inside the node_modules is the symlink.
// ALso, don't assume that an `@foo` directory is linked. More likely the contents of that are linked.
function isNodeModulesOrScopedPackageDirectory(s: string | undefined, getCanonicalFileName: ts.GetCanonicalFileName): boolean {
    return s !== undefined && (getCanonicalFileName(s) === "node_modules" || ts.startsWith(s, "@"));
}

function stripLeadingDirectorySeparator(s: string): string | undefined {
    return ts.isAnyDirectorySeparator(s.charCodeAt(0)) ? s.slice(1) : undefined;
}

/** @internal */
export function tryRemoveDirectoryPrefix(path: string, dirPath: string, getCanonicalFileName: ts.GetCanonicalFileName): string | undefined {
    const withoutPrefix = ts.tryRemovePrefix(path, dirPath, getCanonicalFileName);
    return withoutPrefix === undefined ? undefined : stripLeadingDirectorySeparator(withoutPrefix);
}

// Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
// It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
// proof.
const reservedCharacterPattern = /[^\w\s\/]/g;

/** @internal */
export function regExpEscape(text: string) {
    return text.replace(reservedCharacterPattern, escapeRegExpCharacter);
}

function escapeRegExpCharacter(match: string) {
    return "\\" + match;
}

const wildcardCharCodes = [ts.CharacterCodes.asterisk, ts.CharacterCodes.question];

/** @internal */
export const commonPackageFolders: readonly string[] = ["node_modules", "bower_components", "jspm_packages"];

const implicitExcludePathRegexPattern = `(?!(${commonPackageFolders.join("|")})(/|$))`;

interface WildcardMatcher {
    singleAsteriskRegexFragment: string;
    doubleAsteriskRegexFragment: string;
    replaceWildcardCharacter: (match: string) => string;
}

const filesMatcher: WildcardMatcher = {
    /**
     * Matches any single directory segment unless it is the last segment and a .min.js file
     * Breakdown:
     *  [^./]                   # matches everything up to the first . character (excluding directory separators)
     *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
     */
    singleAsteriskRegexFragment: "([^./]|(\\.(?!min\\.js$))?)*",
    /**
     * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
     * files or directories, does not match subdirectories that start with a . character
     */
    doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, filesMatcher.singleAsteriskRegexFragment)
};

const directoriesMatcher: WildcardMatcher = {
    singleAsteriskRegexFragment: "[^/]*",
    /**
     * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
     * files or directories, does not match subdirectories that start with a . character
     */
    doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, directoriesMatcher.singleAsteriskRegexFragment)
};

const excludeMatcher: WildcardMatcher = {
    singleAsteriskRegexFragment: "[^/]*",
    doubleAsteriskRegexFragment: "(/.+?)?",
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, excludeMatcher.singleAsteriskRegexFragment)
};

const wildcardMatchers = {
    files: filesMatcher,
    directories: directoriesMatcher,
    exclude: excludeMatcher
};

/** @internal */
export function getRegularExpressionForWildcard(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): string | undefined {
    const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
    if (!patterns || !patterns.length) {
        return undefined;
    }

    const pattern = patterns.map(pattern => `(${pattern})`).join("|");
    // If excluding, match "foo/bar/baz...", but if including, only allow "foo".
    const terminator = usage === "exclude" ? "($|/)" : "$";
    return `^(${pattern})${terminator}`;
}

/** @internal */
export function getRegularExpressionsForWildcards(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): readonly string[] | undefined {
    if (specs === undefined || specs.length === 0) {
        return undefined;
    }

    return ts.flatMap(specs, spec =>
        spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]));
}

/** @internal */
/**
 * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
 * and does not contain any glob characters itself.
 */
export function isImplicitGlob(lastPathComponent: string): boolean {
    return !/[.*?]/.test(lastPathComponent);
}

/** @internal */
export function getPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude") {
    const pattern = spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]);
    return pattern && `^(${pattern})${usage === "exclude" ? "($|/)" : "$"}`;
}

function getSubPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude", { singleAsteriskRegexFragment, doubleAsteriskRegexFragment, replaceWildcardCharacter }: WildcardMatcher): string | undefined {
    let subpattern = "";
    let hasWrittenComponent = false;
    const components = ts.getNormalizedPathComponents(spec, basePath);
    const lastComponent = ts.last(components);
    if (usage !== "exclude" && lastComponent === "**") {
        return undefined;
    }

    // getNormalizedPathComponents includes the separator for the root component.
    // We need to remove to create our regex correctly.
    components[0] = ts.removeTrailingDirectorySeparator(components[0]);

    if (isImplicitGlob(lastComponent)) {
        components.push("**", "*");
    }

    let optionalCount = 0;
    for (let component of components) {
        if (component === "**") {
            subpattern += doubleAsteriskRegexFragment;
        }
        else {
            if (usage === "directories") {
                subpattern += "(";
                optionalCount++;
            }

            if (hasWrittenComponent) {
                subpattern += ts.directorySeparator;
            }

            if (usage !== "exclude") {
                let componentPattern = "";
                // The * and ? wildcards should not match directories or files that start with . if they
                // appear first in a component. Dotted directories and files can be included explicitly
                // like so: **/.*/.*
                if (component.charCodeAt(0) === ts.CharacterCodes.asterisk) {
                    componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                    component = component.substr(1);
                }
                else if (component.charCodeAt(0) === ts.CharacterCodes.question) {
                    componentPattern += "[^./]";
                    component = component.substr(1);
                }

                componentPattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);

                // Patterns should not include subfolders like node_modules unless they are
                // explicitly included as part of the path.
                //
                // As an optimization, if the component pattern is the same as the component,
                // then there definitely were no wildcard characters and we do not need to
                // add the exclusion pattern.
                if (componentPattern !== component) {
                    subpattern += implicitExcludePathRegexPattern;
                }

                subpattern += componentPattern;
            }
            else {
                subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
            }
        }

        hasWrittenComponent = true;
    }

    while (optionalCount > 0) {
        subpattern += ")?";
        optionalCount--;
    }

    return subpattern;
}

function replaceWildcardCharacter(match: string, singleAsteriskRegexFragment: string) {
    return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
}

/** @internal */
export interface FileSystemEntries {
    readonly files: readonly string[];
    readonly directories: readonly string[];
}

/** @internal */
export interface FileMatcherPatterns {
    /** One pattern for each "include" spec. */
    includeFilePatterns: readonly string[] | undefined;
    /** One pattern matching one of any of the "include" specs. */
    includeFilePattern: string | undefined;
    includeDirectoryPattern: string | undefined;
    excludePattern: string | undefined;
    basePaths: readonly string[];
}

/** @internal */
/** @param path directory of the tsconfig.json */
export function getFileMatcherPatterns(path: string, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
    path = ts.normalizePath(path);
    currentDirectory = ts.normalizePath(currentDirectory);
    const absolutePath = ts.combinePaths(currentDirectory, path);

    return {
        includeFilePatterns: ts.map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), pattern => `^${pattern}$`),
        includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
        includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
        excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
        basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
    };
}

/** @internal */
export function getRegexFromPattern(pattern: string, useCaseSensitiveFileNames: boolean): RegExp {
    return new RegExp(pattern, useCaseSensitiveFileNames ? "" : "i");
}

/** @internal */
/** @param path directory of the tsconfig.json */
export function matchFiles(path: string, extensions: readonly string[] | undefined, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string, depth: number | undefined, getFileSystemEntries: (path: string) => FileSystemEntries, realpath: (path: string) => string): string[] {
    path = ts.normalizePath(path);
    currentDirectory = ts.normalizePath(currentDirectory);

    const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

    const includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map(pattern => getRegexFromPattern(pattern, useCaseSensitiveFileNames));
    const includeDirectoryRegex = patterns.includeDirectoryPattern && getRegexFromPattern(patterns.includeDirectoryPattern, useCaseSensitiveFileNames);
    const excludeRegex = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames);

    // Associate an array of results with each include regex. This keeps results in order of the "include" order.
    // If there are no "includes", then just put everything in results[0].
    const results: string[][] = includeFileRegexes ? includeFileRegexes.map(() => []) : [[]];
    const visited = new ts.Map<string, true>();
    const toCanonical = ts.createGetCanonicalFileName(useCaseSensitiveFileNames);
    for (const basePath of patterns.basePaths) {
        visitDirectory(basePath, ts.combinePaths(currentDirectory, basePath), depth);
    }

    return ts.flatten(results);

    function visitDirectory(path: string, absolutePath: string, depth: number | undefined) {
        const canonicalPath = toCanonical(realpath(absolutePath));
        if (visited.has(canonicalPath)) return;
        visited.set(canonicalPath, true);
        const { files, directories } = getFileSystemEntries(path);

        for (const current of ts.sort<string>(files, ts.compareStringsCaseSensitive)) {
            const name = ts.combinePaths(path, current);
            const absoluteName = ts.combinePaths(absolutePath, current);
            if (extensions && !ts.fileExtensionIsOneOf(name, extensions)) continue;
            if (excludeRegex && excludeRegex.test(absoluteName)) continue;
            if (!includeFileRegexes) {
                results[0].push(name);
            }
            else {
                const includeIndex = ts.findIndex(includeFileRegexes, re => re.test(absoluteName));
                if (includeIndex !== -1) {
                    results[includeIndex].push(name);
                }
            }
        }

        if (depth !== undefined) {
            depth--;
            if (depth === 0) {
                return;
            }
        }

        for (const current of ts.sort<string>(directories, ts.compareStringsCaseSensitive)) {
            const name = ts.combinePaths(path, current);
            const absoluteName = ts.combinePaths(absolutePath, current);
            if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                (!excludeRegex || !excludeRegex.test(absoluteName))) {
                visitDirectory(name, absoluteName, depth);
            }
        }
    }
}

/**
 * Computes the unique non-wildcard base paths amongst the provided include patterns.
 */
function getBasePaths(path: string, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean): string[] {
    // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
    const basePaths: string[] = [path];

    if (includes) {
        // Storage for literal base paths amongst the include patterns.
        const includeBasePaths: string[] = [];
        for (const include of includes) {
            // We also need to check the relative paths by converting them to absolute and normalizing
            // in case they escape the base path (e.g "..\somedirectory")
            const absolute: string = ts.isRootedDiskPath(include) ? include : ts.normalizePath(ts.combinePaths(path, include));
            // Append the literal and canonical candidate base paths.
            includeBasePaths.push(getIncludeBasePath(absolute));
        }

        // Sort the offsets array using either the literal or canonical path representations.
        includeBasePaths.sort(ts.getStringComparer(!useCaseSensitiveFileNames));

        // Iterate over each include base path and include unique base paths that are not a
        // subpath of an existing base path
        for (const includeBasePath of includeBasePaths) {
            if (ts.every(basePaths, basePath => !ts.containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames))) {
                basePaths.push(includeBasePath);
            }
        }
    }

    return basePaths;
}

function getIncludeBasePath(absolute: string): string {
    const wildcardOffset = ts.indexOfAnyCharCode(absolute, wildcardCharCodes);
    if (wildcardOffset < 0) {
        // No "*" or "?" in the path
        return !ts.hasExtension(absolute)
            ? absolute
            : ts.removeTrailingDirectorySeparator(ts.getDirectoryPath(absolute));
    }
    return absolute.substring(0, absolute.lastIndexOf(ts.directorySeparator, wildcardOffset));
}

/** @internal */
export function ensureScriptKind(fileName: string, scriptKind: ts.ScriptKind | undefined): ts.ScriptKind {
    // Using scriptKind as a condition handles both:
    // - 'scriptKind' is unspecified and thus it is `undefined`
    // - 'scriptKind' is set and it is `Unknown` (0)
    // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
    // to get the ScriptKind from the file name. If it cannot be resolved
    // from the file name then the default 'TS' script kind is returned.
    return scriptKind || getScriptKindFromFileName(fileName) || ts.ScriptKind.TS;
}

/** @internal */
export function getScriptKindFromFileName(fileName: string): ts.ScriptKind {
    const ext = fileName.substr(fileName.lastIndexOf("."));
    switch (ext.toLowerCase()) {
        case ts.Extension.Js:
        case ts.Extension.Cjs:
        case ts.Extension.Mjs:
            return ts.ScriptKind.JS;
        case ts.Extension.Jsx:
            return ts.ScriptKind.JSX;
        case ts.Extension.Ts:
        case ts.Extension.Cts:
        case ts.Extension.Mts:
            return ts.ScriptKind.TS;
        case ts.Extension.Tsx:
            return ts.ScriptKind.TSX;
        case ts.Extension.Json:
            return ts.ScriptKind.JSON;
        default:
            return ts.ScriptKind.Unknown;
    }
}

/** @internal */
/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 */
export const supportedTSExtensions: readonly ts.Extension[][] = [[ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Dts], [ts.Extension.Cts, ts.Extension.Dcts], [ts.Extension.Mts, ts.Extension.Dmts]];
/** @internal */
export const supportedTSExtensionsFlat: readonly ts.Extension[] = ts.flatten(supportedTSExtensions);
const supportedTSExtensionsWithJson: readonly ts.Extension[][] = [...supportedTSExtensions, [ts.Extension.Json]];
/** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
const supportedTSExtensionsForExtractExtension: readonly ts.Extension[] = [ts.Extension.Dts, ts.Extension.Dcts, ts.Extension.Dmts, ts.Extension.Cts, ts.Extension.Mts, ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Cts, ts.Extension.Mts];
/** @internal */
export const supportedJSExtensions: readonly ts.Extension[][] = [[ts.Extension.Js, ts.Extension.Jsx], [ts.Extension.Mjs], [ts.Extension.Cjs]];
/** @internal */
export const supportedJSExtensionsFlat: readonly ts.Extension[] = ts.flatten(supportedJSExtensions);
const allSupportedExtensions: readonly ts.Extension[][] = [[ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Dts, ts.Extension.Js, ts.Extension.Jsx], [ts.Extension.Cts, ts.Extension.Dcts, ts.Extension.Cjs], [ts.Extension.Mts, ts.Extension.Dmts, ts.Extension.Mjs]];
const allSupportedExtensionsWithJson: readonly ts.Extension[][] = [...allSupportedExtensions, [ts.Extension.Json]];
/** @internal */
export const supportedDeclarationExtensions: readonly ts.Extension[] = [ts.Extension.Dts, ts.Extension.Dcts, ts.Extension.Dmts];

/** @internal */
export function getSupportedExtensions(options?: ts.CompilerOptions): readonly ts.Extension[][];
/** @internal */
export function getSupportedExtensions(options?: ts.CompilerOptions, extraFileExtensions?: readonly ts.FileExtensionInfo[]): readonly string[][];
/** @internal */
export function getSupportedExtensions(options?: ts.CompilerOptions, extraFileExtensions?: readonly ts.FileExtensionInfo[]): readonly string[][] {
    const needJsExtensions = options && getAllowJSCompilerOption(options);

    if (!extraFileExtensions || extraFileExtensions.length === 0) {
        return needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    }

    const builtins = needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    const flatBuiltins = ts.flatten(builtins);
    const extensions = [
        ...builtins,
        ...ts.mapDefined(extraFileExtensions, x => x.scriptKind === ts.ScriptKind.Deferred || needJsExtensions && isJSLike(x.scriptKind) && flatBuiltins.indexOf(x.extension as ts.Extension) === -1 ? [x.extension] : undefined)
    ];

    return extensions;
}

/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: ts.CompilerOptions | undefined, supportedExtensions: readonly ts.Extension[][]): readonly ts.Extension[][];
/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: ts.CompilerOptions | undefined, supportedExtensions: readonly string[][]): readonly string[][];
/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: ts.CompilerOptions | undefined, supportedExtensions: readonly string[][]): readonly string[][] {
    if (!options || !options.resolveJsonModule) return supportedExtensions;
    if (supportedExtensions === allSupportedExtensions) return allSupportedExtensionsWithJson;
    if (supportedExtensions === supportedTSExtensions) return supportedTSExtensionsWithJson;
    return [...supportedExtensions, [ts.Extension.Json]];
}

function isJSLike(scriptKind: ts.ScriptKind | undefined): boolean {
    return scriptKind === ts.ScriptKind.JS || scriptKind === ts.ScriptKind.JSX;
}

/** @internal */
export function hasJSFileExtension(fileName: string): boolean {
    return ts.some(supportedJSExtensionsFlat, extension => ts.fileExtensionIs(fileName, extension));
}

/** @internal */
export function hasTSFileExtension(fileName: string): boolean {
    return ts.some(supportedTSExtensionsFlat, extension => ts.fileExtensionIs(fileName, extension));
}

/** @internal */
export function isSupportedSourceFileName(fileName: string, compilerOptions?: ts.CompilerOptions, extraFileExtensions?: readonly ts.FileExtensionInfo[]) {
    if (!fileName) return false;

    const supportedExtensions = getSupportedExtensions(compilerOptions, extraFileExtensions);
    for (const extension of ts.flatten(getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions))) {
        if (ts.fileExtensionIs(fileName, extension)) {
            return true;
        }
    }
    return false;
}

function numberOfDirectorySeparators(str: string) {
    const match = str.match(/\//g);
    return match ? match.length : 0;
}

/** @internal */
export function compareNumberOfDirectorySeparators(path1: string, path2: string) {
    return ts.compareValues(
        numberOfDirectorySeparators(path1),
        numberOfDirectorySeparators(path2)
    );
}

const extensionsToRemove = [ts.Extension.Dts, ts.Extension.Dmts, ts.Extension.Dcts, ts.Extension.Mjs, ts.Extension.Mts, ts.Extension.Cjs, ts.Extension.Cts, ts.Extension.Ts, ts.Extension.Js, ts.Extension.Tsx, ts.Extension.Jsx, ts.Extension.Json];
/** @internal */
export function removeFileExtension(path: string): string {
    for (const ext of extensionsToRemove) {
        const extensionless = tryRemoveExtension(path, ext);
        if (extensionless !== undefined) {
            return extensionless;
        }
    }
    return path;
}

/** @internal */
export function tryRemoveExtension(path: string, extension: string): string | undefined {
    return ts.fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
}

/** @internal */
export function removeExtension(path: string, extension: string): string {
    return path.substring(0, path.length - extension.length);
}

/** @internal */
export function changeExtension<T extends string | ts.Path>(path: T, newExtension: string): T {
    return ts.changeAnyExtension(path, newExtension, extensionsToRemove, /*ignoreCase*/ false) as T;
}

/** @internal */
/**
 * Returns the input if there are no stars, a pattern if there is exactly one,
 * and undefined if there are more.
 */
export function tryParsePattern(pattern: string): string | ts.Pattern | undefined {
    const indexOfStar = pattern.indexOf("*");
    if (indexOfStar === -1) {
        return pattern;
    }
    return pattern.indexOf("*", indexOfStar + 1) !== -1
        ? undefined
        : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
}

/** @internal */
export function tryParsePatterns(paths: ts.MapLike<string[]>): (string | ts.Pattern)[] {
    return ts.mapDefined(ts.getOwnKeys(paths), path => tryParsePattern(path));
}

/** @internal */
export function positionIsSynthesized(pos: number): boolean {
    // This is a fast way of testing the following conditions:
    //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
    return !(pos >= 0);
}

/** @internal */
/** True if an extension is one of the supported TypeScript extensions. */
export function extensionIsTS(ext: ts.Extension): boolean {
    return ext === ts.Extension.Ts || ext === ts.Extension.Tsx || ext === ts.Extension.Dts || ext === ts.Extension.Cts || ext === ts.Extension.Mts || ext === ts.Extension.Dmts || ext === ts.Extension.Dcts;
}

/** @internal */
export function resolutionExtensionIsTSOrJson(ext: ts.Extension) {
    return extensionIsTS(ext) || ext === ts.Extension.Json;
}

/** @internal */
/**
 * Gets the extension from a path.
 * Path must have a valid extension.
 */
export function extensionFromPath(path: string): ts.Extension {
    const ext = tryGetExtensionFromPath(path);
    return ext !== undefined ? ext : ts.Debug.fail(`File ${path} has unknown extension.`);
}

/** @internal */
export function isAnySupportedFileExtension(path: string): boolean {
    return tryGetExtensionFromPath(path) !== undefined;
}

/** @internal */
export function tryGetExtensionFromPath(path: string): ts.Extension | undefined {
    return ts.find<ts.Extension>(extensionsToRemove, e => ts.fileExtensionIs(path, e));
}

/** @internal */
export function isCheckJsEnabledForFile(sourceFile: ts.SourceFile, compilerOptions: ts.CompilerOptions) {
    return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
}

/** @internal */
export const emptyFileSystemEntries: FileSystemEntries = {
    files: ts.emptyArray,
    directories: ts.emptyArray
};


/** @internal */
/**
 * patternOrStrings contains both patterns (containing "*") and regular strings.
 * Return an exact match if possible, or a pattern match, or undefined.
 * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
 */
export function matchPatternOrExact(patternOrStrings: readonly (string | ts.Pattern)[], candidate: string): string | ts.Pattern | undefined {
    const patterns: ts.Pattern[] = [];
    for (const patternOrString of patternOrStrings) {
        if (patternOrString === candidate) {
            return candidate;
        }

        if (!ts.isString(patternOrString)) {
            patterns.push(patternOrString);
        }
    }

    return ts.findBestPatternMatch(patterns, _ => _, candidate);
}

/** @internal */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };

/** @internal */
export function sliceAfter<T>(arr: readonly T[], value: T): readonly T[] {
    const index = arr.indexOf(value);
    ts.Debug.assert(index !== -1);
    return arr.slice(index);
}

/** @internal */
export function addRelatedInfo<T extends ts.Diagnostic>(diagnostic: T, ...relatedInformation: ts.DiagnosticRelatedInformation[]): T {
    if (!relatedInformation.length) {
        return diagnostic;
    }
    if (!diagnostic.relatedInformation) {
        diagnostic.relatedInformation = [];
    }
    ts.Debug.assert(diagnostic.relatedInformation !== ts.emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
    diagnostic.relatedInformation.push(...relatedInformation);
    return diagnostic;
}

/** @internal */
export function minAndMax<T>(arr: readonly T[], getValue: (value: T) => number): { readonly min: number, readonly max: number } {
    ts.Debug.assert(arr.length !== 0);
    let min = getValue(arr[0]);
    let max = min;
    for (let i = 1; i < arr.length; i++) {
        const value = getValue(arr[i]);
        if (value < min) {
            min = value;
        }
        else if (value > max) {
            max = value;
        }
    }
    return { min, max };
}

/** @internal */
export function rangeOfNode(node: ts.Node): ts.TextRange {
    return { pos: getTokenPosOfNode(node), end: node.end };
}

/** @internal */
export function rangeOfTypeParameters(sourceFile: ts.SourceFile, typeParameters: ts.NodeArray<ts.TypeParameterDeclaration>): ts.TextRange {
    // Include the `<>`
    const pos = typeParameters.pos - 1;
    const end = ts.skipTrivia(sourceFile.text, typeParameters.end) + 1;
    return { pos, end };
}

/** @internal */
export interface HostWithIsSourceOfProjectReferenceRedirect {
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
}
/** @internal */
export function skipTypeChecking(sourceFile: ts.SourceFile, options: ts.CompilerOptions, host: HostWithIsSourceOfProjectReferenceRedirect) {
    // If skipLibCheck is enabled, skip reporting errors if file is a declaration file.
    // If skipDefaultLibCheck is enabled, skip reporting errors if file contains a
    // '/// <reference no-default-lib="true"/>' directive.
    return (options.skipLibCheck && sourceFile.isDeclarationFile ||
        options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib) ||
        host.isSourceOfProjectReferenceRedirect(sourceFile.fileName);
}

/** @internal */
export function isJsonEqual(a: unknown, b: unknown): boolean {
    // eslint-disable-next-line no-null/no-null
    return a === b || typeof a === "object" && a !== null && typeof b === "object" && b !== null && ts.equalOwnProperties(a as ts.MapLike<unknown>, b as ts.MapLike<unknown>, isJsonEqual);
}

/** @internal */
/**
 * Converts a bigint literal string, e.g. `0x1234n`,
 * to its decimal string representation, e.g. `4660`.
 */
export function parsePseudoBigInt(stringValue: string): string {
    let log2Base: number;
    switch (stringValue.charCodeAt(1)) { // "x" in "0x123"
        case ts.CharacterCodes.b:
        case ts.CharacterCodes.B: // 0b or 0B
            log2Base = 1;
            break;
        case ts.CharacterCodes.o:
        case ts.CharacterCodes.O: // 0o or 0O
            log2Base = 3;
            break;
        case ts.CharacterCodes.x:
        case ts.CharacterCodes.X: // 0x or 0X
            log2Base = 4;
            break;
        default: // already in decimal; omit trailing "n"
            const nIndex = stringValue.length - 1;
            // Skip leading 0s
            let nonZeroStart = 0;
            while (stringValue.charCodeAt(nonZeroStart) === ts.CharacterCodes._0) {
                nonZeroStart++;
            }
            return stringValue.slice(nonZeroStart, nIndex) || "0";
    }

    // Omit leading "0b", "0o", or "0x", and trailing "n"
    const startIndex = 2, endIndex = stringValue.length - 1;
    const bitsNeeded = (endIndex - startIndex) * log2Base;
    // Stores the value specified by the string as a LE array of 16-bit integers
    // using Uint16 instead of Uint32 so combining steps can use bitwise operators
    const segments = new Uint16Array((bitsNeeded >>> 4) + (bitsNeeded & 15 ? 1 : 0));
    // Add the digits, one at a time
    for (let i = endIndex - 1, bitOffset = 0; i >= startIndex; i--, bitOffset += log2Base) {
        const segment = bitOffset >>> 4;
        const digitChar = stringValue.charCodeAt(i);
        // Find character range: 0-9 < A-F < a-f
        const digit = digitChar <= ts.CharacterCodes._9
            ? digitChar - ts.CharacterCodes._0
            : 10 + digitChar -
                (digitChar <= ts.CharacterCodes.F ? ts.CharacterCodes.A : ts.CharacterCodes.a);
        const shiftedDigit = digit << (bitOffset & 15);
        segments[segment] |= shiftedDigit;
        const residual = shiftedDigit >>> 16;
        if (residual) segments[segment + 1] |= residual; // overflows segment
    }
    // Repeatedly divide segments by 10 and add remainder to base10Value
    let base10Value = "";
    let firstNonzeroSegment = segments.length - 1;
    let segmentsRemaining = true;
    while (segmentsRemaining) {
        let mod10 = 0;
        segmentsRemaining = false;
        for (let segment = firstNonzeroSegment; segment >= 0; segment--) {
            const newSegment = mod10 << 16 | segments[segment];
            const segmentValue = (newSegment / 10) | 0;
            segments[segment] = segmentValue;
            mod10 = newSegment - segmentValue * 10;
            if (segmentValue && !segmentsRemaining) {
                firstNonzeroSegment = segment;
                segmentsRemaining = true;
            }
        }
        base10Value = mod10 + base10Value;
    }
    return base10Value;
}

/** @internal */
export function pseudoBigIntToString({negative, base10Value}: ts.PseudoBigInt): string {
    return (negative && base10Value !== "0" ? "-" : "") + base10Value;
}

/** @internal */
export function isValidTypeOnlyAliasUseSite(useSite: ts.Node): boolean {
    return !!(useSite.flags & ts.NodeFlags.Ambient)
        || isPartOfTypeQuery(useSite)
        || isIdentifierInNonEmittingHeritageClause(useSite)
        || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite)
        || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}

function isShorthandPropertyNameUseSite(useSite: ts.Node) {
    return ts.isIdentifier(useSite) && ts.isShorthandPropertyAssignment(useSite.parent) && useSite.parent.name === useSite;
}

function isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node: ts.Node) {
    while (node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.PropertyAccessExpression) {
        node = node.parent;
    }
    if (node.kind !== ts.SyntaxKind.ComputedPropertyName) {
        return false;
    }
    if (hasSyntacticModifier(node.parent, ts.ModifierFlags.Abstract)) {
        return true;
    }
    const containerKind = node.parent.parent.kind;
    return containerKind === ts.SyntaxKind.InterfaceDeclaration || containerKind === ts.SyntaxKind.TypeLiteral;
}

/** Returns true for an identifier in 1) an `implements` clause, and 2) an `extends` clause of an interface. */
function isIdentifierInNonEmittingHeritageClause(node: ts.Node): boolean {
    if (node.kind !== ts.SyntaxKind.Identifier) return false;
    const heritageClause = ts.findAncestor(node.parent, parent => {
        switch (parent.kind) {
            case ts.SyntaxKind.HeritageClause:
                return true;
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                return false;
            default:
                return "quit";
        }
    }) as ts.HeritageClause | undefined;
    return heritageClause?.token === ts.SyntaxKind.ImplementsKeyword || heritageClause?.parent.kind === ts.SyntaxKind.InterfaceDeclaration;
}

/** @internal */
export function isIdentifierTypeReference(node: ts.Node): node is ts.TypeReferenceNode & { typeName: ts.Identifier } {
    return ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName);
}

/** @internal */
export function arrayIsHomogeneous<T>(array: readonly T[], comparer: ts.EqualityComparer<T> = ts.equateValues) {
    if (array.length < 2) return true;
    const first = array[0];
    for (let i = 1, length = array.length; i < length; i++) {
        const target = array[i];
        if (!comparer(first, target)) return false;
    }
    return true;
}

/**
 * Bypasses immutability and directly sets the `pos` property of a `TextRange` or `Node`.
 */
/* @internal */
export function setTextRangePos<T extends ts.ReadonlyTextRange>(range: T, pos: number) {
    (range as ts.TextRange).pos = pos;
    return range;
}

/**
 * Bypasses immutability and directly sets the `end` property of a `TextRange` or `Node`.
 */
/* @internal */
export function setTextRangeEnd<T extends ts.ReadonlyTextRange>(range: T, end: number) {
    (range as ts.TextRange).end = end;
    return range;
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node`.
 */
/* @internal */
export function setTextRangePosEnd<T extends ts.ReadonlyTextRange>(range: T, pos: number, end: number) {
    return setTextRangeEnd(setTextRangePos(range, pos), end);
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node` from the
 * provided position and width.
 */
/* @internal */
export function setTextRangePosWidth<T extends ts.ReadonlyTextRange>(range: T, pos: number, width: number) {
    return setTextRangePosEnd(range, pos, pos + width);
}

/**
 * Bypasses immutability and directly sets the `flags` property of a `Node`.
 */
/* @internal */
export function setNodeFlags<T extends ts.Node>(node: T, newFlags: ts.NodeFlags): T;
/* @internal */
export function setNodeFlags<T extends ts.Node>(node: T | undefined, newFlags: ts.NodeFlags): T | undefined;
/** @internal */
export function setNodeFlags<T extends ts.Node>(node: T | undefined, newFlags: ts.NodeFlags): T | undefined {
    if (node) {
        (node as Mutable<T>).flags = newFlags;
    }
    return node;
}

/**
 * Bypasses immutability and directly sets the `parent` property of a `Node`.
 */
/* @internal */
export function setParent<T extends ts.Node>(child: T, parent: T["parent"] | undefined): T;
/* @internal */
export function setParent<T extends ts.Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined;
/** @internal */
export function setParent<T extends ts.Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined {
    if (child && parent) {
        (child as Mutable<T>).parent = parent;
    }
    return child;
}

/**
 * Bypasses immutability and directly sets the `parent` property of each `Node` in an array of nodes, if is not already set.
 */
/* @internal */
export function setEachParent<T extends readonly ts.Node[]>(children: T, parent: T[number]["parent"]): T;
/* @internal */
export function setEachParent<T extends readonly ts.Node[]>(children: T | undefined, parent: T[number]["parent"]): T | undefined;
/** @internal */
export function setEachParent<T extends readonly ts.Node[]>(children: T | undefined, parent: T[number]["parent"]): T | undefined {
    if (children) {
        for (const child of children) {
            setParent(child, parent);
        }
    }
    return children;
}

/**
 * Bypasses immutability and directly sets the `parent` property of each `Node` recursively.
 * @param rootNode The root node from which to start the recursion.
 * @param incremental When `true`, only recursively descends through nodes whose `parent` pointers are incorrect.
 * This allows us to quickly bail out of setting `parent` for subtrees during incremental parsing.
 */
/* @internal */
export function setParentRecursive<T extends ts.Node>(rootNode: T, incremental: boolean): T;
/* @internal */
export function setParentRecursive<T extends ts.Node>(rootNode: T | undefined, incremental: boolean): T | undefined;
/** @internal */
export function setParentRecursive<T extends ts.Node>(rootNode: T | undefined, incremental: boolean): T | undefined {
    if (!rootNode) return rootNode;
    ts.forEachChildRecursively(rootNode, ts.isJSDocNode(rootNode) ? bindParentToChildIgnoringJSDoc : bindParentToChild);
    return rootNode;

    function bindParentToChildIgnoringJSDoc(child: ts.Node, parent: ts.Node): void | "skip" {
        if (incremental && child.parent === parent) {
            return "skip";
        }
        setParent(child, parent);
    }

    function bindJSDoc(child: ts.Node) {
        if (ts.hasJSDocNodes(child)) {
            for (const doc of child.jsDoc!) {
                bindParentToChildIgnoringJSDoc(doc, child);
                ts.forEachChildRecursively(doc, bindParentToChildIgnoringJSDoc);
            }
        }
    }

    function bindParentToChild(child: ts.Node, parent: ts.Node) {
        return bindParentToChildIgnoringJSDoc(child, parent) || bindJSDoc(child);
    }
}

function isPackedElement(node: ts.Expression) {
    return !ts.isOmittedExpression(node);
}

/** @internal */
/**
 * Determines whether the provided node is an ArrayLiteralExpression that contains no missing elements.
 */
export function isPackedArrayLiteral(node: ts.Expression) {
    return ts.isArrayLiteralExpression(node) && ts.every(node.elements, isPackedElement);
}

/** @internal */
/**
 * Indicates whether the result of an `Expression` will be unused.
 *
 * NOTE: This requires a node with a valid `parent` pointer.
 */
export function expressionResultIsUnused(node: ts.Expression): boolean {
    ts.Debug.assertIsDefined(node.parent);
    while (true) {
        const parent: ts.Node = node.parent;
        // walk up parenthesized expressions, but keep a pointer to the top-most parenthesized expression
        if (ts.isParenthesizedExpression(parent)) {
            node = parent;
            continue;
        }
        // result is unused in an expression statement, `void` expression, or the initializer or incrementer of a `for` loop
        if (ts.isExpressionStatement(parent) ||
            ts.isVoidExpression(parent) ||
            ts.isForStatement(parent) && (parent.initializer === node || parent.incrementor === node)) {
            return true;
        }
        if (ts.isCommaListExpression(parent)) {
            // left side of comma is always unused
            if (node !== ts.last(parent.elements)) return true;
            // right side of comma is unused if parent is unused
            node = parent;
            continue;
        }
        if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.CommaToken) {
            // left side of comma is always unused
            if (node === parent.left) return true;
            // right side of comma is unused if parent is unused
            node = parent;
            continue;
        }
        return false;
    }
}

/** @internal */
export function containsIgnoredPath(path: string) {
    return ts.some(ts.ignoredPaths, p => ts.stringContains(path, p));
}

/** @internal */
export function getContainingNodeArray(node: ts.Node): ts.NodeArray<ts.Node> | undefined {
    if (!node.parent) return undefined;
    switch (node.kind) {
        case ts.SyntaxKind.TypeParameter:
            const { parent } = node as ts.TypeParameterDeclaration;
            return parent.kind === ts.SyntaxKind.InferType ? undefined : parent.typeParameters;
        case ts.SyntaxKind.Parameter:
            return (node as ts.ParameterDeclaration).parent.parameters;
        case ts.SyntaxKind.TemplateLiteralTypeSpan:
            return (node as ts.TemplateLiteralTypeSpan).parent.templateSpans;
        case ts.SyntaxKind.TemplateSpan:
            return (node as ts.TemplateSpan).parent.templateSpans;
        case ts.SyntaxKind.Decorator: {
            const { parent } = node as ts.Decorator;
            return ts.canHaveDecorators(parent) ? parent.modifiers :
                ts.canHaveIllegalDecorators(parent) ? parent.illegalDecorators :
                undefined;
        }
        case ts.SyntaxKind.HeritageClause:
            return (node as ts.HeritageClause).parent.heritageClauses;
    }

    const { parent } = node;
    if (ts.isJSDocTag(node)) {
        return ts.isJSDocTypeLiteral(node.parent) ? undefined : node.parent.tags;
    }

    switch (parent.kind) {
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.InterfaceDeclaration:
            return ts.isTypeElement(node) ? (parent as ts.TypeLiteralNode | ts.InterfaceDeclaration).members : undefined;
        case ts.SyntaxKind.UnionType:
        case ts.SyntaxKind.IntersectionType:
            return (parent as ts.UnionOrIntersectionTypeNode).types;
        case ts.SyntaxKind.TupleType:
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.CommaListExpression:
        case ts.SyntaxKind.NamedImports:
        case ts.SyntaxKind.NamedExports:
            return (parent as ts.TupleTypeNode | ts.ArrayLiteralExpression | ts.CommaListExpression | ts.NamedImports | ts.NamedExports).elements;
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.JsxAttributes:
            return (parent as ts.ObjectLiteralExpressionBase<ts.ObjectLiteralElement>).properties;
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
            return ts.isTypeNode(node) ? (parent as ts.CallExpression | ts.NewExpression).typeArguments :
                (parent as ts.CallExpression | ts.NewExpression).expression === node ? undefined :
                (parent as ts.CallExpression | ts.NewExpression).arguments;
        case ts.SyntaxKind.JsxElement:
        case ts.SyntaxKind.JsxFragment:
            return ts.isJsxChild(node) ? (parent as ts.JsxElement | ts.JsxFragment).children : undefined;
        case ts.SyntaxKind.JsxOpeningElement:
        case ts.SyntaxKind.JsxSelfClosingElement:
            return ts.isTypeNode(node) ? (parent as ts.JsxOpeningElement | ts.JsxSelfClosingElement).typeArguments : undefined;
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.CaseClause:
        case ts.SyntaxKind.DefaultClause:
        case ts.SyntaxKind.ModuleBlock:
            return (parent as ts.Block | ts.CaseOrDefaultClause | ts.ModuleBlock).statements;
        case ts.SyntaxKind.CaseBlock:
            return (parent as ts.CaseBlock).clauses;
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
            return ts.isClassElement(node) ? (parent as ts.ClassLikeDeclaration).members : undefined;
        case ts.SyntaxKind.EnumDeclaration:
            return ts.isEnumMember(node) ? (parent as ts.EnumDeclaration).members : undefined;
        case ts.SyntaxKind.SourceFile:
            return (parent as ts.SourceFile).statements;
    }
}

/** @internal */
export function hasContextSensitiveParameters(node: ts.FunctionLikeDeclaration) {
    // Functions with type parameters are not context sensitive.
    if (!node.typeParameters) {
        // Functions with any parameters that lack type annotations are context sensitive.
        if (ts.some(node.parameters, p => !getEffectiveTypeAnnotationNode(p))) {
            return true;
        }
        if (node.kind !== ts.SyntaxKind.ArrowFunction) {
            // If the first parameter is not an explicit 'this' parameter, then the function has
            // an implicit 'this' parameter which is subject to contextual typing.
            const parameter = ts.firstOrUndefined(node.parameters);
            if (!(parameter && parameterIsThisKeyword(parameter))) {
                return true;
            }
        }
    }
    return false;
}

/* @internal */
export function isInfinityOrNaNString(name: string | ts.__String): boolean {
    return name === "Infinity" || name === "-Infinity" || name === "NaN";
}

/** @internal */
export function isCatchClauseVariableDeclaration(node: ts.Node) {
    return node.kind === ts.SyntaxKind.VariableDeclaration && node.parent.kind === ts.SyntaxKind.CatchClause;
}

/** @internal */
export function isParameterOrCatchClauseVariable(symbol: ts.Symbol) {
    const declaration = symbol.valueDeclaration && getRootDeclaration(symbol.valueDeclaration);
    return !!declaration && (ts.isParameter(declaration) || isCatchClauseVariableDeclaration(declaration));
}

/** @internal */
export function isFunctionExpressionOrArrowFunction(node: ts.Node): node is ts.FunctionExpression | ts.ArrowFunction {
    return node.kind === ts.SyntaxKind.FunctionExpression || node.kind === ts.SyntaxKind.ArrowFunction;
}

/** @internal */
export function escapeSnippetText(text: string): string {
    return text.replace(/\$/gm, () => "\\$");
}

/** @internal */
export function isNumericLiteralName(name: string | ts.__String) {
    // The intent of numeric names is that
    //     - they are names with text in a numeric form, and that
    //     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
    //         acquired by applying the abstract 'ToNumber' operation on the name's text.
    //
    // The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
    // In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
    //
    // Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
    // according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
    // Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
    // because their 'ToString' representation is not equal to their original text.
    // This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
    //
    // Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
    // The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
    // Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
    //
    // Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
    // This is desired behavior, because when indexing with them as numeric entities, you are indexing
    // with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
    return (+name).toString() === name;
}

/** @internal */
export function createPropertyNameNodeForIdentifierOrLiteral(name: string, target: ts.ScriptTarget, singleQuote?: boolean, stringNamed?: boolean) {
    return ts.isIdentifierText(name, target) ? ts.factory.createIdentifier(name) :
        !stringNamed && isNumericLiteralName(name) && +name >= 0 ? ts.factory.createNumericLiteral(+name) :
        ts.factory.createStringLiteral(name, !!singleQuote);
}

/** @internal */
export function isThisTypeParameter(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.TypeParameter && (type as ts.TypeParameter).isThisType);
}

/** @internal */
export interface NodeModulePathParts {
    readonly topLevelNodeModulesIndex: number;
    readonly topLevelPackageNameIndex: number;
    readonly packageRootIndex: number;
    readonly fileNameIndex: number;
}
/** @internal */
export function getNodeModulePathParts(fullPath: string): NodeModulePathParts | undefined {
    // If fullPath can't be valid module file within node_modules, returns undefined.
    // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
    // Returns indices:                       ^            ^                                                      ^             ^

    let topLevelNodeModulesIndex = 0;
    let topLevelPackageNameIndex = 0;
    let packageRootIndex = 0;
    let fileNameIndex = 0;

    const enum States {
        BeforeNodeModules,
        NodeModules,
        Scope,
        PackageContent
    }

    let partStart = 0;
    let partEnd = 0;
    let state = States.BeforeNodeModules;

    while (partEnd >= 0) {
        partStart = partEnd;
        partEnd = fullPath.indexOf("/", partStart + 1);
        switch (state) {
            case States.BeforeNodeModules:
                if (fullPath.indexOf(ts.nodeModulesPathPart, partStart) === partStart) {
                    topLevelNodeModulesIndex = partStart;
                    topLevelPackageNameIndex = partEnd;
                    state = States.NodeModules;
                }
                break;
            case States.NodeModules:
            case States.Scope:
                if (state === States.NodeModules && fullPath.charAt(partStart + 1) === "@") {
                    state = States.Scope;
                }
                else {
                    packageRootIndex = partEnd;
                    state = States.PackageContent;
                }
                break;
            case States.PackageContent:
                if (fullPath.indexOf(ts.nodeModulesPathPart, partStart) === partStart) {
                    state = States.NodeModules;
                }
                else {
                    state = States.PackageContent;
                }
                break;
        }
    }

    fileNameIndex = partStart;

    return state > States.NodeModules ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : undefined;
}

/** @internal */
export function getParameterTypeNode(parameter: ts.ParameterDeclaration | ts.JSDocParameterTag) {
    return parameter.kind === ts.SyntaxKind.JSDocParameterTag ? parameter.typeExpression?.type : parameter.type;
}

/** @internal */
export function isTypeDeclaration(node: ts.Node): node is ts.TypeParameterDeclaration | ts.ClassDeclaration | ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocEnumTag | ts.EnumDeclaration | ts.ImportClause | ts.ImportSpecifier | ts.ExportSpecifier {
    switch (node.kind) {
        case ts.SyntaxKind.TypeParameter:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.JSDocTypedefTag:
        case ts.SyntaxKind.JSDocCallbackTag:
        case ts.SyntaxKind.JSDocEnumTag:
            return true;
        case ts.SyntaxKind.ImportClause:
            return (node as ts.ImportClause).isTypeOnly;
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ExportSpecifier:
            return (node as ts.ImportSpecifier | ts.ExportSpecifier).parent.parent.isTypeOnly;
        default:
            return false;
    }
}

/** @internal */
export function canHaveExportModifier(node: ts.Node): node is Extract<ts.HasModifiers, ts.Statement> {
    return ts.isEnumDeclaration(node) || ts.isVariableStatement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)
        || ts.isInterfaceDeclaration(node) || isTypeDeclaration(node) || (ts.isModuleDeclaration(node) && !isExternalModuleAugmentation(node) && !isGlobalScopeAugmentation(node));
}
