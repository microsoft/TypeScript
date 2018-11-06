//// [literalTypeProperty.ts]
declare class C {
  foo: 10;
  bar: 10 | 11
}

var o = new C()
o.foo ++
o.foo += 1
o.foo -= 1
o.foo --
++o.foo
--o.foo

o.bar ++
o.bar += 1
o.bar -= 1
o.bar --
++o.bar
--o.bar

//// [literalTypeProperty.js]
var o = new C();
o.foo++;
o.foo += 1;
o.foo -= 1;
o.foo--;
++o.foo;
--o.foo;
o.bar++;
o.bar += 1;
o.bar -= 1;
o.bar--;
++o.bar;
--o.bar;
