/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>

module ts {
    var nodeConstructors = new Array<new () => Node>(SyntaxKind.Count);

    export function getFullWidth(node: Node) {
        return node.end - node.pos;
    }

    function hasFlag(val: number, flag: number): boolean {
        return (val & flag) !== 0;
    }

    // Returns true if this node contains a parse error anywhere underneath it.
    export function containsParseError(node: Node): boolean {
        if (!hasFlag(node.parserContextFlags, ParserContextFlags.HasPropagatedChildContainsErrorFlag)) {
            // A node is considered to contain a parse error if:
            //  a) the parser explicitly marked that it had an error
            //  b) any of it's children reported that it had an error.
            var val = hasFlag(node.parserContextFlags, ParserContextFlags.ContainsError) ||
                forEachChild(node, containsParseError);

            // If so, mark ourselves accordingly. 
            if (val) {
                node.parserContextFlags |= ParserContextFlags.ContainsError;
            }

            // Also mark that we've propogated the child information to this node.  This way we can
            // always consult the bit directly on this node without needing to check its children
            // again.
            node.parserContextFlags |= ParserContextFlags.HasPropagatedChildContainsErrorFlag;
        }

        return hasFlag(node.parserContextFlags, ParserContextFlags.ContainsError);
    }

    export function getNodeConstructor(kind: SyntaxKind): new () => Node {
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    }
 
    export function createNode(kind: SyntaxKind): Node {
        return new (getNodeConstructor(kind))();
    }

    export function getSourceFileOfNode(node: Node): SourceFile {
        while (node && node.kind !== SyntaxKind.SourceFile) node = node.parent;
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

    export function isMissingNode(node: Node) {
        return node.pos === node.end && node.kind !== SyntaxKind.EndOfFileToken;
    }

    export function getTokenPosOfNode(node: Node, sourceFile?: SourceFile): number {
        // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
        // want to skip trivia because this will launch us forward to the next token.
        if (isMissingNode(node)) {
            return node.pos;
        }

        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
    }

    export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node): string {
        if (isMissingNode(node)) {
            return "";
        }

        var text = sourceFile.text;
        return text.substring(skipTrivia(text, node.pos), node.end);
    }

    export function getTextOfNodeFromSourceText(sourceText: string, node: Node): string {
        if (isMissingNode(node)) {
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

        var start = getFullWidth(node) === 0 ? node.pos : skipTrivia(file.text, node.pos);
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

    export function isConst(node: Node): boolean {
        return !!(node.flags & NodeFlags.Const);
    }

    export function isLet(node: Node): boolean {
        return !!(node.flags & NodeFlags.Let);
    }

    export function isPrologueDirective(node: Node): boolean {
        return node.kind === SyntaxKind.ExpressionStatement && (<ExpressionStatement>node).expression.kind === SyntaxKind.StringLiteral;
    }

    export function isEvalOrArgumentsIdentifier(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            (<Identifier>node).text &&
            ((<Identifier>node).text === "eval" || (<Identifier>node).text === "arguments");
    }

    /// Should be called only on prologue directives (isPrologueDirective(node) should be true)
    function isUseStrictPrologueDirective(node: Node): boolean {
        Debug.assert(isPrologueDirective(node));
        return (<Identifier>(<ExpressionStatement>node).expression).text === "use strict";
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

    // Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
    // stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
    // embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
    // a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
    export function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodes?: (nodes: Node[]) => T): T {
        function child(node: Node): T {
            if (node) {
                return cbNode(node);
            }
        }
        function children(nodes: Node[]) {
            if (nodes) {
                if (cbNodes) {
                    return cbNodes(nodes);
                }

                for (var i = 0, len = nodes.length; i < len; i++) {
                    var result = cbNode(nodes[i])
                    if (result) {
                        return result;
                    }
                }

                return undefined;
            }
        }
        if (!node) {
            return;
        }
        switch (node.kind) {
            case SyntaxKind.QualifiedName:
                return child((<QualifiedName>node).left) ||
                    child((<QualifiedName>node).right);
            case SyntaxKind.TypeParameter:
                return child((<TypeParameterDeclaration>node).name) ||
                    child((<TypeParameterDeclaration>node).constraint) ||
                    child((<TypeParameterDeclaration>node).expression);
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
                return children(node.modifiers) ||
                    child((<VariableLikeDeclaration>node).propertyName) ||
                    child((<VariableLikeDeclaration>node).dotDotDotToken) ||
                    child((<VariableLikeDeclaration>node).name) ||
                    child((<VariableLikeDeclaration>node).questionToken) ||
                    child((<VariableLikeDeclaration>node).type) ||
                    child((<VariableLikeDeclaration>node).initializer);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return children(node.modifiers) ||
                    children((<SignatureDeclaration>node).typeParameters) ||
                    children((<SignatureDeclaration>node).parameters) ||
                    child((<SignatureDeclaration>node).type);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                return children(node.modifiers) ||
                    child((<FunctionLikeDeclaration>node).asteriskToken) ||
                    child((<FunctionLikeDeclaration>node).name) ||
                    child((<FunctionLikeDeclaration>node).questionToken) ||
                    children((<FunctionLikeDeclaration>node).typeParameters) ||
                    children((<FunctionLikeDeclaration>node).parameters) ||
                    child((<FunctionLikeDeclaration>node).type) ||
                    child((<FunctionLikeDeclaration>node).body);
            case SyntaxKind.TypeReference:
                return child((<TypeReferenceNode>node).typeName) ||
                    children((<TypeReferenceNode>node).typeArguments);
            case SyntaxKind.TypeQuery:
                return child((<TypeQueryNode>node).exprName);
            case SyntaxKind.TypeLiteral:
                return children((<TypeLiteralNode>node).members);
            case SyntaxKind.ArrayType:
                return child((<ArrayTypeNode>node).elementType);
            case SyntaxKind.TupleType:
                return children((<TupleTypeNode>node).elementTypes);
            case SyntaxKind.UnionType:
                return children((<UnionTypeNode>node).types);
            case SyntaxKind.ParenthesizedType:
                return child((<ParenthesizedTypeNode>node).type);
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return children((<BindingPattern>node).elements);
            case SyntaxKind.ArrayLiteralExpression:
                return children((<ArrayLiteralExpression>node).elements);
            case SyntaxKind.ObjectLiteralExpression:
                return children((<ObjectLiteralExpression>node).properties);
            case SyntaxKind.PropertyAccessExpression:
                return child((<PropertyAccessExpression>node).expression) ||
                    child((<PropertyAccessExpression>node).name);
            case SyntaxKind.ElementAccessExpression:
                return child((<ElementAccessExpression>node).expression) ||
                    child((<ElementAccessExpression>node).argumentExpression);
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                return child((<CallExpression>node).expression) ||
                    children((<CallExpression>node).typeArguments) ||
                    children((<CallExpression>node).arguments);
            case SyntaxKind.TaggedTemplateExpression:
                return child((<TaggedTemplateExpression>node).tag) ||
                    child((<TaggedTemplateExpression>node).template);
            case SyntaxKind.TypeAssertionExpression:
                return child((<TypeAssertion>node).type) ||
                    child((<TypeAssertion>node).expression);
            case SyntaxKind.ParenthesizedExpression:
                return child((<ParenthesizedExpression>node).expression);
            case SyntaxKind.DeleteExpression:
                return child((<DeleteExpression>node).expression);
            case SyntaxKind.TypeOfExpression:
                return child((<TypeOfExpression>node).expression);
            case SyntaxKind.VoidExpression:
                return child((<VoidExpression>node).expression);
            case SyntaxKind.PrefixUnaryExpression:
                return child((<PrefixUnaryExpression>node).operand);
            case SyntaxKind.YieldExpression:
                return child((<YieldExpression>node).asteriskToken) ||
                    child((<YieldExpression>node).expression);
            case SyntaxKind.PostfixUnaryExpression:
                return child((<PostfixUnaryExpression>node).operand);
            case SyntaxKind.BinaryExpression:
                return child((<BinaryExpression>node).left) ||
                    child((<BinaryExpression>node).right);
            case SyntaxKind.ConditionalExpression:
                return child((<ConditionalExpression>node).condition) ||
                    child((<ConditionalExpression>node).whenTrue) ||
                    child((<ConditionalExpression>node).whenFalse);
            case SyntaxKind.Block:
            case SyntaxKind.TryBlock:
            case SyntaxKind.FinallyBlock:
            case SyntaxKind.ModuleBlock:
                return children((<Block>node).statements);
            case SyntaxKind.SourceFile:
                return children((<SourceFile>node).statements) ||
                    child((<SourceFile>node).endOfFileToken);
            case SyntaxKind.VariableStatement:
                return children(node.modifiers) ||
                    children((<VariableStatement>node).declarations);
            case SyntaxKind.ExpressionStatement:
                return child((<ExpressionStatement>node).expression);
            case SyntaxKind.IfStatement:
                return child((<IfStatement>node).expression) ||
                    child((<IfStatement>node).thenStatement) ||
                    child((<IfStatement>node).elseStatement);
            case SyntaxKind.DoStatement:
                return child((<DoStatement>node).statement) ||
                    child((<DoStatement>node).expression);
            case SyntaxKind.WhileStatement:
                return child((<WhileStatement>node).expression) ||
                    child((<WhileStatement>node).statement);
            case SyntaxKind.ForStatement:
                return children((<ForStatement>node).declarations) ||
                    child((<ForStatement>node).initializer) ||
                    child((<ForStatement>node).condition) ||
                    child((<ForStatement>node).iterator) ||
                    child((<ForStatement>node).statement);
            case SyntaxKind.ForInStatement:
                return children((<ForInStatement>node).declarations) ||
                    child((<ForInStatement>node).variable) ||
                    child((<ForInStatement>node).expression) ||
                    child((<ForInStatement>node).statement);
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.BreakStatement:
                return child((<BreakOrContinueStatement>node).label);
            case SyntaxKind.ReturnStatement:
                return child((<ReturnStatement>node).expression);
            case SyntaxKind.WithStatement:
                return child((<WithStatement>node).expression) ||
                    child((<WithStatement>node).statement);
            case SyntaxKind.SwitchStatement:
                return child((<SwitchStatement>node).expression) ||
                    children((<SwitchStatement>node).clauses);
            case SyntaxKind.CaseClause:
                return child((<CaseClause>node).expression) ||
                    children((<CaseClause>node).statements);
            case SyntaxKind.DefaultClause:
                return children((<DefaultClause>node).statements);
            case SyntaxKind.LabeledStatement:
                return child((<LabeledStatement>node).label) ||
                    child((<LabeledStatement>node).statement);
            case SyntaxKind.ThrowStatement:
                return child((<ThrowStatement>node).expression);
            case SyntaxKind.TryStatement:
                return child((<TryStatement>node).tryBlock) ||
                    child((<TryStatement>node).catchClause) ||
                    child((<TryStatement>node).finallyBlock);
            case SyntaxKind.CatchClause:
                return child((<CatchClause>node).name) ||
                    child((<CatchClause>node).type) ||
                    child((<CatchClause>node).block);
            case SyntaxKind.ClassDeclaration:
                return children(node.modifiers) ||
                    child((<ClassDeclaration>node).name) ||
                    children((<ClassDeclaration>node).typeParameters) ||
                    children((<ClassDeclaration>node).heritageClauses) ||
                    children((<ClassDeclaration>node).members);
            case SyntaxKind.InterfaceDeclaration:
                return children(node.modifiers) ||
                    child((<InterfaceDeclaration>node).name) ||
                    children((<InterfaceDeclaration>node).typeParameters) ||
                    children((<ClassDeclaration>node).heritageClauses) ||
                    children((<InterfaceDeclaration>node).members);
            case SyntaxKind.TypeAliasDeclaration:
                return children(node.modifiers) ||
                    child((<TypeAliasDeclaration>node).name) ||
                    child((<TypeAliasDeclaration>node).type);
            case SyntaxKind.EnumDeclaration:
                return children(node.modifiers) ||
                    child((<EnumDeclaration>node).name) ||
                    children((<EnumDeclaration>node).members);
            case SyntaxKind.EnumMember:
                return child((<EnumMember>node).name) ||
                    child((<EnumMember>node).initializer);
            case SyntaxKind.ModuleDeclaration:
                return children(node.modifiers) ||
                    child((<ModuleDeclaration>node).name) ||
                    child((<ModuleDeclaration>node).body);
            case SyntaxKind.ImportDeclaration:
                return children(node.modifiers) ||
                    child((<ImportDeclaration>node).name) ||
                    child((<ImportDeclaration>node).moduleReference);
            case SyntaxKind.ExportAssignment:
                return children(node.modifiers) ||
                    child((<ExportAssignment>node).exportName);
            case SyntaxKind.TemplateExpression:
                return child((<TemplateExpression>node).head) || children((<TemplateExpression>node).templateSpans);
            case SyntaxKind.TemplateSpan:
                return child((<TemplateSpan>node).expression) || child((<TemplateSpan>node).literal);
            case SyntaxKind.ComputedPropertyName:
                return child((<ComputedPropertyName>node).expression);
            case SyntaxKind.HeritageClause:
                return children((<HeritageClause>node).types);
            case SyntaxKind.ExternalModuleReference:
                return child((<ExternalModuleReference>node).expression);
        }
    }

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
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchClause:
                case SyntaxKind.FinallyBlock:
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
                        return (<ForStatement>parent).initializer === node ||
                            (<ForStatement>parent).condition === node ||
                            (<ForStatement>parent).iterator === node;
                    case SyntaxKind.ForInStatement:
                        return (<ForInStatement>parent).variable === node ||
                            (<ForInStatement>parent).expression === node;
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
            if (node.flags & (NodeFlags.Ambient | NodeFlags.DeclarationFile)) return true;
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
        switch(n.kind) {
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

    const enum ParsingContext {
        SourceElements,          // Elements in source file
        ModuleElements,          // Elements in module declaration
        BlockStatements,         // Statements in block
        SwitchClauses,           // Clauses in switch statement
        SwitchClauseStatements,  // Statements in switch clause
        TypeMembers,             // Members in interface or type literal
        ClassMembers,            // Members in class declaration
        EnumMembers,             // Members in enum declaration
        TypeReferences,          // Type references in extends or implements clause
        VariableDeclarations,    // Variable declarations in variable statement
        ObjectBindingElements,   // Binding elements in object binding list
        ArrayBindingElements,    // Binding elements in array binding list
        ArgumentExpressions,     // Expressions in argument list
        ObjectLiteralMembers,    // Members in object literal
        ArrayLiteralMembers,     // Members in array literal
        Parameters,              // Parameters in parameter list
        TypeParameters,          // Type parameters in type parameter list
        TypeArguments,           // Type arguments in type argument list
        TupleElementTypes,       // Element types in tuple element type list
        HeritageClauses,         // Heritage clauses for a class or interface declaration.
        Count                    // Number of parsing contexts
    }

    const enum Tristate {
        False,
        True,
        Unknown
    }

    function parsingContextErrors(context: ParsingContext): DiagnosticMessage {
        switch (context) {
            case ParsingContext.SourceElements:         return Diagnostics.Declaration_or_statement_expected;
            case ParsingContext.ModuleElements:         return Diagnostics.Declaration_or_statement_expected;
            case ParsingContext.BlockStatements:        return Diagnostics.Statement_expected;
            case ParsingContext.SwitchClauses:          return Diagnostics.case_or_default_expected;
            case ParsingContext.SwitchClauseStatements: return Diagnostics.Statement_expected;
            case ParsingContext.TypeMembers:            return Diagnostics.Property_or_signature_expected;
            case ParsingContext.ClassMembers:           return Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected;
            case ParsingContext.EnumMembers:            return Diagnostics.Enum_member_expected;
            case ParsingContext.TypeReferences:     return Diagnostics.Type_reference_expected;
            case ParsingContext.VariableDeclarations:   return Diagnostics.Variable_declaration_expected;
            case ParsingContext.ObjectBindingElements:  return Diagnostics.Property_destructuring_pattern_expected;
            case ParsingContext.ArrayBindingElements:   return Diagnostics.Array_element_destructuring_pattern_expected;
            case ParsingContext.ArgumentExpressions:    return Diagnostics.Argument_expression_expected;
            case ParsingContext.ObjectLiteralMembers:   return Diagnostics.Property_assignment_expected;
            case ParsingContext.ArrayLiteralMembers:    return Diagnostics.Expression_or_comma_expected;
            case ParsingContext.Parameters:             return Diagnostics.Parameter_declaration_expected;
            case ParsingContext.TypeParameters:         return Diagnostics.Type_parameter_declaration_expected;
            case ParsingContext.TypeArguments:          return Diagnostics.Type_argument_expected;
            case ParsingContext.TupleElementTypes:      return Diagnostics.Type_expected;
            case ParsingContext.HeritageClauses:        return Diagnostics.Unexpected_token_expected;
        }
    };

    export interface ReferencePathMatchResult {
        fileReference?: FileReference
        diagnosticMessage?: DiagnosticMessage
        isNoDefaultLib?: boolean
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

    export function modifierToFlag(token: SyntaxKind): NodeFlags {
        switch (token) {
            case SyntaxKind.StaticKeyword: return NodeFlags.Static;
            case SyntaxKind.PublicKeyword: return NodeFlags.Public;
            case SyntaxKind.ProtectedKeyword: return NodeFlags.Protected;
            case SyntaxKind.PrivateKeyword: return NodeFlags.Private;
            case SyntaxKind.ExportKeyword: return NodeFlags.Export;
            case SyntaxKind.DeclareKeyword: return NodeFlags.Ambient;
            case SyntaxKind.ConstKeyword: return NodeFlags.Const;
        }
        return 0;
    }

    export function createSourceFile(filename: string, sourceText: string, languageVersion: ScriptTarget, version: string, isOpen: boolean = false): SourceFile {
        var parsingContext: ParsingContext;
        var identifiers: Map<string> = {};
        var identifierCount = 0;
        var nodeCount = 0;
        var lineStarts: number[];

        // Flags that dictate what parsing context we're in.  For example:
        // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
        // that some tokens that would be considered identifiers may be considered keywords.
        //
        // When adding more parser context flags, consider which is the more common case that the 
        // flag will be in.  This should be hte 'false' state for that flag.  The reason for this is
        // that we don't store data in our nodes unless the value is in the *non-default* state.  So,
        // for example, more often than code 'allows-in' (or doesn't 'disallow-in').  We opt for 
        // 'disallow-in' set to 'false'.  Otherwise, if we had 'allowsIn' set to 'true', then almost
        // all nodes would need extra state on them to store this info.
        //
        // Note:  'allowIn' and 'allowYield' track 1:1 with the [in] and [yield] concepts in the ES6
        // grammar specification.
        //
        // An important thing about these context concepts.  By default they are effectively inherited
        // while parsing through every grammar production.  i.e. if you don't change them, then when
        // you parse a sub-production, it will have the same context values as hte parent production.
        // This is great most of the time.  After all, consider all the 'expression' grammar productions
        // and how nearly all of them pass along the 'in' and 'yield' context values:
        //
        // EqualityExpression[In, Yield] :
        //      RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] == RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] != RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] === RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] !== RelationalExpression[?In, ?Yield]
        //
        // Where you have to be careful is then understanding what the points are in the grammar 
        // where the values are *not* passed along.  For example:
        //
        // SingleNameBinding[Yield,GeneratorParameter]
        //      [+GeneratorParameter]BindingIdentifier[Yield] Initializer[In]opt
        //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
        //
        // Here this is saying that if the GeneratorParameter context flag is set, that we should 
        // explicitly set the 'yield' context flag to false before calling into the BindingIdentifier
        // and we should explicitly unset the 'yield' context flag before calling into the Initializer.
        // production.  Conversely, if the GeneratorParameter context flag is not set, then we 
        // should leave the 'yield' context flag alone.
        //
        // Getting this all correct is tricky and requires careful reading of the grammar to 
        // understand when these values should be changed versus when they should be inherited.
        //
        // Note: it should not be necessary to save/restore these flags during speculative/lookahead
        // parsing.  These context flags are naturally stored and restored through normal recursive
        // descent parsing and unwinding.
        var contextFlags: ParserContextFlags = 0;

        // Whether or not we've had a parse error since creating the last AST node.  If we have 
        // encountered an error, it will be stored on the next AST node we create.  Parse errors
        // can be broken down into three categories:
        //
        // 1) An error that occurred during scanning.  For example, an unterminated literal, or a
        //    character that was completely not understood.
        //
        // 2) A token was expected, but was not present.  This type of error is commonly produced
        //    by the 'parseExpected' function.
        //
        // 3) A token was present that no parsing function was able to consume.  This type of error
        //    only occurs in the 'abortParsingListOrMoveToNextToken' function when the parser 
        //    decides to skip the token.
        //
        // In all of these cases, we want to mark the next node as having had an error before it.
        // With this mark, we can know in incremental settings if this node can be reused, or if
        // we have to reparse it.  If we don't keep this information around, we may just reuse the
        // node.  in that event we would then not produce the same errors as we did before, causing
        // significant confusion problems.
        //
        // Note: it is necessary that this value be saved/restored during speculative/lookahead 
        // parsing.  During lookahead parsing, we will often create a node.  That node will have 
        // this value attached, and then this value will be set back to 'false'.  If we decide to
        // rewind, we must get back to the same value we had prior to the lookahead.
        //
        // Note: any errors at the end of the file that do not precede a regular node, should get
        // attached to the EOF token.
        var parseErrorBeforeNextFinishedNode = false;

        var sourceFile = <SourceFile>createNode(SyntaxKind.SourceFile, 0);
        if (fileExtensionIs(filename, ".d.ts")) {
            sourceFile.flags = NodeFlags.DeclarationFile;
        }
        sourceFile.end = sourceText.length;
        sourceFile.filename = normalizePath(filename);
        sourceFile.text = sourceText;

        sourceFile.getLineAndCharacterFromPosition = getLineAndCharacterFromSourcePosition;
        sourceFile.getPositionFromLineAndCharacter = getPositionFromSourceLineAndCharacter;
        sourceFile.getLineStarts = getLineStarts;
        sourceFile.getSyntacticDiagnostics = getSyntacticDiagnostics;

        sourceFile.referenceDiagnostics = [];
        sourceFile.parseDiagnostics = [];
        sourceFile.grammarDiagnostics = [];
        sourceFile.semanticDiagnostics = [];

        processReferenceComments();

        // Create and prime the scanner before parsing the source elements.
        var scanner = createScanner(languageVersion, /*skipTrivia*/ true, sourceText, scanError);
        var token = nextToken();

        sourceFile.statements = parseList(ParsingContext.SourceElements, /*checkForStrictMode*/ true, parseSourceElement);
        Debug.assert(token === SyntaxKind.EndOfFileToken);
        sourceFile.endOfFileToken = parseTokenNode();

        sourceFile.externalModuleIndicator = getExternalModuleIndicator();

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.version = version;
        sourceFile.isOpen = isOpen;
        sourceFile.languageVersion = languageVersion;
        sourceFile.identifiers = identifiers;
        return sourceFile;

        function setContextFlag(val: Boolean, flag: ParserContextFlags) {
            if (val) {
                contextFlags |= flag;
            }
            else {
                contextFlags &= ~flag;
            }
        }

        function setStrictModeContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.StrictMode);
        }

        function setDisallowInContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.DisallowIn);
        }

        function setYieldContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.Yield);
        }

        function setGeneratorParameterContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.GeneratorParameter);
        }

        function allowInAnd<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.DisallowIn) {
                setDisallowInContext(false);
                var result = func();
                setDisallowInContext(true);
                return result;
            }
            
            // no need to do anything special if 'in' is already allowed.
            return func();
        }

        function disallowInAnd<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.DisallowIn) {
                // no need to do anything special if 'in' is already disallowed.
                return func();
            }

            setDisallowInContext(true);
            var result = func();
            setDisallowInContext(false);
            return result;
        }

        function doInYieldContext<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.Yield) {
                // no need to do anything special if we're already in the [Yield] context.
                return func();
            }

            setYieldContext(true);
            var result = func();
            setYieldContext(false);
            return result;
        }

        function doOutsideOfYieldContext<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.Yield) {
                setYieldContext(false);
                var result = func();
                setYieldContext(true);
                return result;
            }

            // no need to do anything special if we're not in the [Yield] context.
            return func();
        }

        function inYieldContext() {
            return (contextFlags & ParserContextFlags.Yield) !== 0;
        }

        function inStrictModeContext() {
            return (contextFlags & ParserContextFlags.StrictMode) !== 0;
        }

        function inGeneratorParameterContext() {
            return (contextFlags & ParserContextFlags.GeneratorParameter) !== 0;
        }

        function inDisallowInContext() {
            return (contextFlags & ParserContextFlags.DisallowIn) !== 0;
        }

        function getLineStarts(): number[] {
            return lineStarts || (lineStarts = computeLineStarts(sourceText));
        }

        function getLineAndCharacterFromSourcePosition(position: number) {
            return getLineAndCharacterOfPosition(getLineStarts(), position);
        }

        function getPositionFromSourceLineAndCharacter(line: number, character: number): number {
            return getPositionFromLineAndCharacter(getLineStarts(), line, character);
        }

        function parseErrorAtCurrentToken(message: DiagnosticMessage, arg0?: any): void {
            var start = scanner.getTokenPos();
            var length = scanner.getTextPos() - start;

            parseErrorAtPosition(start, length, message, arg0);
        }

        function parseErrorAtPosition(start: number, length: number, message: DiagnosticMessage, arg0?: any): void {
            // Don't report another error if it would just be at the same position as the last error.
            var lastError = lastOrUndefined(sourceFile.parseDiagnostics);
            if (!lastError || start !== lastError.start) {
                sourceFile.parseDiagnostics.push(createFileDiagnostic(sourceFile, start, length, message, arg0));
            }

            // Mark that we've encountered an error.  We'll set an appropriate bit on the next 
            // node we finish so that it can't be reused incrementally.
            parseErrorBeforeNextFinishedNode = true;
        }

        function scanError(message: DiagnosticMessage) {
            var pos = scanner.getTextPos();
            parseErrorAtPosition(pos, 0, message);
        }

        function getNodePos(): number {
            return scanner.getStartPos();
        }

        function getNodeEnd(): number {
            return scanner.getStartPos();
        }

        function nextToken(): SyntaxKind {
            return token = scanner.scan();
        }

        function getTokenPos(pos: number): number {
            return skipTrivia(sourceText, pos);
        }

        function reScanGreaterToken(): SyntaxKind {
            return token = scanner.reScanGreaterToken();
        }

        function reScanSlashToken(): SyntaxKind {
            return token = scanner.reScanSlashToken();
        }

        function reScanTemplateToken(): SyntaxKind {
            return token = scanner.reScanTemplateToken();
        }

        function speculationHelper<T>(callback: () => T, isLookAhead: boolean): T {
            // Keep track of the state we'll need to rollback to if lookahead fails (or if the 
            // caller asked us to always reset our state).
            var saveToken = token;
            var saveParseDiagnosticsLength = sourceFile.parseDiagnostics.length;
            var saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

            // Note: it is not actually necessary to save/restore the context flags here.  That's
            // because the saving/restorating of these flags happens naturally through the recursive
            // descent nature of our parser.  However, we still store this here just so we can 
            // assert that that invariant holds.
            var saveContextFlags = contextFlags;

            // If we're only looking ahead, then tell the scanner to only lookahead as well.
            // Otherwise, if we're actually speculatively parsing, then tell the scanner to do the 
            // same. 
            var result = isLookAhead
                ? scanner.lookAhead(callback)
                : scanner.tryScan(callback);

            Debug.assert(saveContextFlags === contextFlags);

            // If our callback returned something 'falsy' or we're just looking ahead,
            // then unconditionally restore us to where we were.
            if (!result || isLookAhead) {
                token = saveToken;
                sourceFile.parseDiagnostics.length = saveParseDiagnosticsLength;
                parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
            }

            return result;
        }

        // Invokes the provided callback then unconditionally restores the parser to the state it 
        // was in immediately prior to invoking the callback.  The result of invoking the callback
        // is returned from this function.
        function lookAhead<T>(callback: () => T): T {
            return speculationHelper(callback, /*isLookAhead:*/ true);
        }
        
        // Invokes the provided callback.  If the callback returns something falsy, then it restores
        // the parser to the state it was in immediately prior to invoking the callback.  If the 
        // callback returns something truthy, then the parser state is not rolled back.  The result
        // of invoking the callback is returned from this function.
        function tryParse<T>(callback: () => T): T {
            return speculationHelper(callback, /*isLookAhead:*/ false);
        }

        function isIdentifier(): boolean {
            if (token === SyntaxKind.Identifier) {
                return true;
            }
            
            // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is 
            // considered a keyword and is not an identifier.
            if (token === SyntaxKind.YieldKeyword && inYieldContext()) {
                return false;
            }
            
            return inStrictModeContext() ? token > SyntaxKind.LastFutureReservedWord : token > SyntaxKind.LastReservedWord;
        }

        function parseExpected(kind: SyntaxKind, diagnosticMessage?: DiagnosticMessage, arg0?: any): boolean {
            if (token === kind) {
                nextToken();
                return true;
            }

            // Report specific message if provided with one.  Otherwise, report generic fallback message.
            if (diagnosticMessage) {
                parseErrorAtCurrentToken(diagnosticMessage, arg0);
            }
            else {
                parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
            }
            return false;
        }

        function parseOptional(t: SyntaxKind): boolean {
            if (token === t) {
                nextToken();
                return true;
            }
            return false;
        }

        function parseOptionalToken(t: SyntaxKind): Node {
            if (token === t) {
                var node = createNode(t);
                nextToken();
                return finishNode(node);
            }
            return undefined;
        }

        function canParseSemicolon() {
            // If there's a real semicolon, then we can always parse it out.
            if (token === SyntaxKind.SemicolonToken) {
                return true;
            }

            // We can parse out an optional semicolon in ASI cases in the following cases.
            return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
        }

        function parseSemicolon(diagnosticMessage?: DiagnosticMessage): boolean {
            if (canParseSemicolon()) {
                if (token === SyntaxKind.SemicolonToken) {
                    // consume the semicolon if it was explicitly provided.
                    nextToken();
                }

                return true;
            }
            else {
                return parseExpected(SyntaxKind.SemicolonToken, diagnosticMessage);
            }
        }

        function createNode(kind: SyntaxKind, pos?: number): Node {
            nodeCount++;
            var node = new (nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind)))();
            if (!(pos >= 0)) {
                pos = scanner.getStartPos();
            }

            node.pos = pos;
            node.end = pos;
            return node;
        }

        function finishNode<T extends Node>(node: T): T {
            node.end = scanner.getStartPos();

            if (contextFlags) {
                node.parserContextFlags = contextFlags;
            }

            // Keep track on the node if we encountered an error while parsing it.  If we did, then
            // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
            // flag so that we don't mark any subsequent nodes.
            if (parseErrorBeforeNextFinishedNode) {
                parseErrorBeforeNextFinishedNode = false;
                node.parserContextFlags |= ParserContextFlags.ContainsError;
            }

            return node;
        }

        function createMissingNode(kind: SyntaxKind, reportAtCurrentPosition: boolean, diagnosticMessage: DiagnosticMessage, arg0?: any): Node {
            if (reportAtCurrentPosition) {
                parseErrorAtPosition(scanner.getStartPos(), 0, diagnosticMessage, arg0);
            }
            else {
                parseErrorAtCurrentToken(diagnosticMessage, arg0);
            }

            var result = createNode(kind, scanner.getStartPos());
            (<Identifier>result).text = "";
            return finishNode(result);
        }

        function internIdentifier(text: string): string {
            text = escapeIdentifier(text);
            return hasProperty(identifiers, text) ? identifiers[text] : (identifiers[text] = text);
        }

        // An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
        // with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
        // each identifier in order to reduce memory consumption.
        function createIdentifier(isIdentifier: boolean, diagnosticMessage?: DiagnosticMessage): Identifier {
            identifierCount++;
            if (isIdentifier) {
                var node = <Identifier>createNode(SyntaxKind.Identifier);
                node.text = internIdentifier(scanner.getTokenValue());
                nextToken();
                return finishNode(node);
            }

            return <Identifier>createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentPosition:*/ false, diagnosticMessage || Diagnostics.Identifier_expected);
        }

        function parseIdentifier(diagnosticMessage?: DiagnosticMessage): Identifier {
            return createIdentifier(isIdentifier(), diagnosticMessage);
        }

        function parseIdentifierName(): Identifier {
            return createIdentifier(isIdentifierOrKeyword());
        }

        function isLiteralPropertyName(): boolean {
            return isIdentifierOrKeyword() ||
                token === SyntaxKind.StringLiteral ||
                token === SyntaxKind.NumericLiteral;
        }

        function parsePropertyName(): DeclarationName {
            if (token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral) {
                return parseLiteralNode(/*internName:*/ true);
            }
            if (token === SyntaxKind.OpenBracketToken) {
                return parseComputedPropertyName();
            }
            return parseIdentifierName();
        }

        function parseComputedPropertyName(): ComputedPropertyName {
            // PropertyName[Yield,GeneratorParameter] :
            //     LiteralPropertyName
            //     [+GeneratorParameter] ComputedPropertyName
            //     [~GeneratorParameter] ComputedPropertyName[?Yield]
            // 
            // ComputedPropertyName[Yield] :
            //     [ AssignmentExpression[In, ?Yield] ]
            //
            var node = <ComputedPropertyName>createNode(SyntaxKind.ComputedPropertyName);
            parseExpected(SyntaxKind.OpenBracketToken);

            // We parse any expression (including a comma expression). But the grammar
            // says that only an assignment expression is allowed, so the grammar checker
            // will error if it sees a comma expression.
            var yieldContext = inYieldContext();
            if (inGeneratorParameterContext()) {
                setYieldContext(false);
            }

            node.expression = allowInAnd(parseExpression);
            if (inGeneratorParameterContext()) {
                setYieldContext(yieldContext);
            }

            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }
        
        function parseContextualModifier(t: SyntaxKind): boolean {
            return token === t && tryParse(nextTokenCanFollowModifier);
        }

        function nextTokenCanFollowModifier() {
            nextToken();
            return canFollowModifier();
        }

        function parseAnyContextualModifier(): boolean {
            return isModifier(token) && tryParse(nextTokenCanFollowContextualModifier);
        }

        function nextTokenCanFollowContextualModifier() {
            if (token === SyntaxKind.ConstKeyword) {
                // 'const' is only a modifier if followed by 'enum'.
                return nextToken() === SyntaxKind.EnumKeyword;
            }

            nextToken();
            return canFollowModifier();
        }

        function canFollowModifier(): boolean {
            return token === SyntaxKind.OpenBracketToken || token === SyntaxKind.AsteriskToken || isLiteralPropertyName();
        }

        // True if positioned at the start of a list element
        function isListElement(kind: ParsingContext, inErrorRecovery: boolean): boolean {
            switch (kind) {
                case ParsingContext.SourceElements:
                case ParsingContext.ModuleElements:
                    return isSourceElement(inErrorRecovery);
                case ParsingContext.BlockStatements:
                case ParsingContext.SwitchClauseStatements:
                    return isStatement(inErrorRecovery);
                case ParsingContext.SwitchClauses:
                    return token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
                case ParsingContext.TypeMembers:
                    return isStartOfTypeMember();
                case ParsingContext.ClassMembers:
                    return lookAhead(isClassMemberStart);
                case ParsingContext.EnumMembers:
                    // Include open bracket computed properties. This technically also lets in indexers,
                    // which would be a candidate for improved error reporting.
                    return token === SyntaxKind.OpenBracketToken || isLiteralPropertyName();
                case ParsingContext.ObjectLiteralMembers:
                    return token === SyntaxKind.OpenBracketToken || token === SyntaxKind.AsteriskToken || isLiteralPropertyName();
                case ParsingContext.ObjectBindingElements:
                    return isLiteralPropertyName();
                case ParsingContext.TypeReferences:
                    // We want to make sure that the "extends" in "extends foo" or the "implements" in
                    // "implements foo" is not considered a type name.
                    return isIdentifier() && !isNotHeritageClauseTypeName();
                case ParsingContext.VariableDeclarations:
                    return isIdentifierOrPattern();
                case ParsingContext.ArrayBindingElements:
                    return token === SyntaxKind.CommaToken || isIdentifierOrPattern();
                case ParsingContext.TypeParameters:
                    return isIdentifier();
                case ParsingContext.ArgumentExpressions:
                    return token === SyntaxKind.CommaToken || isStartOfExpression();
                case ParsingContext.ArrayLiteralMembers:
                    return token === SyntaxKind.CommaToken || isStartOfExpression();
                case ParsingContext.Parameters:
                    return isStartOfParameter();
                case ParsingContext.TypeArguments:
                case ParsingContext.TupleElementTypes:
                    return token === SyntaxKind.CommaToken || isStartOfType();
                case ParsingContext.HeritageClauses:
                    return isHeritageClause();
            }

            Debug.fail("Non-exhaustive case in 'isListElement'.");
        }

        function nextTokenIsIdentifier() {
            nextToken();
            return isIdentifier();
        }
        
        function isNotHeritageClauseTypeName(): boolean {
            if (token === SyntaxKind.ImplementsKeyword ||
                token === SyntaxKind.ExtendsKeyword) {

                return lookAhead(nextTokenIsIdentifier);
            }

            return false;
        }

        // True if positioned at a list terminator
        function isListTerminator(kind: ParsingContext): boolean {
            if (token === SyntaxKind.EndOfFileToken) {
                // Being at the end of the file ends all lists.
                return true;
            }

            switch (kind) {
                case ParsingContext.ModuleElements:
                case ParsingContext.BlockStatements:
                case ParsingContext.SwitchClauses:
                case ParsingContext.TypeMembers:
                case ParsingContext.ClassMembers:
                case ParsingContext.EnumMembers:
                case ParsingContext.ObjectLiteralMembers:
                case ParsingContext.ObjectBindingElements:
                    return token === SyntaxKind.CloseBraceToken;
                case ParsingContext.SwitchClauseStatements:
                    return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
                case ParsingContext.TypeReferences:
                    return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
                case ParsingContext.VariableDeclarations:
                    return isVariableDeclaratorListTerminator();
                case ParsingContext.TypeParameters:
                    // Tokens other than '>' are here for better error recovery
                    return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.OpenBraceToken || token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
                case ParsingContext.ArgumentExpressions:
                    // Tokens other than ')' are here for better error recovery
                    return token === SyntaxKind.CloseParenToken || token === SyntaxKind.SemicolonToken;
                case ParsingContext.ArrayLiteralMembers:
                case ParsingContext.TupleElementTypes:
                case ParsingContext.ArrayBindingElements:
                    return token === SyntaxKind.CloseBracketToken;
                case ParsingContext.Parameters:
                    // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
                    return token === SyntaxKind.CloseParenToken || token === SyntaxKind.CloseBracketToken /*|| token === SyntaxKind.OpenBraceToken*/;
                case ParsingContext.TypeArguments:
                    // Tokens other than '>' are here for better error recovery
                    return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken;
                case ParsingContext.HeritageClauses:
                    return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.CloseBraceToken;

            }
        }

        function isVariableDeclaratorListTerminator(): boolean {
            // If we can consume a semicolon (either explicitly, or with ASI), then consider us done 
            // with parsing the list of  variable declarators.
            if (canParseSemicolon()) {
                return true;
            }

            // in the case where we're parsing the variable declarator of a 'for-in' statement, we 
            // are done if we see an 'in' keyword in front of us.
            if (token === SyntaxKind.InKeyword) {
                return true;
            }

            // ERROR RECOVERY TWEAK:
            // For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
            // arrow function here and it's going to be very unlikely that we'll resynchronize and get
            // another variable declaration.
            if (token === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            // Keep trying to parse out variable declarators.
            return false;
        }

        // True if positioned at element or terminator of the current list or any enclosing list
        function isInSomeParsingContext(): boolean {
            for (var kind = 0; kind < ParsingContext.Count; kind++) {
                if (parsingContext & (1 << kind)) {
                    if (isListElement(kind, /* inErrorRecovery */ true) || isListTerminator(kind)) {
                        return true;
                    }
                }
            }

            return false;
        }

        // Parses a list of elements
        function parseList<T extends Node>(kind: ParsingContext, checkForStrictMode: boolean, parseElement: () => T): NodeArray<T> {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = <NodeArray<T>>[];
            result.pos = getNodePos();
            var savedStrictModeContext = inStrictModeContext();

            while (!isListTerminator(kind)) {
                if (isListElement(kind, /* inErrorRecovery */ false)) {
                    var element = parseElement();
                    result.push(element);

                    // test elements only if we are not already in strict mode
                    if (checkForStrictMode && !inStrictModeContext()) {
                        if (isPrologueDirective(element)) {
                            if (isUseStrictPrologueDirective(element)) {
                                setStrictModeContext(true);
                                checkForStrictMode = false;
                            }
                        }
                        else {
                            checkForStrictMode = false;
                        }
                    }

                    continue;
                }

                if (abortParsingListOrMoveToNextToken(kind)) {
                    break;
                }
            }

            setStrictModeContext(savedStrictModeContext);
            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }

        // Returns true if we should abort parsing.
        function abortParsingListOrMoveToNextToken(kind: ParsingContext) {
            parseErrorAtCurrentToken(parsingContextErrors(kind));
            if (isInSomeParsingContext()) {
                return true;
            }

            nextToken();
            return false;
        }

        // Parses a comma-delimited list of elements
        function parseDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T): NodeArray<T> {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = <NodeArray<T>>[];
            result.pos = getNodePos();

            var commaStart = -1; // Meaning the previous token was not a comma
            while (true) {
                if (isListElement(kind, /* inErrorRecovery */ false)) {
                    result.push(parseElement());
                    commaStart = scanner.getTokenPos();
                    if (parseOptional(SyntaxKind.CommaToken)) {
                        continue;
                    }
                    commaStart = -1; // Back to the state where the last token was not a comma
                    if (isListTerminator(kind)) {
                        break;
                    }
                    parseExpected(SyntaxKind.CommaToken);
                    continue;
                }

                if (isListTerminator(kind)) {
                    break;
                }

                if (abortParsingListOrMoveToNextToken(kind)) {
                    break;
                }
            }

            // Recording the trailing comma is deliberately done after the previous
            // loop, and not just if we see a list terminator. This is because the list
            // may have ended incorrectly, but it is still important to know if there
            // was a trailing comma.
            // Check if the last token was a comma.
            if (commaStart >= 0) {
                // Always preserve a trailing comma by marking it on the NodeArray
                result.hasTrailingComma = true;
            }

            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }

        function createMissingList<T>(): NodeArray<T> {
            var pos = getNodePos();
            var result = <NodeArray<T>>[];
            result.pos = pos;
            result.end = pos;
            return result;
        }

        function parseBracketedList<T extends Node>(kind: ParsingContext, parseElement: () => T, open: SyntaxKind, close: SyntaxKind): NodeArray<T> {
            if (parseExpected(open)) {
                var result = parseDelimitedList(kind, parseElement);
                parseExpected(close);
                return result;
            }

            return createMissingList<T>();
        }

        // The allowReservedWords parameter controls whether reserved words are permitted after the first dot
        function parseEntityName(allowReservedWords: boolean, diagnosticMessage?: DiagnosticMessage): EntityName {
            var entity: EntityName = parseIdentifier(diagnosticMessage);
            while (parseOptional(SyntaxKind.DotToken)) {
                var node = <QualifiedName>createNode(SyntaxKind.QualifiedName, entity.pos);
                node.left = entity;
                node.right = parseRightSideOfDot(allowReservedWords);
                entity = finishNode(node);
            }
            return entity;
        }

        function parseRightSideOfDot(allowIdentifierNames: boolean): Identifier {
            // Technically a keyword is valid here as all keywords are identifier names.
            // However, often we'll encounter this in error situations when the keyword
            // is actually starting another valid construct.
            //
            // So, we check for the following specific case:
            //
            //      name.
            //      keyword identifierNameOrKeyword
            //
            // Note: the newlines are important here.  For example, if that above code 
            // were rewritten into:
            //
            //      name.keyword
            //      identifierNameOrKeyword
            //
            // Then we would consider it valid.  That's because ASI would take effect and
            // the code would be implicitly: "name.keyword; identifierNameOrKeyword".  
            // In the first case though, ASI will not take effect because there is not a
            // line terminator after the keyword.
            if (scanner.hasPrecedingLineBreak() && scanner.isReservedWord()) {
                var matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

                if (matchesPattern) {
                    // Report that we need an identifier.  However, report it right after the dot, 
                    // and not on the next token.  This is because the next token might actually 
                    // be an identifier and the error woudl be quite confusing.
                    return <Identifier>createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentToken:*/ true, Diagnostics.Identifier_expected);
                }
            }

            return allowIdentifierNames ? parseIdentifierName() : parseIdentifier();
        }



        function parseTokenNode<T extends Node>(): T {
            var node = <T>createNode(token);
            nextToken();
            return finishNode(node);
        }

        function parseTemplateExpression(): TemplateExpression {
            var template = <TemplateExpression>createNode(SyntaxKind.TemplateExpression);

            template.head = parseLiteralNode();
            Debug.assert(template.head.kind === SyntaxKind.TemplateHead, "Template head has wrong token kind");

            var templateSpans = <NodeArray<TemplateSpan>>[];
            templateSpans.pos = getNodePos();
            
            do {
                templateSpans.push(parseTemplateSpan());
            }
            while (templateSpans[templateSpans.length - 1].literal.kind === SyntaxKind.TemplateMiddle)
            
            templateSpans.end = getNodeEnd();
            template.templateSpans = templateSpans;

            return finishNode(template);
        }

        function parseTemplateSpan(): TemplateSpan {
            var span = <TemplateSpan>createNode(SyntaxKind.TemplateSpan);
            span.expression = allowInAnd(parseExpression);

            var literal: LiteralExpression;

            if (token === SyntaxKind.CloseBraceToken) {
                reScanTemplateToken()
                literal = parseLiteralNode();
            }
            else {
                literal = <LiteralExpression>createMissingNode(
                    SyntaxKind.TemplateTail, /*reportAtCurrentPosition:*/ false, Diagnostics._0_expected, tokenToString(SyntaxKind.CloseBraceToken));
            }

            span.literal = literal;
            return finishNode(span);
        }

        function parseLiteralNode(internName?: boolean): LiteralExpression {
            var node = <LiteralExpression>createNode(token);
            var text = scanner.getTokenValue();
            node.text = internName ? internIdentifier(text) : text;

            if (scanner.isUnterminated()) {
                node.isUnterminated = true;
            }

            var tokenPos = scanner.getTokenPos();
            nextToken();
            finishNode(node);
            
            // Octal literals are not allowed in strict mode or ES5
            // Note that theoretically the following condition would hold true literals like 009,
            // which is not octal.But because of how the scanner separates the tokens, we would
            // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
            // We also do not need to check for negatives because any prefix operator would be part of a
            // parent unary expression.
            if (node.kind === SyntaxKind.NumericLiteral
                && sourceText.charCodeAt(tokenPos) === CharacterCodes._0
                && isOctalDigit(sourceText.charCodeAt(tokenPos + 1))) {

                node.flags |= NodeFlags.OctalLiteral;
            }

            return node;
        }

        // TYPES

        function parseTypeReference(): TypeReferenceNode {
            var node = <TypeReferenceNode>createNode(SyntaxKind.TypeReference);
            node.typeName = parseEntityName(/*allowReservedWords*/ false, Diagnostics.Type_expected);
            if (!scanner.hasPrecedingLineBreak() && token === SyntaxKind.LessThanToken) {
                node.typeArguments = parseBracketedList(ParsingContext.TypeArguments, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
            }
            return finishNode(node);
        }

        function parseTypeQuery(): TypeQueryNode {
            var node = <TypeQueryNode>createNode(SyntaxKind.TypeQuery);
            parseExpected(SyntaxKind.TypeOfKeyword);
            node.exprName = parseEntityName(/*allowReservedWords*/ true);
            return finishNode(node);
        }

        function parseTypeParameter(): TypeParameterDeclaration {
            var node = <TypeParameterDeclaration>createNode(SyntaxKind.TypeParameter);
            node.name = parseIdentifier();
            if (parseOptional(SyntaxKind.ExtendsKeyword)) {
                // It's not uncommon for people to write improper constraints to a generic.  If the 
                // user writes a constraint that is an expression and not an actual type, then parse
                // it out as an expression (so we can recover well), but report that a type is needed
                // instead.
                if (isStartOfType() || !isStartOfExpression()) {
                    node.constraint = parseType();
                }
                else {
                    // It was not a type, and it looked like an expression.  Parse out an expression
                    // here so we recover well.  Note: it is important that we call parseUnaryExpression
                    // and not parseExpression here.  If the user has:
                    //
                    //      <T extends "">
                    //
                    // We do *not* want to consume the  >  as we're consuming the expression for "".
                    node.expression = parseUnaryExpressionOrHigher();
                }
            }

            return finishNode(node);
        }

        function parseTypeParameters(): NodeArray<TypeParameterDeclaration> {
            if (token === SyntaxKind.LessThanToken) {
                return parseBracketedList(ParsingContext.TypeParameters, parseTypeParameter, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
            }
        }

        function parseParameterType(): TypeNode {
            if (parseOptional(SyntaxKind.ColonToken)) {
                return token === SyntaxKind.StringLiteral
                    ? <StringLiteralTypeNode>parseLiteralNode(/*internName:*/ true)
                    : parseType();
            }

            return undefined;
        }

        function isStartOfParameter(): boolean {
            return token === SyntaxKind.DotDotDotToken || isIdentifierOrPattern() || isModifier(token);
        }

        function setModifiers(node: Node, modifiers: ModifiersArray) {
            if (modifiers) {
                node.flags |= modifiers.flags;
                node.modifiers = modifiers;
            }
        }

        function parseParameter(): ParameterDeclaration {
            var node = <ParameterDeclaration>createNode(SyntaxKind.Parameter);
            setModifiers(node, parseModifiers());
            node.dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);

            // SingleNameBinding[Yield,GeneratorParameter] : See 13.2.3
            //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
            //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt

            node.name = inGeneratorParameterContext() ? doInYieldContext(parseIdentifierOrPattern) : parseIdentifierOrPattern();

            if (getFullWidth(node.name) === 0 && node.flags === 0 && isModifier(token)) {
                // in cases like
                // 'use strict' 
                // function foo(static)
                // isParameter('static') === true, because of isModifier('static')
                // however 'static' is not a legal identifier in a strict mode.
                // so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
                // and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
                // to avoid this we'll advance cursor to the next token.
                nextToken();
            }

            node.questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
            node.type = parseParameterType();
            node.initializer = inGeneratorParameterContext() ? doOutsideOfYieldContext(parseParameterInitializer) : parseParameterInitializer();

            // Do not check for initializers in an ambient context for parameters. This is not
            // a grammar error because the grammar allows arbitrary call signatures in
            // an ambient context.
            // It is actually not necessary for this to be an error at all. The reason is that
            // function/constructor implementations are syntactically disallowed in ambient
            // contexts. In addition, parameter initializers are semantically disallowed in
            // overload signatures. So parameter initializers are transitively disallowed in
            // ambient contexts.
            return finishNode(node);
        }

        function parseParameterInitializer() {
            return parseInitializer(/*inParameter*/ true);
        }

        function fillSignature(
                returnToken: SyntaxKind,
                yieldAndGeneratorParameterContext: boolean,
                requireCompleteParameterList: boolean,
                signature: SignatureDeclaration): void {
            var returnTokenRequired = returnToken === SyntaxKind.EqualsGreaterThanToken;
            signature.typeParameters = parseTypeParameters();
            signature.parameters = parseParameterList(yieldAndGeneratorParameterContext, requireCompleteParameterList);

            if (returnTokenRequired) {
                parseExpected(returnToken);
                signature.type = parseType();
            }
            else if (parseOptional(returnToken)) {
                signature.type = parseType();
            }
        }

        // Note: after careful analysis of the grammar, it does not appear to be possible to 
        // have 'Yield' And 'GeneratorParameter' not in sync.  i.e. any production calling
        // this FormalParameters production either always sets both to true, or always sets
        // both to false.  As such we only have a single parameter to represent both.
        function parseParameterList(yieldAndGeneratorParameterContext: boolean, requireCompleteParameterList: boolean) {
            // FormalParameters[Yield,GeneratorParameter] :
            //      ...
            //
            // FormalParameter[Yield,GeneratorParameter] :
            //      BindingElement[?Yield, ?GeneratorParameter]
            //
            // BindingElement[Yield, GeneratorParameter ] : See 13.2.3
            //      SingleNameBinding[?Yield, ?GeneratorParameter]
            //      [+GeneratorParameter]BindingPattern[?Yield, GeneratorParameter]Initializer[In]opt
            //      [~GeneratorParameter]BindingPattern[?Yield]Initializer[In, ?Yield]opt
            //
            // SingleNameBinding[Yield, GeneratorParameter] : See 13.2.3
            //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
            //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
            if (parseExpected(SyntaxKind.OpenParenToken)) {
                var savedYieldContext = inYieldContext();
                var savedGeneratorParameterContext = inGeneratorParameterContext();

                setYieldContext(yieldAndGeneratorParameterContext);
                setGeneratorParameterContext(yieldAndGeneratorParameterContext);

                var result = parseDelimitedList(ParsingContext.Parameters, parseParameter);

                setYieldContext(savedYieldContext);
                setGeneratorParameterContext(savedGeneratorParameterContext);

                if (!parseExpected(SyntaxKind.CloseParenToken) && requireCompleteParameterList) {
                    // Caller insisted that we had to end with a )   We didn't.  So just return
                    // undefined here.
                    return undefined;
                }

                return result;
            }

            // We didn't even have an open paren.  If the caller requires a complete parameter list,
            // we definitely can't provide that.  However, if they're ok with an incomplete one,
            // then just return an empty set of parameters.
            return requireCompleteParameterList ? undefined : createMissingList<ParameterDeclaration>();
        }

        function parseTypeMemberSemicolon() {
            // Try to parse out an explicit or implicit (ASI) semicolon for a type member.  If we
            // don't have one, then an appropriate error will be reported.
            if (parseSemicolon()) {
                return;
            }

            // If we don't have a semicolon, then the user may have written a comma instead 
            // accidently (pretty easy to do since commas are so prevalent as list separators). So
            // just consume the comma and keep going.  Note: we'll have already reported the error
            // about the missing semicolon above.
            parseOptional(SyntaxKind.CommaToken);
        }

        function parseSignatureMember(kind: SyntaxKind): SignatureDeclaration {
            var node = <SignatureDeclaration>createNode(kind);
            if (kind === SyntaxKind.ConstructSignature) {
                parseExpected(SyntaxKind.NewKeyword);
            }
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            parseTypeMemberSemicolon();
            return finishNode(node);
        }

        function isIndexSignature(): boolean {
            if (token !== SyntaxKind.OpenBracketToken) {
                return false;
            }

            return lookAhead(isUnambiguouslyIndexSignature);
        }

        function isUnambiguouslyIndexSignature() {
            // The only allowed sequence is:
            //
            //   [id:
            //
            // However, for error recovery, we also check the following cases:
            //
            //   [...
            //   [id,
            //   [id?,
            //   [id?:
            //   [id?]
            //   [public id
            //   [private id
            //   [protected id
            //   []
            //
            nextToken();
            if (token === SyntaxKind.DotDotDotToken || token === SyntaxKind.CloseBracketToken) {
                return true;
            }

            if (isModifier(token)) {
                nextToken();
                if (isIdentifier()) {
                    return true;
                }
            }
            else if (!isIdentifier()) {
                return false;
            }
            else {
                // Skip the identifier
                nextToken();
            }

            // A colon signifies a well formed indexer
            // A comma should be a badly formed indexer because comma expressions are not allowed
            // in computed properties.
            if (token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken) {
                return true;
            }

            // Question mark could be an indexer with an optional property,
            // or it could be a conditional expression in a computed property.
            if (token !== SyntaxKind.QuestionToken) {
                return false;
            }

            // If any of the following tokens are after the question mark, it cannot
            // be a conditional expression, so treat it as an indexer.
            nextToken();
            return token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken || token === SyntaxKind.CloseBracketToken;
        }

        function parseIndexSignatureDeclaration(fullStart: number, modifiers: ModifiersArray): IndexSignatureDeclaration {
            var node = <IndexSignatureDeclaration>createNode(SyntaxKind.IndexSignature, fullStart);
            setModifiers(node, modifiers);
            node.parameters = parseBracketedList(ParsingContext.Parameters, parseParameter, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
            node.type = parseTypeAnnotation();
            parseTypeMemberSemicolon();
            return finishNode(node)
        }

        function parsePropertyOrMethodSignature(): Declaration {
            var fullStart = scanner.getStartPos();
            var name = parsePropertyName();
            var questionToken = parseOptionalToken(SyntaxKind.QuestionToken);

            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                var method = <MethodDeclaration>createNode(SyntaxKind.MethodSignature, fullStart);
                method.name = name;
                method.questionToken = questionToken;

                // Method signatues don't exist in expression contexts.  So they have neither
                // [Yield] nor [GeneratorParameter]
                fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, method);
                parseTypeMemberSemicolon();
                return finishNode(method);
            }
            else {
                var property = <PropertyDeclaration>createNode(SyntaxKind.PropertySignature, fullStart);
                property.name = name;
                property.questionToken = questionToken;
                property.type = parseTypeAnnotation();
                parseTypeMemberSemicolon();
                return finishNode(property);
            }
        }

        function isStartOfTypeMember(): boolean {
            switch (token) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.OpenBracketToken: // Both for indexers and computed properties
                    return true;
                default:
                    return isLiteralPropertyName() && lookAhead(isTypeMemberWithLiteralPropertyName);
            }
        }

        function isTypeMemberWithLiteralPropertyName() {
            nextToken();
            return token === SyntaxKind.OpenParenToken ||
                token === SyntaxKind.LessThanToken ||
                token === SyntaxKind.QuestionToken ||
                token === SyntaxKind.ColonToken ||
                canParseSemicolon();
        }

        function parseTypeMember(): Declaration {
            switch (token) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                    return parseSignatureMember(SyntaxKind.CallSignature);
                case SyntaxKind.OpenBracketToken:
                    // Indexer or computed property
                    return isIndexSignature() ? parseIndexSignatureDeclaration(scanner.getStartPos(), /*modifiers:*/ undefined) : parsePropertyOrMethodSignature();
                case SyntaxKind.NewKeyword:
                    if (lookAhead(isStartOfConstructSignature)) {
                        return parseSignatureMember(SyntaxKind.ConstructSignature);
                    }
                    // fall through.
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                    return parsePropertyOrMethodSignature();
                default:
                    if (isIdentifierOrKeyword()) {
                        return parsePropertyOrMethodSignature();
                    }
            }
        }

        function isStartOfConstructSignature() {
            nextToken();
            return token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken;
        }

        function parseTypeLiteral(): TypeLiteralNode {
            var node = <TypeLiteralNode>createNode(SyntaxKind.TypeLiteral);
            node.members = parseObjectTypeMembers();
            return finishNode(node);
        }

        function parseObjectTypeMembers(): NodeArray<Declaration> {
            var members: NodeArray<Declaration>;
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                members = parseList(ParsingContext.TypeMembers, /*checkForStrictMode*/ false, parseTypeMember);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                members = createMissingList<Declaration>();
            }

            return members;
        }

        function parseTupleType(): TupleTypeNode {
            var node = <TupleTypeNode>createNode(SyntaxKind.TupleType);
            node.elementTypes = parseBracketedList(ParsingContext.TupleElementTypes, parseType, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function parseParenthesizedType(): ParenthesizedTypeNode {
            var node = <ParenthesizedTypeNode>createNode(SyntaxKind.ParenthesizedType);
            parseExpected(SyntaxKind.OpenParenToken);
            node.type = parseType();
            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseFunctionOrConstructorType(kind: SyntaxKind): FunctionOrConstructorTypeNode {
            var node = <FunctionOrConstructorTypeNode>createNode(kind);
            if (kind === SyntaxKind.ConstructorType) {
                parseExpected(SyntaxKind.NewKeyword);
            }
            fillSignature(SyntaxKind.EqualsGreaterThanToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            return finishNode(node);
        }

        function parseKeywordAndNoDot(): TypeNode {
            var node = parseTokenNode<TypeNode>();
            return token === SyntaxKind.DotToken ? undefined : node;
        }

        function parseNonArrayType(): TypeNode {
            switch (token) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                    // If these are followed by a dot, then parse these out as a dotted type reference instead.
                    var node = tryParse(parseKeywordAndNoDot);
                    return node || parseTypeReference();
                case SyntaxKind.VoidKeyword:
                    return parseTokenNode<TypeNode>();
                case SyntaxKind.TypeOfKeyword:
                    return parseTypeQuery();
                case SyntaxKind.OpenBraceToken:
                    return parseTypeLiteral();
                case SyntaxKind.OpenBracketToken:
                    return parseTupleType();
                case SyntaxKind.OpenParenToken:
                    return parseParenthesizedType();
                default:
                    return parseTypeReference();
            }
        }

        function isStartOfType(): boolean {
            switch (token) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.NewKeyword:
                    return true;
                case SyntaxKind.OpenParenToken:
                    // Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
                    // or something that starts a type. We don't want to consider things like '(1)' a type.
                    return lookAhead(isStartOfParenthesizedOrFunctionType);
                default:
                    return isIdentifier();
            }
        }

        function isStartOfParenthesizedOrFunctionType() {
            nextToken();
            return token === SyntaxKind.CloseParenToken || isStartOfParameter() || isStartOfType();
        }

        function parseArrayTypeOrHigher(): TypeNode {
            var type = parseNonArrayType();
            while (!scanner.hasPrecedingLineBreak() && parseOptional(SyntaxKind.OpenBracketToken)) {
                parseExpected(SyntaxKind.CloseBracketToken);
                var node = <ArrayTypeNode>createNode(SyntaxKind.ArrayType, type.pos);
                node.elementType = type;
                type = finishNode(node);
            }
            return type;
        }

        function parseUnionTypeOrHigher(): TypeNode {
            var type = parseArrayTypeOrHigher();
            if (token === SyntaxKind.BarToken) {
                var types = <NodeArray<TypeNode>>[type];
                types.pos = type.pos;
                while (parseOptional(SyntaxKind.BarToken)) {
                    types.push(parseArrayTypeOrHigher());
                }
                types.end = getNodeEnd();
                var node = <UnionTypeNode>createNode(SyntaxKind.UnionType, type.pos);
                node.types = types;
                type = finishNode(node);
            }
            return type;
        }

        function isStartOfFunctionType(): boolean {
            if (token === SyntaxKind.LessThanToken) {
                return true;
            }

            return token === SyntaxKind.OpenParenToken && lookAhead(isUnambiguouslyStartOfFunctionType);
        }

        function isUnambiguouslyStartOfFunctionType() {
            nextToken();
            if (token === SyntaxKind.CloseParenToken || token === SyntaxKind.DotDotDotToken) {
                // ( )
                // ( ...
                return true;
            }
            if (isIdentifier() || isModifier(token)) {
                nextToken();
                if (token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken ||
                    token === SyntaxKind.QuestionToken || token === SyntaxKind.EqualsToken ||
                    isIdentifier() || isModifier(token)) {
                    // ( id :
                    // ( id ,
                    // ( id ?
                    // ( id =
                    // ( modifier id
                    return true;
                }
                if (token === SyntaxKind.CloseParenToken) {
                    nextToken();
                    if (token === SyntaxKind.EqualsGreaterThanToken) {
                        // ( id ) =>
                        return true;
                    }
                }
            }
            return false;
        }

        function parseType(): TypeNode {
            // The rules about 'yield' only apply to actual code/expression contexts.  They don't
            // apply to 'type' contexts.  So we disable these parameters here before moving on.
            var savedYieldContext = inYieldContext();
            var savedGeneratorParameterContext = inGeneratorParameterContext();

            setYieldContext(false);
            setGeneratorParameterContext(false);

            var result = parseTypeWorker();

            setYieldContext(savedYieldContext);
            setGeneratorParameterContext(savedGeneratorParameterContext);

            return result;
        }

        function parseTypeWorker(): TypeNode {
            if (isStartOfFunctionType()) {
                return parseFunctionOrConstructorType(SyntaxKind.FunctionType);
            }
            if (token === SyntaxKind.NewKeyword) {
                return parseFunctionOrConstructorType(SyntaxKind.ConstructorType);
            }
            return parseUnionTypeOrHigher();
        }

        function parseTypeAnnotation(): TypeNode {
            return parseOptional(SyntaxKind.ColonToken) ? parseType() : undefined;
        }

        // EXPRESSIONS

        function isStartOfExpression(): boolean {
            switch (token) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.NewKeyword:
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.DeleteKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.Identifier:
                case SyntaxKind.YieldKeyword:
                    // Yield always starts an expression.  Either it is an identifier (in which case
                    // it is definitely an expression).  Or it's a keyword (either because we're in
                    // a generator, or in strict mode (or both)) and it started a yield expression.
                    return true;
                default:
                    // Error tolerance.  If we see the start of some binary operator, we consider
                    // that the start of an expression.  That way we'll parse out a missing identifier,
                    // give a good message about an identifier being missing, and then consume the
                    // rest of the binary expression.
                    if (isBinaryOperator()) {
                        return true;
                    }

                    return isIdentifier();
            }
        }

        function isStartOfExpressionStatement(): boolean {
            // As per the grammar, neither '{' nor 'function' can start an expression statement.
            return token !== SyntaxKind.OpenBraceToken && token !== SyntaxKind.FunctionKeyword && isStartOfExpression();
        }

        function parseExpression(): Expression {
            // Expression[in]:
            //      AssignmentExpression[in] 
            //      Expression[in] , AssignmentExpression[in]

            var expr = parseAssignmentExpressionOrHigher();
            while (parseOptional(SyntaxKind.CommaToken)) {
                expr = makeBinaryExpression(expr, SyntaxKind.CommaToken, parseAssignmentExpressionOrHigher());
            }
            return expr;
        }

        function parseInitializer(inParameter: boolean): Expression {
            if (token !== SyntaxKind.EqualsToken) {
                // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
                // there is no newline after the last token and if we're on an expression.  If so, parse
                // this as an equals-value clause with a missing equals.
                // NOTE: There are two places where we allow equals-value clauses.  The first is in a 
                // variable declarator.  The second is with a parameter.  For variable declarators
                // it's more likely that a { would be a allowed (as an object literal).  While this
                // is also allowed for parameters, the risk is that we consume the { as an object
                // literal when it really will be for the block following the parameter.
                if (scanner.hasPrecedingLineBreak() || (inParameter && token === SyntaxKind.OpenBraceToken) || !isStartOfExpression()) {
                    // preceding line break, open brace in a parameter (likely a function body) or current token is not an expression - 
                    // do not try to parse initializer
                    return undefined;
                }
            }

            // Initializer[In, Yield] :
            //     = AssignmentExpression[?In, ?Yield]

            parseExpected(SyntaxKind.EqualsToken);
            return parseAssignmentExpressionOrHigher();
        }

        function parseAssignmentExpressionOrHigher(): Expression {
            //  AssignmentExpression[in,yield]:
            //      1) ConditionalExpression[?in,?yield]
            //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
            //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
            //      4) ArrowFunctionExpression[?in,?yield]
            //      5) [+Yield] YieldExpression[?In]
            //
            // Note: for ease of implementation we treat productions '2' and '3' as the same thing. 
            // (i.e. they're both BinaryExpressions with an assignment operator in it).

            // First, do the simple check if we have a YieldExpression (production '5').
            if (isYieldExpression()) {
                return parseYieldExpression();
            } 

            // Then, check if we have an arrow function (production '4') that starts with a parenthesized
            // parameter list. If we do, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
            // not a  LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done 
            // with AssignmentExpression if we see one.
            var arrowExpression = tryParseParenthesizedArrowFunctionExpression();
            if (arrowExpression) {
                return arrowExpression;
            }

            // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
            // start with a LogicalOrExpression, while the assignment productions can only start with
            // LeftHandSideExpressions.
            //
            // So, first, we try to just parse out a BinaryExpression.  If we get something that is a 
            // LeftHandSide or higher, then we can try to parse out the assignment expression part.  
            // Otherwise, we try to parse out the conditional expression bit.  We want to allow any 
            // binary expression here, so we pass in the 'lowest' precedence here so that it matches
            // and consumes anything.
            var expr = parseBinaryExpressionOrHigher(/*precedence:*/ 0);

            // To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
            // parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
            // identifier and the current token is an arrow.
            if (expr.kind === SyntaxKind.Identifier && token === SyntaxKind.EqualsGreaterThanToken) {
                return parseSimpleArrowFunctionExpression(<Identifier>expr);
            }

            // Now see if we might be in cases '2' or '3'.
            // If the expression was a LHS expression, and we have an assignment operator, then 
            // we're in '2' or '3'. Consume the assignment and return.
            //
            // Note: we call reScanGreaterToken so that we get an appropriately merged token
            // for cases like > > =  becoming >>=
            if (isLeftHandSideExpression(expr) && isAssignmentOperator(reScanGreaterToken())) {
                var operator = token;
                nextToken();
                return makeBinaryExpression(expr, operator, parseAssignmentExpressionOrHigher());
            }

            // It wasn't an assignment or a lambda.  This is a conditional expression:
            return parseConditionalExpressionRest(expr);
        }

        function isYieldExpression(): boolean {
            if (token === SyntaxKind.YieldKeyword) {
                // If we have a 'yield' keyword, and htis is a context where yield expressions are 
                // allowed, then definitely parse out a yield expression.
                if (inYieldContext()) {
                    return true;
                }

                if (inStrictModeContext()) {
                    // If we're in strict mode, then 'yield' is a keyword, could only ever start
                    // a yield expression.
                    return true;
                }

                // We're in a context where 'yield expr' is not allowed.  However, if we can
                // definitely tell that the user was trying to parse a 'yield expr' and not
                // just a normal expr that start with a 'yield' identifier, then parse out
                // a 'yield expr'.  We can then report an error later that they are only 
                // allowed in generator expressions.
                // 
                // for example, if we see 'yield(foo)', then we'll have to treat that as an
                // invocation expression of something called 'yield'.  However, if we have
                // 'yield foo' then that is not legal as a normal expression, so we can 
                // definitely recognize this as a yield expression.
                //
                // for now we just check if the next token is an identifier.  More heuristics
                // can be added here later as necessary.  We just need to make sure that we
                // don't accidently consume something legal.
                return lookAhead(nextTokenIsIdentifierOnSameLine);
            }

            return false;
        }

        function nextTokenIsIdentifierOnSameLine() {
            nextToken();
            return !scanner.hasPrecedingLineBreak() && isIdentifier()
        }

        function parseYieldExpression(): YieldExpression {
            var node = <YieldExpression>createNode(SyntaxKind.YieldExpression);

            // YieldExpression[In] :
            //      yield
            //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
            //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
            nextToken();

            if (!scanner.hasPrecedingLineBreak() &&
                (token === SyntaxKind.AsteriskToken || isStartOfExpression())) {
                node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
                node.expression = parseAssignmentExpressionOrHigher();
                return finishNode(node);
            }
            else {
                // if the next token is not on the same line as yield.  or we don't have an '*' or 
                // the start of an expressin, then this is just a simple "yield" expression.
                return finishNode(node);
            }
        }

        function parseSimpleArrowFunctionExpression(identifier: Identifier): Expression {
            Debug.assert(token === SyntaxKind.EqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");

            var node = <FunctionExpression>createNode(SyntaxKind.ArrowFunction, identifier.pos);

            var parameter = <ParameterDeclaration>createNode(SyntaxKind.Parameter, identifier.pos);
            parameter.name = identifier;
            finishNode(parameter);

            node.parameters = <NodeArray<ParameterDeclaration>>[parameter];
            node.parameters.pos = parameter.pos;
            node.parameters.end = parameter.end;

            parseExpected(SyntaxKind.EqualsGreaterThanToken);
            node.body = parseArrowFunctionExpressionBody();

            return finishNode(node);
        }

        function tryParseParenthesizedArrowFunctionExpression(): Expression {
            var triState = isParenthesizedArrowFunctionExpression();

            if (triState === Tristate.False) {
                // It's definitely not a parenthesized arrow function expression.
                return undefined;
            }

            // If we definitely have an arrow function, then we can just parse one, not requiring a
            // following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
            // it out, but don't allow any ambiguity, and return 'undefined' if this could be an
            // expression instead.
            var arrowFunction = triState === Tristate.True
                ? parseParenthesizedArrowFunctionExpressionHead(/*allowAmbiguity:*/ true)
                : tryParse(parsePossibleParenthesizedArrowFunctionExpressionHead);

            if (!arrowFunction) {
                // Didn't appear to actually be a parenthesized arrow function.  Just bail out.
                return undefined;
            }

            // If we have an arrow, then try to parse the body. Even if not, try to parse if we 
            // have an opening brace, just in case we're in an error state.
            if (parseExpected(SyntaxKind.EqualsGreaterThanToken) || token === SyntaxKind.OpenBraceToken) {
                arrowFunction.body = parseArrowFunctionExpressionBody();
            }
            else {
                // If not, we're probably better off bailing out and returning a bogus function expression.
                arrowFunction.body = parseIdentifier();
            }

            return finishNode(arrowFunction);
        }

        //  True        -> We definitely expect a parenthesized arrow function here.
        //  False       -> There *cannot* be a parenthesized arrow function here.
        //  Unknown     -> There *might* be a parenthesized arrow function here.
        //                 Speculatively look ahead to be sure, and rollback if not.
        function isParenthesizedArrowFunctionExpression(): Tristate {
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
            }

            if (token === SyntaxKind.EqualsGreaterThanToken) {
                // ERROR RECOVERY TWEAK:
                // If we see a standalone => try to parse it as an arrow function expression as that's
                // likely what the user intended to write.
                return Tristate.True;
            }
            // Definitely not a parenthesized arrow function.
            return Tristate.False;
        }

        function isParenthesizedArrowFunctionExpressionWorker() {
            var first = token;
            var second = nextToken();

            if (first === SyntaxKind.OpenParenToken) {
                if (second === SyntaxKind.CloseParenToken) {
                    // Simple cases: "() =>", "(): ", and  "() {".
                    // This is an arrow function with no parameters.
                    // The last one is not actually an arrow function,
                    // but this is probably what the user intended.
                    var third = nextToken();
                    switch (third) {
                        case SyntaxKind.EqualsGreaterThanToken:
                        case SyntaxKind.ColonToken:
                        case SyntaxKind.OpenBraceToken:
                            return Tristate.True;
                        default:
                            return Tristate.False;
                    }
                }

                // Simple case: "(..."
                // This is an arrow function with a rest parameter.
                if (second === SyntaxKind.DotDotDotToken) {
                    return Tristate.True;
                }

                // If we had "(" followed by something that's not an identifier,
                // then this definitely doesn't look like a lambda.
                // Note: we could be a little more lenient and allow
                // "(public" or "(private". These would not ever actually be allowed,
                // but we could provide a good error message instead of bailing out.
                if (!isIdentifier()) {
                    return Tristate.False;
                }

                // If we have something like "(a:", then we must have a
                // type-annotated parameter in an arrow function expression.
                if (nextToken() === SyntaxKind.ColonToken) {
                    return Tristate.True;
                }

                // This *could* be a parenthesized arrow function.
                // Return Unknown to let the caller know.
                return Tristate.Unknown;
            }
            else {
                Debug.assert(first === SyntaxKind.LessThanToken);

                // If we have "<" not followed by an identifier,
                // then this definitely is not an arrow function.
                if (!isIdentifier()) {
                    return Tristate.False;
                }

                // This *could* be a parenthesized arrow function.
                return Tristate.Unknown;
            }
        }

        function parsePossibleParenthesizedArrowFunctionExpressionHead() {
            return parseParenthesizedArrowFunctionExpressionHead(/*allowAmbiguity:*/ false);
        }

        function parseParenthesizedArrowFunctionExpressionHead(allowAmbiguity: boolean): FunctionExpression {
            var node = <FunctionExpression>createNode(SyntaxKind.ArrowFunction);
            // Arrow functions are never generators.
            //
            // If we're speculatively parsing a signature for a parenthesized arrow function, then
            // we have to have a complete parameter list.  Otherwise we might see something like
            // a => (b => c)
            // And think that "(b =>" was actually a parenthesized arrow function with a missing 
            // close paren.
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ !allowAmbiguity, node);

            // If we couldn't get parameters, we definitely could not parse out an arrow function.
            if (!node.parameters) {
                return undefined;
            }

            // Parsing a signature isn't enough.
            // Parenthesized arrow signatures often look like other valid expressions.
            // For instance:
            //  - "(x = 10)" is an assignment expression parsed as a signature with a default parameter value.
            //  - "(x,y)" is a comma expression parsed as a signature with two parameters.
            //  - "a ? (b): c" will have "(b):" parsed as a signature with a return type annotation.
            //
            // So we need just a bit of lookahead to ensure that it can only be a signature.
            if (!allowAmbiguity && token !== SyntaxKind.EqualsGreaterThanToken && token !== SyntaxKind.OpenBraceToken) {
                // Returning undefined here will cause our caller to rewind to where we started from.
                return undefined;
            }

            return node;
        }

        function parseArrowFunctionExpressionBody(): Block | Expression {
            if (token === SyntaxKind.OpenBraceToken) {
                return parseFunctionBlock(/*allowYield:*/ false, /* ignoreMissingOpenBrace */ false);
            }

            if (isStatement(/* inErrorRecovery */ true) && !isStartOfExpressionStatement() && token !== SyntaxKind.FunctionKeyword) {
                // Check if we got a plain statement (i.e. no expression-statements, no functions expressions/declarations)
                //
                // Here we try to recover from a potential error situation in the case where the 
                // user meant to supply a block. For example, if the user wrote:
                //
                //  a =>
                //      var v = 0;
                //  }
                //
                // they may be missing an open brace.  Check to see if that's the case so we can
                // try to recover better.  If we don't do this, then the next close curly we see may end
                // up preemptively closing the containing construct.
                //
                // Note: even when 'ignoreMissingOpenBrace' is passed as true, parseBody will still error.
                return parseFunctionBlock(/*allowYield:*/ false, /* ignoreMissingOpenBrace */ true);
            }

            return parseAssignmentExpressionOrHigher();
        }

        function parseConditionalExpressionRest(leftOperand: Expression): Expression {
            // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
            if (!parseOptional(SyntaxKind.QuestionToken)) {
                return leftOperand;
            }

            // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and 
            // we do not that for the 'whenFalse' part.  
            var node = <ConditionalExpression>createNode(SyntaxKind.ConditionalExpression, leftOperand.pos);
            node.condition = leftOperand;
            node.whenTrue = allowInAnd(parseAssignmentExpressionOrHigher);
            parseExpected(SyntaxKind.ColonToken);
            node.whenFalse = parseAssignmentExpressionOrHigher();
            return finishNode(node);
        }

        function parseBinaryExpressionOrHigher(precedence: number): Expression {
            var leftOperand = parseUnaryExpressionOrHigher();
            return parseBinaryExpressionRest(precedence, leftOperand);
        }

        function parseBinaryExpressionRest(precedence: number, leftOperand: Expression): Expression {
            while (true) {
                // We either have a binary operator here, or we're finished.  We call 
                // reScanGreaterToken so that we merge token sequences like > and = into >=

                reScanGreaterToken();
                var newPrecedence = getBinaryOperatorPrecedence();

                // Check the precedence to see if we should "take" this operator
                if (newPrecedence <= precedence) {
                    break;
                }
                
                if (token === SyntaxKind.InKeyword && inDisallowInContext()) {
                    break;
                }

                var operator = token;
                nextToken();
                leftOperand = makeBinaryExpression(leftOperand, operator, parseBinaryExpressionOrHigher(newPrecedence));
            }

            return leftOperand;
        }

        function isBinaryOperator() {
            if (inDisallowInContext() && token === SyntaxKind.InKeyword) {
                return false;
            }

            return getBinaryOperatorPrecedence() > 0;
        }

        function getBinaryOperatorPrecedence(): number {
            switch (token) {
                case SyntaxKind.BarBarToken:
                    return 1;
                case SyntaxKind.AmpersandAmpersandToken:
                    return 2;
                case SyntaxKind.BarToken:
                    return 3;
                case SyntaxKind.CaretToken:
                    return 4;
                case SyntaxKind.AmpersandToken:
                    return 5;
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                    return 6;
                case SyntaxKind.LessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.InstanceOfKeyword:
                case SyntaxKind.InKeyword:
                    return 7;
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                    return 8;
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                    return 9;
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                    return 10;
            }

            // -1 is lower than all other precedences.  Returning it will cause binary expression
            // parsing to stop.
            return -1;
        }

        function makeBinaryExpression(left: Expression, operator: SyntaxKind, right: Expression): BinaryExpression {
            var node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, left.pos);
            node.left = left;
            node.operator = operator;
            node.right = right;
            return finishNode(node);
        }

        function parsePrefixUnaryExpression() {
            var node = <PrefixUnaryExpression>createNode(SyntaxKind.PrefixUnaryExpression);
            node.operator = token;
            nextToken();
            node.operand = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseDeleteExpression() {
            var node = <DeleteExpression>createNode(SyntaxKind.DeleteExpression);
            nextToken();
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseTypeOfExpression() {
            var node = <TypeOfExpression>createNode(SyntaxKind.TypeOfExpression);
            nextToken();
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseVoidExpression() {
            var node = <VoidExpression>createNode(SyntaxKind.VoidExpression);
            nextToken();
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseUnaryExpressionOrHigher(): UnaryExpression {
            switch (token) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    return parsePrefixUnaryExpression();
                case SyntaxKind.DeleteKeyword:
                    return parseDeleteExpression();
                case SyntaxKind.TypeOfKeyword:
                    return parseTypeOfExpression();
                case SyntaxKind.VoidKeyword:
                    return parseVoidExpression();
                case SyntaxKind.LessThanToken:
                    return parseTypeAssertion();
                default:
                    return parsePostfixExpressionOrHigher();
            }
        }

        function parsePostfixExpressionOrHigher(): PostfixExpression {
            var expression = parseLeftHandSideExpressionOrHigher();

            Debug.assert(isLeftHandSideExpression(expression));
            if ((token === SyntaxKind.PlusPlusToken || token === SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
                var node = <PostfixUnaryExpression>createNode(SyntaxKind.PostfixUnaryExpression, expression.pos);
                node.operand = expression;
                node.operator = token;
                nextToken();
                return finishNode(node);
            }

            return expression;
        }

        function parseLeftHandSideExpressionOrHigher(): LeftHandSideExpression {
            // Original Ecma:
            // LeftHandSideExpression: See 11.2 
            //      NewExpression
            //      CallExpression 
            //
            // Our simplification:
            //
            // LeftHandSideExpression: See 11.2 
            //      MemberExpression  
            //      CallExpression 
            //
            // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
            // MemberExpression to make our lives easier.
            //
            // to best understand the below code, it's important to see how CallExpression expands
            // out into its own productions:
            //
            // CallExpression:
            //      MemberExpression Arguments 
            //      CallExpression Arguments
            //      CallExpression[Expression]
            //      CallExpression.IdentifierName
            //      super   (   ArgumentListopt   )
            //      super.IdentifierName
            //
            // Because of the recursion in these calls, we need to bottom out first.  There are two 
            // bottom out states we can run into.  Either we see 'super' which must start either of
            // the last two CallExpression productions.  Or we have a MemberExpression which either
            // completes the LeftHandSideExpression, or starts the beginning of the first four
            // CallExpression productions.
            var expression = token === SyntaxKind.SuperKeyword
                ? parseSuperExpression()
                : parseMemberExpressionOrHigher();

            // Now, we *may* be complete.  However, we might have consumed the start of a 
            // CallExpression.  As such, we need to consume the rest of it here to be complete.
            return parseCallExpressionRest(expression);
        }

        function parseMemberExpressionOrHigher(): MemberExpression {
            // Note: to make our lives simpler, we decompose the the NewExpression productions and
            // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
            // like so:
            //
            //   PrimaryExpression : See 11.1 
            //      this
            //      Identifier
            //      Literal
            //      ArrayLiteral
            //      ObjectLiteral
            //      (Expression) 
            //      FunctionExpression
            //      new MemberExpression Arguments?
            //
            //   MemberExpression : See 11.2 
            //      PrimaryExpression 
            //      MemberExpression[Expression]
            //      MemberExpression.IdentifierName
            //
            //   CallExpression : See 11.2 
            //      MemberExpression 
            //      CallExpression Arguments
            //      CallExpression[Expression]
            //      CallExpression.IdentifierName 
            //
            // Technically this is ambiguous.  i.e. CallExpression defines:
            //
            //   CallExpression:
            //      CallExpression Arguments
            // 
            // If you see: "new Foo()"
            //
            // Then that could be treated as a single ObjectCreationExpression, or it could be 
            // treated as the invocation of "new Foo".  We disambiguate that in code (to match
            // the original grammar) by making sure that if we see an ObjectCreationExpression
            // we always consume arguments if they are there. So we treat "new Foo()" as an
            // object creation only, and not at all as an invocation)  Another way to think 
            // about this is that for every "new" that we see, we will consume an argument list if
            // it is there as part of the *associated* object creation node.  Any additional
            // argument lists we see, will become invocation expressions.
            //
            // Because there are no other places in the grammar now that refer to FunctionExpression
            // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
            // production.
            //
            // Because CallExpression and MemberExpression are left recursive, we need to bottom out
            // of the recursion immediately.  So we parse out a primary expression to start with.
            var expression = parsePrimaryExpression();
            return parseMemberExpressionRest(expression); 
        }

        function parseSuperExpression(): MemberExpression {
            var expression = parseTokenNode<PrimaryExpression>();
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.DotToken) {
                return expression;
            }

            // If we have seen "super" it must be followed by '(' or '.'.
            // If it wasn't then just try to parse out a '.' and report an error.
            var node = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, expression.pos);
            node.expression = expression;
            parseExpected(SyntaxKind.DotToken, Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
            node.name = parseRightSideOfDot(/*allowIdentifierNames:*/ true);
            return finishNode(node);
        }

        function parseTypeAssertion(): TypeAssertion {
            var node = <TypeAssertion>createNode(SyntaxKind.TypeAssertionExpression);
            parseExpected(SyntaxKind.LessThanToken);
            node.type = parseType();
            parseExpected(SyntaxKind.GreaterThanToken);
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseMemberExpressionRest(expression: LeftHandSideExpression): MemberExpression {
            while (true) {
                var dotOrBracketStart = scanner.getTokenPos();
                if (parseOptional(SyntaxKind.DotToken)) {
                    var propertyAccess = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, expression.pos);
                    propertyAccess.expression = expression;
                    propertyAccess.name = parseRightSideOfDot(/*allowIdentifierNames:*/ true);
                    expression = finishNode(propertyAccess);
                    continue;
                }

                if (parseOptional(SyntaxKind.OpenBracketToken)) {
                    var indexedAccess = <ElementAccessExpression>createNode(SyntaxKind.ElementAccessExpression, expression.pos);
                    indexedAccess.expression = expression;

                    // It's not uncommon for a user to write: "new Type[]".
                    // Check for that common pattern and report a better error message.
                    if (token !== SyntaxKind.CloseBracketToken) {
                        indexedAccess.argumentExpression = allowInAnd(parseExpression);
                        if (indexedAccess.argumentExpression.kind === SyntaxKind.StringLiteral || indexedAccess.argumentExpression.kind === SyntaxKind.NumericLiteral) {
                            var literal = <LiteralExpression>indexedAccess.argumentExpression;
                            literal.text = internIdentifier(literal.text);
                        }
                    }

                    parseExpected(SyntaxKind.CloseBracketToken);
                    expression = finishNode(indexedAccess);
                    continue;
                }

                if (token === SyntaxKind.NoSubstitutionTemplateLiteral || token === SyntaxKind.TemplateHead) {
                    var tagExpression = <TaggedTemplateExpression>createNode(SyntaxKind.TaggedTemplateExpression, expression.pos);
                    tagExpression.tag = expression;
                    tagExpression.template = token === SyntaxKind.NoSubstitutionTemplateLiteral
                        ? parseLiteralNode()
                        : parseTemplateExpression();
                    expression = finishNode(tagExpression);
                    continue;
                }

                return <MemberExpression>expression;
            }
        }

        function parseCallExpressionRest(expression: LeftHandSideExpression): LeftHandSideExpression {
            while (true) {
                expression = parseMemberExpressionRest(expression);

                if (token === SyntaxKind.LessThanToken) {
                    // See if this is the start of a generic invocation.  If so, consume it and
                    // keep checking for postfix expressions.  Otherwise, it's just a '<' that's 
                    // part of an arithmetic expression.  Break out so we consume it higher in the
                    // stack.
                    var typeArguments = tryParse(parseTypeArgumentsInExpression);
                    if (!typeArguments) {
                        return expression;
                    }

                    var callExpr = <CallExpression>createNode(SyntaxKind.CallExpression, expression.pos);
                    callExpr.expression = expression;
                    callExpr.typeArguments = typeArguments;
                    callExpr.arguments = parseArgumentList();
                    expression = finishNode(callExpr);
                    continue;
                }
                else if (token === SyntaxKind.OpenParenToken) {
                    var callExpr = <CallExpression>createNode(SyntaxKind.CallExpression, expression.pos);
                    callExpr.expression = expression;
                    callExpr.arguments = parseArgumentList();
                    expression = finishNode(callExpr);
                    continue;
                }

                return expression;
            }
        }

        function parseArgumentList() {
            parseExpected(SyntaxKind.OpenParenToken);
            var result = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            return result;
        }

        function parseTypeArgumentsInExpression() {
            if (!parseOptional(SyntaxKind.LessThanToken)) {
                return undefined;
            }

            var typeArguments = parseDelimitedList(ParsingContext.TypeArguments, parseType);
            if (!parseExpected(SyntaxKind.GreaterThanToken)) {
                // If it doesn't have the closing >  then it's definitely not an type argument list.
                return undefined;
            }

            // If we have a '<', then only parse this as a arugment list if the type arguments
            // are complete and we have an open paren.  if we don't, rewind and return nothing.
            return typeArguments && canFollowTypeArgumentsInExpression()
                ? typeArguments
                : undefined;
        }
        
        function canFollowTypeArgumentsInExpression(): boolean {
            switch (token) {
                case SyntaxKind.OpenParenToken:                 // foo<x>(   
                // this case are the only case where this token can legally follow a type argument 
                // list.  So we definitely want to treat this as a type arg list.

                case SyntaxKind.DotToken:                       // foo<x>.
                case SyntaxKind.CloseParenToken:                // foo<x>)
                case SyntaxKind.CloseBracketToken:              // foo<x>]
                case SyntaxKind.ColonToken:                     // foo<x>:
                case SyntaxKind.SemicolonToken:                 // foo<x>;
                case SyntaxKind.CommaToken:                     // foo<x>,
                case SyntaxKind.QuestionToken:                  // foo<x>?
                case SyntaxKind.EqualsEqualsToken:              // foo<x> ==
                case SyntaxKind.EqualsEqualsEqualsToken:        // foo<x> ===
                case SyntaxKind.ExclamationEqualsToken:         // foo<x> !=
                case SyntaxKind.ExclamationEqualsEqualsToken:   // foo<x> !==
                case SyntaxKind.AmpersandAmpersandToken:        // foo<x> &&
                case SyntaxKind.BarBarToken:                    // foo<x> ||
                case SyntaxKind.CaretToken:                     // foo<x> ^
                case SyntaxKind.AmpersandToken:                 // foo<x> &
                case SyntaxKind.BarToken:                       // foo<x> |
                case SyntaxKind.CloseBraceToken:                // foo<x> }
                case SyntaxKind.EndOfFileToken:                 // foo<x>
                    // these cases can't legally follow a type arg list.  However, they're not legal 
                    // expressions either.  The user is probably in the middle of a generic type. So
                    // treat it as such.
                    return true;

                default:
                    // Anything else treat as an expression.
                    return false;
            }
        }

        function parsePrimaryExpression(): PrimaryExpression {
            switch (token) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return parseTokenNode<PrimaryExpression>();
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return parseLiteralNode();
                case SyntaxKind.OpenParenToken:
                    return parseParenthesizedExpression();
                case SyntaxKind.OpenBracketToken:
                    return parseArrayLiteralExpression();
                case SyntaxKind.OpenBraceToken:
                    return parseObjectLiteralExpression();
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionExpression();
                case SyntaxKind.NewKeyword:
                    return parseNewExpression();
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                    if (reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                        return parseLiteralNode();
                    }
                    break;
                case SyntaxKind.TemplateHead:
                    return parseTemplateExpression();
            }

            return parseIdentifier(Diagnostics.Expression_expected);
        }

        function parseParenthesizedExpression(): ParenthesizedExpression {
            var node = <ParenthesizedExpression>createNode(SyntaxKind.ParenthesizedExpression);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseAssignmentExpressionOrOmittedExpression(): Expression {
            return token === SyntaxKind.CommaToken
                ? <Expression>createNode(SyntaxKind.OmittedExpression)
                : parseAssignmentExpressionOrHigher();
        }

        function parseArrayLiteralElement(): Expression {
            return parseAssignmentExpressionOrOmittedExpression();
        }

        function parseArgumentExpression(): Expression {
            return allowInAnd(parseAssignmentExpressionOrOmittedExpression);
        }

        function parseArrayLiteralExpression(): ArrayLiteralExpression {
            var node = <ArrayLiteralExpression>createNode(SyntaxKind.ArrayLiteralExpression);
            parseExpected(SyntaxKind.OpenBracketToken);
            if (scanner.hasPrecedingLineBreak()) node.flags |= NodeFlags.MultiLine;
            node.elements = parseDelimitedList(ParsingContext.ArrayLiteralMembers, parseArrayLiteralElement);
            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function parseObjectLiteralElement(): ObjectLiteralElement {
            var fullStart = scanner.getStartPos();
            var initialToken = token;

            if (parseContextualModifier(SyntaxKind.GetKeyword) || parseContextualModifier(SyntaxKind.SetKeyword)) {
                var kind = initialToken === SyntaxKind.GetKeyword ? SyntaxKind.GetAccessor : SyntaxKind.SetAccessor;
                return parseAccessorDeclaration(kind, fullStart, /*modifiers*/undefined);
            }

            var asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            var tokenIsIdentifier = isIdentifier();
            var nameToken = token;
            var propertyName = parsePropertyName();
            if (asteriskToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return parseMethodDeclaration(fullStart, /*modifiers:*/ undefined, asteriskToken, propertyName, /*questionToken:*/ undefined, /*requireBlock:*/ true);
            }

            // Disallowing of optional property assignments happens in the grammar checker.
            var questionToken = parseOptionalToken(SyntaxKind.QuestionToken);

            // Parse to check if it is short-hand property assignment or normal property assignment
            if ((token === SyntaxKind.CommaToken || token === SyntaxKind.CloseBraceToken) && tokenIsIdentifier) {
                var shorthandDeclaration = <ShorthandPropertyAssignment>createNode(SyntaxKind.ShorthandPropertyAssignment, fullStart);
                shorthandDeclaration.name = <Identifier>propertyName;
                shorthandDeclaration.questionToken = questionToken;
                return finishNode(shorthandDeclaration);
            }
            else {
                var propertyAssignment = <PropertyAssignment>createNode(SyntaxKind.PropertyAssignment, fullStart);
                propertyAssignment.name = propertyName;
                propertyAssignment.questionToken = questionToken;
                parseExpected(SyntaxKind.ColonToken);
                propertyAssignment.initializer = allowInAnd(parseAssignmentExpressionOrHigher);
                return finishNode(propertyAssignment);
            }
        }

        function parseObjectLiteralExpression(): ObjectLiteralExpression {
            var node = <ObjectLiteralExpression>createNode(SyntaxKind.ObjectLiteralExpression);
            parseExpected(SyntaxKind.OpenBraceToken);
            if (scanner.hasPrecedingLineBreak()) {
                node.flags |= NodeFlags.MultiLine;
            }

            node.properties = parseDelimitedList(ParsingContext.ObjectLiteralMembers, parseObjectLiteralElement);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseFunctionExpression(): FunctionExpression {
            // GeneratorExpression :
            //      function * BindingIdentifier[Yield]opt (FormalParameters[Yield, GeneratorParameter]) { GeneratorBody[Yield] }
            // FunctionExpression:
            //      function BindingIdentifieropt(FormalParameters) { FunctionBody }
            var node = <FunctionExpression>createNode(SyntaxKind.FunctionExpression);
            parseExpected(SyntaxKind.FunctionKeyword);
            node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            node.name = node.asteriskToken ? doInYieldContext(parseOptionalIdentifier) : parseOptionalIdentifier();
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ !!node.asteriskToken, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlock(/*allowYield:*/ !!node.asteriskToken, /* ignoreMissingOpenBrace */ false);
            return finishNode(node);
        }

        function parseOptionalIdentifier() {
            return isIdentifier() ? parseIdentifier() : undefined;
        }

        function parseNewExpression(): NewExpression {
            var node = <NewExpression>createNode(SyntaxKind.NewExpression);
            parseExpected(SyntaxKind.NewKeyword);
            node.expression = parseMemberExpressionOrHigher();
            node.typeArguments = tryParse(parseTypeArgumentsInExpression);
            if (node.typeArguments || token === SyntaxKind.OpenParenToken) {
                node.arguments = parseArgumentList();
            }

            return finishNode(node);
        }

        // STATEMENTS
        function parseBlock(kind: SyntaxKind, ignoreMissingOpenBrace: boolean, checkForStrictMode: boolean): Block {
            var node = <Block>createNode(kind);
            if (parseExpected(SyntaxKind.OpenBraceToken) || ignoreMissingOpenBrace) {
                node.statements = parseList(ParsingContext.BlockStatements, checkForStrictMode, parseStatement);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.statements = createMissingList<Statement>();
            }
            return finishNode(node);
        }

        function parseFunctionBlock(allowYield: boolean, ignoreMissingOpenBrace: boolean): Block {
            var savedYieldContext = inYieldContext();
            setYieldContext(allowYield);

            var block = parseBlock(SyntaxKind.Block, ignoreMissingOpenBrace, /*checkForStrictMode*/ true);

            setYieldContext(savedYieldContext);

            return block;
        }

        function parseEmptyStatement(): Statement {
            var node = <Statement>createNode(SyntaxKind.EmptyStatement);
            parseExpected(SyntaxKind.SemicolonToken);
            return finishNode(node);
        }

        function parseIfStatement(): IfStatement {
            var node = <IfStatement>createNode(SyntaxKind.IfStatement);
            parseExpected(SyntaxKind.IfKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node.thenStatement = parseStatement();
            node.elseStatement = parseOptional(SyntaxKind.ElseKeyword) ? parseStatement() : undefined;
            return finishNode(node);
        }

        function parseDoStatement(): DoStatement {
            var node = <DoStatement>createNode(SyntaxKind.DoStatement);
            parseExpected(SyntaxKind.DoKeyword);
            node.statement = parseStatement();
            parseExpected(SyntaxKind.WhileKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);

            // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
            // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in 
            // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
            //  do;while(0)x will have a semicolon inserted before x.
            parseOptional(SyntaxKind.SemicolonToken);
            return finishNode(node);
        }

        function parseWhileStatement(): WhileStatement {
            var node = <WhileStatement>createNode(SyntaxKind.WhileStatement);
            parseExpected(SyntaxKind.WhileKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseForOrForInStatement(): Statement {
            var pos = getNodePos();
            parseExpected(SyntaxKind.ForKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            if (token !== SyntaxKind.SemicolonToken) {
                if (parseOptional(SyntaxKind.VarKeyword)) {
                    var declarations = disallowInAnd(parseVariableDeclarationList);
                }
                else if (parseOptional(SyntaxKind.LetKeyword)) {
                    var declarations = setFlag(disallowInAnd(parseVariableDeclarationList), NodeFlags.Let);
                }
                else if (parseOptional(SyntaxKind.ConstKeyword)) {
                    var declarations = setFlag(disallowInAnd(parseVariableDeclarationList), NodeFlags.Const);
                }
                else {
                    var varOrInit = disallowInAnd(parseExpression);
                }
            }
            var forOrForInStatement: IterationStatement;
            if (parseOptional(SyntaxKind.InKeyword)) {
                var forInStatement = <ForInStatement>createNode(SyntaxKind.ForInStatement, pos);
                if (declarations) {
                    forInStatement.declarations = declarations;
                }
                else {
                    forInStatement.variable = varOrInit;
                }
                forInStatement.expression = allowInAnd(parseExpression);
                parseExpected(SyntaxKind.CloseParenToken);
                forOrForInStatement = forInStatement;
            }
            else {
                var forStatement = <ForStatement>createNode(SyntaxKind.ForStatement, pos);
                if (declarations) {
                    forStatement.declarations = declarations;
                }
                if (varOrInit) {
                    forStatement.initializer = varOrInit;
                }

                parseExpected(SyntaxKind.SemicolonToken);
                if (token !== SyntaxKind.SemicolonToken && token !== SyntaxKind.CloseParenToken) {
                    forStatement.condition = allowInAnd(parseExpression);
                }
                parseExpected(SyntaxKind.SemicolonToken);
                if (token !== SyntaxKind.CloseParenToken) {
                    forStatement.iterator = allowInAnd(parseExpression);
                }
                parseExpected(SyntaxKind.CloseParenToken);
                forOrForInStatement = forStatement;
            }

            forOrForInStatement.statement = parseStatement();

            return finishNode(forOrForInStatement);
        }

        function parseBreakOrContinueStatement(kind: SyntaxKind): BreakOrContinueStatement {
            var node = <BreakOrContinueStatement>createNode(kind);

            parseExpected(kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword);
            if (!canParseSemicolon()) {
                node.label = parseIdentifier();
            }

            parseSemicolon();
            return finishNode(node);
        }

        function parseReturnStatement(): ReturnStatement {
            var node = <ReturnStatement>createNode(SyntaxKind.ReturnStatement);

            parseExpected(SyntaxKind.ReturnKeyword);
            if (!canParseSemicolon()) {
                node.expression = allowInAnd(parseExpression);
            }

            parseSemicolon();
            return finishNode(node);
        }

        function parseWithStatement(): WithStatement {
            var node = <WithStatement>createNode(SyntaxKind.WithStatement);
            parseExpected(SyntaxKind.WithKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseCaseClause(): CaseClause {
            var node = <CaseClause>createNode(SyntaxKind.CaseClause);
            parseExpected(SyntaxKind.CaseKeyword);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.ColonToken);
            node.statements = parseList(ParsingContext.SwitchClauseStatements, /*checkForStrictMode*/ false, parseStatement);
            return finishNode(node);
        }

        function parseDefaultClause(): DefaultClause {
            var node = <DefaultClause>createNode(SyntaxKind.DefaultClause);
            parseExpected(SyntaxKind.DefaultKeyword);
            parseExpected(SyntaxKind.ColonToken);
            node.statements = parseList(ParsingContext.SwitchClauseStatements, /*checkForStrictMode*/ false, parseStatement);
            return finishNode(node);
        }

        function parseCaseOrDefaultClause(): CaseOrDefaultClause {
            return token === SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
        }

        function parseSwitchStatement(): SwitchStatement {
            var node = <SwitchStatement>createNode(SyntaxKind.SwitchStatement);
            parseExpected(SyntaxKind.SwitchKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            parseExpected(SyntaxKind.OpenBraceToken);
            node.clauses = parseList(ParsingContext.SwitchClauses, /*checkForStrictMode*/ false, parseCaseOrDefaultClause);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseThrowStatement(): ThrowStatement {
            // ThrowStatement[Yield] :
            //      throw [no LineTerminator here]Expression[In, ?Yield];

            // Because of automatic semicolon insertion, we need to report error if this 
            // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
            // directly as that might consume an expression on the following line.  
            // We just return 'undefined' in that case.  The actual error will be reported in the
            // grammar walker.
            var node = <ThrowStatement>createNode(SyntaxKind.ThrowStatement);
            parseExpected(SyntaxKind.ThrowKeyword);
            node.expression = scanner.hasPrecedingLineBreak() ? undefined : allowInAnd(parseExpression);
            parseSemicolon();
            return finishNode(node);
        }

        // TODO: Review for error recovery
        function parseTryStatement(): TryStatement {
            var node = <TryStatement>createNode(SyntaxKind.TryStatement);
            node.tryBlock = parseTokenAndBlock(SyntaxKind.TryKeyword);
            node.catchClause = token === SyntaxKind.CatchKeyword ? parseCatchClause() : undefined;

            // If we don't have a catch clause, then we must have a finally clause.  Try to parse
            // one out no matter what.
            node.finallyBlock = !node.catchClause || token === SyntaxKind.FinallyKeyword
                ? parseTokenAndBlock(SyntaxKind.FinallyKeyword)
                : undefined;
            return finishNode(node);
        }

        function parseTokenAndBlock(token: SyntaxKind): Block {
            var pos = getNodePos();
            parseExpected(token);
            var result = parseBlock(
                token === SyntaxKind.TryKeyword ? SyntaxKind.TryBlock : SyntaxKind.FinallyBlock,
                /* ignoreMissingOpenBrace */ false, /*checkForStrictMode*/ false);
            result.pos = pos;
            return result;
        }

        function parseCatchClause(): CatchClause {
            var result = <CatchClause>createNode(SyntaxKind.CatchClause);
            parseExpected(SyntaxKind.CatchKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            result.name = parseIdentifier();
            result.type = parseTypeAnnotation();
            parseExpected(SyntaxKind.CloseParenToken);
            result.block = parseBlock(SyntaxKind.Block, /* ignoreMissingOpenBrace */ false, /*checkForStrictMode*/ false);
            return finishNode(result);
        }

        function parseDebuggerStatement(): Statement {
            var node = <Statement>createNode(SyntaxKind.DebuggerStatement);
            parseExpected(SyntaxKind.DebuggerKeyword);
            parseSemicolon();
            return finishNode(node);
        }

        function isLabel(): boolean {
            return isIdentifier() && lookAhead(nextTokenIsColonToken);
        }

        function nextTokenIsColonToken() {
            return nextToken() === SyntaxKind.ColonToken;
        }

        function parseLabeledStatement(): LabeledStatement {
            var node = <LabeledStatement>createNode(SyntaxKind.LabeledStatement);
            node.label = parseIdentifier();
            parseExpected(SyntaxKind.ColonToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseExpressionStatement(): ExpressionStatement {
            var node = <ExpressionStatement>createNode(SyntaxKind.ExpressionStatement);
            node.expression = allowInAnd(parseExpression);
            parseSemicolon();
            return finishNode(node);
        }

        function isStatement(inErrorRecovery: boolean): boolean {
            switch (token) {
                case SyntaxKind.SemicolonToken:
                    // If we're in error recovery, then we don't want to treat ';' as an empty statement.
                    // The problem is that ';' can show up in far too many contexts, and if we see one
                    // and assume it's a statement, then we may bail out inappropriately from whatever
                    // we're parsing.  For example, if we have a semicolon in the middle of a class, then
                    // we really don't want to assume the class is over and we're on a statement in the
                    // outer module.  We just want to consume and move on.
                    return !inErrorRecovery;
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.VarKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.IfKeyword:
                case SyntaxKind.DoKeyword:
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.ForKeyword:
                case SyntaxKind.ContinueKeyword:
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.ReturnKeyword:
                case SyntaxKind.WithKeyword:
                case SyntaxKind.SwitchKeyword:
                case SyntaxKind.ThrowKeyword:
                case SyntaxKind.TryKeyword:
                case SyntaxKind.DebuggerKeyword:
                // 'catch' and 'finally' do not actually indicate that the code is part of a statement,
                // however, we say they are here so that we may gracefully parse them and error later.
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.FinallyKeyword:
                    return true;
                case SyntaxKind.ConstKeyword:
                    // const keyword can precede enum keyword when defining constant enums
                    // 'const enum' do not start statement.
                    // In ES 6 'enum' is a future reserved keyword, so it should not be used as identifier
                    var isConstEnum = lookAhead(nextTokenIsEnumKeyword);
                    return !isConstEnum;
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.ModuleKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.TypeKeyword:
                    // When followed by an identifier, these do not start a statement but might
                    // instead be following declarations
                    if (isDeclarationStart()) {
                        return false;
                    }

                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    // When followed by an identifier or keyword, these do not start a statement but
                    // might instead be following type members
                    if (lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine)) {
                        return false;
                    }
                default:
                    return isStartOfExpression();
            }
        }

        function nextTokenIsEnumKeyword() {
            nextToken();
            return token === SyntaxKind.EnumKeyword
        }

        function nextTokenIsIdentifierOrKeywordOnSameLine() {
            nextToken();
            return isIdentifierOrKeyword() && !scanner.hasPrecedingLineBreak();
        }

        function parseStatement(): Statement {
            switch (token) {
                case SyntaxKind.OpenBraceToken:
                    return parseBlock(SyntaxKind.Block, /* ignoreMissingOpenBrace */ false, /*checkForStrictMode*/ false);
                case SyntaxKind.VarKeyword:
                case SyntaxKind.ConstKeyword:
                    // const here should always be parsed as const declaration because of check in 'isStatement' 
                    return parseVariableStatement(scanner.getStartPos(), /*modifiers:*/ undefined);
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionDeclaration(scanner.getStartPos(), /*modifiers:*/ undefined);
                case SyntaxKind.SemicolonToken:
                    return parseEmptyStatement();
                case SyntaxKind.IfKeyword:
                    return parseIfStatement();
                case SyntaxKind.DoKeyword:
                    return parseDoStatement();
                case SyntaxKind.WhileKeyword:
                    return parseWhileStatement();
                case SyntaxKind.ForKeyword:
                    return parseForOrForInStatement();
                case SyntaxKind.ContinueKeyword:
                    return parseBreakOrContinueStatement(SyntaxKind.ContinueStatement);
                case SyntaxKind.BreakKeyword:
                    return parseBreakOrContinueStatement(SyntaxKind.BreakStatement);
                case SyntaxKind.ReturnKeyword:
                    return parseReturnStatement();
                case SyntaxKind.WithKeyword:
                    return parseWithStatement();
                case SyntaxKind.SwitchKeyword:
                    return parseSwitchStatement();
                case SyntaxKind.ThrowKeyword:
                    return parseThrowStatement();
                case SyntaxKind.TryKeyword:
                // Include the next two for error recovery.
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.FinallyKeyword:
                    return parseTryStatement();
                case SyntaxKind.DebuggerKeyword:
                    return parseDebuggerStatement();
                case SyntaxKind.LetKeyword:
                    // If let follows identifier on the same line, it is declaration parse it as variable statement
                    if (isLetDeclaration()) {
                        return parseVariableStatement(scanner.getStartPos(), /*modifiers:*/ undefined);
                    }
                    // Else parse it like identifier - fall through
                default:
                    return isLabel()
                        ? parseLabeledStatement()
                        : parseExpressionStatement();
            }
        }

        function parseFunctionBlockOrSemicolon(isGenerator: boolean): Block {
            if (token === SyntaxKind.OpenBraceToken) {
                return parseFunctionBlock(isGenerator, /*ignoreMissingOpenBrace:*/ false);
            }

            parseSemicolon(Diagnostics.or_expected);
            return undefined;
        }

        // DECLARATIONS

        function parseBindingElement(context: ParsingContext): BindingElement {
            if (context === ParsingContext.ArrayBindingElements && token === SyntaxKind.CommaToken) {
                return <BindingElement>createNode(SyntaxKind.OmittedExpression);
            }
            var node = <BindingElement>createNode(SyntaxKind.BindingElement);
            if (context === ParsingContext.ObjectBindingElements) {
                // TODO(andersh): Handle computed properties
                var id = parsePropertyName();
                if (id.kind === SyntaxKind.Identifier && token !== SyntaxKind.ColonToken) {
                    node.name = <Identifier>id;
                }
                else {
                    parseExpected(SyntaxKind.ColonToken);
                    node.propertyName = <Identifier>id;
                    node.name = parseIdentifierOrPattern();
                }
            }
            else {
                node.name = parseIdentifierOrPattern();
            }
            node.initializer = parseInitializer(/*inParameter*/ false);
            return finishNode(node);
        }

        function parseBindingList(context: ParsingContext): NodeArray<BindingElement> {
            return parseDelimitedList(context, () => parseBindingElement(context));
        }

        function parseObjectBindingPattern(): BindingPattern {
            var node = <BindingPattern>createNode(SyntaxKind.ObjectBindingPattern);
            parseExpected(SyntaxKind.OpenBraceToken);
            node.elements = parseBindingList(ParsingContext.ObjectBindingElements);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseArrayBindingPattern(): BindingPattern {
            var node = <BindingPattern>createNode(SyntaxKind.ArrayBindingPattern);
            parseExpected(SyntaxKind.OpenBracketToken);
            node.elements = parseBindingList(ParsingContext.ArrayBindingElements);
            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function isIdentifierOrPattern() {
            return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.OpenBracketToken || isIdentifier();
        }

        function parseIdentifierOrPattern(): Identifier | BindingPattern {
            if (token === SyntaxKind.OpenBracketToken) {
                return parseArrayBindingPattern();
            }
            if (token === SyntaxKind.OpenBraceToken) {
                return parseObjectBindingPattern();
            }
            return parseIdentifier();
        }

        function parseVariableDeclaration(): VariableDeclaration {
            var node = <VariableDeclaration>createNode(SyntaxKind.VariableDeclaration);
            node.name = parseIdentifierOrPattern();
            node.type = parseTypeAnnotation();
            node.initializer = parseInitializer(/*inParameter*/ false);
            return finishNode(node);
        }

        function setFlag(nodes: NodeArray<VariableDeclaration>, flag: NodeFlags): NodeArray<VariableDeclaration> {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                node.flags |= flag;
                if (node.name && isBindingPattern(node.name)) {
                    setFlag((<BindingPattern>node.name).elements, flag);
                }
            }
            return nodes;
        }

        function parseVariableDeclarationList(): NodeArray<VariableDeclaration> {
            return parseDelimitedList(ParsingContext.VariableDeclarations, parseVariableDeclaration);
        }

        function parseVariableStatement(fullStart: number, modifiers: ModifiersArray): VariableStatement {
            var node = <VariableStatement>createNode(SyntaxKind.VariableStatement, fullStart);
            setModifiers(node, modifiers);

            if (token === SyntaxKind.LetKeyword) {
                node.flags |= NodeFlags.Let;
            }
            else if (token === SyntaxKind.ConstKeyword) {
                node.flags |= NodeFlags.Const;
            }
            else {
                Debug.assert(token === SyntaxKind.VarKeyword);
            }

            nextToken();
            node.declarations = allowInAnd(parseVariableDeclarationList);
            setFlag(node.declarations, node.flags);

            parseSemicolon();
            return finishNode(node);
        }

        function parseFunctionDeclaration(fullStart: number, modifiers: ModifiersArray): FunctionDeclaration {
            var node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.FunctionKeyword);
            node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            node.name = parseIdentifier();
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ !!node.asteriskToken, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlockOrSemicolon(!!node.asteriskToken);
            return finishNode(node);
        }

        function parseConstructorDeclaration(pos: number, modifiers: ModifiersArray): ConstructorDeclaration {
            var node = <ConstructorDeclaration>createNode(SyntaxKind.Constructor, pos);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.ConstructorKeyword);
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlockOrSemicolon(/*isGenerator:*/ false);
            return finishNode(node);
        }

        function parseMethodDeclaration(fullStart: number, modifiers: ModifiersArray, asteriskToken: Node, name: DeclarationName, questionToken: Node, requireBlock: boolean): MethodDeclaration {
            var method = <MethodDeclaration>createNode(SyntaxKind.MethodDeclaration, fullStart);
            setModifiers(method, modifiers);
            method.asteriskToken = asteriskToken;
            method.name = name;
            method.questionToken = questionToken;
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ !!asteriskToken, /*requireCompleteParameterList:*/ false, method);
            method.body = requireBlock ? parseFunctionBlock(!!asteriskToken, /*ignoreMissingOpenBrace:*/ false) : parseFunctionBlockOrSemicolon(!!asteriskToken);
            return finishNode(method);
        }

        function parsePropertyOrMethodDeclaration(fullStart: number, modifiers: ModifiersArray): ClassElement {
            var asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            var name = parsePropertyName();

            // Note: this is not legal as per the grammar.  But we allow it in the parser and
            // report an error in the grammar checker.
            var questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
            if (asteriskToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return parseMethodDeclaration(fullStart, modifiers, asteriskToken, name, questionToken, /*requireBlock:*/ false);
            }
            else {
                var property = <PropertyDeclaration>createNode(SyntaxKind.PropertyDeclaration, fullStart);
                setModifiers(property, modifiers);
                property.name = name;
                property.questionToken = questionToken;
                property.type = parseTypeAnnotation();
                property.initializer = allowInAnd(parseNonParameterInitializer);
                parseSemicolon();
                return finishNode(property);
            }
        }

        function parseNonParameterInitializer() {
            return parseInitializer(/*inParameter*/ false);
        }

        function parseAccessorDeclaration(kind: SyntaxKind, fullStart: number, modifiers: ModifiersArray): AccessorDeclaration {
            var node = <AccessorDeclaration>createNode(kind, fullStart);
            setModifiers(node, modifiers);
            node.name = parsePropertyName();
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlockOrSemicolon(/*isGenerator:*/ false);
            return finishNode(node);
        }

        function isClassMemberStart(): boolean {
            var idToken: SyntaxKind;

            // Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
            while (isModifier(token)) {
                idToken = token;
                nextToken();
            }

            if (token === SyntaxKind.AsteriskToken) {
                return true;
            }

            // Try to get the first property-like token following all modifiers.
            // This can either be an identifier or the 'get' or 'set' keywords.
            if (isLiteralPropertyName()) {
                idToken = token;
                nextToken();
            }

            // Index signatures and computed properties are class members; we can parse.
            if (token === SyntaxKind.OpenBracketToken) {
                return true;
            }
            
            // If we were able to get any potential identifier...
            if (idToken !== undefined) {
                // If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
                if (!isKeyword(idToken) || idToken === SyntaxKind.SetKeyword || idToken === SyntaxKind.GetKeyword) {
                    return true;
                }

                // If it *is* a keyword, but not an accessor, check a little farther along
                // to see if it should actually be parsed as a class member.
                switch (token) {
                    case SyntaxKind.OpenParenToken:     // Method declaration
                    case SyntaxKind.LessThanToken:      // Generic Method declaration
                    case SyntaxKind.ColonToken:         // Type Annotation for declaration
                    case SyntaxKind.EqualsToken:        // Initializer for declaration
                    case SyntaxKind.QuestionToken:      // Not valid, but permitted so that it gets caught later on.
                        return true;
                    default:
                        // Covers
                        //  - Semicolons     (declaration termination)
                        //  - Closing braces (end-of-class, must be declaration)
                        //  - End-of-files   (not valid, but permitted so that it gets caught later on)
                        //  - Line-breaks    (enabling *automatic semicolon insertion*)
                        return canParseSemicolon();
                }
            }

            return false;
        }

        function parseModifiers(): ModifiersArray {
            var flags = 0;
            var modifiers: ModifiersArray;
            while (true) {
                var modifierStart = scanner.getStartPos();
                var modifierKind = token;

                if (!parseAnyContextualModifier()) {
                    break;
                }

                if (!modifiers) {
                    modifiers = <ModifiersArray>[];
                    modifiers.pos = modifierStart;
                }
                flags |= modifierToFlag(modifierKind);
                modifiers.push(finishNode(createNode(modifierKind, modifierStart))); 
            }
            if (modifiers) {
                modifiers.flags = flags;
                modifiers.end = scanner.getStartPos();
            }
            return modifiers;
        }

        function parseClassElement(): ClassElement {
            var fullStart = getNodePos();
            var modifiers = parseModifiers();
            if (parseContextualModifier(SyntaxKind.GetKeyword)) {
                return parseAccessorDeclaration(SyntaxKind.GetAccessor, fullStart, modifiers);
            }
            if (parseContextualModifier(SyntaxKind.SetKeyword)) {
                return parseAccessorDeclaration(SyntaxKind.SetAccessor, fullStart, modifiers);
            }
            if (token === SyntaxKind.ConstructorKeyword) {
                return parseConstructorDeclaration(fullStart, modifiers);
            }
            if (isIndexSignature()) {
                return parseIndexSignatureDeclaration(fullStart, modifiers);
            }
            // It is very important that we check this *after* checking indexers because
            // the [ token can start an index signature or a computed property name
            if (isIdentifierOrKeyword() || token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral ||
                token === SyntaxKind.AsteriskToken || token === SyntaxKind.OpenBracketToken) {
                return parsePropertyOrMethodDeclaration(fullStart, modifiers);
            }

            // 'isClassMemberStart' should have hinted not to attempt parsing.
            Debug.fail("Should not have attempted to parse class member declaration.");
        }

        function parseClassDeclaration(fullStart: number, modifiers: ModifiersArray): ClassDeclaration {
            var node = <ClassDeclaration>createNode(SyntaxKind.ClassDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.ClassKeyword);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            node.heritageClauses = parseHeritageClauses(/*isClassHeritageClause:*/ true);

            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                // ClassTail[Yield,GeneratorParameter] : See 14.5
                //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
                //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }

                node.members = inGeneratorParameterContext()
                    ? doOutsideOfYieldContext(parseClassMembers)
                    : parseClassMembers();
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<ClassElement>();
            }
            return finishNode(node);
        }

        function parseHeritageClauses(isClassHeritageClause: boolean): NodeArray<HeritageClause> {
            // ClassTail[Yield,GeneratorParameter] : See 14.5
            //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
            //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }

            if (isHeritageClause()) {
                return isClassHeritageClause && inGeneratorParameterContext()
                    ? doOutsideOfYieldContext(parseHeritageClausesWorker)
                    : parseHeritageClausesWorker();
            }

            return undefined;
        }

        function parseHeritageClausesWorker() {
            return parseList(ParsingContext.HeritageClauses, /*checkForStrictMode:*/ false, parseHeritageClause);
        }

        function parseHeritageClause() {
            if (token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword) {
                var node = <HeritageClause>createNode(SyntaxKind.HeritageClause);
                node.token = token;
                nextToken();
                node.types = parseDelimitedList(ParsingContext.TypeReferences, parseTypeReference);
                return finishNode(node);
            }

            return undefined;
        }

        function isHeritageClause(): boolean {
            return token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
        }

        function parseClassMembers() {
            return parseList(ParsingContext.ClassMembers, /*checkForStrictMode*/ false, parseClassElement);
        }

        function parseInterfaceDeclaration(fullStart: number, modifiers: ModifiersArray): InterfaceDeclaration {
            var node = <InterfaceDeclaration>createNode(SyntaxKind.InterfaceDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.InterfaceKeyword);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            node.heritageClauses = parseHeritageClauses(/*isClassHeritageClause:*/ false);
            node.members = parseObjectTypeMembers();
            return finishNode(node);
        }

        function parseTypeAliasDeclaration(fullStart: number, modifiers: ModifiersArray): TypeAliasDeclaration {
            var node = <TypeAliasDeclaration>createNode(SyntaxKind.TypeAliasDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.TypeKeyword);
            node.name = parseIdentifier();
            parseExpected(SyntaxKind.EqualsToken);
            node.type = parseType();
            parseSemicolon();
            return finishNode(node);
        }

        // In an ambient declaration, the grammar only allows integer literals as initializers.
        // In a non-ambient declaration, the grammar allows uninitialized members only in a
        // ConstantEnumMemberSection, which starts at the beginning of an enum declaration
        // or any time an integer literal initializer is encountered.
        function parseEnumMember(): EnumMember {
            var node = <EnumMember>createNode(SyntaxKind.EnumMember, scanner.getStartPos());
            node.name = parsePropertyName();
            node.initializer = allowInAnd(parseNonParameterInitializer);
            return finishNode(node);
        }

        function parseEnumDeclaration(fullStart: number, modifiers: ModifiersArray): EnumDeclaration {
            var node = <EnumDeclaration>createNode(SyntaxKind.EnumDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.EnumKeyword);
            node.name = parseIdentifier();
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.members = parseDelimitedList(ParsingContext.EnumMembers, parseEnumMember);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<EnumMember>();
            }
            return finishNode(node);
        }

        function parseModuleBlock(): ModuleBlock {
            var node = <ModuleBlock>createNode(SyntaxKind.ModuleBlock, scanner.getStartPos());
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.statements = parseList(ParsingContext.ModuleElements, /*checkForStrictMode*/false, parseModuleElement);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.statements = createMissingList<Statement>();
            }
            return finishNode(node);
        }

        function parseInternalModuleTail(fullStart: number, modifiers: ModifiersArray, flags: NodeFlags): ModuleDeclaration {
            var node = <ModuleDeclaration>createNode(SyntaxKind.ModuleDeclaration, fullStart);
            setModifiers(node, modifiers);
            node.flags |= flags;
            node.name = parseIdentifier();
            node.body = parseOptional(SyntaxKind.DotToken)
                ? parseInternalModuleTail(getNodePos(), /*modifiers:*/undefined, NodeFlags.Export)
                : parseModuleBlock();
            return finishNode(node);
        }

        function parseAmbientExternalModuleDeclaration(fullStart: number, modifiers: ModifiersArray): ModuleDeclaration {
            var node = <ModuleDeclaration>createNode(SyntaxKind.ModuleDeclaration, fullStart);
            setModifiers(node, modifiers);
            node.name = parseLiteralNode(/*internName:*/ true);
            node.body = parseModuleBlock();
            return finishNode(node);
        }

        function parseModuleDeclaration(fullStart: number, modifiers: ModifiersArray): ModuleDeclaration {
            parseExpected(SyntaxKind.ModuleKeyword);
            return token === SyntaxKind.StringLiteral 
                ? parseAmbientExternalModuleDeclaration(fullStart, modifiers)
                : parseInternalModuleTail(fullStart, modifiers, modifiers? modifiers.flags : 0);
        }

        function isExternalModuleReference() {
            return token === SyntaxKind.RequireKeyword &&
                lookAhead(nextTokenIsOpenParen);
        }

        function nextTokenIsOpenParen() {
            return nextToken() === SyntaxKind.OpenParenToken;
        }

        function parseImportDeclaration(fullStart: number, modifiers: ModifiersArray): ImportDeclaration {
            var node = <ImportDeclaration>createNode(SyntaxKind.ImportDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.ImportKeyword);
            node.name = parseIdentifier();
            parseExpected(SyntaxKind.EqualsToken);
            node.moduleReference = parseModuleReference();
            parseSemicolon();
            return finishNode(node);
        }

        function parseModuleReference() {
            return isExternalModuleReference()
                ? parseExternalModuleReference()
                : parseEntityName(/*allowReservedWords*/ false);
        }

        function parseExternalModuleReference() {
            var node = <ExternalModuleReference>createNode(SyntaxKind.ExternalModuleReference);
            parseExpected(SyntaxKind.RequireKeyword);
            parseExpected(SyntaxKind.OpenParenToken);

            // We allow arbitrary expressions here, even though the grammar only allows string 
            // literals.  We check to ensure that it is only a string literal later in the grammar
            // walker.
            node.expression = parseExpression();

            // Ensure the string being required is in our 'identifier' table.  This will ensure 
            // that features like 'find refs' will look inside this file when search for its name.
            if (node.expression.kind === SyntaxKind.StringLiteral) {
                internIdentifier((<LiteralExpression>node.expression).text);
            }

            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseExportAssignmentTail(fullStart: number, modifiers: ModifiersArray): ExportAssignment {
            var node = <ExportAssignment>createNode(SyntaxKind.ExportAssignment, fullStart);
            setModifiers(node, modifiers);
            node.exportName = parseIdentifier();
            parseSemicolon();
            return finishNode(node);
        }
        
        function isLetDeclaration() {
            // It is let declaration if in strict mode or next token is identifier on same line.
            // otherwise it needs to be treated like identifier
            return inStrictModeContext() || lookAhead(nextTokenIsIdentifierOnSameLine);
        }

        function isDeclarationStart(): boolean {
            switch (token) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.FunctionKeyword:
                    return true;
                case SyntaxKind.LetKeyword:
                    return isLetDeclaration(); 
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.ImportKeyword:
                case SyntaxKind.TypeKeyword:
                    // Not true keywords so ensure an identifier follows
                    return lookAhead(nextTokenIsIdentifierOrKeyword);
                case SyntaxKind.ModuleKeyword:
                    // Not a true keyword so ensure an identifier or string literal follows
                    return lookAhead(nextTokenIsIdentifierOrKeywordOrStringLiteral);
                case SyntaxKind.ExportKeyword:
                    // Check for export assignment or modifier on source element
                    return lookAhead(nextTokenIsEqualsTokenOrDeclarationStart);
                case SyntaxKind.DeclareKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    // Check for modifier on source element
                    return lookAhead(nextTokenIsDeclarationStart);
            }
        }

        function isIdentifierOrKeyword() {
            return token >= SyntaxKind.Identifier;
        }

        function nextTokenIsIdentifierOrKeyword() {
            nextToken();
            return isIdentifierOrKeyword();
        }

        function nextTokenIsIdentifierOrKeywordOrStringLiteral() {
            nextToken();
            return isIdentifierOrKeyword() || token === SyntaxKind.StringLiteral;
        }

        function nextTokenIsEqualsTokenOrDeclarationStart() {
            nextToken();
            return token === SyntaxKind.EqualsToken || isDeclarationStart();
        }

        function nextTokenIsDeclarationStart() {
            nextToken();
            return isDeclarationStart();
        }

        function parseDeclaration(): ModuleElement {
            var fullStart = getNodePos();
            var modifiers = parseModifiers();
            if (token === SyntaxKind.ExportKeyword) {
                nextToken();
                if (parseOptional(SyntaxKind.EqualsToken)) {
                    return parseExportAssignmentTail(fullStart, modifiers);
                }
            }

            switch (token) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                    return parseVariableStatement(fullStart, modifiers);
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionDeclaration(fullStart, modifiers);
                case SyntaxKind.ClassKeyword:
                    return parseClassDeclaration(fullStart, modifiers);
                case SyntaxKind.InterfaceKeyword:
                    return parseInterfaceDeclaration(fullStart, modifiers);
                case SyntaxKind.TypeKeyword:
                    return parseTypeAliasDeclaration(fullStart, modifiers);
                case SyntaxKind.EnumKeyword:
                    return parseEnumDeclaration(fullStart, modifiers);
                case SyntaxKind.ModuleKeyword:
                    return parseModuleDeclaration(fullStart, modifiers);
                case SyntaxKind.ImportKeyword:
                    return parseImportDeclaration(fullStart, modifiers);
                default:
                    Debug.fail("Mismatch between isDeclarationStart and parseDeclaration");
            }
        }

        function isSourceElement(inErrorRecovery: boolean): boolean {
            return isDeclarationStart() || isStatement(inErrorRecovery);
        }

        function parseSourceElement() {
            return parseSourceElementOrModuleElement();
        }

        function parseModuleElement() {
            return parseSourceElementOrModuleElement();
        }

        function parseSourceElementOrModuleElement(): ModuleElement {
            return isDeclarationStart()
                ? parseDeclaration()
                : parseStatement();
        }

        function processReferenceComments(): void {
            var triviaScanner = createScanner(languageVersion, /*skipTrivia*/false, sourceText);
            var referencedFiles: FileReference[] = [];
            var amdDependencies: string[] = [];
            var amdModuleName: string;

            // Keep scanning all the leading trivia in the file until we get to something that 
            // isn't trivia.  Any single line comment will be analyzed to see if it is a 
            // reference comment.
            while (true) {
                var kind = triviaScanner.scan();
                if (kind === SyntaxKind.WhitespaceTrivia || kind === SyntaxKind.NewLineTrivia || kind === SyntaxKind.MultiLineCommentTrivia) {
                    continue;
                }
                if (kind !== SyntaxKind.SingleLineCommentTrivia) {
                    break;
                }

                var range = { pos: triviaScanner.getTokenPos(), end: triviaScanner.getTextPos() };

                var comment = sourceText.substring(range.pos, range.end);
                var referencePathMatchResult = getFileReferenceFromReferencePath(comment, range);
                if (referencePathMatchResult) {
                    var fileReference = referencePathMatchResult.fileReference;
                    sourceFile.hasNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
                    var diagnosticMessage = referencePathMatchResult.diagnosticMessage;
                    if (fileReference) {
                        referencedFiles.push(fileReference);
                    }
                    if (diagnosticMessage) {
                        sourceFile.referenceDiagnostics.push(createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, diagnosticMessage));
                    }
                }
                else {
                    var amdModuleNameRegEx = /^\/\/\/\s*<amd-module\s+name\s*=\s*('|")(.+?)\1/gim;
                    var amdModuleNameMatchResult = amdModuleNameRegEx.exec(comment);
                    if(amdModuleNameMatchResult) {
                        if(amdModuleName) {
                            sourceFile.referenceDiagnostics.push(createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments));
                        }
                        amdModuleName = amdModuleNameMatchResult[2];
                    }

                    var amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s+path\s*=\s*('|")(.+?)\1/gim;
                    var amdDependencyMatchResult = amdDependencyRegEx.exec(comment);
                    if (amdDependencyMatchResult) {
                        amdDependencies.push(amdDependencyMatchResult[2]);
                    }
                }
            }

            sourceFile.referencedFiles = referencedFiles;
            sourceFile.amdDependencies = amdDependencies;
            sourceFile.amdModuleName = amdModuleName;
        }

        function getExternalModuleIndicator() {
            return forEach(sourceFile.statements, node =>
                node.flags & NodeFlags.Export
                || node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference
                || node.kind === SyntaxKind.ExportAssignment
                ? node
                : undefined);
        }

        var syntacticDiagnostics: Diagnostic[];
        function getSyntacticDiagnostics() {
            if (syntacticDiagnostics === undefined) {
                if (sourceFile.parseDiagnostics.length > 0) {
                    // Don't bother doing any grammar checks if there are already parser errors.  
                    // Otherwise we may end up with too many cascading errors.
                    syntacticDiagnostics = sourceFile.referenceDiagnostics.concat(sourceFile.parseDiagnostics);
                }
                else {
                    // No parser errors were reported.  Perform our stricter grammar checks.
                    checkGrammar(sourceText, languageVersion, sourceFile);
                    syntacticDiagnostics = sourceFile.referenceDiagnostics.concat(sourceFile.grammarDiagnostics);
                }
            }

            Debug.assert(syntacticDiagnostics !== undefined);
            return syntacticDiagnostics;
        }
    }

    export function isLeftHandSideExpression(expr: Expression): boolean {
        if (expr) {
            switch (expr.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.TaggedTemplateExpression:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.ObjectLiteralExpression:
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
                    return true;
            }
        }

        return false;
    }

    export function isAssignmentOperator(token: SyntaxKind): boolean {
        return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
    }

    function checkGrammar(sourceText: string, languageVersion: ScriptTarget, file: SourceFile) {
        var grammarDiagnostics = file.grammarDiagnostics;

        // Create a scanner so we can find the start of tokens to report errors on.
        var scanner = createScanner(languageVersion, /*skipTrivia*/ true, sourceText);

        // We're automatically in an ambient context if this is a .d.ts file.
        var inAmbientContext = fileExtensionIs(file.filename, ".d.ts");
        var inFunctionBlock = false;
        var parent: Node;
        visitNode(file);

        function visitNode(node: Node): void {
            // Store and restore our recursive state here.
            var savedParent = parent;
            node.parent = parent;
            parent = node;

            if (!checkModifiers(node)) {
                var savedInFunctionBlock = inFunctionBlock;
                if (isFunctionBlock(node)) {
                    inFunctionBlock = true;
                }

                var savedInAmbientContext = inAmbientContext
                if (node.flags & NodeFlags.Ambient) {
                    inAmbientContext = true;
                }

                checkNodeAndChildren(node);

                inAmbientContext = savedInAmbientContext;
                inFunctionBlock = savedInFunctionBlock;
            }

            parent = savedParent;
        }

        function checkNodeAndChildren(node: Node) {
            var nodeKind = node.kind;
            // First, check if you have a statement in a place where it is not allowed.  We want 
            // to do this before recursing, because we'd prefer to report these errors at the top
            // level instead of at some nested level.
            if (inAmbientContext && checkForStatementInAmbientContext(node, nodeKind)) {
                return;
            }

            // if we got any errors, just stop performing any more checks on this node or higher.
            if (checkNode(node, nodeKind)) {
                return;
            }

            // Otherwise, recurse and see if we have any errors below us.
            forEachChild(node, visitNode);
        }

        function checkNode(node: Node, nodeKind: SyntaxKind): boolean {
            // Now do node specific checks.
            switch (nodeKind) {
                //case SyntaxKind.BreakStatement:
                //case SyntaxKind.ContinueStatement:
                    //return checkBreakOrContinueStatement(<BreakOrContinueStatement>node);
                //case SyntaxKind.CallExpression:
                //case SyntaxKind.NewExpression:
                    //return checkCallOrNewExpression(<NewExpression>node);

                //case SyntaxKind.EnumDeclaration:                return checkEnumDeclaration(<EnumDeclaration>node);
                //case SyntaxKind.BinaryExpression:               return checkBinaryExpression(<BinaryExpression>node);
                //case SyntaxKind.BindingElement:                 return checkBindingElement(<BindingElement>node);
                //case SyntaxKind.CatchClause:                    return checkCatchClause(<CatchClause>node);
                //case SyntaxKind.ClassDeclaration:               return checkClassDeclaration(<ClassDeclaration>node);
                //case SyntaxKind.ComputedPropertyName:           return checkComputedPropertyName(<ComputedPropertyName>node);
                //case SyntaxKind.Constructor:                    return checkConstructor(<ConstructorDeclaration>node);
                //case SyntaxKind.DeleteExpression:               return checkDeleteExpression(<DeleteExpression> node);
                //case SyntaxKind.ElementAccessExpression:        return checkElementAccessExpression(<ElementAccessExpression>node);
                //case SyntaxKind.ExportAssignment:               return checkExportAssignment(<ExportAssignment>node);
                //case SyntaxKind.ExternalModuleReference:        return checkExternalModuleReference(<ExternalModuleReference>node);
                case SyntaxKind.ForInStatement:                 return checkForInStatement(<ForInStatement>node);
                case SyntaxKind.ForStatement:                   return checkForStatement(<ForStatement>node);
                case SyntaxKind.FunctionDeclaration:            return checkFunctionDeclaration(<FunctionLikeDeclaration>node);
                //case SyntaxKind.FunctionExpression:             return checkFunctionExpression(<FunctionExpression>node);
                case SyntaxKind.GetAccessor:                    return checkGetAccessor(<MethodDeclaration>node);
                //case SyntaxKind.HeritageClause:                 return checkHeritageClause(<HeritageClause>node);
                //case SyntaxKind.InterfaceDeclaration:           return checkInterfaceDeclaration(<InterfaceDeclaration>node);
                //case SyntaxKind.LabeledStatement:               return checkLabeledStatement(<LabeledStatement>node);
                //case SyntaxKind.PropertyAssignment:             return checkPropertyAssignment(<PropertyAssignment>node);
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return checkMethod(<MethodDeclaration>node);
                case SyntaxKind.ModuleDeclaration:              return checkModuleDeclaration(<ModuleDeclaration>node);
                //case SyntaxKind.ObjectLiteralExpression:        return checkObjectLiteralExpression(<ObjectLiteralExpression>node);
                //case SyntaxKind.NumericLiteral:                 return checkNumericLiteral(<LiteralExpression>node);
                //case SyntaxKind.Parameter:                      return checkParameter(<ParameterDeclaration>node);
                //case SyntaxKind.PostfixUnaryExpression:         return checkPostfixUnaryExpression(<PostfixUnaryExpression>node);
                //case SyntaxKind.PrefixUnaryExpression:          return checkPrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return checkProperty(<PropertyDeclaration>node);
                //case SyntaxKind.ReturnStatement:                return checkReturnStatement(<ReturnStatement>node);
                case SyntaxKind.SetAccessor:                    return checkSetAccessor(<MethodDeclaration>node);
                case SyntaxKind.SourceFile:                     return checkSourceFile(<SourceFile>node);
                //case SyntaxKind.ShorthandPropertyAssignment:    return checkShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
                //case SyntaxKind.SwitchStatement:                return checkSwitchStatement(<SwitchStatement>node);
                //case SyntaxKind.TaggedTemplateExpression:       return checkTaggedTemplateExpression(<TaggedTemplateExpression>node);
                //case SyntaxKind.ThrowStatement:                 return checkThrowStatement(<ThrowStatement>node);
                //case SyntaxKind.TypeReference:                  return checkTypeReference(<TypeReferenceNode>node);
                case SyntaxKind.VariableDeclaration:            return checkVariableDeclaration(<VariableDeclaration>node);
                case SyntaxKind.VariableStatement:              return checkVariableStatement(<VariableStatement>node);
                //case SyntaxKind.WithStatement:                  return checkWithStatement(<WithStatement>node);
                //case SyntaxKind.YieldExpression:                return checkYieldExpression(<YieldExpression>node);
            }
        }

        function scanToken(pos: number) {
            var start = skipTrivia(sourceText, pos);
            scanner.setTextPos(start);
            scanner.scan();
            return start;
        }

        function grammarErrorOnFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            var start = scanToken(node.pos);
            grammarDiagnostics.push(createFileDiagnostic(file, start, scanner.getTextPos() - start, message, arg0, arg1, arg2));
            return true;
        }

        function grammarErrorAfterFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            scanToken(node.pos);
            grammarDiagnostics.push(createFileDiagnostic(file, scanner.getTextPos(), 0, message, arg0, arg1, arg2));
            return true;
        }

        function grammarErrorOnNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            var span = getErrorSpanForNode(node);
            var start = span.end > span.pos ? skipTrivia(file.text, span.pos) : span.pos;
            var length = span.end - start;

            grammarDiagnostics.push(createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
            return true;
        }

        function grammarErrorAtPos(start: number, length: number, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            grammarDiagnostics.push(createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
            return true;
        }

        function reportInvalidUseInStrictMode(node: Identifier): boolean {
            // declarationNameToString cannot be used here since it uses a backreference to 'parent' that is not yet set
            var name = sourceText.substring(skipTrivia(sourceText, node.pos), node.end);
            return grammarErrorOnNode(node, Diagnostics.Invalid_use_of_0_in_strict_mode, name);
        }

        function checkForStatementInAmbientContext(node: Node, kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.Block:
                case SyntaxKind.EmptyStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.ThrowStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.DebuggerStatement:
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.ExpressionStatement:
                    return grammarErrorOnFirstToken(node, Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
            }
        }

        function checkAnySignatureDeclaration(node: SignatureDeclaration): boolean {
            return checkTypeParameterList(node.typeParameters) ||
                checkParameterList(node.parameters);
        }

        function checkBinaryExpression(node: BinaryExpression) {
            if (node.parserContextFlags & ParserContextFlags.StrictMode) {
                if (isLeftHandSideExpression(node.left) && isAssignmentOperator(node.operator)) {
                    if (isEvalOrArgumentsIdentifier(node.left)) {
                        // ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an 
                        // Assignment operator(11.13) or of a PostfixExpression(11.3)
                        return reportInvalidUseInStrictMode(<Identifier>node.left);
                    }
                }
            }
        }

        function isIterationStatement(node: Node, lookInLabeledStatements: boolean): boolean {
            switch (node.kind) {
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    return true;
                case SyntaxKind.LabeledStatement:
                    return lookInLabeledStatements && isIterationStatement((<LabeledStatement>node).statement, lookInLabeledStatements);
            }

            return false;
        }

        function checkLabeledStatement(node: LabeledStatement): boolean {
            // ensure that label is unique
            var current = node.parent;
            while (current) {
                if (isAnyFunction(current)) {
                    break;
                }
                if (current.kind === SyntaxKind.LabeledStatement && (<LabeledStatement>current).label.text === node.label.text) {
                    return grammarErrorOnNode(node.label, Diagnostics.Duplicate_label_0, getTextOfNodeFromSourceText(sourceText, node.label));
                }
                current = current.parent;
            }
        }

        function checkBreakOrContinueStatement(node: BreakOrContinueStatement): boolean {
            var current: Node = node;
            while (current) {
                if (isAnyFunction(current)) {
                    return grammarErrorOnNode(node, Diagnostics.Jump_target_cannot_cross_function_boundary);
                }

                switch (current.kind) {
                    case SyntaxKind.LabeledStatement:
                        if (node.label && (<LabeledStatement>current).label.text === node.label.text) {
                            // found matching label - verify that label usage is correct
                            // continue can only target labels that are on iteration statements
                            var isMisplacedContinueLabel = node.kind === SyntaxKind.ContinueStatement
                                && !isIterationStatement((<LabeledStatement>current).statement, /*lookInLabeledStatement*/ true);

                            if (isMisplacedContinueLabel) {
                                return grammarErrorOnNode(node, Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement);
                            }

                            return false;
                        }
                        break;
                    case SyntaxKind.SwitchStatement:
                        if (node.kind === SyntaxKind.BreakStatement && !node.label) {
                            // unlabeled break within switch statement - ok
                            return false;
                        }
                        break;
                    default:
                        if (isIterationStatement(current, /*lookInLabeledStatement*/ false) && !node.label) {
                            // unlabeled break or continue within iteration statement - ok
                            return false;
                        }
                        break;
                }

                current = current.parent;
            }

            if (node.label) {
                var message = node.kind === SyntaxKind.BreakStatement
                    ? Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement
                    : Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;

                return grammarErrorOnNode(node, message)
            }
            else {
                var message = node.kind === SyntaxKind.BreakStatement
                    ? Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement
                    : Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message)
            }
        }

        function checkCallOrNewExpression(node: CallExpression) {
            return checkTypeArguments(node.typeArguments) ||
                checkArguments(node.arguments);
        }

        function checkArguments(arguments: NodeArray<Expression>) {
            return checkForDisallowedTrailingComma(arguments) ||
                checkForOmittedArgument(arguments);
        }

        function checkTypeArguments(typeArguments: NodeArray<TypeNode>) {
            return checkForDisallowedTrailingComma(typeArguments) ||
                checkForAtLeastOneTypeArgument(typeArguments);
        }

        function checkForOmittedArgument(arguments: NodeArray<Expression>) {
            if (arguments) {
                for (var i = 0, n = arguments.length; i < n; i++) {
                    var arg = arguments[i];
                    if (arg.kind === SyntaxKind.OmittedExpression) {
                        return grammarErrorAtPos(arg.pos, 0, Diagnostics.Argument_expression_expected);
                    }
                }
            }
        }

        function checkForAtLeastOneTypeArgument(typeArguments: NodeArray<TypeNode>) {
            if (typeArguments && typeArguments.length === 0) {
                var start = typeArguments.pos - "<".length;
                var end = skipTrivia(sourceText, typeArguments.end) + ">".length;
                return grammarErrorAtPos(start, end - start, Diagnostics.Type_argument_list_cannot_be_empty);
            }
        }

        function checkForDisallowedTrailingComma(list: NodeArray<Node>): boolean {
            if (list && list.hasTrailingComma) {
                var start = list.end - ",".length;
                var end = list.end;
                return grammarErrorAtPos(start, end - start, Diagnostics.Trailing_comma_not_allowed);
            }
        }

        function checkCatchClause(node: CatchClause) {
            if (node.type) {
                var colonStart = skipTrivia(sourceText, node.name.end);
                return grammarErrorAtPos(colonStart, ":".length, Diagnostics.Catch_clause_parameter_cannot_have_a_type_annotation);
            }
            if (node.parserContextFlags & ParserContextFlags.StrictMode && isEvalOrArgumentsIdentifier(node.name)) {
                // It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the 
                // Catch production is eval or arguments
                return reportInvalidUseInStrictMode(node.name);
            }
        }

        function checkClassDeclaration(node: ClassDeclaration) {
            return checkClassDeclarationHeritageClauses(node);
        }

        function checkClassDeclarationHeritageClauses(node: ClassDeclaration): boolean {
            var seenExtendsClause = false;
            var seenImplementsClause = false;

            if (node.heritageClauses) {
                for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                    Debug.assert(i <= 2);
                    var heritageClause = node.heritageClauses[i];

                    if (heritageClause.token === SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen);
                        }

                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_must_precede_implements_clause);
                        }

                        if (heritageClause.types.length > 1) {
                            return grammarErrorOnFirstToken(heritageClause.types[1], Diagnostics.Classes_can_only_extend_a_single_class);
                        }

                        seenExtendsClause = true;
                    }
                    else {
                        Debug.assert(heritageClause.token === SyntaxKind.ImplementsKeyword);
                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.implements_clause_already_seen);
                        }

                        seenImplementsClause = true;
                    }
                }
            }

            return false;
        }

        function checkForAtLeastOneHeritageClause(types: NodeArray<TypeNode>, listType: string): boolean {
            if (types && types.length === 0) {
                return grammarErrorAtPos(types.pos, 0, Diagnostics._0_list_cannot_be_empty, listType)
            }
        }

        function checkConstructor(node: ConstructorDeclaration) {
            return checkAnySignatureDeclaration(node) ||
                checkConstructorTypeParameters(node) ||
                checkConstructorTypeAnnotation(node) ||
                checkForBodyInAmbientContext(node.body, /*isConstructor:*/ true);
        }

        function checkConstructorTypeParameters(node: ConstructorDeclaration) {
            if (node.typeParameters) {
                return grammarErrorAtPos(node.typeParameters.pos, node.typeParameters.end - node.typeParameters.pos, Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
            }
        }

        function checkConstructorTypeAnnotation(node: ConstructorDeclaration) {
            if (node.type) {
                return grammarErrorOnNode(node.type, Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
            }
        }

        function checkDeleteExpression(node: DeleteExpression) {
            if (node.parserContextFlags & ParserContextFlags.StrictMode && node.expression.kind === SyntaxKind.Identifier) {
                // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its 
                // UnaryExpression is a direct reference to a variable, function argument, or function name
                return grammarErrorOnNode(node.expression, Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode);
            }
        }

        function checkEnumDeclaration(enumDecl: EnumDeclaration): boolean {
            var enumIsConst = (enumDecl.flags & NodeFlags.Const) !== 0;

            var hasError = false;

            // skip checks below for const enums  - they allow arbitrary initializers as long as they can be evaluated to constant expressions.
            // since all values are known in compile time - it is not necessary to check that constant enum section precedes computed enum members.
            if (!enumIsConst) {
                var inConstantEnumMemberSection = true;
                for (var i = 0, n = enumDecl.members.length; i < n; i++) {
                    var node = enumDecl.members[i];
                    if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                        hasError = grammarErrorOnNode(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_enums);
                    }
                    else if (inAmbientContext) {
                        if (node.initializer && !isIntegerLiteral(node.initializer)) {
                            hasError = grammarErrorOnNode(node.name, Diagnostics.Ambient_enum_elements_can_only_have_integer_literal_initializers) || hasError;
                        }
                    }
                    else if (node.initializer) {
                        inConstantEnumMemberSection = isIntegerLiteral(node.initializer);
                    }
                    else if (!inConstantEnumMemberSection) {
                        hasError = grammarErrorOnNode(node.name, Diagnostics.Enum_member_must_have_initializer) || hasError;
                    }
                }
            }

            return hasError;
        }

        function isIntegerLiteral(expression: Expression): boolean {
            function isInteger(literalExpression: LiteralExpression): boolean {
                // Allows for scientific notation since literalExpression.text was formed by
                // coercing a number to a string. Sometimes this coercion can yield a string
                // in scientific notation.
                // We also don't need special logic for hex because a hex integer is converted
                // to decimal when it is coerced.
                return /^[0-9]+([eE]\+?[0-9]+)?$/.test(literalExpression.text);
            }

            if (expression.kind === SyntaxKind.PrefixUnaryExpression) {
                var unaryExpression = <PrefixUnaryExpression>expression;
                if (unaryExpression.operator === SyntaxKind.PlusToken || unaryExpression.operator === SyntaxKind.MinusToken) {
                    expression = unaryExpression.operand;
                }
            }
            if (expression.kind === SyntaxKind.NumericLiteral) {
                return isInteger(<LiteralExpression>expression);
            }

            return false;
        }

        function checkExportAssignment(node: ExportAssignment) {
            if (node.flags & NodeFlags.Modifier) {
                return grammarErrorOnFirstToken(node, Diagnostics.An_export_assignment_cannot_have_modifiers);
            }
        }

        function checkExternalModuleReference(node: ExternalModuleReference) {
            if (node.expression.kind !== SyntaxKind.StringLiteral) {
                return grammarErrorOnNode(node.expression, Diagnostics.String_literal_expected);
            }
        }

        function checkForInStatement(node: ForInStatement) {
            return checkVariableDeclarations(node.declarations) ||
                checkForMoreThanOneDeclaration(node.declarations);
        }

        function checkForStatement(node: ForStatement) {
            return checkVariableDeclarations(node.declarations);
        }

        function checkForMoreThanOneDeclaration(declarations: NodeArray<VariableDeclaration>) {
            if (declarations && declarations.length > 1) {
                return grammarErrorOnFirstToken(declarations[1], Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
            }
        }

        function checkFunctionDeclaration(node: FunctionLikeDeclaration) {
            return checkAnySignatureDeclaration(node) ||
                checkFunctionName(node.name) ||
                checkForBodyInAmbientContext(node.body, /*isConstructor:*/ false) ||
                checkForGenerator(node);
        }

        function checkForGenerator(node: FunctionLikeDeclaration) {
            if (node.asteriskToken) {
                return grammarErrorOnNode(node.asteriskToken, Diagnostics.Generators_are_not_currently_supported);
            }
        }

        function checkFunctionExpression(node: FunctionExpression) {
            return checkAnySignatureDeclaration(node) ||
                checkFunctionName(node.name) ||
                checkForGenerator(node);
        }

        function checkFunctionName(name: Node) {
            if (name && name.parserContextFlags & ParserContextFlags.StrictMode && isEvalOrArgumentsIdentifier(name)) {
                // It is a SyntaxError to use within strict mode code the identifiers eval or arguments as the 
                // Identifier of a FunctionLikeDeclaration or FunctionExpression or as a formal parameter name(13.1)
                return reportInvalidUseInStrictMode(<Identifier>name);
            }
        }

        function checkGetAccessor(node: MethodDeclaration) {
            return checkAnySignatureDeclaration(node) ||
                checkAccessor(node);
        }

        function checkElementAccessExpression(node: ElementAccessExpression) {
            if (!node.argumentExpression) {
                if (node.parent.kind === SyntaxKind.NewExpression && (<NewExpression>node.parent).expression === node) {
                    var start = skipTrivia(sourceText, node.expression.end);
                    var end = node.end;
                    return grammarErrorAtPos(start, end - start, Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                }
                else {
                    var start = node.end - "]".length;
                    var end = node.end;
                    return grammarErrorAtPos(start, end - start, Diagnostics.Expression_expected);
                }
            }
        }

        function checkHeritageClause(node: HeritageClause): boolean {
            return checkForDisallowedTrailingComma(node.types) ||
                checkForAtLeastOneHeritageClause(node.types, tokenToString(node.token));
        }

        function checkIndexSignature(node: SignatureDeclaration): boolean {
            return checkIndexSignatureParameters(node) ||
                checkForIndexSignatureModifiers(node);
        }

        function checkForIndexSignatureModifiers(node: SignatureDeclaration): boolean {
            if (node.flags & NodeFlags.Modifier) {
                return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_not_permitted_on_index_signature_members);
            }
        }

        function checkIndexSignatureParameters(node: SignatureDeclaration): boolean {
            var parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                if (parameter) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
                else {
                    return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
            }
            else if (parameter.dotDotDotToken) {
                return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
            }
            else if (parameter.flags & NodeFlags.Modifier) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
            }
            else if (parameter.questionToken) {
                return grammarErrorOnNode(parameter.questionToken, Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
            }
            else if (parameter.initializer) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
            }
            else if (!parameter.type) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
            }
            else if (parameter.type.kind !== SyntaxKind.StringKeyword && parameter.type.kind !== SyntaxKind.NumberKeyword) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
            }
            else if (!node.type) {
                return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_a_type_annotation);
            }
        }

        function checkInterfaceDeclaration(node: InterfaceDeclaration) {
            return checkInterfaceDeclarationHeritageClauses(node);
        }

        function checkInterfaceDeclarationHeritageClauses(node: InterfaceDeclaration): boolean {
            var seenExtendsClause = false;

            if (node.heritageClauses) {
                for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                    Debug.assert(i <= 1);
                    var heritageClause = node.heritageClauses[i];

                    if (heritageClause.token === SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen);
                        }

                        seenExtendsClause = true;
                    }
                    else {
                        Debug.assert(heritageClause.token === SyntaxKind.ImplementsKeyword);
                        return grammarErrorOnFirstToken(heritageClause, Diagnostics.Interface_declaration_cannot_have_implements_clause);
                    }
                }
            }

            return false;
        }

        function checkMethod(node: MethodDeclaration) {
            if (checkAnySignatureDeclaration(node) ||
                checkForBodyInAmbientContext(node.body, /*isConstructor:*/ false) ||
                checkForGenerator(node)) {
                return true;
            }

            if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                if (checkForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                // Technically, computed properties in ambient contexts is disallowed 
                // for property declarations and accessors too, not just methods.
                // However, property declarations disallow computed names in general,
                // and accessors are not allowed in ambient contexts in general,
                // so this error only really matters for methods.
                if (inAmbientContext) {
                    return checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_an_ambient_context);
                }
                else if (!node.body) {
                    return checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_method_overloads);
                }
            }
            else if (node.parent.kind === SyntaxKind.InterfaceDeclaration) {
                return checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_interfaces);
            }
            else if (node.parent.kind === SyntaxKind.TypeLiteral) {
                return checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_type_literals);
            }
        }

        function checkForBodyInAmbientContext(body: Block | Expression, isConstructor: boolean): boolean {
            if (inAmbientContext && body && body.kind === SyntaxKind.Block) {
                var diagnostic = isConstructor
                    ? Diagnostics.A_constructor_implementation_cannot_be_declared_in_an_ambient_context
                    : Diagnostics.A_function_implementation_cannot_be_declared_in_an_ambient_context;
                return grammarErrorOnFirstToken(body, diagnostic);
            }
        }

        function checkModuleDeclaration(node: ModuleDeclaration): boolean {
            return checkModuleDeclarationName(node) ||
                checkModuleDeclarationStatements(node);
        }
        
        function checkModuleDeclarationName(node: ModuleDeclaration) {
            if (!inAmbientContext && node.name.kind === SyntaxKind.StringLiteral) {
                return grammarErrorOnNode(node.name, Diagnostics.Only_ambient_modules_can_use_quoted_names);
            }
        }

        function checkModuleDeclarationStatements(node: ModuleDeclaration): boolean {
            if (node.name.kind === SyntaxKind.Identifier && node.body.kind === SyntaxKind.ModuleBlock) {
                var statements = (<ModuleBlock>node.body).statements;
                for (var i = 0, n = statements.length; i < n; i++) {
                    var statement = statements[i];

                    if (statement.kind === SyntaxKind.ExportAssignment) {
                        // Export assignments are not allowed in an internal module
                        return grammarErrorOnNode(statement, Diagnostics.An_export_assignment_cannot_be_used_in_an_internal_module);
                    }
                    else if (isExternalModuleImportDeclaration(statement)) {
                        return grammarErrorOnNode(getExternalModuleImportDeclarationExpression(statement), Diagnostics.Import_declarations_in_an_internal_module_cannot_reference_an_external_module);
                    }
                }
            }
        }

        function checkObjectLiteralExpression(node: ObjectLiteralExpression): boolean {
            var seen: Map<SymbolFlags> = {};
            var Property = 1;
            var GetAccessor = 2;
            var SetAccesor = 4;
            var GetOrSetAccessor = GetAccessor | SetAccesor;
            var inStrictMode = (node.parserContextFlags & ParserContextFlags.StrictMode) !== 0;

            for (var i = 0, n = node.properties.length; i < n; i++) {
                var prop = <Declaration>node.properties[i];
                var name = <Identifier>prop.name;
                if (prop.kind === SyntaxKind.OmittedExpression || name.kind === SyntaxKind.ComputedPropertyName) {
                    continue;
                }

                // ECMA-262 11.1.5 Object Initialiser 
                // If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
                // a.This production is contained in strict code and IsDataDescriptor(previous) is true and 
                // IsDataDescriptor(propId.descriptor) is true.
                //    b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
                //    c.IsAccessorDescriptor(previous) is true and IsDataDescriptor(propId.descriptor) is true.
                //    d.IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true 
                // and either both previous and propId.descriptor have[[Get]] fields or both previous and propId.descriptor have[[Set]] fields 
                var currentKind: number;
                if (prop.kind === SyntaxKind.PropertyAssignment ||
                    prop.kind === SyntaxKind.ShorthandPropertyAssignment ||
                    prop.kind === SyntaxKind.MethodDeclaration) {
                    currentKind = Property;
                }
                else if (prop.kind === SyntaxKind.GetAccessor) {
                    currentKind = GetAccessor;
                }
                else if (prop.kind === SyntaxKind.SetAccessor) {
                    currentKind = SetAccesor;
                }
                else {
                    Debug.fail("Unexpected syntax kind:" + prop.kind);
                }

                if (!hasProperty(seen, name.text)) {
                    seen[name.text] = currentKind;
                }
                else {
                    var existingKind = seen[name.text];
                    if (currentKind === Property && existingKind === Property) {
                        if (inStrictMode) {
                            grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode);
                        }
                    }
                    else if ((currentKind & GetOrSetAccessor) && (existingKind & GetOrSetAccessor)) {
                        if (existingKind !== GetOrSetAccessor && currentKind !== existingKind) {
                            seen[name.text] = currentKind | existingKind;
                        }
                        else {
                            return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                        }
                    }
                    else {
                        return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                    }
                }
            }
        }

        function checkNumericLiteral(node: LiteralExpression): boolean {
            if (node.flags & NodeFlags.OctalLiteral) {
                if (node.parserContextFlags & ParserContextFlags.StrictMode) {
                    return grammarErrorOnNode(node, Diagnostics.Octal_literals_are_not_allowed_in_strict_mode);
                }
                else if (languageVersion >= ScriptTarget.ES5) {
                    return grammarErrorOnNode(node, Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher);
                }
            }
        }

        function checkModifiers(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                //case SyntaxKind.Constructor:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                //case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                //case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ImportDeclaration:
                //case SyntaxKind.Parameter:
                    break;
                default:
                    return false;
            }

            if (!node.modifiers) {
                return;
            }

            var lastStatic: Node, lastPrivate: Node, lastProtected: Node, lastDeclare: Node;
            var flags = 0;
            for (var i = 0, n = node.modifiers.length; i < n; i++) {
                var modifier = node.modifiers[i];

                switch (modifier.kind) {
                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.ProtectedKeyword:
                    case SyntaxKind.PrivateKeyword:
                        var text: string;
                        if (modifier.kind === SyntaxKind.PublicKeyword) {
                            text = "public";
                        }
                        else if (modifier.kind === SyntaxKind.ProtectedKeyword) {
                            text = "protected";
                            lastProtected = modifier;
                        }
                        else {
                            text = "private";
                            lastPrivate = modifier;
                        }

                        if (flags & NodeFlags.AccessibilityModifier) {
                            return grammarErrorOnNode(modifier, Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "static");
                        }
                        else if (node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_element, text);
                        }
                        flags |= modifierToFlag(modifier.kind);
                        break;

                    case SyntaxKind.StaticKeyword:
                        if (flags & NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        flags |= NodeFlags.Static;
                        lastStatic = modifier;
                        break;

                    case SyntaxKind.ExportKeyword:
                        if (flags & NodeFlags.Export) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "export");
                        }
                        else if (flags & NodeFlags.Ambient) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                        }
                        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_class_element, "export");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                        }
                        flags |= NodeFlags.Export;
                        break;

                    case SyntaxKind.DeclareKeyword:
                        if (flags & NodeFlags.Ambient) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "declare");
                        }
                        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_class_element, "declare");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                        }
                        else if (inAmbientContext && node.parent.kind === SyntaxKind.ModuleBlock) {
                            return grammarErrorOnNode(modifier, Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                        }
                        flags |= NodeFlags.Ambient;
                        lastDeclare = modifier;
                        break;
                }
            }

            if (node.kind === SyntaxKind.Constructor) {
                if (flags & NodeFlags.Static) {
                    return grammarErrorOnNode(lastStatic, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                }
                else if (flags & NodeFlags.Protected) {
                    return grammarErrorOnNode(lastProtected, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "protected");
                }
                else if (flags & NodeFlags.Private) {
                    return grammarErrorOnNode(lastPrivate, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
                }
            }
            else if (node.kind === SyntaxKind.ImportDeclaration && flags & NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, Diagnostics.A_declare_modifier_cannot_be_used_with_an_import_declaration, "declare");
            }
            else if (node.kind === SyntaxKind.InterfaceDeclaration && flags & NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, Diagnostics.A_declare_modifier_cannot_be_used_with_an_interface_declaration, "declare");
            }
        }

        function checkParameter(node: ParameterDeclaration): boolean {
            // It is a SyntaxError if the Identifier "eval" or the Identifier "arguments" occurs as the 
            // Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in strict code 
            // or if its FunctionBody is strict code(11.1.5).
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a 
            // strict mode FunctionLikeDeclaration or FunctionExpression(13.1) 
            if (node.parserContextFlags & ParserContextFlags.StrictMode && isEvalOrArgumentsIdentifier(node.name)) {
                return reportInvalidUseInStrictMode(<Identifier>node.name);
            }
        }

        function checkTypeParameterList(typeParameters: NodeArray<TypeParameterDeclaration>): boolean {
            if (checkForDisallowedTrailingComma(typeParameters)) {
                return true;
            }

            if (typeParameters && typeParameters.length === 0) {
                var start = typeParameters.pos - "<".length;
                var end = skipTrivia(sourceText, typeParameters.end) + ">".length;
                return grammarErrorAtPos(start, end - start, Diagnostics.Type_parameter_list_cannot_be_empty);
            }
        }

        function checkParameterList(parameters: NodeArray<ParameterDeclaration>): boolean {
            if (checkForDisallowedTrailingComma(parameters)) {
                return true;
            }

            var seenOptionalParameter = false;
            var parameterCount = parameters.length;

            for (var i = 0; i < parameterCount; i++) {
                var parameter = parameters[i];
                if (parameter.dotDotDotToken) {
                    if (i !== (parameterCount - 1)) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                    }

                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_rest_parameter_cannot_be_optional);
                    }

                    if (parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                    }
                }
                else if (parameter.questionToken || parameter.initializer) {
                    seenOptionalParameter = true;

                    if (parameter.questionToken && parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                    }
                }
            }
        }

        function checkPostfixUnaryExpression(node: PostfixUnaryExpression) {
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an 
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression 
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator. 
            if (node.parserContextFlags & ParserContextFlags.StrictMode && isEvalOrArgumentsIdentifier(node.operand)) {
                return reportInvalidUseInStrictMode(<Identifier>node.operand);
            }
        }

        function checkPrefixUnaryExpression(node: PrefixUnaryExpression) {
            if (node.parserContextFlags & ParserContextFlags.StrictMode) {
                // The identifier eval or arguments may not appear as the LeftHandSideExpression of an 
                // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression 
                // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator
                if ((node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) && isEvalOrArgumentsIdentifier(node.operand)) {
                    return reportInvalidUseInStrictMode(<Identifier>node.operand);
                }
            }
        }

        function checkProperty(node: PropertyDeclaration) {
            if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                if (checkForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional) ||
                    checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_class_property_declarations)) {
                    return true;
                }
            }
            else if (node.parent.kind === SyntaxKind.InterfaceDeclaration) {
                if (checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_interfaces)) {
                    return true;
                }
            }
            else if (node.parent.kind === SyntaxKind.TypeLiteral) {
                if (checkForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_type_literals)) {
                    return true;
                }
            }

            return checkForInitializerInAmbientContext(node);
        }

        function checkComputedPropertyName(node: ComputedPropertyName) {
            // Since computed properties are not supported in the type checker, disallow them in TypeScript 1.4
            // Once full support is added, remove this error.
            return grammarErrorOnNode(node, Diagnostics.Computed_property_names_are_not_currently_supported);
            
            if (languageVersion < ScriptTarget.ES6) {
                return grammarErrorOnNode(node, Diagnostics.Computed_property_names_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }
            else if (node.expression.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node.expression).operator === SyntaxKind.CommaToken) {
                return grammarErrorOnNode(node.expression, Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name);
            }
        }

        function checkForDisallowedComputedProperty(node: DeclarationName, message: DiagnosticMessage) {
            if (node.kind === SyntaxKind.ComputedPropertyName) {
                return grammarErrorOnNode(node, message);
            }
        }

        function checkForInitializerInAmbientContext(node: PropertyDeclaration) {
            if (inAmbientContext && node.initializer) {
                return grammarErrorOnFirstToken(node.initializer, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
        }

        function checkPropertyAssignment(node: PropertyAssignment) {
            return checkForInvalidQuestionMark(node, node.questionToken, Diagnostics.An_object_member_cannot_be_declared_optional);
        }

        function checkForInvalidQuestionMark(node: Declaration, questionToken: Node, message: DiagnosticMessage) {
            if (questionToken) {
                return grammarErrorOnNode(questionToken, message);
            }
        }

        function checkReturnStatement(node: ReturnStatement) {
            if (!inFunctionBlock) {
                return grammarErrorOnFirstToken(node, Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
            }
        }

        function checkSetAccessor(node: MethodDeclaration) {
            return checkAnySignatureDeclaration(node) ||
                checkAccessor(node);
        }

        function checkAccessor(accessor: MethodDeclaration): boolean {
            var kind = accessor.kind;
            if (languageVersion < ScriptTarget.ES5) {
                return grammarErrorOnNode(accessor.name, Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
            }
            else if (inAmbientContext) {
                return grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_be_declared_in_an_ambient_context);
            }
            else if (accessor.body === undefined) {
                return grammarErrorAtPos(accessor.end - 1, ";".length, Diagnostics._0_expected, "{");
            }
            else if (accessor.typeParameters) {
                return grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_have_type_parameters);
            }
            else if (kind === SyntaxKind.GetAccessor && accessor.parameters.length) {
                return grammarErrorOnNode(accessor.name, Diagnostics.A_get_accessor_cannot_have_parameters);
            }
            else if (kind === SyntaxKind.SetAccessor) {
                if (accessor.type) {
                    return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                }
                else if (accessor.parameters.length !== 1) {
                    return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                }
                else {
                    var parameter = accessor.parameters[0];
                    if (parameter.dotDotDotToken) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                    }
                    else if (parameter.flags & NodeFlags.Modifier) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                    }
                    else if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                    }
                    else if (parameter.initializer) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                    }
                }
            }
        }

        function checkSourceFile(node: SourceFile): boolean {
            return inAmbientContext && checkTopLevelElementsForRequiredDeclareModifier(file);
        }

        function checkTopLevelElementsForRequiredDeclareModifier(file: SourceFile): boolean {
            for (var i = 0, n = file.statements.length; i < n; i++) {
                var decl = file.statements[i];
                if (isDeclaration(decl) || decl.kind === SyntaxKind.VariableStatement) {
                    if (checkTopLevelElementForRequiredDeclareModifier(decl)) {
                        return true;
                    }
                }
            }
        }

        function checkTopLevelElementForRequiredDeclareModifier(node: Node): boolean {
            // A declare modifier is required for any top level .d.ts declaration except export=, interfaces and imports:
            // categories:
            //
            //  DeclarationElement:
            //     ExportAssignment
            //     export_opt   InterfaceDeclaration
            //     export_opt   ImportDeclaration
            //     export_opt   ExternalImportDeclaration
            //     export_opt   AmbientDeclaration
            //
            if (node.kind === SyntaxKind.InterfaceDeclaration ||
                node.kind === SyntaxKind.ImportDeclaration ||
                node.kind === SyntaxKind.ExportAssignment ||
                (node.flags & NodeFlags.Ambient)) {

                return false;
            }

            return grammarErrorOnFirstToken(node, Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
        }

        function checkShorthandPropertyAssignment(node: ShorthandPropertyAssignment): boolean {
            return checkForInvalidQuestionMark(node, node.questionToken, Diagnostics.An_object_member_cannot_be_declared_optional);
        }

        function checkSwitchStatement(node: SwitchStatement) {
            var firstDefaultClause: CaseOrDefaultClause;

            // Error on duplicate 'default' clauses.
            for (var i = 0, n = node.clauses.length; i < n; i++) {
                var clause = node.clauses[i];
                if (clause.kind === SyntaxKind.DefaultClause) {
                    if (firstDefaultClause === undefined) {
                        firstDefaultClause = clause;
                    }
                    else {
                        var start = skipTrivia(file.text, clause.pos);
                        var end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                        return grammarErrorAtPos(start, end - start, Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);

                    }
                }
            }
        }

        function checkTaggedTemplateExpression(node: TaggedTemplateExpression) {
            if (languageVersion < ScriptTarget.ES6) {
                return grammarErrorOnFirstToken(node.template, Diagnostics.Tagged_templates_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }
        }

        function checkThrowStatement(node: ThrowStatement) {
            if (node.expression === undefined) {
                return grammarErrorAfterFirstToken(node, Diagnostics.Line_break_not_permitted_here);
            }
        }

        function checkTupleType(node: TupleTypeNode) {
            return checkForDisallowedTrailingComma(node.elementTypes) ||
                checkForAtLeastOneType(node);
        }

        function checkForAtLeastOneType(node: TupleTypeNode): boolean {
            if (node.elementTypes.length === 0) {
                return grammarErrorOnNode(node, Diagnostics.A_tuple_type_element_list_cannot_be_empty)
            }
        }

        function checkTypeReference(node: TypeReferenceNode) {
            return checkTypeArguments(node.typeArguments);
        }

        function checkBindingElement(node: BindingElement) {
            if (node.parserContextFlags & ParserContextFlags.StrictMode && isEvalOrArgumentsIdentifier(node.name)) {
                // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code 
                // and its Identifier is eval or arguments 
                return reportInvalidUseInStrictMode(<Identifier>node.name);
            }
        }

        function checkVariableDeclaration(node: VariableDeclaration) {
            if (inAmbientContext) {
                if (isBindingPattern(node.name)) {
                    return grammarErrorOnNode(node, Diagnostics.Destructuring_declarations_are_not_allowed_in_ambient_contexts);
                }
                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(node.initializer.pos - 1, 1, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                }
            }
            else {
                if (!node.initializer) {
                    if (isBindingPattern(node.name) && !isBindingPattern(node.parent)) {
                        return grammarErrorOnNode(node, Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                    }
                    if (isConst(node)) {
                        return grammarErrorOnNode(node, Diagnostics.const_declarations_must_be_initialized);
                    }
                }
            }
            if (node.parserContextFlags & ParserContextFlags.StrictMode && isEvalOrArgumentsIdentifier(node.name)) {
                // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code 
                // and its Identifier is eval or arguments 
                return reportInvalidUseInStrictMode(<Identifier>node.name);
            }
        }

        function checkVariableDeclarations(declarations: NodeArray<VariableDeclaration>): boolean {
            if (declarations) {
                if (checkForDisallowedTrailingComma(declarations)) {
                    return true;
                }

                if (!declarations.length) {
                    return grammarErrorAtPos(declarations.pos, declarations.end - declarations.pos, Diagnostics.Variable_declaration_list_cannot_be_empty);
                }

                var decl = declarations[0];
                if (languageVersion < ScriptTarget.ES6) {
                    if (isLet(decl)) {
                        return grammarErrorOnFirstToken(decl, Diagnostics.let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                    }
                    else if (isConst(decl)) {
                        return grammarErrorOnFirstToken(decl, Diagnostics.const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                    }
                }
            }
        }

        function checkVariableStatement(node: VariableStatement) {
            return checkVariableDeclarations(node.declarations) ||
                checkForDisallowedLetOrConstStatement(node);
        }

        function checkForDisallowedLetOrConstStatement(node: VariableStatement) {
            if (!allowLetAndConstDeclarations(node.parent)) {
                if (isLet(node)) {
                    return grammarErrorOnNode(node, Diagnostics.let_declarations_can_only_be_declared_inside_a_block);
                }
                else if (isConst(node)) {
                    return grammarErrorOnNode(node, Diagnostics.const_declarations_can_only_be_declared_inside_a_block);
                }
            }
        }

        function allowLetAndConstDeclarations(parent: Node): boolean {
            switch (parent.kind) {
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                    return false;
                case SyntaxKind.LabeledStatement:
                    return allowLetAndConstDeclarations(parent.parent);
            }

            return true;
        }

        function checkWithStatement(node: WithStatement): boolean {
            if (node.parserContextFlags & ParserContextFlags.StrictMode) {
                // Strict mode code may not include a WithStatement. The occurrence of a WithStatement in such 
                // a context is an 
                return grammarErrorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_strict_mode);
            }
        }

        function checkYieldExpression(node: YieldExpression): boolean {
            if (!(node.parserContextFlags & ParserContextFlags.Yield)) {
                return grammarErrorOnFirstToken(node, Diagnostics.yield_expression_must_be_contained_within_a_generator_declaration);
            }
            return grammarErrorOnFirstToken(node, Diagnostics.yield_expressions_are_not_currently_supported);
        }
    }

    export function createProgram(rootNames: string[], options: CompilerOptions, host: CompilerHost): Program {
        var program: Program;
        var files: SourceFile[] = [];
        var filesByName: Map<SourceFile> = {};
        var errors: Diagnostic[] = [];
        var seenNoDefaultLib = options.noLib;
        var commonSourceDirectory: string;

        forEach(rootNames, name => processRootFile(name, false));
        if (!seenNoDefaultLib) {
            processRootFile(host.getDefaultLibFilename(options), true);
        }
        verifyCompilerOptions();
        errors.sort(compareDiagnostics);
        program = {
            getSourceFile: getSourceFile,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getCompilerHost: () => host,
            getDiagnostics: getDiagnostics,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getTypeChecker: fullTypeCheckMode => createTypeChecker(program, fullTypeCheckMode),
            getCommonSourceDirectory: () => commonSourceDirectory,
        };
        return program;

        function getSourceFile(filename: string) {
            filename = host.getCanonicalFileName(filename);
            return hasProperty(filesByName, filename) ? filesByName[filename] : undefined;
        }

        function getDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return sourceFile ? filter(errors, e => e.file === sourceFile) : errors;
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            return filter(errors, e => !e.file);
        }

        function hasExtension(filename: string): boolean {
            return getBaseFilename(filename).indexOf(".") >= 0;
        }

        function processRootFile(filename: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(filename), isDefaultLib);
        }

        function processSourceFile(filename: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            if (refEnd !== undefined && refPos !== undefined) {
                var start = refPos;
                var length = refEnd - refPos;
            }
            var diagnostic: DiagnosticMessage;
            if (hasExtension(filename)) {
                if (!options.allowNonTsExtensions && !fileExtensionIs(filename, ".ts")) {
                    diagnostic = Diagnostics.File_0_must_have_extension_ts_or_d_ts;
                }
                else if (!findSourceFile(filename, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                }
                else if (refFile && host.getCanonicalFileName(filename) === host.getCanonicalFileName(refFile.filename)) {
                    diagnostic = Diagnostics.A_file_cannot_have_a_reference_to_itself;
                }
            }
            else {
                if (!(findSourceFile(filename + ".ts", isDefaultLib, refFile, refPos, refEnd) || findSourceFile(filename + ".d.ts", isDefaultLib, refFile, refPos, refEnd))) {
                    diagnostic = Diagnostics.File_0_not_found;
                    filename += ".ts";
                }
            }

            if (diagnostic) {
                if (refFile) {
                    errors.push(createFileDiagnostic(refFile, start, length, diagnostic, filename));
                }
                else {
                    errors.push(createCompilerDiagnostic(diagnostic, filename));
                }
            }
        }

        // Get source file from normalized filename
        function findSourceFile(filename: string, isDefaultLib: boolean, refFile?: SourceFile, refStart?: number, refLength?: number): SourceFile {
            var canonicalName = host.getCanonicalFileName(filename);
            if (hasProperty(filesByName, canonicalName)) {
                // We've already looked for this file, use cached result
                return getSourceFileFromCache(filename, canonicalName, /*useAbsolutePath*/ false);
            }
            else {
                var normalizedAbsolutePath = getNormalizedAbsolutePath(filename, host.getCurrentDirectory());
                var canonicalAbsolutePath = host.getCanonicalFileName(normalizedAbsolutePath);
                if (hasProperty(filesByName, canonicalAbsolutePath)) {
                    return getSourceFileFromCache(normalizedAbsolutePath, canonicalAbsolutePath, /*useAbsolutePath*/ true);
                }

                // We haven't looked for this file, do so now and cache result
                var file = filesByName[canonicalName] = host.getSourceFile(filename, options.target, hostErrorMessage => {
                    errors.push(createFileDiagnostic(refFile, refStart, refLength,
                        Diagnostics.Cannot_read_file_0_Colon_1, filename, hostErrorMessage));
                });
                if (file) {
                    seenNoDefaultLib = seenNoDefaultLib || file.hasNoDefaultLib;

                    // Set the source file for normalized absolute path
                    filesByName[canonicalAbsolutePath] = file;

                    if (!options.noResolve) {
                        var basePath = getDirectoryPath(filename);
                        processReferencedFiles(file, basePath);
                        processImportedModules(file, basePath);
                    }
                    if (isDefaultLib) {
                        files.unshift(file);
                    }
                    else {
                        files.push(file);
                    }
                    forEach(file.getSyntacticDiagnostics(), e => {
                        errors.push(e);
                    });
                }
            }
            return file;

            function getSourceFileFromCache(filename: string, canonicalName: string, useAbsolutePath: boolean): SourceFile {
                var file = filesByName[canonicalName];
                if (file && host.useCaseSensitiveFileNames()) {
                    var sourceFileName = useAbsolutePath ? getNormalizedAbsolutePath(file.filename, host.getCurrentDirectory()) : file.filename;
                    if (canonicalName !== sourceFileName) {
                        errors.push(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.Filename_0_differs_from_already_included_filename_1_only_in_casing, filename, sourceFileName));
                    }
                }
                return file;
            }
        }

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                var referencedFilename = isRootedDiskPath(ref.filename) ? ref.filename : combinePaths(basePath, ref.filename);
                processSourceFile(normalizePath(referencedFilename), /* isDefaultLib */ false, file, ref.pos, ref.end);
            });
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            forEach(file.statements, node => {
                if (isExternalModuleImportDeclaration(node) &&
                    getExternalModuleImportDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {

                    var nameLiteral = <LiteralExpression>getExternalModuleImportDeclarationExpression(node);
                    var moduleName = nameLiteral.text;
                    if (moduleName) {
                        var searchPath = basePath;
                        while (true) {
                            var searchName = normalizePath(combinePaths(searchPath, moduleName));
                            if (findModuleSourceFile(searchName + ".ts", nameLiteral) || findModuleSourceFile(searchName + ".d.ts", nameLiteral)) {
                                break;
                            }

                            var parentPath = getDirectoryPath(searchPath);
                            if (parentPath === searchPath) {
                                break;
                            }
                            searchPath = parentPath;
                        }
                    }
                }
                else if (node.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral && (node.flags & NodeFlags.Ambient || isDeclarationFile(file))) {
                    // TypeScript 1.0 spec (April 2014): 12.1.6
                    // An AmbientExternalModuleDeclaration declares an external module. 
                    // This type of declaration is permitted only in the global module.
                    // The StringLiteral must specify a top - level external module name.
                    // Relative external module names are not permitted
                    forEachChild((<ModuleDeclaration>node).body, node => {
                        if (isExternalModuleImportDeclaration(node) &&
                            getExternalModuleImportDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {

                            var nameLiteral = <LiteralExpression>getExternalModuleImportDeclarationExpression(node); 
                            var moduleName = nameLiteral.text;
                            if (moduleName) {
                                // TypeScript 1.0 spec (April 2014): 12.1.6
                                // An ExternalImportDeclaration in anAmbientExternalModuleDeclaration may reference other external modules 
                                // only through top - level external module names. Relative external module names are not permitted.
                                var searchName = normalizePath(combinePaths(basePath, moduleName));
                                var tsFile = findModuleSourceFile(searchName + ".ts", nameLiteral);
                                if (!tsFile) {
                                    findModuleSourceFile(searchName + ".d.ts", nameLiteral);
                                }
                            }
                        }
                    });
                }
            });

            function findModuleSourceFile(filename: string, nameLiteral: LiteralExpression) {
                return findSourceFile(filename, /* isDefaultLib */ false, file, nameLiteral.pos, nameLiteral.end - nameLiteral.pos);
            }
        }

        function verifyCompilerOptions() {
            if (!options.sourceMap && (options.mapRoot || options.sourceRoot)) {
                // Error to specify --mapRoot or --sourceRoot without mapSourceFiles
                if (options.mapRoot) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                if (options.sourceRoot) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                return;
            }

            var firstExternalModule = forEach(files, f => isExternalModule(f) ? f : undefined);
            if (firstExternalModule && options.module === ModuleKind.None) {
                // We cannot use createDiagnosticFromNode because nodes do not have parents yet
                var externalModuleErrorSpan = getErrorSpanForNode(firstExternalModule.externalModuleIndicator);
                var errorStart = skipTrivia(firstExternalModule.text, externalModuleErrorSpan.pos);
                var errorLength = externalModuleErrorSpan.end - errorStart;
                errors.push(createFileDiagnostic(firstExternalModule, errorStart, errorLength, Diagnostics.Cannot_compile_external_modules_unless_the_module_flag_is_provided));
            }

            // there has to be common source directory if user specified --outdir || --sourcRoot
            // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
            if (options.outDir || // there is --outDir specified
                options.sourceRoot || // there is --sourceRoot specified
                (options.mapRoot &&  // there is --mapRoot Specified and there would be multiple js files generated
                (!options.out || firstExternalModule !== undefined))) {

                var commonPathComponents: string[];
                forEach(files, sourceFile => {
                    // Each file contributes into common source file path
                    if (!(sourceFile.flags & NodeFlags.DeclarationFile)
                        && !fileExtensionIs(sourceFile.filename, ".js")) {
                        var sourcePathComponents = getNormalizedPathComponents(sourceFile.filename, host.getCurrentDirectory());
                        sourcePathComponents.pop(); // FileName is not part of directory
                        if (commonPathComponents) {
                            for (var i = 0; i < Math.min(commonPathComponents.length, sourcePathComponents.length); i++) {
                                if (commonPathComponents[i] !== sourcePathComponents[i]) {
                                    if (i === 0) {
                                        errors.push(createCompilerDiagnostic(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files));
                                        return;
                                    }

                                    // New common path found that is 0 -> i-1
                                    commonPathComponents.length = i;
                                    break;
                                }
                            }

                            // If the fileComponent path completely matched and less than already found update the length
                            if (sourcePathComponents.length < commonPathComponents.length) {
                                commonPathComponents.length = sourcePathComponents.length;
                            }
                        }
                        else {
                            // first file
                            commonPathComponents = sourcePathComponents;
                        }
                    }
                });

                commonSourceDirectory = getNormalizedPathFromPathComponents(commonPathComponents);
                if (commonSourceDirectory) {
                    // Make sure directory path ends with directory separator so this string can directly 
                    // used to replace with "" to get the relative path of the source file and the relative path doesn't
                    // start with / making it rooted path
                    commonSourceDirectory += directorySeparator;
                }
            }
        }
    }
}
