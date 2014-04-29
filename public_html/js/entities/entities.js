game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "player1-spritesheet";
        settings.spritewidth = "72";
        settings.spriteheight = "97";
        settings.width =  72;
        settings.height = 97;
        this.parent(x, y, settings);
        
        this.colliable = true;
        
        this.renderable.addAnimation("idle", [4,5,6,7,8,9,10,11]);
        this.renderable.addAnimation("jump", [3]);
        this.renderable.setCurrentAnimation("idle");
        this.setVelocity(5, 20);       
        
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
        
    },
    
    update: function(deltaTime) {
      if(me.input.isKeyPressed("right")) {
           this.vel.x += this.accel.x * me.timer.tick;
         this.renderable.flipX(false);
      } 
       else if(me.input.isKeyPressed("left")) {
          this.vel.x -= this.accel.x * me.timer.tick;
  this.renderable.flipX(true);
      }
      else{
          this.vel.x = 0;
          this.renderable.setCurrentAnimation("idle");  
      }

       if(me.input.isKeyPressed("up")) {
          this.vel.y -= this.accel.y * me.timer.tick;
        //this.renderable.setCurrentAnimation("run");
        
       }
        
      var collision = me.game.world.collide(this);
      this.updateMovement();
      this.parent(deltaTime);
      return true;
    }      
});
game.LevelTrigger = me.ObjectEntity.extend({
     init: function(x, y, settings) {
          this.parent(x, y, settings);
          this.collideable = true;
          this.level = settings.level;
     },     
        onCollision: function() {
        this.collidable = false;
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer();
     }
        
});