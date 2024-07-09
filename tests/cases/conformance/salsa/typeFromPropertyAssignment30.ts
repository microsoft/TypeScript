interface Combo {
    (): number;
    p?: { [s: string]: number };
}
const c: Combo = () => 1
// should not be an expando object, but contextually typed by Combo.p
c.p = {}

