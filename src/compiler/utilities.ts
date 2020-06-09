/* @internal */
namespace ts {
    export const resolvingEmptyArray: never[] = [] as never[];
    export const emptyMap = createMap<never>() as ReadonlyMap<never> & ReadonlyPragmaMap;
    export const emptyUnderscoreEscapedMap: ReadonlyUnderscoreEscapedMap<never> = emptyMap as ReadonlyUnderscoreEscapedMap<never>;

    export const externalHelpersModuleNameText = "tslib";

    export const defaultMaximumTruncationLength = 160;
    export const noTruncationMaximumTruncationLength = 1_000_000;

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
        return new Map<T>() as UnderscoreEscapedMap<T>;
    }

    export function hasEntries(map: ReadonlyUnderscoreEscapedMap<any> | undefined): map is ReadonlyUnderscoreEscapedMap<any> {
        return !!map && !!map.size;
    }

    export function createSymbolTable(symbols?: readonly Symbol[]): SymbolTable {
        const result = createMap<Symbol>() as SymbolTable;
        if (symbols) {
            for (const symbol of symbols) {
                result.set(symbol.escapedName, symbol);
            }
        }
        return result;
    }

    export function isTransientSymbol(symbol: Symbol): symbol is TransientSymbol {
        return (symbol.flags & SymbolFlags.Transient) !== 0;
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
            hasTrailingComment: () => false,
            hasTrailingWhitespace: () => !!str.length && isWhiteSpaceLike(str.charCodeAt(str.length - 1)),

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

    export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
        return oldOptions.configFilePath !== newOptions.configFilePath ||
            optionsHaveModuleResolutionChanges(oldOptions, newOptions);
    }

    export function optionsHaveModuleResolutionChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
        return moduleResolutionOptionDeclarations.some(o =>
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
        for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
            const [key, value] = iterResult.value;
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
        for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
            const result = callback(iterResult.value as string & __String);
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
    export function arrayToSet(array: readonly string[]): Map<true>;
    export function arrayToSet<T>(array: readonly T[], makeKey: (value: T) => string | undefined): Map<true>;
    export function arrayToSet<T>(array: readonly T[], makeKey: (value: T) => __String | undefined): UnderscoreEscapedMap<true>;
    export function arrayToSet(array: readonly any[], makeKey?: (value: any) => string | __String | undefined): Map<true> | UnderscoreEscapedMap<true> {
        return arrayToMap<any, true>(array, makeKey || (s => s), returnTrue);
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

    export function getResolvedModule(sourceFile: SourceFile | undefined, moduleNameText: string): ResolvedModuleFull | undefined {
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
        names: readonly string[],
        newResolutions: readonly T[],
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

    function insertStatementsAfterPrologue<T extends Statement>(to: T[], from: readonly T[] | undefined, isPrologueDirective: (node: Node) => boolean): T[] {
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
    export function insertStatementsAfterStandardPrologue<T extends Statement>(to: T[], from: readonly T[] | undefined): T[] {
        return insertStatementsAfterPrologue(to, from, isPrologueDirective);
    }

    export function insertStatementsAfterCustomPrologue<T extends Statement>(to: T[], from: readonly T[] | undefined): T[] {
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

    export function createCommentDirectivesMap(sourceFile: SourceFile, commentDirectives: CommentDirective[]): CommentDirectivesMap {
        const directivesByLine = createMapFromEntries(
            commentDirectives.map(commentDirective => ([
                `${getLineAndCharacterOfPosition(sourceFile, commentDirective.range.end).line}`,
                commentDirective,
            ]))
        );

        const usedLines = createMap<boolean>();

        return { getUnusedExpectations, markUsed };

        function getUnusedExpectations() {
            return arrayFrom(directivesByLine.entries())
                .filter(([line, directive]) => directive.type === CommentDirectiveType.ExpectError && !usedLines.get(line))
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
            return getTokenPosOfNode(node.jsDoc![0], sourceFile);
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
        return !!findAncestor(node, isJSDocTypeExpression);
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
    export function indexOfNode(nodeArray: readonly Node[], node: Node) {
        return binarySearch(nodeArray, node, getPos, compareValues);
    }

    /**
     * Gets flags that control emit behavior of a node.
     */
    export function getEmitFlags(node: Node): EmitFlags {
        const emitNode = node.emitNode;
        return emitNode && emitNode.flags || 0;
    }

    export function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile, neverAsciiEscape: boolean | undefined, jsxAttributeEscape: boolean) {
        // If we don't need to downlevel and we can reach the original source text using
        // the node's parent reference, then simply get the text as it was originally written.
        if (!nodeIsSynthesized(node) && node.parent && !(
            (isNumericLiteral(node) && node.numericLiteralFlags & TokenFlags.ContainsSeparator) ||
            isBigIntLiteral(node)
        )) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, node);
        }

        // If we can't reach the original source text, use the canonical form if it's a number,
        // or a (possibly escaped) quoted form of the original text if it's string-like.
        switch (node.kind) {
            case SyntaxKind.StringLiteral: {
                const escapeText = jsxAttributeEscape ? escapeJsxAttributeString :
                    neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? escapeString :
                    escapeNonAsciiString;
                if ((<StringLiteral>node).singleQuote) {
                    return "'" + escapeText(node.text, CharacterCodes.singleQuote) + "'";
                }
                else {
                    return '"' + escapeText(node.text, CharacterCodes.doubleQuote) + '"';
                }
            }
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateHead:
            case SyntaxKind.TemplateMiddle:
            case SyntaxKind.TemplateTail: {
                // If a NoSubstitutionTemplateLiteral appears to have a substitution in it, the original text
                // had to include a backslash: `not \${a} substitution`.
                const escapeText = neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? escapeString :
                    escapeNonAsciiString;

                const rawText = (<TemplateLiteralLikeNode>node).rawText || escapeTemplateSubstitution(escapeText(node.text, CharacterCodes.backtick));
                switch (node.kind) {
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                        return "`" + rawText + "`";
                    case SyntaxKind.TemplateHead:
                        return "`" + rawText + "${";
                    case SyntaxKind.TemplateMiddle:
                        return "}" + rawText + "${";
                    case SyntaxKind.TemplateTail:
                        return "}" + rawText + "`";
                }
                break;
            }
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

    /**
     * Returns whether the source file will be treated as if it were in strict mode at runtime.
     */
    export function isEffectiveStrictModeSourceFile(node: SourceFile, compilerOptions: CompilerOptions) {
        // We can only verify strict mode for JS/TS files
        switch (node.scriptKind) {
            case ScriptKind.JS:
            case ScriptKind.TS:
            case ScriptKind.JSX:
            case ScriptKind.TSX:
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
        if (startsWithUseStrict(node.statements)) {
            return true;
        }
        if (isExternalModule(node) || compilerOptions.isolatedModules) {
            // ECMAScript Modules are always strict.
            if (getEmitModuleKind(compilerOptions) >= ModuleKind.ES2015) {
                return true;
            }
            // Other modules are strict unless otherwise specified.
            return !compilerOptions.noImplicitUseStrict;
        }
        return false;
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

    export function isComputedNonLiteralName(name: PropertyName): boolean {
        return name.kind === SyntaxKind.ComputedPropertyName && !isStringOrNumericLiteralLike(name.expression);
    }

    export function getTextOfPropertyName(name: PropertyName | NoSubstitutionTemplateLiteral): __String {
        switch (name.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.PrivateIdentifier:
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

    export function entityNameToString(name: EntityNameOrEntityNameExpression | JsxTagNameExpression | PrivateIdentifier): string {
        switch (name.kind) {
            case SyntaxKind.ThisKeyword:
                return "this";
            case SyntaxKind.PrivateIdentifier:
            case SyntaxKind.Identifier:
                return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
            case SyntaxKind.QualifiedName:
                return entityNameToString(name.left) + "." + entityNameToString(name.right);
            case SyntaxKind.PropertyAccessExpression:
                if (isIdentifier(name.name) || isPrivateIdentifier(name.name)) {
                    return entityNameToString(name.expression) + "." + entityNameToString(name.name);
                }
                else {
                    return Debug.assertNever(name.name);
                }
            default:
                return Debug.assertNever(name);
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

    export function createDiagnosticForRange(sourceFile: SourceFile, range: TextRange, message: DiagnosticMessage): DiagnosticWithLocation {
        return {
            file: sourceFile,
            start: range.pos,
            length: range.end - range.pos,
            code: message.code,
            category: message.category,
            messageText: message.message,
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
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                const start = skipTrivia(sourceFile.text, (<CaseOrDefaultClause>node).pos);
                const end = (<CaseOrDefaultClause>node).statements.length > 0 ? (<CaseOrDefaultClause>node).statements[0].pos : (<CaseOrDefaultClause>node).end;
                return createTextSpanFromBounds(start, end);
        }

        if (errorNode === undefined) {
            // If we don't have a better node, then just set the error on the first token of
            // construct.
            return getSpanOfTokenAtPosition(sourceFile, node.pos);
        }

        Debug.assert(!isJSDoc(errorNode));

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
        return !!(getCombinedModifierFlags(declaration) & ModifierFlags.Readonly && !isParameterPropertyDeclaration(declaration, declaration.parent));
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

    export function isImportMeta(n: Node): n is ImportMetaProperty {
        return isMetaProperty(n)
            && n.keywordToken === SyntaxKind.ImportKeyword
            && n.name.escapedText === "meta";
    }

    export function isLiteralImportTypeNode(n: Node): n is LiteralImportTypeNode {
        return isImportTypeNode(n) && isLiteralTypeNode(n.argument) && isStringLiteral(n.argument.literal);
    }

    export function isPrologueDirective(node: Node): node is PrologueDirective {
        return node.kind === SyntaxKind.ExpressionStatement
            && (<ExpressionStatement>node).expression.kind === SyntaxKind.StringLiteral;
    }

    export function isCustomPrologue(node: Statement) {
        return !!(getEmitFlags(node) & EmitFlags.CustomPrologue);
    }

    export function isHoistedFunction(node: Statement) {
        return isCustomPrologue(node)
            && isFunctionDeclaration(node);
    }

    function isHoistedVariable(node: VariableDeclaration) {
        return isIdentifier(node.name)
            && !node.initializer;
    }

    export function isHoistedVariableStatement(node: Statement) {
        return isCustomPrologue(node)
            && isVariableStatement(node)
            && every(node.declarationList.declarations, isHoistedVariable);
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
                    // These are not allowed inside a generator now, but eventually they may be allowed
                    // as local types. Regardless, skip them to avoid the work.
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
            isPropertyDeclaration(node) ? hasEffectiveReadonlyModifier(node) && hasStaticModifier(node) :
            isPropertySignature(node) && hasEffectiveReadonlyModifier(node);
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

    export function getPropertyAssignment(objectLiteral: ObjectLiteralExpression, key: string, key2?: string): readonly PropertyAssignment[] {
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

    export function getTsConfigPropArray(tsConfigSourceFile: TsConfigSourceFile | undefined, propKey: string): readonly PropertyAssignment[] {
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
        // private names cannot be used with decorators yet
        if (isNamedDeclaration(node) && isPrivateIdentifier(node.name)) {
            return false;
        }
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
            case SyntaxKind.NoSubstitutionTemplateLiteral:
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

    export function isPartOfTypeQuery(node: Node) {
        while (node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.Identifier) {
            node = node.parent;
        }
        return node.kind === SyntaxKind.TypeQuery;
    }

    export function isExternalModuleImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration & { moduleReference: ExternalModuleReference } {
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

    export function isSourceFileNotJson(file: SourceFile) {
        return !isJsonSourceFile(file);
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
    export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: true): callExpression is RequireOrImportCall & { expression: Identifier, arguments: [StringLiteralLike] };
    export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: boolean): callExpression is CallExpression;
    export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: boolean): callExpression is CallExpression {
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
        return !requireStringLiteralLikeArgument || isStringLiteralLike(arg);
    }

    /**
     * Returns true if the node is a VariableDeclaration initialized to a require call (see `isRequireCall`).
     * This function does not test if the node is in a JavaScript file or not.
     */
    export function isRequireVariableDeclaration(node: Node, requireStringLiteralLikeArgument: true): node is RequireVariableDeclaration;
    export function isRequireVariableDeclaration(node: Node, requireStringLiteralLikeArgument: boolean): node is VariableDeclaration;
    export function isRequireVariableDeclaration(node: Node, requireStringLiteralLikeArgument: boolean): node is VariableDeclaration {
        return isVariableDeclaration(node) && !!node.initializer && isRequireCall(node.initializer, requireStringLiteralLikeArgument);
    }

    export function isRequireVariableDeclarationStatement(node: Node, requireStringLiteralLikeArgument = true): node is VariableStatement {
        return isVariableStatement(node) && every(node.declarationList.declarations, decl => isRequireVariableDeclaration(decl, requireStringLiteralLikeArgument));
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
        else if (isBinaryExpression(node.parent)) {
            const parentNode = node.parent;
            const parentNodeOperator = node.parent.operatorToken.kind;
            if (parentNodeOperator === SyntaxKind.EqualsToken && parentNode.right === node) {
                name = parentNode.left;
                decl = name;
            }
            else if (parentNodeOperator === SyntaxKind.BarBarToken || parentNodeOperator === SyntaxKind.QuestionQuestionToken) {
                if (isVariableDeclaration(parentNode.parent) && parentNode.parent.initializer === parentNode) {
                    name = parentNode.parent.name;
                    decl = parentNode.parent;
                }
                else if (isBinaryExpression(parentNode.parent) && parentNode.parent.operatorToken.kind === SyntaxKind.EqualsToken && parentNode.parent.right === parentNode) {
                    name = parentNode.parent.left;
                    decl = name;
                }

                if (!name || !isBindableStaticNameExpression(name) || !isSameEntityName(name, parentNode.left)) {
                    return undefined;
                }
            }
        }

        if (!name || !getExpandoInitializer(node, isPrototypeAccess(name))) {
            return undefined;
        }
        return decl;
    }

    export function isAssignmentDeclaration(decl: Declaration) {
        return isBinaryExpression(decl) || isAccessExpression(decl) || isIdentifier(decl) || isCallExpression(decl);
    }

    /** Get the initializer, taking into account defaulted Javascript initializers */
    export function getEffectiveInitializer(node: HasExpressionInitializer) {
        if (isInJSFile(node) && node.initializer &&
            isBinaryExpression(node.initializer) &&
                (node.initializer.operatorToken.kind === SyntaxKind.BarBarToken || node.initializer.operatorToken.kind === SyntaxKind.QuestionQuestionToken) &&
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
        return forEach(node.properties, p =>
            isPropertyAssignment(p) &&
            isIdentifier(p.name) &&
            p.name.escapedText === "value" &&
            p.initializer &&
            getExpandoInitializer(p.initializer, isPrototypeAssignment));
    }

    /**
     * Get the assignment 'initializer' -- the righthand side-- when the initializer is container-like (See getExpandoInitializer).
     * We treat the right hand side of assignments with container-like initializers as declarations.
     */
    export function getAssignedExpandoInitializer(node: Node | undefined): Expression | undefined {
        if (node && node.parent && isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
            const isPrototypeAssignment = isPrototypeAccess(node.parent.left);
            return getExpandoInitializer(node.parent.right, isPrototypeAssignment) ||
                getDefaultedExpandoInitializer(node.parent.left, node.parent.right, isPrototypeAssignment);
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
    function getDefaultedExpandoInitializer(name: Expression, initializer: Expression, isPrototypeAssignment: boolean) {
        const e = isBinaryExpression(initializer)
            && (initializer.operatorToken.kind === SyntaxKind.BarBarToken || initializer.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
            && getExpandoInitializer(initializer.right, isPrototypeAssignment);
        if (e && isSameEntityName(name, (initializer as BinaryExpression).left)) {
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
            const parent = ((node.parent.operatorToken.kind === SyntaxKind.BarBarToken || node.parent.operatorToken.kind === SyntaxKind.QuestionQuestionToken) && isBinaryExpression(node.parent.parent)) ? node.parent.parent : node.parent;
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
        if (isPropertyNameLiteral(name) && isPropertyNameLiteral(initializer)) {
            return getTextOfIdentifierOrLiteral(name) === getTextOfIdentifierOrLiteral(name);
        }
        if (isIdentifier(name) && isLiteralLikeAccess(initializer) &&
            (initializer.expression.kind === SyntaxKind.ThisKeyword ||
                isIdentifier(initializer.expression) &&
                (initializer.expression.escapedText === "window" ||
                    initializer.expression.escapedText === "self" ||
                    initializer.expression.escapedText === "global"))) {

            const nameOrArgument = getNameOrArgument(initializer);
            if (isPrivateIdentifier(nameOrArgument)) {
                Debug.fail("Unexpected PrivateIdentifier in name expression with literal-like access.");
            }
            return isSameEntityName(name, nameOrArgument);
        }
        if (isLiteralLikeAccess(name) && isLiteralLikeAccess(initializer)) {
            return getElementOrPropertyAccessName(name) === getElementOrPropertyAccessName(initializer)
                && isSameEntityName(name.expression, initializer.expression);
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

    export function isModuleIdentifier(node: Node) {
        return isIdentifier(node) && node.escapedText === "module";
    }

    export function isModuleExportsAccessExpression(node: Node): node is LiteralLikeElementAccessExpression & { expression: Identifier } {
        return (isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node))
            && isModuleIdentifier(node.expression)
            && getElementOrPropertyAccessName(node) === "exports";
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
            isBindableStaticNameExpression(expr.arguments[0], /*excludeThisKeyword*/ true);
    }

    /** x.y OR x[0] */
    export function isLiteralLikeAccess(node: Node): node is LiteralLikeElementAccessExpression | PropertyAccessExpression {
        return isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node);
    }

    /** x[0] OR x['a'] OR x[Symbol.y] */
    export function isLiteralLikeElementAccess(node: Node): node is LiteralLikeElementAccessExpression {
        return isElementAccessExpression(node) && (
            isStringOrNumericLiteralLike(node.argumentExpression) ||
            isWellKnownSymbolSyntactically(node.argumentExpression));
    }

    /** Any series of property and element accesses. */
    export function isBindableStaticAccessExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticAccessExpression {
        return isPropertyAccessExpression(node) && (!excludeThisKeyword && node.expression.kind === SyntaxKind.ThisKeyword || isIdentifier(node.name) && isBindableStaticNameExpression(node.expression, /*excludeThisKeyword*/ true))
            || isBindableStaticElementAccessExpression(node, excludeThisKeyword);
    }

    /** Any series of property and element accesses, ending in a literal element access */
    export function isBindableStaticElementAccessExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticElementAccessExpression {
        return isLiteralLikeElementAccess(node)
            && ((!excludeThisKeyword && node.expression.kind === SyntaxKind.ThisKeyword) ||
                isEntityNameExpression(node.expression) ||
                isBindableStaticAccessExpression(node.expression, /*excludeThisKeyword*/ true));
    }

    export function isBindableStaticNameExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticNameExpression {
        return isEntityNameExpression(node) || isBindableStaticAccessExpression(node, excludeThisKeyword);
    }

    export function getNameOrArgument(expr: PropertyAccessExpression | LiteralLikeElementAccessExpression) {
        if (isPropertyAccessExpression(expr)) {
            return expr.name;
        }
        return expr.argumentExpression;
    }

    function getAssignmentDeclarationKindWorker(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
        if (isCallExpression(expr)) {
            if (!isBindableObjectDefinePropertyCall(expr)) {
                return AssignmentDeclarationKind.None;
            }
            const entityName = expr.arguments[0];
            if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
                return AssignmentDeclarationKind.ObjectDefinePropertyExports;
            }
            if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
                return AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
            }
            return AssignmentDeclarationKind.ObjectDefinePropertyValue;
        }
        if (expr.operatorToken.kind !== SyntaxKind.EqualsToken || !isAccessExpression(expr.left)) {
            return AssignmentDeclarationKind.None;
        }
        if (isBindableStaticNameExpression(expr.left.expression, /*excludeThisKeyword*/ true) && getElementOrPropertyAccessName(expr.left) === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
            // F.prototype = { ... }
            return AssignmentDeclarationKind.Prototype;
        }
        return getAssignmentDeclarationPropertyAccessKind(expr.left);
    }

    /**
     * Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
     * throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
     */
    /* @internal */
    export function getElementOrPropertyAccessArgumentExpressionOrName(node: AccessExpression): Identifier | PrivateIdentifier | StringLiteralLike | NumericLiteral | ElementAccessExpression | undefined {
        if (isPropertyAccessExpression(node)) {
            return node.name;
        }
        const arg = skipParentheses(node.argumentExpression);
        if (isNumericLiteral(arg) || isStringLiteralLike(arg)) {
            return arg;
        }
        return node;
    }

    /* @internal */
    export function getElementOrPropertyAccessName(node: LiteralLikeElementAccessExpression | PropertyAccessExpression): __String;
    export function getElementOrPropertyAccessName(node: AccessExpression): __String | undefined;
    export function getElementOrPropertyAccessName(node: AccessExpression): __String | undefined {
        const name = getElementOrPropertyAccessArgumentExpressionOrName(node);
        if (name) {
            if (isIdentifier(name)) {
                return name.escapedText;
            }
            if (isStringLiteralLike(name) || isNumericLiteral(name)) {
                return escapeLeadingUnderscores(name.text);
            }
        }
        if (isElementAccessExpression(node) && isWellKnownSymbolSyntactically(node.argumentExpression)) {
            return getPropertyNameForKnownSymbolName(idText((<PropertyAccessExpression>node.argumentExpression).name));
        }
        return undefined;
    }

    export function getAssignmentDeclarationPropertyAccessKind(lhs: AccessExpression): AssignmentDeclarationKind {
        if (lhs.expression.kind === SyntaxKind.ThisKeyword) {
            return AssignmentDeclarationKind.ThisProperty;
        }
        else if (isModuleExportsAccessExpression(lhs)) {
            // module.exports = expr
            return AssignmentDeclarationKind.ModuleExports;
        }
        else if (isBindableStaticNameExpression(lhs.expression, /*excludeThisKeyword*/ true)) {
            if (isPrototypeAccess(lhs.expression)) {
                // F.G....prototype.x = expr
                return AssignmentDeclarationKind.PrototypeProperty;
            }

            let nextToLast = lhs;
            while (!isIdentifier(nextToLast.expression)) {
                nextToLast = nextToLast.expression as Exclude<BindableStaticNameExpression, Identifier>;
            }
            const id = nextToLast.expression;
            if ((id.escapedText === "exports" ||
                id.escapedText === "module" && getElementOrPropertyAccessName(nextToLast) === "exports") &&
                // ExportsProperty does not support binding with computed names
                isBindableStaticAccessExpression(lhs)) {
                // exports.name = expr OR module.exports.name = expr OR exports["name"] = expr ...
                return AssignmentDeclarationKind.ExportsProperty;
            }
            if (isBindableStaticNameExpression(lhs, /*excludeThisKeyword*/ true) || (isElementAccessExpression(lhs) && isDynamicName(lhs))) {
                // F.G...x = expr
                return AssignmentDeclarationKind.Property;
            }
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

    export function isSpecialPropertyDeclaration(expr: PropertyAccessExpression | ElementAccessExpression): expr is PropertyAccessExpression | LiteralLikeElementAccessExpression {
        return isInJSFile(expr) &&
            expr.parent && expr.parent.kind === SyntaxKind.ExpressionStatement &&
            (!isElementAccessExpression(expr) || isLiteralLikeElementAccess(expr)) &&
            !!getJSDocTypeTag(expr.parent);
    }

    export function setValueDeclaration(symbol: Symbol, node: Declaration): void {
        const { valueDeclaration } = symbol;
        if (!valueDeclaration ||
            !(node.flags & NodeFlags.Ambient && !(valueDeclaration.flags & NodeFlags.Ambient)) &&
            (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
            (valueDeclaration.kind !== node.kind && isEffectiveModuleDeclaration(valueDeclaration))) {
            // other kinds of value declarations take precedence over modules and assignment declarations
            symbol.valueDeclaration = node;
        }
    }

    export function isFunctionSymbol(symbol: Symbol | undefined) {
        if (!symbol || !symbol.valueDeclaration) {
            return false;
        }
        const decl = symbol.valueDeclaration;
        return decl.kind === SyntaxKind.FunctionDeclaration || isVariableDeclaration(decl) && decl.initializer && isFunctionLike(decl.initializer);
    }

    export function importFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport {
        return tryGetImportFromModuleSpecifier(node) || Debug.failBadSyntaxKind(node.parent);
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

    export function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): ImportEqualsDeclaration | NamespaceImport | NamespaceExport | undefined {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return node.importClause && tryCast(node.importClause.namedBindings, isNamespaceImport);
            case SyntaxKind.ImportEqualsDeclaration:
                return node;
            case SyntaxKind.ExportDeclaration:
                return node.exportClause && tryCast(node.exportClause, isNamespaceExport);
            default:
                return Debug.assertNever(node);
        }
    }

    export function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): boolean {
        return node.kind === SyntaxKind.ImportDeclaration && !!node.importClause && !!node.importClause.name;
    }

    export function forEachImportClauseDeclaration<T>(node: ImportClause, action: (declaration: ImportClause | NamespaceImport | ImportSpecifier) => T | undefined): T | undefined {
        if (node.name) {
            const result = action(node);
            if (result) return result;
        }
        if (node.namedBindings) {
            const result = isNamespaceImport(node.namedBindings)
                ? action(node.namedBindings)
                : forEach(node.namedBindings.elements, action);
            if (result) return result;
        }
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

    export function isJSDocTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag {
        return node.kind === SyntaxKind.JSDocTypedefTag || node.kind === SyntaxKind.JSDocCallbackTag || node.kind === SyntaxKind.JSDocEnumTag;
    }

    export function isTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag | TypeAliasDeclaration {
        return isJSDocTypeAlias(node) || isTypeAliasDeclaration(node);
    }

    function getSourceOfAssignment(node: Node): Node | undefined {
        return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === SyntaxKind.EqualsToken
            ? getRightMostAssignedExpression(node.expression)
            : undefined;
    }

    function getSourceOfDefaultedAssignment(node: Node): Node | undefined {
        return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            getAssignmentDeclarationKind(node.expression) !== AssignmentDeclarationKind.None &&
            isBinaryExpression(node.expression.right) &&
            (node.expression.right.operatorToken.kind === SyntaxKind.BarBarToken || node.expression.right.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
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

    export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[] {
        let result: (JSDoc | JSDocTag)[] | undefined;
        // Pull parameter comments from declaring function as well
        if (isVariableLike(hostNode) && hasInitializer(hostNode) && hasJSDocNodes(hostNode.initializer!)) {
            result = append(result, last((hostNode.initializer as HasJSDoc).jsDoc!));
        }

        let node: Node | undefined = hostNode;
        while (node && node.parent) {
            if (hasJSDocNodes(node)) {
                result = append(result, last(node.jsDoc!));
            }

            if (node.kind === SyntaxKind.Parameter) {
                result = addRange(result, (noCache ? getJSDocParameterTagsNoCache : getJSDocParameterTags)(node as ParameterDeclaration));
                break;
            }
            if (node.kind === SyntaxKind.TypeParameter) {
                result = addRange(result, (noCache ? getJSDocTypeParameterTagsNoCache : getJSDocTypeParameterTags)(node as TypeParameterDeclaration));
                break;
            }
            node = getNextJSDocCommentLocation(node);
        }
        return result || emptyArray;
    }

    function getNextJSDocCommentLocation(node: Node) {
        const parent = node.parent;
        if (parent.kind === SyntaxKind.PropertyAssignment ||
            parent.kind === SyntaxKind.ExportAssignment ||
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
        const host = getEffectiveJSDocHost(node);
        return host && isFunctionLike(host) ? host : undefined;
    }

    export function getEffectiveJSDocHost(node: Node): Node | undefined {
        const host = getJSDocHost(node);
        const decl = getSourceOfDefaultedAssignment(host) ||
            getSourceOfAssignment(host) ||
            getSingleInitializerOfVariableStatementOrPropertyDeclaration(host) ||
            getSingleVariableOfVariableStatement(host) ||
            getNestedModuleDeclaration(host) ||
            host;
        return decl;
    }

    /** Use getEffectiveJSDocHost if you additionally need to look for jsdoc on parent nodes, like assignments.  */
    export function getJSDocHost(node: Node): HasJSDoc {
        return Debug.checkDefined(findAncestor(node.parent, isJSDoc)).parent;
    }

    export function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & { parent: JSDocTemplateTag }): TypeParameterDeclaration | undefined {
        const name = node.name.escapedText;
        const { typeParameters } = (node.parent.parent.parent as SignatureDeclaration | InterfaceDeclaration | ClassDeclaration);
        return typeParameters && find(typeParameters, p => p.name.escapedText === name);
    }

    export function hasRestParameter(s: SignatureDeclaration | JSDocSignature): boolean {
        const last = lastOrUndefined<ParameterDeclaration | JSDocParameterTag>(s.parameters);
        return !!last && isRestParameter(last);
    }

    export function isRestParameter(node: ParameterDeclaration | JSDocParameterTag): boolean {
        const type = isJSDocParameterTag(node) ? (node.typeExpression && node.typeExpression.type) : node.type;
        return (node as ParameterDeclaration).dotDotDotToken !== undefined || !!type && type.kind === SyntaxKind.JSDocVariadicType;
    }

    export function hasTypeArguments(node: Node): node is HasTypeArguments {
        return !!(node as HasTypeArguments).typeArguments;
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
                    return isAssignmentOperator(binaryOperator) && !isLogicalOrCoalescingAssignmentOperator(binaryOperator) && (<BinaryExpression>parent).left === node ?
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
        return skipOuterExpressions(node, OuterExpressionKinds.Parentheses);
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

    export function isNodeDescendantOf(node: Node, ancestor: Node | undefined): boolean {
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
            case SyntaxKind.NoSubstitutionTemplateLiteral:
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
            case SyntaxKind.PrivateIdentifier:
                return isDeclaration(parent) && parent.name === name ? parent : undefined;
            default:
                return undefined;
        }
    }

    export function isLiteralComputedPropertyDeclarationName(node: Node) {
        return isStringOrNumericLiteralLike(node) &&
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
    // export * as ns <symbol> from ...
    // export = <EntityNameExpression>
    // export default <EntityNameExpression>
    // module.exports = <EntityNameExpression>
    // {<Identifier>}
    // {name: <EntityNameExpression>}
    export function isAliasSymbolDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.ImportEqualsDeclaration ||
            node.kind === SyntaxKind.NamespaceExportDeclaration ||
            node.kind === SyntaxKind.ImportClause && !!(<ImportClause>node).name ||
            node.kind === SyntaxKind.NamespaceImport ||
            node.kind === SyntaxKind.NamespaceExport ||
            node.kind === SyntaxKind.ImportSpecifier ||
            node.kind === SyntaxKind.ExportSpecifier ||
            node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(<ExportAssignment>node) ||
            isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.ModuleExports && exportAssignmentIsAlias(node) ||
            isPropertyAccessExpression(node) && isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.EqualsToken && isAliasableExpression(node.parent.right) ||
            node.kind === SyntaxKind.ShorthandPropertyAssignment ||
            node.kind === SyntaxKind.PropertyAssignment && isAliasableExpression((node as PropertyAssignment).initializer);
    }

    export function getAliasDeclarationFromName(node: EntityName): Declaration | undefined {
        switch (node.parent.kind) {
            case SyntaxKind.ImportClause:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.NamespaceImport:
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.ExportAssignment:
            case SyntaxKind.ImportEqualsDeclaration:
                return node.parent as Declaration;
            case SyntaxKind.QualifiedName:
                do {
                    node = node.parent as QualifiedName;
                } while (node.parent.kind === SyntaxKind.QualifiedName);
                return getAliasDeclarationFromName(node);
        }
    }

    export function isAliasableExpression(e: Expression) {
        return isEntityNameExpression(e) || isClassExpression(e);
    }

    export function exportAssignmentIsAlias(node: ExportAssignment | BinaryExpression): boolean {
        const e = getExportAssignmentExpression(node);
        return isAliasableExpression(e);
    }

    export function getExportAssignmentExpression(node: ExportAssignment | BinaryExpression): Expression {
        return isExportAssignment(node) ? node.expression : node.right;
    }

    export function getPropertyAssignmentAliasLikeExpression(node: PropertyAssignment | ShorthandPropertyAssignment | PropertyAccessExpression): Expression {
        return node.kind === SyntaxKind.ShorthandPropertyAssignment ? node.name : node.kind === SyntaxKind.PropertyAssignment ? node.initializer :
            (node.parent as BinaryExpression).right;
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

    export function getEffectiveImplementsTypeNodes(node: ClassLikeDeclaration): undefined | readonly ExpressionWithTypeArguments[]{
        if(isInJSFile(node)) {
            return getJSDocImplementsTags(node).map(n => n.class);
        }
        else {
            const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ImplementsKeyword);
            return heritageClause?.types;
        }
    }

    /** Returns the node in an `extends` or `implements` clause of a class or interface. */
    export function getAllSuperTypeNodes(node: Node): readonly TypeNode[] {
        return isInterfaceDeclaration(node) ? getInterfaceBaseTypeNodes(node) || emptyArray :
            isClassLike(node) ? concatenate(singleElementArray(getEffectiveBaseTypeNode(node)), getEffectiveImplementsTypeNodes(node)) || emptyArray :
            emptyArray;
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

    export function isFutureReservedKeyword(token: SyntaxKind): boolean {
        return SyntaxKind.FirstFutureReservedWord <= token && token <= SyntaxKind.LastFutureReservedWord;
    }

    export function isStringANonContextualKeyword(name: string) {
        const token = stringToToken(name);
        return token !== undefined && isNonContextualKeyword(token);
    }

    export function isStringAKeyword(name: string) {
        const token = stringToToken(name);
        return token !== undefined && isKeyword(token);
    }

    export function isIdentifierANonContextualKeyword({ originalKeywordKind }: Identifier): boolean {
        return !!originalKeywordKind && !isContextualKeyword(originalKeywordKind);
    }

    export type TriviaKind =
        SyntaxKind.SingleLineCommentTrivia
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
                if (hasSyntacticModifier(node, ModifierFlags.Async)) {
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
                    && hasSyntacticModifier(node, ModifierFlags.Async);
        }
        return false;
    }

    export function isStringOrNumericLiteralLike(node: Node): node is StringLiteralLike | NumericLiteral {
        return isStringLiteralLike(node) || isNumericLiteral(node);
    }

    export function isSignedNumericLiteral(node: Node): node is PrefixUnaryExpression & { operand: NumericLiteral } {
        return isPrefixUnaryExpression(node) && (node.operator === SyntaxKind.PlusToken || node.operator === SyntaxKind.MinusToken) && isNumericLiteral(node.operand);
    }

    /**
     * A declaration has a dynamic name if all of the following are true:
     *   1. The declaration has a computed property name.
     *   2. The computed name is *not* expressed as a StringLiteral.
     *   3. The computed name is *not* expressed as a NumericLiteral.
     *   4. The computed name is *not* expressed as a PlusToken or MinusToken
     *      immediately followed by a NumericLiteral.
     *   5. The computed name is *not* expressed as `Symbol.<name>`, where `<name>`
     *      is a property of the Symbol constructor that denotes a built-in
     *      Symbol.
     */
    export function hasDynamicName(declaration: Declaration): declaration is DynamicNamedDeclaration | DynamicNamedBinaryExpression {
        const name = getNameOfDeclaration(declaration);
        return !!name && isDynamicName(name);
    }

    export function isDynamicName(name: DeclarationName): boolean {
        if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
            return false;
        }
        const expr = isElementAccessExpression(name) ? name.argumentExpression : name.expression;
        return !isStringOrNumericLiteralLike(expr) &&
            !isSignedNumericLiteral(expr) &&
            !isWellKnownSymbolSyntactically(expr);
    }

    /**
     * Checks if the expression is of the form:
     *    Symbol.name
     * where Symbol is literally the word "Symbol", and name is any identifierName
     */
    export function isWellKnownSymbolSyntactically(node: Node): node is WellKnownSymbolExpression {
        return isPropertyAccessExpression(node) && isESSymbolIdentifier(node.expression);
    }

    export function getPropertyNameForPropertyNameNode(name: PropertyName): __String | undefined {
        switch (name.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.PrivateIdentifier:
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
                else if (isSignedNumericLiteral(nameExpression)) {
                    if (nameExpression.operator === SyntaxKind.MinusToken) {
                        return tokenToString(nameExpression.operator) + nameExpression.operand.text as __String;
                    }
                    return nameExpression.operand.text as __String;
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
        return isIdentifierOrPrivateIdentifier(node) ? idText(node) : node.text;
    }

    export function getEscapedTextOfIdentifierOrLiteral(node: PropertyNameLiteral): __String {
        return isIdentifierOrPrivateIdentifier(node) ? node.escapedText : escapeLeadingUnderscores(node.text);
    }

    export function getPropertyNameForUniqueESSymbol(symbol: Symbol): __String {
        return `__@${getSymbolId(symbol)}@${symbol.escapedName}` as __String;
    }

    export function getPropertyNameForKnownSymbolName(symbolName: string): __String {
        return "__@" + symbolName as __String;
    }

    export function getSymbolNameForPrivateIdentifier(containingClassSymbol: Symbol, description: __String): __String {
        return `__#${getSymbolId(containingClassSymbol)}@${description}` as __String;
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
                    case SyntaxKind.BarBarEqualsToken:
                    case SyntaxKind.AmpersandAmpersandEqualsToken:
                    case SyntaxKind.QuestionQuestionEqualsToken:
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
                    case SyntaxKind.BarBarEqualsToken:
                    case SyntaxKind.AmpersandAmpersandEqualsToken:
                    case SyntaxKind.QuestionQuestionEqualsToken:
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
            case SyntaxKind.QuestionQuestionToken:
                return 4;
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

    const templateSubstitutionRegExp = /\$\{/g;
    function escapeTemplateSubstitution(str: string): string {
        return str.replace(templateSubstitutionRegExp, "\\${");
    }

    /** @internal */
    export function hasInvalidEscape(template: TemplateLiteral): boolean {
        return template && !!(isNoSubstitutionTemplateLiteral(template)
            ? template.templateFlags
            : (template.head.templateFlags || some(template.templateSpans, span => !!span.literal.templateFlags)));
    }

    // This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
    // paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
    // the language service. These characters should be escaped when printing, and if any characters are added,
    // the map below must be updated. Note that this regexp *does not* include the 'delete' character.
    // There is no reason for this other than that JSON.stringify does not handle it either.
    const doubleQuoteEscapedCharsRegExp = /[\\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    const singleQuoteEscapedCharsRegExp = /[\\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    // Template strings should be preserved as much as possible
    const backtickQuoteEscapedCharsRegExp = /[\\`]/g;
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

    function encodeUtf16EscapeSequence(charCode: number): string {
        const hexCharCode = charCode.toString(16).toUpperCase();
        const paddedHexCode = ("0000" + hexCharCode).slice(-4);
        return "\\u" + paddedHexCode;
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
        return escapedCharsMap.get(c) || encodeUtf16EscapeSequence(c.charCodeAt(0));
    }

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

    const nonAsciiCharacters = /[^\u0000-\u007F]/g;
    export function escapeNonAsciiString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
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
    const jsxEscapedCharsMap = createMapFromTemplate({
        "\"": "&quot;",
        "\'": "&apos;"
    });

    function encodeJsxCharacterEntity(charCode: number): string {
        const hexCharCode = charCode.toString(16).toUpperCase();
        return "&#x" + hexCharCode + ";";
    }

    function getJsxAttributeStringReplacement(c: string) {
        if (c.charCodeAt(0) === CharacterCodes.nullCharacter) {
            return "&#0;";
        }
        return jsxEscapedCharsMap.get(c) || encodeJsxCharacterEntity(c.charCodeAt(0));
    }

    export function escapeJsxAttributeString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote) {
        const escapedCharsRegExp =
            quoteChar === CharacterCodes.singleQuote ? jsxSingleQuoteEscapedCharsRegExp :
            jsxDoubleQuoteEscapedCharsRegExp;
        return s.replace(escapedCharsRegExp, getJsxAttributeStringReplacement);
    }

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
        return charCode === CharacterCodes.singleQuote ||
            charCode === CharacterCodes.doubleQuote ||
            charCode === CharacterCodes.backtick;
    }

    export function isIntrinsicJsxName(name: __String | string) {
        const ch = (name as string).charCodeAt(0);
        return (ch >= CharacterCodes.a && ch <= CharacterCodes.z) || stringContains((name as string), "-");
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
        let hasTrailingComment = false;

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
            hasTrailingWhitespace: () => !!output.length && isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
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
            writeComment,
            getTextPosWithWriteLine
        };
    }

    export function getTrailingSemicolonDeferringWriter(writer: EmitTextWriter): EmitTextWriter {
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

    export function hostUsesCaseSensitiveFileNames(host: { useCaseSensitiveFileNames?(): boolean; }): boolean {
        return host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : false;
    }

    export function hostGetCanonicalFileName(host: { useCaseSensitiveFileNames?(): boolean; }): GetCanonicalFileName {
        return createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host));
    }

    export interface ResolveModuleNameResolutionHost {
        getCanonicalFileName(p: string): string;
        getCommonSourceDirectory(): string;
        getCurrentDirectory(): string;
    }

    export function getResolvedExternalModuleName(host: ResolveModuleNameResolutionHost, file: SourceFile, referenceFile?: SourceFile): string {
        return file.moduleName || getExternalModuleNameFromPath(host, file.fileName, referenceFile && referenceFile.fileName);
    }

    export function getExternalModuleNameFromDeclaration(host: ResolveModuleNameResolutionHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): string | undefined {
        const file = resolver.getExternalModuleFileFromDeclaration(declaration);
        if (!file || file.isDeclarationFile) {
            return undefined;
        }
        return getResolvedExternalModuleName(host, file);
    }

    /**
     * Resolves a local path to a path which is absolute to the base of the emit
     */
    export function getExternalModuleNameFromPath(host: ResolveModuleNameResolutionHost, fileName: string, referencePath?: string): string {
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

    export function outFile(options: CompilerOptions) {
        return options.outFile || options.out;
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
    export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile, forceDtsEmit?: boolean): readonly SourceFile[] {
        const options = host.getCompilerOptions();
        if (outFile(options)) {
            const moduleKind = getEmitModuleKind(options);
            const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
            // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
            return filter(
                host.getSourceFiles(),
                sourceFile =>
                    (moduleEmitEnabled || !isExternalModule(sourceFile)) &&
                    sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
            );
        }
        else {
            const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
            return filter(
                sourceFiles,
                sourceFile => sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
            );
        }
    }

    /** Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks. */
    export function sourceFileMayBeEmitted(sourceFile: SourceFile, host: SourceFileMayBeEmittedHost, forceDtsEmit?: boolean) {
        const options = host.getCompilerOptions();
        return !(options.noEmitForJsFiles && isSourceFileJS(sourceFile)) &&
            !sourceFile.isDeclarationFile &&
            !host.isSourceFileFromExternalLibrary(sourceFile) &&
            !(isJsonSourceFile(sourceFile) && host.getResolvedProjectReferenceToRedirect(sourceFile.fileName)) &&
            (forceDtsEmit || !host.isSourceOfProjectReferenceRedirect(sourceFile.fileName));
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

    export function writeFile(host: { writeFile: WriteFileCallback; }, diagnostics: DiagnosticCollection, fileName: string, data: string, writeByteOrderMark: boolean, sourceFiles?: readonly SourceFile[]) {
        host.writeFile(fileName, data, writeByteOrderMark, hostErrorMessage => {
            diagnostics.add(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
        }, sourceFiles);
    }

    function ensureDirectoriesExist(
        directoryPath: string,
        createDirectory: (path: string) => void,
        directoryExists: (path: string) => boolean): void {
        if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
            const parentDirectory = getDirectoryPath(directoryPath);
            ensureDirectoriesExist(parentDirectory, createDirectory, directoryExists);
            createDirectory(directoryPath);
        }
    }

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
            ensureDirectoriesExist(getDirectoryPath(normalizePath(path)), createDirectory, directoryExists);
            writeFile(path, data, writeByteOrderMark);
        }
    }

    export function getLineOfLocalPosition(sourceFile: SourceFile, pos: number) {
        const lineStarts = getLineStarts(sourceFile);
        return computeLineOfPosition(lineStarts, pos);
    }

    export function getLineOfLocalPositionFromLineMap(lineMap: readonly number[], pos: number) {
        return computeLineOfPosition(lineMap, pos);
    }

    export function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration & { body: FunctionBody } | undefined {
        return find(node.members, (member): member is ConstructorDeclaration & { body: FunctionBody } => isConstructorDeclaration(member) && nodeIsPresent(member.body));
    }

    export function getSetAccessorValueParameter(accessor: SetAccessorDeclaration): ParameterDeclaration | undefined {
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

    export function getAllAccessorDeclarations(declarations: readonly Declaration[], accessor: AccessorDeclaration): AllAccessorDeclarations {
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
                    && hasSyntacticModifier(member, ModifierFlags.Static) === hasSyntacticModifier(accessor, ModifierFlags.Static)) {
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
                            getAccessor = member;
                        }

                        if (member.kind === SyntaxKind.SetAccessor && !setAccessor) {
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

    /**
     * Gets the effective type annotation of a variable, parameter, or property. If the node was
     * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
     * functions only the JSDoc case.
     */
    export function getEffectiveTypeAnnotationNode(node: Node): TypeNode | undefined {
        if (!isInJSFile(node) && isFunctionDeclaration(node)) return undefined;
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

    export function getJSDocTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[] {
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

    export function emitNewLineBeforeLeadingComments(lineMap: readonly number[], writer: EmitTextWriter, node: TextRange, leadingComments: readonly CommentRange[] | undefined) {
        emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
    }

    export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: readonly number[], writer: EmitTextWriter, pos: number, leadingComments: readonly CommentRange[] | undefined) {
        // If the leading comments start on different line than the start of node, write new line
        if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
            writer.writeLine();
        }
    }

    export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: readonly number[], writer: EmitTextWriter, pos: number, commentPos: number) {
        // If the leading comments start on different line than the start of node, write new line
        if (pos !== commentPos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
            writer.writeLine();
        }
    }

    export function emitComments(
        text: string,
        lineMap: readonly number[],
        writer: EmitTextWriter,
        comments: readonly CommentRange[] | undefined,
        leadingSeparator: boolean,
        trailingSeparator: boolean,
        newLine: string,
        writeComment: (text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void) {
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
    export function emitDetachedComments(text: string, lineMap: readonly number[], writer: EmitTextWriter,
        writeComment: (text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
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

    export function writeCommentRange(text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
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

    export function hasEffectiveModifiers(node: Node) {
        return getEffectiveModifierFlags(node) !== ModifierFlags.None;
    }

    export function hasSyntacticModifiers(node: Node) {
        return getSyntacticModifierFlags(node) !== ModifierFlags.None;
    }

    export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
        return !!getSelectedEffectiveModifierFlags(node, flags);
    }

    export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
        return !!getSelectedSyntacticModifierFlags(node, flags);
    }

    export function hasStaticModifier(node: Node): boolean {
        return hasSyntacticModifier(node, ModifierFlags.Static);
    }

    export function hasEffectiveReadonlyModifier(node: Node): boolean {
        return hasEffectiveModifier(node, ModifierFlags.Readonly);
    }

    export function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
        return getEffectiveModifierFlags(node) & flags;
    }

    export function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
        return getSyntacticModifierFlags(node) & flags;
    }

    function getModifierFlagsWorker(node: Node, includeJSDoc: boolean): ModifierFlags {
        if (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken) {
            return ModifierFlags.None;
        }

        if (!(node.modifierFlagsCache & ModifierFlags.HasComputedFlags)) {
            node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ModifierFlags.HasComputedFlags;
        }

        if (includeJSDoc && !(node.modifierFlagsCache & ModifierFlags.HasComputedJSDocModifiers) && isInJSFile(node) && node.parent) {
            node.modifierFlagsCache |= getJSDocModifierFlagsNoCache(node) | ModifierFlags.HasComputedJSDocModifiers;
        }

        return node.modifierFlagsCache & ~(ModifierFlags.HasComputedFlags | ModifierFlags.HasComputedJSDocModifiers);
    }

    /**
     * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
     *
     * NOTE: This function may use `parent` pointers.
     */
    export function getEffectiveModifierFlags(node: Node): ModifierFlags {
        return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
    }

    /**
     * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
     *
     * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
     */
    export function getSyntacticModifierFlags(node: Node): ModifierFlags {
        return getModifierFlagsWorker(node, /*includeJSDoc*/ false);
    }

    function getJSDocModifierFlagsNoCache(node: Node): ModifierFlags {
        let flags = ModifierFlags.None;
        if (isInJSFile(node) && !!node.parent && !isParameter(node)) {
            if (getJSDocPublicTagNoCache(node)) flags |= ModifierFlags.Public;
            if (getJSDocPrivateTagNoCache(node)) flags |= ModifierFlags.Private;
            if (getJSDocProtectedTagNoCache(node)) flags |= ModifierFlags.Protected;
            if (getJSDocReadonlyTagNoCache(node)) flags |= ModifierFlags.Readonly;
        }
        return flags;
    }

    /**
     * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifier flags cache on the node is ignored.
     *
     * NOTE: This function may use `parent` pointers.
     */
    export function getEffectiveModifierFlagsNoCache(node: Node): ModifierFlags {
        return getSyntacticModifierFlagsNoCache(node) | getJSDocModifierFlagsNoCache(node);
    }

    /**
     * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
     *
     * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
     */
    export function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
        let flags = modifiersToFlags(node.modifiers);
        if (node.flags & NodeFlags.NestedNamespace || (node.kind === SyntaxKind.Identifier && (<Identifier>node).isInJSDocNamespace)) {
            flags |= ModifierFlags.Export;
        }
        return flags;
    }

    export function modifiersToFlags(modifiers: NodeArray<Modifier> | undefined) {
        let flags = ModifierFlags.None;
        if (modifiers) {
            for (const modifier of modifiers) {
                flags |= modifierToFlag(modifier.kind);
            }
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

    export function isLogicalOrCoalescingAssignmentOperator(token: SyntaxKind): token is LogicalOrCoalescingAssignmentOperator {
        return token === SyntaxKind.BarBarEqualsToken
            || token === SyntaxKind.AmpersandAmpersandEqualsToken
            || token === SyntaxKind.QuestionQuestionEqualsToken;
    }

    export function isLogicalOrCoalescingAssignmentExpression(expr: BinaryExpression): expr is AssignmentExpression<Token<LogicalOrCoalescingAssignmentOperator>> {
        return isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
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

    export function getFirstIdentifier(node: EntityNameOrEntityNameExpression): Identifier {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                return node;
            case SyntaxKind.QualifiedName:
                do {
                    node = node.left;
                } while (node.kind !== SyntaxKind.Identifier);
                return node;
            case SyntaxKind.PropertyAccessExpression:
                do {
                    node = node.expression;
                } while (node.kind !== SyntaxKind.Identifier);
                return node;
        }
    }

    export function isDottedName(node: Expression): boolean {
        return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisKeyword || node.kind === SyntaxKind.SuperKeyword ||
            node.kind === SyntaxKind.PropertyAccessExpression && isDottedName((<PropertyAccessExpression>node).expression) ||
            node.kind === SyntaxKind.ParenthesizedExpression && isDottedName((<ParenthesizedExpression>node).expression);
    }

    export function isPropertyAccessEntityNameExpression(node: Node): node is PropertyAccessEntityNameExpression {
        return isPropertyAccessExpression(node) && isIdentifier(node.name) && isEntityNameExpression(node.expression);
    }

    export function tryGetPropertyAccessOrIdentifierToString(expr: Expression): string | undefined {
        if (isPropertyAccessExpression(expr)) {
            const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
            if (baseStr !== undefined) {
                return baseStr + "." + expr.name;
            }
        }
        else if (isIdentifier(expr)) {
            return unescapeLeadingUnderscores(expr.escapedText);
        }
        return undefined;
    }

    export function isPrototypeAccess(node: Node): node is BindableStaticAccessExpression {
        return isBindableStaticAccessExpression(node) && getElementOrPropertyAccessName(node) === "prototype";
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
        return symbol && length(symbol.declarations) > 0 && hasSyntacticModifier(symbol.declarations[0], ModifierFlags.Default);
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
        return positionsAreOnSameLine(
            getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false),
            getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false),
            sourceFile);
    }

    export function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
    }

    export function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false), range2.end, sourceFile);
    }

    export function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false), sourceFile);
    }

    export function getLinesBetweenRangeEndAndRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile, includeSecondRangeComments: boolean) {
        const range2Start = getStartPositionOfRange(range2, sourceFile, includeSecondRangeComments);
        return getLinesBetweenPositions(sourceFile, range1.end, range2Start);
    }

    export function getLinesBetweenRangeEndPositions(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return getLinesBetweenPositions(sourceFile, range1.end, range2.end);
    }

    export function isNodeArrayMultiLine(list: NodeArray<Node>, sourceFile: SourceFile): boolean {
        return !positionsAreOnSameLine(list.pos, list.end, sourceFile);
    }

    export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile) {
        return getLinesBetweenPositions(sourceFile, pos1, pos2) === 0;
    }

    export function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile, includeComments: boolean) {
        return positionIsSynthesized(range.pos) ? -1 : skipTrivia(sourceFile.text, range.pos, /*stopAfterLineBreak*/ false, includeComments);
    }

    export function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: SourceFile, includeComments?: boolean) {
        const startPos = skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
        const prevPos = getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile);
        return getLinesBetweenPositions(sourceFile, prevPos ?? stopPos, startPos);
    }

    export function getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: SourceFile, includeComments?: boolean) {
        const nextPos = skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
        return getLinesBetweenPositions(sourceFile, pos, Math.min(stopPos, nextPos));
    }

    function getPreviousNonWhitespacePosition(pos: number, stopPos = 0, sourceFile: SourceFile) {
        while (pos-- > stopPos) {
            if (!isWhiteSpaceLike(sourceFile.text.charCodeAt(pos))) {
                return pos;
            }
        }
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

    export interface MutateMapSkippingNewValuesOptions<T, U> {
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
    export function mutateMapSkippingNewValues<T, U>(
        map: Map<T>,
        newMap: ReadonlyMap<U>,
        options: MutateMapSkippingNewValuesOptions<T, U>
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

    export interface MutateMapOptions<T, U> extends MutateMapSkippingNewValuesOptions<T, U> {
        createNewValue(key: string, valueInNewMap: U): T;
    }

    /**
     * Mutates the map with newMap such that keys in map will be same as newMap.
     */
    export function mutateMap<T, U>(map: Map<T>, newMap: ReadonlyMap<U>, options: MutateMapOptions<T, U>) {
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

    // Return true if the given type is the constructor type for an abstract class
    export function isAbstractConstructorType(type: Type): boolean {
        return !!(getObjectFlags(type) & ObjectFlags.Anonymous) && !!type.symbol && isAbstractConstructorSymbol(type.symbol);
    }

    export function isAbstractConstructorSymbol(symbol: Symbol): boolean {
        if (symbol.flags & SymbolFlags.Class) {
            const declaration = getClassLikeDeclarationOfSymbol(symbol);
            return !!declaration && hasSyntacticModifier(declaration, ModifierFlags.Abstract);
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

    export function getNameOfAccessExpression(node: AccessExpression) {
        if (node.kind === SyntaxKind.PropertyAccessExpression) {
            return node.name;
        }
        Debug.assert(node.kind === SyntaxKind.ElementAccessExpression);
        return node.argumentExpression;
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

    export function isNamedImportsOrExports(node: Node): node is NamedImportsOrExports {
        return node.kind === SyntaxKind.NamedImports || node.kind === SyntaxKind.NamedExports;
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos?: number, end?: number) => Token<TKind>;
        getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos?: number, end?: number) => Identifier;
        getPrivateIdentifierConstructor(): new (kind: SyntaxKind.PrivateIdentifier, pos?: number, end?: number) => PrivateIdentifier;
        getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: __String) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker, flags: SignatureFlags) => Signature;
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

    function Signature(this: Signature, checker: TypeChecker, flags: SignatureFlags) {
        this.flags = flags;
        if (Debug.isDebugging) {
            this.checker = checker;
        }
    }

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

    function Token(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.pos = pos;
        this.end = end;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
    }

    function Identifier(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.pos = pos;
        this.end = end;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.original = undefined;
        this.flowNode = undefined;
    }

    function SourceMapSource(this: SourceMapSource, fileName: string, text: string, skipTrivia?: (pos: number) => number) {
        this.fileName = fileName;
        this.text = text;
        this.skipTrivia = skipTrivia || (pos => pos);
    }

    // eslint-disable-next-line prefer-const
    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getTokenConstructor: () => <any>Token,
        getIdentifierConstructor: () => <any>Identifier,
        getPrivateIdentifierConstructor: () => <any>Node,
        getSourceFileConstructor: () => <any>Node,
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature,
        getSourceMapSourceConstructor: () => <any>SourceMapSource,
    };

    export function setObjectAllocator(alloc: ObjectAllocator) {
        objectAllocator = alloc;
    }

    export function formatStringFromArgs(text: string, args: ArrayLike<string | number>, baseIndex = 0): string {
        return text.replace(/{(\d+)}/g, (_match, index: string) => "" + Debug.checkDefined(args[+index + baseIndex]));
    }

    export let localizedDiagnosticMessages: MapLike<string> | undefined;

    /* @internal */
    export function setLocalizedDiagnosticMessages(messages: typeof localizedDiagnosticMessages) {
        localizedDiagnosticMessages = messages;
    }

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

    export function chainDiagnosticMessages(details: DiagnosticMessageChain | DiagnosticMessageChain[] | undefined, message: DiagnosticMessage, ...args: (string | number | undefined)[]): DiagnosticMessageChain;
    export function chainDiagnosticMessages(details: DiagnosticMessageChain | DiagnosticMessageChain[] | undefined, message: DiagnosticMessage): DiagnosticMessageChain {
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

    export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): void {
        let lastChain = headChain;
        while (lastChain.next) {
            lastChain = lastChain.next[0];
        }

        lastChain.next = [tailChain];
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
        if (typeof t1 === "string" && typeof t2 === "string") {
            return compareStringsCaseSensitive(t1, t2);
        }
        else if (typeof t1 === "string") {
            return Comparison.LessThan;
        }
        else if (typeof t2 === "string") {
            return Comparison.GreaterThan;
        }
        let res = compareStringsCaseSensitive(t1.messageText, t2.messageText);
        if (res) {
            return res;
        }
        if (!t1.next && !t2.next) {
            return Comparison.EqualTo;
        }
        if (!t1.next) {
            return Comparison.LessThan;
        }
        if (!t2.next) {
            return Comparison.GreaterThan;
        }
        const len = Math.min(t1.next.length, t2.next.length);
        for (let i = 0; i < len; i++) {
            res = compareMessageText(t1.next[i], t2.next[i]);
            if (res) {
                return res;
            }
        }
        if (t1.next.length < t2.next.length) {
            return Comparison.LessThan;
        }
        else if (t1.next.length > t2.next.length) {
            return Comparison.GreaterThan;
        }
        return Comparison.EqualTo;
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
            case ModuleKind.ES2020:
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

    export type StrictOptionName =
        | "noImplicitAny"
        | "noImplicitThis"
        | "strictNullChecks"
        | "strictFunctionTypes"
        | "strictBindCallApply"
        | "strictPropertyInitialization"
        | "alwaysStrict"
        ;

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

    export function discoverProbableSymlinks(files: readonly SourceFile[], getCanonicalFileName: GetCanonicalFileName, cwd: string): ReadonlyMap<string> {
        const result = createMap<string>();
        const symlinks = flatten<readonly [string, string]>(mapDefined(files, sf =>
            sf.resolvedModules && compact(arrayFrom(mapIterator(sf.resolvedModules.values(), res =>
                res && res.originalPath && res.resolvedFileName !== res.originalPath ? [res.resolvedFileName, res.originalPath] as const : undefined)))));
        for (const [resolvedPath, originalPath] of symlinks) {
            const [commonResolved, commonOriginal] = guessDirectorySymlink(resolvedPath, originalPath, cwd, getCanonicalFileName);
            result.set(commonOriginal, commonResolved);
        }
        return result;
    }

    function guessDirectorySymlink(a: string, b: string, cwd: string, getCanonicalFileName: GetCanonicalFileName): [string, string] {
        const aParts = getPathComponents(toPath(a, cwd, getCanonicalFileName));
        const bParts = getPathComponents(toPath(b, cwd, getCanonicalFileName));
        while (!isNodeModulesOrScopedPackageDirectory(aParts[aParts.length - 2], getCanonicalFileName) &&
            !isNodeModulesOrScopedPackageDirectory(bParts[bParts.length - 2], getCanonicalFileName) &&
            getCanonicalFileName(aParts[aParts.length - 1]) === getCanonicalFileName(bParts[bParts.length - 1])) {
            aParts.pop();
            bParts.pop();
        }
        return [getPathFromPathComponents(aParts), getPathFromPathComponents(bParts)];
    }

    // KLUDGE: Don't assume one 'node_modules' links to another. More likely a single directory inside the node_modules is the symlink.
    // ALso, don't assume that an `@foo` directory is linked. More likely the contents of that are linked.
    function isNodeModulesOrScopedPackageDirectory(s: string, getCanonicalFileName: GetCanonicalFileName): boolean {
        return getCanonicalFileName(s) === "node_modules" || startsWith(s, "@");
    }

    function stripLeadingDirectorySeparator(s: string): string | undefined {
        return isAnyDirectorySeparator(s.charCodeAt(0)) ? s.slice(1) : undefined;
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

    export function getRegularExpressionsForWildcards(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): readonly string[] | undefined {
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
        readonly files: readonly string[];
        readonly directories: readonly string[];
    }

    export interface FileMatcherPatterns {
        /** One pattern for each "include" spec. */
        includeFilePatterns: readonly string[] | undefined;
        /** One pattern matching one of any of the "include" specs. */
        includeFilePattern: string | undefined;
        includeDirectoryPattern: string | undefined;
        excludePattern: string | undefined;
        basePaths: readonly string[];
    }

    /** @param path directory of the tsconfig.json */
    export function getFileMatcherPatterns(path: string, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
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
    export function matchFiles(path: string, extensions: readonly string[] | undefined, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string, depth: number | undefined, getFileSystemEntries: (path: string) => FileSystemEntries, realpath: (path: string) => string): string[] {
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

        return flatten(results);

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
    function getBasePaths(path: string, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean): string[] {
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
    export const supportedTSExtensions: readonly Extension[] = [Extension.Ts, Extension.Tsx, Extension.Dts];
    export const supportedTSExtensionsWithJson: readonly Extension[] = [Extension.Ts, Extension.Tsx, Extension.Dts, Extension.Json];
    /** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
    export const supportedTSExtensionsForExtractExtension: readonly Extension[] = [Extension.Dts, Extension.Ts, Extension.Tsx];
    export const supportedJSExtensions: readonly Extension[] = [Extension.Js, Extension.Jsx];
    export const supportedJSAndJsonExtensions: readonly Extension[] = [Extension.Js, Extension.Jsx, Extension.Json];
    const allSupportedExtensions: readonly Extension[] = [...supportedTSExtensions, ...supportedJSExtensions];
    const allSupportedExtensionsWithJson: readonly Extension[] = [...supportedTSExtensions, ...supportedJSExtensions, Extension.Json];

    export function getSupportedExtensions(options?: CompilerOptions): readonly Extension[];
    export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[];
    export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[] {
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

    export function getSuppoertedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly string[]): readonly string[] {
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

    export function hasTSFileExtension(fileName: string): boolean {
        return some(supportedTSExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]) {
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

    export function getExtensionPriority(path: string, supportedExtensions: readonly string[]): ExtensionPriority {
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
    export function adjustExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: readonly string[]): ExtensionPriority {
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
    export function getNextLowestExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: readonly string[]): ExtensionPriority {
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
    export function matchPatternOrExact(patternStrings: readonly string[], candidate: string): string | Pattern | undefined {
        const patterns: Pattern[] = [];
        for (const patternString of patternStrings) {
            if (!hasZeroOrOneAsteriskCharacter(patternString)) continue;
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

    export function sliceAfter<T>(arr: readonly T[], value: T): readonly T[] {
        const index = arr.indexOf(value);
        Debug.assert(index !== -1);
        return arr.slice(index);
    }

    export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
        if (!relatedInformation.length) {
            return diagnostic;
        }
        if (!diagnostic.relatedInformation) {
            diagnostic.relatedInformation = [];
        }
        diagnostic.relatedInformation.push(...relatedInformation);
        return diagnostic;
    }

    export function minAndMax<T>(arr: readonly T[], getValue: (value: T) => number): { readonly min: number, readonly max: number } {
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

    export interface HostWithIsSourceOfProjectReferenceRedirect {
        isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    }
    export function skipTypeChecking(sourceFile: SourceFile, options: CompilerOptions, host: HostWithIsSourceOfProjectReferenceRedirect) {
        // If skipLibCheck is enabled, skip reporting errors if file is a declaration file.
        // If skipDefaultLibCheck is enabled, skip reporting errors if file contains a
        // '/// <reference no-default-lib="true"/>' directive.
        return (options.skipLibCheck && sourceFile.isDeclarationFile ||
            options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib) ||
            host.isSourceOfProjectReferenceRedirect(sourceFile.fileName);
    }

    export function isJsonEqual(a: unknown, b: unknown): boolean {
        // eslint-disable-next-line no-null/no-null
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

    export function isValidTypeOnlyAliasUseSite(useSite: Node): boolean {
        return !!(useSite.flags & NodeFlags.Ambient)
            || isPartOfTypeQuery(useSite)
            || isIdentifierInNonEmittingHeritageClause(useSite)
            || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite)
            || !isExpressionNode(useSite);
    }

    export function typeOnlyDeclarationIsExport(typeOnlyDeclaration: Node) {
        return typeOnlyDeclaration.kind === SyntaxKind.ExportSpecifier;
    }

    function isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node: Node) {
        while (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PropertyAccessExpression) {
            node = node.parent;
        }
        if (node.kind !== SyntaxKind.ComputedPropertyName) {
            return false;
        }
        if (hasSyntacticModifier(node.parent, ModifierFlags.Abstract)) {
            return true;
        }
        const containerKind = node.parent.parent.kind;
        return containerKind === SyntaxKind.InterfaceDeclaration || containerKind === SyntaxKind.TypeLiteral;
    }

    /** Returns true for an identifier in 1) an `implements` clause, and 2) an `extends` clause of an interface. */
    function isIdentifierInNonEmittingHeritageClause(node: Node): boolean {
        if (node.kind !== SyntaxKind.Identifier) return false;
        const heritageClause = findAncestor(node.parent, parent => {
            switch (parent.kind) {
                case SyntaxKind.HeritageClause:
                    return true;
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ExpressionWithTypeArguments:
                    return false;
                default:
                    return "quit";
            }
        }) as HeritageClause | undefined;
        return heritageClause?.token === SyntaxKind.ImplementsKeyword || heritageClause?.parent.kind === SyntaxKind.InterfaceDeclaration;
    }

    export function isIdentifierTypeReference(node: Node): node is TypeReferenceNode & { typeName: Identifier } {
        return isTypeReferenceNode(node) && isIdentifier(node.typeName);
    }

    export function arrayIsHomogeneous<T>(array: readonly T[], comparer: EqualityComparer<T> = equateValues) {
        if (array.length < 2) return true;
        const first = array[0];
        for (let i = 1, length = array.length; i < length; i++) {
            const target = array[i];
            if (!comparer(first, target)) return false;
        }
        return true;
    }
}
