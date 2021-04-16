function greets (person) {
	person.greet = () => `${person.name} says hi!`;
	return person;
}
function ages (age) {
	return function (person) {
		person.age = age;
		person.birthday = function () { person.age += 1; };
		return person;
	}
}
function programs (favLang) {
	return function (person) {
		person.favLang = favLang;
		person.program = () => `${person.name} starts to write ${person.favLang}!`;
		return person;
	}
}

function Person (name, age) {
	return { name: name } |> greets(#) |> ages(age)(#);
}
function Programmer (name, age) {
	return { name: name }
		|> greets(#)
		|> ages(age)
		|> programs('javascript')(#);
}
