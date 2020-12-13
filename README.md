# TTS Magic Deck Builder

## Requirements
- [Nodjs +v14.15.1](https://nodejs.org/en/) (npm included)
- [GraphicsMagick +v1.3.35](http://www.graphicsmagick.org/)

## Run
- Install npm dependencies (only needs to be done once):
```
$ npm ci
```
- Input your deck list in deck.txt in this format (MTGGoldfish format) **(Must be 60, 15, or 4 cards)**:
```
4 Lightning Bolt
10 Mountain
...
```
- Run:
```
$ node index.js
```
- All card images will be saved in cardImages/, deck grid will be saved in deck.png ready to import into TTS

## Import deck into TTS
- Spawn a blank deck going to Objects>Components>Custom>Deck
- Right click on blank deck and fulfill the fields:
```
Face: select deck grid image (deck.png)
Back: select cardBack.png (or any you want with same card dimensions)
if 60 cards:
    Width: 9 (width of cards in grid)
    Height: 7 (height of cards in grid)
    Number: 63 (amount of cards in grid)
if 15 cards:
    Width: 4 (width of cards in grid)
    Height: 4 (height of cards in grid)
    Number: 16 (amount of cards in grid)
if 4 cards:
    Width: 2 (width of cards in grid)
    Height: 3 (height of cards in grid)
    Number: 6 (amount of cards in grid)
```
- Remove the extra back cards from your deck
- Done!

## Playset and backside of double sided cards
If you try to build a deck grid of 4 cards (playset) if the cards are simple it will print them normally, if one of them 
is double sided it will print their backside. This gives you the possibility to have the backside of the 
card when you play and have to flip the "original".
