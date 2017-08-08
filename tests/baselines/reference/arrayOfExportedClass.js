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
var Car = (function () {
    function Car() {
    }
    return Car;
}());
module.exports = Car;
//// [arrayOfExportedClass_1.js]
"use strict";
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Road = (function () {
    function Road() {
    }
    Road.prototype.AddCars = function (cars) {
        this.cars = cars;
    };
    __names(Road.prototype, ["AddCars"]);
    return Road;
}());
module.exports = Road;
