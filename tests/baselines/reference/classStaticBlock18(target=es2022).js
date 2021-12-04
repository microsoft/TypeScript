//// [classStaticBlock18.ts]
function foo () {
  return class {
    static foo = 1;
    static {
      const c = class {
        static bar = 2;
        static {
          // do
        }
      }
    }
  }
}


//// [classStaticBlock18.js]
function foo() {
    return class {
        static foo = 1;
        static {
            const c = class {
                static bar = 2;
                static {
                    // do
                }
            };
        }
    };
}
