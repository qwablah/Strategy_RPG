#pragma strict

/***********************************
KeyboardInput
Manages keyboard input
Mark Murphy
Start	- 1/22/2018
Update	- 1/22/2018
***********************************/

public var uv : UniversalVariables;
public var goh : GameplayObjectHolder;

private var animator : Animator;

function Start ()
{
	animator = goh.character.GetComponentInChildren(Animator);
}

function Update ()
{
	// Keyboard movement
	if(uv.isMovePressed && (goh.moveToLocation.transform.position == goh.targetLocation.transform.position))
	{
		if(uv.buttonPressed == controlEnum.NORTH)
		{
			goh.targetLocation.transform.position.y += uv.spriteHeight;
			animator.SetTrigger("WalkNorth");
		}
		if(uv.buttonPressed == controlEnum.SOUTH)
		{
			goh.targetLocation.transform.position.y -= uv.spriteHeight;
			animator.SetTrigger("WalkSouth");
		}
		if(uv.buttonPressed == controlEnum.EAST)
		{
			goh.targetLocation.transform.position.x -= uv.spriteHeight;
			animator.SetTrigger("WalkEast");
		}
		if(uv.buttonPressed == controlEnum.WEST)
		{
			goh.targetLocation.transform.position.x += uv.spriteHeight;
			animator.SetTrigger("WalkWest");
		}
		uv.isMovePressed = false;
		animator.SetBool("Moving", true);
	}

	if(!uv.isMoving)
	{
		goh.moveToLocation.transform.position = goh.targetLocation.transform.position;
		goh.startLocation.transform.position = goh.character.transform.position;
		animator.SetBool("Moving", false);
	}
}

function checkInput(index : int, key : KeyCode)
{
	uv.controls.controlList[index].keyboardBind.ForEach(function(boundKey)
	{
		if(boundKey == key)
		{
			uv.buttonPressed = index;
			if(index <= 3) uv.isMovePressed = true;
			else uv.isActionPressed = true;
		}
	});
}

function OnGUI()
{
	var e : Event = Event.current;
	if(e)
	{
		if(e.isKey && Input.GetKey(e.keyCode))
		{
			for(var i = 0; i < uv.totalKeys; i++)
			{
				checkInput(i, e.keyCode);
			}
		}
	}
}