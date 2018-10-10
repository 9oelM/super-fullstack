# `super-fullstack`
`react` + `express` + `nodejs` + `MongoDB` boilerplate with pre-configured automation tools 

# Table of contents
* [Global packages need to be installed](#global-packages-need-to-be-installed)
* [What's pre-packaged](#whats-pre-packaged)
    * [Frontend](#frontend)
    * [Backend](#backend)
    * [Testing](#testing)
    * [Automation & CI](#automation--ci)
* [How this thing works](#how-this-thing-works)
    * [C9 compatible(?)](#c9-compatible)
    * [Development](#development)
    * [Proxy](#proxy)
    * [Why port 8080 and 8081](#why-port-8080-8081)
    * [Gulp tasks](#gulp-tasks)
* [Notes](#notes)
    * [No minifying on development](#no-minifying-on-development)
* [Troubleshooting](#troubleshooting)
    * [postcss](#postcss)
    * [Production build](#production-build)
* [Also see](#also-see)

# Global packages need to be installed 
Install parcel and gulp
```
npm install -g parcel-bundler gulp-cli
```

# What's pre-packaged
## Frontend 
- [x] React
- [ ] Redux 
- [x] Normalize.css

## Backend
- [x] Express
- [ ] MongoDB

## Testing
- [ ] Jest
- [ ] Enzyme

## Automation & CI
- [x] Gulp
- [x] Babel
- [x] Eslint
- [x] Prettier
- [x] Parcel
- [ ] Travis

# How this thing works
[`gulp@^4`](https://github.com/gulpjs/gulp) is used for this project. 

## C9 compatible(?)
Yeah I'm in a military base right now, so I cannot run anything locally. So I needed to make this work for [c9](https://c9.io) environment. 

## Development
* Frontend: Codes run at the port 8080, using `parcel`'s server.
* Backend: Express server runs at 8081. It is launched by using `nodemon`. 

## Proxy
Why not use proxy? Proxy runs terribly on [c9.io](https://c9.io) and I could not just work it out. So I just decided to do a way around with front and back running on different ports. You need to customise things a bit to set a proxy in this project. 

## Why port 8080 and 8081
Yeah. It's not customary. But on c9, [you can only use 8080, 8081, 8082. See c9's guideline here. ](https://docs.c9.io/docs/multiple-ports)

## Gulp tasks
usage: `gulp taskName` on cli
* `watch`: watches for file changes. On change, formats with `prettier` and lints with `eslint`. 
* `build`: make a production build. It runs `parcel` build and the development server with express. The `parcel` build output location is `./build`.
* `frontDev`: runs `parcel` to bundle and launch its server.
* `backDev`: only launches backend server.
* `dev`: run `watch`, `frontDev`, `backDev` in parallel
* `default`: you can run this with just typing `gulp` only on the command line. This will run `dev`. 

# Notes

## No minifying on development
Parcel will by default not minify `css` and `html` on development (`npm run dev`)

# Troubleshooting
## `postcss`
For some reason, parcel does not work with `postcss.config.js`. Once I put "postcss" key with its values inside `package.json` with according values, it somehow worked. It never referred to `postcss.config.js`. But I just left it in the root project directory just in case.

## Production build
[Parcel states it uses minifier (`terser`) when it makes a production build.](https://parceljs.org/production.html) However, when I tried, it did not minify things. So I tried:
```
NODE_ENV=production parcel -p 8080 build client/index.html
```
It worked. So I explicitly stated the environment variable in the script inside `package.json`. 

# Also see 
* [superrrrrr-boilerplate](https://github.com/9oelM/superrrrrr-boilerplate)