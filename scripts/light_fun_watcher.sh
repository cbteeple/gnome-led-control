#! /bin/bash

function onScreenLock() {
	bash ~/light_fun_off.sh $1
	bash ~/light_fun_set.sh $1 8
	bash ~/light_fun_bright.sh $1 0
	bash ~/light_fun_on.sh $1
    #bash ~/light_fun_off.sh $1
}

function onScreenUnlock() {
	bash ~/light_fun_off.sh $1
	bash ~/light_fun_bright.sh $1 7
	bash ~/light_fun_set.sh $1 18
    bash ~/light_fun_on.sh $1
}

#dbus-monitor --session "type='signal',interface='org.gnome.ScreenSaver'" | 
gdbus monitor -y -d org.freedesktop.login1 |
	while true; 
	do 
	    read X;
	    if [[ "$X" == *"LockedHint': <true>"* ]]; then

	    #	echo $X | grep "LockedHint': <true>" &> /dev/null;
	    #then
	    	echo "LOCKED"
	        onScreenLock $1

	    
	   #elif echo $X | grep "LockedHint': <false>" &> /dev/null; 
	    elif [[ "$X" == *"LockedHint': <false>"* ]]; then 
	    	echo "UNLOCKED"
	        onScreenUnlock $1
	    fi
	done 