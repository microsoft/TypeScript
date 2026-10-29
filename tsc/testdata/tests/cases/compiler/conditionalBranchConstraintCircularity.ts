// @strict: true
// @noEmit: true

type BeforeTrue = ReferencedFirstTrue<any>;
type ReferencedFirstTrue<T extends ReferencedFirstTrue<T>> = T extends keyof T ? T : never;

type DeclaredFirstTrue<T extends DeclaredFirstTrue<T>> = T extends keyof T ? T : never;
type AfterTrue = DeclaredFirstTrue<any>;

type BeforeFalse = ReferencedFirstFalse<any>;
type ReferencedFirstFalse<T extends ReferencedFirstFalse<T>> = T extends string ? never : T;

type DeclaredFirstFalse<T extends DeclaredFirstFalse<T>> = T extends string ? never : T;
type AfterFalse = DeclaredFirstFalse<any>;
