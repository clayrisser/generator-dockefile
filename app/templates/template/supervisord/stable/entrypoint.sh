#!/bin/sh

echo ${1}, ${HELLO}!
exec /usr/bin/supervisord -c /etc/supervisord.conf
