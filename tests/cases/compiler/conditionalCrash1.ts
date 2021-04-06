// @noEmit: true

export type CanBeExpanded<T extends object = object, D = string> = {
  value: T
  default: D
}


type Join<K, P> = K extends string | number ?
  P extends string | number ?
      `${K}${"" extends P ? "" : "."}${P}`
      : never : never;

type PrefixWith<P, S, C = '.'> = P extends '' ? `${string & S}` : `${string & P}${string & C}${string & S}`

type SplitWithAllPossibleCombinations<S extends string, D extends string> =
  string extends S ? string :
      S extends '' ? '' :
          S extends `${infer T}${D}${infer U}` ?
              T | Join<T, SplitWithAllPossibleCombinations<U, D>>
              : S;


/**
* This function will return all possibile keys that can be expanded on T, only to the N deep level
*/
type KeysCanBeExpanded_<T, N extends number, Depth extends number[]> = N extends Depth['length'] ? never :
  T extends CanBeExpanded ?
      KeysCanBeExpanded_<T['value'], N, Depth> :
      T extends Array<infer U> ? KeysCanBeExpanded_<U, N, Depth> :

          T extends object ?
              {
                  [K in keyof T ] :
                  T[K] extends object ?
                      K extends string | number
                          ? `${K}` | Join<`${K}`, KeysCanBeExpanded_<T[K], N, [1, ...Depth]>>
                          : never
                      : never

              }[keyof T]
              :
              never

export type KeysCanBeExpanded<T, N extends number = 4> = KeysCanBeExpanded_<T, N, []>

/**
* Expand keys on `O` based on `Keys` parameter.
*/
type Expand__<O, Keys, P extends string, N extends number , Depth extends unknown[] > =
  N extends Depth['length'] ?
      O extends CanBeExpanded ?
          O['default'] :
          O :
      O extends CanBeExpanded ?
          Expand__<O[P extends Keys ? 'value' : 'default'], Keys, P, N, Depth> :
          O extends Array<infer U> ?
              Expand__<U, Keys, P, N, Depth>[]
              : O extends object ?
              {
                  [K in keyof O]-?: Expand__<O[K], Keys, PrefixWith<P, K>, N, [1, ...Depth]>
              }
              : O



type SplitAC<K> = SplitWithAllPossibleCombinations<K extends string ? K : '', '.'> extends infer Ko ? Ko : ''
type Expand_<T, K, N extends number = 4> = Expand__<T, SplitAC<K>, '', N, []>
type AllKeys<T, N extends number = 4> = KeysCanBeExpanded<T, N> extends infer R ? R : never
export type Expand<T extends object, K extends AllKeys<T, N> = never, N extends number = 4> = Expand_<T, K, N>

export type UseQueryOptions<T extends {}, K extends AllKeys<T, 4> > = Expand<T, K>
