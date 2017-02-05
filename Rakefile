infile  = 'opal_app.rb'
outfile = 'opal_app.js'

# I like to give the default a description so that it shows up when you `rake -T`
desc 'Default task: compile'
task default: :compile

desc 'Compile Opal for Ruby in the browser'
task compile: outfile

# Outfile depends on infile, so if outfile has updated, infile needs to be recompiled
file infile
file outfile => infile do
  sh 'opal',                     # The opal compiler, if you don't have it, `sh build.sh`
     '--require', 'opal-parser', # No idea why we need this and also need to require it in the file
     '--compile',                # Vs interpreting the way that Ruby does
     'opal_app.rb',              # Couldn't figure out how to not give it a main file to compile
     out: outfile                # It prints the result, so redirect that to the output file
end

# Tasks to delete generated code b/c it was getting annoying
require 'rake/clean'
CLOBBER << outfile

desc 'Blow away generated files and run again'
task rebuild: [:clean, :clobber, :compile]
