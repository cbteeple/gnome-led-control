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


function _set_Time(num){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_time.sh';
    let bash_str="bash "+bash_script+' '+USBdev + " " + num
    Util.spawnCommandLine(bash_str);

    /*_showHello(bash_str) */

}

function _set_Pulse(num){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_pulse.sh';
    let bash_str="bash "+bash_script+' '+USBdev + " " + num
    Util.spawnCommandLine(bash_str);

    /*_showHello(bash_str) */

}


function _set_Cycle(num){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_cycle.sh';
    let bash_str="bash "+bash_script+' '+USBdev + " " + num
    Util.spawnCommandLine(bash_str);

    /*_showHello(bash_str) */

}


function _example_python(){
    let python_script = '~/light_fun_off.py';
    Util.spawnCommandLine("python " + python_script);

}


function _wait_LED_start(on){
    let bash_script = Me.dir.get_path()+'/scripts/light_fun_watcher.sh';
    let bash_str="bash "+bash_script+' '+USBdev

    Util.spawnCommandLine("pkill -f light_fun_watcher.sh")
    Util.spawnCommandLine('pkill -f "gdbus monitor"')

    if (on){
        Util.spawnCommandLine(bash_str);
    }
}

function _wait_LED(toggle){
    
    if (toggle.state){
        _wait_LED_start(true)
        //_showHello('test')
    }
    else{
        _wait_LED_start(false)
        //_showHello('off')
    }

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



    let switchmenuitem = new PopupMenu.PopupSwitchMenuItem('Dim On Lock', true);
    this.menu.addMenuItem(switchmenuitem);
    switchmenuitem.connect('toggled',_wait_LED);



    let subItem4 = new PopupMenu.PopupSubMenuMenuItem('Set Transition Time');
    this.menu.addMenuItem(subItem4);


    for (var i = 0; i <= 50; i=i+10) {
        let popupImageMenuItem0 = new PopupMenu.PopupMenuItem(
          i.toString()+" ms",
        );

        let inew = i*1;

        let istr = inew.toString();
        subItem4.menu.addMenuItem(popupImageMenuItem0);
        popupImageMenuItem0.connect('activate',function(){ _set_Time(istr);});
    }



    let subItem5 = new PopupMenu.PopupSubMenuMenuItem('Set Pulse Time');
    this.menu.addMenuItem(subItem5);


    for (var i = 0; i <= 50; i=i+10) {
        let popupImageMenuItem0 = new PopupMenu.PopupMenuItem(
          i.toString()+" ms",
        );

        let inew = i*1;

        let istr = inew.toString();
        subItem5.menu.addMenuItem(popupImageMenuItem0);
        popupImageMenuItem0.connect('activate',function(){ _set_Pulse(istr);});
    }




    let subItem6 = new PopupMenu.PopupSubMenuMenuItem('Set Color Cycle Time');
    this.menu.addMenuItem(subItem6);


    for (var i = 0; i <= 50; i=i+5) {
        let popupImageMenuItem0 = new PopupMenu.PopupMenuItem(
          i.toString()+" ms",
        );

        let inew = i*1;

        let istr = inew.toString();
        subItem6.menu.addMenuItem(popupImageMenuItem0);
        popupImageMenuItem0.connect('activate',function(){ _set_Cycle(istr);});
    }

    
    


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

        let inew = (i+1)*10;

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

    _wait_LED_start(true)

}


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
