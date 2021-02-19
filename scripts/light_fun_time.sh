stty -F /dev/$1 -hupcl
echo -en 'time;'$2'\n' >/dev/$1
echo 'Setting animation time: '$2