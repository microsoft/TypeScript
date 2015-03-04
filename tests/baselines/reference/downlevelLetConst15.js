//// [downlevelLetConst15.ts]
'use strict'
declare function use(a: any);

var x = 10;
var z0, z1, z2, z3;
{
    const x = 20;
    use(x);

    const [z0] = [1];
    use(z0);
    const [{a: z1}] = [{a: 1}]
    use(z1);
    const {a: z2} = { a: 1 };
    use(z2);
    const {a: {b: z3}} = { a: {b: 1} };
    use(z3);
}
use(x);
use(z0);
use(z1);
use(z2);
use(z3);
var z6;
var y = true;
{
    const y = "";
    const [z6] = [true]
    {
        const y = 1;
        const {a: z6} = { a: 1 }
        use(y);
        use(z6);
    }
    use(y);
    use(z6);
}
use(y);
use(z6);

var z = false;
var z5 = 1;
{
    const z = "";
    const [z5] = [5];
    {
        const _z = 1;
        const {a: _z5} = { a: 1 };
        // try to step on generated name
        use(_z);
    }
    use(z);
}
use(y);

//// [downlevelLetConst15.js]
'use strict';
var x = 10;
var z0, z1, z2, z3;
{
    var _x = 20;
    use(_x);
    var _z0 = ([1])[0];
    use(_z0);
    var _z1 = ([{ a: 1 }])[0].a;
    use(_z1);
    var _z2 = ({ a: 1 }).a;
    use(_z2);
    var _z3 = ({ a: { b: 1 } }).a.b;
    use(_z3);
}
use(x);
use(z0);
use(z1);
use(z2);
use(z3);
var z6;
var y = true;
{
    var _y = "";
    var _z6 = ([true])[0];
    {
        var _y_1 = 1;
        var _z6_1 = ({ a: 1 }).a;
        use(_y_1);
        use(_z6_1);
    }
    use(_y);
    use(_z6);
}
use(y);
use(z6);
var z = false;
var z5 = 1;
{
    var _z = "";
    var _z5 = ([5])[0];
    {
        var _z_1 = 1;
        var _z5_1 = ({ a: 1 }).a;
        // try to step on generated name
        use(_z_1);
    }
    use(_z);
}
use(y);
