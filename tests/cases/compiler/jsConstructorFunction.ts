// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
// @lib: es5, dom
var Person = function (firstNameOrPojo, lastName) {

    if (typeof firstNameOrPojo === "string") {
        this.firstName = firstNameOrPojo;
        this.lastName = lastName;
    } else {
        return new Person(firstNameOrPojo.firstName, firstNameOrPojo.lastName);
    }
};

Person.prototype.greet = function greet() {
    return `Hello, I am ${this.firstName} ${this.lastName}.`;
};

var fred = new Person({ firstName: "Fred", lastName: "Flintstone" });

console.log(fred.greet());