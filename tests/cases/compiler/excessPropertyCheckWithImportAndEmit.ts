// @Filename: ourParam.ts
export default {
    nonExistingParam: '42',
}

// @fileName: index.ts
import ourParam from './ourParam'
export interface OurType {
    a: number
}
const ourMethod = (param: OurType) => {
    console.log(param)
}
const result = ourMethod(ourParam)