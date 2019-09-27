//// [propertyOverridesAccessors2.ts]
class Base {
  get x() { return 2; }
  set x(value) { console.log(`x was set to ${value}`); }
}

class Derived extends Base {
  x = 1;
}

const obj = new Derived(); // prints 'x was set to 1'
console.log(obj.x); // 2


//// [propertyOverridesAccessors2.js]
class Base {
    get x() { return 2; }
    set x(value) { console.log(`x was set to ${value}`); }
}
class Derived extends Base {
    x = 1;
}
const obj = new Derived(); // prints 'x was set to 1'
console.log(obj.x); // 2
