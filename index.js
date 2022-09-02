const axios = require('axios');

class AntiSpoof {
    sqlKeywords = ["SELECT", "UPDATE", "DELETE", "INSERT", "INSERT INTO", "CREATE DATABASE", "ALTER DATABASE", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "CREATE INDEX", "DROP INDEX"];
    secretId = "your id";
    constructor() {
        mp.events.add('playerJoin', (player) => this.playerJoin(player))
    }

    playerJoin(player) {
        if (!mp.players.exists(player)) return;
        let containsSqlKeyword = false;

        for (let i = 0; i < this.sqlKeywords.length; i++) {
            if (player.socialClub.includes(this.sqlKeywords[i])) {
                containsSqlKeyword = true;
                break;
            }
        }

        if (containsSqlKeyword) {
            player.ban('sql injection');
            return;
        }

        const isSpoofing = this.checkUser(player.socialClub, player.rgscId) ? player.ban('spoofing') : false;

    }

    checkUser(name, id) {
        axios.get(`https://rid.itsdevil.com/api?id=${this.secretId}&search=${name}`)
            .then(response => {
                var scid = response.data.rockstarAccount.rockstarId;
                if (scid != id) return true;
            })
            .catch(error => {
                console.log('Error: ', error.response.data);
                return true;
            })

        return false;
    }
}

new AntiSpoof();
