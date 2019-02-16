#!/bin/bash
cd ..

if [ $# -eq 0 ] ; then
  echo "No inputs!"
else
  if [ $@ == 1 ] ; then
    grep -r --exclude="todo.log" "#TODO" > ./Project01/logs/todo.log
  fi
fi
