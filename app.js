

new Vue({
    el: "#app",
    data: {
        slayerHealth: 100,
        monsterHealth: 100,
        gameIsOn: false,
        turns: [],
    },
    methods: {
        startGame: function () {
            this.gameIsOn = true;
            this.slayerHealth = 100;
            this.monsterHealth = 100;
            this.turns=[];
        },
        attack: function () {
            var min = 3;
            var max = 10;
            var damage = this.damage(min, max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `You dealt ${damage} to the Monster`
            })
            this.monsterAttack();

        },
        spAttack: function () {
            var min = 3;
            var max = 10;
            var damage = Math.floor(this.damage(min, max) * 1.8);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `You dealt ${damage} to the Monster`
            })
            this.monsterAttack();
        },
        heal: function () {
            var healed = Math.floor((100 - this.slayerHealth) * 0.2);;
            this.slayerHealth += healed;
            this.turns.unshift({
                isPlayer: true,
                text: `You healed yourself for ${healed} `
            })

            this.monsterAttack();

        },
        giveUp: function () {
            this.gameIsOn = false;
        },
        monsterAttack: function () {
            var min = 5;
            var max = 12;
            var damage = this.damage(min, max);
            this.slayerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: `The monster dealt ${damage} damage to you.`
            })
            this.checkWin()
        }
        ,
        damage: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsOn = false;
                    return true;
                }

            }
            if (this.slayerHealth <= 0) {
                this.slayerHealth = 0;
                if (confirm('You Lose! New Game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsOn = false;
                    return true;
                }

            }
        }
    }

});