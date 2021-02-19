stty -F /dev/$1 -hupcl
echo -en 'pulse;'$2'\n' >/dev/$1
echo 'Setting pulse time: '$2