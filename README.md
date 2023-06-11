# sass-template

A simple SASS template structure to start a SASS driven project

# SASS TEMPLATE STRUCTURE

## URL: [github.com/beutnagel/sass-template](https://github.com/beutnagel/sass-template)

_License: Free for all, no attribution required._

### This template is structured as follows

<pre>
/style.scss                 This file is used for generating style.css and loads the contents of /components and /pages
/style.css                  Generated file. Do not edit this file. 
/styles/                    All SASS workfiles

/styles/core/               All core files that should be used and accessible across the entire site
/../core/index.scss         Forwards all files in this folder. Remember to update when adding new files to folder
/../core/reset.scss         A general CSS reset
/../core/colors.scss        Brand colors defined as SASS variables
/../core/fonts.scss         Default styling for fonts and display headings

/styles/components/         All component files should recide here. 
                            A component file should include all styling and variants for the component
/../components/index.scss   Forwards all files in this folder. Remember to update when adding new files to folder           

/styles/pages/              All layout files for different pages/screens should recide here.
                            A page file only includes the layout styling required to display a page that includes one or more components.
/../components/index.scss   Forwards all files in this folder. Remember to update when adding new files to folder           
</pre>

## TIPS FOR USAGE

- Remember to update the index file whenever you add a new component or page
- Setup your CSS PREPROCESSOR so that only the style.css output file is generated. No other .css files are needed.