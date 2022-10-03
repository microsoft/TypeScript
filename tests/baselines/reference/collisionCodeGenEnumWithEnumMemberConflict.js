//// [collisionCodeGenEnumWithEnumMemberConflict.ts]
enum Color {
    Color,
    Thing = Color
}

//// [collisionCodeGenEnumWithEnumMemberConflict.js]
var Color;
(function (Color) {
    Color[Color["Color"] = 0] = "Color";
    Color[Color["Thing"] = 0] = "Thing";
})(Color || (Color = {}));
