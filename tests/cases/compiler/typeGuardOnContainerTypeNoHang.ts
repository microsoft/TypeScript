export namespace TypeGuards {
    export function IsObject(value: any) : value is {[index:string]:any} {
        return typeof(value) === 'object'
    }

}