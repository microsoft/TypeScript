function foo(x: { id: number; name?: string; }): void;
foo({ id: 1234 });                 // Ok
foo({ id: 1234, name: "hello" });  // Ok
foo({ id: 1234, name: false });    // Error, name of wrong type
foo({ name: "hello" });            // Error, id required but missing