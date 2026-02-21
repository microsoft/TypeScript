enum Type { Foo = 'foo', '3x14' = '3.14' } type TypeMap = { [Type.Foo]: any; [Type['3x14']]: any; };
