declare type PropertyKey = string | number | symbol;

interface Symbol {
    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    readonly [Symbol.toStringTag]: "Symbol";
}

interface SymbolConstructor {
    /** 
      * A reference to the prototype. 
      */
    readonly prototype: Symbol;

    /**
      * Returns a new unique Symbol value.
      * @param  description Description of the new Symbol object.
      */
    (description?: string|number): symbol;

    /**
      * Returns a Symbol object from the global symbol registry matching the given key if found. 
      * Otherwise, returns a new symbol with this key.
      * @param key key to search for.
      */
    for(key: string): symbol;

    /**
      * Returns a key from the global symbol registry matching the given Symbol if found. 
      * Otherwise, returns a undefined.
      * @param sym Symbol to find the key for.
      */
    keyFor(sym: symbol): string;
}

declare var Symbol: SymbolConstructor;

interface Object {
    /**
      * Determines whether an object has a property with the specified name. 
      * @param v A property name.
      */
    hasOwnProperty(v: PropertyKey): boolean;

    /** 
      * Determines whether a specified property is enumerable.
      * @param v A property name.
      */
    propertyIsEnumerable(v: PropertyKey): boolean;
}

interface ObjectConstructor {
    
    /**
      * Gets the own property descriptor of the specified object. 
      * An own property descriptor is one that is defined directly on the object and is not 
      * inherited from the object's prototype. 
      * @param o Object that contains the property.
      * @param p Name of the property.
    */
    getOwnPropertyDescriptor(o: any, propertyKey: PropertyKey): PropertyDescriptor;

    /**
      * Adds a property to an object, or modifies attributes of an existing property. 
      * @param o Object on which to add or modify the property. This can be a native JavaScript 
      * object (that is, a user-defined object or a built in object) or a DOM object.
      * @param p The property name.
      * @param attributes Descriptor for the property. It can be for a data property or an accessor
      *  property.
      */
    defineProperty(o: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): any;
}

interface ProxyHandler<T> {
    getOwnPropertyDescriptor? (target: T, p: PropertyKey): PropertyDescriptor;
    has? (target: T, p: PropertyKey): boolean;
    get? (target: T, p: PropertyKey, receiver: any): any;
    set? (target: T, p: PropertyKey, value: any, receiver: any): boolean;
    deleteProperty? (target: T, p: PropertyKey): boolean;
    defineProperty? (target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean;
    enumerate? (target: T): PropertyKey[];
    ownKeys? (target: T): PropertyKey[];
}

declare namespace Reflect {
    function set(target: any, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    function get(target: any, propertyKey: PropertyKey, receiver?: any): any;
    function getOwnPropertyDescriptor(target: any, propertyKey: PropertyKey): PropertyDescriptor;
    function defineProperty(target: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): boolean;
    function deleteProperty(target: any, propertyKey: PropertyKey): boolean;
}