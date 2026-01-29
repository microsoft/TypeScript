//// [tests/cases/compiler/reverseMappedTypeDeepDeclarationEmit.ts] ////

//// [reverseMappedTypeDeepDeclarationEmit.ts]
export type Validator<T> = NativeTypeValidator<T> | ObjectValidator<T>

export type NativeTypeValidator<T> = (n: any) => T | undefined
export type ObjectValidator<O> = {
  [K in keyof O]: Validator<O[K]> 
}

//native validators
export declare const SimpleStringValidator: NativeTypeValidator<string>;

///object validator function
export declare const ObjValidator: <V>(validatorObj: ObjectValidator<V>) => (o: any) => V;

export const test  = {
  Test: {
    Test1: {
      Test2: SimpleStringValidator
    },
  }
}

export const validatorFunc = ObjValidator(test);
export const outputExample = validatorFunc({
  Test: {
    Test1: {
      Test2: "hi"
    },
  }
});


//// [reverseMappedTypeDeepDeclarationEmit.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputExample = exports.validatorFunc = exports.test = void 0;
exports.test = {
    Test: {
        Test1: {
            Test2: exports.SimpleStringValidator
        },
    }
};
exports.validatorFunc = (0, exports.ObjValidator)(exports.test);
exports.outputExample = (0, exports.validatorFunc)({
    Test: {
        Test1: {
            Test2: "hi"
        },
    }
});


//// [reverseMappedTypeDeepDeclarationEmit.d.ts]
export type Validator<T> = NativeTypeValidator<T> | ObjectValidator<T>;
export type NativeTypeValidator<T> = (n: any) => T | undefined;
export type ObjectValidator<O> = {
    [K in keyof O]: Validator<O[K]>;
};
export declare const SimpleStringValidator: NativeTypeValidator<string>;
export declare const ObjValidator: <V>(validatorObj: ObjectValidator<V>) => (o: any) => V;
export declare const test: {
    Test: {
        Test1: {
            Test2: NativeTypeValidator<string>;
        };
    };
};
export declare const validatorFunc: (o: any) => {
    Test: {
        Test1: {
            Test2: string;
        };
    };
};
export declare const outputExample: {
    Test: {
        Test1: {
            Test2: string;
        };
    };
};
