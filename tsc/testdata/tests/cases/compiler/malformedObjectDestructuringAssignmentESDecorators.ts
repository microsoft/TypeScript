// @target: es2022

declare function dec(...args: any[]): any;

@dec
class C {
    static {
        ({ m() {}, get g() { return 1; }, set s(v) {} } = this);
    }
}
