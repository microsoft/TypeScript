// @target: es5
class C {
    constructor(cb = (a: { }) => this.m(a)) {
        cb({ });
    }

    private m(a: any): boolean {
        a;
        return true;
    }
}
