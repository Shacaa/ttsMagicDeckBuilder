# TTS Magic Deck Builder

## Requirements
- [Nodjs +v14.15.1](https://nodejs.org/en/) (npm included)
- [GraphicsMagick +v1.3.35](http://www.graphicsmagick.org/)

## Run
- Input your deck list in deck.txt in this format (MTGGoldfish format) **(Must be 60 cards)**:
```
4 Lightning Bolt
10 Mountain
...
```
- Install npm dependencies:
```
$ npm ci
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
Width: 7 (width of cards in grid)
Height: 9 (height of cards in grid)
Number: 63 (amount of cards in grid)
```
- Remove the extra back cards from your deck
- Done!
