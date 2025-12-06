//// [tests/cases/conformance/classes/members/accessibility/protectedAccessViaExplicitThisParameter.ts] ////

//// [protectedAccessViaExplicitThisParameter.ts]
// Accessing base class protected methods via explicit 'this' parameter
// Should compile when 'this' type is a derived class

class Base {
  protected baseMethod() {
    return "Base.baseMethod";
  }
}

class Derived extends Base {
  protected override baseMethod() {
    return "Derived.baseMethod";
  }

  // Test case 1: Static block with explicit 'this' parameter
  static {
    this.prototype.baseMethod = function(this: Derived) {
      Base.prototype.baseMethod.call(this); // OK: explicit this: Derived
      return "override";
    }
  }

  // Test case 2: Regular method with explicit 'this' parameter
  testExplicitThis() {
    const fn = function(this: Derived) {
      Base.prototype.baseMethod.call(this); // OK: explicit this: Derived
    };
    fn.call(this);
  }

  // Test case 3: Should still error with wrong explicit 'this' type
  testWrongExplicitThis() {
    const fn = function(this: Base) {
      Base.prototype.baseMethod.call(this); // Error: this: Base, not compatible
    };
  }
}

// Test case 4: Should error without derived relationship
class Unrelated {
  testUnrelated() {
    const fn = function(this: Unrelated) {
      Base.prototype.baseMethod.call(this); // Error: Unrelated not related to Base
    };
  }
}

// Test case 5: Should still error for external access
const instance = new Derived();
instance.baseMethod(); // Error: external access to protected member


//// [protectedAccessViaExplicitThisParameter.js]
"use strict";
// Accessing base class protected methods via explicit 'this' parameter
// Should compile when 'this' type is a derived class
class Base {
    baseMethod() {
        return "Base.baseMethod";
    }
}
class Derived extends Base {
    baseMethod() {
        return "Derived.baseMethod";
    }
    // Test case 1: Static block with explicit 'this' parameter
    static {
        this.prototype.baseMethod = function () {
            Base.prototype.baseMethod.call(this); // OK: explicit this: Derived
            return "override";
        };
    }
    // Test case 2: Regular method with explicit 'this' parameter
    testExplicitThis() {
        const fn = function () {
            Base.prototype.baseMethod.call(this); // OK: explicit this: Derived
        };
        fn.call(this);
    }
    // Test case 3: Should still error with wrong explicit 'this' type
    testWrongExplicitThis() {
        const fn = function () {
            Base.prototype.baseMethod.call(this); // Error: this: Base, not compatible
        };
    }
}
// Test case 4: Should error without derived relationship
class Unrelated {
    testUnrelated() {
        const fn = function () {
            Base.prototype.baseMethod.call(this); // Error: Unrelated not related to Base
        };
    }
}
// Test case 5: Should still error for external access
const instance = new Derived();
instance.baseMethod(); // Error: external access to protected member
