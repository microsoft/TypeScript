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
