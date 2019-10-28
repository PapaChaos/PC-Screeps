

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
        
        if(creep.memory.attacker === undefined)// <---- memory makes the soldier move to flag.
        {
            creep.memory.attacker = false; 
        }
        creep.memory.attacker = true;
        
        
        
        const targetRoom = Game.flags.attack1; //Game.flags.expansion1 <--- set up flag name
        const targetSpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        
        //creep.say(creep.memory.roleIcon);
        
        const enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        const enemyTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{filter: (enemyTower) =>{ return(
                enemyTower.structureType == STRUCTURE_TOWER
            )}});
            
        const enemyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) =>{ return(
                structure.structureType != STRUCTURE_CONTROLLER &&
                structure.structureType != STRUCTURE_ROAD)}});
        
        if(creep.memory.attacker)
        {
            if(targetRoom && creep.room != targetRoom.room)
            {
                creep.moveTo(targetRoom);
            }
            else if(creep.room == targetRoom.room && enemies.length < 1)
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
                creep.say(creep.memory.roleIcon);
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
                creep.say(creep.memory.roleIcon);
            }
        }
        
        if(enemy)
        {
            console.log(creep.name," is attacking an enemy.");
            if(creep.memory.soldierType == 'melee')
            {
                if(creep.attack(enemy) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(enemy);
                }
            }
            else if(creep.memory.soldierType == 'ranger')
            {
                if(creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(enemy);
                }
                else if (creep.rangedAttack(enemy) != ERR_NOT_IN_RANGE && creep.pos.getRangeTo(enemy) < 3){
                    creep.moveTo(Game.flags.fallback);
                }
            }
            
            creep.say(creep.memory.roleIcon,' - 💢');
                
        }
        else if(enemies.length > 0)
        {
            console.log(creep.name," is attacking a group of enemy.");
            if(creep.memory.soldierType == 'melee')
            {
                if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(enemies[0]);
                }
            }
            else if(creep.memory.soldierType == 'ranger')
            {
                if(creep.rangedAttack(enemies[0]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(enemies[0]);
                }
            }
            
            creep.say(creep.memory.roleIcon,' - 💢');
                
        }
        else if(enemyTower)
        {
            if(creep.attack(enemyTower) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(enemyTower);
            }
            creep.say(creep.memory.roleIcon,' - 💢 Tower');
        }
        
        else if(targetSpawn.length)
        {
            if(creep.attack(targetSpawn[0]) == ERR_NOT_IN_RANGE)
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