//// [es6ExportDefaultClassDeclarationInEs5.ts]

export default class c {
    member = 10;
}

//// [es6ExportDefaultClassDeclarationInEs5.js]
var c = (function () {
    function c() {
        this.member = 10;
    }
    return c;
})();
exports.c = c;


//// [es6ExportDefaultClassDeclarationInEs5.d.ts]
export declare class c {
    member: number;
}
