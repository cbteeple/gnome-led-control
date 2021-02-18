stty -F /dev/$1 -hupcl
echo -en 'on\n' >/dev/$1