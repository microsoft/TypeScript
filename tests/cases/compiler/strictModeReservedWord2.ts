"use strict"
interface public { }
interface implements {
    foo(package, protected);
}
enum package { }
enum foo {
    public,
    private,
    package
}

const enum private {
    public,
    private,
    package
}

const enum bar {
    public,
    private,
    package
}
