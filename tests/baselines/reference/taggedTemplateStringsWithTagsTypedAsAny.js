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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var f;
f(templateObject_193485963_1 || (templateObject_193485963_1 = __makeTemplateObject(["abc"], ["abc"])));
f(templateObject_6321411194_1 || (templateObject_6321411194_1 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.g.h(templateObject_193485963_2 || (templateObject_193485963_2 = __makeTemplateObject(["abc"], ["abc"])));
f.g.h(templateObject_6321411194_2 || (templateObject_6321411194_2 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(templateObject_193485963_3 || (templateObject_193485963_3 = __makeTemplateObject(["abc"], ["abc"]))).member;
f(templateObject_6321411194_3 || (templateObject_6321411194_3 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2).member;
f(templateObject_193485963_4 || (templateObject_193485963_4 = __makeTemplateObject(["abc"], ["abc"])))["member"];
f(templateObject_6321411194_4 || (templateObject_6321411194_4 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"];
f(templateObject_193485963_5 || (templateObject_193485963_5 = __makeTemplateObject(["abc"], ["abc"])))["member"].someOtherTag(templateObject_6321411194_5 || (templateObject_6321411194_5 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f(templateObject_6321411194_6 || (templateObject_6321411194_6 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2)["member"].someOtherTag(templateObject_6321411194_7 || (templateObject_6321411194_7 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc" + 1 + "def" + 2 + "ghi");
var templateObject_193485963_1, templateObject_6321411194_1, templateObject_193485963_2, templateObject_6321411194_2, templateObject_193485963_3, templateObject_6321411194_3, templateObject_193485963_4, templateObject_6321411194_4, templateObject_193485963_5, templateObject_6321411194_5, templateObject_6321411194_6, templateObject_6321411194_7;
