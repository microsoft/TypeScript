// #52399
type DataFetchFns = {
    Boat: {
        requiresLicense: (id: string) => boolean;
        maxGroundSpeed: (id: string) => number;
        description: (id: string) => string;
        displacement: (id: string) => number;
        name: (id: string) => string;
    };
    Plane: {
        requiresLicense: (id: string) => boolean;
        maxGroundSpeed: (id: string) => number;
        maxTakeoffWeight: (id: string) => number;
        maxCruisingAltitude: (id: string) => number;
        name: (id: string) => string;
    }
}
export type NoTypeParamBoatRequired<F extends keyof DataFetchFns['Boat']> = ReturnType<DataFetchFns['Boat'][F]>;
type TypeHardcodedAsParameterWithoutReturnType<T extends 'Boat', F extends keyof DataFetchFns[T]> = DataFetchFns[T][F];
export type allAreFunctionsAsExpected = TypeHardcodedAsParameterWithoutReturnType<'Boat', keyof DataFetchFns['Boat']>;
export type returnTypeOfFunctions = ReturnType<allAreFunctionsAsExpected>; //string | number | boolean as expected
export type SucceedingCombo = ReturnType<TypeHardcodedAsParameterWithoutReturnType<'Boat', keyof DataFetchFns['Boat']>>;
export type FailingCombo<T extends 'Boat', F extends keyof DataFetchFns[T]> = ReturnType<TypeHardcodedAsParameterWithoutReturnType<T,F>>;
export type TypeHardcodedAsParameter<T extends 'Boat', F extends keyof DataFetchFns[T]> = ReturnType<DataFetchFns[T][F]>;
type VehicleSelector<T extends keyof DataFetchFns> = DataFetchFns[T];
export type TypeHardcodedAsParameter2<T extends 'Boat', F extends keyof DataFetchFns[T]> = ReturnType<VehicleSelector<T>[F]>;
export type TypeGeneric1<T extends keyof DataFetchFns, F extends keyof DataFetchFns[T]> = ReturnType<DataFetchFns[T][F]>;
export type TypeGeneric2<T extends keyof DataFetchFns, F extends keyof DataFetchFns[T]> = ReturnType<DataFetchFns[T][T]>; // error
export type TypeGeneric3<T extends keyof DataFetchFns, F extends keyof DataFetchFns[T]> = ReturnType<DataFetchFns[F][F]>; // error
