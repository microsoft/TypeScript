//// [interfaceAssignmentCompat.js]
var M;
(function (M) {
    (function (Color) {
        Color[Color["Green"] = 0] = "Green";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Brown"] = 2] = "Brown";
    })(M.Color || (M.Color = {}));
    var Color = M.Color;

    function CompareEyes(a, b) {
        return a.color - b.color;
    }
    M.CompareEyes = CompareEyes;

    function CompareYeux(a, b) {
        return a.coleur - b.coleur;
    }
    M.CompareYeux = CompareYeux;

    function test() {
        var x = [];
        var result = "";

        x[0] = { color: 2 /* Brown */ };
        x[1] = { color: 1 /* Blue */ };
        x[2] = { color: 0 /* Green */ };

        x = x.sort(CompareYeux); // parameter mismatch

        // type of z inferred from specialized array type
        var z = x.sort(CompareEyes);

        for (var i = 0, len = z.length; i < len; i++) {
            result += ((Color._map[z[i].color]) + "\r\n");
        }

        var eeks = [];
        for (var j = z.length = 1; j >= 0; j--) {
            eeks[j] = z[j]; // nope: element assignment
        }
        eeks = z; // nope: array assignment
        return result;
    }
    M.test = test;
})(M || (M = {}));

M.test();
