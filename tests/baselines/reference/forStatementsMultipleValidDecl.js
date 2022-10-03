//// [forStatementsMultipleValidDecl.ts]
// all expected to be valid

for (var x: number; ;) { }
for (var x = 2; ;) { }

for (var x = <number>undefined; ;) { }
// new declaration space, making redeclaring x as a string valid
function declSpace() {
    for (var x = 'this is a string'; ;) { }
}
interface Point { x: number; y: number; }

for (var p: Point; ;) { }
for (var p = { x: 1, y: 2 }; ;) { }
for (var p: Point = { x: 0, y: undefined }; ;) { }
for (var p = { x: 1, y: <number>undefined }; ;) { }
for (var p: { x: number; y: number; } = { x: 1, y: 2 }; ;) { }
for (var p = <{ x: number; y: number; }>{ x: 0, y: undefined }; ;) { }
for (var p: typeof p; ;) { }

for (var fn = function (s: string) { return 42; }; ;) { }
for (var fn = (s: string) => 3; ;) { }
for (var fn: (s: string) => number; ;) { }
for (var fn: { (s: string): number }; ;) { }
for (var fn = <(s: string) => number> null; ;) { }
for (var fn: typeof fn; ;) { }

for (var a: string[]; ;) { }
for (var a = ['a', 'b']; ;) { }
for (var a = <string[]>[]; ;) { }
for (var a: string[] = []; ;) { }
for (var a = new Array<string>(); ;) { }
for (var a: typeof a; ;) { }

//// [forStatementsMultipleValidDecl.js]
// all expected to be valid
for (var x;;) { }
for (var x = 2;;) { }
for (var x = undefined;;) { }
// new declaration space, making redeclaring x as a string valid
function declSpace() {
    for (var x = 'this is a string';;) { }
}
for (var p;;) { }
for (var p = { x: 1, y: 2 };;) { }
for (var p = { x: 0, y: undefined };;) { }
for (var p = { x: 1, y: undefined };;) { }
for (var p = { x: 1, y: 2 };;) { }
for (var p = { x: 0, y: undefined };;) { }
for (var p;;) { }
for (var fn = function (s) { return 42; };;) { }
for (var fn = function (s) { return 3; };;) { }
for (var fn;;) { }
for (var fn;;) { }
for (var fn = null;;) { }
for (var fn;;) { }
for (var a;;) { }
for (var a = ['a', 'b'];;) { }
for (var a = [];;) { }
for (var a = [];;) { }
for (var a = new Array();;) { }
for (var a;;) { }
