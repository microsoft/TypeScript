//// [collisionCodeGenEnumWithEnumMemberConflict.ts]
enum Color {
    Color,
    Thing = Color
}

//// [collisionCodeGenEnumWithEnumMemberConflict.js]
var Color;
(function (Color) {
    Color[Color["Color"] = 0] = "Color";
    Color["Thing"] = Color.Color;
})(Color || (Color = {}));
