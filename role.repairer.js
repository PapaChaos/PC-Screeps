/*
TODO:

*/
// role icon: 🔧
var roleRepairer = 
{
    run: function(creep)
    {

        if(creep.carry.energy == 0)
        {
            creep.say('🔧');
            creep.memory.repairTarget = null; 
        }

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.repairTarget)
        {
            var containers = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                {
                    return (
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_CONTAINER) && 
                        structure.store[RESOURCE_ENERGY] > creep.carryCapacity;
                }
                             
            })
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if(containers.length > 0)
            {
                if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(containers[0],{visualizePathStyle: {stroke: '#ffffff'}})
                creep.say('🔧 Container');
                }
            }
            else
            {
               var sources = creep.room.find(FIND_SOURCES_ACTIVE);

                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                creep.say('🔧 - ⛏ ');
            }
        }
        else if(creep.pos.x == 49)
        {
            creep.moveTo(48, creep.pos.y);
        }
        else if(creep.carry.energy > 0 && !creep.memory.repairTarget)
        {
            const targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) =>
                { 
                    return (
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax;
                }
            })


            targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
            
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if(targets.length > 0) 
            {
                creep.memory.repairTarget = targets[0];
                creep.say('Finding');
            } 
            else
            {
                const targets = creep.room.find(FIND_STRUCTURES, 
                {
                    filter: (structure) =>
                    { 
                        return (
                            structure.structureType == STRUCTURE_WALL ||
                            structure.structureType == STRUCTURE_RAMPART) &&
                            structure.hits < structure.hitsMax;
                    }
                })
                if(targets.length > 0) 
                {
                    creep.memory.repairTarget = targets[0];
                    creep.say('Finding');
                }
            }
        }
        else if(creep.memory.repairTarget)
        {
            if(creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_INVALID_TARGET ||
               creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_NOT_ENOUGH_RESOURCES)
            {
                creep.say('🔧 - Invalid');
                creep.memory.repairTarget = null;
            }
            else if((Game.getObjectById(creep.memory.repairTarget.id)).hits == (Game.getObjectById(creep.memory.repairTarget.id)).hitsMax){
                creep.memory.repairTarget = null;
                creep.say('🔧 - Done');
            }
            
            else if(creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_NOT_IN_RANGE )
            {
                creep.moveTo(Game.getObjectById(creep.memory.repairTarget.id), {visualizePathStyle: {stroke: '#ffffff'}});  
            }

        }
        else
        {
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else
            {
                creep.moveTo(30,20, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('🔧 - 😴');
            }
        }
	}
};

module.exports = roleRepairer;