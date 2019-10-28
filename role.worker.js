//Role Icon: 🔧 🛠
var roleWorker = 
{
    run: function(creep) 
    {
	    if(creep.carry.energy == 0) 
	    {
            creep.memory.building = false;
            creep.memory.repairTarget = false;
	    }
	    
	    else if(!creep.memory.building && !creep.memory.repairTarget && creep.carry.energy == creep.carryCapacity)
	    {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        if(targets)
	        {
	            creep.memory.building = true;
	            creep.say('🔨 - 🚧');
	        }
	    }

	    if(creep.memory.building) 
	    {
	        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        const targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) =>
                { 
                    return (
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax;
                }
            })


            targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
            if(targets.length) 
            {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else(!creep.memory.repairTarget)
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
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if(containers.length > 0)
            {
                if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(containers[0],{visualizePathStyle: {stroke: '#ffffff'}})
                creep.say('🔧 Container');
                }
            }
            else
            {
               var sources = creep.room.find(FIND_SOURCES_ACTIVE);

                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                creep.say('🔧 - ⛏ ');
            }
        }
        else if(creep.pos.x == 49)
        {
            creep.moveTo(48, creep.pos.y);
        }
        else if(creep.carry.energy > 0 && !creep.memory.repairTarget)
        {
            const targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) =>
                { 
                    return (
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax;
                }
            })


            targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
            
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if(targets.length > 0) 
            {
                creep.memory.repairTarget = targets[0];
                creep.say('Finding');
            } 
            else
            {
                const targets = creep.room.find(FIND_STRUCTURES, 
                {
                    filter: (structure) =>
                    { 
                        return (
                            structure.structureType == STRUCTURE_WALL ||
                            structure.structureType == STRUCTURE_RAMPART) &&
                            structure.hits < structure.hitsMax;
                    }
                })
                if(targets.length > 0) 
                {
                    creep.memory.repairTarget = targets[0];
                    creep.say('Finding');
                }
            }
        }
        else if(creep.memory.repairTarget)
        {
            if(creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_INVALID_TARGET ||
               creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_NOT_ENOUGH_RESOURCES)
            {
                creep.say('🔧 - Invalid');
                creep.memory.repairTarget = null;
            }
            else if((Game.getObjectById(creep.memory.repairTarget.id)).hits == (Game.getObjectById(creep.memory.repairTarget.id)).hitsMax){
                creep.memory.repairTarget = null;
                creep.say('🔧 - Done');
            }
            
            else if(creep.repair(Game.getObjectById(creep.memory.repairTarget.id)) == ERR_NOT_IN_RANGE )
            {
                creep.moveTo(Game.getObjectById(creep.memory.repairTarget.id), {visualizePathStyle: {stroke: '#ffffff'}});  
            }

        }
        else
        {
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else
            {
                creep.moveTo(30,20, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('🔧 - 😴');
            }
        }
	}
};

module.exports = roleWorker;