// @target: es2015
// @strict: false
function f(a:any) {
void (r =>(r => r));
}
f((r =>(r => r)));
void(r =>(r => r));
[(r =>(r => r))]