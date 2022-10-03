//@module: commonjs
//@declaration: true

declare module "test" {
    module A {
        class C {
        }
    }
    class B extends E {
    }
    import E = A.C;
}