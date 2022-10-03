// @target:es5
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