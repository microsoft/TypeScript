// @declaration: true
// @pedanticOverride: true
class B {
    p1: number = 1;
    p2: number = 2;
}

class D extends B{
    declare p1: number

    override declare p2: number
}
