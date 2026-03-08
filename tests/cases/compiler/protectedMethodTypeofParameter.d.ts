export interface Properties {
    propertyA: number;
    propertyB: string;
}
export declare class A {
    getPropertyValue_Ok(properties: Properties, propertyName: keyof Properties): Properties[typeof propertyName];
    protected getPropertyValue_Error(properties: Properties, propertyName: keyof Properties): Properties[typeof propertyName];
}
