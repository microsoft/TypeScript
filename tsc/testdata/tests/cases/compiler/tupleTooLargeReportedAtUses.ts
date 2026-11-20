// @strict: true
// @noEmit: true
// @target: es2015

// The tuple type the alias builds is too large to represent (64384). The
// union type and its first constituent start at the same position, so they
// report the error at the same location.

type BuildTuple<L extends number, T extends any[] = [any]> =
    T['length'] extends L ? T : BuildTuple<L, [...T, ...T]>;
type A = BuildTuple<3>;

export class C {
    p? = null! as A | string;
}
