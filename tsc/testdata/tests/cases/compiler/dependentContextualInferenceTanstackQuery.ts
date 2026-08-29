declare const useQueries:
  <T extends { [I in keyof T]: { key: unknown, fetch: (key: T[I]["key"]) => unknown, select: (data: ReturnType<T[I]["fetch"]>) => unknown } }>
    (queries: T) =>
      { [I in keyof T]: ReturnType<T[I]["select"]> }

const results = useQueries([
  {
    key: "0",
    fetch: key => +key,
    select: data => [data] 
  },
  {
    key: 1,
    fetch: key => key.toString(),
    select: data => ({ data })
  }
])
