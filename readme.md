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

Change directory into the repository you just cloned
```
cd books
```

Install node_modules and other dependencies outlined in your *package.json*
```
npm install
```

You can start your local server with
```
npm start
```

> **NOTE**: You will not be able to properly connect to your application properly until you adjust your database connection string to match the configuration of your local environment you are using for development and testing. You can do so by creating a .env file and matching the key/value pairs from the connection string to what suits your local development needs.

Verify your server is running by viewing [http://localhost:3000/api/books](http://localhost:3000/api/books)

## Branch Model Workflow and Local Development
Switch to a new branch to begin developing a new feature
```
git checkout -b FEATURE_NAME
```

When you're finished developing and testing your feature, merge your feature back into the development branch
```
git checkout development
git merge FEATURE_NAME
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

Add a Hook for your GitHub repository to handle actions after you push to it
```
nano /var/repos/books.git/hooks/post-receive
```

Add a bash script to your post-receive hook that places the files you pushed in a different directory from your repository.
```bash
#!/bin/bash

GIT_WORK_TREE=/var/www/books.com git checkout -f
```

Change the permissions of your hook so that it's executable
```
chmod +x /var/repos/books.git/hooks/post-receive
```

Create the directory that your files are going to be pushed to from your local machine
```
mkdir -p /var/www/books.com
```

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
