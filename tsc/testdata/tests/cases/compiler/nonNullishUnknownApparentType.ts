// @strict: true
// @declaration: true

declare function acceptsRecord(value: Record<string, string>): void;
declare const value: unknown;
declare const nonNullish: {};
declare const explicit: unknown & not null & not undefined;

acceptsRecord(value || {});
acceptsRecord(nonNullish);
acceptsRecord(explicit);
acceptsRecord({});
acceptsRecord({ name: "value" });

export function narrowed(value: unknown) {
    if (value != null) {
        acceptsRecord(value);
        const text: string = value.toString();
        const own: boolean = value.hasOwnProperty("name");
        const object: Object = value;
        return { text, own, object };
    }
}

export function constrained<Value extends {}>(value: Value) {
    acceptsRecord(value);
    return value.toString();
}

export const toStringMethod = nonNullish.toString;
export const valueOfMethod = explicit.valueOf;
export const literal = {};
export const spread = { ...nonNullish, own: true };
export type EmptyKeys = keyof {};
const emptyKey: EmptyKeys = "toString";