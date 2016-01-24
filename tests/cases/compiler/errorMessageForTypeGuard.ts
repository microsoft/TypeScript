interface Animal {
    animal;
}

interface Dog extends Animal {
    dog;
}

interface Car {
    car;
}

let thing: Dog | Car;

// error code 2322.
function isAnimal(x: Car | Dog): x is Animal {
    return "animal" in x;
}