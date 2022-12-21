module M {
    export function fn(x: number) {
        return '';
    }
}

var x: any;
switch (x) {
    case '':
    case 12:
    case true:
    case null:
    case undefined:
    case new Date(12):
    case new Object():
    case /[a-z]/:
    case[]:
    case {}:
    case { id: 12 }:
    case['a']:
    case typeof x:
    case typeof M:
    case M.fn(1):
    case <T>(x: number) => '':
    case (<T>(x: number) => '')(2):
    default:
}

// basic assignable check, rest covered in tests for 'assignment compatibility'
class C { id: number; }
class D extends C { name: string }

switch (new C()) {
    case new D():
    case { id: 12, name: '' }:
    case new C():
}

switch ('') { }
switch (12) { }
switch (true) { }
switch (null) { }
switch (undefined) { }
switch (new Date(12)) { }
switch (new Object()) { }
switch (/[a-z]/) { }
switch ([]) { }
switch ({}) { }
switch ({ id: 12 }) { }
switch (['a']) { }
switch (<T>(x: number) => '') { }
switch ((<T>(x: T) => '')(1)) { }


