//// [overloadOnConstAsTypeAnnotation.ts]

var f: (x: 'hi') => number = ('hi') => { return 1; };

//// [overloadOnConstAsTypeAnnotation.js]
var f = ('hi');
{
    return 1;
}
;
