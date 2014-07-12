module Test {
    class A {
        one: string;
        two: boolean;
        constructor (t: string) {
            this.one = t;
            this.two = false;
        }
    }
    export class B {
        private member: A[];

        constructor () {
            this.member = [];
        }
    }
}
