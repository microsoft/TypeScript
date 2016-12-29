class Base {
    public toString() { return "base"; };
}

class Derived extends Base {
    /** @override */
    public override toString() { return "derived"; };
}
