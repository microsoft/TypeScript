//// [implementedPropertyContextualTyping2.ts]
interface Long {
    length: number;
}
interface Lol {
    canhaz: string;
}
interface Ceiling {
    location: { [coordinates: string]: [number, number] };
}
interface Invisible {
    invisibles: string[];
}
class Cat implements Long, Lol, Ceiling, Invisible {
    length = undefined;
    canhaz = null;
    location = {};
    invisibles = [];
}
const lolCat = new Cat();
lolCat.length = "wat";
lolCat.canhaz = false;
lolCat.location['ceiling'] = -1;
lolCat.invisibles.push(0);


//// [implementedPropertyContextualTyping2.js]
var Cat = (function () {
    function Cat() {
        this.length = undefined;
        this.canhaz = null;
        this.location = {};
        this.invisibles = [];
    }
    return Cat;
}());
var lolCat = new Cat();
lolCat.length = "wat";
lolCat.canhaz = false;
lolCat.location['ceiling'] = -1;
lolCat.invisibles.push(0);
