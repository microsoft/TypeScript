//// [tests/cases/compiler/es6ClassTest2.ts] ////

//// [es6ClassTest2.ts]
class BasicMonster {
    constructor(public name: string, public health: number) {

    }

    attack(target) {
      // WScript.Echo("Attacks " + target);
    }

    isAlive = true;
}

var m1 = new BasicMonster("1", 100);
var m2 = new BasicMonster("2", 100);
m1.attack(m2);
m1.health = 0;
console.log((<any>m5.isAlive).toString());

class GetSetMonster {
    constructor(public name: string, private _health: number) {

    }

    attack(target) {
      // WScript.Echo("Attacks " + target);
    }
  // The contextual keyword "get" followed by an identifier and
  // a curly body defines a getter in the same way that "get"
  // defines one in an object literal.
    get isAlive() {
        return this._health > 0;
    }

  // Likewise, "set" can be used to define setters.
    set health(value: number) {
        if (value < 0) {
            throw new Error('Health must be non-negative.')
    }
        this._health = value
  }
}

var m3 = new BasicMonster("1", 100);
var m4 = new BasicMonster("2", 100);
m3.attack(m4);
m3.health = 0;
var x = (<any>m5.isAlive).toString()

class OverloadedMonster {
    constructor(name: string);
    constructor(public name: string, public health?: number) {

    }

    attack();
    attack(a: any);
    attack(target?) {
        //WScript.Echo("Attacks " + target);
    }

    isAlive = true;
}

var m5 = new OverloadedMonster("1");
var m6 = new OverloadedMonster("2");
m5.attack(m6);
m5.health = 0;
var y = (<any>m5.isAlive).toString()

class SplatMonster {
    constructor(...args: string[]) { }
    roar(name: string, ...args: number[]) { }
}


function foo() { return true; }
class PrototypeMonster {
    age: number = 1;
    name: string;
    b = foo();
}

class SuperParent {
    constructor(a: number) {

    }

    b(b: string) {

    }

    c() {

    }
}

class SuperChild extends SuperParent {
    constructor() {
        super(1);
    }

    b() {
        super.b('str');
    }

    c() {
        super.c();
    }
}

class Statics {
    static foo = 1;
    static bar: string;

    static baz() {
        return "";
    }
}

var stat = new Statics();

interface IFoo {
    x: number;
    z: string;
}

class ImplementsInterface implements IFoo {
    public x: number;
    public z: string;
    constructor() {
        this.x = 1;
        this.z = "foo";
    }
}

class Visibility {
    public foo() { }
    private bar() { }
    private x: number;
    public y: number;
    public z: number;
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}

class BaseClassWithConstructor {
    constructor(public x: number, public s: string) { }
}

// used to test codegen
class ChildClassWithoutConstructor extends BaseClassWithConstructor { }


var ccwc = new ChildClassWithoutConstructor(1, "s");



//// [es6ClassTest2.js]
class BasicMonster {
    constructor(name, health) {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }
    attack(target) {
        // WScript.Echo("Attacks " + target);
    }
}
var m1 = new BasicMonster("1", 100);
var m2 = new BasicMonster("2", 100);
m1.attack(m2);
m1.health = 0;
console.log(m5.isAlive.toString());
class GetSetMonster {
    constructor(name, _health) {
        this.name = name;
        this._health = _health;
    }
    attack(target) {
        // WScript.Echo("Attacks " + target);
    }
    // The contextual keyword "get" followed by an identifier and
    // a curly body defines a getter in the same way that "get"
    // defines one in an object literal.
    get isAlive() {
        return this._health > 0;
    }
    // Likewise, "set" can be used to define setters.
    set health(value) {
        if (value < 0) {
            throw new Error('Health must be non-negative.');
        }
        this._health = value;
    }
}
var m3 = new BasicMonster("1", 100);
var m4 = new BasicMonster("2", 100);
m3.attack(m4);
m3.health = 0;
var x = m5.isAlive.toString();
class OverloadedMonster {
    constructor(name, health) {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }
    attack(target) {
        //WScript.Echo("Attacks " + target);
    }
}
var m5 = new OverloadedMonster("1");
var m6 = new OverloadedMonster("2");
m5.attack(m6);
m5.health = 0;
var y = m5.isAlive.toString();
class SplatMonster {
    constructor(...args) { }
    roar(name, ...args) { }
}
function foo() { return true; }
class PrototypeMonster {
    constructor() {
        this.age = 1;
        this.b = foo();
    }
}
class SuperParent {
    constructor(a) {
    }
    b(b) {
    }
    c() {
    }
}
class SuperChild extends SuperParent {
    constructor() {
        super(1);
    }
    b() {
        super.b('str');
    }
    c() {
        super.c();
    }
}
class Statics {
    static baz() {
        return "";
    }
}
Statics.foo = 1;
var stat = new Statics();
class ImplementsInterface {
    constructor() {
        this.x = 1;
        this.z = "foo";
    }
}
class Visibility {
    foo() { }
    bar() { }
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}
class BaseClassWithConstructor {
    constructor(x, s) {
        this.x = x;
        this.s = s;
    }
}
// used to test codegen
class ChildClassWithoutConstructor extends BaseClassWithConstructor {
}
var ccwc = new ChildClassWithoutConstructor(1, "s");
