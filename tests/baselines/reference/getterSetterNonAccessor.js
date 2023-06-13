//// [tests/cases/compiler/getterSetterNonAccessor.ts] ////

//// [getterSetterNonAccessor.ts]
function getFunc():any{return 0;}
function setFunc(v){}          

Object.defineProperty({}, "0", <PropertyDescriptor>({
          get: getFunc,
          set: setFunc,
          configurable: true
      }));


//// [getterSetterNonAccessor.js]
function getFunc() { return 0; }
function setFunc(v) { }
Object.defineProperty({}, "0", ({
    get: getFunc,
    set: setFunc,
    configurable: true
}));
