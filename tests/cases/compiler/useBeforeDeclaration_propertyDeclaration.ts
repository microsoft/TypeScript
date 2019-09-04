// @strict: true
class A {
    num: number;
    constructor(num:number) {
        this.num = num;
    }

    computed = this.num * 10;
}