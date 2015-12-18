interface Long {
    length: number;
}

class Cat implements Long {
    length = undefined;
}
const longCat = new Cat();
longCat.length = "wat";