function checkParameterPosition<T extends number>(y: T extends 1234 ? throw 'No zero' : T) { }
checkParameterPosition(1234)
checkParameterPosition(12345678)
