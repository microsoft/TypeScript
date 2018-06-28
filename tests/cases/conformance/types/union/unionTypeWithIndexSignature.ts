// @strict: true
type Two = { foo: { bar: true }, baz: true } | { [s: string]: string };
declare var u: Two;
u.foo = 'bye'
u.baz = 'hi'
type Three = { foo: number } | { [s: string]: string } | { [s: string]: boolean };
declare var v: Three;
v.foo = false
type Missing = { foo: number, bar: true } | { [s: string]: string } | { foo: boolean }
declare var m: Missing;
m.foo = 'hi'
m.bar
type RO = { foo: number } | { readonly [s: string]: string }
declare var ro: RO;
ro.foo = 'not allowed'
type Num = { '0': string } | { [n: number]: number }
declare var num: Num;
num[0] = 1
num['0'] = 'ok'
