// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

// A generic call whose contextual type comes from an enclosing call is
// resolved after it, whichever is queried first, through every expression
// that passes the contextual type on.

declare function outer<T>(cb: (x: T) => void, v: T): void;
declare function outerObj<T>(o: { cb: (x: T) => void; v: T }): void;
declare function outerGen<T>(g: () => Generator<(x: T) => void>, v: T): void;
declare function wrap<U>(f: U): U;
declare function tag<T>(s: TemplateStringsArray, cb: (x: T) => void, v: T): void;
declare function tagWrap<U>(s: TemplateStringsArray, f: U): U;

outer(wrap((x) => x.toFixed())!, 1);
outerObj({ ...{ cb: wrap((x) => x.toFixed()) }, v: 1 });
outer(([wrap((x) => x.toFixed())] as const)[0], 1);
tag`${wrap((x) => x.toFixed())}${1}`;
outer(tagWrap`${(x) => x.toFixed()}`, 1);
outerGen(function* () { yield wrap((x) => x.toFixed()); }, 1);
