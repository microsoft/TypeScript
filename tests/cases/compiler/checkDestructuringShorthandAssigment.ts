// @allowjs: true
// @checkjs: true
// @noEmit: true
// @Filename: bug25434.js
// should not crash while checking
function Test({ b = '' } = {}) {}

Test(({ b = '5' } = {}));
