// @noEmit: true
// @noImplicitOverride: true

class Base {
    p1: number = 1;
    p2: number = 2;
}

class Derived extends Base {
    declare override p1: number;
    override declare p2: number;
}

