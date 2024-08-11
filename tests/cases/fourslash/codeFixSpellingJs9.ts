/// <reference path='fourslash.ts' />
// @allowJs: true
// @Filename: codeFixSpellingJs9.js
//// class C {
////     numble = 1
////     mumble() {
////         return this.[|numbles|]
////     }
//// }
//// class D extends C { }
//// const c = new C()
//// c.[|numbles|] = 3
//// c.[|mumbles|]()
//// const d = new D()
//// d.[|numbles|] = 4
//// d.[|mumbles()|]
//// class Person {
////     getFavoriteColor() {
////
////     }
//// }
////
//// const person = new Person();
//// person.[|getFavoriteColour|]();
//// person.[|getFavoriteColoxr|]();
//// function deco() { }
//// @deco
//// class Art {
////   style = true
//// }
//// const a = new Art()
//// a.[|stylo|]
//// @deco
//// class Double extends Art { }
//// const db = new Double()
//// db.[|stylo|]
verify.codeFixAll({
    fixId: "fixSpelling",
    fixAllDescription: "Fix all detected spelling errors",
    newFileContent:
    `class C {
    numble = 1
    mumble() {
        return this.numble
    }
}
class D extends C { }
const c = new C()
c.numble = 3
c.mumble()
const d = new D()
d.numbles = 4
d.mumbles()
class Person {
    getFavoriteColor() {

    }
}

const person = new Person();
person.getFavoriteColor();
person.getFavoriteColor();
function deco() { }
@deco
class Art {
  style = true
}
const a = new Art()
a.stylo
@deco
class Double extends Art { }
const db = new Double()
db.stylo`,
});
