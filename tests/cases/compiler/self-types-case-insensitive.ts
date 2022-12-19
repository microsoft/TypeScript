type CaseInsensitive<T extends string> =
  self extends string
    ? Lowercase<self> extends Lowercase<T>
        ? self
        : never
    : T

declare const setHeader: 
  (key: CaseInsensitive<"Set-Cookie" | "Accept">, value: string) => void

setHeader("Set-Cookie", "test")
setHeader("Accept", "test2")
setHeader("sEt-cOoKiE", "stop writing headers like this but ok")
setHeader("Acept", "nah this has a typo")

type Headers =
  Record<CaseInsensitive<"set-cookie" | "accept">, string>

let headers: Headers = {
  // TODO: this is not an excess property, should compile
  "Set-Cookie": "test"
}

export {}