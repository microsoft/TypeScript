/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>

module ts {
    var nodeConstructors = new Array<new () => Node>(SyntaxKind.Count);

    export function getNodeConstructor(kind: SyntaxKind): new () => Node {
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    }

    function createRootNode(kind: SyntaxKind, pos: number, end: number, flags: NodeFlags): Node {
        var node = new (getNodeConstructor(kind))();
        node.pos = pos;
        node.end = end;
        node.flags = flags;
        return node;
    }

    var moduleExtensions = [".d.ts", ".ts", ".js"];

    interface ReferenceComments {
        referencedFiles: FileReference[];
        amdDependencies: string[];
    }

    export function getModuleNameFromFilename(filename: string) {
        for (var i = 0; i < moduleExtensions.length; i++) {
            var ext = moduleExtensions[i];
            var len = filename.length - ext.length;
            if (len > 0 && filename.substr(len) === ext) return filename.substr(0, len);
        }
        return filename;
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

    export function getTokenPosOfNode(node: Node): number {
        return skipTrivia(getSourceFileOfNode(node).text, node.pos);
    }

    export function getSourceTextOfNode(node: Node): string {
        var text = getSourceFileOfNode(node).text;
        return text.substring(skipTrivia(text, node.pos), node.end);
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
    export function identifierToString(identifier: Identifier) {
        return identifier.kind === SyntaxKind.Missing ? "(Missing)" : getSourceTextOfNode(identifier);
    }

    export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): Diagnostic {
        node = getErrorSpanForNode(node);
        var file = getSourceFileOfNode(node);
        var start = skipTrivia(file.text, node.pos);
        var length = node.end - start;

        return createFileDiagnostic(file, start, length, message, arg0, arg1, arg2);
    }

    export function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain): Diagnostic {
        node = getErrorSpanForNode(node);
        var file = getSourceFileOfNode(node);
        var start = skipTrivia(file.text, node.pos);
        var length = node.end - start;
        return flattenDiagnosticChain(file, start, length, messageChain);
    }

    export function getErrorSpanForNode(node: Node): Node {
        var errorSpan: Node;
        switch (node.kind) {
            // This list is a work in progress. Add missing node kinds to improve their error
            // spans.
            case SyntaxKind.VariableDeclaration:
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

    // Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
    // stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
    // embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
    // a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
    export function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodes?: (nodes: Node[]) => T): T {
        function child(node: Node): T {
            if (node) return cbNode(node);
        }
        function children(nodes: Node[]) {
            if (nodes) {
                if (cbNodes) return cbNodes(nodes);
                var result: T;
                for (var i = 0, len = nodes.length; i < len; i++) {
                    if (result = cbNode(nodes[i])) break;
                }
                return result;
            }
        }
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.QualifiedName:
                return child((<QualifiedName>node).left) ||
                    child((<QualifiedName>node).right);
            case SyntaxKind.TypeParameter:
                return child((<TypeParameterDeclaration>node).name) ||
                    child((<TypeParameterDeclaration>node).constraint);
            case SyntaxKind.Parameter:
                return child((<ParameterDeclaration>node).name) ||
                    child((<ParameterDeclaration>node).type) ||
                    child((<ParameterDeclaration>node).initializer);
            case SyntaxKind.Property:
            case SyntaxKind.PropertyAssignment:
                return child((<PropertyDeclaration>node).name) ||
                    child((<PropertyDeclaration>node).type) ||
                    child((<PropertyDeclaration>node).initializer);
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return children((<SignatureDeclaration>node).typeParameters) ||
                    children((<SignatureDeclaration>node).parameters) ||
                    child((<SignatureDeclaration>node).type);
            case SyntaxKind.Method:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                return child((<FunctionDeclaration>node).name) ||
                    children((<FunctionDeclaration>node).typeParameters) ||
                    children((<FunctionDeclaration>node).parameters) ||
                    child((<FunctionDeclaration>node).type) ||
                    child((<FunctionDeclaration>node).body);
            case SyntaxKind.TypeReference:
                return child((<TypeReferenceNode>node).typeName) ||
                    children((<TypeReferenceNode>node).typeArguments);
            case SyntaxKind.TypeQuery:
                return child((<TypeQueryNode>node).exprName);
            case SyntaxKind.TypeLiteral:
                return children((<TypeLiteralNode>node).members);
            case SyntaxKind.ArrayType:
                return child((<ArrayTypeNode>node).elementType);
            case SyntaxKind.ArrayLiteral:
                return children((<ArrayLiteral>node).elements);
            case SyntaxKind.ObjectLiteral:
                return children((<ObjectLiteral>node).properties);
            case SyntaxKind.PropertyAccess:
                return child((<PropertyAccess>node).left) ||
                    child((<PropertyAccess>node).right);
            case SyntaxKind.IndexedAccess:
                return child((<IndexedAccess>node).object) ||
                    child((<IndexedAccess>node).index);
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                return child((<CallExpression>node).func) ||
                    children((<CallExpression>node).typeArguments) ||
                    children((<CallExpression>node).arguments);
            case SyntaxKind.TypeAssertion:
                return child((<TypeAssertion>node).type) ||
                    child((<TypeAssertion>node).operand);
            case SyntaxKind.ParenExpression:
                return child((<ParenExpression>node).expression);
            case SyntaxKind.PrefixOperator:
            case SyntaxKind.PostfixOperator:
                return child((<UnaryExpression>node).operand);
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
            case SyntaxKind.FunctionBlock:
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.SourceFile:
                return children((<Block>node).statements);
            case SyntaxKind.VariableStatement:
                return children((<VariableStatement>node).declarations);
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
                return child((<ForInStatement>node).declaration) ||
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
            case SyntaxKind.DefaultClause:
                return child((<CaseOrDefaultClause>node).expression) ||
                    children((<CaseOrDefaultClause>node).statements);
            case SyntaxKind.LabelledStatement:
                return child((<LabelledStatement>node).label) ||
                    child((<LabelledStatement>node).statement);
            case SyntaxKind.ThrowStatement:
                return child((<ThrowStatement>node).expression);
            case SyntaxKind.TryStatement:
                return child((<TryStatement>node).tryBlock) ||
                    child((<TryStatement>node).catchBlock) ||
                    child((<TryStatement>node).finallyBlock);
            case SyntaxKind.CatchBlock:
                return child((<CatchBlock>node).variable) ||
                    children((<CatchBlock>node).statements);
            case SyntaxKind.VariableDeclaration:
                return child((<VariableDeclaration>node).name) ||
                    child((<VariableDeclaration>node).type) ||
                    child((<VariableDeclaration>node).initializer);
            case SyntaxKind.ClassDeclaration:
                return child((<ClassDeclaration>node).name) ||
                    children((<ClassDeclaration>node).typeParameters) ||
                    child((<ClassDeclaration>node).baseType) ||
                    children((<ClassDeclaration>node).implementedTypes) ||
                    children((<ClassDeclaration>node).members);
            case SyntaxKind.InterfaceDeclaration:
                return child((<InterfaceDeclaration>node).name) ||
                    children((<InterfaceDeclaration>node).typeParameters) ||
                    children((<InterfaceDeclaration>node).baseTypes) ||
                    children((<InterfaceDeclaration>node).members);
            case SyntaxKind.EnumDeclaration:
                return child((<EnumDeclaration>node).name) ||
                    children((<EnumDeclaration>node).members);
            case SyntaxKind.EnumMember:
                return child((<EnumMember>node).name) ||
                    child((<EnumMember>node).initializer);
            case SyntaxKind.ModuleDeclaration:
                return child((<ModuleDeclaration>node).name) ||
                    child((<ModuleDeclaration>node).body);
            case SyntaxKind.ImportDeclaration:
                return child((<ImportDeclaration>node).name) ||
                    child((<ImportDeclaration>node).entityName) ||
                    child((<ImportDeclaration>node).externalModuleName);
            case SyntaxKind.ExportAssignment:
                return child((<ExportAssignment>node).exportName);
        }
    }

    export function hasRestParameters(s: SignatureDeclaration): boolean {
        return s.parameters.length > 0 && (s.parameters[s.parameters.length - 1].flags & NodeFlags.Rest) !== 0;
    }

    enum ParsingContext {
        SourceElements,          // Elements in source file
        ModuleElements,          // Elements in module declaration
        BlockStatements,         // Statements in block
        SwitchClauses,           // Clauses in switch statement
        SwitchClauseStatements,  // Statements in switch clause
        TypeMembers,             // Members in interface or type literal
        ClassMembers,            // Members in class declaration
        EnumMembers,             // Members in enum declaration
        BaseTypeReferences,      // Type references in extends or implements clause
        VariableDeclarations,    // Variable declarations in variable statement
        ArgumentExpressions,     // Expressions in argument list
        ObjectLiteralMembers,    // Members in object literal
        ArrayLiteralMembers,     // Members in array literal
        Parameters,              // Parameters in parameter list
        TypeParameters,          // Type parameters in type parameter list
        TypeArguments,           // Type arguments in type argument list
        Count                    // Number of parsing contexts
    }

    enum Tristate {
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
            case ParsingContext.BaseTypeReferences:     return Diagnostics.Type_reference_expected;
            case ParsingContext.VariableDeclarations:   return Diagnostics.Variable_declaration_expected;
            case ParsingContext.ArgumentExpressions:    return Diagnostics.Argument_expression_expected;
            case ParsingContext.ObjectLiteralMembers:   return Diagnostics.Property_assignment_expected;
            case ParsingContext.ArrayLiteralMembers:    return Diagnostics.Expression_or_comma_expected;
            case ParsingContext.Parameters:             return Diagnostics.Parameter_declaration_expected;
            case ParsingContext.TypeParameters:         return Diagnostics.Type_parameter_declaration_expected;
            case ParsingContext.TypeArguments:          return Diagnostics.Type_argument_expected;
        }
    };

    enum LookAheadMode {
        NotLookingAhead,
        NoErrorYet,
        Error
    }

    enum ModifierContext {
        SourceElements,          // Top level elements in a source file
        ModuleElements,          // Elements in module declaration
        ClassMembers,            // Members in class declaration
        Parameters,              // Parameters in parameter list
    }

    enum TrailingCommaBehavior {
        Disallow,
        Allow,
        Preserve
    }

    export function createSourceFile(filename: string, sourceText: string, languageVersion: ScriptTarget): SourceFile {
        var file: SourceFile;
        var scanner: Scanner;
        var token: SyntaxKind;
        var parsingContext: ParsingContext;
        var commentRanges: TextRange[];
        var identifiers: Map<string> = {};
        var identifierCount = 0;
        var nodeCount = 0;
        var lineStarts: number[];

        var lookAheadMode = LookAheadMode.NotLookingAhead;
        var inAmbientContext = false;

        function getLineAndCharacterlFromSourcePosition(position: number) {
            if (!lineStarts) {
                lineStarts = getLineStarts(sourceText);
            }
            return getLineAndCharacterOfPosition(lineStarts, position);
        }

        function error(message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            var start = scanner.getTokenPos();
            var length = scanner.getTextPos() - start;

            errorAtPos(start, length, message, arg0, arg1, arg2);
        }

        // This is just like createDiagnosticForNode except that it uses the current file
        // being parsed instead of the file containing the node. This is because during
        // parse, the nodes do not have parent pointers to get to the file.
        //
        // It is very intentional that we are not checking or changing the lookAheadMode value
        // here. 'grammarErrorOnNode' is called when we are doing extra grammar checks and not
        // when we are doing the actual parsing to determine what the user wrote.  In other 
        // words, this function is called once we have already parsed the node, and are just
        // applying some stricter checks on that node.
        function grammarErrorOnNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            var span = getErrorSpanForNode(node);
            var start = skipTrivia(file.text, span.pos);
            var length = span.end - start;

            file.syntacticErrors.push(createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
        }

        function grammarErrorAtPos(start: number, length: number, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            file.syntacticErrors.push(createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
        }

        function errorAtPos(start: number, length: number, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            var lastErrorPos = file.syntacticErrors.length
                ? file.syntacticErrors[file.syntacticErrors.length - 1].start
                : -1;
            if (start !== lastErrorPos) {
                file.syntacticErrors.push(createFileDiagnostic(file, start, length, message, arg0, arg1, arg2));
            }

            if (lookAheadMode === LookAheadMode.NoErrorYet) {
                lookAheadMode = LookAheadMode.Error;
            }
        }

        function scanError(message: DiagnosticMessage) {
            var pos = scanner.getTextPos();
            errorAtPos(pos, 0, message);
        }

        function onComment(pos: number, end: number) {
            if (commentRanges) commentRanges.push({ pos: pos, end: end });
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

        function lookAheadHelper<T>(callback: () => T, alwaysResetState: boolean): T {
            // Keep track of the state we'll need to rollback to if lookahead fails (or if the 
            // caller asked us to always reset our state).
            var saveToken = token;
            var saveSyntacticErrorsLength = file.syntacticErrors.length;

            // Keep track of the current look ahead mode (this matters if we have nested 
            // speculative parsing).
            var saveLookAheadMode = lookAheadMode;

            // Mark that we're in speculative parsing and then try to parse out whatever code
            // the callback wants.
            lookAheadMode = LookAheadMode.NoErrorYet;
            var result = callback();

            // If we switched from 1 to to -1 then a parse error occurred during the callback.
            // If that's the case, then we want to act as if we never got any result at all.
            Debug.assert(lookAheadMode === LookAheadMode.Error || lookAheadMode === LookAheadMode.NoErrorYet);
            if (lookAheadMode === LookAheadMode.Error) {
                result = undefined;
            }

            // Now restore as appropriate.
            lookAheadMode = saveLookAheadMode;
            if (!result || alwaysResetState) {
                token = saveToken;
                file.syntacticErrors.length = saveSyntacticErrorsLength;
            }

            return result;
        }

        function lookAhead<T>(callback: () => T): T {
            var result: T;
            scanner.tryScan(() => {
                result = lookAheadHelper(callback, /*alwaysResetState:*/ true);

                // Returning false here indicates to the scanner that it should always jump
                // back to where it started.  This makes sense as 'lookahead' acts as if 
                // neither the parser nor scanner was affected by the operation.
                //
                // Note: the rewinding of the parser state is already handled in lookAheadHelper
                // (because we passed 'true' for alwaysResetState).
                return false;
            });

            return result;
        }

        function tryParse<T>(callback: () => T): T {
            return scanner.tryScan(() => lookAheadHelper(callback, /*alwaysResetState:*/ false));
        }

        function isIdentifier(): boolean {
            return token === SyntaxKind.Identifier || token > SyntaxKind.LastReservedWord;
        }

        function isSemicolon(): boolean {
            // True if real or automatic semicolon
            return token === SyntaxKind.SemicolonToken || token === SyntaxKind.CloseBraceToken || scanner.hasPrecedingLineBreak();
        }

        function parseExpected(t: SyntaxKind): boolean {
            if (token === t) {
                nextToken();
                return true;
            }
            error(Diagnostics._0_expected, tokenToString(t));
            return false;
        }

        function parseOptional(t: SyntaxKind): boolean {
            if (token === t) {
                nextToken();
                return true;
            }
            return false;
        }

        function canParseSemicolon() {
            // If there's a real semicolon, then we can always parse it out.
            if (token === SyntaxKind.SemicolonToken) {
                return true;
            }

            // We can parse out an optional semicolon in ASI cases in the following cases.
            return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
        }

        function parseSemicolon(): void {
            if (canParseSemicolon()) {
                if (token === SyntaxKind.SemicolonToken) {
                    // consume the semicolon if it was explicitly provided.
                    nextToken();
                }
            }
            else {
                error(Diagnostics._0_expected, ";");
            }
        }

        function createNode(kind: SyntaxKind, pos?: number): Node {
            nodeCount++;
            var node = new (nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind)))();
            if (!(pos >= 0)) pos = scanner.getStartPos();
            node.pos = pos;
            node.end = pos;
            return node;
        }

        function finishNode<T extends Node>(node: T): T {
            node.end = scanner.getStartPos();
            return node;
        }

        function createMissingNode(): Node {
            return createNode(SyntaxKind.Missing);
        }

        // An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
        // with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
        // each identifier in order to reduce memory consumption.
        function createIdentifier(isIdentifier: boolean): Identifier {
            identifierCount++;
            if (isIdentifier) {
                var node = <Identifier>createNode(SyntaxKind.Identifier);
                var text = escapeIdentifier(scanner.getTokenValue());
                node.text = hasProperty(identifiers, text) ? identifiers[text] : (identifiers[text] = text);
                nextToken();
                return finishNode(node);
            }
            error(Diagnostics.Identifier_expected);
            return <Identifier>createMissingNode();
        }

        function parseIdentifier(): Identifier {
            return createIdentifier(isIdentifier());
        }

        function parseIdentifierName(): Identifier {
            return createIdentifier(token >= SyntaxKind.Identifier);
        }

        function isPropertyName(): boolean {
            return token >= SyntaxKind.Identifier || token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral;
        }

        function parsePropertyName(): Identifier {
            if (token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral) {
                return <LiteralExpression>parsePrimaryExpression();
            }
            return parseIdentifierName();
        }


        function isKeyword(token: SyntaxKind): boolean {
            return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
        }

        function isModifier(token: SyntaxKind): boolean {
            switch (token) {
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.DeclareKeyword:
                    return true;
            }
            return false;
        }

        function parseContextualModifier(t: SyntaxKind): boolean {
            return token === t && tryParse(() => {
                nextToken();
                return token === SyntaxKind.OpenBracketToken || isPropertyName();
            });
        }

        function parseAnyContextualModifier(): boolean {
            return isModifier(token) && tryParse(() => {
                nextToken();
                return token === SyntaxKind.OpenBracketToken || isPropertyName();
            });
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
                    return isTypeMember();
                case ParsingContext.ClassMembers:
                    return lookAhead(isClassMemberStart);
                case ParsingContext.EnumMembers:
                case ParsingContext.ObjectLiteralMembers:
                    return isPropertyName();
                case ParsingContext.BaseTypeReferences:
                    return isIdentifier() && ((token !== SyntaxKind.ExtendsKeyword && token !== SyntaxKind.ImplementsKeyword) || !lookAhead(() => (nextToken(), isIdentifier())));
                case ParsingContext.VariableDeclarations:
                case ParsingContext.TypeParameters:
                    return isIdentifier();
                case ParsingContext.ArgumentExpressions:
                    return isExpression();
                case ParsingContext.ArrayLiteralMembers:
                    return token === SyntaxKind.CommaToken || isExpression();
                case ParsingContext.Parameters:
                    return isParameter();
                case ParsingContext.TypeArguments:
                    return isType();
            }

            Debug.fail("Non-exhaustive case in 'isListElement'.");
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
                    return token === SyntaxKind.CloseBraceToken;
                case ParsingContext.SwitchClauseStatements:
                    return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
                case ParsingContext.BaseTypeReferences:
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
                    return token === SyntaxKind.CloseBracketToken;
                case ParsingContext.Parameters:
                    // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
                    return token === SyntaxKind.CloseParenToken || token === SyntaxKind.CloseBracketToken || token === SyntaxKind.OpenBraceToken;
                case ParsingContext.TypeArguments:
                    // Tokens other than '>' are here for better error recovery
                    return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken;
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
        function parseList<T extends Node>(kind: ParsingContext, parseElement: () => T): NodeArray<T> {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = <NodeArray<T>>[];
            result.pos = getNodePos();
            while (!isListTerminator(kind)) {
                if (isListElement(kind, /* inErrorRecovery */ false)) {
                    result.push(parseElement());
                }
                else {
                    error(parsingContextErrors(kind));
                    if (isInSomeParsingContext()) {
                        break;
                    }
                    nextToken();
                }
            }
            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }

        // Parses a comma-delimited list of elements
        function parseDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T, trailingCommaBehavior: TrailingCommaBehavior): NodeArray<T> {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = <NodeArray<T>>[];
            result.pos = getNodePos();
            // Keep track of how many errors we had before the list started. If we don't see any new
            // errors resulting from the list being malformed, we are free to complain about a trailing comma.
            var errorCountBeforeParsingList = file.syntacticErrors.length;
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
                    error(Diagnostics._0_expected, ",");
                }
                else if (isListTerminator(kind)) {
                    // Check if the last token was a comma.
                    if (commaStart >= 0) {
                        if (trailingCommaBehavior === TrailingCommaBehavior.Disallow) {
                            if (file.syntacticErrors.length === errorCountBeforeParsingList) {
                                // Report a grammar error so we don't affect lookahead
                                grammarErrorAtPos(commaStart, scanner.getStartPos() - commaStart, Diagnostics.Trailing_comma_not_allowed);
                            }
                        }
                        else if (trailingCommaBehavior === TrailingCommaBehavior.Preserve) {
                            result.push(<T>createNode(SyntaxKind.OmittedExpression));
                        }
                    }

                    break;
                }
                else {
                    error(parsingContextErrors(kind));
                    if (isInSomeParsingContext()) {
                        break;
                    }
                    nextToken();
                }
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

        function createNodeArray<T extends Node>(node: T): NodeArray<T> {
            var result = <NodeArray<T>>[node];
            result.pos = node.pos;
            result.end = node.end;
            return result;
        }

        function parseBracketedList<T extends Node>(kind: ParsingContext, parseElement: () => T, startToken: SyntaxKind, endToken: SyntaxKind): NodeArray<T> {
            if (parseExpected(startToken)) {
                var result = parseDelimitedList(kind, parseElement, TrailingCommaBehavior.Disallow);
                parseExpected(endToken);
                return result;
            }
            return createMissingList<T>();
        }

        function parseEntityName(): EntityName {
            var entity: EntityName = parseIdentifier();
            while (parseOptional(SyntaxKind.DotToken)) {
                var node = <QualifiedName>createNode(SyntaxKind.QualifiedName, entity.pos);
                node.left = entity;
                node.right = parseIdentifier();
                entity = finishNode(node);
            }
            return entity;
        }

        function parseTokenNode(): Node {
            var node = createNode(token);
            nextToken();
            return finishNode(node);
        }

        function parseLiteralNode(): LiteralExpression {
            var node = <LiteralExpression>createNode(token);
            node.text = scanner.getTokenValue();
            nextToken();
            return finishNode(node);
        }

        function parseStringLiteral(): LiteralExpression {
            if (token === SyntaxKind.StringLiteral) return parseLiteralNode();
            error(Diagnostics.String_literal_expected);
            return <LiteralExpression>createMissingNode();
        }

        // TYPES

        function parseTypeReference(): TypeReferenceNode {
            var node = <TypeReferenceNode>createNode(SyntaxKind.TypeReference);
            node.typeName = parseEntityName();
            if (!scanner.hasPrecedingLineBreak() && token === SyntaxKind.LessThanToken) {
                node.typeArguments = parseTypeArguments();
            }
            return finishNode(node);
        }

        function parseTypeQuery(): TypeQueryNode {
            var node = <TypeQueryNode>createNode(SyntaxKind.TypeQuery);
            parseExpected(SyntaxKind.TypeOfKeyword);
            node.exprName = parseEntityName();
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
                if (isType() || !isExpression()) {
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
                    var expr = parseUnaryExpression();
                    grammarErrorOnNode(expr, Diagnostics.Type_expected);
                }
            }

            return finishNode(node);
        }

        function parseTypeParameters(): NodeArray<TypeParameterDeclaration> {
            if (token === SyntaxKind.LessThanToken) {
                var pos = getNodePos();
                var result = parseBracketedList(ParsingContext.TypeParameters, parseTypeParameter, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
                if (!result.length) {
                    var start = getTokenPos(pos);
                    var length = getNodePos() - start;
                    errorAtPos(start, length, Diagnostics.Type_parameter_list_cannot_be_empty);
                }
                return result;
            }
        }

        function parseParameterType(): TypeNode {
            return parseOptional(SyntaxKind.ColonToken) ? token === SyntaxKind.StringLiteral ? parseStringLiteral() : parseType() : undefined;
        }

        function isParameter(): boolean {
            return token === SyntaxKind.DotDotDotToken || isIdentifier() || isModifier(token);
        }

        function parseParameter(flags: NodeFlags = 0): ParameterDeclaration {
            var node = <ParameterDeclaration>createNode(SyntaxKind.Parameter);
            node.flags |= parseAndCheckModifiers(ModifierContext.Parameters);
            if (parseOptional(SyntaxKind.DotDotDotToken)) {
                node.flags |= NodeFlags.Rest;
            }
            node.name = parseIdentifier();
            if (parseOptional(SyntaxKind.QuestionToken)) {
                node.flags |= NodeFlags.QuestionMark;
            }
            node.type = parseParameterType();
            node.initializer = parseInitializer(/*inParameter*/ true);

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

        function parseSignature(kind: SyntaxKind, returnToken: SyntaxKind): ParsedSignature {
            if (kind === SyntaxKind.ConstructSignature) {
                parseExpected(SyntaxKind.NewKeyword);
            }
            var typeParameters = parseTypeParameters();
            var parameters = parseParameterList(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken);
            checkParameterList(parameters);
            var type = parseOptional(returnToken) ? parseType() : undefined;
            return {
                typeParameters: typeParameters,
                parameters: parameters,
                type: type
            };
        }

        // Because we use this for index signatures as well, we sometimes use
        // parentheses, and sometimes use brackets.
        function parseParameterList(startDelimiter: SyntaxKind, endDelimiter: SyntaxKind) {
            return parseBracketedList(ParsingContext.Parameters, parseParameter, startDelimiter, endDelimiter);
        }

        function checkParameterList(parameters: NodeArray<ParameterDeclaration>): void {
            var seenOptionalParameter = false;
            var parameterCount = parameters.length;

            for (var i = 0; i < parameterCount; i++) {
                var parameter = parameters[i];

                if (parameter.flags & NodeFlags.Rest) {
                    if (i !== (parameterCount - 1)) {
                        grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                        return;
                    }

                    if (parameter.flags & NodeFlags.QuestionMark) {
                        grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_cannot_be_optional);
                        return;
                    }

                    if (parameter.initializer) {
                        grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                        return;
                    }
                }
                else if (parameter.flags & NodeFlags.QuestionMark || parameter.initializer) {
                    seenOptionalParameter = true;

                    if (parameter.flags & NodeFlags.QuestionMark && parameter.initializer) {
                        grammarErrorOnNode(parameter.name, Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                        return;
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        grammarErrorOnNode(parameter.name, Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                        return;
                    }
                }
            }
        }

        function parseSignatureMember(kind: SyntaxKind, returnToken: SyntaxKind): SignatureDeclaration {
            var node = <SignatureDeclaration>createNode(kind);
            var sig = parseSignature(kind, returnToken);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            parseSemicolon();
            return finishNode(node);
        }

        function parseIndexSignatureMember(): SignatureDeclaration {
            var node = <SignatureDeclaration>createNode(SyntaxKind.IndexSignature);
            var errorCountBeforeIndexSignature = file.syntacticErrors.length;
            var indexerStart = scanner.getTokenPos();
            node.parameters = parseParameterList(SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
            var indexerLength = scanner.getStartPos() - indexerStart;
            node.type = parseTypeAnnotation();
            parseSemicolon();
            if (file.syntacticErrors.length === errorCountBeforeIndexSignature) {
                checkIndexSignature(node, indexerStart, indexerLength);
            }
            return finishNode(node);
        }

        function checkIndexSignature(node: SignatureDeclaration, indexerStart: number, indexerLength: number): void {
            var parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                var arityDiagnostic = Diagnostics.An_index_signature_must_have_exactly_one_parameter
                if (parameter) {
                    grammarErrorOnNode(parameter.name, arityDiagnostic);
                }
                else {
                    grammarErrorAtPos(indexerStart, indexerLength, arityDiagnostic);
                }
                return;
            }
            else if (parameter.flags & NodeFlags.Rest) {
                grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
                return;
            }
            else if (parameter.flags & NodeFlags.Modifier) {
                grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
                return;
            }
            else if (parameter.flags & NodeFlags.QuestionMark) {
                grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
                return;
            }
            else if (parameter.initializer) {
                grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
                return;
            }
            else if (!parameter.type) {
                grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
                return;
            }
            else if (parameter.type.kind !== SyntaxKind.StringKeyword &&
                parameter.type.kind !== SyntaxKind.NumberKeyword) {
                grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
                return;
            }
            else if (!node.type) {
                grammarErrorAtPos(indexerStart, indexerLength, Diagnostics.An_index_signature_must_have_a_type_annotation);
                return;
            }
        }

        function parsePropertyOrMethod(): Declaration {
            var node = <Declaration>createNode(SyntaxKind.Unknown);
            node.name = parsePropertyName();
            if (parseOptional(SyntaxKind.QuestionToken)) {
                node.flags |= NodeFlags.QuestionMark;
            }
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                node.kind = SyntaxKind.Method;
                var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
                (<MethodDeclaration>node).typeParameters = sig.typeParameters;
                (<MethodDeclaration>node).parameters = sig.parameters;
                (<MethodDeclaration>node).type = sig.type;
            }
            else {
                node.kind = SyntaxKind.Property;
                (<PropertyDeclaration>node).type = parseTypeAnnotation();
            }
            parseSemicolon();
            return finishNode(node);
        }

        function isTypeMember(): boolean {
            switch (token) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.OpenBracketToken:
                    return true;
                default:
                    return isPropertyName() && lookAhead(() => nextToken() === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken || token === SyntaxKind.QuestionToken ||
                        token === SyntaxKind.ColonToken || canParseSemicolon());
            }
        }

        function parseTypeMember(): Declaration {
            switch (token) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                    return parseSignatureMember(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
                case SyntaxKind.OpenBracketToken:
                    return parseIndexSignatureMember();
                case SyntaxKind.NewKeyword:
                    if (lookAhead(() => nextToken() === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken)) {
                        return parseSignatureMember(SyntaxKind.ConstructSignature, SyntaxKind.ColonToken);
                    }
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                    return parsePropertyOrMethod();
                default:
                    if (token >= SyntaxKind.Identifier) {
                        return parsePropertyOrMethod();
                    }
            }
        }

        function parseTypeLiteral(): TypeLiteralNode {
            var node = <TypeLiteralNode>createNode(SyntaxKind.TypeLiteral);
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.members = parseList(ParsingContext.TypeMembers, parseTypeMember);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<Node>();
            }
            return finishNode(node);
        }

        function parseFunctionType(signatureKind: SyntaxKind): TypeLiteralNode {
            var node = <TypeLiteralNode>createNode(SyntaxKind.TypeLiteral);
            var member = <SignatureDeclaration>createNode(signatureKind);
            var sig = parseSignature(signatureKind, SyntaxKind.EqualsGreaterThanToken);
            member.typeParameters = sig.typeParameters;
            member.parameters = sig.parameters;
            member.type = sig.type;
            finishNode(member);
            node.members = createNodeArray(member);
            return finishNode(node);
        }

        function parseKeywordAndNoDot(): Node {
            var node = parseTokenNode();
            return token === SyntaxKind.DotToken ? undefined : node;
        }

        function parseNonArrayType(): TypeNode {
            switch (token) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.VoidKeyword:
                    var node = tryParse(parseKeywordAndNoDot);
                    return node || parseTypeReference();
                case SyntaxKind.TypeOfKeyword:
                    return parseTypeQuery();
                case SyntaxKind.OpenBraceToken:
                    return parseTypeLiteral();
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                    return parseFunctionType(SyntaxKind.CallSignature);
                case SyntaxKind.NewKeyword:
                    return parseFunctionType(SyntaxKind.ConstructSignature);
                default:
                    if (isIdentifier()) {
                        return parseTypeReference();
                    }
            }
            error(Diagnostics.Type_expected);
            return <TypeNode>createMissingNode();
        }

        function isType(): boolean {
            switch (token) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.NewKeyword:
                    return true;
                case SyntaxKind.OpenParenToken:
                    // Only consider an ( as the start of a type if we have  ()  or  (id
                    // We don't want to consider things like  (1)  as a function type.
                    return lookAhead(() => {
                        nextToken();
                        return token === SyntaxKind.CloseParenToken || isParameter();
                    });
                default:
                    return isIdentifier();
            }
        }

        function parseType(): TypeNode {
            var type = parseNonArrayType();
            while (type && !scanner.hasPrecedingLineBreak() && parseOptional(SyntaxKind.OpenBracketToken)) {
                parseExpected(SyntaxKind.CloseBracketToken);
                var node = <ArrayTypeNode>createNode(SyntaxKind.ArrayType, type.pos);
                node.elementType = type;
                type = finishNode(node);
            }
            return type;
        }

        function parseTypeAnnotation(): TypeNode {
            return parseOptional(SyntaxKind.ColonToken) ? parseType() : undefined;
        }

        // EXPRESSIONS

        function isExpression(): boolean {
            switch (token) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
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
                    return true;
                default:
                    return isIdentifier();
            }
        }

        function isExpressionStatement(): boolean {
            // As per the grammar, neither '{' nor 'function' can start an expression statement.
            return token !== SyntaxKind.OpenBraceToken && token !== SyntaxKind.FunctionKeyword && isExpression();
        }

        function parseExpression(noIn?: boolean): Expression {
            var expr = parseAssignmentExpression(noIn);
            while (parseOptional(SyntaxKind.CommaToken)) {
                expr = makeBinaryExpression(expr, SyntaxKind.CommaToken, parseAssignmentExpression(noIn));
            }
            return expr;
        }

        function parseInitializer(inParameter: boolean, noIn?: boolean): Expression {
            if (token !== SyntaxKind.EqualsToken) {
                // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
                // there is no newline after the last token and if we're on an expression.  If so, parse
                // this as an equals-value clause with a missing equals.
                // NOTE: There are two places where we allow equals-value clauses.  The first is in a 
                // variable declarator.  The second is with a parameter.  For variable declarators
                // it's more likely that a { would be a allowed (as an object literal).  While this
                // is also allowed for parameters, the risk is that we consume the { as an object
                // literal when it really will be for the block following the parameter.
                if (scanner.hasPrecedingLineBreak() || (inParameter && token === SyntaxKind.OpenBraceToken) || !isExpression()) {
                    // preceding line break, open brace in a parameter (likely a function body) or current token is not an expression - 
                    // do not try to parse initializer
                    return undefined;
                }
            }

            parseExpected(SyntaxKind.EqualsToken);
            return parseAssignmentExpression(noIn);
        }

        function parseAssignmentExpression(noIn?: boolean): Expression {
            // Augmented by TypeScript:
            //
            //  AssignmentExpression[in]:
            //      1) ConditionalExpression[in]
            //      2) LeftHandSideExpression = AssignmentExpression[in]
            //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[in]
            //      4) ArrowFunctionExpression <-- added by TypeScript
            //
            // Note: for ease of implementation we treat productions '2' and '3' as the same thing. 
            // (i.e. they're both BinaryExpressions with an assignment operator in it).

            // First, check if we have production '4' (an arrow function).  Note that if we do, we
            // must *not* recurse for productsion 1, 2 or 3. An ArrowFunction is not a 
            // LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done 
            // with AssignmentExpression if we see one.
            var arrowExpression = tryParseArrowFunctionExpression();
            if (arrowExpression) {
                return arrowExpression;
            }

            // Now try to handle the rest of the cases.  First, see if we can parse out up to and
            // including a conditional expression.
            var expr = parseConditionalExpression(noIn);

            // Now see if we might be in cases '2' or '3'.
            // If the expression was a LHS expression, and we  have an assignment operator, then 
            // we're in '2' or '3'.  Consume the assignement and return.
            if (isLeftHandSideExpression(expr) && isAssignmentOperator()) {
                var operator = token;
                nextToken();
                return makeBinaryExpression(expr, operator, parseAssignmentExpression(noIn));
            }

            // otherwise this was production '1'.  Return whatever we parsed so far.
            return expr;
        }

        function isLeftHandSideExpression(expr: Expression): boolean {
            if (expr) {
                switch (expr.kind) {
                    case SyntaxKind.PropertyAccess:
                    case SyntaxKind.IndexedAccess:
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.ArrayLiteral:
                    case SyntaxKind.ParenExpression:
                    case SyntaxKind.ObjectLiteral:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.Identifier:
                    case SyntaxKind.Missing:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
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

        function tryParseArrowFunctionExpression(): Expression {
            return isSimpleArrowFunctionExpression()
                ? parseSimpleArrowFunctionExpression()
                : tryParseParenthesizedArrowFunctionExpression();
        }

        function isSimpleArrowFunctionExpression(): boolean {
            if (token === SyntaxKind.EqualsGreaterThanToken) {
                // ERROR RECOVERY TWEAK:
                // If we see a standalone => try to parse it as an arrow function expression as that's
                // likely whatthe user intended to write.
                return true;
            }

            if (token === SyntaxKind.Identifier) {
                // if we see:    a => 
                // then this is clearly an arrow function expression.
                return lookAhead(() => {
                    return nextToken() === SyntaxKind.EqualsGreaterThanToken;
                });
            }

            // Definitely not a simple arrow function expression.
            return false;
        }

        function parseSimpleArrowFunctionExpression(): Expression {
            Debug.assert(token === SyntaxKind.Identifier || token === SyntaxKind.EqualsGreaterThanToken);

            // Get the identifier for the simple arrow.  If one isn't there then we'll report a useful
            // message that it is missing.
            var identifier = parseIdentifier();

            Debug.assert(token === SyntaxKind.EqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
            parseExpected(SyntaxKind.EqualsGreaterThanToken);

            var parameter = <ParameterDeclaration>createNode(SyntaxKind.Parameter, identifier.pos);
            parameter.name = identifier;
            finishNode(parameter);

            var signature = <ParsedSignature> { parameters: [parameter] };

            return parseArrowExpressionTail(identifier.pos, signature, /*noIn:*/ false);
        }

        function tryParseParenthesizedArrowFunctionExpression(): Expression {
            var pos = getNodePos();

            var triState = isParenthesizedArrowFunctionExpression();

            // It is not a parenthesized arrow function.
            if (triState === Tristate.False) {
                return undefined;
            }

            // If we're certain that we have an arrow function expression, then just parse one out.
            if (triState === Tristate.True) {
                var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);

                // If we have an arrow, then try to parse the body.
                if (parseExpected(SyntaxKind.EqualsGreaterThanToken)) {
                    return parseArrowExpressionTail(pos, sig, /*noIn:*/ false);
                }
                // If not, we're probably better off bailing out and returning a bogus function expression.
                else {
                    return makeFunctionExpression(SyntaxKind.ArrowFunction, pos, /* name */ undefined, sig, createMissingNode());
                }
            }
            
            // Otherwise, *maybe* we had an arrow function and we need to *try* to parse it out
            // (which will ensure we rollback if we fail).
            var sig = tryParse(parseSignatureAndArrow);
            if (sig === undefined) {
                return undefined;
            }
            else {
                return parseArrowExpressionTail(pos, sig, /*noIn:*/ false);
            }
        }

        //  True        -> There is definitely a parenthesized arrow function here. 
        //  False       -> There is definitely *not* a parenthesized arrow function here.
        //  Unknown     -> There *might* be a parenthesized arrow function here.
        //                  Speculatively look ahead to be sure.
        function isParenthesizedArrowFunctionExpression(): Tristate {
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return lookAhead(() => {
                    var first = token;
                    nextToken();
                    if (first === SyntaxKind.OpenParenToken) {
                        if (token === SyntaxKind.CloseParenToken || token === SyntaxKind.DotDotDotToken) {
                            // Simple cases.  if we see ()   or   (...   then presume that presume 
                            // that this must be an arrow function.  Note, this may be too aggressive
                            // for the "()" case.  It's not uncommon for this to appear while editing 
                            // code.  We should look to see if there's actually a => before proceeding.
                            return Tristate.True;
                        }

                        if (!isIdentifier()) {
                            // We had "(" not followed by an identifier.  This definitely doesn't 
                            // look like a lambda.  Note: we could be a little more lenient and allow
                            // (public   or  (private.  These would not ever actually be allowed,
                            // but we could provide a good error message instead of bailing out.
                            return Tristate.False;
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
                });
            }

            // Definitely not a parenthesized arrow function.
            return Tristate.False;
        }

        function parseSignatureAndArrow(): ParsedSignature {
            var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
            parseExpected(SyntaxKind.EqualsGreaterThanToken);
            return sig;
        }

        function parseArrowExpressionTail(pos: number, sig: ParsedSignature, noIn: boolean): FunctionExpression {
            var body: Node;

            if (token === SyntaxKind.OpenBraceToken) {
                body = parseBody(/* ignoreMissingOpenBrace */ false)
            }
            else if (isStatement(/* inErrorRecovery */ true) && !isExpressionStatement() && token !== SyntaxKind.FunctionKeyword) {
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
                body = parseBody(/* ignoreMissingOpenBrace */ true);
            }
            else {
                body = parseAssignmentExpression(noIn);
            }

            return makeFunctionExpression(SyntaxKind.ArrowFunction, pos, /* name */ undefined, sig, body);
        }

        function isAssignmentOperator(): boolean {
            return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
        }

        function parseConditionalExpression(noIn?: boolean): Expression {
            var expr = parseBinaryExpression(noIn);
            while (parseOptional(SyntaxKind.QuestionToken)) {
                var node = <ConditionalExpression>createNode(SyntaxKind.ConditionalExpression, expr.pos);
                node.condition = expr;
                node.whenTrue = parseAssignmentExpression(false);
                parseExpected(SyntaxKind.ColonToken);
                node.whenFalse = parseAssignmentExpression(noIn);
                expr = finishNode(node);
            }
            return expr;
        }

        function parseBinaryExpression(noIn?: boolean): Expression {
            return parseBinaryOperators(parseUnaryExpression(), 0, noIn);
        }

        function parseBinaryOperators(expr: Expression, minPrecedence: number, noIn?: boolean): Expression {
            while (true) {
                reScanGreaterToken();
                var precedence = getOperatorPrecedence();
                if (precedence && precedence > minPrecedence && (!noIn || token !== SyntaxKind.InKeyword)) {
                    var operator = token;
                    nextToken();
                    expr = makeBinaryExpression(expr, operator, parseBinaryOperators(parseUnaryExpression(), precedence, noIn));
                    continue;
                }
                return expr;
            }
        }

        function getOperatorPrecedence(): number {
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
            return undefined;
        }

        function makeBinaryExpression(left: Expression, operator: SyntaxKind, right: Expression): BinaryExpression {
            var node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, left.pos);
            node.left = left;
            node.operator = operator;
            node.right = right;
            return finishNode(node);
        }

        function parseUnaryExpression(): Expression {
            var pos = getNodePos();
            switch (token) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.DeleteKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    var operator = token;
                    nextToken();
                    var operand = parseUnaryExpression();
                    return makeUnaryExpression(SyntaxKind.PrefixOperator, pos, operator, operand);
                case SyntaxKind.LessThanToken:
                    return parseTypeAssertion();
            }

            var primaryExpression = parsePrimaryExpression();
            // TS 1.0 spec (2014): 4.8
            // CallExpression:  ( Modified )
            //  super   (   ArgumentListopt   )
            //  super   .   IdentifierName
            var illegalUsageOfSuperKeyword =
                primaryExpression.kind === SyntaxKind.SuperKeyword && token !== SyntaxKind.OpenParenToken && token !== SyntaxKind.DotToken;

            if (illegalUsageOfSuperKeyword) {
                error(Diagnostics.super_must_be_followed_by_argument_list_or_member_access);
            }

            var expr = parseCallAndAccess(primaryExpression, /* inNewExpression */ false);

            Debug.assert(isLeftHandSideExpression(expr));
            if ((token === SyntaxKind.PlusPlusToken || token === SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
                var operator = token;
                nextToken();
                expr = makeUnaryExpression(SyntaxKind.PostfixOperator, expr.pos, operator, expr);
            }

            return expr;
        }

        function parseTypeAssertion(): TypeAssertion {
            var node = <TypeAssertion>createNode(SyntaxKind.TypeAssertion);
            parseExpected(SyntaxKind.LessThanToken);
            node.type = parseType();
            parseExpected(SyntaxKind.GreaterThanToken);
            node.operand = parseUnaryExpression();
            return finishNode(node);
        }

        function makeUnaryExpression(kind: SyntaxKind, pos: number, operator: SyntaxKind, operand: Expression): UnaryExpression {
            var node = <UnaryExpression>createNode(kind, pos);
            node.operator = operator;
            node.operand = operand;
            return finishNode(node);
        }

        function parseCallAndAccess(expr: Expression, inNewExpression: boolean): Expression {
            while (true) {
                if (parseOptional(SyntaxKind.DotToken)) {
                    var propertyAccess = <PropertyAccess>createNode(SyntaxKind.PropertyAccess, expr.pos);
                    propertyAccess.left = expr;
                    propertyAccess.right = parseIdentifierName();
                    expr = finishNode(propertyAccess);
                    continue;
                }

                var bracketStart = scanner.getTokenPos();
                if (parseOptional(SyntaxKind.OpenBracketToken)) {

                    var indexedAccess = <IndexedAccess>createNode(SyntaxKind.IndexedAccess, expr.pos);
                    indexedAccess.object = expr;

                    // It's not uncommon for a user to write: "new Type[]".  Check for that common pattern
                    // and report a better error message.
                    if (inNewExpression && parseOptional(SyntaxKind.CloseBracketToken)) {
                        indexedAccess.index = createMissingNode();
                        grammarErrorAtPos(bracketStart, scanner.getStartPos() - bracketStart, Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                    }
                    // Otherwise parse the indexed access normally.
                    else {
                        indexedAccess.index = parseExpression();
                        parseExpected(SyntaxKind.CloseBracketToken);
                    }

                    expr = finishNode(indexedAccess);
                    continue;
                }

                // Try to parse a Call Expression unless we are in a New Expression.
                // If we are parsing a New Expression, then parentheses are optional, 
                // and is taken care of by the 'parseNewExpression' caller.
                if ((token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) && !inNewExpression) {
                    var callExpr = <CallExpression>createNode(SyntaxKind.CallExpression, expr.pos);
                    callExpr.func = expr;
                    if (token === SyntaxKind.LessThanToken) {
                        if (!(callExpr.typeArguments = tryParse(parseTypeArgumentsAndOpenParen))) return expr;
                    }
                    else {
                        parseExpected(SyntaxKind.OpenParenToken);
                    }
                    callExpr.arguments = parseDelimitedList(ParsingContext.ArgumentExpressions, parseAssignmentExpression, TrailingCommaBehavior.Disallow);
                    parseExpected(SyntaxKind.CloseParenToken);
                    expr = finishNode(callExpr);
                    continue;
                }
                return expr;
            }
        }

        function parseTypeArgumentsAndOpenParen(): NodeArray<TypeNode> {
            var result = parseTypeArguments();
            parseExpected(SyntaxKind.OpenParenToken);
            return result;
        }

        function parseTypeArguments(): NodeArray<TypeNode> {
            var typeArgumentListStart = scanner.getTokenPos();
            var errorCountBeforeTypeParameterList = file.syntacticErrors.length;
            var result = parseBracketedList(ParsingContext.TypeArguments, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
            if (!result.length && file.syntacticErrors.length === errorCountBeforeTypeParameterList) {
                grammarErrorAtPos(typeArgumentListStart, scanner.getStartPos() - typeArgumentListStart, Diagnostics.Type_argument_list_cannot_be_empty);
            }
            return result;
        }

        function parsePrimaryExpression(): Expression {
            switch (token) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return parseTokenNode();
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                    return parseLiteralNode();
                case SyntaxKind.OpenParenToken:
                    return parseParenExpression();
                case SyntaxKind.OpenBracketToken:
                    return parseArrayLiteral();
                case SyntaxKind.OpenBraceToken:
                    return parseObjectLiteral();
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
                default:
                    if (isIdentifier()) {
                        return parseIdentifier();
                    }
            }
            error(Diagnostics.Expression_expected);
            return <Expression>createMissingNode();
        }

        function parseParenExpression(): ParenExpression {
            var node = <ParenExpression>createNode(SyntaxKind.ParenExpression);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = parseExpression();
            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseArrayLiteralElement(): Expression {
            return token === SyntaxKind.CommaToken ? createNode(SyntaxKind.OmittedExpression) : parseAssignmentExpression();
        }

        function parseArrayLiteral(): ArrayLiteral {
            var node = <ArrayLiteral>createNode(SyntaxKind.ArrayLiteral);
            parseExpected(SyntaxKind.OpenBracketToken);
            if (scanner.hasPrecedingLineBreak()) node.flags |= NodeFlags.MultiLine;
            node.elements = parseDelimitedList(ParsingContext.ArrayLiteralMembers, parseArrayLiteralElement, TrailingCommaBehavior.Preserve);
            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function parsePropertyAssignment(): PropertyDeclaration {
            var node = <PropertyDeclaration>createNode(SyntaxKind.PropertyAssignment);
            node.name = parsePropertyName();
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
                var body = parseBody(/* ignoreMissingOpenBrace */ false);
                // do not propagate property name as name for function expression
                // for scenarios like 
                // var x = 1;
                // var y = { x() { } } 
                // otherwise this will bring y.x into the scope of x which is incorrect
                node.initializer = makeFunctionExpression(SyntaxKind.FunctionExpression, node.pos, undefined, sig, body);
            }
            else {
                parseExpected(SyntaxKind.ColonToken);
                node.initializer = parseAssignmentExpression(false);
            }
            return finishNode(node);
        }

        function parseObjectLiteralMember(): Node {
            var initialPos = getNodePos();
            var initialToken = token;
            if (parseContextualModifier(SyntaxKind.GetKeyword) || parseContextualModifier(SyntaxKind.SetKeyword)) {
                var kind = initialToken === SyntaxKind.GetKeyword ? SyntaxKind.GetAccessor : SyntaxKind.SetAccessor;
                return parseAndCheckMemberAccessorDeclaration(kind, initialPos, 0);
            }
            return parsePropertyAssignment();
        }

        function parseObjectLiteral(): ObjectLiteral {
            var node = <ObjectLiteral>createNode(SyntaxKind.ObjectLiteral);
            parseExpected(SyntaxKind.OpenBraceToken);
            if (scanner.hasPrecedingLineBreak()) node.flags |= NodeFlags.MultiLine;
            node.properties = parseDelimitedList(ParsingContext.ObjectLiteralMembers, parseObjectLiteralMember, TrailingCommaBehavior.Preserve);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseFunctionExpression(): FunctionExpression {
            var pos = getNodePos();
            parseExpected(SyntaxKind.FunctionKeyword);
            var name = isIdentifier() ? parseIdentifier() : undefined;
            var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
            var body = parseBody(/* ignoreMissingOpenBrace */ false);
            return makeFunctionExpression(SyntaxKind.FunctionExpression, pos, name, sig, body);
        }

        function makeFunctionExpression(kind: SyntaxKind, pos: number, name: Identifier, sig: ParsedSignature, body: Node): FunctionExpression {
            var node = <FunctionExpression>createNode(kind, pos);
            node.name = name;
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = body;
            return finishNode(node);
        }

        function parseNewExpression(): NewExpression {
            var node = <NewExpression>createNode(SyntaxKind.NewExpression);
            parseExpected(SyntaxKind.NewKeyword);
            node.func = parseCallAndAccess(parsePrimaryExpression(), /* inNewExpression */ true);
            if (parseOptional(SyntaxKind.OpenParenToken) || token === SyntaxKind.LessThanToken && (node.typeArguments = tryParse(parseTypeArgumentsAndOpenParen))) {
                node.arguments = parseDelimitedList(ParsingContext.ArgumentExpressions, parseAssignmentExpression, TrailingCommaBehavior.Disallow);
                parseExpected(SyntaxKind.CloseParenToken);
            }
            return finishNode(node);
        }

        // STATEMENTS

        function parseBlock(ignoreMissingOpenBrace: boolean): Block {
            var node = <Block>createNode(SyntaxKind.Block);
            if (parseExpected(SyntaxKind.OpenBraceToken) || ignoreMissingOpenBrace) {
                node.statements = parseList(ParsingContext.BlockStatements, parseStatement);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.statements = createMissingList<Statement>();
            }
            return finishNode(node);
        }

        function parseBody(ignoreMissingOpenBrace: boolean): Block {
            var block = parseBlock(ignoreMissingOpenBrace);
            block.kind = SyntaxKind.FunctionBlock;
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
            node.expression = parseExpression();
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
            node.expression = parseExpression();
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
            node.expression = parseExpression();
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
                    var declarations = parseVariableDeclarationList(0, true);
                    if (!declarations.length) {
                        error(Diagnostics.Variable_declaration_list_cannot_be_empty);
                    }
                }
                else {
                    var varOrInit = parseExpression(true);
                }
            }
            if (parseOptional(SyntaxKind.InKeyword)) {
                var forInStat = <ForInStatement>createNode(SyntaxKind.ForInStatement, pos);
                if (declarations) {
                    if (declarations.length > 1) {
                        error(Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
                    }
                    forInStat.declaration = declarations[0];
                }
                else {
                    forInStat.variable = varOrInit;
                }
                forInStat.expression = parseExpression();
                parseExpected(SyntaxKind.CloseParenToken);
                forInStat.statement = parseStatement();
                return finishNode(forInStat);
            }
            else {
                var forStat = <ForStatement>createNode(SyntaxKind.ForStatement, pos);
                if (declarations) forStat.declarations = declarations;
                if (varOrInit) forStat.initializer = varOrInit;
                parseExpected(SyntaxKind.SemicolonToken);
                if (token !== SyntaxKind.SemicolonToken && token !== SyntaxKind.CloseParenToken) {
                    forStat.condition = parseExpression();
                }
                parseExpected(SyntaxKind.SemicolonToken);
                if (token !== SyntaxKind.CloseParenToken) {
                    forStat.iterator = parseExpression();
                }
                parseExpected(SyntaxKind.CloseParenToken);
                forStat.statement = parseStatement();
                return finishNode(forStat);
            }
        }

        function parseBreakOrContinueStatement(kind: SyntaxKind): BreakOrContinueStatement {
            var node = <BreakOrContinueStatement>createNode(kind);
            parseExpected(kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword);
            if (!isSemicolon()) node.label = parseIdentifier();
            parseSemicolon();
            return finishNode(node);
        }

        function parseReturnStatement(): ReturnStatement {
            var node = <ReturnStatement>createNode(SyntaxKind.ReturnStatement);
            parseExpected(SyntaxKind.ReturnKeyword);
            if (!isSemicolon()) node.expression = parseExpression();
            parseSemicolon();
            return finishNode(node);
        }

        function parseWithStatement(): WithStatement {
            var node = <WithStatement>createNode(SyntaxKind.WithStatement);
            parseExpected(SyntaxKind.WithKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = parseExpression();
            parseExpected(SyntaxKind.CloseParenToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseCaseClause(): CaseOrDefaultClause {
            var node = <CaseOrDefaultClause>createNode(SyntaxKind.CaseClause);
            parseExpected(SyntaxKind.CaseKeyword);
            node.expression = parseExpression();
            parseExpected(SyntaxKind.ColonToken);
            node.statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
            return finishNode(node);
        }

        function parseDefaultClause(): CaseOrDefaultClause {
            var node = <CaseOrDefaultClause>createNode(SyntaxKind.DefaultClause);
            parseExpected(SyntaxKind.DefaultKeyword);
            parseExpected(SyntaxKind.ColonToken);
            node.statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
            return finishNode(node);
        }

        function parseCaseOrDefaultClause(): CaseOrDefaultClause {
            return token === SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
        }

        function parseSwitchStatement(): SwitchStatement {
            var node = <SwitchStatement>createNode(SyntaxKind.SwitchStatement);
            parseExpected(SyntaxKind.SwitchKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = parseExpression();
            parseExpected(SyntaxKind.CloseParenToken);
            parseExpected(SyntaxKind.OpenBraceToken);
            node.clauses = parseList(ParsingContext.SwitchClauses, parseCaseOrDefaultClause);
            parseExpected(SyntaxKind.CloseBraceToken);

            // Error on duplicate 'default' clauses.
            var defaultClauses: CaseOrDefaultClause[] = filter(node.clauses, clause => clause.kind === SyntaxKind.DefaultClause);
            for (var i = 1, n = defaultClauses.length; i < n; i++) {
                var clause = defaultClauses[i];
                var start = skipTrivia(file.text, clause.pos);
                var end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                grammarErrorAtPos(start, end - start, Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
            }

            return finishNode(node);
        }

        function parseThrowStatement(): ThrowStatement {
            var node = <ThrowStatement>createNode(SyntaxKind.ThrowStatement);
            parseExpected(SyntaxKind.ThrowKeyword);
            if (scanner.hasPrecedingLineBreak()) {
                error(Diagnostics.Line_break_not_permitted_here);
            }
            node.expression = parseExpression();
            parseSemicolon();
            return finishNode(node);
        }

        // TODO: Review for error recovery
        function parseTryStatement(): TryStatement {
            var node = <TryStatement>createNode(SyntaxKind.TryStatement);
            node.tryBlock = parseTokenAndBlock(SyntaxKind.TryKeyword, SyntaxKind.TryBlock);
            if (token === SyntaxKind.CatchKeyword) {
                node.catchBlock = parseCatchBlock();
            }
            if (token === SyntaxKind.FinallyKeyword) {
                node.finallyBlock = parseTokenAndBlock(SyntaxKind.FinallyKeyword, SyntaxKind.FinallyBlock);
            }
            if (!(node.catchBlock || node.finallyBlock)) {
                error(Diagnostics.catch_or_finally_expected);
            }
            return finishNode(node);
        }

        function parseTokenAndBlock(token: SyntaxKind, kind: SyntaxKind): Block {
            var pos = getNodePos();
            parseExpected(token);
            var result = parseBlock(/* ignoreMissingOpenBrace */ false);
            result.kind = kind;
            result.pos = pos;
            return result;
        }

        function parseCatchBlock(): CatchBlock {
            var pos = getNodePos();
            parseExpected(SyntaxKind.CatchKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            var variable = parseIdentifier();
            var typeAnnotationColonStart = scanner.getTokenPos();
            var typeAnnotationColonLength = scanner.getTextPos() - typeAnnotationColonStart;
            var typeAnnotation = parseTypeAnnotation();
            parseExpected(SyntaxKind.CloseParenToken);
            var result = <CatchBlock>parseBlock(/* ignoreMissingOpenBrace */ false);
            result.kind = SyntaxKind.CatchBlock;
            result.pos = pos;
            result.variable = variable;

            if (typeAnnotation) {
                errorAtPos(typeAnnotationColonStart, typeAnnotationColonLength, Diagnostics.Catch_clause_parameter_cannot_have_a_type_annotation);
            }
            return result;
        }

        function parseDebuggerStatement(): Statement {
            var node = <Statement>createNode(SyntaxKind.DebuggerStatement);
            parseExpected(SyntaxKind.DebuggerKeyword);
            parseSemicolon();
            return finishNode(node);
        }

        function parseLabelledStatement(): LabelledStatement {
            var node = <LabelledStatement>createNode(SyntaxKind.LabelledStatement);
            node.label = parseIdentifier();
            parseExpected(SyntaxKind.ColonToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseExpressionStatement(): ExpressionStatement {
            var node = <ExpressionStatement>createNode(SyntaxKind.ExpressionStatement);
            node.expression = parseExpression();
            parseSemicolon();
            return finishNode(node);
        }

        function isStatement(inErrorRecovery: boolean): boolean {
            switch (token) {
                case SyntaxKind.SemicolonToken:
                    // If we're in error recovery, then we don't want to treat ';' as an empty statement.
                    // The problem is that ';' can show up in far too many contexts, and if we see one 
                    // and assume it's a statement, then we may bail out innapropriately from whatever 
                    // we're parsing.  For example, if we have a semicolon in the middle of a class, then
                    // we really don't want to assume the class is over and we're on a statement in the
                    // outer module.  We just want to consume and move on.
                    return !inErrorRecovery;
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.VarKeyword:
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
                    return true;
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.ModuleKeyword:
                case SyntaxKind.EnumKeyword:
                    // When followed by an identifier, these do not start a statement but might
                    // instead be following declarations
                    if (isDeclaration()) return false;
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.StaticKeyword:
                    // When followed by an identifier or keyword, these do not start a statement but
                    // might instead be following type members
                    if (lookAhead(() => nextToken() >= SyntaxKind.Identifier)) return false;
                default:
                    return isExpression();
            }
        }

        function parseStatement(): Statement {
            switch (token) {
                case SyntaxKind.OpenBraceToken:
                    return parseBlock(/* ignoreMissingOpenBrace */ false);
                case SyntaxKind.VarKeyword:
                    return parseVariableStatement();
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionDeclaration();
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
                    return parseTryStatement();
                case SyntaxKind.DebuggerKeyword:
                    return parseDebuggerStatement();
                default:
                    if (isIdentifier() && lookAhead(() => nextToken() === SyntaxKind.ColonToken)) {
                        return parseLabelledStatement();
                    }
                    return parseExpressionStatement();
            }
        }

        function parseStatementOrFunction(): Statement {
            return token === SyntaxKind.FunctionKeyword ? parseFunctionDeclaration() : parseStatement();
        }

        function parseAndCheckFunctionBody(isConstructor: boolean): Block {
            var initialPosition = scanner.getTokenPos();
            var errorCountBeforeBody = file.syntacticErrors.length;
            if (token === SyntaxKind.OpenBraceToken) {
                var body = parseBody(/* ignoreMissingOpenBrace */ false);
                if (body && inAmbientContext && file.syntacticErrors.length === errorCountBeforeBody) {
                    var diagnostic = isConstructor ? Diagnostics.A_constructor_implementation_cannot_be_declared_in_an_ambient_context : Diagnostics.A_function_implementation_cannot_be_declared_in_an_ambient_context;
                    grammarErrorAtPos(initialPosition, 1, diagnostic);
                }
                return body;
            }
            if (isSemicolon()) {
                parseSemicolon();
                return undefined;
            }
            error(Diagnostics.Block_or_expected); // block or ';' expected
        }

        // DECLARATIONS

        function parseVariableDeclaration(flags: NodeFlags, noIn?: boolean): VariableDeclaration {
            var node = <VariableDeclaration>createNode(SyntaxKind.VariableDeclaration);
            node.flags = flags;
            var errorCountBeforeVariableDeclaration = file.syntacticErrors.length;
            node.name = parseIdentifier();
            node.type = parseTypeAnnotation();

            // Issue any initializer-related errors on the equals token
            var initializerStart = scanner.getTokenPos();
            var initializerFirstTokenLength = scanner.getTextPos() - initializerStart;
            node.initializer = parseInitializer(/*inParameter*/ false, noIn);

            if (inAmbientContext && node.initializer && errorCountBeforeVariableDeclaration === file.syntacticErrors.length) {
                grammarErrorAtPos(initializerStart, initializerFirstTokenLength, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
            return finishNode(node);
        }

        function parseVariableDeclarationList(flags: NodeFlags, noIn?: boolean): NodeArray<VariableDeclaration> {
            return parseDelimitedList(ParsingContext.VariableDeclarations, () => parseVariableDeclaration(flags, noIn), TrailingCommaBehavior.Disallow);
        }

        function parseVariableStatement(pos?: number, flags?: NodeFlags): VariableStatement {
            var node = <VariableStatement>createNode(SyntaxKind.VariableStatement, pos);
            if (flags) node.flags = flags;
            var errorCountBeforeVarStatement = file.syntacticErrors.length;
            parseExpected(SyntaxKind.VarKeyword);
            node.declarations = parseVariableDeclarationList(flags, /*noIn*/false);
            parseSemicolon();
            if (!node.declarations.length && file.syntacticErrors.length === errorCountBeforeVarStatement) {
                grammarErrorOnNode(node, Diagnostics.Variable_declaration_list_cannot_be_empty);
            }
            return finishNode(node);
        }

        function parseFunctionDeclaration(pos?: number, flags?: NodeFlags): FunctionDeclaration {
            var node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, pos);
            if (flags) node.flags = flags;
            parseExpected(SyntaxKind.FunctionKeyword);
            node.name = parseIdentifier();
            var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = parseAndCheckFunctionBody(/*isConstructor*/ false);
            return finishNode(node);
        }

        function parseConstructorDeclaration(pos: number, flags: NodeFlags): ConstructorDeclaration {
            var node = <ConstructorDeclaration>createNode(SyntaxKind.Constructor, pos);
            node.flags = flags;
            parseExpected(SyntaxKind.ConstructorKeyword);
            var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = parseAndCheckFunctionBody(/*isConstructor*/ true);
            if (node.typeParameters) {
                grammarErrorAtPos(node.typeParameters.pos, node.typeParameters.end - node.typeParameters.pos, Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
            }
            if (node.type) {
                grammarErrorOnNode(node.type, Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
            }
            return finishNode(node);
        }

        function parsePropertyMemberDeclaration(pos: number, flags: NodeFlags): Declaration {
            var errorCountBeforePropertyDeclaration = file.syntacticErrors.length;
            var name = parsePropertyName();

            var questionStart = scanner.getTokenPos();
            if (parseOptional(SyntaxKind.QuestionToken)) {
                errorAtPos(questionStart, scanner.getStartPos() - questionStart, Diagnostics.A_class_member_cannot_be_declared_optional);
            }

            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                var method = <MethodDeclaration>createNode(SyntaxKind.Method, pos);
                method.flags = flags;
                method.name = name;
                var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
                method.typeParameters = sig.typeParameters;
                method.parameters = sig.parameters;
                method.type = sig.type;
                method.body = parseAndCheckFunctionBody(/*isConstructor*/ false);
                return finishNode(method);
            }
            else {
                var property = <PropertyDeclaration>createNode(SyntaxKind.Property, pos);
                property.flags = flags;
                property.name = name;
                property.type = parseTypeAnnotation();

                var initializerStart = scanner.getTokenPos();
                var initializerFirstTokenLength = scanner.getTextPos() - initializerStart;
                property.initializer = parseInitializer(/*inParameter*/ false);
                parseSemicolon();

                if (inAmbientContext && property.initializer && errorCountBeforePropertyDeclaration === file.syntacticErrors.length) {
                    grammarErrorAtPos(initializerStart, initializerFirstTokenLength, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                }
                return finishNode(property);
            }
        }

        function parseAndCheckMemberAccessorDeclaration(kind: SyntaxKind, pos: number, flags: NodeFlags): MethodDeclaration {
            var errorCountBeforeAccessor = file.syntacticErrors.length;
            var accessor = parseMemberAccessorDeclaration(kind, pos, flags);

            if (errorCountBeforeAccessor === file.syntacticErrors.length) {
                if (languageVersion < ScriptTarget.ES5) {
                    grammarErrorOnNode(accessor.name, Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
                }
                else if (inAmbientContext) {
                    grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_be_declared_in_an_ambient_context);
                }
                else if (accessor.typeParameters) {
                    grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_have_type_parameters);
                }
                else if (kind === SyntaxKind.GetAccessor && accessor.parameters.length) {
                    grammarErrorOnNode(accessor.name, Diagnostics.A_get_accessor_cannot_have_parameters);
                }
                else if (kind === SyntaxKind.SetAccessor) {
                    if (accessor.type) {
                        grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                    }
                    else if (accessor.parameters.length !== 1) {
                        grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                    }
                    else {
                        var parameter = accessor.parameters[0];
                        if (parameter.flags & NodeFlags.Rest) {
                            grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                        }
                        else if (parameter.flags & NodeFlags.Modifier) {
                            grammarErrorOnNode(accessor.name, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                        }
                        else if (parameter.flags & NodeFlags.QuestionMark) {
                            grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                        }
                        else if (parameter.initializer) {
                            grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                        }
                    }
                }
            }
            return accessor;
        }

        function parseMemberAccessorDeclaration(kind: SyntaxKind, pos: number, flags: NodeFlags): MethodDeclaration {
            var node = <MethodDeclaration>createNode(kind, pos);
            node.flags = flags;
            node.name = parsePropertyName();
            var sig = parseSignature(SyntaxKind.CallSignature, SyntaxKind.ColonToken);
            node.typeParameters = sig.typeParameters;
            node.parameters = sig.parameters;
            node.type = sig.type;
            node.body = parseBody(/* ignoreMissingOpenBrace */ false);
            return finishNode(node);
        }

        function isClassMemberStart(): boolean {
            var idToken: SyntaxKind;

            // Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
            while (isModifier(token)) {
                idToken = token;
                nextToken();
            }

            // Try to get the first property-like token following all modifiers.
            // This can either be an identifier or the 'get' or 'set' keywords.
            if (isPropertyName()) {
                idToken = token;
                nextToken();
            }

            // Index signatures are class members; we can parse.
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

        function parseAndCheckModifiers(context: ModifierContext): number {
            var flags = 0;
            var lastStaticModifierStart: number;
            var lastStaticModifierLength: number;
            var lastDeclareModifierStart: number;
            var lastDeclareModifierLength: number
            var lastPrivateModifierStart: number;
            var lastPrivateModifierLength: number;

            while (true) {
                var modifierStart = scanner.getTokenPos();
                var modifierToken = token;

                // Try to parse the modifier
                if (!parseAnyContextualModifier()) break;

                var modifierLength = scanner.getStartPos() - modifierStart;

                switch (modifierToken) {
                    case SyntaxKind.PublicKeyword:
                        if (flags & NodeFlags.Private || flags & NodeFlags.Public) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & NodeFlags.Static) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_must_precede_1_modifier, "public", "static");
                        }
                        else if (context === ModifierContext.ModuleElements || context === ModifierContext.SourceElements) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_module_element, "public");
                        }
                        flags |= NodeFlags.Public;
                        break;

                    case SyntaxKind.PrivateKeyword:
                        if (flags & NodeFlags.Private || flags & NodeFlags.Public) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & NodeFlags.Static) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_must_precede_1_modifier, "private", "static");
                        }
                        else if (context === ModifierContext.ModuleElements || context === ModifierContext.SourceElements) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_module_element, "private");
                        }
                        lastPrivateModifierStart = modifierStart;
                        lastPrivateModifierLength = modifierLength;
                        flags |= NodeFlags.Private;
                        break;

                    case SyntaxKind.StaticKeyword:
                        if (flags & NodeFlags.Static) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (context === ModifierContext.ModuleElements || context === ModifierContext.SourceElements) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (context === ModifierContext.Parameters) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        lastStaticModifierStart = modifierStart;
                        lastStaticModifierLength = modifierLength;
                        flags |= NodeFlags.Static;
                        break;

                    case SyntaxKind.ExportKeyword:
                        if (flags & NodeFlags.Export) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_already_seen, "export");
                        }
                        else if (flags & NodeFlags.Ambient) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                        }
                        else if (context === ModifierContext.ClassMembers) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_class_element, "export");
                        }
                        else if (context === ModifierContext.Parameters) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                        }
                        flags |= NodeFlags.Export;
                        break;

                    case SyntaxKind.DeclareKeyword:
                        if (flags & NodeFlags.Ambient) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_already_seen, "declare");
                        }
                        else if (context === ModifierContext.ClassMembers) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_class_element, "declare");
                        }
                        else if (context === ModifierContext.Parameters) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                        }
                        else if (inAmbientContext && context === ModifierContext.ModuleElements) {
                            grammarErrorAtPos(modifierStart, modifierLength, Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                        }
                        lastDeclareModifierStart = modifierStart;
                        lastDeclareModifierLength = modifierLength;
                        flags |= NodeFlags.Ambient;
                        break;
                }
            }

            if (token === SyntaxKind.ConstructorKeyword && flags & NodeFlags.Static) {
                grammarErrorAtPos(lastStaticModifierStart, lastStaticModifierLength, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
            }
            else if (token === SyntaxKind.ConstructorKeyword && flags & NodeFlags.Private) {
                grammarErrorAtPos(lastPrivateModifierStart, lastPrivateModifierLength, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
            }
            else if (token === SyntaxKind.ImportKeyword) {
                if (flags & NodeFlags.Ambient) {
                    grammarErrorAtPos(lastDeclareModifierStart, lastDeclareModifierLength, Diagnostics.A_declare_modifier_cannot_be_used_with_an_import_declaration, "declare");
                }
            }
            else if (token === SyntaxKind.InterfaceKeyword) {
                if (flags & NodeFlags.Ambient) {
                    grammarErrorAtPos(lastDeclareModifierStart, lastDeclareModifierLength, Diagnostics.A_declare_modifier_cannot_be_used_with_an_interface_declaration, "declare");
                }
            }
            else if (token !== SyntaxKind.ExportKeyword && !(flags & NodeFlags.Ambient) && inAmbientContext && context === ModifierContext.SourceElements) {
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
                var declarationStart = scanner.getTokenPos();
                var declarationFirstTokenLength = scanner.getTextPos() - declarationStart;
                grammarErrorAtPos(declarationStart, declarationFirstTokenLength, Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
            }
            return flags;
        }

        function parseClassMemberDeclaration(): Declaration {
            var pos = getNodePos();
            var flags = parseAndCheckModifiers(ModifierContext.ClassMembers);
            if (parseContextualModifier(SyntaxKind.GetKeyword)) {
                return parseAndCheckMemberAccessorDeclaration(SyntaxKind.GetAccessor, pos, flags);
            }
            if (parseContextualModifier(SyntaxKind.SetKeyword)) {
                return parseAndCheckMemberAccessorDeclaration(SyntaxKind.SetAccessor, pos, flags);
            }
            if (token === SyntaxKind.ConstructorKeyword) {
                return parseConstructorDeclaration(pos, flags);
            }
            if (token >= SyntaxKind.Identifier || token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral) {
                return parsePropertyMemberDeclaration(pos, flags);
            }
            if (token === SyntaxKind.OpenBracketToken) {
                if (flags) {
                    var start = getTokenPos(pos);
                    var length = getNodePos() - start;
                    errorAtPos(start, length, Diagnostics.Modifiers_not_permitted_on_index_signature_members);
                }
                return parseIndexSignatureMember();
            }

            // 'isClassMemberStart' should have hinted not to attempt parsing.
            Debug.fail("Should not have attempted to parse class member declaration.");
        }

        function parseClassDeclaration(pos: number, flags: NodeFlags): ClassDeclaration {
            var node = <ClassDeclaration>createNode(SyntaxKind.ClassDeclaration, pos);
            node.flags = flags;
            var errorCountBeforeClassDeclaration = file.syntacticErrors.length;
            parseExpected(SyntaxKind.ClassKeyword);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            // TODO(jfreeman): Parse arbitrary sequence of heritage clauses and error for order and duplicates
            node.baseType = parseOptional(SyntaxKind.ExtendsKeyword) ? parseTypeReference() : undefined;
            var implementsKeywordStart = scanner.getTokenPos();
            var implementsKeywordLength: number;
            if (parseOptional(SyntaxKind.ImplementsKeyword)) {
                implementsKeywordLength = scanner.getStartPos() - implementsKeywordStart;
                node.implementedTypes = parseDelimitedList(ParsingContext.BaseTypeReferences, parseTypeReference, TrailingCommaBehavior.Disallow);
            }
            var errorCountBeforeClassBody = file.syntacticErrors.length;
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.members = parseList(ParsingContext.ClassMembers, parseClassMemberDeclaration);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<Declaration>();
            }
            if (node.implementedTypes && !node.implementedTypes.length && errorCountBeforeClassBody === errorCountBeforeClassDeclaration) {
                grammarErrorAtPos(implementsKeywordStart, implementsKeywordLength, Diagnostics._0_list_cannot_be_empty, "implements");
            }
            return finishNode(node);
        }

        function parseInterfaceDeclaration(pos: number, flags: NodeFlags): InterfaceDeclaration {
            var node = <InterfaceDeclaration>createNode(SyntaxKind.InterfaceDeclaration, pos);
            node.flags = flags;
            var errorCountBeforeInterfaceDeclaration = file.syntacticErrors.length;
            parseExpected(SyntaxKind.InterfaceKeyword);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            // TODO(jfreeman): Parse arbitrary sequence of heritage clauses and error for order and duplicates
            var extendsKeywordStart = scanner.getTokenPos();
            var extendsKeywordLength: number;
            if (parseOptional(SyntaxKind.ExtendsKeyword)) {
                extendsKeywordLength = scanner.getStartPos() - extendsKeywordStart;
                node.baseTypes = parseDelimitedList(ParsingContext.BaseTypeReferences, parseTypeReference, TrailingCommaBehavior.Disallow);
            }
            var errorCountBeforeInterfaceBody = file.syntacticErrors.length;
            node.members = parseTypeLiteral().members;
            if (node.baseTypes && !node.baseTypes.length && errorCountBeforeInterfaceBody === errorCountBeforeInterfaceDeclaration) {
                grammarErrorAtPos(extendsKeywordStart, extendsKeywordLength, Diagnostics._0_list_cannot_be_empty, "extends");
            }
            return finishNode(node);
        }

        function parseAndCheckEnumDeclaration(pos: number, flags: NodeFlags): EnumDeclaration {
            function isIntegerLiteral(expression: Expression): boolean {
                function isInteger(literalExpression: LiteralExpression): boolean {
                    // Allows for scientific notation since literalExpression.text was formed by
                    // coercing a number to a string. Sometimes this coersion can yield a string
                    // in scientific notation.
                    // We also don't need special logic for hex because a hex integer is converted
                    // to decimal when it is coerced.
                    return /^[0-9]+([eE]\+?[0-9]+)?$/.test(literalExpression.text);
                }

                if (expression.kind === SyntaxKind.PrefixOperator) {
                    var unaryExpression = <UnaryExpression>expression;
                    if (unaryExpression.operator === SyntaxKind.PlusToken || unaryExpression.operator === SyntaxKind.MinusToken) {
                        expression = unaryExpression.operand;
                    }
                }
                if (expression.kind === SyntaxKind.NumericLiteral) {
                    return isInteger(<LiteralExpression>expression);
                }

                return false;
            }

            var inConstantEnumMemberSection = true;
            // In an ambient declaration, the grammar only allows integer literals as initializers.
            // In a nonambient declaration, the grammar allows uninitialized members only in a
            // ConstantEnumMemberSection, which starts at the beginning of an enum declaration
            // or any time an integer literal initializer is encountered.
            function parseAndCheckEnumMember(): EnumMember {
                var node = <EnumMember>createNode(SyntaxKind.EnumMember);
                var errorCountBeforeEnumMember = file.syntacticErrors.length;
                node.name = parsePropertyName();
                node.initializer = parseInitializer(/*inParameter*/ false);

                if (inAmbientContext) {
                    if (node.initializer && !isIntegerLiteral(node.initializer) && errorCountBeforeEnumMember === file.syntacticErrors.length) {
                        grammarErrorOnNode(node.name, Diagnostics.Ambient_enum_elements_can_only_have_integer_literal_initializers);
                    }
                }
                else if (node.initializer) {
                    inConstantEnumMemberSection = isIntegerLiteral(node.initializer);
                }
                else if (!inConstantEnumMemberSection && errorCountBeforeEnumMember === file.syntacticErrors.length) {
                    grammarErrorOnNode(node.name, Diagnostics.Enum_member_must_have_initializer);
                }
                return finishNode(node);
            }

            var node = <EnumDeclaration>createNode(SyntaxKind.EnumDeclaration, pos);
            node.flags = flags;
            parseExpected(SyntaxKind.EnumKeyword);
            node.name = parseIdentifier();
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.members = parseDelimitedList(ParsingContext.EnumMembers, parseAndCheckEnumMember, TrailingCommaBehavior.Allow);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<EnumMember>();
            }
            return finishNode(node);
        }

        function parseModuleBody(): Block {
            var node = <Block>createNode(SyntaxKind.ModuleBlock);
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.statements = parseList(ParsingContext.ModuleElements, parseModuleElement);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.statements = createMissingList<Statement>();
            }
            return finishNode(node);
        }

        function parseInternalModuleTail(pos: number, flags: NodeFlags): ModuleDeclaration {
            var node = <ModuleDeclaration>createNode(SyntaxKind.ModuleDeclaration, pos);
            node.flags = flags;
            node.name = parseIdentifier();
            if (parseOptional(SyntaxKind.DotToken)) {
                node.body = parseInternalModuleTail(getNodePos(), NodeFlags.Export);
            }
            else {
                node.body = parseModuleBody();
                forEach((<Block>node.body).statements, s => {
                    if (s.kind === SyntaxKind.ExportAssignment) {
                        // Export assignments are not allowed in an internal module
                        grammarErrorOnNode(s, Diagnostics.An_export_assignment_cannot_be_used_in_an_internal_module);
                    }
                    else if (s.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>s).externalModuleName) {
                        grammarErrorOnNode(s, Diagnostics.Import_declarations_in_an_internal_module_cannot_reference_an_external_module)
                    }
                });
            }
            return finishNode(node);
        }

        function parseAmbientExternalModuleDeclaration(pos: number, flags: NodeFlags): ModuleDeclaration {
            var node = <ModuleDeclaration>createNode(SyntaxKind.ModuleDeclaration, pos);
            node.flags = flags;
            node.name = parseStringLiteral();
            if (!inAmbientContext) {
                var errorCount = file.syntacticErrors.length;
                // Only report this error if we have not already errored about a missing declare modifier,
                // which would have been at or after pos
                if (!errorCount || file.syntacticErrors[errorCount - 1].start < getTokenPos(pos)) {
                    grammarErrorOnNode(node.name, Diagnostics.Only_ambient_modules_can_use_quoted_names);
                }
            }

            // For error recovery, just in case the user forgot the declare modifier on this ambient
            // external module, treat it as ambient anyway.
            var saveInAmbientContext = inAmbientContext;
            inAmbientContext = true;
            node.body = parseModuleBody();
            inAmbientContext = saveInAmbientContext;
            return finishNode(node);
        }

        function parseModuleDeclaration(pos: number, flags: NodeFlags): ModuleDeclaration {
            parseExpected(SyntaxKind.ModuleKeyword);
            return token === SyntaxKind.StringLiteral ? parseAmbientExternalModuleDeclaration(pos, flags) : parseInternalModuleTail(pos, flags);
        }

        function parseImportDeclaration(pos: number, flags: NodeFlags): ImportDeclaration {
            var node = <ImportDeclaration>createNode(SyntaxKind.ImportDeclaration, pos);
            node.flags = flags;
            parseExpected(SyntaxKind.ImportKeyword);
            node.name = parseIdentifier();
            parseExpected(SyntaxKind.EqualsToken);
            var entityName = parseEntityName();
            if (entityName.kind === SyntaxKind.Identifier && (<Identifier>entityName).text === "require" && parseOptional(SyntaxKind.OpenParenToken)) {
                node.externalModuleName = parseStringLiteral();
                parseExpected(SyntaxKind.CloseParenToken);
            }
            else {
                node.entityName = entityName;
            }
            parseSemicolon();
            return finishNode(node);
        }

        function parseExportAssignmentTail(pos: number): ExportAssignment {
            var node = <ExportAssignment>createNode(SyntaxKind.ExportAssignment, pos);
            node.exportName = parseIdentifier();
            parseSemicolon();
            return finishNode(node);
        }

        function isDeclaration() {
            switch (token) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.FunctionKeyword:
                    return true;
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.ImportKeyword:
                    // Not true keywords so ensure an identifier follows
                    return lookAhead(() => nextToken() >= SyntaxKind.Identifier);
                case SyntaxKind.ModuleKeyword:
                    // Not a true keyword so ensure an identifier or string literal follows
                    return lookAhead(() => nextToken() >= SyntaxKind.Identifier || token === SyntaxKind.StringLiteral);
                case SyntaxKind.ExportKeyword:
                    // Check for export assignment or modifier on source element
                    return lookAhead(() => nextToken() === SyntaxKind.EqualsToken || isDeclaration());
                case SyntaxKind.DeclareKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.StaticKeyword:
                    // Check for modifier on source element
                    return lookAhead(() => { nextToken(); return isDeclaration(); });
            }
        }

        function parseDeclaration(modifierContext: ModifierContext): Statement {
            var pos = getNodePos();
            var errorCountBeforeModifiers = file.syntacticErrors.length;
            var flags = parseAndCheckModifiers(modifierContext);

            if (token === SyntaxKind.ExportKeyword) {
                nextToken();
                if (parseOptional(SyntaxKind.EqualsToken)) {
                    return parseExportAssignmentTail(pos);
                }
            }

            var saveInAmbientContext = inAmbientContext;
            if (flags & NodeFlags.Ambient) {
                inAmbientContext = true;
            }

            var result: Declaration;
            switch (token) {
                case SyntaxKind.VarKeyword:
                    result = parseVariableStatement(pos, flags);
                    break;
                case SyntaxKind.FunctionKeyword:
                    result = parseFunctionDeclaration(pos, flags);
                    break;
                case SyntaxKind.ClassKeyword:
                    result = parseClassDeclaration(pos, flags);
                    break;
                case SyntaxKind.InterfaceKeyword:
                    result = parseInterfaceDeclaration(pos, flags);
                    break;
                case SyntaxKind.EnumKeyword:
                    result = parseAndCheckEnumDeclaration(pos, flags);
                    break;
                case SyntaxKind.ModuleKeyword:
                    result = parseModuleDeclaration(pos, flags);
                    break;
                case SyntaxKind.ImportKeyword:
                    result = parseImportDeclaration(pos, flags);
                    break;
                default:
                    error(Diagnostics.Declaration_expected);
            }

            inAmbientContext = saveInAmbientContext;
            return result;
        }

        function isSourceElement(inErrorRecovery: boolean): boolean {
            return isDeclaration() || isStatement(inErrorRecovery);
        }

        function parseSourceElement() {
            return parseSourceElementOrModuleElement(ModifierContext.SourceElements);
        }

        function parseModuleElement() {
            return parseSourceElementOrModuleElement(ModifierContext.ModuleElements);
        }

        function parseSourceElementOrModuleElement(modifierContext: ModifierContext): Statement {
            if (isDeclaration()) {
                return parseDeclaration(modifierContext);
            }

            var statementStart = scanner.getTokenPos();
            var statementFirstTokenLength = scanner.getTextPos() - statementStart;
            var errorCountBeforeStatement = file.syntacticErrors.length;
            var statement = parseStatement();

            if (inAmbientContext && file.syntacticErrors.length === errorCountBeforeStatement) {
                grammarErrorAtPos(statementStart, statementFirstTokenLength, Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
            }

            return statement;
        }

        function processReferenceComments(): ReferenceComments {
            var referencedFiles: FileReference[] = [];
            var amdDependencies: string[] = [];
            commentRanges = [];
            token = scanner.scan();

            for (var i = 0; i < commentRanges.length; i++) {
                var range = commentRanges[i];
                var comment = sourceText.substring(range.pos, range.end);
                var simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
                if (simpleReferenceRegEx.exec(comment)) {
                    var isNoDefaultLibRegEx = /^(\/\/\/\s*<reference\s+no-default-lib=)('|")(.+?)\2\s*\/>/gim;
                    if (isNoDefaultLibRegEx.exec(comment)) {
                        file.hasNoDefaultLib = true;
                    }
                    else {
                        var fullReferenceRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
                        var matchResult = fullReferenceRegEx.exec(comment);
                        if (!matchResult) {
                            var start = range.pos;
                            var length = range.end - start;
                            errorAtPos(start, length, Diagnostics.Invalid_reference_comment);
                        }
                        else {
                            referencedFiles.push({
                                pos: range.pos,
                                end: range.end,
                                filename: matchResult[3]
                            });
                        }
                    }
                }
                else {
                    var amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s+path\s*=\s*('|")(.+?)\1/gim;
                    var amdDependencyMatchResult = amdDependencyRegEx.exec(comment)
                    if (amdDependencyMatchResult) {
                        amdDependencies.push(amdDependencyMatchResult[2]);
                    }
                }
            }
            commentRanges = undefined;
            return {
                referencedFiles: referencedFiles,
                amdDependencies: amdDependencies
            };
        }

        function getExternalModuleIndicator() {
            return forEach(file.statements, node =>
                node.flags & NodeFlags.Export
                || node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).externalModuleName
                || node.kind === SyntaxKind.ExportAssignment
                ? node
                : undefined);
        }

        scanner = createScanner(languageVersion, sourceText, scanError, onComment);
        var rootNodeFlags: NodeFlags = 0;
        if (fileExtensionIs(filename, ".d.ts")) {
            rootNodeFlags = NodeFlags.DeclarationFile;
            inAmbientContext = true;
        }
        file = <SourceFile>createRootNode(SyntaxKind.SourceFile, 0, sourceText.length, rootNodeFlags);
        file.filename = normalizePath(filename);
        file.text = sourceText;
        file.getLineAndCharacterFromPosition = getLineAndCharacterlFromSourcePosition;
        file.syntacticErrors = [];
        file.semanticErrors = [];
        var referenceComments = processReferenceComments(); 
        file.referencedFiles = referenceComments.referencedFiles;
        file.amdDependencies = referenceComments.amdDependencies;
        file.statements = parseList(ParsingContext.SourceElements, parseSourceElement);
        file.externalModuleIndicator = getExternalModuleIndicator();
        file.nodeCount = nodeCount;
        file.identifierCount = identifierCount;
        return file;
    }

    export function createProgram(rootNames: string[], options: CompilerOptions, host: CompilerHost): Program {

        var program: Program;
        var files: SourceFile[] = [];
        var filesByName: Map<SourceFile> = {};
        var errors: Diagnostic[] = [];
        var seenNoDefaultLib = options.noLib;
        var commonSourceDirectory: string;

        forEach(rootNames, name => processRootFile(name, false));
        if (!seenNoDefaultLib) processRootFile(host.getDefaultLibFilename(), true);
        verifyCompilerOptions();
        errors.sort(compareDiagnostics);
        program = {
            getSourceFile: getSourceFile,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getCompilerHost: () => host,
            getDiagnostics: getDiagnostics,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getTypeChecker: () => createTypeChecker(program),
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

        function addExtension(filename: string, extension: string): string {
            return getBaseFilename(filename).indexOf(".") >= 0 ? filename : filename + extension;
        }

        function processRootFile(filename: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(addExtension(filename, ".ts")), isDefaultLib);
        }

        function processSourceFile(filename: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            if (refEnd !== undefined && refPos !== undefined) {
                var start = refPos;
                var length = refEnd - refPos;
            }
            if (!fileExtensionIs(filename, ".ts")) {
                errors.push(createFileDiagnostic(refFile, start, length, Diagnostics.File_0_must_have_extension_ts_or_d_ts, filename));
            }
            else if (!findSourceFile(filename, isDefaultLib, refFile, refPos, refEnd)) {
                errors.push(createFileDiagnostic(refFile, start, length, Diagnostics.File_0_not_found, filename));
            }
        }

        // Get source file from normalized filename
        function findSourceFile(filename: string, isDefaultLib: boolean, refFile?: SourceFile, refStart?: number, refLength?: number): SourceFile {
            // Look through existing source files to see if we've encountered it.
            var canonicalName = host.getCanonicalFileName(filename);
            var file = getSourceFile(filename);
            if (file) {
                if (host.useCaseSensitiveFileNames() && canonicalName !== file.filename) {
                    errors.push(createFileDiagnostic(refFile, refStart, refLength,
                        Diagnostics.Filename_0_differs_from_already_included_filename_1_only_in_casing, filename, file.filename));
                } 
            }
            else {
                // If we haven't, read the file.
                file = host.getSourceFile(filename, options.target, hostErrorMessage => {
                    errors.push(createFileDiagnostic(refFile, refStart, refLength,
                        Diagnostics.Cannot_read_file_0_Colon_1, filename, hostErrorMessage));
                });
                if (file) {
                    filesByName[host.getCanonicalFileName(filename)] = file;
                    seenNoDefaultLib = seenNoDefaultLib || file.hasNoDefaultLib;
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
                    forEach(file.syntacticErrors, e => {
                        errors.push(e);
                    });
                }
            }

            return file;
        }

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                processSourceFile(normalizePath(combinePaths(basePath, ref.filename)), false, file, ref.pos, ref.end);
            });
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            forEach(file.statements, node => {
                if (node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).externalModuleName) {
                    var nameLiteral = (<ImportDeclaration>node).externalModuleName
                    var moduleName = nameLiteral.text;
                    if (moduleName) {
                        var searchPath = basePath;
                        while (true) {
                            var searchName = normalizePath(combinePaths(searchPath, moduleName));
                            if (findModuleSourceFile(searchName + ".ts", nameLiteral) || findModuleSourceFile(searchName + ".d.ts", nameLiteral)) break;
                            var parentPath = getDirectoryPath(searchPath);
                            if (parentPath === searchPath) break;
                            searchPath = parentPath;
                        }
                    }
                }
                else if (node.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral && (node.flags & NodeFlags.Ambient || file.flags & NodeFlags.DeclarationFile)) {
                    // TypeScript 1.0 spec (April 2014): 12.1.6
                    // An AmbientExternalModuleDeclaration declares an external module. 
                    // This type of declaration is permitted only in the global module.
                    // The StringLiteral must specify a top - level external module name.
                    // Relative external module names are not permitted
                    forEachChild((<ModuleDeclaration>node).body, node => {
                        if (node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).externalModuleName) {
                            var nameLiteral = (<ImportDeclaration>node).externalModuleName; 
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
                    })
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
                        var sourcePathCompoments = getNormalizedPathComponents(sourceFile.filename, host.getCurrentDirectory());
                        sourcePathCompoments.pop(); // FileName is not part of directory
                        if (commonPathComponents) {
                            for (var i = 0; i < Math.min(commonPathComponents.length, sourcePathCompoments.length); i++) {
                                if (commonPathComponents[i] !== sourcePathCompoments[i]) {
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
                            if (sourcePathCompoments.length < commonPathComponents.length) {
                                commonPathComponents.length = sourcePathCompoments.length;
                            }
                        }
                        else {
                            // first file
                            commonPathComponents = sourcePathCompoments;
                        }
                    }
                });

                commonSourceDirectory = getNormalizedPathFromPathCompoments(commonPathComponents);
                if (commonSourceDirectory) {
                    // Make sure directory path ends with directory separator so this string can directly 
                    // used to replace with "" to get the relative path of the source file and the relative path doesnt
                    // start with / making it rooted path
                    commonSourceDirectory += directorySeparator;
                }
            }
        }
    }
}
