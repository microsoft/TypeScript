//// [taggedTemplateStringsWithIncompatibleTypedTags.ts]
interface I {
    (stringParts: string[], ...rest: boolean[]): I;
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
var f;
(_a = ["abc"], _a.raw = ["abc"], f(_a));
(_a_1 = ["abc", "def", "ghi"], _a_1.raw = ["abc", "def", "ghi"], f(_a_1, 1, 2));
(_a_2 = ["abc"], _a_2.raw = ["abc"], f(_a_2)).member;
(_a_3 = ["abc", "def", "ghi"], _a_3.raw = ["abc", "def", "ghi"], f(_a_3, 1, 2)).member;
(_a_4 = ["abc"], _a_4.raw = ["abc"], f(_a_4))["member"];
(_a_5 = ["abc", "def", "ghi"], _a_5.raw = ["abc", "def", "ghi"], f(_a_5, 1, 2))["member"];
(_a_6 = ["abc", "def", "ghi"], _a_6.raw = ["abc", "def", "ghi"], (_a_7 = ["abc"], _a_7.raw = ["abc"], f(_a_7))[0].member(_a_6, 1, 2));
(_a_8 = ["abc", "def", "ghi"], _a_8.raw = ["abc", "def", "ghi"], (_a_9 = ["abc", "def", "ghi"], _a_9.raw = ["abc", "def", "ghi"], f(_a_9, 1, 2))["member"].member(_a_8, 1, 2));
(_a_10 = ["abc", "def", "ghi"], _a_10.raw = ["abc", "def", "ghi"], (_a_11 = ["abc", "def", "ghi"], _a_11.raw = ["abc", "def", "ghi"], f(_a_11, true, true))["member"].member(_a_10, 1, 2));
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _a_1, _a_2, _a_3, _a_4, _a_5, _a_6, _a_7, _a_8, _a_9, _a_10, _a_11;
