stty -F /dev/$1 -hupcl
echo -en 'off\n' >/dev/$1