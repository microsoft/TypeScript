TYPESCRIPT_URL = https://github.com/Microsoft/TypeScript.git \

.PHONY: install
install:
	npm install -g typescript

.PHONY: build
build:
	git clone $(TYPESCRIPT_URL)
		&& cd TypeScript \
		&& npm install -g jake \
		&& npm install

.PHONY: usage
usage:
	node built/local/tsc.js hello.ts
