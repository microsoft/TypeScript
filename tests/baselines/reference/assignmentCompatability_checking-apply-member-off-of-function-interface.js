//// [tests/cases/compiler/assignmentCompatability_checking-apply-member-off-of-function-interface.ts] ////

//// [assignmentCompatability_checking-apply-member-off-of-function-interface.ts]
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


//// [assignmentCompatability_checking-apply-member-off-of-function-interface.js]
// 3.8.4 Assignment Compatibility 
var x;
// Should fail
x = '';
x = [''];
x = 4;
x = {};
// Should work
function f() { }
;
x = f;
function fn(c) { }
// Should Fail
fn('');
fn(['']);
fn(4);
fn({});
// Should work
fn(function (a) { });
