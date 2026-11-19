// @target: es2015
// @filename: /a.ts
/**
 * {@link Foo.member | static}
 * {@link Foo#member | instance}
 */
class Foo {
    static member = 123;
    member = 456;
}
