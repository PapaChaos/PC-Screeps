/*
TODO:
-Merge into harvester.
*/
// Role icon: ⛏ 
var roleExpansionHarvester = 
{
    run: function(creep) 
    {
        var targetFlag = Game.flags.expansion1;
        
        if(creep.room == targetFlag.room)
        {
            creep.memory.sourceMining = 0;
            
            var damagedContainers = creep.room.find(FIND_STRUCTURES,{filter: (structure) =>{ return (
                        structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
            }});

            damagedContainers.sort((a,b) => a.hits - b.hits);
                    
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            
                var containers = creep.room.find(FIND_STRUCTURES,{
                    filter: (structure) =>{
                        return (
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }});
                    
                var closestContainers = _.sortBy(containers, c => creep.pos.getRangeTo(c));
                
            if(targets.length && (creep.carry.energy > 0) && !creep.memory.harvesting)
            {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(damagedContainers.length > 0 && creep.carry.energy > 0 && !creep.memory.harvesting)
            {
                if(creep.repair(damagedContainers[0]) == ERR_NOT_IN_RANGE )
                {
                    creep.moveTo(damagedContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});  
                }
                
                else if(creep.repair(damagedContainers[0]) == -6 )
                {
                    if(creep.transfer(damagedContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(damagedContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else if(creep.carry.energy > 0 && !creep.memory.harvesting) 
            {
                if(creep.transfer(closestContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(closestContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	        else if(creep.carry.energy < creep.carryCapacity) 
	        {
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.harvesting = true; 
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

            else if (creep.carry.energy == creep.carryCapacity)
            {
                creep.memory.harvesting = false;
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