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
(_b = ["abc", "def", "ghi"], _b.raw = ["abc", "def", "ghi"], f(_b, 1, 2));
(_c = ["abc"], _c.raw = ["abc"], f.g.h(_c));
(_d = ["abc", "def", "ghi"], _d.raw = ["abc", "def", "ghi"], f.g.h(_d, 1, 2));
(_e = ["abc"], _e.raw = ["abc"], f(_e)).member;
(_f = ["abc", "def", "ghi"], _f.raw = ["abc", "def", "ghi"], f(_f, 1, 2)).member;
(_g = ["abc"], _g.raw = ["abc"], f(_g))["member"];
(_h = ["abc", "def", "ghi"], _h.raw = ["abc", "def", "ghi"], f(_h, 1, 2))["member"];
(_j = ["abc", "def", "ghi"], _j.raw = ["abc", "def", "ghi"], (_k = ["abc"], _k.raw = ["abc"], f(_k))["member"].someOtherTag(_j, 1, 2));
(_l = ["abc", "def", "ghi"], _l.raw = ["abc", "def", "ghi"], (_m = ["abc", "def", "ghi"], _m.raw = ["abc", "def", "ghi"], f(_m, 1, 2))["member"].someOtherTag(_l, 1, 2));
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _b, _c, _d, _e, _f, _g, _h, _k, _j, _m, _l;
