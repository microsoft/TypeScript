const increment = (a: number) => a + 1;
const add = (a: number, b: number) => a + b;
 
const result = ['a','bb','ccc']
    |> #.map(s => s |> #.length)
    |> #.map(a => a * 2 )
    |> #.filter(a => a > 5)
    |> #.reduce((sum, a) => a+sum, 0)
    |> increment(#)
    |> add(#, 3)

const added = 3 |> #+#+#+#+#;
