/// <reference path='fourslash.ts'/>

//// enum Key {
////     A = "a",
////     B = "b"
//// }
////
//// // Produces members with union name types (Key.A | "a", Key.B | "b")
//// type [|Foo|] = { [K in Key | `${Key}`]: 1 }
////
//// // Should produce the same type as Foo
//// type [|Bar|] = { [K in keyof Foo]: 1 }

const [Foo, Bar] = test.ranges()

verify.quickInfoAt(Foo,
`type Foo = {
    a: 1;
    b: 1;
}`)

verify.quickInfoAt(Bar,
`type Bar = {
    a: 1;
    b: 1;
}`)
