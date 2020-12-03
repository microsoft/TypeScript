// Valid cases

let { foo, foo: bar } = { foo: 1 };
({ foo, foo } = { foo: 2 });
({ foo, foo: bar } = { foo: 3 });
({ foo: bar, foo } = { foo: 4 });
({ foo, bar: foo } = { foo: 3, bar: 33 });
({ bar: foo, foo } = { foo: 4, bar: 44 });
({ foo: bar, foo: bar } = { foo: 5 });
({ foo: bar, bar: foo } = { foo: 6, bar: 66 });
({ foo: bar, foo: bar } = { foo: 7 });

[foo, foo] = [111, 1111];
[foo, foo] = [222, 2222];
[bar, foo, foo] = [333, 3333, 33333];
[foo, bar, foo] = [333, 3333, 33333];
[foo, foo, bar] = [444, 4444, 44444];

// Error cases

let { foo1, foo1 } = { foo1: 10 };
let { foo2, bar2: foo2 } = { foo2: 20, bar2: 220 };
let { bar3: foo3, foo3 } = { foo3: 30, bar3: 330 };
const { foo4, foo4 } = { foo4: 40 };
const { foo5, bar5: foo5 } = { foo5: 50, bar5: 550 };
const { bar6: foo6, foo6 } = { foo6: 60, bar6: 660 };

let [blah1, blah1] = [111, 222];
const [blah2, blah2] = [333, 444];
