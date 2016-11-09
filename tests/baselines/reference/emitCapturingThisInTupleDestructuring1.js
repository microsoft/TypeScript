//// [emitCapturingThisInTupleDestructuring1.ts]
declare function wrapper(x: any);
wrapper((array: [any]) => {
    [this.test, this.test1, this.test2] = array;  // even though there is a compiler error, we should still emit lexical capture for "this"
});

//// [emitCapturingThisInTupleDestructuring1.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var _this = this;
wrapper(function (array) {
    _a = __read(array, 3), _this.test = _a[0], _this.test1 = _a[1], _this.test2 = _a[2]; // even though there is a compiler error, we should still emit lexical capture for "this"
    var _a;
});
