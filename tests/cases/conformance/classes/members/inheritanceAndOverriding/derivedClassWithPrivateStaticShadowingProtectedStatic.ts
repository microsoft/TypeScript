// @target: ES5

class Base {
    protected static x: string;
    protected static fn(): string {
        return '';
    }

    protected static get a() { return 1; }
    protected static set a(v) { }
}

// should be error
class Derived extends Base {
    private static x: string; 
    private static fn(): string {
        return '';
    }

    private static get a() { return 1; }
    private static set a(v) { }
}