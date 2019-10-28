var roleTank = 
{
    run: function(creep)
    {
            
        creep.memory.soldierType = 'tank';
        creep.memory.roleIcon = '🛡';

        if(creep.memory.attacker === undefined)// <---- memory makes the soldier move to flag.
        {
            creep.memory.attacker = false; 
        }
        creep.memory.attacker = true;
        
        
        
        var targetRoom = Game.flags.attack1; //Game.flags.expansion1 <--- set up flag name
        var targetSpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        
        //creep.say(creep.memory.roleIcon);
        //var enemy= creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        var enemyTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{filter: (enemyTower) =>{ return(
                enemyTower.structureType == STRUCTURE_TOWER
            )}});
        var enemyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) =>{ return(
                structure.structureType != STRUCTURE_CONTROLLER &&
                structure.structureType != STRUCTURE_ROAD)}});
        
        if(creep.memory.attacker)
        {
            if(targetRoom)
            {
                creep.moveTo(targetRoom);
            }

            else if(!targetRoom && (creep.room != Game.spawns['Spawn1'].room))
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if (!targetRoom && (creep.room == Game.spawns['Spawn1'].room))
            {
                creep.moveTo(37,35);
            }
        }
        else
        {
            if(creep.room != Game.spawns['Spawn1'].room)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if (creep.room == Game.spawns['Spawn1'].room)
            {
                creep.moveTo(16,20);
            }
        }
        if(enemies)
        {
            if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(enemies[0]);
            }
                creep.say(creep.memory.roleIcon,' - 💢');
        }
        else if(enemyTower){
            if(creep.attack(enemyTower) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(enemyTower);
            }
        
            creep.say(creep.memory.roleIcon,' - 💢');
        }
        

        else if(targetSpawn.length)
        {
            if(creep.attack(targetSpawn [0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targetSpawn[0]);
            }
        }
        
        else if(enemyStructure)
        {
            if(creep.attack(enemyStructure) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(enemyStructure);
            }
        }

    }
};

module.exports = roleTank;