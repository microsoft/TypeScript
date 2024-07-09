class foo<T> { }
new foo<>();

// https://github.com/microsoft/TypeScript/issues/33041
class noParams {}
new noParams<>();