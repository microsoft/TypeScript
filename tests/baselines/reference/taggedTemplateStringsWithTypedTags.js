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
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var f;
f(_a || (_a = __makeTemplateObject(["abc"], ["abc"])));
f(_b || (_b = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_c || (_c = __makeTemplateObject(["abc"], ["abc"]))).member;
f(_d || (_d = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2).member;
f(_e || (_e = __makeTemplateObject(["abc"], ["abc"])))["member"];
f(_f || (_f = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"];
f(_g || (_g = __makeTemplateObject(["abc"], ["abc"])))[0].member(_h || (_h = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_j || (_j = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"].member(_k || (_k = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
