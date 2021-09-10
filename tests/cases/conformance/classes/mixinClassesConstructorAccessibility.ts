function PrivateConstructorMixinGenericBaseType<TBase extends new(...args: any[]) => any>(Base: TBase) {
    return class PrivateConstructorMixinGenericBaseType extends Base {
      private constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function PrivateConstructorMixin(Base: new(...args: any[]) => any) {
    return class PrivateConstructorMixin extends Base {
      private constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function ProtectedConstructorMixinGenericBaseType<TBase extends new(...args: any[]) => any>(Base: TBase) {
    return class ProtectedConstructorMixinGenericBaseType extends Base {
      protected constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function ProtectedConstructorMixin(Base: new(...args: any[]) => any) {
    return class ProtectedConstructorMixin extends Base {
      protected constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function PublicConstructorMixinGenericBaseType(Base: new(...args: any[]) => any) {
    return class PublicConstructorMixinGenericBaseType extends Base {
      constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function PublicConstructorMixin(Base: new(...args: any[]) => any) {
    return class PublicConstructorMixin extends Base {
      constructor(...args: any[]) {
        super();
      }
    }
  }
  
  class Base {
    constructor() {}
  }
  
  new (PrivateConstructorMixin(Base))(); // error: PrivateConstructorMixin is private
  new (PrivateConstructorMixinGenericBaseType(Base))(); // error: PrivateConstructorMixinGenericBaseType is private
  
  new (ProtectedConstructorMixin(Base))(); // error: ProtectedConstructorMixin is protected
  new (ProtectedConstructorMixinGenericBaseType(Base))(); // error: ProtectedConstructorMixinGenericBaseType is protected
  
  new (PublicConstructorMixin(Base))();
  new (PublicConstructorMixinGenericBaseType(Base))();