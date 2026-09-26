// @isolatedDeclarations: true
// @declaration: true
// @emitDeclarationOnly: true
declare function foo(): number;
declare function bar(): { x: number };
class Base { y = 0; }
export class C extends Base {
    z = 0;
    a = { p: (this.z = foo()) };
    b = { p: (super.y = foo()) };
    c = { p: (bar().x = foo()) };
}
export const d = { p: (bar().x = foo()) };
