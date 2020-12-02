//// [substituteReturnTypeSatisfiesConstraint.ts]
type M = { p: string };
type O = { m: () => M };
type X<T extends M> = T;
type FFG<T> = T extends O ? X<ReturnType<T['m']>> : never; // error!


//// [substituteReturnTypeSatisfiesConstraint.js]
