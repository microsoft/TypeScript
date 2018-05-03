// @target: es5
// @inlineConst: true
// @declaration: true

declare function output(x: any, y?: any)
declare function bazz()
declare function bazzz()

const a: number = 1 + 2;
const foo = {
    a: 123
}
const bar = {
    a
}
class Foo {
    a = 456
}
class Bar {
    get a() { return 1 }
    set a(v) { }
}
class Baz {
    _a: number = 1

    get [a]() { return a }
    set [a](a) { this._a = a }
}

if (a) { }
if (a === 2) { }
const b = a + 1
if (b) { }
const c = a + b
if (c) { }
if (foo.a) {
    a.toString()
}
if (foo[a]) {
    a['toString']()
}
for (let i = 0; i < 10; ++i) {
    output(i)
}
output(+a)
output(-a)
output(~a)
output(a < b)
output(a > b)
output(a <= b)
output(a >= b)
output(a == b)
output(a != b)
output(a === b)
const f = a, g = bazz
if (f) { }
if (g) { }
const h = (bazz() || bazzz())
const i = "test"
output(i, i.length)
const args: string[] = []
const configPath = args.forEach(arg => arg.lastIndexOf(i, 0) === 0 && arg.substr(i.length))
