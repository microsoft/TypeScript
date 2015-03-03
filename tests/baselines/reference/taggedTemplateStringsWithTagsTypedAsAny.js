//// [taggedTemplateStringsWithTagsTypedAsAny.ts]
var f: any;

f `abc`

f `abc${1}def${2}ghi`;

f.g.h `abc`

f.g.h `abc${1}def${2}ghi`;

f `abc`.member

f `abc${1}def${2}ghi`.member;

f `abc`["member"];

f `abc${1}def${2}ghi`["member"];

f `abc`["member"].someOtherTag `abc${1}def${2}ghi`;

f `abc${1}def${2}ghi`["member"].someOtherTag `abc${1}def${2}ghi`;

f.thisIsNotATag(`abc`);

f.thisIsNotATag(`abc${1}def${2}ghi`);

//// [taggedTemplateStringsWithTagsTypedAsAny.js]
var f;
(_a = ["abc"], _a.raw = ["abc"], f(_a));
(_a_1 = ["abc", "def", "ghi"], _a_1.raw = ["abc", "def", "ghi"], f(_a_1, 1, 2));
(_a_2 = ["abc"], _a_2.raw = ["abc"], f.g.h(_a_2));
(_a_3 = ["abc", "def", "ghi"], _a_3.raw = ["abc", "def", "ghi"], f.g.h(_a_3, 1, 2));
(_a_4 = ["abc"], _a_4.raw = ["abc"], f(_a_4)).member;
(_a_5 = ["abc", "def", "ghi"], _a_5.raw = ["abc", "def", "ghi"], f(_a_5, 1, 2)).member;
(_a_6 = ["abc"], _a_6.raw = ["abc"], f(_a_6))["member"];
(_a_7 = ["abc", "def", "ghi"], _a_7.raw = ["abc", "def", "ghi"], f(_a_7, 1, 2))["member"];
(_a_8 = ["abc", "def", "ghi"], _a_8.raw = ["abc", "def", "ghi"], (_a_9 = ["abc"], _a_9.raw = ["abc"], f(_a_9))["member"].someOtherTag(_a_8, 1, 2));
(_a_10 = ["abc", "def", "ghi"], _a_10.raw = ["abc", "def", "ghi"], (_a_11 = ["abc", "def", "ghi"], _a_11.raw = ["abc", "def", "ghi"], f(_a_11, 1, 2))["member"].someOtherTag(_a_10, 1, 2));
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _a_1, _a_2, _a_3, _a_4, _a_5, _a_6, _a_7, _a_8, _a_9, _a_10, _a_11;
