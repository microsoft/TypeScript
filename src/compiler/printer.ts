/// <reference path="checker.ts"/>
/// <reference path="transform.ts" />
/// <reference path="declarationEmitter.ts"/>

/* @internal */
namespace ts {
    const delimiters = createDelimiterMap();

    export function printFiles(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformations?: TransformationChain) {
        // emit output for the __extends helper function
        const extendsHelper = `
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};`;

        // emit output for the __decorate helper function
        const decorateHelper = `
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};`;

        // emit output for the __metadata helper function
        const metadataHelper = `
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};`;

        // emit output for the __param helper function
        const paramHelper = `
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};`;

        // emit output for the __awaiter helper function
        const awaiterHelper = `
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.apply(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};`;

        // emit output for the __export helper function
        const exportStarHelper = `
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}`;

        // emit output for the UMD helper function.
        const umdHelper = `(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})`;

        let writer = createTextWriter(host.getNewLine());
        let {
            write,
            writeTextOfNode,
            writeLine,
            getIndent,
            increaseIndent,
            decreaseIndent
        } = writer;

        // Add the pretty printer to the transformation chain.
        transformations = transformations ? chainTransformationPhases([transformations, createPrinter]) : createPrinter;

        // Transform each file and print it to the writer.
        transformFiles(resolver, host, sourceFiles, transformations);

        writeLine();
        return writer.getText();

        function createPrinter(transformer: Transformer) {
            let {
                startLexicalEnvironment,
                endLexicalEnvironment,
                getGeneratedNodeFlags,
                mapNode,
                tryPushNode,
                setNode,
                popNode,
                getParentNode,
            } = transformer;

            let expressionSubstitution = transformer.getExpressionSubstitution();
            let bindingIdentifierSubstution = transformer.getBindingIdentifierSubstitution();
            let compilerOptions = host.getCompilerOptions();
            let languageVersion = getLanguageVersion(compilerOptions);
            let moduleKind = getModuleKind(compilerOptions);
            let diagnostics: Diagnostic[] = [];
            let currentSourceFile: SourceFile;
            let helpersEmitted: NodeCheckFlags;
            let tempFlags: TempFlags;
            let temporaryVariables: string[] = [];

            /** Emit a node */
            let emit = emitNode;

            let emitDetachedComments = function (node: TextRange) { };
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

            if (compilerOptions.sourceMap || compilerOptions.inlineSourceMap) {
                // initializeEmitterWithSourceMaps();
            }

            return printSourceFile;

            function printSourceFile(node: SourceFile) {
                emitNode(node);
                return node;
            }

            function emitNode(node: Node) {
                if (node) {
                    let wasPushed = tryPushNode(node);
                    emitNodeWorker(node);
                    if (wasPushed) {
                        popNode();
                    }
                }
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
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.VoidKeyword:
                        return writeTokenNode(node);

                    case SyntaxKind.ThisKeyword:
                        return emitThisKeyword(<PrimaryExpression>node);

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
                if (node.text === undefined) {
                    node.text
                }
                if (isExpressionIdentifier(node)) {
                    emitExpressionIdentifier(node);
                }
                else if (tryEmitSubstitute(node, bindingIdentifierSubstution)) {
                    return;
                }
                else if (nodeIsSynthesized(node)) {
                    writeSynthesizedIdentifier(node);
                }
                else {
                    writeTextOfNode(currentSourceFile, node);
                }
            }

            function isExpressionIdentifier(node: Node): boolean {
                let parentNode = getParentNode();
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
                if (tryEmitSubstitute(node, expressionSubstitution)) {
                    return;
                }
                else if (nodeIsSynthesized(node)) {
                    if (getGeneratedNodeFlags(node) & GeneratedNodeFlags.UMDDefine) {
                        writeLines(umdHelper);
                    }
                    else {
                        writeSynthesizedIdentifier(node);
                    }
                }
                else {
                    writeTextOfNode(currentSourceFile, node);
                }
            }

            function writeSynthesizedIdentifier(node: Identifier) {
                let text = node.text || temporaryVariables[getOriginalNodeId(node)];
                if (text === undefined) {
                    text = temporaryVariables[getOriginalNodeId(node)] = makeTempVariableName(node.tempFlags);
                }

                write(text);
            }

            function emitThisKeyword(node: PrimaryExpression) {
                if (tryEmitSubstitute(node, expressionSubstitution)) {
                    return;
                }
                else {
                    writeTokenNode(node);
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
                emitDecorators(node, node.decorators);
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
                emitDecorators(node, node.decorators);
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
                emitDecorators(node, node.decorators);
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
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                emit(node.name);
                writeIfPresent(node.questionToken, "?");
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitMethodDeclaration(node: MethodDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                writeIfPresent(node.asteriskToken, "*");
                emit(node.name);
                emitSignatureAndBody(node);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitConstructor(node: ConstructorDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitModifiers(node);
                write("constructor");
                emitParameters(node, node.parameters);
                emitFunctionBody(node, node.body);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitAccessorDeclaration(node: AccessorDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                write(node.kind === SyntaxKind.GetAccessor ? "get " : "set ");
                emit(node.name);
                emitSignatureAndBody(node);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitCallSignature(node: CallSignatureDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitConstructSignature(node: ConstructSignatureDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                write("new ");
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitIndexSignature(node: IndexSignatureDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                emitParametersForIndexSignature(node, node.parameters);
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
                emitTypeArguments(node, node.typeArguments);
                emitEnd(node);
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

            function emitTypeQuery(node: TypeQueryNode) {
                emitStart(node);
                write("typeof ");
                emit(node.exprName);
                emitEnd(node);
            }

            function emitTypeLiteral(node: TypeLiteralNode) {
                emitStart(node);
                write("{");
                emitList(node, node.members, ListFormat.MultiLine | ListFormat.Indented);
                write("}");
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
                write("[");
                emitList(node, node.elementTypes, ListFormat.CommaDelimited | ListFormat.SingleLine | ListFormat.Indented);
                write("]");
                emitEnd(node);
            }

            function emitUnionType(node: UnionTypeNode) {
                emitStart(node);
                emitList(node, node.types, ListFormat.BarDelimited | ListFormat.SingleLine)
                emitEnd(node);
            }

            function emitIntersectionType(node: IntersectionTypeNode) {
                emitStart(node);
                emitList(node, node.types, ListFormat.AmpersandDelimited | ListFormat.SingleLine);
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
                let elements = node.elements;
                if (elements.length === 0) {
                    write("{}");
                }
                else {
                    write("{");
                    emitList(node, elements, ListFormat.SingleLine | ListFormat.AllowTrailingComma | ListFormat.SpaceBetweenBraces);
                    write("}");
                }
            }

            function emitArrayBindingPattern(node: ArrayBindingPattern) {
                let elements = node.elements;
                if (elements.length === 0) {
                    write("[]");
                }
                else {
                    write("[");
                    emitList(node, node.elements, ListFormat.SingleLine | ListFormat.AllowTrailingComma);
                    write("]");
                }
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
                let elements = node.elements;
                if (elements.length === 0) {
                    write("[]");
                }
                else {
                    const preferNewLine = node.flags & NodeFlags.MultiLine ? ListFormat.PreferNewLine : ListFormat.None;
                    write("[");
                    emitList(node, elements, ListFormat.PreserveLines | ListFormat.CommaDelimited | ListFormat.AllowTrailingComma | ListFormat.Indented | preferNewLine);
                    write("]");
                }
            }

            function emitObjectLiteralExpression(node: ObjectLiteralExpression) {
                let properties = node.properties;
                if (properties.length === 0) {
                    write("{}");
                }
                else {
                    const preferNewLine = node.flags & NodeFlags.MultiLine ? ListFormat.PreferNewLine : ListFormat.None;
                    const allowTrailingComma = languageVersion >= ScriptTarget.ES5 ? ListFormat.AllowTrailingComma : ListFormat.None;
                    write("{");
                    emitList(node, properties, ListFormat.PreserveLines | ListFormat.CommaDelimited | ListFormat.SpaceBetweenBraces | ListFormat.Indented | allowTrailingComma | preferNewLine);
                    write("}");
                }
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
                write("(");
                emitList(node, node.arguments, ListFormat.CommaDelimited | ListFormat.SingleLine);
                write(")");
            }

            function emitNewExpression(node: NewExpression) {
                write("new ");
                emit(node.expression);
                if (node.arguments) {
                    write("(");
                    emitList(node, node.arguments, ListFormat.CommaDelimited | ListFormat.SingleLine);
                    write(")");
                }
            }

            function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
                emit(node.tag);
                emit(node.template);
            }

            function emitTypeAssertionExpression(node: TypeAssertion) {
                if (node.type) {
                    write("<");
                    emit(node.type);
                    write(">");
                }

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
                let savedTempFlags = tempFlags;
                tempFlags = 0;
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(" =>");
                emitConciseBody(node, node.body);
                emitEnd(node);
                tempFlags = savedTempFlags;
            }

            function emitConciseBody(parentNode: Node, body: ConciseBody) {
                if (isBlock(body)) {
                    let wasPushed = tryPushNode(body);
                    emitBlockFunctionBody(parentNode, body);
                    if (wasPushed) {
                        popNode();
                    }
                }
                else {
                    write(" ");
                    emit(body);
                }
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
                if (tryEmitSubstitute(node, expressionSubstitution)) {
                    return;
                }

                emit(node.operand);
                writeToken(node.operator);
            }

            function emitBinaryExpression(node: BinaryExpression) {
                if (tryEmitSubstitute(node, expressionSubstitution)) {
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
                increaseIndentIf(indentAfterColon, " ");
                emit(node.whenFalse);
                decreaseIndentIf(indentBeforeColon, indentAfterColon);
            }

            function emitTemplateExpression(node: TemplateExpression) {
                emit(node.head);
                emitList(node, node.templateSpans, ListFormat.SingleLine);
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
                emitTypeArguments(node, node.typeArguments);
                emitEnd(node);
            }

            function emitAsExpression(node: AsExpression) {
                emit(node.expression);
                if (node.type) {
                    write(" as ");
                    emit(node.type);
                }
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

            function emitBlock(node: Block, format?: ListFormat) {
                if (isSingleLineEmptyBlock(node)) {
                    write("{ }");
                }
                else {
                    emitStart(node);
                    write("{");
                    scopeEmitStart(getParentNode());
                    if (node.flags & NodeFlags.SingleLine) {
                        emitList(node, node.statements, addHelpers(node, ListFormat.SpaceBetweenBraces | ListFormat.SingleLine | format));
                    }
                    else {
                        emitList(node, node.statements, addHelpers(node, ListFormat.Indented | ListFormat.MultiLine | format));
                    }

                    scopeEmitEnd();
                    write("}");
                    emitEnd(node);
                }
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
                    if (isIfStatement(node.elseStatement)) {
                        write(" ");
                        emit(node.elseStatement);
                    }
                    else {
                        emitEmbeddedStatement(node.elseStatement);
                    }
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
                write(": ");
                emit(node.statement);
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
                emitList(node, node.declarations, ListFormat.CommaDelimited | ListFormat.SingleLine);
            }

            function emitFunctionDeclaration(node: FunctionDeclaration) {
                emitFunctionDeclarationOrExpression(node);
            }

            function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                write(node.asteriskToken ? "function* " : "function ");
                emit(node.name);
                emitSignatureAndBody(node);
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitSignatureAndBody(node: FunctionDeclaration | FunctionExpression | MethodDeclaration | AccessorDeclaration) {
                let savedTempFlags = tempFlags;
                tempFlags = 0;

                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                emitFunctionBody(node, node.body);

                tempFlags = savedTempFlags;
            }

            function emitFunctionBody(parentNode: Node, body: FunctionBody) {
                if (body) {
                    let wasPushed = tryPushNode(body);
                    emitBlockFunctionBody(parentNode, body);
                    if (wasPushed) {
                        popNode();
                    }
                }
                else {
                    write(";");
                }
            }

            function shouldEmitBlockFunctionBodyOnSingleLine(parentNode: Node, body: Block) {
                let originalNode = getOriginalNode(parentNode);
                if (isFunctionLike(originalNode) && !nodeIsSynthesized(originalNode) && rangeEndIsOnSameLineAsRangeStart(originalNode.body, originalNode.body)) {
                    for (let statement of body.statements) {
                        if (synthesizedNodeStartsOnNewLine(statement)) {
                            return false;
                        }
                    }

                    if (isArrowFunction(originalNode) && !rangeEndIsOnSameLineAsRangeStart(originalNode.equalsGreaterThanToken, originalNode.body)) {
                        return false;
                    }

                    return true;
                }

                return false;
            }

            function emitBlockFunctionBody(parentNode: Node, body: Block) {
                let statements = body.statements;
                write(" {");
                scopeEmitStart(parentNode);

                // Emit all the prologue directives (like "use strict").
                increaseIndent();
                let statementOffset = emitPrologueDirectives(statements, /*startWithNewLine*/ true);
                decreaseIndent();

                if (statementOffset === 0 && shouldEmitBlockFunctionBodyOnSingleLine(parentNode, body)) {
                    emitList(body, statements, addHelpers(body, ListFormat.SingleLine | ListFormat.SpaceBetweenBraces | ListFormat.LexicalEnvironment));
                }
                else {
                    emitList(body, statements, addHelpers(body, ListFormat.MultiLine | ListFormat.Indented | ListFormat.LexicalEnvironment), statementOffset);
                }

                scopeEmitEnd();
                write("}");
            }

            function emitClassDeclaration(node: ClassDeclaration) {
                emitClassDeclarationOrExpression(node);
            }

            function emitClassDeclarationOrExpression(node: ClassDeclaration | ClassExpression) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                write("class");
                emitWithPrefix(" ", node.name);
                emitTypeParameters(node, node.typeParameters);
                emitList(node, node.heritageClauses, ListFormat.SingleLine);

                let savedTempFlags = tempFlags;
                tempFlags = 0;

                write(" {");
                scopeEmitStart(node);
                emitList(node, node.members, ListFormat.Indented | ListFormat.MultiLine);
                scopeEmitEnd();
                write("}");

                tempFlags = savedTempFlags;

                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitInterfaceDeclaration(node: InterfaceDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                write("interface ");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                emitList(node, node.heritageClauses, ListFormat.SingleLine);
                write(" {");
                emitList(node, node.members, ListFormat.Indented | ListFormat.MultiLine);
                write("}");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
                emitLeadingComments(node);
                emitStart(node);
                emitDecorators(node, node.decorators);
                emitModifiers(node);
                write("type ");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
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

                let savedTempFlags = tempFlags;
                tempFlags = 0;

                write(" {");
                emitList(node, node.members, ListFormat.CommaDelimited | ListFormat.Indented | ListFormat.MultiLine);
                write("}");

                tempFlags = savedTempFlags;

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
                let savedTempFlags = tempFlags;
                tempFlags = 0;

                emitBlock(node, ListFormat.LexicalEnvironment);

                tempFlags = savedTempFlags;
            }

            function emitCaseBlock(node: CaseBlock) {
                write("{");
                emitList(node, node.clauses, ListFormat.Indented | ListFormat.MultiLine);
                write("}");
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
                write("{ ");
                emitList(node, node.elements, ListFormat.CommaDelimited | ListFormat.AllowTrailingComma | ListFormat.SingleLine);
                write(" }");
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
                emitList(node, node.children, ListFormat.SingleLine);
                emit(node.closingElement);
            }

            function emitJsxSelfClosingElement(node: JsxSelfClosingElement) {
                write("<");
                emit(node.tagName);
                write(" ");
                emitList(node, node.attributes, ListFormat.SingleLine);
                write("/>");
            }

            function emitJsxOpeningElement(node: JsxOpeningElement) {
                write("<");
                emit(node.tagName);
                writeIfAny(node.attributes, " ");
                emitList(node, node.attributes, ListFormat.SingleLine);
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
                emitCaseOrDefaultClauseStatements(node, node.statements);
            }

            function emitDefaultClause(node: DefaultClause) {
                write("default:");
                emitCaseOrDefaultClauseStatements(node, node.statements);
            }

            function emitCaseOrDefaultClauseStatements(parentNode: Node, statements: NodeArray<Statement>) {
                if (statements.length === 1 && rangeStartPositionsAreOnSameLine(parentNode, statements[0])) {
                    write(" ");
                    emit(statements[0]);
                }
                else {
                    emitList(parentNode, statements, ListFormat.Indented | ListFormat.MultiLine);
                }
            }

            function emitHeritageClause(node: HeritageClause) {
                emitStart(node);
                writeToken(node.token);
                write(" ");
                emitList(node, node.types, ListFormat.CommaDelimited | ListFormat.SingleLine);
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
                let savedTempFlags = tempFlags;
                tempFlags = 0;
                currentSourceFile = node;

                writeLine();
                emitShebang();
                emitDetachedComments(node);

                let statements = node.statements;
                let statementOffset = emitPrologueDirectives(statements);
                emitList(node, statements, addHelpers(node, ListFormat.MultiLine), statementOffset);

                currentSourceFile = undefined;
                tempFlags = savedTempFlags;
            }

            function emitLexicalEnvironmentOnNewLine(node: Statement) {
                emitLexicalEnvironment(node, /*newLine*/ true);
            }

            function emitLexicalEnvironment(node: Statement, newLine?: boolean) {
                if (newLine) {
                    writeLine();
                }
                else {
                    write(" ");
                }

                emit(node);
            }

            function emitPrologueDirectives(statements: Node[], startWithNewLine?: boolean) {
                for (let i = 0; i < statements.length; i++) {
                    if (isPrologueDirective(statements[i])) {
                        if (startWithNewLine || i > 0) {
                            writeLine();
                        }
                        emit(statements[i]);
                    }
                    else {
                        // return index of the first non prologue directive
                        return i;
                    }
                }

                return statements.length;
            }

            function emitEmitHelpers(node: SourceFile) {
                let flags = resolver.getNodeCheckFlags(node);

                // Only emit helpers if the user did not say otherwise.
                let previousHelpersEmitted = helpersEmitted;
                if (!compilerOptions.noEmitHelpers) {
                    if (shouldEmitHelper(NodeCheckFlags.EmitExtends, flags) && languageVersion < ScriptTarget.ES6) {
                        writeLines(extendsHelper);
                        helpersEmitted |= NodeCheckFlags.EmitExtends;
                    }

                    if (shouldEmitHelper(NodeCheckFlags.EmitDecorate, flags)) {
                        writeLines(decorateHelper);
                        if (compilerOptions.emitDecoratorMetadata) {
                            writeLines(metadataHelper);
                        }

                        helpersEmitted |= NodeCheckFlags.EmitDecorate;
                    }

                    if (shouldEmitHelper(NodeCheckFlags.EmitParam, flags)) {
                        writeLines(paramHelper);
                        helpersEmitted |= NodeCheckFlags.EmitParam;
                    }

                    if (shouldEmitHelper(NodeCheckFlags.EmitAwaiter, flags)) {
                        writeLines(awaiterHelper);
                        helpersEmitted |= NodeCheckFlags.EmitAwaiter;
                    }

                    if (helpersEmitted !== previousHelpersEmitted) {
                        writeLine();
                    }
                }
            }

            function emitExportStar() {
                writeLines(exportStarHelper);
            }

            function shouldEmitHelper(helper: NodeCheckFlags, requestedHelpers: NodeCheckFlags) {
                return (requestedHelpers & helper) !== 0
                    && !(helpersEmitted && helper);
            }

            function writeLines(text: string): void {
                let lines = text.split(/\r\n|\r|\n/g);
                for (let i = 0; i < lines.length; ++i) {
                    let line = lines[i];
                    if (line.length) {
                        if (i > 0) {
                            writeLine();
                        }
                        write(line);
                    }
                }
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

            function tryEmitSubstitute(node: Node, substitution: (node: Node) => Node) {
                let substitute = substitution ? substitution(node) : node;
                if (substitute && substitute !== node) {
                    setNode(substitute);
                    emitNodeWorker(substitute);
                    setNode(node);
                    return true;
                }

                return false;
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

            function emitDecorators(parentNode: Node, decorators: NodeArray<Decorator>) {
                if (decorators && decorators.length) {
                    emitList(parentNode, decorators, ListFormat.MultiLine);
                }
            }

            function emitTypeArguments(parentNode: Node, typeArguments: NodeArray<TypeNode>) {
                if (typeArguments && typeArguments.length > 0) {
                    write("<");
                    emitList(parentNode, typeArguments, ListFormat.CommaDelimited | ListFormat.SingleLine | ListFormat.Indented)
                    write(">");
                }
            }

            function emitTypeParameters(parentNode: Node, typeParameters: NodeArray<TypeParameterDeclaration>) {
                if (typeParameters && typeParameters.length > 0) {
                    write("<");
                    emitList(parentNode, typeParameters, ListFormat.CommaDelimited | ListFormat.SingleLine | ListFormat.Indented)
                    write(">");
                }
            }

            function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                write("(");
                emitList(parentNode, parameters, ListFormat.CommaDelimited | ListFormat.SingleLine | ListFormat.Indented);
                write(")");
            }

            function emitParametersForArrow(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                if (parameters &&
                    parameters.length === 1 &&
                    parameters[0].type === undefined &&
                    parameters[0].pos === parentNode.pos) {
                    emit(parameters[0]);
                }
                else {
                    emitParameters(parentNode, parameters);
                }
            }

            function emitParametersForIndexSignature(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                write("[");
                emitList(parentNode, parameters, ListFormat.CommaDelimited | ListFormat.SingleLine | ListFormat.Indented);
                write("]");
            }

            function emitTypeElements(parentNode: Node, elements: NodeArray<TypeElement>) {
                emitList(parentNode, elements, ListFormat.MultiLine | ListFormat.Indented);
            }

            function emitList(parentNode: Node, children: NodeArray<Node>, format: ListFormat, start: number = 0, count: number = children ? children.length - start : 0) {
                if (!children || children.length === 0 || start >= children.length || count === 0) {
                    // Write a line terminator if the parent node was multi-line
                    if (format & ListFormat.MultiLine) {
                        writeLine();
                    }
                    else if (format & ListFormat.SpaceBetweenBraces) {
                        write(" ");
                    }

                    return;
                }

                let previousSibling: Node;

                // Write the opening line terminator or leading whitespace.
                if (shouldWriteLeadingLineTerminator(parentNode, children, format)) {
                    writeLine();
                }
                else if (format & ListFormat.SpaceBetweenBraces) {
                    write(" ");
                }

                // Increase the indent, if requested.
                if (format & ListFormat.Indented) {
                    increaseIndent();
                }

                // Start the lexical environment, if requested.
                if (format & ListFormat.LexicalEnvironment) {
                    startLexicalEnvironment();
                }

                // Print emit helpers, if requested.
                if (format & ListFormat.PrintEmitHelpers) {
                    emitEmitHelpers(currentSourceFile);
                }

                // Print the __export helper, if requested.
                if (format & ListFormat.PrintExportStar) {
                    emitExportStar();
                }

                // Emit each child.
                let delimiter = getDelimiter(format);
                for (let i = 0; i < count; i++) {
                    let child = children[start + i];

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

                if (format & ListFormat.LexicalEnvironment) {
                    let isSingleLine = (format & (ListFormat.MultiLine | ListFormat.PreserveLines)) === 0;
                    endLexicalEnvironment(isSingleLine ? emitLexicalEnvironment : emitLexicalEnvironmentOnNewLine);
                }

                // Decrease the indent, if requested.
                if (format & ListFormat.Indented) {
                    decreaseIndent();
                }

                // Write the closing line terminator or closing whitespace.
                if (shouldWriteClosingLineTerminator(parentNode, children, format)) {
                    writeLine();
                }
                else if (format & ListFormat.SpaceBetweenBraces) {
                    write(" ");
                }
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

            function shouldWriteLeadingLineTerminator(parentNode: Node, children: NodeArray<Node>, format: ListFormat) {
                if (format & ListFormat.MultiLine) {
                    return true;
                }
                else if (format & ListFormat.PreserveLines) {
                    if (parentNode.flags & NodeFlags.MultiLine) {
                        return true;
                    }

                    let firstChild = firstOrUndefined(children);
                    if (firstChild === undefined) {
                        return !positionsAreOnSameLine(getStartPos(parentNode), parentNode.end);
                    }
                    else if (positionIsSynthesized(parentNode.pos) || nodeIsSynthesized(firstChild)) {
                        return synthesizedNodeStartsOnNewLine(firstChild, format);
                    }
                    else {
                        return !rangeStartPositionsAreOnSameLine(parentNode, firstChild);
                    }
                }
                else {
                    return false;
                }
            }

            function shouldWriteSeparatingLineTerminator(previousNode: Node, nextNode: Node, format: ListFormat) {
                if (format & ListFormat.MultiLine) {
                    return true;
                }
                else if (format & ListFormat.PreserveLines) {
                    if (previousNode === undefined || nextNode === undefined) {
                        return false;
                    }
                    else if (nodeIsSynthesized(previousNode) || nodeIsSynthesized(nextNode)) {
                        return synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format);
                    }
                    else {
                        return !rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode);
                    }
                }
                else {
                    return false;
                }
            }

            function shouldWriteClosingLineTerminator(parentNode: Node, children: NodeArray<Node>, format: ListFormat) {
                if (format & ListFormat.MultiLine) {
                    return true;
                }
                else if (format & ListFormat.PreserveLines) {
                    if (parentNode.flags & NodeFlags.MultiLine) {
                        return true;
                    }

                    let lastChild = lastOrUndefined(children);
                    if (lastChild === undefined) {
                        return !positionsAreOnSameLine(getStartPos(parentNode), parentNode.end);
                    }
                    else if (positionIsSynthesized(parentNode.pos) || nodeIsSynthesized(lastChild)) {
                        return synthesizedNodeStartsOnNewLine(lastChild, format);
                    }
                    else {
                        return !rangeEndPositionsAreOnSameLine(parentNode, lastChild);
                    }
                }
                else {
                    return false;
                }
            }

            function synthesizedNodeStartsOnNewLine(node: Node, format?: ListFormat) {
                if (nodeIsSynthesized(node)) {
                    let startsOnNewLine = (<SynthesizedNode>node).startsOnNewLine;
                    if (startsOnNewLine === undefined) {
                        return (format & ListFormat.PreferNewLine) !== 0;
                    }

                    return startsOnNewLine;
                }
                return (format & ListFormat.PreferNewLine) !== 0;
            }

            function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange) {
                return positionsAreOnSameLine(getStartPos(range1), getStartPos(range2));
            }

            function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange) {
                return positionsAreOnSameLine(range1.end, range2.end);
            }

            function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange) {
                return positionsAreOnSameLine(range1.end, getStartPos(range2));
            }

            function positionsAreOnSameLine(pos1: number, pos2: number) {
                return pos1 === pos2 ||
                    getLineOfLocalPosition(currentSourceFile, pos1) === getLineOfLocalPosition(currentSourceFile, pos2);
            }

            function getStartPos(range: TextRange) {
                return range.pos === -1 ? -1 : skipTrivia(currentSourceFile.text, range.pos);
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

            function addHelpers(node: Node, format: ListFormat) {
                let flags = transformer.getGeneratedNodeFlags(node);
                if (flags & GeneratedNodeFlags.EmitHelpers) {
                    format |= ListFormat.PrintEmitHelpers;
                }
                if (flags & GeneratedNodeFlags.EmitExportStar) {
                    format |= ListFormat.PrintExportStar;
                }
                if (flags & GeneratedNodeFlags.NoLexicalEnvironment) {
                    format &= ~ListFormat.LexicalEnvironment;
                }
                return format;
            }

            function isSingleLineEmptyBlock(block: Block) {
                return (block.flags & NodeFlags.MultiLine) === 0 &&
                    block.statements.length === 0 &&
                    rangeEndIsOnSameLineAsRangeStart(block, block);
            }

            /**
            * Return the next available name in the pattern _a ... _z, _0, _1, ...
            * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
            * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
            */
            function makeTempVariableName(flags: TempFlags): string {
                if (flags && !(tempFlags & flags)) {
                    let name = flags === TempFlags._i ? "_i" : "_n";
                    if (transformer.isUniqueName(name)) {
                        tempFlags |= flags;
                        return name;
                    }
                }
                while (true) {
                    let count = tempFlags & TempFlags.CountMask;
                    tempFlags++;
                    // Skip over 'i' and 'n'
                    if (count !== 8 && count !== 13) {
                        let name = count < 26
                            ? "_" + String.fromCharCode(CharacterCodes.a + count)
                            : "_" + (count - 26);
                        if (transformer.isUniqueName(name)) {
                            return name;
                        }
                    }
                }
            }
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

    const enum ListFormat {
        None = 0,

        // Line separators
        SingleLine = 1 << 0,            // Prints the list on a single line (default).
        MultiLine = 1 << 1,             // Prints the list on multiple lines.
        PreserveLines = 1 << 2,         // Prints the list using line preservation if possible.

        // Delimiters
        NotDelimited = 0,               // There is no delimiter between list items (default).
        BarDelimited = 1 << 3,          // Each list item is space-and-bar (" |") delimited.
        AmpersandDelimited = 1 << 4,    // Each list item is space-and-ampersand (" &") delimited.
        CommaDelimited = 1 << 5,        // Each list item is comma (",") delimited.
        AllowTrailingComma = 1 << 6,    // Write a trailing comma (",") if present.
        DelimitersMask = BarDelimited | AmpersandDelimited | CommaDelimited,

        // Whitespace
        Indented = 1 << 7,              // The list should be indented.
        SpaceBetweenBraces = 1 << 8,    // Inserts a space after the opening brace and before the closing brace.

        // Other
        PreferNewLine = 1 << 9,         // Prefer adding a LineTerminator between synthesized nodes.
        PrintEmitHelpers = 1 << 10,     // Emit any emit helpers along with the list.
        PrintExportStar = 1 << 11,      // Emit the __export helper for "export *".
        LexicalEnvironment = 1 << 12,   // Marks a lexical environment.
    }
}