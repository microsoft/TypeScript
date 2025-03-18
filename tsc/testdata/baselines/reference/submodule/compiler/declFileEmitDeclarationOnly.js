//// [tests/cases/compiler/declFileEmitDeclarationOnly.ts] ////

//// [helloworld.ts]
const Log = {
  info(msg: string) {}
}

class HelloWorld {
  constructor(private name: string) {
  }

  public hello() {
    Log.info(`Hello ${this.name}`);
  }
}


//// [helloworld.js]
const Log = {
    info(msg) { }
};
class HelloWorld {
    name;
    constructor(name) {
        this.name = name;
    }
    hello() {
        Log.info(`Hello ${this.name}`);
    }
}
