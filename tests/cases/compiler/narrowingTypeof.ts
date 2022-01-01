
type __String = (string & { __escapedIdentifier: void }) | (void & { __escapedIdentifier: void });

declare const s: __String;
declare let t: string | number | undefined;

declare function assert(e: unknown): asserts e;

assert(typeof s === "string");
t = s;
