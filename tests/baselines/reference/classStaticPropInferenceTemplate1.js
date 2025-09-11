//// [tests/cases/conformance/classes/classStaticBlock/classStaticPropInferenceTemplate1.ts] ////

//// [classStaticPropInferenceTemplate1.ts]
class MyClass {
  static property;
  static property2;

  static {
    const variable = "something";

    this.property = `foo`;
    this.property2 = `foo-${variable}`;

    const localProperty = `foo-${variable}`;
  }
}

class MyClass2 {
  static accessor property;
  static accessor property2;

  static {
    const variable = "something";

    this.property = `foo`;
    this.property2 = `foo-${variable}`;

    const localProperty = `foo-${variable}`;
  }
}

class MyClass3 {
  static property;
  static property2;

  static {
    (() => {
      const variable = "something";

      this.property = `foo`;
      this.property2 = `foo-${variable}`;

      const localProperty = `foo-${variable}`;
    })();
  }
}

class MyClass4 {
  static accessor property;
  static accessor property2;

  static {
    (() => {
      const variable = "something";

      this.property = `foo`;
      this.property2 = `foo-${variable}`;

      const localProperty = `foo-${variable}`;
    })();
  }
}


//// [classStaticPropInferenceTemplate1.js]
"use strict";
class MyClass {
    static property;
    static property2;
    static {
        const variable = "something";
        this.property = `foo`;
        this.property2 = `foo-${variable}`;
        const localProperty = `foo-${variable}`;
    }
}
class MyClass2 {
    static accessor property;
    static accessor property2;
    static {
        const variable = "something";
        this.property = `foo`;
        this.property2 = `foo-${variable}`;
        const localProperty = `foo-${variable}`;
    }
}
class MyClass3 {
    static property;
    static property2;
    static {
        (() => {
            const variable = "something";
            this.property = `foo`;
            this.property2 = `foo-${variable}`;
            const localProperty = `foo-${variable}`;
        })();
    }
}
class MyClass4 {
    static accessor property;
    static accessor property2;
    static {
        (() => {
            const variable = "something";
            this.property = `foo`;
            this.property2 = `foo-${variable}`;
            const localProperty = `foo-${variable}`;
        })();
    }
}
