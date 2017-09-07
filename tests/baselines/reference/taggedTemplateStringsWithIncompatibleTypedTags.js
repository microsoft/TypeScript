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
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.freeze && Object.defineProperty) {
        return Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    cooked.raw = raw;
    return cooked;
};
var f;
f(_a || (_a = __getTemplateObject(["abc"], ["abc"])));
f(_b || (_b = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_c || (_c = __getTemplateObject(["abc"], ["abc"]))).member;
f(_d || (_d = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2).member;
f(_e || (_e = __getTemplateObject(["abc"], ["abc"])))["member"];
f(_f || (_f = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"];
f(_g || (_g = __getTemplateObject(["abc"], ["abc"])))[0].member(_h || (_h = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_j || (_j = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"].member(_k || (_k = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_l || (_l = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), true, true)["member"].member(_m || (_m = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
