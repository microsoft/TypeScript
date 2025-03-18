//// [tests/cases/compiler/genericRecursiveImplicitConstructorErrors2.ts] ////

//// [genericRecursiveImplicitConstructorErrors2.ts]
module TypeScript2 {
  export interface DeclKind { };
  export interface PullTypesymbol { };
  export interface SymbolLinkKind { };
  export enum PullSymbolVisibility {
    Private,
    Public
  }
　
  export class PullSymbol {
    constructor (name: string, declKind: DeclKind) {

    }
    // link methods
    public addOutgoingLink<A,B,C>(linkTo: PullSymbol, kind: SymbolLinkKind) {

    }

    public getType<A,B,C>(): PullTypeSymbol<A,B,C> {
      return undefined;
    }
  }
  export class PullTypeSymbol <A,B,C>extends PullSymbol {
  }
}


//// [genericRecursiveImplicitConstructorErrors2.js]
var TypeScript2;
(function (TypeScript2) {
    ;
    ;
    ;
    let PullSymbolVisibility;
    (function (PullSymbolVisibility) {
        PullSymbolVisibility[PullSymbolVisibility["Private"] = 0] = "Private";
        PullSymbolVisibility[PullSymbolVisibility["Public"] = 1] = "Public";
    })(PullSymbolVisibility = TypeScript2.PullSymbolVisibility || (TypeScript2.PullSymbolVisibility = {}));
    class PullSymbol {
        constructor(name, declKind) {
        }
        addOutgoingLink(linkTo, kind) {
        }
        getType() {
            return undefined;
        }
    }
    TypeScript2.PullSymbol = PullSymbol;
    class PullTypeSymbol extends PullSymbol {
    }
    TypeScript2.PullTypeSymbol = PullTypeSymbol;
})(TypeScript2 || (TypeScript2 = {}));
