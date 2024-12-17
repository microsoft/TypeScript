// @declaration: true
// @strict: true

function outerFnExpression<K>(n: K) {
    return function <T>(a: [T, K]): a is [T, K] {
        return null!
    }
}

export let nrFnFromFnExpression = outerFnExpression(1)<number>


function outerArrowFn<K>(n: K) {
    return function <T>(a: [T, K]): a is [T, K] {
        return null!
    }
}

export let nrFnFromArrowFn = outerArrowFn(1)<number>

function outerObjectMethod<K>(n: K) {
    return {
        inner<T>(a: [T, K]): a is [T, K] {
            return null!
        }
    }
}

export let nrFnFromObjectMethod = outerObjectMethod(1).inner<number>


function outerStaticClassMember<K>(n: K) {
    return class {
        static inner<T>(a: [T, K]): a is [T, K] {
            return null!
        }
    }
}

export let nrFnFromStaticClassMember = outerStaticClassMember(1).inner<number>


function outerClassMethod<K>(n: K) {
    return class {
        inner<T>(a: [T, K]): a is [T, K] {
            return null!
        }
    }
}

export let nrFnFromClassMethod = new (outerClassMethod(1))().inner<number>

function outerMethodSignature<K>(n: K) : {
    inner<T>(a: [T, K]): a is [T, K]
} {
    return null!
}

export let nrFnFromMethodSignature = outerMethodSignature(1).inner<number>



function outerFnSignature<K>(n: K) : {
    <T>(a: [T, K]): a is [T, K]
} {
    return null!
}

export let nrFnFromFnSignature = outerFnSignature(1)<number>



function outerFnType<K>(n: K) : <T>(a: [T, K]) => a is [T, K] {
    return null!
}

export let nrFnFromFnType = outerFnType(1)<number>