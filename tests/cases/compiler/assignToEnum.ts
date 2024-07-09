enum A { foo, bar }
A = undefined;  // invalid LHS
A = A.bar;      // invalid LHS
A.foo = 1;      // invalid LHS
A.foo = A.bar;  // invalid LHS

