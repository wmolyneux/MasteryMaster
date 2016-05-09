# MasteryMaster

## Overview

This project was created as part of the 2016 RIOT Games API Challenge. The idea behind the challenge was to create an application which utilised the champion mastery data available from RIOT Games' APIs.

## MasteryMaster

MasteryMaster is designed to allow players to view which champions they have nearly mastered, which champions they need to actually play and which achievements they have created. The idea behind it is to make playing all champions fun as opposed to only playing the same few champions over and over.

Personally as a League of Legends player I very often only play characters like Leona but using MasteryMaster have began gaining mastery in all champions.

## Running the application

The application is a NodeJS application which both acts as a back-end server and serves the front-end AngularJS website. The application should run using version 5 or above of NodeJS. 

Firstly you need to enter an API key into the config.js file, simply enter your API key into the string variable declared inside the javascript file. This file can be found at:
```
./utilities/config.js
```

To run the application open a command prompt or terminal and run:
```
npm install
```
This will install the dependencies for the application, then run:
```
node ./app.js
```
Now that the application is running you can now navigate to your browser at:

```
http://localhost:8080
```