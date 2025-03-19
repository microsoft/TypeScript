//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessibilityModifiers.ts] ////

//// [accessibilityModifiers.ts]
// No errors
class C {
    private static privateProperty;
    private static privateMethod() { }
    private static get privateGetter() { return 0; }
    private static set privateSetter(a: number) { }

    protected static protectedProperty;
    protected static protectedMethod() { }
    protected static get protectedGetter() { return 0; }
    protected static set protectedSetter(a: number) { }

    public static publicProperty;
    public static publicMethod() { }
    public static get publicGetter() { return 0; }
    public static set publicSetter(a: number) { }
}

// Errors, accessibility modifiers must precede static
class D {
    static private privateProperty;
    static private privateMethod() { }
    static private get privateGetter() { return 0; }
    static private set privateSetter(a: number) { }

    static protected protectedProperty;
    static protected protectedMethod() { }
    static protected get protectedGetter() { return 0; }
    static protected set protectedSetter(a: number) { }

    static public publicProperty;
    static public publicMethod() { }
    static public get publicGetter() { return 0; }
    static public set publicSetter(a: number) { }
}

// Errors, multiple accessibility modifier
class E {
    private public protected property;
    public protected method() { }
    private protected get getter() { return 0; }
    public public set setter(a: number) { }
}


//// [accessibilityModifiers.js]
// No errors
class C {
    static privateProperty;
    static privateMethod() { }
    static get privateGetter() { return 0; }
    static set privateSetter(a) { }
    static protectedProperty;
    static protectedMethod() { }
    static get protectedGetter() { return 0; }
    static set protectedSetter(a) { }
    static publicProperty;
    static publicMethod() { }
    static get publicGetter() { return 0; }
    static set publicSetter(a) { }
}
// Errors, accessibility modifiers must precede static
class D {
    static privateProperty;
    static privateMethod() { }
    static get privateGetter() { return 0; }
    static set privateSetter(a) { }
    static protectedProperty;
    static protectedMethod() { }
    static get protectedGetter() { return 0; }
    static set protectedSetter(a) { }
    static publicProperty;
    static publicMethod() { }
    static get publicGetter() { return 0; }
    static set publicSetter(a) { }
}
// Errors, multiple accessibility modifier
class E {
    property;
    method() { }
    get getter() { return 0; }
    set setter(a) { }
}
