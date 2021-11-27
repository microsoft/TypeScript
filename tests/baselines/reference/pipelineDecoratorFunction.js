//// [pipelineDecoratorFunction.ts]
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


//// [pipelineDecoratorFunction.js]
function greets(person) {
    person.greet = function () { return "".concat(person.name, " says hi!"); };
    return person;
}
function ages(age) {
    return function (person) {
        person.age = age;
        person.birthday = function () { person.age += 1; };
        return person;
    };
}
function programs(favLang) {
    return function (person) {
        person.favLang = favLang;
        person.program = function () { return "".concat(person.name, " starts to write ").concat(person.favLang, "!"); };
        return person;
    };
}
function Person(name, age) {
    var pipelineHackPlaceholder_1, pipelineHackPlaceholder_2;
    return (pipelineHackPlaceholder_1 = (pipelineHackPlaceholder_2 = { name: name }, greets(pipelineHackPlaceholder_2)), ages(age)(pipelineHackPlaceholder_1));
}
function Programmer(name, age) {
    var pipelineHackPlaceholder_3, pipelineHackPlaceholder_4, pipelineHackPlaceholder_5;
    return (pipelineHackPlaceholder_3 = (pipelineHackPlaceholder_4 = (pipelineHackPlaceholder_5 = { name: name }, greets(pipelineHackPlaceholder_5)), ages(age)), programs('javascript')(pipelineHackPlaceholder_3));
}
