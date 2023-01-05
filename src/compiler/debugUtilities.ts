/* eslint-disable */
import * as types from "./types";
import * as checkerTypes from "./checkerUtilities";
/* eslint-enable */

import {
    compareValues,
    hasProperty,
    map,
    stableSort,
    zipWith,
} from "./core";
import { SortedReadonlyArray } from "./corePublic";
import {
    __String,
    BigIntLiteralType,
    EmitFlags,
    FlowFlags,
    FlowLabel,
    FlowNode,
    FlowNodeBase,
    FlowSwitchClause,
    IntrinsicType,
    LiteralType,
    ModifierFlags,
    Node,
    NodeArray,
    NodeFlags,
    ObjectFlags,
    ObjectType,
    RelationComparisonResult,
    Signature,
    SignatureFlags,
    SnippetKind,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    TransformFlags,
    Type,
    TypeFlags,
} from "./types";
import {
    getEffectiveModifierFlagsNoCache,
    getEmitFlags,
    getSourceFileOfNode,
    getSourceTextOfNodeFromSourceFile,
    nodeIsSynthesized,
} from "./utilities";
import {
    getParseTreeNode,
    idText,
    isGeneratedIdentifier,
    isParseTreeNode,
    symbolName,
    unescapeLeadingUnderscores,
} from "./utilitiesPublic";
import { objectAllocator } from "./objectAllocator";
import { CheckMode, SignatureCheckMode, TypeFacts } from "./checkerUtilities";
import {
    isArrayTypeNode,
    isBigIntLiteral,
    isCallSignatureDeclaration,
    isConditionalTypeNode,
    isConstructorDeclaration,
    isConstructorTypeNode,
    isConstructSignatureDeclaration,
    isDefaultClause,
    isFunctionTypeNode,
    isGetAccessorDeclaration,
    isIdentifier,
    isImportTypeNode,
    isIndexedAccessTypeNode,
    isIndexSignatureDeclaration,
    isInferTypeNode,
    isIntersectionTypeNode,
    isLiteralTypeNode,
    isMappedTypeNode,
    isNamedTupleMember,
    isNumericLiteral,
    isOptionalTypeNode,
    isParameter,
    isParenthesizedTypeNode,
    isPrivateIdentifier,
    isRestTypeNode,
    isSetAccessorDeclaration,
    isStringLiteral,
    isThisTypeNode,
    isTupleTypeNode,
    isTypeLiteralNode,
    isTypeOperatorNode,
    isTypeParameterDeclaration,
    isTypePredicateNode,
    isTypeQueryNode,
    isTypeReferenceNode,
    isUnionTypeNode,
} from "./factory/nodeTests";

export type DebugType = Type & { __debugTypeToString(): string }; // eslint-disable-line @typescript-eslint/naming-convention
const enumMemberCache = new Map<any, SortedReadonlyArray<[number, string]>>();
const weakTypeTextMap = new WeakMap<Type, string>();
const weakNodeTextMap = new WeakMap<Node, string>();

let nodeArrayProto: NodeArray<Node> | undefined;
let flowNodeProto: FlowNodeBase | undefined;

function getEnumMembers(enumObject: any) {
    // Assuming enum objects do not change at runtime, we can cache the enum members list
    // to reuse later. This saves us from reconstructing this each and every time we call
    // a formatting function (which can be expensive for large enums like SyntaxKind).
    const existing = enumMemberCache.get(enumObject);
    if (existing) {
        return existing;
    }

    const result: [number, string][] = [];
    for (const name in enumObject) {
        const value = enumObject[name];
        if (typeof value === "number") {
            result.push([value, name]);
        }
    }

    const sorted = stableSort<[number, string]>(result, (x, y) => compareValues(x[0], y[0]));
    enumMemberCache.set(enumObject, sorted);
    return sorted;
}

function attachSymbolDebugInfo(symbol: Symbol) {
    // Add additional properties in debug mode to assist with debugging.
    Object.defineProperties(symbol, {
        // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
        __tsDebuggerDisplay: {
            value(this: Symbol) {
                const symbolHeader =
                    this.flags & SymbolFlags.Transient ? "TransientSymbol" :
                    "Symbol";
                const remainingSymbolFlags = this.flags & ~SymbolFlags.Transient;
                return `${symbolHeader} '${symbolName(this)}'${remainingSymbolFlags ? ` (${formatSymbolFlagsWorker(remainingSymbolFlags)})` : ""}`;
            }
        },
        __debugFlags: { get(this: Symbol) { return formatSymbolFlagsWorker(this.flags); } }
    });
}

function attachTypeDebugInfo(type: Type) {
    Object.defineProperties(type, {
        // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
        __tsDebuggerDisplay: {
            value(this: Type) {
                const typeHeader =
                    this.flags & TypeFlags.Nullable ? "NullableType" :
                    this.flags & TypeFlags.StringOrNumberLiteral ? `LiteralType ${JSON.stringify((this as LiteralType).value)}` :
                    this.flags & TypeFlags.BigIntLiteral ? `LiteralType ${(this as BigIntLiteralType).value.negative ? "-" : ""}${(this as BigIntLiteralType).value.base10Value}n` :
                    this.flags & TypeFlags.UniqueESSymbol ? "UniqueESSymbolType" :
                    this.flags & TypeFlags.Enum ? "EnumType" :
                    this.flags & TypeFlags.Intrinsic ? `IntrinsicType ${(this as IntrinsicType).intrinsicName}` :
                    this.flags & TypeFlags.Union ? "UnionType" :
                    this.flags & TypeFlags.Intersection ? "IntersectionType" :
                    this.flags & TypeFlags.Index ? "IndexType" :
                    this.flags & TypeFlags.IndexedAccess ? "IndexedAccessType" :
                    this.flags & TypeFlags.Conditional ? "ConditionalType" :
                    this.flags & TypeFlags.Substitution ? "SubstitutionType" :
                    this.flags & TypeFlags.TypeParameter ? "TypeParameter" :
                    this.flags & TypeFlags.Object ?
                        (this as ObjectType).objectFlags & ObjectFlags.ClassOrInterface ? "InterfaceType" :
                        (this as ObjectType).objectFlags & ObjectFlags.Reference ? "TypeReference" :
                        (this as ObjectType).objectFlags & ObjectFlags.Tuple ? "TupleType" :
                        (this as ObjectType).objectFlags & ObjectFlags.Anonymous ? "AnonymousType" :
                        (this as ObjectType).objectFlags & ObjectFlags.Mapped ? "MappedType" :
                        (this as ObjectType).objectFlags & ObjectFlags.ReverseMapped ? "ReverseMappedType" :
                        (this as ObjectType).objectFlags & ObjectFlags.EvolvingArray ? "EvolvingArrayType" :
                        "ObjectType" :
                    "Type";
                const remainingObjectFlags = this.flags & TypeFlags.Object ? (this as ObjectType).objectFlags & ~ObjectFlags.ObjectTypeKindMask : 0;
                return `${typeHeader}${this.symbol ? ` '${symbolName(this.symbol)}'` : ""}${remainingObjectFlags ? ` (${formatObjectFlagsWorker(remainingObjectFlags)})` : ""}`;
            }
        },
        __debugFlags: { get(this: Type) { return formatTypeFlagsWorker(this.flags); } },
        __debugObjectFlags: { get(this: Type) { return this.flags & TypeFlags.Object ? formatObjectFlagsWorker((this as ObjectType).objectFlags) : ""; } },
        __debugTypeToString: {
            value(this: Type) {
                // avoid recomputing
                let text = weakTypeTextMap.get(this);
                if (text === undefined) {
                    text = this.checker.typeToString(this);
                    weakTypeTextMap.set(this, text);
                }
                return text;
            }
        },
    });
}

function attachSignatureDebugInfo(signature: Signature) {
    Object.defineProperties(signature, {
        __debugFlags: { get(this: Signature) { return formatSignatureFlagsWorker(this.flags); } },
        __debugSignatureToString: { value(this: Signature) { return this.checker?.signatureToString(this); } }
    });
}

function attachNodeDebugInfo(node: Node) {
    Object.defineProperties(node, {
        // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
        __tsDebuggerDisplay: {
            value(this: Node) {
                const nodeHeader =
                    isGeneratedIdentifier(this) ? "GeneratedIdentifier" :
                    isIdentifier(this) ? `Identifier '${idText(this)}'` :
                    isPrivateIdentifier(this) ? `PrivateIdentifier '${idText(this)}'` :
                    isStringLiteral(this) ? `StringLiteral ${JSON.stringify(this.text.length < 10 ? this.text : this.text.slice(10) + "...")}` :
                    isNumericLiteral(this) ? `NumericLiteral ${this.text}` :
                    isBigIntLiteral(this) ? `BigIntLiteral ${this.text}n` :
                    isTypeParameterDeclaration(this) ? "TypeParameterDeclaration" :
                    isParameter(this) ? "ParameterDeclaration" :
                    isConstructorDeclaration(this) ? "ConstructorDeclaration" :
                    isGetAccessorDeclaration(this) ? "GetAccessorDeclaration" :
                    isSetAccessorDeclaration(this) ? "SetAccessorDeclaration" :
                    isCallSignatureDeclaration(this) ? "CallSignatureDeclaration" :
                    isConstructSignatureDeclaration(this) ? "ConstructSignatureDeclaration" :
                    isIndexSignatureDeclaration(this) ? "IndexSignatureDeclaration" :
                    isTypePredicateNode(this) ? "TypePredicateNode" :
                    isTypeReferenceNode(this) ? "TypeReferenceNode" :
                    isFunctionTypeNode(this) ? "FunctionTypeNode" :
                    isConstructorTypeNode(this) ? "ConstructorTypeNode" :
                    isTypeQueryNode(this) ? "TypeQueryNode" :
                    isTypeLiteralNode(this) ? "TypeLiteralNode" :
                    isArrayTypeNode(this) ? "ArrayTypeNode" :
                    isTupleTypeNode(this) ? "TupleTypeNode" :
                    isOptionalTypeNode(this) ? "OptionalTypeNode" :
                    isRestTypeNode(this) ? "RestTypeNode" :
                    isUnionTypeNode(this) ? "UnionTypeNode" :
                    isIntersectionTypeNode(this) ? "IntersectionTypeNode" :
                    isConditionalTypeNode(this) ? "ConditionalTypeNode" :
                    isInferTypeNode(this) ? "InferTypeNode" :
                    isParenthesizedTypeNode(this) ? "ParenthesizedTypeNode" :
                    isThisTypeNode(this) ? "ThisTypeNode" :
                    isTypeOperatorNode(this) ? "TypeOperatorNode" :
                    isIndexedAccessTypeNode(this) ? "IndexedAccessTypeNode" :
                    isMappedTypeNode(this) ? "MappedTypeNode" :
                    isLiteralTypeNode(this) ? "LiteralTypeNode" :
                    isNamedTupleMember(this) ? "NamedTupleMember" :
                    isImportTypeNode(this) ? "ImportTypeNode" :
                    formatSyntaxKindWorker(this.kind);
                return `${nodeHeader}${this.flags ? ` (${formatNodeFlagsWorker(this.flags)})` : ""}`;
            }
        },
        __debugKind: { get(this: Node) { return formatSyntaxKindWorker(this.kind); } },
        __debugNodeFlags: { get(this: Node) { return formatNodeFlagsWorker(this.flags); } },
        __debugModifierFlags: { get(this: Node) { return formatModifierFlagsWorker(getEffectiveModifierFlagsNoCache(this)); } },
        __debugTransformFlags: { get(this: Node) { return formatTransformFlagsWorker(this.transformFlags); } },
        __debugIsParseTreeNode: { get(this: Node) { return isParseTreeNode(this); } },
        __debugEmitFlags: { get(this: Node) { return formatEmitFlagsWorker(getEmitFlags(this)); } },
        __debugGetText: {
            value(this: Node, includeTrivia?: boolean) {
                if (nodeIsSynthesized(this)) return "";
                // avoid recomputing
                let text = weakNodeTextMap.get(this);
                if (text === undefined) {
                    const parseNode = getParseTreeNode(this);
                    const sourceFile = parseNode && getSourceFileOfNode(parseNode);
                    text = sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
                    weakNodeTextMap.set(this, text);
                }
                return text;
            }
        }
    });
}

function attachNodeArrayDebugInfo(array: NodeArray<Node>) {
    if (!("__tsDebuggerDisplay" in array)) { // eslint-disable-line local/no-in-operator
        Object.defineProperties(array, {
            __tsDebuggerDisplay: {
                value(this: NodeArray<Node>, defaultValue: string) {
                    // An `Array` with extra properties is rendered as `[A, B, prop1: 1, prop2: 2]`. Most of
                    // these aren't immediately useful so we trim off the `prop1: ..., prop2: ...` part from the
                    // formatted string.
                    // This regex can trigger slow backtracking because of overlapping potential captures.
                    // We don't care, this is debug code that's only enabled with a debugger attached -
                    // we're just taking note of it for anyone checking regex performance in the future.
                    defaultValue = String(defaultValue).replace(/(?:,[\s\w\d_]+:[^,]+)+\]$/, "]");
                    return `NodeArray ${defaultValue}`;
                }
            }
        });
    }
}

function attachFlowNodeDebugInfo(flowNode: FlowNodeBase) {
    if (!("__debugFlowFlags" in flowNode)) { // eslint-disable-line local/no-in-operator
        Object.defineProperties(flowNode, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: FlowNodeBase) {
                    const flowHeader =
                        this.flags & FlowFlags.Start ? "FlowStart" :
                        this.flags & FlowFlags.BranchLabel ? "FlowBranchLabel" :
                        this.flags & FlowFlags.LoopLabel ? "FlowLoopLabel" :
                        this.flags & FlowFlags.Assignment ? "FlowAssignment" :
                        this.flags & FlowFlags.TrueCondition ? "FlowTrueCondition" :
                        this.flags & FlowFlags.FalseCondition ? "FlowFalseCondition" :
                        this.flags & FlowFlags.SwitchClause ? "FlowSwitchClause" :
                        this.flags & FlowFlags.ArrayMutation ? "FlowArrayMutation" :
                        this.flags & FlowFlags.Call ? "FlowCall" :
                        this.flags & FlowFlags.ReduceLabel ? "FlowReduceLabel" :
                        this.flags & FlowFlags.Unreachable ? "FlowUnreachable" :
                        "UnknownFlow";
                    const remainingFlags = this.flags & ~(FlowFlags.Referenced - 1);
                    return `${flowHeader}${remainingFlags ? ` (${formatFlowFlagsWorker(remainingFlags)})`: ""}`;
                }
            },
            __debugFlowFlags: { get(this: FlowNodeBase) { return formatEnumWorker(this.flags, (types as any).FlowFlags, /*isFlags*/ true); } },
            __debugToString: { value(this: FlowNodeBase) { return formatControlFlowGraphWorker(this); } }
        });
    }
}

export function getNodeText(node: Node) {
    const sourceFile = getSourceFileOfNode(node);
    return getSourceTextOfNodeFromSourceFile(sourceFile, node, /*includeTrivia*/ false);
}

/**
 * Formats an enum value as a string for debugging and debug assertions.
 */
export function formatEnumWorker(value = 0, enumObject: any, isFlags?: boolean) {
    const members = getEnumMembers(enumObject);
    if (value === 0) {
        return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
    }
    if (isFlags) {
        const result: string[] = [];
        let remainingFlags = value;
        for (const [enumValue, enumName] of members) {
            if (enumValue > value) {
                break;
            }
            if (enumValue !== 0 && enumValue & value) {
                result.push(enumName);
                remainingFlags &= ~enumValue;
            }
        }
        if (remainingFlags === 0) {
            return result.join("|");
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

export function arrayTypeToString(sources: readonly DebugType[], targets: readonly DebugType[] | undefined) {
    return zipWith<DebugType, DebugType | string, unknown>(sources, targets || map(sources, () => "any"),
       (s, t) => `${s.__debugTypeToString()} -> ${typeof t === "string" ? t : t.__debugTypeToString()}`).join(", ");
}

export function deferredTypeToString(sources: readonly Type[], targets: (() => Type)[]) {
    return zipWith(sources, targets,
       (s, t) => `${(s as DebugType).__debugTypeToString()} -> ${(t() as DebugType).__debugTypeToString()}`).join(", ");
}

export function hasKind(node: any) {
    return hasProperty(node, "kind");
}

export function hasPos(node: any) {
    return hasProperty(node, "pos");
}

export function hasName(node: any) {
    return hasProperty(node, "name");
}

export function hasDebugKind(node: any) {
    return hasProperty(node, "__debugKind");
}

export function assertNoop(_?: unknown) {}

export function attachFlowNodeDebugInfoWorker(flowNode: FlowNodeBase) {
    if (typeof Object.setPrototypeOf === "function") {
        // if we're in es2015, attach the method to a shared prototype for `FlowNode`
        // so the method doesn't show up in the watch window.
        if (!flowNodeProto) {
            flowNodeProto = Object.create(Object.prototype) as FlowNodeBase;
            attachFlowNodeDebugInfo(flowNodeProto);
        }
        Object.setPrototypeOf(flowNode, flowNodeProto);
    }
    else {
        // not running in an es2015 environment, attach the method directly.
        attachFlowNodeDebugInfo(flowNode);
    }
}

export function attachNodeArrayDebugInfoWorker(array: NodeArray<Node>) {
    if (typeof Object.setPrototypeOf === "function") {
        // if we're in es2015, attach the method to a shared prototype for `NodeArray`
        // so the method doesn't show up in the watch window.
        if (!nodeArrayProto) {
            nodeArrayProto = Object.create(Array.prototype) as NodeArray<Node>;
            attachNodeArrayDebugInfo(nodeArrayProto);
        }
        Object.setPrototypeOf(array, nodeArrayProto);
    }
    else {
        // not running in an es2015 environment, attach the method directly.
        attachNodeArrayDebugInfo(array);
    }
}

export function formatSyntaxKindWorker(kind: SyntaxKind | undefined): string {
    return formatEnumWorker(kind, (types as any).SyntaxKind, /*isFlags*/ false);
}

export function formatSnippetKindWorker(kind: SnippetKind | undefined): string {
    return formatEnumWorker(kind, (types as any).SnippetKind, /*isFlags*/ false);
}

export function formatNodeFlagsWorker(flags: NodeFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).NodeFlags, /*isFlags*/ true);
}

export function formatModifierFlagsWorker(flags: ModifierFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).ModifierFlags, /*isFlags*/ true);
}

export function formatTransformFlagsWorker(flags: TransformFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).TransformFlags, /*isFlags*/ true);
}

export function formatEmitFlagsWorker(flags: EmitFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).EmitFlags, /*isFlags*/ true);
}

export function formatSymbolFlagsWorker(flags: SymbolFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).SymbolFlags, /*isFlags*/ true);
}

export function formatTypeFlagsWorker(flags: TypeFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).TypeFlags, /*isFlags*/ true);
}

export function formatSignatureFlagsWorker(flags: SignatureFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).SignatureFlags, /*isFlags*/ true);
}

export function formatObjectFlagsWorker(flags: ObjectFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).ObjectFlags, /*isFlags*/ true);
}

export function formatFlowFlagsWorker(flags: FlowFlags | undefined): string {
    return formatEnumWorker(flags, (types as any).FlowFlags, /*isFlags*/ true);
}

export function formatRelationComparisonResultWorker(result: RelationComparisonResult | undefined): string {
    return formatEnumWorker(result, (types as any).RelationComparisonResult, /*isFlags*/ true);
}

export function formatCheckModeWorker(mode: CheckMode | undefined): string {
    return formatEnumWorker(mode, (checkerTypes as any).CheckMode, /*isFlags*/ true);
}

export function formatSignatureCheckModeWorker(mode: SignatureCheckMode | undefined): string {
    return formatEnumWorker(mode, (checkerTypes as any).SignatureCheckMode, /*isFlags*/ true);
}

export function formatTypeFactsWorker(facts: TypeFacts | undefined): string {
    return formatEnumWorker(facts, (checkerTypes as any).TypeFacts, /*isFlags*/ true);
}

export function formatControlFlowGraphWorker(flowNode: FlowNode) {
    let nextDebugFlowId = -1;

    function getDebugFlowNodeId(f: FlowNode) {
        if (!f.id) {
            f.id = nextDebugFlowId;
            nextDebugFlowId--;
        }
        return f.id;
    }

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
        None = 0,
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
        circular: boolean | "circularity";
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
        FlowFlags.ReduceLabel;

    const hasNodeFlags =
        FlowFlags.Start |
        FlowFlags.Assignment |
        FlowFlags.Call |
        FlowFlags.Condition |
        FlowFlags.ArrayMutation;

    const links: Record<number, FlowGraphNode> = Object.create(/*o*/ null); // eslint-disable-line no-null/no-null
    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];
    const root = buildGraphNode(flowNode, new Set());
    for (const node of nodes) {
        node.text = renderFlowNode(node.flowNode, node.circular);
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

    function buildGraphNode(flowNode: FlowNode, seen: Set<FlowNode>): FlowGraphNode {
        const id = getDebugFlowNodeId(flowNode);
        let graphNode = links[id];
        if (graphNode && seen.has(flowNode)) {
            graphNode.circular = true;
            graphNode = {
                id: -1,
                flowNode,
                edges: [],
                text: "",
                lane: -1,
                endLane: -1,
                level: -1,
                circular: "circularity"
            };
            nodes.push(graphNode);
            return graphNode;
        }
        seen.add(flowNode);
        if (!graphNode) {
            links[id] = graphNode = { id, flowNode, edges: [], text: "", lane: -1, endLane: -1, level: -1, circular: false };
            nodes.push(graphNode);
            if (hasAntecedents(flowNode)) {
                for (const antecedent of flowNode.antecedents) {
                    buildGraphEdge(graphNode, antecedent, seen);
                }
            }
            else if (hasAntecedent(flowNode)) {
                buildGraphEdge(graphNode, flowNode.antecedent, seen);
            }
        }
        seen.delete(flowNode);
        return graphNode;
    }

    function buildGraphEdge(source: FlowGraphNode, antecedent: FlowNode, seen: Set<FlowNode>) {
        const target = buildGraphNode(antecedent, seen);
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
        if (flags & FlowFlags.ReduceLabel) return "ReduceLabel";
        if (flags & FlowFlags.Unreachable) return "Unreachable";
        throw new Error();
    }

    function renderFlowNode(flowNode: FlowNode, circular: boolean | "circularity") {
        let text = getHeader(flowNode.flags);
        if (circular) {
            text = `${text}#${getDebugFlowNodeId(flowNode)}`;
        }
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
        return circular === "circularity" ? `Circular(${text})` : text;
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

export function formatSymbolWorker(symbol: Symbol): string {
    return `{ name: ${unescapeLeadingUnderscores(symbol.escapedName)}; flags: ${formatSymbolFlagsWorker(symbol.flags)}; declarations: ${symbol.declarations?.map(node => formatSyntaxKindWorker(node.kind))} }`;
}

export function enableDebugInfoWorder() {
    attachSymbolDebugInfo(objectAllocator.getSymbolConstructor().prototype);
    attachTypeDebugInfo(objectAllocator.getTypeConstructor().prototype);
    attachSignatureDebugInfo(objectAllocator.getSignatureConstructor().prototype);

    const nodeConstructors = [
        objectAllocator.getNodeConstructor(),
        objectAllocator.getIdentifierConstructor(),
        objectAllocator.getTokenConstructor(),
        objectAllocator.getSourceFileConstructor()
    ];

    for (const ctor of nodeConstructors) {
        if (!hasDebugKind(ctor.prototype)) {
            attachNodeDebugInfo(ctor.prototype);
        }
    }
}
