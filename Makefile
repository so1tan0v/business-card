.PHONY: run stop restart logs build publish

IMAGE_NAME := so1tan0v/about-me-app

default: help

help:
	@echo "Usage: make <target>"
	@echo "Targets:"
	@echo "  run - Run the application"
	@echo "  stop - Stop the application"
	@echo "  restart - Restart the application"
	@echo "  logs - Show the application logs"
	@echo "  build - Build the application"
	@echo "  publish - Publish the application"
	@echo "  help - Show this help message"

run:
	docker-compose up -d --build

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d --build

logs:
	docker-compose logs -f

build:
	docker build -t $(IMAGE_NAME) .

publish:
	docker push $(IMAGE_NAME)
