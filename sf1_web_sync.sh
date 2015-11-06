#!/bin/sh

#ignore_list=$(<\.gitignore)
#echo $ignore_list
#for bla in ignore_list
#do
#  echo $bla
#endfor

echo "Checking for installed symfony1-plugins."
plugin_list=$(ls plugins)
for pluginname in $plugin_list
do
  echo "$pluginname: checking for web folder."
  src_dir="./plugins/$pluginname/web"
  if test -d $src_dir
  then
    echo "$pluginname: web folder found."
    target_dir="./web/$pluginname"
    target_dir=${target_dir%Plugin}
    echo "$pluginname: copying $src_dir to $target_dir"
    test -d "$target_dir" || mkdir -p "$target_dir" && cp -Rf "$src_dir"/* "$target_dir"
    echo "$pluginname: adding $target_dir to .gitignore"

  else
    echo "$pluginname: no web folder."
  fi
done
