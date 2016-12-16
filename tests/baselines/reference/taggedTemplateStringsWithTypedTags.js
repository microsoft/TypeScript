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
var f;
(_a = ["abc"], _a.raw = ["abc"], f(_a));
(_b = ["abc", "def", "ghi"], _b.raw = ["abc", "def", "ghi"], f(_b, 1, 2));
(_c = ["abc"], _c.raw = ["abc"], f(_c)).member;
(_d = ["abc", "def", "ghi"], _d.raw = ["abc", "def", "ghi"], f(_d, 1, 2)).member;
(_e = ["abc"], _e.raw = ["abc"], f(_e))["member"];
(_f = ["abc", "def", "ghi"], _f.raw = ["abc", "def", "ghi"], f(_f, 1, 2))["member"];
(_g = ["abc", "def", "ghi"], _g.raw = ["abc", "def", "ghi"], (_h = ["abc"], _h.raw = ["abc"], f(_h))[0].member(_g, 1, 2));
(_j = ["abc", "def", "ghi"], _j.raw = ["abc", "def", "ghi"], (_k = ["abc", "def", "ghi"], _k.raw = ["abc", "def", "ghi"], f(_k, 1, 2))["member"].member(_j, 1, 2));
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _b, _c, _d, _e, _f, _h, _g, _k, _j;
