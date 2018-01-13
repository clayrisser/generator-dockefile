#!/bin/sh

cp /usr/share/zoneinfo/$TZ /etc/localtime
echo $TZ > /etc/timezone
exec /usr/bin/supervisord -c /etc/supervisord.conf
