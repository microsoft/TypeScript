import type {
    ExpressionStatement,
    Identifier,
    JSDoc,
    Node,
    NodeArray,
    SourceFile,
    StringLiteralLikeNode,
    VariableStatement,
} from "@typescript/typescript/unstable/ast";
import {
    getTokenAtPosition,
    isClassDeclaration,
    isImportDeclaration,
    isInterfaceDeclaration,
    isJSDocLink,
    isNamedImports,
    isValidTypeOnlyAliasUseSite,
    NodeFlags,
    SyntaxKind,
    TokenFlags,
} from "@typescript/typescript/unstable/ast";
import {
    getSynthesizedDeepClone,
    getSynthesizedDeepClones,
} from "@typescript/typescript/unstable/ast/clone";
import {
    cloneNode,
    createBinaryExpression,
    createBlock,
    createExpressionStatement,
    createIdentifier,
    createIfStatement,
    createNodeArray,
    createNumericLiteral,
    createSourceFile,
    createStringLiteral,
    createToken,
    NodeObject,
} from "@typescript/typescript/unstable/ast/factory";
import {
    visitEachChild,
    visitNode,
    visitNodes,
} from "@typescript/typescript/unstable/ast/visitor";
import { createVirtualFileSystem } from "@typescript/typescript/unstable/fs";
import { API } from "@typescript/typescript/unstable/sync";
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
// Type-only import use sites
// ---------------------------------------------------------------------------

describe("isValidTypeOnlyAliasUseSite", () => {
    test("classifies syntactic type-only import use sites", () => {
        const source = `
type TypeUse = TypeOnlyName;
const valueUse = ValueName;
const shorthandUse = { ShorthandName };
interface InterfaceUse extends InterfaceBase {}
class ImplementsUse implements ImplementsBase {}
class ExtendsUse extends ExtendsBase {}
abstract class AbstractComputed {
    abstract [AbstractKey](): void;
}
interface InterfaceComputed {
    [InterfaceKey]: string;
}
type TypeQueryUse = typeof TypeQueryName;
/** @link JSDocLinkBase#JSDocLinkMember */
class JSDocLinkUse {}
/** @augments JSDocAugmentsBase */
class JSDocAugmentsUse {}
`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
        });
        try {
            const sourceFile = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const tokenAt = (text: string) => getTokenAtPosition(sourceFile, source.indexOf(text));

            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("TypeOnlyName")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("ValueName")), false);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("ShorthandName")), false);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("InterfaceBase")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("ImplementsBase")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("ExtendsBase")), false);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("AbstractKey")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("InterfaceKey")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("TypeQueryName")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("JSDocLinkBase")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("JSDocLinkMember")), true);
            assert.equal(isValidTypeOnlyAliasUseSite(tokenAt("JSDocAugmentsBase")), true);
        }
        finally {
            api.close();
        }
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
        tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsc${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}

function getRemoteSourceFile(api: API, configPath: string, filePath: string) {
    const snapshot = api.updateSnapshot({ openProject: configPath });
    const project = snapshot.getProject(configPath)!;
    return project.program.getSourceFile(filePath)!;
}

describe("RemoteNode + cloneNode", () => {
    test("does not read a sibling as an invalid JSDoc link name", () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `/**
 * {@link #toggled} property
 */
export const x = 1;`,
        });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const jsDoc = sf.statements[0].jsDoc?.[0] as JSDoc | undefined;
            assert.ok(jsDoc?.kind === SyntaxKind.JSDoc);
            const comment = jsDoc.comment;
            assert.ok(typeof comment !== "string");
            const link = comment?.[1];
            assert.ok(link && isJSDocLink(link));
            assert.strictEqual(link.name, undefined);
        }
        finally {
            api.close();
        }
    });

    test("uses distinct nodes for expression and type heritage", () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/heritage.ts": `
class C extends Base<number> implements Contract<string> {}
interface I extends Parent<boolean> {}
`,
        });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/heritage.ts");
            const classDecl = sf.statements[0];
            const interfaceDecl = sf.statements[1];
            assert.ok(isClassDeclaration(classDecl));
            assert.ok(isInterfaceDeclaration(interfaceDecl));
            assert.strictEqual(classDecl.heritageClauses?.[0].types[0].kind, SyntaxKind.ExpressionWithTypeArguments);
            assert.strictEqual(classDecl.heritageClauses?.[1].types[0].kind, SyntaxKind.TypeReference);
            assert.strictEqual(interfaceDecl.heritageClauses?.[0].types[0].kind, SyntaxKind.TypeReference);
        }
        finally {
            api.close();
        }
    });

    test("cloneNode produces a NodeObject from a RemoteNode", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/foo.ts");
            const clone = cloneNode(sf);
            assert.notStrictEqual(clone, sf);
            assert.ok(clone instanceof NodeObject);
            assert.strictEqual(clone.statements, sf.statements);
            assert.strictEqual(clone.text, sf.text);
            assert.strictEqual(clone.fileName, sf.fileName);
            assert.strictEqual(clone.path, sf.path);
            assert.strictEqual(clone.scriptKind, sf.scriptKind);
            assert.strictEqual(clone.languageVariant, sf.languageVariant);
            assert.strictEqual(clone.isDeclarationFile, sf.isDeclarationFile);
            assert.strictEqual(clone.referencedFiles, sf.referencedFiles);
            assert.strictEqual(clone.typeReferenceDirectives, sf.typeReferenceDirectives);
            assert.strictEqual(clone.libReferenceDirectives, sf.libReferenceDirectives);
            assert.strictEqual(clone.imports, sf.imports);
            assert.strictEqual(clone.moduleAugmentations, sf.moduleAugmentations);
            assert.strictEqual(clone.ambientModuleNames, sf.ambientModuleNames);
            assert.strictEqual(clone.externalModuleIndicator, sf.externalModuleIndicator);

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

describe("RemoteNodeList inherited array methods", () => {
    test("filter/map/slice return plain arrays without throwing", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/index.ts");
            const statements = sf.statements;
            assert.strictEqual(statements.length, 2);

            // These inherited Array methods previously threw
            // "this.view.getUint32 is not a function" via ArraySpeciesCreate.
            const filtered = statements.filter(() => true);
            assert.ok(Array.isArray(filtered));
            assert.strictEqual(Object.getPrototypeOf(filtered), Array.prototype);
            assert.strictEqual(filtered.length, 2);
            assert.strictEqual(filtered[0], statements[0]);

            const mapped = statements.map(s => s.kind);
            assert.ok(Array.isArray(mapped));
            assert.strictEqual(Object.getPrototypeOf(mapped), Array.prototype);
            assert.deepStrictEqual(mapped, [statements[0].kind, statements[1].kind]);

            const sliced = statements.slice(1);
            assert.ok(Array.isArray(sliced));
            assert.strictEqual(Object.getPrototypeOf(sliced), Array.prototype);
            assert.strictEqual(sliced.length, 1);
            assert.strictEqual(sliced[0], statements[1]);
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

    test("deep clone of remote SourceFile preserves top-level metadata references", () => {
        const api = spawnAPI();
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/foo.ts");
            const referencedFiles = sf.referencedFiles;
            const typeReferenceDirectives = sf.typeReferenceDirectives;
            const libReferenceDirectives = sf.libReferenceDirectives;
            const imports = sf.imports;
            const moduleAugmentations = sf.moduleAugmentations;
            const ambientModuleNames = sf.ambientModuleNames;

            const clone = getSynthesizedDeepClone(sf);

            assert.notStrictEqual(clone, sf);
            assert.strictEqual(clone.referencedFiles, referencedFiles);
            assert.strictEqual(clone.typeReferenceDirectives, typeReferenceDirectives);
            assert.strictEqual(clone.libReferenceDirectives, libReferenceDirectives);
            assert.strictEqual(clone.imports, imports);
            assert.strictEqual(clone.moduleAugmentations, moduleAugmentations);
            assert.strictEqual(clone.ambientModuleNames, ambientModuleNames);
            assert.strictEqual(clone.externalModuleIndicator, sf.externalModuleIndicator);
            assert.strictEqual(clone.originalText, sf.originalText);
            assert.strictEqual(clone.spanMap, sf.spanMap);
            assert.strictEqual(clone.contentMapper, sf.contentMapper);
            assert.strictEqual(clone.virtualFileName, sf.virtualFileName);
            assert.strictEqual(clone.diagnosticDirectives, sf.diagnosticDirectives);
            assert.strictEqual(clone.supplementalSourceFileNames, sf.supplementalSourceFileNames);
            assert.strictEqual(clone.canonicalSourceFileName, sf.canonicalSourceFileName);
        }
        finally {
            api.close();
        }
    });
});

// ---------------------------------------------------------------------------
// RemoteNode: position and text getters
// ---------------------------------------------------------------------------

// Relationships that must hold between the position/text getters on any node.
function assertGetterInvariants(node: Node, sf: SourceFile) {
    const fullStart = node.getFullStart();
    const start = node.getStart(sf);
    const end = node.getEnd();

    assert.strictEqual(fullStart, node.pos);
    assert.strictEqual(end, node.end);
    assert.ok(start >= fullStart, `getStart (${start}) must be >= getFullStart (${fullStart})`);
    assert.ok(end >= start, `getEnd (${end}) must be >= getStart (${start})`);

    assert.strictEqual(node.getFullWidth(), end - fullStart);
    assert.strictEqual(node.getWidth(sf), end - start);
    assert.strictEqual(node.getLeadingTriviaWidth(sf), start - fullStart);

    const fullText = node.getFullText(sf);
    const text = node.getText(sf);
    assert.strictEqual(fullText.length, node.getFullWidth());
    assert.strictEqual(text, fullText.slice(node.getLeadingTriviaWidth(sf)));

    // No-argument variants resolve the source file themselves and must agree.
    assert.strictEqual(node.getStart(), start);
    assert.strictEqual(node.getFullText(), fullText);
    assert.strictEqual(node.getText(), text);

    node.forEachChild(child => {
        assertGetterInvariants(child, sf);
        return undefined;
    });
}

describe("RemoteNode + position/text getters", () => {
    const source = "/* lead */ const value = 123;";
    const files = {
        "/tsconfig.json": "{}",
        "/src/getters.ts": source,
    };

    test("position and text getters on a parsed statement", () => {
        const api = spawnAPI(files);
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/getters.ts");
            const stmt = sf.statements[0];
            assert.ok(stmt);

            const tokenStart = source.indexOf("const");

            // Full start includes leading trivia; start skips it.
            assert.strictEqual(stmt.getFullStart(), 0);
            assert.strictEqual(stmt.getStart(), tokenStart);
            assert.strictEqual(stmt.getStart(sf), tokenStart);
            assert.strictEqual(stmt.getLeadingTriviaWidth(), tokenStart);

            // End and widths.
            assert.strictEqual(stmt.getEnd(), source.length);
            assert.strictEqual(stmt.getFullWidth(), source.length);
            assert.strictEqual(stmt.getWidth(), source.length - tokenStart);

            // Text slices, with and without leading trivia.
            assert.strictEqual(stmt.getFullText(), source);
            assert.strictEqual(stmt.getText(), source.slice(tokenStart));
        }
        finally {
            api.close();
        }
    });

    test("getText/getFullText on a nested node", () => {
        const api = spawnAPI(files);
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/getters.ts");
            const stmt = sf.statements[0] as VariableStatement;
            const name = stmt.declarationList.declarations[0].name;

            assert.strictEqual(name.getText(), "value");
            // getFullText keeps the leading whitespace trivia before the identifier.
            assert.strictEqual(name.getFullText().trimStart(), "value");
            assert.ok(name.getFullText().endsWith("value"));
        }
        finally {
            api.close();
        }
    });

    test("getStart can include leading JSDoc comments", () => {
        const docSource = "/** doc */\nfunction f() {}\n";
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/doc.ts": docSource,
        });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/doc.ts");
            const fn = sf.statements[0];
            assert.ok(fn);

            // By default the JSDoc comment is treated as leading trivia and skipped.
            assert.strictEqual(fn.getStart(), docSource.indexOf("function"));

            // With includeJsDocComment, the start moves back to the JSDoc comment.
            assert.ok(fn.jsDoc && fn.jsDoc.length > 0, "function declaration should have attached JSDoc");
            assert.strictEqual(fn.getStart(sf, /*includeJsDocComment*/ true), 0);
        }
        finally {
            api.close();
        }
    });

    test("a node without leading trivia has zero leading trivia width", () => {
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/plain.ts": "const x = 1;\n" });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/plain.ts");
            const stmt = sf.statements[0];
            assert.ok(stmt);

            assert.strictEqual(stmt.getFullStart(), 0);
            assert.strictEqual(stmt.getStart(), 0);
            assert.strictEqual(stmt.getLeadingTriviaWidth(), 0);
            assert.strictEqual(stmt.getText(), "const x = 1;");
            assert.strictEqual(stmt.getText(), stmt.getFullText());
        }
        finally {
            api.close();
        }
    });

    test("the SourceFile node spans the whole file text", () => {
        const text = "/* head */ const y = 2;\n";
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/whole.ts": text });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/whole.ts");

            assert.strictEqual(sf.getFullStart(), 0);
            assert.strictEqual(sf.getFullText(), sf.text);
            assert.strictEqual(sf.getEnd(), sf.text.length);
            // getStart skips the file's leading comment trivia.
            assert.strictEqual(sf.getStart(), text.indexOf("const"));
        }
        finally {
            api.close();
        }
    });

    test("getter invariants hold for every node in a representative tree", () => {
        const treeSource = [
            `import { foo } from "./foo";`,
            ``,
            `/** docs */`,
            `export function add(a: number, b: number): number {`,
            `    // body comment`,
            `    return a + b;`,
            `}`,
            ``,
            `const obj = { x: 1, y: "two" };`,
            ``,
        ].join("\n");
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/tree.ts": treeSource });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/tree.ts");
            assertGetterInvariants(sf, sf);
        }
        finally {
            api.close();
        }
    });

    test("getter invariants hold even for malformed source with missing nodes", () => {
        // Error recovery produces zero-width / missing nodes; the getters must
        // still satisfy their invariants and must not throw.
        const malformed = "const a = b +;\nfunction (";
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/broken.ts": malformed });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/broken.ts");
            assertGetterInvariants(sf, sf);
        }
        finally {
            api.close();
        }
    });
});

// ---------------------------------------------------------------------------
// RemoteNode: child/token getters
// ---------------------------------------------------------------------------

describe("RemoteNode + child/token getters", () => {
    function withFirstStatement(source: string, fn: (stmt: Node, sf: SourceFile) => void) {
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/children.ts": source });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/children.ts");
            fn(sf.statements[0], sf);
        }
        finally {
            api.close();
        }
    }

    function findFirstOfKind(node: Node, kind: SyntaxKind): Node | undefined {
        let found: Node | undefined;
        const walk = (n: Node): undefined => {
            if (found) return;
            if (n.kind === kind) {
                found = n;
                return;
            }
            n.forEachChild(walk);
        };
        walk(node);
        return found;
    }

    test("getChildren materializes the punctuation/keyword tokens the AST omits", () => {
        withFirstStatement("if (x) {}", stmt => {
            const texts = stmt.getChildren().map(c => c.getText());
            assert.deepStrictEqual(texts, ["if", "(", "x", ")", "{}"]);
        });
    });

    test("getChildCount and getChildAt agree with getChildren", () => {
        withFirstStatement("if (x) {}", stmt => {
            const children = stmt.getChildren();
            assert.strictEqual(stmt.getChildCount(), children.length);
            for (let i = 0; i < children.length; i++) {
                assert.strictEqual(stmt.getChildAt(i), children[i]);
            }
        });
    });

    test("getFirstToken and getLastToken descend to the edge tokens", () => {
        withFirstStatement("if (x) {}", stmt => {
            assert.strictEqual(stmt.getFirstToken()?.getText(), "if");
            assert.strictEqual(stmt.getLastToken()?.getText(), "}");
        });
    });

    test("a token node has no children and no first/last token", () => {
        withFirstStatement("if (x) {}", stmt => {
            const ifToken = stmt.getFirstToken()!;
            assert.strictEqual(ifToken.getChildCount(), 0);
            assert.deepStrictEqual(ifToken.getChildren(), []);
            assert.strictEqual(ifToken.getFirstToken(), undefined);
            assert.strictEqual(ifToken.getLastToken(), undefined);
        });
    });

    test("NodeArrays are wrapped in a SyntaxList that holds the elements and separators", () => {
        withFirstStatement("[1, 2, 3];", stmt => {
            const arr = findFirstOfKind(stmt, SyntaxKind.ArrayLiteralExpression)!;
            assert.ok(arr, "expected an array literal");
            const list = arr.getChildren().find(c => c.kind === SyntaxKind.SyntaxList);
            assert.ok(list, "array literal children should include a SyntaxList");
            assert.deepStrictEqual(list!.getChildren().map(c => c.getText()), ["1", ",", "2", ",", "3"]);
        });
    });

    test("getChildren tiles [pos, end) contiguously, absorbing interior trivia into tokens", () => {
        // The interior comment must be absorbed into a token's leading trivia, not dropped.
        withFirstStatement("const a = /* c */ 1;", (stmt, sf) => {
            const children = stmt.getChildren();
            assert.ok(children.length > 0);
            assert.strictEqual(children[0].pos, stmt.pos);
            assert.strictEqual(children[children.length - 1].end, stmt.end);
            for (let i = 1; i < children.length; i++) {
                assert.strictEqual(children[i].pos, children[i - 1].end, "children must be contiguous");
            }
            assert.strictEqual(children.map(c => c.getFullText(sf)).join(""), stmt.getFullText(sf));
        });
    });

    test("a JSDoc comment is exposed as the first child", () => {
        // Per tsc, the JSDoc is both its own child node and the leading trivia of the first token.
        withFirstStatement("/** doc */\nfunction f() {}", stmt => {
            const first = stmt.getChildren()[0];
            assert.strictEqual(first.kind, SyntaxKind.JSDoc);
            assert.strictEqual(first.getText().trim(), "/** doc */");
        });
    });

    test("getChildren throws on a synthesized node without a real position", () => {
        const synthesized = createBlock([]); // a non-token node with pos/end === -1
        assert.throws(() => synthesized.getChildren(), /real position/);
    });

    test("the else keyword is materialized as a synthetic token", () => {
        withFirstStatement("if (a) {} else {}", stmt => {
            const texts = stmt.getChildren().map(c => c.getText());
            assert.ok(texts.includes("else"), `expected an 'else' token, got ${JSON.stringify(texts)}`);
        });
    });

    test("getFirstToken skips leading JSDoc and returns the first real token", () => {
        withFirstStatement("/** d */ export function f() {}", stmt => {
            const first = stmt.getFirstToken()!;
            assert.ok(
                first.kind < SyntaxKind.FirstJSDocNode || first.kind > SyntaxKind.LastJSDocNode,
                "getFirstToken should skip the JSDoc node",
            );
            assert.strictEqual(first.getText(), "export");
        });
    });

    test("SourceFile children are the statements SyntaxList and the EndOfFile token", () => {
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/eof.ts": "const x = 1;\n" });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/eof.ts");
            const children = sf.getChildren();
            assert.ok(children.some(c => c.kind === SyntaxKind.SyntaxList), "should contain a statements SyntaxList");
            assert.strictEqual(children[children.length - 1].kind, SyntaxKind.EndOfFile);
            assert.strictEqual(sf.getLastToken()?.kind, SyntaxKind.EndOfFile);
        }
        finally {
            api.close();
        }
    });

    test("getChildren is cached: repeat calls return the same array", () => {
        withFirstStatement("const x = 1;", stmt => {
            assert.strictEqual(stmt.getChildren(), stmt.getChildren());
        });
    });

    test("getChildren on an EndOfFile token carrying JSDoc is cached", () => {
        // A trailing orphan JSDoc attaches to the EndOfFile token; remote nodes rebuild
        // .jsDoc on every access, so this only holds if the EndOfFile branch is cached too.
        const api = spawnAPI({ "/tsconfig.json": "{}", "/src/eof.ts": "const x = 1;\n/** orphan */" });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", "/src/eof.ts");
            const eof = sf.getLastToken()!;
            assert.strictEqual(eof.kind, SyntaxKind.EndOfFile);
            const children = eof.getChildren(sf);
            assert.strictEqual(children.length, 1);
            assert.strictEqual(children[0].kind, SyntaxKind.JSDoc);
            assert.strictEqual(eof.getChildren(sf), children, "EndOfFile children should be cached");
            assert.strictEqual(eof.getChildAt(0, sf), children[0]);
        }
        finally {
            api.close();
        }
    });

    const isJsDocKind = (n: Node) => n.kind >= SyntaxKind.FirstJSDocNode && n.kind <= SyntaxKind.LastJSDocNode;

    // Recursively asserts getChildren's invariants at every node: count/at agreement, caching,
    // first/last token correctness, and contiguous tiling of [pos, end).
    function assertChildInvariants(root: Node, sf: SourceFile): void {
        const visit = (node: Node): void => {
            const children = node.getChildren(sf);

            // Reparsed subtrees (JSDoc types materialized into the AST) must never surface:
            // their positions point inside the comment, not into the parent's token range.
            for (const child of children) {
                assert.ok(!(child.flags & NodeFlags.Reparsed), `reparsed child leaked (kind ${child.kind} in kind ${node.kind})`);
            }

            assert.strictEqual(node.getChildCount(sf), children.length);
            for (let i = 0; i < children.length; i++) {
                assert.strictEqual(node.getChildAt(i, sf), children[i]);
            }
            assert.strictEqual(node.getChildAt(children.length, sf), undefined);
            assert.strictEqual(node.getChildren(sf), children, "getChildren should be cached");

            // JSDoc nodes don't synthesize tokens, so the token/tiling invariants don't apply.
            if (children.length > 0 && !isJsDocKind(node)) {
                // first/last token can be undefined when an edge child is an empty list (e.g. an
                // empty `case` clause) — same as tsc; when defined they must be aligned tokens.
                const first = node.getFirstToken(sf);
                const last = node.getLastToken(sf);
                if (first) {
                    assert.ok(first.kind < SyntaxKind.FirstNode, `getFirstToken must be a token (kind ${node.kind})`);
                    assert.strictEqual(first.getStart(sf), node.getStart(sf), `firstToken start mismatch (kind ${node.kind})`);
                }
                if (last) {
                    assert.ok(last.kind < SyntaxKind.FirstNode, `getLastToken must be a token (kind ${node.kind})`);
                    assert.strictEqual(last.end, node.end, `lastToken end mismatch (kind ${node.kind})`);
                }

                assert.strictEqual(children[0].pos, node.pos, `first child pos mismatch (kind ${node.kind})`);
                assert.strictEqual(children[children.length - 1].end, node.end, `last child end mismatch (kind ${node.kind})`);
                for (let i = 1; i < children.length; i++) {
                    if (isJsDocKind(children[i - 1])) continue;
                    assert.strictEqual(children[i].pos, children[i - 1].end, `gap/overlap between children (kind ${node.kind})`);
                }
            }

            for (const child of children) {
                if (!isJsDocKind(child)) {
                    visit(child);
                }
            }
        };
        visit(root);
    }

    function checkSource(source: string, opts?: { jsx?: boolean; js?: boolean; }): void {
        const ext = opts?.js ? (opts?.jsx ? "jsx" : "js") : opts?.jsx ? "tsx" : "ts";
        const tsconfig = opts?.js ? `{ "compilerOptions": { "allowJs": true, "checkJs": true, "jsx": "react-jsx" } }`
            : opts?.jsx ? `{ "compilerOptions": { "jsx": "react-jsx" } }`
            : "{}";
        const api = spawnAPI({ "/tsconfig.json": tsconfig, [`/src/c.${ext}`]: source });
        try {
            const sf = getRemoteSourceFile(api, "/tsconfig.json", `/src/c.${ext}`);
            assertChildInvariants(sf, sf);
        }
        finally {
            api.close();
        }
    }

    test("structural invariants hold recursively across a rich tree", () => {
        checkSource([
            "/** docs */",
            "export function greet(name: string, count = 1): string {",
            "    const parts: string[] = [];",
            "    for (let i = 0; i < count; i++) {",
            "        parts.push(`hi ${name}`);",
            "    }",
            "    if (parts.length) {",
            '        return parts.join(", ");',
            "    }",
            "    else {",
            '        return "none";',
            "    }",
            "}",
            "",
        ].join("\n"));
    });

    // Representative constructs, each exercising a distinct structural path of getChildren
    // (token synthesis, SyntaxList wrapping, empty lists, decorator lists, JSDoc, JSX, nesting).
    const corpus: Array<{ name: string; source: string; jsx?: boolean; js?: boolean; }> = [
        { name: "variable declarations", source: "const a = 1; let b: number = 2; var c, d = 3;" },
        { name: "function with optional, default and rest params", source: "function f(a: number, b?: string, c = 1, ...d: any[]): void {}" },
        { name: "class with members", source: "class C { x = 1; #y = 2; static s = 3; readonly r: string; constructor(public p: number) {} m() {} get g() { return 1; } set v(x) {} static {} }" },
        { name: "class with decorators", source: "@dec class C { @prop x = 1; @meth() m(@param p: number) {} accessor a = 1; }" },
        { name: "interface with signature members", source: "interface I extends A, B { x: number; y?: string; readonly z: boolean; (a: number): void; new (): I; [k: string]: any; m(p: number): void; }" },
        { name: "generics with constraints and defaults", source: "function f<T extends object, U = T, const V>(x: T): U { return x as any; }\nclass C<T extends keyof U, U> {}" },
        { name: "enums", source: "enum E { A, B = 2, C = A | B } const enum CE { X = 'x', Y = 'y' }" },
        { name: "import declarations", source: "import d from 'a';\nimport { x, y as z } from 'b';\nimport * as ns from 'c';\nimport type { T } from 'd';\nimport 'e';\nimport def, { named } from 'f';" },
        { name: "if/else chains", source: "if (a) { x(); } else if (b) { y(); } else { z(); }" },
        { name: "for variants", source: "for (let i = 0; i < n; i++) {} for (const k in o) {} for (const v of a) {} for (;;) { break; }" },
        { name: "switch with an empty case clause", source: "switch (x) { case 1: y(); break; case 2: case 3: z(); default: w(); }" },
        { name: "object literal with all member kinds", source: "const o = { a: 1, b, [c]: 2, ...d, m() {}, get g() { return 1; }, set s(v) {}, async am() {}, *gm() {} };" },
        { name: "tagged and nested template literals", source: "const r = tag`a${b}c${`inner${d}`}e`;" },
        { name: "comments and jsdoc with tags", source: "// line\n/* block */\n/**\n * @param a the a\n * @returns nothing\n */\nfunction f(a: number) {} // trailing" },
        { name: "empty constructs", source: "function f() {} class C {} interface I {} enum E {} { } ; namespace N {}" },
        { name: "JSX element with attributes and children", source: 'const e = <div id="a" className={cls} {...rest}>hello {name}<Child /></div>;', jsx: true },
        // Reparsed JSDoc types in .js files must not surface as children: their positions
        // point inside the comment, not into the parent's token range. Each entry stresses a
        // different reparse shape (single nodes, whole NodeArrays, mixed arrays, statements).
        { name: "JS with reparsed @param/@returns types", source: "/**\n * @param {number} a the a\n * @returns {string} something\n */\nfunction f(a) { return String(a); }\n", js: true },
        { name: "JS with @type, @template and reparsed type parameters", source: "/** @type {number} */\nconst n = 1;\n/**\n * @template T\n * @param {T} x\n */\nfunction id(x) { return x; }\n", js: true },
        { name: "JS with optional, default and rest @param variants", source: "/**\n * @param {number} [a]\n * @param {string} [b=\"x\"]\n * @param {...number} rest\n */\nfunction f(a, b, ...rest) {}\n", js: true },
        { name: "JS with a @type cast on a parenthesized expression", source: "function g() { return 1; }\nconst x = /** @type {number} */ (g());\n", js: true },
        { name: "JS with @typedef and @property hoisted into statements", source: "/**\n * @typedef {Object} Pt\n * @property {number} x\n * @property {number} y\n */\nconst p = { x: 1, y: 2 };\n", js: true },
        { name: "JS with @callback", source: "/**\n * @callback Cb\n * @param {number} n\n * @returns {void}\n */\nlet cb;\n", js: true },
        { name: "JS with constrained and multiple @template tags", source: "/**\n * @template {object} T\n * @template U\n * @param {T} a\n * @param {U} b\n */\nfunction pair(a, b) { return [a, b]; }\n", js: true },
        { name: "JS with @this inserted into the parameter list", source: "/**\n * @this {object}\n * @param {number} n\n */\nfunction handler(n) { return this; }\n", js: true },
        { name: "JS class with @extends type arguments and member tags", source: "class Base {}\n/** @extends {Base} */\nclass C extends Base {\n    /** @param {number} v */\n    constructor(v) { super(); this.v = v; }\n    /** @returns {number} */\n    get value() { return this.v; }\n}\n", js: true },
        { name: "JS with @enum", source: "/** @enum {number} */\nconst E = { A: 1, B: 2 };\n", js: true },
        { name: "JS with trailing orphan @typedef attached to EndOfFile", source: "let x = 1;\n/** @typedef {number} N */", js: true },
        { name: "JS with @satisfies", source: "/** @satisfies {{ a: number }} */\nconst o = { a: 1 };\n", js: true },
        { name: "JS with @import declaration", source: "/** @import { T } from \"./t\" */\n/** @type {number} */\nlet v = 1;\n", js: true },
        { name: "JS with reparsed types on exported and nested functions", source: "/** @param {number} a */\nexport function outer(a) {\n    /** @returns {number} */\n    function inner() { return a; }\n    return inner();\n}\n", js: true },
        { name: "JSX component with reparsed @param props type", source: "/**\n * @param {{ name: string }} props\n * @returns {object}\n */\nexport function Greeting(props) {\n    return <div className=\"greeting\">hello {props.name}<br /></div>;\n}\n", js: true, jsx: true },
        { name: "JSX with @type cast and @typedef around elements", source: "/**\n * @typedef {Object} Item\n * @property {string} label\n */\nconst item = /** @type {Item} */ ({ label: \"x\" });\nconst el = <span title={item.label}>{item.label}</span>;\n", js: true, jsx: true },
    ];

    for (const entry of corpus) {
        test(`invariants: ${entry.name}`, () => {
            checkSource(entry.source, { jsx: entry.jsx ?? false, js: entry.js ?? false });
        });
    }
});
