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

	public function SaveToString()
	{
		return JsonUtility.ToJson(this);
	}

	public function Load(savedData: String)
	{
		JsonUtility.FromJsonOverwrite(savedData, this);
	}
};



private var controls : BoundControls;
private var addingBinding : boolean;

function Start ()
{
	addingBinding = false;

	setFilePath();
	setToDefault();
	loadControls();
}

function Update ()
{
	
}

function OnGUI()
{
	var e : Event = Event.current;
	if(e)
	{
		if(e.isKey && Input.GetKeyDown(e.keyCode))
		{
			print("Key Detected! - " + e.keyCode);
		}
		else if(e.isMouse && Input.GetMouseButtonDown(e.button))
		{
			print("Key Detected! - " + e.button);
		}
	}
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
	controls = new BoundControls();

	// Directions
	controls.controlList.Add(new KeyBind(controlEnum.NORTH, new List.<KeyCode>([KeyCode.W]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SOUTH, new List.<KeyCode>([KeyCode.S]) ));
	controls.controlList.Add(new KeyBind(controlEnum.EAST,  new List.<KeyCode>([KeyCode.A]) ));
	controls.controlList.Add(new KeyBind(controlEnum.WEST,  new List.<KeyCode>([KeyCode.D]) ));

	// Actions
	controls.controlList.Add(new KeyBind(controlEnum.ACTION, new List.<KeyCode>([KeyCode.N]) ));
	controls.controlList.Add(new KeyBind(controlEnum.MENU, 	 new List.<KeyCode>([KeyCode.J]) ));
	controls.controlList.Add(new KeyBind(controlEnum.ACCEPT, new List.<KeyCode>([KeyCode.M]) ));
	controls.controlList.Add(new KeyBind(controlEnum.BACK, 	 new List.<KeyCode>([KeyCode.K]) ));

	// Swaping
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TEAM_FORWARD, new List.<KeyCode>([KeyCode.B]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TEAM_BACK, 	new List.<KeyCode>([KeyCode.H]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TAB_FORWARD, 	new List.<KeyCode>([KeyCode.B]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TAB_BACK, 	new List.<KeyCode>([KeyCode.H]) ));
}





//----------------------
// Save / Load settings
//----------------------
var completeFilePath : String;

function setFilePath()
{
	var systemPath = System.Environment.GetFolderPath (System.Environment.SpecialFolder.ApplicationData);
	var withFile = Path.Combine(systemPath, "test_save_SRPG");
	Directory.CreateDirectory(withFile);
	completeFilePath = Path.Combine(withFile, "CustomKeyBinding.json");
}

function saveControls()
{
	File.WriteAllText(completeFilePath, controls.SaveToString());
}

function loadControls()
{
	try
	{
		controls.Load(File.ReadAllText(completeFilePath));
		print("load succeded!");
	}
	catch(e)
	{
		print("load failed! - " + e.Message);
	}
}
