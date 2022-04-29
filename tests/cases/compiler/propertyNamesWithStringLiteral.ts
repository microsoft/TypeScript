class _Color {
    a: number; r: number; g: number; b: number;
}

interface NamedColors {
    azure: _Color;
    "blue": _Color;
    "pale blue": _Color;
}
module Color {
    export var namedColors: NamedColors;
}
var a = Color.namedColors["azure"];
var a = Color.namedColors.blue; // Should not error
var a = Color.namedColors["pale blue"]; // should not error
