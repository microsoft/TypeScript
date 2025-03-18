//// [tests/cases/compiler/argumentsUsedInClassFieldInitializerOrStaticInitializationBlock.ts] ////

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
    return class T {
        a = arguments;
    };
}
function A1() {
    return new class T {
        a = arguments;
    };
}
function B() {
    return class T {
        a = { b: arguments };
    };
}
function B1() {
    return new class T {
        a = { b: arguments };
    };
}
function C() {
    return class T {
        a = function () { arguments; };
    };
}
