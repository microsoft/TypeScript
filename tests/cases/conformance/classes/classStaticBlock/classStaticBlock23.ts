// @target: esnext

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