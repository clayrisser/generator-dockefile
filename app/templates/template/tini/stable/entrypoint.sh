#!/bin/sh

echo ${1}, ${HELLO}!
exec sh -c "while sleep 1; do echo $(date); done"
