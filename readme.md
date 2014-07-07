### Use 3VOT to build top of the line Javascript Apps & Systems ###

There is a new line of apps on the web, they are quick. No Click and Wait. When you click on their buttons the page does not refresh, it responds instantly.

**History**
Back in the day web apps where build by an application server (php, nodejs, .net, rails) passed trought the server and page needed to be refreshed. Single Page Applications where born with Frontend Servers lik NodeJS and Rails, web apps were loaded on the browser and communicate via AJAX with API Servers.

**Innovation**
With 3VOT you can build the same app with your favorite framework, but we don't need the server anymore **one less moving piece to worry about** and with 3VOT Cloud Architecture it's infinitly scalable.

**Server-Less Apps**
This opens up a world of opportunities, because we have innovated a way to build 100% Browser Apps with all the power and simplicity of NODEJS.
* Write code in modules
* Reuse code
* Installing Dependencies from NPM
* Deploy Standalone or Embbeded in Traditional Apps, Pages or CMS's

**Mission**
We build 3VOT looking to provide developers with a great experience, build and deployment actions are automated by one line command executed from the command-line with 3VOT-CLI.

[Try the 5 minute getting started](https://github.com/3vot/3vot-cli/wiki/Getting-Started) or read on this introduction.

###Full Stack Platform to build and deploy Profesional Javascript Apps###

**Build JS Apps that don't refresh using code from NPM & Github**
This results in Maintable Apps that you can build 5X faster, reusing and writting less code. There is no Magic, standard HTML, CSS and JS, no propietary lock-in or restrictions on patterns, code or frameworks.

**Download Apps, Examples and Templates from The 3VOT App Store**
Most 3VOT Apps are Open Source and can be downloaded with one command. Use them as Tutorial, a Base Template or a really advanced starting point for your project.

**Publish Apps for free in 3VOT Cloud**
One Command to deploy production ready Apps, 3VOT is configured with CDN's, Cache and Analytics to handle millions of visits at top speeds. Easily deploy to 3VOT Cloud, your own 3VOT Cloud or your own servers.

**3VOT is a production line of Apps, use it to learn or to empower your demaning App Development Teams**

**Profesional Javascript Applications have the following features:**
* Standard HTML, JS & CSS without "Hacks" that everybody can understand top to bottom.
* No Page Refresh ( MVC Single Page Applications with no code-spaguetti )
* Modular Code ( written in modules, structured in files and folders )
* Multiplatform ( choose what code is loaded in Mobile, Tablet and Desktops  )
* Write Clean NodeJS Style code that runs in the browser
* Use NPM & Github Dependencies

**3VOT simplifes and unifies how we use the following technolgies**
* **Browserify:** Improves how we write and reuse code.
* **S3:** Publish Dynamic Single Page Javascript Apps **Statically** in Amazon S3 ( or anywhere else )
* **NPM:** Select from thousand dependencies and require them NODEJS Style

### Demos & Examples
Soon

### Documentation
[Documentation](https://github.com/3vot/3vot-cli/wiki)
[Getting Started](https://github.com/3vot/3vot-cli/wiki/Getting-Started)


## An App in 5 Seconds ##

**You must have [NodeJS](nodejs.org) installed on your computer.**

### Install 3VOT-CLI
~~~
npm install 3vot-cli -g
~~~
Some users may need to: sudo npm install 3vot-cli -g

### Developer Registration
```
3vot register
```

### Download an Example

```
3vot download
```
* **App:** todo
* **Profile:** tutorial
* Hit Enter for other options

### Upload to your 3VOT Cloud Profile
```
3vot upload
```
* **App:** todo

### Develop
```
3vot server
```
[http://localhost:3000]
**Browse to the Project Folder and open**
```
PROJECT_FOLDER/apps/todo/index.js
```


## Use & Support  ##
All 3VOT Solutions are Open Source and should be used to progress. Check out [Store](3vot.com/3vot/store) [Directory](3vot.com/3vot/directory) [Blog](3vot.com/blog)

3VOT is also being used commercially by several organizations like Fusion.net & Rodco S.A.

3VOT is an ISV Partner of Salesforce.com where CLI is published as CLAY in App Exchange as an Enterprise Solution.

For both cases we provide profesional remote and on-site support, custom develpment and training at an agreed hourly rate **contact us at support@3vot.com**

## LICENSE ##
MIT 

## Collaboration  ##
As a Mature Open Source Project we encourage collaboration with an Open Mind and Intelligent Communication skills. Both are required.

Feel free to submit issues or Pull Requests, we are a commited team working full time and will work any discrepancy out in a friendly way with commiters, don't worry, just submit it!

## On the Shoulders of Giants ##

3VOT is built on top of lessons and/or code from the leading open source libraries and minds in the world. Special Recognition to Alex Maccaw for his vision and work on modular code with Spine and Hem Server Specially and to Substack's Unix Mentality and it's Browserify Open Source Library. The Amazing work by Visionmedia is all over the place in Express and SuperAgent. PLV8 powers ours backend thanks to mgutz concepts. Finally thanks to creationix for it's pair programming sessions.

Lessons learned while using Grunt and Yeoman definitely shaped 3VOT, but those projects are not used on the CLI.
