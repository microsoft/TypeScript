var fun1 = function() {
    var x = 'foo',
        z = 'bar';
    return x;
},

fun2 = (function(f) {
    var fun = function() {
        console.log(f());
    },
    x = 'Foo';
    return fun;
} (fun1));
