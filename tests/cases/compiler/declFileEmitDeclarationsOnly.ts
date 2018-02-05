// @declaration: true
// @emitDeclarationOnly: true

// @filename: helloworld.ts
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
