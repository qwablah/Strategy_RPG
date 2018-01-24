#pragma strict

/***********************************
KeyboardInput
Manages keyboard input
Mark Murphy
Start	- 1/22/2018
Update	- 1/24/2018
***********************************/

public var uv : UniversalVariables;
public var goh : GameplayObjectHolder;

private var oc : OverworldCharacter;

function Start ()
{
	oc = goh.character.GetComponentInChildren(OverworldCharacter);
}

function Update ()
{
	// Keyboard movement
	if(uv.isMovePressed && (goh.moveToLocation.transform.position == goh.targetLocation.transform.position))
	{
		if(uv.controls.controlList[controlEnum.NORTH].isPressed)
		{
			if(oc.dirFacing == dirEnum.NORTH)
				goh.targetLocation.transform.position.y += uv.spriteHeight;
			else oc.dirFacing = dirEnum.NORTH;
		}
		else if(uv.controls.controlList[controlEnum.SOUTH].isPressed)
		{
			if(oc.dirFacing == dirEnum.SOUTH)
				goh.targetLocation.transform.position.y -= uv.spriteHeight;
			else oc.dirFacing = dirEnum.SOUTH;
		}
		else if(uv.controls.controlList[controlEnum.EAST].isPressed)
		{
			if(oc.dirFacing == dirEnum.EAST)
				goh.targetLocation.transform.position.x += uv.spriteHeight;
			else oc.dirFacing = dirEnum.EAST;
		}
		else if(uv.controls.controlList[controlEnum.WEST].isPressed)
		{
			if(oc.dirFacing == dirEnum.WEST)
				goh.targetLocation.transform.position.x -= uv.spriteHeight;
			else oc.dirFacing = dirEnum.WEST;
		}
		else
		{
			uv.isMovePressed = false;
		}
	}

	if(!uv.isMoving)
	{
		goh.moveToLocation.transform.position = goh.targetLocation.transform.position;
		goh.startLocation.transform.position = goh.character.transform.position;
	}

	oc.isMoving = uv.isMovePressed;
}

function OnGUI()
{
	var e : Event = Event.current;
	if(e && e.isKey)
	{
		uv.controls.controlList.ForEach(function(key)
		{
			key.CheckKeyPress();
			if(key.boundKey > 3) uv.isMovePressed = true;
			else uv.isActionPressed = true;
		});
	}
}