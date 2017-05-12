# Description of Application


# Local Installation


## Prereq's
* Node v7.8.0+
* npm  v4.2.0+

```
npm install
```

## Start local Server
```
npm start
```

Verify that it is working by viewing port :3000/
[http://localhost:3000](http://localhost:3000)
# Deployment

Add the production Server to your git remotes

```
git remote add live ssh://root@104.131.61.14:/var/repos/books.git
```

Push Master to live

```
git push live master
```

# Run the Server
```
cd /var/www/books.com
npm start
```

TEST the Server.!!!

# Server Setup

Create a cloud based server on Digital Ocean. $5

Install Node Via NVM

```shell
curl https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

Setup Git Hook to receive files from local

```shell
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

# Database Setup

Download and install mariadb on Digital Ocean Server

```
sudo apt-get update
sudo apt-get install python-pip python-dev mariadb-server libmariadbclient-dev libssl-dev
sudo apt install mariadb-server
sudo mysql_secure_installation
```

Launch mariadb
```
mysql -p
```
