export module me {
    export class class1 {
        public prop1 = 0;
    }

    export var x = class1;
    export function foo() {
        return new class1();
    }
}