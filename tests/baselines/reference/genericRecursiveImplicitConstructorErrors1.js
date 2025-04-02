//// [tests/cases/compiler/genericRecursiveImplicitConstructorErrors1.ts] ////

//// [genericRecursiveImplicitConstructorErrors1.ts]
export declare module TypeScript {
  class PullSymbol { }
  class PullSignatureSymbol <A,B,C> extends PullSymbol {
  public addSpecialization<A,B,C>(signature: PullSignatureSymbol<A,B,C>, typeArguments: PullTypeSymbol<any,any,any>[]): void;
  }
  class PullTypeSymbol <A,B,C> extends PullSymbol {
    public findTypeParameter<A,B,C>(name: string): PullTypeParameterSymbol<A,B,C>;
  }
  class PullTypeParameterSymbol <A,B,C> extends PullTypeSymbol {
  }
}
 


//// [genericRecursiveImplicitConstructorErrors1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
