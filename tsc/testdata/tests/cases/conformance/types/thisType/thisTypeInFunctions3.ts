// @target: es2015
// @strict: false
declare class Base {
    check<TProp extends this>(prop: TProp): boolean;
}

class Test extends Base {
    m() {
        this.check(this);
    }
}
