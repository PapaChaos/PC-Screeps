var roomMemories = {

    run: function() 
    {
        for(var roomName in Game.rooms)
        {
            /*var room = Game.rooms[roomName];
            var harvesters = _.filter(room.creeps, (creep) => creep.memory.role == 'harvester');
            //var harvesters = _(room.creeps).filter({memory: { role: 'harvester', role: 'expansionHarvester'}});
            
            console.log(room.name,'harvesters: ', harvesters.length);*/
        }
    }
};
module.exports = roomMemories;