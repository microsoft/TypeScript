//// [file.tsx]
declare module JSX {
	interface Element { }
	interface ElementTypeProperty { returnType; otherProperty; }
}

class Obj1 {
}

const obj = <Obj1 param="123"/>; // OK


//// [file.jsx]
var Obj1 = (function () {
    function Obj1() {
    }
    return Obj1;
}());
var obj = <Obj1 param="123"/>; // OK
