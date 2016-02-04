module mOfGlobalFile {
    export class c {
    }
}
import exports = mOfGlobalFile.c;
import require = mOfGlobalFile.c;
new exports();
new require();

module m1 {
    import exports = mOfGlobalFile.c;
    import require = mOfGlobalFile.c;
    new exports();
    new require();
}

module m2 {
    export import exports = mOfGlobalFile.c;
    export import require = mOfGlobalFile.c;
    new exports();
    new require();
}