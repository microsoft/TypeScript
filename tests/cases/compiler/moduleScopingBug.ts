namespace M

{

    var outer: number;

    function f() {

        var inner = outer;   // Ok

    }

    class C {

        constructor() {
            var inner = outer;   // Ok
        }

    }

    namespace X {

        var inner = outer;   // Error: outer not visible

    }

}

