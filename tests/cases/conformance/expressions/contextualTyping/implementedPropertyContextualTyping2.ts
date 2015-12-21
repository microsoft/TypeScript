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
