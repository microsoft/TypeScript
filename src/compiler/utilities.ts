/// <reference path="types.ts" />

module ts {
    export interface ReferencePathMatchResult {
        fileReference?: FileReference
        diagnosticMessage?: DiagnosticMessage
        isNoDefaultLib?: boolean
    }

    export function getDeclarationOfKind(symbol: Symbol, kind: SyntaxKind): Declaration {
        var declarations = symbol.declarations;
        for (var i = 0; i < declarations.length; i++) {
            var declaration = declarations[i];
            if (declaration.kind === kind) {
                return declaration;
            }
        }

        return undefined;
    }

    export interface StringSymbolWriter extends SymbolWriter {
        string(): string;
    }

    // Pool writers to avoid needing to allocate them for every symbol we write.
    var stringWriters: StringSymbolWriter[] = [];
    export function getSingleLineStringWriter(): StringSymbolWriter {
        if (stringWriters.length == 0) {
            var str = "";

            var writeText: (text: string) => void = text => str += text;
            return {
                string: () => str,
                writeKeyword: writeText,
                writeOperator: writeText,
                writePunctuation: writeText,
                writeSpace: writeText,
                writeStringLiteral: writeText,
                writeParameter: writeText,
                writeSymbol: writeText,

                // Completely ignore indentation for string writers.  And map newlines to
                // a single space.
                writeLine: () => str += " ",
                increaseIndent: () => { },
                decreaseIndent: () => { },
                clear: () => str = "",
                trackSymbol: () => { }
            };
        }

        return stringWriters.pop();
    }

    export function releaseStringWriter(writer: StringSymbolWriter) {
        writer.clear()
        stringWriters.push(writer);
    }

    export function getFullWidth(node: Node) {
        return node.end - node.pos;
    }

    // Returns true if this node contains a parse error anywhere underneath it.
    export function containsParseError(node: Node): boolean {
        aggregateChildData(node);
        return (node.parserContextFlags & ParserContextFlags.ThisNodeOrAnySubNodesHasError) !== 0
    }

    function aggregateChildData(node: Node): void {
        if (!(node.parserContextFlags & ParserContextFlags.HasAggregatedChildData)) {
            // A node is considered to contain a parse error if:
            //  a) the parser explicitly marked that it had an error
            //  b) any of it's children reported that it had an error.
            var thisNodeOrAnySubNodesHasError = ((node.parserContextFlags & ParserContextFlags.ThisNodeHasError) !== 0) ||
                forEachChild(node, containsParseError);

            // If so, mark ourselves accordingly. 
            if (thisNodeOrAnySubNodesHasError) {
                node.parserContextFlags |= ParserContextFlags.ThisNodeOrAnySubNodesHasError;
            }

            // Also mark that we've propogated the child information to this node.  This way we can
            // always consult the bit directly on this node without needing to check its children
            // again.
            node.parserContextFlags |= ParserContextFlags.HasAggregatedChildData;
        }
    }

    export function getSourceFileOfNode(node: Node): SourceFile {
        while (node && node.kind !== SyntaxKind.SourceFile) {
            node = node.parent;
        }
        return <SourceFile>node;
    }

    // This is a useful function for debugging purposes.
    export function nodePosToString(node: Node): string {
        var file = getSourceFileOfNode(node);
        var loc = file.getLineAndCharacterFromPosition(node.pos);
        return file.filename + "(" + loc.line + "," + loc.character + ")";
    }

    export function getStartPosOfNode(node: Node): number {
        return node.pos;
    }

    // Returns true if this node is missing from the actual source code.  'missing' is different
    // from 'undefined/defined'.  When a node is undefined (which can happen for optional nodes
    // in the tree), it is definitel missing.  HOwever, a node may be defined, but still be 
    // missing.  This happens whenever the parser knows it needs to parse something, but can't
    // get anything in the source code that it expects at that location.  For example:
    //
    //          var a: ;
    //
    // Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source 
    // code).  So the parser will attempt to parse out a type, and will create an actual node.
    // However, this node will be 'missing' in the sense that no actual source-code/tokens are
    // contained within it.
    export function nodeIsMissing(node: Node) {
        if (!node) {
            return true;
        }

        return node.pos === node.end && node.kind !== SyntaxKind.EndOfFileToken;
    }
    
    export function nodeIsPresent(node: Node) {
        return !nodeIsMissing(node);
    }

    export function getTokenPosOfNode(node: Node, sourceFile?: SourceFile): number {
        // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
        // want to skip trivia because this will launch us forward to the next token.
        if (nodeIsMissing(node)) {
            return node.pos;
        }

        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
    }

    export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        var text = sourceFile.text;
        return text.substring(skipTrivia(text, node.pos), node.end);
    }

    export function getTextOfNodeFromSourceText(sourceText: string, node: Node): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        return sourceText.substring(skipTrivia(sourceText, node.pos), node.end);
    }

    export function getTextOfNode(node: Node): string {
        return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node);
    }

    // Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__'
    export function escapeIdentifier(identifier: string): string {
        return identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier;
    }

    // Remove extra underscore from escaped identifier
    export function unescapeIdentifier(identifier: string): string {
        return identifier.length >= 3 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ && identifier.charCodeAt(2) === CharacterCodes._ ? identifier.substr(1) : identifier;
    }

    // Return display name of an identifier
    // Computed property names will just be emitted as "[<expr>]", where <expr> is the source
    // text of the expression in the computed property.
    export function declarationNameToString(name: DeclarationName) {
        return getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
    }

    export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): Diagnostic {
        node = getErrorSpanForNode(node);
        var file = getSourceFileOfNode(node);

        var start = getTokenPosOfNode(node, file);
        var length = node.end - start;

        return createFileDiagnostic(file, start, length, message, arg0, arg1, arg2);
    }

    export function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain, newLine: string): Diagnostic {
        node = getErrorSpanForNode(node);
        var file = getSourceFileOfNode(node);
        var start = skipTrivia(file.text, node.pos);
        var length = node.end - start;
        return flattenDiagnosticChain(file, start, length, messageChain, newLine);
    }

    export function getErrorSpanForNode(node: Node): Node {
        var errorSpan: Node;
        switch (node.kind) {
            // This list is a work in progress. Add missing node kinds to improve their error
            // spans.
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
                errorSpan = (<Declaration>node).name;
                break;
        }

        // We now have the ideal error span, but it may be a node that is optional and absent
        // (e.g. the name of a function expression), in which case errorSpan will be undefined.
        // Alternatively, it might be required and missing (e.g. the name of a module), in which
        // case its pos will equal its end (length 0). In either of these cases, we should fall
        // back to the original node that the error was issued on.
        return errorSpan && errorSpan.pos < errorSpan.end ? errorSpan : node;
    }

    export function isExternalModule(file: SourceFile): boolean {
        return file.externalModuleIndicator !== undefined;
    }

    export function isDeclarationFile(file: SourceFile): boolean {
        return (file.flags & NodeFlags.DeclarationFile) !== 0;
    }

    export function isConstEnumDeclaration(node: Node): boolean {
        return node.kind === SyntaxKind.EnumDeclaration && isConst(node);
    }

    function walkUpBindingElementsAndPatterns(node: Node): Node {
        while (node && (node.kind === SyntaxKind.BindingElement || isBindingPattern(node))) {
            node = node.parent;
        }

        return node;
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

        var flags = node.flags;
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

    export function isConst(node: Node): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Const);
    }

    export function isLet(node: Node): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Let);
    }

    export function isPrologueDirective(node: Node): boolean {
        return node.kind === SyntaxKind.ExpressionStatement && (<ExpressionStatement>node).expression.kind === SyntaxKind.StringLiteral;
    }

    export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode?: SourceFile) {
        sourceFileOfNode = sourceFileOfNode || getSourceFileOfNode(node);

        // If parameter/type parameter, the prev token trailing comments are part of this node too
        if (node.kind === SyntaxKind.Parameter || node.kind === SyntaxKind.TypeParameter) {
            // e.g.   (/** blah */ a, /** blah */ b);
            return concatenate(getTrailingCommentRanges(sourceFileOfNode.text, node.pos),
                // e.g.:     (
                //            /** blah */ a,
                //            /** blah */ b);
                getLeadingCommentRanges(sourceFileOfNode.text, node.pos));
        }
        else {
            return getLeadingCommentRanges(sourceFileOfNode.text, node.pos);
        }
    }

    export function getJsDocComments(node: Node, sourceFileOfNode: SourceFile) {
        return filter(getLeadingCommentRangesOfNode(node, sourceFileOfNode), isJsDocComment);

        function isJsDocComment(comment: CommentRange) {
            // True if the comment starts with '/**' but not if it is '/**/'
            return sourceFileOfNode.text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
                sourceFileOfNode.text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
                sourceFileOfNode.text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash;
        }
    }

    export var fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/


    // Warning: This has the same semantics as the forEach family of functions,
    //          in that traversal terminates in the event that 'visitor' supplies a truthy value.
    export function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T {

        return traverse(body);

        function traverse(node: Node): T {
            switch (node.kind) {
                case SyntaxKind.ReturnStatement:
                    return visitor(<ReturnStatement>node);
                case SyntaxKind.Block:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
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

    export function isAnyFunction(node: Node): boolean {
        if (node) {
            switch (node.kind) {
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
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionDeclaration:
                    return true;
            }
        }

        return false;
    }

    export function isFunctionBlock(node: Node) {
        return node && node.kind === SyntaxKind.Block && isAnyFunction(node.parent);
    }

    export function isObjectLiteralMethod(node: Node) {
        return node && node.kind === SyntaxKind.MethodDeclaration && node.parent.kind === SyntaxKind.ObjectLiteralExpression;
    }

    export function getContainingFunction(node: Node): FunctionLikeDeclaration {
        while (true) {
            node = node.parent;
            if (!node || isAnyFunction(node)) {
                return <FunctionLikeDeclaration>node;
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
                case SyntaxKind.ArrowFunction:
                    if (!includeArrowFunctions) {
                        continue;
                    }
                // Fall through
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
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.SourceFile:
                    return node;
            }
        }
    }

    export function getSuperContainer(node: Node): Node {
        while (true) {
            node = node.parent;
            if (!node) {
                return undefined;
            }
            switch (node.kind) {
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return node;
            }
        }
    }

    export function getInvokedExpression(node: CallLikeExpression): Expression {
        if (node.kind === SyntaxKind.TaggedTemplateExpression) {
            return (<TaggedTemplateExpression>node).tag;
        }
        
        // Will either be a CallExpression or NewExpression.
        return (<CallExpression>node).expression;
    }

    export function isExpression(node: Node): boolean {
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
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.SpreadElementExpression:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.OmittedExpression:
                return true;
            case SyntaxKind.QualifiedName:
                while (node.parent.kind === SyntaxKind.QualifiedName) {
                    node = node.parent;
                }

                return node.parent.kind === SyntaxKind.TypeQuery;
            case SyntaxKind.Identifier:
                if (node.parent.kind === SyntaxKind.TypeQuery) {
                    return true;
                }
            // fall through
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.StringLiteral:
                var parent = node.parent;
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
                        var forStatement = <ForStatement>parent;
                        return (forStatement.initializer === node && forStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                            forStatement.condition === node ||
                            forStatement.iterator === node;
                    case SyntaxKind.ForInStatement:
                        var forInStatement = <ForInStatement>parent;
                        return (forInStatement.initializer === node && forInStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                            forInStatement.expression === node;
                    case SyntaxKind.TypeAssertionExpression:
                        return node === (<TypeAssertion>parent).expression;
                    case SyntaxKind.TemplateSpan:
                        return node === (<TemplateSpan>parent).expression;
                    default:
                        if (isExpression(parent)) {
                            return true;
                        }
                }
        }
        return false;
    }

    export function isExternalModuleImportDeclaration(node: Node) {
        return node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference;
    }

    export function getExternalModuleImportDeclarationExpression(node: Node) {
        Debug.assert(isExternalModuleImportDeclaration(node));
        return (<ExternalModuleReference>(<ImportDeclaration>node).moduleReference).expression;
    }

    export function isInternalModuleImportDeclaration(node: Node) {
        return node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).moduleReference.kind !== SyntaxKind.ExternalModuleReference;
    }

    export function hasDotDotDotToken(node: Node) {
        return node && node.kind === SyntaxKind.Parameter && (<ParameterDeclaration>node).dotDotDotToken !== undefined;
    }

    export function hasQuestionToken(node: Node) {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.Parameter:
                    return (<ParameterDeclaration>node).questionToken !== undefined;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return (<MethodDeclaration>node).questionToken !== undefined;
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return (<PropertyDeclaration>node).questionToken !== undefined;
            }
        }

        return false;
    }

    export function hasRestParameters(s: SignatureDeclaration): boolean {
        return s.parameters.length > 0 && s.parameters[s.parameters.length - 1].dotDotDotToken !== undefined;
    }

    export function isLiteralKind(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstLiteralToken <= kind && kind <= SyntaxKind.LastLiteralToken;
    }

    export function isTextualLiteralKind(kind: SyntaxKind): boolean {
        return kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    export function isTemplateLiteralKind(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstTemplateToken <= kind && kind <= SyntaxKind.LastTemplateToken;
    }

    export function isBindingPattern(node: Node) {
        return node.kind === SyntaxKind.ArrayBindingPattern || node.kind === SyntaxKind.ObjectBindingPattern;
    }

    export function isInAmbientContext(node: Node): boolean {
        while (node) {
            if (node.flags & (NodeFlags.Ambient | NodeFlags.DeclarationFile)) {
                return true;
            }

            node = node.parent;
        }
        return false;
    }

    export function isDeclaration(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.TypeParameter:
            case SyntaxKind.Parameter:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.EnumMember:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.Constructor:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ImportDeclaration:
                return true;
        }
        return false;
    }

    export function isStatement(n: Node): boolean {
        switch (n.kind) {
            case SyntaxKind.BreakStatement:
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.DebuggerStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.ExpressionStatement:
            case SyntaxKind.EmptyStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.IfStatement:
            case SyntaxKind.LabeledStatement:
            case SyntaxKind.ReturnStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.ThrowKeyword:
            case SyntaxKind.TryStatement:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.ExportAssignment:
                return true;
            default:
                return false;
        }
    }

    // True if the given identifier, string literal, or number literal is the name of a declaration node
    export function isDeclarationOrFunctionExpressionOrCatchVariableName(name: Node): boolean {
        if (name.kind !== SyntaxKind.Identifier && name.kind !== SyntaxKind.StringLiteral && name.kind !== SyntaxKind.NumericLiteral) {
            return false;
        }

        var parent = name.parent;
        if (isDeclaration(parent) || parent.kind === SyntaxKind.FunctionExpression) {
            return (<Declaration>parent).name === name;
        }

        if (parent.kind === SyntaxKind.CatchClause) {
            return (<CatchClause>parent).name === name;
        }

        return false;
    }

    export function getClassBaseTypeNode(node: ClassDeclaration) {
        var heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
    }

    export function getClassImplementedTypeNodes(node: ClassDeclaration) {
        var heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ImplementsKeyword);
        return heritageClause ? heritageClause.types : undefined;
    }

    export function getInterfaceBaseTypeNodes(node: InterfaceDeclaration) {
        var heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause ? heritageClause.types : undefined;
    }

    export function getHeritageClause(clauses: NodeArray<HeritageClause>, kind: SyntaxKind) {
        if (clauses) {
            for (var i = 0, n = clauses.length; i < n; i++) {
                if (clauses[i].token === kind) {
                    return clauses[i];
                }
            }
        }

        return undefined;
    }

    export function tryResolveScriptReference(program: Program, sourceFile: SourceFile, reference: FileReference) {
        if (!program.getCompilerOptions().noResolve) {
            var referenceFileName = isRootedDiskPath(reference.filename) ? reference.filename : combinePaths(getDirectoryPath(sourceFile.filename), reference.filename);
            referenceFileName = getNormalizedAbsolutePath(referenceFileName, program.getCompilerHost().getCurrentDirectory());
            return program.getSourceFile(referenceFileName);
        }
    }

    export function getAncestor(node: Node, kind: SyntaxKind): Node {
        switch (kind) {
            // special-cases that can be come first
            case SyntaxKind.ClassDeclaration:
                while (node) {
                    switch (node.kind) {
                        case SyntaxKind.ClassDeclaration:
                            return <ClassDeclaration>node;
                        case SyntaxKind.EnumDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.TypeAliasDeclaration:
                        case SyntaxKind.ModuleDeclaration:
                        case SyntaxKind.ImportDeclaration:
                            // early exit cases - declarations cannot be nested in classes
                            return undefined;
                        default:
                            node = node.parent;
                            continue;
                    }
                }
                break;
            default:
                while (node) {
                    if (node.kind === kind) {
                        return node;
                    }
                    node = node.parent;
                }
                break;
        }

        return undefined;
    }

    export function getFileReferenceFromReferencePath(comment: string, commentRange: CommentRange): ReferencePathMatchResult {
        var simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
        var isNoDefaultLibRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)('|")(.+?)\2\s*\/>/gim;
        if (simpleReferenceRegEx.exec(comment)) {
            if (isNoDefaultLibRegEx.exec(comment)) {
                return {
                    isNoDefaultLib: true
                }
            }
            else {
                var matchResult = fullTripleSlashReferencePathRegEx.exec(comment);
                if (matchResult) {
                    var start = commentRange.pos;
                    var end = commentRange.end;
                    return {
                        fileReference: {
                            pos: start,
                            end: end,
                            filename: matchResult[3]
                        },
                        isNoDefaultLib: false
                    };
                }
                else {
                    return {
                        diagnosticMessage: Diagnostics.Invalid_reference_directive_syntax,
                        isNoDefaultLib: false
                    };
                }
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

    export function isModifier(token: SyntaxKind): boolean {
        switch (token) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.ExportKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.ConstKeyword:
                return true;
        }
        return false;
    }

    export function textSpanEnd(span: TextSpan) {
        return span.start + span.length
    }

    export function textSpanIsEmpty(span: TextSpan) {
        return span.length === 0
    }

    export function textSpanContainsPosition(span: TextSpan, position: number) {
        return position >= span.start && position < textSpanEnd(span);
    }

    // Returns true if 'span' contains 'other'.
    export function textSpanContainsTextSpan(span: TextSpan, other: TextSpan) {
        return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
    }

    export function textSpanOverlapsWith(span: TextSpan, other: TextSpan) {
        var overlapStart = Math.max(span.start, other.start);
        var overlapEnd = Math.min(textSpanEnd(span), textSpanEnd(other));
        return overlapStart < overlapEnd;
    }

    export function textSpanOverlap(span1: TextSpan, span2: TextSpan) {
        var overlapStart = Math.max(span1.start, span2.start);
        var overlapEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        if (overlapStart < overlapEnd) {
            return createTextSpanFromBounds(overlapStart, overlapEnd);
        }
        return undefined;
    }

    export function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan) {
        return other.start <= textSpanEnd(span) && textSpanEnd(other) >= span.start
    }

    export function textSpanIntersectsWith(span: TextSpan, start: number, length: number) {
        var end = start + length;
        return start <= textSpanEnd(span) && end >= span.start;
    }

    export function textSpanIntersectsWithPosition(span: TextSpan, position: number) {
        return position <= textSpanEnd(span) && position >= span.start;
    }

    export function textSpanIntersection(span1: TextSpan, span2: TextSpan) {
        var intersectStart = Math.max(span1.start, span2.start);
        var intersectEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
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

    export var unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0);

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
        var change0 = changes[0];

        var oldStartN = change0.span.start;
        var oldEndN = textSpanEnd(change0.span);
        var newEndN = oldStartN + change0.newLength;

        for (var i = 1; i < changes.length; i++) {
            var nextChange = changes[i];

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
            // (Note the dots represent the newly inferrred start.
            // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
            // absolute positions at the asterixes, and the relative change between the dollar signs. Basically, we see
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
            // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rahter
            // than pusing the first edit forward to match the second, we'll push the second edit forward to match the
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

            var oldStart1 = oldStartN;
            var oldEnd1 = oldEndN;
            var newEnd1 = newEndN;

            var oldStart2 = nextChange.span.start;
            var oldEnd2 = textSpanEnd(nextChange.span);
            var newEnd2 = oldStart2 + nextChange.newLength;

            oldStartN = Math.min(oldStart1, oldStart2);
            oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
            newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
        }

        return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), /*newLength: */newEndN - oldStartN);
    }
}