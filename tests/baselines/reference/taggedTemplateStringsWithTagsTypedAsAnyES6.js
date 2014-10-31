//// [taggedTemplateStringsWithTagsTypedAsAnyES6.ts]
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

//// [taggedTemplateStringsWithTagsTypedAsAnyES6.js]
var f;
f `abc`;
f `abc${1}def${2}ghi`;
f.g.h `abc`;
f.g.h `abc${1}def${2}ghi`;
f `abc`.member;
f `abc${1}def${2}ghi`.member;
f `abc`["member"];
f `abc${1}def${2}ghi`["member"];
f `abc`["member"].someOtherTag `abc${1}def${2}ghi`;
f `abc${1}def${2}ghi`["member"].someOtherTag `abc${1}def${2}ghi`;
f.thisIsNotATag(`abc`);
f.thisIsNotATag(`abc${1}def${2}ghi`);
