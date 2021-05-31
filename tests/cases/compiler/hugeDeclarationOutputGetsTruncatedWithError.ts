// @declaration: true
type props = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

type manyprops = `${props}${props}`;

export const c = null as any as {[K in manyprops]: {[K2 in manyprops]: `${K}.${K2}`}};