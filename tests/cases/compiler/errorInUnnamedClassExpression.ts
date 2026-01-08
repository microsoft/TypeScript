// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62920

let Foo = class {
    constructor() {
        this.bar++;
    }
    abstract bar;
};
