define( [
    "qlik", 
    "jquery",
    "css!./lock-unlock-ios-toggle.css"
    // "./js/myCode"
],
/**
* @owner Deepak Vadithala (AKA: DV), @dvadithala, GitHub: iamdv
*/

function (qlik, $, cssContent) {

var app = qlik.currApp(this);

var myCustomObj = {
	myObjLockAllOrFewFields: {
		type: "boolean",
		component: "radiobuttons",
		label: "Select One: ",
		ref: "props.myCustomObj.myObjLockAllOrFewFields",
		options: [{value: 1, label: "Lock/Unlock All Fields"}, {value: 2, label: "Lock/Unlock by User Selections"}],
		defaultValue: 2 
	},		
	myObjSwitchIncludeClearField: {
		type: "boolean",
		component: "switch",
		label: "Enable Clear Field Selections",
		ref: "props.myCustomObj.myObjSwitchIncludeClearField",
		options: [{value: true, label: "Enabled"}, {value: false, label: "Not Enabled"}],
		defaultValue: false
	},	
	myObjLabel: {
		ref:"props.myCustomObj.myObjLabel",
		label:"ios Toggle Label",
		type:"string",
	},
	myObjLabelBold:{
		component:"checkbox",
		ref:"props.myCustomObj.myObjLabelBold",
		label:"Bold",
		type:"boolean"
	},
	myObjLabelItalic:{
		component:"checkbox",
		ref:"props.myCustomObj.myObjLabelItalic",
		label:"Italic",
		type:"boolean"
	},
	myObjLockOptionsText: {
		component: "text",
		label:"Specify Field Manager Name only if you have opted - 'Lock/Unlock by User Selections'"
	},	
	myObjLockFieldName: {
		ref:"props.myCustomObj.myObjLockFieldName",
		label:"Data Island Name (Ex: $Field)",
		type:"string",
	}
};

var myAppearenceSection = {
	uses:"settings",
	items: {
		myListItems: {
			label: "Variable Properties",
			items: {
					myObjLockAllOrFewFields: myCustomObj.myObjLockAllOrFewFields,
					myObjSwitchIncludeClearField: myCustomObj.myObjSwitchIncludeClearField,
					myObjLabel: myCustomObj.myObjLabel,
					myObjLabelBold: myCustomObj.myObjLabelBold,
					myObjLabelItalic: myCustomObj.myObjLabelItalic,
					myObjLockOptionsText: myCustomObj.myObjLockOptionsText,
					myObjLockFieldName: myCustomObj.myObjLockFieldName
			}			
		}		
	}
};

	return {
		definition:{
			type: "items",
			component:"accordion",
			items:{
				appearance: myAppearenceSection
			}
		},
		paint: function ($element, layout) {

			/* ==========================================================*/
			/* Creating custom object which holds the configuration
			settings */

			var myObjLockUnlockProps ={
				option: layout.props.myCustomObj.myObjLockAllOrFewFields,
				clearfield: layout.props.myCustomObj.myObjSwitchIncludeClearField,
				label: layout.props.myCustomObj.myObjLabel,
				bold: layout.props.myCustomObj.myObjLabelBold,
				italic: layout.props.myCustomObj.myObjLabelItalic,
				fieldname: layout.props.myCustomObj.myObjLockFieldName
			};

			/* ==========================================================*/			
			
			/* ==========================================================*/
			/* This block of code generate relevant HTML and renders  */

            var myDevMessage = '############# Hi there, this extension was developed by Deepak Vadithala. Follow me @dvadithala #############';
            var myHTML = '<div class="item"> <p>' 
	            + (myObjLockUnlockProps.bold ? '<b>' : '' ) 
	            + (myObjLockUnlockProps.italic ? '<i>' : '' ) 
	            +  (typeof myObjLockUnlockProps.label == "undefined" ? '' : myObjLockUnlockProps.label)  
	            + (myObjLockUnlockProps.italic ? '</i>' : '' )
	            + (myObjLockUnlockProps.bold ? '</b>' : '' ) 
	            + '</p> <input type="checkbox" id="id_lock_unlock_toggle" name="" value=""> <div class="toggle"> <label for="id_lock_unlock_toggle"><i></i></label> </div> </div>';
			
            $element.html(myHTML);
            console.log(myDevMessage);
			/* ==========================================================*/            
			
			/* ==========================================================*/
			/* This block on code assign custom object field name to internal 
			QlikSense field names. For exampleL $Field contains all the 
			field names. */

			var myField = app.field("'" + myObjLockUnlockProps.fieldname + "'");
			myField.getData();
			/* ==========================================================*/

			/* ==========================================================*/
			/* This code LOCKS and UNLOCKS fields based on user selections */
			
			var myObjSelectedLockedFields = {};

			/* ==========================================================*/
			/* ==========================================================*/
			$("#id_lock_unlock_toggle").click(function myFuncLockUnLockToggle(){
				myObjSelectedLockedFields = {};
				
				/* ----------------------------------------------------------*/
				myField.rows.forEach(function (item, index){
					myObjSelectedLockedFields[item.qText] = item.qState;			  						  		
			  	});
				/* ----------------------------------------------------------*/

				/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
				if( $('#id_lock_unlock_toggle').is(':checked') ){
					
					if(myObjLockUnlockProps.option === 1){
						app.lockAll();
					} else if(myObjLockUnlockProps.option === 2){
						for (var myProps in myObjSelectedLockedFields){
							if (myObjSelectedLockedFields[myProps] === 'S'){
								app.field(myProps).lock();
							}
						}											
					}

				} else if( !$('#id_lock_unlock_toggle').is(':checked') ){
					
					/* ......................................................*/
					if(myObjLockUnlockProps.option === 1){
						app.unlockAll();
						if(myObjLockUnlockProps.clearfield){
							app.clearAll();
						}
					} else if(myObjLockUnlockProps.option === 2){
						for (var myProps in myObjSelectedLockedFields){
							if (myObjSelectedLockedFields[myProps] === 'S'){
								app.field(myProps).unlock();
								if(myObjLockUnlockProps.clearfield){
									app.field(myProps).clear()
								}
							}
						}						
					}
					/* ......................................................*/
				}
				/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			});
			/* ==========================================================*/
			/* ==========================================================*/
		}
	};

} );



