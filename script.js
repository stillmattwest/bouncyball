$(document).ready(function(){

	$(".ball").click(function(){
		
		drop(this,3);
	});

	function drop(obj,speed)

	{
			// get top position of obj
			var position = $(obj).position().top;
			// get height of object
			var height = $(obj).height();
			// get bottom of animation area
			var floor = $('#screen').height();
			// time controls speed of animation
			var time = 1000/60;
			//set gravity
			var gravity = 2.0;
			// set coefficient of restitution
			var cor = .5;


		// animation loop
		if((position+height+speed) < floor)
		{
			$(obj).animate({top:'+=' + speed},time);
			speed = speed * gravity;
		}
		else
		{
			var remainder = floor - (position+height);
			var speedModifier = remainder / speed;
			$(obj).animate({top:'+='+(speed * speedModifier)},time);	
		}

		
		setTimeout(function(){checkDropStatus();},time+15);

		function checkDropStatus()
		{
			position = $(obj).position().top;
			if(position + height < floor)
			{
				drop(obj,speed);
			}
			else
			{
				bounce(obj,speed);
			}
		}

		function checkBounceStatus(bounceSpeed)
		{
			position = $(obj).position().top;
			if(bounceSpeed >= 10)
			{

				bounceSpeed = (bounceSpeed / gravity);
				bounce(obj,bounceSpeed);
			}
			
			else if(position + height < floor - gravity)
			{

				drop(obj,gravity);
			}
			else
			{
				return;
			}

		}

		function bounce(obj,bounceSpeed)
		{
			$(obj).animate({top:'-=' + (bounceSpeed * cor)},time+10);
			setTimeout(function(){checkBounceStatus(bounceSpeed);},time+15);
		}

	}


});