package tsc

import "testing"

type colorTestSystem struct {
	*timingTestSystem
	env map[string]string
	tty bool
}

func (s *colorTestSystem) WriteOutputIsTTY() bool {
	return s.tty
}

func (s *colorTestSystem) GetEnvironmentVariable(name string) string {
	return s.env[name]
}

func (s *colorTestSystem) LookupEnvironmentVariable(name string) (string, bool) {
	value, ok := s.env[name]
	return value, ok
}

func TestDefaultIsPretty(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		env      map[string]string
		tty      bool
		expected bool
	}{
		{name: "TTY", tty: true, expected: true},
		{name: "non-TTY", tty: false, expected: false},
		{name: "NO_COLOR", env: map[string]string{"NO_COLOR": "1"}, tty: true, expected: false},
		{name: "empty NO_COLOR", env: map[string]string{"NO_COLOR": ""}, tty: true, expected: true},
		{name: "TERM=dumb", env: map[string]string{"TERM": "dumb"}, tty: true, expected: false},
		{name: "empty FORCE_COLOR", env: map[string]string{"FORCE_COLOR": ""}, expected: true},
		{name: "FORCE_COLOR=0", env: map[string]string{"FORCE_COLOR": "0"}, tty: true, expected: false},
		{name: "FORCE_COLOR=1", env: map[string]string{"FORCE_COLOR": "1"}, expected: true},
		{name: "FORCE_COLOR=2", env: map[string]string{"FORCE_COLOR": "2"}, expected: true},
		{name: "FORCE_COLOR=3", env: map[string]string{"FORCE_COLOR": "3"}, expected: true},
		{name: "FORCE_COLOR=4", env: map[string]string{"FORCE_COLOR": "4"}, tty: true, expected: false},
		{name: "FORCE_COLOR=true", env: map[string]string{"FORCE_COLOR": "true"}, expected: true},
		{name: "FORCE_COLOR=false", env: map[string]string{"FORCE_COLOR": "false"}, tty: true, expected: false},
		{name: "invalid FORCE_COLOR", env: map[string]string{"FORCE_COLOR": "invalid"}, tty: true, expected: false},
		{
			name:     "FORCE_COLOR overrides NO_COLOR",
			env:      map[string]string{"FORCE_COLOR": "1", "NO_COLOR": "1"},
			expected: true,
		},
		{
			name:     "FORCE_COLOR overrides TERM=dumb",
			env:      map[string]string{"FORCE_COLOR": "1", "TERM": "dumb"},
			expected: true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			sys := &colorTestSystem{
				timingTestSystem: &timingTestSystem{},
				env:              test.env,
				tty:              test.tty,
			}
			if actual := defaultIsPretty(sys); actual != test.expected {
				t.Errorf("defaultIsPretty() = %v, expected %v", actual, test.expected)
			}
		})
	}
}
