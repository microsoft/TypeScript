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
        since?: Version | string;
        warnAfter?: Version | string;
        errorAfter?: Version | string;
        typeScriptVersion?: Version | string;
    }

    export namespace Debug {
        let typeScriptVersion: Version | undefined;

        /* eslint-disable prefer-const */
        let currentAssertionLevel = AssertionLevel.None;
        export let currentLogLevel = LogLevel.Warning;
        export let isDebugging = false;
        export let loggingHost: LoggingHost | undefined;
        /* eslint-enable prefer-const */

        type AssertionKeys = MatchingKeys<typeof Debug, AnyFunction>;
        export function getTypeScriptVersion() {
            return typeScriptVersion ?? (typeScriptVersion = new Version(version));
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

        const assertionCache: Partial<Record<AssertionKeys, { level: AssertionLevel, assertion: AnyFunction }>> = {};

        export function getAssertionLevel() {
            return currentAssertionLevel;
        }

        export function setAssertionLevel(level: AssertionLevel) {
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
            debugger;
            const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
            if ((<any>Error).captureStackTrace) {
                (<any>Error).captureStackTrace(e, stackCrawlMark || fail);
            }
            throw e;
        }

        export function failBadSyntaxKind(node: Node, message?: string, stackCrawlMark?: AnyFunction): never {
            return fail(
                `${message || "Unexpected node."}\r\nNode ${formatSyntaxKind(node.kind)} was unexpected.`,
                stackCrawlMark || failBadSyntaxKind);
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
            // eslint-disable-next-line no-null/no-null
            if (value === undefined || value === null) {
                fail(message, stackCrawlMark || assertIsDefined);
            }
        }

        export function checkDefined<T>(value: T | null | undefined, message?: string, stackCrawlMark?: AnyFunction): T {
            assertIsDefined(value, message, stackCrawlMark || checkDefined);
            return value;
        }

        /**
         * @deprecated Use `checkDefined` to check whether a value is defined inline. Use `assertIsDefined` to check whether
         * a value is defined at the statement level.
         */
        export const assertDefined = checkDefined;

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

        /**
         * @deprecated Use `checkEachDefined` to check whether the elements of an array are defined inline. Use `assertEachIsDefined` to check whether
         * the elements of an array are defined at the statement level.
         */
        export const assertEachDefined = checkEachDefined;

        export function assertNever(member: never, message = "Illegal value:", stackCrawlMark?: AnyFunction): never {
            const detail = typeof member === "object" && hasProperty(member, "kind") && hasProperty(member, "pos") && formatSyntaxKind ? "SyntaxKind: " + formatSyntaxKind((member as Node).kind) : JSON.stringify(member);
            return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
        }

        export function assertEachNode<T extends Node, U extends T>(nodes: NodeArray<T>, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts nodes is NodeArray<U>;
        export function assertEachNode<T extends Node, U extends T>(nodes: readonly T[], test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts nodes is readonly U[];
        export function assertEachNode(nodes: readonly Node[], test: (node: Node) => boolean, message?: string, stackCrawlMark?: AnyFunction): void;
        export function assertEachNode(nodes: readonly Node[], test: (node: Node) => boolean, message?: string, stackCrawlMark?: AnyFunction) {
            if (shouldAssertFunction(AssertionLevel.Normal, "assertEachNode")) {
                assert(
                    test === undefined || every(nodes, test),
                    message || "Unexpected node.",
                    () => `Node array did not pass test '${getFunctionName(test)}'.`,
                    stackCrawlMark || assertEachNode);
            }
        }

        export function assertNode<T extends Node, U extends T>(node: T | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is U;
        export function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
        export function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
            if (shouldAssertFunction(AssertionLevel.Normal, "assertNode")) {
                assert(
                    node !== undefined && (test === undefined || test(node)),
                    message || "Unexpected node.",
                    () => `Node ${formatSyntaxKind(node!.kind)} did not pass test '${getFunctionName(test!)}'.`,
                    stackCrawlMark || assertNode);
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
                    stackCrawlMark || assertNotNode);
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
                    () => `Node ${formatSyntaxKind(node!.kind)} did not pass test '${getFunctionName(test!)}'.`,
                    stackCrawlMark || assertOptionalNode);
            }
        }

        export function assertOptionalToken<T extends Node, K extends SyntaxKind>(node: T, kind: K, message?: string, stackCrawlMark?: AnyFunction): asserts node is Extract<T, { readonly kind: K }>;
        export function assertOptionalToken<T extends Node, K extends SyntaxKind>(node: T | undefined, kind: K, message?: string, stackCrawlMark?: AnyFunction): asserts node is Extract<T, { readonly kind: K }> | undefined;
        export function assertOptionalToken(node: Node | undefined, kind: SyntaxKind | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
        export function assertOptionalToken(node: Node | undefined, kind: SyntaxKind | undefined, message?: string, stackCrawlMark?: AnyFunction) {
            if (shouldAssertFunction(AssertionLevel.Normal, "assertOptionalToken")) {
                assert(
                    kind === undefined || node === undefined || node.kind === kind,
                    message || "Unexpected node.",
                    () => `Node ${formatSyntaxKind(node!.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
                    stackCrawlMark || assertOptionalToken);
            }
        }

        export function assertMissingNode(node: Node | undefined, message?: string, stackCrawlMark?: AnyFunction): asserts node is undefined;
        export function assertMissingNode(node: Node | undefined, message?: string, stackCrawlMark?: AnyFunction) {
            if (shouldAssertFunction(AssertionLevel.Normal, "assertMissingNode")) {
                assert(
                    node === undefined,
                    message || "Unexpected node.",
                    () => `Node ${formatSyntaxKind(node!.kind)} was unexpected'.`,
                    stackCrawlMark || assertMissingNode);
            }
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
                for (const [enumValue, enumName] of members) {
                    if (enumValue > value) {
                        break;
                    }
                    if (enumValue !== 0 && enumValue & value) {
                        result = `${result}${result ? "|" : ""}${enumName}`;
                        remainingFlags &= ~enumValue;
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

        export function formatSignatureFlags(flags: SignatureFlags | undefined): string {
            return formatEnum(flags, (<any>ts).SignatureFlags, /*isFlags*/ true);
        }

        export function formatObjectFlags(flags: ObjectFlags | undefined): string {
            return formatEnum(flags, (<any>ts).ObjectFlags, /*isFlags*/ true);
        }

        export function formatFlowFlags(flags: FlowFlags | undefined): string {
            return formatEnum(flags, (<any>ts).FlowFlags, /*isFlags*/ true);
        }

        let isDebugInfoEnabled = false;

        interface ExtendedDebugModule {
            init(_ts: typeof ts): void;
            formatControlFlowGraph(flowNode: FlowNode): string;
        }

        let extendedDebugModule: ExtendedDebugModule | undefined;

        function extendedDebug() {
            enableDebugInfo();
            if (!extendedDebugModule) {
                throw new Error("Debugging helpers could not be loaded.");
            }
            return extendedDebugModule;
        }

        export function printControlFlowGraph(flowNode: FlowNode) {
            return console.log(formatControlFlowGraph(flowNode));
        }

        export function formatControlFlowGraph(flowNode: FlowNode) {
            return extendedDebug().formatControlFlowGraph(flowNode);
        }

        let flowNodeProto: FlowNodeBase | undefined;

        function attachFlowNodeDebugInfoWorker(flowNode: FlowNodeBase) {
            if (!("__debugFlowFlags" in flowNode)) { // eslint-disable-line no-in-operator
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
                            return `${flowHeader}${remainingFlags ? ` (${formatFlowFlags(remainingFlags)})`: ""}`;
                        }
                    },
                    __debugFlowFlags: { get(this: FlowNodeBase) { return formatEnum(this.flags, (ts as any).FlowFlags, /*isFlags*/ true); } },
                    __debugToString: { value(this: FlowNodeBase) { return formatControlFlowGraph(this); } }
                });
            }
        }

        export function attachFlowNodeDebugInfo(flowNode: FlowNodeBase) {
            if (isDebugInfoEnabled) {
                if (typeof Object.setPrototypeOf === "function") {
                    // if we're in es2015, attach the method to a shared prototype for `FlowNode`
                    // so the method doesn't show up in the watch window.
                    if (!flowNodeProto) {
                        flowNodeProto = Object.create(Object.prototype) as FlowNodeBase;
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

        let nodeArrayProto: NodeArray<Node> | undefined;

        function attachNodeArrayDebugInfoWorker(array: NodeArray<Node>) {
            if (!("__tsDebuggerDisplay" in array)) { // eslint-disable-line no-in-operator
                Object.defineProperties(array, {
                    __tsDebuggerDisplay: {
                        value(this: NodeArray<Node>, defaultValue: string) {
                            // An `Array` with extra properties is rendered as `[A, B, prop1: 1, prop2: 2]`. Most of
                            // these aren't immediately useful so we trim off the `prop1: ..., prop2: ...` part from the
                            // formatted string.
                            defaultValue = String(defaultValue).replace(/(?:,[\s\w\d_]+:[^,]+)+\]$/, "]");
                            return `NodeArray ${defaultValue}`;
                        }
                    }
                });
            }
        }

        export function attachNodeArrayDebugInfo(array: NodeArray<Node>) {
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
        export function enableDebugInfo() {
            if (isDebugInfoEnabled) return;

            // avoid recomputing
            let weakTypeTextMap: WeakMap<Type, string> | undefined;
            let weakNodeTextMap: WeakMap<Node, string> | undefined;

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
            Object.defineProperties(objectAllocator.getSymbolConstructor().prototype, {
                // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                __tsDebuggerDisplay: {
                    value(this: Symbol) {
                        const symbolHeader =
                            this.flags & SymbolFlags.Transient ? "TransientSymbol" :
                            "Symbol";
                        const remainingSymbolFlags = this.flags & ~SymbolFlags.Transient;
                        return `${symbolHeader} '${symbolName(this)}'${remainingSymbolFlags ? ` (${formatSymbolFlags(remainingSymbolFlags)})` : ""}`;
                    }
                },
                __debugFlags: { get(this: Symbol) { return formatSymbolFlags(this.flags); } }
            });

            Object.defineProperties(objectAllocator.getTypeConstructor().prototype, {
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
                        return `${typeHeader}${this.symbol ? ` '${symbolName(this.symbol)}'` : ""}${remainingObjectFlags ? ` (${formatObjectFlags(remainingObjectFlags)})` : ""}`;
                    }
                },
                __debugFlags: { get(this: Type) { return formatTypeFlags(this.flags); } },
                __debugObjectFlags: { get(this: Type) { return this.flags & TypeFlags.Object ? formatObjectFlags((<ObjectType>this).objectFlags) : ""; } },
                __debugTypeToString: {
                    value(this: Type) {
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

            Object.defineProperties(objectAllocator.getSignatureConstructor().prototype, {
                __debugFlags: { get(this: Signature) { return formatSignatureFlags(this.flags); } },
                __debugSignatureToString: { value(this: Signature) { return this.checker?.signatureToString(this); } }
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
                                    formatSyntaxKind(this.kind);
                                return `${nodeHeader}${this.flags ? ` (${formatNodeFlags(this.flags)})` : ""}`;
                            }
                        },
                        __debugKind: { get(this: Node) { return formatSyntaxKind(this.kind); } },
                        __debugNodeFlags: { get(this: Node) { return formatNodeFlags(this.flags); } },
                        __debugModifierFlags: { get(this: Node) { return formatModifierFlags(getEffectiveModifierFlagsNoCache(this)); } },
                        __debugTransformFlags: { get(this: Node) { return formatTransformFlags(this.transformFlags); } },
                        __debugIsParseTreeNode: { get(this: Node) { return isParseTreeNode(this); } },
                        __debugEmitFlags: { get(this: Node) { return formatEmitFlags(getEmitFlags(this)); } },
                        __debugGetText: {
                            value(this: Node, includeTrivia?: boolean) {
                                if (nodeIsSynthesized(this)) return "";
                                // avoid recomputing
                                const map = getWeakNodeTextMap();
                                let text = map?.get(this);
                                if (text === undefined) {
                                    const parseNode = getParseTreeNode(this);
                                    const sourceFile = parseNode && getSourceFileOfNode(parseNode);
                                    text = sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode!, includeTrivia) : "";
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
                if (sys && sys.require) {
                    const basePath = getDirectoryPath(resolvePath(sys.getExecutingFilePath()));
                    const result = sys.require(basePath, "./compiler-debug") as RequireResult<ExtendedDebugModule>;
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

        function formatDeprecationMessage(name: string, error: boolean | undefined, errorAfter: Version | undefined, since: Version | undefined, message: string | undefined) {
            let deprecationMessage = error ? "DeprecationError: " : "DeprecationWarning: ";
            deprecationMessage += `'${name}' `;
            deprecationMessage += since ? `has been deprecated since v${since}` : "is deprecated";
            deprecationMessage += error ? " and can no longer be used." : errorAfter ? ` and will no longer be usable after v${errorAfter}.` : ".";
            deprecationMessage += message ? ` ${formatStringFromArgs(message, [name], 0)}` : "";
            return deprecationMessage;
        }

        function createErrorDeprecation(name: string, errorAfter: Version | undefined, since: Version | undefined, message: string | undefined) {
            const deprecationMessage = formatDeprecationMessage(name, /*error*/ true, errorAfter, since, message);
            return () => {
                throw new TypeError(deprecationMessage);
            };
        }

        function createWarningDeprecation(name: string, errorAfter: Version | undefined, since: Version | undefined, message: string | undefined) {
            let hasWrittenDeprecation = false;
            return () => {
                if (!hasWrittenDeprecation) {
                    log.warn(formatDeprecationMessage(name, /*error*/ false, errorAfter, since, message));
                    hasWrittenDeprecation = true;
                }
            };
        }

        function createDeprecation(name: string, options: DeprecationOptions & { error: true }): () => never;
        function createDeprecation(name: string, options?: DeprecationOptions): () => void;
        function createDeprecation(name: string, options: DeprecationOptions = {}) {
            const version = typeof options.typeScriptVersion === "string" ? new Version(options.typeScriptVersion) : options.typeScriptVersion ?? getTypeScriptVersion();
            const errorAfter = typeof options.errorAfter === "string" ? new Version(options.errorAfter) : options.errorAfter;
            const warnAfter = typeof options.warnAfter === "string" ? new Version(options.warnAfter) : options.warnAfter;
            const since = typeof options.since === "string" ? new Version(options.since) : options.since ?? warnAfter;
            const error = options.error || errorAfter && version.compareTo(errorAfter) <= 0;
            const warn = !warnAfter || version.compareTo(warnAfter) >= 0;
            return error ? createErrorDeprecation(name, errorAfter, since, options.message) :
                warn ? createWarningDeprecation(name, errorAfter, since, options.message) :
                noop;
        }

        function wrapFunction<F extends (...args: any[]) => any>(deprecation: () => void, func: F): F {
            return function (this: unknown) {
                deprecation();
                return func.apply(this, arguments);
            } as F;
        }

        export function deprecate<F extends (...args: any[]) => any>(func: F, options?: DeprecationOptions): F {
            const deprecation = createDeprecation(getFunctionName(func), options);
            return wrapFunction(deprecation, func);
        }
    }
}
