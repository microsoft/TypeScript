type GetTag<T> = T extends tag infer U ? U : never
type ThatTag = string & tag {x: number};

type WhichTag = GetTag<ThatTag>;

const obj: WhichTag = {x: 12}; // should be OK