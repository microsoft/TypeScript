//// [typeInfer1.ts]
interface ITextWriter2 {
    Write(s:string):void;
    WriteLine(s:string):void;
}

var x: ITextWriter2 = {
    Write: function (s:string):void {},
    WriteLine: function(s:string):void {}
}

var yyyyyyyy: ITextWriter2 = {
    Moo: function() { return "cow"; }
}

//// [typeInfer1.js]
var x = {
    Write: function (s) { },
    WriteLine: function (s) { }
};
var yyyyyyyy = {
    Moo: function () { return "cow"; }
};
