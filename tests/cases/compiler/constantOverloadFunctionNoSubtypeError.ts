class Base { foo() { } }
class Derived1 extends Base { bar() { } }
class Derived2 extends Base { baz() { } }
class Derived3 extends Base { biz() { } }

function foo(tagName: 'canvas'): Derived3;
function foo(tagName:  'div'): Derived2;
function foo(tagName: 'span'): Derived1;
function foo(tagName: number): Base;
function foo(tagName: any): Base {

    return null;
}
