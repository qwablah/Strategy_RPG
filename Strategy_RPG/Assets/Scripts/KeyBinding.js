#pragma strict
import System.IO;
import System.Collections.Generic;

/***********************************
KeyBinding
Handles key bindings
Mark Murphy
Start	- 1/12/2018
Update	- 1/16/2018
***********************************/

enum controlEnum 
{
	NORTH, SOUTH, EAST, WEST,
	ACTION, MENU, ACCEPT, BACK,
	SWAP_TEAM_FORWARD, SWAP_TEAM_BACK,
	SWAP_TAB_FORWARD, SWAP_TAB_BACK
};

class KeyBind
{
	public var boundKey : controlEnum;
	public var keyboardBind : List.<KeyCode>;

	function KeyBind (key : controlEnum, binding : List.<KeyCode>)
	{
		this.boundKey = key;
		this.keyboardBind = binding;
	}
};


class Controls
{
	public var controlList : List.<KeyBind>;

	function Controls()
	{
		controlList = new List.<KeyBind>();
	}

	function sortControls()
	{
		controlList.Sort(function(x : KeyBind){return x.boundKey;});
	}
};

private var controls : Controls;

function Start ()
{
	setToDefault();
}

function Update ()
{
	
}

function setKeyBinding(index : controlEnum, value : KeyCode)
{
	controls.controlList[index].keyboardBind.Add(value);
}
function clearKeyBinding(index : controlEnum)
{
	controls.controlList[index].keyboardBind = null;
}

function setToDefault()
{
	controls.controlList.Clear();

	// Directions
	controls.controlList.Add(new KeyBind(controlEnum.NORTH, new List.<KeyCode>(KeyCode.W)));
	controls.controlList.Add(new KeyBind(controlEnum.SOUTH, new List.<KeyCode>(KeyCode.S)));
	controls.controlList.Add(new KeyBind(controlEnum.EAST, new List.<KeyCode>(KeyCode.A)));
	controls.controlList.Add(new KeyBind(controlEnum.WEST, new List.<KeyCode>(KeyCode.D)));

	// Actions
	controls.controlList.Add(new KeyBind(controlEnum.ACTION, new List.<KeyCode>(KeyCode.N)));
	controls.controlList.Add(new KeyBind(controlEnum.MENU, new List.<KeyCode>(KeyCode.J)));
	controls.controlList.Add(new KeyBind(controlEnum.ACCEPT, new List.<KeyCode>(KeyCode.M)));
	controls.controlList.Add(new KeyBind(controlEnum.BACK, new List.<KeyCode>(KeyCode.K)));

	// Swaping
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TEAM_FORWARD, new List.<KeyCode>(KeyCode.B)));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TEAM_BACK, new List.<KeyCode>(KeyCode.H)));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TAB_FORWARD, new List.<KeyCode>(KeyCode.B)));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TAB_BACK, new List.<KeyCode>(KeyCode.H)));
}





//----------------------
// Save / Load settings
//----------------------
function saveControls()//saveLocation : String, saveName : String)
{
	var saveLocation = "";
	var saveName = "Test";
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
