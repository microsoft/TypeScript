declare const union: { a: string } | { b: string }
union("");

declare const fnUnion: { a: string } | ((a: string) => void)
fnUnion("");

declare const fnUnion2: (<T extends number>(a: T) => void) | (<T>(a: string) => void)
fnUnion2("");
