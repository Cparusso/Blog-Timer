# // Blog Timer

This app is a simple timer app built using react. Unlike most timers I've used, this timer displays the updating time up in the title of the tab so that you can have the timer running in the background while you are presenting something and see how much time you have left without having to switch tabs.

When you have one minute remaining a warning sound will play, and when time runs out the app will start applauding you.

An additional feature is that once you run out of time, the timer will start counting up. This allows you to see how long you went over, so that if you're rehearsing your presentation you can know how much you need to shorten your speech.

Simply fork and clone this repo and run `npm install && npm start` to get started, or navigate directly to the site by clicking [here](http://blogtimer.herokuapp.com/).

# Upcoming Features

- I will be putting in some validations to ensure that a user cannot enter a number over 60 in the seconds field.

- Currently, if the forms are open when you hit reset timer, the time that you had entered in is not persisted. I will be changing it so that does not happen.

- I will be adding the functionality to adjust the warning time instead of having it locked at 1 minute remaining.
