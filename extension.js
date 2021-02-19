/* extension.js */

// Example #1

const {St, Clutter} = imports.gi;
const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;

const Util = imports.misc.util;

const Tweener = imports.ui.tweener;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Gtk = imports.gi.Gtk;

let myPopup;
let panelButton;
let text;

let USBdev="ttyUSB0";


let shows =["Red Solid",
    "Red Pulsing",
    "Yellow Solid",
    "Yellow Pulsing",
    "Green Solid",
    "Green Pulsing",
    "Blue Solid",
    "Blue Pulsing",
    "Purple Solid",
    "Purple Pulsing",
    "Magenta Solid",
    "Magenta Pulsing",
    "White Solid",
    "Rainbow (Still)",
    "Go Blue!",
    "Rave",
    "Chill",
    "Rainbow Rave",
    "Rainbow Chill",
    ];

let bright = ["10%", "20%", "30%", "40%", "50%", "60%","70%","80%","90%","100%"];


function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello(text_in) {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: text_in });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}


function _start_LED(){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_on.sh';
    Util.spawnCommandLine("bash "+bash_script+' '+USBdev);

}


function _stop_LED(){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_off.sh';
    Util.spawnCommandLine("bash "+bash_script+' '+USBdev);

}

function _set_LED(num){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_set.sh';
    let bash_str="bash "+bash_script+' '+USBdev + " " + num
    Util.spawnCommandLine(bash_str);

    /*_showHello(bash_str) */

}


function _set_Bright(num){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_bright.sh';
    let bash_str="bash "+bash_script+' '+USBdev + " " + num
    Util.spawnCommandLine(bash_str);

    /*_showHello(bash_str) */

}


function _example_python(){
    let python_script = '~/light_fun_off.py';
    Util.spawnCommandLine("python " + python_script);

}


function _wait_LED(){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_watcher.sh';
    let bash_str="bash "+bash_script+' '+USBdev

    Util.spawnCommandLine("pkill -f light_fun_watcher.sh")
    Util.spawnCommandLine('pkill -f "gdbus monitor"')
    Util.spawnCommandLine(bash_str);

    /*_showHello(bash_str) */

}




const MyPopup = GObject.registerClass(
class MyPopup extends PanelMenu.Button {

  _init () {

    super._init(0);

    let icon = new St.Icon({
      //icon_name : 'security-low-symbolic',
      gicon : Gio.icon_new_for_string( Me.dir.get_path() + "/icons/led-symbolic.svg" ),
      style_class : 'system-status-icon',
    });

    this.add_child(icon);

    /*

    let pmItem = new PopupMenu.PopupMenuItem('Normal Menu Item');
    pmItem.add_child(new St.Label({text : 'Label added to the end'}));
    this.menu.addMenuItem(pmItem);

    pmItem.connect('activate', () => {
      log('clicked');
    });

    this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

    this.menu.addMenuItem(
      new PopupMenu.PopupMenuItem(
        "User cannot click on this item",
        {reactive : false},
      )
    );

    this.menu.connect('open-state-changed', (menu, open) => {
      if (open) {
        log('opened');
      } else {
        log('closed');
      }
    });
    */

    let popupImageMenuItem3 = new PopupMenu.PopupImageMenuItem(
      'Dim On Lock (Restart Service)',
      'media-playback-stop-symbolic',
    );
    this.menu.addMenuItem(popupImageMenuItem3);
    popupImageMenuItem3.connect('activate',_wait_LED);

    this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());


    // sub menu
    let subItem = new PopupMenu.PopupSubMenuMenuItem('Set Animation');
    this.menu.addMenuItem(subItem);


    for (var i = 0; i < 19; i++) {
        let popupImageMenuItem0 = new PopupMenu.PopupMenuItem(
          shows[i],
        );

        let inew = i*1;

        let istr = inew.toString();
        subItem.menu.addMenuItem(popupImageMenuItem0);
        popupImageMenuItem0.connect('activate',function(){ _set_LED(istr);});
    }


    // sub menu for brightness
    let subItem2 = new PopupMenu.PopupSubMenuMenuItem('Set Brightness');
    this.menu.addMenuItem(subItem2);


    for (var i = 0; i < 10; i++) {
        let popupImageMenuItem0 = new PopupMenu.PopupMenuItem(
          bright[i],
        );

        let inew = i*1;

        let istr = inew.toString();
        subItem2.menu.addMenuItem(popupImageMenuItem0);
        popupImageMenuItem0.connect('activate',function(){ _set_Bright(istr);});
    }

    this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

    // image item
    let popupImageMenuItem = new PopupMenu.PopupImageMenuItem(
      'Turn On LEDs',
      'media-playback-start-symbolic',
    );
    this.menu.addMenuItem(popupImageMenuItem);

    let popupImageMenuItem2 = new PopupMenu.PopupImageMenuItem(
      'Turn Off LEDs',
      'media-playback-stop-symbolic',
    );
    this.menu.addMenuItem(popupImageMenuItem2);


    popupImageMenuItem.connect('activate',_start_LED);
    popupImageMenuItem2.connect('activate',_stop_LED);



    // you can close, open and toggle the menu with
    // this.menu.close();
    // this.menu.open();
    // this.menu.toggle();
  }
});







function init () {

    _wait_LED()

}


/*
function init () {
    // Create a Button with "Hello World" text
    panelButton = new St.Bin({
        style_class : "panel-button",
        reactive: true,
        can_focus: true,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });

    let panelButtonText = new St.Label({
        text : "Hello World",
        y_align: Clutter.ActorAlign.CENTER,
    });


    
    let gicon = Gio.icon_new_for_string(Me.path + "/icons/led-symbolic.svg");
    icon = new St.Icon({ gicon });
    icon.set_icon_size(20);


    panelButton.set_child(icon);

    panelButton.connect('button-press-event', _showHello);
}
*/

/*

function init () {
	let widgetBoxLayout = new St.BoxLayout();

	let iconPath = `${Me.path}/icons/led-icon-symbolic.svg`;
	// just for debug if path is correct
	log(`${Me.metadata.name}: Icon path=${iconPath}`);
	let gicon = Gio.icon_new_for_string(`${iconPath}`);
	let icon = new St.Icon({ gicon: gicon, style_class: 'system-status-icon', icon_size: 16 });

	// this works for build-in icon:
	//let icon = new St.Icon({ icon_name: 'system-search-symbolic', style_class: 'system-status-icon'});

	widgetBoxLayout.add(icon);
	widgetBoxLayout.add(this.widgetText);
}
*/

function enable () {
    // Add the button to the panel
    //Main.panel._rightBox.insert_child_at_index(panelButton, 0);

    myPopup = new MyPopup();
    Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

function disable () {
    // Remove the added button from panel
    //Main.panel._rightBox.remove_child(panelButton);

    myPopup.destroy();
}
