/*
TODO:

*/
// Role Icon: 🚩

var roleClaimer = 
{
    run: function(creep)
    {
        var targetRoom = Game.flags.attack2;
        var reserve = false;
        var claim = true;
        


        if(targetRoom && creep.room != targetRoom.room)
        {
            creep.say('🚩');
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
            //creep.moveTo(targetRoom);
            
            var enemyStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>{ return(
            structure.structureType == STRUCTURE_CONTROLLER)}});

            if(enemyStructure)
            {
                if(reserve)
                {
                    if(creep.reserveController(enemyStructure) == ERR_NOT_IN_RANGE)
                    {
                       creep.moveTo(enemyStructure);

                    }
                    else
                    {
                        creep.reserveController(enemyStructure);
                    }
                    
                    creep.say('🚩');
                }
                if(claim)
                {
                    if(enemyStructure.level == 0)//check if controller is neutral
                    {
                        if(creep.claimController(enemyStructure) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(enemyStructure);
                            creep.say('🚩');
                        }
                    }
                    else
                    {
                        //creep.say("waiting on next attack");
                        if(creep.attackController(enemyStructure) == ERR_NOT_IN_RANGE) //can only be attacked once every 1000 ticks.
                                        {
                            creep.moveTo(enemyStructure);
                            creep.say('🚩');
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;