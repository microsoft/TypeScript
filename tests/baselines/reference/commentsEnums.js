//// [commentsEnums.ts]
/** Enum of colors*/
enum Colors {
    /** Fancy name for 'blue'*/
    Cornflower /* blue */,
    /** Fancy name for 'pink'*/
    FancyPink
} // trailing comment
var x = Colors.Cornflower;
x = Colors.FancyPink;



//// [commentsEnums.js]
/** Enum of colors*/
var Colors;
(function (Colors) {
    /** Fancy name for 'blue'*/
    Colors[Colors["Cornflower"] = 0] = "Cornflower"; /* blue */
    /** Fancy name for 'pink'*/
    Colors[Colors["FancyPink"] = 1] = "FancyPink";
})(Colors || (Colors = {})); // trailing comment
var x = Colors.Cornflower;
x = Colors.FancyPink;


//// [commentsEnums.d.ts]
/** Enum of colors*/
declare enum Colors {
    /** Fancy name for 'blue'*/
    Cornflower = 0,
    /** Fancy name for 'pink'*/
    FancyPink = 1
}
declare var x: Colors;
