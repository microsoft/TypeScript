// doc 4

// No errors
struct C {
    private static privateProperty;
    private static privateMethod() { }

    public static publicProperty;
    public static publicMethod() { }
}

// Errors, accessibility modifiers must precede static
struct D {
    static private privateProperty;
    static private privateMethod() { }

    static public publicProperty;
    static public publicMethod() { }
}

// Errors, multiple accessibility modifier
struct E {
    private public property;
    public private method() { }
}
