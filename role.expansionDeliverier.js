/*
TODO:
-Merge into deliverier.
*/
// Role icon: 🚚
var roleExpansionDeliverier = {
    run: function(creep) 
    {
        if(creep.memory.delivering === undefined){
            creep.memory.delivering = false; 
        }

        if((creep.carry.energy < creep.carryCapacity) && creep.memory.delivering == false){
            if(creep.room == Game.flags.expansion1.room)
            {
                creep.say("🚚");
                
                var dropedResources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                
                var containers = Game.flags.expansion1.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0});
                console.log("containers in expansion1: ",containers);
                if(containers.length > 0){
                var stored_resources = _.filter(Object.keys(containers[0].store), resource => containers[0].store[resource] > 0)    
            }
                var tombstones = creep.room.find(FIND_TOMBSTONES, { filter: (Tombstone) => { return (	
									Tombstone.store[RESOURCE_ENERGY] > 0
                    )}});
                if(dropedResources)
                {
                    creep.say('🚚 - 🎇');
                    if(creep.pickup(dropedResources) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(dropedResources.pos)
                    }
                }
	            else if (tombstones.length > 0)
                {
                    if(creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.say('Tombstone');
                        creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
	            }
	            
	            else if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
	            //else if(creep.withdraw(containers[0], stored_resources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(containers[0]);
                }
            }
            else
            {
                creep.say("🚚");
                creep.moveTo(Game.flags.expansion1);
            }
        }
        else if (creep.carry.energy == 0)
        {
            creep.memory.delivering = false;
        }
        else if((creep.carry.energy == creep.carryCapacity) || creep.memory.delivering) 
        {
            creep.memory.delivering = true;
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                    creep.moveTo(Game.spawns['Spawn1']);
                    creep.say("🚚");
            }
            else
            {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>{ return(
                                structure.structureType == STRUCTURE_EXTENSION || 
				                structure.structureType == STRUCTURE_SPAWN) &&
				                structure.energy < structure.energyCapacity;
                }});
                
                
                var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES,{
                        filter: (structure) =>{
                            return (structure.structureType == STRUCTURE_CONTAINER || 
                            structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }})

                if(target) 
                {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say("🚚");
                    }
                }
                    
                else if(containers.length > 0) 
                {
                    if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say("🚚");
                    }
                }
            }
        }
    }
};
module.exports = roleExpansionDeliverier;