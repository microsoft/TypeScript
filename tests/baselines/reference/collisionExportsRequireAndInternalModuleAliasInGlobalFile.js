//// [collisionExportsRequireAndInternalModuleAliasInGlobalFile.ts]
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

//// [collisionExportsRequireAndInternalModuleAliasInGlobalFile.js]
var mOfGlobalFile;
(function (mOfGlobalFile) {
    var c = (function () {
        function c() {
        }
        return c;
    }());
    mOfGlobalFile.c = c;
})(mOfGlobalFile || (mOfGlobalFile = {}));
var exports = mOfGlobalFile.c;
var require = mOfGlobalFile.c;
new exports();
new require();
var m1;
(function (m1) {
    var exports = mOfGlobalFile.c;
    var require = mOfGlobalFile.c;
    new exports();
    new require();
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.exports = mOfGlobalFile.c;
    m2.require = mOfGlobalFile.c;
    new m2.exports();
    new m2.require();
})(m2 || (m2 = {}));
