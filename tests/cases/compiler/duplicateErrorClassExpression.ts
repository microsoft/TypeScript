// @strict: true

interface ComplicatedTypeBase {
    [s: string]: ABase;
}
interface ComplicatedTypeDerived {
    [s: string]: ADerived;
}
interface ABase {
    a: string;
}
interface ADerived {
    b: string;
}
class Base {
    foo!: ComplicatedTypeBase;
}
const x = class Derived extends Base {
    foo!: ComplicatedTypeDerived;
}
let obj: { 3: string } = { 3: "three" };
obj[x];