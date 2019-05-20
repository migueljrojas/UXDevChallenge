# Ssr. UX Developer Challenge!

## TLDR
* Deliverables are in `dist` folder
* If you want to check the source code is in `src` folder
* To build the project locally clone it and run `npm install && npm start`

## Description
I started by setting up an static generator since that setup would give me most of the deliverable requirements from the beginning. I used gulp to run the tasks that would wrap up everything i needed.

Once that setup was done, i did the scaffolding for the project, dividing it into modules to keep everything in order and easy to scale and mantain.

Then, i started by developing the hero component, both the slider and buttons. I added css animations so it would be more appealing. I did the functionality  just for two slides/watch models as shown in the design; since it's a product landing page, it's not likely to have more than those two, and in a real case scenario, that's a question to ask prior to development so it'd be prepared to deal with more models if that were the case. I added hover and active states for the buttons, and transitions to the slides. I used clip-path to avoid using a cutted image as a limitation, and implemented a polyfill for cross-browser compatibiity of the clip-path property.

I switched to the post content section which was very straight forward; i did applied a couple of tricks there though, i used responsive font-size with vmin units for mobile and tablet resolutions, and rem units for desktop. That way text size is always balanced no matter the screen size. I implemented a simple grid system bootstrap alike to handle grid structure for mobile, tablet and desktop. Even though it wasn't required to match the design, it's closer to what would be needed in a real project. I applied the padding-bottom trick on the image to prevent browser repaint and reflow when the image is loading, and kept distances in rems or % to keep everything in proportion regardless of the screen size.

Finally implemented a sample integration of sharedcount, with social network colors and icons.

## Toolset
* Pug for html templating
* SASS for CSS preprocessing
* ES6 javascript
* Used the following tasks with gulp for optimization:
  ..- `Styling` Autoprefix CSS rules
  ..- `Styling` PostCSS for minification
  ..- `Images` Minification
  ..- `JavaScript` Roll-up for bundling and babel for transpiling
  ..- `JavaScript` Script uglyfing and minification
  ..- `HTML` Pug compiled and minified
 
## Deliverables
* `✓ - check` Complete project files working on Chrome, Safari, Firefox and Edge, all of them on the latest version and the previous one.
* `✓ - check` Integrate a social media shared counts using AJAX for each of the major ones, such as Facebook, Twitter, Instagram and LinkedIn. (http://docs.sharedcount.com/).
* `✓ - check` Perform a some project optimizations that you may consider important before submit it.
