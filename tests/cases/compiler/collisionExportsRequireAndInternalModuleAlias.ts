//@module: amd
export module m {
    export class c {
    }
}
import exports = m.c;
import require = m.c;
new exports();
new require();

module m1 {
    import exports = m.c;
    import require = m.c;
    new exports();
    new require();
}

module m2 {
    export import exports = m.c;
    export import require = m.c;
    new exports();
    new require();
}