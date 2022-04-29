// They should have to be the same even when one of the types is 'any'
var x: any;
var x = 2; //error

var y = "";
var y; //error

module N {
    var x: any;
    var x = 2; //error

    var y = "";
    var y; //error
}

var z: any;
var z; // ok