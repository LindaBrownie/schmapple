var OBJECT_HEIGHT = 50;
			
function FallingObject(scene){

    var fallingObjects = ["./img/apple.png"];
    var imageIndex = Math.floor(Math.random()*5);
    //var widths = [170, 170, 80, 80, 50];
    var tempFallingObject = new EnhancedSprite(scene, fallingObjects[0], 60, OBJECT_HEIGHT);
    var isActive =  false;
	
	tempFallingObject.getObjectHeight = function(){
        return OBJECT_HEIGHT;
    };
	
	tempFallingObject.isActive = function(){		
		return isActive;
	};
	
	tempFallingObject.activate = function(){
	    isActive = true;
		var xPosition1 = Math.random() * (canvas.width - 30) + 15;
		var yPosition1 = Math.random() * (canvas.width - 30) + 15;
	   	this.setPosition(xPosition1, yPosition1);
		this.setSpeed(5);
	};
	
	tempFallingObject.deActivate = function(){
		
		isActive = false;
		this.setPosition(300, -100);
		this.setSpeed(0);
	};
	
	
    tempFallingObject.init = function(){

        var width = 60;
        var xPosition = Math.random() * this.cWidth + width/2;

        //allows sprite to go off screen
        this.setBoundAction(CONTINUE);
        //this.width = width;
        this.setPosition(xPosition, 0);
        this.setSpeed(5);
        this.setMoveAngle(180);
        //this.setImgAngle(90);
        this.changeImgAngleBy(Math.floor(Math.random()*50)-25);
    };
	
	/*this.update = function(){
        var i = 0;
		if(tempFallingObject.isActive() === true){
			tempFallingObject.init();
		}
    };*/
	


    /*
    tempFallingObject.repositionOnBoundsCheck = function(){

        var xPosition = Math.random() * this.cWidth + 100;

        if(this.y > 600){

            this.setX( xPosition );
            this.setY(-600);
            this.setImgAngle(90);
            this.changeImgAngleBy(Math.floor(Math.random()*30)-15);
        }
    };*/

    return tempFallingObject;
}

/********************************************************************
 *
 * FallingObjectManager
 *
 *******************************************************************/
function FallingObjectManager(scene){

    //TODO: put all configurable settings in one file called settings js
    var fallingOjects = [];
    var MAX_OBJECTS = 15; //must be divisible by 3
	var fallingObject;	

    this.init = function(scene){
		var i;
        for(i=0;i<MAX_OBJECTS;i++){
            fallingOjects[i] = new FallingObject(scene);
            fallingOjects[i].init();
        }
    };
    
	/*this.checkForBounds = function(){
        var i = 0;

        for(i =0; i < MAX_OBJECTS; i++){
            fallingOjects[i].repositionOnBoundsCheck();
        }

        this.spaceOutObjects();

    };*/

    this.update = function(){
        var i = 0;

        for(i =0; i < MAX_OBJECTS; i++){
            //fallingOjects[i].preUpdate();
			if(fallingOjects[i].isActive() === true){
				fallingOjects[i].update();
			}
        }

    };
	
	this.launchOne = function(){
		var i = 0;
		 for(i =0; i < MAX_OBJECTS; i++){
			if(fallingOjects[i].isActive() === false){
				fallingOjects[i].activate();
				break;
			}
        }
	};

    /*this.collidesWith = function(otherSprite, onCollisionCallback){

        var i = 0;
        for(i = 0 ; i < MAX_OBJECTS; i++){

            if(fallingOjects[i].collidesWith(otherSprite)){
                onCollisionCallback();
            }
        }
    };*/
}

function Basket(scene){

	var sprite2 = new Sprite(scene, "./img/box1.png", 60, 80);
	sprite2.x = 100;
	sprite2.y = 575;
	sprite2.init = function(){
	this.setSpeed(0);
	this.setBoundAction(STOP);
	};

	sprite2.checkKeys = function(){	

	var newDx = 0;
	var newDy = 0;
	var LANDSCAPE_PRIMARY = 90;
	var LANDSCAPE_SECONDARY = -90;
	var PORTRAIT_PRIMARY = 0;
	accel = new Accel;
	accelerometer = accel;

	if(keysDown[K_LEFT] || newDx > 0)
	{
	if(newDx > 0){
	//need faster acceleration when using tilt as opposed to keys
	this.addVector(270,1)
	}
	else{
	this.addVector(270,1);
	}
	}

	if(keysDown[K_RIGHT] || newDx < 0){
	if(newDx < 0)
	this.addVector(90,1);
	else
	this.addVector(90,1);
	}

	//set a max DX
	if(this.dx < -7)
	this.dx = -7;
	if(this.dx > 7)
	this.dx = 7;
	};

	return sprite2;
}

function Background(scene){

    var sprite = new EnhancedSprite(scene, "./img/image_transparent.png", 800, 600);

    sprite.init = function(){
        this.setX(this.cWidth/2 );
        this.setY(this.cHeight/2);
        this.setSpeed(0);
        this.width = this.cWidth;
        this.height = this.cHeight;
        //this.setMoveAngle(180);
    };

    return sprite;
}