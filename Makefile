build-image:
	docker build -t nft-minter -f ./infra/.dockerfile . --no-cache

run-with-docker:
	docker run -p 3000:3000 -d --name NftMinter nft-minter
	
open-browser:
ifeq ($(OS), Windows_NT)
	start "http://localhost:3000"
else ifeq ($(OS),Darwin)
	open "http://localhost:3000"
else 
	$(error Unsupported operating system)
endif