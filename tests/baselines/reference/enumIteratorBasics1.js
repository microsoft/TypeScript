//// [enumIteratorBasics1.ts]
enum Test {
  Foo,
  Bar,
  Baz,
}

const AlsoTest = Test;

for (const member of AlsoTest) {
  const x: string = member[0];
  const y: Test = member[1];
  console.log(x, y);
}

const members: [string, Test][] = [...AlsoTest];
console.log(members);


//// [enumIteratorBasics1.js]
var Test;
(function (Test) {
    Test[Test["Foo"] = 0] = "Foo";
    Test[Test["Bar"] = 1] = "Bar";
    Test[Test["Baz"] = 2] = "Baz";
    Test[Symbol.iterator] = function* () { yield* [["Foo", 0], ["Bar", 1], ["Baz", 2]]; };
})(Test || (Test = {}));
const AlsoTest = Test;
for (const member of AlsoTest) {
    const x = member[0];
    const y = member[1];
    console.log(x, y);
}
const members = [...AlsoTest];
console.log(members);
