/*
TODO:

*/

var roleDeliverier = 
{
    run: function(creep)
    {
	       if(creep.carry.energy == creep.carryCapacity)
	        {
	            creep.say('🚛');
	            creep.memory.readyForDelivery = true;
	        }
	        else if (!creep.memory.readyForDelivery)
	        {
	            var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester')  && creep.carry.energy == creep.carryCapacity);
	           	var harvesters2 = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester')  && creep.carry.energy > 0);
	           	var dropedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);

                var tombstones = creep.room.find(FIND_TOMBSTONES, 
                { filter: (Tombstone) => { return (	
									Tombstone.store[RESOURCE_ENERGY] > 0
                    )}});
                    /*
                let stored_resources = _.filter(Object.keys(tombstones.store), resource => 
                tombstones.store[resource] > 0)    
                creep.withdraw(creep.room.storage.store, stored_resources[0])*/


	            //creep.moveTo(7,21, {visualizePathStyle: {stroke: '#ffaa00'}});

	            if (tombstones.length > 0)
                {
                    if(creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.say('Tombstone');
                        creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
	            }

	            else if(harvesters.length > 0)
	            {
	                _.sortBy(creep, c => creep.pos.getRangeTo(c))
	                if(harvesters[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
	                {
                        creep.moveTo(harvesters[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🚛');
                    }
	            }

	            else if(dropedEnergy)
                {
                    creep.say('🚛 - 🎇');
                    //🎇
                    if(creep.pickup(dropedEnergy) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(dropedEnergy.pos)
                    }
                }
              

                else if (harvesters2.length > 0)
                {
                    	                _.sortBy(creep, c => c.carry)
                    	                //_.reverse(harvesters2);
                    	                harvesters2.reverse();
	                if(harvesters2[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
	                {
                        creep.moveTo(harvesters2[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🚛');
                    }
                }
	            else
	            {
	                creep.say("🚛 - 😴");
	                creep.moveTo(17,32, {visualizePathStyle: {stroke: '#ffaa00'}});
	            }
            }
           
                if(creep.carry.energy == 0)
                {
                    creep.memory.readyForDelivery = false;
                }
                else if(creep.memory.readyForDelivery)
                {


                    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (	structure.structureType == STRUCTURE_EXTENSION || 
									structure.structureType == STRUCTURE_SPAWN ) &&
									structure.energy < structure.energyCapacity;
                    }
                     });
                    
                    var containers = creep.room.find(FIND_STRUCTURES,{
                        filter: (structure) =>{
                            return (
                                structure.structureType == STRUCTURE_CONTAINER || 
                                structure.structureType == STRUCTURE_STORAGE) && 
                                structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }}
                    )
                                        var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (	structure.structureType == STRUCTURE_TOWER ) &&
									structure.energy < structure.energyCapacity;
                    }
                     });
                    var towersEmergency = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (	structure.structureType == STRUCTURE_TOWER ) &&
									structure.energy < (structure.energyCapacity*0.5);
                    }
                     });
                                        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                    if(targets.length > 0) 
                    {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else if (towersEmergency > 0)
                    {
                        if(creep.transfer(towersEmergency[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(towersEmergency[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }

                    else if(containers.length > 0) 
                    {
                        if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    
                    else if(towers.length > 0) 
                    {
                        if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
            
                    else if(builders.length > 0)
                    {
                        creep.say('transfer builder: '+builders.length.toString());
                        if(creep.transfer(builders[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(builders[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
        }
	}
};

module.exports = roleDeliverier;