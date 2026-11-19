// @strict: true
// @noEmit: true
// @target: esnext

// Inferring from Promise<string> to PromiseLike<V> | V must infer V as string,
// whichever order the union's members are in.

declare function props<K, V>(x: PromiseLike<Map<K, PromiseLike<V> | V>>): Promise<Map<K, V>>;
declare const input: Promise<Map<number, Promise<string>>>;
const out: Promise<Map<number, string>> = props(input);
