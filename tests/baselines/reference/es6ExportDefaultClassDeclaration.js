//// [es6ExportDefaultClassDeclaration.ts]

export default class c {
    member = 10;
}

//// [es6ExportDefaultClassDeclaration.js]
var c = (function () {
    function c() {
        this.member = 10;
    }
    return c;
})();
exports.c = c;


//// [es6ExportDefaultClassDeclaration.d.ts]
export declare class c {
    member: number;
}
