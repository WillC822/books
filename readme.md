# Description of Application
This is an API designed to manage a collection of books using a MariaDB database, NodeJS, and Express.

## Prerequisites
On your local machine you should have the following: 
* Node v7.8.0+
* NPM  v4.2.0+

The remote server needs the following:
* Ubuntu v16.04.2 x64
* Nginx [installed and configured](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
* [MariaDB](https://www.digitalocean.com/community/tutorials/how-to-create-a-table-in-mysql-and-mariadb-on-an-ubuntu-cloud-server#how-to-install-mysql-and-mariadb-on-ubuntu)
* [NodeJS and NPM](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#install-nodejs)
* [PM2](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#install-nodejs)

# Local Installation
Clone this repository into your local working directory
```
git clone https://github.com/WillC822/books.git
```

Install node_modules and other dependencies outlined in your *package.json*
```
npm install
```

## Start local Server
Start your local server
```
npm start
```

Verify your server is running by viewing [http://localhost:3000](http://localhost:3000)

# Deployment

Add the Production Server to your list of git remote repositories
```
git remote add REMOTE_SERVER_NAME ssh://root@104.131.61.14:/var/repos/books.git
```
## Pushing to the Server

Push to the remote repository by running
```
git push REMOTE_SERVER_NAME BRANCH_NAME
```

# Running the Application on the Server

Log in to the remote server
```
ssh USERNAME@104.131.61.14
```

You can view the application status with 
```
pm2 show database
```

Restart the application after making changes with 
```
pm2 restart database
```

# Setting Up GitHub Repository 

From the remote server, set up a directory where you can receive files from your local machine
```
mkdir -p /var/repos/books.git
cd /var/repos/books.git
git init --bare
```

Add a Hook for git
```shell
nano /var/repos/books.git/hooks/post-receive
```

Add content to Hook files
```bash
#!/bin/bash

GIT_WORK_TREE=/var/www/books.com git checkout -f
/root/.nvm/versions/node/v7.8.0/bin/npm
npm install --prefix /var/www/books.com/
```

Make hook executable
```
chmod +x /var/repos/books.git/hooks/post-receive
```

Make folder for work tree
```
mkdir -p /var/www/books.com
```

##
