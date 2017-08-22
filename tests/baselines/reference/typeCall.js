//// [typeCall.ts]
type F1 = () => 1;
type a = F1();

type F2 = (a: string) => 1;
type b = F2('foo');

interface F3 {
    (): 1;
    (a: number): 2;
    (a: string): 3;
}
type c = F3();
type d = F3(123);
type e = F3('foo');

declare function f4(a: string): 1;
let a = 'foo';
type f = typeof f4(typeof a);

type g = (() => 1)();

type Id = <T>(v: T) => T;
type h = Id(123);

type Wrap<T> = Id(T);
type i = Wrap<123>;

type F5 = () => () => { a: () => 1; };
type j = F5()()['a']();

type k = Id<string>('foo');


//// [typeCall.js]
var a = 'foo';
