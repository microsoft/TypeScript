// @strict: true
// @target: esnext
// @declaration: true

class C {
    static accessor x;
    static {
        this.x = 1;
    }
    static accessor y = this.x;
    static accessor z;
    static {
        this.z = this.y;
    }
}
