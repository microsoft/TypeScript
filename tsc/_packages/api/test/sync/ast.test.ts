import { createVirtualFileSystem } from "@typescript/api/fs";
import { API } from "@typescript/api/sync";
import type {
    ExpressionStatement,
    Identifier,
    Node,
    NodeArray,
    StringLiteralLikeNode,
} from "@typescript/ast";
import {
    isImportDeclaration,
    isNamedImports,
    SyntaxKind,
    TokenFlags,
} from "@typescript/ast";
import {
    getSynthesizedDeepClone,
    getSynthesizedDeepClones,
} from "@typescript/ast/clone";
import {
    cloneNode,
    createBinaryExpression,
    createBlock,
    createExpressionStatement,
    createIdentifier,
    createIfStatement,
    createNodeArray,
    createNumericLiteral,
    createStringLiteral,
    createToken,
    NodeObject,
} from "@typescript/ast/factory";
import {
    visitEachChild,
    visitNode,
    visitNodes,
} from "@typescript/ast/visitor";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function collectKinds(node: Node): SyntaxKind[] {
    const kinds: SyntaxKind[] = [node.kind];
    node.forEachChild(child => {
        kinds.push(...collectKinds(child));
        return undefined;
    });
    return kinds;
}

// ---------------------------------------------------------------------------
// cloneNode
// ---------------------------------------------------------------------------

describe("cloneNode", () => {
    test("clones an identifier", () => {
        const id = createIdentifier("hello");
        const clone = cloneNode(id);

        assert.notStrictEqual(clone, id);
        assert.strictEqual(clone.kind, SyntaxKind.Identifier);
        assert.strictEqual(clone.text, "hello");
    });

    test("clones a numeric literal", () => {
        const num = createNumericLiteral("42", TokenFlags.None);
        const clone = cloneNode(num);

        assert.notStrictEqual(clone, num);
        assert.strictEqual(clone.kind, SyntaxKind.NumericLiteral);
        assert.strictEqual(clone.text, "42");
        assert.strictEqual(clone.tokenFlags, TokenFlags.None);
    });

    test("clones a string literal", () => {
        const str = createStringLiteral("world", TokenFlags.None);
        const clone = cloneNode(str);

        assert.notStrictEqual(clone, str);
        assert.strictEqual(clone.kind, SyntaxKind.StringLiteral);
        assert.strictEqual(clone.text, "world");
    });

    test("preserves text range", () => {
        // Synthesized nodes start at pos=-1,end=-1; verify clone preserves them
        const id = createIdentifier("x");
        const clone = cloneNode(id);

        assert.strictEqual(clone.pos, id.pos);
        assert.strictEqual(clone.end, id.end);
    });

    test("clone is shallow (children are shared)", () => {
        const left = createIdentifier("a");
        const right = createIdentifier("b");
        const op = createToken(SyntaxKind.PlusToken);
        const bin = createBinaryExpression(undefined, left, undefined, op, right);
        const clone = cloneNode(bin);

        assert.notStrictEqual(clone, bin);
        assert.strictEqual(clone.left, bin.left);
        assert.strictEqual(clone.right, bin.right);
        assert.strictEqual(clone.operatorToken, bin.operatorToken);
    });

    test("clone has no parent", () => {
        const id = createIdentifier("x");
        const clone = cloneNode(id);
        assert.strictEqual(clone.parent, undefined);
    });

    test("clones a token", () => {
        const tok = createToken(SyntaxKind.SemicolonToken);
        const clone = cloneNode(tok);

        assert.notStrictEqual(clone, tok);
        assert.strictEqual(clone.kind, SyntaxKind.SemicolonToken);
    });
});

// ---------------------------------------------------------------------------
// visitNode / visitNodes
// ---------------------------------------------------------------------------

describe("visitNode", () => {
    test("returns undefined for undefined input", () => {
        const nothing: Node | undefined = undefined;
        const result = visitNode(nothing, () => undefined);
        assert.strictEqual(result, undefined);
    });

    test("returns visitor result", () => {
        const id = createIdentifier("x");
        const replacement = createIdentifier("y");
        const result = visitNode(id, () => replacement);
        assert.strictEqual(result, replacement);
    });

    test("visitor can return undefined to remove node", () => {
        const id = createIdentifier("x");
        const result = visitNode(id, () => undefined);
        assert.strictEqual(result, undefined);
    });
});

describe("visitNodes", () => {
    test("returns undefined for undefined input", () => {
        const nothing: NodeArray<Node> | undefined = undefined;
        const result = visitNodes(nothing, () => undefined);
        assert.strictEqual(result, undefined);
    });

    test("returns same array if nothing changed", () => {
        const a = createIdentifier("a");
        const b = createIdentifier("b");
        const arr = createNodeArray([a, b]);
        const result = visitNodes(arr, node => node);
        assert.strictEqual(result, arr);
    });

    test("filters out undefined results", () => {
        const a = createIdentifier("a");
        const b = createIdentifier("b");
        const arr = createNodeArray([a, b]);
        const result = visitNodes(arr, node => {
            if (node === a) return undefined;
            return node;
        });
        assert.strictEqual(result.length, 1);
    });

    test("replaces nodes", () => {
        const a = createIdentifier("a");
        const b = createIdentifier("b");
        const c = createIdentifier("c");
        const arr = createNodeArray([a, b]);
        const result = visitNodes(arr, node => {
            if (node === a) return c;
            return node;
        });
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result.at(0), c);
        assert.strictEqual(result.at(1), b);
    });
});

// ---------------------------------------------------------------------------
// visitEachChild
// ---------------------------------------------------------------------------

describe("visitEachChild", () => {
    test("returns same node if nothing changed (identity visitor)", () => {
        const left = createIdentifier("a");
        const right = createIdentifier("b");
        const op = createToken(SyntaxKind.PlusToken);
        const bin = createBinaryExpression(undefined, left, undefined, op, right);

        const result = visitEachChild(bin, node => node);
        assert.strictEqual(result, bin);
    });

    test("returns undefined for undefined input", () => {
        const nothing: Node | undefined = undefined;
        const result = visitEachChild(nothing, node => node);
        assert.strictEqual(result, undefined);
    });

    test("creates new node when child changes", () => {
        const left = createIdentifier("a");
        const right = createIdentifier("b");
        const op = createToken(SyntaxKind.PlusToken);
        const bin = createBinaryExpression(undefined, left, undefined, op, right);

        const newRight = createIdentifier("c");
        const result = visitEachChild(bin, node => {
            if (node === right) return newRight;
            return node;
        });

        assert.notStrictEqual(result, bin);
        assert.strictEqual(result.kind, SyntaxKind.BinaryExpression);
        assert.strictEqual(result.left, left);
        assert.strictEqual(result.right, newRight);
    });

    test("works on if statement with optional else", () => {
        const cond = createIdentifier("ok");
        const thenBranch = createBlock([]);
        const ifStmt = createIfStatement(cond, thenBranch, undefined);

        const newCond = createIdentifier("notOk");
        const result = visitEachChild(ifStmt, node => {
            if (node === cond) return newCond;
            return node;
        });

        assert.notStrictEqual(result, ifStmt);
        assert.strictEqual(result.expression, newCond);
        assert.strictEqual(result.thenStatement, thenBranch);
        assert.strictEqual(result.elseStatement, undefined);
    });

    test("works on nodes with NodeArray children", () => {
        const stmtA = createExpressionStatement(createIdentifier("a"));
        const stmtB = createExpressionStatement(createIdentifier("b"));
        const block = createBlock([stmtA, stmtB]);

        const stmtC = createExpressionStatement(createIdentifier("c"));
        const result = visitEachChild(block, node => {
            // visitEachChild visits immediate children (the expression statements)
            if (node === stmtA) return stmtC;
            return node;
        });

        assert.notStrictEqual(result, block);
        assert.strictEqual(result.kind, SyntaxKind.Block);
        assert.strictEqual(result.statements.length, 2);
        assert.strictEqual(result.statements.at(0), stmtC);
        assert.strictEqual(result.statements.at(1), stmtB);
    });

    test("returns same node for leaf nodes", () => {
        const id = createIdentifier("x");
        const result = visitEachChild(id, () => {
            throw new Error("should not be called for leaf node");
        });
        // Identifier has no children, so visitor shouldn't be called
        assert.strictEqual(result, id);
    });
});

// ---------------------------------------------------------------------------
// getSynthesizedDeepClone
// ---------------------------------------------------------------------------

describe("getSynthesizedDeepClone", () => {
    test("deeply clones identifier", () => {
        const id = createIdentifier("hello");
        const clone = getSynthesizedDeepClone(id);

        assert.notStrictEqual(clone, id);
        assert.strictEqual(clone.kind, SyntaxKind.Identifier);
        assert.strictEqual(clone.text, "hello");
    });

    test("deeply clones identifier without trivia", () => {
        const id = createIdentifier("hello");
        const clone = getSynthesizedDeepClone(id, /*includeTrivia*/ false);

        assert.strictEqual(clone.kind, SyntaxKind.Identifier);
        assert.strictEqual(clone.text, "hello");
        assert.strictEqual(clone.pos, -1);
        assert.strictEqual(clone.end, -1);
    });

    test("deeply clones binary expression", () => {
        const left = createIdentifier("a");
        const right = createNumericLiteral("42", TokenFlags.None);
        const op = createToken(SyntaxKind.PlusToken);
        const bin = createBinaryExpression(undefined, left, undefined, op, right);

        const clone = getSynthesizedDeepClone(bin);

        // Root is different object
        assert.notStrictEqual(clone, bin);
        assert.strictEqual(clone.kind, SyntaxKind.BinaryExpression);

        // Children are also different objects (deep clone)
        assert.notStrictEqual(clone.left, left);
        assert.strictEqual(clone.left.kind, SyntaxKind.Identifier);
        assert.strictEqual((clone.left as Identifier).text, "a");

        assert.notStrictEqual(clone.right, right);
        assert.strictEqual(clone.right.kind, SyntaxKind.NumericLiteral);
        assert.strictEqual((clone.right as Identifier).text, "42");

        assert.notStrictEqual(clone.operatorToken, op);
        assert.strictEqual(clone.operatorToken.kind, SyntaxKind.PlusToken);
    });

    test("sets parent pointers on deep clone", () => {
        const left = createIdentifier("a");
        const right = createIdentifier("b");
        const op = createToken(SyntaxKind.PlusToken);
        const bin = createBinaryExpression(undefined, left, undefined, op, right);

        const clone = getSynthesizedDeepClone(bin);

        assert.strictEqual(clone.left.parent, clone);
        assert.strictEqual(clone.right.parent, clone);
        assert.strictEqual(clone.operatorToken.parent, clone);
    });

    test("returns undefined for undefined input", () => {
        const result = getSynthesizedDeepClone(undefined);
        assert.strictEqual(result, undefined);
    });

    test("deeply clones if statement with optional else", () => {
        const cond = createIdentifier("ok");
        const thenBlock = createBlock([]);
        const ifStmt = createIfStatement(cond, thenBlock, undefined);

        const clone = getSynthesizedDeepClone(ifStmt);

        assert.notStrictEqual(clone, ifStmt);
        assert.strictEqual(clone.kind, SyntaxKind.IfStatement);
        assert.notStrictEqual(clone.expression, cond);
        assert.strictEqual(clone.expression.kind, SyntaxKind.Identifier);
        assert.notStrictEqual(clone.thenStatement, thenBlock);
        assert.strictEqual(clone.thenStatement.kind, SyntaxKind.Block);
        assert.strictEqual(clone.elseStatement, undefined);
    });

    test("preserves tree structure with nested children", () => {
        const a = createIdentifier("a");
        const b = createIdentifier("b");
        const stmts = [
            createExpressionStatement(a),
            createExpressionStatement(b),
        ];
        const block = createBlock(stmts);

        const clone = getSynthesizedDeepClone(block);

        assert.notStrictEqual(clone, block);
        assert.strictEqual(clone.statements.length, 2);

        const cloneStmt0 = clone.statements.at(0)!;
        const cloneStmt1 = clone.statements.at(1)!;
        assert.notStrictEqual(cloneStmt0, stmts[0]);
        assert.notStrictEqual(cloneStmt1, stmts[1]);
        assert.strictEqual(cloneStmt0.kind, SyntaxKind.ExpressionStatement);
        assert.strictEqual(cloneStmt1.kind, SyntaxKind.ExpressionStatement);
    });

    test("deeply clones string literal", () => {
        const str = createStringLiteral("test", TokenFlags.None);
        const clone = getSynthesizedDeepClone(str);
        assert.notStrictEqual(clone, str);
        assert.strictEqual(clone.kind, SyntaxKind.StringLiteral);
        assert.strictEqual(clone.text, "test");
    });

    test("deeply clones numeric literal", () => {
        const num = createNumericLiteral("3.14", TokenFlags.None);
        const clone = getSynthesizedDeepClone(num);
        assert.notStrictEqual(clone, num);
        assert.strictEqual(clone.kind, SyntaxKind.NumericLiteral);
        assert.strictEqual(clone.text, "3.14");
    });

    test("clone has same syntax structure", () => {
        const left = createIdentifier("x");
        const right = createNumericLiteral("1", TokenFlags.None);
        const op = createToken(SyntaxKind.PlusToken);
        const bin = createBinaryExpression(undefined, left, undefined, op, right);
        const stmt = createExpressionStatement(bin);

        const clone = getSynthesizedDeepClone(stmt);
        assert.deepStrictEqual(collectKinds(clone), collectKinds(stmt));
    });
});

// ---------------------------------------------------------------------------
// getSynthesizedDeepClones (NodeArray)
// ---------------------------------------------------------------------------

describe("getSynthesizedDeepClones", () => {
    test("deeply clones a NodeArray", () => {
        const a = createIdentifier("a");
        const b = createIdentifier("b");
        const arr = createNodeArray([a, b]);

        const clone = getSynthesizedDeepClones(arr);

        assert.notStrictEqual(clone, arr);
        assert.strictEqual(clone.length, 2);
        assert.notStrictEqual(clone.at(0), a);
        assert.notStrictEqual(clone.at(1), b);
        assert.strictEqual(clone.at(0)!.kind, SyntaxKind.Identifier);
        assert.strictEqual(clone.at(1)!.kind, SyntaxKind.Identifier);
    });

    test("returns undefined for undefined input", () => {
        const result = getSynthesizedDeepClones(undefined);
        assert.strictEqual(result, undefined);
    });

    test("preserves pos and end on NodeArray", () => {
        const a = createIdentifier("a");
        const arr = createNodeArray([a], 5, 10);

        const clone = getSynthesizedDeepClones(arr);
        assert.strictEqual(clone.pos, 5);
        assert.strictEqual(clone.end, 10);
    });
});

// ---------------------------------------------------------------------------
// Integration: visitor transformation
// ---------------------------------------------------------------------------

describe("visitor transformation", () => {
    test("rename all identifiers via recursive visitor", () => {
        const a = createIdentifier("oldName");
        const b = createIdentifier("oldName");
        const stmtA = createExpressionStatement(a);
        const stmtB = createExpressionStatement(b);
        const block = createBlock([stmtA, stmtB]);

        // Use a recursive visitor to rename identifiers at any depth
        function renameVisitor(node: Node): Node {
            if (node.kind === SyntaxKind.Identifier && (node as Identifier).text === "oldName") {
                return createIdentifier("newName");
            }
            return visitEachChild(node, renameVisitor);
        }
        const result = visitEachChild(block, renameVisitor);

        assert.notStrictEqual(result, block);
        const stmt0 = result.statements.at(0)! as ExpressionStatement;
        assert.strictEqual((stmt0.expression as Identifier).text, "newName");
        const stmt1 = result.statements.at(1)! as ExpressionStatement;
        assert.strictEqual((stmt1.expression as Identifier).text, "newName");
    });

    test("deep clone + modify produces independent tree", () => {
        const id = createIdentifier("original");
        const stmt = createExpressionStatement(id);
        const block = createBlock([stmt]);

        // Deep clone
        const cloned = getSynthesizedDeepClone(block);

        // Modify original using recursive visitor
        function modVisitor(node: Node): Node {
            if (node.kind === SyntaxKind.Identifier) return createIdentifier("modified");
            return visitEachChild(node, modVisitor);
        }
        const modified = visitEachChild(block, modVisitor);

        // Cloned tree should be untouched
        const clonedStmt = cloned.statements.at(0)! as ExpressionStatement;
        assert.strictEqual((clonedStmt.expression as Identifier).text, "original");

        // Modified tree should have new name
        const modifiedStmt = modified.statements.at(0)! as ExpressionStatement;
        assert.strictEqual((modifiedStmt.expression as Identifier).text, "modified");
    });
});

// ---------------------------------------------------------------------------
// RemoteNode: cloneNode, visitEachChild, getSynthesizedDeepClone
// ---------------------------------------------------------------------------

function spawnAPI(files: Record<string, string> = {
    "/tsconfig.json": "{}",
    "/src/index.ts": `import { foo } from './foo';\nconst x = foo + 1;\n`,
    "/src/foo.ts": `export const foo = 42;`,
}) {
    return new API({
        cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
        tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}

function getRemoteSourceFile(api: API, configPath: string, filePath: string) {
    const snapshot = api.updateSnapshot({ openProject: configPath });
    const project = snapshot.getProject(configPath)!;
    return project.program.getSourceFile(filePath)!;
}

describe("RemoteNode + cloneNode", () => {
    test("cloneNode produces a NodeObject from a RemoteNode", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/foo.ts");
            const clone = cloneNode(sf);
            assert.notStrictEqual(clone, sf);
            assert.ok(clone instanceof NodeObject);
            assert.strictEqual(clone.statements, sf.statements);

            assert.strictEqual(clone.kind, sf.kind);
            assert.strictEqual(clone.pos, sf.pos);
            assert.strictEqual(clone.end, sf.end);
        }
        finally {
            api.close();
        }
    });

    test("cloneNode clones a remote import declaration", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const importDecl = sf.statements[0];
            assert.ok(isImportDeclaration(importDecl));

            const clone = cloneNode(importDecl);
            assert.notStrictEqual(clone, importDecl);
            assert.strictEqual(clone.kind, SyntaxKind.ImportDeclaration);
            // moduleSpecifier should be the same reference (shallow clone)
            assert.ok(clone.moduleSpecifier);
        }
        finally {
            api.close();
        }
    });

    test("cloneNode preserves text on remote identifier", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const importDecl = sf.statements[0];
            assert.ok(isImportDeclaration(importDecl));
            const named = importDecl.importClause?.namedBindings;
            assert.ok(named && isNamedImports(named));
            const fooName = named.elements[0].name;

            const clone = cloneNode(fooName);
            assert.strictEqual(clone.kind, SyntaxKind.Identifier);
            assert.strictEqual((clone as Identifier).text, "foo");
        }
        finally {
            api.close();
        }
    });
});

describe("RemoteNode + visitEachChild", () => {
    test("identity visitor returns same remote node", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/foo.ts");
            const firstStmt = sf.statements[0];
            assert.ok(firstStmt);

            // visitEachChild with identity should return the same node
            const result = visitEachChild(firstStmt, node => node);
            assert.strictEqual(result, firstStmt);
        }
        finally {
            api.close();
        }
    });

    test("visitor can transform remote tree into NodeObject tree", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const importDecl = sf.statements[0];
            assert.ok(isImportDeclaration(importDecl));

            // Replace the module specifier with a new string literal
            const result = visitEachChild(importDecl, node => {
                if (node.kind === SyntaxKind.StringLiteral) {
                    return createStringLiteral("./bar", TokenFlags.None);
                }
                return node;
            });

            assert.notStrictEqual(result, importDecl);
            assert.strictEqual(result.kind, SyntaxKind.ImportDeclaration);
            assert.strictEqual((result.moduleSpecifier as StringLiteralLikeNode).text, "./bar");
        }
        finally {
            api.close();
        }
    });
});

describe("RemoteNode + getSynthesizedDeepClone", () => {
    test("deep clones a remote import declaration", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const importDecl = sf.statements[0];
            assert.ok(isImportDeclaration(importDecl));

            const clone = getSynthesizedDeepClone(importDecl);

            assert.notStrictEqual(clone, importDecl);
            assert.strictEqual(clone.kind, SyntaxKind.ImportDeclaration);
            // Deep clone — children should be different objects
            assert.notStrictEqual(clone.moduleSpecifier, importDecl.moduleSpecifier);
            assert.strictEqual(clone.moduleSpecifier.kind, SyntaxKind.StringLiteral);
        }
        finally {
            api.close();
        }
    });

    test("deep clone of remote tree produces independent NodeObject tree", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/foo.ts");
            const firstStmt = sf.statements[0];
            assert.ok(firstStmt);

            const clone = getSynthesizedDeepClone(firstStmt);

            // Clone should have all the same kinds as the original
            assert.deepStrictEqual(collectKinds(clone), collectKinds(firstStmt));

            // But be entirely separate objects
            clone.forEachChild(function visit(node) {
                assert.ok(node instanceof NodeObject);
                node.forEachChild(visit);
            });
        }
        finally {
            api.close();
        }
    });
});
