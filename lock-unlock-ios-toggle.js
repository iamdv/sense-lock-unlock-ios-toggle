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
		

	return {
		paint: function ($element) {

            var myDevMessage = '############# Hi there, this extension has been built by Deepak Vadithala. Follow me @dvadithala #############';
            var myHTML = '<div class="item"> <p>Lock Current Selections</p> <input type="checkbox" id="id_lock_unlock_toggle" name="" value=""> <div class="toggle"> <label for="id_lock_unlock_toggle"><i></i></label> </div> </div>'
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
