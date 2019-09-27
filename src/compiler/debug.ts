/* @internal */
namespace ts {
    export namespace Debug {
        /* eslint-disable prefer-const */
        export let currentAssertionLevel = AssertionLevel.None;
        export let isDebugging = false;
        /* eslint-enable prefer-const */

        export function shouldAssert(level: AssertionLevel): boolean {
            return currentAssertionLevel >= level;
        }

        export function assert(expression: boolean, message?: string, verboseDebugInfo?: string | (() => string), stackCrawlMark?: AnyFunction): void {
            if (!expression) {
                if (verboseDebugInfo) {
                    message += "\r\nVerbose Debug Information: " + (typeof verboseDebugInfo === "string" ? verboseDebugInfo : verboseDebugInfo());
                }
                fail(message ? "False expression: " + message : "False expression.", stackCrawlMark || assert);
            }
        }

        export function assertEqual<T>(a: T, b: T, msg?: string, msg2?: string): void {
            if (a !== b) {
                const message = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
                fail(`Expected ${a} === ${b}. ${message}`);
            }
        }

        export function assertLessThan(a: number, b: number, msg?: string): void {
            if (a >= b) {
                fail(`Expected ${a} < ${b}. ${msg || ""}`);
            }
        }

        export function assertLessThanOrEqual(a: number, b: number): void {
            if (a > b) {
                fail(`Expected ${a} <= ${b}`);
            }
        }

        export function assertGreaterThanOrEqual(a: number, b: number): void {
            if (a < b) {
                fail(`Expected ${a} >= ${b}`);
            }
        }

        export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
            debugger;
            const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
            if ((<any>Error).captureStackTrace) {
                (<any>Error).captureStackTrace(e, stackCrawlMark || fail);
            }
            throw e;
        }

        export function assertDefined<T>(value: T | null | undefined, message?: string): T {
            // eslint-disable-next-line no-null/no-null
            if (value === undefined || value === null) return fail(message);
            return value;
        }

        export function assertEachDefined<T, A extends readonly T[]>(value: A, message?: string): A {
            for (const v of value) {
                assertDefined(v, message);
            }
            return value;
        }

        export function assertNever(member: never, message = "Illegal value:", stackCrawlMark?: AnyFunction): never {
            const detail = typeof member === "object" && hasProperty(member, "kind") && hasProperty(member, "pos") && formatSyntaxKind ? "SyntaxKind: " + formatSyntaxKind((member as Node).kind) : JSON.stringify(member);
            return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
        }

        export function getFunctionName(func: AnyFunction) {
            if (typeof func !== "function") {
                return "";
            }
            else if (func.hasOwnProperty("name")) {
                return (<any>func).name;
            }
            else {
                const text = Function.prototype.toString.call(func);
                const match = /^function\s+([\w\$]+)\s*\(/.exec(text);
                return match ? match[1] : "";
            }
        }

        export function formatSymbol(symbol: Symbol): string {
            return `{ name: ${unescapeLeadingUnderscores(symbol.escapedName)}; flags: ${formatSymbolFlags(symbol.flags)}; declarations: ${map(symbol.declarations, node => formatSyntaxKind(node.kind))} }`;
        }

        /**
         * Formats an enum value as a string for debugging and debug assertions.
         */
        export function formatEnum(value = 0, enumObject: any, isFlags?: boolean) {
            const members = getEnumMembers(enumObject);
            if (value === 0) {
                return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
            }
            if (isFlags) {
                let result = "";
                let remainingFlags = value;
                for (let i = members.length - 1; i >= 0 && remainingFlags !== 0; i--) {
                    const [enumValue, enumName] = members[i];
                    if (enumValue !== 0 && (remainingFlags & enumValue) === enumValue) {
                        remainingFlags &= ~enumValue;
                        result = `${enumName}${result ? "|" : ""}${result}`;
                    }
                }
                if (remainingFlags === 0) {
                    return result;
                }
            }
            else {
                for (const [enumValue, enumName] of members) {
                    if (enumValue === value) {
                        return enumName;
                    }
                }
            }
            return value.toString();
        }

        function getEnumMembers(enumObject: any) {
            const result: [number, string][] = [];
            for (const name in enumObject) {
                const value = enumObject[name];
                if (typeof value === "number") {
                    result.push([value, name]);
                }
            }

            return stableSort<[number, string]>(result, (x, y) => compareValues(x[0], y[0]));
        }

        export function formatSyntaxKind(kind: SyntaxKind | undefined): string {
            return formatEnum(kind, (<any>ts).SyntaxKind, /*isFlags*/ false);
        }

        export function formatNodeFlags(flags: NodeFlags | undefined): string {
            return formatEnum(flags, (<any>ts).NodeFlags, /*isFlags*/ true);
        }

        export function formatModifierFlags(flags: ModifierFlags | undefined): string {
            return formatEnum(flags, (<any>ts).ModifierFlags, /*isFlags*/ true);
        }

        export function formatTransformFlags(flags: TransformFlags | undefined): string {
            return formatEnum(flags, (<any>ts).TransformFlags, /*isFlags*/ true);
        }

        export function formatEmitFlags(flags: EmitFlags | undefined): string {
            return formatEnum(flags, (<any>ts).EmitFlags, /*isFlags*/ true);
        }

        export function formatSymbolFlags(flags: SymbolFlags | undefined): string {
            return formatEnum(flags, (<any>ts).SymbolFlags, /*isFlags*/ true);
        }

        export function formatTypeFlags(flags: TypeFlags | undefined): string {
            return formatEnum(flags, (<any>ts).TypeFlags, /*isFlags*/ true);
        }

        export function formatObjectFlags(flags: ObjectFlags | undefined): string {
            return formatEnum(flags, (<any>ts).ObjectFlags, /*isFlags*/ true);
        }

        export function failBadSyntaxKind(node: Node, message?: string): never {
            return fail(
                `${message || "Unexpected node."}\r\nNode ${formatSyntaxKind(node.kind)} was unexpected.`,
                failBadSyntaxKind);
        }

        export const assertEachNode = shouldAssert(AssertionLevel.Normal)
            ? (nodes: Node[], test: (node: Node) => boolean, message?: string): void => assert(
                test === undefined || every(nodes, test),
                message || "Unexpected node.",
                () => `Node array did not pass test '${getFunctionName(test)}'.`,
                assertEachNode)
            : noop;

        export const assertNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node | undefined, test: ((node: Node | undefined) => boolean) | undefined, message?: string): void => assert(
                test === undefined || test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} did not pass test '${getFunctionName(test!)}'.`,
                assertNode)
            : noop;

        export const assertNotNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node | undefined, test: ((node: Node | undefined) => boolean) | undefined, message?: string): void => assert(
                test === undefined || !test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} should not have passed test '${getFunctionName(test!)}'.`,
                assertNode)
            : noop;

        export const assertOptionalNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, test: (node: Node) => boolean, message?: string): void => assert(
                test === undefined || node === undefined || test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} did not pass test '${getFunctionName(test)}'.`,
                assertOptionalNode)
            : noop;

        export const assertOptionalToken = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, kind: SyntaxKind, message?: string): void => assert(
                kind === undefined || node === undefined || node.kind === kind,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
                assertOptionalToken)
            : noop;

        export const assertMissingNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, message?: string): void => assert(
                node === undefined,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} was unexpected'.`,
                assertMissingNode)
            : noop;

        let isDebugInfoEnabled = false;

        /**
         * Injects debug information into frequently used types.
         */
        export function enableDebugInfo() {
            if (isDebugInfoEnabled) return;

            // Add additional properties in debug mode to assist with debugging.
            Object.defineProperties(objectAllocator.getSymbolConstructor().prototype, {
                __debugFlags: { get(this: Symbol) { return formatSymbolFlags(this.flags); } }
            });

            Object.defineProperties(objectAllocator.getTypeConstructor().prototype, {
                __debugFlags: { get(this: Type) { return formatTypeFlags(this.flags); } },
                __debugObjectFlags: { get(this: Type) { return this.flags & TypeFlags.Object ? formatObjectFlags((<ObjectType>this).objectFlags) : ""; } },
                __debugTypeToString: { value(this: Type) { return this.checker.typeToString(this); } },
            });

            const nodeConstructors = [
                objectAllocator.getNodeConstructor(),
                objectAllocator.getIdentifierConstructor(),
                objectAllocator.getTokenConstructor(),
                objectAllocator.getSourceFileConstructor()
            ];

            for (const ctor of nodeConstructors) {
                if (!ctor.prototype.hasOwnProperty("__debugKind")) {
                    Object.defineProperties(ctor.prototype, {
                        __debugKind: { get(this: Node) { return formatSyntaxKind(this.kind); } },
                        __debugNodeFlags: { get(this: Node) { return formatNodeFlags(this.flags); } },
                        __debugModifierFlags: { get(this: Node) { return formatModifierFlags(getModifierFlagsNoCache(this)); } },
                        __debugTransformFlags: { get(this: Node) { return formatTransformFlags(this.transformFlags); } },
                        __debugIsParseTreeNode: { get(this: Node) { return isParseTreeNode(this); } },
                        __debugEmitFlags: { get(this: Node) { return formatEmitFlags(getEmitFlags(this)); } },
                        __debugGetText: {
                            value(this: Node, includeTrivia?: boolean) {
                                if (nodeIsSynthesized(this)) return "";
                                const parseNode = getParseTreeNode(this);
                                const sourceFile = parseNode && getSourceFileOfNode(parseNode);
                                return sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
                            }
                        }
                    });
                }
            }

            isDebugInfoEnabled = true;
        }

        /**
         * Prints a control-flow graph for debugging purposes.
         */
        export function printControlFlowGraph(flowNode: FlowNode) {
            console.log(formatControlFlowGraph(flowNode));
        }

        export function formatControlFlowGraph(flowNode: FlowNode) {
            const hasAntecedentFlags =
                FlowFlags.Assignment |
                FlowFlags.Condition |
                FlowFlags.SwitchClause |
                FlowFlags.ArrayMutation |
                FlowFlags.Call |
                FlowFlags.PreFinally |
                FlowFlags.AfterFinally |
                FlowFlags.OptionalChain;

            type hasAntecedent =
                | FlowAssignment
                | FlowCondition
                | FlowSwitchClause
                | FlowArrayMutation
                | FlowCall
                | PreFinallyFlow
                | AfterFinallyFlow
                | FlowOptionalChain
                ;

            const flowNodes: FlowNode[] = [];
            const sharedNodes = createMap<boolean>();
            const sharedIdMap = createMap<number>();
            let nextSharedId = 1;
            trackSharedNodesInGraph(flowNode);

            const deferredFlowNodes: FlowNode[] = [];
            const writtenFlowNodes: FlowNode[] = [];
            const writer = createTextWriter("\n");
            writeFlowNode(flowNode, /*isAntecedent*/ false);

            let hasWrittenHeader = false;
            while (deferredFlowNodes.length) {
                const deferred = deferredFlowNodes.splice(0, deferredFlowNodes.length);
                for (const sharedNode of deferred) {
                    if (!hasWrittenHeader) {
                        writer.writeLine();
                        writer.rawWrite("...");
                        writer.writeLine();
                        hasWrittenHeader = true;
                    }
                    if (pushIfUnique(writtenFlowNodes, sharedNode)) {
                        writeFlowNode(sharedNode, /*isAntecedent*/ false);
                    }
                }
            }

            return writer.getText();

            function trackSharedNodesInGraph(flowNode: FlowNode) {
                if (flowNode.flags & FlowFlags.Shared) {
                    const flowId = `${getFlowId(flowNode)}`;
                    const isShared = sharedNodes.get(flowId);
                    if (isShared === undefined) {
                        sharedNodes.set(flowId, false);
                    }
                    else if (isShared === false) {
                        sharedNodes.set(flowId, true);
                    }
                }
                if (flowNode.flags & FlowFlags.Label) {
                    forEach((flowNode as FlowLabel).antecedents, trackSharedNodesInGraph);
                }
                else if (flowNode.flags & hasAntecedentFlags) {
                    trackSharedNodesInGraph((flowNode as hasAntecedent).antecedent);
                }
            }

            function getText(node: Node) {
                return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node);
            }

            function writeLines(writer: EmitTextWriter, text: string, prefix = ""): void {
                const lines = text.split(/\r\n?|\n/g);
                const indentation = guessIndentation(lines);
                for (const lineText of lines) {
                    const line = indentation ? lineText.slice(indentation) : lineText;
                    if (line.length) {
                        writer.write(prefix + line);
                        writer.writeLine();
                    }
                }
            }

            function writeNode(node: Node | undefined) {
                if (!node) return;
                writer.increaseIndent();
                writeLines(writer, getText(node), "> ");
                writer.decreaseIndent();
            }

            function getFlowId(flowNode: FlowNode) {
                let index = flowNodes.indexOf(flowNode);
                if (index === -1) {
                    index = flowNodes.length;
                    flowNodes.push(flowNode);
                }
                return index;
            }

            function getHeader(flags: FlowFlags) {
                if (flags & FlowFlags.Start) return "Start";
                if (flags & FlowFlags.BranchLabel) return "Branch";
                if (flags & FlowFlags.LoopLabel) return "Loop";
                if (flags & FlowFlags.Assignment) return "Assignment";
                if (flags & FlowFlags.TrueCondition) return "True";
                if (flags & FlowFlags.FalseCondition) return "False";
                if (flags & FlowFlags.SwitchClause) return "SwitchClause";
                if (flags & FlowFlags.ArrayMutation) return "ArrayMutation";
                if (flags & FlowFlags.Call) return "Call";
                if (flags & FlowFlags.PreFinally) return "PreFinally";
                if (flags & FlowFlags.AfterFinally) return "AfterFinally";
                if (flags & FlowFlags.Present) return "Present";
                if (flags & FlowFlags.Missing) return "Missing";
                if (flags & FlowFlags.Unreachable) return "Unreachable";
                return fail();
            }

            function writeHeader(flowNode: FlowNode, isAntecedent: boolean) {
                writer.write("- ");
                const flowId = `${getFlowId(flowNode)}`;
                if (sharedNodes.get(flowId)) {
                    let sharedId = sharedIdMap.get(flowId);
                    if (!sharedId) {
                        sharedIdMap.set(flowId, sharedId = nextSharedId);
                        nextSharedId++;
                    }
                    writer.write(`(#${sharedId}) `);
                }
                writer.write(getHeader(flowNode.flags));
                if (isAntecedent && sharedNodes.get(flowId)) {
                    writer.write("...");
                }
                else {
                    const attributes: string[] = [];
                    if (flowNode.flags & FlowFlags.PreFinally) {
                        if ((flowNode as PreFinallyFlow).lock.locked) {
                            attributes.push("locked");
                        }
                    }
                    else if (flowNode.flags & FlowFlags.AfterFinally) {
                        if ((flowNode as AfterFinallyFlow).locked) {
                            attributes.push("locked");
                        }
                    }
                    if (!(flowNode.flags & FlowFlags.Referenced)) {
                        attributes.push("unreferenced");
                    }
                    if (flowNode.flags & FlowFlags.Cached) {
                        attributes.push("cached");
                    }
                    if (some(attributes)) {
                        writer.write(`[${attributes.join(", ")}]`);
                    }
                }
                writer.writeLine();
            }

            function writeAntecedent(antecedent: FlowNode) {
                writer.increaseIndent();
                writeFlowNode(antecedent, /*isAntecedent*/ true);
                writer.decreaseIndent();
            }

            function writeAntecedents(antecedents: FlowNode[] | undefined) {
                if (antecedents) {
                    writer.increaseIndent();
                    for (const antecedent of antecedents) {
                        writeFlowNode(antecedent, /*isAntecedent*/ true);
                    }
                    writer.decreaseIndent();
                }
            }

            function writeFlowNode(flowNode: FlowNode, isAntecedent: boolean) {
                writeHeader(flowNode, isAntecedent);
                const flowId = `${getFlowId(flowNode)}`;
                if (sharedNodes.get(flowId) && isAntecedent) {
                    pushIfUnique(deferredFlowNodes, flowNode);
                }
                else if (flowNode.flags & FlowFlags.Start) {
                    writeStart(flowNode as FlowStart);
                }
                else if (flowNode.flags & FlowFlags.Label) {
                    writeLabel(flowNode as FlowLabel);
                }
                else if (flowNode.flags & FlowFlags.Assignment) {
                    writeAssignment(flowNode as FlowAssignment);
                }
                else if (flowNode.flags & FlowFlags.Condition) {
                    writeCondition(flowNode as FlowCondition);
                }
                else if (flowNode.flags & FlowFlags.SwitchClause) {
                    writeSwitchClause(flowNode as FlowSwitchClause);
                }
                else if (flowNode.flags & FlowFlags.ArrayMutation) {
                    writeArrayMutation(flowNode as FlowArrayMutation);
                }
                else if (flowNode.flags & FlowFlags.Call) {
                    writeCall(flowNode as FlowCall);
                }
                else if (flowNode.flags & FlowFlags.PreFinally) {
                    writePreFinally(flowNode as PreFinallyFlow);
                }
                else if (flowNode.flags & FlowFlags.AfterFinally) {
                    writeAfterFinally(flowNode as AfterFinallyFlow);
                }
                else if (flowNode.flags & FlowFlags.OptionalChain) {
                    writeOptionalChain(flowNode as FlowOptionalChain);
                }
                else {
                    assert(!!(flowNode.flags & FlowFlags.Unreachable));
                }
            }

            function writeStart(flowNode: FlowStart) {
                writeNode(flowNode.node);
            }

            function writeLabel(flowNode: FlowLabel) {
                writeAntecedents(flowNode.antecedents);
            }

            function writeAssignment(flowNode: FlowAssignment) {
                writeNode(flowNode.node);
                writeAntecedent(flowNode.antecedent);
            }

            function writeCondition(flowNode: FlowCondition) {
                writeNode(flowNode.node);
                writeAntecedent(flowNode.antecedent);
            }

            function writeSwitchClause(flowNode: FlowSwitchClause) {
                for (let i = flowNode.clauseStart; i < flowNode.clauseEnd; i++) {
                    writeNode(flowNode.switchStatement.caseBlock.clauses[i]);
                }
                writeAntecedent(flowNode.antecedent);
            }

            function writeArrayMutation(flowNode: FlowArrayMutation) {
                writeNode(flowNode.node);
                writeAntecedent(flowNode.antecedent);
            }

            function writeCall(flowNode: FlowCall) {
                writeNode(flowNode.node);
                writeAntecedent(flowNode.antecedent);
            }

            function writePreFinally(flowNode: PreFinallyFlow) {
                writeAntecedent(flowNode.antecedent);
            }

            function writeAfterFinally(flowNode: AfterFinallyFlow) {
                writeAntecedent(flowNode.antecedent);
            }

            function writeOptionalChain(flowNode: FlowOptionalChain) {
                writeNode(flowNode.node);
                writeAntecedent(flowNode.antecedent);
            }
        }
    }
}
