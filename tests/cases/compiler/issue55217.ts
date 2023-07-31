// @strict: true

// @filename: types.ts
export type ProductName = 'a' | 'b'

export type SubproductNameForProductName<P extends ProductName> = P extends unknown
  ? keyof EntitiesByProductName[P]
  : never

type EntitiesByProductName = {
  a: { a1: { value: 'a-a1' } }
  b: { b1: { value: 'b-b1' } }
}

export type DiscriminatedUnion<
  P extends ProductName = ProductName,
  E extends SubproductNameForProductName<P> = SubproductNameForProductName<P>,
> = P extends ProductName
    ? E extends SubproductNameForProductName<P>
    // ? E extends unknown // With unknown, the exception doesn't happen. 
      ? EntitiesByProductName[P][E]
      : never
    : never

// @filename: app.ts
import { SubproductNameForProductName, DiscriminatedUnion, ProductName } from './types'

export const bug = <P extends ProductName>() => {
  const subproducts: DiscriminatedUnion<P, SubproductNameForProductName<P>>[] = []
  subproducts.map((_: DiscriminatedUnion) => null)
}
