//// [asyncMethod17.ts]
var o = {
  f(await = await) {
  }
}

//// [asyncMethod17.js]
var o = {
    f: function (await) {
        if (await === void 0) { await = await; }
    }
};
