// @strict: true
// @declaration: true

namespace identityRelationEnumTypes {
    type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;

    enum Enum {
        A = 'a',
        B = 'b',
    }

    enum DifferentEnum {
        A = 'a',
        B = 'b',
    }

    type Identical1 = typeof Enum[keyof typeof Enum];
    type Identical2 = Enum.A | Enum.B;
    type Identical3 = Enum.B | Enum.A | Enum.B;
    type Identical4 = Enum.B | (Enum.A | Enum.B);
    type Identical5 = (Enum.A & {}) | (Enum.B & {})

    type Different1 = Enum.A | Enum.A;
    type Different2 = Enum.A | DifferentEnum.B;

    type Result1 = Equals<Enum, Identical1>;  // true
    type Result2 = Equals<Enum, Identical2>;  // true
    type Result3 = Equals<Enum, Identical3>;  // true
    type Result4 = Equals<Enum, Identical4>;  // true
    type Result5 = Equals<Enum, Identical5>;  // true
    type Result6 = Equals<Enum, Different1>;  // false
    type Result7 = Equals<Enum, Different2>;  // false
}
