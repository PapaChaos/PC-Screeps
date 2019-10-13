var roleClaimer = 
{
    run: function(creep)
    {
        var targetRoom = Game.flags.expansion1.room;
        var reserve = true;
        var claim = false;
        
        creep.say('🚩');
        var enemyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) =>{ return(
                structure.structureType == STRUCTURE_CONTROLLER)}});
        
        if(targetRoom)
        {
            creep.moveTo(targetRoom);
        }

        else if(!targetRoom && (creep.room != Game.spawns['Spawn1'].room))
        {
            creep.moveTo(Game.spawns['Spawn1']);
        }
        else if (!targetRoom && (creep.room == Game.spawns['Spawn1'].room))
        {
            creep.moveTo(38,22);
        }
        
        else if(enemyStructure)
        {
            if(reserve)
            {
                if(creep.reserveController(enemyStructure) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(enemyStructure);
                }
            }
            if(claim)
            {
                if(creep.claimController(enemyStructure) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(enemyStructure);
                }
            }
        }
    }
};

module.exports = roleClaimer;