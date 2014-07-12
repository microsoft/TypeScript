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