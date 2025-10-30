//@module: amd
export namespace m {
    export class c {
    }
}
import exports = m.c;
import require = m.c;
new exports();
new require();

namespace m1 {
    import exports = m.c;
    import require = m.c;
    new exports();
    new require();
}

namespace m2 {
    export import exports = m.c;
    export import require = m.c;
    new exports();
    new require();
}