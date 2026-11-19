import * as ast from "@typescript/typescript/ast";
import * as factory from "@typescript/typescript/ast/factory";
import assert from "node:assert/strict";
import { test } from "node:test";

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
