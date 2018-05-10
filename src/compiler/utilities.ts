/* @internal */
namespace ts {
    export const resolvingEmptyArray: never[] = [] as never[];
    export const emptyMap: ReadonlyMap<never> = createMap<never>();
    export const emptyUnderscoreEscapedMap: ReadonlyUnderscoreEscapedMap<never> = emptyMap as ReadonlyUnderscoreEscapedMap<never>;

    export const externalHelpersModuleNameText = "tslib";

    export function getDeclarationOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T {
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

    const stringWriter = createSingleLineStringWriter();

    function createSingleLineStringWriter(): EmitTextWriter {
        let str = "";

        const writeText: (text: string) => void = text => str += text;
        return {
            getText: () => str,
            write: writeText,
            rawWrite: writeText,
            writeTextOfNode: writeText,
            writeKeyword: writeText,
            writeOperator: writeText,
            writePunctuation: writeText,
            writeSpace: writeText,
            writeStringLiteral: writeText,
            writeLiteral: writeText,
            writeParameter: writeText,
            writeProperty: writeText,
            writeSymbol: writeText,
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

    export function setResolvedTypeReferenceDirective(sourceFile: SourceFile, typeReferenceDirectiveName: string, resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective): void {
        if (!sourceFile.resolvedTypeReferenceDirectiveNames) {
            sourceFile.resolvedTypeReferenceDirectiveNames = createMap<ResolvedTypeReferenceDirective>();
        }

        sourceFile.resolvedTypeReferenceDirectiveNames.set(typeReferenceDirectiveName, resolvedTypeReferenceDirective);
    }

    export function moduleResolutionIsEqualTo(oldResolution: ResolvedModuleFull, newResolution: ResolvedModuleFull): boolean {
        return oldResolution.isExternalLibraryImport === newResolution.isExternalLibraryImport &&
            oldResolution.extension === newResolution.extension &&
            oldResolution.resolvedFileName === newResolution.resolvedFileName &&
            oldResolution.originalPath === newResolution.originalPath &&
            packageIdIsEqual(oldResolution.packageId, newResolution.packageId);
    }

    function packageIdIsEqual(a: PackageId | undefined, b: PackageId | undefined): boolean {
        return a === b || a && b && a.name === b.name && a.subModuleName === b.subModuleName && a.version === b.version;
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
        oldResolutions: ReadonlyMap<T>,
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
     * Returns a value indicating whether a name is unique globally or within the current file
     */
    export function isFileLevelUniqueName(currentSourceFile: SourceFile, name: string, hasGlobalName?: PrintHandlers["hasGlobalName"]): boolean {
        return !(hasGlobalName && hasGlobalName(name))
            && !currentSourceFile.identifiers.has(name);
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
    export function nodeIsMissing(node: Node) {
        if (node === undefined) {
            return true;
        }

        return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFileToken;
    }

    export function nodeIsPresent(node: Node) {
        return !nodeIsMissing(node);
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
            return getTokenPosOfNode(node.jsDoc[0]);
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

    export function getTextOfNodeFromSourceText(sourceText: string, node: Node, includeTrivia = false): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        return sourceText.substring(includeTrivia ? node.pos : skipTrivia(sourceText, node.pos), node.end);
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
    export function getEmitFlags(node: Node): EmitFlags | undefined {
        const emitNode = node.emitNode;
        return emitNode && emitNode.flags;
    }

    export function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile) {
        // If we don't need to downlevel and we can reach the original source text using
        // the node's parent reference, then simply get the text as it was originally written.
        if (!nodeIsSynthesized(node) && node.parent && !(isNumericLiteral(node) && node.numericLiteralFlags & TokenFlags.ContainsSeparator)) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, node);
        }

        const escapeText = getEmitFlags(node) & EmitFlags.NoAsciiEscaping ? escapeString : escapeNonAsciiString;

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
            case SyntaxKind.RegularExpressionLiteral:
                return node.text;
        }

        Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
    }

    export function getTextOfConstantValue(value: string | number) {
        return isString(value) ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
    }

    // Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__'
    export function escapeLeadingUnderscores(identifier: string): __String {
        return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier) as __String;
    }

    /**
     * @deprecated Use `id.escapedText` to get the escaped text of an Identifier.
     * @param identifier The identifier to escape
     */
    export function escapeIdentifier(identifier: string): string {
        return identifier;
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

    export function isEffectiveExternalModule(node: SourceFile, compilerOptions: CompilerOptions) {
        return isExternalModule(node) || compilerOptions.isolatedModules || ((getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS) && !!node.commonJsModuleIndicator);
    }

    export function isBlockScope(node: Node, parentNode: Node) {
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
                return parentNode && !isFunctionLike(parentNode);
        }

        return false;
    }

    export function isDeclarationWithTypeParameters(node: Node): node is DeclarationWithTypeParameters;
    export function isDeclarationWithTypeParameters(node: DeclarationWithTypeParameters): node is DeclarationWithTypeParameters {
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
                assertTypeIsNever(node);
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
        let current = node.parent;
        while (current) {
            if (isBlockScope(current, current.parent)) {
                return current;
            }

            current = current.parent;
        }
    }

    // Return display name of an identifier
    // Computed property names will just be emitted as "[<expr>]", where <expr> is the source
    // text of the expression in the computed property.
    export function declarationNameToString(name: DeclarationName | QualifiedName) {
        return getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
    }

    export function getNameFromIndexInfo(info: IndexInfo): string | undefined {
        return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
    }

    export function getTextOfPropertyName(name: PropertyName): __String {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return name.escapedText;
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                return escapeLeadingUnderscores(name.text);
            case SyntaxKind.ComputedPropertyName:
                return isStringOrNumericLiteral(name.expression) ? escapeLeadingUnderscores(name.expression.text) : undefined;
            default:
                Debug.assertNever(name);
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
        }
    }

    export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const sourceFile = getSourceFileOfNode(node);
        return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeArray(sourceFile: SourceFile, nodes: NodeArray<Node>, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const start = skipTrivia(sourceFile.text, nodes.pos);
        return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const span = getErrorSpanForNode(sourceFile, node);
        return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeSpan(sourceFile: SourceFile, startNode: Node, endNode: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const start = skipTrivia(sourceFile.text, startNode.pos);
        return createFileDiagnostic(sourceFile, start, endNode.end - start, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain): Diagnostic {
        const sourceFile = getSourceFileOfNode(node);
        const span = getErrorSpanForNode(sourceFile, node);
        return {
            file: sourceFile,
            start: span.start,
            length: span.length,
            code: messageChain.code,
            category: messageChain.category,
            messageText: messageChain.next ? messageChain : messageChain.messageText
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
        let errorNode = node;
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
        const pos = isMissing
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

    export function isConstEnumDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.EnumDeclaration && isConst(node);
    }

    export function isConst(node: Node): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Const)
            || !!(getCombinedModifierFlags(node) & ModifierFlags.Const);
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
        return n.kind === SyntaxKind.ImportType &&
            (n as ImportTypeNode).argument.kind === SyntaxKind.LiteralType &&
            isStringLiteral(((n as ImportTypeNode).argument as LiteralTypeNode).literal);
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
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
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
            case SyntaxKind.ThisKeyword:
                const parent = node.parent;
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
    export function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T {

        return traverse(body);

        function traverse(node: Node): T {
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
    export function getRestParameterElementType(node: TypeNode) {
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

    export function isValidESSymbolDeclaration(node: Node) {
        return isVariableDeclaration(node) ? isConst(node) && isIdentifier(node.name) && isVariableDeclarationInVariableStatement(node) :
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

    export function unwrapInnermostStatementOfLabel(node: LabeledStatement, beforeUnwrapLabelCallback?: (node: LabeledStatement) => void) {
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

    export function isFunctionBlock(node: Node) {
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
        return filter(objectLiteral.properties, (property): property is PropertyAssignment => {
            if (property.kind === SyntaxKind.PropertyAssignment) {
                const propName = getTextOfPropertyName(property.name);
                return key === propName || (key2 && key2 === propName);
            }
        });
    }

    export function getTsConfigObjectLiteralExpression(tsConfigSourceFile: TsConfigSourceFile | undefined) {
        if (tsConfigSourceFile && tsConfigSourceFile.statements.length) {
            const expression = tsConfigSourceFile.statements[0].expression;
            return isObjectLiteralExpression(expression) && expression;
        }
    }

    export function getTsConfigPropArrayElementValue(tsConfigSourceFile: TsConfigSourceFile | undefined, propKey: string, elementValue: string): StringLiteral | undefined {
        const jsonObjectLiteral = getTsConfigObjectLiteralExpression(tsConfigSourceFile);
        return jsonObjectLiteral &&
            firstDefined(getPropertyAssignment(jsonObjectLiteral, propKey), property =>
                isArrayLiteralExpression(property.initializer) ?
                    find(property.initializer.elements, (element): element is StringLiteral => isStringLiteral(element) && element.text === elementValue) :
                    undefined);
    }

    export function getContainingFunction(node: Node): SignatureDeclaration {
        return findAncestor(node.parent, isFunctionLike);
    }

    export function getContainingClass(node: Node): ClassLikeDeclaration {
        return findAncestor(node.parent, isClassLike);
    }

    export function getThisContainer(node: Node, includeArrowFunctions: boolean): Node {
        while (true) {
            node = node.parent;
            if (!node) {
                return undefined;
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

    export function getImmediatelyInvokedFunctionExpression(func: Node): CallExpression {
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

    export function getEntityNameFromTypeNode(node: TypeNode): EntityNameOrEntityNameExpression {
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
                return parent.kind === SyntaxKind.ClassDeclaration;

            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
                // if this method has a body and its parent is a class declaration, this is a valid target.
                return (<FunctionLikeDeclaration>node).body !== undefined
                    && parent.kind === SyntaxKind.ClassDeclaration;

            case SyntaxKind.Parameter:
                // if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target;
                return (<FunctionLikeDeclaration>parent).body !== undefined
                    && (parent.kind === SyntaxKind.Constructor
                        || parent.kind === SyntaxKind.MethodDeclaration
                        || parent.kind === SyntaxKind.SetAccessor)
                    && grandparent.kind === SyntaxKind.ClassDeclaration;
        }

        return false;
    }

    export function nodeIsDecorated(node: ClassDeclaration): boolean;
    export function nodeIsDecorated(node: ClassElement, parent: Node): boolean;
    export function nodeIsDecorated(node: Node, parent: Node, grandparent: Node): boolean;
    export function nodeIsDecorated(node: Node, parent?: Node, grandparent?: Node): boolean {
        return node.decorators !== undefined
            && nodeCanBeDecorated(node, parent, grandparent);
    }

    export function nodeOrChildIsDecorated(node: ClassDeclaration): boolean;
    export function nodeOrChildIsDecorated(node: ClassElement, parent: Node): boolean;
    export function nodeOrChildIsDecorated(node: Node, parent: Node, grandparent: Node): boolean;
    export function nodeOrChildIsDecorated(node: Node, parent?: Node, grandparent?: Node): boolean {
        return nodeIsDecorated(node, parent, grandparent) || childIsDecorated(node, parent);
    }

    export function childIsDecorated(node: ClassDeclaration): boolean;
    export function childIsDecorated(node: Node, parent: Node): boolean;
    export function childIsDecorated(node: Node, parent?: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                return forEach((<ClassDeclaration>node).members, m => nodeOrChildIsDecorated(m, node, parent));
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.SetAccessor:
                return forEach((<FunctionLikeDeclaration>node).parameters, p => nodeIsDecorated(p, node, parent));
        }
    }

    export function isJSXTagName(node: Node) {
        const parent = node.parent;
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
            case SyntaxKind.StringLiteral:
            case SyntaxKind.ThisKeyword:
                return isInExpressionContext(node);
            default:
                return false;
        }
    }

    export function isInExpressionContext(node: Node): boolean {
        const parent = node.parent;
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

    export function isSourceFileJavaScript(file: SourceFile): boolean {
        return isInJavaScriptFile(file);
    }

    export function isSourceFileNotJavaScript(file: SourceFile): boolean {
        return !isInJavaScriptFile(file);
    }

    export function isInJavaScriptFile(node: Node | undefined): boolean {
        return node && !!(node.flags & NodeFlags.JavaScriptFile);
    }

    export function isInJsonFile(node: Node | undefined): boolean {
        return node && !!(node.flags & NodeFlags.JsonFile);
    }

    export function isInJSDoc(node: Node | undefined): boolean {
        return node && !!(node.flags & NodeFlags.JSDoc);
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

    /**
     * Given the symbol of a declaration, find the symbol of its Javascript container-like initializer,
     * if it has one. Otherwise just return the original symbol.
     *
     * Container-like initializer behave like namespaces, so the binder needs to add contained symbols
     * to their exports. An example is a function with assignments to `this` inside.
     */
    export function getJSInitializerSymbol(symbol: Symbol) {
        if (!symbol || !symbol.valueDeclaration) {
            return symbol;
        }
        const declaration = symbol.valueDeclaration;
        const e = getDeclaredJavascriptInitializer(declaration) || getAssignedJavascriptInitializer(declaration);
        return e && e.symbol ? e.symbol : symbol;
    }

    /** Get the declaration initializer, when the initializer is container-like (See getJavascriptInitializer) */
    export function getDeclaredJavascriptInitializer(node: Node) {
        if (node && isVariableDeclaration(node) && node.initializer) {
            return getJavascriptInitializer(node.initializer, /*isPrototypeAssignment*/ false) ||
                isIdentifier(node.name) && getDefaultedJavascriptInitializer(node.name, node.initializer, /*isPrototypeAssignment*/ false);
        }
    }

    /**
     * Get the assignment 'initializer' -- the righthand side-- when the initializer is container-like (See getJavascriptInitializer).
     * We treat the right hand side of assignments with container-like initalizers as declarations.
     */
    export function getAssignedJavascriptInitializer(node: Node) {
        if (node && node.parent && isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
            const isPrototypeAssignment = isPrototypeAccess(node.parent.left);
            return getJavascriptInitializer(node.parent.right, isPrototypeAssignment) ||
                getDefaultedJavascriptInitializer(node.parent.left as EntityNameExpression, node.parent.right, isPrototypeAssignment);
        }
    }

    /**
     * Recognized Javascript container-like initializers are:
     * 1. (function() {})() -- IIFEs
     * 2. function() { } -- Function expressions
     * 3. class { } -- Class expressions
     * 4. {} -- Empty object literals
     * 5. { ... } -- Non-empty object literals, when used to initialize a prototype, like `C.prototype = { m() { } }`
     *
     * This function returns the provided initializer, or undefined if it is not valid.
     */
    export function getJavascriptInitializer(initializer: Node, isPrototypeAssignment: boolean): Expression {
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
     * A defaulted Javascript initializer matches the pattern
     * `Lhs = Lhs || JavascriptInitializer`
     * or `var Lhs = Lhs || JavascriptInitializer`
     *
     * The second Lhs is required to be the same as the first except that it may be prefixed with
     * 'window.', 'global.' or 'self.' The second Lhs is otherwise ignored by the binder and checker.
     */
    function getDefaultedJavascriptInitializer(name: EntityNameExpression, initializer: Expression, isPrototypeAssignment: boolean) {
        const e = isBinaryExpression(initializer) && initializer.operatorToken.kind === SyntaxKind.BarBarToken && getJavascriptInitializer(initializer.right, isPrototypeAssignment);
        if (e && isSameEntityName(name, (initializer as BinaryExpression).left as EntityNameExpression)) {
            return e;
        }
    }

    /** Given a Javascript initializer, return the outer name. That is, the lhs of the assignment or the declaration name. */
    export function getOuterNameOfJsInitializer(node: Declaration): DeclarationName | undefined {
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
    function isSameEntityName(name: EntityNameExpression, initializer: EntityNameExpression): boolean {
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
        while (isAssignmentExpression(node, /*excludeCompoundAssignements*/ true)) {
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
    export function getSpecialPropertyAssignmentKind(expr: BinaryExpression): SpecialPropertyAssignmentKind {
        if (!isInJavaScriptFile(expr) ||
            expr.operatorToken.kind !== SyntaxKind.EqualsToken ||
            !isPropertyAccessExpression(expr.left)) {
            return SpecialPropertyAssignmentKind.None;
        }
        const lhs = expr.left;
        if (lhs.expression.kind === SyntaxKind.ThisKeyword) {
            return SpecialPropertyAssignmentKind.ThisProperty;
        }
        else if (isIdentifier(lhs.expression) && lhs.expression.escapedText === "module" && lhs.name.escapedText === "exports") {
            // module.exports = expr
            return SpecialPropertyAssignmentKind.ModuleExports;
        }
        else if (isEntityNameExpression(lhs.expression)) {
            if (lhs.name.escapedText === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
                // F.prototype = { ... }
                return SpecialPropertyAssignmentKind.Prototype;
            }
            else if (isPrototypeAccess(lhs.expression)) {
                // F.G....prototype.x = expr
                return SpecialPropertyAssignmentKind.PrototypeProperty;
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
                return SpecialPropertyAssignmentKind.ExportsProperty;
            }
            // F.G...x = expr
            return SpecialPropertyAssignmentKind.Property;
        }

        return SpecialPropertyAssignmentKind.None;
    }

    export function getInitializerOfBinaryExpression(expr: BinaryExpression) {
        while (isBinaryExpression(expr.right)) {
            expr = expr.right;
        }
        return expr.right;
    }

    export function isPrototypePropertyAssignment(node: Node): boolean {
        return isBinaryExpression(node) && getSpecialPropertyAssignmentKind(node) === SpecialPropertyAssignmentKind.PrototypeProperty;
    }

    export function isSpecialPropertyDeclaration(expr: PropertyAccessExpression): boolean {
        return isInJavaScriptFile(expr) &&
            expr.parent && expr.parent.kind === SyntaxKind.ExpressionStatement &&
            !!getJSDocTypeTag(expr.parent);
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
                return node.parent as AnyValidImportOrReExport;
            case SyntaxKind.LiteralType:
                Debug.assert(isStringLiteral(node));
                return tryCast(node.parent.parent, isImportTypeNode) as ValidImportTypeNode | undefined;
            default:
                return undefined;
        }
    }

    export function getExternalModuleName(node: AnyImportOrReExport | ImportTypeNode): Expression {
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

    export function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): ImportEqualsDeclaration | NamespaceImport {
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

    export function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
        return node.kind === SyntaxKind.ImportDeclaration && node.importClause && !!node.importClause.name;
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
        return node.kind === SyntaxKind.JSDocFunctionType &&
            (node as JSDocFunctionType).parameters.length > 0 &&
            (node as JSDocFunctionType).parameters[0].name &&
            ((node as JSDocFunctionType).parameters[0].name as Identifier).escapedText === "new";
    }

    function getSourceOfAssignment(node: Node): Node {
        return isExpressionStatement(node) &&
            node.expression && isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === SyntaxKind.EqualsToken &&
            node.expression.right;
    }

    function getSourceOfDefaultedAssignment(node: Node): Node {
        return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            getSpecialPropertyAssignmentKind(node.expression) !== SpecialPropertyAssignmentKind.None &&
            isBinaryExpression(node.expression.right) &&
            node.expression.right.operatorToken.kind === SyntaxKind.BarBarToken &&
            node.expression.right.right;
    }

    function getSingleInitializerOfVariableStatementOrPropertyDeclaration(node: Node): Expression | undefined {
        switch (node.kind) {
            case SyntaxKind.VariableStatement:
                const v = getSingleVariableOfVariableStatement(node);
                return v && v.initializer;
            case SyntaxKind.PropertyDeclaration:
                return (node as PropertyDeclaration).initializer;
        }
    }

    function getSingleVariableOfVariableStatement(node: Node): VariableDeclaration | undefined {
        return isVariableStatement(node) &&
            node.declarationList.declarations.length > 0 &&
            node.declarationList.declarations[0];
    }

    function getNestedModuleDeclaration(node: Node): Node {
        return node.kind === SyntaxKind.ModuleDeclaration &&
            (node as ModuleDeclaration).body &&
            (node as ModuleDeclaration).body.kind === SyntaxKind.ModuleDeclaration &&
            (node as ModuleDeclaration).body;
    }

    export function getJSDocCommentsAndTags(node: Node): ReadonlyArray<JSDoc | JSDocTag> {
        let result: (JSDoc | JSDocTag)[] | undefined;
        getJSDocCommentsAndTagsWorker(node);
        return result || emptyArray;

        function getJSDocCommentsAndTagsWorker(node: Node): void {
            const parent = node.parent;
            if (!parent) return;
            if (parent.kind === SyntaxKind.PropertyAssignment || parent.kind === SyntaxKind.PropertyDeclaration || getNestedModuleDeclaration(parent)) {
                getJSDocCommentsAndTagsWorker(parent);
            }
            // Try to recognize this pattern when node is initializer of variable declaration and JSDoc comments are on containing variable statement.
            // /**
            //   * @param {number} name
            //   * @returns {number}
            //   */
            // var x = function(name) { return name.length; }
            if (parent.parent &&
                (getSingleVariableOfVariableStatement(parent.parent) === node || getSourceOfAssignment(parent.parent))) {
                getJSDocCommentsAndTagsWorker(parent.parent);
            }
            if (parent.parent && parent.parent.parent &&
                (getSingleVariableOfVariableStatement(parent.parent.parent) ||
                    getSingleInitializerOfVariableStatementOrPropertyDeclaration(parent.parent.parent) === node ||
                    getSourceOfDefaultedAssignment(parent.parent.parent))) {
                getJSDocCommentsAndTagsWorker(parent.parent.parent);
            }
            if (isBinaryExpression(node) && getSpecialPropertyAssignmentKind(node) !== SpecialPropertyAssignmentKind.None ||
                isBinaryExpression(parent) && getSpecialPropertyAssignmentKind(parent) !== SpecialPropertyAssignmentKind.None ||
                node.kind === SyntaxKind.PropertyAccessExpression && node.parent && node.parent.kind === SyntaxKind.ExpressionStatement) {
                getJSDocCommentsAndTagsWorker(parent);
            }

            // Pull parameter comments from declaring function as well
            if (node.kind === SyntaxKind.Parameter) {
                result = addRange(result, getJSDocParameterTags(node as ParameterDeclaration));
            }

            if (isVariableLike(node) && hasInitializer(node) && hasJSDocNodes(node.initializer)) {
                result = addRange(result, node.initializer.jsDoc);
            }

            if (hasJSDocNodes(node)) {
                result = addRange(result, node.jsDoc);
            }
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

    export function getHostSignatureFromJSDoc(node: JSDocParameterTag): SignatureDeclaration | undefined {
        const host = getJSDocHost(node);
        const decl = getSourceOfDefaultedAssignment(host) ||
            getSourceOfAssignment(host) ||
            getSingleInitializerOfVariableStatementOrPropertyDeclaration(host) ||
            getSingleVariableOfVariableStatement(host) ||
            getNestedModuleDeclaration(host) ||
            host;
        return decl && isFunctionLike(decl) ? decl : undefined;
    }

    export function getJSDocHost(node: JSDocTag): HasJSDoc {
        while (node.parent.kind === SyntaxKind.JSDocTypeLiteral) {
            if (node.parent.parent.kind === SyntaxKind.JSDocTypedefTag) {
                node = node.parent.parent as JSDocTypedefTag;
            }
            else {
                // node.parent.parent is a type expression, child of a parameter type
                node = node.parent.parent.parent as JSDocParameterTag;
            }
        }
        Debug.assert(node.parent!.kind === SyntaxKind.JSDocComment);
        return node.parent!.parent!;
    }

    export function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & { parent: JSDocTemplateTag }): TypeParameterDeclaration | undefined {
        const name = node.name.escapedText;
        const { typeParameters } = (node.parent.parent.parent as SignatureDeclaration | InterfaceDeclaration | ClassDeclaration);
        return find(typeParameters, p => p.name.escapedText === name);
    }

    export function hasRestParameter(s: SignatureDeclaration): boolean {
        const last = lastOrUndefined(s.parameters);
        return last && isRestParameter(last);
    }

    export function isRestParameter(node: ParameterDeclaration): boolean {
        return node.dotDotDotToken !== undefined || node.type && node.type.kind === SyntaxKind.JSDocVariadicType;
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
    export function isAnyDeclarationName(name: Node): boolean {
        switch (name.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                if (isDeclaration(name.parent)) {
                    return name.parent.name === name;
                }
                else if (isQualifiedName(name.parent)) {
                    const tag = name.parent.parent;
                    return isJSDocParameterTag(tag) && tag.name === name.parent;
                }
                else {
                    const binExp = name.parent.parent;
                    return isBinaryExpression(binExp) && getSpecialPropertyAssignmentKind(binExp) !== SpecialPropertyAssignmentKind.None && getNameOfDeclaration(binExp) === name;
                }
            default:
                return false;
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
    export function isAliasSymbolDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.ImportEqualsDeclaration ||
            node.kind === SyntaxKind.NamespaceExportDeclaration ||
            node.kind === SyntaxKind.ImportClause && !!(<ImportClause>node).name ||
            node.kind === SyntaxKind.NamespaceImport ||
            node.kind === SyntaxKind.ImportSpecifier ||
            node.kind === SyntaxKind.ExportSpecifier ||
            node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(<ExportAssignment>node) ||
            isBinaryExpression(node) && getSpecialPropertyAssignmentKind(node) === SpecialPropertyAssignmentKind.ModuleExports;
    }

    export function exportAssignmentIsAlias(node: ExportAssignment | BinaryExpression): boolean {
        const e = isExportAssignment(node) ? node.expression : node.right;
        return isEntityNameExpression(e) || isClassExpression(e);
    }

    export function getClassExtendsHeritageClauseElement(node: ClassLikeDeclaration | InterfaceDeclaration) {
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
            : isClassLike(node) ? concatenate(singleElementArray(getClassExtendsHeritageClauseElement(node)), getClassImplementsHeritageClauseElements(node)) || emptyArray
            : emptyArray;
    }

    export function getInterfaceBaseTypeNodes(node: InterfaceDeclaration) {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause ? heritageClause.types : undefined;
    }

    export function getHeritageClause(clauses: NodeArray<HeritageClause>, kind: SyntaxKind) {
        if (clauses) {
            for (const clause of clauses) {
                if (clause.token === kind) {
                    return clause;
                }
            }
        }

        return undefined;
    }

    export function tryResolveScriptReference(host: ScriptReferenceHost, sourceFile: SourceFile, reference: FileReference) {
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

    export function isStringOrNumericLiteral(node: Node): node is StringLiteral | NumericLiteral {
        const kind = node.kind;
        return kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.NumericLiteral;
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
        return name && isDynamicName(name);
    }

    export function isDynamicName(name: DeclarationName): boolean {
        return name.kind === SyntaxKind.ComputedPropertyName &&
            !isStringOrNumericLiteral(name.expression) &&
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

    export function getPropertyNameForPropertyNameNode(name: DeclarationName): __String {
        if (name.kind === SyntaxKind.Identifier) {
            return name.escapedText;
        }
        if (name.kind === SyntaxKind.StringLiteral || name.kind === SyntaxKind.NumericLiteral) {
            return escapeLeadingUnderscores(name.text);
        }
        if (name.kind === SyntaxKind.ComputedPropertyName) {
            const nameExpression = name.expression;
            if (isWellKnownSymbolSyntactically(nameExpression)) {
                return getPropertyNameForKnownSymbolName(idText((<PropertyAccessExpression>nameExpression).name));
            }
            else if (nameExpression.kind === SyntaxKind.StringLiteral || nameExpression.kind === SyntaxKind.NumericLiteral) {
                return escapeLeadingUnderscores((<LiteralExpression>nameExpression).text);
            }
        }

        return undefined;
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

    export function getOperator(expression: Expression) {
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

    /* @internal */
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
        let nonFileDiagnostics = [] as SortedArray<Diagnostic>;
        const filesWithDiagnostics = [] as SortedArray<string>;
        const fileDiagnostics = createMap<SortedArray<Diagnostic>>();
        let hasReadNonFileDiagnostics = false;

        return {
            add,
            getGlobalDiagnostics,
            getDiagnostics,
            reattachFileDiagnostics
        };

        function reattachFileDiagnostics(newFile: SourceFile): void {
            forEach(fileDiagnostics.get(newFile.fileName), diagnostic => diagnostic.file = newFile);
        }

        function add(diagnostic: Diagnostic): void {
            let diagnostics: SortedArray<Diagnostic>;
            if (diagnostic.file) {
                diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
                if (!diagnostics) {
                    diagnostics = [] as SortedArray<Diagnostic>;
                    fileDiagnostics.set(diagnostic.file.fileName, diagnostics);
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

        function getDiagnostics(fileName?: string): Diagnostic[] {
            if (fileName) {
                return fileDiagnostics.get(fileName) || [];
            }

            const fileDiags = flatMap(filesWithDiagnostics, f => fileDiagnostics.get(f));
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
        return (ch >= CharacterCodes.a && ch <= CharacterCodes.z) || (name as string).indexOf("-") > -1;
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

        function write(s: string) {
            if (s && s.length) {
                if (lineStart) {
                    output += getIndentString(indent);
                    lineStart = false;
                }
                output += s;
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
                if (lineStart) {
                    lineStart = false;
                }
                output += s;
            }
        }

        function writeLiteral(s: string) {
            if (s && s.length) {
                write(s);
                const lineStartsOfS = computeLineStarts(s);
                if (lineStartsOfS.length > 1) {
                    lineCount = lineCount + lineStartsOfS.length - 1;
                    linePos = output.length - s.length + lastOrUndefined(lineStartsOfS);
                }
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

        function writeTextOfNode(text: string, node: Node) {
            write(getTextOfNodeFromSourceText(text, node));
        }

        reset();

        return {
            write,
            rawWrite,
            writeTextOfNode,
            writeLiteral,
            writeLine,
            increaseIndent: () => { indent++; },
            decreaseIndent: () => { indent--; },
            getIndent: () => indent,
            getTextPos: () => output.length,
            getLine: () => lineCount + 1,
            getColumn: () => lineStart ? indent * getIndentSize() + 1 : output.length - linePos + 1,
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
            writeSymbol: write
        };
    }

    export function getResolvedExternalModuleName(host: EmitHost, file: SourceFile): string {
        return file.moduleName || getExternalModuleNameFromPath(host, file.fileName);
    }

    export function getExternalModuleNameFromDeclaration(host: EmitHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): string {
        const file = resolver.getExternalModuleFileFromDeclaration(declaration);
        if (!file || file.isDeclarationFile) {
            return undefined;
        }
        return getResolvedExternalModuleName(host, file);
    }

    /**
     * Resolves a local path to a path which is absolute to the base of the emit
     */
    export function getExternalModuleNameFromPath(host: EmitHost, fileName: string): string {
        const getCanonicalFileName = (f: string) => host.getCanonicalFileName(f);
        const dir = toPath(host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
        const filePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
        const relativePath = getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        return removeFileExtension(relativePath);
    }

    export function getOwnEmitOutputFilePath(sourceFile: SourceFile, host: EmitHost, extension: string) {
        const compilerOptions = host.getCompilerOptions();
        let emitOutputFilePathWithoutExtension: string;
        if (compilerOptions.outDir) {
            emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(sourceFile, host, compilerOptions.outDir));
        }
        else {
            emitOutputFilePathWithoutExtension = removeFileExtension(sourceFile.fileName);
        }

        return emitOutputFilePathWithoutExtension + extension;
    }

    export function getDeclarationEmitOutputFilePath(sourceFile: SourceFile, host: EmitHost) {
        const options = host.getCompilerOptions();
        const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified

        const path = outputDir
            ? getSourceFilePathInNewDir(sourceFile, host, outputDir)
            : sourceFile.fileName;
        return removeFileExtension(path) + Extension.Dts;
    }

    export interface EmitFileNames {
        jsFilePath: string;
        sourceMapFilePath: string | undefined;
        declarationFilePath: string | undefined;
        declarationMapPath: string | undefined;
        bundleInfoPath: string | undefined;
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
        if (options.outFile || options.out) {
            const moduleKind = getEmitModuleKind(options);
            const moduleEmitEnabled = moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
            // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
            return filter(host.getSourceFiles(), sourceFile =>
                (moduleEmitEnabled || !isExternalModule(sourceFile)) && sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary));
        }
        else {
            const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
            return filter(sourceFiles, sourceFile => sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary));
        }
    }

    /** Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks. */
    export function sourceFileMayBeEmitted(sourceFile: SourceFile, options: CompilerOptions, isSourceFileFromExternalLibrary: (file: SourceFile) => boolean) {
        return !(options.noEmitForJsFiles && isSourceFileJavaScript(sourceFile)) && !sourceFile.isDeclarationFile && !isSourceFileFromExternalLibrary(sourceFile);
    }

    export function getSourceFilePathInNewDir(sourceFile: SourceFile, host: EmitHost, newDirPath: string) {
        let sourceFilePath = getNormalizedAbsolutePath(sourceFile.fileName, host.getCurrentDirectory());
        const commonSourceDirectory = host.getCommonSourceDirectory();
        const isSourceFileInCommonSourceDirectory = host.getCanonicalFileName(sourceFilePath).indexOf(host.getCanonicalFileName(commonSourceDirectory)) === 0;
        sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
        return combinePaths(newDirPath, sourceFilePath);
    }

    export function writeFile(host: EmitHost, diagnostics: DiagnosticCollection, fileName: string, data: string, writeByteOrderMark: boolean, sourceFiles?: ReadonlyArray<SourceFile>) {
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

    export function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration {
        return find(node.members, (member): member is ConstructorDeclaration => isConstructorDeclaration(member) && nodeIsPresent(member.body));
    }

    function getSetAccessorValueParameter(accessor: SetAccessorDeclaration): ParameterDeclaration | undefined {
        if (accessor && accessor.parameters.length > 0) {
            const hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
            return accessor.parameters[hasThis ? 1 : 0];
        }
    }

    /** Get the type annotation for the value parameter. */
    export function getSetAccessorTypeAnnotationNode(accessor: SetAccessorDeclaration): TypeNode {
        const parameter = getSetAccessorValueParameter(accessor);
        return parameter && parameter.type;
    }

    export function getThisParameter(signature: SignatureDeclaration): ParameterDeclaration | undefined {
        if (signature.parameters.length) {
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
        return node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
    }

    export function identifierIsThisKeyword(id: Identifier): boolean {
        return id.originalKeywordKind === SyntaxKind.ThisKeyword;
    }

    export function getAllAccessorDeclarations(declarations: NodeArray<Declaration>, accessor: AccessorDeclaration): AllAccessorDeclarations {
        let firstAccessor: AccessorDeclaration;
        let secondAccessor: AccessorDeclaration;
        let getAccessor: AccessorDeclaration;
        let setAccessor: AccessorDeclaration;
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
            forEach(declarations, (member: Declaration) => {
                if ((member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor)
                    && hasModifier(member, ModifierFlags.Static) === hasModifier(accessor, ModifierFlags.Static)) {
                    const memberName = getPropertyNameForPropertyNameNode((member as NamedDeclaration).name);
                    const accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                    if (memberName === accessorName) {
                        if (!firstAccessor) {
                            firstAccessor = <AccessorDeclaration>member;
                        }
                        else if (!secondAccessor) {
                            secondAccessor = <AccessorDeclaration>member;
                        }

                        if (member.kind === SyntaxKind.GetAccessor && !getAccessor) {
                            getAccessor = <AccessorDeclaration>member;
                        }

                        if (member.kind === SyntaxKind.SetAccessor && !setAccessor) {
                            setAccessor = <AccessorDeclaration>member;
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
        return (node as HasType).type || (isInJavaScriptFile(node) ? getJSDocType(node) : undefined);
    }

    export function getTypeAnnotationNode(node: Node): TypeNode | undefined {
        return (node as HasType).type;
    }

    /**
     * Gets the effective return type annotation of a signature. If the node was parsed in a
     * JavaScript file, gets the return type annotation from JSDoc.
     */
    export function getEffectiveReturnTypeNode(node: SignatureDeclaration): TypeNode | undefined {
        return node.type || (isInJavaScriptFile(node) ? getJSDocReturnType(node) : undefined);
    }

    /**
     * Gets the effective type parameters. If the node was parsed in a
     * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
     */
    export function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters) {
        return node.typeParameters || (isInJavaScriptFile(node) ? getJSDocTypeParameterDeclarations(node) : undefined);
    }

    export function getJSDocTypeParameterDeclarations(node: DeclarationWithTypeParameters) {
        const templateTag = getJSDocTemplateTag(node);
        return templateTag && templateTag.typeParameters;
    }

    /**
     * Gets the effective type annotation of the value parameter of a set accessor. If the node
     * was parsed in a JavaScript file, gets the type annotation from JSDoc.
     */
    export function getEffectiveSetAccessorTypeAnnotationNode(node: SetAccessorDeclaration): TypeNode {
        const parameter = getSetAccessorValueParameter(node);
        return parameter && getEffectiveTypeAnnotationNode(parameter);
    }

    export function emitNewLineBeforeLeadingComments(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, node: TextRange, leadingComments: ReadonlyArray<CommentRange>) {
        emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
    }

    export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, pos: number, leadingComments: ReadonlyArray<CommentRange>) {
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
        comments: ReadonlyArray<CommentRange>,
        leadingSeparator: boolean,
        trailingSeparator: boolean,
        newLine: string,
        writeComment: (text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void) {
        if (comments && comments.length > 0) {
            if (leadingSeparator) {
                writer.write(" ");
            }

            let emitInterveningSeparator = false;
            for (const comment of comments) {
                if (emitInterveningSeparator) {
                    writer.write(" ");
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
                writer.write(" ");
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
        let leadingComments: CommentRange[];
        let currentDetachedCommentInfo: { nodePos: number, detachedCommentEndPos: number };
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
            let lastComment: CommentRange;

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
                const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastOrUndefined(detachedComments).end);
                const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, skipTrivia(text, node.pos));
                if (nodeLine >= lastCommentLine + 2) {
                    // Valid detachedComments
                    emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                    emitComments(text, lineMap, writer, detachedComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                    currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: lastOrUndefined(detachedComments).end };
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
            let firstCommentLineIndent: number;
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
            writer.write(text.substring(commentPos, commentEnd));
        }
    }

    function writeTrimmedCurrentLine(text: string, commentEnd: number, writer: EmitTextWriter, newLine: string, pos: number, nextLineStart: number) {
        const end = Math.min(commentEnd, nextLineStart - 1);
        const currentLineText = text.substring(pos, end).replace(/^\s+|\s+$/g, "");
        if (currentLineText) {
            // trimmed forward and ending spaces text
            writer.write(currentLineText);
            if (end !== commentEnd) {
                writer.writeLine();
            }
        }
        else {
            // Empty string - make sure we write empty line
            writer.writeLiteral(newLine);
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
        if (node.kind === SyntaxKind.ExpressionWithTypeArguments &&
            (<HeritageClause>node.parent).token === SyntaxKind.ExtendsKeyword &&
            isClassLike(node.parent.parent)) {
            return node.parent.parent;
        }
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

    export function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): boolean {
        return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
    }

    export function isExpressionWithTypeArgumentsInClassImplementsClause(node: Node): node is ExpressionWithTypeArguments {
        return node.kind === SyntaxKind.ExpressionWithTypeArguments
            && isEntityNameExpression((node as ExpressionWithTypeArguments).expression)
            && node.parent
            && (<HeritageClause>node.parent).token === SyntaxKind.ImplementsKeyword
            && node.parent.parent
            && isClassLike(node.parent.parent);
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
    export function tryExtractTypeScriptExtension(fileName: string): string | undefined {
        return find(supportedTypescriptExtensionsForExtractExtension, extension => fileExtensionIs(fileName, extension));
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

    export function base64encode(host: { base64encode?(input: string): string }, input: string): string {
        if (host.base64encode) {
            return host.base64encode(input);
        }
        return convertToBase64(input);
    }

    export function base64decode(host: { base64decode?(input: string): string }, input: string): string {
        if (host.base64decode) {
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

    export function formatSyntaxKind(kind: SyntaxKind): string {
        return formatEnum(kind, (<any>ts).SyntaxKind, /*isFlags*/ false);
    }

    export function formatModifierFlags(flags: ModifierFlags): string {
        return formatEnum(flags, (<any>ts).ModifierFlags, /*isFlags*/ true);
    }

    export function formatTransformFlags(flags: TransformFlags): string {
        return formatEnum(flags, (<any>ts).TransformFlags, /*isFlags*/ true);
    }

    export function formatEmitFlags(flags: EmitFlags): string {
        return formatEnum(flags, (<any>ts).EmitFlags, /*isFlags*/ true);
    }

    export function formatSymbolFlags(flags: SymbolFlags): string {
        return formatEnum(flags, (<any>ts).SymbolFlags, /*isFlags*/ true);
    }

    export function formatTypeFlags(flags: TypeFlags): string {
        return formatEnum(flags, (<any>ts).TypeFlags, /*isFlags*/ true);
    }

    export function formatObjectFlags(flags: ObjectFlags): string {
        return formatEnum(flags, (<any>ts).ObjectFlags, /*isFlags*/ true);
    }

    /**
     * Creates a new TextRange from the provided pos and end.
     *
     * @param pos The start position.
     * @param end The end position.
     */
    export function createRange(pos: number, end: number): TextRange {
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
        return createRange(pos, pos + tokenToString(token).length);
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
            case SyntaxKind.PostfixUnaryExpression:
            case SyntaxKind.PrefixUnaryExpression:
                const { operator } = parent as PrefixUnaryExpression | PostfixUnaryExpression;
                return operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken ? writeOrReadWrite() : AccessKind.Read;
            case SyntaxKind.BinaryExpression:
                const { left, operatorToken } = parent as BinaryExpression;
                return left === node && isAssignmentOperator(operatorToken.kind) ? writeOrReadWrite() : AccessKind.Read;
            case SyntaxKind.PropertyAccessExpression:
                return (parent as PropertyAccessExpression).name !== node ? AccessKind.Read : accessKind(parent);
            default:
                return AccessKind.Read;
        }

        function writeOrReadWrite(): AccessKind {
            // If grandparent is not an ExpressionStatement, this is used as an expression in addition to having a side effect.
            return parent.parent && parent.parent.kind === SyntaxKind.ExpressionStatement ? AccessKind.Write : AccessKind.ReadWrite;
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
    export function clearMap<T>(map: Map<T>, onDeleteValue: (valueInMap: T, key: string) => void) {
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
        return type.flags & TypeFlags.Object ? (<ObjectType>type).objectFlags : 0;
    }

    export function typeHasCallOrConstructSignatures(type: Type, checker: TypeChecker) {
        return checker.getSignaturesOfType(type, SignatureKind.Call).length !== 0 || checker.getSignaturesOfType(type, SignatureKind.Construct).length !== 0;
    }

    export function forSomeAncestorDirectory(directory: string, callback: (directory: string) => boolean): boolean {
        return !!forEachAncestorDirectory(directory, d => callback(d) ? true : undefined);
    }

    export function isUMDExportSymbol(symbol: Symbol) {
        return symbol && symbol.declarations && symbol.declarations[0] && isNamespaceExportDeclaration(symbol.declarations[0]);
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
}

namespace ts {
    export function getDefaultLibFileName(options: CompilerOptions): string {
        switch (options.target) {
            case ScriptTarget.ESNext:
                return "lib.esnext.full.d.ts";
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

    // Returns true if 'span' contains 'other'.
    export function textSpanContainsTextSpan(span: TextSpan, other: TextSpan) {
        return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
    }

    export function textSpanOverlapsWith(span: TextSpan, other: TextSpan) {
        return textSpanOverlap(span, other) !== undefined;
    }

    export function textSpanOverlap(span1: TextSpan, span2: TextSpan) {
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

    export function textSpanIntersection(span1: TextSpan, span2: TextSpan) {
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

    /* @internal */
    export function createTextRange(pos: number, end: number = pos): TextRange {
        Debug.assert(end >= pos);
        return { pos, end };
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

    export function getTypeParameterOwner(d: Declaration): Declaration {
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

    function walkUpBindingElementsAndPatterns(node: Node): Node {
        while (node && (node.kind === SyntaxKind.BindingElement || isBindingPattern(node))) {
            node = node.parent;
        }

        return node;
    }

    export function getCombinedModifierFlags(node: Node): ModifierFlags {
        node = walkUpBindingElementsAndPatterns(node);
        let flags = getModifierFlags(node);
        if (node.kind === SyntaxKind.VariableDeclaration) {
            node = node.parent;
        }

        if (node && node.kind === SyntaxKind.VariableDeclarationList) {
            flags |= getModifierFlags(node);
            node = node.parent;
        }

        if (node && node.kind === SyntaxKind.VariableStatement) {
            flags |= getModifierFlags(node);
        }

        return flags;
    }

    // Returns the node flags for this node and all relevant parent nodes.  This is done so that
    // nodes like variable declarations and binding elements can returned a view of their flags
    // that includes the modifiers from their container.  i.e. flags like export/declare aren't
    // stored on the variable declaration directly, but on the containing variable statement
    // (if it has one).  Similarly, flags for let/const are store on the variable declaration
    // list.  By calling this function, all those flags are combined so that the client can treat
    // the node as if it actually had those flags.
    export function getCombinedNodeFlags(node: Node): NodeFlags {
        node = walkUpBindingElementsAndPatterns(node);

        let flags = node.flags;
        if (node.kind === SyntaxKind.VariableDeclaration) {
            node = node.parent;
        }

        if (node && node.kind === SyntaxKind.VariableDeclarationList) {
            flags |= node.flags;
            node = node.parent;
        }

        if (node && node.kind === SyntaxKind.VariableStatement) {
            flags |= node.flags;
        }

        return flags;
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

        function trySetLanguageAndTerritory(language: string, territory: string, errors?: Push<Diagnostic>): boolean {
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
            let fileContents = "";
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
                ts.localizedDiagnosticMessages = JSON.parse(fileContents);
            }
            catch (e) {
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
    export function getOriginalNode(node: Node, nodeTest?: (node: Node) => boolean): Node {
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
    export function getParseTreeNode<T extends Node>(node: Node, nodeTest?: (node: Node) => node is T): T;
    export function getParseTreeNode(node: Node, nodeTest?: (node: Node) => boolean): Node {
        if (node === undefined || isParseTreeNode(node)) {
            return node;
        }

        node = getOriginalNode(node);

        if (isParseTreeNode(node) && (!nodeTest || nodeTest(node))) {
            return node;
        }

        return undefined;
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
     * Remove extra underscore from escaped identifier text content.
     * @deprecated Use `id.text` for the unescaped text.
     * @param identifier The escaped identifier text.
     * @returns The unescaped identifier text.
     */
    export function unescapeIdentifier(id: string): string {
        return id;
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
        // Covers remaining cases
        switch (hostNode.kind) {
            case SyntaxKind.VariableStatement:
                if (hostNode.declarationList && hostNode.declarationList.declarations[0]) {
                    return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
                }
                return undefined;
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
                return undefined;
            case SyntaxKind.EndOfFileToken:
                return undefined;
            case SyntaxKind.ParenthesizedExpression: {
                return getDeclarationIdentifier(hostNode.expression);
            }
            case SyntaxKind.LabeledStatement: {
                if (isDeclaration(hostNode.statement) || isExpression(hostNode.statement)) {
                    return getDeclarationIdentifier(hostNode.statement);
                }
                return undefined;
            }
            default:
                Debug.assertNever(hostNode, "Found typedef tag attached to node which it should not be!");
        }
    }

    function getDeclarationIdentifier(node: Declaration | Expression) {
        const name = getNameOfDeclaration(node);
        return isIdentifier(name) ? name : undefined;
    }

    export function getNameOfJSDocTypedef(declaration: JSDocTypedefTag): Identifier | undefined {
        return declaration.name || nameForNamelessJSDocTypedef(declaration);
    }

    /** @internal */
    export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName } {
        return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
    }

    export function getNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
        if (!declaration) {
            return undefined;
        }
        switch (declaration.kind) {
            case SyntaxKind.ClassExpression:
            case SyntaxKind.FunctionExpression:
                if (!(declaration as ClassExpression | FunctionExpression).name) {
                    return getAssignedName(declaration);
                }
                break;
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
            case SyntaxKind.BinaryExpression: {
                const expr = declaration as BinaryExpression;
                switch (getSpecialPropertyAssignmentKind(expr)) {
                    case SpecialPropertyAssignmentKind.ExportsProperty:
                    case SpecialPropertyAssignmentKind.ThisProperty:
                    case SpecialPropertyAssignmentKind.Property:
                    case SpecialPropertyAssignmentKind.PrototypeProperty:
                        return (expr.left as PropertyAccessExpression).name;
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

    function getAssignedName(node: Node): DeclarationName {
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
     * @remarks Returns any JSDoc param tag that matches the provided
     * parameter, whether a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the param
     * tag on the containing function expression would be first.
     *
     * Does not return tags for binding patterns, because JSDoc matches
     * parameters by name and binding patterns do not have a name.
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
     * Gets the return type node for the node if provided via JSDoc's return tag.
     *
     * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
     * gets the type from inside the braces.
     */
    export function getJSDocReturnType(node: Node): TypeNode | undefined {
        const returnTag = getJSDocReturnTag(node);
        return returnTag && returnTag.typeExpression && returnTag.typeExpression.type;
    }

    /** Get all JSDoc tags related to a node, including those on parent nodes. */
    export function getJSDocTags(node: Node): ReadonlyArray<JSDocTag> {
        let tags = (node as JSDocContainer).jsDocCache;
        // If cache is 'null', that means we did the work of searching for JSDoc tags and came up with nothing.
        if (tags === undefined) {
            (node as JSDocContainer).jsDocCache = tags = flatMap(getJSDocCommentsAndTags(node), j => isJSDoc(j) ? j.tags : j);
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
}

// Simple node tests of the form `node.kind === SyntaxKind.Foo`.
namespace ts {
    // Literals
    export function isNumericLiteral(node: Node): node is NumericLiteral {
        return node.kind === SyntaxKind.NumericLiteral;
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

    export function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail {
        const kind = node.kind;
        return kind === SyntaxKind.TemplateMiddle
            || kind === SyntaxKind.TemplateTail;
    }

    export function isStringTextContainingNode(node: Node) {
        return node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind);
    }

    // Identifiers

    /* @internal */
    export function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier {
        // Using `>` here catches both `GeneratedIdentifierKind.None` and `undefined`.
        return isIdentifier(node) && (node.autoGenerateFlags & GeneratedIdentifierFlags.KindMask) > GeneratedIdentifierFlags.None;
    }

    // Keywords

    /* @internal */
    export function isModifierKind(token: SyntaxKind): boolean {
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

    function isTypeNodeKind(kind: SyntaxKind) {
        return (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode)
            || kind === SyntaxKind.AnyKeyword
            || kind === SyntaxKind.NumberKeyword
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
    export function isBindingPattern(node: Node): node is BindingPattern {
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
            return node.parent.kind !== SyntaxKind.JSDocTemplateTag || isInJavaScriptFile(node);
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
        return node.kind === SyntaxKind.JSDocComment || isJSDocTag(node) || isJSDocTypeLiteral(node);
    }

    // TODO: determine what this does before making it public.
    /* @internal */
    export function isJSDocTag(node: Node): boolean {
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
    export function hasJSDocNodes(node: Node): node is HasJSDoc {
        return !!(node as JSDocContainer).jsDoc && (node as JSDocContainer).jsDoc.length > 0;
    }

    /** True if has type node attached to it. */
    /* @internal */
    export function hasType(node: Node): node is HasType {
        return !!(node as HasType).type;
    }

    /* True if the node could have a type node a `.type` */
    /* @internal */
    export function couldHaveType(node: Node): node is HasType {
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.TypePredicate:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.ParenthesizedType:
            case SyntaxKind.TypeOperator:
            case SyntaxKind.MappedType:
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.AsExpression:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.JSDocTypeExpression:
            case SyntaxKind.JSDocNullableType:
            case SyntaxKind.JSDocNonNullableType:
            case SyntaxKind.JSDocOptionalType:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.JSDocVariadicType:
            return true;
        }
        return false;
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
        switch (node.kind) {
            case SyntaxKind.JsxAttribute:
            case SyntaxKind.JsxSpreadAttribute:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
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

    /** @internal */
    export function isNamedImportsOrExports(node: Node): node is NamedImportsOrExports {
        return node.kind === SyntaxKind.NamedImports || node.kind === SyntaxKind.NamedExports;
    }
}
