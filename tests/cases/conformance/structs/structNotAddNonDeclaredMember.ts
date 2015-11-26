struct C {
	constructor(public firstName: string, public age: number) {}
}

var c = new C("John", 25);
c.lastName = c.firstName; // error, cannot add undefined members to struct