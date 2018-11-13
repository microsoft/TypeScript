// @noUnusedLocals:true

// Unlike everything else, a setter without a getter is used by a write access.
class Employee {
    private set p(_: number) {}

    m() {
        this.p = 0;
    }
}