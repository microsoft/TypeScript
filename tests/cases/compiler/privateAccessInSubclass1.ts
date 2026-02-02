// @target: es2015
class Base {
  private options: any;
}

class D extends Base {
  myMethod() {
    this.options;
  }
}