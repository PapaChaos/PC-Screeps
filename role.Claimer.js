var roleClaimer = {
{
    run: function(creep)
    {
        var targetRoom;
        creep.say('🔪');
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
            if(creep.attack(enemyStructure) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(enemyStructure);
            }
        }

    }
};

module.exports = roleClaimer;