import * as ts from "./_namespaces/ts.js";
import {
    AnyFunction,
    AssertionLevel,
    BigIntLiteralType,
    CheckMode,
    compareValues,
    EmitFlags,
    every,
    FlowFlags,
    FlowLabel,
    FlowNode,
    FlowSwitchClause,
    getEffectiveModifierFlagsNoCache,
    getEmitFlags,
    getOwnKeys,
    getParseTreeNode,
    getSourceFileOfNode,
    getSourceTextOfNodeFromSourceFile,
    hasProperty,
    idText,
    IntrinsicType,
    isArrayTypeNode,
    isBigIntLiteral,
    isCallSignatureDeclaration,
    isConditionalTypeNode,
    isConstructorDeclaration,
    isConstructorTypeNode,
    isConstructSignatureDeclaration,
    isDefaultClause,
    isFunctionTypeNode,
    isGeneratedIdentifier,
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
    isParseTreeNode,
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
    LiteralType,
    map,
    MatchingKeys,
    maxBy,
    ModifierFlags,
    Node,
    NodeArray,
    NodeCheckFlags,
    NodeFlags,
    nodeIsSynthesized,
    noop,
    objectAllocator,
    ObjectFlags,
    ObjectType,
    RelationComparisonResult,
    ScriptKind,
    Signature,
    SignatureCheckMode,
    SignatureFlags,
    SnippetKind,
    SortedReadonlyArray,
    Symbol,
    SymbolFlags,
    symbolName,
    SyntaxKind,
    toSorted,
    TransformFlags,
    Type,
    TypeFacts,
    TypeFlags,
    TypeMapKind,
    TypeMapper,
    unescapeLeadingUnderscores,
    VarianceFlags,
    zipWith,
} from "./_namespaces/ts.js";

/** @internal */
export enum LogLevel {
    Off,
    Error,
    Warning,
    Info,
    Verbose,
}

/** @internal */
export interface LoggingHost {
    log(level: LogLevel, s: string): void;
}

/** @internal */
export namespace Debug {
    /* eslint-disable prefer-const */
    let currentAssertionLevel = AssertionLevel.None;
    export let currentLogLevel: LogLevel = LogLevel.Warning;
    export let isDebugging = false;
    export let loggingHost: LoggingHost | undefined;
    /* eslint-enable prefer-const */

    type AssertionKeys = MatchingKeys<typeof Debug, AnyFunction>;

    export function shouldLog(level: LogLevel): boolean {
        return currentLogLevel <= level;
    }

    function logMessage(level: LogLevel, s: string): void {
        if (loggingHost && shouldLog(level)) {
            loggingHost.log(level, s);
        }
    }

    export function log(s: string): void {
        logMessage(LogLevel.Info, s);
    }

    export namespace log {
        export function error(s: string): void {
            logMessage(LogLevel.Error, s);
        }

        export function warn(s: string): void {
            logMessage(LogLevel.Warning, s);
        }

        export function log(s: string): void {
            logMessage(LogLevel.Info, s);
        }

        export function trace(s: string): void {
            logMessage(LogLevel.Verbose, s);
        }
    }

    const assertionCache: Partial<Record<AssertionKeys, { level: AssertionLevel; assertion: AnyFunction; }>> = {};

    export function getAssertionLevel(): AssertionLevel {
        return currentAssertionLevel;
    }

    export function setAssertionLevel(level: AssertionLevel): void {
        const prevAssertionLevel = currentAssertionLevel;
        currentAssertionLevel = level;

        if (level > prevAssertionLevel) {
            // restore assertion functions for the current assertion level (see `shouldAssertFunction`).
            for (const key of getOwnKeys(assertionCache) as AssertionKeys[]) {
                const cachedFunc = assertionCache[key];
                if (cachedFunc !== undefined && Debug[key] !== cachedFunc.assertion && level >= cachedFunc.level) {
                    (Debug as any)[key] = cachedFunc;
                    assertionCache[key] = undefined;
                }
            }
        }
    }

    export function shouldAssert(level: AssertionLevel): boolean {
        return currentAssertionLevel >= level;
    }

    /**
     * Tests whether an assertion function should be executed. If it shouldn't, it is cached and replaced with `ts.noop`.
     * Replaced assertion functions are restored when `Debug.setAssertionLevel` is set to a high enough level.
     * @param level The minimum assertion level required.
     * @param name The name of the current assertion function.
     */
    function shouldAssertFunction<K extends AssertionKeys>(level: AssertionLevel, name: K): boolean {
        if (!shouldAssert(level)) {
            assertionCache[name] = { level, assertion: Debug[name] };
            (Debug as any)[name] = noop;
            return false;
        }
        return true;
    }

    export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
        // eslint-disable-next-line no-debugger
        debugger;
        const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(e, stackCrawlMark || fail);
        }
        throw e;
    }

    export function failBadSyntaxKind(node: Node, message?: string, stackCrawlMark?: AnyFunction): never {
        return fail(
            `${message || "Unexpected node."}\r\nNode ${formatSyntaxKind(node.kind)} was unexpected.`,
            stackCrawlMark || failBadSyntaxKind,
        );
    }

    export function assert(expression: unknown, message?: string, verboseDebugInfo?: string | (() => string), stackCrawlMark?: AnyFunction): asserts expression {
        if (!expression) {
            message = message ? `False expression: ${message}` : "False expression.";
            if (verboseDebugInfo) {
                message += "\r\nVerbose Debug Information: " + (typeof verboseDebugInfo === "string" ? verboseDebugInfo : verboseDebugInfo());
            }
            fail(message, stackCrawlMark || assert);
        }
    }

    export function assertEqual<T>(a: T, b: T, msg?: string, msg2?: string, stackCrawlMark?: AnyFunction): void {
        if (a !== b) {
            const message = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
            fail(`Expected ${a} === ${b}. ${message}`, stackCrawlMark || assertEqual);
        }
    }

    export function assertLessThan(a: number, b: number, msg?: string, stackCrawlMark?: AnyFunction): void {
        if (a >= b) {
            fail(`Expected ${a} < ${b}. ${msg || ""}`, stackCrawlMark || assertLessThan);
        }
    }

    export function assertLessThanOrEqual(a: number, b: number, stackCrawlMark?: AnyFunction): void {
        if (a > b) {
            fail(`Expected ${a} <= ${b}`, stackCrawlMark || assertLessThanOrEqual);
        }
    }

    export function assertGreaterThanOrEqual(a: number, b: number, stackCrawlMark?: AnyFunction): void {
        if (a < b) {
            fail(`Expected ${a} >= ${b}`, stackCrawlMark || assertGreaterThanOrEqual);
        }
    }

    export function assertIsDefined<T>(value: T, message?: string, stackCrawlMark?: AnyFunction): asserts value is NonNullable<T> {
        // eslint-disable-next-line no-restricted-syntax
        if (value === undefined || value === null) {
            fail(message, stackCrawlMark || assertIsDefined);
        }
    }

    export function checkDefined<T>(value: T | null | undefined, message?: string, stackCrawlMark?: AnyFunction): T { // eslint-disable-line no-restricted-syntax
        assertIsDefined(value, message, stackCrawlMark || checkDefined);
        return value;
    }

    export function assertEachIsDefined<T extends Node>(value: NodeArray<T>, message?: string, stackCrawlMark?: AnyFunction): asserts value is NodeArray<T>;
    export function assertEachIsDefined<T>(value: readonly T[], message?: string, stackCrawlMark?: AnyFunction): asserts value is readonly NonNullable<T>[];
    export function assertEachIsDefined<T>(value: readonly T[], message?: string, stackCrawlMark?: AnyFunction) {
        for (const v of value) {
            assertIsDefined(v, message, stackCrawlMark || assertEachIsDefined);
        }
    }

    export function checkEachDefined<T, A extends readonly T[]>(value: A, message?: string, stackCrawlMark?: AnyFunction): A {
        assertEachIsDefined(value, message, stackCrawlMark || checkEachDefined);
        return value;
    }

    export function assertNever(member: never, message = "Illegal value:", stackCrawlMark?: AnyFunction): never {
        const detail = typeof member === "object" && hasProperty(member, "kind") && hasProperty(member, "pos") ? "SyntaxKind: " + formatSyntaxKind((member as Node).kind) : JSON.stringify(member);
        return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
    }

    export function assertEachNode<T extends Node, U extends T>(nodes: NodeArray<T>, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts nodes is NodeArray<U>;
    export function assertEachNode<T extends Node, U extends T>(nodes: readonly T[], test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts nodes is readonly U[];
    export function assertEachNode<T extends Node, U extends T>(nodes: NodeArray<T> | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts nodes is NodeArray<U> | undefined;
    export function assertEachNode<T extends Node, U extends T>(nodes: readonly T[] | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts nodes is readonly U[] | undefined;
    export function assertEachNode(nodes: readonly Node[], test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertEachNode(nodes: readonly Node[] | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertEachNode")) {
            assert(
                test === undefined || every(nodes, test),
                message || "Unexpected node.",
                () => `Node array did not pass test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertEachNode,
            );
        }
    }

    export function assertNode<T extends Node, U extends T>(node: T | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is U;
    export function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertNode")) {
            assert(
                node !== undefined && (test === undefined || test(node)),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertNode,
            );
        }
    }

    export function assertNotNode<T extends Node, U extends T>(node: T | undefined, test: (node: Node) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is Exclude<T, U>;
    export function assertNotNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertNotNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertNotNode")) {
            assert(
                node === undefined || test === undefined || !test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} should not have passed test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertNotNode,
            );
        }
    }

    export function assertOptionalNode<T extends Node, U extends T>(node: T, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is U;
    export function assertOptionalNode<T extends Node, U extends T>(node: T | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is U | undefined;
    export function assertOptionalNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertOptionalNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertOptionalNode")) {
            assert(
                test === undefined || node === undefined || test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertOptionalNode,
            );
        }
    }

    export function assertOptionalToken<T extends Node, K extends SyntaxKind>(node: T, kind: K, message?: string, stackCrawlMark?: AnyFunction): asserts node is Extract<T, { readonly kind: K; }>;
    export function assertOptionalToken<T extends Node, K extends SyntaxKind>(node: T | undefined, kind: K, message?: string, stackCrawlMark?: AnyFunction): asserts node is Extract<T, { readonly kind: K; }> | undefined;
    export function assertOptionalToken(node: Node | undefined, kind: SyntaxKind | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertOptionalToken(node: Node | undefined, kind: SyntaxKind | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertOptionalToken")) {
            assert(
                kind === undefined || node === undefined || node.kind === kind,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
                stackCrawlMark || assertOptionalToken,
            );
        }
    }

    export function assertMissingNode(node: Node | undefined, message?: string, stackCrawlMark?: AnyFunction): asserts node is undefined;
    export function assertMissingNode(node: Node | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertMissingNode")) {
            assert(
                node === undefined,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} was unexpected'.`,
                stackCrawlMark || assertMissingNode,
            );
        }
    }

    /**
     * Asserts a value has the specified type in typespace only (does not perform a runtime assertion).
     * This is useful in cases where we switch on `node.kind` and can be reasonably sure the type is accurate, and
     * as a result can reduce the number of unnecessary casts.
     */
    export function type<T>(value: unknown): asserts value is T;
    export function type(_value: unknown) {}

    export function getFunctionName(func: AnyFunction): string {
        if (typeof func !== "function") {
            return "";
        }
        else if (hasProperty(func, "name")) {
            return (func as any).name;
        }
        else {
            const text = Function.prototype.toString.call(func);
            const match = /^function\s+([\w$]+)\s*\(/.exec(text);
            return match ? match[1] : "";
        }
    }

    export function formatSymbol(symbol: Symbol): string {
        return `{ name: ${unescapeLeadingUnderscores(symbol.escapedName)}; flags: ${formatSymbolFlags(symbol.flags)}; declarations: ${map(symbol.declarations, node => formatSyntaxKind(node.kind))} }`;
    }

    /**
     * Formats an enum value as a string for debugging and debug assertions.
     */
    export function formatEnum(value = 0, enumObject: any, isFlags?: boolean): string {
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

    const enumMemberCache = new Map<any, SortedReadonlyArray<[number, string]>>();

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

        const sorted = toSorted<[number, string]>(result, (x, y) => compareValues(x[0], y[0]));
        enumMemberCache.set(enumObject, sorted);
        return sorted;
    }

    export function formatSyntaxKind(kind: SyntaxKind | undefined): string {
        return formatEnum(kind, (ts as any).SyntaxKind, /*isFlags*/ false);
    }

    export function formatSnippetKind(kind: SnippetKind | undefined): string {
        return formatEnum(kind, (ts as any).SnippetKind, /*isFlags*/ false);
    }

    export function formatScriptKind(kind: ScriptKind | undefined): string {
        return formatEnum(kind, (ts as any).ScriptKind, /*isFlags*/ false);
    }

    export function formatNodeFlags(flags: NodeFlags | undefined): string {
        return formatEnum(flags, (ts as any).NodeFlags, /*isFlags*/ true);
    }

    export function formatNodeCheckFlags(flags: NodeCheckFlags | undefined): string {
        return formatEnum(flags, (ts as any).NodeCheckFlags, /*isFlags*/ true);
    }

    export function formatModifierFlags(flags: ModifierFlags | undefined): string {
        return formatEnum(flags, (ts as any).ModifierFlags, /*isFlags*/ true);
    }

    export function formatTransformFlags(flags: TransformFlags | undefined): string {
        return formatEnum(flags, (ts as any).TransformFlags, /*isFlags*/ true);
    }

    export function formatEmitFlags(flags: EmitFlags | undefined): string {
        return formatEnum(flags, (ts as any).EmitFlags, /*isFlags*/ true);
    }

    export function formatSymbolFlags(flags: SymbolFlags | undefined): string {
        return formatEnum(flags, (ts as any).SymbolFlags, /*isFlags*/ true);
    }

    export function formatTypeFlags(flags: TypeFlags | undefined): string {
        return formatEnum(flags, (ts as any).TypeFlags, /*isFlags*/ true);
    }

    export function formatSignatureFlags(flags: SignatureFlags | undefined): string {
        return formatEnum(flags, (ts as any).SignatureFlags, /*isFlags*/ true);
    }

    export function formatObjectFlags(flags: ObjectFlags | undefined): string {
        return formatEnum(flags, (ts as any).ObjectFlags, /*isFlags*/ true);
    }

    export function formatFlowFlags(flags: FlowFlags | undefined): string {
        return formatEnum(flags, (ts as any).FlowFlags, /*isFlags*/ true);
    }

    export function formatRelationComparisonResult(result: RelationComparisonResult | undefined): string {
        return formatEnum(result, (ts as any).RelationComparisonResult, /*isFlags*/ true);
    }

    export function formatCheckMode(mode: CheckMode | undefined): string {
        return formatEnum(mode, (ts as any).CheckMode, /*isFlags*/ true);
    }

    export function formatSignatureCheckMode(mode: SignatureCheckMode | undefined): string {
        return formatEnum(mode, (ts as any).SignatureCheckMode, /*isFlags*/ true);
    }

    export function formatTypeFacts(facts: TypeFacts | undefined): string {
        return formatEnum(facts, (ts as any).TypeFacts, /*isFlags*/ true);
    }

    let isDebugInfoEnabled = false;

    let flowNodeProto: FlowNode | undefined;

    function attachFlowNodeDebugInfoWorker(flowNode: FlowNode) {
        if (!("__debugFlowFlags" in flowNode)) { // eslint-disable-line local/no-in-operator
            Object.defineProperties(flowNode, {
                // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                __tsDebuggerDisplay: {
                    value(this: FlowNode) {
                        const flowHeader = this.flags & FlowFlags.Start ? "FlowStart" :
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
                        return `${flowHeader}${remainingFlags ? ` (${formatFlowFlags(remainingFlags)})` : ""}`;
                    },
                },
                __debugFlowFlags: {
                    get(this: FlowNode) {
                        return formatEnum(this.flags, (ts as any).FlowFlags, /*isFlags*/ true);
                    },
                },
                __debugToString: {
                    value(this: FlowNode) {
                        return formatControlFlowGraph(this);
                    },
                },
            });
        }
    }

    export function attachFlowNodeDebugInfo(flowNode: FlowNode): FlowNode {
        if (isDebugInfoEnabled) {
            if (typeof Object.setPrototypeOf === "function") {
                // if we're in es2015, attach the method to a shared prototype for `FlowNode`
                // so the method doesn't show up in the watch window.
                if (!flowNodeProto) {
                    flowNodeProto = Object.create(Object.prototype) as FlowNode;
                    attachFlowNodeDebugInfoWorker(flowNodeProto);
                }
                Object.setPrototypeOf(flowNode, flowNodeProto);
            }
            else {
                // not running in an es2015 environment, attach the method directly.
                attachFlowNodeDebugInfoWorker(flowNode);
            }
        }
        return flowNode;
    }

    let nodeArrayProto: NodeArray<Node> | undefined;

    function attachNodeArrayDebugInfoWorker(array: NodeArray<Node>) {
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
                        defaultValue = String(defaultValue).replace(/(?:,[\s\w]+:[^,]+)+\]$/, "]");
                        return `NodeArray ${defaultValue}`;
                    },
                },
            });
        }
    }

    export function attachNodeArrayDebugInfo(array: NodeArray<Node>): void {
        if (isDebugInfoEnabled) {
            if (typeof Object.setPrototypeOf === "function") {
                // if we're in es2015, attach the method to a shared prototype for `NodeArray`
                // so the method doesn't show up in the watch window.
                if (!nodeArrayProto) {
                    nodeArrayProto = Object.create(Array.prototype) as NodeArray<Node>;
                    attachNodeArrayDebugInfoWorker(nodeArrayProto);
                }
                Object.setPrototypeOf(array, nodeArrayProto);
            }
            else {
                // not running in an es2015 environment, attach the method directly.
                attachNodeArrayDebugInfoWorker(array);
            }
        }
    }

    /**
     * Injects debug information into frequently used types.
     */
    export function enableDebugInfo(): void {
        if (isDebugInfoEnabled) return;

        // avoid recomputing
        const weakTypeTextMap = new WeakMap<Type, string>();
        const weakNodeTextMap = new WeakMap<Node, string>();

        // Add additional properties in debug mode to assist with debugging.
        Object.defineProperties(objectAllocator.getSymbolConstructor().prototype, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: Symbol) {
                    const symbolHeader = this.flags & SymbolFlags.Transient ? "TransientSymbol" :
                        "Symbol";
                    const remainingSymbolFlags = this.flags & ~SymbolFlags.Transient;
                    return `${symbolHeader} '${symbolName(this)}'${remainingSymbolFlags ? ` (${formatSymbolFlags(remainingSymbolFlags)})` : ""}`;
                },
            },
            __debugFlags: {
                get(this: Symbol) {
                    return formatSymbolFlags(this.flags);
                },
            },
        });

        Object.defineProperties(objectAllocator.getTypeConstructor().prototype, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: Type) {
                    const typeHeader = this.flags & TypeFlags.Intrinsic ? `IntrinsicType ${(this as IntrinsicType).intrinsicName}${(this as IntrinsicType).debugIntrinsicName ? ` (${(this as IntrinsicType).debugIntrinsicName})` : ""}` :
                        this.flags & TypeFlags.Nullable ? "NullableType" :
                        this.flags & TypeFlags.StringOrNumberLiteral ? `LiteralType ${JSON.stringify((this as LiteralType).value)}` :
                        this.flags & TypeFlags.BigIntLiteral ? `LiteralType ${(this as BigIntLiteralType).value.negative ? "-" : ""}${(this as BigIntLiteralType).value.base10Value}n` :
                        this.flags & TypeFlags.UniqueESSymbol ? "UniqueESSymbolType" :
                        this.flags & TypeFlags.Enum ? "EnumType" :
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
                    return `${typeHeader}${this.symbol ? ` '${symbolName(this.symbol)}'` : ""}${remainingObjectFlags ? ` (${formatObjectFlags(remainingObjectFlags)})` : ""}`;
                },
            },
            __debugFlags: {
                get(this: Type) {
                    return formatTypeFlags(this.flags);
                },
            },
            __debugObjectFlags: {
                get(this: Type) {
                    return this.flags & TypeFlags.Object ? formatObjectFlags((this as ObjectType).objectFlags) : "";
                },
            },
            __debugTypeToString: {
                value(this: Type) {
                    // avoid recomputing
                    let text = weakTypeTextMap.get(this);
                    if (text === undefined) {
                        text = this.checker.typeToString(this);
                        weakTypeTextMap.set(this, text);
                    }
                    return text;
                },
            },
        });

        Object.defineProperties(objectAllocator.getSignatureConstructor().prototype, {
            __debugFlags: {
                get(this: Signature) {
                    return formatSignatureFlags(this.flags);
                },
            },
            __debugSignatureToString: {
                value(this: Signature) {
                    return this.checker?.signatureToString(this);
                },
            },
        });

        const nodeConstructors = [
            objectAllocator.getNodeConstructor(),
            objectAllocator.getIdentifierConstructor(),
            objectAllocator.getTokenConstructor(),
            objectAllocator.getSourceFileConstructor(),
        ];

        for (const ctor of nodeConstructors) {
            if (!hasProperty(ctor.prototype, "__debugKind")) {
                Object.defineProperties(ctor.prototype, {
                    // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                    __tsDebuggerDisplay: {
                        value(this: Node) {
                            const nodeHeader = isGeneratedIdentifier(this) ? "GeneratedIdentifier" :
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
                                formatSyntaxKind(this.kind);
                            return `${nodeHeader}${this.flags ? ` (${formatNodeFlags(this.flags)})` : ""}`;
                        },
                    },
                    __debugKind: {
                        get(this: Node) {
                            return formatSyntaxKind(this.kind);
                        },
                    },
                    __debugNodeFlags: {
                        get(this: Node) {
                            return formatNodeFlags(this.flags);
                        },
                    },
                    __debugModifierFlags: {
                        get(this: Node) {
                            return formatModifierFlags(getEffectiveModifierFlagsNoCache(this));
                        },
                    },
                    __debugTransformFlags: {
                        get(this: Node) {
                            return formatTransformFlags(this.transformFlags);
                        },
                    },
                    __debugIsParseTreeNode: {
                        get(this: Node) {
                            return isParseTreeNode(this);
                        },
                    },
                    __debugEmitFlags: {
                        get(this: Node) {
                            return formatEmitFlags(getEmitFlags(this));
                        },
                    },
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
                        },
                    },
                });
            }
        }

        isDebugInfoEnabled = true;
    }

    export function formatVariance(varianceFlags: VarianceFlags): string {
        const variance = varianceFlags & VarianceFlags.VarianceMask;
        let result = variance === VarianceFlags.Invariant ? "in out" :
            variance === VarianceFlags.Bivariant ? "[bivariant]" :
            variance === VarianceFlags.Contravariant ? "in" :
            variance === VarianceFlags.Covariant ? "out" :
            variance === VarianceFlags.Independent ? "[independent]" : "";
        if (varianceFlags & VarianceFlags.Unmeasurable) {
            result += " (unmeasurable)";
        }
        else if (varianceFlags & VarianceFlags.Unreliable) {
            result += " (unreliable)";
        }
        return result;
    }

    export type DebugType = Type & { __debugTypeToString(): string; }; // eslint-disable-line @typescript-eslint/naming-convention
    export class DebugTypeMapper {
        declare kind: TypeMapKind;
        __debugToString(): string { // eslint-disable-line @typescript-eslint/naming-convention
            type<TypeMapper>(this);
            switch (this.kind) {
                case TypeMapKind.Function:
                    return this.debugInfo?.() || "(function mapper)";
                case TypeMapKind.Simple:
                    return `${(this.source as DebugType).__debugTypeToString()} -> ${(this.target as DebugType).__debugTypeToString()}`;
                case TypeMapKind.Array:
                    return zipWith<DebugType, DebugType | string, unknown>(
                        this.sources as readonly DebugType[],
                        this.targets as readonly DebugType[] || map(this.sources, () => "any"),
                        (s, t) => `${s.__debugTypeToString()} -> ${typeof t === "string" ? t : t.__debugTypeToString()}`,
                    ).join(", ");
                case TypeMapKind.Deferred:
                    return zipWith(
                        this.sources,
                        this.targets,
                        (s, t) => `${(s as DebugType).__debugTypeToString()} -> ${(t() as DebugType).__debugTypeToString()}`,
                    ).join(", ");
                case TypeMapKind.Merged:
                case TypeMapKind.Composite:
                    return `m1: ${(this.mapper1 as unknown as DebugTypeMapper).__debugToString().split("\n").join("\n    ")}
m2: ${(this.mapper2 as unknown as DebugTypeMapper).__debugToString().split("\n").join("\n    ")}`;
                default:
                    return assertNever(this);
            }
        }
    }

    export function attachDebugPrototypeIfDebug(mapper: TypeMapper): TypeMapper {
        if (isDebugging) {
            return Object.setPrototypeOf(mapper, DebugTypeMapper.prototype);
        }
        return mapper;
    }

    export function printControlFlowGraph(flowNode: FlowNode): void {
        return console.log(formatControlFlowGraph(flowNode));
    }

    export function formatControlFlowGraph(flowNode: FlowNode): string {
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

        const hasAntecedentFlags = FlowFlags.Assignment |
            FlowFlags.Condition |
            FlowFlags.SwitchClause |
            FlowFlags.ArrayMutation |
            FlowFlags.Call |
            FlowFlags.ReduceLabel;

        const hasNodeFlags = FlowFlags.Start |
            FlowFlags.Assignment |
            FlowFlags.Call |
            FlowFlags.Condition |
            FlowFlags.ArrayMutation;

        const links: Record<number, FlowGraphNode> = Object.create(/*o*/ null); // eslint-disable-line no-restricted-syntax
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

        function hasAntecedents(f: FlowNode): f is FlowLabel & { antecedent: FlowNode[]; } {
            return !!(f.flags & FlowFlags.Label) && !!(f as FlowLabel).antecedent;
        }

        function hasAntecedent(f: FlowNode): f is Extract<FlowNode, { antecedent: FlowNode; }> {
            return !!(f.flags & hasAntecedentFlags);
        }

        function hasNode(f: FlowNode): f is Extract<FlowNode, { node?: Node; }> {
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
                    circular: "circularity",
                };
                nodes.push(graphNode);
                return graphNode;
            }
            seen.add(flowNode);
            if (!graphNode) {
                links[id] = graphNode = { id, flowNode, edges: [], text: "", lane: -1, endLane: -1, level: -1, circular: false };
                nodes.push(graphNode);
                if (hasAntecedents(flowNode)) {
                    for (const antecedent of flowNode.antecedent) {
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

        function getNodeText(node: Node) {
            const sourceFile = getSourceFileOfNode(node);
            return getSourceTextOfNodeFromSourceFile(sourceFile, node, /*includeTrivia*/ false);
        }

        function renderFlowNode(flowNode: FlowNode, circular: boolean | "circularity") {
            let text = getHeader(flowNode.flags);
            if (circular) {
                text = `${text}#${getDebugFlowNodeId(flowNode)}`;
            }
            if (isFlowSwitchClause(flowNode)) {
                const clauses: string[] = [];
                const { switchStatement, clauseStart, clauseEnd } = flowNode.node;
                for (let i = clauseStart; i < clauseEnd; i++) {
                    const clause = switchStatement.caseBlock.clauses[i];
                    if (isDefaultClause(clause)) {
                        clauses.push("default");
                    }
                    else {
                        clauses.push(getNodeText(clause.expression));
                    }
                }
                text += ` (${clauses.join(", ")})`;
            }
            else if (hasNode(flowNode)) {
                if (flowNode.node) {
                    text += ` (${getNodeText(flowNode.node)})`;
                }
            }
            return circular === "circularity" ? `Circular(${text})` : text;
        }

        function renderGraph() {
            const columnCount = columnWidths.length;
            const laneCount = maxBy(nodes, 0, n => n.lane) + 1;
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
                case Connection.UpDown:
                    return BoxCharacter.ud;
                case Connection.LeftRight:
                    return BoxCharacter.lr;
                case Connection.UpLeft:
                    return BoxCharacter.ul;
                case Connection.UpRight:
                    return BoxCharacter.ur;
                case Connection.DownLeft:
                    return BoxCharacter.dl;
                case Connection.DownRight:
                    return BoxCharacter.dr;
                case Connection.UpDownLeft:
                    return BoxCharacter.udl;
                case Connection.UpDownRight:
                    return BoxCharacter.udr;
                case Connection.UpLeftRight:
                    return BoxCharacter.ulr;
                case Connection.DownLeftRight:
                    return BoxCharacter.dlr;
                case Connection.UpDownLeftRight:
                    return BoxCharacter.udlr;
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
