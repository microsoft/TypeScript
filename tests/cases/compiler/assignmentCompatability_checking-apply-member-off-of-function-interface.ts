// 3.8.4 Assignment Compatibility 

interface Applicable {
    apply(blah: any); // also works for 'apply'
}

var x: Applicable;

// Should fail
x = '';
x = [''];
x = 4;
x = {};

// Should work
function f() { };
x = f;

function fn(c: Applicable) { }

// Should Fail
fn('');
fn(['']);
fn(4);
fn({});


// Should work
fn(a => { });
