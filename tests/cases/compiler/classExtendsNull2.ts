// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55499

interface Base {}

class C extends null {
  constructor() {
    super();
  }
}
interface C extends Base {}
