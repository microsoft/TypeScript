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
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var f;
f(_a || (_a = __getTemplateObject(["abc"], ["abc"])));
f(_b || (_b = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.g.h(_c || (_c = __getTemplateObject(["abc"], ["abc"])));
f.g.h(_d || (_d = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_e || (_e = __getTemplateObject(["abc"], ["abc"]))).member;
f(_f || (_f = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2).member;
f(_g || (_g = __getTemplateObject(["abc"], ["abc"])))["member"];
f(_h || (_h = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"];
f(_j || (_j = __getTemplateObject(["abc"], ["abc"])))["member"].someOtherTag(_k || (_k = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(_l || (_l = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"].someOtherTag(_m || (_m = __getTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
