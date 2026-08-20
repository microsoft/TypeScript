// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/tsc/issues/3691

// @filename: main.js
export class C {
    method() {
        const obj = {};
        obj.foo = 'foo';
        obj.bar = 'bar';
        obj.buzz = Object.values(obj);
    }
}
