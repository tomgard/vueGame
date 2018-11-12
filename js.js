var game;
$(function() {
    game = new Vue({
        el: '#gameContainer',
        data: {
            display:'none',
            player: "sprites/mage_m.png",
            playerRow: 2,
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
            direction: "down"
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
            }
        },
        mounted:  function(){
            this.display = "block";
            $("#control").focus();
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
                var direction = event.key.replace("Arrow","");
                if(directionChange){
                    if(direction == this.direction) {
                        var newX = this.x + directionChange.x;
                        var newY = this.y + directionChange.y;
                        this.x = newX > -1 && newX + this.screenWidth < this.mapWidth+1? newX : this.x;
                        this.y = newY > -1 && newY + this.screenHeight < this.mapHeight+1? newY : this.y;
                    }
                    this.direction = event.key.replace("Arrow","");
                    this.playerRow = directionChanges[event.key].spritePos;
                }
            }
        }
    });
    $("#control").blur(function() {this.focus()});
});