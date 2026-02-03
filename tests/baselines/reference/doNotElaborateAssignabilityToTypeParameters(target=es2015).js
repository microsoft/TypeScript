//// [tests/cases/compiler/doNotElaborateAssignabilityToTypeParameters.ts] ////

//// [doNotElaborateAssignabilityToTypeParameters.ts]
async function foo<T>(x: T): Promise<T> {
  let yaddable = await getXOrYadda(x);
  return yaddable;
}

interface Yadda {
  stuff: string,
  things: string,
}

declare function getXOrYadda<T>(x: T): T | Yadda;


//// [doNotElaborateAssignabilityToTypeParameters.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function foo(x) {
    return __awaiter(this, void 0, void 0, function* () {
        let yaddable = yield getXOrYadda(x);
        return yaddable;
    });
}
