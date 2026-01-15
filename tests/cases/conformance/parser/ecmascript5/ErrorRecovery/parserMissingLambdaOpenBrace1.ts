class C {
    where(filter: Iterator<T, boolean>): Query<T> {
        return fromDoWhile(test =>
            var index = 0;
            return this.doWhile((item, i) => filter(item, i) ? test(item, index++) : true);
        });
    }
}