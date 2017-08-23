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

type k1 = Id<string>('foo'); // `any`, `<string>` is part of the type reference, not the function call
type k2 = Id<><string>('foo'); // ok, `string`

declare function id<T>(v: T): T;
let l = id<string>('foo');

interface IsPrimitive {
  (o: object): '0';
  (o: any): '1';
}
type stringIsPrimitive = IsPrimitive(string); // '1', ok
type regexpIsPrimitive = IsPrimitive(RegExp); // '0', ok

// explicit type arguments need to go after the type arguments of the type reference, empty `<>` if n/a
type genericIsPrimitive = <T>() => IsPrimitive(T);
type stringIsPrimitive2 = genericIsPrimitive<><string>(); // '1', ok
type regexpIsPrimitive2 = genericIsPrimitive<><RegExp>();
// FAILS!, '1' instead of '0', should delay overload selection until type argument is known

// alternative, pass as parameters
type genericIsPrimitive3 = <T>(v: T) => IsPrimitive(T);
type stringIsPrimitive3 = genericIsPrimitive3(string); // '1', ok
type regexpIsPrimitive3 = genericIsPrimitive3(RegExp)
// FAILS!, '1' instead of '0', should delay overload selection until type argument is known

type map = <Fn extends Function, O extends object>(fn: Fn, obj: O) => { [P in keyof O]: Fn(P) }; // Fn(O[P])
type z = map(<T>(v: T) => [T], { a: 1, b: 2, c: 3 });


//// [typeCall.js]
var a = 'foo';
var l = id('foo');
