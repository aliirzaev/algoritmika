import pygame
from const import *
from lev import level
from Player import Player
pygame.init()

windows = pygame.display.set_mode(DISPLAY)
pygame.display.set_caption("Игра")
bg = pygame.Surface((WIN_WIDTH, WIN_HEIGHT))
bg.fill(pygame.Color((22, 0, 0)))


hero = Player(55,55)
left = right = False
up = False


while run:
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            run = False
        if e.type == pygame.KEYDOWN and e.key == pygame.K_UP:
            up = True
        if e.type == pygame.KEYDOWN and e.key == pygame.K_LEFT:
            left = True
        if e.type == pygame.KEYDOWN and e.key == pygame.K_RIGHT:
            right = True
        if e.type == pygame.KEYUP and e.key == pygame.K_UP:
            up = False
        if e.type == pygame.KEYUP and e.key == pygame.K_RIGHT:
            right = False
        if e.type == pygame.KEYUP and e.key == pygame.K_LEFT:
            left = False
    windows.blit(bg, (0, 0))
    x = y = 0
    for row in level:
        for col in row:
            if col == "-":
                pf = pygame.Surface((PLATFORM_WIDTH, PLATFORM_HEIGHT))
                pf.fill(pygame.Color(PLATFORM_COLOR))
                windows.blit(pf, (x, y))
            x += PLATFORM_WIDTH
        y += PLATFORM_HEIGHT
        x = 0

    hero.draw(windows)
    hero.update(left, right)

    pygame.display.update()
