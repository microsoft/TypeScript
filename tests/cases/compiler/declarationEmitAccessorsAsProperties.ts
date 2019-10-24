// @declaration: true
// @target: es5
// @legacyAccessorDeclarations: true
export class Cls {
    get prop(): number {
        return 12;
    }

    set evt(x: number) {}

    get val(): number {
        return 42;
    }
    set val(_) {}
}