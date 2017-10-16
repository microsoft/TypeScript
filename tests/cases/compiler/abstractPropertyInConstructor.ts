abstract class AbstractClass {
    constructor(str: string) {
        this.method(parseInt(str));
        let val = this.prop.toLowerCase();

        if (!str) {
            this.prop = "Hello World";
        }
        this.cb(str);

        const innerFunction = () => {
            return this.prop;
        }
    }

    abstract prop: string;
    abstract cb: (s: string) => void;

    abstract method(num: number): void;

    method2() {
        this.prop = this.prop + "!";
    }
}

class User {
    constructor(a: AbstractClass) {
        a.prop;
        a.cb("hi");
        a.method(12);
        a.method2();
    }
}
