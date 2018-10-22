interface I { x: number; }
interface Idx { [index: string]: U; }
type U = Idx | I | "lit";
const u: U = { x: "lit" };