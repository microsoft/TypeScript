//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclarationAmbiguities1.ts] ////

//// [parserMemberFunctionDeclarationAmbiguities1.ts]
class C {
  public() {}
  static() {}

  public public() {}
  public static() {}

  public static public() {}
  public static static() {}
  
  static public() {}
  static static() {}
}

//// [parserMemberFunctionDeclarationAmbiguities1.js]
class C {
    public() { }
    static() { }
    public() { }
    static() { }
    static public() { }
    static static() { }
    static public() { }
    static static() { }
}
