var n1: () => boolean = function () { }; // expect an error here
var n2: () => boolean = function ():boolean { }; // expect an error here
