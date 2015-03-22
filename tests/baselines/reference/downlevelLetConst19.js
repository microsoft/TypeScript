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
        var _x;
        use(_x);
        function b() {
            {
                var _x_1;
                use(_x_1);
            }
            use(_x);
        }
    }
    use(x);
}
use(x);
