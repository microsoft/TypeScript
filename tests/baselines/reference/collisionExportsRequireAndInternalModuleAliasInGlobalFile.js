//// [collisionExportsRequireAndInternalModuleAliasInGlobalFile.ts]
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

//// [collisionExportsRequireAndInternalModuleAliasInGlobalFile.js]
var mOfGloalFile;
(function (mOfGloalFile) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    mOfGloalFile.c = c;
})(mOfGloalFile || (mOfGloalFile = {}));
var exports = mOfGloalFile.c;
var require = mOfGloalFile.c;
new exports();
new require();
var m1;
(function (m1) {
    var exports = mOfGloalFile.c;
    var require = mOfGloalFile.c;
    new exports();
    new require();
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.exports = mOfGloalFile.c;
    m2.require = mOfGloalFile.c;
    new m2.exports();
    new m2.require();
})(m2 || (m2 = {}));
