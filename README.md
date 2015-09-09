# BankMockup

#### A little coding exercise : duplicate the look of pdf document as a web page, pull in data via ajax.


**How do I see it?**
Clone down the repo as standard.  Go into the directory...
Becasue of the ajax call, you can't just pull index.html into the browser.  Instead, start a web server in the top level directory of the project to serve index.html.  On a mac, this is as simple as:

`python -m SimpleHTTPServer 8000`

in the top level of the project directory.  Then you can simply browse to:

`http://localhost:8000`

### Comments
- I had to make some initial assumptions about the pdf model, and decisions about how to put the html together.  I feel now that I made a mistake using a css framework ([pure-css](http://purecss.io/)) for browser-reset and some canned stuff like drop-down menus; it didn't really help much, I should've skipped using the css framework.
- Related to the above, I was hoping that using the css framework would buy me free responsive-ness;  in other words resizing the browser to mobile sizes would behave well.  Well, given the pdf model, this was not a good thought on my part.  In fact, at this point resizing to mobile sizes breaks things :-(
- To put together the container with all the balances and everything such that it matched the look of the pdf page, I did a bunch of javascript for placement of things like the small-font cent fractions, etc...   Looking back, it feels like I used an elephant gun to kill a mouse.  So if I were to do it all over again, and if this project was any bigger and had any chance of being used and modified in the future, I'd want to rethink how I did all that, and refactor.
- I tried the **Montserrat** font for balances using the GoogleCDN; the only weights they had were all too thick.  I wound up not using it.