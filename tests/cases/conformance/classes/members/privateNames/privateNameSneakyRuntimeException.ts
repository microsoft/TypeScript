// @strict: true
// @target es6

function createClass () {
    return class {
        #foo = 3;
        equals(other: any) {
            return this.#foo = other.#foo;
        }
    };
}

const a = new (createClass())();
const b = new (createClass())();

console.log(a.equals(b));     // OK at compile time but will be a runtime error
