//// [taggedTemplateStringsWithIncompatibleTypedTags.ts]
interface I {
    (stringParts: TemplateStringsArray, ...rest: boolean[]): I;
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

f `abc${ true }def${ true }ghi`["member"].member `abc${ 1 }def${ 2 }ghi`;

f.thisIsNotATag(`abc`);

f.thisIsNotATag(`abc${1}def${2}ghi`);


//// [taggedTemplateStringsWithIncompatibleTypedTags.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var f;
f(templateObject_193485963_1 || (templateObject_193485963_1 = __makeTemplateObject(["abc"], ["abc"])));
f(templateObject_6321411194_1 || (templateObject_6321411194_1 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(templateObject_193485963_2 || (templateObject_193485963_2 = __makeTemplateObject(["abc"], ["abc"]))).member;
f(templateObject_6321411194_2 || (templateObject_6321411194_2 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2).member;
f(templateObject_193485963_3 || (templateObject_193485963_3 = __makeTemplateObject(["abc"], ["abc"])))["member"];
f(templateObject_6321411194_3 || (templateObject_6321411194_3 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"];
f(templateObject_193485963_4 || (templateObject_193485963_4 = __makeTemplateObject(["abc"], ["abc"])))[0].member(templateObject_6321411194_4 || (templateObject_6321411194_4 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(templateObject_6321411194_5 || (templateObject_6321411194_5 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"].member(templateObject_6321411194_6 || (templateObject_6321411194_6 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(templateObject_6321411194_7 || (templateObject_6321411194_7 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), true, true)["member"].member(templateObject_6321411194_8 || (templateObject_6321411194_8 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var templateObject_193485963_1, templateObject_6321411194_1, templateObject_193485963_2, templateObject_6321411194_2, templateObject_193485963_3, templateObject_6321411194_3, templateObject_193485963_4, templateObject_6321411194_4, templateObject_6321411194_5, templateObject_6321411194_6, templateObject_6321411194_7, templateObject_6321411194_8;
