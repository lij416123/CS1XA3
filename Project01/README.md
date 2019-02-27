5.1 system input

        make the script interactive by system input

        input of each integers 1/2/3/4/5/6  decides to execute each features

        (i.e. 1 represents the custom feature

              2 represents feature 5.2

              6 represents feature 5.6 )


5.2 create a TODO Log

        use grep to find files with "#TODO", and use > to create/overwrite the file todo.log


5.3 Compile Error Log

        use find to find out all haskell and python files,

        compile them and redirect all files with syntax errors to compile_fail.log file


5.4 Merge Log

	grep the commit message with "merge" or "Merge"

	and get the first column which are the commit hashes, and redirect the output to merge.log


5.5 File Type Count

	 find the name with extensions of each type of files, 

	then count the number of these files


5.6 Delete Temporary Files

	use the first command before fist pipt | to list all the untracked files

	grep the ones with ".tmp" extension

	use xargs to turn the output to be the arguement of rm

