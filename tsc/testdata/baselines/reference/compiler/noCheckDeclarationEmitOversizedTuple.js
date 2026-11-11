//// [tests/cases/compiler/noCheckDeclarationEmitOversizedTuple.ts] ////

//// [noCheckDeclarationEmitOversizedTuple.ts]
type BuildTuple<L extends number, T extends any[] = [any]> =
    T['length'] extends L ? T : BuildTuple<L, [...T, ...T]>;
type A = BuildTuple<3>;

export class C {
    p? = null! as A | string;
}




//// [noCheckDeclarationEmitOversizedTuple.d.ts]
type BuildTuple<L extends number, T extends any[] = [any]> = T['length'] extends L ? T : BuildTuple<L, [...T, ...T]>;
type A = BuildTuple<3>;
export declare class C {
    p?: A | string;
}
export {};
