IMAGE_NAME=nft-minter
DOCKERFILE_PATH=./infra/Dockerfile
DOCKERFILE_DEV_PATH=./infra/Dockerfile-dev
COMPOSE_FILE=./docker-compose.yaml

build-image:
	npm run build
	docker build -t $(IMAGE_NAME) -f $(DOCKERFILE_PATH) . --no-cache

build-dev:
	docker build -t $(IMAGE_NAME)-dev -f $(DOCKERFILE_DEV_PATH) . --no-cache
	
run-with-docker:
	docker run -p 3000:80 --name $(IMAGE_NAME)-dev $(IMAGE_NAME)-dev

down:
	docker-compose down --remove-orphans

.PHONY: run
run:
	make down
	npm run build
	docker-compose --file $(COMPOSE_FILE) up -d --build
	
open-browser:
ifeq ($(OS), Windows_NT)
	start "http://localhost:3000"
else ifeq ($(OS),Darwin)
	open "http://localhost:3000"
else 
	$(error Unsupported operating system)
endif