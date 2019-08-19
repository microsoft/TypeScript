//// [objectRest2.ts]
// test for #12203
declare function connectionFromArray(objects: number, args: any): {};
function rootConnection(name: string) {
  return {
    resolve: async (context, args) => {
        const { objects } = await { objects: 12 };
      return {
        ...connectionFromArray(objects, args)
      };
    }
  };
}
rootConnection('test');


//// [objectRest2.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function rootConnection(name) {
    return {
        resolve: (context, args) => __awaiter(this, void 0, void 0, function* () {
            const { objects } = yield { objects: 12 };
            return Object.assign({}, connectionFromArray(objects, args));
        })
    };
}
rootConnection('test');
