TIMEOUT = 15000
test:
	mocha -t $(TIMEOUT)

cov test-cov:
	./node_modules/.bin/istanbul cover _mocha -- -t $(TIMEOUT)

.PHONY: test cov test-cov
