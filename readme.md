### 3VOT is like Heroku for Javascript Apps
#### or anything you want to publish to the web

> 3VOT is the first Cloud to publish digital content to the web, this is the CLI and in it's simplest case it uploads content. 

* For everybody 3VOT is the way to publish their web pages or even files to the internet
* For developers 3VOT is the new way to publish their static apps to the internet.
* For organizations 3VOT is a Full Production Line for (100% browser based) JS Apps  

## It includes:
- Modular Javascript Enviroment ( aka NODEJS in the Browser )
- Command Line Interface
- Static Cloud
- App Repository
- Backend DB(comming soon!)

> We sit down and think how things should be, then we bend reality and hack until reality becomes our vision

## Installation
```
npm install 3vot-cli -g


### 3VOT is a full production line for (100% browser based) JS Apps  
Browser Apps are the cool apps that require no page refresh, exists only in the browser, no server, no click an wait. Also known as Single Page Apps (SPApps) and made famous by Facebook & Twitter. 

With 3VOT junior developers can build SPApps with their favorite frameworks, while advanced developers can write their own using modular code. It is 100% Open, does not impose anything and GOYW (gets out of your way)


```

## Documentation
We have created a Wiki with explanations, examples and documentation, visit it to learn more.

**[3VOT Docs & Wiki](https://github.com/3vot/3vot-cli/wiki)**

#### 3VOT will make you 10x Faster and 100X Happier


## What can developers do with 3VOT? ##

### Build standard HTML/JS Apps in your prefared way ###
Build Apps using standard technologies, with your favorite frameworks, pre-procesors and automation tools. 3VOT does not impose any structure or preference, it does however offer many tools and helpers you can opt-in to use.

### Upload Apps to the Static Cloud ###
Where and how long does it take to publish an app to the web or roll back to a previus version? How do you preview one version to your team or customers? Will it pass the test of time? <br/>

With 3VOT with each time you do ```3vot upload```, you'll compile and upload a new version of the app and get a link to share with anyone. Nothing to think about, nothing to remember, nothing to configure, it just works.
 
### Publish Apps to the Static Cloud ###
How do you scale your app for a spike, or make sure that server will run forever. What about cache, DNS, CDN?

**Why publish a static JS App to a server? Heroku, Digital Ocean, etc; Those are for dynamic client-server apps.**

3VOT has the only cloud for Frontend Apps. It will scale from 10 to 10 million users automatically, it's super affordable and it needs only one command ```3vot publish```. 3VOT provides your with a link, that will always be your production link , from there one you'll be able to select what version of your app is live.

### Deploy or Embeed an App ###
Building a state of the art SPApp and deploying it via an iFrame is like watching a blue ray movie on your grandfather's old TV Set. <br/>

With 3VOT you can insert a ```<scrpt src="MY_3VOT_APP">``` tag anywhere on the web, and the app will render itself there. We use it in Blogs, Static Pages, Web Apps (php/rails,etc) and CMS's;

### Clone an App###
So you built an amazing app, and now you want to build a similar one. With 3VOT all you need to do is ```3vot download``` an app from our public repo or your private one.

This is how many organizations share examples apps and tutorials, one command and you got the app ready to run. This is also the recomended way to learn 3VOT and onboard developers.

Large organizations or Agencies setup templates and base projects for training, standarization and mantainability. In short to power their 3VOT Production-Line of apps.

### Write browser javascript the NODEJS Way###
Being able to require("fs") dependencies and separate javascript code in modules is a revolution. 3VOT brings this revolution to the browser allowing developers to write modular code out of the box.

3VOT empowers you to build re-usable components in plain javascript, separate your code in files and folders.

This opens up the door to writting enterprise large scale apps, real unit testing becomes posible and applying OOP Principles a reality.

### Write Multidevice Apps - The multi device problem###
Responsive and mobile-first design tells us we can build an app that adapts to the screen size of the user's device. The alternative approach is to build a separate app for each device.

In 3VOT we imagine how things should be... We should be able to write our code in modules, and then choose what modules are loaded depending on the user's device.

It's called 3VOT Multiplatform, and it works just like that.

### Forget about servers ###
3VOT removes the neccesity, costs and complications of using servers to host static HTML/JS Apps; With 3VOT you build apps that can be deployed anywhere as links and files, no servers. 


## What can organizations do with 3VOT? ##

###Build Interative App Components
Using 3VOT embendable technology you can build a component, a part, and publish it inside you tradional app, cms, blog or web site. 

Most organzations struggle to get the bleeding edge technology into their current stack, but with 3VOT it's possible. Simply build an amazing app component, and embeed it a specific part of your app.

###A/B Testing
3VOT is great for A/B Testing because you can build an App and upload it, that's version 4. Make a change to the app to test your hypotesis and upload it, that's version 5. 

When you publish an App 3VOT gives you a unique link, you can choose which version of the app you publish to that link. So publish version 4 for a couple of hours, then switch to version 5. Check you analytics and you'll have your answer.

What's powerfull about this is that you can build an App Component and A/B Tested it in your full-fledged App, for some organizations this is way quicker than changing their full sites. 


## History & Architecture ##
Browser Apps used to be build using the Client-Server model using servers like php, nodejs, .net and rails. Each action like a button required the loop to the server and the page needed to be refreshed to show the response.

Modern frontend apps are called Single Page Applications. Think Facebook, where the page does not refresh when you Like, Share or scroll to get more content.

Imagine your app behaving that way, it's possible. These Apps connect to a backend server or API via AJAX so each time something is saved or retrieved the page does not need to refresh, it happens instantly. 

**Remember Single Page Apps are not the future, they are the present**

## Use & Support  ##
All 3VOT Solutions are Open Source 

3VOT is also being used commercially by several organizations like Fusion.net & Rodco S.A.

3VOT is an ISV Partner of Salesforce.com where CLI is published as CLAY in App Exchange as an Enterprise Solution.

For both cases we provide profesional remote and on-site support, custom develpment and training at an agreed hourly rate **contact us at one@3vot.com**

## LICENSE ##
MIT 

## Collaboration  ##
As a Mature Open Source Project we encourage collaboration with an Open Mind and Intelligent Communication skills. Both are required.

Feel free to submit issues or Pull Requests, we are a commited team working full time and will work any discrepancy out in a friendly way with commiters, don't worry, just submit it!

## On the Shoulders of Giants ##

3VOT is built on top of lessons and/or code from the leading open source libraries and minds in the world. Special Recognition to Alex Maccaw for his vision and work on modular code with Spine and Hem Server Specially and to Substack's Unix Mentality and it's Browserify Open Source Library. The Amazing work by Visionmedia is all over the place in Express and SuperAgent. PLV8 powers ours backend thanks to mgutz concepts. Finally thanks to creationix for it's pair programming sessions.

Lessons learned while using Grunt and Yeoman definitely shaped 3VOT, but those projects are not used on the CLI.
