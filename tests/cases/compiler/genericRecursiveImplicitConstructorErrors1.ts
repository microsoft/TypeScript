//@module: amd
export declare namespace TypeScript {
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
 
