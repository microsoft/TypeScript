//// [file.tsx]
declare module JSX {
	interface Element { }
	interface ElementTypeProperty { returnType; }
}

interface CustomType { }

class Obj1 {
	returnType: CustomType;
}
const obj = <Obj1 param="123"/>; // OK

const objSelfClosing = <Obj1/>; // OK

const Func = () => <Obj1/>;

const objFromFactory = <Func/>; // OK

//// [file.jsx]
var Obj1 = (function () {
    function Obj1() {
    }
    return Obj1;
}());
var obj = <Obj1 param="123"/>; // OK
var objSelfClosing = <Obj1 />; // OK
var Func = function () { return <Obj1 />; };
var objFromFactory = <Func />; // OK
