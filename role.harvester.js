/*
TODO:

*/
// Role icon: ⛏ 
var roleHarvester = {

    run: function(creep) {
        var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester' && creep.memory.sourceMining == 0));
        
       /* var source = creep.pos.findClosest(FIND_SOURCES, 
        {
            filter: function(source)
            {
                return source.memory.workers < 2; //Access this sources memory and if this source has less then 2 workers return this source
            }
        });
        if(source)
        { //If a source was found
            creep.moveTo(source);
            creep.harvest(source);
            source.memory.workers += 1;
            // You should also increment the sources workers amount somehow, 
            // so the code above will know that another worker is working here. 
            // Be aware of the fact that it should only be increased once!
            // But I will leave that to the reader.
            
        }
        */
        
        creep.memory.sourceMining = 1;
        
	    if(creep.carry.energy < creep.carryCapacity) 
	    {
                var sources = creep.room.find(FIND_SOURCES);
                if(sources[creep.memory.sourceMining].energy == 0)
                {
                    creep.say("⛏ - ⏳");
                }
                else if(creep.harvest(sources[creep.memory.sourceMining]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[creep.memory.sourceMining], {visualizePathStyle: {stroke: '#fcff33'}});
                }
                creep.say('⛏ - 🌟');
        }

        else if (creep.carry = creep.carryCapacity){
            creep.memory.harvesting = false; 
             var deliverieres = _.filter(Game.creeps, (creep) => creep.memory.role == 'deliverier');
	         if(deliverieres.length < 1)
	         {
	            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (	structure.structureType == STRUCTURE_EXTENSION || 
									structure.structureType == STRUCTURE_SPAWN) &&
									structure.energy < structure.energyCapacity;
                    }
            });
             var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (	structure.structureType == STRUCTURE_TOWER) &&
									structure.energy < structure.energyCapacity;
                    }
            });
            var containers = creep.room.find(FIND_STRUCTURES,{
                filter: (structure) =>{
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }}
                )
            var deliveriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'deliverier' && !creep.memory.readyForDelivery);

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(towers.length > 0){
                                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }}
            else if(containers.length > 0) {
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
                else if(deliverieres.length > 0)
            {
                creep.say("⛏ - ⏳");
            }
        }
	}
};

module.exports = roleHarvester;