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
