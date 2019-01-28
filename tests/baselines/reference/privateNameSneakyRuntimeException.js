//// [privateNameSneakyRuntimeException.ts]
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


tests/cases/conformance/classes/members/privateNames/privateNameSneakyRuntimeException.js(6,18): error TS1011: An element access expression should take an argument.
tests/cases/conformance/classes/members/privateNames/privateNameSneakyRuntimeException.js(9,26): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameSneakyRuntimeException.js(9,34): error TS1003: Identifier expected.


==== tests/cases/conformance/classes/members/privateNames/privateNameSneakyRuntimeException.js (3 errors) ====
    "use strict";
    // @target es6
    function createClass() {
        return /** @class */ (function () {
            function class_1() {
                this[] = 3;
                     
!!! error TS1011: An element access expression should take an argument.
            }
            class_1.prototype.equals = function (other) {
                return this. = other.;
                             ~
!!! error TS1003: Identifier expected.
                                     ~
!!! error TS1003: Identifier expected.
            };
            return class_1;
        }());
    }
    var a = new (createClass())();
    var b = new (createClass())();
    console.log(a.equals(b)); // OK at compile time but will be a runtime error
    