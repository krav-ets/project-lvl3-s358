run-hexlet:
	npx babel-node -- src/bin/page-loader.js -o /var/tmp https://hexlet.io/courses

run-bifit:
	npx babel-node -- src/bin/page-loader.js -o /var/tmp http://www.bifit.com/ru/

run-err:
	npx babel-node -- src/bin/page-loader.js -o /var/tmp https://hexlet.io/cour

build:
	rm -rf dist
	npm run build

test:
	npm test

watch:
	npm test -- --watch

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
