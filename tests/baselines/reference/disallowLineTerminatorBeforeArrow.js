//// [disallowLineTerminatorBeforeArrow.ts]
var f1 = ()
    => { }
var f2 = (x: string, y: string) /*
  */  => { }
var f3 = (x: string, y: number, ...rest)
    => { }
var f4 = (x: string, y: number, ...rest) /*
  */  => { }
var f5 = (...rest)
    => { }
var f6 = (...rest) /*
  */  => { }
var f7 = (x: string, y: number, z = 10)
    => { }
var f8 = (x: string, y: number, z = 10) /*
  */  => { }

function foo(func: () => boolean) { }
foo(()
    => true);
foo(()
    => { return false; });


//// [disallowLineTerminatorBeforeArrow.js]
var f1 = ;
{
}
var f2 = ; /*
  */
{
}
var f3 = ;
{
}
var f4 = ; /*
  */
{
}
var f5 = ;
{
}
var f6 = ; /*
  */
{
}
var f7 = ;
{
}
var f8 = ; /*
  */
{
}
function foo(func) {
}
foo(, true);
foo(, {
    return: false
});
