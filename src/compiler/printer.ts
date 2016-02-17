/// <reference path="checker.ts"/>
/// <reference path="transformer.ts" />
/// <reference path="declarationEmitter.ts"/>
/// <reference path="sourcemap.ts"/>
/// <reference path="comments.ts" />

/* @internal */
namespace ts {
    const delimiters = createDelimiterMap();
    const brackets = createBracketsMap();

    // Flags enum to track count of temp variables and a few dedicated names
    const enum TempFlags {
        Auto      = 0x00000000,  // No preferred name
        CountMask = 0x0FFFFFFF,  // Temp variable counter
        _i        = 0x10000000,  // Use/preference flag for '_i'
    }

    // targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
    export function printFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile): EmitResult {
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
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};`;

        // emit output for the __export helper function
        const exportStarHelper = `
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}`;

        // emit output for the UMD helper function.
        const umdHelper = `
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})`;

        const superHelper = `
const _super = name => super[name];`;

        const advancedSuperHelper = `
const _super = (function (geti, seti) {
    const cache = Object.create(null);
    return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
})(name => super[name], (name, value) => super[name] = value);`;

        const compilerOptions = host.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? [] : undefined;
        const emitterDiagnostics = createDiagnosticCollection();

        let emitSkipped = false;
        const newLine = host.getNewLine();
        const printFile = createFilePrinter();
        forEachExpectedEmitFile(host, emitFile, targetSourceFile);

        return {
            emitSkipped,
            diagnostics: emitterDiagnostics.getDiagnostics(),
            sourceMaps: sourceMapDataList
        };

        function emitFile({ jsFilePath, sourceMapFilePath, declarationFilePath}: EmitFileNames, sourceFiles: SourceFile[], isBundledEmit: boolean) {
            // Make sure not to write js file and source map file if any of them cannot be written
            if (!host.isEmitBlocked(jsFilePath) && !compilerOptions.noEmit) {
                printFile(jsFilePath, sourceMapFilePath, sourceFiles, isBundledEmit);
            }
            else {
                emitSkipped = true;
            }

            if (declarationFilePath) {
                emitSkipped = writeDeclarationFile(declarationFilePath, sourceFiles, isBundledEmit, host, resolver, emitterDiagnostics) || emitSkipped;
            }
        }

        function createFilePrinter() {
            const transformers = getTransformers(compilerOptions).concat(initializePrinter);

            const writer = createTextWriter(newLine);
            const { write, writeTextOfNode, writeLine, increaseIndent, decreaseIndent } = writer;

            const sourceMap = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? createSourceMapWriter(host, writer) : getNullSourceMapWriter();
            const { emitStart, emitEnd, emitPos } = sourceMap;

            const comments = createCommentWriter(host, writer, sourceMap);
            const { emitDetachedComments, emitLeadingComments, emitTrailingComments, getLeadingCommentsToEmit, getTrailingCommentsToEmit } = comments;

            let context: TransformationContext;
            let startLexicalEnvironment: () => void;
            let endLexicalEnvironment: () => Statement[];
            let getNodeEmitFlags: (node: Node) => NodeEmitFlags;
            let isExpressionSubstitutionEnabled: (node: Node) => boolean;
            let isEmitNotificationEnabled: (node: Node) => boolean;
            let expressionSubstitution: (node: Expression) => Expression;
            let identifierSubstitution: (node: Identifier) => Identifier;
            let onBeforeEmitNode: (node: Node) => void;
            let onAfterEmitNode: (node: Node) => void;
            let isUniqueName: (name: string) => boolean;
            let temporaryVariables: string[] = [];
            let tempFlags: TempFlags;
            let currentSourceFile: SourceFile;
            let currentText: string;
            let extendsEmitted: boolean;
            let decorateEmitted: boolean;
            let paramEmitted: boolean;
            let awaiterEmitted: boolean;
            let isOwnFileEmit: boolean;

            return doPrint;

            function doPrint(jsFilePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean) {
                sourceMap.initialize(jsFilePath, sourceMapFilePath, sourceFiles, isBundledEmit);
                isOwnFileEmit = !isBundledEmit;

                // Emit helpers from all the files
                if (isBundledEmit && moduleKind) {
                    forEach(sourceFiles, emitEmitHelpers);
                }

                // Transform and print the source files
                transformFiles(resolver, host, sourceFiles, transformers);

                writeLine();

                const sourceMappingURL = sourceMap.getSourceMappingURL();
                if (sourceMappingURL) {
                    write(`//# sourceMappingURL=${sourceMappingURL}`);
                }

                // Write the source map
                if (compilerOptions.sourceMap && !compilerOptions.inlineSourceMap) {
                    writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap.getText(), compilerOptions.emitBOM);
                }

                // Record source map data for the test harness.
                if (sourceMapDataList) {
                    sourceMapDataList.push(sourceMap.getSourceMapData());
                }

                // Write the output file
                writeFile(host, emitterDiagnostics, jsFilePath, writer.getText(), compilerOptions.emitBOM);

                // Reset state
                sourceMap.reset();
                comments.reset();
                writer.reset();

                startLexicalEnvironment = undefined;
                endLexicalEnvironment = undefined;
                getNodeEmitFlags = undefined;
                isExpressionSubstitutionEnabled = undefined;
                isEmitNotificationEnabled = undefined;
                expressionSubstitution = undefined;
                identifierSubstitution = undefined;
                onBeforeEmitNode = undefined;
                onAfterEmitNode = undefined;
                isUniqueName = undefined;
                temporaryVariables = undefined;
                tempFlags = 0;
                currentSourceFile = undefined;
                currentText = undefined;
                extendsEmitted = false;
                decorateEmitted = false;
                paramEmitted = false;
                awaiterEmitted = false;
                isOwnFileEmit = false;
            }

            function initializePrinter(_context: TransformationContext) {
                context = _context;
                startLexicalEnvironment = context.startLexicalEnvironment;
                endLexicalEnvironment = context.endLexicalEnvironment;
                getNodeEmitFlags = context.getNodeEmitFlags;
                isExpressionSubstitutionEnabled = context.isExpressionSubstitutionEnabled;
                isEmitNotificationEnabled = context.isEmitNotificationEnabled;
                expressionSubstitution = context.expressionSubstitution;
                identifierSubstitution = context.identifierSubstitution;
                onBeforeEmitNode = context.onBeforeEmitNode;
                onAfterEmitNode = context.onAfterEmitNode;
                isUniqueName = context.isUniqueName;
                return printSourceFile;
            }

            function printSourceFile(node: SourceFile) {
                currentSourceFile = node;
                currentText = node.text;
                sourceMap.setSourceFile(node);
                comments.setSourceFile(node);
                emitWorker(node);
                return node;
            }

            function emit(node: Node) {
                if (node) {
                    const adviseOnEmit = isEmitNotificationEnabled(node);
                    if (adviseOnEmit && onBeforeEmitNode) {
                        onBeforeEmitNode(node);
                    }

                    const leadingComments = getLeadingCommentsToEmit(node);
                    const trailingComments = getTrailingCommentsToEmit(node);
                    emitLeadingComments(node, leadingComments);
                    emitStart(node);
                    emitWorker(node);
                    emitEnd(node);
                    emitTrailingComments(node, trailingComments);

                    if (adviseOnEmit && onAfterEmitNode) {
                        onAfterEmitNode(node);
                    }
                }
            }

            function emitWorker(node: Node) {
                const kind = node.kind;
                switch (kind) {
                    // Pseudo-literals
                    case SyntaxKind.TemplateHead:
                    case SyntaxKind.TemplateMiddle:
                    case SyntaxKind.TemplateTail:
                        return emitLiteral(<LiteralExpression>node);

                    // Identifiers
                    case SyntaxKind.Identifier:
                        if (tryEmitSubstitute(node, identifierSubstitution)) {
                            return;
                        }

                        return emitIdentifier(<Identifier>node);

                    // Reserved words
                    case SyntaxKind.ConstKeyword:
                    case SyntaxKind.DefaultKeyword:
                    case SyntaxKind.ExportKeyword:
                    case SyntaxKind.VoidKeyword:

                    // Strict mode reserved words
                    case SyntaxKind.PrivateKeyword:
                    case SyntaxKind.ProtectedKeyword:
                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.StaticKeyword:

                    // Contextual keywords
                    case SyntaxKind.AbstractKeyword:
                    case SyntaxKind.AnyKeyword:
                    case SyntaxKind.AsyncKeyword:
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.DeclareKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.ReadonlyKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.SymbolKeyword:
                    case SyntaxKind.GlobalKeyword:
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
                    case SyntaxKind.ExpressionWithTypeArguments:
                        return emitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);
                    case SyntaxKind.ThisType:
                        return write("this");
                    case SyntaxKind.StringLiteralType:
                        return emitLiteral(<StringLiteralTypeNode>node);

                    // Binding patterns
                    case SyntaxKind.ObjectBindingPattern:
                        return emitObjectBindingPattern(<BindingPattern>node);
                    case SyntaxKind.ArrayBindingPattern:
                        return emitArrayBindingPattern(<BindingPattern>node);
                    case SyntaxKind.BindingElement:
                        return emitBindingElement(<BindingElement>node);

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
                        return emitNamedImports(<NamedImports>node);
                    case SyntaxKind.ImportSpecifier:
                        return emitImportSpecifier(<ImportSpecifier>node);
                    case SyntaxKind.ExportAssignment:
                        return emitExportAssignment(<ExportAssignment>node);
                    case SyntaxKind.ExportDeclaration:
                        return emitExportDeclaration(<ExportDeclaration>node);
                    case SyntaxKind.NamedExports:
                        return emitNamedExports(<NamedExports>node);
                    case SyntaxKind.ExportSpecifier:
                        return emitExportSpecifier(<ExportSpecifier>node);
                    case SyntaxKind.MissingDeclaration:
                        return;

                    // Module references
                    case SyntaxKind.ExternalModuleReference:
                        return emitExternalModuleReference(<ExternalModuleReference>node);

                    // JSX (non-expression)
                    case SyntaxKind.JsxText:
                        return emitJsxText(<JsxText>node);
                    case SyntaxKind.JsxClosingElement:
                        return emitJsxClosingElement(<JsxClosingElement>node);
                    case SyntaxKind.JsxAttribute:
                        return emitJsxAttribute(<JsxAttribute>node);
                    case SyntaxKind.JsxSpreadAttribute:
                        return emitJsxSpreadAttribute(<JsxSpreadAttribute>node);

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

                if (isExpressionKind(kind)) {
                    return emitExpressionWorker(node);
                }
            }

            function emitExpression(node: Expression) {
                if (node) {
                    const leadingComments = getLeadingCommentsToEmit(node);
                    const trailingComments = getTrailingCommentsToEmit(node);
                    emitLeadingComments(node, leadingComments);
                    emitStart(node);
                    emitExpressionWorker(node);
                    emitEnd(node);
                    emitTrailingComments(node, trailingComments);
                }
            }

            function emitExpressionWorker(node: Node) {
                const kind = node.kind;
                if (isExpressionSubstitutionEnabled(node) && tryEmitSubstitute(node, expressionSubstitution)) {
                    return;
                }

                switch (kind) {
                    // Literals
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                        return emitLiteral(<LiteralExpression>node);

                    // Identifiers
                    case SyntaxKind.Identifier:
                        return emitIdentifier(<Identifier>node);

                    // Reserved words
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.SuperKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.ThisKeyword:
                        return writeTokenNode(node);

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
                    case SyntaxKind.AsExpression:
                        return emitAsExpression(<AsExpression>node);

                    // JSX
                    case SyntaxKind.JsxElement:
                        return emitJsxElement(<JsxElement>node);
                    case SyntaxKind.JsxSelfClosingElement:
                        return emitJsxSelfClosingElement(<JsxSelfClosingElement>node);
                    case SyntaxKind.JsxOpeningElement:
                        return emitJsxOpeningElement(<JsxOpeningElement>node);
                    case SyntaxKind.JsxExpression:
                        return emitJsxExpression(<JsxExpression>node);
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
            function emitLiteral(node: LiteralLikeNode) {
                const text = getLiteralText(node, currentSourceFile, languageVersion);
                if ((compilerOptions.sourceMap || compilerOptions.inlineSourceMap)
                    && (node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind))) {
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
                    // Emit a temporary variable name for this node.
                    const nodeId = getOriginalNodeId(node);
                    const text = temporaryVariables[nodeId] || (temporaryVariables[nodeId] = makeTempVariableName(tempKindToFlags(node.tempKind)));
                    write(text);
                }
                else if (nodeIsSynthesized(node)) {
                    if (getNodeEmitFlags(node) & NodeEmitFlags.UMDDefine) {
                        writeLines(umdHelper);
                    }
                    else {
                        write(node.text);
                    }
                }
                else {
                    writeTextOfNode(currentText, node);
                }
            }

            //
            // Names
            //

            function emitQualifiedName(node: QualifiedName) {
                emitEntityName(node.left);
                write(".");
                emit(node.right);
            }

            function emitEntityName(node: EntityName) {
                if (node.kind === SyntaxKind.Identifier) {
                    emitExpression(<Identifier>node);
                }
                else {
                    emit(node);
                }
            }

            function emitComputedPropertyName(node: ComputedPropertyName) {
                write("[");
                emitExpression(node.expression);
                write("]");
            }

            //
            // Signature elements
            //

            function emitTypeParameter(node: TypeParameterDeclaration) {
                emit(node.name);
                emitWithPrefix(" extends ", node.constraint);
            }

            function emitParameter(node: ParameterDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                writeIfPresent(node.dotDotDotToken, "...");
                emit(node.name);
                writeIfPresent(node.questionToken, "?");
                emitExpressionWithPrefix(" = ", node.initializer);
                emitWithPrefix(": ", node.type);
            }

            function emitDecorator(decorator: Decorator) {
                write("@");
                emitExpression(decorator.expression);
            }

            //
            // Type members
            //

            function emitPropertySignature(node: PropertySignature) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emit(node.name);
                writeIfPresent(node.questionToken, "?");
                emitWithPrefix(": ", node.type);
                write(";");
            }

            function emitPropertyDeclaration(node: PropertyDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emit(node.name);
                emitWithPrefix(": ", node.type);
                emitExpressionWithPrefix(" = ", node.initializer);
                write(";");
            }

            function emitMethodSignature(node: MethodSignature) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emit(node.name);
                writeIfPresent(node.questionToken, "?");
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
            }

            function emitMethodDeclaration(node: MethodDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                writeIfPresent(node.asteriskToken, "*");
                emit(node.name);
                emitSignatureAndBody(node);
            }

            function emitConstructor(node: ConstructorDeclaration) {
                emitModifiers(node, node.modifiers);
                write("constructor");
                emitSignatureAndBody(node);
            }

            function emitAccessorDeclaration(node: AccessorDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write(node.kind === SyntaxKind.GetAccessor ? "get " : "set ");
                emit(node.name);
                emitSignatureAndBody(node);
            }

            function emitCallSignature(node: CallSignatureDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
            }

            function emitConstructSignature(node: ConstructSignatureDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("new ");
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
            }

            function emitIndexSignature(node: IndexSignatureDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                emitParametersForIndexSignature(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(";");
            }

            //
            // Types
            //

            function emitTypePredicate(node: TypePredicateNode) {
                emit(node.parameterName);
                write(" is ");
                emit(node.type);
            }

            function emitTypeReference(node: TypeReferenceNode) {
                emit(node.typeName);
                emitTypeArguments(node, node.typeArguments);
            }

            function emitFunctionType(node: FunctionTypeNode) {
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                write(" => ");
                emit(node.type);
            }

            function emitConstructorType(node: ConstructorTypeNode) {
                write("new ");
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                write(" => ");
                emit(node.type);
            }

            function emitTypeQuery(node: TypeQueryNode) {
                write("typeof ");
                emit(node.exprName);
            }

            function emitTypeLiteral(node: TypeLiteralNode) {
                write("{");
                emitList(node, node.members, ListFormat.TypeLiteralMembers);
                write("}");
            }

            function emitArrayType(node: ArrayTypeNode) {
                emit(node.elementType);
                write("[]");
            }

            function emitTupleType(node: TupleTypeNode) {
                write("[");
                emitList(node, node.elementTypes, ListFormat.TupleTypeElements);
                write("]");
            }

            function emitUnionType(node: UnionTypeNode) {
                emitList(node, node.types, ListFormat.UnionTypeConstituents);
            }

            function emitIntersectionType(node: IntersectionTypeNode) {
                emitList(node, node.types, ListFormat.IntersectionTypeConstituents);
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
                const elements = node.elements;
                if (elements.length === 0) {
                    write("{}");
                }
                else {
                    write("{");
                    emitList(node, elements, ListFormat.ObjectBindingPatternElements);
                    write("}");
                }
            }

            function emitArrayBindingPattern(node: ArrayBindingPattern) {
                const elements = node.elements;
                if (elements.length === 0) {
                    write("[]");
                }
                else {
                    write("[");
                    emitList(node, node.elements, ListFormat.ArrayBindingPatternElements);
                    write("]");
                }
            }

            function emitBindingElement(node: BindingElement) {
                emitWithSuffix(node.propertyName, ": ");
                writeIfPresent(node.dotDotDotToken, "...");
                emit(node.name);
                emitExpressionWithPrefix(" = ", node.initializer);
            }

            //
            // Expressions
            //

            function emitArrayLiteralExpression(node: ArrayLiteralExpression) {
                const elements = node.elements;
                if (elements.length === 0) {
                    write("[]");
                }
                else {
                    const preferNewLine = getNodeEmitFlags(node) & NodeEmitFlags.MultiLine ? ListFormat.PreferNewLine : ListFormat.None;
                    emitExpressionList(node, elements, ListFormat.ArrayLiteralExpressionElements | preferNewLine);
                }
            }

            function emitObjectLiteralExpression(node: ObjectLiteralExpression) {
                const properties = node.properties;
                if (properties.length === 0) {
                    write("{}");
                }
                else {
                    const preferNewLine = getNodeEmitFlags(node) & NodeEmitFlags.MultiLine ? ListFormat.PreferNewLine : ListFormat.None;
                    const allowTrailingComma = languageVersion >= ScriptTarget.ES5 ? ListFormat.AllowTrailingComma : ListFormat.None;
                    emitList(node, properties, ListFormat.ObjectLiteralExpressionProperties | allowTrailingComma | preferNewLine);
                }
            }

            function emitPropertyAccessExpression(node: PropertyAccessExpression) {
                if (tryEmitConstantValue(node)) {
                    return;
                }

                const indentBeforeDot = needsIndentation(node, node.expression, node.dotToken);
                const indentAfterDot = needsIndentation(node, node.dotToken, node.name);
                const shouldEmitDotDot = !indentBeforeDot && needsDotDotForPropertyAccess(node.expression);

                emitExpression(node.expression);
                increaseIndentIf(indentBeforeDot);
                write(shouldEmitDotDot ? ".." : ".");
                increaseIndentIf(indentAfterDot);
                emit(node.name);
                decreaseIndentIf(indentBeforeDot, indentAfterDot);
            }

            // 1..toString is a valid property access, emit a dot after the literal
            // Also emit a dot if expression is a integer const enum value - it will appear in generated code as numeric literal
            function needsDotDotForPropertyAccess(expression: Expression) {
                if (expression.kind === SyntaxKind.NumericLiteral) {
                    // check if numeric literal was originally written with a dot
                    const text = getLiteralText(<LiteralExpression>expression, currentSourceFile, languageVersion);
                    return text.indexOf(tokenToString(SyntaxKind.DotToken)) < 0;
                }
                else {
                    // check if constant enum value is integer
                    const constantValue = tryGetConstEnumValue(expression);
                    // isFinite handles cases when constantValue is undefined
                    return isFinite(constantValue) && Math.floor(constantValue) === constantValue;
                }
            }

            function emitElementAccessExpression(node: ElementAccessExpression) {
                if (tryEmitConstantValue(node)) {
                    return;
                }

                emitExpression(node.expression);
                write("[");
                emitExpression(node.argumentExpression);
                write("]");
            }

            function emitCallExpression(node: CallExpression) {
                emitExpression(node.expression);
                emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments);
            }

            function emitNewExpression(node: NewExpression) {
                write("new ");
                emitExpression(node.expression);
                if (node.arguments) {
                    emitExpressionList(node, node.arguments, ListFormat.NewExpressionArguments);
                }
            }

            function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
                emitExpression(node.tag);
                emitExpression(node.template);
            }

            function emitTypeAssertionExpression(node: TypeAssertion) {
                if (node.type) {
                    write("<");
                    emit(node.type);
                    write(">");
                }

                emitExpression(node.expression);
            }

            function emitParenthesizedExpression(node: ParenthesizedExpression) {
                write("(");
                emitExpression(node.expression);
                write(")");
            }

            function emitFunctionExpression(node: FunctionExpression) {
                emitFunctionDeclarationOrExpression(node);
            }

            function emitArrowFunction(node: ArrowFunction) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                const body = node.body;
                if (isBlock(body)) {
                    const savedTempFlags = tempFlags;
                    tempFlags = 0;
                    startLexicalEnvironment();
                    emitArrowFunctionHead(node);
                    write(" {");

                    const startingLine = writer.getLine();
                    emitBlockFunctionBody(node, body);

                    const endingLine = writer.getLine();
                    emitLexicalEnvironment(endLexicalEnvironment(), /*newLine*/ startingLine !== endingLine);
                    tempFlags = savedTempFlags;
                    write("}");
                }
                else {
                    emitArrowFunctionHead(node);
                    write(" ");
                    emitExpression(body);
                }
            }

            function emitArrowFunctionHead(node: ArrowFunction) {
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                emitWithPrefix(": ", node.type);
                write(" =>");
            }

            function emitDeleteExpression(node: DeleteExpression) {
                write("delete ");
                emitExpression(node.expression);
            }

            function emitTypeOfExpression(node: TypeOfExpression) {
                write("typeof ");
                emitExpression(node.expression);
            }

            function emitVoidExpression(node: VoidExpression) {
                write("void ");
                emitExpression(node.expression);
            }

            function emitAwaitExpression(node: AwaitExpression) {
                write("await ");
                emitExpression(node.expression);
            }

            function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
                writeToken(node.operator);
                if (shouldEmitWhitespaceBeforeOperand(node)) {
                    write(" ");
                }
                emitExpression(node.operand);
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
                const operand = node.operand;
                return operand.kind === SyntaxKind.PrefixUnaryExpression
                    && ((node.operator === SyntaxKind.PlusToken && ((<PrefixUnaryExpression>operand).operator === SyntaxKind.PlusToken || (<PrefixUnaryExpression>operand).operator === SyntaxKind.PlusPlusToken))
                    || (node.operator === SyntaxKind.MinusToken && ((<PrefixUnaryExpression>operand).operator === SyntaxKind.MinusToken || (<PrefixUnaryExpression>operand).operator === SyntaxKind.MinusMinusToken)));
            }

            function emitPostfixUnaryExpression(node: PostfixUnaryExpression) {
                emitExpression(node.operand);
                writeToken(node.operator);
            }

            function emitBinaryExpression(node: BinaryExpression) {
                const isCommaOperator = node.operatorToken.kind !== SyntaxKind.CommaToken;
                const indentBeforeOperator = needsIndentation(node, node.left, node.operatorToken);
                const indentAfterOperator = needsIndentation(node, node.operatorToken, node.right);

                emitExpression(node.left);
                increaseIndentIf(indentBeforeOperator, isCommaOperator ? " " : undefined);
                writeTokenNode(node.operatorToken);
                increaseIndentIf(indentAfterOperator, " ");
                emitExpression(node.right);
                decreaseIndentIf(indentBeforeOperator, indentAfterOperator);
            }

            function emitConditionalExpression(node: ConditionalExpression) {
                const indentBeforeQuestion = needsIndentation(node, node.condition, node.questionToken);
                const indentAfterQuestion = needsIndentation(node, node.questionToken, node.whenTrue);
                const indentBeforeColon = needsIndentation(node, node.whenTrue, node.colonToken);
                const indentAfterColon = needsIndentation(node, node.colonToken, node.whenFalse);

                emitExpression(node.condition);
                increaseIndentIf(indentBeforeQuestion, " ");
                write("?");
                increaseIndentIf(indentAfterQuestion, " ");
                emitExpression(node.whenTrue);
                decreaseIndentIf(indentBeforeQuestion, indentAfterQuestion);

                increaseIndentIf(indentBeforeColon, " ");
                write(":");
                increaseIndentIf(indentAfterColon, " ");
                emitExpression(node.whenFalse);
                decreaseIndentIf(indentBeforeColon, indentAfterColon);
            }

            function emitTemplateExpression(node: TemplateExpression) {
                emit(node.head);
                emitList(node, node.templateSpans, ListFormat.TemplateExpressionSpans);
            }

            function emitYieldExpression(node: YieldExpression) {
                write(node.asteriskToken ? "yield*" : "yield");
                emitExpressionWithPrefix(" ", node.expression);
            }

            function emitSpreadElementExpression(node: SpreadElementExpression) {
                write("...");
                emitExpression(node.expression);
            }

            function emitClassExpression(node: ClassExpression) {
                emitClassDeclarationOrExpression(node);
            }

            function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
                emitStart(node);
                emitExpression(node.expression);
                emitTypeArguments(node, node.typeArguments);
                emitEnd(node);
            }

            function emitAsExpression(node: AsExpression) {
                emitExpression(node.expression);
                if (node.type) {
                    write(" as ");
                    emit(node.type);
                }
            }

            //
            // Misc
            //

            function emitTemplateSpan(node: TemplateSpan) {
                emitExpression(node.expression);
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
                    write("{");
                    emitBlockStatements(node);
                    write("}");
                }
            }

            function emitBlockStatements(node: Block) {
                if (getNodeEmitFlags(node) & NodeEmitFlags.SingleLine) {
                    emitList(node, node.statements, ListFormat.SingleLineBlockStatements);
                }
                else {
                    emitList(node, node.statements, ListFormat.MultiLineBlockStatements);
                }
            }

            function emitVariableStatement(node: VariableStatement) {
                emitModifiers(node, node.modifiers);
                emit(node.declarationList);
                write(";");
            }

            function emitExpressionStatement(node: ExpressionStatement) {
                emitExpression(node.expression);
                write(";");
            }

            function emitIfStatement(node: IfStatement) {
                write("if (");
                emitExpression(node.expression);
                write(")");
                emitEmbeddedStatement(node.thenStatement);
                if (node.elseStatement) {
                    writeLine();
                    write("else");
                    if (node.elseStatement.kind === SyntaxKind.IfStatement) {
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
                emitExpression(node.expression);
                write(");");
            }

            function emitWhileStatement(node: WhileStatement) {
                write("while (");
                emitExpression(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitForStatement(node: ForStatement) {
                write("for (");
                emitForBinding(node.initializer);
                write(";");
                emitExpressionWithPrefix(" ", node.condition);
                write(";");
                emitExpressionWithPrefix(" ", node.incrementor);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitForInStatement(node: ForInStatement) {
                write("for (");
                emitForBinding(node.initializer);
                write(" in ");
                emitExpression(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitForOfStatement(node: ForOfStatement) {
                write("for (");
                emitForBinding(node.initializer);
                write(" of ");
                emitExpression(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitForBinding(node: VariableDeclarationList | Expression) {
                if (node !== undefined) {
                    if (node.kind === SyntaxKind.VariableDeclarationList) {
                        emit(node);
                    }
                    else {
                        emitExpression(<Expression>node);
                    }
                }
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
                emitExpressionWithPrefix(" ", node.expression);
                write(";");
            }

            function emitWithStatement(node: WithStatement) {
                write("with (");
                emitExpression(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitSwitchStatement(node: SwitchStatement) {
                write("switch (");
                emitExpression(node.expression);
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
                emitExpressionWithPrefix(" ", node.expression);
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
                emitExpressionWithPrefix(" = ", node.initializer);
            }

            function emitVariableDeclarationList(node: VariableDeclarationList) {
                write(isLet(node) ? "let " : isConst(node) ? "const " : "var ");
                emitList(node, node.declarations, ListFormat.VariableDeclarationList);
            }

            function emitFunctionDeclaration(node: FunctionDeclaration) {
                emitFunctionDeclarationOrExpression(node);
            }

            function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write(node.asteriskToken ? "function* " : "function ");
                emit(node.name);
                emitSignatureAndBody(node);
            }

            function emitSignatureAndBody(node: FunctionDeclaration | FunctionExpression | MethodDeclaration | AccessorDeclaration | ConstructorDeclaration) {
                const body = node.body;
                if (body) {
                    const savedTempFlags = tempFlags;
                    tempFlags = 0;
                    startLexicalEnvironment();
                    emitSignatureHead(node);
                    write(" {");

                    const startingLine = writer.getLine();
                    emitBlockFunctionBody(node, body);

                    const endingLine = writer.getLine();
                    emitLexicalEnvironment(endLexicalEnvironment(), /*newLine*/ startingLine !== endingLine);
                    write("}");
                    tempFlags = savedTempFlags;
                }
                else {
                    emitSignatureHead(node);
                    write(";");
                }

            }

            function emitSignatureHead(node: FunctionDeclaration | FunctionExpression | MethodDeclaration | AccessorDeclaration | ConstructorDeclaration) {
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitWithPrefix(": ", node.type);
            }

            function shouldEmitBlockFunctionBodyOnSingleLine(parentNode: Node, body: Block) {
                const originalNode = getOriginalNode(parentNode);
                if (isFunctionLike(originalNode) && !nodeIsSynthesized(originalNode) && rangeEndIsOnSameLineAsRangeStart(originalNode.body, originalNode.body)) {
                    for (const statement of body.statements) {
                        if (synthesizedNodeStartsOnNewLine(statement)) {
                            return false;
                        }
                    }

                    if (originalNode.kind === SyntaxKind.ArrowFunction && !rangeEndIsOnSameLineAsRangeStart((<ArrowFunction>originalNode).equalsGreaterThanToken, originalNode.body)) {
                        return false;
                    }

                    return true;
                }

                return false;
            }

            function emitBlockFunctionBody(parentNode: Node, body: Block) {
                // Emit all the prologue directives (like "use strict").
                increaseIndent();
                const statements = body.statements;
                const statementOffset = emitPrologueDirectives(statements, /*startWithNewLine*/ true);
                const helpersEmitted = emitHelpers(body);
                decreaseIndent();

                if (statementOffset === 0 && !helpersEmitted && shouldEmitBlockFunctionBodyOnSingleLine(parentNode, body)) {
                    emitList(body, statements, ListFormat.SingleLineFunctionBodyStatements);
                }
                else {
                    emitList(body, statements, ListFormat.MultiLineFunctionBodyStatements, statementOffset);
                }
            }

            function emitClassDeclaration(node: ClassDeclaration) {
                emitClassDeclarationOrExpression(node);
            }

            function emitClassDeclarationOrExpression(node: ClassDeclaration | ClassExpression) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("class");
                emitWithPrefix(" ", node.name);
                emitTypeParameters(node, node.typeParameters);
                emitList(node, node.heritageClauses, ListFormat.ClassHeritageClauses);

                const savedTempFlags = tempFlags;
                tempFlags = 0;

                write(" {");
                emitList(node, node.members, ListFormat.ClassMembers);
                write("}");

                tempFlags = savedTempFlags;
            }

            function emitInterfaceDeclaration(node: InterfaceDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("interface ");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                emitList(node, node.heritageClauses, ListFormat.SingleLine);
                write(" {");
                emitList(node, node.members, ListFormat.InterfaceMembers);
                write("}");
            }

            function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
                emitDecorators(node, node.decorators);
                emitModifiers(node, node.modifiers);
                write("type ");
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                write(" = ");
                emit(node.type);
                write(";");
            }

            function emitEnumDeclaration(node: EnumDeclaration) {
                emitModifiers(node, node.modifiers);
                write("enum ");
                emit(node.name);

                const savedTempFlags = tempFlags;
                tempFlags = 0;

                write(" {");
                emitList(node, node.members, ListFormat.EnumMembers);
                write("}");
                tempFlags = savedTempFlags;
            }

            function emitModuleDeclaration(node: ModuleDeclaration) {
                emitModifiers(node, node.modifiers);
                write(node.flags & NodeFlags.Namespace ? "namespace " : "module ");
                emit(node.name);

                let body = node.body;
                while (body.kind === SyntaxKind.ModuleDeclaration) {
                    write(".");
                    emit((<ModuleDeclaration>body).name);
                    body = (<ModuleDeclaration>body).body;
                }

                write(" ");
                emit(body);
            }

            function emitModuleBlock(node: ModuleBlock) {
                if (isSingleLineEmptyBlock(node)) {
                    write("{ }");
                }
                else {
                    const savedTempFlags = tempFlags;
                    tempFlags = 0;
                    startLexicalEnvironment();
                    write("{");
                    increaseIndent();

                    const startingLine = writer.getLine();
                    emitBlockStatements(node);

                    const endingLine = writer.getLine();
                    emitLexicalEnvironment(endLexicalEnvironment(), /*newLine*/ startingLine !== endingLine);
                    write("}");
                    tempFlags = savedTempFlags;
                }
            }

            function emitCaseBlock(node: CaseBlock) {
                write("{");
                emitList(node, node.clauses, ListFormat.CaseBlockClauses);
                write("}");
            }

            function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
                emitModifiers(node, node.modifiers);
                write("import ");
                emit(node.name);
                write(" = ");
                emitModuleReference(node.moduleReference);
                write(";");
            }

            function emitModuleReference(node: ModuleReference) {
                if (node.kind === SyntaxKind.Identifier) {
                    emitExpression(<Identifier>node);
                }
                else {
                    emit(node);
                }
            }

            function emitImportDeclaration(node: ImportDeclaration) {
                emitModifiers(node, node.modifiers);
                write("import ");
                emit(node.importClause);
                emitExpression(node.moduleSpecifier);
                write(";");
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
                write(node.isExportEquals ? "export = " : "export default ");
                emitExpression(node.expression);
                write(";");
            }

            function emitExportDeclaration(node: ExportDeclaration) {
                write("export ");
                if (node.exportClause) {
                    emit(node.exportClause);
                    write(" from ");
                }
                else {
                    write("* from ");
                }
                emitExpression(node.moduleSpecifier);
                write(";");
            }

            function emitNamedExports(node: NamedExports) {
                emitNamedImportsOrExports(node);
            }

            function emitExportSpecifier(node: ExportSpecifier) {
                emitImportOrExportSpecifier(node);
            }

            function emitNamedImportsOrExports(node: NamedImportsOrExports) {
                write("{");
                emitList(node, node.elements, ListFormat.NamedImportsOrExportsElements);
                write("}");
            }

            function emitImportOrExportSpecifier(node: ImportOrExportSpecifier) {
                if (node.propertyName) {
                    emit(node.propertyName);
                    write(" as ");
                }

                emit(node.name);
            }

            //
            // Module references
            //

            function emitExternalModuleReference(node: ExternalModuleReference) {
                write("require(");
                emitExpression(node.expression);
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
                emitList(node, node.attributes, ListFormat.JsxElementAttributes);
                write("/>");
            }

            function emitJsxOpeningElement(node: JsxOpeningElement) {
                write("<");
                emit(node.tagName);
                writeIfAny(node.attributes, " ");
                emitList(node, node.attributes, ListFormat.JsxElementAttributes);
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
                emitExpression(node.expression);
                write("}");
            }

            function emitJsxExpression(node: JsxExpression) {
                write("{");
                emitExpression(node.expression);
                write("}");
            }

            //
            // Clauses
            //

            function emitCaseClause(node: CaseClause) {
                write("case ");
                emitExpression(node.expression);
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
                    emitList(parentNode, statements, ListFormat.CaseOrDefaultClauseStatements);
                }
            }

            function emitHeritageClause(node: HeritageClause) {
                emitStart(node);
                write(" ");
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
                // // This is to ensure that we emit comment in the following case:
                // //      For example:
                // //          obj = {
                // //              id: /*comment1*/ ()=>void
                // //          }
                // // "comment1" is not considered to be leading comment for node.initializer
                // // but rather a trailing comment on the previous node.
                // emitTrailingCommentsOfPosition(node.initializer.pos);
                emitExpression(node.initializer);
            }

            function emitShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
                emit(node.name);
            }

            //
            // Enum
            //

            function emitEnumMember(node: EnumMember) {
                emit(node.name);
                emitExpressionWithPrefix(" = ", node.initializer);
            }

            //
            // Top-level nodes
            //

            function emitSourceFile(node: SourceFile) {
                writeLine();
                emitShebang();
                emitDetachedComments(node);

                const statements = node.statements;
                const statementOffset = emitPrologueDirectives(statements);
                if (getNodeEmitFlags(node) & NodeEmitFlags.NoLexicalEnvironment) {
                    emitHelpers(node);
                    emitList(node, statements, ListFormat.MultiLine, statementOffset);
                }
                else {
                    const savedTempFlags = tempFlags;
                    tempFlags = 0;
                    startLexicalEnvironment();
                    emitHelpers(node);
                    emitList(node, statements, ListFormat.MultiLine, statementOffset);
                    emitLexicalEnvironment(endLexicalEnvironment(), /*newLine*/ true);
                    tempFlags = savedTempFlags;
                }

                emitLeadingComments(node.endOfFileToken);
            }

            function emitLexicalEnvironment(declarations: Statement[], newLine: boolean) {
                if (declarations && declarations.length > 0) {
                    for (const node of declarations) {
                        if (newLine) {
                            writeLine();
                        }
                        else {
                            write(" ");
                        }

                        emit(node);
                    }

                    if (newLine) {
                        writeLine();
                    }
                    else {
                        write(" ");
                    }
                }
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

            function emitHelpers(node: Node) {
                const emitFlags = getNodeEmitFlags(node);
                let helpersEmitted = false;
                if (emitFlags & NodeEmitFlags.EmitEmitHelpers) {
                    helpersEmitted = emitEmitHelpers(currentSourceFile);
                }

                if (emitFlags & NodeEmitFlags.EmitExportStar) {
                    writeLines(exportStarHelper);
                    helpersEmitted = true;
                }

                if (emitFlags & NodeEmitFlags.EmitSuperHelper) {
                    writeLines(superHelper);
                    helpersEmitted = true;
                }

                if (emitFlags & NodeEmitFlags.EmitAdvancedSuperHelper) {
                    writeLines(advancedSuperHelper);
                    helpersEmitted = true;
                }

                return helpersEmitted;
            }

            function emitEmitHelpers(node: SourceFile) {
                let helpersEmitted = false;

                // Only emit helpers if the user did not say otherwise.
                if (!compilerOptions.noEmitHelpers) {
                    // Only Emit __extends function when target ES5.
                    // For target ES6 and above, we can emit classDeclaration as is.
                    if ((languageVersion < ScriptTarget.ES6) && (!extendsEmitted && node.flags & NodeFlags.HasClassExtends)) {
                        writeLines(extendsHelper);
                        extendsEmitted = true;
                        helpersEmitted = true;
                    }

                    if (!decorateEmitted && node.flags & NodeFlags.HasDecorators) {
                        writeLines(decorateHelper);
                        if (compilerOptions.emitDecoratorMetadata) {
                            writeLines(metadataHelper);
                        }

                        decorateEmitted = true;
                        helpersEmitted = true;
                    }

                    if (!paramEmitted && node.flags & NodeFlags.HasParamDecorators) {
                        writeLines(paramHelper);
                        paramEmitted = true;
                        helpersEmitted = true;
                    }

                    if (!awaiterEmitted && node.flags & NodeFlags.HasAsyncFunctions) {
                        writeLines(awaiterHelper);
                        awaiterEmitted = true;
                        helpersEmitted = true;
                    }

                    if (helpersEmitted) {
                        writeLine();
                    }
                }

                return helpersEmitted;
            }

            function writeLines(text: string): void {
                const lines = text.split(/\r\n|\r|\n/g);
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
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
                const shebang = getShebang(currentText);
                if (shebang) {
                    write(shebang);
                }
            }

            function emitModifiers(node: Node, modifiers: ModifiersArray) {
                const startingPos = writer.getTextPos();
                emitList(node, modifiers, ListFormat.SingleLine);

                const endingPos = writer.getTextPos();
                if (startingPos !== endingPos) {
                    write(" ");
                }
            }

            function emitWithPrefix(prefix: string, node: Node) {
                emitNodeWithPrefix(prefix, node, emit);
            }

            function emitExpressionWithPrefix(prefix: string, node: Node) {
                emitNodeWithPrefix(prefix, node, emitExpression);
            }

            function emitNodeWithPrefix(prefix: string, node: Node, emit: (node: Node) => void) {
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
                const substitute = substitution ? substitution(node) : node;
                if (substitute && substitute !== node) {
                    emitWorker(substitute);
                    return true;
                }

                return false;
            }

            function tryEmitConstantValue(node: PropertyAccessExpression | ElementAccessExpression): boolean {
                const constantValue = tryGetConstEnumValue(node);
                if (constantValue !== undefined) {
                    write(String(constantValue));
                    if (!compilerOptions.removeComments) {
                        const propertyName = isPropertyAccessExpression(node)
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
                emitList(parentNode, decorators, ListFormat.Decorators);
            }

            function emitTypeArguments(parentNode: Node, typeArguments: NodeArray<TypeNode>) {
                emitList(parentNode, typeArguments, ListFormat.TypeArguments);
            }

            function emitTypeParameters(parentNode: Node, typeParameters: NodeArray<TypeParameterDeclaration>) {
                emitList(parentNode, typeParameters, ListFormat.TypeParameters);
            }

            function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
                emitList(parentNode, parameters, ListFormat.Parameters);
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
                emitList(parentNode, parameters, ListFormat.IndexSignatureParameters);
            }

            function emitList(parentNode: Node, children: NodeArray<Node>, format: ListFormat, start?: number, count?: number) {
                emitNodeList(emit, parentNode, children, format, start, count);
            }

            function emitExpressionList(parentNode: Node, children: NodeArray<Node>, format: ListFormat, start?: number, count?: number) {
                emitNodeList(emitExpression, parentNode, children, format, start, count);
            }

            function emitNodeList(emit: (node: Node) => void, parentNode: Node, children: NodeArray<Node>, format: ListFormat, start = 0, count = children ? children.length - start : 0) {
                const isUndefined = children === undefined;
                if (isUndefined && format & ListFormat.OptionalIfUndefined) {
                    return;
                }

                const isEmpty = isUndefined || children.length === 0 || start >= children.length || count === 0;
                if (isEmpty && format & ListFormat.OptionalIfEmpty) {
                    return;
                }

                if (format & ListFormat.BracketsMask) {
                    write(getOpeningBracket(format));
                }

                if (isEmpty) {
                    // Write a line terminator if the parent node was multi-line
                    if (format & ListFormat.MultiLine) {
                        writeLine();
                    }
                    else if (format & ListFormat.SpaceBetweenBraces) {
                        write(" ");
                    }
                }
                else {
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

                    // Emit each child.
                    let previousSibling: Node;
                    const delimiter = getDelimiter(format);
                    for (let i = 0; i < count; i++) {
                        const child = children[start + i];

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
                    const hasTrailingComma = (format & ListFormat.AllowTrailingComma) && children.hasTrailingComma;
                    if (format & ListFormat.CommaDelimited && hasTrailingComma) {
                        write(",");
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

                if (format & ListFormat.BracketsMask) {
                    write(getClosingBracket(format));
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

            function writeToken(token: SyntaxKind, pos?: number) {
                const tokenStartPos = skipTrivia(currentText, pos);
                emitPos(tokenStartPos);
                const tokenEndPos = writeTokenText(token, pos);
                emitPos(tokenEndPos);
                return tokenEndPos;
            }

            function writeTokenText(token: SyntaxKind, pos?: number) {
                const tokenString = tokenToString(token);
                write(tokenString);
                return positionIsSynthesized(pos) ? -1 : pos + tokenString.length;
            }

            function writeTokenNode(node: Node) {
                if (node) {
                    emitStart(node);
                    writeTokenText(node.kind);
                    emitEnd(node);
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
                    if (getNodeEmitFlags(parentNode) & NodeEmitFlags.MultiLine) {
                        return true;
                    }

                    const firstChild = children[0];
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
                    if (getNodeEmitFlags(parentNode) & NodeEmitFlags.MultiLine) {
                        return true;
                    }

                    const lastChild = lastOrUndefined(children);
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
                    const startsOnNewLine = (<SynthesizedNode>node).startsOnNewLine;
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
                return range.pos === -1 ? -1 : skipTrivia(currentText, range.pos);
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

            function isSingleLineEmptyBlock(block: Block) {
                return (getNodeEmitFlags(block) & NodeEmitFlags.MultiLine) === 0 &&
                    block.statements.length === 0 &&
                    rangeEndIsOnSameLineAsRangeStart(block, block);
            }

            function tempKindToFlags(kind: TempVariableKind) {
                return kind === TempVariableKind.Loop
                    ? TempFlags._i
                    : TempFlags.Auto;
            }

            /**
            * Return the next available name in the pattern _a ... _z, _0, _1, ...
            * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
            * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
            */
            function makeTempVariableName(flags: TempFlags): string {
                if (flags && !(tempFlags & flags)) {
                    const name = flags === TempFlags._i ? "_i" : "_n";
                    if (isUniqueName(name)) {
                        tempFlags |= flags;
                        return name;
                    }
                }
                while (true) {
                    const count = tempFlags & TempFlags.CountMask;
                    tempFlags++;
                    // Skip over 'i' and 'n'
                    if (count !== 8 && count !== 13) {
                        const name = count < 26
                            ? "_" + String.fromCharCode(CharacterCodes.a + count)
                            : "_" + (count - 26);
                        if (isUniqueName(name)) {
                            return name;
                        }
                    }
                }
            }
        }
    }

    function createDelimiterMap() {
        const delimiters: string[] = [];
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
        const brackets: string[][] = [];
        brackets[ListFormat.Braces] = ["{", "}"];
        brackets[ListFormat.Parenthesis] = ["(", ")"];
        brackets[ListFormat.AngleBrackets] = ["<", ">"];
        brackets[ListFormat.SquareBrackets] = ["[", "]"];
        return brackets;
    }

    function getOpeningBracket(format: ListFormat) {
        return brackets[format & ListFormat.BracketsMask][0];
    }

    function getClosingBracket(format: ListFormat) {
        return brackets[format & ListFormat.BracketsMask][1];
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

        // Brackets/Braces
        Braces = 1 << 9,                // The list is surrounded by "{" and "}".
        Parenthesis = 1 << 10,          // The list is surrounded by "(" and ")".
        AngleBrackets = 1 << 11,        // The list is surrounded by "<" and ">".
        SquareBrackets = 1 << 12,       // The list is surrounded by "[" and "]".
        BracketsMask = Braces | Parenthesis | AngleBrackets | SquareBrackets,
        OptionalIfUndefined = 1 << 13,  // Do not emit brackets if the list is undefined.
        OptionalIfEmpty = 1 << 14,      // Do not emit brackets if the list is empty.
        Optional = OptionalIfUndefined | OptionalIfEmpty,

        // Other
        PreferNewLine = 1 << 15,        // Prefer adding a LineTerminator between synthesized nodes.

        // Precomputed Formats
        TypeLiteralMembers = MultiLine | Indented,
        TupleTypeElements = CommaDelimited | SingleLine | Indented,
        UnionTypeConstituents = BarDelimited | SingleLine,
        IntersectionTypeConstituents = AmpersandDelimited | SingleLine,
        ObjectBindingPatternElements = SingleLine | AllowTrailingComma | SpaceBetweenBraces,
        ArrayBindingPatternElements = SingleLine | AllowTrailingComma,
        ObjectLiteralExpressionProperties = PreserveLines | CommaDelimited | SpaceBetweenBraces | Indented | Braces,
        ArrayLiteralExpressionElements = PreserveLines | CommaDelimited | AllowTrailingComma | Indented | SquareBrackets,
        CallExpressionArguments = CommaDelimited | SingleLine | Parenthesis,
        NewExpressionArguments = CommaDelimited | SingleLine | Parenthesis | OptionalIfUndefined,
        TemplateExpressionSpans = SingleLine,
        SingleLineBlockStatements = SpaceBetweenBraces | SingleLine,
        MultiLineBlockStatements = Indented | MultiLine,
        VariableDeclarationList = CommaDelimited | SingleLine,
        SingleLineFunctionBodyStatements = SingleLine | SpaceBetweenBraces,
        MultiLineFunctionBodyStatements = MultiLine | Indented,
        ClassHeritageClauses = SingleLine,
        ClassMembers = Indented | MultiLine,
        InterfaceMembers = Indented | MultiLine,
        EnumMembers = CommaDelimited | Indented | MultiLine,
        CaseBlockClauses = Indented | MultiLine,
        NamedImportsOrExportsElements = CommaDelimited | AllowTrailingComma | SingleLine | SpaceBetweenBraces,
        JsxElementChildren = SingleLine,
        JsxElementAttributes = SingleLine,
        CaseOrDefaultClauseStatements = Indented | MultiLine,
        HeritageClauseTypes = CommaDelimited | SingleLine,
        SourceFileStatements = MultiLine,
        Decorators = MultiLine | Optional,
        TypeArguments = CommaDelimited | SingleLine | Indented | AngleBrackets | Optional,
        TypeParameters = CommaDelimited | SingleLine | Indented | AngleBrackets | Optional,
        Parameters = CommaDelimited | SingleLine | Indented | Parenthesis,
        IndexSignatureParameters = CommaDelimited | SingleLine | Indented | SquareBrackets,
    }
}