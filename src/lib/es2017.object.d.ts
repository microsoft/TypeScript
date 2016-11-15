interface ObjectConstructor {
    /**
      * Returns an array of values of the enumerable properties of an object
      * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
      */
    values<T>(o: { [s: string]: T }): T[];
    values(o: any): any[];
    /**
      * Returns an array of key/values of the enumerable properties of an object
      * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
      */
    entries<T>(o: Array<T>): [string, T][];
    entries<T extends { [key: string]: any }, K extends keyof T>(o: T): [keyof T & string, T[K]][];
    entries(o: any): [string, any][];
}
