//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTypedTags.ts] ////

//// [taggedTemplateStringsWithTypedTags.ts]
interface I {
    (stringParts: TemplateStringsArray, ...rest: number[]): I;
    g: I;
    h: I;
    member: I;
    thisIsNotATag(x: string): void
    [x: number]: I;
}

var f: I;

f `abc`

f `abc${1}def${2}ghi`;

f `abc`.member

f `abc${1}def${2}ghi`.member;

f `abc`["member"];

f `abc${1}def${2}ghi`["member"];

f `abc`[0].member `abc${1}def${2}ghi`;

f `abc${1}def${2}ghi`["member"].member `abc${1}def${2}ghi`;

f.thisIsNotATag(`abc`);

f.thisIsNotATag(`abc${1}def${2}ghi`);


//// [taggedTemplateStringsWithTypedTags.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var f;
f(__makeTemplateObject(["abc"], ["abc"]));
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f(__makeTemplateObject(["abc"], ["abc"])).member;
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2).member;
f(__makeTemplateObject(["abc"], ["abc"]))["member"];
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2)["member"];
f(__makeTemplateObject(["abc"], ["abc"]))[0].member(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2)["member"].member(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc".concat(1, "def").concat(2, "ghi"));
