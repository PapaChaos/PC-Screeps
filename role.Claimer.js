var roleClaimer = 
{
    run: function(creep)
    {
        var targetRoom = Game.flags.expansion1;
        var reserve = true;
        var claim = false;
        


        if(targetRoom)
        {
            //creep.moveTo(targetRoom);
            creep.moveTo(targetRoom, {visualizePathStyle: {stroke: '#ffffff'}});
            
        }
        else if(!targetRoom && (creep.room != Game.spawns['Spawn1'].room))
        {
            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            creep.say('🚩');
        }
        else if (!targetRoom && (creep.room == Game.spawns['Spawn1'].room))
        {
            creep.moveTo(38,22);
            creep.say('🚩');
        }

        if(creep.room == targetRoom.room)
        {
            creep.moveTo(targetRoom);
            
            var enemyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) =>{ return(
            structure.structureType == STRUCTURE_CONTROLLER)}});
            if(enemyStructure)
            {
                if(reserve)
                {
                    if(creep.reserveController(enemyStructure) == ERR_NOT_IN_RANGE)
                    {
                       creep.moveTo(enemyStructure);
                       creep.say('🚩');
                    }
                }
                if(claim)
                {
                    if(creep.claimController(enemyStructure) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(enemyStructure);
                        creep.say('🚩');
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;