import * as ast from "@typescript/typescript/ast";
import * as factory from "@typescript/typescript/ast/factory";
import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { API } from "./sync/api.testUtils.ts";
import { createVirtualFileSystem } from "./testUtils.ts";

function createAPI(): API {
    return new API({
        cwd: fileURLToPath(new URL("../../../", import.meta.url)),
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsc${process.platform === "win32" ? ".exe" : ""}`, import.meta.url)),
        fs: createVirtualFileSystem({}),
    });
}

test("isAutoAccessorPropertyDeclaration distinguishes accessor modifiers from accessors", () => {
    const name = factory.createIdentifier("value");
    const property: ast.Node = factory.createPropertyDeclaration([factory.createToken(ast.SyntaxKind.AccessorKeyword)], name);
    assert.ok(ast.isAutoAccessorPropertyDeclaration(property));
    const narrowed: ast.AutoAccessorPropertyDeclaration = property;
    assert.equal(narrowed.name, name);
    assert.equal(ast.isAutoAccessorPropertyDeclaration(factory.createPropertyDeclaration(undefined, name)), false);
    assert.equal(ast.isAutoAccessorPropertyDeclaration(factory.createGetAccessorDeclaration(undefined, name, undefined, [])), false);
    const ordinary = factory.createPropertyDeclaration(undefined, name);
    if (!ast.isAutoAccessorPropertyDeclaration(ordinary)) {
        assert.equal(ordinary.name, name);
    }
});

test("isCallChain recognizes continuations without a question-dot token", () => {
    const name = factory.createIdentifier("f");
    const call: ast.Node = factory.createCallExpression(name, undefined, undefined, [], ast.NodeFlags.OptionalChain);
    assert.ok(ast.isCallChain(call));
    const narrowed: ast.CallChain = call;
    assert.equal(narrowed.questionDotToken, undefined);
    const ordinary = factory.createCallExpression(name, undefined, undefined, [], ast.NodeFlags.None);
    if (!ast.isCallChain(ordinary)) {
        assert.equal(ordinary.arguments.length, 0);
    }
    assert.equal(ast.isCallChain(ordinary), false);
    assert.equal(ast.isCallChain(factory.createNonNullExpression(name, ast.NodeFlags.OptionalChain)), false);
});

test("isClassElement includes static blocks and index signatures but not interface properties", () => {
    const signature: ast.Node = factory.createIndexSignatureDeclaration(undefined, []);
    assert.ok(ast.isClassElement(signature));
    const narrowed: ast.ClassElement = signature;
    assert.equal(narrowed, signature);
    assert.ok(ast.isClassElement(factory.createClassStaticBlockDeclaration(undefined, factory.createBlock([]))));
    assert.equal(ast.isClassElement(factory.createPropertySignatureDeclaration(undefined, factory.createIdentifier("x"))), false);
});

test("isConstTypeReference rejects qualified names and even empty type argument lists", () => {
    const name = factory.createIdentifier("const");
    const reference = factory.createTypeReferenceNode(name);
    assert.ok(ast.isConstTypeReference(reference));
    assert.equal(reference.typeName, name);
    assert.equal(ast.isConstTypeReference(factory.createTypeReferenceNode(name, [])), false);
    assert.equal(ast.isConstTypeReference(factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier("ns"), name))), false);
    assert.equal(ast.isConstTypeReference(factory.createIdentifier("const")), false);
});

test("isDeclarationStatement does not classify variable statements as declaration statements", () => {
    const declaration: ast.Node = factory.createExportDeclaration();
    assert.ok(ast.isDeclarationStatement(declaration));
    const narrowed: ast.Statement & ast.Declaration = declaration;
    assert.equal(narrowed, declaration);
    assert.ok(ast.isDeclarationStatement(factory.createMissingDeclaration()));
    assert.equal(ast.isDeclarationStatement(factory.createVariableStatement(undefined, factory.createVariableDeclarationList([], ast.NodeFlags.Const))), false);
    assert.equal(ast.isDeclarationStatement(factory.createBlock([])), false);
});

test("isDeclarationStatement includes declarations produced by JavaScript JSDoc", () => {
    using api = createAPI();
    const source = api.createSourceFile(
        "/declarations.js",
        `/** @typedef {string} Name */
/** @callback Callback
 * @returns {void}
 */
/** @import { Value } from "./types" */
`,
    ).sourceFile;
    const declarations = source.statements.filter(node => node.kind === ast.SyntaxKind.JSTypeAliasDeclaration || node.kind === ast.SyntaxKind.JSImportDeclaration);
    assert.deepEqual(declarations.map(node => node.kind), [
        ast.SyntaxKind.JSTypeAliasDeclaration,
        ast.SyntaxKind.JSTypeAliasDeclaration,
        ast.SyntaxKind.JSImportDeclaration,
    ]);
    assert.ok(declarations.every(ast.isDeclarationStatement));
});

test("isElementAccessChain uses the chain flag rather than the question-dot token", () => {
    const name = factory.createIdentifier("obj");
    const index = factory.createStringLiteral("key", ast.TokenFlags.None);
    const access: ast.Node = factory.createElementAccessExpression(name, undefined, index, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isElementAccessChain(access));
    const narrowed: ast.ElementAccessChain = access;
    assert.equal(narrowed.argumentExpression, index);
    assert.equal(ast.isElementAccessChain(factory.createElementAccessExpression(name, undefined, index, ast.NodeFlags.None)), false);
    assert.equal(ast.isElementAccessChain(factory.createPropertyAccessExpression(name, undefined, name, ast.NodeFlags.OptionalChain)), false);
});

test("isEmptyBindingElement recursively distinguishes bindings from empty nested patterns", () => {
    const empty = factory.createBindingElement(undefined, undefined, factory.createObjectBindingPattern([]));
    assert.ok(ast.isEmptyBindingElement(empty));
    assert.ok(ast.isEmptyBindingElement(factory.createOmittedExpression()));
    assert.ok(ast.isEmptyBindingElement(factory.createBindingElement()));
    const binding = factory.createBindingElement(undefined, undefined, factory.createIdentifier("value"));
    assert.equal(ast.isEmptyBindingElement(binding), false);
    assert.equal(ast.isEmptyBindingElement(factory.createBindingElement(undefined, undefined, factory.createArrayBindingPattern([binding]))), false);
});

test("isEmptyBindingElement recognizes parsed array-binding holes", () => {
    using api = createAPI();
    const source = api.createSourceFile("/holes.ts", "const [, , value] = values;").sourceFile;
    const statement = source.statements[0];
    assert.ok(ast.isVariableStatement(statement));
    const pattern = statement.declarationList.declarations[0].name;
    assert.ok(ast.isArrayBindingPattern(pattern));
    assert.deepEqual(pattern.elements.map(element => element.kind), [
        ast.SyntaxKind.BindingElement,
        ast.SyntaxKind.BindingElement,
        ast.SyntaxKind.BindingElement,
    ]);
    assert.deepEqual(pattern.elements.map(ast.isEmptyBindingElement), [true, true, false]);
});

test("isEmptyBindingPattern accepts nested empty patterns but not identifiers", () => {
    const nested: ast.BindingName = factory.createArrayBindingPattern([
        factory.createBindingElement(undefined, undefined, factory.createObjectBindingPattern([])),
    ]);
    assert.ok(ast.isEmptyBindingPattern(nested));
    const narrowed: ast.EmptyBindingPattern = nested;
    assert.equal(narrowed.elements.length, 1);
    assert.equal(ast.isEmptyBindingPattern(factory.createIdentifier("value")), false);
    assert.equal(
        ast.isEmptyBindingPattern(factory.createObjectBindingPattern([
            factory.createBindingElement(undefined, undefined, factory.createIdentifier("value")),
        ])),
        false,
    );
    const nonempty = factory.createObjectBindingPattern([
        factory.createBindingElement(undefined, undefined, factory.createIdentifier("value")),
    ]);
    if (!ast.isEmptyBindingPattern(nonempty)) {
        assert.equal(nonempty.elements.length, 1);
    }
});

test("isEmptyBindingPattern accepts parsed hole-only and nested empty patterns", () => {
    using api = createAPI();
    const source = api.createSourceFile(
        "/patterns.ts",
        "const [,] = values; const [, [,], {}] = values; const [, value] = values;",
    ).sourceFile;
    const patterns = source.statements.filter(ast.isVariableStatement).map(statement => statement.declarationList.declarations[0].name);
    assert.deepEqual(patterns.map(ast.isEmptyBindingPattern), [true, true, false]);
});

test("isFunctionLike includes signatures and JSDoc callbacks, not only functions with bodies", () => {
    const signature: ast.Node | undefined = factory.createCallSignatureDeclaration(undefined, []);
    assert.ok(ast.isFunctionLike(signature));
    const narrowed: ast.SignatureDeclaration | ast.JSDocSignature = signature;
    assert.equal(narrowed.parameters.length, 0);
    assert.ok(ast.isFunctionLike(factory.createJSDocSignature(undefined, [])));
    assert.ok(ast.isFunctionLike(factory.createFunctionTypeNode(undefined, [], factory.createKeywordTypeNode(ast.SyntaxKind.VoidKeyword))));
    assert.equal(ast.isFunctionLike(undefined), false);
    assert.equal(ast.isFunctionLike(factory.createClassStaticBlockDeclaration(undefined, factory.createBlock([]))), false);
});

test("isFunctionOrConstructorTypeNode excludes callable declaration signatures", () => {
    const result = factory.createKeywordTypeNode(ast.SyntaxKind.VoidKeyword);
    const type: ast.Node = factory.createFunctionTypeNode(undefined, [], result);
    assert.ok(ast.isFunctionOrConstructorTypeNode(type));
    const narrowed: ast.FunctionTypeNode | ast.ConstructorTypeNode = type;
    assert.equal(narrowed.type, result);
    assert.ok(ast.isFunctionOrConstructorTypeNode(factory.createConstructorTypeNode(undefined, undefined, [], result)));
    assert.equal(ast.isFunctionOrConstructorTypeNode(factory.createCallSignatureDeclaration(undefined, [])), false);
});

test("isImportOrExportSpecifier distinguishes named specifiers from namespace imports", () => {
    const name = factory.createIdentifier("value");
    const specifier: ast.Node = factory.createImportSpecifier(true, undefined, name);
    assert.ok(ast.isImportOrExportSpecifier(specifier));
    const narrowed: ast.ImportSpecifier | ast.ExportSpecifier = specifier;
    assert.equal(narrowed.isTypeOnly, true);
    assert.ok(ast.isImportOrExportSpecifier(factory.createExportSpecifier(false, undefined, name)));
    assert.equal(ast.isImportOrExportSpecifier(factory.createNamespaceImport(name)), false);
});

test("isIterationStatement follows labels only when requested", () => {
    const empty = factory.createEmptyStatement();
    const loop: ast.Node = factory.createWhileStatement(factory.createIdentifier("condition"), empty);
    assert.ok(ast.isIterationStatement(loop, false));
    const narrowed: ast.DoStatement | ast.WhileStatement | ast.ForStatement | ast.ForInStatement | ast.ForOfStatement = loop;
    assert.equal(narrowed.statement, empty);
    const labeled = factory.createLabeledStatement(factory.createIdentifier("outer"), factory.createLabeledStatement(factory.createIdentifier("inner"), loop));
    assert.equal(ast.isIterationStatement(labeled, false), false);
    assert.equal(ast.isIterationStatement(labeled, true), true);
    assert.equal(ast.isIterationStatement(factory.createLabeledStatement(factory.createIdentifier("label"), empty), true), false);
});

test("isJsxCallLike includes opening fragments but excludes complete fragments", () => {
    const opening: ast.Node = factory.createJsxOpeningFragment();
    assert.ok(ast.isJsxCallLike(opening));
    const narrowed: ast.JsxOpeningElement | ast.JsxSelfClosingElement | ast.JsxOpeningFragment = opening;
    assert.equal(narrowed, opening);
    assert.ok(ast.isJsxCallLike(factory.createJsxSelfClosingElement(factory.createIdentifier("Component"), undefined, factory.createJsxAttributes([]))));
    assert.equal(ast.isJsxCallLike(factory.createJsxFragment(factory.createJsxOpeningFragment(), [], factory.createJsxClosingFragment())), false);
});

test("isNonNullChain distinguishes optional-chain assertions from ordinary assertions", () => {
    const name = factory.createIdentifier("value");
    const assertion: ast.Node = factory.createNonNullExpression(name, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isNonNullChain(assertion));
    const narrowed: ast.NonNullChain = assertion;
    assert.equal(narrowed.expression, name);
    assert.equal(ast.isNonNullChain(factory.createNonNullExpression(name, ast.NodeFlags.None)), false);
    assert.equal(ast.isNonNullChain(factory.createCallExpression(name, undefined, undefined, [], ast.NodeFlags.OptionalChain)), false);
});

test("isNullishCoalesce distinguishes nullish coalescing from logical OR", () => {
    const name = factory.createIdentifier("value");
    const expression = factory.createBinaryExpression(undefined, name, undefined, factory.createToken(ast.SyntaxKind.QuestionQuestionToken), name);
    assert.ok(ast.isNullishCoalesce(expression));
    assert.equal(expression.left, name);
    assert.equal(ast.isNullishCoalesce(factory.createBinaryExpression(undefined, name, undefined, factory.createToken(ast.SyntaxKind.BarBarToken), name)), false);
    assert.equal(ast.isNullishCoalesce(name), false);
});

test("isObjectLiteralElement includes JSX attributes as well as object spreads", () => {
    const name = factory.createIdentifier("value");
    const attribute: ast.Node = factory.createJsxAttribute(name);
    assert.ok(ast.isObjectLiteralElement(attribute));
    const narrowed: ast.ObjectLiteralElementLike | ast.JsxAttributeLike = attribute;
    assert.equal(narrowed, attribute);
    assert.ok(ast.isObjectLiteralElement(factory.createJsxSpreadAttribute(name)));
    assert.ok(ast.isObjectLiteralElement(factory.createSpreadAssignment(name)));
    assert.equal(ast.isObjectLiteralElement(factory.createPropertyDeclaration(undefined, name)), false);
});

test("isOptionalChain includes non-null continuations but rejects flagged unrelated nodes", () => {
    const name = factory.createIdentifier("value");
    const chain: ast.Node = factory.createNonNullExpression(name, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isOptionalChain(chain));
    const narrowed: ast.OptionalChain = chain;
    assert.equal(narrowed.expression, name);
    assert.ok(ast.isOptionalChain(factory.createCallExpression(name, undefined, undefined, [], ast.NodeFlags.OptionalChain)));
    assert.equal(ast.isOptionalChain(factory.createNonNullExpression(name, ast.NodeFlags.None)), false);
    const unrelated = factory.createParenthesizedExpression(name);
    Object.defineProperty(unrelated, "flags", { value: ast.NodeFlags.OptionalChain });
    assert.equal(ast.isOptionalChain(unrelated), false);
});

test("isParameterPropertyDeclaration requires both a property modifier and a constructor", () => {
    const name = factory.createIdentifier("value");
    const constructor = factory.createConstructorDeclaration(undefined, undefined, []);
    const parameter: ast.Node = factory.createParameterDeclaration([factory.createToken(ast.SyntaxKind.ReadonlyKeyword)], undefined, name);
    assert.ok(ast.isParameterPropertyDeclaration(parameter, constructor));
    const narrowed: ast.ParameterPropertyDeclaration = parameter;
    assert.equal(narrowed.name, name);
    assert.equal(ast.isParameterPropertyDeclaration(parameter, factory.createFunctionDeclaration(undefined, undefined, undefined, undefined, [])), false);
    assert.equal(ast.isParameterPropertyDeclaration(factory.createParameterDeclaration(undefined, undefined, name), constructor), false);
    assert.equal(ast.isParameterPropertyDeclaration(factory.createPropertyDeclaration(undefined, name), constructor), false);
});

test("isPropertyAccessChain includes chain continuations without their own question-dot token", () => {
    const name = factory.createIdentifier("value");
    const access: ast.Node = factory.createPropertyAccessExpression(name, undefined, name, ast.NodeFlags.OptionalChain);
    assert.ok(ast.isPropertyAccessChain(access));
    const narrowed: ast.PropertyAccessChain = access;
    assert.equal(narrowed.name, name);
    assert.equal(ast.isPropertyAccessChain(factory.createPropertyAccessExpression(name, undefined, name, ast.NodeFlags.None)), false);
    assert.equal(ast.isPropertyAccessChain(factory.createElementAccessExpression(name, undefined, name, ast.NodeFlags.OptionalChain)), false);
});

test("isPropertyAccessOrQualifiedName accepts entity names and expressions, not element access", () => {
    const name = factory.createIdentifier("value");
    const qualified: ast.Node = factory.createQualifiedName(name, name);
    assert.ok(ast.isPropertyAccessOrQualifiedName(qualified));
    const narrowed: ast.PropertyAccessExpression | ast.QualifiedName = qualified;
    assert.equal(narrowed, qualified);
    assert.ok(ast.isPropertyAccessOrQualifiedName(factory.createPropertyAccessExpression(name, undefined, name, ast.NodeFlags.None)));
    assert.equal(ast.isPropertyAccessOrQualifiedName(factory.createElementAccessExpression(name, undefined, name, ast.NodeFlags.None)), false);
});

test("isRestParameter supports syntactic rest parameters and JSDoc variadic types", () => {
    const name = factory.createIdentifier("values");
    const type = factory.createJSDocVariadicType(factory.createKeywordTypeNode(ast.SyntaxKind.StringKeyword));
    assert.ok(ast.isRestParameter(factory.createParameterDeclaration(undefined, factory.createToken(ast.SyntaxKind.DotDotDotToken), name)));
    assert.ok(ast.isRestParameter(factory.createParameterDeclaration(undefined, undefined, name, undefined, type)));
    assert.ok(ast.isRestParameter(factory.createJSDocParameterTag(factory.createIdentifier("param"), name, false, type, false, undefined)));
    assert.ok(ast.isRestParameter(factory.createJSDocParameterTag(factory.createIdentifier("param"), name, false, factory.createJSDocTypeExpression(type), false, undefined)));
    assert.equal(ast.isRestParameter(factory.createParameterDeclaration(undefined, undefined, name)), false);
    assert.equal(ast.isRestParameter(factory.createJSDocParameterTag(factory.createIdentifier("param"), name, false, undefined, false, undefined)), false);
});

test("isStringLiteralOrJsxExpression excludes template literals and full JSX elements", () => {
    const expression: ast.Node = factory.createJsxExpression();
    assert.ok(ast.isStringLiteralOrJsxExpression(expression));
    const narrowed: ast.StringLiteral | ast.JsxExpression = expression;
    assert.equal(narrowed, expression);
    assert.ok(ast.isStringLiteralOrJsxExpression(factory.createStringLiteral("text", ast.TokenFlags.None)));
    assert.equal(ast.isStringLiteralOrJsxExpression(factory.createNoSubstitutionTemplateLiteral("text", ast.TokenFlags.None)), false);
    assert.equal(ast.isStringLiteralOrJsxExpression(factory.createJsxOpeningFragment()), false);
});

test("isStringTextContainingNode includes template fragments but not template expressions", () => {
    const head: ast.Node = factory.createTemplateHead("text", "text", ast.TokenFlags.None);
    assert.ok(ast.isStringTextContainingNode(head));
    const narrowed: ast.StringLiteral | ast.TemplateLiteralToken = head;
    assert.equal(narrowed.text, "text");
    assert.ok(ast.isStringTextContainingNode(factory.createTemplateMiddle("middle", "middle", ast.TokenFlags.None)));
    assert.ok(ast.isStringTextContainingNode(factory.createTemplateTail("tail", "tail", ast.TokenFlags.None)));
    assert.ok(ast.isStringTextContainingNode(factory.createNoSubstitutionTemplateLiteral("text", ast.TokenFlags.None)));
    assert.ok(ast.isStringTextContainingNode(factory.createStringLiteral("text", ast.TokenFlags.None)));
    assert.equal(ast.isStringTextContainingNode(factory.createTemplateExpression(factory.createTemplateHead("", "", ast.TokenFlags.None), [])), false);
});

test("isTypeElement includes accessors and synthetic elisions but excludes method declarations", () => {
    const name = factory.createIdentifier("value");
    const accessor: ast.Node = factory.createGetAccessorDeclaration(undefined, name, undefined, []);
    assert.ok(ast.isTypeElement(accessor));
    const narrowed: ast.TypeElement = accessor;
    assert.equal(narrowed, accessor);
    assert.ok(ast.isTypeElement(factory.createNotEmittedTypeElement()));
    assert.ok(ast.isTypeElement(factory.createCallSignatureDeclaration(undefined, [])));
    assert.equal(ast.isTypeElement(factory.createMethodDeclaration(undefined, undefined, name, undefined, undefined, [])), false);
});

test("isClassOrTypeElement unifies class-only and type-only members", () => {
    const member: ast.Node = factory.createClassStaticBlockDeclaration(undefined, factory.createBlock([]));
    assert.ok(ast.isClassOrTypeElement(member));
    const narrowed: ast.ClassElement | ast.TypeElement = member;
    assert.equal(narrowed, member);
    assert.ok(ast.isClassOrTypeElement(factory.createCallSignatureDeclaration(undefined, [])));
    assert.equal(ast.isClassOrTypeElement(factory.createPropertyAssignment(undefined, factory.createIdentifier("value"), undefined, undefined, factory.createNumericLiteral("1", ast.TokenFlags.None))), false);
});
