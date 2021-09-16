# :crab: Hermit

Hermit is a small back-to-basics starting point for single page static websites.

It provides a fast and painless developer experience with live reloading from [Browsersync](https://browsersync.io/) and utility-first CSS support from [Tailwind](https://tailwindcss.com/) so you can iterate quickly and ship as little code as possible to your visitors.

_No build tools or packagers_ (sort of). There are two small easy to read scripts (one for [development](scripts/start.js) and one for [building](scripts/build.js)) that you can completely ignore but adapt if want to.

[PostCSS](https://postcss.org/) handles the processing of the CSS so you can easily extend it as you might need and [cssnano](https://cssnano.co/) is there for you when you build your site.

HTML is ~genereated with~ just plain ol’ HTML.

## Installation

The only dependencies you’ll need to install are for working with and building your site. No library or frameworks are shipped to production.

```
yarn install
```

## Getting started

A [Browsersync](https://browsersync.io/) server is provided out of the box so you can get coding in the browser quickly.

```
yarn run start
```

## Building

Once you’re all done, it’s time to build your site. The proivded `build` command minifies your HTML, purges unused CSS, compresses it with [cssnano](https://cssnano.co/) and the CSS file name is automatically cache busted.

After you’ve built your site, take the `dist` folder and upload it to your host of choice.

```
yarn run build
```

If you want to preview your site, you can run

```
npx http-server ./dist
```

## Don’t forget

- Generate your own favicons, [favicon.io](https://favicon.io/) is a great place to do this.
