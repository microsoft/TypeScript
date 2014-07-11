//// [commentsEnums.ts]

/** Enum of colors*/
enum Colors {
    /** Fancy name for 'blue'*/
    Cornflower /* blue */,
    /** Fancy name for 'pink'*/
    FancyPink
}
var x = Colors.Cornflower;
x = Colors.FancyPink;



//// [commentsEnums.js]
var Colors;
(function (Colors) {
    Colors[Colors["Cornflower"] = 0] = "Cornflower";
    Colors[Colors["FancyPink"] = 1] = "FancyPink";
})(Colors || (Colors = {}));
var x = 0 /* Cornflower */;
x = 1 /* FancyPink */;


//// [commentsEnums.d.ts]
declare enum Colors {
    Cornflower = 0,
    FancyPink = 1,
}
declare var x: Colors;
