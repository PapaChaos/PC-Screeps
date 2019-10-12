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
                var containers = Game.flags.expansion1.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0});
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
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