DATE=$(shell date +%I:%M%p)

all:
	grunt

build:
	grunt build

dev:
	grunt dev

run:
	grunt dev

server:
	grunt dev
