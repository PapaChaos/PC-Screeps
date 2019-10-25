

var roleSoldier = 
{
    run: function(creep)
    {
        var bodyType = 0;
        
        if(!creep.memory.soldierType)
        {
            bodyType =  _.filter(creep.body, function(bp){return bp.type == HEAL;}).length;
            console.log('bodyType: ', bodyType);
            
            if(bodyType > 0)
            {
                creep.memory.soldierType = 'healer';
                creep.memory.roleIcon = '💉';
            }
            
            if(bodyType == 0)
            {

                bodyType =  _.filter(creep.body, function(bp){return bp.type == RANGED_ATTACK;}).length;
                if(bodyType > 0)
                {
                    creep.memory.soldierType = 'ranger';
                    creep.memory.roleIcon = '🏹';
                }

            }
            
            if (bodyType == 0)
            {
                bodyType =  _.filter(creep.body, function(bp){return bp.type == ATTACK;}).length;
                if(bodyType > 0)
                {
                    creep.memory.soldierType = 'melee';
                    creep.memory.roleIcon = '🔪';
                }
            }
        }

        if(!creep.memory.soldierType)
        {
            console.log(creep.name," soldier doesn't have relevant body!");
        }
        
        if(creep.memory.attacker === undefined)
        {
            creep.memory.attacker = false; // <---- makes the soldier move to flag.
        }
        
        var targetRoom; //Game.flags.expansion1 <--- set up flag name
        var targetSpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        
        creep.say(creep.memory.roleIcon);
        var enemy= creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
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
        if(enemy)
        {
            if(creep.attack(enemy) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(enemy);
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

module.exports = roleSoldier;