// @declaration: true
// @declarationMap: true
// @outFile: bundle.js
// @sourceMap: true
// @filename: a.ts
class Foo {
    doThing(x: {a: number}) {
        return {b: x.a};
    }
    static make() {
        return new Foo();
    }
}
// @filename: index.ts
const c = new Foo();
c.doThing({a: 42});

let x = c.doThing({a: 12});
