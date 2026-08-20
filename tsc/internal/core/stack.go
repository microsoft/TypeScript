package core

type Stack[T any] struct {
	data []T
}

func (s *Stack[T]) Push(item T) {
	s.data = append(s.data, item)
}

func (s *Stack[T]) Pop() T {
	l := len(s.data)
	if l == 0 {
		panic("stack is empty")
	}
	item := s.data[l-1]
	var zero T
	s.data[l-1] = zero
	s.data = s.data[:l-1]
	return item
}

func (s *Stack[T]) Peek() T {
	l := len(s.data)
	if l == 0 {
		panic("stack is empty")
	}
	return s.data[l-1]
}

func (s *Stack[T]) Len() int {
	return len(s.data)
}
