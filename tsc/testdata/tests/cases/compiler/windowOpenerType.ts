// @target: esnext
// @lib: esnext,dom
// @strict: true
// @noEmit: true

type Equal<T, U> =
    (<V>() => V extends T ? 1 : 2) extends
    (<V>() => V extends U ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

type WindowOpener = Assert<Equal<typeof window.opener, WindowProxy | null>>;
type GlobalOpener = Assert<Equal<typeof opener, WindowProxy | null>>;
