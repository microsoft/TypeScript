//// [destructuringObjectBindingPatternAndAssignment5.ts]
function a () {
    let x: number;
    let y: any
    ({ x, ...y } = ({ } as any));
}


//// [destructuringObjectBindingPatternAndAssignment5.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
function a() {
    var _a;
    var x;
    var y;
    (_a = {}, (x = _a.x, _a), y = __rest(_a, ["x"]));
}
