//// [downlevelLetConst14.ts]
'use strict'
declare function use(a: any);

var x = 10;
var z0, z1, z2, z3;
{
    let x = 20;
    use(x);

    let [z0] = [1];
    use(z0);
    let [z1] = [1]
    use(z1);
    let {a: z2} = { a: 1 };
    use(z2);
    let {a: z3} = { a: 1 };
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
    let y = "";
    let [z6] = [true]
    {
        let y = 1;
        let {a: z6} = {a: 1}
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
    let z = "";
    let [z5] = [5];
    {
        let _z = 1;
        let {a: _z5} = { a: 1 };
        // try to step on generated name
        use(_z);
    }
    use(z);
}
use(y);

//// [downlevelLetConst14.js]
'use strict';
var x = 10;
var z0, z1, z2, z3;
{
    var _x = 20;
    use(_x);
    var _z0 = ([1])[0];
    use(_z0);
    var _z1 = ([1])[0];
    use(_z1);
    var _z2 = ({ a: 1 }).a;
    use(_z2);
    var _z3 = ({ a: 1 }).a;
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
