class Base { foo() { } }
class Derived1 extends Base { bar() { } }
function f(tagName: 'span', ...args): Derived1;   // error
function f(tagName: number, ...args): Base;
function f(tagName: any): Base {
    return null;
}
function g(tagName: 'span', arg): Derived1;    // error
function g(tagName: number, arg): Base;
function g(tagName: any): Base {
    return null;
}