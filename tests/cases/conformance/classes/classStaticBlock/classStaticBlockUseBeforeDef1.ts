// @target: esnext
// @noEmit: true
// @strict: true

class C {
    static x;
    static {
        this.x = 1;
    }
    static y = this.x;
    static z;
    static {
        this.z = this.y;
    }
}