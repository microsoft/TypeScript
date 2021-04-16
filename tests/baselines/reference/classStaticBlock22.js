//// [classStaticBlock22.ts]
let await: "any";
class C {
  static {
    let await: any; // illegal, cannot declare a new binding for await
  }
  static {
    let { await } = {} as any; // illegal, cannot declare a new binding for await
  }
  static {
    let { await: other } = {} as any; // legal
  }
  static {
    let await; // illegal, cannot declare a new binding for await
  }
  static {
    await; // illegal
  }
  static {
    await(1); // illegal
  }
  static {
    function await() {}; // illegal
  }
  static {
    class await {}; // illegal
  }
  static {
    ({ await }); // illegal short-hand property reference
  }
  static {
    ({ [await]: 1 }); // illegal
  }
  static {
    class D {
        await = 1; // legal
        x = await; // legal (initializers have an implicit function boundary)
        [await] = 1; // illegal (computed property names are evaluated outside of a class body
      };
  }
  static {
    (function await() {}); // legal, 'await' in function expression name not bound inside of static block
  }
  static {
    (class await {}); // legal, 'await' in class expression name not bound inside of static block
  }
  static {
    (function () { return await; }); // legal, 'await' is inside of a new function boundary
  }
  static {
    (() => await); // legal, 'await' is inside of a new function boundary
  }
  static {
    await: // illegal, 'await' cannot be used as a label
        break await; // illegal, 'await' cannot be used as a label
  }
}

//// [classStaticBlock22.js]
let await;
class C {
    static {
        let await; // illegal, cannot declare a new binding for await
    }
    static {
        let { await } = {}; // illegal, cannot declare a new binding for await
    }
    static {
        let { await: other } = {}; // legal
    }
    static {
        let await; // illegal, cannot declare a new binding for await
    }
    static {
        await; // illegal
    }
    static {
        await(1); // illegal
    }
    static {
        function await() { }
        ; // illegal
    }
    static {
        class await {
        }
        ; // illegal
    }
    static {
        ({ await }); // illegal short-hand property reference
    }
    static {
        ({ [await]: 1 }); // illegal
    }
    static {
        class D {
            await = 1; // legal
            x = await; // legal (initializers have an implicit function boundary)
            [await] = 1; // illegal (computed property names are evaluated outside of a class body
        }
        ;
    }
    static {
        (function await() { }); // legal, 'await' in function expression name not bound inside of static block
    }
    static {
        (class await {
        }); // legal, 'await' in class expression name not bound inside of static block
    }
    static {
        (function () { return await; }); // legal, 'await' is inside of a new function boundary
    }
    static {
        (() => await); // legal, 'await' is inside of a new function boundary
    }
    static {
        await: // illegal, 'await' cannot be used as a label
         break await; // illegal, 'await' cannot be used as a label
    }
}
