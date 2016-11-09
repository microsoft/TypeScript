//// [bindingPatternInParameter01.ts]
const nestedArray = [[[1, 2]], [[3, 4]]];

nestedArray.forEach(([[a, b]]) => {
  console.log(a, b);
});


//// [bindingPatternInParameter01.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var nestedArray = [[[1, 2]], [[3, 4]]];
nestedArray.forEach(function (_a) {
    var _b = __read(_a, 1), _c = __read(_b[0], 2), a = _c[0], b = _c[1];
    console.log(a, b);
});
