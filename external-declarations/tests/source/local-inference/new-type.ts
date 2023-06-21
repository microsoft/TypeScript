// @strict:true,false
// @target: es2015
namespace Ns {
    export class Cat {
        cat = true
    }
}

let x = new Promise<string>(() => {});
let cat = new Ns.Cat()


export class Dog {
    dog = true
}
export class Bird {
    bird = true
}
export default [
    new Ns.Cat(),
    new Dog(),
    new Bird(),
];
