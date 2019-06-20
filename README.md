# Matching Game
This project is one of my showcases of using React, a frontend framework, to illustrate some skills 
that I've learned through out the time that I spent on self-studying in order to switch my career into the web development field. It also acts as a confirmation/verification of my knowledge which will help me to develop the realworld application in the near future.

## Table of Contents
- [Getting Started](#getting-started)
  - [Installations](#installations)
- [Limitations](#limitations)
- [How to Play](#how-to-play)
  - [Scoring](#scoring)
- [Build With](#build-with)
  - [React Specifics](#react-specifics)
- [What can be improved](#what-can-be-improved)
- [Known Issues](#known-issues)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Installations
1. You can clone this repo or download the zip file. 
2. Whichever method you choose, once you have a copy of it, you have to install every dependencies that this project is needed by running a following command:
`npm install`
3. Finally, to run the dev server, follow by this command: `npm start`

## Limitations
1. This app, by no means, not building to operate in the offline condition. However, it is still usable when it goes offline, because, in fact, it is only one page with multiple components composed together.
2. Although, it can operate when no internet connection. But the font, using by this app is served through CDN, so it requires some connection beforehand.
3. Just for now, this app is not fully responsive but still playable. On the screen that has a width of 624px or lower will experience some off-screen UI.

## How to Play
1. At the start of the game, a welcome dialog will appear. 
2. Once you click a 'START' button, the game will show you all cards. There are 8 couples in total of 16 cards. You will have 5 seconds to remember the position of all cards.
3. After 5 seconds, all cards will be hidden. From there you will start clicking and finding a match for all of them.
4. Finally, when all cards are matched. A score dialog will appear to show a summary of your performance. Take some screenshot as you need or click reset button to play it again.

### Scoring
- __Moves__
  - Matching or mismatching counts as 1 move.
  - Get it as low as you can.
- __Stars__
  - Less than 5 mismatch counts, you get 3/3 stars.
  - Equal or more than 5 but less than 11 mismatch counts, you get 2/3 stars.
  - From 11 mismatch counts and onward, you get 1/3 stars.
- __Time__
  - It starts counting after initial 5 seconds. Finish the game as fast as you can.

## Build With
- __React 16.8__ - A web framework used.
- __Material-UI__ - A Design system (only use the styling solution).
  - __material-ui/styles__ - Used as a styling solution in __JSS__.
- __[animate.css](https://www.npmjs.com/package/animate.css)__ - A cross-browser CSS animations library.
- __[clsx](https://www.npmjs.com/package/clsx)__ - A tiny utility for constructing className strings conditionally.
- __SweetAlert2__ - A beautiful customizable replacement for JavaScript's popup boxes.
  - __[sweetalert2-react-content](https://www.npmjs.com/package/sweetalert2-react-content)__ - Official SweetAlert2 enhancer adding support for React elements as content. Used to create all game pop-up dialog.
- __[React Timer Machine](https://www.npmjs.com/package/react-timer-machine)__ - A fully controllable and customizable timer component for React.
- __Moment.js__ - A utility for manipulating, parsing and formatting dates.
  - __[Moment Duration Format](https://www.npmjs.com/package/moment-duration-format)__ - A format plugin for the Moment Duration object. Used in conjunction with *React Timer Machine*.
- __FontAwesome__ - A font and icon toolkit (Used only to create icon).
  - __[react-fontawesome](https://www.npmjs.com/package/react-fontawesome)__ - A React component for the font-awesome icon library

### React Specifics
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* This app is solely implemented using __React Hooks__. So, there is no class base component.
* The __`Promise` is heavily used__ to simplify all asynchronous task (for example, to manage sequece of transition effects) with the `setTimeout`, it improves readability of asynchronous task. 

## What can be improved
These following are some parts of the app that can be improved:
* For all asynchronous task can be further implemented using `async`/`await`, which will be a better way to express asynchronousity.
* For all transition effects can also be expressed by using [React Transition Group](http://reactcommunity.org/react-transition-group/), which might be an easier way to manage many transition effects (to be honest, I tried to use it once and it is pretty confusing. But I think that it can be useful. So, I will try it next time)
* Currently the state of application is a bit complicated. So, for some state operation can be coupled/bundled together using `useReducer` which improves readability.
* There is one bug which however __doesn't make any bad effect__ to the application. But, it is still currently unsolveable, due to as mention earlier, the state of application is a bit messy.
* Finally, the application can be design to achieve more responsiveness(styling wise). (But in my opinion, making the state more manageable takes the most priority)

## Known Issues
When you run a dev server, `npm start`, you might find some error or warning like this:
```
$ npm start

> matching-game@0.1.0 start c:\Users\YourUser\Path\To\matching-game
> react-scripts start

Starting the development server...

BrowserslistError: Unknown browser query `android all`
BrowserslistError: Unknown browser query `android all`
Compiled successfully!
```
The detail can be found here: [create-react-app “Failed to compile” on start up](https://stackoverflow.com/questions/56644607)

There is an another issue when you click opening card too fast:
![issue](issues/2019-06-20_14-51-39.gif)

This happens by design, because at first, in my opinion to prevent user from clicking too fast in this game might not be good experience. But, in the end, I end up with this issue. 

It cannot be easily solved, but the first step is to untangle app state + bundle relevant state operations, which will require some more time on refactoring. Anyway, that is what is coming next :)

## Acknowledgments
This project is a completly rewritten version of one of my project that I did sometime ago when I started learning Javascript with Udacity, so it was poorly written in Vanilla Javascript (it was the best I could do at that time!). You can check it [here](https://github.com/kivvvvv/fend-project-memory-game).

Many thanks to __Colt Steele__, the instructor of [The Modern React Bootcamp](https://www.udemy.com/modern-react-bootcamp/); one of my first resources to learn React.

Thanks to __whoever contribute to the React docs__. It is always very initutive to read and learn from the creator.

And finally, thanks to me - myself. To stay resilience all this time. But still, there is a long way to go and I know what's coming next, getting a job. So..? let's go!