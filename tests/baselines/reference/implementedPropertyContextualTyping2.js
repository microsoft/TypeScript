//// [implementedPropertyContextualTyping2.ts]
interface Long {
    length: number;
}

class Cat implements Long {
    length = undefined;
}
const longCat = new Cat();
longCat.length = "wat";

//// [implementedPropertyContextualTyping2.js]
var Cat = (function () {
    function Cat() {
        this.length = undefined;
    }
    return Cat;
}());
var longCat = new Cat();
longCat.length = "wat";
