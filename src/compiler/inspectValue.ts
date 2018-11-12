/* @internal */
namespace ts {
    export interface InspectValueOptions {
        readonly fileNameToRequire: string;
    }

    export const enum ValueKind { Const, Array, FunctionOrClass, Object }
    export interface ValueInfoBase {
        readonly name: string;
    }
    export type ValueInfo = ValueInfoSimple | ValueInfoArray | ValueInfoFunctionOrClass | ValueInfoObject;
    export interface ValueInfoSimple extends ValueInfoBase {
        readonly kind: ValueKind.Const;
        readonly typeName: string;
        readonly comment?: string | undefined;
    }
    export interface ValueInfoFunctionOrClass extends ValueInfoBase {
        readonly kind: ValueKind.FunctionOrClass;
        readonly source: string | number; // For a native function, this is the length.
        readonly prototypeMembers: ReadonlyArray<ValueInfo>;
        readonly namespaceMembers: ReadonlyArray<ValueInfo>;
    }
    export interface ValueInfoArray extends ValueInfoBase {
        readonly kind: ValueKind.Array;
        readonly inner: ValueInfo;
    }
    export interface ValueInfoObject extends ValueInfoBase {
        readonly kind: ValueKind.Object;
        readonly members: ReadonlyArray<ValueInfo>;
    }

    export function inspectModule(fileNameToRequire: string): ValueInfo {
        return inspectValue(removeFileExtension(getBaseFileName(fileNameToRequire)), tryRequire(fileNameToRequire));
    }

    export function inspectValue(name: string, value: unknown): ValueInfo {
        return getValueInfo(name, value, getRecurser());
    }

    type Recurser = <T>(obj: unknown, name: string, cbOk: () => T, cbFail: (isCircularReference: boolean, keyStack: ReadonlyArray<string>) => T) => T;
    function getRecurser(): Recurser {
        const seen = new Set<unknown>();
        const nameStack: string[] = [];
        return (obj, name, cbOk, cbFail) => {
            if (seen.has(obj) || nameStack.length > 4) {
                return cbFail(seen.has(obj), nameStack);
            }

            seen.add(obj);
            nameStack.push(name);
            const res = cbOk();
            nameStack.pop();
            seen.delete(obj);
            return res;
        };
    }

    function getValueInfo(name: string, value: unknown, recurser: Recurser): ValueInfo {
        return recurser(value, name,
            (): ValueInfo => {
                if (typeof value === "function") return getFunctionOrClassInfo(value as AnyFunction, name, recurser);
                if (typeof value === "object") {
                    const builtin = getBuiltinType(name, value as object, recurser);
                    if (builtin !== undefined) return builtin;
                    const entries = getEntriesOfObject(value as object);
                    return { kind: ValueKind.Object, name, members: flatMap(entries, ({ key, value }) => getValueInfo(key, value, recurser)) };
                }
                return { kind: ValueKind.Const, name, typeName: isNullOrUndefined(value) ? "any" : typeof value };
            },
            (isCircularReference, keyStack) => anyValue(name, ` ${isCircularReference ? "Circular reference" : "Too-deep object hierarchy"} from ${keyStack.join(".")}`));
    }

    function getFunctionOrClassInfo(fn: AnyFunction, name: string, recurser: Recurser): ValueInfoFunctionOrClass {
        const prototypeMembers = getPrototypeMembers(fn, recurser);
        const namespaceMembers = flatMap(getEntriesOfObject(fn), ({ key, value }) => getValueInfo(key, value, recurser));
        const toString = cast(Function.prototype.toString.call(fn), isString);
        const source = stringContains(toString, "{ [native code] }") ? getFunctionLength(fn) : toString;
        return { kind: ValueKind.FunctionOrClass, name, source, namespaceMembers, prototypeMembers };
    }

    const builtins: () => ReadonlyMap<AnyConstructor> = memoize(() => {
        const map = createMap<AnyConstructor>();
        for (const { key, value } of getEntriesOfObject(global)) {
            if (typeof value === "function" && typeof value.prototype === "object" && value !== Object) {
                map.set(key, value as AnyConstructor);
            }
        }
        return map;
    });
    function getBuiltinType(name: string, value: object, recurser: Recurser): ValueInfo | undefined {
        return isArray(value)
            ? { name, kind: ValueKind.Array, inner: value.length && getValueInfo("element", first(value), recurser) || anyValue(name) }
            : forEachEntry(builtins(), (builtin, builtinName): ValueInfo | undefined =>
                value instanceof builtin ? { kind: ValueKind.Const, name, typeName: builtinName } : undefined);
    }

    function getPrototypeMembers(fn: AnyFunction, recurser: Recurser): ReadonlyArray<ValueInfo> {
        const prototype = fn.prototype as unknown;
        // tslint:disable-next-line no-unnecessary-type-assertion (TODO: update LKG and it will really be unnecessary)
        return typeof prototype !== "object" || prototype === null ? emptyArray : mapDefined(getEntriesOfObject(prototype as object), ({ key, value }) =>
            key === "constructor" ? undefined : getValueInfo(key, value, recurser));
    }

    const ignoredProperties: ReadonlySet<string> = new Set(["arguments", "caller", "constructor", "eval", "super_"]);
    const reservedFunctionProperties: ReadonlySet<string> = new Set(Object.getOwnPropertyNames(noop));
    interface ObjectEntry { readonly key: string; readonly value: unknown; }
    function getEntriesOfObject(obj: object): ReadonlyArray<ObjectEntry> {
        const seen = createMap<true>();
        const entries: ObjectEntry[] = [];
        let chain = obj;
        while (!isNullOrUndefined(chain) && chain !== Object.prototype && chain !== Function.prototype) {
            for (const key of Object.getOwnPropertyNames(chain)) {
                if (!isJsPrivate(key) &&
                    !ignoredProperties.has(key) &&
                    (typeof obj !== "function" || !reservedFunctionProperties.has(key)) &&
                    // Don't add property from a higher prototype if it already exists in a lower one
                    addToSeen(seen, key)) {
                    const value = safeGetPropertyOfObject(chain, key);
                    // Don't repeat "toString" that matches signature from Object.prototype
                    if (!(key === "toString" && typeof value === "function" && value.length === 0)) {
                        entries.push({ key, value });
                    }
                }
            }
            chain = Object.getPrototypeOf(chain);
        }
        return entries.sort((e1, e2) => compareStringsCaseSensitive(e1.key, e2.key));
    }

    function getFunctionLength(fn: AnyFunction): number {
        return tryCast(safeGetPropertyOfObject(fn, "length"), isNumber) || 0;
    }

    function safeGetPropertyOfObject(obj: object, key: string): unknown {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        return desc && desc.value;
    }

    function isNullOrUndefined(value: unknown): value is null | undefined {
        return value == null; // tslint:disable-line
    }

    function anyValue(name: string, comment?: string): ValueInfo {
        return { kind: ValueKind.Const, name, typeName: "any", comment };
    }

    export function isJsPrivate(name: string): boolean {
        return name.startsWith("_");
    }

    function tryRequire(fileNameToRequire: string): unknown {
        try {
            return require(fileNameToRequire);
        }
        catch {
            return undefined;
        }
    }
}
