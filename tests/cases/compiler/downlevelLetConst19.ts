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