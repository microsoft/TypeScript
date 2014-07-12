/**
 * Enumeration for possible kinds of method symbols.
 */
enum MethodKind
{
    /**
     * An anonymous method or lambda expression
     */
    ArrowFunction = 0,

    /**
     * Method is a constructor.
     */
    Constructor = 1,

    /**
     * Method is an ordinary method.
     */
    Ordinary = 10,

    /**
     * Method is a property get.
     */
    GetAccessor = 11,

    /**
     * Method is a property set.
     */
    SetAccessor = 12,
}