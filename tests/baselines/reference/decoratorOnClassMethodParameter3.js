//// [tests/cases/conformance/decorators/class/method/parameter/decoratorOnClassMethodParameter3.ts] ////

//// [decoratorOnClassMethodParameter3.ts]
// https://github.com/microsoft/TypeScript/issues/48509
declare function dec(a: any): any;
function fn(value: Promise<number>): any {
  class Class {
    async method(@dec(await value) arg: number) {}
  }
  return Class
}


//// [decoratorOnClassMethodParameter3.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fn(value) {
    class Class {
        method(arg) {
            return __awaiter(this, void 0, void 0, function* () { });
        }
    }
    __decorate([
        __param(0, dec(yield value))
    ], Class.prototype, "method", null);
    return Class;
}
