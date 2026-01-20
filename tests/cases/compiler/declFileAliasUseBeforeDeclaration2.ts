//@module: commonjs
//@declaration: true

declare module "test" {
    namespace A {
        class C {
        }
    }
    class B extends E {
    }
    import E = A.C;
}