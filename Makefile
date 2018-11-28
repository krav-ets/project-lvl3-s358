run-hexlet:
	npx babel-node -- src/bin/page-loader.js -o /var/tmp https://hexlet.io/courses

run-ozon:
	npx babel-node -- src/bin/page-loader.js -o /var/tmp https://www.ozON.ru/context/detail/id/5322055/

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
