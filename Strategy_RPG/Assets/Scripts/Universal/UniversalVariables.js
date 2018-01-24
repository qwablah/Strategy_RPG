#pragma strict

/***********************************
UniversalVariables
Holds variables used by multiple classes
Mark Murphy
Start	- 1/22/2018
Update	- 1/23/2018
***********************************/

enum dirEnum { NORTH, SOUTH, EAST, WEST };
enum controlEnum 
{
	NORTH, SOUTH, EAST, WEST,
	ACTION, MENU, ACCEPT, BACK,
	SWAP_TEAM_FORWARD, SWAP_TEAM_BACK,
	SWAP_TAB_FORWARD, SWAP_TAB_BACK
};

public var totalKeys : int = 12;
public var spriteHeight : int = 1;
public var keyHoldTime : float = 0.5;

public var isMovePressed : boolean;
public var isActionPressed : boolean;
public var isMoving : boolean;

public var controls : BoundControls;

function Start ()
{
	isMovePressed = false;
	isActionPressed = false;
	isMoving = false;
}

function Update ()
{
	
}



//*********************
// Universal Classes
//*********************

class KeyBind
{
	public var boundKey : controlEnum;
	public var keyboardBind : List.<KeyCode>;

	public var isPressed : boolean;
	public var isHeld : boolean;
	private var checkIfHeld : boolean;

	private var startPressedTime : int;
	private var endPressedTime : int;
	private var keyHoldTime : float = 0.5;

	function KeyBind (key : controlEnum, binding : List.<KeyCode>)
	{
		this.boundKey = key;
		this.keyboardBind = binding;

		isPressed = false;
		isHeld = false;
		checkIfHeld = false;

		startPressedTime = 0;
		endPressedTime = 0;
	}

	function Update()
	{
		if(isPressed && !checkIfHeld)
		{
			checkIfHeld = true;
			startPressedTime = Time.time;
		}
		else if(isPressed && checkIfHeld)
		{
			endPressedTime = Time.time;
			if(endPressedTime - startPressedTime > keyHoldTime)
			{
				isHeld = true;
			}
		}
	}

	function CheckKeyPress()
	{
		var keyUp : boolean = true;
		keyboardBind.ForEach(function(bound)
		{
			if(Input.GetKeyDown(bound))
			{
				isPressed = true;
				keyUp = false;
			}
			else if(Input.GetKeyUp(bound) && keyUp)
			{
				isPressed = false;
				isHeld = false;
				checkIfHeld = false;
			}
		});
	}
};

class BoundControls
{
	public var controlList : List.<KeyBind>;

	function BoundControls()
	{
		controlList = new List.<KeyBind>();
	}

	function sortControls()
	{
		controlList.Sort(function(x : KeyBind){return x.boundKey;});
	}
};