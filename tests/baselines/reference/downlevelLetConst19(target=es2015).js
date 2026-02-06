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
    use(x);
}
use(x);
