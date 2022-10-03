module mOfGloalFile {
    export class c {
    }
}
import exports = mOfGloalFile.c;
import require = mOfGloalFile.c;
new exports();
new require();

module m1 {
    import exports = mOfGloalFile.c;
    import require = mOfGloalFile.c;
    new exports();
    new require();
}

module m2 {
    export import exports = mOfGloalFile.c;
    export import require = mOfGloalFile.c;
    new exports();
    new require();
}