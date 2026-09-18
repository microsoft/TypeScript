// Benchmarks Node.childrenIter against Node.forEachChild for local factory nodes
// and RemoteNodes fetched through the sync API.
//
// Run with:
//   npm run node -- test/sync/ast.bench.ts
//   npm run node -- test/sync/ast.bench.ts --filter "remote recursive"

import type {
    Block,
    Identifier,
    Node,
} from "@typescript/typescript/unstable/ast";
import {
    isBlock,
    isIdentifier,
} from "@typescript/typescript/unstable/ast";
import {
    createBlock,
    createExpressionStatement,
    createIdentifier,
    createIfStatement,
} from "@typescript/typescript/unstable/ast/factory";
import { createVirtualFileSystem } from "@typescript/typescript/unstable/fs";
import { API } from "@typescript/typescript/unstable/sync";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { Bench } from "tinybench";

const treeDepth = 5;
const expressionsPerBlock = 6;
const earlyTargetName = "earlyTargetIdentifier";
const midpointTargetName = "midpointTargetIdentifier";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const { values } = parseArgs({
        options: {
            filter: { type: "string" },
            singleIteration: { type: "boolean", default: false },
        },
    });
    runBenchmarks(values);
}

interface Tree {
    node: Block;
    source: string;
}

function createTree(depth = treeDepth, path = "root"): Tree {
    const statements = [];
    const sourceStatements: string[] = [];
    for (let i = 0; i < expressionsPerBlock; i++) {
        const name = path === "root" && i === 0
            ? earlyTargetName
            : path === "root_1" && i === 0
            ? midpointTargetName
            : `value_${path}_${i}`;
        statements.push(createExpressionStatement(createIdentifier(name)));
        sourceStatements.push(`${name};`);
    }

    if (depth > 0) {
        const thenTree = createTree(depth - 1, `${path}_0`);
        const elseTree = createTree(depth - 1, `${path}_1`);
        const conditionName = `condition_${path}`;
        statements.push(createIfStatement(
            createIdentifier(conditionName),
            thenTree.node,
            elseTree.node,
        ));
        sourceStatements.push(`if (${conditionName}) ${thenTree.source} else ${elseTree.source}`);
    }

    return {
        node: createBlock(statements),
        source: `{${sourceStatements.join("\n")}}`,
    };
}

function collectWithForEachChild(node: Node): Node[] {
    const children: Node[] = [];
    node.forEachChild(child => {
        children.push(child);
        return undefined;
    });
    return children;
}

function collectWithChildrenIter(node: Node): Node[] {
    const children: Node[] = [];
    for (const child of node.childrenIter()) {
        children.push(child);
    }
    return children;
}

function walkWithForEachChild(node: Node): number {
    let count = 1;
    node.forEachChild(child => {
        count += walkWithForEachChild(child);
    });
    return count;
}

function walkWithChildrenIter(node: Node): number {
    let count = 1;
    for (const child of node.childrenIter()) {
        count += walkWithChildrenIter(child);
    }
    return count;
}

function findWithForEachChild(node: Node, targetName: string): Identifier | undefined {
    return node.forEachChild(child => {
        if (isIdentifier(child) && child.text === targetName) return child;
        return findWithForEachChild(child, targetName);
    });
}

function findWithChildrenIter(node: Node, targetName: string): Identifier | undefined {
    for (const child of node.childrenIter()) {
        if (isIdentifier(child) && child.text === targetName) return child;
        const result = findWithChildrenIter(child, targetName);
        if (result) return result;
    }
    return undefined;
}

export function runBenchmarks(options?: { filter?: string; singleIteration?: boolean; }): void {
    const { filter, singleIteration } = options ?? {};
    const localTree = createTree();
    const repoRoot = fileURLToPath(new URL("../../../../", import.meta.url).toString());
    const configPath = "/tsconfig.json";
    const sourcePath = "/src/bench.ts";
    using api = new API({
        cwd: repoRoot,
        tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsc${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs: createVirtualFileSystem({
            [configPath]: "{}",
            [sourcePath]: localTree.source,
        }),
    });

    const snapshot = api.createSnapshot({ openProject: configPath });
    const remoteSourceFile = snapshot.getConfiguredProject(configPath)!.program.getSourceFile(sourcePath)!;
    assert.ok(remoteSourceFile.statements);
    const remoteTree = remoteSourceFile.statements[0];
    assert.ok(isBlock(remoteTree));

    assert.deepStrictEqual(
        collectWithChildrenIter(localTree.node).map(node => node.kind),
        collectWithForEachChild(localTree.node).map(node => node.kind),
    );
    assert.strictEqual(walkWithChildrenIter(localTree.node), walkWithForEachChild(localTree.node));
    assert.strictEqual(walkWithChildrenIter(remoteTree), walkWithForEachChild(remoteTree));
    assert.strictEqual(walkWithChildrenIter(localTree.node), walkWithChildrenIter(remoteTree));
    for (const targetName of [earlyTargetName, midpointTargetName]) {
        assert.strictEqual(findWithChildrenIter(localTree.node, targetName)?.text, targetName);
        assert.strictEqual(findWithForEachChild(remoteTree, targetName)?.text, targetName);
    }

    const bench = new Bench({
        name: "AST child traversal",
        iterations: 30,
        warmupIterations: 10,
        ...singleIteration ? {
            iterations: 1,
            warmup: false,
            time: 0,
        } : undefined,
    });
    const isAsync = false;

    for (const [nodeType, node] of [["factory", localTree.node], ["remote", remoteTree]] as const) {
        bench
            .add(`${nodeType} immediate children - forEachChild`, () => {
                assert.strictEqual(collectWithForEachChild(node).length, node.statements.length);
            }, { async: isAsync })
            .add(`${nodeType} immediate children - childrenIter`, () => {
                assert.strictEqual(collectWithChildrenIter(node).length, node.statements.length);
            }, { async: isAsync })
            .add(`${nodeType} recursive walk - forEachChild`, () => {
                assert.ok(walkWithForEachChild(node) > 1);
            }, { async: isAsync })
            .add(`${nodeType} recursive walk - childrenIter`, () => {
                assert.ok(walkWithChildrenIter(node) > 1);
            }, { async: isAsync })
            .add(`${nodeType} recursive early exit - forEachChild`, () => {
                assert.strictEqual(findWithForEachChild(node, earlyTargetName)?.text, earlyTargetName);
            }, { async: isAsync })
            .add(`${nodeType} recursive early exit - childrenIter`, () => {
                assert.strictEqual(findWithChildrenIter(node, earlyTargetName)?.text, earlyTargetName);
            }, { async: isAsync })
            .add(`${nodeType} recursive midpoint exit - forEachChild`, () => {
                assert.strictEqual(findWithForEachChild(node, midpointTargetName)?.text, midpointTargetName);
            }, { async: isAsync })
            .add(`${nodeType} recursive midpoint exit - childrenIter`, () => {
                assert.strictEqual(findWithChildrenIter(node, midpointTargetName)?.text, midpointTargetName);
            }, { async: isAsync });
    }

    if (filter) {
        const pattern = filter.toLowerCase();
        for (const task of [...bench.tasks]) {
            if (!task.name.toLowerCase().includes(pattern)) {
                bench.remove(task.name);
            }
        }
    }

    bench.runSync();
    for (const task of bench.tasks) {
        if (task.result && "error" in task.result) throw task.result.error;
    }
    console.table(bench.table());
}
