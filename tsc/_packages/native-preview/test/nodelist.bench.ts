// Micro-benchmark for RemoteNodeList access patterns.
//
// Focuses on the cost of the element accessors (`list[i]`), the `.at()`
// method, and the inherited Array iteration methods (map/forEach/reduce),
// all of which walk the encoded linked list of children.
//
// Run with:
//   npm run node -- test/nodelist.bench.ts
//   npm run node -- test/nodelist.bench.ts --filter map

import {
    type Expression,
    type Path,
    type SourceFile,
    type Statement,
    SyntaxKind,
    TokenFlags,
} from "@typescript/native-preview/unstable/ast";
import {
    createArrayLiteralExpression,
    createExpressionStatement,
    createNumericLiteral,
    createSourceFile,
    createToken,
} from "@typescript/native-preview/unstable/ast/factory";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { Bench } from "tinybench";
import { encodeSourceFile } from "../src/api/node/encoder.ts";
import type { RemoteNodeList } from "../src/api/node/node.generated.ts";
import { RemoteSourceFile } from "../src/api/node/node.ts";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const { values } = parseArgs({
        options: {
            filter: { type: "string" },
            size: { type: "string", default: "500" },
        },
    });
    runBenchmarks(values);
}

function makeSourceFileWithLargeList(elementCount: number): Uint8Array {
    const elements: Expression[] = [];
    let text = "[";
    for (let i = 0; i < elementCount; i++) {
        elements.push(createNumericLiteral(String(i), TokenFlags.None));
        text += (i === 0 ? "" : ",") + i;
    }
    text += "]";
    const array = createArrayLiteralExpression(elements);
    const stmt: Statement = createExpressionStatement(array);
    const eof = createToken(SyntaxKind.EndOfFile);
    const sf: SourceFile = createSourceFile([stmt], eof, text, "/bench.ts", "/bench.ts" as Path);
    return encodeSourceFile(sf);
}

function getElementsList(data: Uint8Array): RemoteNodeList {
    const sf = new RemoteSourceFile(data, new TextDecoder());
    const stmt = (sf.statements as any).at(0);
    return stmt.expression.elements as RemoteNodeList;
}

export function runBenchmarks(options?: { filter?: string; size?: string; }): void {
    const { filter, size } = options ?? {};
    const elementCount = size ? parseInt(size, 10) : 500;

    const encoded = makeSourceFileWithLargeList(elementCount);

    // Sanity check that access works and produces the expected length.
    {
        const list = getElementsList(encoded);
        if (list.length !== elementCount) {
            throw new Error(`Expected ${elementCount} elements, got ${list.length}`);
        }
    }

    const bench = new Bench({
        name: `RemoteNodeList (${elementCount} elements)`,
        iterations: 30,
        warmupIterations: 10,
    });

    // Each task re-decodes the source file so node materialization caching
    // inside `sourceFile.nodes` does not carry over between iterations, which
    // would otherwise mask the cost of walking the list.
    bench
        .add("index access (list[i])", () => {
            const list = getElementsList(encoded);
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
                sum += list[i].pos;
            }
            if (sum < 0) throw new Error("unreachable");
        })
        .add("at(i)", () => {
            const list = getElementsList(encoded);
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
                sum += list.at(i)!.pos;
            }
            if (sum < 0) throw new Error("unreachable");
        })
        .add("for..of (iterator)", () => {
            const list = getElementsList(encoded);
            let sum = 0;
            for (const node of list) {
                sum += node.pos;
            }
            if (sum < 0) throw new Error("unreachable");
        })
        .add("map", () => {
            const list = getElementsList(encoded);
            const positions = list.map(node => node.pos);
            if (positions.length < 0) throw new Error("unreachable");
        })
        .add("filter", () => {
            const list = getElementsList(encoded);
            const filtered = list.filter(node => node.pos >= 0);
            if (filtered.length < 0) throw new Error("unreachable");
        })
        .add("forEach", () => {
            const list = getElementsList(encoded);
            let sum = 0;
            list.forEach(node => {
                sum += node.pos;
            });
            if (sum < 0) throw new Error("unreachable");
        })
        .add("reduce", () => {
            const list = getElementsList(encoded);
            const sum = list.reduce((acc, node) => acc + node.pos, 0);
            if (sum < 0) throw new Error("unreachable");
        })
        .add("forEachNode", () => {
            const list = getElementsList(encoded);
            let sum = 0;
            list.forEachNode(node => {
                sum += node.pos;
                return undefined;
            });
            if (sum < 0) throw new Error("unreachable");
        });

    if (filter) {
        const pattern = filter.toLowerCase();
        for (const task of [...bench.tasks]) {
            if (!task.name.toLowerCase().includes(pattern)) {
                bench.remove(task.name);
            }
        }
    }

    bench.runSync();
    console.table(bench.table());
}
