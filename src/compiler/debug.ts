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

            Object.defineProperties(objectAllocator.getFlowNodeConstructor().prototype, {
                __debugFlowFlags: { get(this: FlowNode) { return formatEnum(this.flags, (ts as any).FlowFlags, /*isFlags*/ true); } },
                __debugToString: { value(this: FlowNode) { return `\n${formatControlFlowGraph(this)}\n`; } }
            });

            isDebugInfoEnabled = true;
        }

        /**
         * Prints a control-flow graph for debugging purposes.
         */
        export function printControlFlowGraph(flowNode: FlowNode) {
            console.log(formatControlFlowGraph(flowNode));
        }

        let nextDebugFlowId = -1;

        function getDebugFlowNodeId(f: FlowNode) {
            if (!f.id) {
                f.id = nextDebugFlowId;
                nextDebugFlowId--;
            }
            return f.id;
        }

        export function formatControlFlowGraph(flowNode: FlowNode) {
            const enum BoxCharacter {
                lr = "─",
                ud = "│",
                dr = "╭",
                dl = "╮",
                ul = "╯",
                ur = "╰",
                udr = "├",
                udl = "┤",
                dlr = "┬",
                ulr = "┴",
                udlr = "┼",
            }

            const enum Connection {
                Up = 1 << 0,
                Down = 1 << 1,
                Left = 1 << 2,
                Right = 1 << 3,

                UpDown = Up | Down,
                LeftRight = Left | Right,
                UpLeft = Up | Left,
                UpRight = Up | Right,
                DownLeft = Down | Left,
                DownRight = Down | Right,
                UpDownLeft = UpDown | Left,
                UpDownRight = UpDown | Right,
                UpLeftRight = Up | LeftRight,
                DownLeftRight = Down | LeftRight,
                UpDownLeftRight = UpDown | LeftRight,

                NoChildren = 1 << 4,
            }

            interface FlowGraphNode {
                id: number;
                flowNode: FlowNode;
                edges: FlowGraphEdge[];
                text: string;
                lane: number;
                endLane: number;
                level: number;
            }

            interface FlowGraphEdge {
                source: FlowGraphNode;
                target: FlowGraphNode;
            }

            const hasAntecedentFlags =
                FlowFlags.Assignment |
                FlowFlags.Condition |
                FlowFlags.SwitchClause |
                FlowFlags.ArrayMutation |
                FlowFlags.Call |
                FlowFlags.PreFinally |
                FlowFlags.AfterFinally;

            const hasNodeFlags =
                FlowFlags.Start |
                FlowFlags.Assignment |
                FlowFlags.Call |
                FlowFlags.Condition |
                FlowFlags.ArrayMutation;

            const links: Record<number, FlowGraphNode> = Object.create(/*o*/ null); // eslint-disable-line no-null/no-null
            const nodes: FlowGraphNode[] = [];
            const edges: FlowGraphEdge[] = [];
            const root = buildGraphNode(flowNode);
            for (const node of nodes) {
                computeLevel(node);
            }

            const height = computeHeight(root);
            const columnWidths = computeColumnWidths(height);
            computeLanes(root, 0);
            return renderGraph();

            function isFlowSwitchClause(f: FlowNode): f is FlowSwitchClause {
                return !!(f.flags & FlowFlags.SwitchClause);
            }

            function hasAntecedents(f: FlowNode): f is FlowLabel & { antecedents: FlowNode[] } {
                return !!(f.flags & FlowFlags.Label) && !!(f as FlowLabel).antecedents;
            }

            function hasAntecedent(f: FlowNode): f is Extract<FlowNode, { antecedent: FlowNode }> {
                return !!(f.flags & hasAntecedentFlags);
            }

            function hasNode(f: FlowNode): f is Extract<FlowNode, { node?: Node }> {
                return !!(f.flags & hasNodeFlags);
            }

            function getChildren(node: FlowGraphNode) {
                const children: FlowGraphNode[] = [];
                for (const edge of node.edges) {
                    if (edge.source === node) {
                        children.push(edge.target);
                    }
                }
                return children;
            }

            function getParents(node: FlowGraphNode) {
                const parents: FlowGraphNode[] = [];
                for (const edge of node.edges) {
                    if (edge.target === node) {
                        parents.push(edge.source);
                    }
                }
                return parents;
            }

            function buildGraphNode(flowNode: FlowNode) {
                const id = getDebugFlowNodeId(flowNode);
                let graphNode = links[id];
                if (!graphNode) {
                    links[id] = graphNode = { id, flowNode, edges: [], text: renderFlowNode(flowNode), lane: -1, endLane: -1, level: -1 };
                    nodes.push(graphNode);
                    if (!(flowNode.flags & FlowFlags.PreFinally)) {
                        if (hasAntecedents(flowNode)) {
                            // sort antecedents so that shallower trees come first.
                            const antecedents = flowNode.antecedents;
                            const heights = antecedents.map(measureHeight);
                            const indices = antecedents.map((_, i) => i);
                            stableSortIndices(heights, indices, (a, b) => b - a);
                            for (const antecedent of indices.map(i => antecedents[i])) {
                                buildGraphEdge(graphNode, antecedent);
                            }
                        }
                        else if (hasAntecedent(flowNode)) {
                            buildGraphEdge(graphNode, flowNode.antecedent);
                        }
                    }
                }
                return graphNode;
            }

            function buildGraphEdge(source: FlowGraphNode, antecedent: FlowNode) {
                const target = buildGraphNode(antecedent);
                const edge: FlowGraphEdge = { source, target };
                edges.push(edge);
                source.edges.push(edge);
                target.edges.push(edge);
            }

            function computeLevel(node: FlowGraphNode): number {
                if (node.level !== -1) {
                    return node.level;
                }
                let level = 0;
                for (const parent of getParents(node)) {
                    level = Math.max(level, computeLevel(parent) + 1);
                }
                return node.level = level;
            }

            function measureHeight(flowNode: FlowNode): number {
                return hasAntecedents(flowNode) ? flowNode.antecedents.reduce((x, n) => Math.max(x, measureHeight(n)), 0) + 1 :
                    hasAntecedent(flowNode) ? measureHeight(flowNode.antecedent) + 1 :
                    1;
            }

            function computeHeight(node: FlowGraphNode): number {
                let height = 0;
                for (const child of getChildren(node)) {
                    height = Math.max(height, computeHeight(child));
                }
                return height + 1;
            }

            function computeColumnWidths(height: number) {
                const columns: number[] = fill(Array(height), 0);
                for (const node of nodes) {
                    columns[node.level] = Math.max(columns[node.level], node.text.length);
                }
                return columns;
            }

            function computeLanes(node: FlowGraphNode, lane: number) {
                if (node.lane === -1) {
                    node.lane = lane;
                    node.endLane = lane;
                    const children = getChildren(node);
                    for (let i = 0; i < children.length; i++) {
                        if (i > 0) lane++;
                        const child = children[i];
                        computeLanes(child, lane);
                        if (child.endLane > node.endLane) {
                            lane = child.endLane;
                        }
                    }
                    node.endLane = lane;
                }
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
                if (flags & FlowFlags.Unreachable) return "Unreachable";
                throw new Error();
            }

            function getNodeText(node: Node) {
                const sourceFile = getSourceFileOfNode(node);
                return getSourceTextOfNodeFromSourceFile(sourceFile, node, /*includeTrivia*/ false);
            }

            function renderFlowNode(flowNode: FlowNode) {
                let text = getHeader(flowNode.flags);
                if (hasNode(flowNode)) {
                    if (flowNode.node) {
                        text += ` (${getNodeText(flowNode.node)})`;
                    }
                }
                else if (isFlowSwitchClause(flowNode)) {
                    const clauses: string[] = [];
                    for (let i = flowNode.clauseStart; i < flowNode.clauseEnd; i++) {
                        const clause = flowNode.switchStatement.caseBlock.clauses[i];
                        if (isDefaultClause(clause)) {
                            clauses.push("default");
                        }
                        else {
                            clauses.push(getNodeText(clause.expression));
                        }
                    }
                    text += ` (${clauses.join(", ")})`;
                }
                return text;
            }

            function renderGraph() {
                const columnCount = columnWidths.length;
                const laneCount = nodes.reduce((x, n) => Math.max(x, n.lane), 0) + 1;
                const lanes: string[] = fill(Array(laneCount), "");
                const grid: (FlowGraphNode | undefined)[][] = columnWidths.map(() => Array(laneCount));
                const connectors: Connection[][] = columnWidths.map(() => fill(Array(laneCount), 0));

                // build connectors
                for (const node of nodes) {
                    grid[node.level][node.lane] = node;
                    const children = getChildren(node);
                    for (let i = 0; i < children.length; i++) {
                        const child = children[i];
                        let connector: Connection = Connection.Right;
                        if (child.lane === node.lane) connector |= Connection.Left;
                        if (i > 0) connector |= Connection.Up;
                        if (i < children.length - 1) connector |= Connection.Down;
                        connectors[node.level][child.lane] |= connector;
                    }
                    if (children.length === 0) {
                        connectors[node.level][node.lane] |= Connection.NoChildren;
                    }
                    const parents = getParents(node);
                    for (let i = 0; i < parents.length; i++) {
                        const parent = parents[i];
                        let connector: Connection = Connection.Left;
                        if (i > 0) connector |= Connection.Up;
                        if (i < parents.length - 1) connector |= Connection.Down;
                        connectors[node.level - 1][parent.lane] |= connector;
                    }
                }

                // fill in missing connectors
                for (let column = 0; column < columnCount; column++) {
                    for (let lane = 0; lane < laneCount; lane++) {
                        const left = column > 0 ? connectors[column - 1][lane] : 0;
                        const above = lane > 0 ? connectors[column][lane - 1] : 0;
                        let connector = connectors[column][lane];
                        if (!connector) {
                            if (left & Connection.Right) connector |= Connection.LeftRight;
                            if (above & Connection.Down) connector |= Connection.UpDown;
                            connectors[column][lane] = connector;
                        }
                    }
                }

                for (let column = 0; column < columnCount; column++) {
                    for (let lane = 0; lane < lanes.length; lane++) {
                        const connector = connectors[column][lane];
                        const fill = connector & Connection.Left ? BoxCharacter.lr : " ";
                        const node = grid[column][lane];
                        if (!node) {
                            if (column < columnCount - 1) {
                                writeLane(lane, repeat(fill, columnWidths[column] + 1));
                            }
                        }
                        else {
                            writeLane(lane, node.text);
                            if (column < columnCount - 1) {
                                writeLane(lane, " ");
                                writeLane(lane, repeat(fill, columnWidths[column] - node.text.length));
                            }
                        }
                        writeLane(lane, getBoxCharacter(connector));
                        writeLane(lane, connector & Connection.Right && column < columnCount - 1 && !grid[column + 1][lane] ? BoxCharacter.lr : " ");
                    }
                }

                return lanes.join("\n");

                function writeLane(lane: number, text: string) {
                    lanes[lane] += text;
                }
            }

            function getBoxCharacter(connector: Connection) {
                switch (connector) {
                    case Connection.UpDown: return BoxCharacter.ud;
                    case Connection.LeftRight: return BoxCharacter.lr;
                    case Connection.UpLeft: return BoxCharacter.ul;
                    case Connection.UpRight: return BoxCharacter.ur;
                    case Connection.DownLeft: return BoxCharacter.dl;
                    case Connection.DownRight: return BoxCharacter.dr;
                    case Connection.UpDownLeft: return BoxCharacter.udl;
                    case Connection.UpDownRight: return BoxCharacter.udr;
                    case Connection.UpLeftRight: return BoxCharacter.ulr;
                    case Connection.DownLeftRight: return BoxCharacter.dlr;
                    case Connection.UpDownLeftRight: return BoxCharacter.udlr;
                }
                return " ";
            }

            function fill<T>(array: T[], value: T) {
                if (array.fill) {
                    array.fill(value);
                }
                else {
                    for (let i = 0; i < array.length; i++) {
                        array[i] = value;
                    }
                }
                return array;
            }

            function repeat(ch: string, length: number) {
                if (ch.repeat) {
                    return length > 0 ? ch.repeat(length) : "";
                }

                let s = "";
                while (s.length < length) {
                    s += ch;
                }
                return s;
            }
        }
    }
}
