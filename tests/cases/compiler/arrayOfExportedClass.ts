// @module: commonjs
// @Filename: arrayOfExportedClass_0.ts
class Car {
    foo: string;
}

export = Car;

// @Filename: arrayOfExportedClass_1.ts
///<reference path='arrayOfExportedClass_0.ts'/>
import Car = require('./arrayOfExportedClass_0');

class Road {

    public cars: Car[];

    public AddCars(cars: Car[]) {

        this.cars = cars;
    }
}

export = Road;
