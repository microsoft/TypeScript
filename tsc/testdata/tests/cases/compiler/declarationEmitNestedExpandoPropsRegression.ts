// @declaration: true
function Foo(): void { }
Foo.top = 1;
let d: number = (Foo.inInitializer = 2);
if (true) {
    Foo.inBlock = 3;
}