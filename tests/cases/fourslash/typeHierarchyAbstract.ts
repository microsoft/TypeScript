/// <reference path='fourslash.ts'/>

// Test type hierarchy with abstract classes and methods

// @Filename: /abstractClasses.ts
////// Pure abstract class (no implementation)
////abstract class /*shape*/Shape {
////    abstract area(): number;
////    abstract perimeter(): number;
////}
////
////// Abstract class with some implementation
////abstract class /*namedShape*/NamedShape extends Shape {
////    constructor(public name: string) {
////        super();
////    }
////    
////    describe(): string {
////        return `${this.name}: area=${this.area()}, perimeter=${this.perimeter()}`;
////    }
////}
////
////// Concrete implementations
////class /*rectangle*/Rectangle extends NamedShape {
////    constructor(name: string, public width: number, public height: number) {
////        super(name);
////    }
////    
////    area(): number {
////        return this.width * this.height;
////    }
////    
////    perimeter(): number {
////        return 2 * (this.width + this.height);
////    }
////}
////
////class /*circle*/Circle extends NamedShape {
////    constructor(name: string, public radius: number) {
////        super(name);
////    }
////    
////    area(): number {
////        return Math.PI * this.radius ** 2;
////    }
////    
////    perimeter(): number {
////        return 2 * Math.PI * this.radius;
////    }
////}
////
////class Square extends Rectangle {
////    constructor(name: string, side: number) {
////        super(name, side, side);
////    }
////}
////
////// Multiple levels of abstract
////abstract class /*vehicle*/Vehicle {
////    abstract move(): void;
////}
////
////abstract class /*motorVehicle*/MotorVehicle extends Vehicle {
////    abstract startEngine(): void;
////    abstract stopEngine(): void;
////}
////
////abstract class /*car*/Car extends MotorVehicle {
////    abstract openDoor(): void;
////    
////    move(): void {
////        this.startEngine();
////        console.log("Moving...");
////    }
////}
////
////class /*sedan*/Sedan extends Car {
////    startEngine(): void { console.log("Starting sedan engine"); }
////    stopEngine(): void { console.log("Stopping sedan engine"); }
////    openDoor(): void { console.log("Opening sedan door"); }
////}
////
////class SUV extends Car {
////    startEngine(): void { console.log("Starting SUV engine"); }
////    stopEngine(): void { console.log("Stopping SUV engine"); }
////    openDoor(): void { console.log("Opening SUV door"); }
////}
////
////// Abstract class implementing interface
////interface /*drivable*/Drivable {
////    drive(distance: number): void;
////    stop(): void;
////}
////
////abstract class /*abstractDriving*/AbstractDriving implements Drivable {
////    abstract drive(distance: number): void;
////    
////    stop(): void {
////        console.log("Stopping");
////    }
////}
////
////class Truck extends AbstractDriving {
////    drive(distance: number): void {
////        console.log(`Driving truck ${distance} miles`);
////    }
////}

// Test 1: Pure abstract class
goTo.marker("shape");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Abstract class extending abstract class
goTo.marker("namedShape");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Concrete implementation
goTo.marker("rectangle");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Another concrete implementation
goTo.marker("circle");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Top of abstract chain
goTo.marker("vehicle");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Middle abstract class
goTo.marker("motorVehicle");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Abstract class with partial implementation
goTo.marker("car");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Fully concrete class
goTo.marker("sedan");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Interface for abstract class
goTo.marker("drivable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Abstract class implementing interface
goTo.marker("abstractDriving");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
