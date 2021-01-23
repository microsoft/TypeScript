// @target: ES6
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
