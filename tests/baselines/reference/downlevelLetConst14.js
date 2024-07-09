//// [tests/cases/compiler/downlevelLetConst14.ts] ////

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
    var x_1 = 20;
    use(x_1);
    var z0_1 = [1][0];
    use(z0_1);
    var z1_1 = [1][0];
    use(z1_1);
    var z2_1 = { a: 1 }.a;
    use(z2_1);
    var z3_1 = { a: 1 }.a;
    use(z3_1);
}
use(x);
use(z0);
use(z1);
use(z2);
use(z3);
var z6;
var y = true;
{
    var y_1 = "";
    var z6_1 = [true][0];
    {
        var y_2 = 1;
        var z6_2 = { a: 1 }.a;
        use(y_2);
        use(z6_2);
    }
    use(y_1);
    use(z6_1);
}
use(y);
use(z6);
var z = false;
var z5 = 1;
{
    var z_1 = "";
    var z5_1 = [5][0];
    {
        var _z = 1;
        var _z5 = { a: 1 }.a;
        // try to step on generated name
        use(_z);
    }
    use(z_1);
}
use(y);
