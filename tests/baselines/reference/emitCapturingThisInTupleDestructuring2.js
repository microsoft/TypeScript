//// [emitCapturingThisInTupleDestructuring2.ts]
var array1: [number, number] = [1, 2];

class B {
    test: number;
    test1: any;
    test2: any;
    method() {
        () => [this.test, this.test1, this.test2] = array1; // even though there is a compiler error, we should still emit lexical capture for "this" 
    }
}

//// [emitCapturingThisInTupleDestructuring2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var array1 = [1, 2];
var B = (function () {
    function B() {
    }
    B.prototype.method = function () {
        var _this = this;
        (function () {
            return _a = __read(array1, 3), _this.test = _a[0], _this.test1 = _a[1], _this.test2 = _a[2], array1;
            var _a;
        }); // even though there is a compiler error, we should still emit lexical capture for "this" 
    };
    return B;
}());
