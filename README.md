# super-fullstack
react + express + nodejs + MongoDB boilerplate with a lot of pre-installed automation tools 

# Global packages need to be installed 
Install parcel
```
npm install -g parcel-bundler
```

# What's pre-packaged
## Frontend 
- [x] React
- [ ] Redux 
- [x] Normalize.css

## Backend
- [x] Express
* MongoDB

## Testing
* Jest
* Enzyme

## Automation & CI
* Gulp
* Babel
* Eslint
* Prettier
* Parcel
* Travis

# Scripts
## Make a production build
```
npm run build
```
## Run a development server 
```
npm run dev
```
# Notes
## No minifying on development
Parcel will by default not minify `css` and `html` on development (`npm run dev`)

# Troubleshooting
## `postcss`
For some reason, parcel does not work with `postcss.config.js`. Once I put "postcss" key with its values inside `package.json` with according values, it somehow worked. It never referred to `postcss.config.js`. But I just left it in the root project directory just in case.

## `Production build`
[Parcel states it uses minifier (`terser`) when it makes a production build.](https://parceljs.org/production.html) However, when I tried, it did not minify things. So I tried:
```
NODE_ENV=production parcel -p 8080 build client/index.html
```
It worked. So I explicitly stated the environment variable in the script inside `package.json`. 


# Also see (got some references from these)
* [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)
* [superrrrrr-boilerplate](https://github.com/9oelM/superrrrrr-boilerplate)