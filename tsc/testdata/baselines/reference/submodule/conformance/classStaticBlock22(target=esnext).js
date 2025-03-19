//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock22.ts] ////

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
    function await() { }; // illegal
  }
  static {
    class await { }; // illegal
  }

  static {
    class D {
      await = 1; // legal
      x = await; // legal (initializers have an implicit function boundary)
    };
  }
  static {
    (function await() { }); // legal, 'await' in function expression name not bound inside of static block
  }
  static {
    (class await { }); // legal, 'await' in class expression name not bound inside of static block
  }
  static {
    (function () { return await; }); // legal, 'await' is inside of a new function boundary
  }
  static {
    (() => await); // legal, 'await' is inside of a new function boundary
  }

  static {
    class E {
      constructor() { await; }
      method() { await; }
      get accessor() {
        await;
        return 1;
      }
      set accessor(v: any) {
        await;
      }
      propLambda = () => { await; }
      propFunc = function () { await; }
    }
  }
  static {
    class S {
      static method() { await; }
      static get accessor() {
        await;
        return 1;
      }
      static set accessor(v: any) {
        await;
      }
      static propLambda = () => { await; }
      static propFunc = function () { await; }
    }
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
        function await() { }
        ; // illegal
    }
    static {
        class await {
        }
        ; // illegal
    }
    static {
        class D {
            await = 1; // legal
            x = await; // legal (initializers have an implicit function boundary)
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
        class E {
            constructor() { await; }
            method() { await; }
            get accessor() {
                await;
                return 1;
            }
            set accessor(v) {
                await;
            }
            propLambda = () => { await; };
            propFunc = function () { await; };
        }
    }
    static {
        class S {
            static method() { await; }
            static get accessor() {
                await;
                return 1;
            }
            static set accessor(v) {
                await;
            }
            static propLambda = () => { await; };
            static propFunc = function () { await; };
        }
    }
}
