const axios = require('axios');
const secret = require('./config.json');

function checkUser(name, id)
{
   // you getting the "secret id" when u join the patreon from the api creator.
   // more informations at https://discord.gg/UgwaQzX5Tr
   axios.get(`https://rid.itsdevil.com/api?id=${secret.id}&search=${name}`)
        .then(response => 
        {
            var scid = response.data.rockstarAccount.rockstarId;
            if(scid != id) return true;
        })
        .catch(error => 
        {
            console.log('Error: ', error.response.data);
            return true;
        })

    return false;
}

mp.events.add('playerJoin', async (player) => {
    if(player.socialClub.includes("SELECT" && "UPDATE" && "DELETE" && "INSERT" && "INSERT INTO" && "CREATE DATABASE" && "ALTER DATABASE" && "CREATE TABLE" && "ALTER TABLE" && "DROP TABLE" && "CREATE INDEX" && "DROP INDEX"))
    {
        // chance to 99% that the user is doing social club name spoofing and trying to execute sql code
        if(spoofed)
        {
            player.notify(`cooler versuch`);
            setTimeout(() => {
                player.ban('spoofing.');
            }, 5000);
        }
    }

    var spoofed = await checkUser(player.socialClub, player.rgscId);

    // chance to 99% that the user is doing social club id spoofing
    if(spoofed)
    {
        player.notify(`cooler versuch`);
        setTimeout(() => {
            player.ban('spoofing.');
        }, 5000);
    }
});