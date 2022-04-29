//// [tests/cases/compiler/arrayOfExportedClass.ts] ////

//// [arrayOfExportedClass_0.ts]
class Car {
    foo: string;
}

export = Car;

//// [arrayOfExportedClass_1.ts]
///<reference path='arrayOfExportedClass_0.ts'/>
import Car = require('./arrayOfExportedClass_0');

class Road {

    public cars: Car[];

    public AddCars(cars: Car[]) {

        this.cars = cars;
    }
}

export = Road;


//// [arrayOfExportedClass_0.js]
"use strict";
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());
module.exports = Car;
//// [arrayOfExportedClass_1.js]
"use strict";
var Road = /** @class */ (function () {
    function Road() {
    }
    Road.prototype.AddCars = function (cars) {
        this.cars = cars;
    };
    return Road;
}());
module.exports = Road;
