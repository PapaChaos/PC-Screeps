var tower = {

    run: function(myRoomName) 
    {
        console.log("Towers are running!");
    
        var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
        var towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {filter: {
            structureType: STRUCTURE_TOWER
        }});
        
        //if there are hostiles - attack them    
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${myRoomName}`);
            towers.forEach(tower => tower.attack(hostiles[0]));
            console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
        }

        //if there are no hostiles....
        if(hostiles.length === 0) {
            
            //....first heal any damaged creeps
            for (let name in Game.creeps) {
                // get the creep object
                var creep = Game.creeps[name];
                if (creep.hits < creep.hitsMax) {
                    towers.forEach(tower => tower.heal(creep));
                    console.log("Tower is healing Creeps.");
                }
            }        
        /*
           for(var i in towers){
                //...repair Buildings! :) But ONLY until HALF the energy of the tower is gone.
                //Because we don't want to be exposed if something shows up at our door :)
                console.log('tower energy: {0} tower energyCapacity: {1}', towers[0].energy, towers[0].energyCapacity);
                if(towers[i].energy > (towers[i].energyCapacity*0.5))
                {
                    console.log("meh");
                    //Find the closest damaged Structure
                    var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)});
    	            
    	            if(closestDamagedStructure) 
    	            {
    	 	            towers[i].repair(closestDamagedStructure);
    	 	            console.log("The tower is repairing buildings.");
                    }
                }
            }*/
            
        }
    }
};
module.exports = tower;