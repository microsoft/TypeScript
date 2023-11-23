// @declaration: true
// @emitDeclarationOnly: true
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

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
