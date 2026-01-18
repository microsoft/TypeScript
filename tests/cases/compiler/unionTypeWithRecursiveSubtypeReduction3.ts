declare var a27: { prop: number } | { prop: T27 };
type T27 = typeof a27;

declare var b: T27;
var s: string = b;
