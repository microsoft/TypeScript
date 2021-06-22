//// [argumentsUsedInClassFieldInitializerOrStaticInitializationBlock.ts]
function A() {
  return class T {
     a = arguments
  }
}

function A1() {
  return new class T {
     a = arguments
  }
}

function B() {
  return class T {
     a = { b: arguments }
  }
}

function B1() {
  return new class T {
     a = { b: arguments }
  }
}

function C() {
  return class T {
     a = function () { arguments }
  }
}

//// [argumentsUsedInClassFieldInitializerOrStaticInitializationBlock.js]
function A() {
    return /** @class */ (function () {
        function T() {
            this.a = arguments;
        }
        return T;
    }());
}
function A1() {
    return new /** @class */ (function () {
        function T() {
            this.a = arguments;
        }
        return T;
    }());
}
function B() {
    return /** @class */ (function () {
        function T() {
            this.a = { b: arguments };
        }
        return T;
    }());
}
function B1() {
    return new /** @class */ (function () {
        function T() {
            this.a = { b: arguments };
        }
        return T;
    }());
}
function C() {
    return /** @class */ (function () {
        function T() {
            this.a = function () { arguments; };
        }
        return T;
    }());
}
