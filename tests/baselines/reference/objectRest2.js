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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function rootConnection(name) {
    return {
        resolve: (context, args) => __awaiter(this, void 0, void 0, function* () {
            const { objects } = yield { objects: 12 };
            return __assign({}, connectionFromArray(objects, args));
        })
    };
}
rootConnection('test');
