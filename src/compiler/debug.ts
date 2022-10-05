/* @internal */
namespace ts {
export enum LogLevel {
    Off,
    Error,
    Warning,
    Info,
    Verbose
}

export interface LoggingHost {
    log(level: LogLevel, s: string): void;
}

export interface DeprecationOptions {
    message?: string;
    error?: boolean;
    since?: ts.Version | string;
    warnAfter?: ts.Version | string;
    errorAfter?: ts.Version | string;
    typeScriptVersion?: ts.Version | string;
    name?: string;
}

export namespace Debug {
    let typeScriptVersion: ts.Version | undefined;

    /* eslint-disable prefer-const */
    let currentAssertionLevel = ts.AssertionLevel.None;
    export let currentLogLevel = LogLevel.Warning;
    export let isDebugging = false;
    export let loggingHost: LoggingHost | undefined;
    export let enableDeprecationWarnings = true;
    /* eslint-enable prefer-const */

    type AssertionKeys = ts.MatchingKeys<typeof Debug, ts.AnyFunction>;
    export function getTypeScriptVersion() {
        return typeScriptVersion ?? (typeScriptVersion = new ts.Version(ts.version));
    }

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

    const assertionCache: Partial<Record<AssertionKeys, { level: ts.AssertionLevel, assertion: ts.AnyFunction }>> = {};

    export function getAssertionLevel() {
        return currentAssertionLevel;
    }

    export function setAssertionLevel(level: ts.AssertionLevel) {
        const prevAssertionLevel = currentAssertionLevel;
        currentAssertionLevel = level;

        if (level > prevAssertionLevel) {
            // restore assertion functions for the current assertion level (see `shouldAssertFunction`).
            for (const key of ts.getOwnKeys(assertionCache) as AssertionKeys[]) {
                const cachedFunc = assertionCache[key];
                if (cachedFunc !== undefined && Debug[key] !== cachedFunc.assertion && level >= cachedFunc.level) {
                    (Debug as any)[key] = cachedFunc;
                    assertionCache[key] = undefined;
                }
            }
        }
    }

    export function shouldAssert(level: ts.AssertionLevel): boolean {
        return currentAssertionLevel >= level;
    }

    /**
     * Tests whether an assertion function should be executed. If it shouldn't, it is cached and replaced with `ts.noop`.
     * Replaced assertion functions are restored when `Debug.setAssertionLevel` is set to a high enough level.
     * @param level The minimum assertion level required.
     * @param name The name of the current assertion function.
     */
    function shouldAssertFunction<K extends AssertionKeys>(level: ts.AssertionLevel, name: K): boolean {
        if (!shouldAssert(level)) {
            assertionCache[name] = { level, assertion: Debug[name] };
            (Debug as any)[name] = ts.noop;
            return false;
        }
        return true;
    }

    export function fail(message?: string, stackCrawlMark?: ts.AnyFunction): never {
        debugger;
        const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(e, stackCrawlMark || fail);
        }
        throw e;
    }

    export function failBadSyntaxKind(node: ts.Node, message?: string, stackCrawlMark?: ts.AnyFunction): never {
        return fail(
            `${message || "Unexpected node."}\r\nNode ${formatSyntaxKind(node.kind)} was unexpected.`,
            stackCrawlMark || failBadSyntaxKind);
    }

    export function assert(expression: unknown, message?: string, verboseDebugInfo?: string | (() => string), stackCrawlMark?: ts.AnyFunction): asserts expression {
        if (!expression) {
            message = message ? `False expression: ${message}` : "False expression.";
            if (verboseDebugInfo) {
                message += "\r\nVerbose Debug Information: " + (typeof verboseDebugInfo === "string" ? verboseDebugInfo : verboseDebugInfo());
            }
            fail(message, stackCrawlMark || assert);
        }
    }

    export function assertEqual<T>(a: T, b: T, msg?: string, msg2?: string, stackCrawlMark?: ts.AnyFunction): void {
        if (a !== b) {
            const message = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
            fail(`Expected ${a} === ${b}. ${message}`, stackCrawlMark || assertEqual);
        }
    }

    export function assertLessThan(a: number, b: number, msg?: string, stackCrawlMark?: ts.AnyFunction): void {
        if (a >= b) {
            fail(`Expected ${a} < ${b}. ${msg || ""}`, stackCrawlMark || assertLessThan);
        }
    }

    export function assertLessThanOrEqual(a: number, b: number, stackCrawlMark?: ts.AnyFunction): void {
        if (a > b) {
            fail(`Expected ${a} <= ${b}`, stackCrawlMark || assertLessThanOrEqual);
        }
    }

    export function assertGreaterThanOrEqual(a: number, b: number, stackCrawlMark?: ts.AnyFunction): void {
        if (a < b) {
            fail(`Expected ${a} >= ${b}`, stackCrawlMark || assertGreaterThanOrEqual);
        }
    }

    export function assertIsDefined<T>(value: T, message?: string, stackCrawlMark?: ts.AnyFunction): asserts value is NonNullable<T> {
        // eslint-disable-next-line no-null/no-null
        if (value === undefined || value === null) {
            fail(message, stackCrawlMark || assertIsDefined);
        }
    }

    export function checkDefined<T>(value: T | null | undefined, message?: string, stackCrawlMark?: ts.AnyFunction): T {
        assertIsDefined(value, message, stackCrawlMark || checkDefined);
        return value;
    }

    export function assertEachIsDefined<T extends ts.Node>(value: ts.NodeArray<T>, message?: string, stackCrawlMark?: ts.AnyFunction): asserts value is ts.NodeArray<T>;
    export function assertEachIsDefined<T>(value: readonly T[], message?: string, stackCrawlMark?: ts.AnyFunction): asserts value is readonly NonNullable<T>[];
    export function assertEachIsDefined<T>(value: readonly T[], message?: string, stackCrawlMark?: ts.AnyFunction) {
        for (const v of value) {
            assertIsDefined(v, message, stackCrawlMark || assertEachIsDefined);
        }
    }

    export function checkEachDefined<T, A extends readonly T[]>(value: A, message?: string, stackCrawlMark?: ts.AnyFunction): A {
        assertEachIsDefined(value, message, stackCrawlMark || checkEachDefined);
        return value;
    }

    export function assertNever(member: never, message = "Illegal value:", stackCrawlMark?: ts.AnyFunction): never {
        const detail = typeof member === "object" && ts.hasProperty(member, "kind") && ts.hasProperty(member, "pos") ? "SyntaxKind: " + formatSyntaxKind((member as ts.Node).kind) : JSON.stringify(member);
        return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
    }

    export function assertEachNode<T extends ts.Node, U extends T>(nodes: ts.NodeArray<T>, test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts nodes is ts.NodeArray<U>;
    export function assertEachNode<T extends ts.Node, U extends T>(nodes: readonly T[], test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts nodes is readonly U[];
    export function assertEachNode<T extends ts.Node, U extends T>(nodes: ts.NodeArray<T> | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts nodes is ts.NodeArray<U> | undefined;
    export function assertEachNode<T extends ts.Node, U extends T>(nodes: readonly T[] | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts nodes is readonly U[] | undefined;
    export function assertEachNode(nodes: readonly ts.Node[], test: (node: ts.Node) => boolean, message?: string, stackCrawlMark?: ts.AnyFunction): void;
    export function assertEachNode(nodes: readonly ts.Node[] | undefined, test: (node: ts.Node) => boolean, message?: string, stackCrawlMark?: ts.AnyFunction) {
        if (shouldAssertFunction(ts.AssertionLevel.Normal, "assertEachNode")) {
            assert(
                test === undefined || ts.every(nodes, test),
                message || "Unexpected node.",
                () => `Node array did not pass test '${getFunctionName(test)}'.`,
                stackCrawlMark || assertEachNode);
        }
    }

    export function assertNode<T extends ts.Node, U extends T>(node: T | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is U;
    export function assertNode(node: ts.Node | undefined, test: ((node: ts.Node) => boolean) | undefined, message?: string, stackCrawlMark?: ts.AnyFunction): void;
    export function assertNode(node: ts.Node | undefined, test: ((node: ts.Node) => boolean) | undefined, message?: string, stackCrawlMark?: ts.AnyFunction) {
        if (shouldAssertFunction(ts.AssertionLevel.Normal, "assertNode")) {
            assert(
                node !== undefined && (test === undefined || test(node)),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertNode);
        }
    }

    export function assertNotNode<T extends ts.Node, U extends T>(node: T | undefined, test: (node: ts.Node) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is Exclude<T, U>;
    export function assertNotNode(node: ts.Node | undefined, test: ((node: ts.Node) => boolean) | undefined, message?: string, stackCrawlMark?: ts.AnyFunction): void;
    export function assertNotNode(node: ts.Node | undefined, test: ((node: ts.Node) => boolean) | undefined, message?: string, stackCrawlMark?: ts.AnyFunction) {
        if (shouldAssertFunction(ts.AssertionLevel.Normal, "assertNotNode")) {
            assert(
                node === undefined || test === undefined || !test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} should not have passed test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertNotNode);
        }
    }

    export function assertOptionalNode<T extends ts.Node, U extends T>(node: T, test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is U;
    export function assertOptionalNode<T extends ts.Node, U extends T>(node: T | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is U | undefined;
    export function assertOptionalNode(node: ts.Node | undefined, test: ((node: ts.Node) => boolean) | undefined, message?: string, stackCrawlMark?: ts.AnyFunction): void;
    export function assertOptionalNode(node: ts.Node | undefined, test: ((node: ts.Node) => boolean) | undefined, message?: string, stackCrawlMark?: ts.AnyFunction) {
        if (shouldAssertFunction(ts.AssertionLevel.Normal, "assertOptionalNode")) {
            assert(
                test === undefined || node === undefined || test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertOptionalNode);
        }
    }

    export function assertOptionalToken<T extends ts.Node, K extends ts.SyntaxKind>(node: T, kind: K, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is Extract<T, { readonly kind: K }>;
    export function assertOptionalToken<T extends ts.Node, K extends ts.SyntaxKind>(node: T | undefined, kind: K, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is Extract<T, { readonly kind: K }> | undefined;
    export function assertOptionalToken(node: ts.Node | undefined, kind: ts.SyntaxKind | undefined, message?: string, stackCrawlMark?: ts.AnyFunction): void;
    export function assertOptionalToken(node: ts.Node | undefined, kind: ts.SyntaxKind | undefined, message?: string, stackCrawlMark?: ts.AnyFunction) {
        if (shouldAssertFunction(ts.AssertionLevel.Normal, "assertOptionalToken")) {
            assert(
                kind === undefined || node === undefined || node.kind === kind,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
                stackCrawlMark || assertOptionalToken);
        }
    }

    export function assertMissingNode(node: ts.Node | undefined, message?: string, stackCrawlMark?: ts.AnyFunction): asserts node is undefined;
    export function assertMissingNode(node: ts.Node | undefined, message?: string, stackCrawlMark?: ts.AnyFunction) {
        if (shouldAssertFunction(ts.AssertionLevel.Normal, "assertMissingNode")) {
            assert(
                node === undefined,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} was unexpected'.`,
                stackCrawlMark || assertMissingNode);
        }
    }

    /**
     * Asserts a value has the specified type in typespace only (does not perform a runtime assertion).
     * This is useful in cases where we switch on `node.kind` and can be reasonably sure the type is accurate, and
     * as a result can reduce the number of unnecessary casts.
     */
    export function type<T>(value: unknown): asserts value is T;
    export function type(_value: unknown) { }

    export function getFunctionName(func: ts.AnyFunction) {
        if (typeof func !== "function") {
            return "";
        }
        else if (ts.hasProperty(func, "name")) {
            return (func as any).name;
        }
        else {
            const text = Function.prototype.toString.call(func);
            const match = /^function\s+([\w\$]+)\s*\(/.exec(text);
            return match ? match[1] : "";
        }
    }

    export function formatSymbol(symbol: ts.Symbol): string {
        return `{ name: ${ts.unescapeLeadingUnderscores(symbol.escapedName)}; flags: ${formatSymbolFlags(symbol.flags)}; declarations: ${ts.map(symbol.declarations, node => formatSyntaxKind(node.kind))} }`;
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

    const enumMemberCache = new ts.Map<any, ts.SortedReadonlyArray<[number, string]>>();

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

        const sorted = ts.stableSort<[number, string]>(result, (x, y) => ts.compareValues(x[0], y[0]));
        enumMemberCache.set(enumObject, sorted);
        return sorted;
    }

    export function formatSyntaxKind(kind: ts.SyntaxKind | undefined): string {
        return formatEnum(kind, (ts as any).SyntaxKind, /*isFlags*/ false);
    }

    export function formatSnippetKind(kind: ts.SnippetKind | undefined): string {
        return formatEnum(kind, (ts as any).SnippetKind, /*isFlags*/ false);
    }

    export function formatNodeFlags(flags: ts.NodeFlags | undefined): string {
        return formatEnum(flags, (ts as any).NodeFlags, /*isFlags*/ true);
    }

    export function formatModifierFlags(flags: ts.ModifierFlags | undefined): string {
        return formatEnum(flags, (ts as any).ModifierFlags, /*isFlags*/ true);
    }

    export function formatTransformFlags(flags: ts.TransformFlags | undefined): string {
        return formatEnum(flags, (ts as any).TransformFlags, /*isFlags*/ true);
    }

    export function formatEmitFlags(flags: ts.EmitFlags | undefined): string {
        return formatEnum(flags, (ts as any).EmitFlags, /*isFlags*/ true);
    }

    export function formatSymbolFlags(flags: ts.SymbolFlags | undefined): string {
        return formatEnum(flags, (ts as any).SymbolFlags, /*isFlags*/ true);
    }

    export function formatTypeFlags(flags: ts.TypeFlags | undefined): string {
        return formatEnum(flags, (ts as any).TypeFlags, /*isFlags*/ true);
    }

    export function formatSignatureFlags(flags: ts.SignatureFlags | undefined): string {
        return formatEnum(flags, (ts as any).SignatureFlags, /*isFlags*/ true);
    }

    export function formatObjectFlags(flags: ts.ObjectFlags | undefined): string {
        return formatEnum(flags, (ts as any).ObjectFlags, /*isFlags*/ true);
    }

    export function formatFlowFlags(flags: ts.FlowFlags | undefined): string {
        return formatEnum(flags, (ts as any).FlowFlags, /*isFlags*/ true);
    }

    export function formatRelationComparisonResult(result: ts.RelationComparisonResult | undefined): string {
        return formatEnum(result, (ts as any).RelationComparisonResult, /*isFlags*/ true);
    }

    export function formatCheckMode(mode: ts.CheckMode | undefined): string {
        return formatEnum(mode, (ts as any).CheckMode, /*isFlags*/ true);
    }

    export function formatSignatureCheckMode(mode: ts.SignatureCheckMode | undefined): string {
        return formatEnum(mode, (ts as any).SignatureCheckMode, /*isFlags*/ true);
    }

    export function formatTypeFacts(facts: ts.TypeFacts | undefined): string {
        return formatEnum(facts, (ts as any).TypeFacts, /*isFlags*/ true);
    }

    let isDebugInfoEnabled = false;

    interface ExtendedDebugModule {
        init(_ts: typeof ts): void;
        formatControlFlowGraph(flowNode: ts.FlowNode): string;
    }

    let extendedDebugModule: ExtendedDebugModule | undefined;

    function extendedDebug() {
        enableDebugInfo();
        if (!extendedDebugModule) {
            throw new Error("Debugging helpers could not be loaded.");
        }
        return extendedDebugModule;
    }

    export function printControlFlowGraph(flowNode: ts.FlowNode) {
        return console.log(formatControlFlowGraph(flowNode));
    }

    export function formatControlFlowGraph(flowNode: ts.FlowNode) {
        return extendedDebug().formatControlFlowGraph(flowNode);
    }

    let flowNodeProto: ts.FlowNodeBase | undefined;

    function attachFlowNodeDebugInfoWorker(flowNode: ts.FlowNodeBase) {
        if (!("__debugFlowFlags" in flowNode)) { // eslint-disable-line local/no-in-operator
            Object.defineProperties(flowNode, {
                // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                __tsDebuggerDisplay: {
                    value(this: ts.FlowNodeBase) {
                        const flowHeader =
                            this.flags & ts.FlowFlags.Start ? "FlowStart" :
                            this.flags & ts.FlowFlags.BranchLabel ? "FlowBranchLabel" :
                            this.flags & ts.FlowFlags.LoopLabel ? "FlowLoopLabel" :
                            this.flags & ts.FlowFlags.Assignment ? "FlowAssignment" :
                            this.flags & ts.FlowFlags.TrueCondition ? "FlowTrueCondition" :
                            this.flags & ts.FlowFlags.FalseCondition ? "FlowFalseCondition" :
                            this.flags & ts.FlowFlags.SwitchClause ? "FlowSwitchClause" :
                            this.flags & ts.FlowFlags.ArrayMutation ? "FlowArrayMutation" :
                            this.flags & ts.FlowFlags.Call ? "FlowCall" :
                            this.flags & ts.FlowFlags.ReduceLabel ? "FlowReduceLabel" :
                            this.flags & ts.FlowFlags.Unreachable ? "FlowUnreachable" :
                            "UnknownFlow";
                        const remainingFlags = this.flags & ~(ts.FlowFlags.Referenced - 1);
                        return `${flowHeader}${remainingFlags ? ` (${formatFlowFlags(remainingFlags)})`: ""}`;
                    }
                },
                __debugFlowFlags: { get(this: ts.FlowNodeBase) { return formatEnum(this.flags, (ts as any).FlowFlags, /*isFlags*/ true); } },
                __debugToString: { value(this: ts.FlowNodeBase) { return formatControlFlowGraph(this); } }
            });
        }
    }

    export function attachFlowNodeDebugInfo(flowNode: ts.FlowNodeBase) {
        if (isDebugInfoEnabled) {
            if (typeof Object.setPrototypeOf === "function") {
                // if we're in es2015, attach the method to a shared prototype for `FlowNode`
                // so the method doesn't show up in the watch window.
                if (!flowNodeProto) {
                    flowNodeProto = Object.create(Object.prototype) as ts.FlowNodeBase;
                    attachFlowNodeDebugInfoWorker(flowNodeProto);
                }
                Object.setPrototypeOf(flowNode, flowNodeProto);
            }
            else {
                // not running in an es2015 environment, attach the method directly.
                attachFlowNodeDebugInfoWorker(flowNode);
            }
        }
    }

    let nodeArrayProto: ts.NodeArray<ts.Node> | undefined;

    function attachNodeArrayDebugInfoWorker(array: ts.NodeArray<ts.Node>) {
        if (!("__tsDebuggerDisplay" in array)) { // eslint-disable-line local/no-in-operator
            Object.defineProperties(array, {
                __tsDebuggerDisplay: {
                    value(this: ts.NodeArray<ts.Node>, defaultValue: string) {
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

    export function attachNodeArrayDebugInfo(array: ts.NodeArray<ts.Node>) {
        if (isDebugInfoEnabled) {
            if (typeof Object.setPrototypeOf === "function") {
                // if we're in es2015, attach the method to a shared prototype for `NodeArray`
                // so the method doesn't show up in the watch window.
                if (!nodeArrayProto) {
                    nodeArrayProto = Object.create(Array.prototype) as ts.NodeArray<ts.Node>;
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
    export function enableDebugInfo() {
        if (isDebugInfoEnabled) return;

        // avoid recomputing
        let weakTypeTextMap: WeakMap<ts.Type, string> | undefined;
        let weakNodeTextMap: WeakMap<ts.Node, string> | undefined;

        function getWeakTypeTextMap() {
            if (weakTypeTextMap === undefined) {
                if (typeof WeakMap === "function") weakTypeTextMap = new WeakMap();
            }
            return weakTypeTextMap;
        }

        function getWeakNodeTextMap() {
            if (weakNodeTextMap === undefined) {
                if (typeof WeakMap === "function") weakNodeTextMap = new WeakMap();
            }
            return weakNodeTextMap;
        }


        // Add additional properties in debug mode to assist with debugging.
        Object.defineProperties(ts.objectAllocator.getSymbolConstructor().prototype, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: ts.Symbol) {
                    const symbolHeader =
                        this.flags & ts.SymbolFlags.Transient ? "TransientSymbol" :
                        "Symbol";
                    const remainingSymbolFlags = this.flags & ~ts.SymbolFlags.Transient;
                    return `${symbolHeader} '${ts.symbolName(this)}'${remainingSymbolFlags ? ` (${formatSymbolFlags(remainingSymbolFlags)})` : ""}`;
                }
            },
            __debugFlags: { get(this: ts.Symbol) { return formatSymbolFlags(this.flags); } }
        });

        Object.defineProperties(ts.objectAllocator.getTypeConstructor().prototype, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: ts.Type) {
                    const typeHeader =
                        this.flags & ts.TypeFlags.Nullable ? "NullableType" :
                        this.flags & ts.TypeFlags.StringOrNumberLiteral ? `LiteralType ${JSON.stringify((this as ts.LiteralType).value)}` :
                        this.flags & ts.TypeFlags.BigIntLiteral ? `LiteralType ${(this as ts.BigIntLiteralType).value.negative ? "-" : ""}${(this as ts.BigIntLiteralType).value.base10Value}n` :
                        this.flags & ts.TypeFlags.UniqueESSymbol ? "UniqueESSymbolType" :
                        this.flags & ts.TypeFlags.Enum ? "EnumType" :
                        this.flags & ts.TypeFlags.Intrinsic ? `IntrinsicType ${(this as ts.IntrinsicType).intrinsicName}` :
                        this.flags & ts.TypeFlags.Union ? "UnionType" :
                        this.flags & ts.TypeFlags.Intersection ? "IntersectionType" :
                        this.flags & ts.TypeFlags.Index ? "IndexType" :
                        this.flags & ts.TypeFlags.IndexedAccess ? "IndexedAccessType" :
                        this.flags & ts.TypeFlags.Conditional ? "ConditionalType" :
                        this.flags & ts.TypeFlags.Substitution ? "SubstitutionType" :
                        this.flags & ts.TypeFlags.TypeParameter ? "TypeParameter" :
                        this.flags & ts.TypeFlags.Object ?
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.ClassOrInterface ? "InterfaceType" :
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.Reference ? "TypeReference" :
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.Tuple ? "TupleType" :
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.Anonymous ? "AnonymousType" :
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.Mapped ? "MappedType" :
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.ReverseMapped ? "ReverseMappedType" :
                            (this as ts.ObjectType).objectFlags & ts.ObjectFlags.EvolvingArray ? "EvolvingArrayType" :
                            "ObjectType" :
                        "Type";
                    const remainingObjectFlags = this.flags & ts.TypeFlags.Object ? (this as ts.ObjectType).objectFlags & ~ts.ObjectFlags.ObjectTypeKindMask : 0;
                    return `${typeHeader}${this.symbol ? ` '${ts.symbolName(this.symbol)}'` : ""}${remainingObjectFlags ? ` (${formatObjectFlags(remainingObjectFlags)})` : ""}`;
                }
            },
            __debugFlags: { get(this: ts.Type) { return formatTypeFlags(this.flags); } },
            __debugObjectFlags: { get(this: ts.Type) { return this.flags & ts.TypeFlags.Object ? formatObjectFlags((this as ts.ObjectType).objectFlags) : ""; } },
            __debugTypeToString: {
                value(this: ts.Type) {
                    // avoid recomputing
                    const map = getWeakTypeTextMap();
                    let text = map?.get(this);
                    if (text === undefined) {
                        text = this.checker.typeToString(this);
                        map?.set(this, text);
                    }
                    return text;
                }
            },
        });

        Object.defineProperties(ts.objectAllocator.getSignatureConstructor().prototype, {
            __debugFlags: { get(this: ts.Signature) { return formatSignatureFlags(this.flags); } },
            __debugSignatureToString: { value(this: ts.Signature) { return this.checker?.signatureToString(this); } }
        });

        const nodeConstructors = [
            ts.objectAllocator.getNodeConstructor(),
            ts.objectAllocator.getIdentifierConstructor(),
            ts.objectAllocator.getTokenConstructor(),
            ts.objectAllocator.getSourceFileConstructor()
        ];

        for (const ctor of nodeConstructors) {
            if (!ts.hasProperty(ctor.prototype, "__debugKind")) {
                Object.defineProperties(ctor.prototype, {
                    // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                    __tsDebuggerDisplay: {
                        value(this: ts.Node) {
                            const nodeHeader =
                                ts.isGeneratedIdentifier(this) ? "GeneratedIdentifier" :
                                ts.isIdentifier(this) ? `Identifier '${ts.idText(this)}'` :
                                ts.isPrivateIdentifier(this) ? `PrivateIdentifier '${ts.idText(this)}'` :
                                ts.isStringLiteral(this) ? `StringLiteral ${JSON.stringify(this.text.length < 10 ? this.text : this.text.slice(10) + "...")}` :
                                ts.isNumericLiteral(this) ? `NumericLiteral ${this.text}` :
                                ts.isBigIntLiteral(this) ? `BigIntLiteral ${this.text}n` :
                                ts.isTypeParameterDeclaration(this) ? "TypeParameterDeclaration" :
                                ts.isParameter(this) ? "ParameterDeclaration" :
                                ts.isConstructorDeclaration(this) ? "ConstructorDeclaration" :
                                ts.isGetAccessorDeclaration(this) ? "GetAccessorDeclaration" :
                                ts.isSetAccessorDeclaration(this) ? "SetAccessorDeclaration" :
                                ts.isCallSignatureDeclaration(this) ? "CallSignatureDeclaration" :
                                ts.isConstructSignatureDeclaration(this) ? "ConstructSignatureDeclaration" :
                                ts.isIndexSignatureDeclaration(this) ? "IndexSignatureDeclaration" :
                                ts.isTypePredicateNode(this) ? "TypePredicateNode" :
                                ts.isTypeReferenceNode(this) ? "TypeReferenceNode" :
                                ts.isFunctionTypeNode(this) ? "FunctionTypeNode" :
                                ts.isConstructorTypeNode(this) ? "ConstructorTypeNode" :
                                ts.isTypeQueryNode(this) ? "TypeQueryNode" :
                                ts.isTypeLiteralNode(this) ? "TypeLiteralNode" :
                                ts.isArrayTypeNode(this) ? "ArrayTypeNode" :
                                ts.isTupleTypeNode(this) ? "TupleTypeNode" :
                                ts.isOptionalTypeNode(this) ? "OptionalTypeNode" :
                                ts.isRestTypeNode(this) ? "RestTypeNode" :
                                ts.isUnionTypeNode(this) ? "UnionTypeNode" :
                                ts.isIntersectionTypeNode(this) ? "IntersectionTypeNode" :
                                ts.isConditionalTypeNode(this) ? "ConditionalTypeNode" :
                                ts.isInferTypeNode(this) ? "InferTypeNode" :
                                ts.isParenthesizedTypeNode(this) ? "ParenthesizedTypeNode" :
                                ts.isThisTypeNode(this) ? "ThisTypeNode" :
                                ts.isTypeOperatorNode(this) ? "TypeOperatorNode" :
                                ts.isIndexedAccessTypeNode(this) ? "IndexedAccessTypeNode" :
                                ts.isMappedTypeNode(this) ? "MappedTypeNode" :
                                ts.isLiteralTypeNode(this) ? "LiteralTypeNode" :
                                ts.isNamedTupleMember(this) ? "NamedTupleMember" :
                                ts.isImportTypeNode(this) ? "ImportTypeNode" :
                                formatSyntaxKind(this.kind);
                            return `${nodeHeader}${this.flags ? ` (${formatNodeFlags(this.flags)})` : ""}`;
                        }
                    },
                    __debugKind: { get(this: ts.Node) { return formatSyntaxKind(this.kind); } },
                    __debugNodeFlags: { get(this: ts.Node) { return formatNodeFlags(this.flags); } },
                    __debugModifierFlags: { get(this: ts.Node) { return formatModifierFlags(ts.getEffectiveModifierFlagsNoCache(this)); } },
                    __debugTransformFlags: { get(this: ts.Node) { return formatTransformFlags(this.transformFlags); } },
                    __debugIsParseTreeNode: { get(this: ts.Node) { return ts.isParseTreeNode(this); } },
                    __debugEmitFlags: { get(this: ts.Node) { return formatEmitFlags(ts.getEmitFlags(this)); } },
                    __debugGetText: {
                        value(this: ts.Node, includeTrivia?: boolean) {
                            if (ts.nodeIsSynthesized(this)) return "";
                            // avoid recomputing
                            const map = getWeakNodeTextMap();
                            let text = map?.get(this);
                            if (text === undefined) {
                                const parseNode = ts.getParseTreeNode(this);
                                const sourceFile = parseNode && ts.getSourceFileOfNode(parseNode);
                                text = sourceFile ? ts.getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
                                map?.set(this, text);
                            }
                            return text;
                        }
                    }
                });
            }
        }

        // attempt to load extended debugging information
        try {
            if (ts.sys && ts.sys.require) {
                const basePath = ts.getDirectoryPath(ts.resolvePath(ts.sys.getExecutingFilePath()));
                const result = ts.sys.require(basePath, "./compiler-debug") as ts.RequireResult<ExtendedDebugModule>;
                if (!result.error) {
                    result.module.init(ts);
                    extendedDebugModule = result.module;
                }
            }
        }
        catch {
            // do nothing
        }

        isDebugInfoEnabled = true;
    }

    function formatDeprecationMessage(name: string, error: boolean | undefined, errorAfter: ts.Version | undefined, since: ts.Version | undefined, message: string | undefined) {
        let deprecationMessage = error ? "DeprecationError: " : "DeprecationWarning: ";
        deprecationMessage += `'${name}' `;
        deprecationMessage += since ? `has been deprecated since v${since}` : "is deprecated";
        deprecationMessage += error ? " and can no longer be used." : errorAfter ? ` and will no longer be usable after v${errorAfter}.` : ".";
        deprecationMessage += message ? ` ${ts.formatStringFromArgs(message, [name], 0)}` : "";
        return deprecationMessage;
    }

    function createErrorDeprecation(name: string, errorAfter: ts.Version | undefined, since: ts.Version | undefined, message: string | undefined) {
        const deprecationMessage = formatDeprecationMessage(name, /*error*/ true, errorAfter, since, message);
        return () => {
            throw new TypeError(deprecationMessage);
        };
    }

    function createWarningDeprecation(name: string, errorAfter: ts.Version | undefined, since: ts.Version | undefined, message: string | undefined) {
        let hasWrittenDeprecation = false;
        return () => {
            if (enableDeprecationWarnings && !hasWrittenDeprecation) {
                log.warn(formatDeprecationMessage(name, /*error*/ false, errorAfter, since, message));
                hasWrittenDeprecation = true;
            }
        };
    }

    export function createDeprecation(name: string, options: DeprecationOptions & { error: true }): () => never;
    export function createDeprecation(name: string, options?: DeprecationOptions): () => void;
    export function createDeprecation(name: string, options: DeprecationOptions = {}) {
        const version = typeof options.typeScriptVersion === "string" ? new ts.Version(options.typeScriptVersion) : options.typeScriptVersion ?? getTypeScriptVersion();
        const errorAfter = typeof options.errorAfter === "string" ? new ts.Version(options.errorAfter) : options.errorAfter;
        const warnAfter = typeof options.warnAfter === "string" ? new ts.Version(options.warnAfter) : options.warnAfter;
        const since = typeof options.since === "string" ? new ts.Version(options.since) : options.since ?? warnAfter;
        const error = options.error || errorAfter && version.compareTo(errorAfter) <= 0;
        const warn = !warnAfter || version.compareTo(warnAfter) >= 0;
        return error ? createErrorDeprecation(name, errorAfter, since, options.message) :
            warn ? createWarningDeprecation(name, errorAfter, since, options.message) :
            ts.noop;
    }

    function wrapFunction<F extends (...args: any[]) => any>(deprecation: () => void, func: F): F {
        return function (this: unknown) {
            deprecation();
            return func.apply(this, arguments);
        } as F;
    }

    export function deprecate<F extends (...args: any[]) => any>(func: F, options?: DeprecationOptions): F {
        const deprecation = createDeprecation(options?.name ?? getFunctionName(func), options);
        return wrapFunction(deprecation, func);
    }

    export function formatVariance(varianceFlags: ts.VarianceFlags) {
        const variance = varianceFlags & ts.VarianceFlags.VarianceMask;
        let result =
            variance === ts.VarianceFlags.Invariant ? "in out" :
            variance === ts.VarianceFlags.Bivariant ? "[bivariant]" :
            variance === ts.VarianceFlags.Contravariant ? "in" :
            variance === ts.VarianceFlags.Covariant ? "out" :
            variance === ts.VarianceFlags.Independent ? "[independent]" : "";
        if (varianceFlags & ts.VarianceFlags.Unmeasurable) {
            result += " (unmeasurable)";
        }
        else if (varianceFlags & ts.VarianceFlags.Unreliable) {
            result += " (unreliable)";
        }
        return result;
    }

    export type DebugType = ts.Type & { __debugTypeToString(): string }; // eslint-disable-line @typescript-eslint/naming-convention
    export class DebugTypeMapper {
        declare kind: ts.TypeMapKind;
        __debugToString(): string { // eslint-disable-line @typescript-eslint/naming-convention
            type<ts.TypeMapper>(this);
            switch (this.kind) {
                case ts.TypeMapKind.Function: return this.debugInfo?.() || "(function mapper)";
                case ts.TypeMapKind.Simple: return `${(this.source as DebugType).__debugTypeToString()} -> ${(this.target as DebugType).__debugTypeToString()}`;
                case ts.TypeMapKind.Array: return ts.zipWith<DebugType, DebugType | string, unknown>(
                    this.sources as readonly DebugType[],
                    this.targets as readonly DebugType[] || ts.map(this.sources, () => "any"),
                    (s, t) => `${s.__debugTypeToString()} -> ${typeof t === "string" ? t : t.__debugTypeToString()}`).join(", ");
                case ts.TypeMapKind.Deferred: return ts.zipWith(
                    this.sources,
                    this.targets,
                    (s, t) => `${(s as DebugType).__debugTypeToString()} -> ${(t() as DebugType).__debugTypeToString()}`).join(", ");
                case ts.TypeMapKind.Merged:
                case ts.TypeMapKind.Composite: return `m1: ${(this.mapper1 as unknown as DebugTypeMapper).__debugToString().split("\n").join("\n    ")}
m2: ${(this.mapper2 as unknown as DebugTypeMapper).__debugToString().split("\n").join("\n    ")}`;
                default: return assertNever(this);
            }
        }
    }

    export function attachDebugPrototypeIfDebug(mapper: ts.TypeMapper): ts.TypeMapper {
        if (isDebugging) {
            return Object.setPrototypeOf(mapper, DebugTypeMapper.prototype);
        }
        return mapper;
    }
}
}
