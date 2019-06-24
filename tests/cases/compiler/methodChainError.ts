class Builder {
    method(param: string): Builder {
        return this;
    }
}

new Builder()
    .method("a")
    .method();