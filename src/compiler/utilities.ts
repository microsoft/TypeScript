namespace ts {
    export function isExternalModuleNameRelative(moduleName: string): boolean {
        // TypeScript 1.0 spec (April 2014): 11.2.1
        // An external module name is "relative" if the first term is "." or "..".
        // Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
        return pathIsRelative(moduleName) || isRootedDiskPath(moduleName);
    }

    export function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: ReadonlyArray<T>): SortedReadonlyArray<T> {
        return sortAndDeduplicate<T>(diagnostics, compareDiagnostics);
    }
}

/* @internal */
namespace ts {
    export const resolvingEmptyArray: never[] = [] as never[];
    export const emptyMap = createMap<never>() as ReadonlyMap<never> & ReadonlyPragmaMap;
    export const emptyUnderscoreEscapedMap: ReadonlyUnderscoreEscapedMap<never> = emptyMap as ReadonlyUnderscoreEscapedMap<never>;

    export const externalHelpersModuleNameText = "tslib";

    export const defaultMaximumTruncationLength = 160;

    export function getDeclarationOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T | undefined {
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

    /** Create a new escaped identifier map. */
    export function createUnderscoreEscapedMap<T>(): UnderscoreEscapedMap<T> {
        return new MapCtr<T>() as UnderscoreEscapedMap<T>;
    }

    export function hasEntries(map: ReadonlyUnderscoreEscapedMap<any> | undefined): map is ReadonlyUnderscoreEscapedMap<any> {
        return !!map && !!map.size;
    }

    export function createSymbolTable(symbols?: ReadonlyArray<Symbol>): SymbolTable {
        const result = createMap<Symbol>() as SymbolTable;
        if (symbols) {
            for (const symbol of symbols) {
                result.set(symbol.escapedName, symbol);
            }
        }
        return result;
    }

    const stringWriter = createSingleLineStringWriter();

    function createSingleLineStringWriter(): EmitTextWriter {
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

            // Completely ignore indentation for string writers.  And map newlines to
            // a single space.
            writeLine: () => str += " ",
            increaseIndent: noop,
            decreaseIndent: noop,
            clear: () => str = "",
            trackSymbol: noop,
            reportInaccessibleThisError: noop,
            reportInaccessibleUniqueSymbolError: noop,
            reportPrivateInBaseOfClassExpression: noop,
        };
    }

    export function toPath(fileName: string, basePath: string | undefined, getCanonicalFileName: (path: string) => string): Path {
        const nonCanonicalizedPath = isRootedDiskPath(fileName)
            ? normalizePath(fileName)
            : getNormalizedAbsolutePath(fileName, basePath);
        return <Path>getCanonicalFileName(nonCanonicalizedPath);
    }

    export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
        return oldOptions.configFilePath !== newOptions.configFilePath || moduleResolutionOptionDeclarations.some(o =>
            !isJsonEqual(getCompilerOptionValue(oldOptions, o), getCompilerOptionValue(newOptions, o)));
    }

    /**
     * Iterates through the parent chain of a node and performs the callback on each parent until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
     * At that point findAncestor returns undefined.
     */
    export function findAncestor<T extends Node>(node: Node | undefined, callback: (element: Node) => element is T): T | undefined;
    export function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined;
    export function findAncestor(node: Node, callback: (element: Node) => boolean | "quit"): Node | undefined {
        while (node) {
            const result = callback(node);
            if (result === "quit") {
                return undefined;
            }
            else if (result) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

    export function forEachAncestor<T>(node: Node, callback: (n: Node) => T | undefined | "quit"): T | undefined {
        while (true) {
            const res = callback(node);
            if (res === "quit") return undefined;
            if (res !== undefined) return res;
            if (isSourceFile(node)) return undefined;
            node = node.parent;
        }
    }

    /**
     * Calls `callback` for each entry in the map, returning the first truthy result.
     * Use `map.forEach` instead for normal iteration.
     */
    export function forEachEntry<T, U>(map: ReadonlyUnderscoreEscapedMap<T>, callback: (value: T, key: __String) => U | undefined): U | undefined;
    export function forEachEntry<T, U>(map: ReadonlyMap<T>, callback: (value: T, key: string) => U | undefined): U | undefined;
    export function forEachEntry<T, U>(map: ReadonlyUnderscoreEscapedMap<T> | ReadonlyMap<T>, callback: (value: T, key: (string & __String)) => U | undefined): U | undefined {
        const iterator = map.entries();
        for (let { value: pair, done } = iterator.next(); !done; { value: pair, done } = iterator.next()) {
            const [key, value] = pair;
            const result = callback(value, key as (string & __String));
            if (result) {
                return result;
            }
        }
        return undefined;
    }

    /** `forEachEntry` for just keys. */
    export function forEachKey<T>(map: ReadonlyUnderscoreEscapedMap<{}>, callback: (key: __String) => T | undefined): T | undefined;
    export function forEachKey<T>(map: ReadonlyMap<{}>, callback: (key: string) => T | undefined): T | undefined;
    export function forEachKey<T>(map: ReadonlyUnderscoreEscapedMap<{}> | ReadonlyMap<{}>, callback: (key: string & __String) => T | undefined): T | undefined {
        const iterator = map.keys();
        for (let { value: key, done } = iterator.next(); !done; { value: key, done } = iterator.next()) {
            const result = callback(key as string & __String);
            if (result) {
                return result;
            }
        }
        return undefined;
    }

    /** Copy entries from `source` to `target`. */
    export function copyEntries<T>(source: ReadonlyUnderscoreEscapedMap<T>, target: UnderscoreEscapedMap<T>): void;
    export function copyEntries<T>(source: ReadonlyMap<T>, target: Map<T>): void;
    export function copyEntries<T, U extends UnderscoreEscapedMap<T> | Map<T>>(source: U, target: U): void {
        (source as Map<T>).forEach((value, key) => {
            (target as Map<T>).set(key, value);
        });
    }

    /**
     * Creates a set from the elements of an array.
     *
     * @param array the array of input elements.
     */
    export function arrayToSet(array: ReadonlyArray<string>): Map<true>;
    export function arrayToSet<T>(array: ReadonlyArray<T>, makeKey: (value: T) => string | undefined): Map<true>;
    export function arrayToSet<T>(array: ReadonlyArray<T>, makeKey: (value: T) => __String | undefined): UnderscoreEscapedMap<true>;
    export function arrayToSet(array: ReadonlyArray<any>, makeKey?: (value: any) => string | __String | undefined): Map<true> | UnderscoreEscapedMap<true> {
        return arrayToMap<any, true>(array, makeKey || (s => s), () => true);
    }

    export function cloneMap(map: SymbolTable): SymbolTable;
    export function cloneMap<T>(map: ReadonlyMap<T>): Map<T>;
    export function cloneMap<T>(map: ReadonlyUnderscoreEscapedMap<T>): UnderscoreEscapedMap<T>;
    export function cloneMap<T>(map: ReadonlyMap<T> | ReadonlyUnderscoreEscapedMap<T> | SymbolTable): Map<T> | UnderscoreEscapedMap<T> | SymbolTable {
        const clone = createMap<T>();
        copyEntries(map as Map<T>, clone);
        return clone;
    }

    export function usingSingleLineStringWriter(action: (writer: EmitTextWriter) => void): string {
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

    export function getFullWidth(node: Node) {
        return node.end - node.pos;
    }

    export function getResolvedModule(sourceFile: SourceFile, moduleNameText: string): ResolvedModuleFull | undefined {
        return sourceFile && sourceFile.resolvedModules && sourceFile.resolvedModules.get(moduleNameText);
    }

    export function setResolvedModule(sourceFile: SourceFile, moduleNameText: string, resolvedModule: ResolvedModuleFull): void {
        if (!sourceFile.resolvedModules) {
            sourceFile.resolvedModules = createMap<ResolvedModuleFull>();
        }

        sourceFile.resolvedModules.set(moduleNameText, resolvedModule);
    }

    export function setResolvedTypeReferenceDirective(sourceFile: SourceFile, typeReferenceDirectiveName: string, resolvedTypeReferenceDirective?: ResolvedTypeReferenceDirective): void {
        if (!sourceFile.resolvedTypeReferenceDirectiveNames) {
            sourceFile.resolvedTypeReferenceDirectiveNames = createMap<ResolvedTypeReferenceDirective | undefined>();
        }

        sourceFile.resolvedTypeReferenceDirectiveNames.set(typeReferenceDirectiveName, resolvedTypeReferenceDirective);
    }

    export function projectReferenceIsEqualTo(oldRef: ProjectReference, newRef: ProjectReference) {
        return oldRef.path === newRef.path &&
            !oldRef.prepend === !newRef.prepend &&
            !oldRef.circular === !newRef.circular;
    }

    export function moduleResolutionIsEqualTo(oldResolution: ResolvedModuleFull, newResolution: ResolvedModuleFull): boolean {
        return oldResolution.isExternalLibraryImport === newResolution.isExternalLibraryImport &&
            oldResolution.extension === newResolution.extension &&
            oldResolution.resolvedFileName === newResolution.resolvedFileName &&
            oldResolution.originalPath === newResolution.originalPath &&
            packageIdIsEqual(oldResolution.packageId, newResolution.packageId);
    }

    function packageIdIsEqual(a: PackageId | undefined, b: PackageId | undefined): boolean {
        return a === b || !!a && !!b && a.name === b.name && a.subModuleName === b.subModuleName && a.version === b.version;
    }

    export function packageIdToString({ name, subModuleName, version }: PackageId): string {
        const fullName = subModuleName ? `${name}/${subModuleName}` : name;
        return `${fullName}@${version}`;
    }

    export function typeDirectiveIsEqualTo(oldResolution: ResolvedTypeReferenceDirective, newResolution: ResolvedTypeReferenceDirective): boolean {
        return oldResolution.resolvedFileName === newResolution.resolvedFileName && oldResolution.primary === newResolution.primary;
    }

    export function hasChangesInResolutions<T>(
        names: ReadonlyArray<string>,
        newResolutions: ReadonlyArray<T>,
        oldResolutions: ReadonlyMap<T> | undefined,
        comparer: (oldResolution: T, newResolution: T) => boolean): boolean {
        Debug.assert(names.length === newResolutions.length);

        for (let i = 0; i < names.length; i++) {
            const newResolution = newResolutions[i];
            const oldResolution = oldResolutions && oldResolutions.get(names[i]);
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
    export function containsParseError(node: Node): boolean {
        aggregateChildData(node);
        return (node.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
    }

    function aggregateChildData(node: Node): void {
        if (!(node.flags & NodeFlags.HasAggregatedChildData)) {
            // A node is considered to contain a parse error if:
            //  a) the parser explicitly marked that it had an error
            //  b) any of it's children reported that it had an error.
            const thisNodeOrAnySubNodesHasError = ((node.flags & NodeFlags.ThisNodeHasError) !== 0) ||
                forEachChild(node, containsParseError);

            // If so, mark ourselves accordingly.
            if (thisNodeOrAnySubNodesHasError) {
                node.flags |= NodeFlags.ThisNodeOrAnySubNodesHasError;
            }

            // Also mark that we've propagated the child information to this node.  This way we can
            // always consult the bit directly on this node without needing to check its children
            // again.
            node.flags |= NodeFlags.HasAggregatedChildData;
        }
    }

    export function getSourceFileOfNode(node: Node): SourceFile;
    export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined;
    export function getSourceFileOfNode(node: Node): SourceFile {
        while (node && node.kind !== SyntaxKind.SourceFile) {
            node = node.parent;
        }
        return <SourceFile>node;
    }

    export function isStatementWithLocals(node: Node) {
        switch (node.kind) {
            case SyntaxKind.Block:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
                return true;
        }
        return false;
    }

    export function getStartPositionOfLine(line: number, sourceFile: SourceFileLike): number {
        Debug.assert(line >= 0);
        return getLineStarts(sourceFile)[line];
    }

    // This is a useful function for debugging purposes.
    export function nodePosToString(node: Node): string {
        const file = getSourceFileOfNode(node);
        const loc = getLineAndCharacterOfPosition(file, node.pos);
        return `${file.fileName}(${loc.line + 1},${loc.character + 1})`;
    }

    export function getEndLinePosition(line: number, sourceFile: SourceFileLike): number {
        Debug.assert(line >= 0);
        const lineStarts = getLineStarts(sourceFile);

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
            Debug.assert(isLineBreak(sourceText.charCodeAt(pos)));
            // walk backwards skipping line breaks, stop the the beginning of current line.
            // i.e:
            // <some text>
            // $ <- end of line for this position should match the start position
            while (start <= pos && isLineBreak(sourceText.charCodeAt(pos))) {
                pos--;
            }
            return pos;
        }
    }

    /**
     * Returns a value indicating whether a name is unique globally or within the current file.
     * Note: This does not consider whether a name appears as a free identifier or not, so at the expression `x.y` this includes both `x` and `y`.
     */
    export function isFileLevelUniqueName(sourceFile: SourceFile, name: string, hasGlobalName?: PrintHandlers["hasGlobalName"]): boolean {
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
    export function nodeIsMissing(node: Node | undefined): boolean {
        if (node === undefined) {
            return true;
        }

        return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFileToken;
    }

    export function nodeIsPresent(node: Node | undefined): boolean {
        return !nodeIsMissing(node);
    }

    function insertStatementsAfterPrologue<T extends Statement>(to: T[], from: ReadonlyArray<T> | undefined, isPrologueDirective: (node: Node) => boolean): T[] {
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

    function insertStatementAfterPrologue<T extends Statement>(to: T[], statement: T | undefined, isPrologueDirective: (node: Node) => boolean): T[] {
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


    function isAnyPrologueDirective(node: Node) {
        return isPrologueDirective(node) || !!(getEmitFlags(node) & EmitFlags.CustomPrologue);
    }

    /**
     * Prepends statements to an array while taking care of prologue directives.
     */
    export function insertStatementsAfterStandardPrologue<T extends Statement>(to: T[], from: ReadonlyArray<T> | undefined): T[] {
        return insertStatementsAfterPrologue(to, from, isPrologueDirective);
    }

    export function insertStatementsAfterCustomPrologue<T extends Statement>(to: T[], from: ReadonlyArray<T> | undefined): T[] {
        return insertStatementsAfterPrologue(to, from, isAnyPrologueDirective);
    }

    /**
     * Prepends statements to an array while taking care of prologue directives.
     */
    export function insertStatementAfterStandardPrologue<T extends Statement>(to: T[], statement: T | undefined): T[] {
        return insertStatementAfterPrologue(to, statement, isPrologueDirective);
    }

    export function insertStatementAfterCustomPrologue<T extends Statement>(to: T[], statement: T | undefined): T[] {
        return insertStatementAfterPrologue(to, statement, isAnyPrologueDirective);
    }

    /**
     * Determine if the given comment is a triple-slash
     *
     * @return true if the comment is a triple-slash comment else false
     */
    export function isRecognizedTripleSlashComment(text: string, commentPos: number, commentEnd: number) {
        // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
        // so that we don't end up computing comment string and doing match for all // comments
        if (text.charCodeAt(commentPos + 1) === CharacterCodes.slash &&
            commentPos + 2 < commentEnd &&
            text.charCodeAt(commentPos + 2) === CharacterCodes.slash) {
            const textSubStr = text.substring(commentPos, commentEnd);
            return textSubStr.match(fullTripleSlashReferencePathRegEx) ||
                textSubStr.match(fullTripleSlashAMDReferencePathRegEx) ||
                textSubStr.match(fullTripleSlashReferenceTypeReferenceDirectiveRegEx) ||
                textSubStr.match(defaultLibReferenceRegEx) ?
                true : false;
        }
        return false;
    }

    export function isPinnedComment(text: string, start: number) {
        return text.charCodeAt(start + 1) === CharacterCodes.asterisk &&
            text.charCodeAt(start + 2) === CharacterCodes.exclamation;
    }

    export function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number {
        // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
        // want to skip trivia because this will launch us forward to the next token.
        if (nodeIsMissing(node)) {
            return node.pos;
        }

        if (isJSDocNode(node)) {
            return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
        }

        if (includeJsDoc && hasJSDocNodes(node)) {
            return getTokenPosOfNode(node.jsDoc![0]);
        }

        // For a syntax list, it is possible that one of its children has JSDocComment nodes, while
        // the syntax list itself considers them as normal trivia. Therefore if we simply skip
        // trivia for the list, we may have skipped the JSDocComment as well. So we should process its
        // first child to determine the actual position of its first token.
        if (node.kind === SyntaxKind.SyntaxList && (<SyntaxList>node)._children.length > 0) {
            return getTokenPosOfNode((<SyntaxList>node)._children[0], sourceFile, includeJsDoc);
        }

        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
    }

    export function getNonDecoratorTokenPosOfNode(node: Node, sourceFile?: SourceFileLike): number {
        if (nodeIsMissing(node) || !node.decorators) {
            return getTokenPosOfNode(node, sourceFile);
        }

        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.decorators.end);
    }

    export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia = false): string {
        return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
    }

    function isJSDocTypeExpressionOrChild(node: Node): boolean {
        return node.kind === SyntaxKind.JSDocTypeExpression || (node.parent && isJSDocTypeExpressionOrChild(node.parent));
    }

    export function getTextOfNodeFromSourceText(sourceText: string, node: Node, includeTrivia = false): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        let text = sourceText.substring(includeTrivia ? node.pos : skipTrivia(sourceText, node.pos), node.end);

        if (isJSDocTypeExpressionOrChild(node)) {
            // strip space + asterisk at line start
            text = text.replace(/(^|\r?\n|\r)\s*\*\s*/g, "$1");
        }

        return text;
    }

    export function getTextOfNode(node: Node, includeTrivia = false): string {
        return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
    }

    function getPos(range: Node) {
        return range.pos;
    }

    /**
     * Note: it is expected that the `nodeArray` and the `node` are within the same file.
     * For example, searching for a `SourceFile` in a `SourceFile[]` wouldn't work.
     */
    export function indexOfNode(nodeArray: ReadonlyArray<Node>, node: Node) {
        return binarySearch(nodeArray, node, getPos, compareValues);
    }

    /**
     * Gets flags that control emit behavior of a node.
     */
    export function getEmitFlags(node: Node): EmitFlags {
        const emitNode = node.emitNode;
        return emitNode && emitNode.flags || 0;
    }

    export function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile, neverAsciiEscape: boolean | undefined) {
        // If we don't need to downlevel and we can reach the original source text using
        // the node's parent reference, then simply get the text as it was originally written.
        if (!nodeIsSynthesized(node) && node.parent && !(
            (isNumericLiteral(node) && node.numericLiteralFlags & TokenFlags.ContainsSeparator) ||
            isBigIntLiteral(node)
        )) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, node);
        }

        const escapeText = neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? escapeString : escapeNonAsciiString;

        // If we can't reach the original source text, use the canonical form if it's a number,
        // or a (possibly escaped) quoted form of the original text if it's string-like.
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
                if ((<StringLiteral>node).singleQuote) {
                    return "'" + escapeText(node.text, CharacterCodes.singleQuote) + "'";
                }
                else {
                    return '"' + escapeText(node.text, CharacterCodes.doubleQuote) + '"';
                }
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return "`" + escapeText(node.text, CharacterCodes.backtick) + "`";
            case SyntaxKind.TemplateHead:
                // tslint:disable-next-line no-invalid-template-strings
                return "`" + escapeText(node.text, CharacterCodes.backtick) + "${";
            case SyntaxKind.TemplateMiddle:
                // tslint:disable-next-line no-invalid-template-strings
                return "}" + escapeText(node.text, CharacterCodes.backtick) + "${";
            case SyntaxKind.TemplateTail:
                return "}" + escapeText(node.text, CharacterCodes.backtick) + "`";
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.RegularExpressionLiteral:
                return node.text;
        }

        return Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
    }

    export function getTextOfConstantValue(value: string | number) {
        return isString(value) ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
    }

    // Make an identifier from an external module name by extracting the string after the last "/" and replacing
    // all non-alphanumeric characters with underscores
    export function makeIdentifierFromModuleName(moduleName: string): string {
        return getBaseFileName(moduleName).replace(/^(\d)/, "_$1").replace(/\W/g, "_");
    }

    export function isBlockOrCatchScoped(declaration: Declaration) {
        return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0 ||
            isCatchClauseVariableDeclarationOrBindingElement(declaration);
    }

    export function isCatchClauseVariableDeclarationOrBindingElement(declaration: Declaration) {
        const node = getRootDeclaration(declaration);
        return node.kind === SyntaxKind.VariableDeclaration && node.parent.kind === SyntaxKind.CatchClause;
    }

    export function isAmbientModule(node: Node): node is AmbientModuleDeclaration {
        return isModuleDeclaration(node) && (node.name.kind === SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
    }

    export function isModuleWithStringLiteralName(node: Node): node is ModuleDeclaration {
        return isModuleDeclaration(node) && node.name.kind === SyntaxKind.StringLiteral;
    }

    export function isNonGlobalAmbientModule(node: Node): node is ModuleDeclaration & { name: StringLiteral } {
        return isModuleDeclaration(node) && isStringLiteral(node.name);
    }

    /**
     * An effective module (namespace) declaration is either
     * 1. An actual declaration: namespace X { ... }
     * 2. A Javascript declaration, which is:
     *    An identifier in a nested property access expression: Y in `X.Y.Z = { ... }`
     */
    export function isEffectiveModuleDeclaration(node: Node) {
        return isModuleDeclaration(node) || isIdentifier(node);
    }

    /** Given a symbol for a module, checks that it is a shorthand ambient module. */
    export function isShorthandAmbientModuleSymbol(moduleSymbol: Symbol): boolean {
        return isShorthandAmbientModule(moduleSymbol.valueDeclaration);
    }

    function isShorthandAmbientModule(node: Node): boolean {
        // The only kind of module that can be missing a body is a shorthand ambient module.
        return node && node.kind === SyntaxKind.ModuleDeclaration && (!(<ModuleDeclaration>node).body);
    }

    export function isBlockScopedContainerTopLevel(node: Node): boolean {
        return node.kind === SyntaxKind.SourceFile ||
            node.kind === SyntaxKind.ModuleDeclaration ||
            isFunctionLike(node);
    }

    export function isGlobalScopeAugmentation(module: ModuleDeclaration): boolean {
        return !!(module.flags & NodeFlags.GlobalAugmentation);
    }

    export function isExternalModuleAugmentation(node: Node): node is AmbientModuleDeclaration {
        return isAmbientModule(node) && isModuleAugmentationExternal(node);
    }

    export function isModuleAugmentationExternal(node: AmbientModuleDeclaration) {
        // external module augmentation is a ambient module declaration that is either:
        // - defined in the top level scope and source file is an external module
        // - defined inside ambient module declaration located in the top level scope and source file not an external module
        switch (node.parent.kind) {
            case SyntaxKind.SourceFile:
                return isExternalModule(node.parent);
            case SyntaxKind.ModuleBlock:
                return isAmbientModule(node.parent.parent) && isSourceFile(node.parent.parent.parent) && !isExternalModule(node.parent.parent.parent);
        }
        return false;
    }

    export function getNonAugmentationDeclaration(symbol: Symbol) {
        return find(symbol.declarations, d => !isExternalModuleAugmentation(d) && !(isModuleDeclaration(d) && isGlobalScopeAugmentation(d)));
    }

    export function isEffectiveExternalModule(node: SourceFile, compilerOptions: CompilerOptions) {
        return isExternalModule(node) || compilerOptions.isolatedModules || ((getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS) && !!node.commonJsModuleIndicator);
    }

    export function isBlockScope(node: Node, parentNode: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.SourceFile:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.CatchClause:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return true;

            case SyntaxKind.Block:
                // function block is not considered block-scope container
                // see comment in binder.ts: bind(...), case for SyntaxKind.Block
                return !isFunctionLike(parentNode);
        }

        return false;
    }

    export function isDeclarationWithTypeParameters(node: Node): node is DeclarationWithTypeParameters;
    export function isDeclarationWithTypeParameters(node: DeclarationWithTypeParameters): node is DeclarationWithTypeParameters {
        switch (node.kind) {
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JSDocSignature:
                return true;
            default:
                assertType<DeclarationWithTypeParameterChildren>(node);
                return isDeclarationWithTypeParameterChildren(node);
        }
    }

    export function isDeclarationWithTypeParameterChildren(node: Node): node is DeclarationWithTypeParameterChildren;
    export function isDeclarationWithTypeParameterChildren(node: DeclarationWithTypeParameterChildren): node is DeclarationWithTypeParameterChildren {
        switch (node.kind) {
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.JSDocTemplateTag:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return true;
            default:
                assertType<never>(node);
                return false;
        }
    }

    export function isAnyImportSyntax(node: Node): node is AnyImportSyntax {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return true;
            default:
                return false;
        }
    }

    export function isLateVisibilityPaintedStatement(node: Node): node is LateVisibilityPaintedStatement {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
                return true;
            default:
                return false;
        }
    }

    export function isAnyImportOrReExport(node: Node): node is AnyImportOrReExport {
        return isAnyImportSyntax(node) || isExportDeclaration(node);
    }

    // Gets the nearest enclosing block scope container that has the provided node
    // as a descendant, that is not the provided node.
    export function getEnclosingBlockScopeContainer(node: Node): Node {
        return findAncestor(node.parent, current => isBlockScope(current, current.parent))!;
    }

    // Return display name of an identifier
    // Computed property names will just be emitted as "[<expr>]", where <expr> is the source
    // text of the expression in the computed property.
    export function declarationNameToString(name: DeclarationName | QualifiedName | undefined) {
        return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
    }

    export function getNameFromIndexInfo(info: IndexInfo): string | undefined {
        return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
    }

    export function getTextOfPropertyName(name: PropertyName | NoSubstitutionTemplateLiteral): __String {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return name.escapedText;
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return escapeLeadingUnderscores(name.text);
            case SyntaxKind.ComputedPropertyName:
                if (isStringOrNumericLiteralLike(name.expression)) return escapeLeadingUnderscores(name.expression.text);
                return Debug.fail("Text of property name cannot be read from non-literal-valued ComputedPropertyNames");
            default:
                return Debug.assertNever(name);
        }
    }

    export function entityNameToString(name: EntityNameOrEntityNameExpression): string {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
            case SyntaxKind.QualifiedName:
                return entityNameToString(name.left) + "." + entityNameToString(name.right);
            case SyntaxKind.PropertyAccessExpression:
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            default:
                throw Debug.assertNever(name);
        }
    }

    export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): DiagnosticWithLocation {
        const sourceFile = getSourceFileOfNode(node);
        return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeArray(sourceFile: SourceFile, nodes: NodeArray<Node>, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): DiagnosticWithLocation {
        const start = skipTrivia(sourceFile.text, nodes.pos);
        return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): DiagnosticWithLocation {
        const span = getErrorSpanForNode(sourceFile, node);
        return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
        const sourceFile = getSourceFileOfNode(node);
        const span = getErrorSpanForNode(sourceFile, node);
        return {
            file: sourceFile,
            start: span.start,
            length: span.length,
            code: messageChain.code,
            category: messageChain.category,
            messageText: messageChain.next ? messageChain : messageChain.messageText,
            relatedInformation
        };
    }

    export function getSpanOfTokenAtPosition(sourceFile: SourceFile, pos: number): TextSpan {
        const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError:*/ undefined, pos);
        scanner.scan();
        const start = scanner.getTokenPos();
        return createTextSpanFromBounds(start, scanner.getTextPos());
    }

    function getErrorSpanForArrowFunction(sourceFile: SourceFile, node: ArrowFunction): TextSpan {
        const pos = skipTrivia(sourceFile.text, node.pos);
        if (node.body && node.body.kind === SyntaxKind.Block) {
            const { line: startLine } = getLineAndCharacterOfPosition(sourceFile, node.body.pos);
            const { line: endLine } = getLineAndCharacterOfPosition(sourceFile, node.body.end);
            if (startLine < endLine) {
                // The arrow function spans multiple lines,
                // make the error span be the first line, inclusive.
                return createTextSpan(pos, getEndLinePosition(startLine, sourceFile) - pos + 1);
            }
        }
        return createTextSpanFromBounds(pos, node.end);
    }

    export function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan {
        let errorNode: Node | undefined = node;
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
                if (pos === sourceFile.text.length) {
                    // file is empty - return span for the beginning of the file
                    return createTextSpan(0, 0);
                }
                return getSpanOfTokenAtPosition(sourceFile, pos);
            // This list is a work in progress. Add missing node kinds to improve their error
            // spans.
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                errorNode = (<NamedDeclaration>node).name;
                break;
            case SyntaxKind.ArrowFunction:
                return getErrorSpanForArrowFunction(sourceFile, <ArrowFunction>node);
        }

        if (errorNode === undefined) {
            // If we don't have a better node, then just set the error on the first token of
            // construct.
            return getSpanOfTokenAtPosition(sourceFile, node.pos);
        }

        const isMissing = nodeIsMissing(errorNode);
        const pos = isMissing || isJsxText(node)
            ? errorNode.pos
            : skipTrivia(sourceFile.text, errorNode.pos);

        // These asserts should all be satisfied for a properly constructed `errorNode`.
        if (isMissing) {
            Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
            Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        }
        else {
            Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
            Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        }

        return createTextSpanFromBounds(pos, errorNode.end);
    }

    export function isExternalOrCommonJsModule(file: SourceFile): boolean {
        return (file.externalModuleIndicator || file.commonJsModuleIndicator) !== undefined;
    }


    export function isJsonSourceFile(file: SourceFile): file is JsonSourceFile {
        return file.scriptKind === ScriptKind.JSON;
    }

    export function isEnumConst(node: EnumDeclaration): boolean {
        return !!(getCombinedModifierFlags(node) & ModifierFlags.Const);
    }

    export function isDeclarationReadonly(declaration: Declaration): boolean {
        return !!(getCombinedModifierFlags(declaration) & ModifierFlags.Readonly && !isParameterPropertyDeclaration(declaration));
    }

    export function isVarConst(node: VariableDeclaration | VariableDeclarationList): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Const);
    }

    export function isLet(node: Node): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Let);
    }

    export function isSuperCall(n: Node): n is SuperCall {
        return n.kind === SyntaxKind.CallExpression && (<CallExpression>n).expression.kind === SyntaxKind.SuperKeyword;
    }

    export function isImportCall(n: Node): n is ImportCall {
        return n.kind === SyntaxKind.CallExpression && (<CallExpression>n).expression.kind === SyntaxKind.ImportKeyword;
    }

    export function isLiteralImportTypeNode(n: Node): n is LiteralImportTypeNode {
        return isImportTypeNode(n) && isLiteralTypeNode(n.argument) && isStringLiteral(n.argument.literal);
    }

    export function isPrologueDirective(node: Node): node is PrologueDirective {
        return node.kind === SyntaxKind.ExpressionStatement
            && (<ExpressionStatement>node).expression.kind === SyntaxKind.StringLiteral;
    }

    export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile) {
        return node.kind !== SyntaxKind.JsxText ? getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : undefined;
    }

    export function getJSDocCommentRanges(node: Node, text: string) {
        const commentRanges = (node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.TypeParameter ||
            node.kind === SyntaxKind.FunctionExpression ||
            node.kind === SyntaxKind.ArrowFunction ||
            node.kind === SyntaxKind.ParenthesizedExpression) ?
            concatenate(getTrailingCommentRanges(text, node.pos), getLeadingCommentRanges(text, node.pos)) :
            getLeadingCommentRanges(text, node.pos);
        // True if the comment starts with '/**' but not if it is '/**/'
        return filter(commentRanges, comment =>
            text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
            text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
            text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash);
    }

    export const fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
    const fullTripleSlashReferenceTypeReferenceDirectiveRegEx = /^(\/\/\/\s*<reference\s+types\s*=\s*)('|")(.+?)\2.*?\/>/;
    export const fullTripleSlashAMDReferencePathRegEx = /^(\/\/\/\s*<amd-dependency\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
    const defaultLibReferenceRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)('|")(.+?)\2\s*\/>/;

    export function isPartOfTypeNode(node: Node): boolean {
        if (SyntaxKind.FirstTypeNode <= node.kind && node.kind <= SyntaxKind.LastTypeNode) {
            return true;
        }

        switch (node.kind) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BigIntKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.UndefinedKeyword:
            case SyntaxKind.NeverKeyword:
                return true;
            case SyntaxKind.VoidKeyword:
                return node.parent.kind !== SyntaxKind.VoidExpression;
            case SyntaxKind.ExpressionWithTypeArguments:
                return !isExpressionWithTypeArgumentsInClassExtendsClause(node);
            case SyntaxKind.TypeParameter:
                return node.parent.kind === SyntaxKind.MappedType || node.parent.kind === SyntaxKind.InferType;

            // Identifiers and qualified names may be type nodes, depending on their context. Climb
            // above them to find the lowest container
            case SyntaxKind.Identifier:
                // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
                if (node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node) {
                    node = node.parent;
                }
                else if (node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).name === node) {
                    node = node.parent;
                }
                // At this point, node is either a qualified name or an identifier
                Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression,
                    "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
            // falls through
            case SyntaxKind.QualifiedName:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ThisKeyword: {
                const { parent } = node;
                if (parent.kind === SyntaxKind.TypeQuery) {
                    return false;
                }
                if (parent.kind === SyntaxKind.ImportType) {
                    return !(parent as ImportTypeNode).isTypeOf;
                }
                // Do not recursively call isPartOfTypeNode on the parent. In the example:
                //
                //     let a: A.B.C;
                //
                // Calling isPartOfTypeNode would consider the qualified name A.B a type node.
                // Only C and A.B.C are type nodes.
                if (SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= SyntaxKind.LastTypeNode) {
                    return true;
                }
                switch (parent.kind) {
                    case SyntaxKind.ExpressionWithTypeArguments:
                        return !isExpressionWithTypeArgumentsInClassExtendsClause(parent);
                    case SyntaxKind.TypeParameter:
                        return node === (<TypeParameterDeclaration>parent).constraint;
                    case SyntaxKind.JSDocTemplateTag:
                        return node === (<JSDocTemplateTag>parent).constraint;
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.Parameter:
                    case SyntaxKind.VariableDeclaration:
                        return node === (parent as HasType).type;
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        return node === (<FunctionLikeDeclaration>parent).type;
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.IndexSignature:
                        return node === (<SignatureDeclaration>parent).type;
                    case SyntaxKind.TypeAssertionExpression:
                        return node === (<TypeAssertion>parent).type;
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                        return contains((<CallExpression>parent).typeArguments, node);
                    case SyntaxKind.TaggedTemplateExpression:
                        // TODO (drosen): TaggedTemplateExpressions may eventually support type arguments.
                        return false;
                }
            }
        }

        return false;
    }

    export function isChildOfNodeWithKind(node: Node, kind: SyntaxKind): boolean {
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
    export function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T | undefined {

        return traverse(body);

        function traverse(node: Node): T | undefined {
            switch (node.kind) {
                case SyntaxKind.ReturnStatement:
                    return visitor(<ReturnStatement>node);
                case SyntaxKind.CaseBlock:
                case SyntaxKind.Block:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.CatchClause:
                    return forEachChild(node, traverse);
            }
        }
    }

    export function forEachYieldExpression(body: Block, visitor: (expr: YieldExpression) => void): void {

        return traverse(body);

        function traverse(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.YieldExpression:
                    visitor(<YieldExpression>node);
                    const operand = (<YieldExpression>node).expression;
                    if (operand) {
                        traverse(operand);
                    }
                    return;
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    // These are not allowed inside a generator now, but eventually they may be allowed
                    // as local types. Regardless, any yield statements contained within them should be
                    // skipped in this traversal.
                    return;
                default:
                    if (isFunctionLike(node)) {
                        if (node.name && node.name.kind === SyntaxKind.ComputedPropertyName) {
                            // Note that we will not include methods/accessors of a class because they would require
                            // first descending into the class. This is by design.
                            traverse(node.name.expression);
                            return;
                        }
                    }
                    else if (!isPartOfTypeNode(node)) {
                        // This is the general case, which should include mostly expressions and statements.
                        // Also includes NodeArrays.
                        forEachChild(node, traverse);
                    }
            }
        }
    }

    /**
     * Gets the most likely element type for a TypeNode. This is not an exhaustive test
     * as it assumes a rest argument can only be an array type (either T[], or Array<T>).
     *
     * @param node The type node.
     */
    export function getRestParameterElementType(node: TypeNode | undefined) {
        if (node && node.kind === SyntaxKind.ArrayType) {
            return (<ArrayTypeNode>node).elementType;
        }
        else if (node && node.kind === SyntaxKind.TypeReference) {
            return singleOrUndefined((<TypeReferenceNode>node).typeArguments);
        }
        else {
            return undefined;
        }
    }

    export function getMembersOfDeclaration(node: Declaration): NodeArray<ClassElement | TypeElement | ObjectLiteralElement> | undefined {
        switch (node.kind) {
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.TypeLiteral:
                return (<ObjectTypeDeclaration>node).members;
            case SyntaxKind.ObjectLiteralExpression:
                return (<ObjectLiteralExpression>node).properties;
        }
    }

    export function isVariableLike(node: Node): node is VariableLikeDeclaration {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.BindingElement:
                case SyntaxKind.EnumMember:
                case SyntaxKind.Parameter:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.VariableDeclaration:
                    return true;
            }
        }
        return false;
    }

    export function isVariableLikeOrAccessor(node: Node): node is AccessorDeclaration | VariableLikeDeclaration {
        return isVariableLike(node) || isAccessor(node);
    }

    export function isVariableDeclarationInVariableStatement(node: VariableDeclaration) {
        return node.parent.kind === SyntaxKind.VariableDeclarationList
            && node.parent.parent.kind === SyntaxKind.VariableStatement;
    }

    export function isValidESSymbolDeclaration(node: Node): node is VariableDeclaration | PropertyDeclaration | SignatureDeclaration {
        return isVariableDeclaration(node) ? isVarConst(node) && isIdentifier(node.name) && isVariableDeclarationInVariableStatement(node) :
            isPropertyDeclaration(node) ? hasReadonlyModifier(node) && hasStaticModifier(node) :
                isPropertySignature(node) && hasReadonlyModifier(node);
    }

    export function introducesArgumentsExoticObject(node: Node) {
        switch (node.kind) {
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
                return true;
        }
        return false;
    }

    export function unwrapInnermostStatementOfLabel(node: LabeledStatement, beforeUnwrapLabelCallback?: (node: LabeledStatement) => void): Statement {
        while (true) {
            if (beforeUnwrapLabelCallback) {
                beforeUnwrapLabelCallback(node);
            }
            if (node.statement.kind !== SyntaxKind.LabeledStatement) {
                return node.statement;
            }
            node = <LabeledStatement>node.statement;
        }
    }

    export function isFunctionBlock(node: Node): boolean {
        return node && node.kind === SyntaxKind.Block && isFunctionLike(node.parent);
    }

    export function isObjectLiteralMethod(node: Node): node is MethodDeclaration {
        return node && node.kind === SyntaxKind.MethodDeclaration && node.parent.kind === SyntaxKind.ObjectLiteralExpression;
    }

    export function isObjectLiteralOrClassExpressionMethod(node: Node): node is MethodDeclaration {
        return node.kind === SyntaxKind.MethodDeclaration &&
            (node.parent.kind === SyntaxKind.ObjectLiteralExpression ||
                node.parent.kind === SyntaxKind.ClassExpression);
    }

    export function isIdentifierTypePredicate(predicate: TypePredicate): predicate is IdentifierTypePredicate {
        return predicate && predicate.kind === TypePredicateKind.Identifier;
    }

    export function isThisTypePredicate(predicate: TypePredicate): predicate is ThisTypePredicate {
        return predicate && predicate.kind === TypePredicateKind.This;
    }

    export function getPropertyAssignment(objectLiteral: ObjectLiteralExpression, key: string, key2?: string): ReadonlyArray<PropertyAssignment> {
        return objectLiteral.properties.filter((property): property is PropertyAssignment => {
            if (property.kind === SyntaxKind.PropertyAssignment) {
                const propName = getTextOfPropertyName(property.name);
                return key === propName || (!!key2 && key2 === propName);
            }
            return false;
        });
    }

    export function getTsConfigObjectLiteralExpression(tsConfigSourceFile: TsConfigSourceFile | undefined): ObjectLiteralExpression | undefined {
        if (tsConfigSourceFile && tsConfigSourceFile.statements.length) {
            const expression = tsConfigSourceFile.statements[0].expression;
            return tryCast(expression, isObjectLiteralExpression);
        }
    }

    export function getTsConfigPropArrayElementValue(tsConfigSourceFile: TsConfigSourceFile | undefined, propKey: string, elementValue: string): StringLiteral | undefined {
        return firstDefined(getTsConfigPropArray(tsConfigSourceFile, propKey), property =>
            isArrayLiteralExpression(property.initializer) ?
                find(property.initializer.elements, (element): element is StringLiteral => isStringLiteral(element) && element.text === elementValue) :
                undefined);
    }

    export function getTsConfigPropArray(tsConfigSourceFile: TsConfigSourceFile | undefined, propKey: string): ReadonlyArray<PropertyAssignment> {
        const jsonObjectLiteral = getTsConfigObjectLiteralExpression(tsConfigSourceFile);
        return jsonObjectLiteral ? getPropertyAssignment(jsonObjectLiteral, propKey) : emptyArray;
    }

    export function getContainingFunction(node: Node): SignatureDeclaration | undefined {
        return findAncestor(node.parent, isFunctionLike);
    }

    export function getContainingFunctionDeclaration(node: Node): FunctionLikeDeclaration | undefined {
        return findAncestor(node.parent, isFunctionLikeDeclaration);
    }

    export function getContainingClass(node: Node): ClassLikeDeclaration | undefined {
        return findAncestor(node.parent, isClassLike);
    }

    export function getThisContainer(node: Node, includeArrowFunctions: boolean): Node {
        Debug.assert(node.kind !== SyntaxKind.SourceFile);
        while (true) {
            node = node.parent;
            if (!node) {
                return Debug.fail(); // If we never pass in a SourceFile, this should be unreachable, since we'll stop when we reach that.
            }
            switch (node.kind) {
                case SyntaxKind.ComputedPropertyName:
                    // If the grandparent node is an object literal (as opposed to a class),
                    // then the computed property is not a 'this' container.
                    // A computed property name in a class needs to be a this container
                    // so that we can error on it.
                    if (isClassLike(node.parent.parent)) {
                        return node;
                    }
                    // If this is a computed property, then the parent should not
                    // make it a this container. The parent might be a property
                    // in an object literal, like a method or accessor. But in order for
                    // such a parent to be a this container, the reference must be in
                    // the *body* of the container.
                    node = node.parent;
                    break;
                case SyntaxKind.Decorator:
                    // Decorators are always applied outside of the body of a class or method.
                    if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
                        // If the decorator's parent is a Parameter, we resolve the this container from
                        // the grandparent class declaration.
                        node = node.parent.parent;
                    }
                    else if (isClassElement(node.parent)) {
                        // If the decorator's parent is a class element, we resolve the 'this' container
                        // from the parent class declaration.
                        node = node.parent;
                    }
                    break;
                case SyntaxKind.ArrowFunction:
                    if (!includeArrowFunctions) {
                        continue;
                    }
                // falls through
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.SourceFile:
                    return node;
            }
        }
    }

    export function getNewTargetContainer(node: Node) {
        const container = getThisContainer(node, /*includeArrowFunctions*/ false);
        if (container) {
            switch (container.kind) {
                case SyntaxKind.Constructor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    return container;
            }
        }

        return undefined;
    }

    /**
     * Given an super call/property node, returns the closest node where
     * - a super call/property access is legal in the node and not legal in the parent node the node.
     *   i.e. super call is legal in constructor but not legal in the class body.
     * - the container is an arrow function (so caller might need to call getSuperContainer again in case it needs to climb higher)
     * - a super call/property is definitely illegal in the container (but might be legal in some subnode)
     *   i.e. super property access is illegal in function declaration but can be legal in the statement list
     */
    export function getSuperContainer(node: Node, stopOnFunctions: boolean): Node {
        while (true) {
            node = node.parent;
            if (!node) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.ComputedPropertyName:
                    node = node.parent;
                    break;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    if (!stopOnFunctions) {
                        continue;
                    }
                // falls through
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return node;
                case SyntaxKind.Decorator:
                    // Decorators are always applied outside of the body of a class or method.
                    if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
                        // If the decorator's parent is a Parameter, we resolve the this container from
                        // the grandparent class declaration.
                        node = node.parent.parent;
                    }
                    else if (isClassElement(node.parent)) {
                        // If the decorator's parent is a class element, we resolve the 'this' container
                        // from the parent class declaration.
                        node = node.parent;
                    }
                    break;
            }
        }
    }

    export function getImmediatelyInvokedFunctionExpression(func: Node): CallExpression | undefined {
        if (func.kind === SyntaxKind.FunctionExpression || func.kind === SyntaxKind.ArrowFunction) {
            let prev = func;
            let parent = func.parent;
            while (parent.kind === SyntaxKind.ParenthesizedExpression) {
                prev = parent;
                parent = parent.parent;
            }
            if (parent.kind === SyntaxKind.CallExpression && (parent as CallExpression).expression === prev) {
                return parent as CallExpression;
            }
        }
    }

    export function isSuperOrSuperProperty(node: Node): node is SuperExpression | SuperProperty {
        return node.kind === SyntaxKind.SuperKeyword
            || isSuperProperty(node);
    }

    /**
     * Determines whether a node is a property or element access expression for `super`.
     */
    export function isSuperProperty(node: Node): node is SuperProperty {
        const kind = node.kind;
        return (kind === SyntaxKind.PropertyAccessExpression || kind === SyntaxKind.ElementAccessExpression)
            && (<PropertyAccessExpression | ElementAccessExpression>node).expression.kind === SyntaxKind.SuperKeyword;
    }

    /**
     * Determines whether a node is a property or element access expression for `this`.
     */
    export function isThisProperty(node: Node): boolean {
        const kind = node.kind;
        return (kind === SyntaxKind.PropertyAccessExpression || kind === SyntaxKind.ElementAccessExpression)
            && (<PropertyAccessExpression | ElementAccessExpression>node).expression.kind === SyntaxKind.ThisKeyword;
    }

    export function getEntityNameFromTypeNode(node: TypeNode): EntityNameOrEntityNameExpression | undefined {
        switch (node.kind) {
            case SyntaxKind.TypeReference:
                return (<TypeReferenceNode>node).typeName;

            case SyntaxKind.ExpressionWithTypeArguments:
                return isEntityNameExpression((<ExpressionWithTypeArguments>node).expression)
                    ? <EntityNameExpression>(<ExpressionWithTypeArguments>node).expression
                    : undefined;

            case SyntaxKind.Identifier:
            case SyntaxKind.QualifiedName:
                return (<EntityName><Node>node);
        }

        return undefined;
    }

    export function getInvokedExpression(node: CallLikeExpression): Expression {
        switch (node.kind) {
            case SyntaxKind.TaggedTemplateExpression:
                return node.tag;
            case SyntaxKind.JsxOpeningElement:
            case SyntaxKind.JsxSelfClosingElement:
                return node.tagName;
            default:
                return node.expression;
        }
    }

    export function nodeCanBeDecorated(node: ClassDeclaration): true;
    export function nodeCanBeDecorated(node: ClassElement, parent: Node): boolean;
    export function nodeCanBeDecorated(node: Node, parent: Node, grandparent: Node): boolean;
    export function nodeCanBeDecorated(node: Node, parent?: Node, grandparent?: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                // classes are valid targets
                return true;

            case SyntaxKind.PropertyDeclaration:
                // property declarations are valid if their parent is a class declaration.
                return parent!.kind === SyntaxKind.ClassDeclaration;

            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
                // if this method has a body and its parent is a class declaration, this is a valid target.
                return (<FunctionLikeDeclaration>node).body !== undefined
                    && parent!.kind === SyntaxKind.ClassDeclaration;

            case SyntaxKind.Parameter:
                // if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target;
                return (<FunctionLikeDeclaration>parent).body !== undefined
                    && (parent!.kind === SyntaxKind.Constructor
                        || parent!.kind === SyntaxKind.MethodDeclaration
                        || parent!.kind === SyntaxKind.SetAccessor)
                    && grandparent!.kind === SyntaxKind.ClassDeclaration;
        }

        return false;
    }

    export function nodeIsDecorated(node: ClassDeclaration): boolean;
    export function nodeIsDecorated(node: ClassElement, parent: Node): boolean;
    export function nodeIsDecorated(node: Node, parent: Node, grandparent: Node): boolean;
    export function nodeIsDecorated(node: Node, parent?: Node, grandparent?: Node): boolean {
        return node.decorators !== undefined
            && nodeCanBeDecorated(node, parent!, grandparent!); // TODO: GH#18217
    }

    export function nodeOrChildIsDecorated(node: ClassDeclaration): boolean;
    export function nodeOrChildIsDecorated(node: ClassElement, parent: Node): boolean;
    export function nodeOrChildIsDecorated(node: Node, parent: Node, grandparent: Node): boolean;
    export function nodeOrChildIsDecorated(node: Node, parent?: Node, grandparent?: Node): boolean {
        return nodeIsDecorated(node, parent!, grandparent!) || childIsDecorated(node, parent!); // TODO: GH#18217
    }

    export function childIsDecorated(node: ClassDeclaration): boolean;
    export function childIsDecorated(node: Node, parent: Node): boolean;
    export function childIsDecorated(node: Node, parent?: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                return some((<ClassDeclaration>node).members, m => nodeOrChildIsDecorated(m, node, parent!)); // TODO: GH#18217
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.SetAccessor:
                return some((<FunctionLikeDeclaration>node).parameters, p => nodeIsDecorated(p, node, parent!)); // TODO: GH#18217
            default:
                return false;
        }
    }

    export function isJSXTagName(node: Node) {
        const { parent } = node;
        if (parent.kind === SyntaxKind.JsxOpeningElement ||
            parent.kind === SyntaxKind.JsxSelfClosingElement ||
            parent.kind === SyntaxKind.JsxClosingElement) {
            return (<JsxOpeningLikeElement>parent).tagName === node;
        }
        return false;
    }

    export function isExpressionNode(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.AsExpression:
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.NonNullExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.SpreadElement:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.OmittedExpression:
            case SyntaxKind.JsxElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxFragment:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.MetaProperty:
                return true;
            case SyntaxKind.QualifiedName:
                while (node.parent.kind === SyntaxKind.QualifiedName) {
                    node = node.parent;
                }
                return node.parent.kind === SyntaxKind.TypeQuery || isJSXTagName(node);
            case SyntaxKind.Identifier:
                if (node.parent.kind === SyntaxKind.TypeQuery || isJSXTagName(node)) {
                    return true;
                }
            // falls through
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.ThisKeyword:
                return isInExpressionContext(node);
            default:
                return false;
        }
    }

    export function isInExpressionContext(node: Node): boolean {
        const { parent } = node;
        switch (parent.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.EnumMember:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.BindingElement:
                return (parent as HasInitializer).initializer === node;
            case SyntaxKind.ExpressionStatement:
            case SyntaxKind.IfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ReturnStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.CaseClause:
            case SyntaxKind.ThrowStatement:
                return (<ExpressionStatement>parent).expression === node;
            case SyntaxKind.ForStatement:
                const forStatement = <ForStatement>parent;
                return (forStatement.initializer === node && forStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                    forStatement.condition === node ||
                    forStatement.incrementor === node;
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
                const forInStatement = <ForInStatement | ForOfStatement>parent;
                return (forInStatement.initializer === node && forInStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                    forInStatement.expression === node;
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                return node === (<AssertionExpression>parent).expression;
            case SyntaxKind.TemplateSpan:
                return node === (<TemplateSpan>parent).expression;
            case SyntaxKind.ComputedPropertyName:
                return node === (<ComputedPropertyName>parent).expression;
            case SyntaxKind.Decorator:
            case SyntaxKind.JsxExpression:
            case SyntaxKind.JsxSpreadAttribute:
            case SyntaxKind.SpreadAssignment:
                return true;
            case SyntaxKind.ExpressionWithTypeArguments:
                return (<ExpressionWithTypeArguments>parent).expression === node && isExpressionWithTypeArgumentsInClassExtendsClause(parent);
            case SyntaxKind.ShorthandPropertyAssignment:
                return (<ShorthandPropertyAssignment>parent).objectAssignmentInitializer === node;
            default:
                return isExpressionNode(parent);
        }
    }

    export function isExternalModuleImportEqualsDeclaration(node: Node) {
        return node.kind === SyntaxKind.ImportEqualsDeclaration && (<ImportEqualsDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference;
    }

    export function getExternalModuleImportEqualsDeclarationExpression(node: Node) {
        Debug.assert(isExternalModuleImportEqualsDeclaration(node));
        return (<ExternalModuleReference>(<ImportEqualsDeclaration>node).moduleReference).expression;
    }

    export function isInternalModuleImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration {
        return node.kind === SyntaxKind.ImportEqualsDeclaration && (<ImportEqualsDeclaration>node).moduleReference.kind !== SyntaxKind.ExternalModuleReference;
    }

    export function isSourceFileJS(file: SourceFile): boolean {
        return isInJSFile(file);
    }

    export function isSourceFileNotJS(file: SourceFile): boolean {
        return !isInJSFile(file);
    }

    export function isInJSFile(node: Node | undefined): boolean {
        return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
    }

    export function isInJsonFile(node: Node | undefined): boolean {
        return !!node && !!(node.flags & NodeFlags.JsonFile);
    }

    export function isInJSDoc(node: Node | undefined): boolean {
        return !!node && !!(node.flags & NodeFlags.JSDoc);
    }

    export function isJSDocIndexSignature(node: TypeReferenceNode | ExpressionWithTypeArguments) {
        return isTypeReferenceNode(node) &&
            isIdentifier(node.typeName) &&
            node.typeName.escapedText === "Object" &&
            node.typeArguments && node.typeArguments.length === 2 &&
            (node.typeArguments[0].kind === SyntaxKind.StringKeyword || node.typeArguments[0].kind === SyntaxKind.NumberKeyword);
    }

    /**
     * Returns true if the node is a CallExpression to the identifier 'require' with
     * exactly one argument (of the form 'require("name")').
     * This function does not test if the node is in a JavaScript file or not.
     */
    export function isRequireCall(callExpression: Node, checkArgumentIsStringLiteralLike: true): callExpression is RequireOrImportCall & { expression: Identifier, arguments: [StringLiteralLike] };
    export function isRequireCall(callExpression: Node, checkArgumentIsStringLiteralLike: boolean): callExpression is CallExpression;
    export function isRequireCall(callExpression: Node, checkArgumentIsStringLiteralLike: boolean): callExpression is CallExpression {
        if (callExpression.kind !== SyntaxKind.CallExpression) {
            return false;
        }
        const { expression, arguments: args } = callExpression as CallExpression;

        if (expression.kind !== SyntaxKind.Identifier || (expression as Identifier).escapedText !== "require") {
            return false;
        }

        if (args.length !== 1) {
            return false;
        }
        const arg = args[0];
        return !checkArgumentIsStringLiteralLike || isStringLiteralLike(arg);
    }

    export function isSingleOrDoubleQuote(charCode: number) {
        return charCode === CharacterCodes.singleQuote || charCode === CharacterCodes.doubleQuote;
    }

    export function isStringDoubleQuoted(str: StringLiteralLike, sourceFile: SourceFile): boolean {
        return getSourceTextOfNodeFromSourceFile(sourceFile, str).charCodeAt(0) === CharacterCodes.doubleQuote;
    }

    export function getDeclarationOfExpando(node: Node): Node | undefined {
        if (!node.parent) {
            return undefined;
        }
        let name: Expression | BindingName | undefined;
        let decl: Node | undefined;
        if (isVariableDeclaration(node.parent) && node.parent.initializer === node) {
            if (!isInJSFile(node) && !isVarConst(node.parent)) {
                return undefined;
            }
            name = node.parent.name;
            decl = node.parent;
        }
        else if (isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken && node.parent.right === node) {
            name = node.parent.left;
            decl = name;
        }
        else if (isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.BarBarToken) {
            if (isVariableDeclaration(node.parent.parent) && node.parent.parent.initializer === node.parent) {
                name = node.parent.parent.name;
                decl = node.parent.parent;
            }
            else if (isBinaryExpression(node.parent.parent) && node.parent.parent.operatorToken.kind === SyntaxKind.EqualsToken && node.parent.parent.right === node.parent) {
                name = node.parent.parent.left;
                decl = name;
            }

            if (!name || !isEntityNameExpression(name) || !isSameEntityName(name, node.parent.left)) {
                return undefined;
            }
        }

        if (!name || !getExpandoInitializer(node, isPrototypeAccess(name))) {
            return undefined;
        }
        return decl;
    }

    export function isAssignmentDeclaration(decl: Declaration) {
        return isBinaryExpression(decl) || isPropertyAccessExpression(decl) || isIdentifier(decl) || isCallExpression(decl);
    }

    /** Get the initializer, taking into account defaulted Javascript initializers */
    export function getEffectiveInitializer(node: HasExpressionInitializer) {
        if (isInJSFile(node) && node.initializer &&
            isBinaryExpression(node.initializer) && node.initializer.operatorToken.kind === SyntaxKind.BarBarToken &&
            node.name && isEntityNameExpression(node.name) && isSameEntityName(node.name, node.initializer.left)) {
            return node.initializer.right;
        }
        return node.initializer;
    }

    /** Get the declaration initializer when it is container-like (See getExpandoInitializer). */
    export function getDeclaredExpandoInitializer(node: HasExpressionInitializer) {
        const init = getEffectiveInitializer(node);
        return init && getExpandoInitializer(init, isPrototypeAccess(node.name));
    }

    function hasExpandoValueProperty(node: ObjectLiteralExpression, isPrototypeAssignment: boolean) {
        return forEach(node.properties, p => isPropertyAssignment(p) && isIdentifier(p.name) && p.name.escapedText === "value" && p.initializer && getExpandoInitializer(p.initializer, isPrototypeAssignment));
    }

    /**
     * Get the assignment 'initializer' -- the righthand side-- when the initializer is container-like (See getExpandoInitializer).
     * We treat the right hand side of assignments with container-like initalizers as declarations.
     */
    export function getAssignedExpandoInitializer(node: Node | undefined) {
        if (node && node.parent && isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
            const isPrototypeAssignment = isPrototypeAccess(node.parent.left);
            return getExpandoInitializer(node.parent.right, isPrototypeAssignment) ||
                getDefaultedExpandoInitializer(node.parent.left as EntityNameExpression, node.parent.right, isPrototypeAssignment);
        }
        if (node && isCallExpression(node) && isBindableObjectDefinePropertyCall(node)) {
            const result = hasExpandoValueProperty(node.arguments[2], node.arguments[1].text === "prototype");
            if (result) {
                return result;
            }
        }
    }

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
    export function getExpandoInitializer(initializer: Node, isPrototypeAssignment: boolean): Expression | undefined {
        if (isCallExpression(initializer)) {
            const e = skipParentheses(initializer.expression);
            return e.kind === SyntaxKind.FunctionExpression || e.kind === SyntaxKind.ArrowFunction ? initializer : undefined;
        }
        if (initializer.kind === SyntaxKind.FunctionExpression ||
            initializer.kind === SyntaxKind.ClassExpression ||
            initializer.kind === SyntaxKind.ArrowFunction) {
            return initializer as Expression;
        }
        if (isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAssignment)) {
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
    function getDefaultedExpandoInitializer(name: EntityNameExpression, initializer: Expression, isPrototypeAssignment: boolean) {
        const e = isBinaryExpression(initializer) && initializer.operatorToken.kind === SyntaxKind.BarBarToken && getExpandoInitializer(initializer.right, isPrototypeAssignment);
        if (e && isSameEntityName(name, (initializer as BinaryExpression).left as EntityNameExpression)) {
            return e;
        }
    }

    export function isDefaultedExpandoInitializer(node: BinaryExpression) {
        const name = isVariableDeclaration(node.parent) ? node.parent.name :
            isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken ? node.parent.left :
                undefined;
        return name && getExpandoInitializer(node.right, isPrototypeAccess(name)) && isEntityNameExpression(name) && isSameEntityName(name, node.left);
    }

    /** Given an expando initializer, return its declaration name, or the left-hand side of the assignment if it's part of an assignment declaration. */
    export function getNameOfExpando(node: Declaration): DeclarationName | undefined {
        if (isBinaryExpression(node.parent)) {
            const parent = (node.parent.operatorToken.kind === SyntaxKind.BarBarToken && isBinaryExpression(node.parent.parent)) ? node.parent.parent : node.parent;
            if (parent.operatorToken.kind === SyntaxKind.EqualsToken && isIdentifier(parent.left)) {
                return parent.left;
            }
        }
        else if (isVariableDeclaration(node.parent)) {
            return node.parent.name;
        }
    }

    /**
     * Is the 'declared' name the same as the one in the initializer?
     * @return true for identical entity names, as well as ones where the initializer is prefixed with
     * 'window', 'self' or 'global'. For example:
     *
     * var my = my || {}
     * var min = window.min || {}
     * my.app = self.my.app || class { }
     */
    function isSameEntityName(name: Expression, initializer: Expression): boolean {
        if (isIdentifier(name) && isIdentifier(initializer)) {
            return name.escapedText === initializer.escapedText;
        }
        if (isIdentifier(name) && isPropertyAccessExpression(initializer)) {
            return (initializer.expression.kind as SyntaxKind.ThisKeyword === SyntaxKind.ThisKeyword ||
                isIdentifier(initializer.expression) &&
                (initializer.expression.escapedText === "window" as __String ||
                    initializer.expression.escapedText === "self" as __String ||
                    initializer.expression.escapedText === "global" as __String)) &&
                isSameEntityName(name, initializer.name);
        }
        if (isPropertyAccessExpression(name) && isPropertyAccessExpression(initializer)) {
            return name.name.escapedText === initializer.name.escapedText && isSameEntityName(name.expression, initializer.expression);
        }
        return false;
    }

    export function getRightMostAssignedExpression(node: Expression): Expression {
        while (isAssignmentExpression(node, /*excludeCompoundAssignments*/ true)) {
            node = node.right;
        }
        return node;
    }

    export function isExportsIdentifier(node: Node) {
        return isIdentifier(node) && node.escapedText === "exports";
    }

    export function isModuleExportsPropertyAccessExpression(node: Node) {
        return isPropertyAccessExpression(node) && isIdentifier(node.expression) && node.expression.escapedText === "module" && node.name.escapedText === "exports";
    }

    /// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
    /// assignments we treat as special in the binder
    export function getAssignmentDeclarationKind(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
        const special = getAssignmentDeclarationKindWorker(expr);
        return special === AssignmentDeclarationKind.Property || isInJSFile(expr) ? special : AssignmentDeclarationKind.None;
    }

    export function isBindableObjectDefinePropertyCall(expr: CallExpression): expr is BindableObjectDefinePropertyCall {
            return length(expr.arguments) === 3 &&
                isPropertyAccessExpression(expr.expression) &&
                isIdentifier(expr.expression.expression) &&
                idText(expr.expression.expression) === "Object" &&
                idText(expr.expression.name) === "defineProperty" &&
                isStringOrNumericLiteralLike(expr.arguments[1]) &&
                isEntityNameExpression(expr.arguments[0]);
    }

    function getAssignmentDeclarationKindWorker(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
        if (isCallExpression(expr)) {
            if (!isBindableObjectDefinePropertyCall(expr)) {
                return AssignmentDeclarationKind.None;
            }
            const entityName = expr.arguments[0];
            if (isExportsIdentifier(entityName) || isModuleExportsPropertyAccessExpression(entityName)) {
                return AssignmentDeclarationKind.ObjectDefinePropertyExports;
            }
            if (isPropertyAccessExpression(entityName) && entityName.name.escapedText === "prototype" && isEntityNameExpression(entityName.expression)) {
                return AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
            }
            return AssignmentDeclarationKind.ObjectDefinePropertyValue;
        }
        if (expr.operatorToken.kind !== SyntaxKind.EqualsToken ||
            !isPropertyAccessExpression(expr.left)) {
            return AssignmentDeclarationKind.None;
        }
        const lhs = expr.left;
        if (isEntityNameExpression(lhs.expression) && lhs.name.escapedText === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
                // F.prototype = { ... }
                return AssignmentDeclarationKind.Prototype;
        }
        return getAssignmentDeclarationPropertyAccessKind(lhs);
    }

    export function getAssignmentDeclarationPropertyAccessKind(lhs: PropertyAccessExpression): AssignmentDeclarationKind {
        if (lhs.expression.kind === SyntaxKind.ThisKeyword) {
            return AssignmentDeclarationKind.ThisProperty;
        }
        else if (isModuleExportsPropertyAccessExpression(lhs)) {
            // module.exports = expr
            return AssignmentDeclarationKind.ModuleExports;
        }
        else if (isEntityNameExpression(lhs.expression)) {
            if (isPrototypeAccess(lhs.expression)) {
                // F.G....prototype.x = expr
                return AssignmentDeclarationKind.PrototypeProperty;
            }

            let nextToLast = lhs;
            while (isPropertyAccessExpression(nextToLast.expression)) {
                nextToLast = nextToLast.expression;
            }
            Debug.assert(isIdentifier(nextToLast.expression));
            const id = nextToLast.expression as Identifier;
            if (id.escapedText === "exports" ||
                id.escapedText === "module" && nextToLast.name.escapedText === "exports") {
                // exports.name = expr OR module.exports.name = expr
                return AssignmentDeclarationKind.ExportsProperty;
            }
            // F.G...x = expr
            return AssignmentDeclarationKind.Property;
        }

        return AssignmentDeclarationKind.None;
    }

    export function getInitializerOfBinaryExpression(expr: BinaryExpression) {
        while (isBinaryExpression(expr.right)) {
            expr = expr.right;
        }
        return expr.right;
    }

    export function isPrototypePropertyAssignment(node: Node): boolean {
        return isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.PrototypeProperty;
    }

    export function isSpecialPropertyDeclaration(expr: PropertyAccessExpression): boolean {
        return isInJSFile(expr) &&
            expr.parent && expr.parent.kind === SyntaxKind.ExpressionStatement &&
            !!getJSDocTypeTag(expr.parent);
    }

    export function isFunctionSymbol(symbol: Symbol | undefined) {
        if (!symbol || !symbol.valueDeclaration) {
            return false;
        }
        const decl = symbol.valueDeclaration;
        return decl.kind === SyntaxKind.FunctionDeclaration || isVariableDeclaration(decl) && decl.initializer && isFunctionLike(decl.initializer);
    }

    export function importFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport {
        return tryGetImportFromModuleSpecifier(node) || Debug.fail(Debug.showSyntaxKind(node.parent));
    }

    export function tryGetImportFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport | undefined {
        switch (node.parent.kind) {
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
                return node.parent as AnyValidImportOrReExport;
            case SyntaxKind.ExternalModuleReference:
                return (node.parent as ExternalModuleReference).parent as AnyValidImportOrReExport;
            case SyntaxKind.CallExpression:
                return isImportCall(node.parent) || isRequireCall(node.parent, /*checkArg*/ false) ? node.parent as RequireOrImportCall : undefined;
            case SyntaxKind.LiteralType:
                Debug.assert(isStringLiteral(node));
                return tryCast(node.parent.parent, isImportTypeNode) as ValidImportTypeNode | undefined;
            default:
                return undefined;
        }
    }

    export function getExternalModuleName(node: AnyImportOrReExport | ImportTypeNode): Expression | undefined {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
                return node.moduleSpecifier;
            case SyntaxKind.ImportEqualsDeclaration:
                return node.moduleReference.kind === SyntaxKind.ExternalModuleReference ? node.moduleReference.expression : undefined;
            case SyntaxKind.ImportType:
                return isLiteralImportTypeNode(node) ? node.argument.literal : undefined;
            default:
                return Debug.assertNever(node);
        }
    }

    export function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): ImportEqualsDeclaration | NamespaceImport | undefined {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return node.importClause && tryCast(node.importClause.namedBindings, isNamespaceImport);
            case SyntaxKind.ImportEqualsDeclaration:
                return node;
            case SyntaxKind.ExportDeclaration:
                return undefined;
            default:
                return Debug.assertNever(node);
        }
    }

    export function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): boolean {
        return node.kind === SyntaxKind.ImportDeclaration && !!node.importClause && !!node.importClause.name;
    }

    export function hasQuestionToken(node: Node) {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.Parameter:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return (<ParameterDeclaration | MethodDeclaration | PropertyDeclaration>node).questionToken !== undefined;
            }
        }

        return false;
    }

    export function isJSDocConstructSignature(node: Node) {
        const param = isJSDocFunctionType(node) ? firstOrUndefined(node.parameters) : undefined;
        const name = tryCast(param && param.name, isIdentifier);
        return !!name && name.escapedText === "new";
    }

    export function isJSDocTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag {
        return node.kind === SyntaxKind.JSDocTypedefTag || node.kind === SyntaxKind.JSDocCallbackTag;
    }

    export function isTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | TypeAliasDeclaration {
        return isJSDocTypeAlias(node) || isTypeAliasDeclaration(node);
    }

    function getSourceOfAssignment(node: Node): Node | undefined {
        return isExpressionStatement(node) &&
            node.expression && isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === SyntaxKind.EqualsToken
            ? node.expression.right
            : undefined;
    }

    function getSourceOfDefaultedAssignment(node: Node): Node | undefined {
        return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            getAssignmentDeclarationKind(node.expression) !== AssignmentDeclarationKind.None &&
            isBinaryExpression(node.expression.right) &&
            node.expression.right.operatorToken.kind === SyntaxKind.BarBarToken
            ? node.expression.right.right
            : undefined;
    }

    export function getSingleInitializerOfVariableStatementOrPropertyDeclaration(node: Node): Expression | undefined {
        switch (node.kind) {
            case SyntaxKind.VariableStatement:
                const v = getSingleVariableOfVariableStatement(node);
                return v && v.initializer;
            case SyntaxKind.PropertyDeclaration:
                return (node as PropertyDeclaration).initializer;
            case SyntaxKind.PropertyAssignment:
                return (node as PropertyAssignment).initializer;
        }
    }

    function getSingleVariableOfVariableStatement(node: Node): VariableDeclaration | undefined {
        return isVariableStatement(node) ? firstOrUndefined(node.declarationList.declarations) : undefined;
    }

    function getNestedModuleDeclaration(node: Node): Node | undefined {
        return isModuleDeclaration(node) &&
            node.body &&
            node.body.kind === SyntaxKind.ModuleDeclaration
            ? node.body
            : undefined;
    }

    export function getJSDocCommentsAndTags(hostNode: Node): ReadonlyArray<JSDoc | JSDocTag> {
        let result: (JSDoc | JSDocTag)[] | undefined;
        // Pull parameter comments from declaring function as well
        if (isVariableLike(hostNode) && hasInitializer(hostNode) && hasJSDocNodes(hostNode.initializer!)) {
            result = addRange(result, (hostNode.initializer as HasJSDoc).jsDoc!);
        }

        let node: Node | undefined = hostNode;
        while (node && node.parent) {
            if (hasJSDocNodes(node)) {
                result = addRange(result, node.jsDoc!);
            }

            if (node.kind === SyntaxKind.Parameter) {
                result = addRange(result, getJSDocParameterTags(node as ParameterDeclaration));
                break;
            }
            if (node.kind === SyntaxKind.TypeParameter) {
                result = addRange(result, getJSDocTypeParameterTags(node as TypeParameterDeclaration));
                break;
            }
            node = getNextJSDocCommentLocation(node);
        }
        return result || emptyArray;
    }

    function getNextJSDocCommentLocation(node: Node) {
        const parent = node.parent;
        if (parent.kind === SyntaxKind.PropertyAssignment ||
            parent.kind === SyntaxKind.PropertyDeclaration ||
            parent.kind === SyntaxKind.ExpressionStatement && node.kind === SyntaxKind.PropertyAccessExpression ||
            getNestedModuleDeclaration(parent) ||
            isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.EqualsToken) {
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
            isBinaryExpression(parent) && parent.operatorToken.kind === SyntaxKind.EqualsToken)) {
            return parent.parent;
        }
        else if (parent.parent && parent.parent.parent &&
            (getSingleVariableOfVariableStatement(parent.parent.parent) ||
            getSingleInitializerOfVariableStatementOrPropertyDeclaration(parent.parent.parent) === node ||
            getSourceOfDefaultedAssignment(parent.parent.parent))) {
            return parent.parent.parent;
        }
    }

    /** Does the opposite of `getJSDocParameterTags`: given a JSDoc parameter, finds the parameter corresponding to it. */
    export function getParameterSymbolFromJSDoc(node: JSDocParameterTag): Symbol | undefined {
        if (node.symbol) {
            return node.symbol;
        }
        if (!isIdentifier(node.name)) {
            return undefined;
        }
        const name = node.name.escapedText;
        const decl = getHostSignatureFromJSDoc(node);
        if (!decl) {
            return undefined;
        }
        const parameter = find(decl.parameters, p => p.name.kind === SyntaxKind.Identifier && p.name.escapedText === name);
        return parameter && parameter.symbol;
    }

    export function getHostSignatureFromJSDoc(node: Node): SignatureDeclaration | undefined {
        return getHostSignatureFromJSDocHost(getJSDocHost(node));
    }

    export function getHostSignatureFromJSDocHost(host: HasJSDoc): SignatureDeclaration | undefined {
        const decl = getSourceOfDefaultedAssignment(host) ||
            getSourceOfAssignment(host) ||
            getSingleInitializerOfVariableStatementOrPropertyDeclaration(host) ||
            getSingleVariableOfVariableStatement(host) ||
            getNestedModuleDeclaration(host) ||
            host;
        return decl && isFunctionLike(decl) ? decl : undefined;
    }

    export function getJSDocHost(node: Node): HasJSDoc {
        return Debug.assertDefined(findAncestor(node.parent, isJSDoc)).parent;
    }

    export function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & { parent: JSDocTemplateTag }): TypeParameterDeclaration | undefined {
        const name = node.name.escapedText;
        const { typeParameters } = (node.parent.parent.parent as SignatureDeclaration | InterfaceDeclaration | ClassDeclaration);
        return find(typeParameters!, p => p.name.escapedText === name);
    }

    export function hasRestParameter(s: SignatureDeclaration | JSDocSignature): boolean {
        const last = lastOrUndefined<ParameterDeclaration | JSDocParameterTag>(s.parameters);
        return !!last && isRestParameter(last);
    }

    export function isRestParameter(node: ParameterDeclaration | JSDocParameterTag): boolean {
        const type = isJSDocParameterTag(node) ? (node.typeExpression && node.typeExpression.type) : node.type;
        return (node as ParameterDeclaration).dotDotDotToken !== undefined || !!type && type.kind === SyntaxKind.JSDocVariadicType;
    }

    export const enum AssignmentKind {
        None, Definite, Compound
    }

    export function getAssignmentTargetKind(node: Node): AssignmentKind {
        let parent = node.parent;
        while (true) {
            switch (parent.kind) {
                case SyntaxKind.BinaryExpression:
                    const binaryOperator = (<BinaryExpression>parent).operatorToken.kind;
                    return isAssignmentOperator(binaryOperator) && (<BinaryExpression>parent).left === node ?
                        binaryOperator === SyntaxKind.EqualsToken ? AssignmentKind.Definite : AssignmentKind.Compound :
                        AssignmentKind.None;
                case SyntaxKind.PrefixUnaryExpression:
                case SyntaxKind.PostfixUnaryExpression:
                    const unaryOperator = (<PrefixUnaryExpression | PostfixUnaryExpression>parent).operator;
                    return unaryOperator === SyntaxKind.PlusPlusToken || unaryOperator === SyntaxKind.MinusMinusToken ? AssignmentKind.Compound : AssignmentKind.None;
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                    return (<ForInOrOfStatement>parent).initializer === node ? AssignmentKind.Definite : AssignmentKind.None;
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.SpreadElement:
                case SyntaxKind.NonNullExpression:
                    node = parent;
                    break;
                case SyntaxKind.ShorthandPropertyAssignment:
                    if ((parent as ShorthandPropertyAssignment).name !== node) {
                        return AssignmentKind.None;
                    }
                    node = parent.parent;
                    break;
                case SyntaxKind.PropertyAssignment:
                    if ((parent as ShorthandPropertyAssignment).name === node) {
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
    export function isAssignmentTarget(node: Node): boolean {
        return getAssignmentTargetKind(node) !== AssignmentKind.None;
    }

    export type NodeWithPossibleHoistedDeclaration =
        | Block
        | VariableStatement
        | WithStatement
        | IfStatement
        | SwitchStatement
        | CaseBlock
        | CaseClause
        | DefaultClause
        | LabeledStatement
        | ForStatement
        | ForInStatement
        | ForOfStatement
        | DoStatement
        | WhileStatement
        | TryStatement
        | CatchClause;

    /**
     * Indicates whether a node could contain a `var` VariableDeclarationList that contributes to
     * the same `var` declaration scope as the node's parent.
     */
    export function isNodeWithPossibleHoistedDeclaration(node: Node): node is NodeWithPossibleHoistedDeclaration {
        switch (node.kind) {
            case SyntaxKind.Block:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.IfStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
            case SyntaxKind.LabeledStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.TryStatement:
            case SyntaxKind.CatchClause:
                return true;
        }
        return false;
    }

    export type ValueSignatureDeclaration =
        | FunctionDeclaration
        | MethodDeclaration
        | ConstructorDeclaration
        | AccessorDeclaration
        | FunctionExpression
        | ArrowFunction;

    export function isValueSignatureDeclaration(node: Node): node is ValueSignatureDeclaration {
        return isFunctionExpression(node) || isArrowFunction(node) || isMethodOrAccessor(node) || isFunctionDeclaration(node) || isConstructorDeclaration(node);
    }

    function walkUp(node: Node, kind: SyntaxKind) {
        while (node && node.kind === kind) {
            node = node.parent;
        }
        return node;
    }

    export function walkUpParenthesizedTypes(node: Node) {
        return walkUp(node, SyntaxKind.ParenthesizedType);
    }

    export function walkUpParenthesizedExpressions(node: Node) {
        return walkUp(node, SyntaxKind.ParenthesizedExpression);
    }

    export function skipParentheses(node: Expression): Expression;
    export function skipParentheses(node: Node): Node;
    export function skipParentheses(node: Node): Node {
        while (node.kind === SyntaxKind.ParenthesizedExpression) {
            node = (node as ParenthesizedExpression).expression;
        }

        return node;
    }

    function skipParenthesesUp(node: Node): Node {
        while (node.kind === SyntaxKind.ParenthesizedExpression) {
            node = node.parent;
        }
        return node;
    }

    // a node is delete target iff. it is PropertyAccessExpression/ElementAccessExpression with parentheses skipped
    export function isDeleteTarget(node: Node): boolean {
        if (node.kind !== SyntaxKind.PropertyAccessExpression && node.kind !== SyntaxKind.ElementAccessExpression) {
            return false;
        }
        node = walkUpParenthesizedExpressions(node.parent);
        return node && node.kind === SyntaxKind.DeleteExpression;
    }

    export function isNodeDescendantOf(node: Node, ancestor: Node): boolean {
        while (node) {
            if (node === ancestor) return true;
            node = node.parent;
        }
        return false;
    }

    // True if `name` is the name of a declaration node
    export function isDeclarationName(name: Node): boolean {
        return !isSourceFile(name) && !isBindingPattern(name) && isDeclaration(name.parent) && name.parent.name === name;
    }

    // See GH#16030
    export function getDeclarationFromName(name: Node): Declaration | undefined {
        const parent = name.parent;
        switch (name.kind) {
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                if (isComputedPropertyName(parent)) return parent.parent;
                // falls through

            case SyntaxKind.Identifier:
                if (isDeclaration(parent)) {
                    return parent.name === name ? parent : undefined;
                }
                else if (isQualifiedName(parent)) {
                    const tag = parent.parent;
                    return isJSDocParameterTag(tag) && tag.name === parent ? tag : undefined;
                }
                else {
                    const binExp = parent.parent;
                    return isBinaryExpression(binExp) &&
                        getAssignmentDeclarationKind(binExp) !== AssignmentDeclarationKind.None &&
                        (binExp.left.symbol || binExp.symbol) &&
                        getNameOfDeclaration(binExp) === name
                        ? binExp
                        : undefined;
                }
            default:
                return undefined;
        }
    }

    export function isLiteralComputedPropertyDeclarationName(node: Node) {
        return (node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NumericLiteral) &&
            node.parent.kind === SyntaxKind.ComputedPropertyName &&
            isDeclaration(node.parent.parent);
    }

    // Return true if the given identifier is classified as an IdentifierName
    export function isIdentifierName(node: Identifier): boolean {
        let parent = node.parent;
        switch (parent.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.EnumMember:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyAccessExpression:
                // Name in member declaration or property name in property access
                return (<NamedDeclaration | PropertyAccessExpression>parent).name === node;
            case SyntaxKind.QualifiedName:
                // Name on right hand side of dot in a type query or type reference
                if ((<QualifiedName>parent).right === node) {
                    while (parent.kind === SyntaxKind.QualifiedName) {
                        parent = parent.parent;
                    }
                    return parent.kind === SyntaxKind.TypeQuery || parent.kind === SyntaxKind.TypeReference;
                }
                return false;
            case SyntaxKind.BindingElement:
            case SyntaxKind.ImportSpecifier:
                // Property name in binding element or import specifier
                return (<BindingElement | ImportSpecifier>parent).propertyName === node;
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.JsxAttribute:
                // Any name in an export specifier or JSX Attribute
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
    // export = <EntityNameExpression>
    // export default <EntityNameExpression>
    // module.exports = <EntityNameExpression>
    export function isAliasSymbolDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.ImportEqualsDeclaration ||
            node.kind === SyntaxKind.NamespaceExportDeclaration ||
            node.kind === SyntaxKind.ImportClause && !!(<ImportClause>node).name ||
            node.kind === SyntaxKind.NamespaceImport ||
            node.kind === SyntaxKind.ImportSpecifier ||
            node.kind === SyntaxKind.ExportSpecifier ||
            node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(<ExportAssignment>node) ||
            isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.ModuleExports && exportAssignmentIsAlias(node);
    }

    export function exportAssignmentIsAlias(node: ExportAssignment | BinaryExpression): boolean {
        const e = isExportAssignment(node) ? node.expression : node.right;
        return isEntityNameExpression(e) || isClassExpression(e);
    }

    export function getEffectiveBaseTypeNode(node: ClassLikeDeclaration | InterfaceDeclaration) {
        const baseType = getClassExtendsHeritageElement(node);
        if (baseType && isInJSFile(node)) {
            // Prefer an @augments tag because it may have type parameters.
            const tag = getJSDocAugmentsTag(node);
            if (tag) {
                return tag.class;
            }
        }
        return baseType;
    }

    export function getClassExtendsHeritageElement(node: ClassLikeDeclaration | InterfaceDeclaration) {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
    }

    export function getClassImplementsHeritageClauseElements(node: ClassLikeDeclaration) {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ImplementsKeyword);
        return heritageClause ? heritageClause.types : undefined;
    }

    /** Returns the node in an `extends` or `implements` clause of a class or interface. */
    export function getAllSuperTypeNodes(node: Node): ReadonlyArray<TypeNode> {
        return isInterfaceDeclaration(node) ? getInterfaceBaseTypeNodes(node) || emptyArray
            : isClassLike(node) ? concatenate(singleElementArray(getEffectiveBaseTypeNode(node)), getClassImplementsHeritageClauseElements(node)) || emptyArray
                : emptyArray;
    }

    export function getInterfaceBaseTypeNodes(node: InterfaceDeclaration) {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause ? heritageClause.types : undefined;
    }

    export function getHeritageClause(clauses: NodeArray<HeritageClause> | undefined, kind: SyntaxKind) {
        if (clauses) {
            for (const clause of clauses) {
                if (clause.token === kind) {
                    return clause;
                }
            }
        }

        return undefined;
    }

    export function tryResolveScriptReference(host: ScriptReferenceHost, sourceFile: SourceFile | UnparsedSource, reference: FileReference) {
        if (!host.getCompilerOptions().noResolve) {
            const referenceFileName = isRootedDiskPath(reference.fileName) ? reference.fileName : combinePaths(getDirectoryPath(sourceFile.fileName), reference.fileName);
            return host.getSourceFile(referenceFileName);
        }
    }

    export function getAncestor(node: Node | undefined, kind: SyntaxKind): Node | undefined {
        while (node) {
            if (node.kind === kind) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

    export function isKeyword(token: SyntaxKind): boolean {
        return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
    }

    export function isContextualKeyword(token: SyntaxKind): boolean {
        return SyntaxKind.FirstContextualKeyword <= token && token <= SyntaxKind.LastContextualKeyword;
    }

    export function isNonContextualKeyword(token: SyntaxKind): boolean {
        return isKeyword(token) && !isContextualKeyword(token);
    }

    export function isStringANonContextualKeyword(name: string) {
        const token = stringToToken(name);
        return token !== undefined && isNonContextualKeyword(token);
    }

    export function isIdentifierANonContextualKeyword({ originalKeywordKind }: Identifier): boolean {
        return !!originalKeywordKind && !isContextualKeyword(originalKeywordKind);
    }

    export type TriviaKind = SyntaxKind.SingleLineCommentTrivia
        | SyntaxKind.MultiLineCommentTrivia
        | SyntaxKind.NewLineTrivia
        | SyntaxKind.WhitespaceTrivia
        | SyntaxKind.ShebangTrivia
        | SyntaxKind.ConflictMarkerTrivia;
    export function isTrivia(token: SyntaxKind): token is TriviaKind {
        return SyntaxKind.FirstTriviaToken <= token && token <= SyntaxKind.LastTriviaToken;
    }

    export const enum FunctionFlags {
        Normal = 0,             // Function is a normal function
        Generator = 1 << 0,     // Function is a generator function or async generator function
        Async = 1 << 1,         // Function is an async function or an async generator function
        Invalid = 1 << 2,       // Function is a signature or overload and does not have a body.
        AsyncGenerator = Async | Generator, // Function is an async generator function
    }

    export function getFunctionFlags(node: SignatureDeclaration | undefined) {
        if (!node) {
            return FunctionFlags.Invalid;
        }

        let flags = FunctionFlags.Normal;
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
                if (node.asteriskToken) {
                    flags |= FunctionFlags.Generator;
                }
            // falls through
            case SyntaxKind.ArrowFunction:
                if (hasModifier(node, ModifierFlags.Async)) {
                    flags |= FunctionFlags.Async;
                }
                break;
        }

        if (!(node as FunctionLikeDeclaration).body) {
            flags |= FunctionFlags.Invalid;
        }

        return flags;
    }

    export function isAsyncFunction(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
                return (<FunctionLikeDeclaration>node).body !== undefined
                    && (<FunctionLikeDeclaration>node).asteriskToken === undefined
                    && hasModifier(node, ModifierFlags.Async);
        }
        return false;
    }

    export function isStringOrNumericLiteralLike(node: Node): node is StringLiteralLike | NumericLiteral {
        return isStringLiteralLike(node) || isNumericLiteral(node);
    }

    /**
     * A declaration has a dynamic name if both of the following are true:
     *   1. The declaration has a computed property name
     *   2. The computed name is *not* expressed as Symbol.<name>, where name
     *      is a property of the Symbol constructor that denotes a built in
     *      Symbol.
     */
    export function hasDynamicName(declaration: Declaration): declaration is DynamicNamedDeclaration {
        const name = getNameOfDeclaration(declaration);
        return !!name && isDynamicName(name);
    }

    export function isDynamicName(name: DeclarationName): boolean {
        return name.kind === SyntaxKind.ComputedPropertyName &&
            !isStringOrNumericLiteralLike(name.expression) &&
            !isWellKnownSymbolSyntactically(name.expression);
    }

    /**
     * Checks if the expression is of the form:
     *    Symbol.name
     * where Symbol is literally the word "Symbol", and name is any identifierName
     */
    export function isWellKnownSymbolSyntactically(node: Expression): boolean {
        return isPropertyAccessExpression(node) && isESSymbolIdentifier(node.expression);
    }

    export function getPropertyNameForPropertyNameNode(name: PropertyName): __String | undefined {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return name.escapedText;
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                return escapeLeadingUnderscores(name.text);
            case SyntaxKind.ComputedPropertyName:
                const nameExpression = name.expression;
                if (isWellKnownSymbolSyntactically(nameExpression)) {
                    return getPropertyNameForKnownSymbolName(idText((<PropertyAccessExpression>nameExpression).name));
                }
                else if (isStringOrNumericLiteralLike(nameExpression)) {
                    return escapeLeadingUnderscores(nameExpression.text);
                }
                return undefined;
            default:
                return Debug.assertNever(name);
        }
    }

    export type PropertyNameLiteral = Identifier | StringLiteralLike | NumericLiteral;
    export function isPropertyNameLiteral(node: Node): node is PropertyNameLiteral {
        switch (node.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.NumericLiteral:
                return true;
            default:
                return false;
        }
    }
    export function getTextOfIdentifierOrLiteral(node: PropertyNameLiteral): string {
        return node.kind === SyntaxKind.Identifier ? idText(node) : node.text;
    }

    export function getEscapedTextOfIdentifierOrLiteral(node: PropertyNameLiteral): __String {
        return node.kind === SyntaxKind.Identifier ? node.escapedText : escapeLeadingUnderscores(node.text);
    }

    export function getPropertyNameForKnownSymbolName(symbolName: string): __String {
        return "__@" + symbolName as __String;
    }

    export function isKnownSymbol(symbol: Symbol): boolean {
        return startsWith(symbol.escapedName as string, "__@");
    }

    /**
     * Includes the word "Symbol" with unicode escapes
     */
    export function isESSymbolIdentifier(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier && (<Identifier>node).escapedText === "Symbol";
    }

    export function isPushOrUnshiftIdentifier(node: Identifier) {
        return node.escapedText === "push" || node.escapedText === "unshift";
    }

    export function isParameterDeclaration(node: VariableLikeDeclaration) {
        const root = getRootDeclaration(node);
        return root.kind === SyntaxKind.Parameter;
    }

    export function getRootDeclaration(node: Node): Node {
        while (node.kind === SyntaxKind.BindingElement) {
            node = node.parent.parent;
        }
        return node;
    }

    export function nodeStartsNewLexicalEnvironment(node: Node): boolean {
        const kind = node.kind;
        return kind === SyntaxKind.Constructor
            || kind === SyntaxKind.FunctionExpression
            || kind === SyntaxKind.FunctionDeclaration
            || kind === SyntaxKind.ArrowFunction
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.SourceFile;
    }

    export function nodeIsSynthesized(range: TextRange): boolean {
        return positionIsSynthesized(range.pos)
            || positionIsSynthesized(range.end);
    }

    export function getOriginalSourceFile(sourceFile: SourceFile) {
        return getParseTreeNode(sourceFile, isSourceFile) || sourceFile;
    }

    export const enum Associativity {
        Left,
        Right
    }

    export function getExpressionAssociativity(expression: Expression) {
        const operator = getOperator(expression);
        const hasArguments = expression.kind === SyntaxKind.NewExpression && (<NewExpression>expression).arguments !== undefined;
        return getOperatorAssociativity(expression.kind, operator, hasArguments);
    }

    export function getOperatorAssociativity(kind: SyntaxKind, operator: SyntaxKind, hasArguments?: boolean) {
        switch (kind) {
            case SyntaxKind.NewExpression:
                return hasArguments ? Associativity.Left : Associativity.Right;

            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.YieldExpression:
                return Associativity.Right;

            case SyntaxKind.BinaryExpression:
                switch (operator) {
                    case SyntaxKind.AsteriskAsteriskToken:
                    case SyntaxKind.EqualsToken:
                    case SyntaxKind.PlusEqualsToken:
                    case SyntaxKind.MinusEqualsToken:
                    case SyntaxKind.AsteriskAsteriskEqualsToken:
                    case SyntaxKind.AsteriskEqualsToken:
                    case SyntaxKind.SlashEqualsToken:
                    case SyntaxKind.PercentEqualsToken:
                    case SyntaxKind.LessThanLessThanEqualsToken:
                    case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                    case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                    case SyntaxKind.AmpersandEqualsToken:
                    case SyntaxKind.CaretEqualsToken:
                    case SyntaxKind.BarEqualsToken:
                        return Associativity.Right;
                }
        }
        return Associativity.Left;
    }

    export function getExpressionPrecedence(expression: Expression) {
        const operator = getOperator(expression);
        const hasArguments = expression.kind === SyntaxKind.NewExpression && (<NewExpression>expression).arguments !== undefined;
        return getOperatorPrecedence(expression.kind, operator, hasArguments);
    }

    export function getOperator(expression: Expression): SyntaxKind {
        if (expression.kind === SyntaxKind.BinaryExpression) {
            return (<BinaryExpression>expression).operatorToken.kind;
        }
        else if (expression.kind === SyntaxKind.PrefixUnaryExpression || expression.kind === SyntaxKind.PostfixUnaryExpression) {
            return (<PrefixUnaryExpression | PostfixUnaryExpression>expression).operator;
        }
        else {
            return expression.kind;
        }
    }

    export function getOperatorPrecedence(nodeKind: SyntaxKind, operatorKind: SyntaxKind, hasArguments?: boolean) {
        switch (nodeKind) {
            case SyntaxKind.CommaListExpression:
                return 0;

            case SyntaxKind.SpreadElement:
                return 1;

            case SyntaxKind.YieldExpression:
                return 2;

            case SyntaxKind.ConditionalExpression:
                return 4;

            case SyntaxKind.BinaryExpression:
                switch (operatorKind) {
                    case SyntaxKind.CommaToken:
                        return 0;

                    case SyntaxKind.EqualsToken:
                    case SyntaxKind.PlusEqualsToken:
                    case SyntaxKind.MinusEqualsToken:
                    case SyntaxKind.AsteriskAsteriskEqualsToken:
                    case SyntaxKind.AsteriskEqualsToken:
                    case SyntaxKind.SlashEqualsToken:
                    case SyntaxKind.PercentEqualsToken:
                    case SyntaxKind.LessThanLessThanEqualsToken:
                    case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                    case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                    case SyntaxKind.AmpersandEqualsToken:
                    case SyntaxKind.CaretEqualsToken:
                    case SyntaxKind.BarEqualsToken:
                        return 3;

                    default:
                        return getBinaryOperatorPrecedence(operatorKind);
                }

            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.AwaitExpression:
                return 16;

            case SyntaxKind.PostfixUnaryExpression:
                return 17;

            case SyntaxKind.CallExpression:
                return 18;

            case SyntaxKind.NewExpression:
                return hasArguments ? 19 : 18;

            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                return 19;

            case SyntaxKind.ThisKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.Identifier:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.JsxElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxFragment:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.OmittedExpression:
                return 20;

            default:
                return -1;
        }
    }

    export function getBinaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.BarBarToken:
                return 5;
            case SyntaxKind.AmpersandAmpersandToken:
                return 6;
            case SyntaxKind.BarToken:
                return 7;
            case SyntaxKind.CaretToken:
                return 8;
            case SyntaxKind.AmpersandToken:
                return 9;
            case SyntaxKind.EqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsToken:
            case SyntaxKind.EqualsEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsEqualsToken:
                return 10;
            case SyntaxKind.LessThanToken:
            case SyntaxKind.GreaterThanToken:
            case SyntaxKind.LessThanEqualsToken:
            case SyntaxKind.GreaterThanEqualsToken:
            case SyntaxKind.InstanceOfKeyword:
            case SyntaxKind.InKeyword:
            case SyntaxKind.AsKeyword:
                return 11;
            case SyntaxKind.LessThanLessThanToken:
            case SyntaxKind.GreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                return 12;
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 13;
            case SyntaxKind.AsteriskToken:
            case SyntaxKind.SlashToken:
            case SyntaxKind.PercentToken:
                return 14;
            case SyntaxKind.AsteriskAsteriskToken:
                return 15;
        }

        // -1 is lower than all other precedences.  Returning it will cause binary expression
        // parsing to stop.
        return -1;
    }

    export function createDiagnosticCollection(): DiagnosticCollection {
        let nonFileDiagnostics = [] as Diagnostic[] as SortedArray<Diagnostic>; // See GH#19873
        const filesWithDiagnostics = [] as string[] as SortedArray<string>;
        const fileDiagnostics = createMap<SortedArray<DiagnosticWithLocation>>();
        let hasReadNonFileDiagnostics = false;

        return {
            add,
            lookup,
            getGlobalDiagnostics,
            getDiagnostics,
            reattachFileDiagnostics
        };

        function reattachFileDiagnostics(newFile: SourceFile): void {
            forEach(fileDiagnostics.get(newFile.fileName), diagnostic => diagnostic.file = newFile);
        }

        function lookup(diagnostic: Diagnostic): Diagnostic | undefined {
            let diagnostics: SortedArray<Diagnostic> | undefined;
            if (diagnostic.file) {
                diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
            }
            else {
                diagnostics = nonFileDiagnostics;
            }
            if (!diagnostics) {
                return undefined;
            }
            const result = binarySearch(diagnostics, diagnostic, identity, compareDiagnosticsSkipRelatedInformation);
            if (result >= 0) {
                return diagnostics[result];
            }
            return undefined;
        }

        function add(diagnostic: Diagnostic): void {
            let diagnostics: SortedArray<Diagnostic> | undefined;
            if (diagnostic.file) {
                diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
                if (!diagnostics) {
                    diagnostics = [] as Diagnostic[] as SortedArray<DiagnosticWithLocation>; // See GH#19873
                    fileDiagnostics.set(diagnostic.file.fileName, diagnostics as SortedArray<DiagnosticWithLocation>);
                    insertSorted(filesWithDiagnostics, diagnostic.file.fileName, compareStringsCaseSensitive);
                }
            }
            else {
                // If we've already read the non-file diagnostics, do not modify the existing array.
                if (hasReadNonFileDiagnostics) {
                    hasReadNonFileDiagnostics = false;
                    nonFileDiagnostics = nonFileDiagnostics.slice() as SortedArray<Diagnostic>;
                }

                diagnostics = nonFileDiagnostics;
            }

            insertSorted(diagnostics, diagnostic, compareDiagnostics);
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            hasReadNonFileDiagnostics = true;
            return nonFileDiagnostics;
        }

        function getDiagnostics(fileName: string): DiagnosticWithLocation[];
        function getDiagnostics(): Diagnostic[];
        function getDiagnostics(fileName?: string): Diagnostic[] {
            if (fileName) {
                return fileDiagnostics.get(fileName) || [];
            }

            const fileDiags: Diagnostic[] = flatMapToMutable(filesWithDiagnostics, f => fileDiagnostics.get(f));
            if (!nonFileDiagnostics.length) {
                return fileDiags;
            }
            fileDiags.unshift(...nonFileDiagnostics);
            return fileDiags;
        }
    }

    // This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
    // paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
    // the language service. These characters should be escaped when printing, and if any characters are added,
    // the map below must be updated. Note that this regexp *does not* include the 'delete' character.
    // There is no reason for this other than that JSON.stringify does not handle it either.
    const doubleQuoteEscapedCharsRegExp = /[\\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    const singleQuoteEscapedCharsRegExp = /[\\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    const backtickQuoteEscapedCharsRegExp = /[\\\`\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    const escapedCharsMap = createMapFromTemplate({
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
        "\u0085": "\\u0085"  // nextLine
    });

    /**
     * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
     * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
     * Note that this doesn't actually wrap the input in double quotes.
     */
    export function escapeString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
        const escapedCharsRegExp =
            quoteChar === CharacterCodes.backtick ? backtickQuoteEscapedCharsRegExp :
                quoteChar === CharacterCodes.singleQuote ? singleQuoteEscapedCharsRegExp :
                    doubleQuoteEscapedCharsRegExp;
        return s.replace(escapedCharsRegExp, getReplacement);
    }

    function getReplacement(c: string, offset: number, input: string) {
        if (c.charCodeAt(0) === CharacterCodes.nullCharacter) {
            const lookAhead = input.charCodeAt(offset + c.length);
            if (lookAhead >= CharacterCodes._0 && lookAhead <= CharacterCodes._9) {
                // If the null character is followed by digits, print as a hex escape to prevent the result from parsing as an octal (which is forbidden in strict mode)
                return "\\x00";
            }
            // Otherwise, keep printing a literal \0 for the null character
            return "\\0";
        }
        return escapedCharsMap.get(c) || get16BitUnicodeEscapeSequence(c.charCodeAt(0));
    }

    export function isIntrinsicJsxName(name: __String | string) {
        const ch = (name as string).charCodeAt(0);
        return (ch >= CharacterCodes.a && ch <= CharacterCodes.z) || stringContains((name as string), "-");
    }

    function get16BitUnicodeEscapeSequence(charCode: number): string {
        const hexCharCode = charCode.toString(16).toUpperCase();
        const paddedHexCode = ("0000" + hexCharCode).slice(-4);
        return "\\u" + paddedHexCode;
    }

    const nonAsciiCharacters = /[^\u0000-\u007F]/g;
    export function escapeNonAsciiString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
        s = escapeString(s, quoteChar);
        // Replace non-ASCII characters with '\uNNNN' escapes if any exist.
        // Otherwise just return the original string.
        return nonAsciiCharacters.test(s) ?
            s.replace(nonAsciiCharacters, c => get16BitUnicodeEscapeSequence(c.charCodeAt(0))) :
            s;
    }

    const indentStrings: string[] = ["", "    "];
    export function getIndentString(level: number) {
        if (indentStrings[level] === undefined) {
            indentStrings[level] = getIndentString(level - 1) + indentStrings[1];
        }
        return indentStrings[level];
    }

    export function getIndentSize() {
        return indentStrings[1].length;
    }

    export function createTextWriter(newLine: string): EmitTextWriter {
        let output: string;
        let indent: number;
        let lineStart: boolean;
        let lineCount: number;
        let linePos: number;

        function updateLineCountAndPosFor(s: string) {
            const lineStartsOfS = computeLineStarts(s);
            if (lineStartsOfS.length > 1) {
                lineCount = lineCount + lineStartsOfS.length - 1;
                linePos = output.length - s.length + last(lineStartsOfS);
                lineStart = (linePos - output.length) === 0;
            }
            else {
                lineStart = false;
            }
        }

        function write(s: string) {
            if (s && s.length) {
                if (lineStart) {
                    s = getIndentString(indent) + s;
                    lineStart = false;
                }
                output += s;
                updateLineCountAndPosFor(s);
            }
        }

        function reset(): void {
            output = "";
            indent = 0;
            lineStart = true;
            lineCount = 0;
            linePos = 0;
        }

        function rawWrite(s: string) {
            if (s !== undefined) {
                output += s;
                updateLineCountAndPosFor(s);
            }
        }

        function writeLiteral(s: string) {
            if (s && s.length) {
                write(s);
            }
        }

        function writeLine() {
            if (!lineStart) {
                output += newLine;
                lineCount++;
                linePos = output.length;
                lineStart = true;
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
            clear: reset,
            reportInaccessibleThisError: noop,
            reportPrivateInBaseOfClassExpression: noop,
            reportInaccessibleUniqueSymbolError: noop,
            trackSymbol: noop,
            writeKeyword: write,
            writeOperator: write,
            writeParameter: write,
            writeProperty: write,
            writePunctuation: write,
            writeSpace: write,
            writeStringLiteral: write,
            writeSymbol: (s, _) => write(s),
            writeTrailingSemicolon: write,
            writeComment: write,
            getTextPosWithWriteLine
        };
    }

    export function getTrailingSemicolonOmittingWriter(writer: EmitTextWriter): EmitTextWriter {
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
            }
        };
    }

    export function getResolvedExternalModuleName(host: EmitHost, file: SourceFile, referenceFile?: SourceFile): string {
        return file.moduleName || getExternalModuleNameFromPath(host, file.fileName, referenceFile && referenceFile.fileName);
    }

    export function getExternalModuleNameFromDeclaration(host: EmitHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): string | undefined {
        const file = resolver.getExternalModuleFileFromDeclaration(declaration);
        if (!file || file.isDeclarationFile) {
            return undefined;
        }
        return getResolvedExternalModuleName(host, file);
    }

    /**
     * Resolves a local path to a path which is absolute to the base of the emit
     */
    export function getExternalModuleNameFromPath(host: EmitHost, fileName: string, referencePath?: string): string {
        const getCanonicalFileName = (f: string) => host.getCanonicalFileName(f);
        const dir = toPath(referencePath ? getDirectoryPath(referencePath) : host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
        const filePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
        const relativePath = getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        const extensionless = removeFileExtension(relativePath);
        return referencePath ? ensurePathIsNonModuleName(extensionless) : extensionless;
    }

    export function getOwnEmitOutputFilePath(fileName: string, host: EmitHost, extension: string) {
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

    export function getDeclarationEmitOutputFilePath(fileName: string, host: EmitHost) {
        return getDeclarationEmitOutputFilePathWorker(fileName, host.getCompilerOptions(), host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
    }

    export function getDeclarationEmitOutputFilePathWorker(fileName: string, options: CompilerOptions, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
        const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified

        const path = outputDir
            ? getSourceFilePathInNewDirWorker(fileName, outputDir, currentDirectory, commonSourceDirectory, getCanonicalFileName)
            : fileName;
        return removeFileExtension(path) + Extension.Dts;
    }

    export interface EmitFileNames {
        jsFilePath?: string | undefined;
        sourceMapFilePath?: string | undefined;
        declarationFilePath?: string | undefined;
        declarationMapPath?: string | undefined;
        buildInfoPath?: string | undefined;
    }

    /**
     * Gets the source files that are expected to have an emit output.
     *
     * Originally part of `forEachExpectedEmitFile`, this functionality was extracted to support
     * transformations.
     *
     * @param host An EmitHost.
     * @param targetSourceFile An optional target source file to emit.
     */
    export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile): ReadonlyArray<SourceFile> {
        const options = host.getCompilerOptions();
        const isSourceFileFromExternalLibrary = (file: SourceFile) => host.isSourceFileFromExternalLibrary(file);
        const getResolvedProjectReferenceToRedirect = (fileName: string) => host.getResolvedProjectReferenceToRedirect(fileName);
        if (options.outFile || options.out) {
            const moduleKind = getEmitModuleKind(options);
            const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
            // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
            return filter(host.getSourceFiles(), sourceFile =>
                (moduleEmitEnabled || !isExternalModule(sourceFile)) && sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary, getResolvedProjectReferenceToRedirect));
        }
        else {
            const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
            return filter(sourceFiles, sourceFile => sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary, getResolvedProjectReferenceToRedirect));
        }
    }

    /** Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks. */
    export function sourceFileMayBeEmitted(
        sourceFile: SourceFile,
        options: CompilerOptions,
        isSourceFileFromExternalLibrary: (file: SourceFile) => boolean,
        getResolvedProjectReferenceToRedirect: (fileName: string) => ResolvedProjectReference | undefined
    ) {
        return !(options.noEmitForJsFiles && isSourceFileJS(sourceFile)) &&
            !sourceFile.isDeclarationFile &&
            !isSourceFileFromExternalLibrary(sourceFile) &&
            !(isJsonSourceFile(sourceFile) && getResolvedProjectReferenceToRedirect(sourceFile.fileName));
    }

    export function getSourceFilePathInNewDir(fileName: string, host: EmitHost, newDirPath: string): string {
        return getSourceFilePathInNewDirWorker(fileName, newDirPath, host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
    }

    export function getSourceFilePathInNewDirWorker(fileName: string, newDirPath: string, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
        let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
        const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
        sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
        return combinePaths(newDirPath, sourceFilePath);
    }

    export function writeFile(host: { writeFile: WriteFileCallback; }, diagnostics: DiagnosticCollection, fileName: string, data: string, writeByteOrderMark: boolean, sourceFiles?: ReadonlyArray<SourceFile>) {
        host.writeFile(fileName, data, writeByteOrderMark, hostErrorMessage => {
            diagnostics.add(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
        }, sourceFiles);
    }

    export function getLineOfLocalPosition(currentSourceFile: SourceFile, pos: number) {
        return getLineAndCharacterOfPosition(currentSourceFile, pos).line;
    }

    export function getLineOfLocalPositionFromLineMap(lineMap: ReadonlyArray<number>, pos: number) {
        return computeLineAndCharacterOfPosition(lineMap, pos).line;
    }

    export function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration & { body: FunctionBody } | undefined {
        return find(node.members, (member): member is ConstructorDeclaration & { body: FunctionBody } => isConstructorDeclaration(member) && nodeIsPresent(member.body));
    }

    function getSetAccessorValueParameter(accessor: SetAccessorDeclaration): ParameterDeclaration | undefined {
        if (accessor && accessor.parameters.length > 0) {
            const hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
            return accessor.parameters[hasThis ? 1 : 0];
        }
    }

    /** Get the type annotation for the value parameter. */
    export function getSetAccessorTypeAnnotationNode(accessor: SetAccessorDeclaration): TypeNode | undefined {
        const parameter = getSetAccessorValueParameter(accessor);
        return parameter && parameter.type;
    }

    export function getThisParameter(signature: SignatureDeclaration | JSDocSignature): ParameterDeclaration | undefined {
        // callback tags do not currently support this parameters
        if (signature.parameters.length && !isJSDocSignature(signature)) {
            const thisParameter = signature.parameters[0];
            if (parameterIsThisKeyword(thisParameter)) {
                return thisParameter;
            }
        }
    }

    export function parameterIsThisKeyword(parameter: ParameterDeclaration): boolean {
        return isThisIdentifier(parameter.name);
    }

    export function isThisIdentifier(node: Node | undefined): boolean {
        return !!node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
    }

    export function identifierIsThisKeyword(id: Identifier): boolean {
        return id.originalKeywordKind === SyntaxKind.ThisKeyword;
    }

    export function getAllAccessorDeclarations(declarations: NodeArray<Declaration>, accessor: AccessorDeclaration): AllAccessorDeclarations {
        // TODO: GH#18217
        let firstAccessor!: AccessorDeclaration;
        let secondAccessor!: AccessorDeclaration;
        let getAccessor!: GetAccessorDeclaration;
        let setAccessor!: SetAccessorDeclaration;
        if (hasDynamicName(accessor)) {
            firstAccessor = accessor;
            if (accessor.kind === SyntaxKind.GetAccessor) {
                getAccessor = accessor;
            }
            else if (accessor.kind === SyntaxKind.SetAccessor) {
                setAccessor = accessor;
            }
            else {
                Debug.fail("Accessor has wrong kind");
            }
        }
        else {
            forEach(declarations, member => {
                if (isAccessor(member)
                    && hasModifier(member, ModifierFlags.Static) === hasModifier(accessor, ModifierFlags.Static)) {
                    const memberName = getPropertyNameForPropertyNameNode(member.name);
                    const accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                    if (memberName === accessorName) {
                        if (!firstAccessor) {
                            firstAccessor = member;
                        }
                        else if (!secondAccessor) {
                            secondAccessor = member;
                        }

                        if (member.kind === SyntaxKind.GetAccessor && !getAccessor) {
                            getAccessor = <GetAccessorDeclaration>member;
                        }

                        if (member.kind === SyntaxKind.SetAccessor && !setAccessor) {
                            setAccessor = <SetAccessorDeclaration>member;
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

    /**
     * Gets the effective type annotation of a variable, parameter, or property. If the node was
     * parsed in a JavaScript file, gets the type annotation from JSDoc.
     */
    export function getEffectiveTypeAnnotationNode(node: Node): TypeNode | undefined {
        const type = (node as HasType).type;
        if (type || !isInJSFile(node)) return type;
        return isJSDocPropertyLikeTag(node) ? node.typeExpression && node.typeExpression.type : getJSDocType(node);
    }

    export function getTypeAnnotationNode(node: Node): TypeNode | undefined {
        return (node as HasType).type;
    }

    /**
     * Gets the effective return type annotation of a signature. If the node was parsed in a
     * JavaScript file, gets the return type annotation from JSDoc.
     */
    export function getEffectiveReturnTypeNode(node: SignatureDeclaration | JSDocSignature): TypeNode | undefined {
        return isJSDocSignature(node) ?
            node.type && node.type.typeExpression && node.type.typeExpression.type :
            node.type || (isInJSFile(node) ? getJSDocReturnType(node) : undefined);
    }

    export function getJSDocTypeParameterDeclarations(node: DeclarationWithTypeParameters): ReadonlyArray<TypeParameterDeclaration> {
        return flatMap(getJSDocTags(node), tag => isNonTypeAliasTemplate(tag) ? tag.typeParameters : undefined);
    }

    /** template tags are only available when a typedef isn't already using them */
    function isNonTypeAliasTemplate(tag: JSDocTag): tag is JSDocTemplateTag {
        return isJSDocTemplateTag(tag) && !(tag.parent.kind === SyntaxKind.JSDocComment && tag.parent.tags!.some(isJSDocTypeAlias));
    }

    /**
     * Gets the effective type annotation of the value parameter of a set accessor. If the node
     * was parsed in a JavaScript file, gets the type annotation from JSDoc.
     */
    export function getEffectiveSetAccessorTypeAnnotationNode(node: SetAccessorDeclaration): TypeNode | undefined {
        const parameter = getSetAccessorValueParameter(node);
        return parameter && getEffectiveTypeAnnotationNode(parameter);
    }

    export function emitNewLineBeforeLeadingComments(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, node: TextRange, leadingComments: ReadonlyArray<CommentRange> | undefined) {
        emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
    }

    export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, pos: number, leadingComments: ReadonlyArray<CommentRange> | undefined) {
        // If the leading comments start on different line than the start of node, write new line
        if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
            writer.writeLine();
        }
    }

    export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, pos: number, commentPos: number) {
        // If the leading comments start on different line than the start of node, write new line
        if (pos !== commentPos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
            writer.writeLine();
        }
    }

    export function emitComments(
        text: string,
        lineMap: ReadonlyArray<number>,
        writer: EmitTextWriter,
        comments: ReadonlyArray<CommentRange> | undefined,
        leadingSeparator: boolean,
        trailingSeparator: boolean,
        newLine: string,
        writeComment: (text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void) {
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

    /**
     * Detached comment is a comment at the top of file or function body that is separated from
     * the next statement by space.
     */
    export function emitDetachedComments(text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter,
        writeComment: (text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
        node: TextRange, newLine: string, removeComments: boolean) {
        let leadingComments: CommentRange[] | undefined;
        let currentDetachedCommentInfo: { nodePos: number, detachedCommentEndPos: number } | undefined;
        if (removeComments) {
            // removeComments is true, only reserve pinned comment at the top of file
            // For example:
            //      /*! Pinned Comment */
            //
            //      var x = 10;
            if (node.pos === 0) {
                leadingComments = filter(getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
            }
        }
        else {
            // removeComments is false, just get detached as normal and bypass the process to filter comment
            leadingComments = getLeadingCommentRanges(text, node.pos);
        }

        if (leadingComments) {
            const detachedComments: CommentRange[] = [];
            let lastComment: CommentRange | undefined;

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
                const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, last(detachedComments).end);
                const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, skipTrivia(text, node.pos));
                if (nodeLine >= lastCommentLine + 2) {
                    // Valid detachedComments
                    emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                    emitComments(text, lineMap, writer, detachedComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                    currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: last(detachedComments).end };
                }
            }
        }

        return currentDetachedCommentInfo;

        function isPinnedCommentLocal(comment: CommentRange) {
            return isPinnedComment(text, comment.pos);
        }

    }

    export function writeCommentRange(text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
        if (text.charCodeAt(commentPos + 1) === CharacterCodes.asterisk) {
            const firstCommentLineAndCharacter = computeLineAndCharacterOfPosition(lineMap, commentPos);
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

    function writeTrimmedCurrentLine(text: string, commentEnd: number, writer: EmitTextWriter, newLine: string, pos: number, nextLineStart: number) {
        const end = Math.min(commentEnd, nextLineStart - 1);
        const currentLineText = text.substring(pos, end).replace(/^\s+|\s+$/g, "");
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
        for (; pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
            if (text.charCodeAt(pos) === CharacterCodes.tab) {
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

    export function hasModifiers(node: Node) {
        return getModifierFlags(node) !== ModifierFlags.None;
    }

    export function hasModifier(node: Node, flags: ModifierFlags): boolean {
        return !!getSelectedModifierFlags(node, flags);
    }

    export function hasStaticModifier(node: Node): boolean {
        return hasModifier(node, ModifierFlags.Static);
    }

    export function hasReadonlyModifier(node: Node): boolean {
        return hasModifier(node, ModifierFlags.Readonly);
    }

    export function getSelectedModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
        return getModifierFlags(node) & flags;
    }

    export function getModifierFlags(node: Node): ModifierFlags {
        if (node.modifierFlagsCache & ModifierFlags.HasComputedFlags) {
            return node.modifierFlagsCache & ~ModifierFlags.HasComputedFlags;
        }

        const flags = getModifierFlagsNoCache(node);
        node.modifierFlagsCache = flags | ModifierFlags.HasComputedFlags;
        return flags;
    }

    export function getModifierFlagsNoCache(node: Node): ModifierFlags {

        let flags = ModifierFlags.None;
        if (node.modifiers) {
            for (const modifier of node.modifiers) {
                flags |= modifierToFlag(modifier.kind);
            }
        }

        if (node.flags & NodeFlags.NestedNamespace || (node.kind === SyntaxKind.Identifier && (<Identifier>node).isInJSDocNamespace)) {
            flags |= ModifierFlags.Export;
        }

        return flags;
    }

    export function modifierToFlag(token: SyntaxKind): ModifierFlags {
        switch (token) {
            case SyntaxKind.StaticKeyword: return ModifierFlags.Static;
            case SyntaxKind.PublicKeyword: return ModifierFlags.Public;
            case SyntaxKind.ProtectedKeyword: return ModifierFlags.Protected;
            case SyntaxKind.PrivateKeyword: return ModifierFlags.Private;
            case SyntaxKind.AbstractKeyword: return ModifierFlags.Abstract;
            case SyntaxKind.ExportKeyword: return ModifierFlags.Export;
            case SyntaxKind.DeclareKeyword: return ModifierFlags.Ambient;
            case SyntaxKind.ConstKeyword: return ModifierFlags.Const;
            case SyntaxKind.DefaultKeyword: return ModifierFlags.Default;
            case SyntaxKind.AsyncKeyword: return ModifierFlags.Async;
            case SyntaxKind.ReadonlyKeyword: return ModifierFlags.Readonly;
        }
        return ModifierFlags.None;
    }

    export function isLogicalOperator(token: SyntaxKind): boolean {
        return token === SyntaxKind.BarBarToken
            || token === SyntaxKind.AmpersandAmpersandToken
            || token === SyntaxKind.ExclamationToken;
    }

    export function isAssignmentOperator(token: SyntaxKind): boolean {
        return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
    }

    /** Get `C` given `N` if `N` is in the position `class C extends N` where `N` is an ExpressionWithTypeArguments. */
    export function tryGetClassExtendingExpressionWithTypeArguments(node: Node): ClassLikeDeclaration | undefined {
        const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
        return cls && !cls.isImplements ? cls.class : undefined;
    }

    export interface ClassImplementingOrExtendingExpressionWithTypeArguments {
        readonly class: ClassLikeDeclaration;
        readonly isImplements: boolean;
    }
    export function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: Node): ClassImplementingOrExtendingExpressionWithTypeArguments | undefined {
        return isExpressionWithTypeArguments(node)
            && isHeritageClause(node.parent)
            && isClassLike(node.parent.parent)
            ? { class: node.parent.parent, isImplements: node.parent.token === SyntaxKind.ImplementsKeyword }
            : undefined;
    }

    export function isAssignmentExpression(node: Node, excludeCompoundAssignment: true): node is AssignmentExpression<EqualsToken>;
    export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: false): node is AssignmentExpression<AssignmentOperatorToken>;
    export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: boolean): node is AssignmentExpression<AssignmentOperatorToken> {
        return isBinaryExpression(node)
            && (excludeCompoundAssignment
                ? node.operatorToken.kind === SyntaxKind.EqualsToken
                : isAssignmentOperator(node.operatorToken.kind))
            && isLeftHandSideExpression(node.left);
    }

    export function isDestructuringAssignment(node: Node): node is DestructuringAssignment {
        if (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
            const kind = node.left.kind;
            return kind === SyntaxKind.ObjectLiteralExpression
                || kind === SyntaxKind.ArrayLiteralExpression;
        }

        return false;
    }

    export function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): node is ExpressionWithTypeArguments {
        return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
    }

    export function isEntityNameExpression(node: Node): node is EntityNameExpression {
        return node.kind === SyntaxKind.Identifier || isPropertyAccessEntityNameExpression(node);
    }

    export function isPropertyAccessEntityNameExpression(node: Node): node is PropertyAccessEntityNameExpression {
        return isPropertyAccessExpression(node) && isEntityNameExpression(node.expression);
    }

    export function isPrototypeAccess(node: Node): node is PropertyAccessExpression {
        return isPropertyAccessExpression(node) && node.name.escapedText === "prototype";
    }

    export function isRightSideOfQualifiedNameOrPropertyAccess(node: Node) {
        return (node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node) ||
            (node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).name === node);
    }

    export function isEmptyObjectLiteral(expression: Node): boolean {
        return expression.kind === SyntaxKind.ObjectLiteralExpression &&
            (<ObjectLiteralExpression>expression).properties.length === 0;
    }

    export function isEmptyArrayLiteral(expression: Node): boolean {
        return expression.kind === SyntaxKind.ArrayLiteralExpression &&
            (<ArrayLiteralExpression>expression).elements.length === 0;
    }

    export function getLocalSymbolForExportDefault(symbol: Symbol) {
        return isExportDefaultSymbol(symbol) ? symbol.declarations[0].localSymbol : undefined;
    }

    function isExportDefaultSymbol(symbol: Symbol): boolean {
        return symbol && length(symbol.declarations) > 0 && hasModifier(symbol.declarations[0], ModifierFlags.Default);
    }

    /** Return ".ts", ".d.ts", or ".tsx", if that is the extension. */
    export function tryExtractTSExtension(fileName: string): string | undefined {
        return find(supportedTSExtensionsForExtractExtension, extension => fileExtensionIs(fileName, extension));
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
                Debug.assert(false, "Unexpected code point");
            }
        }

        return output;
    }

    const base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

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

    export function base64encode(host: { base64encode?(input: string): string } | undefined, input: string): string {
        if (host && host.base64encode) {
            return host.base64encode(input);
        }
        return convertToBase64(input);
    }

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

    export function readJson(path: string, host: { readFile(fileName: string): string | undefined }): object {
        try {
            const jsonText = host.readFile(path);
            if (!jsonText) return {};
            const result = parseConfigFileTextToJson(path, jsonText);
            if (result.error) {
                return {};
            }
            return result.config;
        }
        catch (e) {
            // gracefully handle if readFile fails or returns not JSON
            return {};
        }
    }

    export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean }): boolean {
        // if host does not support 'directoryExists' assume that directory will exist
        return !host.directoryExists || host.directoryExists(directoryName);
    }

    const carriageReturnLineFeed = "\r\n";
    const lineFeed = "\n";
    export function getNewLineCharacter(options: CompilerOptions | PrinterOptions, getNewLine?: () => string): string {
        switch (options.newLine) {
            case NewLineKind.CarriageReturnLineFeed:
                return carriageReturnLineFeed;
            case NewLineKind.LineFeed:
                return lineFeed;
        }
        return getNewLine ? getNewLine() : sys ? sys.newLine : carriageReturnLineFeed;
    }

    /**
     * Formats an enum value as a string for debugging and debug assertions.
     */
    function formatEnum(value = 0, enumObject: any, isFlags?: boolean) {
        const members = getEnumMembers(enumObject);
        if (value === 0) {
            return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
        }
        if (isFlags) {
            let result = "";
            let remainingFlags = value;
            for (let i = members.length - 1; i >= 0 && remainingFlags !== 0; i--) {
                const [enumValue, enumName] = members[i];
                if (enumValue !== 0 && (remainingFlags & enumValue) === enumValue) {
                    remainingFlags &= ~enumValue;
                    result = `${enumName}${result ? ", " : ""}${result}`;
                }
            }
            if (remainingFlags === 0) {
                return result;
            }
        }
        else {
            for (const [enumValue, enumName] of members) {
                if (enumValue === value) {
                    return enumName;
                }
            }
        }
        return value.toString();
    }

    function getEnumMembers(enumObject: any) {
        const result: [number, string][] = [];
        for (const name in enumObject) {
            const value = enumObject[name];
            if (typeof value === "number") {
                result.push([value, name]);
            }
        }

        return stableSort<[number, string]>(result, (x, y) => compareValues(x[0], y[0]));
    }

    export function formatSyntaxKind(kind: SyntaxKind | undefined): string {
        return formatEnum(kind, (<any>ts).SyntaxKind, /*isFlags*/ false);
    }

    export function formatModifierFlags(flags: ModifierFlags | undefined): string {
        return formatEnum(flags, (<any>ts).ModifierFlags, /*isFlags*/ true);
    }

    export function formatTransformFlags(flags: TransformFlags | undefined): string {
        return formatEnum(flags, (<any>ts).TransformFlags, /*isFlags*/ true);
    }

    export function formatEmitFlags(flags: EmitFlags | undefined): string {
        return formatEnum(flags, (<any>ts).EmitFlags, /*isFlags*/ true);
    }

    export function formatSymbolFlags(flags: SymbolFlags | undefined): string {
        return formatEnum(flags, (<any>ts).SymbolFlags, /*isFlags*/ true);
    }

    export function formatTypeFlags(flags: TypeFlags | undefined): string {
        return formatEnum(flags, (<any>ts).TypeFlags, /*isFlags*/ true);
    }

    export function formatObjectFlags(flags: ObjectFlags | undefined): string {
        return formatEnum(flags, (<any>ts).ObjectFlags, /*isFlags*/ true);
    }

    /**
     * Creates a new TextRange from the provided pos and end.
     *
     * @param pos The start position.
     * @param end The end position.
     */
    export function createRange(pos: number, end: number = pos): TextRange {
        Debug.assert(end >= pos || end === -1);
        return { pos, end };
    }

    /**
     * Creates a new TextRange from a provided range with a new end position.
     *
     * @param range A TextRange.
     * @param end The new end position.
     */
    export function moveRangeEnd(range: TextRange, end: number): TextRange {
        return createRange(range.pos, end);
    }

    /**
     * Creates a new TextRange from a provided range with a new start position.
     *
     * @param range A TextRange.
     * @param pos The new Start position.
     */
    export function moveRangePos(range: TextRange, pos: number): TextRange {
        return createRange(pos, range.end);
    }

    /**
     * Moves the start position of a range past any decorators.
     */
    export function moveRangePastDecorators(node: Node): TextRange {
        return node.decorators && node.decorators.length > 0
            ? moveRangePos(node, node.decorators.end)
            : node;
    }

    /**
     * Moves the start position of a range past any decorators or modifiers.
     */
    export function moveRangePastModifiers(node: Node): TextRange {
        return node.modifiers && node.modifiers.length > 0
            ? moveRangePos(node, node.modifiers.end)
            : moveRangePastDecorators(node);
    }

    /**
     * Determines whether a TextRange has the same start and end positions.
     *
     * @param range A TextRange.
     */
    export function isCollapsedRange(range: TextRange) {
        return range.pos === range.end;
    }

    /**
     * Creates a new TextRange for a token at the provides start position.
     *
     * @param pos The start position.
     * @param token The token.
     */
    export function createTokenRange(pos: number, token: SyntaxKind): TextRange {
        return createRange(pos, pos + tokenToString(token)!.length);
    }

    export function rangeIsOnSingleLine(range: TextRange, sourceFile: SourceFile) {
        return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
    }

    export function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile), getStartPositionOfRange(range2, sourceFile), sourceFile);
    }

    export function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
    }

    export function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile), range2.end, sourceFile);
    }

    export function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile), sourceFile);
    }

    export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile) {
        return pos1 === pos2 ||
            getLineOfLocalPosition(sourceFile, pos1) === getLineOfLocalPosition(sourceFile, pos2);
    }

    export function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile) {
        return positionIsSynthesized(range.pos) ? -1 : skipTrivia(sourceFile.text, range.pos);
    }

    /**
     * Determines whether a name was originally the declaration name of an enum or namespace
     * declaration.
     */
    export function isDeclarationNameOfEnumOrNamespace(node: Identifier) {
        const parseNode = getParseTreeNode(node);
        if (parseNode) {
            switch (parseNode.parent.kind) {
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    return parseNode === (<EnumDeclaration | ModuleDeclaration>parseNode.parent).name;
            }
        }
        return false;
    }

    export function getInitializedVariables(node: VariableDeclarationList) {
        return filter(node.declarations, isInitializedVariable);
    }

    function isInitializedVariable(node: VariableDeclaration) {
        return node.initializer !== undefined;
    }

    export function isWatchSet(options: CompilerOptions) {
        // Firefox has Object.prototype.watch
        return options.watch && options.hasOwnProperty("watch");
    }

    export function closeFileWatcher(watcher: FileWatcher) {
        watcher.close();
    }

    export function getCheckFlags(symbol: Symbol): CheckFlags {
        return symbol.flags & SymbolFlags.Transient ? (<TransientSymbol>symbol).checkFlags : 0;
    }

    export function getDeclarationModifierFlagsFromSymbol(s: Symbol): ModifierFlags {
        if (s.valueDeclaration) {
            const flags = getCombinedModifierFlags(s.valueDeclaration);
            return s.parent && s.parent.flags & SymbolFlags.Class ? flags : flags & ~ModifierFlags.AccessibilityModifier;
        }
        if (getCheckFlags(s) & CheckFlags.Synthetic) {
            const checkFlags = (<TransientSymbol>s).checkFlags;
            const accessModifier = checkFlags & CheckFlags.ContainsPrivate ? ModifierFlags.Private :
                checkFlags & CheckFlags.ContainsPublic ? ModifierFlags.Public :
                    ModifierFlags.Protected;
            const staticModifier = checkFlags & CheckFlags.ContainsStatic ? ModifierFlags.Static : 0;
            return accessModifier | staticModifier;
        }
        if (s.flags & SymbolFlags.Prototype) {
            return ModifierFlags.Public | ModifierFlags.Static;
        }
        return 0;
    }

    export function skipAlias(symbol: Symbol, checker: TypeChecker) {
        return symbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    }

    /** See comment on `declareModuleMember` in `binder.ts`. */
    export function getCombinedLocalAndExportSymbolFlags(symbol: Symbol): SymbolFlags {
        return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
    }

    export function isWriteOnlyAccess(node: Node) {
        return accessKind(node) === AccessKind.Write;
    }

    export function isWriteAccess(node: Node) {
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
    function accessKind(node: Node): AccessKind {
        const { parent } = node;
        if (!parent) return AccessKind.Read;

        switch (parent.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return accessKind(parent);
            case SyntaxKind.PostfixUnaryExpression:
            case SyntaxKind.PrefixUnaryExpression:
                const { operator } = parent as PrefixUnaryExpression | PostfixUnaryExpression;
                return operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken ? writeOrReadWrite() : AccessKind.Read;
            case SyntaxKind.BinaryExpression:
                const { left, operatorToken } = parent as BinaryExpression;
                return left === node && isAssignmentOperator(operatorToken.kind) ?
                    operatorToken.kind === SyntaxKind.EqualsToken ? AccessKind.Write : writeOrReadWrite()
                    : AccessKind.Read;
            case SyntaxKind.PropertyAccessExpression:
                return (parent as PropertyAccessExpression).name !== node ? AccessKind.Read : accessKind(parent);
            case SyntaxKind.PropertyAssignment: {
                const parentAccess = accessKind(parent.parent);
                // In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
                return node === (parent as PropertyAssignment).name ? reverseAccessKind(parentAccess) : parentAccess;
            }
            case SyntaxKind.ShorthandPropertyAssignment:
                // Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
                return node === (parent as ShorthandPropertyAssignment).objectAssignmentInitializer ? AccessKind.Read : accessKind(parent.parent);
            case SyntaxKind.ArrayLiteralExpression:
                return accessKind(parent);
            default:
                return AccessKind.Read;
        }

        function writeOrReadWrite(): AccessKind {
            // If grandparent is not an ExpressionStatement, this is used as an expression in addition to having a side effect.
            return parent.parent && skipParenthesesUp(parent.parent).kind === SyntaxKind.ExpressionStatement ? AccessKind.Write : AccessKind.ReadWrite;
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
                return Debug.assertNever(a);
        }
    }

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

    /**
     * clears already present map by calling onDeleteExistingValue callback before deleting that key/value
     */
    export function clearMap<T>(map: { forEach: Map<T>["forEach"]; clear: Map<T>["clear"]; }, onDeleteValue: (valueInMap: T, key: string) => void) {
        // Remove all
        map.forEach(onDeleteValue);
        map.clear();
    }

    export interface MutateMapOptions<T, U> {
        createNewValue(key: string, valueInNewMap: U): T;
        onDeleteValue(existingValue: T, key: string): void;

        /**
         * If present this is called with the key when there is value for that key both in new map as well as existing map provided
         * Caller can then decide to update or remove this key.
         * If the key is removed, caller will get callback of createNewValue for that key.
         * If this callback is not provided, the value of such keys is not updated.
         */
        onExistingValue?(existingValue: T, valueInNewMap: U, key: string): void;
    }

    /**
     * Mutates the map with newMap such that keys in map will be same as newMap.
     */
    export function mutateMap<T, U>(map: Map<T>, newMap: ReadonlyMap<U>, options: MutateMapOptions<T, U>) {
        const { createNewValue, onDeleteValue, onExistingValue } = options;
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

        // Add new values that are not already present
        newMap.forEach((valueInNewMap, key) => {
            if (!map.has(key)) {
                // New values
                map.set(key, createNewValue(key, valueInNewMap));
            }
        });
    }

    /** Calls `callback` on `directory` and every ancestor directory it has, returning the first defined result. */
    export function forEachAncestorDirectory<T>(directory: string, callback: (directory: string) => T | undefined): T | undefined {
        while (true) {
            const result = callback(directory);
            if (result !== undefined) {
                return result;
            }

            const parentPath = getDirectoryPath(directory);
            if (parentPath === directory) {
                return undefined;
            }

            directory = parentPath;
        }
    }

    // Return true if the given type is the constructor type for an abstract class
    export function isAbstractConstructorType(type: Type): boolean {
        return !!(getObjectFlags(type) & ObjectFlags.Anonymous) && !!type.symbol && isAbstractConstructorSymbol(type.symbol);
    }

    export function isAbstractConstructorSymbol(symbol: Symbol): boolean {
        if (symbol.flags & SymbolFlags.Class) {
            const declaration = getClassLikeDeclarationOfSymbol(symbol);
            return !!declaration && hasModifier(declaration, ModifierFlags.Abstract);
        }
        return false;
    }

    export function getClassLikeDeclarationOfSymbol(symbol: Symbol): ClassLikeDeclaration | undefined {
        return find(symbol.declarations, isClassLike);
    }

    export function getObjectFlags(type: Type): ObjectFlags {
        return type.flags & TypeFlags.ObjectFlagsType ? (<ObjectFlagsType>type).objectFlags : 0;
    }

    export function typeHasCallOrConstructSignatures(type: Type, checker: TypeChecker) {
        return checker.getSignaturesOfType(type, SignatureKind.Call).length !== 0 || checker.getSignaturesOfType(type, SignatureKind.Construct).length !== 0;
    }

    export function forSomeAncestorDirectory(directory: string, callback: (directory: string) => boolean): boolean {
        return !!forEachAncestorDirectory(directory, d => callback(d) ? true : undefined);
    }

    export function isUMDExportSymbol(symbol: Symbol | undefined): boolean {
        return !!symbol && !!symbol.declarations && !!symbol.declarations[0] && isNamespaceExportDeclaration(symbol.declarations[0]);
    }

    export function showModuleSpecifier({ moduleSpecifier }: ImportDeclaration): string {
        return isStringLiteral(moduleSpecifier) ? moduleSpecifier.text : getTextOfNode(moduleSpecifier);
    }

    export function getLastChild(node: Node): Node | undefined {
        let lastChild: Node | undefined;
        forEachChild(node,
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

    /** Add a value to a set, and return true if it wasn't already present. */
    export function addToSeen(seen: Map<true>, key: string | number): boolean;
    export function addToSeen<T>(seen: Map<T>, key: string | number, value: T): boolean;
    export function addToSeen<T>(seen: Map<T>, key: string | number, value: T = true as any): boolean {
        key = String(key);
        if (seen.has(key)) {
            return false;
        }
        seen.set(key, value);
        return true;
    }

    export function isObjectTypeDeclaration(node: Node): node is ObjectTypeDeclaration {
        return isClassLike(node) || isInterfaceDeclaration(node) || isTypeLiteralNode(node);
    }

    export function isTypeNodeKind(kind: SyntaxKind) {
        return (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode)
            || kind === SyntaxKind.AnyKeyword
            || kind === SyntaxKind.UnknownKeyword
            || kind === SyntaxKind.NumberKeyword
            || kind === SyntaxKind.BigIntKeyword
            || kind === SyntaxKind.ObjectKeyword
            || kind === SyntaxKind.BooleanKeyword
            || kind === SyntaxKind.StringKeyword
            || kind === SyntaxKind.SymbolKeyword
            || kind === SyntaxKind.ThisKeyword
            || kind === SyntaxKind.VoidKeyword
            || kind === SyntaxKind.UndefinedKeyword
            || kind === SyntaxKind.NullKeyword
            || kind === SyntaxKind.NeverKeyword
            || kind === SyntaxKind.ExpressionWithTypeArguments
            || kind === SyntaxKind.JSDocAllType
            || kind === SyntaxKind.JSDocUnknownType
            || kind === SyntaxKind.JSDocNullableType
            || kind === SyntaxKind.JSDocNonNullableType
            || kind === SyntaxKind.JSDocOptionalType
            || kind === SyntaxKind.JSDocFunctionType
            || kind === SyntaxKind.JSDocVariadicType;
    }

    export function isAccessExpression(node: Node): node is AccessExpression {
        return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression;
    }

    export function isBundleFileTextLike(section: BundleFileSection): section is BundleFileTextLike {
        switch (section.kind) {
            case BundleFileSectionKind.Text:
            case BundleFileSectionKind.Internal:
                return true;
            default:
                return false;
        }
    }
}

namespace ts {
    export function getDefaultLibFileName(options: CompilerOptions): string {
        switch (options.target) {
            case ScriptTarget.ESNext:
                return "lib.esnext.full.d.ts";
            case ScriptTarget.ES2019:
                return "lib.es2019.full.d.ts";
            case ScriptTarget.ES2018:
                return "lib.es2018.full.d.ts";
            case ScriptTarget.ES2017:
                return "lib.es2017.full.d.ts";
            case ScriptTarget.ES2016:
                return "lib.es2016.full.d.ts";
            case ScriptTarget.ES2015:
                return "lib.es6.d.ts";  // We don't use lib.es2015.full.d.ts due to breaking change.
            default:
                return "lib.d.ts";
        }
    }

    export function textSpanEnd(span: TextSpan) {
        return span.start + span.length;
    }

    export function textSpanIsEmpty(span: TextSpan) {
        return span.length === 0;
    }

    export function textSpanContainsPosition(span: TextSpan, position: number) {
        return position >= span.start && position < textSpanEnd(span);
    }

    /* @internal */
    export function textRangeContainsPositionInclusive(span: TextRange, position: number): boolean {
        return position >= span.pos && position <= span.end;
    }

    // Returns true if 'span' contains 'other'.
    export function textSpanContainsTextSpan(span: TextSpan, other: TextSpan) {
        return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
    }

    export function textSpanOverlapsWith(span: TextSpan, other: TextSpan) {
        return textSpanOverlap(span, other) !== undefined;
    }

    export function textSpanOverlap(span1: TextSpan, span2: TextSpan): TextSpan | undefined {
        const overlap = textSpanIntersection(span1, span2);
        return overlap && overlap.length === 0 ? undefined : overlap;
    }

    export function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan) {
        return decodedTextSpanIntersectsWith(span.start, span.length, other.start, other.length);
    }

    export function textSpanIntersectsWith(span: TextSpan, start: number, length: number) {
        return decodedTextSpanIntersectsWith(span.start, span.length, start, length);
    }

    export function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number) {
        const end1 = start1 + length1;
        const end2 = start2 + length2;
        return start2 <= end1 && end2 >= start1;
    }

    export function textSpanIntersectsWithPosition(span: TextSpan, position: number) {
        return position <= textSpanEnd(span) && position >= span.start;
    }

    export function textSpanIntersection(span1: TextSpan, span2: TextSpan): TextSpan | undefined {
        const start = Math.max(span1.start, span2.start);
        const end = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        return start <= end ? createTextSpanFromBounds(start, end) : undefined;
    }

    export function createTextSpan(start: number, length: number): TextSpan {
        if (start < 0) {
            throw new Error("start < 0");
        }
        if (length < 0) {
            throw new Error("length < 0");
        }

        return { start, length };
    }

    export function createTextSpanFromBounds(start: number, end: number) {
        return createTextSpan(start, end - start);
    }

    export function textChangeRangeNewSpan(range: TextChangeRange) {
        return createTextSpan(range.span.start, range.newLength);
    }

    export function textChangeRangeIsUnchanged(range: TextChangeRange) {
        return textSpanIsEmpty(range.span) && range.newLength === 0;
    }

    export function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange {
        if (newLength < 0) {
            throw new Error("newLength < 0");
        }

        return { span, newLength };
    }

    export let unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0);

    /**
     * Called to merge all the changes that occurred across several versions of a script snapshot
     * into a single change.  i.e. if a user keeps making successive edits to a script we will
     * have a text change from V1 to V2, V2 to V3, ..., Vn.
     *
     * This function will then merge those changes into a single change range valid between V1 and
     * Vn.
     */
    export function collapseTextChangeRangesAcrossMultipleVersions(changes: ReadonlyArray<TextChangeRange>): TextChangeRange {
        if (changes.length === 0) {
            return unchangedTextChangeRange;
        }

        if (changes.length === 1) {
            return changes[0];
        }

        // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
        // as it makes things much easier to reason about.
        const change0 = changes[0];

        let oldStartN = change0.span.start;
        let oldEndN = textSpanEnd(change0.span);
        let newEndN = oldStartN + change0.newLength;

        for (let i = 1; i < changes.length; i++) {
            const nextChange = changes[i];

            // Consider the following case:
            // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
            // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
            // i.e. the span starting at 30 with length 30 is increased to length 40.
            //
            //      0         10        20        30        40        50        60        70        80        90        100
            //      -------------------------------------------------------------------------------------------------------
            //                |                                                 /
            //                |                                            /----
            //  T1            |                                       /----
            //                |                                  /----
            //                |                             /----
            //      -------------------------------------------------------------------------------------------------------
            //                                     |                            \
            //                                     |                               \
            //   T2                                |                                 \
            //                                     |                                   \
            //                                     |                                      \
            //      -------------------------------------------------------------------------------------------------------
            //
            // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
            // it's just the min of the old and new starts.  i.e.:
            //
            //      0         10        20        30        40        50        60        70        80        90        100
            //      ------------------------------------------------------------*------------------------------------------
            //                |                                                 /
            //                |                                            /----
            //  T1            |                                       /----
            //                |                                  /----
            //                |                             /----
            //      ----------------------------------------$-------------------$------------------------------------------
            //                .                    |                            \
            //                .                    |                               \
            //   T2           .                    |                                 \
            //                .                    |                                   \
            //                .                    |                                      \
            //      ----------------------------------------------------------------------*--------------------------------
            //
            // (Note the dots represent the newly inferred start.
            // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
            // absolute positions at the asterisks, and the relative change between the dollar signs. Basically, we see
            // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
            // means:
            //
            //      0         10        20        30        40        50        60        70        80        90        100
            //      --------------------------------------------------------------------------------*----------------------
            //                |                                                                     /
            //                |                                                                /----
            //  T1            |                                                           /----
            //                |                                                      /----
            //                |                                                 /----
            //      ------------------------------------------------------------$------------------------------------------
            //                .                    |                            \
            //                .                    |                               \
            //   T2           .                    |                                 \
            //                .                    |                                   \
            //                .                    |                                      \
            //      ----------------------------------------------------------------------*--------------------------------
            //
            // In other words (in this case), we're recognizing that the second edit happened after where the first edit
            // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
            // that's the same as if we started at char 80 instead of 60.
            //
            // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rather
            // than pushing the first edit forward to match the second, we'll push the second edit forward to match the
            // first.
            //
            // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
            // semantics: { { start: 10, length: 70 }, newLength: 60 }
            //
            // The math then works out as follows.
            // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the
            // final result like so:
            //
            // {
            //      oldStart3: Min(oldStart1, oldStart2),
            //      oldEnd3: Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
            //      newEnd3: Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
            // }

            const oldStart1 = oldStartN;
            const oldEnd1 = oldEndN;
            const newEnd1 = newEndN;

            const oldStart2 = nextChange.span.start;
            const oldEnd2 = textSpanEnd(nextChange.span);
            const newEnd2 = oldStart2 + nextChange.newLength;

            oldStartN = Math.min(oldStart1, oldStart2);
            oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
            newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
        }

        return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), /*newLength*/ newEndN - oldStartN);
    }

    export function getTypeParameterOwner(d: Declaration): Declaration | undefined {
        if (d && d.kind === SyntaxKind.TypeParameter) {
            for (let current: Node = d; current; current = current.parent) {
                if (isFunctionLike(current) || isClassLike(current) || current.kind === SyntaxKind.InterfaceDeclaration) {
                    return <Declaration>current;
                }
            }
        }
    }

    export type ParameterPropertyDeclaration = ParameterDeclaration & { parent: ConstructorDeclaration, name: Identifier };
    export function isParameterPropertyDeclaration(node: Node): node is ParameterPropertyDeclaration {
        return hasModifier(node, ModifierFlags.ParameterPropertyModifier) && node.parent.kind === SyntaxKind.Constructor;
    }

    export function isEmptyBindingPattern(node: BindingName): node is BindingPattern {
        if (isBindingPattern(node)) {
            return every(node.elements, isEmptyBindingElement);
        }
        return false;
    }

    export function isEmptyBindingElement(node: BindingElement): boolean {
        if (isOmittedExpression(node)) {
            return true;
        }
        return isEmptyBindingPattern(node.name);
    }

    export function walkUpBindingElementsAndPatterns(binding: BindingElement): VariableDeclaration | ParameterDeclaration {
        let node = binding.parent;
        while (isBindingElement(node.parent)) {
            node = node.parent.parent;
        }
        return node.parent;
    }

    function getCombinedFlags(node: Node, getFlags: (n: Node) => number): number {
        if (isBindingElement(node)) {
            node = walkUpBindingElementsAndPatterns(node);
        }
        let flags = getFlags(node);
        if (node.kind === SyntaxKind.VariableDeclaration) {
            node = node.parent;
        }
        if (node && node.kind === SyntaxKind.VariableDeclarationList) {
            flags |= getFlags(node);
            node = node.parent;
        }
        if (node && node.kind === SyntaxKind.VariableStatement) {
            flags |= getFlags(node);
        }
        return flags;
    }

    export function getCombinedModifierFlags(node: Declaration): ModifierFlags {
        return getCombinedFlags(node, getModifierFlags);
    }

    // Returns the node flags for this node and all relevant parent nodes.  This is done so that
    // nodes like variable declarations and binding elements can returned a view of their flags
    // that includes the modifiers from their container.  i.e. flags like export/declare aren't
    // stored on the variable declaration directly, but on the containing variable statement
    // (if it has one).  Similarly, flags for let/const are store on the variable declaration
    // list.  By calling this function, all those flags are combined so that the client can treat
    // the node as if it actually had those flags.
    export function getCombinedNodeFlags(node: Node): NodeFlags {
        return getCombinedFlags(node, n => n.flags);
    }

    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    export function validateLocaleAndSetLanguage(
        locale: string,
        sys: { getExecutingFilePath(): string, resolvePath(path: string): string, fileExists(fileName: string): boolean, readFile(fileName: string): string | undefined },
        errors?: Push<Diagnostic>) {
        const matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());

        if (!matchResult) {
            if (errors) {
                errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
            }
            return;
        }

        const language = matchResult[1];
        const territory = matchResult[3];

        // First try the entire locale, then fall back to just language if that's all we have.
        // Either ways do not fail, and fallback to the English diagnostic strings.
        if (!trySetLanguageAndTerritory(language, territory, errors)) {
            trySetLanguageAndTerritory(language, /*territory*/ undefined, errors);
        }

        // Set the UI locale for string collation
        setUILocale(locale);

        function trySetLanguageAndTerritory(language: string, territory: string | undefined, errors?: Push<Diagnostic>): boolean {
            const compilerFilePath = normalizePath(sys.getExecutingFilePath());
            const containingDirectoryPath = getDirectoryPath(compilerFilePath);

            let filePath = combinePaths(containingDirectoryPath, language);

            if (territory) {
                filePath = filePath + "-" + territory;
            }

            filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

            if (!sys.fileExists(filePath)) {
                return false;
            }

            // TODO: Add codePage support for readFile?
            let fileContents: string | undefined = "";
            try {
                fileContents = sys.readFile(filePath);
            }
            catch (e) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
                }
                return false;
            }
            try {
                // tslint:disable-next-line no-unnecessary-qualifier (making clear this is a global mutation!)
                ts.localizedDiagnosticMessages = JSON.parse(fileContents!);
            }
            catch {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
                }
                return false;
            }

            return true;
        }
    }

    export function getOriginalNode(node: Node): Node;
    export function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
    export function getOriginalNode(node: Node | undefined): Node | undefined;
    export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node | undefined) => node is T): T | undefined;
    export function getOriginalNode(node: Node | undefined, nodeTest?: (node: Node | undefined) => boolean): Node | undefined {
        if (node) {
            while (node.original !== undefined) {
                node = node.original;
            }
        }

        return !nodeTest || nodeTest(node) ? node : undefined;
    }

    /**
     * Gets a value indicating whether a node originated in the parse tree.
     *
     * @param node The node to test.
     */
    export function isParseTreeNode(node: Node): boolean {
        return (node.flags & NodeFlags.Synthesized) === 0;
    }

    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    export function getParseTreeNode(node: Node): Node;

    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    export function getParseTreeNode<T extends Node>(node: Node | undefined, nodeTest?: (node: Node) => node is T): T | undefined;
    export function getParseTreeNode(node: Node | undefined, nodeTest?: (node: Node) => boolean): Node | undefined {
        if (node === undefined || isParseTreeNode(node)) {
            return node;
        }

        node = getOriginalNode(node);

        if (isParseTreeNode(node) && (!nodeTest || nodeTest(node))) {
            return node;
        }

        return undefined;
    }

    /** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
    export function escapeLeadingUnderscores(identifier: string): __String {
        return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier) as __String;
    }

    /**
     * Remove extra underscore from escaped identifier text content.
     *
     * @param identifier The escaped identifier text.
     * @returns The unescaped identifier text.
     */
    export function unescapeLeadingUnderscores(identifier: __String): string {
        const id = identifier as string;
        return id.length >= 3 && id.charCodeAt(0) === CharacterCodes._ && id.charCodeAt(1) === CharacterCodes._ && id.charCodeAt(2) === CharacterCodes._ ? id.substr(1) : id;
    }

    export function idText(identifier: Identifier): string {
        return unescapeLeadingUnderscores(identifier.escapedText);
    }
    export function symbolName(symbol: Symbol): string {
        return unescapeLeadingUnderscores(symbol.escapedName);
    }

    /**
     * A JSDocTypedef tag has an _optional_ name field - if a name is not directly present, we should
     * attempt to draw the name from the node the declaration is on (as that declaration is what its' symbol
     * will be merged with)
     */
    function nameForNamelessJSDocTypedef(declaration: JSDocTypedefTag): Identifier | undefined {
        const hostNode = declaration.parent.parent;
        if (!hostNode) {
            return undefined;
        }
        // Covers classes, functions - any named declaration host node
        if (isDeclaration(hostNode)) {
            return getDeclarationIdentifier(hostNode);
        }
        // Covers remaining cases (returning undefined if none match).
        switch (hostNode.kind) {
            case SyntaxKind.VariableStatement:
                if (hostNode.declarationList && hostNode.declarationList.declarations[0]) {
                    return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
                }
                break;
            case SyntaxKind.ExpressionStatement:
                const expr = hostNode.expression;
                switch (expr.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                        return (expr as PropertyAccessExpression).name;
                    case SyntaxKind.ElementAccessExpression:
                        const arg = (expr as ElementAccessExpression).argumentExpression;
                        if (isIdentifier(arg)) {
                            return arg;
                        }
                }
                break;
            case SyntaxKind.ParenthesizedExpression: {
                return getDeclarationIdentifier(hostNode.expression);
            }
            case SyntaxKind.LabeledStatement: {
                if (isDeclaration(hostNode.statement) || isExpression(hostNode.statement)) {
                    return getDeclarationIdentifier(hostNode.statement);
                }
                break;
            }
        }
    }

    function getDeclarationIdentifier(node: Declaration | Expression): Identifier | undefined {
        const name = getNameOfDeclaration(node);
        return name && isIdentifier(name) ? name : undefined;
    }

    export function getNameOfJSDocTypedef(declaration: JSDocTypedefTag): Identifier | undefined {
        return declaration.name || nameForNamelessJSDocTypedef(declaration);
    }

    /** @internal */
    export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName } {
        return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
    }

    /** @internal */
    export function getNonAssignedNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
        switch (declaration.kind) {
            case SyntaxKind.Identifier:
                return declaration as Identifier;
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag: {
                const { name } = declaration as JSDocPropertyLikeTag;
                if (name.kind === SyntaxKind.QualifiedName) {
                    return name.right;
                }
                break;
            }
            case SyntaxKind.CallExpression:
            case SyntaxKind.BinaryExpression: {
                const expr = declaration as BinaryExpression | CallExpression;
                switch (getAssignmentDeclarationKind(expr)) {
                    case AssignmentDeclarationKind.ExportsProperty:
                    case AssignmentDeclarationKind.ThisProperty:
                    case AssignmentDeclarationKind.Property:
                    case AssignmentDeclarationKind.PrototypeProperty:
                        return ((expr as BinaryExpression).left as PropertyAccessExpression).name;
                    case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                    case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                    case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                        return (expr as BindableObjectDefinePropertyCall).arguments[1];
                    default:
                        return undefined;
                }
            }
            case SyntaxKind.JSDocTypedefTag:
                return getNameOfJSDocTypedef(declaration as JSDocTypedefTag);
            case SyntaxKind.ExportAssignment: {
                const { expression } = declaration as ExportAssignment;
                return isIdentifier(expression) ? expression : undefined;
            }
        }
        return (declaration as NamedDeclaration).name;
    }

    export function getNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
        if (declaration === undefined) return undefined;
        return getNonAssignedNameOfDeclaration(declaration) ||
            (isFunctionExpression(declaration) || isClassExpression(declaration) ? getAssignedName(declaration) : undefined);
    }

    function getAssignedName(node: Node): DeclarationName | undefined {
        if (!node.parent) {
            return undefined;
        }
        else if (isPropertyAssignment(node.parent) || isBindingElement(node.parent)) {
            return node.parent.name;
        }
        else if (isBinaryExpression(node.parent) && node === node.parent.right) {
            if (isIdentifier(node.parent.left)) {
                return node.parent.left;
            }
            else if (isPropertyAccessExpression(node.parent.left)) {
                return node.parent.left.name;
            }
        }
    }

    /**
     * Gets the JSDoc parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc param tag whose name matches the provided
     * parameter, whether a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the param
     * tag on the containing function expression would be first.
     *
     * For binding patterns, parameter tags are matched by position.
     */
    export function getJSDocParameterTags(param: ParameterDeclaration): ReadonlyArray<JSDocParameterTag> {
        if (param.name) {
            if (isIdentifier(param.name)) {
                const name = param.name.escapedText;
                return getJSDocTags(param.parent).filter((tag): tag is JSDocParameterTag => isJSDocParameterTag(tag) && isIdentifier(tag.name) && tag.name.escapedText === name);
            }
            else {
                const i = param.parent.parameters.indexOf(param);
                Debug.assert(i > -1, "Parameters should always be in their parents' parameter list");
                const paramTags = getJSDocTags(param.parent).filter(isJSDocParameterTag);
                if (i < paramTags.length) {
                    return [paramTags[i]];
                }
            }
        }
        // return empty array for: out-of-order binding patterns and JSDoc function syntax, which has un-named parameters
        return emptyArray;
    }

    /**
     * Gets the JSDoc type parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc template tag whose names match the provided
     * parameter, whether a template tag on a containing function
     * expression, or a template tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the template
     * tag on the containing function expression would be first.
     */
    export function getJSDocTypeParameterTags(param: TypeParameterDeclaration): ReadonlyArray<JSDocTemplateTag> {
        const name = param.name.escapedText;
        return getJSDocTags(param.parent).filter((tag): tag is JSDocTemplateTag =>
            isJSDocTemplateTag(tag) && tag.typeParameters.some(tp => tp.name.escapedText === name));
    }

    /**
     * Return true if the node has JSDoc parameter tags.
     *
     * @remarks Includes parameter tags that are not directly on the node,
     * for example on a variable declaration whose initializer is a function expression.
     */
    export function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration): boolean {
        return !!getFirstJSDocTag(node, isJSDocParameterTag);
    }

    /** Gets the JSDoc augments tag for the node if present */
    export function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag | undefined {
        return getFirstJSDocTag(node, isJSDocAugmentsTag);
    }

    /** Gets the JSDoc class tag for the node if present */
    export function getJSDocClassTag(node: Node): JSDocClassTag | undefined {
        return getFirstJSDocTag(node, isJSDocClassTag);
    }

    /** Gets the JSDoc enum tag for the node if present */
    export function getJSDocEnumTag(node: Node): JSDocEnumTag | undefined {
        return getFirstJSDocTag(node, isJSDocEnumTag);
    }

    /** Gets the JSDoc this tag for the node if present */
    export function getJSDocThisTag(node: Node): JSDocThisTag | undefined {
        return getFirstJSDocTag(node, isJSDocThisTag);
    }

    /** Gets the JSDoc return tag for the node if present */
    export function getJSDocReturnTag(node: Node): JSDocReturnTag | undefined {
        return getFirstJSDocTag(node, isJSDocReturnTag);
    }

    /** Gets the JSDoc template tag for the node if present */
    export function getJSDocTemplateTag(node: Node): JSDocTemplateTag | undefined {
        return getFirstJSDocTag(node, isJSDocTemplateTag);
    }

    /** Gets the JSDoc type tag for the node if present and valid */
    export function getJSDocTypeTag(node: Node): JSDocTypeTag | undefined {
        // We should have already issued an error if there were multiple type jsdocs, so just use the first one.
        const tag = getFirstJSDocTag(node, isJSDocTypeTag);
        if (tag && tag.typeExpression && tag.typeExpression.type) {
            return tag;
        }
        return undefined;
    }

    /**
     * Gets the type node for the node if provided via JSDoc.
     *
     * @remarks The search includes any JSDoc param tag that relates
     * to the provided parameter, for example a type tag on the
     * parameter itself, or a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are examined first, so in the previous example, the type
     * tag directly on the node would be returned.
     */
    export function getJSDocType(node: Node): TypeNode | undefined {
        let tag: JSDocTypeTag | JSDocParameterTag | undefined = getFirstJSDocTag(node, isJSDocTypeTag);
        if (!tag && isParameter(node)) {
            tag = find(getJSDocParameterTags(node), tag => !!tag.typeExpression);
        }

        return tag && tag.typeExpression && tag.typeExpression.type;
    }

    /**
     * Gets the return type node for the node if provided via JSDoc return tag or type tag.
     *
     * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
     * gets the type from inside the braces, after the fat arrow, etc.
     */
    export function getJSDocReturnType(node: Node): TypeNode | undefined {
        const returnTag = getJSDocReturnTag(node);
        if (returnTag && returnTag.typeExpression) {
            return returnTag.typeExpression.type;
        }
        const typeTag = getJSDocTypeTag(node);
        if (typeTag && typeTag.typeExpression) {
            const type = typeTag.typeExpression.type;
            if (isTypeLiteralNode(type)) {
                const sig = find(type.members, isCallSignatureDeclaration);
                return sig && sig.type;
            }
            if (isFunctionTypeNode(type)) {
                return type.type;
            }
        }
    }

    /** Get all JSDoc tags related to a node, including those on parent nodes. */
    export function getJSDocTags(node: Node): ReadonlyArray<JSDocTag> {
        let tags = (node as JSDocContainer).jsDocCache;
        // If cache is 'null', that means we did the work of searching for JSDoc tags and came up with nothing.
        if (tags === undefined) {
            const comments = getJSDocCommentsAndTags(node);
            Debug.assert(comments.length < 2 || comments[0] !== comments[1]);
            (node as JSDocContainer).jsDocCache = tags = flatMap(comments, j => isJSDoc(j) ? j.tags : j);
        }
        return tags;
    }

    /** Get the first JSDoc tag of a specified kind, or undefined if not present. */
    function getFirstJSDocTag<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T): T | undefined {
        return find(getJSDocTags(node), predicate);
    }

    /** Gets all JSDoc tags of a specified kind, or undefined if not present. */
    export function getAllJSDocTagsOfKind(node: Node, kind: SyntaxKind): ReadonlyArray<JSDocTag> {
        return getJSDocTags(node).filter(doc => doc.kind === kind);
    }

    /**
     * Gets the effective type parameters. If the node was parsed in a
     * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
     */
    export function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters): ReadonlyArray<TypeParameterDeclaration> {
        if (isJSDocSignature(node)) {
            return emptyArray;
        }
        if (isJSDocTypeAlias(node)) {
            Debug.assert(node.parent.kind === SyntaxKind.JSDocComment);
            return flatMap(node.parent.tags, tag => isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
        }
        if (node.typeParameters) {
            return node.typeParameters;
        }
        if (isInJSFile(node)) {
            const decls = getJSDocTypeParameterDeclarations(node);
            if (decls.length) {
                return decls;
            }
            const typeTag = getJSDocType(node);
            if (typeTag && isFunctionTypeNode(typeTag) && typeTag.typeParameters) {
                return typeTag.typeParameters;
            }
        }
        return emptyArray;
    }

    export function getEffectiveConstraintOfTypeParameter(node: TypeParameterDeclaration): TypeNode | undefined {
        return node.constraint ? node.constraint
            : isJSDocTemplateTag(node.parent) && node === node.parent.typeParameters[0]
            ? node.parent.constraint
            : undefined;
    }
}

// Simple node tests of the form `node.kind === SyntaxKind.Foo`.
namespace ts {
    // Literals
    export function isNumericLiteral(node: Node): node is NumericLiteral {
        return node.kind === SyntaxKind.NumericLiteral;
    }

    export function isBigIntLiteral(node: Node): node is BigIntLiteral {
        return node.kind === SyntaxKind.BigIntLiteral;
    }

    export function isStringLiteral(node: Node): node is StringLiteral {
        return node.kind === SyntaxKind.StringLiteral;
    }

    export function isJsxText(node: Node): node is JsxText {
        return node.kind === SyntaxKind.JsxText;
    }

    export function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral {
        return node.kind === SyntaxKind.RegularExpressionLiteral;
    }

    export function isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral {
        return node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    // Pseudo-literals

    export function isTemplateHead(node: Node): node is TemplateHead {
        return node.kind === SyntaxKind.TemplateHead;
    }

    export function isTemplateMiddle(node: Node): node is TemplateMiddle {
        return node.kind === SyntaxKind.TemplateMiddle;
    }

    export function isTemplateTail(node: Node): node is TemplateTail {
        return node.kind === SyntaxKind.TemplateTail;
    }

    export function isIdentifier(node: Node): node is Identifier {
        return node.kind === SyntaxKind.Identifier;
    }

    // Names

    export function isQualifiedName(node: Node): node is QualifiedName {
        return node.kind === SyntaxKind.QualifiedName;
    }

    export function isComputedPropertyName(node: Node): node is ComputedPropertyName {
        return node.kind === SyntaxKind.ComputedPropertyName;
    }

    // Signature elements

    export function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration {
        return node.kind === SyntaxKind.TypeParameter;
    }

    export function isParameter(node: Node): node is ParameterDeclaration {
        return node.kind === SyntaxKind.Parameter;
    }

    export function isDecorator(node: Node): node is Decorator {
        return node.kind === SyntaxKind.Decorator;
    }

    // TypeMember

    export function isPropertySignature(node: Node): node is PropertySignature {
        return node.kind === SyntaxKind.PropertySignature;
    }

    export function isPropertyDeclaration(node: Node): node is PropertyDeclaration {
        return node.kind === SyntaxKind.PropertyDeclaration;
    }

    export function isMethodSignature(node: Node): node is MethodSignature {
        return node.kind === SyntaxKind.MethodSignature;
    }

    export function isMethodDeclaration(node: Node): node is MethodDeclaration {
        return node.kind === SyntaxKind.MethodDeclaration;
    }

    export function isConstructorDeclaration(node: Node): node is ConstructorDeclaration {
        return node.kind === SyntaxKind.Constructor;
    }

    export function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration {
        return node.kind === SyntaxKind.GetAccessor;
    }

    export function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration {
        return node.kind === SyntaxKind.SetAccessor;
    }

    export function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration {
        return node.kind === SyntaxKind.CallSignature;
    }

    export function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration {
        return node.kind === SyntaxKind.ConstructSignature;
    }

    export function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration {
        return node.kind === SyntaxKind.IndexSignature;
    }

    /* @internal */
    export function isGetOrSetAccessorDeclaration(node: Node): node is AccessorDeclaration {
        return node.kind === SyntaxKind.SetAccessor || node.kind === SyntaxKind.GetAccessor;
    }

    // Type

    export function isTypePredicateNode(node: Node): node is TypePredicateNode {
        return node.kind === SyntaxKind.TypePredicate;
    }

    export function isTypeReferenceNode(node: Node): node is TypeReferenceNode {
        return node.kind === SyntaxKind.TypeReference;
    }

    export function isFunctionTypeNode(node: Node): node is FunctionTypeNode {
        return node.kind === SyntaxKind.FunctionType;
    }

    export function isConstructorTypeNode(node: Node): node is ConstructorTypeNode {
        return node.kind === SyntaxKind.ConstructorType;
    }

    export function isTypeQueryNode(node: Node): node is TypeQueryNode {
        return node.kind === SyntaxKind.TypeQuery;
    }

    export function isTypeLiteralNode(node: Node): node is TypeLiteralNode {
        return node.kind === SyntaxKind.TypeLiteral;
    }

    export function isArrayTypeNode(node: Node): node is ArrayTypeNode {
        return node.kind === SyntaxKind.ArrayType;
    }

    export function isTupleTypeNode(node: Node): node is TupleTypeNode {
        return node.kind === SyntaxKind.TupleType;
    }

    export function isUnionTypeNode(node: Node): node is UnionTypeNode {
        return node.kind === SyntaxKind.UnionType;
    }

    export function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode {
        return node.kind === SyntaxKind.IntersectionType;
    }

    export function isConditionalTypeNode(node: Node): node is ConditionalTypeNode {
        return node.kind === SyntaxKind.ConditionalType;
    }

    export function isInferTypeNode(node: Node): node is InferTypeNode {
        return node.kind === SyntaxKind.InferType;
    }

    export function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode {
        return node.kind === SyntaxKind.ParenthesizedType;
    }

    export function isThisTypeNode(node: Node): node is ThisTypeNode {
        return node.kind === SyntaxKind.ThisType;
    }

    export function isTypeOperatorNode(node: Node): node is TypeOperatorNode {
        return node.kind === SyntaxKind.TypeOperator;
    }

    export function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode {
        return node.kind === SyntaxKind.IndexedAccessType;
    }

    export function isMappedTypeNode(node: Node): node is MappedTypeNode {
        return node.kind === SyntaxKind.MappedType;
    }

    export function isLiteralTypeNode(node: Node): node is LiteralTypeNode {
        return node.kind === SyntaxKind.LiteralType;
    }

    export function isImportTypeNode(node: Node): node is ImportTypeNode {
        return node.kind === SyntaxKind.ImportType;
    }

    // Binding patterns

    export function isObjectBindingPattern(node: Node): node is ObjectBindingPattern {
        return node.kind === SyntaxKind.ObjectBindingPattern;
    }

    export function isArrayBindingPattern(node: Node): node is ArrayBindingPattern {
        return node.kind === SyntaxKind.ArrayBindingPattern;
    }

    export function isBindingElement(node: Node): node is BindingElement {
        return node.kind === SyntaxKind.BindingElement;
    }

    // Expression

    export function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression {
        return node.kind === SyntaxKind.ArrayLiteralExpression;
    }

    export function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression {
        return node.kind === SyntaxKind.ObjectLiteralExpression;
    }

    export function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression {
        return node.kind === SyntaxKind.PropertyAccessExpression;
    }

    export function isElementAccessExpression(node: Node): node is ElementAccessExpression {
        return node.kind === SyntaxKind.ElementAccessExpression;
    }

    export function isCallExpression(node: Node): node is CallExpression {
        return node.kind === SyntaxKind.CallExpression;
    }

    export function isNewExpression(node: Node): node is NewExpression {
        return node.kind === SyntaxKind.NewExpression;
    }

    export function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression {
        return node.kind === SyntaxKind.TaggedTemplateExpression;
    }

    export function isTypeAssertion(node: Node): node is TypeAssertion {
        return node.kind === SyntaxKind.TypeAssertionExpression;
    }

    export function isConstTypeReference(node: Node) {
        return isTypeReferenceNode(node) && isIdentifier(node.typeName) &&
            node.typeName.escapedText === "const" && !node.typeArguments;
    }

    export function isParenthesizedExpression(node: Node): node is ParenthesizedExpression {
        return node.kind === SyntaxKind.ParenthesizedExpression;
    }

    export function skipPartiallyEmittedExpressions(node: Expression): Expression;
    export function skipPartiallyEmittedExpressions(node: Node): Node;
    export function skipPartiallyEmittedExpressions(node: Node) {
        while (node.kind === SyntaxKind.PartiallyEmittedExpression) {
            node = (<PartiallyEmittedExpression>node).expression;
        }

        return node;
    }

    export function isFunctionExpression(node: Node): node is FunctionExpression {
        return node.kind === SyntaxKind.FunctionExpression;
    }

    export function isArrowFunction(node: Node): node is ArrowFunction {
        return node.kind === SyntaxKind.ArrowFunction;
    }

    export function isDeleteExpression(node: Node): node is DeleteExpression {
        return node.kind === SyntaxKind.DeleteExpression;
    }

    export function isTypeOfExpression(node: Node): node is TypeOfExpression {
        return node.kind === SyntaxKind.TypeOfExpression;
    }

    export function isVoidExpression(node: Node): node is VoidExpression {
        return node.kind === SyntaxKind.VoidExpression;
    }

    export function isAwaitExpression(node: Node): node is AwaitExpression {
        return node.kind === SyntaxKind.AwaitExpression;
    }

    export function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression {
        return node.kind === SyntaxKind.PrefixUnaryExpression;
    }

    export function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression {
        return node.kind === SyntaxKind.PostfixUnaryExpression;
    }

    export function isBinaryExpression(node: Node): node is BinaryExpression {
        return node.kind === SyntaxKind.BinaryExpression;
    }

    export function isConditionalExpression(node: Node): node is ConditionalExpression {
        return node.kind === SyntaxKind.ConditionalExpression;
    }

    export function isTemplateExpression(node: Node): node is TemplateExpression {
        return node.kind === SyntaxKind.TemplateExpression;
    }

    export function isYieldExpression(node: Node): node is YieldExpression {
        return node.kind === SyntaxKind.YieldExpression;
    }

    export function isSpreadElement(node: Node): node is SpreadElement {
        return node.kind === SyntaxKind.SpreadElement;
    }

    export function isClassExpression(node: Node): node is ClassExpression {
        return node.kind === SyntaxKind.ClassExpression;
    }

    export function isOmittedExpression(node: Node): node is OmittedExpression {
        return node.kind === SyntaxKind.OmittedExpression;
    }

    export function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments {
        return node.kind === SyntaxKind.ExpressionWithTypeArguments;
    }

    export function isAsExpression(node: Node): node is AsExpression {
        return node.kind === SyntaxKind.AsExpression;
    }

    export function isNonNullExpression(node: Node): node is NonNullExpression {
        return node.kind === SyntaxKind.NonNullExpression;
    }

    export function isMetaProperty(node: Node): node is MetaProperty {
        return node.kind === SyntaxKind.MetaProperty;
    }

    // Misc

    export function isTemplateSpan(node: Node): node is TemplateSpan {
        return node.kind === SyntaxKind.TemplateSpan;
    }

    export function isSemicolonClassElement(node: Node): node is SemicolonClassElement {
        return node.kind === SyntaxKind.SemicolonClassElement;
    }

    // Block

    export function isBlock(node: Node): node is Block {
        return node.kind === SyntaxKind.Block;
    }

    export function isVariableStatement(node: Node): node is VariableStatement {
        return node.kind === SyntaxKind.VariableStatement;
    }

    export function isEmptyStatement(node: Node): node is EmptyStatement {
        return node.kind === SyntaxKind.EmptyStatement;
    }

    export function isExpressionStatement(node: Node): node is ExpressionStatement {
        return node.kind === SyntaxKind.ExpressionStatement;
    }

    export function isIfStatement(node: Node): node is IfStatement {
        return node.kind === SyntaxKind.IfStatement;
    }

    export function isDoStatement(node: Node): node is DoStatement {
        return node.kind === SyntaxKind.DoStatement;
    }

    export function isWhileStatement(node: Node): node is WhileStatement {
        return node.kind === SyntaxKind.WhileStatement;
    }

    export function isForStatement(node: Node): node is ForStatement {
        return node.kind === SyntaxKind.ForStatement;
    }

    export function isForInStatement(node: Node): node is ForInStatement {
        return node.kind === SyntaxKind.ForInStatement;
    }

    export function isForOfStatement(node: Node): node is ForOfStatement {
        return node.kind === SyntaxKind.ForOfStatement;
    }

    export function isContinueStatement(node: Node): node is ContinueStatement {
        return node.kind === SyntaxKind.ContinueStatement;
    }

    export function isBreakStatement(node: Node): node is BreakStatement {
        return node.kind === SyntaxKind.BreakStatement;
    }

    export function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement {
        return node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement;
    }

    export function isReturnStatement(node: Node): node is ReturnStatement {
        return node.kind === SyntaxKind.ReturnStatement;
    }

    export function isWithStatement(node: Node): node is WithStatement {
        return node.kind === SyntaxKind.WithStatement;
    }

    export function isSwitchStatement(node: Node): node is SwitchStatement {
        return node.kind === SyntaxKind.SwitchStatement;
    }

    export function isLabeledStatement(node: Node): node is LabeledStatement {
        return node.kind === SyntaxKind.LabeledStatement;
    }

    export function isThrowStatement(node: Node): node is ThrowStatement {
        return node.kind === SyntaxKind.ThrowStatement;
    }

    export function isTryStatement(node: Node): node is TryStatement {
        return node.kind === SyntaxKind.TryStatement;
    }

    export function isDebuggerStatement(node: Node): node is DebuggerStatement {
        return node.kind === SyntaxKind.DebuggerStatement;
    }

    export function isVariableDeclaration(node: Node): node is VariableDeclaration {
        return node.kind === SyntaxKind.VariableDeclaration;
    }

    export function isVariableDeclarationList(node: Node): node is VariableDeclarationList {
        return node.kind === SyntaxKind.VariableDeclarationList;
    }

    export function isFunctionDeclaration(node: Node): node is FunctionDeclaration {
        return node.kind === SyntaxKind.FunctionDeclaration;
    }

    export function isClassDeclaration(node: Node): node is ClassDeclaration {
        return node.kind === SyntaxKind.ClassDeclaration;
    }

    export function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration {
        return node.kind === SyntaxKind.InterfaceDeclaration;
    }

    export function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration {
        return node.kind === SyntaxKind.TypeAliasDeclaration;
    }

    export function isEnumDeclaration(node: Node): node is EnumDeclaration {
        return node.kind === SyntaxKind.EnumDeclaration;
    }

    export function isModuleDeclaration(node: Node): node is ModuleDeclaration {
        return node.kind === SyntaxKind.ModuleDeclaration;
    }

    export function isModuleBlock(node: Node): node is ModuleBlock {
        return node.kind === SyntaxKind.ModuleBlock;
    }

    export function isCaseBlock(node: Node): node is CaseBlock {
        return node.kind === SyntaxKind.CaseBlock;
    }

    export function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration {
        return node.kind === SyntaxKind.NamespaceExportDeclaration;
    }

    export function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration {
        return node.kind === SyntaxKind.ImportEqualsDeclaration;
    }

    export function isImportDeclaration(node: Node): node is ImportDeclaration {
        return node.kind === SyntaxKind.ImportDeclaration;
    }

    export function isImportClause(node: Node): node is ImportClause {
        return node.kind === SyntaxKind.ImportClause;
    }

    export function isNamespaceImport(node: Node): node is NamespaceImport {
        return node.kind === SyntaxKind.NamespaceImport;
    }

    export function isNamedImports(node: Node): node is NamedImports {
        return node.kind === SyntaxKind.NamedImports;
    }

    export function isImportSpecifier(node: Node): node is ImportSpecifier {
        return node.kind === SyntaxKind.ImportSpecifier;
    }

    export function isExportAssignment(node: Node): node is ExportAssignment {
        return node.kind === SyntaxKind.ExportAssignment;
    }

    export function isExportDeclaration(node: Node): node is ExportDeclaration {
        return node.kind === SyntaxKind.ExportDeclaration;
    }

    export function isNamedExports(node: Node): node is NamedExports {
        return node.kind === SyntaxKind.NamedExports;
    }

    export function isExportSpecifier(node: Node): node is ExportSpecifier {
        return node.kind === SyntaxKind.ExportSpecifier;
    }

    export function isMissingDeclaration(node: Node): node is MissingDeclaration {
        return node.kind === SyntaxKind.MissingDeclaration;
    }

    // Module References

    export function isExternalModuleReference(node: Node): node is ExternalModuleReference {
        return node.kind === SyntaxKind.ExternalModuleReference;
    }

    // JSX

    export function isJsxElement(node: Node): node is JsxElement {
        return node.kind === SyntaxKind.JsxElement;
    }

    export function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement {
        return node.kind === SyntaxKind.JsxSelfClosingElement;
    }

    export function isJsxOpeningElement(node: Node): node is JsxOpeningElement {
        return node.kind === SyntaxKind.JsxOpeningElement;
    }

    export function isJsxClosingElement(node: Node): node is JsxClosingElement {
        return node.kind === SyntaxKind.JsxClosingElement;
    }

    export function isJsxFragment(node: Node): node is JsxFragment {
        return node.kind === SyntaxKind.JsxFragment;
    }

    export function isJsxOpeningFragment(node: Node): node is JsxOpeningFragment {
        return node.kind === SyntaxKind.JsxOpeningFragment;
    }

    export function isJsxClosingFragment(node: Node): node is JsxClosingFragment {
        return node.kind === SyntaxKind.JsxClosingFragment;
    }

    export function isJsxAttribute(node: Node): node is JsxAttribute {
        return node.kind === SyntaxKind.JsxAttribute;
    }

    export function isJsxAttributes(node: Node): node is JsxAttributes {
        return node.kind === SyntaxKind.JsxAttributes;
    }

    export function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute {
        return node.kind === SyntaxKind.JsxSpreadAttribute;
    }

    export function isJsxExpression(node: Node): node is JsxExpression {
        return node.kind === SyntaxKind.JsxExpression;
    }

    // Clauses

    export function isCaseClause(node: Node): node is CaseClause {
        return node.kind === SyntaxKind.CaseClause;
    }

    export function isDefaultClause(node: Node): node is DefaultClause {
        return node.kind === SyntaxKind.DefaultClause;
    }

    export function isHeritageClause(node: Node): node is HeritageClause {
        return node.kind === SyntaxKind.HeritageClause;
    }

    export function isCatchClause(node: Node): node is CatchClause {
        return node.kind === SyntaxKind.CatchClause;
    }

    // Property assignments

    export function isPropertyAssignment(node: Node): node is PropertyAssignment {
        return node.kind === SyntaxKind.PropertyAssignment;
    }

    export function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment {
        return node.kind === SyntaxKind.ShorthandPropertyAssignment;
    }

    export function isSpreadAssignment(node: Node): node is SpreadAssignment {
        return node.kind === SyntaxKind.SpreadAssignment;
    }

    // Enum

    export function isEnumMember(node: Node): node is EnumMember {
        return node.kind === SyntaxKind.EnumMember;
    }

    // Top-level nodes
    export function isSourceFile(node: Node): node is SourceFile {
        return node.kind === SyntaxKind.SourceFile;
    }

    export function isBundle(node: Node): node is Bundle {
        return node.kind === SyntaxKind.Bundle;
    }

    export function isUnparsedSource(node: Node): node is UnparsedSource {
        return node.kind === SyntaxKind.UnparsedSource;
    }

    export function isUnparsedPrepend(node: Node): node is UnparsedPrepend {
        return node.kind === SyntaxKind.UnparsedPrepend;
    }

    export function isUnparsedTextLike(node: Node): node is UnparsedTextLike {
        switch (node.kind) {
            case SyntaxKind.UnparsedText:
            case SyntaxKind.UnparsedInternalText:
                return true;
            default:
                return false;
        }
    }

    export function isUnparsedNode(node: Node): node is UnparsedNode {
        return isUnparsedTextLike(node) ||
            node.kind === SyntaxKind.UnparsedPrologue ||
            node.kind === SyntaxKind.UnparsedSyntheticReference;
    }

    // JSDoc

    export function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression {
        return node.kind === SyntaxKind.JSDocTypeExpression;
    }

    export function isJSDocAllType(node: JSDocAllType): node is JSDocAllType {
        return node.kind === SyntaxKind.JSDocAllType;
    }

    export function isJSDocUnknownType(node: Node): node is JSDocUnknownType {
        return node.kind === SyntaxKind.JSDocUnknownType;
    }

    export function isJSDocNullableType(node: Node): node is JSDocNullableType {
        return node.kind === SyntaxKind.JSDocNullableType;
    }

    export function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType {
        return node.kind === SyntaxKind.JSDocNonNullableType;
    }

    export function isJSDocOptionalType(node: Node): node is JSDocOptionalType {
        return node.kind === SyntaxKind.JSDocOptionalType;
    }

    export function isJSDocFunctionType(node: Node): node is JSDocFunctionType {
        return node.kind === SyntaxKind.JSDocFunctionType;
    }

    export function isJSDocVariadicType(node: Node): node is JSDocVariadicType {
        return node.kind === SyntaxKind.JSDocVariadicType;
    }

    export function isJSDoc(node: Node): node is JSDoc {
        return node.kind === SyntaxKind.JSDocComment;
    }

    export function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag {
        return node.kind === SyntaxKind.JSDocAugmentsTag;
    }

    export function isJSDocClassTag(node: Node): node is JSDocClassTag {
        return node.kind === SyntaxKind.JSDocClassTag;
    }

    export function isJSDocEnumTag(node: Node): node is JSDocEnumTag {
        return node.kind === SyntaxKind.JSDocEnumTag;
    }

    export function isJSDocThisTag(node: Node): node is JSDocThisTag {
        return node.kind === SyntaxKind.JSDocThisTag;
    }

    export function isJSDocParameterTag(node: Node): node is JSDocParameterTag {
        return node.kind === SyntaxKind.JSDocParameterTag;
    }

    export function isJSDocReturnTag(node: Node): node is JSDocReturnTag {
        return node.kind === SyntaxKind.JSDocReturnTag;
    }

    export function isJSDocTypeTag(node: Node): node is JSDocTypeTag {
        return node.kind === SyntaxKind.JSDocTypeTag;
    }

    export function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag {
        return node.kind === SyntaxKind.JSDocTemplateTag;
    }

    export function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag {
        return node.kind === SyntaxKind.JSDocTypedefTag;
    }

    export function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag {
        return node.kind === SyntaxKind.JSDocPropertyTag;
    }

    export function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag {
        return node.kind === SyntaxKind.JSDocPropertyTag || node.kind === SyntaxKind.JSDocParameterTag;
    }

    export function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral {
        return node.kind === SyntaxKind.JSDocTypeLiteral;
    }

    export function isJSDocCallbackTag(node: Node): node is JSDocCallbackTag {
        return node.kind === SyntaxKind.JSDocCallbackTag;
    }

    export function isJSDocSignature(node: Node): node is JSDocSignature {
        return node.kind === SyntaxKind.JSDocSignature;
    }
}

// Node tests
//
// All node tests in the following list should *not* reference parent pointers so that
// they may be used with transformations.
namespace ts {
    /* @internal */
    export function isSyntaxList(n: Node): n is SyntaxList {
        return n.kind === SyntaxKind.SyntaxList;
    }

    /* @internal */
    export function isNode(node: Node) {
        return isNodeKind(node.kind);
    }

    /* @internal */
    export function isNodeKind(kind: SyntaxKind) {
        return kind >= SyntaxKind.FirstNode;
    }

    /**
     * True if node is of some token syntax kind.
     * For example, this is true for an IfKeyword but not for an IfStatement.
     * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
     */
    export function isToken(n: Node): boolean {
        return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
    }

    // Node Arrays

    /* @internal */
    export function isNodeArray<T extends Node>(array: ReadonlyArray<T>): array is NodeArray<T> {
        return array.hasOwnProperty("pos") && array.hasOwnProperty("end");
    }

    // Literals

    /* @internal */
    export function isLiteralKind(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstLiteralToken <= kind && kind <= SyntaxKind.LastLiteralToken;
    }

    export function isLiteralExpression(node: Node): node is LiteralExpression {
        return isLiteralKind(node.kind);
    }

    // Pseudo-literals

    /* @internal */
    export function isTemplateLiteralKind(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstTemplateToken <= kind && kind <= SyntaxKind.LastTemplateToken;
    }

    export type TemplateLiteralToken = NoSubstitutionTemplateLiteral | TemplateHead | TemplateMiddle | TemplateTail;
    export function isTemplateLiteralToken(node: Node): node is TemplateLiteralToken {
        return isTemplateLiteralKind(node.kind);
    }

    export function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail {
        const kind = node.kind;
        return kind === SyntaxKind.TemplateMiddle
            || kind === SyntaxKind.TemplateTail;
    }

    export function isImportOrExportSpecifier(node: Node): node is ImportSpecifier | ExportSpecifier {
        return isImportSpecifier(node) || isExportSpecifier(node);
    }

    export function isStringTextContainingNode(node: Node): node is StringLiteral | TemplateLiteralToken {
        return node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind);
    }

    // Identifiers

    /* @internal */
    export function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier {
        return isIdentifier(node) && (node.autoGenerateFlags! & GeneratedIdentifierFlags.KindMask) > GeneratedIdentifierFlags.None;
    }

    // Keywords

    /* @internal */
    export function isModifierKind(token: SyntaxKind): token is Modifier["kind"] {
        switch (token) {
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.DefaultKeyword:
            case SyntaxKind.ExportKeyword:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.ReadonlyKeyword:
            case SyntaxKind.StaticKeyword:
                return true;
        }
        return false;
    }

    /* @internal */
    export function isParameterPropertyModifier(kind: SyntaxKind): boolean {
        return !!(modifierToFlag(kind) & ModifierFlags.ParameterPropertyModifier);
    }

    /* @internal */
    export function isClassMemberModifier(idToken: SyntaxKind): boolean {
        return isParameterPropertyModifier(idToken) || idToken === SyntaxKind.StaticKeyword;
    }

    export function isModifier(node: Node): node is Modifier {
        return isModifierKind(node.kind);
    }

    export function isEntityName(node: Node): node is EntityName {
        const kind = node.kind;
        return kind === SyntaxKind.QualifiedName
            || kind === SyntaxKind.Identifier;
    }

    export function isPropertyName(node: Node): node is PropertyName {
        const kind = node.kind;
        return kind === SyntaxKind.Identifier
            || kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.NumericLiteral
            || kind === SyntaxKind.ComputedPropertyName;
    }

    export function isBindingName(node: Node): node is BindingName {
        const kind = node.kind;
        return kind === SyntaxKind.Identifier
            || kind === SyntaxKind.ObjectBindingPattern
            || kind === SyntaxKind.ArrayBindingPattern;
    }

    // Functions

    export function isFunctionLike(node: Node): node is SignatureDeclaration {
        return node && isFunctionLikeKind(node.kind);
    }

    /* @internal */
    export function isFunctionLikeDeclaration(node: Node): node is FunctionLikeDeclaration {
        return node && isFunctionLikeDeclarationKind(node.kind);
    }

    function isFunctionLikeDeclarationKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return true;
            default:
                return false;
        }
    }

    /* @internal */
    export function isFunctionLikeKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.JSDocSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.ConstructorType:
                return true;
            default:
                return isFunctionLikeDeclarationKind(kind);
        }
    }

    /* @internal */
    export function isFunctionOrModuleBlock(node: Node): boolean {
        return isSourceFile(node) || isModuleBlock(node) || isBlock(node) && isFunctionLike(node.parent);
    }

    // Classes
    export function isClassElement(node: Node): node is ClassElement {
        const kind = node.kind;
        return kind === SyntaxKind.Constructor
            || kind === SyntaxKind.PropertyDeclaration
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor
            || kind === SyntaxKind.IndexSignature
            || kind === SyntaxKind.SemicolonClassElement;
    }

    export function isClassLike(node: Node): node is ClassLikeDeclaration {
        return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
    }

    export function isAccessor(node: Node): node is AccessorDeclaration {
        return node && (node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor);
    }

    /* @internal */
    export function isMethodOrAccessor(node: Node): node is MethodDeclaration | AccessorDeclaration {
        switch (node.kind) {
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    // Type members

    export function isTypeElement(node: Node): node is TypeElement {
        const kind = node.kind;
        return kind === SyntaxKind.ConstructSignature
            || kind === SyntaxKind.CallSignature
            || kind === SyntaxKind.PropertySignature
            || kind === SyntaxKind.MethodSignature
            || kind === SyntaxKind.IndexSignature;
    }

    export function isClassOrTypeElement(node: Node): node is ClassElement | TypeElement {
        return isTypeElement(node) || isClassElement(node);
    }

    export function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAssignment
            || kind === SyntaxKind.ShorthandPropertyAssignment
            || kind === SyntaxKind.SpreadAssignment
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor;
    }

    // Type

    /**
     * Node test that determines whether a node is a valid type node.
     * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
     * of a TypeNode.
     */
    export function isTypeNode(node: Node): node is TypeNode {
        return isTypeNodeKind(node.kind);
    }

    export function isFunctionOrConstructorTypeNode(node: Node): node is FunctionTypeNode | ConstructorTypeNode {
        switch (node.kind) {
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return true;
        }

        return false;
    }

    // Binding patterns

    /* @internal */
    export function isBindingPattern(node: Node | undefined): node is BindingPattern {
        if (node) {
            const kind = node.kind;
            return kind === SyntaxKind.ArrayBindingPattern
                || kind === SyntaxKind.ObjectBindingPattern;
        }

        return false;
    }

    /* @internal */
    export function isAssignmentPattern(node: Node): node is AssignmentPattern {
        const kind = node.kind;
        return kind === SyntaxKind.ArrayLiteralExpression
            || kind === SyntaxKind.ObjectLiteralExpression;
    }


    /* @internal */
    export function isArrayBindingElement(node: Node): node is ArrayBindingElement {
        const kind = node.kind;
        return kind === SyntaxKind.BindingElement
            || kind === SyntaxKind.OmittedExpression;
    }


    /**
     * Determines whether the BindingOrAssignmentElement is a BindingElement-like declaration
     */
    /* @internal */
    export function isDeclarationBindingElement(bindingElement: BindingOrAssignmentElement): bindingElement is VariableDeclaration | ParameterDeclaration | BindingElement {
        switch (bindingElement.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                return true;
        }

        return false;
    }

    /**
     * Determines whether a node is a BindingOrAssignmentPattern
     */
    /* @internal */
    export function isBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is BindingOrAssignmentPattern {
        return isObjectBindingOrAssignmentPattern(node)
            || isArrayBindingOrAssignmentPattern(node);
    }

    /**
     * Determines whether a node is an ObjectBindingOrAssignmentPattern
     */
    /* @internal */
    export function isObjectBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ObjectBindingOrAssignmentPattern {
        switch (node.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ObjectLiteralExpression:
                return true;
        }

        return false;
    }

    /**
     * Determines whether a node is an ArrayBindingOrAssignmentPattern
     */
    /* @internal */
    export function isArrayBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ArrayBindingOrAssignmentPattern {
        switch (node.kind) {
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                return true;
        }

        return false;
    }

    /* @internal */
    export function isPropertyAccessOrQualifiedNameOrImportTypeNode(node: Node): node is PropertyAccessExpression | QualifiedName | ImportTypeNode {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.QualifiedName
            || kind === SyntaxKind.ImportType;
    }

    // Expression

    export function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.QualifiedName;
    }

    export function isCallLikeExpression(node: Node): node is CallLikeExpression {
        switch (node.kind) {
            case SyntaxKind.JsxOpeningElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.Decorator:
                return true;
            default:
                return false;
        }
    }

    export function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression {
        return node.kind === SyntaxKind.CallExpression || node.kind === SyntaxKind.NewExpression;
    }

    export function isTemplateLiteral(node: Node): node is TemplateLiteral {
        const kind = node.kind;
        return kind === SyntaxKind.TemplateExpression
            || kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    /* @internal */
    export function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression {
        return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.CallExpression:
            case SyntaxKind.JsxElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxFragment:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Identifier:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NonNullExpression:
            case SyntaxKind.MetaProperty:
            case SyntaxKind.ImportKeyword: // technically this is only an Expression if it's in a CallExpression
                return true;
            default:
                return false;
        }
    }

    /* @internal */
    export function isUnaryExpression(node: Node): node is UnaryExpression {
        return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isUnaryExpressionKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.TypeAssertionExpression:
                return true;
            default:
                return isLeftHandSideExpressionKind(kind);
        }
    }

    /* @internal */
    export function isUnaryExpressionWithWrite(expr: Node): expr is PrefixUnaryExpression | PostfixUnaryExpression {
        switch (expr.kind) {
            case SyntaxKind.PostfixUnaryExpression:
                return true;
            case SyntaxKind.PrefixUnaryExpression:
                return (<PrefixUnaryExpression>expr).operator === SyntaxKind.PlusPlusToken ||
                    (<PrefixUnaryExpression>expr).operator === SyntaxKind.MinusMinusToken;
            default:
                return false;
        }
    }

    /* @internal */
    /**
     * Determines whether a node is an expression based only on its kind.
     * Use `isExpressionNode` if not in transforms.
     */
    export function isExpression(node: Node): node is Expression {
        return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isExpressionKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.SpreadElement:
            case SyntaxKind.AsExpression:
            case SyntaxKind.OmittedExpression:
            case SyntaxKind.CommaListExpression:
            case SyntaxKind.PartiallyEmittedExpression:
                return true;
            default:
                return isUnaryExpressionKind(kind);
        }
    }

    export function isAssertionExpression(node: Node): node is AssertionExpression {
        const kind = node.kind;
        return kind === SyntaxKind.TypeAssertionExpression
            || kind === SyntaxKind.AsExpression;
    }

    /* @internal */
    export function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression {
        return node.kind === SyntaxKind.PartiallyEmittedExpression;
    }

    /* @internal */
    export function isNotEmittedStatement(node: Node): node is NotEmittedStatement {
        return node.kind === SyntaxKind.NotEmittedStatement;
    }

    /* @internal */
    export function isNotEmittedOrPartiallyEmittedNode(node: Node): node is NotEmittedStatement | PartiallyEmittedExpression {
        return isNotEmittedStatement(node)
            || isPartiallyEmittedExpression(node);
    }

    // Statement

    export function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
    export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement | LabeledStatement;
    export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement {
        switch (node.kind) {
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
                return true;
            case SyntaxKind.LabeledStatement:
                return lookInLabeledStatements && isIterationStatement((<LabeledStatement>node).statement, lookInLabeledStatements);
        }

        return false;
    }

    /* @internal */
    export function isForInOrOfStatement(node: Node): node is ForInOrOfStatement {
        return node.kind === SyntaxKind.ForInStatement || node.kind === SyntaxKind.ForOfStatement;
    }

    // Element

    /* @internal */
    export function isConciseBody(node: Node): node is ConciseBody {
        return isBlock(node)
            || isExpression(node);
    }

    /* @internal */
    export function isFunctionBody(node: Node): node is FunctionBody {
        return isBlock(node);
    }

    /* @internal */
    export function isForInitializer(node: Node): node is ForInitializer {
        return isVariableDeclarationList(node)
            || isExpression(node);
    }

    /* @internal */
    export function isModuleBody(node: Node): node is ModuleBody {
        const kind = node.kind;
        return kind === SyntaxKind.ModuleBlock
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.Identifier;
    }

    /* @internal */
    export function isNamespaceBody(node: Node): node is NamespaceBody {
        const kind = node.kind;
        return kind === SyntaxKind.ModuleBlock
            || kind === SyntaxKind.ModuleDeclaration;
    }

    /* @internal */
    export function isJSDocNamespaceBody(node: Node): node is JSDocNamespaceBody {
        const kind = node.kind;
        return kind === SyntaxKind.Identifier
            || kind === SyntaxKind.ModuleDeclaration;
    }

    /* @internal */
    export function isNamedImportBindings(node: Node): node is NamedImportBindings {
        const kind = node.kind;
        return kind === SyntaxKind.NamedImports
            || kind === SyntaxKind.NamespaceImport;
    }

    /* @internal */
    export function isModuleOrEnumDeclaration(node: Node): node is ModuleDeclaration | EnumDeclaration {
        return node.kind === SyntaxKind.ModuleDeclaration || node.kind === SyntaxKind.EnumDeclaration;
    }

    function isDeclarationKind(kind: SyntaxKind) {
        return kind === SyntaxKind.ArrowFunction
            || kind === SyntaxKind.BindingElement
            || kind === SyntaxKind.ClassDeclaration
            || kind === SyntaxKind.ClassExpression
            || kind === SyntaxKind.Constructor
            || kind === SyntaxKind.EnumDeclaration
            || kind === SyntaxKind.EnumMember
            || kind === SyntaxKind.ExportSpecifier
            || kind === SyntaxKind.FunctionDeclaration
            || kind === SyntaxKind.FunctionExpression
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.ImportClause
            || kind === SyntaxKind.ImportEqualsDeclaration
            || kind === SyntaxKind.ImportSpecifier
            || kind === SyntaxKind.InterfaceDeclaration
            || kind === SyntaxKind.JsxAttribute
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.MethodSignature
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.NamespaceExportDeclaration
            || kind === SyntaxKind.NamespaceImport
            || kind === SyntaxKind.Parameter
            || kind === SyntaxKind.PropertyAssignment
            || kind === SyntaxKind.PropertyDeclaration
            || kind === SyntaxKind.PropertySignature
            || kind === SyntaxKind.SetAccessor
            || kind === SyntaxKind.ShorthandPropertyAssignment
            || kind === SyntaxKind.TypeAliasDeclaration
            || kind === SyntaxKind.TypeParameter
            || kind === SyntaxKind.VariableDeclaration
            || kind === SyntaxKind.JSDocTypedefTag
            || kind === SyntaxKind.JSDocCallbackTag
            || kind === SyntaxKind.JSDocPropertyTag;
    }

    function isDeclarationStatementKind(kind: SyntaxKind) {
        return kind === SyntaxKind.FunctionDeclaration
            || kind === SyntaxKind.MissingDeclaration
            || kind === SyntaxKind.ClassDeclaration
            || kind === SyntaxKind.InterfaceDeclaration
            || kind === SyntaxKind.TypeAliasDeclaration
            || kind === SyntaxKind.EnumDeclaration
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.ImportDeclaration
            || kind === SyntaxKind.ImportEqualsDeclaration
            || kind === SyntaxKind.ExportDeclaration
            || kind === SyntaxKind.ExportAssignment
            || kind === SyntaxKind.NamespaceExportDeclaration;
    }

    function isStatementKindButNotDeclarationKind(kind: SyntaxKind) {
        return kind === SyntaxKind.BreakStatement
            || kind === SyntaxKind.ContinueStatement
            || kind === SyntaxKind.DebuggerStatement
            || kind === SyntaxKind.DoStatement
            || kind === SyntaxKind.ExpressionStatement
            || kind === SyntaxKind.EmptyStatement
            || kind === SyntaxKind.ForInStatement
            || kind === SyntaxKind.ForOfStatement
            || kind === SyntaxKind.ForStatement
            || kind === SyntaxKind.IfStatement
            || kind === SyntaxKind.LabeledStatement
            || kind === SyntaxKind.ReturnStatement
            || kind === SyntaxKind.SwitchStatement
            || kind === SyntaxKind.ThrowStatement
            || kind === SyntaxKind.TryStatement
            || kind === SyntaxKind.VariableStatement
            || kind === SyntaxKind.WhileStatement
            || kind === SyntaxKind.WithStatement
            || kind === SyntaxKind.NotEmittedStatement
            || kind === SyntaxKind.EndOfDeclarationMarker
            || kind === SyntaxKind.MergeDeclarationMarker;
    }

    /* @internal */
    export function isDeclaration(node: Node): node is NamedDeclaration {
        if (node.kind === SyntaxKind.TypeParameter) {
            return (node.parent && node.parent.kind !== SyntaxKind.JSDocTemplateTag) || isInJSFile(node);
        }

        return isDeclarationKind(node.kind);
    }

    /* @internal */
    export function isDeclarationStatement(node: Node): node is DeclarationStatement {
        return isDeclarationStatementKind(node.kind);
    }

    /**
     * Determines whether the node is a statement that is not also a declaration
     */
    /* @internal */
    export function isStatementButNotDeclaration(node: Node): node is Statement {
        return isStatementKindButNotDeclarationKind(node.kind);
    }

    /* @internal */
    export function isStatement(node: Node): node is Statement {
        const kind = node.kind;
        return isStatementKindButNotDeclarationKind(kind)
            || isDeclarationStatementKind(kind)
            || isBlockStatement(node);
    }

    function isBlockStatement(node: Node): node is Block {
        if (node.kind !== SyntaxKind.Block) return false;
        if (node.parent !== undefined) {
            if (node.parent.kind === SyntaxKind.TryStatement || node.parent.kind === SyntaxKind.CatchClause) {
                return false;
            }
        }
        return !isFunctionBlock(node);
    }

    // Module references

    /* @internal */
    export function isModuleReference(node: Node): node is ModuleReference {
        const kind = node.kind;
        return kind === SyntaxKind.ExternalModuleReference
            || kind === SyntaxKind.QualifiedName
            || kind === SyntaxKind.Identifier;
    }

    // JSX

    /* @internal */
    export function isJsxTagNameExpression(node: Node): node is JsxTagNameExpression {
        const kind = node.kind;
        return kind === SyntaxKind.ThisKeyword
            || kind === SyntaxKind.Identifier
            || kind === SyntaxKind.PropertyAccessExpression;
    }

    /* @internal */
    export function isJsxChild(node: Node): node is JsxChild {
        const kind = node.kind;
        return kind === SyntaxKind.JsxElement
            || kind === SyntaxKind.JsxExpression
            || kind === SyntaxKind.JsxSelfClosingElement
            || kind === SyntaxKind.JsxText
            || kind === SyntaxKind.JsxFragment;
    }

    /* @internal */
    export function isJsxAttributeLike(node: Node): node is JsxAttributeLike {
        const kind = node.kind;
        return kind === SyntaxKind.JsxAttribute
            || kind === SyntaxKind.JsxSpreadAttribute;
    }

    /* @internal */
    export function isStringLiteralOrJsxExpression(node: Node): node is StringLiteral | JsxExpression {
        const kind = node.kind;
        return kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.JsxExpression;
    }

    export function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement {
        const kind = node.kind;
        return kind === SyntaxKind.JsxOpeningElement
            || kind === SyntaxKind.JsxSelfClosingElement;
    }

    // Clauses

    export function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause {
        const kind = node.kind;
        return kind === SyntaxKind.CaseClause
            || kind === SyntaxKind.DefaultClause;
    }

    // JSDoc

    /** True if node is of some JSDoc syntax kind. */
    /* @internal */
    export function isJSDocNode(node: Node): boolean {
        return node.kind >= SyntaxKind.FirstJSDocNode && node.kind <= SyntaxKind.LastJSDocNode;
    }

    /** True if node is of a kind that may contain comment text. */
    export function isJSDocCommentContainingNode(node: Node): boolean {
        return node.kind === SyntaxKind.JSDocComment || isJSDocTag(node) || isJSDocTypeLiteral(node) || isJSDocSignature(node);
    }

    // TODO: determine what this does before making it public.
    /* @internal */
    export function isJSDocTag(node: Node): node is JSDocTag {
        return node.kind >= SyntaxKind.FirstJSDocTagNode && node.kind <= SyntaxKind.LastJSDocTagNode;
    }

    export function isSetAccessor(node: Node): node is SetAccessorDeclaration {
        return node.kind === SyntaxKind.SetAccessor;
    }

    export function isGetAccessor(node: Node): node is GetAccessorDeclaration {
        return node.kind === SyntaxKind.GetAccessor;
    }

    /** True if has jsdoc nodes attached to it. */
    /* @internal */
    // TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
    export function hasJSDocNodes(node: Node): node is HasJSDoc {
        const { jsDoc } = node as JSDocContainer;
        return !!jsDoc && jsDoc.length > 0;
    }

    /** True if has type node attached to it. */
    /* @internal */
    export function hasType(node: Node): node is HasType {
        return !!(node as HasType).type;
    }

    /** True if has initializer node attached to it. */
    /* @internal */
    export function hasInitializer(node: Node): node is HasInitializer {
        return !!(node as HasInitializer).initializer;
    }

    /** True if has initializer node attached to it. */
    /* @internal */
    export function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer {
        return hasInitializer(node) && !isForStatement(node) && !isForInStatement(node) && !isForOfStatement(node) && !isJsxAttribute(node);
    }

    export function isObjectLiteralElement(node: Node): node is ObjectLiteralElement {
        return node.kind === SyntaxKind.JsxAttribute || node.kind === SyntaxKind.JsxSpreadAttribute || isObjectLiteralElementLike(node);
    }

    /* @internal */
    export function isTypeReferenceType(node: Node): node is TypeReferenceType {
        return node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.ExpressionWithTypeArguments;
    }

    const MAX_SMI_X86 = 0x3fff_ffff;
    /* @internal */
    export function guessIndentation(lines: string[]) {
        let indentation = MAX_SMI_X86;
        for (const line of lines) {
            if (!line.length) {
                continue;
            }
            let i = 0;
            for (; i < line.length && i < indentation; i++) {
                if (!isWhiteSpaceLike(line.charCodeAt(i))) {
                    break;
                }
            }
            if (i < indentation) {
                indentation = i;
            }
            if (indentation === 0) {
                return 0;
            }
        }
        return indentation === MAX_SMI_X86 ? undefined : indentation;
    }

    export function isStringLiteralLike(node: Node): node is StringLiteralLike {
        return node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }
}


/* @internal */
namespace ts {
    export function isNamedImportsOrExports(node: Node): node is NamedImportsOrExports {
        return node.kind === SyntaxKind.NamedImports || node.kind === SyntaxKind.NamedExports;
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos?: number, end?: number) => Token<TKind>;
        getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos?: number, end?: number) => Identifier;
        getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: __String) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
        getSourceMapSourceConstructor(): new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;
    }

    function Symbol(this: Symbol, flags: SymbolFlags, name: __String) {
        this.flags = flags;
        this.escapedName = name;
        this.declarations = undefined!;
        this.valueDeclaration = undefined!;
        this.id = undefined;
        this.mergeId = undefined;
        this.parent = undefined;
    }

    function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
        if (Debug.isDebugging) {
            this.checker = checker;
        }
    }

    function Signature() {} // tslint:disable-line no-empty

    function Node(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.pos = pos;
        this.end = end;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.original = undefined;
    }

    function SourceMapSource(this: SourceMapSource, fileName: string, text: string, skipTrivia?: (pos: number) => number) {
        this.fileName = fileName;
        this.text = text;
        this.skipTrivia = skipTrivia || (pos => pos);
    }

    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getTokenConstructor: () => <any>Node,
        getIdentifierConstructor: () => <any>Node,
        getSourceFileConstructor: () => <any>Node,
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature,
        getSourceMapSourceConstructor: () => <any>SourceMapSource,
    };

    export function formatStringFromArgs(text: string, args: ArrayLike<string | number>, baseIndex = 0): string {
        return text.replace(/{(\d+)}/g, (_match, index: string) => "" + Debug.assertDefined(args[+index + baseIndex]));
    }

    export let localizedDiagnosticMessages: MapLike<string> | undefined;

    export function getLocaleSpecificMessage(message: DiagnosticMessage) {
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
    }

    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: (string | number | undefined)[]): DiagnosticWithLocation;
    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): DiagnosticWithLocation {
        Debug.assertGreaterThanOrEqual(start, 0);
        Debug.assertGreaterThanOrEqual(length, 0);

        if (file) {
            Debug.assertLessThanOrEqual(start, file.text.length);
            Debug.assertLessThanOrEqual(start + length, file.text.length);
        }

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
        };
    }

    export function formatMessage(_dummy: any, message: DiagnosticMessage, ...args: (string | number | undefined)[]): string;
    export function formatMessage(_dummy: any, message: DiagnosticMessage): string {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return text;
    }

    export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: (string | number | undefined)[]): Diagnostic;
    export function createCompilerDiagnostic(message: DiagnosticMessage): Diagnostic {
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
        };
    }

    export function createCompilerDiagnosticFromMessageChain(chain: DiagnosticMessageChain): Diagnostic {
        return {
            file: undefined,
            start: undefined,
            length: undefined,

            code: chain.code,
            category: chain.category,
            messageText: chain.next ? chain : chain.messageText,
        };
    }

    export function chainDiagnosticMessages(details: DiagnosticMessageChain | undefined, message: DiagnosticMessage, ...args: (string | number | undefined)[]): DiagnosticMessageChain;
    export function chainDiagnosticMessages(details: DiagnosticMessageChain | undefined, message: DiagnosticMessage): DiagnosticMessageChain {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return {
            messageText: text,
            category: message.category,
            code: message.code,

            next: details
        };
    }

    export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain {
        let lastChain = headChain;
        while (lastChain.next) {
            lastChain = lastChain.next;
        }

        lastChain.next = tailChain;
        return headChain;
    }

    function getDiagnosticFilePath(diagnostic: Diagnostic): string | undefined {
        return diagnostic.file ? diagnostic.file.path : undefined;
    }

    export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
        return compareDiagnosticsSkipRelatedInformation(d1, d2) ||
            compareRelatedInformation(d1, d2) ||
            Comparison.EqualTo;
    }

    export function compareDiagnosticsSkipRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
        return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareMessageText(d1.messageText, d2.messageText) ||
            Comparison.EqualTo;
    }

    function compareRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
        if (!d1.relatedInformation && !d2.relatedInformation) {
            return Comparison.EqualTo;
        }
        if (d1.relatedInformation && d2.relatedInformation) {
            return compareValues(d1.relatedInformation.length, d2.relatedInformation.length) || forEach(d1.relatedInformation, (d1i, index) => {
                const d2i = d2.relatedInformation![index];
                return compareDiagnostics(d1i, d2i); // EqualTo is 0, so falsy, and will cause the next item to be compared
            }) || Comparison.EqualTo;
        }
        return d1.relatedInformation ? Comparison.LessThan : Comparison.GreaterThan;
    }

    function compareMessageText(t1: string | DiagnosticMessageChain, t2: string | DiagnosticMessageChain): Comparison {
        let text1: string | DiagnosticMessageChain | undefined = t1;
        let text2: string | DiagnosticMessageChain | undefined = t2;
        while (text1 && text2) {
            // We still have both chains.
            const string1 = isString(text1) ? text1 : text1.messageText;
            const string2 = isString(text2) ? text2 : text2.messageText;

            const res = compareStringsCaseSensitive(string1, string2);
            if (res) {
                return res;
            }

            text1 = isString(text1) ? undefined : text1.next;
            text2 = isString(text2) ? undefined : text2.next;
        }

        if (!text1 && !text2) {
            // if the chains are done, then these messages are the same.
            return Comparison.EqualTo;
        }

        // We still have one chain remaining.  The shorter chain should come first.
        return text1 ? Comparison.GreaterThan : Comparison.LessThan;
    }

    export function getEmitScriptTarget(compilerOptions: CompilerOptions) {
        return compilerOptions.target || ScriptTarget.ES3;
    }

    export function getEmitModuleKind(compilerOptions: {module?: CompilerOptions["module"], target?: CompilerOptions["target"]}) {
        return typeof compilerOptions.module === "number" ?
            compilerOptions.module :
            getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2015 ? ModuleKind.ES2015 : ModuleKind.CommonJS;
    }

    export function getEmitModuleResolutionKind(compilerOptions: CompilerOptions) {
        let moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            moduleResolution = getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;
        }
        return moduleResolution;
    }

    export function hasJsonModuleEmitEnabled(options: CompilerOptions) {
        switch (getEmitModuleKind(options)) {
            case ModuleKind.CommonJS:
            case ModuleKind.AMD:
            case ModuleKind.ES2015:
            case ModuleKind.ESNext:
                return true;
            default:
                return false;
        }
    }

    export function unreachableCodeIsError(options: CompilerOptions): boolean {
        return options.allowUnreachableCode === false;
    }

    export function unusedLabelIsError(options: CompilerOptions): boolean {
        return options.allowUnusedLabels === false;
    }

    export function getAreDeclarationMapsEnabled(options: CompilerOptions) {
        return !!(getEmitDeclarations(options) && options.declarationMap);
    }

    export function getAllowSyntheticDefaultImports(compilerOptions: CompilerOptions) {
        const moduleKind = getEmitModuleKind(compilerOptions);
        return compilerOptions.allowSyntheticDefaultImports !== undefined
            ? compilerOptions.allowSyntheticDefaultImports
            : compilerOptions.esModuleInterop ||
            moduleKind === ModuleKind.System;
    }

    export function getEmitDeclarations(compilerOptions: CompilerOptions): boolean {
        return !!(compilerOptions.declaration || compilerOptions.composite);
    }

    export function isIncrementalCompilation(options: CompilerOptions) {
        return !!(options.incremental || options.composite);
    }

    export type StrictOptionName = "noImplicitAny" | "noImplicitThis" | "strictNullChecks" | "strictFunctionTypes" | "strictBindCallApply" | "strictPropertyInitialization" | "alwaysStrict";

    export function getStrictOptionValue(compilerOptions: CompilerOptions, flag: StrictOptionName): boolean {
        return compilerOptions[flag] === undefined ? !!compilerOptions.strict : !!compilerOptions[flag];
    }

    export function compilerOptionsAffectSemanticDiagnostics(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
        return oldOptions !== newOptions &&
            semanticDiagnosticsOptionDeclarations.some(option => !isJsonEqual(getCompilerOptionValue(oldOptions, option), getCompilerOptionValue(newOptions, option)));
    }

    export function compilerOptionsAffectEmit(newOptions: CompilerOptions, oldOptions: CompilerOptions): boolean {
        return oldOptions !== newOptions &&
            affectsEmitOptionDeclarations.some(option => !isJsonEqual(getCompilerOptionValue(oldOptions, option), getCompilerOptionValue(newOptions, option)));
    }

    export function getCompilerOptionValue(options: CompilerOptions, option: CommandLineOption): unknown {
        return option.strictFlag ? getStrictOptionValue(options, option.name as StrictOptionName) : options[option.name];
    }

    export function hasZeroOrOneAsteriskCharacter(str: string): boolean {
        let seenAsterisk = false;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) === CharacterCodes.asterisk) {
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

    /**
     * Internally, we represent paths as strings with '/' as the directory separator.
     * When we make system calls (eg: LanguageServiceHost.getDirectory()),
     * we expect the host to correctly handle paths in our specified format.
     */
    export const directorySeparator = "/";
    const altDirectorySeparator = "\\";
    const urlSchemeSeparator = "://";
    const backslashRegExp = /\\/g;

    /**
     * Normalize path separators.
     */
    export function normalizeSlashes(path: string): string {
        return path.replace(backslashRegExp, directorySeparator);
    }

    function isVolumeCharacter(charCode: number) {
        return (charCode >= CharacterCodes.a && charCode <= CharacterCodes.z) ||
            (charCode >= CharacterCodes.A && charCode <= CharacterCodes.Z);
    }

    function getFileUrlVolumeSeparatorEnd(url: string, start: number) {
        const ch0 = url.charCodeAt(start);
        if (ch0 === CharacterCodes.colon) return start + 1;
        if (ch0 === CharacterCodes.percent && url.charCodeAt(start + 1) === CharacterCodes._3) {
            const ch2 = url.charCodeAt(start + 2);
            if (ch2 === CharacterCodes.a || ch2 === CharacterCodes.A) return start + 3;
        }
        return -1;
    }

    /**
     * Returns length of the root part of a path or URL (i.e. length of "/", "x:/", "//server/share/, file:///user/files").
     * If the root is part of a URL, the twos-complement of the root length is returned.
     */
    function getEncodedRootLength(path: string): number {
        if (!path) return 0;
        const ch0 = path.charCodeAt(0);

        // POSIX or UNC
        if (ch0 === CharacterCodes.slash || ch0 === CharacterCodes.backslash) {
            if (path.charCodeAt(1) !== ch0) return 1; // POSIX: "/" (or non-normalized "\")

            const p1 = path.indexOf(ch0 === CharacterCodes.slash ? directorySeparator : altDirectorySeparator, 2);
            if (p1 < 0) return path.length; // UNC: "//server" or "\\server"

            return p1 + 1; // UNC: "//server/" or "\\server\"
        }

        // DOS
        if (isVolumeCharacter(ch0) && path.charCodeAt(1) === CharacterCodes.colon) {
            const ch2 = path.charCodeAt(2);
            if (ch2 === CharacterCodes.slash || ch2 === CharacterCodes.backslash) return 3; // DOS: "c:/" or "c:\"
            if (path.length === 2) return 2; // DOS: "c:" (but not "c:d")
        }

        // URL
        const schemeEnd = path.indexOf(urlSchemeSeparator);
        if (schemeEnd !== -1) {
            const authorityStart = schemeEnd + urlSchemeSeparator.length;
            const authorityEnd = path.indexOf(directorySeparator, authorityStart);
            if (authorityEnd !== -1) { // URL: "file:///", "file://server/", "file://server/path"
                // For local "file" URLs, include the leading DOS volume (if present).
                // Per https://www.ietf.org/rfc/rfc1738.txt, a host of "" or "localhost" is a
                // special case interpreted as "the machine from which the URL is being interpreted".
                const scheme = path.slice(0, schemeEnd);
                const authority = path.slice(authorityStart, authorityEnd);
                if (scheme === "file" && (authority === "" || authority === "localhost") &&
                    isVolumeCharacter(path.charCodeAt(authorityEnd + 1))) {
                    const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
                    if (volumeSeparatorEnd !== -1) {
                        if (path.charCodeAt(volumeSeparatorEnd) === CharacterCodes.slash) {
                            // URL: "file:///c:/", "file://localhost/c:/", "file:///c%3a/", "file://localhost/c%3a/"
                            return ~(volumeSeparatorEnd + 1);
                        }
                        if (volumeSeparatorEnd === path.length) {
                            // URL: "file:///c:", "file://localhost/c:", "file:///c$3a", "file://localhost/c%3a"
                            // but not "file:///c:d" or "file:///c%3ad"
                            return ~volumeSeparatorEnd;
                        }
                    }
                }
                return ~(authorityEnd + 1); // URL: "file://server/", "http://server/"
            }
            return ~path.length; // URL: "file://server", "http://server"
        }

        // relative
        return 0;
    }

    /**
     * Returns length of the root part of a path or URL (i.e. length of "/", "x:/", "//server/share/, file:///user/files").
     *
     * For example:
     * ```ts
     * getRootLength("a") === 0                   // ""
     * getRootLength("/") === 1                   // "/"
     * getRootLength("c:") === 2                  // "c:"
     * getRootLength("c:d") === 0                 // ""
     * getRootLength("c:/") === 3                 // "c:/"
     * getRootLength("c:\\") === 3                // "c:\\"
     * getRootLength("//server") === 7            // "//server"
     * getRootLength("//server/share") === 8      // "//server/"
     * getRootLength("\\\\server") === 7          // "\\\\server"
     * getRootLength("\\\\server\\share") === 8   // "\\\\server\\"
     * getRootLength("file:///path") === 8        // "file:///"
     * getRootLength("file:///c:") === 10         // "file:///c:"
     * getRootLength("file:///c:d") === 8         // "file:///"
     * getRootLength("file:///c:/path") === 11    // "file:///c:/"
     * getRootLength("file://server") === 13      // "file://server"
     * getRootLength("file://server/path") === 14 // "file://server/"
     * getRootLength("http://server") === 13      // "http://server"
     * getRootLength("http://server/path") === 14 // "http://server/"
     * ```
     */
    export function getRootLength(path: string) {
        const rootLength = getEncodedRootLength(path);
        return rootLength < 0 ? ~rootLength : rootLength;
    }

    // TODO(rbuckton): replace references with `resolvePath`
    export function normalizePath(path: string): string {
        return resolvePath(path);
    }

    export function normalizePathAndParts(path: string): { path: string, parts: string[] } {
        path = normalizeSlashes(path);
        const [root, ...parts] = reducePathComponents(getPathComponents(path));
        if (parts.length) {
            const joinedParts = root + parts.join(directorySeparator);
            return { path: hasTrailingDirectorySeparator(path) ? ensureTrailingDirectorySeparator(joinedParts) : joinedParts, parts };
        }
        else {
            return { path: root, parts };
        }
    }

    /**
     * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
     * except that we support URL's as well.
     *
     * ```ts
     * getDirectoryPath("/path/to/file.ext") === "/path/to"
     * getDirectoryPath("/path/to/") === "/path"
     * getDirectoryPath("/") === "/"
     * ```
     */
    export function getDirectoryPath(path: Path): Path;
    /**
     * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
     * except that we support URL's as well.
     *
     * ```ts
     * getDirectoryPath("/path/to/file.ext") === "/path/to"
     * getDirectoryPath("/path/to/") === "/path"
     * getDirectoryPath("/") === "/"
     * ```
     */
    export function getDirectoryPath(path: string): string;
    export function getDirectoryPath(path: string): string {
        path = normalizeSlashes(path);

        // If the path provided is itself the root, then return it.
        const rootLength = getRootLength(path);
        if (rootLength === path.length) return path;

        // return the leading portion of the path up to the last (non-terminal) directory separator
        // but not including any trailing directory separator.
        path = removeTrailingDirectorySeparator(path);
        return path.slice(0, Math.max(rootLength, path.lastIndexOf(directorySeparator)));
    }

    export function startsWithDirectory(fileName: string, directoryName: string, getCanonicalFileName: GetCanonicalFileName): boolean {
        const canonicalFileName = getCanonicalFileName(fileName);
        const canonicalDirectoryName = getCanonicalFileName(directoryName);
        return startsWith(canonicalFileName, canonicalDirectoryName + "/") || startsWith(canonicalFileName, canonicalDirectoryName + "\\");
    }

    export function isUrl(path: string) {
        return getEncodedRootLength(path) < 0;
    }

    export function pathIsRelative(path: string): boolean {
        return /^\.\.?($|[\\/])/.test(path);
    }

    /**
     * Determines whether a path is an absolute path (e.g. starts with `/`, or a dos path
     * like `c:`, `c:\` or `c:/`).
     */
    export function isRootedDiskPath(path: string) {
        return getEncodedRootLength(path) > 0;
    }

    /**
     * Determines whether a path consists only of a path root.
     */
    export function isDiskPathRoot(path: string) {
        const rootLength = getEncodedRootLength(path);
        return rootLength > 0 && rootLength === path.length;
    }

    export function convertToRelativePath(absoluteOrRelativePath: string, basePath: string, getCanonicalFileName: (path: string) => string): string {
        return !isRootedDiskPath(absoluteOrRelativePath)
            ? absoluteOrRelativePath
            : getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    }

    function pathComponents(path: string, rootLength: number) {
        const root = path.substring(0, rootLength);
        const rest = path.substring(rootLength).split(directorySeparator);
        if (rest.length && !lastOrUndefined(rest)) rest.pop();
        return [root, ...rest];
    }

    /**
     * Parse a path into an array containing a root component (at index 0) and zero or more path
     * components (at indices > 0). The result is not normalized.
     * If the path is relative, the root component is `""`.
     * If the path is absolute, the root component includes the first path separator (`/`).
     */
    export function getPathComponents(path: string, currentDirectory = "") {
        path = combinePaths(currentDirectory, path);
        const rootLength = getRootLength(path);
        return pathComponents(path, rootLength);
    }

    /**
     * Reduce an array of path components to a more simplified path by navigating any
     * `"."` or `".."` entries in the path.
     */
    export function reducePathComponents(components: ReadonlyArray<string>) {
        if (!some(components)) return [];
        const reduced = [components[0]];
        for (let i = 1; i < components.length; i++) {
            const component = components[i];
            if (!component) continue;
            if (component === ".") continue;
            if (component === "..") {
                if (reduced.length > 1) {
                    if (reduced[reduced.length - 1] !== "..") {
                        reduced.pop();
                        continue;
                    }
                }
                else if (reduced[0]) continue;
            }
            reduced.push(component);
        }
        return reduced;
    }

    /**
     * Parse a path into an array containing a root component (at index 0) and zero or more path
     * components (at indices > 0). The result is normalized.
     * If the path is relative, the root component is `""`.
     * If the path is absolute, the root component includes the first path separator (`/`).
     */
    export function getNormalizedPathComponents(path: string, currentDirectory: string | undefined) {
        return reducePathComponents(getPathComponents(path, currentDirectory));
    }

    export function getNormalizedAbsolutePath(fileName: string, currentDirectory: string | undefined) {
        return getPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
    }

    /**
     * Formats a parsed path consisting of a root component (at index 0) and zero or more path
     * segments (at indices > 0).
     */
    export function getPathFromPathComponents(pathComponents: ReadonlyArray<string>) {
        if (pathComponents.length === 0) return "";

        const root = pathComponents[0] && ensureTrailingDirectorySeparator(pathComponents[0]);
        return root + pathComponents.slice(1).join(directorySeparator);
    }

}

/* @internal */
namespace ts {
    export function getPathComponentsRelativeTo(from: string, to: string, stringEqualityComparer: (a: string, b: string) => boolean, getCanonicalFileName: GetCanonicalFileName) {
        const fromComponents = reducePathComponents(getPathComponents(from));
        const toComponents = reducePathComponents(getPathComponents(to));

        let start: number;
        for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
            const fromComponent = getCanonicalFileName(fromComponents[start]);
            const toComponent = getCanonicalFileName(toComponents[start]);
            const comparer = start === 0 ? equateStringsCaseInsensitive : stringEqualityComparer;
            if (!comparer(fromComponent, toComponent)) break;
        }

        if (start === 0) {
            return toComponents;
        }

        const components = toComponents.slice(start);
        const relative: string[] = [];
        for (; start < fromComponents.length; start++) {
            relative.push("..");
        }
        return ["", ...relative, ...components];
    }

    export function getRelativePathFromFile(from: string, to: string, getCanonicalFileName: GetCanonicalFileName) {
        return ensurePathIsNonModuleName(getRelativePathFromDirectory(getDirectoryPath(from), to, getCanonicalFileName));
    }

    /**
     * Gets a relative path that can be used to traverse between `from` and `to`.
     */
    export function getRelativePathFromDirectory(from: string, to: string, ignoreCase: boolean): string;
    /**
     * Gets a relative path that can be used to traverse between `from` and `to`.
     */
    // tslint:disable-next-line:unified-signatures
    export function getRelativePathFromDirectory(fromDirectory: string, to: string, getCanonicalFileName: GetCanonicalFileName): string;
    export function getRelativePathFromDirectory(fromDirectory: string, to: string, getCanonicalFileNameOrIgnoreCase: GetCanonicalFileName | boolean) {
        Debug.assert((getRootLength(fromDirectory) > 0) === (getRootLength(to) > 0), "Paths must either both be absolute or both be relative");
        const getCanonicalFileName = typeof getCanonicalFileNameOrIgnoreCase === "function" ? getCanonicalFileNameOrIgnoreCase : identity;
        const ignoreCase = typeof getCanonicalFileNameOrIgnoreCase === "boolean" ? getCanonicalFileNameOrIgnoreCase : false;
        const pathComponents = getPathComponentsRelativeTo(fromDirectory, to, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive, getCanonicalFileName);
        return getPathFromPathComponents(pathComponents);
    }

    export function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: GetCanonicalFileName, isAbsolutePathAnUrl: boolean) {
        const pathComponents = getPathComponentsRelativeTo(
            resolvePath(currentDirectory, directoryPathOrUrl),
            resolvePath(currentDirectory, relativeOrAbsolutePath),
            equateStringsCaseSensitive,
            getCanonicalFileName
        );

        const firstComponent = pathComponents[0];
        if (isAbsolutePathAnUrl && isRootedDiskPath(firstComponent)) {
            const prefix = firstComponent.charAt(0) === directorySeparator ? "file://" : "file:///";
            pathComponents[0] = prefix + firstComponent;
        }

        return getPathFromPathComponents(pathComponents);
    }

    /**
     * Ensures a path is either absolute (prefixed with `/` or `c:`) or dot-relative (prefixed
     * with `./` or `../`) so as not to be confused with an unprefixed module name.
     */
    export function ensurePathIsNonModuleName(path: string): string {
        return getRootLength(path) === 0 && !pathIsRelative(path) ? "./" + path : path;
    }

    /**
     * Returns the path except for its containing directory name.
     * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
     *
     * ```ts
     * getBaseFileName("/path/to/file.ext") === "file.ext"
     * getBaseFileName("/path/to/") === "to"
     * getBaseFileName("/") === ""
     * ```
     */
    export function getBaseFileName(path: string): string;
    /**
     * Gets the portion of a path following the last (non-terminal) separator (`/`).
     * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
     * If the base name has any one of the provided extensions, it is removed.
     *
     * ```ts
     * getBaseFileName("/path/to/file.ext", ".ext", true) === "file"
     * getBaseFileName("/path/to/file.js", ".ext", true) === "file.js"
     * ```
     */
    export function getBaseFileName(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    export function getBaseFileName(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
        path = normalizeSlashes(path);

        // if the path provided is itself the root, then it has not file name.
        const rootLength = getRootLength(path);
        if (rootLength === path.length) return "";

        // return the trailing portion of the path starting after the last (non-terminal) directory
        // separator but not including any trailing directory separator.
        path = removeTrailingDirectorySeparator(path);
        const name = path.slice(Math.max(getRootLength(path), path.lastIndexOf(directorySeparator) + 1));
        const extension = extensions !== undefined && ignoreCase !== undefined ? getAnyExtensionFromPath(name, extensions, ignoreCase) : undefined;
        return extension ? name.slice(0, name.length - extension.length) : name;
    }

    /**
     * Combines paths. If a path is absolute, it replaces any previous path.
     */
    export function combinePaths(path: string, ...paths: (string | undefined)[]): string {
        if (path) path = normalizeSlashes(path);
        for (let relativePath of paths) {
            if (!relativePath) continue;
            relativePath = normalizeSlashes(relativePath);
            if (!path || getRootLength(relativePath) !== 0) {
                path = relativePath;
            }
            else {
                path = ensureTrailingDirectorySeparator(path) + relativePath;
            }
        }
        return path;
    }

    /**
     * Combines and resolves paths. If a path is absolute, it replaces any previous path. Any
     * `.` and `..` path components are resolved.
     */
    export function resolvePath(path: string, ...paths: (string | undefined)[]): string {
        const combined = some(paths) ? combinePaths(path, ...paths) : normalizeSlashes(path);
        const normalized = getPathFromPathComponents(reducePathComponents(getPathComponents(combined)));
        return normalized && hasTrailingDirectorySeparator(combined) ? ensureTrailingDirectorySeparator(normalized) : normalized;
    }

    /**
     * Determines whether a path has a trailing separator (`/` or `\\`).
     */
    export function hasTrailingDirectorySeparator(path: string) {
        if (path.length === 0) return false;
        const ch = path.charCodeAt(path.length - 1);
        return ch === CharacterCodes.slash || ch === CharacterCodes.backslash;
    }

    /**
     * Removes a trailing directory separator from a path.
     * @param path The path.
     */
    export function removeTrailingDirectorySeparator(path: Path): Path;
    export function removeTrailingDirectorySeparator(path: string): string;
    export function removeTrailingDirectorySeparator(path: string) {
        if (hasTrailingDirectorySeparator(path)) {
            return path.substr(0, path.length - 1);
        }

        return path;
    }

    /**
     * Adds a trailing directory separator to a path, if it does not already have one.
     * @param path The path.
     */
    export function ensureTrailingDirectorySeparator(path: Path): Path;
    export function ensureTrailingDirectorySeparator(path: string): string;
    export function ensureTrailingDirectorySeparator(path: string) {
        if (!hasTrailingDirectorySeparator(path)) {
            return path + directorySeparator;
        }

        return path;
    }

    // check path for these segments: '', '.'. '..'
    const relativePathSegmentRegExp = /(^|\/)\.{0,2}($|\/)/;

    function comparePathsWorker(a: string, b: string, componentComparer: (a: string, b: string) => Comparison) {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;

        // NOTE: Performance optimization - shortcut if the root segments differ as there would be no
        //       need to perform path reduction.
        const aRoot = a.substring(0, getRootLength(a));
        const bRoot = b.substring(0, getRootLength(b));
        const result = compareStringsCaseInsensitive(aRoot, bRoot);
        if (result !== Comparison.EqualTo) {
            return result;
        }

        // NOTE: Performance optimization - shortcut if there are no relative path segments in
        //       the non-root portion of the path
        const aRest = a.substring(aRoot.length);
        const bRest = b.substring(bRoot.length);
        if (!relativePathSegmentRegExp.test(aRest) && !relativePathSegmentRegExp.test(bRest)) {
            return componentComparer(aRest, bRest);
        }

        // The path contains a relative path segment. Normalize the paths and perform a slower component
        // by component comparison.
        const aComponents = reducePathComponents(getPathComponents(a));
        const bComponents = reducePathComponents(getPathComponents(b));
        const sharedLength = Math.min(aComponents.length, bComponents.length);
        for (let i = 1; i < sharedLength; i++) {
            const result = componentComparer(aComponents[i], bComponents[i]);
            if (result !== Comparison.EqualTo) {
                return result;
            }
        }
        return compareValues(aComponents.length, bComponents.length);
    }

    /**
     * Performs a case-sensitive comparison of two paths.
     */
    export function comparePathsCaseSensitive(a: string, b: string) {
        return comparePathsWorker(a, b, compareStringsCaseSensitive);
    }

    /**
     * Performs a case-insensitive comparison of two paths.
     */
    export function comparePathsCaseInsensitive(a: string, b: string) {
        return comparePathsWorker(a, b, compareStringsCaseInsensitive);
    }

    export function comparePaths(a: string, b: string, ignoreCase?: boolean): Comparison;
    export function comparePaths(a: string, b: string, currentDirectory: string, ignoreCase?: boolean): Comparison;
    export function comparePaths(a: string, b: string, currentDirectory?: string | boolean, ignoreCase?: boolean) {
        if (typeof currentDirectory === "string") {
            a = combinePaths(currentDirectory, a);
            b = combinePaths(currentDirectory, b);
        }
        else if (typeof currentDirectory === "boolean") {
            ignoreCase = currentDirectory;
        }
        return comparePathsWorker(a, b, getStringComparer(ignoreCase));
    }

    export function containsPath(parent: string, child: string, ignoreCase?: boolean): boolean;
    export function containsPath(parent: string, child: string, currentDirectory: string, ignoreCase?: boolean): boolean;
    export function containsPath(parent: string, child: string, currentDirectory?: string | boolean, ignoreCase?: boolean) {
        if (typeof currentDirectory === "string") {
            parent = combinePaths(currentDirectory, parent);
            child = combinePaths(currentDirectory, child);
        }
        else if (typeof currentDirectory === "boolean") {
            ignoreCase = currentDirectory;
        }
        if (parent === undefined || child === undefined) return false;
        if (parent === child) return true;
        const parentComponents = reducePathComponents(getPathComponents(parent));
        const childComponents = reducePathComponents(getPathComponents(child));
        if (childComponents.length < parentComponents.length) {
            return false;
        }

        const componentEqualityComparer = ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive;
        for (let i = 0; i < parentComponents.length; i++) {
            const equalityComparer = i === 0 ? equateStringsCaseInsensitive : componentEqualityComparer;
            if (!equalityComparer(parentComponents[i], childComponents[i])) {
                return false;
            }
        }

        return true;
    }

    function isDirectorySeparator(charCode: number): boolean {
        return charCode === CharacterCodes.slash || charCode === CharacterCodes.backslash;
    }

    function stripLeadingDirectorySeparator(s: string): string | undefined {
        return isDirectorySeparator(s.charCodeAt(0)) ? s.slice(1) : undefined;
    }

    export function tryRemoveDirectoryPrefix(path: string, dirPath: string, getCanonicalFileName: GetCanonicalFileName): string | undefined {
        const withoutPrefix = tryRemovePrefix(path, dirPath, getCanonicalFileName);
        return withoutPrefix === undefined ? undefined : stripLeadingDirectorySeparator(withoutPrefix);
    }

    // Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
    // It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
    // proof.
    const reservedCharacterPattern = /[^\w\s\/]/g;

    export function regExpEscape(text: string) {
        return text.replace(reservedCharacterPattern, escapeRegExpCharacter);
    }

    function escapeRegExpCharacter(match: string) {
        return "\\" + match;
    }

    const wildcardCharCodes = [CharacterCodes.asterisk, CharacterCodes.question];

    export function hasExtension(fileName: string): boolean {
        return stringContains(getBaseFileName(fileName), ".");
    }

    export const commonPackageFolders: ReadonlyArray<string> = ["node_modules", "bower_components", "jspm_packages"];

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

    export function getRegularExpressionForWildcard(specs: ReadonlyArray<string> | undefined, basePath: string, usage: "files" | "directories" | "exclude"): string | undefined {
        const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
        if (!patterns || !patterns.length) {
            return undefined;
        }

        const pattern = patterns.map(pattern => `(${pattern})`).join("|");
        // If excluding, match "foo/bar/baz...", but if including, only allow "foo".
        const terminator = usage === "exclude" ? "($|/)" : "$";
        return `^(${pattern})${terminator}`;
    }

    export function getRegularExpressionsForWildcards(specs: ReadonlyArray<string> | undefined, basePath: string, usage: "files" | "directories" | "exclude"): ReadonlyArray<string> | undefined {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }

        return flatMap(specs, spec =>
            spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]));
    }

    /**
     * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
     * and does not contain any glob characters itself.
     */
    export function isImplicitGlob(lastPathComponent: string): boolean {
        return !/[.*?]/.test(lastPathComponent);
    }

    function getSubPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude", { singleAsteriskRegexFragment, doubleAsteriskRegexFragment, replaceWildcardCharacter }: WildcardMatcher): string | undefined {
        let subpattern = "";
        let hasWrittenComponent = false;
        const components = getNormalizedPathComponents(spec, basePath);
        const lastComponent = last(components);
        if (usage !== "exclude" && lastComponent === "**") {
            return undefined;
        }

        // getNormalizedPathComponents includes the separator for the root component.
        // We need to remove to create our regex correctly.
        components[0] = removeTrailingDirectorySeparator(components[0]);

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
                    subpattern += directorySeparator;
                }

                if (usage !== "exclude") {
                    let componentPattern = "";
                    // The * and ? wildcards should not match directories or files that start with . if they
                    // appear first in a component. Dotted directories and files can be included explicitly
                    // like so: **/.*/.*
                    if (component.charCodeAt(0) === CharacterCodes.asterisk) {
                        componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                        component = component.substr(1);
                    }
                    else if (component.charCodeAt(0) === CharacterCodes.question) {
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

    export interface FileSystemEntries {
        readonly files: ReadonlyArray<string>;
        readonly directories: ReadonlyArray<string>;
    }

    export interface FileMatcherPatterns {
        /** One pattern for each "include" spec. */
        includeFilePatterns: ReadonlyArray<string> | undefined;
        /** One pattern matching one of any of the "include" specs. */
        includeFilePattern: string | undefined;
        includeDirectoryPattern: string | undefined;
        excludePattern: string | undefined;
        basePaths: ReadonlyArray<string>;
    }

    /** @param path directory of the tsconfig.json */
    export function getFileMatcherPatterns(path: string, excludes: ReadonlyArray<string> | undefined, includes: ReadonlyArray<string> | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        const absolutePath = combinePaths(currentDirectory, path);

        return {
            includeFilePatterns: map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), pattern => `^${pattern}$`),
            includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
            includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
            excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
            basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
        };
    }

    export function getRegexFromPattern(pattern: string, useCaseSensitiveFileNames: boolean): RegExp {
        return new RegExp(pattern, useCaseSensitiveFileNames ? "" : "i");
    }

    /** @param path directory of the tsconfig.json */
    export function matchFiles(path: string, extensions: ReadonlyArray<string> | undefined, excludes: ReadonlyArray<string> | undefined, includes: ReadonlyArray<string> | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string, depth: number | undefined, getFileSystemEntries: (path: string) => FileSystemEntries, realpath: (path: string) => string): string[] {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);

        const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

        const includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map(pattern => getRegexFromPattern(pattern, useCaseSensitiveFileNames));
        const includeDirectoryRegex = patterns.includeDirectoryPattern && getRegexFromPattern(patterns.includeDirectoryPattern, useCaseSensitiveFileNames);
        const excludeRegex = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames);

        // Associate an array of results with each include regex. This keeps results in order of the "include" order.
        // If there are no "includes", then just put everything in results[0].
        const results: string[][] = includeFileRegexes ? includeFileRegexes.map(() => []) : [[]];
        const visited = createMap<true>();
        const toCanonical = createGetCanonicalFileName(useCaseSensitiveFileNames);
        for (const basePath of patterns.basePaths) {
            visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
        }

        return flatten<string>(results);

        function visitDirectory(path: string, absolutePath: string, depth: number | undefined) {
            const canonicalPath = toCanonical(realpath(absolutePath));
            if (visited.has(canonicalPath)) return;
            visited.set(canonicalPath, true);
            const { files, directories } = getFileSystemEntries(path);

            for (const current of sort<string>(files, compareStringsCaseSensitive)) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if (extensions && !fileExtensionIsOneOf(name, extensions)) continue;
                if (excludeRegex && excludeRegex.test(absoluteName)) continue;
                if (!includeFileRegexes) {
                    results[0].push(name);
                }
                else {
                    const includeIndex = findIndex(includeFileRegexes, re => re.test(absoluteName));
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

            for (const current of sort<string>(directories, compareStringsCaseSensitive)) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
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
    function getBasePaths(path: string, includes: ReadonlyArray<string> | undefined, useCaseSensitiveFileNames: boolean): string[] {
        // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
        const basePaths: string[] = [path];

        if (includes) {
            // Storage for literal base paths amongst the include patterns.
            const includeBasePaths: string[] = [];
            for (const include of includes) {
                // We also need to check the relative paths by converting them to absolute and normalizing
                // in case they escape the base path (e.g "..\somedirectory")
                const absolute: string = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));
                // Append the literal and canonical candidate base paths.
                includeBasePaths.push(getIncludeBasePath(absolute));
            }

            // Sort the offsets array using either the literal or canonical path representations.
            includeBasePaths.sort(getStringComparer(!useCaseSensitiveFileNames));

            // Iterate over each include base path and include unique base paths that are not a
            // subpath of an existing base path
            for (const includeBasePath of includeBasePaths) {
                if (every(basePaths, basePath => !containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames))) {
                    basePaths.push(includeBasePath);
                }
            }
        }

        return basePaths;
    }

    function getIncludeBasePath(absolute: string): string {
        const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
        if (wildcardOffset < 0) {
            // No "*" or "?" in the path
            return !hasExtension(absolute)
                ? absolute
                : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
        }
        return absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));
    }

    export function ensureScriptKind(fileName: string, scriptKind: ScriptKind | undefined): ScriptKind {
        // Using scriptKind as a condition handles both:
        // - 'scriptKind' is unspecified and thus it is `undefined`
        // - 'scriptKind' is set and it is `Unknown` (0)
        // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
        // to get the ScriptKind from the file name. If it cannot be resolved
        // from the file name then the default 'TS' script kind is returned.
        return scriptKind || getScriptKindFromFileName(fileName) || ScriptKind.TS;
    }

    export function getScriptKindFromFileName(fileName: string): ScriptKind {
        const ext = fileName.substr(fileName.lastIndexOf("."));
        switch (ext.toLowerCase()) {
            case Extension.Js:
                return ScriptKind.JS;
            case Extension.Jsx:
                return ScriptKind.JSX;
            case Extension.Ts:
                return ScriptKind.TS;
            case Extension.Tsx:
                return ScriptKind.TSX;
            case Extension.Json:
                return ScriptKind.JSON;
            default:
                return ScriptKind.Unknown;
        }
    }

    /**
     *  List of supported extensions in order of file resolution precedence.
     */
    export const supportedTSExtensions: ReadonlyArray<Extension> = [Extension.Ts, Extension.Tsx, Extension.Dts];
    export const supportedTSExtensionsWithJson: ReadonlyArray<Extension> = [Extension.Ts, Extension.Tsx, Extension.Dts, Extension.Json];
    /** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
    export const supportedTSExtensionsForExtractExtension: ReadonlyArray<Extension> = [Extension.Dts, Extension.Ts, Extension.Tsx];
    export const supportedJSExtensions: ReadonlyArray<Extension> = [Extension.Js, Extension.Jsx];
    export const supportedJSAndJsonExtensions: ReadonlyArray<Extension> = [Extension.Js, Extension.Jsx, Extension.Json];
    const allSupportedExtensions: ReadonlyArray<Extension> = [...supportedTSExtensions, ...supportedJSExtensions];
    const allSupportedExtensionsWithJson: ReadonlyArray<Extension> = [...supportedTSExtensions, ...supportedJSExtensions, Extension.Json];

    export function getSupportedExtensions(options?: CompilerOptions): ReadonlyArray<Extension>;
    export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: ReadonlyArray<FileExtensionInfo>): ReadonlyArray<string>;
    export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: ReadonlyArray<FileExtensionInfo>): ReadonlyArray<string> {
        const needJsExtensions = options && options.allowJs;

        if (!extraFileExtensions || extraFileExtensions.length === 0) {
            return needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
        }

        const extensions = [
            ...needJsExtensions ? allSupportedExtensions : supportedTSExtensions,
            ...mapDefined(extraFileExtensions, x => x.scriptKind === ScriptKind.Deferred || needJsExtensions && isJSLike(x.scriptKind) ? x.extension : undefined)
        ];

        return deduplicate<string>(extensions, equateStringsCaseSensitive, compareStringsCaseSensitive);
    }

    export function getSuppoertedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: ReadonlyArray<string>): ReadonlyArray<string> {
        if (!options || !options.resolveJsonModule) { return supportedExtensions; }
        if (supportedExtensions === allSupportedExtensions) { return allSupportedExtensionsWithJson; }
        if (supportedExtensions === supportedTSExtensions) { return supportedTSExtensionsWithJson; }
        return [...supportedExtensions, Extension.Json];
    }

    function isJSLike(scriptKind: ScriptKind | undefined): boolean {
        return scriptKind === ScriptKind.JS || scriptKind === ScriptKind.JSX;
    }

    export function hasJSFileExtension(fileName: string): boolean {
        return some(supportedJSExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function hasJSOrJsonFileExtension(fileName: string): boolean {
        return supportedJSAndJsonExtensions.some(ext => fileExtensionIs(fileName, ext));
    }

    export function hasTSFileExtension(fileName: string): boolean {
        return some(supportedTSExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: ReadonlyArray<FileExtensionInfo>) {
        if (!fileName) { return false; }

        const supportedExtensions = getSupportedExtensions(compilerOptions, extraFileExtensions);
        for (const extension of getSuppoertedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions)) {
            if (fileExtensionIs(fileName, extension)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Extension boundaries by priority. Lower numbers indicate higher priorities, and are
     * aligned to the offset of the highest priority extension in the
     * allSupportedExtensions array.
     */
    export const enum ExtensionPriority {
        TypeScriptFiles = 0,
        DeclarationAndJavaScriptFiles = 2,

        Highest = TypeScriptFiles,
        Lowest = DeclarationAndJavaScriptFiles,
    }

    export function getExtensionPriority(path: string, supportedExtensions: ReadonlyArray<string>): ExtensionPriority {
        for (let i = supportedExtensions.length - 1; i >= 0; i--) {
            if (fileExtensionIs(path, supportedExtensions[i])) {
                return adjustExtensionPriority(<ExtensionPriority>i, supportedExtensions);
            }
        }

        // If its not in the list of supported extensions, this is likely a
        // TypeScript file with a non-ts extension
        return ExtensionPriority.Highest;
    }

    /**
     * Adjusts an extension priority to be the highest priority within the same range.
     */
    export function adjustExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: ReadonlyArray<string>): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.TypeScriptFiles;
        }
        else if (extensionPriority < supportedExtensions.length) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return supportedExtensions.length;
        }
    }

    /**
     * Gets the next lowest extension priority for a given priority.
     */
    export function getNextLowestExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: ReadonlyArray<string>): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return supportedExtensions.length;
        }
    }

    const extensionsToRemove = [Extension.Dts, Extension.Ts, Extension.Js, Extension.Tsx, Extension.Jsx, Extension.Json];
    export function removeFileExtension(path: string): string {
        for (const ext of extensionsToRemove) {
            const extensionless = tryRemoveExtension(path, ext);
            if (extensionless !== undefined) {
                return extensionless;
            }
        }
        return path;
    }

    export function tryRemoveExtension(path: string, extension: string): string | undefined {
        return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
    }

    export function removeExtension(path: string, extension: string): string {
        return path.substring(0, path.length - extension.length);
    }

    export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
        return <T>changeAnyExtension(path, newExtension, extensionsToRemove, /*ignoreCase*/ false);
    }

    export function changeAnyExtension(path: string, ext: string): string;
    export function changeAnyExtension(path: string, ext: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    export function changeAnyExtension(path: string, ext: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
        const pathext = extensions !== undefined && ignoreCase !== undefined ? getAnyExtensionFromPath(path, extensions, ignoreCase) : getAnyExtensionFromPath(path);
        return pathext ? path.slice(0, path.length - pathext.length) + (startsWith(ext, ".") ? ext : "." + ext) : path;
    }

    export namespace Debug {
        export function showSymbol(symbol: Symbol): string {
            const symbolFlags = (ts as any).SymbolFlags;
            return `{ flags: ${symbolFlags ? showFlags(symbol.flags, symbolFlags) : symbol.flags}; declarations: ${map(symbol.declarations, showSyntaxKind)} }`;
        }

        function showFlags(flags: number, flagsEnum: { [flag: number]: string }): string {
            const out: string[] = [];
            for (let pow = 0; pow <= 30; pow++) {
                const n = 1 << pow;
                if (flags & n) {
                    out.push(flagsEnum[n]);
                }
            }
            return out.join("|");
        }

        export function showSyntaxKind(node: Node): string {
            const syntaxKind = (ts as any).SyntaxKind;
            return syntaxKind ? syntaxKind[node.kind] : node.kind.toString();
        }
    }

    export function tryParsePattern(pattern: string): Pattern | undefined {
        // This should be verified outside of here and a proper error thrown.
        Debug.assert(hasZeroOrOneAsteriskCharacter(pattern));
        const indexOfStar = pattern.indexOf("*");
        return indexOfStar === -1 ? undefined : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
    }

    export function positionIsSynthesized(pos: number): boolean {
        // This is a fast way of testing the following conditions:
        //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
        return !(pos >= 0);
    }

    /** True if an extension is one of the supported TypeScript extensions. */
    export function extensionIsTS(ext: Extension): boolean {
        return ext === Extension.Ts || ext === Extension.Tsx || ext === Extension.Dts;
    }

    export function resolutionExtensionIsTSOrJson(ext: Extension) {
        return extensionIsTS(ext) || ext === Extension.Json;
    }

    /**
     * Gets the extension from a path.
     * Path must have a valid extension.
     */
    export function extensionFromPath(path: string): Extension {
        const ext = tryGetExtensionFromPath(path);
        return ext !== undefined ? ext : Debug.fail(`File ${path} has unknown extension.`);
    }

    export function isAnySupportedFileExtension(path: string): boolean {
        return tryGetExtensionFromPath(path) !== undefined;
    }

    export function tryGetExtensionFromPath(path: string): Extension | undefined {
        return find<Extension>(extensionsToRemove, e => fileExtensionIs(path, e));
    }

    function getAnyExtensionFromPathWorker(path: string, extensions: string | ReadonlyArray<string>, stringEqualityComparer: (a: string, b: string) => boolean) {
        if (typeof extensions === "string") extensions = [extensions];
        for (let extension of extensions) {
            if (!startsWith(extension, ".")) extension = "." + extension;
            if (path.length >= extension.length && path.charAt(path.length - extension.length) === ".") {
                const pathExtension = path.slice(path.length - extension.length);
                if (stringEqualityComparer(pathExtension, extension)) {
                    return pathExtension;
                }
            }
        }
        return "";
    }

    /**
     * Gets the file extension for a path.
     */
    export function getAnyExtensionFromPath(path: string): string;
    /**
     * Gets the file extension for a path, provided it is one of the provided extensions.
     */
    export function getAnyExtensionFromPath(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    export function getAnyExtensionFromPath(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean): string {
        // Retrieves any string from the final "." onwards from a base file name.
        // Unlike extensionFromPath, which throws an exception on unrecognized extensions.
        if (extensions) {
            return getAnyExtensionFromPathWorker(path, extensions, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive);
        }
        const baseFileName = getBaseFileName(path);
        const extensionIndex = baseFileName.lastIndexOf(".");
        if (extensionIndex >= 0) {
            return baseFileName.substring(extensionIndex);
        }
        return "";
    }

    export function isCheckJsEnabledForFile(sourceFile: SourceFile, compilerOptions: CompilerOptions) {
        return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
    }

    export const emptyFileSystemEntries: FileSystemEntries = {
        files: emptyArray,
        directories: emptyArray
    };


    /**
     * patternStrings contains both pattern strings (containing "*") and regular strings.
     * Return an exact match if possible, or a pattern match, or undefined.
     * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
     */
    export function matchPatternOrExact(patternStrings: ReadonlyArray<string>, candidate: string): string | Pattern | undefined {
        const patterns: Pattern[] = [];
        for (const patternString of patternStrings) {
            const pattern = tryParsePattern(patternString);
            if (pattern) {
                patterns.push(pattern);
            }
            else if (patternString === candidate) {
                // pattern was matched as is - no need to search further
                return patternString;
            }
        }

        return findBestPatternMatch(patterns, _ => _, candidate);
    }

    export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };

    export function sliceAfter<T>(arr: ReadonlyArray<T>, value: T): ReadonlyArray<T> {
        const index = arr.indexOf(value);
        Debug.assert(index !== -1);
        return arr.slice(index);
    }

    export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
        if (!diagnostic.relatedInformation) {
            diagnostic.relatedInformation = [];
        }
        diagnostic.relatedInformation.push(...relatedInformation);
        return diagnostic;
    }

    export function minAndMax<T>(arr: ReadonlyArray<T>, getValue: (value: T) => number): { readonly min: number, readonly max: number } {
        Debug.assert(arr.length !== 0);
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

    export interface ReadonlyNodeSet<TNode extends Node> {
        has(node: TNode): boolean;
        forEach(cb: (node: TNode) => void): void;
        some(pred: (node: TNode) => boolean): boolean;
    }

    export class NodeSet<TNode extends Node> implements ReadonlyNodeSet<TNode> {
        private map = createMap<TNode>();

        add(node: TNode): void {
            this.map.set(String(getNodeId(node)), node);
        }
        tryAdd(node: TNode): boolean {
            if (this.has(node)) return false;
            this.add(node);
            return true;
        }
        has(node: TNode): boolean {
            return this.map.has(String(getNodeId(node)));
        }
        forEach(cb: (node: TNode) => void): void {
            this.map.forEach(cb);
        }
        some(pred: (node: TNode) => boolean): boolean {
            return forEachEntry(this.map, pred) || false;
        }
    }

    export interface ReadonlyNodeMap<TNode extends Node, TValue> {
        get(node: TNode): TValue | undefined;
        has(node: TNode): boolean;
    }

    export class NodeMap<TNode extends Node, TValue> implements ReadonlyNodeMap<TNode, TValue> {
        private map = createMap<{ node: TNode, value: TValue }>();

        get(node: TNode): TValue | undefined {
            const res = this.map.get(String(getNodeId(node)));
            return res && res.value;
        }

        getOrUpdate(node: TNode, setValue: () => TValue): TValue {
            const res = this.get(node);
            if (res) return res;
            const value = setValue();
            this.set(node, value);
            return value;
        }

        set(node: TNode, value: TValue): void {
            this.map.set(String(getNodeId(node)), { node, value });
        }

        has(node: TNode): boolean {
            return this.map.has(String(getNodeId(node)));
        }

        forEach(cb: (value: TValue, node: TNode) => void): void {
            this.map.forEach(({ node, value }) => cb(value, node));
        }
    }

    export function rangeOfNode(node: Node): TextRange {
        return { pos: getTokenPosOfNode(node), end: node.end };
    }

    export function rangeOfTypeParameters(typeParameters: NodeArray<TypeParameterDeclaration>): TextRange {
        // Include the `<>`
        return { pos: typeParameters.pos - 1, end: typeParameters.end + 1 };
    }

    export function skipTypeChecking(sourceFile: SourceFile, options: CompilerOptions) {
        // If skipLibCheck is enabled, skip reporting errors if file is a declaration file.
        // If skipDefaultLibCheck is enabled, skip reporting errors if file contains a
        // '/// <reference no-default-lib="true"/>' directive.
        return options.skipLibCheck && sourceFile.isDeclarationFile || options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib;
    }

    export function isJsonEqual(a: unknown, b: unknown): boolean {
        return a === b || typeof a === "object" && a !== null && typeof b === "object" && b !== null && equalOwnProperties(a as MapLike<unknown>, b as MapLike<unknown>, isJsonEqual);
    }

    export function getOrUpdate<T>(map: Map<T>, key: string, getDefault: () => T): T {
        const got = map.get(key);
        if (got === undefined) {
            const value = getDefault();
            map.set(key, value);
            return value;
        }
        else {
            return got;
        }
    }

    /**
     * Converts a bigint literal string, e.g. `0x1234n`,
     * to its decimal string representation, e.g. `4660`.
     */
    export function parsePseudoBigInt(stringValue: string): string {
        let log2Base: number;
        switch (stringValue.charCodeAt(1)) { // "x" in "0x123"
            case CharacterCodes.b:
            case CharacterCodes.B: // 0b or 0B
                log2Base = 1;
                break;
            case CharacterCodes.o:
            case CharacterCodes.O: // 0o or 0O
                log2Base = 3;
                break;
            case CharacterCodes.x:
            case CharacterCodes.X: // 0x or 0X
                log2Base = 4;
                break;
            default: // already in decimal; omit trailing "n"
                const nIndex = stringValue.length - 1;
                // Skip leading 0s
                let nonZeroStart = 0;
                while (stringValue.charCodeAt(nonZeroStart) === CharacterCodes._0) {
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
            const digit = digitChar <= CharacterCodes._9
                ? digitChar - CharacterCodes._0
                : 10 + digitChar -
                    (digitChar <= CharacterCodes.F ? CharacterCodes.A : CharacterCodes.a);
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

    export function pseudoBigIntToString({negative, base10Value}: PseudoBigInt): string {
        return (negative && base10Value !== "0" ? "-" : "") + base10Value;
    }
}
