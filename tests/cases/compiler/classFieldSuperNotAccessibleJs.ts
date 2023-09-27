// @strict: true
// @checkJs: true
// @target: esnext
// @noEmit: true

// @filename: index.js

// https://github.com/microsoft/TypeScript/issues/55884

class YaddaBase {
    constructor() {
        this.roots = "hi";
        this.b()
    }
    accessor b = () => {
        this.foo = 10
    }
}

class DerivedYadda extends YaddaBase {
    get rootTests() {
        return super.roots;
    }
    get fooTests() {
        return super.foo;
    }
}
