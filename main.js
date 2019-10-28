/*
TODO:
-Source open spot calculations.
-Harvesters on each spot.
*/

var buildqueue = require('buildQueue');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDeliverier = require('role.deliverier');
var roleRepairer = require('role.repairer');
var roleSoldier = require('role.soldier');
var roleTank = require('role.tank');

var roleScout = require('role.scout');
var roleExpansionHarvester = require('role.expansionHarvester');
var roleExpansionDeliverier = require('role.expansionDeliverier');

var RoomMemories = require('roomMemories');
var roleClaimer = require('role.claimer');
var Towers = require('tower');

module.exports.loop = function () {
	for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

	
    for(let name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    ///////////////
    //BUILD QUEUE//
    ///////////////
	buildqueue.startProduction();

    ////////////////////////////////////////////////
    ////////////////////  ROLES  ///////////////////
    ////////////////////////////////////////////////
    for(let name in Game.creeps) 
    {
        let creep = Game.creeps[name];
        switch(creep.memory.role)
        {
            case 'harvester':
                roleHarvester.run(creep);
                break;

            case 'upgrader':
                roleUpgrader.run(creep);
                break;
        
	        case 'builder':
                roleBuilder.run(creep);
                break;
            case 'deliverier':
                roleDeliverier.run(creep);
                break;

            case 'repairer':
                roleRepairer.run(creep);
                break;
            
            case 'soldier':
                roleSoldier.run(creep);
                break;
                
            case 'tank':
                roleTank.run(creep);
                break;
            
            case 'scout':
                roleScout.run(creep);
                break;
                
            case 'expansionHarvester':
                roleExpansionHarvester.run(creep);
                break
                
            case 'expansionDeliverier':
                roleExpansionDeliverier.run(creep);
                break;
            
            case 'claimer':
                roleClaimer.run(creep);
                break;
        }
    }
    
    const room = Game.spawns.Spawn1.room;
    Towers.run(room.name);
    
    RoomMemories.run();
}

