//// [tests/cases/compiler/nonNullishUnknownApparentType.ts] ////

//// [nonNullishUnknownApparentType.ts]
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

//// [nonNullishUnknownApparentType.js]
acceptsRecord(value || {});
acceptsRecord(nonNullish);
acceptsRecord(explicit);
acceptsRecord({});
acceptsRecord({ name: "value" });
export function narrowed(value) {
    if (value != null) {
        acceptsRecord(value);
        const text = value.toString();
        const own = value.hasOwnProperty("name");
        const object = value;
        return { text, own, object };
    }
}
export function constrained(value) {
    acceptsRecord(value);
    return value.toString();
}
export const toStringMethod = nonNullish.toString;
export const valueOfMethod = explicit.valueOf;
export const literal = {};
export const spread = { ...nonNullish, own: true };
const emptyKey = "toString";


//// [nonNullishUnknownApparentType.d.ts]
export declare function narrowed(value: unknown): {
    text: string;
    own: boolean;
    object: Object;
} | undefined;
export declare function constrained<Value extends {}>(value: Value): string;
export declare const toStringMethod: () => string;
export declare const valueOfMethod: () => Object;
export declare const literal: {};
export declare const spread: {
    own: boolean;
};
export type EmptyKeys = keyof {};
