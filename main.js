new Vue({
  el: '#app',
  data: {
    user: 100,
    monster: 100,
    username: '',
    inGame: false,
    healMoves: 3,
    specialAttackMoves: 4,
    logs: [],
    hiddenInput: false,
    victories: 0,
    defeats: 0,
    waitingTime: false,
    green: 'green',
    red: 'orange'
  },
  methods: {
    saveUser(){
      this.hiddenInput = true
    },

    log(mover, type, hits) {
      if (hits == 1) {
        var logString = mover + ' utilizza ' + type + ' e colpisce per ' + hits + ' punto'
      } else {
        var logString = mover + ' utilizza ' + type + ' e colpisce per ' + hits + ' punti'
      }
      this.logs.push(logString)
    },

    attack: function(force){
      if (this.specialAttackMoves > 0){
        let hits = Math.floor(Math.random()*10 + force)
        this.monster = this.monster - hits
        if (force == 1) {
          this.log(this.username, 'attacco', hits)
        } else {
          this.log(this.username, 'attacco speciale', hits)
        }
        
      } else {
        let hits = Math.floor(Math.random()*10 + 1)
        this.monster = this.monster - hits
        this.log(this.username, 'attacco', hits)
      }

      if (this.monster <= 0) {
        this.monster = 0
        alert("HAI VINTO")
        this.victories++
        this.restartGame()
        return;
      } else {
        this.waitingTime = true
        setTimeout(() => {
          this.waitingTime = false
        }, 500);
        setTimeout(() => {
          let hits2 = Math.floor(Math.random()*10 + 5)
          this.user = this.user - hits2
          this.log('Il mostro', 'attacco', hits2)
          if (this.user <= 0) {
            this.user = 0
            alert("HAI PERSO")
            this.defeats++
            this.restartGame()
            return;
            
          }  
        }, 500);
      }
    },

    heal: function(){
      if (this.healMoves > 0) {
        this.healMoves--
        this.waitingTime = true
        setTimeout(() => {
          this.waitingTime = false
        }, 500);
        healPoints = Math.floor(Math.random()*10 + 2)
        if (this.user + healPoints > 100) {
          this.user = 100
        } else {
          this.user += healPoints 
        }
        
        var logString = this.username + ' si cura e ottine ' + healPoints + ' punti'
        this.logs.push(logString)
      }
      setTimeout(() => {
        let hits2 = Math.floor(Math.random()*7 + 1)
        this.user = this.user - hits2
        this.log('Il mostro', 'attacco', hits2)
        if (this.user <= 0) {
          this.user = 0
          alert("HAI PERSO")
          this.defeats++
          this.restartGame()
          return;
        }  
      }, 500);
      
    },

    restartGame(){
      this.inGame = false
    },
    giveUp() {
      var validation = confirm(this.username + " vuoi davvero abbandonare la partita?")
      if (validation == true) {
        this.hiddenInput = false
        this.defeats = 0
        this. victories = 0
        this.username = ''
        this.monster = 100
        this.user = 100
        this.restartGame()
        return;
      }
    },
    
  }
});