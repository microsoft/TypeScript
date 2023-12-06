//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock23.ts] ////

//// [classStaticBlock23.ts]
const nums = [1, 2, 3].map(n => Promise.resolve(n))

class C {
  static {
    for await (const nn of nums) {
        console.log(nn)
    }
  }
}

async function foo () {
  class C {
    static {
      for await (const nn of nums) {
          console.log(nn)
      }
    }
  }
}


//// [classStaticBlock23.js]
const nums = [1, 2, 3].map(n => Promise.resolve(n));
class C {
    static {
        for await (const nn of nums) {
            console.log(nn);
        }
    }
}
async function foo() {
    class C {
        static {
            for await (const nn of nums) {
                console.log(nn);
            }
        }
    }
}
