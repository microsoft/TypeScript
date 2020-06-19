// @strict: true
// @target: esnext, es2020, es2015
interface A {
    baz: 0 | 1 | 42 | undefined | ''
}

declare const result: A;
declare const a: A;
declare const b: A;
declare const c: A;

(a.baz) &&= result.baz;
(b.baz) ||= result.baz;
(c.baz) ??= result.baz;

