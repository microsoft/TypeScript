/* @internal */
namespace ts {
    export namespace Debug {
        let currentAssertionLevel = AssertionLevel.None;

        // eslint-disable-next-line prefer-const
        export let isDebugging = false;

        type AssertionKeys = MatchingKeys<typeof Debug, AnyFunction>;

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

        export function formatObjectFlags(flags: ObjectFlags | undefined): string {
            return formatEnum(flags, (<any>ts).ObjectFlags, /*isFlags*/ true);
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

        export function attachFlowNodeDebugInfo(flowNode: FlowNode) {
            if (isDebugInfoEnabled) {
                if (!("__debugFlowFlags" in flowNode)) { // eslint-disable-line no-in-operator
                    Object.defineProperties(flowNode, {
                        __debugFlowFlags: { get(this: FlowNode) { return formatEnum(this.flags, (ts as any).FlowFlags, /*isFlags*/ true); } },
                        __debugToString: { value(this: FlowNode) { return formatControlFlowGraph(this); } }
                    });
                }
            }
        }

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
                        __debugModifierFlags: { get(this: Node) { return formatModifierFlags(getEffectiveModifierFlagsNoCache(this)); } },
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

    }
}
