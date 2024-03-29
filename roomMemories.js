var roomMemories = 
{
    run: function()
    {
        //Lets first add a shortcut prototype to the sources memory:
        Source.prototype.memory = undefined;

        for(var roomName in Game.rooms)//Loop through all rooms your creeps/structures are in
        {
        
            var room = Game.rooms[roomName];
            const sources = room.find(FIND_SOURCES);//Find all sources in the current room
            if(!room.memory.sources)//If this room has no sources memory yet
            {
                room.memory.sources = {}; //Add it
                
                
                for(var i in sources)
                {
                    var source = sources[i];
                    source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
                    //Now you can do anything you want to do with this source
                    //for example you could add a worker counter:
                    source.memory.workers = 0;
                }
            }
            else//The memory already exists so lets add a shortcut to the sources its memory
            { 
                //var sources = room.find(FIND_SOURCES);//Find all sources in the current room
                /*
                sources.forEach(function(source)
                {
                    source.memory = this.memory.sources[source.id]; //Set the shortcut
                });*/
                if(sources)
                {
                    for(var i in sources)
                    {
                        var source = sources[i];
                        source.memory = room.memory.sources[source.id]; //Set the shortcut
                    }
                }
            }
        }
    }
};
module.exports = roomMemories;