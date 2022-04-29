function getFunc():any{return 0;}
function setFunc(v){}          

Object.defineProperty({}, "0", <PropertyDescriptor>({
          get: getFunc,
          set: setFunc,
          configurable: true
      }));
