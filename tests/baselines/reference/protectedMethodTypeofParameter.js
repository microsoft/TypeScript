//// [tests/cases/compiler/protectedMethodTypeofParameter.ts] ////

//// [protectedMethodTypeofParameter.ts]
export interface Properties {
  propertyA: number;
  propertyB: string;
}

export class A {
  public getPropertyValue_Ok(
    properties: Properties,
    propertyName: keyof Properties,
  ): Properties[typeof propertyName] {
    return properties[propertyName];
  }

  protected getPropertyValue_Protected(
    properties: Properties,
    propertyName: keyof Properties,
  ): Properties[typeof propertyName] {
    return properties[propertyName];
  }

  protected setPropertyValue_Protected(
    properties: Properties,
    propertyName: keyof Properties,
    propertyValue: Properties[typeof propertyName],
  ): void {
    void properties;
    void propertyName;
    void propertyValue;
  }
}


//// [protectedMethodTypeofParameter.js]
export class A {
    getPropertyValue_Ok(properties, propertyName) {
        return properties[propertyName];
    }
    getPropertyValue_Protected(properties, propertyName) {
        return properties[propertyName];
    }
    setPropertyValue_Protected(properties, propertyName, propertyValue) {
        void properties;
        void propertyName;
        void propertyValue;
    }
}


//// [protectedMethodTypeofParameter.d.ts]
export interface Properties {
    propertyA: number;
    propertyB: string;
}
export declare class A {
    getPropertyValue_Ok(properties: Properties, propertyName: keyof Properties): Properties[typeof propertyName];
    protected getPropertyValue_Protected(properties: Properties, propertyName: keyof Properties): Properties[typeof propertyName];
    protected setPropertyValue_Protected(properties: Properties, propertyName: keyof Properties, propertyValue: Properties[typeof propertyName]): void;
}
