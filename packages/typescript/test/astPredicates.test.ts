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
