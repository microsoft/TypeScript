// @declaration: true

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
