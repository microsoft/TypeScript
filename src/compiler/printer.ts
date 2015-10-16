/// <reference path="checker.ts"/>
/// <reference path="transform.ts" />
/// <reference path="declarationEmitter.ts"/>

/* @internal */
namespace ts {
    const brackets = createBracketsMap();
    const delimiters = createDelimiterMap();

    /**
     * Pretty-prints a set of input source files to an output string.
     * @param resolver The emit resolver.
     * @param host The emit host
     * @param sourceFiles The input source files.
     * @param fileName The output file name.
     */
    export function printFile(resolver: EmitResolver, transformationResolver: TransformationResolver, host: EmitHost, sourceFiles: SourceFile[], fileName: string) {
        console.log("called printFile!");

        let writer = createTextWriter(host.getNewLine());
        let { write, writeTextOfNode, writeLine, increaseIndent, decreaseIndent } = writer;
        let compilerOptions = host.getCompilerOptions();
        let languageVersion = compilerOptions.target || ScriptTarget.ES3;
        let sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? [] : undefined;
        let diagnostics: Diagnostic[] = [];
        let currentSourceFile: SourceFile;
        let parentNode: Node;
        let currentNode: Node;
        let assignmentSubstitution: (node: BinaryExpression) => Expression;
        let expressionIdentifierSubstitution: (node: Identifier) => LeftHandSideExpression;
        let bindingIdentifierSubstitution: (node: Identifier) => Identifier;

        /** Emit a node */
        let emit = emitNode;

        let emitDetachedComments = function (node: Node) { };
        let emitLeadingComments = function (node: Node) { };
        let emitTrailingComments = function (node: Node) { };
        let emitTrailingCommentsOfPosition = function (pos: number) { };

        /** Called just before starting emit of a node */
        let emitStart = function (node: Node) { };

        /** Called once the emit of the node is done */
        let emitEnd = function (node: Node) { };

        /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
            * @param scopeDeclaration node that starts the lexical scope
            * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
        let scopeEmitStart = function(scopeDeclaration: Node, scopeName?: string) { };

        /** Called after coming out of the scope */
        let scopeEmitEnd = function() { };

        /** Sourcemap data that will get encoded */
        let sourceMapData: SourceMapData;

        if (compilerOptions.sourceMap || compilerOptions.inlineSourceMap) {
            // initializeEmitterWithSourceMaps();
        }

        for (let sourceFile of sourceFiles) {
            emit(sourceFile);
        }

        writeLine();
        return { fileName, text: writer.getText(), sourceMapData };

        function emitNode(node: Node) {
            if (node) {
                let savedParentNode = parentNode;
                parentNode = currentNode;
                emitNodeWorker(currentNode = node);
                currentNode = parentNode;
                parentNode = savedParentNode;
            }
        }

        function tryEmitSubstitute<T extends Node>(node: T, substitution: (node: T) => Node) {
            let substitute = substitution(node);
            if (substitute && substitute !== node) {
                let savedCurrentNode = currentNode;
                emitNodeWorker(currentNode = substitute);
                currentNode = savedCurrentNode;
                return true;
            }

            return false;
        }

        function emitNodeWorker(node: Node) {
            switch (node.kind) {
                // Literals
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return emitLiteral(<LiteralExpression>node);

                // Pseudo-literals
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return emitLiteral(<LiteralExpression>node);

                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(<Identifier>node);

                // Reserved words
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.VoidKeyword:
                    return writeTokenNode(node);

                // Contextual keywords
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.SymbolKeyword:
                    return writeTokenNode(node);

                // Parse tree nodes

                // Names
                case SyntaxKind.QualifiedName:
                    return emitQualifiedName(<QualifiedName>node);
                case SyntaxKind.ComputedPropertyName:
                    return emitComputedPropertyName(<ComputedPropertyName>node);

                // Signature elements
                case SyntaxKind.TypeParameter:
                    return emitTypeParameter(<TypeParameterDeclaration>node);
                case SyntaxKind.Parameter:
                    return emitParameter(<ParameterDeclaration>node);
                case SyntaxKind.Decorator:
                    return emitDecorator(<Decorator>node);

                // Type members
                case SyntaxKind.PropertySignature:
                    return emitPropertySignature(<PropertySignature>node);
                case SyntaxKind.PropertyDeclaration:
                    return emitPropertyDeclaration(<PropertyDeclaration>node);
                case SyntaxKind.MethodSignature:
                    return emitMethodSignature(<MethodSignature>node);
                case SyntaxKind.MethodDeclaration:
                    return emitMethodDeclaration(<MethodDeclaration>node);
                case SyntaxKind.Constructor:
                    return emitConstructor(<ConstructorDeclaration>node);
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return emitAccessorDeclaration(<AccessorDeclaration>node);
                case SyntaxKind.CallSignature:
                    return emitCallSignature(<CallSignatureDeclaration>node);
                case SyntaxKind.ConstructSignature:
                    return emitConstructSignature(<ConstructSignatureDeclaration>node);
                case SyntaxKind.IndexSignature:
                    return emitIndexSignature(<IndexSignatureDeclaration>node);

                // Types
                case SyntaxKind.TypePredicate:
                    return emitTypePredicate(<TypePredicateNode>node);
                case SyntaxKind.TypeReference:
                    return emitTypeReference(<TypeReferenceNode>node);
                case SyntaxKind.FunctionType:
                    return emitFunctionType(<FunctionTypeNode>node);
                case SyntaxKind.ConstructorType:
                    return emitConstructorType(<ConstructorTypeNode>node);
                case SyntaxKind.TypeQuery:
                    return emitTypeQuery(<TypeQueryNode>node);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(<TypeLiteralNode>node);
                case SyntaxKind.ArrayType:
                    return emitArrayType(<ArrayTypeNode>node);
                case SyntaxKind.TupleType:
                    return emitTupleType(<TupleTypeNode>node);
                case SyntaxKind.UnionType:
                    return emitUnionType(<UnionTypeNode>node);
                case SyntaxKind.IntersectionType:
                    return emitIntersectionType(<IntersectionTypeNode>node);
                case SyntaxKind.ParenthesizedType:
                    return emitParenthesizedType(<ParenthesizedTypeNode>node);

                // Binding patterns
                case SyntaxKind.ObjectBindingPattern:
                    return emitObjectBindingPattern(<BindingPattern>node);
                case SyntaxKind.ArrayBindingPattern:
                    return emitArrayBindingPattern(<BindingPattern>node);
                case SyntaxKind.BindingElement:
                    return emitBindingElement(<BindingElement>node);

                // Expressions
                case SyntaxKind.ArrayLiteralExpression:
                    return emitArrayLiteralExpression(<ArrayLiteralExpression>node);
                case SyntaxKind.ObjectLiteralExpression:
                    return emitObjectLiteralExpression(<ObjectLiteralExpression>node);
                case SyntaxKind.PropertyAccessExpression:
                    return emitPropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return emitElementAccessExpression(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                    return emitCallExpression(<CallExpression>node);
                case SyntaxKind.NewExpression:
                    return emitNewExpression(<NewExpression>node);
                case SyntaxKind.TaggedTemplateExpression:
                    return emitTaggedTemplateExpression(<TaggedTemplateExpression>node);
                case SyntaxKind.TypeAssertionExpression:
                    return emitTypeAssertionExpression(<TypeAssertion>node);
                case SyntaxKind.ParenthesizedExpression:
                    return emitParenthesizedExpression(<ParenthesizedExpression>node);
                case SyntaxKind.FunctionExpression:
                    return emitFunctionExpression(<FunctionExpression>node);
                case SyntaxKind.ArrowFunction:
                    return emitArrowFunction(<ArrowFunction>node);
                case SyntaxKind.DeleteExpression:
                    return emitDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.TypeOfExpression:
                    return emitTypeOfExpression(<TypeOfExpression>node);
                case SyntaxKind.VoidExpression:
                    return emitVoidExpression(<VoidExpression>node);
                case SyntaxKind.AwaitExpression:
                    return emitAwaitExpression(<AwaitExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                    return emitPrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.PostfixUnaryExpression:
                    return emitPostfixUnaryExpression(<PostfixUnaryExpression>node);
                case SyntaxKind.BinaryExpression:
                    return emitBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.ConditionalExpression:
                    return emitConditionalExpression(<ConditionalExpression>node);
                case SyntaxKind.TemplateExpression:
                    return emitTemplateExpression(<TemplateExpression>node);
                case SyntaxKind.YieldExpression:
                    return emitYieldExpression(<YieldExpression>node);
                case SyntaxKind.SpreadElementExpression:
                    return emitSpreadElementExpression(<SpreadElementExpression>node);
                case SyntaxKind.ClassExpression:
                    return emitClassExpression(<ClassExpression>node);
                case SyntaxKind.OmittedExpression:
                    return;
                case SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);
                case SyntaxKind.AsExpression:
                    return emitAsExpression(<AsExpression>node);

                // Misc
                case SyntaxKind.TemplateSpan:
                    return emitTemplateSpan(<TemplateSpan>node);
                case SyntaxKind.SemicolonClassElement:
                    return write(";");

                // Statements
                case SyntaxKind.Block:
                    return emitBlock(<Block>node);
                case SyntaxKind.VariableStatement:
                    return emitVariableStatement(<VariableStatement>node);
                case SyntaxKind.EmptyStatement:
                    return write(";");
                case SyntaxKind.ExpressionStatement:
                    return emitExpressionStatement(<ExpressionStatement>node);
                case SyntaxKind.IfStatement:
                    return emitIfStatement(<IfStatement>node);
                case SyntaxKind.DoStatement:
                    return emitDoStatement(<DoStatement>node);
                case SyntaxKind.WhileStatement:
                    return emitWhileStatement(<WhileStatement>node);
                case SyntaxKind.ForStatement:
                    return emitForStatement(<ForStatement>node);
                case SyntaxKind.ForInStatement:
                    return emitForInStatement(<ForInStatement>node);
                case SyntaxKind.ForOfStatement:
                    return emitForOfStatement(<ForOfStatement>node);
                case SyntaxKind.ContinueStatement:
                    return emitContinueStatement(<ContinueStatement>node);
                case SyntaxKind.BreakStatement:
                    return emitBreakStatement(<BreakStatement>node);
                case SyntaxKind.ReturnStatement:
                    return emitReturnStatement(<ReturnStatement>node);
                case SyntaxKind.WithStatement:
                    return emitWithStatement(<WithStatement>node);
                case SyntaxKind.SwitchStatement:
                    return emitSwitchStatement(<SwitchStatement>node);
                case SyntaxKind.LabeledStatement:
                    return emitLabeledStatement(<LabeledStatement>node);
                case SyntaxKind.ThrowStatement:
                    return emitThrowStatement(<ThrowStatement>node);
                case SyntaxKind.TryStatement:
                    return emitTryStatement(<TryStatement>node);
                case SyntaxKind.DebuggerStatement:
                    return emitDebuggerStatement(<DebuggerStatement>node);

                // Declarations
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(<VariableDeclaration>node);
                case SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(<VariableDeclarationList>node);
                case SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(<FunctionDeclaration>node);
                case SyntaxKind.ClassDeclaration:
                    return emitClassDeclaration(<ClassDeclaration>node);
                case SyntaxKind.InterfaceDeclaration:
                    return emitInterfaceDeclaration(<InterfaceDeclaration>node);
                case SyntaxKind.TypeAliasDeclaration:
                    return emitTypeAliasDeclaration(<TypeAliasDeclaration>node);
                case SyntaxKind.EnumDeclaration:
                    return emitEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return emitModuleDeclaration(<ModuleDeclaration>node);
                case SyntaxKind.ModuleBlock:
                    return emitModuleBlock(<Block>node);
                case SyntaxKind.CaseBlock:
                    return emitCaseBlock(<CaseBlock>node);
                case SyntaxKind.ImportEqualsDeclaration:
                    return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                    return emitImportDeclaration(<ImportDeclaration>node);
                case SyntaxKind.ImportClause:
                    return emitImportClause(<ImportClause>node);
                case SyntaxKind.NamespaceImport:
                    return emitNamespaceImport(<NamespaceImport>node);
                case SyntaxKind.NamedImports:
                    return emitNamedImportsOrExports(<NamedImports>node);
                case SyntaxKind.ImportSpecifier:
                    return emitImportOrExportSpecifier(<ImportSpecifier>node);
                case SyntaxKind.ExportAssignment:
                    return emitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.ExportDeclaration:
                    return emitExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.NamedExports:
                    return emitNamedImportsOrExports(<NamedExports>node);
                case SyntaxKind.ExportSpecifier:
                    return emitImportOrExportSpecifier(<ExportSpecifier>node);
                case SyntaxKind.MissingDeclaration:
                    return;

                // Module references
                case SyntaxKind.ExternalModuleReference:
                    return emitExternalModuleReference(<ExternalModuleReference>node);

                // JSX
                case SyntaxKind.JsxElement:
                    return emitJsxElement(<JsxElement>node);
                case SyntaxKind.JsxSelfClosingElement:
                    return emitJsxSelfClosingElement(<JsxSelfClosingElement>node);
                case SyntaxKind.JsxOpeningElement:
                    return emitJsxOpeningElement(<JsxOpeningElement>node);
                case SyntaxKind.JsxText:
                    return emitJsxText(<JsxText>node);
                case SyntaxKind.JsxClosingElement:
                    return emitJsxClosingElement(<JsxClosingElement>node);
                case SyntaxKind.JsxAttribute:
                    return emitJsxAttribute(<JsxAttribute>node);
                case SyntaxKind.JsxSpreadAttribute:
                    return emitJsxSpreadAttribute(<JsxSpreadAttribute>node);
                case SyntaxKind.JsxExpression:
                    return emitJsxExpression(<JsxExpression>node);

                // Clauses
                case SyntaxKind.CaseClause:
                    return emitCaseClause(<CaseClause>node);
                case SyntaxKind.DefaultClause:
                    return emitDefaultClause(<DefaultClause>node);
                case SyntaxKind.HeritageClause:
                    return emitHeritageClause(<HeritageClause>node);
                case SyntaxKind.CatchClause:
                    return emitCatchClause(<CatchClause>node);

                // Property assignments
                case SyntaxKind.PropertyAssignment:
                    return emitPropertyAssignment(<PropertyAssignment>node);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return emitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);

                // Enum
                case SyntaxKind.EnumMember:
                    return emitEnumMember(<EnumMember>node);

                // Top-level nodes
                case SyntaxKind.SourceFile:
                    return emitSourceFile(<SourceFile>node);

                // JSDoc nodes (ignored)
                // Raw nodes (deprecated)
            }
        }

        //
        // Literals/Pseudo-literals
        //

        // SyntaxKind.NumericLiteral
        // SyntaxKind.StringLiteral
        // SyntaxKind.RegularExpressionLiteral
        // SyntaxKind.NoSubstitutionTemplateLiteral
        // SyntaxKind.TemplateHead
        // SyntaxKind.TemplateMiddle
        // SyntaxKind.TemplateTail
        function emitLiteral(node: LiteralExpression) {
            let text = getLiteralText(node, currentSourceFile, languageVersion);
            if ((compilerOptions.sourceMap || compilerOptions.inlineSourceMap)
                && (isStringLiteral(node) || isTemplateLiteralKind(node.kind))) {
                writer.writeLiteral(text);
            }
            else {
                write(text);
            }
        }

        //
        // Identifiers
        //

        function emitIdentifier(node: Identifier) {
            if (isExpressionIdentifier(node)) {
                emitExpressionIdentifier(node);
            }
            else if (tryEmitSubstitute(node, bindingIdentifierSubstitution)) {
                return;
            }
            else if (nodeIsSynthesized(node)) {
                write(node.text);
            }
            else {
                writeTextOfNode(currentSourceFile, node);
            }
        }

        function isExpressionIdentifier(node: Node): boolean {
            switch (parentNode.kind) {
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.CaseClause:
                case SyntaxKind.ComputedPropertyName:
                case SyntaxKind.ConditionalExpression:
                case SyntaxKind.Decorator:
                case SyntaxKind.DeleteExpression:
                case SyntaxKind.DoStatement:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.ExpressionWithTypeArguments:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.JsxSelfClosingElement:
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxSpreadAttribute:
                case SyntaxKind.JsxExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.PostfixUnaryExpression:
                case SyntaxKind.PrefixUnaryExpression:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.SpreadElementExpression:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.TaggedTemplateExpression:
                case SyntaxKind.TemplateSpan:
                case SyntaxKind.ThrowStatement:
                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.TypeOfExpression:
                case SyntaxKind.VoidExpression:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.YieldExpression:
                    return true;
                case SyntaxKind.BindingElement:
                case SyntaxKind.EnumMember:
                case SyntaxKind.Parameter:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.VariableDeclaration:
                    return (<BindingElement | EnumMember | ParameterDeclaration | PropertyAssignment | PropertyDeclaration | VariableDeclaration>parentNode).initializer === node;
                case SyntaxKind.PropertyAccessExpression:
                    return (<ExpressionStatement>parentNode).expression === node;
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                    return (<FunctionLikeDeclaration>parentNode).body === node;
                case SyntaxKind.ImportEqualsDeclaration:
                    return (<ImportEqualsDeclaration>parentNode).moduleReference === node;
                case SyntaxKind.QualifiedName:
                    return (<QualifiedName>parentNode).left === node;
            }
            return false;
        }

        function emitExpressionIdentifier(node: Identifier) {
            if (tryEmitSubstitute(node, expressionIdentifierSubstitution)) {
                return;
            }
            else if (nodeIsSynthesized(node)) {
                write(node.text);
            }
            else {
                writeTextOfNode(currentSourceFile, node);
            }
        }

        //
        // Names
        //

        function emitQualifiedName(node: QualifiedName) {
            emit(node.left);
            write(".");
            emit(node.right);
        }

        function emitComputedPropertyName(node: ComputedPropertyName) {
            write("[");
            emit(node.expression);
            write("]");
        }

        //
        // Signature elements
        //

        function emitTypeParameter(node: TypeParameterDeclaration) {
            emitStart(node);
            emit(node.name);
            emitWithPrefix("extends ", node.constraint);
            emitEnd(node);
        }

        function emitParameter(node: ParameterDeclaration) {
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            writeIfPresent(node.dotDotDotToken, "...");
            emit(node.name);
            writeIfPresent(node.questionToken, "?");
            emitWithPrefix(" = ", node.initializer);
            emitWithPrefix(": ", node.type);
            emitEnd(node);
        }

        function emitDecorator(decorator: Decorator) {
            emitLeadingComments(decorator);
            emitStart(decorator);
            write("@");
            emit(decorator.expression);
            emitEnd(decorator);
            emitTrailingComments(decorator);
        }

        //
        // Type members
        //

        function emitPropertySignature(node: PropertySignature) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            emit(node.name);
            writeIfPresent(node.questionToken, "?");
            emitWithPrefix(": ", node.type);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitPropertyDeclaration(node: PropertyDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            emit(node.name);
            emitWithPrefix(": ", node.type);
            emitWithPrefix(" = ", node.initializer);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitMethodSignature(node: MethodSignature) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            emit(node.name);
            writeIfPresent(node.questionToken, "?");
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.Parameters);
            emitWithPrefix(": ", node.type);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitMethodDeclaration(node: MethodDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            writeIfPresent(node.asteriskToken, "*");
            emit(node.name);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.Parameters);
            emitWithPrefix(": ", node.type);
            emit(node.body);
            writeIfMissing(node.body, ";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitConstructor(node: ConstructorDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitModifiers(node);
            write("constructor");
            emitList(node, node.parameters, ListFormat.Parameters);
            emit(node.body);
            writeIfMissing(node.body, ";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitAccessorDeclaration(node: AccessorDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            write(node.kind === SyntaxKind.GetAccessor ? "get " : "set ");
            emit(node.name);
            emitList(node, node.parameters, ListFormat.Parameters);
            emitWithPrefix(": ", node.type);
            emit(node.body);
            writeIfMissing(node.body, ";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitCallSignature(node: CallSignatureDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.Parameters);
            emitWithPrefix(": ", node.type);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitConstructSignature(node: ConstructSignatureDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            write("new ");
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.Parameters);
            emitWithPrefix(": ", node.type);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitIndexSignature(node: IndexSignatureDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            emitList(node, node.parameters, ListFormat.IndexSignatureParameters);
            emitWithPrefix(": ", node.type);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        //
        // Types
        //

        function emitTypePredicate(node: TypePredicateNode) {
            emitStart(node);
            emit(node.parameterName);
            write(" is ");
            emit(node.type);
            emitEnd(node);
        }

        function emitTypeReference(node: TypeReferenceNode) {
            emitStart(node);
            emit(node.typeName);
            emitList(node, node.typeArguments, ListFormat.TypeArguments);
            emitEnd(node);
        }

        function emitFunctionType(node: FunctionTypeNode) {
            emitStart(node);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.ArrowParameters);
            write(" => ");
            emit(node.type);
            emitEnd(node);
        }

        function emitConstructorType(node: ConstructorTypeNode) {
            emitStart(node);
            write("new ");
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.ArrowParameters);
            write(" => ");
            emit(node.type);
            emitEnd(node);
        }

        function emitTypeQuery(node: TypeQueryNode) {
            emitStart(node);
            write("typeof ");
            emit(node.exprName);
            emitEnd(node);
        }

        function emitTypeLiteral(node: TypeLiteralNode) {
            emitStart(node);
            emitList(node, node.members, ListFormat.TypeElements);
            emitEnd(node);
        }

        function emitArrayType(node: ArrayTypeNode) {
            emitStart(node);
            emit(node.elementType);
            write("[]");
            emitEnd(node);
        }

        function emitTupleType(node: TupleTypeNode) {
            emitStart(node);
            emitList(node, node.elementTypes, ListFormat.TupleTypeElementTypes);
            emitEnd(node);
        }

        function emitUnionType(node: UnionTypeNode) {
            emitStart(node);
            emitList(node, node.types, ListFormat.UnionTypeConstituents)
            emitEnd(node);
        }

        function emitIntersectionType(node: IntersectionTypeNode) {
            emitStart(node);
            emitList(node, node.types, ListFormat.IntersectionTypeConstituents);
            emitEnd(node);
        }

        function emitParenthesizedType(node: ParenthesizedTypeNode) {
            write("(");
            emit(node.type);
            write(")");
        }

        //
        // Binding patterns
        //

        function emitObjectBindingPattern(node: ObjectBindingPattern) {
            emitList(node, node.elements, ListFormat.ObjectBindingPatternElements);
        }

        function emitArrayBindingPattern(node: ArrayBindingPattern) {
            emitList(node, node.elements, ListFormat.ArrayBindingPatternElements);
        }

        function emitBindingElement(node: BindingElement) {
            emitWithSuffix(node.propertyName, ": ");
            writeIfPresent(node.dotDotDotToken, "...");
            emit(node.name);
            emitWithPrefix(" = ", node.initializer);
        }

        //
        // Expressions
        //

        function emitArrayLiteralExpression(node: ArrayLiteralExpression) {
            emitList(node, node.elements, ListFormat.ArrayLiteralExpressionElements);
        }

        function emitObjectLiteralExpression(node: ObjectLiteralExpression) {
            emitList(node, node.properties, languageVersion < ScriptTarget.ES5
                ? ListFormat.ObjectLiteralExpressionProperties
                : ListFormat.ObjectLiteralExpressionPropertiesForES5AndLater);
        }

        function emitPropertyAccessExpression(node: PropertyAccessExpression) {
            if (tryEmitConstantValue(node)) {
                return;
            }

            let indentBeforeDot = needsIndentation(node, node.expression, node.dotToken);
            let indentAfterDot = needsIndentation(node, node.dotToken, node.name);
            let shouldEmitDotDot = !indentBeforeDot && needsDotDotForPropertyAccess(node.expression);

            emit(node.expression);
            increaseIndentIf(indentBeforeDot);
            write(shouldEmitDotDot ? ".." : ".");
            increaseIndentIf(indentAfterDot);
            emit(node.name);
            decreaseIndentIf(indentBeforeDot, indentAfterDot);
        }

        // 1..toString is a valid property access, emit a dot after the literal
        // Also emit a dot if expression is a integer const enum value - it will appear in generated code as numeric literal
        function needsDotDotForPropertyAccess(expression: Expression) {
            if (isNumericLiteral(expression)) {
                // check if numeric literal was originally written with a dot
                let text = getLiteralText(expression, currentSourceFile, languageVersion);
                return text.indexOf(tokenToString(SyntaxKind.DotToken)) < 0;
            }
            else {
                // check if constant enum value is integer
                let constantValue = tryGetConstEnumValue(expression);
                // isFinite handles cases when constantValue is undefined
                return isFinite(constantValue) && Math.floor(constantValue) === constantValue;
            }
            return false;
        }

        function emitElementAccessExpression(node: ElementAccessExpression) {
            if (tryEmitConstantValue(node)) {
                return;
            }

            emit(node.expression);
            write("[");
            emit(node.argumentExpression);
            write("]");
        }

        function emitCallExpression(node: CallExpression) {
            emit(node.expression);
            emitList(node, node.arguments, ListFormat.CallExpressionArguments);
        }

        function emitNewExpression(node: NewExpression) {
            write("new ");
            emit(node.expression);
            emitList(node, node.arguments, ListFormat.NewExpressionArguments);
        }

        function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            emit(node.tag);
            emit(node.template);
        }

        function emitTypeAssertionExpression(node: TypeAssertion) {
            write("<");
            emit(node.type);
            write(">");
            emit(node.expression);
        }

        function emitParenthesizedExpression(node: ParenthesizedExpression) {
            write("(");
            emit(node.expression);
            write(")");
        }

        function emitFunctionExpression(node: FunctionExpression) {
            emitFunctionDeclarationOrExpression(node);
        }

        function emitArrowFunction(node: ArrowFunction) {
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.ArrowParameters);
            emitWithPrefix(": ", node.type);
            emit(node.body);
            emitEnd(node);
        }

        function emitDeleteExpression(node: DeleteExpression) {
            write("delete ");
            emit(node.expression);
        }

        function emitTypeOfExpression(node: TypeOfExpression) {
            write("typeof ");
            emit(node.expression);
        }

        function emitVoidExpression(node: VoidExpression) {
            write("void ");
            emit(node.expression);
        }

        function emitAwaitExpression(node: AwaitExpression) {
            write("await ");
            emit(node.expression);
        }

        function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
            writeToken(node.operator);
            if (shouldEmitWhitespaceBeforeOperand(node)) {
                write(" ");
            }
            emit(node.operand);
        }

        function shouldEmitWhitespaceBeforeOperand(node: PrefixUnaryExpression) {
            // In some cases, we need to emit a space between the operator and the operand. One obvious case
            // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
            // and minus expressions in certain cases. Specifically, consider the following two cases (parens
            // are just for clarity of exposition, and not part of the source code):
            //
            //  (+(+1))
            //  (+(++1))
            //
            // We need to emit a space in both cases. In the first case, the absence of a space will make
            // the resulting expression a prefix increment operation. And in the second, it will make the resulting
            // expression a prefix increment whose operand is a plus expression - (++(+x))
            // The same is true of minus of course.
            let operand = node.operand;
            return isPrefixUnaryExpression(operand)
                && ((node.operator === SyntaxKind.PlusToken && (operand.operator === SyntaxKind.PlusToken || operand.operator === SyntaxKind.PlusPlusToken))
                || (node.operator === SyntaxKind.MinusToken && (operand.operator === SyntaxKind.MinusToken || operand.operator === SyntaxKind.MinusMinusToken)));
        }

        function emitPostfixUnaryExpression(node: PostfixUnaryExpression) {
            emit(node.operand);
            writeToken(node.operator);
        }

        function emitBinaryExpression(node: BinaryExpression) {
            // Allow transformers to substitute assignments to handle exports.
            if (isAssignmentOperator(node.kind) && tryEmitSubstitute(node, assignmentSubstitution)) {
                return;
            }

            let isCommaOperator = node.operatorToken.kind !== SyntaxKind.CommaToken;
            let indentBeforeOperator = needsIndentation(node, node.left, node.operatorToken);
            let indentAfterOperator = needsIndentation(node, node.operatorToken, node.right);

            emit(node.left);
            increaseIndentIf(indentBeforeOperator, isCommaOperator ? " " : undefined);
            writeTokenNode(node.operatorToken);
            increaseIndentIf(indentAfterOperator, " ");
            emit(node.right);
            decreaseIndentIf(indentBeforeOperator, indentAfterOperator);
        }

        function emitConditionalExpression(node: ConditionalExpression) {
            let indentBeforeQuestion = needsIndentation(node, node.condition, node.questionToken);
            let indentAfterQuestion = needsIndentation(node, node.questionToken, node.whenTrue);
            let indentBeforeColon = needsIndentation(node, node.whenTrue, node.colonToken);
            let indentAfterColon = needsIndentation(node, node.colonToken, node.whenFalse);

            emit(node.condition);
            increaseIndentIf(indentBeforeQuestion, " ");
            write("?");
            increaseIndentIf(indentAfterQuestion, " ");
            emit(node.whenTrue);
            decreaseIndentIf(indentBeforeQuestion, indentAfterQuestion);

            increaseIndentIf(indentBeforeColon, " ");
            write(":");
            increaseIndentIf(indentAfterColon);
            emit(node.whenFalse);
            decreaseIndentIf(indentBeforeColon, indentAfterColon);
        }

        function emitTemplateExpression(node: TemplateExpression) {
            emit(node.head);
            emitList(node, node.templateSpans, ListFormat.TemplateExpressionTemplateSpans);
        }

        function emitYieldExpression(node: YieldExpression) {
            write(node.asteriskToken ? "yield*" : "yield");
            emitWithPrefix(" ", node.expression);
        }

        function emitSpreadElementExpression(node: SpreadElementExpression) {
            write("...");
            emit(node.expression);
        }

        function emitClassExpression(node: ClassExpression) {
            emitClassDeclarationOrExpression(node);
        }

        function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
            emitStart(node);
            emit(node.expression);
            emitList(node, node.typeArguments, ListFormat.TypeArguments);
            emitEnd(node);
        }

        function emitAsExpression(node: AsExpression) {
            emit(node.expression);
            write(" as ");
            emit(node.type);
        }

        //
        // Misc
        //

        function emitTemplateSpan(node: TemplateSpan) {
            emit(node.expression);
            emit(node.literal);
        }

        //
        // Statements
        //

        function emitBlock(node: Block) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.statements, ListFormat.BlockStatements);
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitVariableStatement(node: VariableStatement) {
            emitLeadingComments(node);
            emitStart(node);
            emitModifiers(node);
            emit(node.declarationList);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitExpressionStatement(node: ExpressionStatement) {
            emit(node.expression);
            write(";");
        }

        function emitIfStatement(node: IfStatement) {
            write("if (");
            emit(node.expression);
            write(")");
            emitEmbeddedStatement(node.thenStatement);
            if (node.elseStatement) {
                writeLine();
                write("else");
                emitEmbeddedStatement(node.elseStatement);
            }
        }

        function emitDoStatement(node: DoStatement) {
            write("do");
            emitEmbeddedStatement(node.statement);
            if (isBlock(node.statement)) {
                write(" ");
            }
            else {
                writeLine();
            }

            write("while (");
            emit(node.expression);
            write(");");
        }

        function emitWhileStatement(node: WhileStatement) {
            write("while (");
            emit(node.expression);
            write(")");
            emitEmbeddedStatement(node.statement);
        }

        function emitForStatement(node: ForStatement) {
            write("for (");
            emit(node.initializer);
            write(";");
            emitWithPrefix(" ", node.condition);
            write(";");
            emitWithPrefix(" ", node.incrementor);
            write(")");
            emitEmbeddedStatement(node.statement);
        }

        function emitForInStatement(node: ForInStatement) {
            write("for (");
            emit(node.initializer);
            write(" in ");
            emit(node.expression);
            write(")");
            emitEmbeddedStatement(node.statement);
        }

        function emitForOfStatement(node: ForOfStatement) {
            write("for (");
            emit(node.initializer);
            write(" of ");
            emit(node.expression);
            write(")");
            emitEmbeddedStatement(node.statement);
        }

        function emitContinueStatement(node: ContinueStatement) {
            write("continue");
            emitWithPrefix(" ", node.label);
            write(";");
        }

        function emitBreakStatement(node: BreakStatement) {
            write("break");
            emitWithPrefix(" ", node.label);
            write(";");
        }

        function emitReturnStatement(node: ReturnStatement) {
            write("return");
            emitWithPrefix(" ", node.expression);
            write(";");
        }

        function emitWithStatement(node: WithStatement) {
            write("with (");
            emit(node.expression);
            write(")");
            emitEmbeddedStatement(node.statement);
        }

        function emitSwitchStatement(node: SwitchStatement) {
            write("switch (");
            emit(node.expression);
            write(") ");
            emit(node.caseBlock);
        }

        function emitLabeledStatement(node: LabeledStatement) {
            emit(node.label);
            write(":");
            emitEmbeddedStatement(node.statement);
        }

        function emitThrowStatement(node: ThrowStatement) {
            write("throw");
            emitWithPrefix(" ", node.expression);
            write(";");
        }

        function emitTryStatement(node: TryStatement) {
            write("try ");
            emit(node.tryBlock);
            emit(node.catchClause);
            if (node.finallyBlock) {
                writeLine();
                write("finally ");
                emit(node.finallyBlock);
            }
        }

        function emitDebuggerStatement(node: DebuggerStatement) {
            write("debugger;");
        }

        //
        // Declarations
        //

        function emitVariableDeclaration(node: VariableDeclaration) {
            emit(node.name);
            emitWithPrefix(" = ", node.initializer);
        }

        function emitVariableDeclarationList(node: VariableDeclarationList) {
            write(isLet(node) ? "let " : isConst(node) ? "const " : "var ");
            emitList(node, node.declarations, ListFormat.VariableDeclarations);
        }

        function emitFunctionDeclaration(node: FunctionDeclaration) {
            emitFunctionDeclarationOrExpression(node);
        }

        function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            write(node.asteriskToken ? "function*" : "function");
            emitWithPrefix(" ", node.name);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.parameters, ListFormat.Parameters);
            emitWithPrefix(": ", node.type);
            emitWithPrefix(" ", node.body);
            writeIfMissing(node.body, ";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitClassDeclaration(node: ClassDeclaration) {
            emitClassDeclarationOrExpression(node);
        }

        function emitClassDeclarationOrExpression(node: ClassDeclaration | ClassExpression) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            write("class");
            emitWithPrefix(" ", node.name);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.heritageClauses, ListFormat.HeritageClauses);
            write(" ");
            emitList(node, node.members, ListFormat.ClassMembers);
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitInterfaceDeclaration(node: InterfaceDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            write("interface ");
            emit(node.name);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            emitList(node, node.heritageClauses, ListFormat.HeritageClauses);
            write(" ");
            emitList(node, node.members, ListFormat.TypeElements);
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitList(node, node.decorators, ListFormat.Decorators);
            emitModifiers(node);
            write("type ");
            emit(node.name);
            emitList(node, node.typeParameters, ListFormat.TypeParameters);
            write(" = ");
            emit(node.type);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitEnumDeclaration(node: EnumDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitModifiers(node);
            write("enum ");
            emit(node.name);
            write(" ");
            emitList(node, node.members, ListFormat.EnumMembers);
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitModuleDeclaration(node: ModuleDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitModifiers(node);
            write(node.flags & NodeFlags.Namespace ? "namespace " : "module ");
            emit(node.name);

            let body = node.body;
            while (isModuleDeclaration(body)) {
                write(".");
                emit((<ModuleDeclaration>body).name);
                body = (<ModuleDeclaration>body).body;
            }

            write(" ");
            emit(body);
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitModuleBlock(node: ModuleBlock) {
            emitList(node, node.statements, ListFormat.ModuleBlockStatements);
        }

        function emitCaseBlock(node: CaseBlock) {
            emitList(node, node.clauses, ListFormat.CaseBlockClauses);
        }

        function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitModifiers(node);
            write("import ");
            emit(node.name);
            write(" = ");
            emit(node.moduleReference);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitImportDeclaration(node: ImportDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            emitModifiers(node);
            write("import ");
            emit(node.importClause);
            emit(node.moduleSpecifier);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitImportClause(node: ImportClause) {
            emitStart(node);
            emit(node.name);
            if (node.name && node.namedBindings) {
                write(", ");
            }
            emit(node.namedBindings);
            emitEnd(node);
            write(" from ");
        }

        function emitNamespaceImport(node: NamespaceImport) {
            emitStart(node);
            write("* as ");
            emit(node.name);
            emitEnd(node);
        }

        function emitNamedImports(node: NamedImports) {
            emitNamedImportsOrExports(node);
        }

        function emitImportSpecifier(node: ImportSpecifier) {
            emitImportOrExportSpecifier(node);
        }

        function emitExportAssignment(node: ExportAssignment) {
            emitLeadingComments(node);
            emitStart(node);
            write(node.isExportEquals ? "export = " : "export default ");
            emit(node.expression);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitExportDeclaration(node: ExportDeclaration) {
            emitLeadingComments(node);
            emitStart(node);
            write("export ");
            if (node.exportClause) {
                emit(node.exportClause);
                write(" from ");
            }
            else {
                write("* from ");
            }
            emit(node.moduleSpecifier);
            write(";");
            emitEnd(node);
            emitTrailingComments(node);
        }

        function emitNamedExports(node: NamedExports) {
            emitNamedImportsOrExports(node);
        }

        function emitExportSpecifier(node: ExportSpecifier) {
            emitImportOrExportSpecifier(node);
        }

        function emitNamedImportsOrExports(node: NamedImportsOrExports) {
            emitStart(node);
            emitList(node, node.elements, ListFormat.ImportOrExportSpecifiers);
            emitEnd(node);
        }

        function emitImportOrExportSpecifier(node: ImportOrExportSpecifier) {
            emitLeadingComments(node);
            emitStart(node);
            if (node.propertyName) {
                emit(node.propertyName);
                write(" as ");
            }

            emit(node.name);
            emitEnd(node);
            emitTrailingComments(node);
        }

        //
        // Module references
        //

        function emitExternalModuleReference(node: ExternalModuleReference) {
            write("require(");
            emit(node.expression);
            write(")");
        }

        //
        // JSX
        //

        function emitJsxElement(node: JsxElement) {
            emit(node.openingElement);
            emitList(node, node.children, ListFormat.JsxElementChildren);
            emit(node.closingElement);
        }

        function emitJsxSelfClosingElement(node: JsxSelfClosingElement) {
            write("<");
            emit(node.tagName);
            write(" ");
            emitList(node, node.attributes, ListFormat.JsxAttributes);
            write("/>");
        }

        function emitJsxOpeningElement(node: JsxOpeningElement) {
            write("<");
            emit(node.tagName);
            writeIfAny(node.attributes, " ");
            emitList(node, node.attributes, ListFormat.JsxAttributes);
            write(">");
        }

        function emitJsxText(node: JsxText) {
            writer.writeLiteral(getTextOfNode(node, /*includeTrivia*/ true));
        }

        function emitJsxClosingElement(node: JsxClosingElement) {
            write("</");
            emit(node.tagName);
            write(">");
        }

        function emitJsxAttribute(node: JsxAttribute) {
            emit(node.name);
            emitWithPrefix("=", node.initializer);
        }

        function emitJsxSpreadAttribute(node: JsxSpreadAttribute) {
            write("{...");
            emit(node.expression);
            write("}");
        }

        function emitJsxExpression(node: JsxExpression) {
            write("{");
            emit(node.expression);
            write("}");
        }

        //
        // Clauses
        //

        function emitCaseClause(node: CaseClause) {
            write("case ");
            emit(node.expression);
            write(":");
            emitList(node, node.statements, ListFormat.CaseOrDefaultClauseStatements);
        }

        function emitDefaultClause(node: DefaultClause) {
            write("default:");
            emitList(node, node.statements, ListFormat.CaseOrDefaultClauseStatements);
        }

        function emitHeritageClause(node: HeritageClause) {
            emitStart(node);
            writeToken(node.token);
            write(" ");
            emitList(node, node.types, ListFormat.HeritageClauseTypes);
            emitEnd(node);
        }

        function emitCatchClause(node: CatchClause) {
            writeLine();
            write("catch (");
            emit(node.variableDeclaration);
            write(") ");
            emit(node.block);
        }

        //
        // Property assignments
        //

        function emitPropertyAssignment(node: PropertyAssignment) {
            emit(node.name);
            write(": ");
            // This is to ensure that we emit comment in the following case:
            //      For example:
            //          obj = {
            //              id: /*comment1*/ ()=>void
            //          }
            // "comment1" is not considered to be leading comment for node.initializer
            // but rather a trailing comment on the previous node.
            emitTrailingCommentsOfPosition(node.initializer.pos);
            emit(node.initializer);
        }

        function emitShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
            emit(node.name);
        }

        //
        // Enum
        //

        function emitEnumMember(node: EnumMember) {
            emitLeadingComments(node);
            emitStart(node);
            emit(node.name);
            emitWithPrefix(" = ", node.initializer);
            emitEnd(node);
            emitTrailingComments(node);
        }

        //
        // Top-level nodes
        //

        function emitSourceFile(node: SourceFile) {
            currentSourceFile = node;
            assignmentSubstitution = transformationResolver.getAssignmentSubstitution(currentSourceFile);
            bindingIdentifierSubstitution = transformationResolver.getBindingIdentifierSubstitution(currentSourceFile);
            expressionIdentifierSubstitution = transformationResolver.getExpressionIdentifierSubstitution(currentSourceFile);

            writeLine();
            emitShebang();
            emitDetachedComments(node);
            emitList(node, node.statements, ListFormat.SourceFileStatements);

            currentSourceFile = undefined;
            assignmentSubstitution = undefined;
            bindingIdentifierSubstitution = undefined;
            expressionIdentifierSubstitution = undefined;
        }

        //
        // Helpers
        //

        function emitShebang() {
            let shebang = getShebang(currentSourceFile.text);
            if (shebang) {
                write(shebang);
            }
        }

        function emitModifiers(node: Node) {
            if (node.flags & NodeFlags.Export) {
                write("export ");
            }
            if (node.flags & NodeFlags.Default) {
                write("default ");
            }
            if (node.flags & NodeFlags.Ambient) {
                write("declare ");
            }
            if (isConstEnumDeclaration(node)) {
                write("const ");
            }
            if (node.flags & NodeFlags.Public) {
                write("public ");
            }
            else if (node.flags & NodeFlags.Protected) {
                write("protected ");
            }
            else if (node.flags & NodeFlags.Private) {
                write("private ");
            }
            if (node.flags & NodeFlags.Static) {
                write("static ");
            }
            if (node.flags & NodeFlags.Async) {
                write("async ");
            }
            if (node.flags & NodeFlags.Abstract) {
                write("abstract ");
            }
        }

        function emitWithPrefix(prefix: string, node: Node) {
            if (node) {
                write(prefix);
                emit(node);
            }
        }

        function emitWithSuffix(node: Node, suffix: string) {
            if (node) {
                emit(node);
                write(suffix);
            }
        }

        function tryEmitConstantValue(node: PropertyAccessExpression | ElementAccessExpression): boolean {
            let constantValue = tryGetConstEnumValue(node);
            if (constantValue !== undefined) {
                write(String(constantValue));
                if (!compilerOptions.removeComments) {
                    let propertyName = isPropertyAccessExpression(node)
                        ? declarationNameToString(node.name)
                        : getTextOfNode(node.argumentExpression);
                    write(` /* ${propertyName} */`);
                }

                return true;
            }

            return false;
        }

        function emitEmbeddedStatement(node: Statement) {
            if (isBlock(node)) {
                write(" ");
                emit(node);
            }
            else {
                writeLine();
                increaseIndent();
                emit(node);
                decreaseIndent();
            }
        }

        function emitList(parentNode: Node, children: NodeArray<Node>, format: ListFormat) {
            if (!children && format & ListFormat.Optional) {
                return;
            }

            let containingRange: TextRange = format & ListFormat.Fragment ? children : parentNode;

            // Shortcut for an empty list.
            if (!children || children.length === 0) {
                // If the list is bracketed, emit the brackets and any interceeding whitespace.
                if (format & ListFormat.BracketsMask) {
                    write(getBracket(format, ListFormat.LeadingBracketOffset));
                    if (containingRange && !positionsAreOnSameLine(containingRange.pos, containingRange.end)) {
                        writeLine();
                    }
                    else if (format & ListFormat.Whitespace) {
                        write(" ");
                    }
                    write(getBracket(format, ListFormat.TrailingBracketOffset));
                }
                return;
            }

            let previousSibling: Node;
            let firstChild = firstOrUndefined(children);
            let lastChild = lastOrUndefined(children);

            // Shortcut for a simple arrow function.
            if (format & ListFormat.Arrow &&
                children.length === 1 &&
                isParameter(firstChild) &&
                firstChild.type === undefined &&
                firstChild.pos === parentNode.pos) {
                emit(firstChild);
                return;
            }

            // Write the leading bracket.
            write(getBracket(format, ListFormat.LeadingBracketOffset));

            // Start the new scope, if requested.
            if (format & ListFormat.Scoped) {
                scopeEmitStart(parentNode);
            }

            // Write the opening line terminator or leading whitespace.
            if (shouldWriteLeadingLineTerminator(containingRange, firstChild, format)) {
                writeLine();
            }
            else if (format & ListFormat.LeadingWhitespace) {
                write(" ");
            }

            // Increase the indent, if requested.
            if (format & ListFormat.Indented) {
                increaseIndent();
            }

            // Emit each child.
            let delimiter = getDelimiter(format);
            for (let child of children) {
                // Write the delimiter if this is not the first node.
                if (previousSibling) {
                    write(delimiter);

                    // Write either a line terminator or whitespace to separate the elements.
                    if (shouldWriteSeparatingLineTerminator(previousSibling, child, format)) {
                        writeLine();
                    }
                    else if (previousSibling) {
                        write(" ");
                    }
                }

                // Emit this child.
                emit(child);
                previousSibling = child;
            }

            // Write a trailing comma, if requested.
            let hasTrailingComma = (format & ListFormat.AllowTrailingComma) && children.hasTrailingComma;
            if (format & ListFormat.CommaDelimited && hasTrailingComma) {
                write(",");
            }

            // Decrease the indent, if requested.
            if (format & ListFormat.Indented) {
                decreaseIndent();
            }

            // Write the closing line terminator or closing whitespace.
            if (shouldWriteClosingLineTerminator(containingRange, lastChild, format)) {
                writeLine();
            }
            else if (format & ListFormat.TrailingWhitespace && (previousSibling || hasTrailingComma)) {
                write(" ");
            }

            // End the scope, if requested.
            if (format & ListFormat.Scoped) {
                scopeEmitEnd();
            }

            // Write the trailing bracket.
            write(getBracket(format, ListFormat.TrailingBracketOffset));
        }

        function writeIfAny(nodes: NodeArray<Node>, text: string) {
            if (nodes && nodes.length > 0) {
                write(text);
            }
        }

        function writeIfPresent(node: Node, text: string) {
            if (node !== undefined) {
                write(text);
            }
        }

        function writeIfMissing(node: Node, text: string) {
            if (node === undefined) {
                write(text);
            }
        }

        function writeToken(token: SyntaxKind) {
            write(tokenToString(token));
        }

        function writeTokenNode(node: Node) {
            if (node) {
                writeToken(node.kind);
            }
        }

        function increaseIndentIf(value: boolean, valueToWriteWhenNotIndenting?: string) {
            if (value) {
                increaseIndent();
                writeLine();
            }
            else if (valueToWriteWhenNotIndenting) {
                write(valueToWriteWhenNotIndenting);
            }
        }

        // Helper function to decrease the indent if we previously indented.  Allows multiple
        // previous indent values to be considered at a time.  This also allows caller to just
        // call this once, passing in all their appropriate indent values, instead of needing
        // to call this helper function multiple times.
        function decreaseIndentIf(value1: boolean, value2?: boolean) {
            if (value1) {
                decreaseIndent();
            }
            if (value2) {
                decreaseIndent();
            }
        }

        function shouldWriteLeadingLineTerminator(containingRange: TextRange, firstChild: Node, format?: ListFormat) {
            if (containingRange === undefined) {
                return false;
            }
            else if (firstChild === undefined) {
                return !positionsAreOnSameLine(getStartPos(containingRange), getEndPos(containingRange));
            }
            else if (positionIsSynthesized(containingRange.pos)) {
                return format & ListFormat.PreferNewLine ? true : synthesizedNodeStartsOnNewLine(firstChild);
            }
            else if (nodeIsSynthesized(firstChild)) {
                return format & ListFormat.PreferNewLine ? true : (<SynthesizedNode>firstChild).startsOnNewLine;
            }
            else {
                return !rangeStartPositionsAreOnSameLine(containingRange, firstChild);
            }
        }

        function shouldWriteSeparatingLineTerminator(previousNode: Node, nextNode: Node, format?: ListFormat) {
            if (previousNode === undefined || nextNode === undefined) {
                return false;
            }
            else if (nodeIsSynthesized(previousNode) || nodeIsSynthesized(nextNode)) {
                return format & ListFormat.PreferNewLine ? true : synthesizedNodeStartsOnNewLine(previousNode) || synthesizedNodeStartsOnNewLine(nextNode);
            }
            else {
                return !rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode);
            }
        }

        function shouldWriteClosingLineTerminator(containingRange: TextRange, lastChild: Node, format?: ListFormat) {
            if (lastChild === undefined) {
                return false;
            }
            else if (positionIsSynthesized(containingRange.pos)) {
                return format & ListFormat.PreferNewLine ? true : synthesizedNodeStartsOnNewLine(lastChild);
            }
            else if (nodeIsSynthesized(lastChild)) {
                return format & ListFormat.PreferNewLine ? true : (<SynthesizedNode>lastChild).startsOnNewLine;
            }
            else {
                return !rangeEndPositionsAreOnSameLine(containingRange, lastChild);
            }
        }

        function synthesizedNodeStartsOnNewLine(node: Node) {
            return nodeIsSynthesized(node) && (<SynthesizedNode>node).startsOnNewLine;
        }

        function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange) {
            return positionsAreOnSameLine(getStartPos(range1), getStartPos(range2));
        }

        function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange) {
            return positionsAreOnSameLine(getEndPos(range1), getEndPos(range2));
        }

        function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange) {
            return positionsAreOnSameLine(getEndPos(range1), getStartPos(range2));
        }

        function positionsAreOnSameLine(pos1: number, pos2: number) {
            return pos1 === pos2 ||
                getLineOfLocalPosition(currentSourceFile, pos1) === getLineOfLocalPosition(currentSourceFile, pos2);
        }

        function getStartPos(range: TextRange) {
            return skipTrivia(currentSourceFile.text, range.pos);
        }

        function getEndPos(range: TextRange) {
            return range.end;
        }

        function needsIndentation(parent: Node, node1: Node, node2: Node): boolean {
            // Always use a newline for synthesized code if the synthesizer desires it.
            if (synthesizedNodeStartsOnNewLine(node2)) {
                return true;
            }

            return !nodeIsSynthesized(parent)
                && !nodeIsSynthesized(node1)
                && !nodeIsSynthesized(node2)
                && !rangeEndIsOnSameLineAsRangeStart(node1, node2);
        }

        function getTextOfNode(node: Node, includeTrivia?: boolean) {
            if (nodeIsSynthesized(node) && (isLiteralExpression(node) || isIdentifier(node))) {
                return node.text;
            }

            return getSourceTextOfNodeFromSourceFile(currentSourceFile, node, includeTrivia);
        }

        function tryGetConstEnumValue(node: Node): number {
            if (compilerOptions.isolatedModules) {
                return undefined;
            }

            return isPropertyAccessExpression(node) || isElementAccessExpression(node)
                ? resolver.getConstantValue(<PropertyAccessExpression | ElementAccessExpression>node)
                : undefined;
        }
    }

    function createDelimiterMap() {
        let delimiters: string[] = [];
        delimiters[ListFormat.None] = "";
        delimiters[ListFormat.CommaDelimited] = ",";
        delimiters[ListFormat.BarDelimited] = " |";
        delimiters[ListFormat.AmpersandDelimited] = " &";
        return delimiters;
    }

    function getDelimiter(format: ListFormat) {
        return delimiters[format & ListFormat.DelimitersMask];
    }

    function createBracketsMap() {
        let brackets: string[] = [];
        brackets[ListFormat.None] = "";
        brackets[ListFormat.Parentheses << ListFormat.LeadingBracketOffset] = "(";
        brackets[ListFormat.Parentheses << ListFormat.TrailingBracketOffset] = ")";
        brackets[ListFormat.SquareBrackets << ListFormat.LeadingBracketOffset] = "[";
        brackets[ListFormat.SquareBrackets << ListFormat.TrailingBracketOffset] = "]";
        brackets[ListFormat.CurlyBrackets << ListFormat.LeadingBracketOffset] = "{";
        brackets[ListFormat.CurlyBrackets << ListFormat.TrailingBracketOffset] = "}";
        brackets[ListFormat.AngleBrackets << ListFormat.LeadingBracketOffset] = "<";
        brackets[ListFormat.AngleBrackets << ListFormat.TrailingBracketOffset] = ">";
        return brackets;
    }

    function getBracket(format: ListFormat, offset: number) {
        return brackets[(format & ListFormat.BracketsMask) << offset];
    }

    const enum ListFormat {
        None = 0,

        // Brackets
        Parentheses = 1 << 0,           // The list is surrounded with parentheses ("(", ")").
        SquareBrackets = 1 << 1,        // The list is surrounded with brackets ("[", "]").
        CurlyBrackets = 1 << 2,         // The list is surrounded with braces ("{", "}").
        AngleBrackets = 1 << 3,         // The list is surrounded with angle-brackets ("<", ">").

        LeadingBracketOffset = 0,       // Left-shift offset for a leading bracket.
        TrailingBracketOffset = 4,      // Left-shift offset for a trailing bracket.
        BracketsMask = Parentheses | SquareBrackets | CurlyBrackets | AngleBrackets,

        // Delimiters
        BarDelimited = 1 << 4,          // Each list item is space-and-bar (" |") delimited.
        AmpersandDelimited = 1 << 5,    // Each list item is space-and-ampersand (" &") delimited.
        CommaDelimited = 1 << 6,        // Each list item is comma (",") delimited.
        AllowTrailingComma = 1 << 7,    // Write a trailing comma (",") if present.
        DelimitersMask = BarDelimited | AmpersandDelimited | CommaDelimited,

        // Whitespace
        Indented = 1 << 8,              // The list should be indented.
        LeadingWhitespace = 1 << 9,     // Write a leading space (" ") before the first element if not indented.
        TrailingWhitespace = 1 << 10,   // Write a trailing space (" ") after the last element if not indented.
        Whitespace = LeadingWhitespace | TrailingWhitespace,

        // Other
        Optional = 1 << 11,             // Skip writing brackets (if any) for an empty or missing list.
        Scoped = 1 << 12,               // The list starts a new scope (for Source Maps).
        Arrow = 1 << 13,                // The list is a parameter list for an arrow function.
        Fragment = 1 << 14,             // The list is a fragment of the node. Line terminators should be based on the node array positions.
        PreferNewLine = 1 << 15,        // Prefer adding LineTerminators between synthesized nodes.

        // List formats
        Decorators = Indented | TrailingWhitespace | Fragment,
        TypeParameters = AngleBrackets | CommaDelimited | Indented | Optional | Fragment,
        Parameters = Parentheses | CommaDelimited | Indented | Fragment,
        ArrowParameters = Parameters | Arrow,
        IndexSignatureParameters = SquareBrackets | CommaDelimited | Indented | Fragment,
        TypeArguments = AngleBrackets | CommaDelimited | Indented | Optional | Fragment,
        TypeElements = CurlyBrackets | Indented | Whitespace | PreferNewLine,
        TupleTypeElementTypes = SquareBrackets | CommaDelimited | Indented,
        UnionTypeConstituents = BarDelimited | Indented,
        IntersectionTypeConstituents = AmpersandDelimited | Indented,
        ObjectBindingPatternElements = CurlyBrackets | CommaDelimited | AllowTrailingComma | Indented | LeadingWhitespace | TrailingWhitespace | PreferNewLine,
        ArrayBindingPatternElements = SquareBrackets | CommaDelimited | AllowTrailingComma | Indented,
        ArrayLiteralExpressionElements = SquareBrackets | CommaDelimited | AllowTrailingComma | Indented,
        ObjectLiteralExpressionProperties = CurlyBrackets | CommaDelimited | Indented | LeadingWhitespace | TrailingWhitespace | PreferNewLine,
        ObjectLiteralExpressionPropertiesForES5AndLater = ObjectLiteralExpressionProperties | AllowTrailingComma,
        CallExpressionArguments = Parentheses | CommaDelimited | Indented | Fragment,
        NewExpressionArguments = Parentheses | CommaDelimited | Indented | Optional | Fragment,
        TemplateExpressionTemplateSpans = Fragment,
        BlockStatements = CurlyBrackets | Indented | Whitespace | Scoped | PreferNewLine,
        VariableDeclarations = CommaDelimited | Indented,
        HeritageClauses = Indented | LeadingWhitespace | Fragment,
        ClassMembers = CurlyBrackets | Indented | Whitespace | Scoped | PreferNewLine,
        EnumMembers = CurlyBrackets | CommaDelimited | AllowTrailingComma | Indented | Scoped | Whitespace | PreferNewLine,
        ModuleBlockStatements = CurlyBrackets | Indented | Whitespace | Scoped | PreferNewLine,
        CaseBlockClauses = CurlyBrackets | Indented | Whitespace | Scoped | PreferNewLine,
        ImportOrExportSpecifiers = CurlyBrackets | CommaDelimited | AllowTrailingComma | Indented | Whitespace,
        CaseOrDefaultClauseStatements = Indented | Whitespace | PreferNewLine,
        JsxElementChildren = PreferNewLine,
        JsxAttributes = Fragment,
        HeritageClauseTypes = CommaDelimited | Indented,
        SourceFileStatements = PreferNewLine,
    }
}