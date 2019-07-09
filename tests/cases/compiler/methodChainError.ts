class Builder {
    notMethod: string
    method(param: string): Builder {
        return this;
    }
}

new Builder()
    .method("a")
    .method()
    .method("a");

    
new Builder()
    .method("a")
    .notMethod()
    .method("a");