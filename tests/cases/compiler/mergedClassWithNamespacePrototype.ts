// @Filename: /a.d.ts
declare class Foo {}

// @Filename: /b.ts
declare namespace Foo {
    namespace prototype {
        function f(): void;
    }
}
