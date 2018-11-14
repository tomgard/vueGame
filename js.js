var game;
$(function() {
    game = new Vue({
        el: '#gameContainer',
        data: {
            display:'none',
            player: "sprites/mage_m.png",
            playerRow: 1,
            fps: 25,
            tileSize: map.tilesets[0].tilewidth,
            x: 0,
            y: 0,
            screenWidth: 13,
            screenHeight: 9,
            offScreenBuffer: 1,
            mapWidth: map.canvas.width / map.tilesets[0].tilewidth,
            mapHeight: map.canvas.height / map.tilesets[0].tileheight,
            imageWidth: map.tilesets[0].imagewidth / map.tilesets[0].tilewidth,
            imageHeight: map.tilesets[0].imageheight / map.tilesets[0].tilewidth,
            direction: "down",
            screenShift: 0,
            tickStarted: false
        },
        computed: {
            screenWidthPixels: function () {
                return this.screenWidth * this.tileSize;
            },
            items: function () {
                var content = [];
                for(var r = this.y; r < this.screenHeight+this.y; r++){
                    for(var c = this.x; c < this.screenWidth+this.x; c++){
                        content.push(this.getMapFromIndex( c + ( r * this.mapWidth ) ) );
                    }
                }
                return content;
            },
            stepPosition: function() {
                var positions = [
                    -16,-16,0,0,-16,-16,-32,-32,
                    -16,-16,0,0,-16,-16,-32,-32
                ];
                return positions[this.screenShift];
            },
            screenShiftMovementY: function() {
                var change = {
                    up: -1,
                    down: 1,
                    left: 0,
                    right: 0
                }
                return this.screenShift * change[this.direction.toLowerCase()];
            },
            screenShiftMovementX: function() {
                var change = {
                    left: -1,
                    right: 1,
                    up: 0,
                    down: 0
                }
                return this.screenShift * change[this.direction.toLowerCase()];
            }
        },
        mounted:  function(){
            this.display = "block";
            $("#control").focus();
            if(!this.tickStarted){this.startTick();}
        },
        methods: {
            getMapFromIndex: function(index) {
                var mapTile = map.layers[0].data[index];
                return {
                    column: Math.floor(mapTile),
                    row : mapTile.toString().includes(".")? mapTile.toString().split(".")[1]:0
                };
            },
            keyDown: function(event) {
                var directionChanges = {
                    ArrowUp:     {x:0,   y:-1, spritePos: 0},
                    ArrowDown:   {x:0,   y:1,  spritePos: 2},
                    ArrowLeft:   {x:-1,  y:0,  spritePos: 3},
                    ArrowRight:  {x:1,   y:0,  spritePos: 1}
                }
                var directionChange = directionChanges[event.key];
                var direction = event.key.replace("Arrow","").toLowerCase();
                if(directionChange && this.screenShift === 0){
                    if(direction === this.direction.toLowerCase()) {
                        var newX = this.x + directionChange.x;
                        var newY = this.y + directionChange.y;
                        if(newX > -1 && newX + this.screenWidth < this.mapWidth+1 && newY > -1 && newY + this.screenHeight < this.mapHeight+1){
                            this.screenShift = 16;
                            this.x = newX;
                            this.y = newY;
                        }
                    }
                    this.direction = event.key.replace("Arrow","");
                    this.playerRow = directionChanges[event.key].spritePos;
                }
            },
            startTick: function() {
                this.tickStarted = true;
                setInterval(function(){
                    console.log(game.screenShiftMovementY+" "+game.screenShiftMovementX);
                    if(game.screenShift !== 0){
                        if(game.screenShift > 0) {
                            game.screenShift--;
                        } else {
                            game.screenShift++;
                        }
                    }
                } , (1000/25) );
            }
        }
    });
    $("#control").blur(function() {this.focus()});
});