class C {
    foo() { }
}
 
class D extends C {
    x = super(); 
 
    constructor() {
        super();
 
        var y = () => {
            super(); 
        }

        var y2 = function() {
            super();
        }
    }
}
 
var d = new D();
