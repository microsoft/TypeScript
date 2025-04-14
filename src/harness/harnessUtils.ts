import vm from "vm";
import * as Harness from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";

export function encodeString(s: string): string {
    return Buffer.from(s).toString("utf8");
}

export function evalFile(fileContents: string, fileName: string, nodeContext?: any): void {
    if (nodeContext) {
        vm.runInNewContext(fileContents, nodeContext, fileName);
    }
    else {
        vm.runInThisContext(fileContents, fileName);
    }
}

/** Splits the given string on \r\n, or on only \n if that fails, or on only \r if *that* fails. */
export function splitContentByNewlines(content: string): string[] {
    // Split up the input file by line
    // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
    // we have to use string-based splitting instead and try to figure out the delimiting chars
    let lines = content.split("\r\n");
    if (lines.length === 1) {
        lines = content.split("\n");

        if (lines.length === 1) {
            lines = content.split("\r");
        }
    }
    return lines;
}

/** Reads a file under /tests */
export function readTestFile(path: string): string | undefined {
    if (!path.includes("tests")) {
        path = "tests/" + path;
    }

    let content: string | undefined;
    try {
        content = Harness.IO.readFile(Harness.userSpecifiedRoot + path);
    }
    catch {
        return undefined;
    }

    return content;
}

export function memoize<T extends ts.AnyFunction>(f: T, memoKey: (...anything: any[]) => string): T {
    const cache = new Map<string, any>();

    return (function (this: any, ...args: any[]) {
        const key = memoKey(...args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        else {
            const value = f.apply(this, args);
            cache.set(key, value);
            return value;
        }
    } as any);
}

export const canonicalizeForHarness: ts.GetCanonicalFileName = ts.createGetCanonicalFileName(/*useCaseSensitiveFileNames*/ false); // This is done so tests work on windows _and_ linux

export function assertInvariants(node: ts.Node | undefined, parent: ts.Node | undefined): void {
    const queue: [ts.Node | undefined, ts.Node | undefined][] = [[node, parent]];
    for (const [node, parent] of queue) {
        assertInvariantsWorker(node, parent);
    }

    function assertInvariantsWorker(node: ts.Node | undefined, parent: ts.Node | undefined): void {
        if (node) {
            assert.isFalse(node.pos < 0, "node.pos < 0");
            assert.isFalse(node.end < 0, "node.end < 0");
            assert.isFalse(node.end < node.pos, "node.end < node.pos");
            assert.equal(node.parent, parent, "node.parent !== parent");

            if (parent) {
                // Make sure each child is contained within the parent.
                assert.isFalse(node.pos < parent.pos, "node.pos < parent.pos");
                assert.isFalse(node.end > parent.end, "node.end > parent.end");
            }

            ts.forEachChild(node, child => {
                queue.push([child, node]);
            });

            // Make sure each of the children is in order.
            let currentPos = 0;
            ts.forEachChild(node, child => {
                assert.isFalse(child.pos < currentPos, "child.pos < currentPos");
                currentPos = child.end;
            }, array => {
                assert.isFalse(array.pos < node.pos, "array.pos < node.pos");
                assert.isFalse(array.end > node.end, "array.end > node.end");
                assert.isFalse(array.pos < currentPos, "array.pos < currentPos");

                for (const item of array) {
                    assert.isFalse(item.pos < currentPos, "array[i].pos < currentPos");
                    currentPos = item.end;
                }

                currentPos = array.end;
            });

            const childNodesAndArrays: any[] = [];
            ts.forEachChild(node, child => {
                childNodesAndArrays.push(child);
            }, array => {
                childNodesAndArrays.push(array);
            });

            for (const childName in node) {
                if (
                    childName === "parent" ||
                    childName === "nextContainer" ||
                    childName === "modifiers" ||
                    childName === "externalModuleIndicator" ||
                    childName === "original" ||
                    // for now ignore jsdoc comments
                    childName === "jsDocComment" ||
                    childName === "checkJsDirective" ||
                    childName === "commonJsModuleIndicator" ||
                    // ignore nodes added only to report grammar errors
                    childName === "illegalInitializer" ||
                    childName === "illegalDecorators" ||
                    childName === "illegalModifiers" ||
                    childName === "illegalQuestionToken" ||
                    childName === "illegalExclamationToken" ||
                    childName === "illegalTypeParameters" ||
                    childName === "illegalType"
                ) {
                    continue;
                }
                const child = (node as any)[childName];
                if (isNodeOrArray(child)) {
                    assert.isFalse(!childNodesAndArrays.includes(child), "Missing child when forEach'ing over node: " + ts.Debug.formatSyntaxKind(node.kind) + "-" + childName);
                }
            }
        }
    }
}

function isNodeOrArray(a: any): boolean {
    return a !== undefined && typeof a.pos === "number";
}

export function convertDiagnostics(diagnostics: readonly ts.Diagnostic[]): {
    start: number | undefined;
    length: number | undefined;
    messageText: string;
    category: string;
    code: number;
}[] {
    return diagnostics.map(convertDiagnostic);
}

function convertDiagnostic(diagnostic: ts.Diagnostic) {
    return {
        start: diagnostic.start,
        length: diagnostic.length,
        messageText: ts.flattenDiagnosticMessageText(diagnostic.messageText, Harness.IO.newLine()),
        category: ts.diagnosticCategoryName(diagnostic, /*lowerCase*/ false),
        code: diagnostic.code,
    };
}

export function sourceFileToJSON(file: ts.Node): string {
    return JSON.stringify(file, (_, v) => isNodeOrArray(v) ? serializeNode(v) : v, "    ");

    function getKindName(k: number | string | undefined): string | undefined {
        if (k === undefined || ts.isString(k)) {
            return k;
        }
        return ts.Debug.formatSyntaxKind(k);
    }

    function getNodeFlagName(f: number) {
        return ts.Debug.formatNodeFlags(f);
    }

    function serializeNode(n: ts.Node): any {
        const o: any = { kind: getKindName(n.kind) };
        if (ts.containsParseError(n)) {
            o.containsParseError = true;
        }

        for (const propertyName of Object.getOwnPropertyNames(n) as readonly (keyof ts.SourceFile | keyof ts.Identifier | keyof ts.StringLiteral)[]) {
            switch (propertyName) {
                case "parent":
                case "symbol":
                case "locals":
                case "localSymbol":
                case "kind":
                case "id":
                case "nodeCount":
                case "symbolCount":
                case "identifierCount":
                case "scriptSnapshot":
                case "emitNode":
                    // Blocklist of items we never put in the baseline file.
                    break;

                case "hasExtendedUnicodeEscape":
                    if ((n as any).hasExtendedUnicodeEscape) {
                        o.hasExtendedUnicodeEscape = true;
                    }
                    break;

                case "flags":
                    // Clear the flags that are produced by aggregating child values. That is ephemeral
                    // data we don't care about in the dump. We only care what the parser set directly
                    // on the AST.
                    let flags = n.flags & ~(ts.NodeFlags.JavaScriptFile | ts.NodeFlags.HasAggregatedChildData);
                    if (ts.isIdentifier(n)) {
                        if (flags & ts.NodeFlags.IdentifierHasExtendedUnicodeEscape) {
                            o.hasExtendedUnicodeEscape = true;
                            flags &= ~ts.NodeFlags.IdentifierHasExtendedUnicodeEscape;
                        }
                    }
                    if (flags) {
                        o[propertyName] = getNodeFlagName(flags);
                    }
                    break;

                case "parseDiagnostics":
                    o[propertyName] = convertDiagnostics((n as any)[propertyName]);
                    break;

                case "nextContainer":
                    if ((n as ts.HasLocals).nextContainer) {
                        o[propertyName] = { kind: (n as ts.HasLocals).nextContainer!.kind, pos: (n as ts.HasLocals).nextContainer!.pos, end: (n as ts.HasLocals).nextContainer!.end };
                    }
                    break;

                case "text":
                    // Include 'text' field for identifiers/literals, but not for source files.
                    if (n.kind !== ts.SyntaxKind.SourceFile) {
                        o[propertyName] = (n as any)[propertyName];
                    }
                    break;

                default:
                    o[propertyName] = (n as any)[propertyName];
            }
        }

        return o;
    }
}

export function assertDiagnosticsEquals(array1: readonly ts.Diagnostic[], array2: readonly ts.Diagnostic[]): void {
    if (array1 === array2) {
        return;
    }

    assert(array1, "array1");
    assert(array2, "array2");

    assert.equal(array1.length, array2.length, "array1.length !== array2.length");

    for (let i = 0; i < array1.length; i++) {
        const d1 = array1[i];
        const d2 = array2[i];

        assert.equal(d1.start, d2.start, "d1.start !== d2.start");
        assert.equal(d1.length, d2.length, "d1.length !== d2.length");
        assert.equal(
            ts.flattenDiagnosticMessageText(d1.messageText, Harness.IO.newLine()),
            ts.flattenDiagnosticMessageText(d2.messageText, Harness.IO.newLine()),
            "d1.messageText !== d2.messageText",
        );
        assert.equal(d1.category, d2.category, "d1.category !== d2.category");
        assert.equal(d1.code, d2.code, "d1.code !== d2.code");
    }
}

export function assertStructuralEquals(node1: ts.Node, node2: ts.Node): void {
    if (node1 === node2) {
        return;
    }

    assert(node1, "node1");
    assert(node2, "node2");
    assert.equal(node1.pos, node2.pos, "node1.pos !== node2.pos");
    assert.equal(node1.end, node2.end, "node1.end !== node2.end");
    assert.equal(node1.kind, node2.kind, "node1.kind !== node2.kind");

    // call this on both nodes to ensure all propagated flags have been set (and thus can be
    // compared).
    assert.equal(ts.containsParseError(node1), ts.containsParseError(node2));
    assert.equal(node1.flags & ~ts.NodeFlags.ReachabilityAndEmitFlags, node2.flags & ~ts.NodeFlags.ReachabilityAndEmitFlags, "node1.flags !== node2.flags");

    ts.forEachChild(node1, child1 => {
        const childName = findChildName(node1, child1);
        const child2: ts.Node = (node2 as any)[childName];

        assertStructuralEquals(child1, child2);
    }, array1 => {
        const childName = findChildName(node1, array1);
        const array2: ts.NodeArray<ts.Node> = (node2 as any)[childName];

        assertArrayStructuralEquals(array1, array2);
    });
}

function assertArrayStructuralEquals(array1: ts.NodeArray<ts.Node>, array2: ts.NodeArray<ts.Node>) {
    if (array1 === array2) {
        return;
    }

    assert(array1, "array1");
    assert(array2, "array2");
    assert.equal(array1.pos, array2.pos, "array1.pos !== array2.pos");
    assert.equal(array1.end, array2.end, "array1.end !== array2.end");
    assert.equal(array1.length, array2.length, "array1.length !== array2.length");

    for (let i = 0; i < array1.length; i++) {
        assertStructuralEquals(array1[i], array2[i]);
    }
}

function findChildName(parent: any, child: any) {
    for (const name in parent) {
        if (ts.hasProperty(parent, name) && parent[name] === child) {
            return name;
        }
    }

    throw new Error("Could not find child in parent");
}

const maxHarnessFrames = 1;

export function filterStack(error: Error, stackTraceLimit: number = Infinity): Error {
    const stack = (error as any).stack as string;
    if (stack) {
        const lines = stack.split(/\r\n?|\n/);
        const filtered: string[] = [];
        let frameCount = 0;
        let harnessFrameCount = 0;
        for (let line of lines) {
            if (isStackFrame(line)) {
                if (
                    frameCount >= stackTraceLimit
                    || isMocha(line)
                    || isNode(line)
                ) {
                    continue;
                }

                if (isHarness(line)) {
                    if (harnessFrameCount >= maxHarnessFrames) {
                        continue;
                    }

                    harnessFrameCount++;
                }

                line = line.replace(/\bfile:\/\/\/(.*?)(?=(?::\d+)*(?:$|\)))/, (_, path) => ts.sys.resolvePath(path));
                frameCount++;
            }

            filtered.push(line);
        }

        (error as any).stack = filtered.join(Harness.IO.newLine());
    }

    return error;
}

function isStackFrame(line: string) {
    return /^\s+at\s/.test(line);
}

function isMocha(line: string) {
    return /[\\/](?:node_modules|components)[\\/]mocha(?:js)?[\\/]|[\\/]mocha\.js/.test(line);
}

function isNode(line: string) {
    return /\((?:timers|events|node|module)\.js:/.test(line);
}

function isHarness(line: string) {
    return /[\\/]src[\\/]harness[\\/]|[\\/]run\.js/.test(line);
}
