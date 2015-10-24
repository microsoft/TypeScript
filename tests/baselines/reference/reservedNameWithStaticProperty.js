//// [reservedNameWithStaticProperty.ts]
class Length {
	static length: string = "pizza";
}

class Caller {
	static caller: string = "potatos";
}

class Arguments {
	static arguments: string = "tomatoes"
}

class Name {
	static name: string = "name"
}

//// [reservedNameWithStaticProperty.js]
var Length = (function () {
    function Length() {
    }
    Length.length = "pizza";
    return Length;
})();
var Caller = (function () {
    function Caller() {
    }
    Caller.caller = "potatos";
    return Caller;
})();
var Arguments = (function () {
    function Arguments() {
    }
    Arguments.arguments = "tomatoes";
    return Arguments;
})();
var Name = (function () {
    function Name() {
    }
    Name.name = "name";
    return Name;
})();
