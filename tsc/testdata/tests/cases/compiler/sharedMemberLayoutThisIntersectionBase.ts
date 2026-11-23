// @strict: true
// @noEmit: true

interface A { kind: string; m: this["kind"] }
interface B { m: "a" }
type AB = A & B;

interface D<T extends string> extends AB { kind: T }
declare let d: D<"b">;
d.m;

declare const ABCtor: new () => AB;
class C<T extends string> extends ABCtor { declare kind: T }
declare let c: C<"b">;
c.m;

export {};
