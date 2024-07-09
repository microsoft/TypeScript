//// [tests/cases/compiler/downlevelLetConst19.ts] ////

//// [downlevelLetConst19.ts]
'use strict'
declare function use(a: any);
var x;
function a() {
  {
    let x;
    use(x);

    function b() {
        {
            let x;
            use(x);
        }
        use(x);
    }
  }
  use(x)
}
use(x)

//// [downlevelLetConst19.js]
'use strict';
var x;
function a() {
    {
        var x_1;
        use(x_1);
        function b() {
            {
                var x_2;
                use(x_2);
            }
            use(x_1);
        }
    }
    use(x);
}
use(x);
