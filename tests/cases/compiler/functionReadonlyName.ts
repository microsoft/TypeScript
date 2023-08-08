// @noEmit: true

const f0 = new Function()
f0.name = 'foo';

function f1() {};
f1.name = 'foo';

const f2 = function () {};
f2.name = 'foo'

const f3 = () => {}
f3.name = 'foo'
