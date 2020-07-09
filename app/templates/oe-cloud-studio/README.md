# oecloud-app project 

A scaffold project of oe-cloud.

## dependency
* oe-cloud
* oe-multi-tenancy
* oe-logger

## Installation, test cases and code coverage

### Pre-requisite

- you should able to connecto to [evgit](http://evgit), [npmjs](https://registry.npmjs.org/) and [github](https://github.com) when you use npm on command line
- For that use .npmrc and .gitconfig as shown below

*.npmrc*

```
http-proxy=http://<username>:<password>@indblrb06intpxy01.ad.infosys.com:80/
https-proxy=http://<username>:<password>@indblrb06intpxy01.ad.infosys.com:80/
registry="https://registry.npmjs.org/"
noproxy=127.0.0.1,localhost,0.0.0.0,10.73.97.24,evgit
strict-ssl=false
```

*.gitconfig*

```
[http]
  proxy = http://<username>:<password>@indblrb06intpxy01.ad.infosys.com:80/
[https]
  proxy = http://<username>:<password>@indblrb06intpxy01.ad.infosys.com:80/
[http "http://10.73.97.24"]
  sslVerify = false
  proxy =
[http "http://evgit"]
  sslVerify = false
  proxy =
```

### Run as independent Server

```sh
$ node server/server.js
```

browse  [http://localhost:3000/explorer](http://localhost:3000/explorer) 

### README.md

you should change this file as per your module.

### ESLint

.eslintrc and .eslintignore files you need not to modify. However it is good practice to run following command before you push into git. Or else CI/CD pipeline will fail.

```sh
$ eslint .
```
