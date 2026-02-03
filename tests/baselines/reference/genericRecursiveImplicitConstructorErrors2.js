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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TypeScript2;
(function (TypeScript2) {
    ;
    ;
    ;
    var PullSymbolVisibility;
    (function (PullSymbolVisibility) {
        PullSymbolVisibility[PullSymbolVisibility["Private"] = 0] = "Private";
        PullSymbolVisibility[PullSymbolVisibility["Public"] = 1] = "Public";
    })(PullSymbolVisibility = TypeScript2.PullSymbolVisibility || (TypeScript2.PullSymbolVisibility = {}));
    var PullSymbol = /** @class */ (function () {
        function PullSymbol(name, declKind) {
        }
        // link methods
        PullSymbol.prototype.addOutgoingLink = function (linkTo, kind) {
        };
        PullSymbol.prototype.getType = function () {
            return undefined;
        };
        return PullSymbol;
    }());
    TypeScript2.PullSymbol = PullSymbol;
    var PullTypeSymbol = /** @class */ (function (_super) {
        __extends(PullTypeSymbol, _super);
        function PullTypeSymbol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PullTypeSymbol;
    }(PullSymbol));
    TypeScript2.PullTypeSymbol = PullTypeSymbol;
})(TypeScript2 || (TypeScript2 = {}));
