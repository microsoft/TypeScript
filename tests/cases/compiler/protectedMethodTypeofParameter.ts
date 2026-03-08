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
