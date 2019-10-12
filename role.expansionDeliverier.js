var roleExpansionDeliverier = {
    run: function(creep) 
    {
        if(creep.carry.energy < creep.carryCapacity){
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
        else
        {
             var targets = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (	structure.structureType == STRUCTURE_EXTENSION || 
									structure.structureType == STRUCTURE_SPAWN ||
									structure.structureType == STRUCTURE_TOWER ||
									structure.structureType == STRUCTURE_STORAGE) &&
									structure.energy < structure.energyCapacity;
                    }});
                    var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES,{
                        filter: (structure) =>{
                            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }})

                    if(targets.length > 0) 
                    {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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
};
module.exports = roleExpansionDeliverier;