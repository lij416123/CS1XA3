#!/bin/bash

if [ -e "~/CS1XA3/Project01/logs" ] ; then
  rm -r ~/CS1XA3/Project01/logs
else
  mkdir -p ~/CS1XA3/Project01/logs
  touch ~/CS1XA3/Project01/logs/todo.log ~/CS1XA3/Project01/logs/compile_fail.log ~/CS1XA3/Project01/logs/merge.log 
fi
#create a new directory logs containing todo.log compile_fail.log merge.log


cd ..
# going back to ~/CS1XA3 dir


if [ $# -eq 0 ] ; then
  echo "No inputs!"
# check for no input


else
  if [ $@ == 2 ] ; then
    grep -r --exclude="todo.log" "#TODO" > ./Project01/logs/todo.log
  fi
# 5.2 Create a TODO Log
# use grep to find files with "#TODO", and use > to create/overwrite the file todo.log


  if [ $@ == 3 ] ; then
    for i in $(find . -name "*.hs") ; do
      ghc $i 2>> ./Project01/logs/compile_fail.log
    done
    for m in $(find . -name "*.py") ; do
      python $m 2>> ./Project01/logs/compile_fail.log
    done
  fi
# 5.3 compile error log
# use find to find out all haskell and python files,
# compile them and redirect all files with syntax errors to compile_fail.log file


  if [ $@ == 4 ] ; then
    git log --oneline | grep -i "merge" | cut -d' ' -f1 > ./Project01/logs/merge.log
  fi
# 5.4 Merge Log
# grep the commit message with "merge" or "Merge" 
# and get the first column which are the commit hashes, and redirect the output to merge.log


  if [ $@ == 5 ] ; then
    html=$(find . -name "*.html" | wc -l)
    js=$(find . -name "*.js" | wc -l)
    css=$(find . -name "*.css" | wc -l)
    py=$(find . -name "*py" | wc -l)
    hs=$(find . -name "*.hs" | wc -l)
    sh=$(find . -name "*.sh" | wc -l)
    echo "HTML: $html"
    echo "Javascript: $js"
    echo "CSS: $css"
    echo "Python: $py"
    echo "Haskell： $hs"
    echo "Bash Script file: $sh"
  fi
# 5.5 File Type Count
# find the name with extensions of each type of files, then count the number of these files


  if [ $@ == 6 ] ; then
    git ls-files . --exclude-standard --others | grep ".tmp" | xargs rm
  fi
# 5.6 Delete Temporary Files
# use the first command before fist pipt | to list all the untracked files
# grep the ones with ".tmp" extension
# use xargs to turn the output to be the arguement of rm


fi
