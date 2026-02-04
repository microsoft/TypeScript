// @target: es2015
interface I {
    a: "a";
}
let i: I;
i = { ...{ a: "a" } };
