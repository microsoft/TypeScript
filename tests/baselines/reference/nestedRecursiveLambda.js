//// [nestedRecursiveLambda.ts]
function f(a:any) {
void (r =>(r => r));
}
f((r =>(r => r)));
void(r =>(r => r));
[(r =>(r => r))]

//// [nestedRecursiveLambda.js]
function f(a) {
    void (function (r) { return (function (r) { return r; }); });
}
f((function (r) { return (function (r) { return r; }); }));
void (function (r) { return (function (r) { return r; }); });
[(function (r) { return (function (r) { return r; }); })];
