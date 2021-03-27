stty -F /dev/$1 -hupcl
echo -en 'cycle;'$2'\n' >/dev/$1
echo 'Setting cycle time: '$2