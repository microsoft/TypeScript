// @target: es2019,es2020
// @strict: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/65597

interface Fns {
    fn(...args: unknown[]): unknown;
    gen<T>(...args: unknown[]): T;
}

declare const obj: Fns & { nested: Fns };

// optional calls of wrapped callees
(obj?.fn!)?.();
(obj.fn!)?.();
(obj?.fn as any)?.();
(obj.fn as any)?.();
(obj.gen<string>)?.();
obj.gen<string>?.();
(obj?.["fn"]!)?.(1);
(obj.nested?.fn!)?.(1);

// plain calls of wrapped optional chains
(obj?.fn)();
(obj?.fn!)();
(obj?.fn as any)();
(obj?.fn)!();
(obj?.fn satisfies unknown)();
(<any>obj?.fn)();
(obj?.gen<string>)();
(obj?.["fn"]!)(1);
(obj.nested?.fn!)(1);

// tagged templates with wrapped optional chain tags
(obj?.fn)`x`;
(obj?.["fn"])`x${1}`;
(obj?.fn!)`x`;
(obj?.fn as any)`x`;
(obj.nested?.fn)`x`;

class Base {
    fn(...args: unknown[]): unknown { return this; }
}

class Derived extends Base {
    method() {
        (super.fn!)?.();
        (super.fn as any)?.();
    }
}
