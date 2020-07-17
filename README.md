# Example Using react.js in CodeIgniter 4 application

![ci build](https://github.com/samsonasik/ci4-react/workflows/ci%20build/badge.svg)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fsamsonasik%2Fci4-react%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/samsonasik/ci4-react/master)
[![Code Coverage](https://codecov.io/gh/samsonasik/ci4-react/branch/master/graph/badge.svg)](https://codecov.io/gh/samsonasik/ci4-react)
[![Total Downloads](https://poser.pugx.org/samsonasik/ci4-react/downloads)](//packagist.org/packages/samsonasik/ci4-react)

Introduction
------------

A CodeIgniter 4 Skeleton Application with react.js integration.

Features
--------

- SPA application with React Router DOM with cached pages after visited.
- Using server side template from CodeIgniter 4, eval'd with DOMPurify it first.
- Webpack support for [production](#production)

## Setup

*1.* Run composer create-project command:

```bash
composer create-project samsonasik/ci4-react
```

*2.* Copy file `ci4-react/env` to `ci4-react/.env`:

```bash
cp ci4-react/env ci4-react/.env
```

*3.* Set environment and app configuration

Open `ci4-react/.env` and set `CI_ENVIRONMENT`, `app.baseURL`, `app.indexPage`:

```bash
# file ci4-react/.env
CI_ENVIRONMENT = development

app.baseURL    = 'http://localhost:8080'
app.indexPage  = ''
```

*4.* Run PHP Development server

```php
# go to ci4-react directory
cd ci4-react

# run php development server inside ci4-react directory
php spark serve
```

*5.* Open web browser http://localhost:8080

## Production

For deploy to production purpose, it has `webpack.config.js` in root directory that when we run `webpack` command, we can get `public/js/dist/bundle.js` after run it. If you don't have a `webpack` installed yet in your system, you can install nodejs and install `webpack` and `webpack-cli`:

```bash
sudo npm install -g webpack
sudo npm install -g webpack-cli
```

So, we can run:

```bash
webpack

Hash: e1fc11a2dd1c76b96bee
Version: webpack 4.43.0
Time: 506ms
Built at: 07/02/2020 10:09:56 PM
                   Asset      Size  Chunks             Chunk Names
public/js/dist/bundle.js  2.37 KiB       0  [emitted]  main
Entrypoint main = public/js/dist/bundle.js
[0] ./public/js/create-page.js 1.15 KiB {0} [built]
[1] ./public/js/app.js + 2 modules 2.28 KiB {0} [built]
    | ./public/js/app.js 1.63 KiB [built]
    | ./public/js/about.js 130 bytes [built]
    | ./public/js/Navigation.js 529 bytes [built]
```

After it generated, we can update `.env` file as follow:

```bash
# file .env
CI_ENVIRONMENT = production

app.baseURL    = 'https://www.your-website.com'
app.indexPage  = ''
```

In `app/Views/layout.php`, we have a `ENVIRONMENT` check to use `js/app.js` when on development, and use `/js/dist/bundle.js` on production when exists.

```php
// src/App/templates/layout/default.phtml
<?php $isDevelopment = ENVIRONMENT === 'development'; ?>

// ...
    <script src="<?php echo base_url($isDevelopment
            ? '/js/app.js'
            : (
                // when after run webpack, allow to use bundled js
                // fallback to use /js/app.js when not
                file_exists(ROOTPATH . 'public/js/dist/bundle.js')
                    ? '/js/dist/bundle.js'
                    : '/js/app.js'
            )) ?>" type="module"></script>
// ...
```

that will automatically take care of that.