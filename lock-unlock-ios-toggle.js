define( [
    "qlik", 
    "jquery",
    "css!./lock-unlock-ios-toggle.css"
    // "./js/myCode"
],
/**
* @owner Deepak Vadithala (AKA: DV), @dvadithala
*/

function (qlik, $, cssContent) {

var app = qlik.currApp(this);

var myCustomObj = {
	myObjTextBox: {
		ref:"props.myCustomObj.myObjTextBox",
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
	}	
};

var myAppearenceSection = {
	uses:"settings",
	items: {
		myListItems: {
			label: "Variable Properties",
			items: {
					myObjTextBox: myCustomObj.myObjTextBox,
					myObjLabelBold: myCustomObj.myObjLabelBold,
					myObjLabelItalic: myCustomObj.myObjLabelItalic
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

            var myDevMessage = '############# Hi there, this extension has been built by Deepak Vadithala. Follow me @dvadithala #############';
            var myHTML = '<div class="item"> <p>' 
            + (layout.props.myCustomObj.myObjLabelBold ? '<b>' : '' ) 
            + (layout.props.myCustomObj.myObjLabelItalic ? '<i>' : '' ) 
            +  (typeof layout.props.myCustomObj.myObjTextBox == "undefined" ? '' : layout.props.myCustomObj.myObjTextBox)  
            + (layout.props.myCustomObj.myObjLabelItalic ? '</i>' : '' )
            + (layout.props.myCustomObj.myObjLabelBold ? '</b>' : '' ) 
            + '</p> <input type="checkbox" id="id_lock_unlock_toggle" name="" value=""> <div class="toggle"> <label for="id_lock_unlock_toggle"><i></i></label> </div> </div>'
			
			var myValueToggle = 0;

            $element.html(myHTML);
            console.log(myDevMessage);

			$("#id_lock_unlock_toggle").click(function myFuncLockUnLockToggle(){
				if(myValueToggle % 2 === 0){
					app.lockAll();
					myValueToggle = 1;
				} else{ 
					app.unlockAll();
					myValueToggle = 0;
				}
			});

		}
	};

} );
