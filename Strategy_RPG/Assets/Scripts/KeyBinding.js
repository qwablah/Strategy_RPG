#pragma strict
import System.IO;

/***********************************
KeyBinding
Handles key bindings
Mark Murphy
Start	- 1/12/2018
Update	- 1/12/2018
***********************************/

enum controlEnum {NORTH, SOUTH, EAST, WEST, ACTION, MENU, ACCEPT, BACK, SWAP_TEAM_FORWARD, SWAP_TEAM_BACK, SWAP_TAB_FORWARD, SWAP_TAB_BACK };

private var controls : Hashtable;

function Start ()
{
	controls.Add(controlEnum.NORTH, 'w');
	controls.Add(controlEnum.SOUTH, 's');
	controls.Add(controlEnum.EAST, 'a');
	controls.Add(controlEnum.WEST, 'd');

	controls.Add(controlEnum.ACTION, 'n');
	controls.Add(controlEnum.MENU, 'j');
	controls.Add(controlEnum.ACCEPT, 'm');
	controls.Add(controlEnum.BACK, 'k');

	controls.Add(controlEnum.SWAP_TEAM_FORWARD, 'b');
	controls.Add(controlEnum.SWAP_TEAM_BACK, 'h');
	controls.Add(controlEnum.SWAP_TAB_FORWARD, 'b');
	controls.Add(controlEnum.SWAP_TAB_BACK, 'h');
}

function Update ()
{
	
}

//----------------------
// Directions
//----------------------
function setNorth(value : int)
{
	controls[controlEnum.NORTH] = value;
}
function setSouth(value : int)
{
	controls[controlEnum.SOUTH] = value;
}
function setEast(value : int)
{
	controls[controlEnum.EAST] = value;
}
function setWest(value : int)
{
	controls[controlEnum.WEST] = value;
}

//----------------------
// Actions
//----------------------
function setAction(value : int)
{
	controls[controlEnum.ACTION] = value;
}
function setMenu(value : int)
{
	controls[controlEnum.MENU] = value;
}
function setAccept(value : int)
{
	controls[controlEnum.ACCEPT] = value;
}
function setBack(value : int)
{
	controls[controlEnum.BACK] = value;
}

//----------------------
// Swap ally position / switch tabs
//----------------------
function setSwapTeamForward(value : int)
{
	controls[controlEnum.SWAP_TEAM_FORWARD] = value;
}
function setSwapTeamBack(value : int)
{
	controls[controlEnum.SWAP_TEAM_BACK] = value;
}
function setSwapTabForward(value : int)
{
	controls[controlEnum.SWAP_TAB_FORWARD] = value;
}
function setSwapTabBack(value : int)
{
	controls[controlEnum.SWAP_TAB_BACK] = value;
}

//----------------------
// Save / Load settings
//----------------------
function saveControls(saveLocation : String, saveName : String)
{
	var sw : StreamWriter = new System.IO.StreamWriter(saveLocation + saveName + ".json");
	sw.WriteLine(JsonUtility.ToJson(controls));
	sw.Close();
}

function loadControls(loadLocation : String, loadName : String)
{
	var sr : StreamReader = new System.IO.StreamReader(loadLocation + loadName + ".json");

	var line : String = "";

	while (!sr.EndOfStream)
	{
		line += sr.ReadLine();
	}
	sr.Close();

	//controls = JsonUtility.FromJson(line, Hashtable);
}
