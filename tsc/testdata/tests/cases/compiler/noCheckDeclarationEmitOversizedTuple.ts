// @target: es2015
// @noCheck: true
// @emitDeclarationOnly: true
// @declaration: true
// @strict: true

type BuildTuple<L extends number, T extends any[] = [any]> =
    T['length'] extends L ? T : BuildTuple<L, [...T, ...T]>;
type A = BuildTuple<3>;

export class C {
    p? = null! as A | string;
}
