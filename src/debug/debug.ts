/// <reference lib="es2019" />

/* @internal */
namespace Debug {
    interface Node {
        kind: number;
    }

    type FunctionExpression = Node;
    type ArrowFunction = Node;
    type MethodDeclaration = Node;
    type Expression = Node;
    type SourceFile = Node;

    interface SwitchStatement extends Node {
        caseBlock: CaseBlock;
    }

    interface CaseBlock extends Node {
        clauses: (CaseClause | DefaultClause)[];
    }

    interface CaseClause extends Node {
        _caseclauseBrand: any;
        expression: Expression;
    }

    interface DefaultClause extends Node {
        _defaultClauseBrand: any;
    }

    interface TypeScriptModule {
        readonly SyntaxKind: {
            readonly CaseClause: number;
            readonly DefaultClause: number;
        };

        readonly FlowFlags: {
            readonly Unreachable: number,
            readonly Start: number,
            readonly BranchLabel: number,
            readonly LoopLabel: number,
            readonly Assignment: number,
            readonly TrueCondition: number,
            readonly FalseCondition: number,
            readonly SwitchClause: number,
            readonly ArrayMutation: number,
            readonly Call: number,
            readonly Referenced: number,
            readonly Shared: number,
            readonly PreFinally: number,
            readonly AfterFinally: number,
            readonly Label: number,
            readonly Condition: number,
        };

        getSourceFileOfNode(node: Node): SourceFile;
        getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia?: boolean): string;
        isDefaultClause(node: Node): node is DefaultClause;
    }

    type FlowNode =
        | AfterFinallyFlow
        | PreFinallyFlow
        | FlowStart
        | FlowLabel
        | FlowAssignment
        | FlowCall
        | FlowCondition
        | FlowSwitchClause
        | FlowArrayMutation
        ;

    interface FlowNodeBase {
        flags: FlowFlags;
        id?: number;
    }

    interface AfterFinallyFlow extends FlowNodeBase {
        antecedent: FlowNode;
    }

    interface PreFinallyFlow extends FlowNodeBase {
        antecedent: FlowNode;
    }

    interface FlowStart extends FlowNodeBase {
        node?: FunctionExpression | ArrowFunction | MethodDeclaration;
    }

    interface FlowLabel extends FlowNodeBase {
        antecedents: FlowNode[] | undefined;
    }

    interface FlowAssignment extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }

    interface FlowCall extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }

    interface FlowCondition extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }

    interface FlowSwitchClause extends FlowNodeBase {
        switchStatement: SwitchStatement;
        clauseStart: number;
        clauseEnd: number;
        antecedent: FlowNode;
    }

    interface FlowArrayMutation extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }

    type FlowFlags = number;
    let FlowFlags: TypeScriptModule["FlowFlags"];
    let getSourceFileOfNode: TypeScriptModule["getSourceFileOfNode"];
    let getSourceTextOfNodeFromSourceFile: TypeScriptModule["getSourceTextOfNodeFromSourceFile"];
    let isDefaultClause: TypeScriptModule["isDefaultClause"];

    export function init(ts: TypeScriptModule) {
        FlowFlags = ts.FlowFlags;
        getSourceFileOfNode = ts.getSourceFileOfNode;
        getSourceTextOfNodeFromSourceFile = ts.getSourceTextOfNodeFromSourceFile;
        isDefaultClause = ts.isDefaultClause;
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
            udlr = "╫",
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

                        for (const antecedent of flowNode.antecedents) {
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

            return `\n${lanes.join("\n")}\n`;

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

    // Export as a module. NOTE: Can't use module exports as this is built using --outFile
    declare const module: { exports: {} };
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Debug;
    }
}