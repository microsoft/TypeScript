// @strict: true
// @noEmit: true

type Params<T, K> = { config: Config<T, K> };
type Handler<T, K> = (params: Params<T, K>) => void;
type Config<T, K> = { read: (item: T) => void; handler: Handler<T, K> };

declare const p: Params<string, string>;
export const q: Params<number, string> = p;  // Error

declare const a: Handler<string, string>;
export const b: Handler<number, string> = a;  // Error
export const c: Handler<boolean, { x: 1 }> = a;  // Error
export const d: Handler<string, number> = a;
