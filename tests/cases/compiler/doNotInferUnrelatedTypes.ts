// #16709
declare function dearray<T>(ara: ReadonlyArray<T>): T;
type LiteralType = "foo" | "bar";
declare var alt: Array<LiteralType>;

let foo: LiteralType = dearray(alt);
