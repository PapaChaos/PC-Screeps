/*
TODO:

*/
var buildQueue = 
{

    startProduction: function() 
    {
        var buildQueueTier = 0;
        var expansionFlagName = 'expansion';
        var expansionFlags=_.filter(Game.flags,flag => {
        return flag.name.indexOf(expansionFlagName)>-1;
        });
        
        console.log('Amount of flags: ', expansionFlags.length);
        ////////////////////////////////////////////////
        ////////////////  CREEP AMOUNT  ////////////////
        ////////////////////////////////////////////////
        //main hq creeps
        var amountHarvester = 2; 
        var amountUpgraders = 3;
        var amountDeliveriers = 3;
        var amountBuilders = 1;
        var amountRepairers = 3;
        
        //expansion creeps
        var amountScouts = 1;//*expansionFlags.length;
        var amountExpansionHarvesters = 1;
        var amountExpansionDeliveriers = 4;
        
        //combat creeps
        var amountMelees = 5;
        var amountRangers = 3;
        
        ////////////////////////////////////////////////
        /////////////////  CREEP BODY  /////////////////
        ////////////////////////////////////////////////
        var bodyHarvester = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]; 
        var bodyUpgraders = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var bodyBuilders = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var bodyRepairers = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var bodyDeliveriers = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        
        var bodyScouts = [TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
        var bodyExpansionHarvesters = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        var bodyExpansionDeliveriers = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        
        
        var bodyMelees = [TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
        var bodyRangers = [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH,TOUGH, MOVE,MOVE,MOVE];
        
        
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
            var buildQueueTier = 0;
            var newName = 'Harvester' + Game.time;
        
            console.log('Spawning new heavy harvester: ' + newName);
            //if(harvesters.length == 0 && room.){}
            //Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            Game.spawns['Spawn1'].spawnCreep(bodyHarvester, newName,
            { memory: {role: 'harvester'}
            });
        }
        else
        {
            var buildQueueTier = 1;
        }
    
        ////////////////////////////////////////////////
        ///////////////  BUILD QUEUE 1  ////////////////
        ////////////////////////////////////////////////
    
    
        if(buildQueueTier == 1)
        {
            var deliveriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'deliverier');
            console.log('Deliveriers: ' + deliveriers.length);
            
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            console.log('Upgraders: ' + upgraders.length);
            if(upgraders.length < amountUpgraders) 
            {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyUpgraders, newName, 
                {memory: {role: 'upgrader'}});
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
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
             console.log('Builders: ' + builders.length);
                
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
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
            var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
            console.log('Scouts: ' + scouts.length);
            var expansionHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionHarvester');
            console.log('Expansion Harvester: ' + expansionHarvesters.length);
            
            var x = _.sum(Game.creeps, (c) => c.memory.role == 'expansionHarvester' && c.room == Game.flags.expansion1.room);
            
            var expansionDeliveriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionDeliverier');
            console.log('Expansion Deliveriers: ' + expansionDeliveriers.length);
            if(x >=2)
            {
                var targetflag = Game.flags.expansion2.id;
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
            
            var melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');
            console.log('Melees: ' + melees.length);
         
            var rangers = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranged');
            console.log('Rangers: ' + rangers.length);
            
            if(melees.length < amountMelees)
            {
                var newName = 'Melee' + Game.time;
                console.log('Spawning new Melee: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyMelees, newName, 
                {memory: {role: 'melee'}});
            }
        

            
            else if(rangers.length < amountRangers) 
            {
                var newName = 'Ranger' + Game.time;
                console.log('Spawning new Ranger: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(bodyRangers, newName, 
                {memory: {role: 'ranged'}});
            }
            else{
                buildQueueTier = 5;
            }
        }
        console.log('Build Queue: ' + buildQueueTier);
        if(Game.spawns['Spawn1'].spawning) 
        { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
        }
    }
};

module.exports = buildQueue;