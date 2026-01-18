namespace mOfGloalFile {
    export class c {
    }
}
import exports = mOfGloalFile.c;
import require = mOfGloalFile.c;
new exports();
new require();

namespace m1 {
    import exports = mOfGloalFile.c;
    import require = mOfGloalFile.c;
    new exports();
    new require();
}

namespace m2 {
    export import exports = mOfGloalFile.c;
    export import require = mOfGloalFile.c;
    new exports();
    new require();
}