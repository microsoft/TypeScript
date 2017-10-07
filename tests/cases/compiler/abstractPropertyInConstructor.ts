abstract class AbstractClass {
    constructor(str: string) {
        this.method(parseInt(str));
        let val = this.prop.toLowerCase();
        this.prop = "Hello World";
    }

    abstract prop: string;

    abstract method(num: number): void;

    method2() {
        this.prop = this.prop + "!";
    }
}
