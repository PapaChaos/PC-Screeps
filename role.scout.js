/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.scout');
 * mod.thing == 'a thing'; // true
 */

var roleScout = 
{
    run: function(creep)
    {

        if(creep.room == Game.flags.expansion1.room)
        {
            creep.say('🛡');
            var enemies= creep.room.find(Game.HOSTILE_CREEPS);
            if(enemies.length > 0)
            {
                creep.moveTo(enemies[0]);
                creep.attack(enemies[0]);
                console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
            }
        
            if (enemies.length == 0)
            {
               creep.moveTo(Game.flags.expansion1);
            }
        }
        else
        {
            creep.say('➡');
            creep.moveTo(Game.flags.expansion1);
        }
        
    }
};
module.exports = roleScout;