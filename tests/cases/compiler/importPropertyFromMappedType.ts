// #42957

// @filename: errors.d.ts
export = createHttpError;
declare const createHttpError: createHttpError.NamedConstructors;
declare namespace createHttpError {
    type NamedConstructors =  { [P in 'NotFound']: unknown;}
}

// @filename: main.ts
import { NotFound } from './errors'
