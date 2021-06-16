// @target: esnext,es2015
// @noImplicitOverride: true

class A {
    foo?: string;
}

class B extends A {
    override foo = "string";
}
