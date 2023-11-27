// @declaration: true
// @module: commonjs
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export const obj = {
    m(): this is Foo {
        let dis = this as {} as Foo;
        return dis.a != null && dis.b != null && dis.c != null;
    }
}