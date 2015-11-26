// doc 8
// Only a subtype struct can be assigned to a supertype struct.

struct Animal {
	feet: number;
	constructor(name: string, numFeet: number) { }
}

struct Size {
	feet: number;
	constructor(numFeet: number) { }
}

var a: Animal;
var s: Size;

a = s;  //error
s = a;  //error

