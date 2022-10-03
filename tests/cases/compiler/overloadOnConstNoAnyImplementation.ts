function x1(a: number, cb: (x: 'hi') => number);
function x1(a: number, cb: (x: 'bye') => number);
function x1(a: number, cb: (x: string) => number) {
    cb('hi');
    cb('bye');
    var hm = 'hm';
    cb(hm);
    cb('uh');
    cb(1); // error
}

var cb: (number) => number = (x: number) => 1;
x1(1, cb);
x1(1, (x: 'hi') => 1); // error
x1(1, (x: string) => 1);