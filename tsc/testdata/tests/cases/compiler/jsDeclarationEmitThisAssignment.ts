// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: out

// @filename: main.js
export class Foo {
    static {
        this.bar = 10;
    }

    constructor() {
        this.baz = "hello";
    }
}

export class Bar {
    constructor() {
        this.x = 42;
        this.y = true;
    }
}
