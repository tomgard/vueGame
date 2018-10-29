function buildContainer(rows,columns,tileSize){
	var content = [];
	for(var r=0;r<rows;r++){
		for(var c=0;c<columns;c++){
			content.push({
                message: '123'
            });
		}
	}
	return content;
}

$(function() {
    var gameContainer = new Vue({
      el: '#gameContainer',
      data: {
        items: [],
        height:8,
        width:8
      }
    });
    
    gameContainer.items = buildContainer(9,13,16);
});

