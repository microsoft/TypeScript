//// [tests/cases/conformance/types/objectTypeLiteral/propertySignatures/propertyNamesOfReservedWords.ts] ////

//// [propertyNamesOfReservedWords.ts]
class C {
    abstract;
    as;
    boolean;
    break;
    byte;
    case;
    catch;
    char;
    class;
    continue;
    const;
    debugger;
    default;
    delete;
    do;
    double;
    else;
    enum;
    export;
    extends;
    false;
    final;
    finally;
    float;
    for;
    function;
    goto;
    if;
    implements;
    import;
    in;
    instanceof;
    int;
    interface;
    is;
    long;
    namespace;
    native;
    new;
    null;
    package;
    private;
    protected;
    public;
    return;
    short;
    static;
    super;
    switch;
    synchronized;
    this;
    throw;
    throws;
    transient;
    true;
    try;
    typeof;
    use;
    var;
    void;
    volatile;
    while;
    with;
}
var c: C;
var r1 = c.abstract;
var r2 = c.as;

interface I {
    abstract;
    as;
    boolean;
    break;
    byte;
    case;
    catch;
    char;
    class;
    continue;
    const;
    debugger;
    default;
    delete;
    do;
    double;
    else;
    enum;
    export;
    extends;
    false;
    final;
    finally;
    float;
    for;
    function;
    goto;
    if;
    implements;
    import;
    in;
    instanceof;
    int;
    interface;
    is;
    long;
    namespace;
    native;
    new;
    null;
    package;
    private;
    protected;
    public;
    return;
    short;
    static;
    super;
    switch;
    synchronized;
    this;
    throw;
    throws;
    transient;
    true;
    try;
    typeof;
    use;
    var;
    void;
    volatile;
    while;
    with;
}

var i: I;
var r3 = i.abstract;
var r4 = i.as;

var a: {
    abstract;
    as;
    boolean;
    break;
    byte;
    case;
    catch;
    char;
    class;
    continue;
    const;
    debugger;
    default;
    delete;
    do;
    double;
    else;
    enum;
    export;
    extends;
    false;
    final;
    finally;
    float;
    for;
    function;
    goto;
    if;
    implements;
    import;
    in;
    instanceof;
    int;
    interface;
    is;
    long;
    namespace;
    native;
    new;
    null;
    package;
    private;
    protected;
    public;
    return;
    short;
    static;
    super;
    switch;
    synchronized;
    this;
    throw;
    throws;
    transient;
    true;
    try;
    typeof;
    use;
    var;
    void;
    volatile;
    while;
    with;
}

var r5 = a.abstract;
var r6 = a.as;

enum E {
    abstract,
    as,
    boolean,
    break,
    byte,
    case,
    catch,
    char,
    class,
    continue,
    const,
    debugger,
    default,
    delete,
    do,
    double,
    else,
    enum,
    export,
    extends,
    false,
    final,
    finally,
    float,
    for,
    function,
    goto,
    if,
    implements,
    import,
    in,
    instanceof,
    int,
    interface,
    is,
    long,
    namespace,
    native,
    new,
    null,
    package,
    private,
    protected,
    public,
    return,
    short,
    static,
    super,
    switch,
    synchronized,
    this,
    throw,
    throws,
    transient,
    true,
    try,
    typeof,
    use,
    var,
    void,
    volatile,
    while,
    with,
}

var r7 = E.abstract;
var r8 = E.as;

//// [propertyNamesOfReservedWords.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var r1 = c.abstract;
var r2 = c.as;
var i;
var r3 = i.abstract;
var r4 = i.as;
var a;
var r5 = a.abstract;
var r6 = a.as;
var E;
(function (E) {
    E[E["abstract"] = 0] = "abstract";
    E[E["as"] = 1] = "as";
    E[E["boolean"] = 2] = "boolean";
    E[E["break"] = 3] = "break";
    E[E["byte"] = 4] = "byte";
    E[E["case"] = 5] = "case";
    E[E["catch"] = 6] = "catch";
    E[E["char"] = 7] = "char";
    E[E["class"] = 8] = "class";
    E[E["continue"] = 9] = "continue";
    E[E["const"] = 10] = "const";
    E[E["debugger"] = 11] = "debugger";
    E[E["default"] = 12] = "default";
    E[E["delete"] = 13] = "delete";
    E[E["do"] = 14] = "do";
    E[E["double"] = 15] = "double";
    E[E["else"] = 16] = "else";
    E[E["enum"] = 17] = "enum";
    E[E["export"] = 18] = "export";
    E[E["extends"] = 19] = "extends";
    E[E["false"] = 20] = "false";
    E[E["final"] = 21] = "final";
    E[E["finally"] = 22] = "finally";
    E[E["float"] = 23] = "float";
    E[E["for"] = 24] = "for";
    E[E["function"] = 25] = "function";
    E[E["goto"] = 26] = "goto";
    E[E["if"] = 27] = "if";
    E[E["implements"] = 28] = "implements";
    E[E["import"] = 29] = "import";
    E[E["in"] = 30] = "in";
    E[E["instanceof"] = 31] = "instanceof";
    E[E["int"] = 32] = "int";
    E[E["interface"] = 33] = "interface";
    E[E["is"] = 34] = "is";
    E[E["long"] = 35] = "long";
    E[E["namespace"] = 36] = "namespace";
    E[E["native"] = 37] = "native";
    E[E["new"] = 38] = "new";
    E[E["null"] = 39] = "null";
    E[E["package"] = 40] = "package";
    E[E["private"] = 41] = "private";
    E[E["protected"] = 42] = "protected";
    E[E["public"] = 43] = "public";
    E[E["return"] = 44] = "return";
    E[E["short"] = 45] = "short";
    E[E["static"] = 46] = "static";
    E[E["super"] = 47] = "super";
    E[E["switch"] = 48] = "switch";
    E[E["synchronized"] = 49] = "synchronized";
    E[E["this"] = 50] = "this";
    E[E["throw"] = 51] = "throw";
    E[E["throws"] = 52] = "throws";
    E[E["transient"] = 53] = "transient";
    E[E["true"] = 54] = "true";
    E[E["try"] = 55] = "try";
    E[E["typeof"] = 56] = "typeof";
    E[E["use"] = 57] = "use";
    E[E["var"] = 58] = "var";
    E[E["void"] = 59] = "void";
    E[E["volatile"] = 60] = "volatile";
    E[E["while"] = 61] = "while";
    E[E["with"] = 62] = "with";
})(E || (E = {}));
var r7 = E.abstract;
var r8 = E.as;
