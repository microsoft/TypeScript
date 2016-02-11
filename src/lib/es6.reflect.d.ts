declare namespace Reflect {
    function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
    function construct(target: Function, argumentsList: ArrayLike<any>, newTarget?: any): any;
    function defineProperty(target: any, propertyKey: string | number, attributes: PropertyDescriptor): boolean;
    function deleteProperty(target: any, propertyKey: string | number): boolean;
    function get(target: any, propertyKey: string | number, receiver?: any): any;
    function getOwnPropertyDescriptor(target: any, propertyKey: string | number): PropertyDescriptor;
    function getPrototypeOf(target: any): any;
    function has(target: any, propertyKey: string): boolean;
    function has(target: any, propertyKey: symbol): boolean;
    function isExtensible(target: any): boolean;
    function ownKeys(target: any): Array<string | number>;
    function preventExtensions(target: any): boolean;
    function set(target: any, propertyKey: string | number, value: any, receiver?: any): boolean;
    function setPrototypeOf(target: any, proto: any): boolean;
}