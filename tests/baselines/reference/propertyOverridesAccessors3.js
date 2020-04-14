//// [propertyOverridesAccessors3.ts]
class Animal {
    _sound = 'rustling noise in the bushes'

    get sound() { return this._sound }
    set sound(val) {
      this._sound = val;
      /* some important code here, perhaps tracking known sounds, etc */
    }

    makeSound() {
        console.log(this._sound)
    }
}

const a = new Animal
a.makeSound() // 'rustling noise in the bushes'

class Lion extends Animal {
    sound = 'RAWR!' // error here
}

const lion = new Lion
lion.makeSound() // with [[Define]]: Expected "RAWR!" but got "rustling noise in the bushes"


//// [propertyOverridesAccessors3.js]
class Animal {
    _sound = 'rustling noise in the bushes';
    get sound() { return this._sound; }
    set sound(val) {
        this._sound = val;
        /* some important code here, perhaps tracking known sounds, etc */
    }
    makeSound() {
        console.log(this._sound);
    }
}
const a = new Animal;
a.makeSound(); // 'rustling noise in the bushes'
class Lion extends Animal {
    sound = 'RAWR!'; // error here
}
const lion = new Lion;
lion.makeSound(); // with [[Define]]: Expected "RAWR!" but got "rustling noise in the bushes"
