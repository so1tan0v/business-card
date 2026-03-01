.PHONY: run stop restart logs

run:
	docker-compose up -d --build

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d --build

logs:
	docker-compose logs -f