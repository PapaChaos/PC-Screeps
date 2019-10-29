/*
TODO:
-Create medics creeps.
*/
var buildQueue = 
{
    startProduction: function() 
    {
        var buildQueueTier = 0;
        const expansionFlagName = 'expansion';
        const expansionFlags=_.filter(Game.flags,flag => {
        return flag.name.indexOf(expansionFlagName)>-1;
        });
                   
        const upgradersExpansion1 = _.filter(Game.creeps, (creep) => 
            creep.memory.role == 'upgrader' && 
            creep.memory.targetFlag == 1);
            
        console.log('Amount of flags: ', expansionFlags.length);
        ////////////////////////////////////////////////
        ////////////////  CREEP AMOUNT  ////////////////
        ////////////////////////////////////////////////
        //main hq creeps
        const amountHarvester = 2; 
        const amountUpgraders = 3;
        const amountDeliveriers = 2;
        const amountBuilders = 1;
        const amountRepairers = 2;
        
        //expansion creeps
        const amountScouts = 0;//*expansionFlags.length;
        const amountExpansionHarvesters = 2;
        const amountExpansionDeliveriers = 5;
        
        //combat creeps
        const amountSoldierMelees = 1;
        const amountSoldierRangers = 2;
        const amountSoldierMedics = 2;
        const amountTanks = 0;

        const amountClaimers = 1;
        ////////////////////////////////////////////////
        /////////////////  CREEP BODY  /////////////////
        ////////////////////////////////////////////////
        const bodyHarvester = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]; 
        
        const bodyUpgraders = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        const bodyBuilders =  [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        const bodyRepairers = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        const bodyDeliveriers = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        
        const bodyScouts = [ATTACK,ATTACK,TOUGH,TOUGH,MOVE,MOVE];
        const bodyExpansionHarvesters = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
        const bodyExpansionDeliveriers = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        
        const bodySoldierMelees = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
        const bodySoldierRangers = [TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,MOVE,RANGED_ATTACK,RANGED_ATTACK,MOVE,RANGED_ATTACK,RANGED_ATTACK,MOVE];
        const bodySoldierMedic = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,HEAL,MOVE,HEAL,HEAL,MOVE];
        const bodyTank = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                          TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                          TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                          MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
                          MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK]
                        

        
        const bodyClaimers = [CLAIM,CLAIM,MOVE];
        
        
        /*
        MOVE	         50	Moves the creep. Reduces creep fatigue by 2/tick. See movement.
        WORK	        100	Harvests energy from target source. Gathers 2 energy/tick.
                            Constructs a target structure. Builds the designated structure at a construction site, at 5 points/tick, consuming 1 energy/point. See building Costs.
                            Repairs a target structure. Repairs a structure for 20 hits/tick. Consumes 0.1 energy/hit repaired, rounded up to the nearest whole number.
        CARRY	         50	Stores energy. Contains up to 50 energy units. Weighs nothing when empty.
        ATTACK	         80	Attacks a target creep/structure. Deals 30 damage/tick. Short-ranged attack (1 tile).
        RANGED_ATTACK	150	Attacks a target creep/structure. Deals 10 damage/tick. Long-ranged attack (1 to 3 tiles).
        HEAL	        250	Heals a target creep. Restores 12 hit points/tick at short range (1 tile) or 4 hits/tick at a distance (up to 3 tiles).
        TOUGH	         10	No effect other than the 100 hit points all body parts add. This provides a cheap way to add hit points to a creep.
        CLAIM	        600	
        
        350
        350
        350
        1050
        
        
        1300
        */
        
        ////////////////////////////////////////////////
        //////////////////  FILTERS  ///////////////////
        ////////////////////////////////////////////////
        
        var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester'));

        console.log('Harvesters: ' + harvesters.length);

        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 0  ////////////////
        ////////////////////////////////////////////////
        
        if(harvesters.length < amountHarvester) 
        {
            buildQueueTier = 0;
            var newName = 'Harvester' + Game.time;
        
            console.log('Spawning new heavy harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(bodyHarvester, newName,
            { memory: {role: 'harvester'}
            });
        }
        else
        {
            buildQueueTier = 1;
        }
    
        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 1  ////////////////
        ////////////////////////////////////////////////
    
    
        if(buildQueueTier == 1)
        {
            const deliveriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'deliverier');
            console.log('Deliveriers: ' + deliveriers.length);
            
            const upgraders = _.filter(Game.creeps, (creep) => 
                    creep.memory.role == 'upgrader');

            console.log('expansion Upgraders: ' + upgradersExpansion1.length);
            
            console.log('Upgraders: ' + upgraders.length);
            
            if(upgraders.length < amountUpgraders) 
            {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);

                Game.spawns['Spawn1'].spawnCreep(bodyUpgraders, newName, 
                {memory: {role: 'upgrader', targetFlag: 0}});

            }
            else if(upgradersExpansion1.length < amountUpgraders)
            {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyUpgraders, newName, 
                {memory: {role: 'upgrader', targetFlag: 1}});
            }
            
            else if(deliveriers.length < amountDeliveriers) 
            {
                var newName = 'Deliverier' + Game.time;
                console.log('Spawning new deliverier: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyDeliveriers, newName, 
                {memory: {role: 'deliverier'}, readyForDelivery: false});
            }
            else
            {
                buildQueueTier = 2;
            }
        }

        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 2  ////////////////
        ////////////////////////////////////////////////


        if(buildQueueTier == 2)
        {
            const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
             console.log('Builders: ' + builders.length);
                
            const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            console.log('Repairers: ' + repairers.length);
            
            
            if(builders.length < amountBuilders) 
            {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep(bodyBuilders, newName, 
                    {memory: {role: 'builder'}});
            }

            else if(repairers.length < amountRepairers) 
            {
                var newName = 'Repairer' + Game.time;
                console.log('Spawning new Repairer: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyRepairers, newName, 
                {memory: {role: 'repairer'}, readyForDelivery: false});
            }
            else
            {
                buildQueueTier = 3
            }
        }
        
        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 3  ////////////////
        ////////////////////////////////////////////////

        if(buildQueueTier == 3)
        {
            const scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
            console.log('Scouts: ' + scouts.length);
            const expansionHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionHarvester');
            console.log('Expansion Harvester: ' + expansionHarvesters.length);
            
            const x = _.sum(Game.creeps, (c) => c.memory.role == 'expansionHarvester' && c.room == Game.flags.expansion1.room);
            
            const expansionDeliveriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionDeliverier');
            console.log('Expansion Deliveriers: ' + expansionDeliveriers.length);
            if(Game.flags.expansion2)
            {
                if(x >=2)
                {
                    var targetflag = Game.flags.expansion2.id;
                }
                else
                {
                    var targetflag = Game.flags.expansion1.id;
                }
            }
            else
            {
                var targetflag = Game.flags.expansion1.id;
            }
            
            if(scouts.length < amountScouts) 
            {
                var newName = 'Scout' + Game.time;
                console.log('Spawning new Scout: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyScouts, newName, 
                {memory: {role: 'scout'}});
            }

            else if(expansionHarvesters.length < amountExpansionHarvesters) 
            {
                var newName = 'Expansion Harvester' + Game.time;
                console.log('Spawning new Expansion Harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyExpansionHarvesters, newName, 
                {memory: {role: 'expansionHarvester',
                     targetFlag: targetflag}});
            }

        
            else if(expansionDeliveriers.length < amountExpansionDeliveriers) 
            {
                var newName = 'Expansion Deliverier' + Game.time;
                console.log('Spawning new Expansion Deliverier: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyExpansionDeliveriers, newName, 
                {memory: {role: 'expansionDeliverier'}});
            
            }
            else
            {
                buildQueueTier = 4;
            }
        }
        
        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 4  ////////////////
        ////////////////////////////////////////////////  
        
        if(buildQueueTier == 4)
        {
            
            const soldierMelees = _.filter(Game.creeps, (creep) => 
                creep.memory.role == 'soldier' && 
                creep.memory.soldierType == 'melee');
                
            console.log('Melees: ' + soldierMelees.length);
            
            const soldierRangers = _.filter(Game.creeps, (creep) => 
                creep.memory.role == 'soldier' && 
                creep.memory.soldierType == 'ranger');
                
            const soldierMedics = _.filter(Game.creeps, (creep) => 
                creep.memory.role == 'soldier' && 
                creep.memory.soldierType == 'medic');
                
            const tanks = _.filter(Game.creeps, (creep) => 
                creep.memory.role == 'tank');  
            if(tanks.length < amountTanks)
            {
                var newName = 'Tank' + Game.time;
                console.log('Spawning new Tank: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyTank, newName, 
                {memory: {role: 'tank'}});
            }
            else if(soldierMedics.length < amountSoldierMedics)
            {
                var newName = 'Legionary' + Game.time;
                console.log('Spawning new Medic: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodySoldierMedic, newName, 
                {memory: {role: 'soldier'}});
            }
            else if(soldierRangers.length < amountSoldierRangers)
            {
                var newName = 'Legionary' + Game.time;
                console.log('Spawning new Ranger: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodySoldierRangers, newName, 
                {memory: {role: 'soldier'}});
            }           
            else if(soldierMelees.length < amountSoldierMelees)
            {
                var newName = 'Legionary' + Game.time;
                console.log('Spawning new Melee: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodySoldierMelees, newName, 
                {memory: {role: 'soldier'}});
            }
            


            else
            {
                buildQueueTier = 5;
            }
        }

        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 5  ////////////////
        ////////////////////////////////////////////////

        if(buildQueueTier == 5)
        {

            const claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
            console.log('Claimers: ' + claimers.length);
            
            if(claimers.length < amountClaimers)
            {
                var newName = 'Claimer' + Game.time;
                console.log('Spawning new Claimer: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyClaimers, newName, 
                {memory: {role: 'claimer'}});
                }
                else
                {
                    buildQueueTier = 6;
                }
            }

        console.log('Build Queue: ' + buildQueueTier);
        if(Game.spawns['Spawn1'].spawning) 
        { 
            const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
        }
    }
};

module.exports = buildQueue;