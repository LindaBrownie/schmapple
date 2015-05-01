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
		var yPosition = -Math.random();

        //allows sprite to go off screen
        this.setBoundAction(CONTINUE);
        //this.width = width;
        this.setPosition(xPosition, yPosition);
        this.setSpeed(3);
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

function Basket(scene, joyStick){
	var joystickVirtual = joyStick;
	var boundsChecking = true;
	
	var basket = new EnhancedSprite(scene, "./img/box1.png", 60, 80);
	basket.x = 100;
	basket.y = 575;
	basket.init = function(){
		this.setSpeed(0);
		this.setBoundAction(STOP);
	};

	basket.checkKeys = function(){	

		var newDx = 0;
		var newDy = 0;

		if(joystickVirtual){
			var LANDSCAPE_PRIMARY = 90;
			var LANDSCAPE_SECONDARY = -90;
			var PORTRAIT_PRIMARY = 0;

			newDx = joystickVirtual.getDiffX();
			
            if(window_orientation === LANDSCAPE_PRIMARY){
                newDx = joystickVirtual.getDiffY();
            }
            else if(window_orientation === -LANDSCAPE_SECONDARY){
                newDx = joystickVirtual.getDiffY() * -1; //flip it
            }else if(window_orientation === PORTRAIT_PRIMARY){
                newDx =  Math.abs(joystickVirtual.getDiffY()) - 9; //4.5 is the dx in portrait mode
            }
            else{
                newDx = 9 - Math.abs(joystickVirtual.getDiffY());
            }
		}
			
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
		var maxValue = 20
		if(this.dx < -maxValue)
			this.dx = -maxValue;
		if(this.dx > maxValue)
			this.dx = maxValue;
	};
	
	//overrides the checkBounds
    basket.checkBounds = function(){

        var leftBound = 10 + this.width/2;
        var rightBound = this.cWidth - (this.width/2 + 10);
        var topBound = 50;
        var bottomBound = this.cHeight - 40;

		if(joystickVirtual){
			 //bottom is set to 2/3 screen because of differences in mobile devices
			//otherwise theship at the bottom can't be seen
			bottomBound = this.cHeight - this.height;
		}
       
        if(this.y < topBound){
            this.y = topBound;
            this.dy = 0; //remove any vector acceleration
        }

        if(this.y > bottomBound){
            this.y = bottomBound;
            this.dy = 0; //affected by gravity
        }

        if(this.x < leftBound){
            this.x = leftBound;
            this.dx = 0; //remove any vector acceleration
        }

        if(this.x > rightBound){
            this.x = rightBound;
            this.dx = 0; //remove any vector acceleration
        }

    };

	return basket;
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

