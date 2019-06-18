class Base {
    private foo(): any { }

    public bar(): any { }
}

class BaseExtendedFail implements Base {
    public bar() { }
}

class BaseExtended implements PublicOf<Base> {
    public bar() { }
}
