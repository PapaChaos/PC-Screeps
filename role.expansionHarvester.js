/*
TODO:
-Merge into harvester.
*/

var roleExpansionHarvester = 
{
    run: function(creep) 
    {
        var targetFlag = Game.flags.expansion1;
        
        
        
        if(creep.room == targetFlag.room)
        {
            var targetContainer = Game.getObjectById('5da02d3fc73df5000105dd3f');
            
            creep.memory.sourceMining = 0;
            
            var damagedContainers = creep.room.find(FIND_STRUCTURES,{filter: (structure) =>{ return (
                        structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
            }});

            damagedContainers.sort((a,b) => a.hits - b.hits);
                    
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            if(targets.length && (creep.carry.energy > 0) && !creep.memory.harvesting)
            {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say("dfsd");
                }
            }

            else if((targetContainer.hits < targetContainer.hitsMax) && creep.carry.energy > 0)
            {
                if(creep.repair(targetContainer) == ERR_NOT_IN_RANGE )
                {
                    creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});  
                    creep.say("sdf");
                }
                
                else if(creep.repair(targetContainer) == -6 )
                {
                    if(creep.transfer(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            
	        else if(creep.carry.energy < creep.carryCapacity) 
	        {
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.harvesting = true; 
                 creep.say("d534g");
                if(sources[creep.memory.sourceMining].energy == 0)
                {
                    creep.say("⏳");
                }
                
                else if(creep.harvest(sources[creep.memory.sourceMining]) == 0)
                {
                    creep.say("⛏");
                }
                
                else if(creep.harvest(sources[creep.memory.sourceMining]) == ERR_NOT_IN_RANGE) 
                {
                    creep.say("⛏");
                    creep.moveTo(sources[creep.memory.sourceMining], {visualizePathStyle: {stroke: '#fcff33'}});
                }
            }

            else if (creep.carry = creep.carryCapacity)
            {
                creep.memory.harvesting = false;
                 creep.say("dfki876");
                var containers = creep.room.find(FIND_STRUCTURES,{
                    filter: (structure) =>{
                        return (
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }});

                if(creep.transfer(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        }
	        else
            {
                creep.say('😴');
            }
        }
        else
        {
            creep.moveTo(targetFlag);
        }
    }
};

module.exports = roleExpansionHarvester;