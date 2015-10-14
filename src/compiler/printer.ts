/// <reference path="checker.ts"/>
/// <reference path="transform.ts" />
/// <reference path="declarationEmitter.ts"/>

/* @internal */
namespace ts {

    const enum ListFormat {
        None = 0,
        Comma = 1 << 0,
        Bar = 1 << 1,
        Ampersand = 1 << 2,
        AllowTrailingComma = 1 << 3,
        LeadingWhitespace = 1 << 4,
        TrailingWhitespace = 1 << 5,
        Indented = 1 << 6,

        Whitespace = LeadingWhitespace | TrailingWhitespace,
        ImportOrExportSpecifiers = Comma | AllowTrailingComma | Indented | Whitespace,
        TupleElementTypes = Comma | Indented,
        TypeElements = Indented | Whitespace,
        UnionTypeElements = Indented | Bar,
        IntersectionTypeElements = Indented | Ampersand,
        EnumMembers = Comma | AllowTrailingComma | Indented,
        VariableDeclarations = Comma | Indented,
        HeritageClauses = Comma | Indented,
        Decorators = Indented | TrailingWhitespace,
        ClassElements = Indented | Whitespace,
        HeritageClauseTypes = Comma | Indented,
        TypeArguments = Comma | Indented,
        TypeParameters = Comma | Indented,
        Parameters = Comma | Indented,
        BindingElements = Comma | AllowTrailingComma | Indented,
        Statements = None,
        BlockStatements = Indented | Whitespace,
        CaseClauses = Indented | Whitespace,
        CaseOrDefaultClauseStatements = Indented | Whitespace,
        Arguments = Comma | Indented,

        ArrayLiteralElements = Comma | Indented | AllowTrailingComma,

        ObjectLiteralProperties = Comma | Indented | Whitespace,
        ObjectLiteralPropertiesForES5AndLater = ObjectLiteralProperties | AllowTrailingComma,
    }

    export function printFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile): EmitResult {
        let compilerOptions = host.getCompilerOptions();
        let languageVersion = compilerOptions.target || ScriptTarget.ES3;
        let sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? [] : undefined;
        let diagnostics: Diagnostic[] = [];
        let newLine = host.getNewLine();

        // Sort and make the unique list of diagnostics
        diagnostics = sortAndDeduplicateDiagnostics(diagnostics);

        return {
            emitSkipped: false,
            diagnostics,
            sourceMaps: sourceMapDataList
        };

        function emitJavaScript(jsFilePath: string) {
            let writer = createTextWriter(newLine);
            let { write, writeTextOfNode, writeLine, increaseIndent, decreaseIndent } = writer;

            let currentSourceFile: SourceFile;

            /** Emit a node */
            let emit = emitNode;

            /** Called just before starting emit of a node */
            let emitStart = function (node: Node) { };

            /** Called once the emit of the node is done */
            let emitEnd = function (node: Node) { };

            let emitDetachedComments = function (node: Node) { };
            let emitLeadingComments = function (node: Node) { };
            let emitTrailingComments = function (node: Node) { };
            let emitTrailingCommentsOfPosition = function (pos: number) { };

            /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
              * @param scopeDeclaration node that starts the lexical scope
              * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
            let scopeEmitStart = function(scopeDeclaration: Node, scopeName?: string) { };

            /** Called after coming out of the scope */
            let scopeEmitEnd = function() { };

            /** Sourcemap data that will get encoded */
            let sourceMapData: SourceMapData;

            function emitNode(node: Node) {
                if (node) {
                    emitJavaScriptWorker(node);
                }
            }

            function emitJavaScriptWorker(node: Node) {
                switch (node.kind) {
                    // DONE
                    case SyntaxKind.SourceFile:
                        return emitSourceFileNode(<SourceFile>node);
                    case SyntaxKind.TypeParameter:
                        return emitTypeParameter(<TypeParameterDeclaration>node);
                    case SyntaxKind.TypeReference:
                        return emitTypeReference(<TypeReferenceNode>node);
                    case SyntaxKind.ExpressionWithTypeArguments:
                        return emitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);
                    case SyntaxKind.ArrayType:
                        return emitArrayType(<ArrayTypeNode>node);
                    case SyntaxKind.TupleType:
                        return emitTupleType(<TupleTypeNode>node);
                    case SyntaxKind.FunctionType:
                        return emitFunctionType(<FunctionTypeNode>node);
                    case SyntaxKind.ConstructorType:
                        return emitConstructorType(<ConstructorTypeNode>node);
                    case SyntaxKind.ParenthesizedType:
                        return emitParenthesizedType(<ParenthesizedTypeNode>node);
                    case SyntaxKind.UnionType:
                        return emitUnionType(<UnionTypeNode>node);
                    case SyntaxKind.IntersectionType:
                        return emitIntersectionType(<IntersectionTypeNode>node);
                    case SyntaxKind.TypePredicate:
                        return emitTypePredicate(<TypePredicateNode>node);
                    case SyntaxKind.TypeQuery:
                        return emitTypeQuery(<TypeQueryNode>node);
                    case SyntaxKind.TypeLiteral:
                        return emitTypeLiteral(<TypeLiteralNode>node);
                    case SyntaxKind.ConstructSignature:
                        return emitConstructSignature(<ConstructSignatureDeclaration>node);
                    case SyntaxKind.PropertySignature:
                        return emitPropertySignature(<PropertySignature>node);
                    case SyntaxKind.MethodSignature:
                        return emitMethodSignature(<MethodSignature>node);
                    case SyntaxKind.IndexSignature:
                        return emitIndexSignature(<IndexSignatureDeclaration>node);
                    case SyntaxKind.ImportDeclaration:
                        return emitImportDeclaration(<ImportDeclaration>node);
                    case SyntaxKind.ExportDeclaration:
                        return emitExportDeclaration(<ExportDeclaration>node);
                    case SyntaxKind.ImportClause:
                        return emitImportClause(<ImportClause>node);
                    case SyntaxKind.NamespaceImport:
                        return emitNamespaceImport(<NamespaceImport>node);
                    case SyntaxKind.NamedImports:
                    case SyntaxKind.NamedExports:
                        return emitNamedImportsOrExports(<NamedImportsOrExports>node);
                    case SyntaxKind.ImportSpecifier:
                    case SyntaxKind.ExportSpecifier:
                        return emitImportOrExportSpecifier(<ImportOrExportSpecifier>node);
                    case SyntaxKind.ImportEqualsDeclaration:
                        return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                    case SyntaxKind.ExternalModuleReference:
                        return emitExternalModuleReference(<ExternalModuleReference>node);
                    case SyntaxKind.ExportAssignment:
                        return emitExportAssignment(<ExportAssignment>node);
                    case SyntaxKind.ModuleDeclaration:
                        return emitModuleDeclaration(<ModuleDeclaration>node);
                    case SyntaxKind.EnumDeclaration:
                        return emitEnumDeclaration(<EnumDeclaration>node);
                    case SyntaxKind.EnumMember:
                        return emitEnumMember(<EnumMember>node);
                    case SyntaxKind.VariableStatement:
                        return emitVariableStatement(<VariableStatement>node);
                    case SyntaxKind.VariableDeclarationList:
                        return emitVariableDeclarationList(<VariableDeclarationList>node);
                    case SyntaxKind.VariableDeclaration:
                        return emitVariableDeclaration(<VariableDeclaration>node);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                        return emitFunctionDeclarationOrExpression(<FunctionDeclaration>node);
                    case SyntaxKind.Parameter:
                        return emitParameter(<ParameterDeclaration>node);
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                        return emitClassDeclarationOrExpression(<ClassDeclaration>node);
                    case SyntaxKind.HeritageClause:
                        return emitHeritageClause(<HeritageClause>node);
                    case SyntaxKind.Constructor:
                        return emitConstructor(<ConstructorDeclaration>node);
                    case SyntaxKind.PropertyDeclaration:
                        return emitPropertyDeclaration(<PropertyDeclaration>node);
                    case SyntaxKind.MethodDeclaration:
                        return emitMethodDeclaration(<MethodDeclaration>node);
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        return emitAccessorDeclaration(<AccessorDeclaration>node);
                    case SyntaxKind.InterfaceDeclaration:
                        return emitInterfaceDeclaration(<InterfaceDeclaration>node);
                    case SyntaxKind.TypeAliasDeclaration:
                        return emitTypeAliasDeclaration(<TypeAliasDeclaration>node);
                    case SyntaxKind.Block:
                    case SyntaxKind.ModuleBlock:
                        return emitBlock(<Block>node);
                    case SyntaxKind.TryStatement:
                        return emitTryStatement(<TryStatement>node);
                    case SyntaxKind.CatchClause:
                        return emitCatchClause(<CatchClause>node);
                    case SyntaxKind.SwitchStatement:
                        return emitSwitchStatement(<SwitchStatement>node);
                    case SyntaxKind.CaseClause:
                        return emitCaseClause(<CaseClause>node);
                    case SyntaxKind.DefaultClause:
                        return emitDefaultClause(<DefaultClause>node);
                    case SyntaxKind.WithStatement:
                        return emitWithStatement(<WithStatement>node);
                    case SyntaxKind.LabeledStatement:
                        return emitLabeledStatement(<LabeledStatement>node);
                    case SyntaxKind.IfStatement:
                        return emitIfStatement(<IfStatement>node);
                    case SyntaxKind.DoStatement:
                        return emitDoStatement(<DoStatement>node);
                    case SyntaxKind.WhileStatement:
                        return emitWhileStatement(<WhileStatement>node);
                    case SyntaxKind.ForStatement:
                        return emitForStatement(<ForStatement>node);
                    case SyntaxKind.ForOfStatement:
                        return emitForOfStatement(<ForOfStatement>node);
                    case SyntaxKind.ForInStatement:
                        return emitForInStatement(<ForInStatement>node);
                    case SyntaxKind.ReturnStatement:
                        return emitReturnStatement(<ReturnStatement>node);
                    case SyntaxKind.ThrowStatement:
                        return emitThrowStatement(<ThrowStatement>node);
                    case SyntaxKind.DebuggerStatement:
                        return emitDebuggerStatement(<DebuggerStatement>node);
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                        return emitBreakOrContinueStatement(<BreakStatement>node);
                    case SyntaxKind.EmptyStatement:
                        return write(";");
                    case SyntaxKind.ExpressionStatement:
                        return emitExpressionStatement(<ExpressionStatement>node);

                    // IN PROGRESS
                    case SyntaxKind.Identifier:
                        return emitIdentifier(<Identifier>node);
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.SuperKeyword:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.FalseKeyword:
                        return writeTokenNode(node);
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                    case SyntaxKind.TemplateHead:
                    case SyntaxKind.TemplateMiddle:
                    case SyntaxKind.TemplateTail:
                        return emitLiteral(<LiteralExpression>node);
                    case SyntaxKind.TemplateExpression:
                        return emitTemplateExpression(<TemplateExpression>node);
                    case SyntaxKind.TemplateSpan:
                        return emitTemplateSpan(<TemplateSpan>node);
                    // case SyntaxKind.JsxElement:
                    // case SyntaxKind.JsxSelfClosingElement:
                    //     return emitJsxElement(<JsxElement|JsxSelfClosingElement>node);
                    // case SyntaxKind.JsxText:
                    //     return emitJsxText(<JsxText>node);
                    // case SyntaxKind.JsxExpression:
                    //     return emitJsxExpression(<JsxExpression>node);
                    case SyntaxKind.QualifiedName:
                        return emitQualifiedName(<QualifiedName>node);
                    case SyntaxKind.ObjectBindingPattern:
                        return emitObjectBindingPattern(<BindingPattern>node);
                    case SyntaxKind.ArrayBindingPattern:
                        return emitArrayBindingPattern(<BindingPattern>node);
                    case SyntaxKind.BindingElement:
                        return emitBindingElement(<BindingElement>node);
                    case SyntaxKind.ArrayLiteralExpression:
                        return emitArrayLiteralExpression(<ArrayLiteralExpression>node);
                    case SyntaxKind.ObjectLiteralExpression:
                        return emitObjectLiteralExpression(<ObjectLiteralExpression>node);
                    case SyntaxKind.PropertyAssignment:
                        return emitPropertyAssignment(<PropertyAssignment>node);
                    case SyntaxKind.ShorthandPropertyAssignment:
                        return emitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
                    case SyntaxKind.ComputedPropertyName:
                        return emitComputedPropertyName(<ComputedPropertyName>node);
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
                        return emit((<TypeAssertion>node).expression);
                    case SyntaxKind.AsExpression:
                        return emit((<AsExpression>node).expression);
                    case SyntaxKind.ParenthesizedExpression:
                        return emitParenthesizedExpression(<ParenthesizedExpression>node);
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
                    case SyntaxKind.SpreadElementExpression:
                        return emitSpreadElementExpression(<SpreadElementExpression>node);
                    case SyntaxKind.YieldExpression:
                        return emitYieldExpression(<YieldExpression>node);
                    case SyntaxKind.OmittedExpression:
                        return;
                }
            }

            function emitSourceFileNode(node: SourceFile) {
                writeLine();
                emitShebang();
                emitDetachedComments(node);
                emitStatements(node, node.statements);
            }

            function emitShebang() {
                let shebang = getShebang(currentSourceFile.text);
                if (shebang) {
                    write(shebang);
                }
            }

            function emitStatements(parentNode: Node, statements: NodeArray<Statement>) {
                emitList(parentNode, statements, ListFormat.Statements);
            }

            function emitTypeParameters(parentNode: Node, typeParameters: NodeArray<TypeParameterDeclaration>) {
                if (typeParameters && typeParameters.length > 0) {
                    write("<");
                    emitList(parentNode, typeParameters, ListFormat.TypeParameters);
                    write(">");
                }
            }

            function emitTypeParameter(node: TypeParameterDeclaration) {
                emitStart(node);
                emit(node.name);
                emitOptional("extends ", node.constraint);
                emitEnd(node);
            }

            function emitTypeReference(node: TypeReferenceNode) {
                emitStart(node);
                emit(node.typeName);
                emitTypeArguments(node, node.typeArguments);
                emitEnd(node);
            }

            function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
                emitStart(node);
                emit(node.expression);
                emitTypeArguments(node, node.typeArguments);
                emitEnd(node);
            }

            function emitTypeArguments(parentNode: Node, typeArguments: NodeArray<TypeNode>) {
                if (typeArguments) {
                    write("<");
                    emitList(parentNode, typeArguments, ListFormat.TypeArguments)
                    write(">");
                }
            }

            function emitArrayType(node: ArrayTypeNode) {
                emitStart(node);
                emit(node.elementType);
                write("[]");
                emitEnd(node);
            }

            function emitTupleType(node: TupleTypeNode) {
                emitStart(node);
                emitTupleElementTypes(node, node.elementTypes);
                emitEnd(node);
            }

            function emitTupleElementTypes(parentNode: Node, elementTypes: NodeArray<TypeNode>) {
                write("[");
                emitList(parentNode, elementTypes, ListFormat.TupleElementTypes);
                write("]");
            }

            function emitTypeLiteral(node: TypeLiteralNode) {
                emitStart(node);
                emitTypeElements(node, node.members);
                emitEnd(node);
            }

            function emitTypeElements(parentNode: Node, members: NodeArray<TypeElement>) {
                write("{");
                emitList(parentNode, members, ListFormat.TypeElements);
                write("}");
            }

            function emitFunctionType(node: FunctionTypeNode) {
                emitStart(node);
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                write(" => ");
                emit(node.type);
                emitEnd(node);
            }

            function emitConstructorType(node: ConstructorTypeNode) {
                emitStart(node);
                write("new ");
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                write(" => ");
                emit(node.type);
                emitEnd(node);
            }

            function emitParametersForArrow(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                if (parameters.length === 1
                    && parameters[0].type === undefined
                    && parameters[0].pos === parentNode.pos) {
                    emit(parameters[0]);
                    return;
                }

                emitParameters(parentNode, parameters);
            }

            function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                write("(");
                emitList(parentNode, parameters, ListFormat.Parameters);
                write(")");
            }

            function emitParameter(node: ParameterDeclaration) {
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                if (node.dotDotDotToken) write("...");
                emit(node.name);
                if (node.questionToken) write("?");
                emitInitializer(node.initializer);
                emitTypeAnnotation(node.type);
                emitEnd(node);
            }

            function emitParenthesizedType(node: ParenthesizedTypeNode) {
                write("(");
                emit(node.type);
                write(")");
            }

            function emitUnionType(node: UnionTypeNode) {
                emitStart(node);
                emitUnionTypeElements(node, node.types);
                emitEnd(node);
            }

            function emitUnionTypeElements(parentNode: Node, types: NodeArray<TypeNode>) {
                emitList(parentNode, types, ListFormat.UnionTypeElements)
            }

            function emitIntersectionType(node: IntersectionTypeNode) {
                emitStart(node);
                emitIntersectionTypeElements(node, node.types);
                emitEnd(node);
            }

            function emitIntersectionTypeElements(parentNode: Node, types: NodeArray<TypeNode>) {
                emitList(parentNode, types, ListFormat.IntersectionTypeElements)
            }

            function emitTypePredicate(node: TypePredicateNode) {
                emitStart(node);
                emit(node.parameterName);
                write(" is ");
                emit(node.type);
                emitEnd(node);
            }

            function emitTypeQuery(node: TypeQueryNode) {
                emitStart(node);
                write("typeof ");
                emit(node.exprName);
                emitEnd(node);
            }

            function emitConstructSignature(node: ConstructSignatureDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("constructor");
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitPropertySignature(node: PropertySignature) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emit(node.name);
                if(node.questionToken) write("?");
                emitTypeAnnotation(node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitMethodSignature(node: MethodSignature) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emit(node.name);
                if (node.questionToken) write("?");
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitIndexSignature(node: IndexSignatureDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emitBracketedParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitBracketedParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                write("[");
                emitList(parentNode, parameters, ListFormat.Parameters);
                write("]");
            }

            function emitImportDeclaration(node: ImportDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node, node.modifiers);
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

            function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node, node.modifiers);
                write("import ");
                emit(node.name);
                write(" = ");
                emit(node.moduleReference);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitExternalModuleReference(node: ExternalModuleReference) {
                write("require(");
                emit(node.expression);
                write(")");
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

            function emitNamedImportsOrExports(node: NamedImportsOrExports) {
                emitStart(node);
                emitImportOrExportSpecifiers(node, node.elements);
                emitEnd(node);
            }

            function emitImportOrExportSpecifiers(parentNode: Node, elements: NodeArray<ImportOrExportSpecifier>) {
                write("{");
                emitList(parentNode, elements, ListFormat.ImportOrExportSpecifiers);
                write("}");
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

            function emitExportAssignment(node: ExportAssignment) {
                emitLeadingComments(node);
                emitStart(node);
                write(node.isExportEquals ? "export = " : "export default ");
                emit(node.expression);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitModuleDeclaration(node: ModuleDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node, node.modifiers);
                write(node.flags & NodeFlags.Namespace ? "namespace " : "module ");
                emit(node.name);

                let body = node.body;
                while (isModuleDeclaration(body)) {
                    write(".");
                    emit((<ModuleDeclaration>body).name);
                    body = <ModuleDeclaration>node.body;
                }

                emit(body);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitEnumDeclaration(node: EnumDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node, node.modifiers);
                write("enum ");
                emit(node.name);
                write(" ");
                emitEnumMembers(node, node.members);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitEnumMembers(parentNode: Node, members: NodeArray<EnumMember>) {
                write("{");
                scopeEmitStart(parentNode);
                emitList(parentNode, members, ListFormat.EnumMembers);
                scopeEmitEnd();
                write("}");
            }

            function emitEnumMember(node: EnumMember) {
                emitLeadingComments(node);
                emitStart(node);
                emit(node.name);
                emitInitializer(node.initializer);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitVariableStatement(node: VariableStatement) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node, node.modifiers);
                emit(node.declarationList);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitVariableDeclarationList(node: VariableDeclarationList) {
                write(isLet(node) ? "let " : isConst(node) ? "const " : "var ");
                emitList(node, node.declarations, ListFormat.VariableDeclarations);
            }

            function emitVariableDeclaration(node: VariableDeclaration) {
                emit(node.name);
                emitInitializer(node.initializer);
            }

            function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write(node.asteriskToken ? "function*" : "function");
                emitOptional(" ", node.name);
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                emitFunctionBody(node, node.body);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitClassDeclarationOrExpression(node: ClassDeclaration | ClassExpression) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("class");
                emitOptional(" ", node.name);
                emitTypeParameters(node, node.typeParameters);
                emitHeritageClauses(node, node.heritageClauses);
                write(" ");
                emitClassMembers(node, node.members);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitHeritageClauses(parentNode: Node, heritageClauses: NodeArray<HeritageClause>) {
                emitList(parentNode, heritageClauses, ListFormat.HeritageClauses);
            }

            function emitHeritageClause(node: HeritageClause) {
                write(" ");
                emitStart(node);
                writeToken(node.token);
                emitHeritageClauseTypes(node, node.types);
                emitEnd(node);
            }

            function emitHeritageClauseTypes(parentNode: Node, types: NodeArray<ExpressionWithTypeArguments>) {
                emitList(parentNode, types, ListFormat.HeritageClauseTypes)
            }

            function emitClassMembers(parentNode: Node, members: NodeArray<ClassElement>) {
                write("{");
                scopeEmitStart(parentNode);
                emitList(parentNode, members, ListFormat.ClassElements);
                scopeEmitEnd();
                write("}");
            }

            function emitConstructor(node: ConstructorDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node, node.modifiers);
                write("constructor");
                emitParameters(node, node.parameters);
                emitFunctionBody(node, node.body);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitPropertyDeclaration(node: PropertyDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emit(node.name);
                emitTypeAnnotation(node.type);
                emitInitializer(node.initializer);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitMethodDeclaration(node: MethodDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                if (node.asteriskToken) write("*");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                emitFunctionBody(node, node.body);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitAccessorDeclaration(node: AccessorDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write(node.kind === SyntaxKind.GetAccessor ? "get " : "set ");
                emit(node.name);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                emitFunctionBody(node, node.body);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitInterfaceDeclaration(node: InterfaceDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("interface ");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                emitHeritageClauses(node, node.heritageClauses);
                emitTypeElements(node, node.members);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("type ");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                write(" = ");
                emit(node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitBlock(node: Block) {
                emitLeadingComments(node);
                emitStart(node);
                emitBlockStatements(node, node.statements);
                emitEnd(node);
                emitTrailingComments(node);
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

            function emitCatchClause(node: CatchClause) {
                writeLine();
                write("catch (");
                emit(node.variableDeclaration);
                write(") ");
                emit(node.block);
            }

            function emitSwitchStatement(node: SwitchStatement) {
                write("switch (");
                emit(node.expression);
                write(") ");
                emit(node.caseBlock);
            }

            function emitCaseBlock(node: CaseBlock) {
                emitCaseClauses(node, node.clauses);
            }

            function emitCaseClauses(parentNode: Node, clauses: NodeArray<CaseOrDefaultClause>) {
                write("{");
                scopeEmitStart(parentNode);
                emitList(parentNode, clauses, ListFormat.CaseClauses)
                scopeEmitEnd();
                write("}");
            }

            function emitCaseClause(node: CaseClause) {
                write("case ");
                emit(node.expression);
                write(":");
                emitCaseOrDefaultClauseStatements(node, node.statements);
            }

            function emitDefaultClause(node: DefaultClause) {
                emitStart(node);
                write("default:");
                emitCaseOrDefaultClauseStatements(node, node.statements);
                emitEnd(node);
            }

            function emitCaseOrDefaultClauseStatements(parentNode: Node, statements: NodeArray<Statement>) {
                emitList(parentNode, statements, ListFormat.CaseOrDefaultClauseStatements)
            }

            function emitWithStatement(node: WithStatement) {
                write("with (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitLabeledStatement(node: LabeledStatement) {
                emit(node.label);
                write(":");
                emitEmbeddedStatement(node.statement);
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
                emitOptional(" ", node.condition);
                write(";");
                emitOptional(" ", node.incrementor);
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

            function emitBreakOrContinueStatement(node: BreakOrContinueStatement) {
                write(isBreakStatement(node) ? "break" : "continue");
                emitOptional(" ", node.label);
                write(";");
            }

            function emitReturnStatement(node: ReturnStatement) {
                write("return");
                emitOptional(" ", node.expression);
                write(";");
            }

            function emitThrowStatement(node: ThrowStatement) {
                write("throw");
                emitOptional(" ", node.expression);
                write(";");
            }

            function emitDebuggerStatement(node: DebuggerStatement) {
                write("debugger;");
            }

            function emitExpressionStatement(node: ExpressionStatement) {
                emit(node.expression);
                write(";");
            }

            function emitParenthesizedExpression(node: ParenthesizedExpression) {
                write("(");
                emit(node.expression);
                write(")");
            }

            function emitTypeAssertion(node: TypeAssertion) {
                write("<");
                emit(node.type);
                write(">");
                emit(node.expression);
            }

            function emitAsExpression(node: AsExpression) {
                emit(node.expression);
                write(" as ");
                emit(node.type);
            }

            function emitYieldExpression(node: YieldExpression) {
                write(node.asteriskToken ? "yield*" : "yield");
                emitOptional(" ", node.expression);
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

            function emitBinaryExpression(node: BinaryExpression) {
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

            function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
                writeToken(node.operator);
                if (shouldEmitWhitespaceBeforeOperand(node)) write(" ");
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

            function emitSpreadElementExpression(node: SpreadElementExpression) {
                write("...");
                emit(node.expression);
            }

            function emitArrayLiteralExpression(node: ArrayLiteralExpression) {
                write("[");
                emitArrayLiteralElements(node, node.elements);
                write("]");
            }

            function emitArrayLiteralElements(parentNode: Node, elements: NodeArray<Expression>) {
                emitList(parentNode, elements, ListFormat.ArrayLiteralElements);
            }

            function emitObjectLiteralExpression(node: ObjectLiteralExpression) {
                write("{");
                emitObjectLiteralProperties(node, node.properties);
                write("}");
            }

            function emitObjectLiteralProperties(parentNode: Node, properties: NodeArray<ObjectLiteralElement>) {
                let listFormat = languageVersion >= ScriptTarget.ES5
                    ? ListFormat.ObjectLiteralPropertiesForES5AndLater
                    : ListFormat.ObjectLiteralProperties;
                emitList(parentNode, properties, listFormat);
            }

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

            function emitComputedPropertyName(node: ComputedPropertyName) {
                write("[");
                emit(node.expression);
                write("]");
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
                    let text = getTextOfNode(expression);
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
                emitArguments(node, node.arguments);
            }

            function emitNewExpression(node: NewExpression) {
                write("new ");
                emit(node.expression);
                if (node.arguments) {
                    emitArguments(node, node.arguments);
                }
            }

            function emitArguments(parentNode: Node, _arguments: NodeArray<Expression>) {
                write("(");
                emitList(parentNode, _arguments, ListFormat.Arguments);
                write(")");
            }

            function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
                emit(node.tag);
                emit(node.template);
            }

            function emitArrowFunction(node: ArrowFunction) {
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                emitTypeAnnotation(node.type);
                emitConciseBody(node, node.body);
                emitEnd(node);
            }

            function writeToken(token: SyntaxKind) {
                write(tokenToString(token));
            }

            function writeTokenNode(node: Node) {
                if (node) {
                    writeToken(node.kind);
                }
            }

            function emitIdentifier(node: Identifier) {
                // TODO
                write(getTextOfNode(node));
            }

            function emitLiteral(node: LiteralExpression) {
                // TODO
                write(getTextOfNode(node));
            }

            function emitDecorators(parentNode: Node, decorators: NodeArray<Decorator>) {
                emitList(parentNode, decorators, ListFormat.Decorators);
            }

            function emitDecorator(decorator: Decorator) {
                emitLeadingComments(decorator);
                emitStart(decorator);
                write("@");
                emit(decorator.expression);
                emitEnd(decorator);
                emitTrailingComments(decorator);
            }

            function emitModifiers(node: Node, modifiers: ModifiersArray) {
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

            function emitInitializer(initializer: Expression) {
                if (initializer) {
                    write(" = ");
                    emit(initializer);
                }
            }

            function emitTypeAnnotation(type: TypeNode) {
                if (type) {
                    write(": ");
                    emit(type);
                }
            }

            function emitFunctionBody(parentNode: Node, body: FunctionBody) {
                if (!body) {
                    write(";");
                    return;
                }

                emit(body);
            }

            function emitConciseBody(parentNode: Node, body: ConciseBody) {
                emit(body);
            }

            function emitBlockStatements(parentNode: Node, statements: NodeArray<Statement>) {
                write("{");
                scopeEmitStart(parentNode);
                emitList(parentNode, statements, ListFormat.BlockStatements);
                scopeEmitEnd();
                write("}");
            }

            function emitTemplateExpression(node: TemplateExpression) {
                emit(node.head);
                emitTemplateSpans(node.templateSpans);
            }

            function emitTemplateSpans(templateSpans: NodeArray<TemplateSpan>) {
                for (let node of templateSpans) {
                    emit(node);
                }
            }

            function emitTemplateSpan(node: TemplateSpan) {
                emit(node.expression);
                emit(node.literal);
            }

            function emitQualifiedName(node: QualifiedName) {
                emit(node.left);
                write(".");
                emit(node.right);
            }

            function emitObjectBindingPattern(node: ObjectBindingPattern) {
                write("{");
                emitList(node, node.elements, ListFormat.BindingElements | ListFormat.Whitespace);
                write("}");
            }

            function emitArrayBindingPattern(node: ArrayBindingPattern) {
                write("[");
                emitList(node, node.elements, ListFormat.BindingElements);
                write("]");
            }

            function emitBindingElement(node: BindingElement) {
                if (node.propertyName) {
                    emit(node.propertyName);
                    write(": ");
                }

                if (node.dotDotDotToken) write("...");
                emit(node.name);
                emitInitializer(node.initializer);
            }

            function emitOptional(prefix: string, node: Node) {
                if (node) {
                    write(prefix);
                    emit(node);
                }
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

            function emitList(parentNode: Node, children: NodeArray<Node>, format?: ListFormat) {
                if (children) {
                    let previousSibling: Node;
                    let firstChild = firstOrUndefined(children);
                    let lastChild = lastOrUndefined(children);
                    let hasTrailingComma = (format & ListFormat.AllowTrailingComma) && children.hasTrailingComma;
                    let separator = format & ListFormat.Comma ? "," : format & ListFormat.Bar ? "|" : format & ListFormat.Ampersand ? "&" : undefined;

                    if (shouldEmitOpeningLineTerminator(parentNode, firstChild)) {
                        writeLine();
                    }
                    else if (format & ListFormat.LeadingWhitespace) {
                        write(" ");
                    }

                    if (format & ListFormat.Indented) {
                        increaseIndent();
                    }

                    for (let child of children) {
                        if (child) {
                            if (shouldEmitSeparatingLineTerminator(previousSibling, child)) {
                                if (separator) {
                                    write(separator);
                                }

                                writeLine();
                            }
                            else if (previousSibling) {
                                if (separator) {
                                    write(separator);
                                }

                                write(" ");
                            }

                            emit(child);
                            previousSibling = child;
                        }
                    }

                    if (hasTrailingComma) {
                        write(",");
                    }

                    if (format & ListFormat.Indented) {
                        decreaseIndent();
                    }

                    if (shouldEmitClosingLineTerminator(parentNode, lastChild)) {
                        writeLine();
                    }
                    else if (format & ListFormat.TrailingWhitespace && (previousSibling || hasTrailingComma)) {
                        write(" ");
                    }
                }
            }

            function shouldEmitOpeningLineTerminator(parentNode: Node, firstChild: Node) {
                if (firstChild === undefined) {
                    return false;
                }
                else if (nodeIsSynthesized(parentNode)) {
                    return synthesizedNodeStartsOnNewLine(firstChild);
                }
                else if (nodeIsSynthesized(firstChild)) {
                    return (<SynthesizedNode>firstChild).startsOnNewLine;
                }
                else {
                    return !nodeStartPositionsAreOnSameLine(parentNode, firstChild);
                }
            }

            function shouldEmitSeparatingLineTerminator(previousNode: Node, nextNode: Node) {
                if (previousNode === undefined || nextNode === undefined) {
                    return false;
                }
                else if (nodeIsSynthesized(previousNode) || nodeIsSynthesized(nextNode)) {
                    return synthesizedNodeStartsOnNewLine(previousNode) || synthesizedNodeStartsOnNewLine(nextNode);
                }
                else {
                    return !nodeEndIsOnSameLineAsNodeStart(previousNode, nextNode);
                }
            }

            function shouldEmitClosingLineTerminator(parentNode: Node, lastChild: Node) {
                if (lastChild === undefined) {
                    return false;
                }
                else if (nodeIsSynthesized(parentNode)) {
                    return synthesizedNodeStartsOnNewLine(lastChild);
                }
                else if (nodeIsSynthesized(lastChild)) {
                    return (<SynthesizedNode>lastChild).startsOnNewLine;
                }
                else {
                    return !nodeEndPositionsAreOnSameLine(parentNode, lastChild);
                }
            }

            function synthesizedNodeStartsOnNewLine(node: Node) {
                return nodeIsSynthesized(node) && (<SynthesizedNode>node).startsOnNewLine;
            }

            function nodeStartPositionsAreOnSameLine(node1: Node, node2: Node) {
                return getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, node1.pos)) ===
                    getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, node2.pos));
            }

            function nodeEndPositionsAreOnSameLine(node1: Node, node2: Node) {
                return getLineOfLocalPosition(currentSourceFile, node1.end) ===
                    getLineOfLocalPosition(currentSourceFile, node2.end);
            }

            function nodeEndIsOnSameLineAsNodeStart(node1: Node, node2: Node) {
                return getLineOfLocalPosition(currentSourceFile, node1.end) ===
                    getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, node2.pos));
            }

            // Returns 'true' if the code needs to be indented, false otherwise.
            function needsIndentation(parent: Node, node1: Node, node2: Node): boolean {
                let realNodesAreOnDifferentLines = !nodeIsSynthesized(parent) && !nodeEndIsOnSameLineAsNodeStart(node1, node2);

                // Always use a newline for synthesized code if the synthesizer desires it.
                let synthesizedNodeIsOnDifferentLine = synthesizedNodeStartsOnNewLine(node2);

                return realNodesAreOnDifferentLines || synthesizedNodeIsOnDifferentLine;
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

            function getTextOfNode(node: Node, includeTrivia?: boolean) {
                if (nodeIsSynthesized(node) && (isLiteralExpression(node) || isIdentifier(node))) {
                    return node.text;
                }

                return getSourceTextOfNodeFromSourceFile(currentSourceFile, node, includeTrivia);
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

            function tryGetConstEnumValue(node: Node): number {
                if (compilerOptions.isolatedModules) {
                    return undefined;
                }

                return isPropertyAccessExpression(node) || isElementAccessExpression(node)
                    ? resolver.getConstantValue(<PropertyAccessExpression | ElementAccessExpression>node)
                    : undefined;
            }
        }
    }
}