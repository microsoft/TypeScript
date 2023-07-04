
//@fileName: test-types.ts
export type UsedAsConstraint = { foo: string };
export type UsedAsParameter = { foo: string };
export type UsedAsReturnType = { foo: string };
export type UsedAsDefault = { foo: string };
export type Unused = { foo: string };
export type UsedAsVariableType = { foo: string };
export type UsedAsConstraintConst = { ro: string };
export type UsedAsParameterConst = { ro: string };
export type UsedAsReturnTypeConst = { ro: string };
export type UsedAsDefaultConst = { ro: string };
export type UnusedConst = { ro: string };
export type UsedAsVariableTypeConst = { ro: string };

//@fileName: objects.ts
import type { 
    UsedAsConstraint,
    UsedAsParameter,
    UsedAsReturnType,
    UsedAsDefault,
    Unused,
    UsedAsVariableType
} from './test-types'

export let g = {
    method<T extends UsedAsConstraint = UsedAsDefault>(p: T, p2: UsedAsParameter): UsedAsReturnType {
        let o: UsedAsVariableType;
        return o;
    }
}


import type { 
    UsedAsConstraintConst,
    UsedAsParameterConst,
    UsedAsReturnTypeConst,
    UsedAsDefaultConst,
    UnusedConst,
    UsedAsVariableTypeConst,
} from './test-types'

export let g2 = {
    method<T extends UsedAsConstraintConst = UsedAsDefaultConst>(p: T, p2: UsedAsParameterConst): UsedAsReturnTypeConst {
        let o: UsedAsVariableTypeConst;
        return o;
    }
} as const