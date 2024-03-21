all: dist/out.js

tmp/define.js: lib/define.ts
	npx tsc lib/define.ts --lib es2015,dom --outDir tmp

tmp/out.js: src/*.ts
	npx tsc

dist/out.js: lib/meta.js tmp/define.js tmp/out.js
	mkdir -p dist
	cat lib/meta.js tmp/define.js tmp/out.js > dist/out.js

watch:
	while true; do \
		$(MAKE) $(WATCHMAKE); \
		inotifywait -qre close_write .; \
	done
