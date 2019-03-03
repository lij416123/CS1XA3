
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
  if [ $@ == 1 ] ; then
    read -p "Would you like to have a small personality test?(y/n) " var
    if [[ $var == n ]] ; then
      echo ok bye
    else
      echo What do you usually do when you are eating fries? Please enter a letter.
      echo a  Without sauces
      echo b  Squeeze the sauces in another clean container and eat fries with the sauces
      echo c  Squeeze all the sauces in the container with fries
      echo d  Carefully squeeze the sauces on each fries when eating

      read var0
      if [[ $var0 == a ]] ; then
        echo You are such a lovely and innocent angel!
        echo You are still living in a dreamy and peaceful world just like the world in fairy stories. Its good that you still keep the innocence of a child.
        echo But isnt it not good that you are like a child who will never grow up?
        echo You are very smart. But you are very eary to be satisfied with your life.
      fi
      if [[ $var0 == b ]] ; then
        echo You are a phlegmatic and taciturn person!
        echo You always keep calm and being methodical and prudent.
        echo You always have sense of responsibility. And you can always perfectly finish the work the boss gives you.
        echo However, be careful, dont be too indecisive.
      fi
      if [[ $var0 == c ]] ; then
        echo You are a gentle and conservative person!
        echo You are very ambitious. However you care too much about other peoples opinions,
        echo which makes you hesitant all the time.
      fi
      if [[ $var0 == d ]] ; then
        echo You are a romantic poet!
        echo You are passionate and warm-hearted. However you are too emotional sometimes,
        echo which makes you easily be deceived. And once you get into pain, its hard for you overcome it.
      fi
    fi
  fi
# This is my custom feature
# a personality test


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
