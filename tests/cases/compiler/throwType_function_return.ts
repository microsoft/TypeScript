function checkedDivide<T extends number>(x: T): T extends 0 ? throw 'Cannot divided by 0' : number {
    if (x === 0) throw new Error('')
    return 5 / x
}
checkedDivide(0)
checkedDivide(1)

const theAnswerToEverything = <T>(x: T): T extends 42 ? T : throw "Wrong" => x
theAnswerToEverything(42 as const)
theAnswerToEverything('')
