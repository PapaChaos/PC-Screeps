/*
TODO:
-Attack closest enemy.
*/

var roleMelee = 
{
    run: function(creep)
    {
        var targetRoom;
        var targetSpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        creep.say('🔪');
        var enemy= creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var enemyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) =>{ return(
                structure.structureType != STRUCTURE_CONTROLLER &&
                structure.structureType != STRUCTURE_ROAD)}});
        
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
            creep.moveTo(37,35);
        }
        if(enemy)
        {
            creep.moveTo(enemy);
            creep.attack(enemy);
            console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
        }
        

        else if(targetSpawn.length)
        {
            if(creep.attack(targetSpawn [0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targetSpawn[0]);
            }
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

module.exports = roleMelee;