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

  protected getPropertyValue_Error(
    properties: Properties,
    propertyName: keyof Properties,
  ): Properties[typeof propertyName] {
    return properties[propertyName];
  }
}


//// [protectedMethodTypeofParameter.js]
export class A {
    getPropertyValue_Ok(properties, propertyName) {
        return properties[propertyName];
    }
    getPropertyValue_Error(properties, propertyName) {
        return properties[propertyName];
    }
}


//// [protectedMethodTypeofParameter.d.ts]
export interface Properties {
    propertyA: number;
    propertyB: string;
}
export declare class A {
    getPropertyValue_Ok(properties: Properties, propertyName: keyof Properties): Properties[typeof propertyName];
    protected getPropertyValue_Error(properties: Properties, propertyName: keyof Properties): Properties[typeof propertyName];
}
