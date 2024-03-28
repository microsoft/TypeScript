// @strict: true
// @noEmit: true

function f1<T extends Record<string, any>, K extends keyof T>(x: T[K] | undefined) {
    if (x === undefined) return;
    x;  // T[K] & ({} | null)
    if (x === undefined) return;
    x;  // T[K] & ({} | null)
}

function f2<T extends Record<string, any>, K extends keyof T>(x: T[K] | null) {
    if (x === null) return;
    x;  // T[K] & ({} | undefined)
    if (x === null) return;
    x;  // T[K] & ({} | undefined)
}

function f3<T, K extends keyof T>(t: T[K], p1: Partial<T>[K] & {}, p2: Partial<T>[K] & ({} | null)) {
    t = p1;
    t = p2;
}

// https://github.com/microsoft/TypeScript/issues/57693

type AnyObject = Record<string, any>;
type State = AnyObject;

declare function hasOwnProperty<T extends AnyObject>(
    object: T,
    prop: PropertyKey,
): prop is keyof T;

interface Store<S = State> {
    setState<K extends keyof S>(key: K, value: S[K]): void;
}

export function syncStoreProp<
    S extends State,
    P extends Partial<S>,
    K extends keyof S,
>(store: Store<S>, props: P, key: K) {
    const value = hasOwnProperty(props, key) ? props[key] : undefined;
    if (value === undefined) return;
    store.setState(key, value);
    if (value === undefined) return;
    store.setState(key, value);
}
