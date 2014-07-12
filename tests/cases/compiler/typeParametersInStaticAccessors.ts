class foo<T> {
    static get Foo(): () => T { return null; }
    static set Bar(v: { v: T }) { }
} 