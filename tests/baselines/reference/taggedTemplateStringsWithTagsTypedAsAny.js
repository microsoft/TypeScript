//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTagsTypedAsAny.ts] ////

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
f(__makeTemplateObject(["abc"], ["abc"]));
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f.g.h(__makeTemplateObject(["abc"], ["abc"]));
f.g.h(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f(__makeTemplateObject(["abc"], ["abc"])).member;
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2).member;
f(__makeTemplateObject(["abc"], ["abc"]))["member"];
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2)["member"];
f(__makeTemplateObject(["abc"], ["abc"]))["member"].someOtherTag(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2)["member"].someOtherTag(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 1, 2);
f.thisIsNotATag("abc");
f.thisIsNotATag("abc".concat(1, "def").concat(2, "ghi"));
