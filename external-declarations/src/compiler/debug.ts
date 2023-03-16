import { Symbol, Node, NodeArray, SyntaxKind, unescapeLeadingUnderscores, SortedReadonlyArray, NodeFlags, ModifierFlags, EmitFlags, SymbolFlags, TypeFlags, ObjectFlags, FlowFlags, FlowNodeBase, Type, symbolName, LiteralType, BigIntLiteralType, ObjectType, Signature, isIdentifier, idText, isPrivateIdentifier, isStringLiteral, isNumericLiteral, isBigIntLiteral, isTypeParameterDeclaration, isParameter, isConstructorDeclaration, isGetAccessorDeclaration, isSetAccessorDeclaration, isCallSignatureDeclaration, isConstructSignatureDeclaration, isIndexSignatureDeclaration, isTypePredicateNode, isTypeReferenceNode, isFunctionTypeNode, isConstructorTypeNode, isTypeQueryNode, isTypeLiteralNode, isArrayTypeNode, isTupleTypeNode, isOptionalTypeNode, isRestTypeNode, isUnionTypeNode, isIntersectionTypeNode, isConditionalTypeNode, isInferTypeNode, isParenthesizedTypeNode, isThisTypeNode, isTypeOperatorNode, isIndexedAccessTypeNode, isMappedTypeNode, isLiteralTypeNode, isNamedTupleMember, isImportTypeNode, isParseTreeNode, getParseTreeNode, FlowNode, FlowSwitchClause, FlowLabel, MapLike } from "typescript";
import * as ts from "typescript";
import { getSourceFileOfNode, getSourceTextOfNodeFromSourceFile} from "./utils";
import { every, map, stableSort, compareValues } from "./lang-utils";

/** @internal */
export const enum AssertionLevel {
    None = 0,
    Normal = 1,
    Aggressive = 2,
    VeryAggressive = 3,
}
type AssertionKeys = keyof typeof Debug;

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Indicates whether a map-like contains an own property with the specified key.
 *
 * @param map A map-like.
 * @param key A property key.
 *
 * @internal
 */
export function hasProperty(map: MapLike<any>, key: string): boolean {
    return hasOwnProperty.call(map, key);
}




/**
 * Tests whether an assertion function should be executed. If it shouldn't, it is cached and replaced with `ts.noop`.
 * Replaced assertion functions are restored when `Debug.setAssertionLevel` is set to a high enough level.
 * @param level The minimum assertion level required.
 * @param name The name of the current assertion function.
 */
function shouldAssertFunction<K extends AssertionKeys>(_level: AssertionLevel, _name: K): boolean {
    return true;
}

type AnyFunction = (...a: any) => any;
/** @internal */
export namespace Debug {
    

    export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
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
    export function assertEachNode(nodes: readonly Node[], test: (node: Node) => boolean, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertEachNode(nodes: readonly Node[] | undefined, test: (node: Node) => boolean, message?: string, stackCrawlMark?: AnyFunction) {
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
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
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
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
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
                () => `Node ${formatSyntaxKind(node?.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
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

    /**
     * Asserts a value has the specified type in typespace only (does not perform a runtime assertion).
     * This is useful in cases where we switch on `node.kind` and can be reasonably sure the type is accurate, and
     * as a result can reduce the number of unnecessary casts.
     */
    export function type<T>(value: unknown): asserts value is T;
    export function type(_value: unknown) { }

    export function getFunctionName(func: AnyFunction) {
        if (typeof func !== "function") {
            return "";
        }
        else if (hasProperty(func, "name")) {
            return (func as any).name;
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

        const sorted = stableSort<[number, string]>(result, (x, y) => compareValues(x[0], y[0]));
        enumMemberCache.set(enumObject, sorted);
        return sorted;
    }

    export function formatSyntaxKind(kind: SyntaxKind | undefined): string {
        return formatEnum(kind, (ts as any).SyntaxKind, /*isFlags*/ false);
    }


    export function formatNodeFlags(flags: NodeFlags | undefined): string {
        return formatEnum(flags, (ts as any).NodeFlags, /*isFlags*/ true);
    }

    export function formatModifierFlags(flags: ModifierFlags | undefined): string {
        return formatEnum(flags, (ts as any).ModifierFlags, /*isFlags*/ true);
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

    export function formatObjectFlags(flags: ObjectFlags | undefined): string {
        return formatEnum(flags, (ts as any).ObjectFlags, /*isFlags*/ true);
    }

    export function formatFlowFlags(flags: FlowFlags | undefined): string {
        return formatEnum(flags, (ts as any).FlowFlags, /*isFlags*/ true);
    }
}
