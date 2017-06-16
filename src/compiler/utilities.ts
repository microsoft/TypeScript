/// <reference path="sys.ts" />

/* @internal */
namespace ts {
    export const externalHelpersModuleNameText = "tslib";

    export interface ReferencePathMatchResult {
        fileReference?: FileReference;
        diagnosticMessage?: DiagnosticMessage;
        isNoDefaultLib?: boolean;
        isTypeReferenceDirective?: boolean;
    }

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

    export function findDeclaration<T extends Declaration>(symbol: Symbol, predicate: (node: Declaration) => node is T): T | undefined;
    export function findDeclaration(symbol: Symbol, predicate: (node: Declaration) => boolean): Declaration | undefined;
    export function findDeclaration(symbol: Symbol, predicate: (node: Declaration) => boolean): Declaration | undefined {
        const declarations = symbol.declarations;
        if (declarations) {
            for (const declaration of declarations) {
                if (predicate(declaration)) {
                    return declaration;
                }
            }
        }
        return undefined;
    }

    export interface StringSymbolWriter extends SymbolWriter {
        string(): string;
    }

    // Pool writers to avoid needing to allocate them for every symbol we write.
    const stringWriters: StringSymbolWriter[] = [];
    export function getSingleLineStringWriter(): StringSymbolWriter {
        if (stringWriters.length === 0) {
            let str = "";

            const writeText: (text: string) => void = text => str += text;
            return {
                string: () => str,
                writeKeyword: writeText,
                writeOperator: writeText,
                writePunctuation: writeText,
                writeSpace: writeText,
                writeStringLiteral: writeText,
                writeParameter: writeText,
                writeProperty: writeText,
                writeSymbol: writeText,

                // Completely ignore indentation for string writers.  And map newlines to
                // a single space.
                writeLine: () => str += " ",
                increaseIndent: noop,
                decreaseIndent: noop,
                clear: () => str = "",
                trackSymbol: noop,
                reportInaccessibleThisError: noop,
                reportPrivateInBaseOfClassExpression: noop,
            };
        }

        return stringWriters.pop();
    }

    export function releaseStringWriter(writer: StringSymbolWriter) {
        writer.clear();
        stringWriters.push(writer);
    }

    export function getFullWidth(node: Node) {
        return node.end - node.pos;
    }

    export function hasResolvedModule(sourceFile: SourceFile, moduleNameText: string): boolean {
        return !!(sourceFile && sourceFile.resolvedModules && sourceFile.resolvedModules.get(moduleNameText));
    }

    export function getResolvedModule(sourceFile: SourceFile, moduleNameText: string): ResolvedModuleFull {
        return hasResolvedModule(sourceFile, moduleNameText) ? sourceFile.resolvedModules.get(moduleNameText) : undefined;
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

    /* @internal */
    export function moduleResolutionIsEqualTo(oldResolution: ResolvedModuleFull, newResolution: ResolvedModuleFull): boolean {
        return oldResolution.isExternalLibraryImport === newResolution.isExternalLibraryImport &&
            oldResolution.extension === newResolution.extension &&
            oldResolution.resolvedFileName === newResolution.resolvedFileName;
    }

    /* @internal */
    export function typeDirectiveIsEqualTo(oldResolution: ResolvedTypeReferenceDirective, newResolution: ResolvedTypeReferenceDirective): boolean {
        return oldResolution.resolvedFileName === newResolution.resolvedFileName && oldResolution.primary === newResolution.primary;
    }

    /* @internal */
    export function hasChangesInResolutions<T>(names: string[], newResolutions: T[], oldResolutions: Map<T>, comparer: (oldResolution: T, newResolution: T) => boolean): boolean {
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

    export function getStartPosOfNode(node: Node): number {
        return node.pos;
    }

    export function isDefined(value: any): boolean {
        return value !== undefined;
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

    export function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number {
        // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
        // want to skip trivia because this will launch us forward to the next token.
        if (nodeIsMissing(node)) {
            return node.pos;
        }

        if (isJSDocNode(node)) {
            return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
        }

        if (includeJsDoc && node.jsDoc && node.jsDoc.length > 0) {
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
        if (nodeIsMissing(node)) {
            return "";
        }

        const text = sourceFile.text;
        return text.substring(includeTrivia ? node.pos : skipTrivia(text, node.pos), node.end);
    }

    export function getTextOfNodeFromSourceText(sourceText: string, node: Node): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        return sourceText.substring(skipTrivia(sourceText, node.pos), node.end);
    }

    export function getTextOfNode(node: Node, includeTrivia = false): string {
        return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
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
        if (!nodeIsSynthesized(node) && node.parent) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, node);
        }

        const escapeText = getEmitFlags(node) & EmitFlags.NoAsciiEscaping ? escapeString : escapeNonAsciiString;

        // If we can't reach the original source text, use the canonical form if it's a number,
        // or a (possibly escaped) quoted form of the original text if it's string-like.
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
                return '"' + escapeText(node.text) + '"';
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return "`" + escapeText(node.text) + "`";
            case SyntaxKind.TemplateHead:
                return "`" + escapeText(node.text) + "${";
            case SyntaxKind.TemplateMiddle:
                return "}" + escapeText(node.text) + "${";
            case SyntaxKind.TemplateTail:
                return "}" + escapeText(node.text) + "`";
            case SyntaxKind.NumericLiteral:
                return node.text;
        }

        Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
    }

    export function getTextOfConstantValue(value: string | number) {
        return typeof value === "string" ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
    }

    // Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__'
    export function escapeIdentifier(identifier: string): string {
        return identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier;
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

    export function isAmbientModule(node: Node): boolean {
        return node && node.kind === SyntaxKind.ModuleDeclaration &&
            ((<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral || isGlobalScopeAugmentation(<ModuleDeclaration>node));
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

    export function isExternalModuleAugmentation(node: Node): boolean {
        // external module augmentation is a ambient module declaration that is either:
        // - defined in the top level scope and source file is an external module
        // - defined inside ambient module declaration located in the top level scope and source file not an external module
        if (!node || !isAmbientModule(node)) {
            return false;
        }
        switch (node.parent.kind) {
            case SyntaxKind.SourceFile:
                return isExternalModule(<SourceFile>node.parent);
            case SyntaxKind.ModuleBlock:
                return isAmbientModule(node.parent.parent) && !isExternalModule(<SourceFile>node.parent.parent.parent);
        }
        return false;
    }

    export function isEffectiveExternalModule(node: SourceFile, compilerOptions: CompilerOptions) {
        return isExternalModule(node) || compilerOptions.isolatedModules;
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
    export function declarationNameToString(name: DeclarationName) {
        return getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
    }

    export function getNameFromIndexInfo(info: IndexInfo): string | undefined {
        return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
    }

    export function getTextOfPropertyName(name: PropertyName): string {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return (<Identifier>name).text;
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                return (<LiteralExpression>name).text;
            case SyntaxKind.ComputedPropertyName:
                if (isStringOrNumericLiteral((<ComputedPropertyName>name).expression)) {
                    return (<LiteralExpression>(<ComputedPropertyName>name).expression).text;
                }
        }

        return undefined;
    }

    export function entityNameToString(name: EntityNameOrEntityNameExpression): string {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return getFullWidth(name) === 0 ? unescapeIdentifier((<Identifier>name).text) : getTextOfNode(name);
            case SyntaxKind.QualifiedName:
                return entityNameToString((<QualifiedName>name).left) + "." + entityNameToString((<QualifiedName>name).right);
            case SyntaxKind.PropertyAccessExpression:
                return entityNameToString((<PropertyAccessEntityNameExpression>name).expression) + "." + entityNameToString((<PropertyAccessEntityNameExpression>name).name);
        }
    }

    export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): Diagnostic {
        const sourceFile = getSourceFileOfNode(node);
        return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2);
    }

    export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): Diagnostic {
        const span = getErrorSpanForNode(sourceFile, node);
        return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2);
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

        const pos = nodeIsMissing(errorNode)
            ? errorNode.pos
            : skipTrivia(sourceFile.text, errorNode.pos);

        return createTextSpanFromBounds(pos, errorNode.end);
    }

    export function isExternalOrCommonJsModule(file: SourceFile): boolean {
        return (file.externalModuleIndicator || file.commonJsModuleIndicator) !== undefined;
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

    export function isPrologueDirective(node: Node): node is PrologueDirective {
        return node.kind === SyntaxKind.ExpressionStatement
            && (<ExpressionStatement>node).expression.kind === SyntaxKind.StringLiteral;
    }

    export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile) {
        return getLeadingCommentRanges(sourceFileOfNode.text, node.pos);
    }

    export function getLeadingCommentRangesOfNodeFromText(node: Node, text: string) {
        return getLeadingCommentRanges(text, node.pos);
    }

    export function getJSDocCommentRanges(node: Node, text: string) {
        const commentRanges = (node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.TypeParameter ||
            node.kind === SyntaxKind.FunctionExpression ||
            node.kind === SyntaxKind.ArrowFunction) ?
            concatenate(getTrailingCommentRanges(text, node.pos), getLeadingCommentRanges(text, node.pos)) :
            getLeadingCommentRangesOfNodeFromText(node, text);
        // True if the comment starts with '/**' but not if it is '/**/'
        return filter(commentRanges, comment =>
            text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
            text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
            text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash);
    }

    export let fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
    export let fullTripleSlashReferenceTypeReferenceDirectiveRegEx = /^(\/\/\/\s*<reference\s+types\s*=\s*)('|")(.+?)\2.*?\/>/;
    export let fullTripleSlashAMDReferencePathRegEx = /^(\/\/\/\s*<amd-dependency\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;

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
                        return node === (<VariableLikeDeclaration>parent).type;
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
                        return (<CallExpression>parent).typeArguments && indexOf((<CallExpression>parent).typeArguments, node) >= 0;
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
                        const name = (<FunctionLikeDeclaration>node).name;
                        if (name && name.kind === SyntaxKind.ComputedPropertyName) {
                            // Note that we will not include methods/accessors of a class because they would require
                            // first descending into the class. This is by design.
                            traverse((<ComputedPropertyName>name).expression);
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

    export function getPropertyAssignment(objectLiteral: ObjectLiteralExpression, key: string, key2?: string) {
        return <PropertyAssignment[]>filter(objectLiteral.properties, property => {
            if (property.kind === SyntaxKind.PropertyAssignment) {
                const propName = getTextOfPropertyName(property.name);
                return key === propName || (key2 && key2 === propName);
            }
        });
    }

    export function getContainingFunction(node: Node): FunctionLikeDeclaration {
        while (true) {
            node = node.parent;
            if (!node || isFunctionLike(node)) {
                return <FunctionLikeDeclaration>node;
            }
        }
    }

    export function getContainingClass(node: Node): ClassLikeDeclaration {
        while (true) {
            node = node.parent;
            if (!node || isClassLike(node)) {
                return <ClassLikeDeclaration>node;
            }
        }
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
     * Determines whether a node is a property or element access expression for super.
     */
    export function isSuperProperty(node: Node): node is SuperProperty {
        const kind = node.kind;
        return (kind === SyntaxKind.PropertyAccessExpression || kind === SyntaxKind.ElementAccessExpression)
            && (<PropertyAccessExpression | ElementAccessExpression>node).expression.kind === SyntaxKind.SuperKeyword;
    }

    export function getEntityNameFromTypeNode(node: TypeNode): EntityNameOrEntityNameExpression {
        switch (node.kind) {
            case SyntaxKind.TypeReference:
            case SyntaxKind.JSDocTypeReference:
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
        if (node.kind === SyntaxKind.TaggedTemplateExpression) {
            return (<TaggedTemplateExpression>node).tag;
        }
        else if (isJsxOpeningLikeElement(node)) {
            return node.tagName;
        }

        // Will either be a CallExpression, NewExpression, or Decorator.
        return (<CallExpression | Decorator>node).expression;
    }

    export function nodeCanBeDecorated(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                // classes are valid targets
                return true;

            case SyntaxKind.PropertyDeclaration:
                // property declarations are valid if their parent is a class declaration.
                return node.parent.kind === SyntaxKind.ClassDeclaration;

            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
                // if this method has a body and its parent is a class declaration, this is a valid target.
                return (<FunctionLikeDeclaration>node).body !== undefined
                    && node.parent.kind === SyntaxKind.ClassDeclaration;

            case SyntaxKind.Parameter:
                // if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target;
                return (<FunctionLikeDeclaration>node.parent).body !== undefined
                    && (node.parent.kind === SyntaxKind.Constructor
                        || node.parent.kind === SyntaxKind.MethodDeclaration
                        || node.parent.kind === SyntaxKind.SetAccessor)
                    && node.parent.parent.kind === SyntaxKind.ClassDeclaration;
        }

        return false;
    }

    export function nodeIsDecorated(node: Node): boolean {
        return node.decorators !== undefined
            && nodeCanBeDecorated(node);
    }

    export function nodeOrChildIsDecorated(node: Node): boolean {
        return nodeIsDecorated(node) || childIsDecorated(node);
    }

    export function childIsDecorated(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                return forEach((<ClassDeclaration>node).members, nodeOrChildIsDecorated);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.SetAccessor:
                return forEach((<FunctionLikeDeclaration>node).parameters, nodeIsDecorated);
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

    export function isPartOfExpression(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ThisKeyword:
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
                const parent = node.parent;
                switch (parent.kind) {
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.Parameter:
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.EnumMember:
                    case SyntaxKind.PropertyAssignment:
                    case SyntaxKind.BindingElement:
                        return (<VariableLikeDeclaration>parent).initializer === node;
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.SwitchStatement:
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
                        if (isPartOfExpression(parent)) {
                            return true;
                        }
                }
        }
        return false;
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

    export function isInJavaScriptFile(node: Node): boolean {
        return node && !!(node.flags & NodeFlags.JavaScriptFile);
    }

    /**
     * Returns true if the node is a CallExpression to the identifier 'require' with
     * exactly one argument (of the form 'require("name")').
     * This function does not test if the node is in a JavaScript file or not.
     */
    export function isRequireCall(callExpression: Node, checkArgumentIsStringLiteral: boolean): callExpression is CallExpression {
        if (callExpression.kind !== SyntaxKind.CallExpression) {
            return false;
        }
        const { expression, arguments: args } = callExpression as CallExpression;

        if (expression.kind !== SyntaxKind.Identifier || (expression as Identifier).text !== "require") {
            return false;
        }

        if (args.length !== 1) {
            return false;
        }
        const arg = args[0];
        return !checkArgumentIsStringLiteral || arg.kind === SyntaxKind.StringLiteral || arg.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    export function isSingleOrDoubleQuote(charCode: number) {
        return charCode === CharacterCodes.singleQuote || charCode === CharacterCodes.doubleQuote;
    }

    /**
     * Returns true if the node is a variable declaration whose initializer is a function expression.
     * This function does not test if the node is in a JavaScript file or not.
     */
    export function isDeclarationOfFunctionOrClassExpression(s: Symbol) {
        if (s.valueDeclaration && s.valueDeclaration.kind === SyntaxKind.VariableDeclaration) {
            const declaration = s.valueDeclaration as VariableDeclaration;
            return declaration.initializer && (declaration.initializer.kind === SyntaxKind.FunctionExpression || declaration.initializer.kind === SyntaxKind.ClassExpression);
        }
        return false;
    }

    export function getRightMostAssignedExpression(node: Node) {
        while (isAssignmentExpression(node, /*excludeCompoundAssignements*/ true)) {
            node = node.right;
        }
        return node;
    }

    export function isExportsIdentifier(node: Node) {
        return isIdentifier(node) && node.text === "exports";
    }

    export function isModuleExportsPropertyAccessExpression(node: Node) {
        return isPropertyAccessExpression(node) && isIdentifier(node.expression) && node.expression.text === "module" && node.name.text === "exports";
    }

    /// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
    /// assignments we treat as special in the binder
    export function getSpecialPropertyAssignmentKind(expression: ts.BinaryExpression): SpecialPropertyAssignmentKind {
        if (!isInJavaScriptFile(expression)) {
            return SpecialPropertyAssignmentKind.None;
        }
        const expr = <BinaryExpression>expression;
        if (expr.operatorToken.kind !== SyntaxKind.EqualsToken || expr.left.kind !== SyntaxKind.PropertyAccessExpression) {
            return SpecialPropertyAssignmentKind.None;
        }
        const lhs = <PropertyAccessExpression>expr.left;
        if (lhs.expression.kind === SyntaxKind.Identifier) {
            const lhsId = <Identifier>lhs.expression;
            if (lhsId.text === "exports") {
                // exports.name = expr
                return SpecialPropertyAssignmentKind.ExportsProperty;
            }
            else if (lhsId.text === "module" && lhs.name.text === "exports") {
                // module.exports = expr
                return SpecialPropertyAssignmentKind.ModuleExports;
            }
            else {
                // F.x = expr
                return SpecialPropertyAssignmentKind.Property;
            }
        }
        else if (lhs.expression.kind === SyntaxKind.ThisKeyword) {
            return SpecialPropertyAssignmentKind.ThisProperty;
        }
        else if (lhs.expression.kind === SyntaxKind.PropertyAccessExpression) {
            // chained dot, e.g. x.y.z = expr; this var is the 'x.y' part
            const innerPropertyAccess = <PropertyAccessExpression>lhs.expression;
            if (innerPropertyAccess.expression.kind === SyntaxKind.Identifier) {
                // module.exports.name = expr
                const innerPropertyAccessIdentifier = <Identifier>innerPropertyAccess.expression;
                if (innerPropertyAccessIdentifier.text === "module" && innerPropertyAccess.name.text === "exports") {
                    return SpecialPropertyAssignmentKind.ExportsProperty;
                }
                if (innerPropertyAccess.name.text === "prototype") {
                    return SpecialPropertyAssignmentKind.PrototypeProperty;
                }
            }
        }


        return SpecialPropertyAssignmentKind.None;
    }

    export function getExternalModuleName(node: Node): Expression {
        if (node.kind === SyntaxKind.ImportDeclaration) {
            return (<ImportDeclaration>node).moduleSpecifier;
        }
        if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
            const reference = (<ImportEqualsDeclaration>node).moduleReference;
            if (reference.kind === SyntaxKind.ExternalModuleReference) {
                return (<ExternalModuleReference>reference).expression;
            }
        }
        if (node.kind === SyntaxKind.ExportDeclaration) {
            return (<ExportDeclaration>node).moduleSpecifier;
        }
        if (node.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral) {
            return (<ModuleDeclaration>node).name;
        }
    }

    export function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): ImportEqualsDeclaration | NamespaceImport {
        if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
            return <ImportEqualsDeclaration>node;
        }

        const importClause = (<ImportDeclaration>node).importClause;
        if (importClause && importClause.namedBindings && importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
            return <NamespaceImport>importClause.namedBindings;
        }
    }

    export function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
        return node.kind === SyntaxKind.ImportDeclaration
            && (<ImportDeclaration>node).importClause
            && !!(<ImportDeclaration>node).importClause.name;
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
            (<JSDocFunctionType>node).parameters.length > 0 &&
            (<JSDocFunctionType>node).parameters[0].type.kind === SyntaxKind.JSDocConstructorType;
    }

    export function getCommentsFromJSDoc(node: Node): string[] {
        return map(getJSDocs(node), doc => doc.comment);
    }

    export function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration) {
        const parameterTags = getJSDocTags(node, SyntaxKind.JSDocParameterTag);
        return parameterTags && parameterTags.length > 0;
    }

    function getJSDocTags(node: Node, kind: SyntaxKind): JSDocTag[] {
        return flatMap(getJSDocs(node), doc =>
            doc.kind === SyntaxKind.JSDocComment
                ? filter((doc as JSDoc).tags, tag => tag.kind === kind)
                : doc.kind === kind && doc);
    }

    function getFirstJSDocTag(node: Node, kind: SyntaxKind): JSDocTag {
        return node && firstOrUndefined(getJSDocTags(node, kind));
    }

    export function getJSDocs(node: Node): (JSDoc | JSDocTag)[] {
        if (isJSDocTypedefTag(node)) {
            return [node.parent];
        }

        let cache: (JSDoc | JSDocTag)[] = node.jsDocCache;
        if (!cache) {
            getJSDocsWorker(node);
            node.jsDocCache = cache;
        }
        return cache;

        function getJSDocsWorker(node: Node) {
            const parent = node.parent;
            // Try to recognize this pattern when node is initializer of variable declaration and JSDoc comments are on containing variable statement.
            // /**
            //   * @param {number} name
            //   * @returns {number}
            //   */
            // var x = function(name) { return name.length; }
            const isInitializerOfVariableDeclarationInStatement =
                isVariableLike(parent) &&
                parent.initializer === node &&
                parent.parent.parent.kind === SyntaxKind.VariableStatement;
            const isVariableOfVariableDeclarationStatement = isVariableLike(node) &&
                parent.parent.kind === SyntaxKind.VariableStatement;
            const variableStatementNode =
                isInitializerOfVariableDeclarationInStatement ? parent.parent.parent :
                isVariableOfVariableDeclarationStatement ? parent.parent :
                undefined;
            if (variableStatementNode) {
                getJSDocsWorker(variableStatementNode);
            }

            // Also recognize when the node is the RHS of an assignment expression
            const isSourceOfAssignmentExpressionStatement =
                parent && parent.parent &&
                parent.kind === SyntaxKind.BinaryExpression &&
                (parent as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken &&
                parent.parent.kind === SyntaxKind.ExpressionStatement;
            if (isSourceOfAssignmentExpressionStatement) {
                getJSDocsWorker(parent.parent);
            }

            const isModuleDeclaration = node.kind === SyntaxKind.ModuleDeclaration &&
                parent && parent.kind === SyntaxKind.ModuleDeclaration;
            const isPropertyAssignmentExpression = parent && parent.kind === SyntaxKind.PropertyAssignment;
            if (isModuleDeclaration || isPropertyAssignmentExpression) {
                getJSDocsWorker(parent);
            }

            // Pull parameter comments from declaring function as well
            if (node.kind === SyntaxKind.Parameter) {
                cache = concatenate(cache, getJSDocParameterTags(node as ParameterDeclaration));
            }

            if (isVariableLike(node) && node.initializer) {
                cache = concatenate(cache, node.initializer.jsDoc);
            }

            cache = concatenate(cache, node.jsDoc);
        }
    }

    export function getJSDocParameterTags(param: ParameterDeclaration): JSDocParameterTag[] {
        const func = param.parent;
        const tags = getJSDocTags(func, SyntaxKind.JSDocParameterTag) as JSDocParameterTag[];
        if (!param.name) {
            // this is an anonymous jsdoc param from a `function(type1, type2): type3` specification
            const i = func.parameters.indexOf(param);
            const paramTags = filter(tags, tag => tag.kind === SyntaxKind.JSDocParameterTag);
            if (paramTags && 0 <= i && i < paramTags.length) {
                return [paramTags[i]];
            }
        }
        else if (param.name.kind === SyntaxKind.Identifier) {
            const name = (param.name as Identifier).text;
            return filter(tags, tag => tag.kind === SyntaxKind.JSDocParameterTag && tag.name.text === name);
        }
        else {
            // TODO: it's a destructured parameter, so it should look up an "object type" series of multiple lines
            // But multi-line object types aren't supported yet either
            return undefined;
        }
    }

    /** Does the opposite of `getJSDocParameterTags`: given a JSDoc parameter, finds the parameter corresponding to it. */
    export function getParameterFromJSDoc(node: JSDocParameterTag): ParameterDeclaration | undefined {
        const name = node.name.text;
        const grandParent = node.parent!.parent!;
        Debug.assert(node.parent!.kind === SyntaxKind.JSDocComment);
        if (!isFunctionLike(grandParent)) {
            return undefined;
        }
        return find(grandParent.parameters, p =>
            p.name.kind === SyntaxKind.Identifier && p.name.text === name);
    }

    export function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & { parent: JSDocTemplateTag }): TypeParameterDeclaration | undefined {
        const name = node.name.text;
        const { typeParameters } = (node.parent.parent.parent as ts.SignatureDeclaration | ts.InterfaceDeclaration | ts.ClassDeclaration);
        return find(typeParameters, p => p.name.text === name);
    }

    export function getJSDocType(node: Node): JSDocType {
        let tag: JSDocTypeTag | JSDocParameterTag = getFirstJSDocTag(node, SyntaxKind.JSDocTypeTag) as JSDocTypeTag;
        if (!tag && node.kind === SyntaxKind.Parameter) {
            const paramTags = getJSDocParameterTags(node as ParameterDeclaration);
            if (paramTags) {
                tag = find(paramTags, tag => !!tag.typeExpression);
            }
        }

        return tag && tag.typeExpression && tag.typeExpression.type;
    }

    export function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag {
        return getFirstJSDocTag(node, SyntaxKind.JSDocAugmentsTag) as JSDocAugmentsTag;
    }

    export function getJSDocClassTag(node: Node): JSDocClassTag {
        return getFirstJSDocTag(node, SyntaxKind.JSDocClassTag) as JSDocClassTag;
    }

    export function getJSDocReturnTag(node: Node): JSDocReturnTag {
        return getFirstJSDocTag(node, SyntaxKind.JSDocReturnTag) as JSDocReturnTag;
    }

    export function getJSDocReturnType(node: Node): JSDocType {
        const returnTag = getJSDocReturnTag(node);
        return returnTag && returnTag.typeExpression && returnTag.typeExpression.type;
    }

    export function getJSDocTemplateTag(node: Node): JSDocTemplateTag {
        return getFirstJSDocTag(node, SyntaxKind.JSDocTemplateTag) as JSDocTemplateTag;
    }

    export function hasRestParameter(s: SignatureDeclaration): boolean {
        return isRestParameter(lastOrUndefined(s.parameters));
    }

    export function hasDeclaredRestParameter(s: SignatureDeclaration): boolean {
        return isDeclaredRestParam(lastOrUndefined(s.parameters));
    }

    export function isRestParameter(node: ParameterDeclaration) {
        if (node && (node.flags & NodeFlags.JavaScriptFile)) {
            if (node.type && node.type.kind === SyntaxKind.JSDocVariadicType ||
                forEach(getJSDocParameterTags(node),
                        t => t.typeExpression && t.typeExpression.type.kind === SyntaxKind.JSDocVariadicType)) {
                return true;
            }
        }
        return isDeclaredRestParam(node);
    }

    export function isDeclaredRestParam(node: ParameterDeclaration) {
        return node && node.dotDotDotToken !== undefined;
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

    // a node is delete target iff. it is PropertyAccessExpression/ElementAccessExpression with parentheses skipped
    export function isDeleteTarget(node: Node): boolean {
        if (node.kind !== SyntaxKind.PropertyAccessExpression && node.kind !== SyntaxKind.ElementAccessExpression) {
            return false;
        }
        node = node.parent;
        while (node && node.kind === SyntaxKind.ParenthesizedExpression) {
            node = node.parent;
        }
        return node && node.kind === SyntaxKind.DeleteExpression;
    }

    export function isNodeDescendantOf(node: Node, ancestor: Node): boolean {
        while (node) {
            if (node === ancestor) return true;
            node = node.parent;
        }
        return false;
    }

    export function isInAmbientContext(node: Node): boolean {
        while (node) {
            if (hasModifier(node, ModifierFlags.Ambient) || (node.kind === SyntaxKind.SourceFile && (node as SourceFile).isDeclarationFile)) {
                return true;
            }
            node = node.parent;
        }
        return false;
    }

    // True if the given identifier, string literal, or number literal is the name of a declaration node
    export function isDeclarationName(name: Node): boolean {
        switch (name.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                return isDeclaration(name.parent) && name.parent.name === name;
            default:
                return false;
        }
    }

    /* @internal */
    // See GH#16030
    export function isAnyDeclarationName(name: Node): boolean {
        switch (name.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                if (isDeclaration(name.parent)) {
                    return name.parent.name === name;
                }
                const binExp = name.parent.parent;
                return isBinaryExpression(binExp) && getSpecialPropertyAssignmentKind(binExp) !== SpecialPropertyAssignmentKind.None && getNameOfDeclaration(binExp) === name;
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
                // Name on right hand side of dot in a type query
                if ((<QualifiedName>parent).right === node) {
                    while (parent.kind === SyntaxKind.QualifiedName) {
                        parent = parent.parent;
                    }
                    return parent.kind === SyntaxKind.TypeQuery;
                }
                return false;
            case SyntaxKind.BindingElement:
            case SyntaxKind.ImportSpecifier:
                // Property name in binding element or import specifier
                return (<BindingElement | ImportSpecifier>parent).propertyName === node;
            case SyntaxKind.ExportSpecifier:
                // Any name in an export specifier
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
            node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(<ExportAssignment>node);
    }

    export function exportAssignmentIsAlias(node: ExportAssignment): boolean {
        return isEntityNameExpression(node.expression);
    }

    export function getClassExtendsHeritageClauseElement(node: ClassLikeDeclaration | InterfaceDeclaration) {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
    }

    export function getClassImplementsHeritageClauseElements(node: ClassLikeDeclaration) {
        const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ImplementsKeyword);
        return heritageClause ? heritageClause.types : undefined;
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

    export function getFileReferenceFromReferencePath(comment: string, commentRange: CommentRange): ReferencePathMatchResult {
        const simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
        const isNoDefaultLibRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)('|")(.+?)\2\s*\/>/gim;
        if (simpleReferenceRegEx.test(comment)) {
            if (isNoDefaultLibRegEx.test(comment)) {
                return { isNoDefaultLib: true };
            }
            else {
                const refMatchResult = fullTripleSlashReferencePathRegEx.exec(comment);
                const refLibResult = !refMatchResult && fullTripleSlashReferenceTypeReferenceDirectiveRegEx.exec(comment);
                const match = refMatchResult || refLibResult;
                if (match) {
                    const pos = commentRange.pos + match[1].length + match[2].length;
                    return {
                        fileReference: {
                            pos,
                            end: pos + match[3].length,
                            fileName: match[3]
                        },
                        isNoDefaultLib: false,
                        isTypeReferenceDirective: !!refLibResult
                    };
                }

                return {
                    diagnosticMessage: Diagnostics.Invalid_reference_directive_syntax,
                    isNoDefaultLib: false
                };
            }
        }

        return undefined;
    }

    export function isKeyword(token: SyntaxKind): boolean {
        return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
    }

    export function isTrivia(token: SyntaxKind) {
        return SyntaxKind.FirstTriviaToken <= token && token <= SyntaxKind.LastTriviaToken;
    }

    export const enum FunctionFlags {
        Normal = 0,             // Function is a normal function
        Generator = 1 << 0,     // Function is a generator function or async generator function
        Async = 1 << 1,         // Function is an async function or an async generator function
        Invalid = 1 << 2,       // Function is a signature or overload and does not have a body.
        AsyncGenerator = Async | Generator, // Function is an async generator function
    }

    export function getFunctionFlags(node: FunctionLikeDeclaration | undefined) {
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

        if (!node.body) {
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
    export function hasDynamicName(declaration: Declaration): boolean {
        const name = getNameOfDeclaration(declaration);
        return name && isDynamicName(name);
    }

    export function isDynamicName(name: DeclarationName): boolean {
        return name.kind === SyntaxKind.ComputedPropertyName &&
            !isStringOrNumericLiteral((<ComputedPropertyName>name).expression) &&
            !isWellKnownSymbolSyntactically((<ComputedPropertyName>name).expression);
    }

    /**
     * Checks if the expression is of the form:
     *    Symbol.name
     * where Symbol is literally the word "Symbol", and name is any identifierName
     */
    export function isWellKnownSymbolSyntactically(node: Expression): boolean {
        return isPropertyAccessExpression(node) && isESSymbolIdentifier(node.expression);
    }

    export function getPropertyNameForPropertyNameNode(name: DeclarationName | ParameterDeclaration): string {
        if (name.kind === SyntaxKind.Identifier || name.kind === SyntaxKind.StringLiteral || name.kind === SyntaxKind.NumericLiteral || name.kind === SyntaxKind.Parameter) {
            return (<Identifier | LiteralExpression>name).text;
        }
        if (name.kind === SyntaxKind.ComputedPropertyName) {
            const nameExpression = (<ComputedPropertyName>name).expression;
            if (isWellKnownSymbolSyntactically(nameExpression)) {
                const rightHandSideName = (<PropertyAccessExpression>nameExpression).name.text;
                return getPropertyNameForKnownSymbolName(rightHandSideName);
            }
            else if (nameExpression.kind === SyntaxKind.StringLiteral || nameExpression.kind === SyntaxKind.NumericLiteral) {
                return (<LiteralExpression>nameExpression).text;
            }
        }

        return undefined;
    }

    export function getPropertyNameForKnownSymbolName(symbolName: string): string {
        return "__@" + symbolName;
    }

    /**
     * Includes the word "Symbol" with unicode escapes
     */
    export function isESSymbolIdentifier(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier && (<Identifier>node).text === "Symbol";
    }

    export function isPushOrUnshiftIdentifier(node: Identifier) {
        return node.text === "push" || node.text === "unshift";
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

    export function nodeIsSynthesized(node: TextRange): boolean {
        return positionIsSynthesized(node.pos)
            || positionIsSynthesized(node.end);
    }

    export function getOriginalSourceFile(sourceFile: SourceFile) {
        return getParseTreeNode(sourceFile, isSourceFile) || sourceFile;
    }

    export function getOriginalSourceFiles(sourceFiles: SourceFile[]) {
        return sameMap(sourceFiles, getOriginalSourceFile);
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
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.OmittedExpression:
                return 19;

            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                return 18;

            case SyntaxKind.NewExpression:
                return hasArguments ? 18 : 17;

            case SyntaxKind.CallExpression:
                return 17;

            case SyntaxKind.PostfixUnaryExpression:
                return 16;

            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.AwaitExpression:
                return 15;

            case SyntaxKind.BinaryExpression:
                switch (operatorKind) {
                    case SyntaxKind.ExclamationToken:
                    case SyntaxKind.TildeToken:
                        return 15;

                    case SyntaxKind.AsteriskAsteriskToken:
                    case SyntaxKind.AsteriskToken:
                    case SyntaxKind.SlashToken:
                    case SyntaxKind.PercentToken:
                        return 14;

                    case SyntaxKind.PlusToken:
                    case SyntaxKind.MinusToken:
                        return 13;

                    case SyntaxKind.LessThanLessThanToken:
                    case SyntaxKind.GreaterThanGreaterThanToken:
                    case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                        return 12;

                    case SyntaxKind.LessThanToken:
                    case SyntaxKind.LessThanEqualsToken:
                    case SyntaxKind.GreaterThanToken:
                    case SyntaxKind.GreaterThanEqualsToken:
                    case SyntaxKind.InKeyword:
                    case SyntaxKind.InstanceOfKeyword:
                        return 11;

                    case SyntaxKind.EqualsEqualsToken:
                    case SyntaxKind.EqualsEqualsEqualsToken:
                    case SyntaxKind.ExclamationEqualsToken:
                    case SyntaxKind.ExclamationEqualsEqualsToken:
                        return 10;

                    case SyntaxKind.AmpersandToken:
                        return 9;

                    case SyntaxKind.CaretToken:
                        return 8;

                    case SyntaxKind.BarToken:
                        return 7;

                    case SyntaxKind.AmpersandAmpersandToken:
                        return 6;

                    case SyntaxKind.BarBarToken:
                        return 5;

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

                    case SyntaxKind.CommaToken:
                        return 0;

                    default:
                        return -1;
                }

            case SyntaxKind.ConditionalExpression:
                return 4;

            case SyntaxKind.YieldExpression:
                return 2;

            case SyntaxKind.SpreadElement:
                return 1;

            case SyntaxKind.CommaListExpression:
                return 0;

            default:
                return -1;
        }
    }

    export function createDiagnosticCollection(): DiagnosticCollection {
        let nonFileDiagnostics: Diagnostic[] = [];
        const fileDiagnostics = createMap<Diagnostic[]>();

        let diagnosticsModified = false;
        let modificationCount = 0;

        return {
            add,
            getGlobalDiagnostics,
            getDiagnostics,
            getModificationCount,
            reattachFileDiagnostics
        };

        function getModificationCount() {
            return modificationCount;
        }

        function reattachFileDiagnostics(newFile: SourceFile): void {
            forEach(fileDiagnostics.get(newFile.fileName), diagnostic => diagnostic.file = newFile);
        }

        function add(diagnostic: Diagnostic): void {
            let diagnostics: Diagnostic[];
            if (diagnostic.file) {
                diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
                if (!diagnostics) {
                    diagnostics = [];
                    fileDiagnostics.set(diagnostic.file.fileName, diagnostics);
                }
            }
            else {
                diagnostics = nonFileDiagnostics;
            }

            diagnostics.push(diagnostic);
            diagnosticsModified = true;
            modificationCount++;
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            sortAndDeduplicate();
            return nonFileDiagnostics;
        }

        function getDiagnostics(fileName?: string): Diagnostic[] {
            sortAndDeduplicate();
            if (fileName) {
                return fileDiagnostics.get(fileName) || [];
            }

            const allDiagnostics: Diagnostic[] = [];
            function pushDiagnostic(d: Diagnostic) {
                allDiagnostics.push(d);
            }

            forEach(nonFileDiagnostics, pushDiagnostic);

            fileDiagnostics.forEach(diagnostics => {
                forEach(diagnostics, pushDiagnostic);
            });

            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function sortAndDeduplicate() {
            if (!diagnosticsModified) {
                return;
            }

            diagnosticsModified = false;
            nonFileDiagnostics = sortAndDeduplicateDiagnostics(nonFileDiagnostics);

            fileDiagnostics.forEach((diagnostics, key) => {
                fileDiagnostics.set(key, sortAndDeduplicateDiagnostics(diagnostics));
            });
        }
    }

    // This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
    // paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
    // the language service. These characters should be escaped when printing, and if any characters are added,
    // the map below must be updated. Note that this regexp *does not* include the 'delete' character.
    // There is no reason for this other than that JSON.stringify does not handle it either.
    const escapedCharsRegExp = /[\\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    const escapedCharsMap = createMapFromTemplate({
        "\0": "\\0",
        "\t": "\\t",
        "\v": "\\v",
        "\f": "\\f",
        "\b": "\\b",
        "\r": "\\r",
        "\n": "\\n",
        "\\": "\\\\",
        "\"": "\\\"",
        "\u2028": "\\u2028", // lineSeparator
        "\u2029": "\\u2029", // paragraphSeparator
        "\u0085": "\\u0085"  // nextLine
    });


    /**
     * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
     * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
     * Note that this doesn't actually wrap the input in double quotes.
     */
    export function escapeString(s: string): string {
        return s.replace(escapedCharsRegExp, getReplacement);
    }

    function getReplacement(c: string) {
        return escapedCharsMap.get(c) || get16BitUnicodeEscapeSequence(c.charCodeAt(0));
    }

    export function isIntrinsicJsxName(name: string) {
        const ch = name.substr(0, 1);
        return ch.toLowerCase() === ch;
    }

    function get16BitUnicodeEscapeSequence(charCode: number): string {
        const hexCharCode = charCode.toString(16).toUpperCase();
        const paddedHexCode = ("0000" + hexCharCode).slice(-4);
        return "\\u" + paddedHexCode;
    }

    const nonAsciiCharacters = /[^\u0000-\u007F]/g;
    export function escapeNonAsciiString(s: string): string {
        s = escapeString(s);
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
            reset
        };
    }

    export function getResolvedExternalModuleName(host: EmitHost, file: SourceFile): string {
        return file.moduleName || getExternalModuleNameFromPath(host, file.fileName);
    }

    export function getExternalModuleNameFromDeclaration(host: EmitHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration): string {
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
        sourceMapFilePath: string;
        declarationFilePath: string;
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
    export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile): SourceFile[] {
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

    export function writeFile(host: EmitHost, diagnostics: DiagnosticCollection, fileName: string, data: string, writeByteOrderMark: boolean, sourceFiles?: SourceFile[]) {
        host.writeFile(fileName, data, writeByteOrderMark, hostErrorMessage => {
            diagnostics.add(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
        }, sourceFiles);
    }

    export function getLineOfLocalPosition(currentSourceFile: SourceFile, pos: number) {
        return getLineAndCharacterOfPosition(currentSourceFile, pos).line;
    }

    export function getLineOfLocalPositionFromLineMap(lineMap: number[], pos: number) {
        return computeLineAndCharacterOfPosition(lineMap, pos).line;
    }

    export function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration {
        return forEach(node.members, member => {
            if (member.kind === SyntaxKind.Constructor && nodeIsPresent((<ConstructorDeclaration>member).body)) {
                return <ConstructorDeclaration>member;
            }
        });
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

    export interface AllAccessorDeclarations {
        firstAccessor: AccessorDeclaration;
        secondAccessor: AccessorDeclaration;
        getAccessor: AccessorDeclaration;
        setAccessor: AccessorDeclaration;
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
    export function getEffectiveTypeAnnotationNode(node: VariableLikeDeclaration): TypeNode {
        if (node.type) {
            return node.type;
        }
        if (node.flags & NodeFlags.JavaScriptFile) {
            return getJSDocType(node);
        }
    }

    /**
     * Gets the effective return type annotation of a signature. If the node was parsed in a
     * JavaScript file, gets the return type annotation from JSDoc.
     */
    export function getEffectiveReturnTypeNode(node: SignatureDeclaration): TypeNode {
        if (node.type) {
            return node.type;
        }
        if (node.flags & NodeFlags.JavaScriptFile) {
            return getJSDocReturnType(node);
        }
    }

    /**
     * Gets the effective type parameters. If the node was parsed in a
     * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
     */
    export function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters): TypeParameterDeclaration[] {
        if (node.typeParameters) {
            return node.typeParameters;
        }
        if (node.flags & NodeFlags.JavaScriptFile) {
            const templateTag = getJSDocTemplateTag(node);
            return templateTag && templateTag.typeParameters;
        }
    }

    /**
     * Gets the effective type annotation of the value parameter of a set accessor. If the node
     * was parsed in a JavaScript file, gets the type annotation from JSDoc.
     */
    export function getEffectiveSetAccessorTypeAnnotationNode(node: SetAccessorDeclaration): TypeNode {
        const parameter = getSetAccessorValueParameter(node);
        return parameter && getEffectiveTypeAnnotationNode(parameter);
    }

    export function emitNewLineBeforeLeadingComments(lineMap: number[], writer: EmitTextWriter, node: TextRange, leadingComments: CommentRange[]) {
        emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
    }

    export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: number[], writer: EmitTextWriter, pos: number, leadingComments: CommentRange[]) {
        // If the leading comments start on different line than the start of node, write new line
        if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
            writer.writeLine();
        }
    }

    export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: number[], writer: EmitTextWriter, pos: number, commentPos: number) {
        // If the leading comments start on different line than the start of node, write new line
        if (pos !== commentPos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
            writer.writeLine();
        }
    }

    export function emitComments(text: string, lineMap: number[], writer: EmitTextWriter, comments: CommentRange[], leadingSeparator: boolean, trailingSeparator: boolean, newLine: string,
        writeComment: (text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void) {
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
    export function emitDetachedComments(text: string, lineMap: number[], writer: EmitTextWriter,
        writeComment: (text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
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
                leadingComments = filter(getLeadingCommentRanges(text, node.pos), isPinnedComment);
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

        function isPinnedComment(comment: CommentRange) {
            return text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
                text.charCodeAt(comment.pos + 2) === CharacterCodes.exclamation;
        }

    }

    export function writeCommentRange(text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
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

    export function hasModifier(node: Node, flags: ModifierFlags) {
        return (getModifierFlags(node) & flags) !== 0;
    }

    export function getModifierFlags(node: Node): ModifierFlags {
        if (node.modifierFlagsCache & ModifierFlags.HasComputedFlags) {
            return node.modifierFlagsCache & ~ModifierFlags.HasComputedFlags;
        }

        const flags = getModifierFlagsNoCache(node);
        node.modifierFlagsCache = flags | ModifierFlags.HasComputedFlags;
        return flags;
    }

    /* @internal */
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

    // Returns false if this heritage clause element's expression contains something unsupported
    // (i.e. not a name or dotted name).
    export function isSupportedExpressionWithTypeArguments(node: ExpressionWithTypeArguments): boolean {
        return isSupportedExpressionWithTypeArgumentsRest(node.expression);
    }

    function isSupportedExpressionWithTypeArgumentsRest(node: Expression): boolean {
        if (node.kind === SyntaxKind.Identifier) {
            return true;
        }
        else if (isPropertyAccessExpression(node)) {
            return isSupportedExpressionWithTypeArgumentsRest(node.expression);
        }
        else {
            return false;
        }
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

    export function isEntityNameExpression(node: Expression): node is EntityNameExpression {
        return node.kind === SyntaxKind.Identifier ||
            node.kind === SyntaxKind.PropertyAccessExpression && isEntityNameExpression((<PropertyAccessExpression>node).expression);
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

            // handel utf8
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

    const carriageReturnLineFeed = "\r\n";
    const lineFeed = "\n";
    export function getNewLineCharacter(options: CompilerOptions | PrinterOptions): string {
        switch (options.newLine) {
            case NewLineKind.CarriageReturnLineFeed:
                return carriageReturnLineFeed;
            case NewLineKind.LineFeed:
                return lineFeed;
        }
        if (sys) {
            return sys.newLine;
        }
        return carriageReturnLineFeed;
    }

    /**
     * Tests whether a node and its subtree is simple enough to have its position
     * information ignored when emitting source maps in a destructuring assignment.
     *
     * @param node The expression to test.
     */
    export function isSimpleExpression(node: Expression): boolean {
        return isSimpleExpressionWorker(node, 0);
    }

    function isSimpleExpressionWorker(node: Expression, depth: number): boolean {
        if (depth <= 5) {
            const kind = node.kind;
            if (kind === SyntaxKind.StringLiteral
                || kind === SyntaxKind.NumericLiteral
                || kind === SyntaxKind.RegularExpressionLiteral
                || kind === SyntaxKind.NoSubstitutionTemplateLiteral
                || kind === SyntaxKind.Identifier
                || kind === SyntaxKind.ThisKeyword
                || kind === SyntaxKind.SuperKeyword
                || kind === SyntaxKind.TrueKeyword
                || kind === SyntaxKind.FalseKeyword
                || kind === SyntaxKind.NullKeyword) {
                return true;
            }
            else if (kind === SyntaxKind.PropertyAccessExpression) {
                return isSimpleExpressionWorker((<PropertyAccessExpression>node).expression, depth + 1);
            }
            else if (kind === SyntaxKind.ElementAccessExpression) {
                return isSimpleExpressionWorker((<ElementAccessExpression>node).expression, depth + 1)
                    && isSimpleExpressionWorker((<ElementAccessExpression>node).argumentExpression, depth + 1);
            }
            else if (kind === SyntaxKind.PrefixUnaryExpression
                || kind === SyntaxKind.PostfixUnaryExpression) {
                return isSimpleExpressionWorker((<PrefixUnaryExpression | PostfixUnaryExpression>node).operand, depth + 1);
            }
            else if (kind === SyntaxKind.BinaryExpression) {
                return (<BinaryExpression>node).operatorToken.kind !== SyntaxKind.AsteriskAsteriskToken
                    && isSimpleExpressionWorker((<BinaryExpression>node).left, depth + 1)
                    && isSimpleExpressionWorker((<BinaryExpression>node).right, depth + 1);
            }
            else if (kind === SyntaxKind.ConditionalExpression) {
                return isSimpleExpressionWorker((<ConditionalExpression>node).condition, depth + 1)
                    && isSimpleExpressionWorker((<ConditionalExpression>node).whenTrue, depth + 1)
                    && isSimpleExpressionWorker((<ConditionalExpression>node).whenFalse, depth + 1);
            }
            else if (kind === SyntaxKind.VoidExpression
                || kind === SyntaxKind.TypeOfExpression
                || kind === SyntaxKind.DeleteExpression) {
                return isSimpleExpressionWorker((<VoidExpression | TypeOfExpression | DeleteExpression>node).expression, depth + 1);
            }
            else if (kind === SyntaxKind.ArrayLiteralExpression) {
                return (<ArrayLiteralExpression>node).elements.length === 0;
            }
            else if (kind === SyntaxKind.ObjectLiteralExpression) {
                return (<ObjectLiteralExpression>node).properties.length === 0;
            }
            else if (kind === SyntaxKind.CallExpression) {
                if (!isSimpleExpressionWorker((<CallExpression>node).expression, depth + 1)) {
                    return false;
                }

                for (const argument of (<CallExpression>node).arguments) {
                    if (!isSimpleExpressionWorker(argument, depth + 1)) {
                        return false;
                    }
                }

                return true;
            }
        }

        return false;
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

        return stableSort(result, (x, y) => compareValues(x[0], y[0]));
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

    export function getRangePos(range: TextRange | undefined) {
        return range ? range.pos : -1;
    }

    export function getRangeEnd(range: TextRange | undefined) {
        return range ? range.end : -1;
    }

    /**
     * Increases (or decreases) a position by the provided amount.
     *
     * @param pos The position.
     * @param value The delta.
     */
    export function movePos(pos: number, value: number) {
        return positionIsSynthesized(pos) ? -1 : pos + value;
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
     * Creates a new TextRange from a provided range with its end position collapsed to its
     * start position.
     *
     * @param range A TextRange.
     */
    export function collapseRangeToStart(range: TextRange): TextRange {
        return isCollapsedRange(range) ? range : moveRangeEnd(range, range.pos);
    }

    /**
     * Creates a new TextRange from a provided range with its start position collapsed to its
     * end position.
     *
     * @param range A TextRange.
     */
    export function collapseRangeToEnd(range: TextRange): TextRange {
        return isCollapsedRange(range) ? range : moveRangePos(range, range.end);
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

    /**
     * Gets a value indicating whether a node is merged with a class declaration in the same scope.
     */
    export function isMergedWithClass(node: Node) {
        if (node.symbol) {
            for (const declaration of node.symbol.declarations) {
                if (declaration.kind === SyntaxKind.ClassDeclaration && declaration !== node) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Gets a value indicating whether a node is the first declaration of its kind.
     *
     * @param node A Declaration node.
     * @param kind The SyntaxKind to find among related declarations.
     */
    export function isFirstDeclarationOfKind(node: Node, kind: SyntaxKind) {
        return node.symbol && getDeclarationOfKind(node.symbol, kind) === node;
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

    export function levenshtein(s1: string, s2: string): number {
        let previous: number[] = new Array(s2.length + 1);
        let current: number[] = new Array(s2.length + 1);
        for (let i = 0; i < s2.length + 1; i++) {
            previous[i] = i;
            current[i] = -1;
        }
        for (let i = 1; i < s1.length + 1; i++) {
            current[0] = i;
            for (let j = 1; j < s2.length + 1; j++) {
                current[j] = Math.min(
                    previous[j] + 1,
                    current[j - 1] + 1,
                    previous[j - 1] + (s1[i - 1] === s2[j - 1] ? 0 : 2));
            }
            // shift current back to previous, and then reuse previous' array
            const tmp = previous;
            previous = current;
            current = tmp;
        }
        return previous[previous.length - 1];
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
        const overlapStart = Math.max(span.start, other.start);
        const overlapEnd = Math.min(textSpanEnd(span), textSpanEnd(other));
        return overlapStart < overlapEnd;
    }

    export function textSpanOverlap(span1: TextSpan, span2: TextSpan) {
        const overlapStart = Math.max(span1.start, span2.start);
        const overlapEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        if (overlapStart < overlapEnd) {
            return createTextSpanFromBounds(overlapStart, overlapEnd);
        }
        return undefined;
    }

    export function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan) {
        return other.start <= textSpanEnd(span) && textSpanEnd(other) >= span.start;
    }

    export function textSpanIntersectsWith(span: TextSpan, start: number, length: number) {
        const end = start + length;
        return start <= textSpanEnd(span) && end >= span.start;
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
        const intersectStart = Math.max(span1.start, span2.start);
        const intersectEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        if (intersectStart <= intersectEnd) {
            return createTextSpanFromBounds(intersectStart, intersectEnd);
        }
        return undefined;
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
    export function collapseTextChangeRangesAcrossMultipleVersions(changes: TextChangeRange[]): TextChangeRange {
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
            //      oldEnd3  : Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
            //      newEnd3  : Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
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

    export function isParameterPropertyDeclaration(node: Node): boolean {
        return hasModifier(node, ModifierFlags.ParameterPropertyModifier) && node.parent.kind === SyntaxKind.Constructor && isClassLike(node.parent.parent);
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
        sys: { getExecutingFilePath(): string, resolvePath(path: string): string, fileExists(fileName: string): boolean, readFile(fileName: string): string },
        errors?: Diagnostic[]) {
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

        function trySetLanguageAndTerritory(language: string, territory: string, errors?: Diagnostic[]): boolean {
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
    export function unescapeIdentifier(identifier: string): string {
        return identifier.length >= 3 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ && identifier.charCodeAt(2) === CharacterCodes._ ? identifier.substr(1) : identifier;
    }

    export function getNameOfDeclaration(declaration: Declaration): DeclarationName | undefined {
        if (!declaration) {
            return undefined;
        }
        if (declaration.kind === SyntaxKind.BinaryExpression) {
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
        else {
            return (declaration as NamedDeclaration).name;
        }
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

    export function isNoSubstitutionTemplateLiteral(node: Node): node is LiteralExpression {
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
        return node.kind === SyntaxKind.AwaitExpression;
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

    export function isJSDocArrayType(node: Node): node is JSDocArrayType {
        return node.kind === SyntaxKind.JSDocArrayType;
    }

    export function isJSDocUnionType(node: Node): node is JSDocUnionType {
        return node.kind === SyntaxKind.JSDocUnionType;
    }

    export function isJSDocTupleType(node: Node): node is JSDocTupleType {
        return node.kind === SyntaxKind.JSDocTupleType;
    }

    export function isJSDocNullableType(node: Node): node is JSDocNullableType {
        return node.kind === SyntaxKind.JSDocNullableType;
    }

    export function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType {
        return node.kind === SyntaxKind.JSDocNonNullableType;
    }

    export function isJSDocRecordType(node: Node): node is JSDocRecordType {
        return node.kind === SyntaxKind.JSDocRecordType;
    }

    export function isJSDocRecordMember(node: Node): node is JSDocRecordMember {
        return node.kind === SyntaxKind.JSDocRecordMember;
    }

    export function isJSDocTypeReference(node: Node): node is JSDocTypeReference {
        return node.kind === SyntaxKind.JSDocTypeReference;
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

    export function isJSDocConstructorType(node: Node): node is JSDocConstructorType {
        return node.kind === SyntaxKind.JSDocConstructorType;
    }

    export function isJSDocThisType(node: Node): node is JSDocThisType {
        return node.kind === SyntaxKind.JSDocThisType;
    }

    export function isJSDoc(node: Node): node is JSDoc {
        return node.kind === SyntaxKind.JSDocComment;
    }

    export function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag {
        return node.kind === SyntaxKind.JSDocAugmentsTag;
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

    export function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral {
        return node.kind === SyntaxKind.JSDocTypeLiteral;
    }

    export function isJSDocLiteralType(node: Node): node is JSDocLiteralType {
        return node.kind === SyntaxKind.JSDocLiteralType;
    }
}

// Node tests
//
// All node tests in the following list should *not* reference parent pointers so that
// they may be used with transformations.
namespace ts {
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
     */
    export function isToken(n: Node): boolean {
        return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
    }

    // Node Arrays

    /* @internal */
    export function isNodeArray<T extends Node>(array: T[]): array is NodeArray<T> {
        return array.hasOwnProperty("pos")
            && array.hasOwnProperty("end");
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

    // Identifiers

    /* @internal */
    export function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier {
        // Using `>` here catches both `GeneratedIdentifierKind.None` and `undefined`.
        return isIdentifier(node) && node.autoGenerateKind > GeneratedIdentifierKind.None;
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

    export function isFunctionLike(node: Node): node is FunctionLikeDeclaration {
        return node && isFunctionLikeKind(node.kind);
    }

    /* @internal */
    export function isFunctionLikeKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return true;
        }

        return false;
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
            || kind === SyntaxKind.SemicolonClassElement
            || kind === SyntaxKind.MissingDeclaration;
    }

    export function isClassLike(node: Node): node is ClassLikeDeclaration {
        return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
    }

    export function isAccessor(node: Node): node is AccessorDeclaration {
        return node && (node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor);
    }

    // Type members

    export function isTypeElement(node: Node): node is TypeElement {
        const kind = node.kind;
        return kind === SyntaxKind.ConstructSignature
            || kind === SyntaxKind.CallSignature
            || kind === SyntaxKind.PropertySignature
            || kind === SyntaxKind.MethodSignature
            || kind === SyntaxKind.IndexSignature
            || kind === SyntaxKind.MissingDeclaration;
    }

    export function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAssignment
            || kind === SyntaxKind.ShorthandPropertyAssignment
            || kind === SyntaxKind.SpreadAssignment
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor
            || kind === SyntaxKind.MissingDeclaration;
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
            || kind === SyntaxKind.ExpressionWithTypeArguments;
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

    function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.ElementAccessExpression
            || kind === SyntaxKind.NewExpression
            || kind === SyntaxKind.CallExpression
            || kind === SyntaxKind.JsxElement
            || kind === SyntaxKind.JsxSelfClosingElement
            || kind === SyntaxKind.TaggedTemplateExpression
            || kind === SyntaxKind.ArrayLiteralExpression
            || kind === SyntaxKind.ParenthesizedExpression
            || kind === SyntaxKind.ObjectLiteralExpression
            || kind === SyntaxKind.ClassExpression
            || kind === SyntaxKind.FunctionExpression
            || kind === SyntaxKind.Identifier
            || kind === SyntaxKind.RegularExpressionLiteral
            || kind === SyntaxKind.NumericLiteral
            || kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.NoSubstitutionTemplateLiteral
            || kind === SyntaxKind.TemplateExpression
            || kind === SyntaxKind.FalseKeyword
            || kind === SyntaxKind.NullKeyword
            || kind === SyntaxKind.ThisKeyword
            || kind === SyntaxKind.TrueKeyword
            || kind === SyntaxKind.SuperKeyword
            || kind === SyntaxKind.NonNullExpression
            || kind === SyntaxKind.MetaProperty;
    }

    /* @internal */
    export function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression {
        return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isUnaryExpressionKind(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.PrefixUnaryExpression
            || kind === SyntaxKind.PostfixUnaryExpression
            || kind === SyntaxKind.DeleteExpression
            || kind === SyntaxKind.TypeOfExpression
            || kind === SyntaxKind.VoidExpression
            || kind === SyntaxKind.AwaitExpression
            || kind === SyntaxKind.TypeAssertionExpression
            || isLeftHandSideExpressionKind(kind);
    }

    /* @internal */
    export function isUnaryExpression(node: Node): node is UnaryExpression {
        return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isExpressionKind(kind: SyntaxKind) {
        return kind === SyntaxKind.ConditionalExpression
            || kind === SyntaxKind.YieldExpression
            || kind === SyntaxKind.ArrowFunction
            || kind === SyntaxKind.BinaryExpression
            || kind === SyntaxKind.SpreadElement
            || kind === SyntaxKind.AsExpression
            || kind === SyntaxKind.OmittedExpression
            || kind === SyntaxKind.CommaListExpression
            || isUnaryExpressionKind(kind);
    }

    /* @internal */
    export function isExpression(node: Node): node is Expression {
        return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
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
            || kind === SyntaxKind.JSDocTypedefTag;
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
            || kind === SyntaxKind.Block;
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
            || kind === SyntaxKind.JsxText;
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
        return node.kind === SyntaxKind.JSDocComment || isJSDocTag(node);
    }

    // TODO: determine what this does before making it public.
    /* @internal */
    export function isJSDocTag(node: Node): boolean {
        return node.kind >= SyntaxKind.FirstJSDocTagNode && node.kind <= SyntaxKind.LastJSDocTagNode;
    }
}
