# filosophia

MERN Production ready quote PWA. User can register, delete, love, share quotes by categories.

## Getting Started

Server Side is runningo node and express. Client side is made up from create-react-app to easily manage service worker files. Clone the repo in your local environment install the packages and run :

```
npm run dev
```

### Prerequisites

You need node, npm, mongo installed on your machine.

## Deployment

Deployment can be made on Heroku or on a virtual machine (e.g. Digital Ocean / AWS). 
Example of deployment on Digital Ocean:
* Make a new droplet running Ubuntu 16+
* Install nginx with reverse proxy to 5000 port on localhost
* You can follow this step by step guide on DO website: [How to install nginx on Ubuntu 18](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04#step-5-setting-up-server-blocks-(recommended))
* If you want PWA capabilities you need a SSL certificate (I use let's encrypt) simply follow this step by step guide: 
[Setup SSL Let's Encrypt on Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)
* Clone the repo run the install and
```
npm run heroku-postbuild
```
* Change your credentials in the config folder
* Start the server with 
```
npm run server.js
```
* Install pm2 to keep the server up and running you can follow this step by step guide: [How to install pm2](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps)

* Be sure your node server is runningo in production mode


## Authors

* **Filippo Rivolta** - *Initial work* 
