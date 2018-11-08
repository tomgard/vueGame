var game;
$(function() {
    game = new Vue({
        el: '#gameContainer',
        data: {
            display:'none',
            tileSize: map.tilesets[0].tilewidth,
            x: 0,
            y: 0,
            screenWidth: 13,
            screenHeight: 9,
            offScreenBuffer: 1,
            mapWidth: map.canvas.width / map.tilesets[0].tilewidth,
            mapHeight: map.canvas.height / map.tilesets[0].tileheight,
            imageWidth: map.tilesets[0].imagewidth / map.tilesets[0].tilewidth,
            imageHeight: map.tilesets[0].imageheight / map.tilesets[0].tilewidth
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
                    ArrowUp:     {x:0,   y:-1},
                    ArrowDown:   {x:0,   y:1},
                    ArrowLeft:   {x:-1,   y:0},
                    ArrowRight:  {x:1,   y:0}
                }
                var directionChange = directionChanges[event.key];
                var newX = this.x + directionChange.x;
                var newY = this.y + directionChange.y;
                this.x = newX > -1 && newX + this.screenWidth < this.mapWidth+1? newX : this.x;
                this.y = newY > -1 && newY + this.screenHeight < this.mapHeight+1? newY : this.y;
            }
        }
    });
    $("#control").blur(function() {this.focus()});
});