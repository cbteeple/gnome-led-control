stty -F /dev/$1 -hupcl
echo -en 'set;'$2'\n' >/dev/$1
echo 'Setting to color: '$2