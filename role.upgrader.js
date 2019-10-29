/*
TODO:

*/
// Role icon: ⚡ 
var roleUpgrader = 
{

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        var targetFlag = 'expansion';
        if(creep.memory.targetFlag === undefined)// <---- memory makes the soldier move to flag.
        {
            creep.memory.targetFlag = 0; 
        }

        targetFlag += creep.memory.targetFlag;
        console.log('targetFlag is: ',targetFlag);
        
        if(creep.memory.targetFlag == 0 && creep.room != Game.spawns.Spawn1.room)
        {
            creep.moveTo(Game.spawns.Spawn1)
        }
        else if(creep.memory.targetFlag == 1 && creep.room != Game.flags.expansion1.room)
        {
            creep.say('⚡ moving');
            creep.moveTo(Game.flags.expansion1);
        }
        
        else
        {
            if(creep.memory.upgrading && creep.carry.energy == 0) 
            {
                creep.memory.upgrading = false;
                creep.say('🔄 Container');
	        }
            else if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) 
            {
	            creep.memory.upgrading = true;
	            creep.say('⚡ upgrade');
	        }

	        else if(creep.memory.upgrading) 
	        {
	            creep.say('⚡ upgrading');
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else 
            {
                var containers = creep.room.find(FIND_STRUCTURES,
                {
                    filter: (structure) =>
                    {
                        return (
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_CONTAINER) && 
                            structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                     }
                             
                })
                
                if(containers.length > 0)
                {
                    if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(containers[0],{visualizePathStyle: {stroke: '#ffffff'}})
                        creep.say('Container');
                    }
                }
                
                else if(containers.length == 0)
                {
                    if(creep.carry.energy < creep.carryCapacity) 
	                {
                        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                        // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#fcff33'}});
                        }
                    }

                }
                else
                {
                    creep.moveTo(31,23, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say('Waiting');
                }
           }
        }
    }
};

module.exports = roleUpgrader;