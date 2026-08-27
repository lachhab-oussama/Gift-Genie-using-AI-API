all: build up

build:
	@ docker compose build

up:
	@ docker compose up -d

stop:
	@ docker compose stop

start:
	@ docker compose start

restart:
	@ docker compose restart

ps:
	@ docker compose ps

logs:
	@ docker compose logs -f

down:
	@ docker compose down

clean:
	@ docker compose down -v --rmi all

fclean: clean
	@ docker compose down -v --rmi all
	@ docker system prune -af

re: fclean all

.PHONY: all build up stop start restart ps logs down clean fclean re