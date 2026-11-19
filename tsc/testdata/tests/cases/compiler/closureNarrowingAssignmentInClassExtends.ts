// @strict: true
// @noEmit: true

declare class Base {}

function f(x: string | number) {
    if (typeof x === "string") {
        const g = () => x.length;
        class C extends (x = 1, Base) {}
        return g;
    }
}
