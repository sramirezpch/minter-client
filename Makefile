IMAGE_NAME=nft-minter
DOCKERFILE_PATH=./infra/Dockerfile
COMPOSE_FILE=./docker-compose.yml

build-image:
	docker build -t $(IMAGE_NAME) -f $(DOCKERFILE_PATH) . --no-cache

run-with-docker:
	docker run -p 3000:3000 -d --name nft-minter $(IMAGE_NAME)

down:
	docker-compose down --remove-orphans

.PHONY: run
run:
	make down
	docker-compose --file $(COMPOSE_FILE) up -d --build
	
open-browser:
ifeq ($(OS), Windows_NT)
	start "http://localhost:3000"
else ifeq ($(OS),Darwin)
	open "http://localhost:3000"
else 
	$(error Unsupported operating system)
endif