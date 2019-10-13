/*
TODO:

*/
//Role Icon: 🔧 🛠
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            
	    }
	    else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🔨 - 🚧');
	    }

	    if(creep.memory.building) 
	    {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) 
            {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                
                creep.moveTo(31,21, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('🔨 - 😴');
            }
	    }
	    else 
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
                creep.moveTo(22,25, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('🔨 - 😴');
            }
        }
	}
};

module.exports = roleBuilder;