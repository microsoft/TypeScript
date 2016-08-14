interface Interface {

}

class Class {

}

type typeAliasForClass = Class;
type typeAliasForNumber = number;
type objectType = { x: number };

function func(a: number) {

}

let one = Interface;
let two = typeAliasForClass;
let three = typeAliasForNumber;
let four = objectType;
func(typeAliasForNumber);