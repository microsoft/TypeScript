//@noUnusedLocals:true
//@noUnusedParameters:true

function greeter(person: string) {
    var unused = 20;
}

class Dummy<usedtypeparameter, unusedtypeparameter> {
    private unusedprivatevariable: string;
    private greeting: string;
    public unusedpublicvariable: string;
    public typedvariable: usedtypeparameter;

    constructor(message: string) {
        var unused2 = 22;
        this.greeting = "Dummy Message";
    }

    public greeter(person: string) {
        var unused = 20;
        this.usedPrivateFunction();
    }

    private usedPrivateFunction() {
    }

    private unUsedPrivateFunction() {
    }
}

var user = "Jane User";
var user2 = "Jane2 User2";

namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s2: string) {
            return lettersRegexp.test(s2);
        }

        private unUsedPrivateFunction() {
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s3: string) {
            return s3.length === 5;
        }
    }

    interface usedLocallyInterface {
    }

    interface usedLocallyInterface2 {
        someFunction(s1: string): void;
    }

    export interface exportedInterface {
    }

    class dummy implements usedLocallyInterface {
    }

    interface unusedInterface {
    }
}


namespace Greeter {
    class class1 {
    }

    export class class2 extends class1 {
    }

    class class3 {
    }

    export class class4 {
    }

    interface interface1 {
    }

    export interface interface2 extends interface1 {
    }

    interface interface3 {
    }

    export interface interface4 {
    }

    export let a: interface3;

    interface interface5 {
    }
}