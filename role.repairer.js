/*
TODO:

*/

var roleRepairer = 
{
    run: function(creep)
    {

        if(creep.carry.energy == 0)
        {
            creep.memory.repairTarget = null; 
        }
        
        if(creep.carry.energy < creep.carryCapacity && !creep.memory.repairTarget)
        {
            var containers = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && 
                        structure.store[RESOURCE_ENERGY] > creep.carryCapacity;
                }
                             
            })
            if(containers.length > 0)
            {
                if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(containers[0],{visualizePathStyle: {stroke: '#ffffff'}})
                creep.say('Container');
                }
            }
            else
            {
               var sources = creep.room.find(FIND_SOURCES_ACTIVE);

                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else if(creep.carry.energy > 0 && !creep.memory.repairTarget)
        {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) 
            {
                creep.memory.repairTarget = targets[0];
                creep.say('Finding');
            } 
        }
        else if(creep.memory.repairTarget)
        {
            if(creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_INVALID_TARGET ||
               creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_NOT_ENOUGH_RESOURCES)
            {
                creep.say('Invalid');
                creep.memory.repairTarget = null;
            }
            else if((Game.getObjectById(creep.memory.repairTarget.id)).hits == (Game.getObjectById(creep.memory.repairTarget.id)).hitsMax){
                creep.memory.repairTarget = null;
                creep.say('Done');
            }
            
            else if(creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_NOT_IN_RANGE )
            {
                creep.moveTo(Game.getObjectById(creep.memory.repairTarget.id), {visualizePathStyle: {stroke: '#ffffff'}});  
            }

        }
        else
        {
            creep.moveTo(30,20, {visualizePathStyle: {stroke: '#ffaa00'}});
            creep.say('😴');
        }
	}
};

module.exports = roleRepairer;