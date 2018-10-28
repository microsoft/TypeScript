.PHONY: install
install:
	npm install -g typescript

.PHONY: build
build:
	npm install -g jake \
		&& npm install
