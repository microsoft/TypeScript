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
        since?: string;
        until?: string;
    }

    export namespace Debug {
        export let currentAssertionLevel = AssertionLevel.None;
        export let currentLogLevel = LogLevel.Warning;
        export let isDebugging = false;
        export let loggingHost: LoggingHost | undefined;

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
            if (value === undefined || value === null) return fail(message);
            return value;
        }

        export function assertEachDefined<T, A extends ReadonlyArray<T>>(value: A, message?: string): A {
            for (const v of value) {
                assertDefined(v, message);
            }
            return value;
        }

        export function assertNever(member: never, message = "Illegal value:", stackCrawlMark?: AnyFunction): never {
            const detail = typeof member === "object" && "kind" in member && "pos" in member && formatSyntaxKind ? "SyntaxKind: " + formatSyntaxKind((member as Node).kind) : JSON.stringify(member);
            return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
        }

        export function getFunctionName(func: AnyFunction): string {
            if (typeof func !== "function") {
                return "";
            }
            else if (func.hasOwnProperty("name")) {
                const name = (<any>func).name || "";
                return "" + name;
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
        export function formatEnum(value = 0, enumObject: any, isFlags?: boolean, filterEnum?: (enumValue: number, enumName: string) => boolean) {
            const members = getEnumMembers(enumObject);
            if (value === 0) {
                const zeroMembers = members.filter(member => member[0] === 0);
                return zeroMembers.length > 0 ? zeroMembers[0][1] : "0";
            }
            if (isFlags) {
                let result = "";
                let remainingFlags = value;
                for (let i = members.length - 1; i >= 0 && remainingFlags !== 0; i--) {
                    const [enumValue, enumName] = members[i];
                    if ((!filterEnum || filterEnum(enumValue, enumName)) && enumValue !== 0 && (remainingFlags & enumValue) === enumValue) {
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
            return formatEnum(flags, (<any>ts).TransformFlags, /*isFlags*/ true, (_, name) => !/^Assert|Excludes$|PropagatingFlags$/.test(name));
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
                                return sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode!, includeTrivia) : "";
                            }
                        }
                    });
                }
            }

            isDebugInfoEnabled = true;
        }

        export function createDeprecation(name: string, options: DeprecationOptions & { error: true }): () => never;
        export function createDeprecation(name: string, options?: DeprecationOptions): () => void;
        export function createDeprecation(name: string, options: DeprecationOptions = {}) {
            let formattedMessage = options.error ? "DeprecationError: " : "DeprecationWarning: ";
            formattedMessage += `'${name}' ${options.since ? `has been deprecated since ${options.since}` : "is deprecated"}`;
            formattedMessage += options.error ? " and can no longer be used." : options.until ? ` and will no longer be usable after ${options.until}.` : ".";
            formattedMessage += options.message ? ` ${formatStringFromArgs(options.message, [name], 0)}` : "";
            let hasWrittenDeprecation = false;
            return handleDeprecation;

            function handleDeprecation(): void {
                if (options.error) return fail(formattedMessage, handleDeprecation);
                if (hasWrittenDeprecation) return;
                hasWrittenDeprecation = true;
                log.warn(formattedMessage);
            }
        }

        function wrapFunction<F extends (...args: any[]) => any>(deprecation: () => void, func: F): F {
            return function (this: unknown) {
                deprecation();
                return func.apply(this, arguments);
            } as F;
        }

        function wrapAccessor(deprecation: () => void, desc: PropertyDescriptor) {
            const newDesc: PropertyDescriptor = { enumerable: desc.enumerable, configurable: desc.configurable };
            if (desc.get) newDesc.get = wrapFunction(deprecation, desc.get);
            if (desc.set) newDesc.set = wrapFunction(deprecation, desc.set);
            return newDesc;
        }

        function wrapValue(deprecation: () => void, desc: PropertyDescriptor) {
            const newDesc: PropertyDescriptor = { enumerable: desc.enumerable, configurable: desc.configurable };
            let value = desc.value;
            newDesc.get = () => { deprecation(); return value; };
            if (desc.writable) newDesc.set = _value => { deprecation(); value = _value; };
            return newDesc;
        }

        export function deprecateProperties<T, K extends Extract<MatchingKeys<T, (...args: any[]) => any>, string>>(ns: T, keys: K[], options?: DeprecationOptions) {
            for (const key of keys) {
                deprecateProperty(ns, key, options);
            }
        }

        export function deprecateProperty<T, K extends Extract<MatchingKeys<T, (...args: any[]) => any>, string>>(ns: T, key: K, options?: DeprecationOptions) {
            const desc = Object.getOwnPropertyDescriptor(ns, key);
            if (!desc) return;
            const deprecation = createDeprecation(key, options);
            const newDesc = desc.get || desc.set ? wrapAccessor(deprecation, desc) : wrapValue(deprecation, desc);
            Object.defineProperty(ns, key, newDesc);
        }

        export function deprecateFunction<F extends (...args: any[]) => any>(func: F, options?: DeprecationOptions): F {
            const deprecation = createDeprecation(getFunctionName(func), options);
            return wrapFunction(deprecation, func);
        }
    }
}
