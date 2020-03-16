type Signs = { kind: 'a'; a: 3; } | { kind: 'b'; b: 2; } | { kind: 'c'; c: 1; };
interface Opts<T> {
    low?: number;
    sign?: T
}
interface Wrapper<T> {
}
declare function sepsis<T extends Signs>(opts: Opts<T>): Wrapper<T>;
declare function unwrap<T>(w: Wrapper<T>): T;
export const y = sepsis({ low: 1, sign: { kind: 'a', a: 3 }});
// $ExpectType { kind: "a"; a: 3; }
export const yun = unwrap(y);
// $ExpectType { kind: "a"; a: 3; }
export const yone = unwrap(sepsis({ low: 1, sign: { kind: 'a', a: 3 }}));