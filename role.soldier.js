

var roleSoldier = 
{
    run: function(creep)
    {
        var bodyType = 0;
        var followerLeader = false;
        var retreat = false;
        if(!creep.memory.soldierType)
        {
            bodyType =  _.filter(creep.body, function(bp){return bp.type == HEAL;}).length;
            
            if(bodyType > 0)
            {
                creep.memory.soldierType = 'medic';
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
        

        
        var targetRoom = Game.flags.attack2; //Game.flags.expansion1 <--- set up flag name

        const targetSpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        
        //creep.say(creep.memory.roleIcon);
        
       const enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        const enemyTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{filter: (enemyTower) =>{ return(
                enemyTower.structureType == STRUCTURE_TOWER
            )}});
            
        const enemyStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) =>{ return(
                structure.structureType != STRUCTURE_CONTROLLER &&
                structure.structureType != STRUCTURE_ROAD &&
                structure.structureType != STRUCTURE_WALL 
                //&& structure.structureType != STRUCTURE_RAMPART
                )}});
        const enemyConstructionSite = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
        if(creep.memory.attacker)
        {

            if((targetRoom && (creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && creep.room == targetRoom.room) ||(targetRoom && creep.room != targetRoom.room) 
            || (!enemy && !enemyTower) //commentable to position creeps.
            )
            {
                creep.moveTo(targetRoom);
            }

            else if(creep.room == targetRoom.room && enemies.length < 1)
            {
                let leader = _.filter(Game.creeps, (creep) => (
                                                                creep.memory.role == 'tank'
                ));
                if (leader && followerLeader)
                {
                    creep.moveTo(leader[0]);
                }
                else if(creep.memory.soldierType == 'medic')
                {
                    creep.moveTo(targetRoom);
                }
            }
            else if(!targetRoom && (creep.room != Game.spawns['Spawn1'].room))
            {
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else if (!targetRoom && (creep.room == Game.spawns['Spawn1'].room))
            {
                creep.moveTo(37,35);
               // creep.say(creep.memory.roleIcon);
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
                //creep.say(creep.memory.roleIcon);
            }
        }
        if(!retreat)
        {
            if(enemy)
            {
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
                    else if (creep.rangedAttack(enemy) != ERR_NOT_IN_RANGE && creep.pos.getRangeTo(enemy) < 2){
                        creep.moveTo(Game.flags.fallback);
                    }
                }
                else if(creep.memory.soldierType == 'medic')
                {
                    let soldiers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'soldier' && creep.hits < creep.hitsMax));
                    let leader = _.filter(Room.creeps, (creep) => ((creep.memory.role == 'soldier' && creep.memory.soldierType == 'melee') ||
                                                                    creep.memory.role == 'tank'
                    ));
                    if(creep.pos.getRangeTo(enemy) < 2)
                    {
                        creep.moveTo(Game.flags.fallback);
                    }
                    else if(creep.heal(soldiers[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(soldiers[0]);
                    }
                    else if (leader)
                    {
                        creep.moveTo(leader[0]);
                    }
                    
                }
                creep.say(creep.memory.roleIcon,' - 💢');
                    
            }
            else if(targetSpawn.length)
            {
                console.log(creep.name," is attacking an enemy spawn.");
        
                if(creep.memory.soldierType == 'ranger')
                {
                    if(creep.rangedAttack(targetSpawn[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetSpawn[0]);
                    }
                }
                else if(creep.memory.soldierType == 'melee')
                {
                    if(creep.attack(targetSpawn[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetSpawn[0]);
                    }  
                }
            }
            
            else if(enemyTower)
            {
                console.log(creep.name," is attacking an enemy tower.");

                if(creep.memory.soldierType == 'ranger')
                {
                    if(creep.rangedAttack(enemyTower) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(enemyTower);
                    }
                }
                else if(creep.memory.soldierType == 'melee')
                {
                    if(creep.attack(enemyTower) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(enemyTower);
                    }  
                }
                creep.say(creep.memory.roleIcon,' - 💢 Tower');
            }
            else if(enemyStructure)
            {
                console.log(creep.name," is attacking an enemy structure.");
                
                if(creep.memory.soldierType == 'ranger')
                {
                    if(creep.rangedAttack(enemyStructure) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(enemyStructure);
                    }
                }
                else if(creep.memory.soldierType == 'melee')
                {
                    if(creep.attack(enemyStructure) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(enemyStructure);
                    }  
                }
                
            }
            else if(targetSpawn.length)
            {
                console.log(creep.name," is attacking an enemy spawn.");
                if(creep.memory.soldierType == 'ranger')
                {
                    if(creep.rangedAttack(targetSpawn[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetSpawn[0]);
                    }
                }
                else if(creep.memory.soldierType == 'melee')
                {
                    if(creep.attack(targetSpawn[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetSpawn[0]);
                    }  
                }
            }
            else if(enemyConstructionSite)
            {
                creep.moveTo(enemyConstructionSite);
            }

            else
            {
                if(creep.memory.soldierType == 'medic')
                {
                    let units = _.filter(Game.creeps, (creep) => (creep.hits < creep.hitsMax));
    
                    if(creep.heal(units[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(units[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleSoldier;