/// <reference path='fourslash.ts' />

//// class Food {
////     private amount: number;
////     constructor(public name: string) {
////         this.amount = 100;
////     }
////     public eat(amountToEat: number): boolean {
////         this.amount -= amountToEat;
////         if (this.amount <= 0) {
////             this.amount = 0;
////             return false;
////         }
////         else {
////             return true;
////         }
////     }
//// }
//// class IceCream extends Food {
////     private isDairyFree: boolean;
////     constructor(public flavor: string) {
////         super("Ice Cream");
////     }
//// }
//// class Cookie extends Food {
////     constructor(public flavor: string, public isGlutenFree: boolean) {
////         super("Cookie");
////     }
//// }
//// class Slug {
////     // This is NOT a food!!!
//// }
//// class GenericMonster<T extends Food, V> {
////     private name: string;
////     private age: number;
////     private isFriendly: boolean;
////     constructor(name: string, age: number, isFriendly: boolean, private food: T, public variant: V) {
////         this.name = name;
////         this.age = age;
////         this.isFriendly = isFriendly;
////     }
////     public getFood(): T {
////         return this.food;
////     }
////     public getVariant(): V {
////         return this.variant;
////     }
////     public eatFood(amountToEat: number): boolean {
////         return this.food.eat(amountToEat);
////     }
////     public sayGreeting(): string {
////         return ("My name is " + this.name + ", and my age is " + this.age + ".  I enjoy eating " + this.food.name + " and my variant is " + this.variant);
////     }
//// }
//// class GenericPlanet<T extends GenericMonster</*2*/Cookie, any>> {
////     constructor(public name: string, public solarSystem: string, public species: T) { }
//// }
//// var cookie = new Cookie("Chocolate Chip", false);
//// var cookieMonster = new GenericMonster<Cookie, string>("Cookie Monster", 50, true, cookie, "hello");
//// var sesameStreet = new GenericPlanet<GenericMonster<Cookie, string>>("Sesame Street", "Alpha Centuri", cookieMonster);
//// class GenericPlanet2<T extends Food, V>{
////     constructor(public name: string, public solarSystem: string, public species: GenericMonster<T, V>) { }
//// }
////  /*1*/

verify.noErrors();
goTo.marker('1');
edit.insertLine('');
edit.insertLine('');
verify.noErrors();
goTo.marker('2');
edit.deleteAtCaret("Cookie".length);
edit.insert("any");
verify.noErrors();
edit.insertLine('var narnia = new GenericPlanet2<Cookie, string>('); // shouldn't crash at this point