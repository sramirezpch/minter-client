IMAGE_NAME=nft-minter
DOCKERFILE_PATH=./infra/Dockerfile
COMPOSE_FILE=./docker-compose.yml

build-image:
	docker build -t nft-minter -f ./infra/.dockerfile . --no-cache

run-with-docker:
	docker run -p 3000:3000 -d --name NftMinter nft-minter

down:
	docker-compose down --remove-orphans

.PHONY: run
run:
	make down
	docker-compose --file $(DOCKER_COMPOSE) up -d --build
	
open-browser:
ifeq ($(OS), Windows_NT)
	start "http://localhost:3000"
else ifeq ($(OS),Darwin)
	open "http://localhost:3000"
else 
	$(error Unsupported operating system)
endif