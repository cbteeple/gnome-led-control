stty -F /dev/$1 -hupcl
echo -en 'bright;'$2'\n' >/dev/$1
echo 'Setting to brightness: '$2