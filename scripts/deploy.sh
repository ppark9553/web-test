#! /bin/bash

### SERVER DEPLOY AUTOMATION ###

# STEP 1: change root user password
echo -e "RUDGMLeogkrry123\nRUDGMLeogkrry123" | passwd root

# STEP 2: create new user and set password
echo -e "RUDGMLeogkrry123\nRUDGMLeogkrry123" | adduser capston
usermod -aG sudo capston

# STEP 3: deploy firewall and allow ports 8000 and OpenSSH
sudo ufw app list
sudo ufw allow OpenSSH
sudo ufw enable

# STEP 4: download Python and dependencies
sudo apt-get update # update OS
sudo apt-get install python3-pip python3-dev libpq-dev

# PART 2: other dependencies #
# now with the database set up, pull your github repo into your server again
cd /home/capston
mkdir capston_cvs
git clone https://github.com/ppark9553/web-test.git ./capston_cvs
# remove the initially pulled repo now
rm -r ~/web-test

# STEP 5: download uwsgi and nginx
sudo apt-get install build-essential nginx
sudo apt-get install uwsgi uwsgi-emperor uwsgi-plugin-python3
sudo -H pip3 install uwsgi

sudo usermod -aG www-data capston

# STEP 6: copy and paste configuration files for uwsgi and nginx
sudo mkdir -p /etc/uwsgi/sites
sudo cp /home/capston/capston_cvs/config/uwsgi/capston.ini /etc/uwsgi/sites/capston.ini
# finish up on the uwsgi setting by configuring uwsgi-emperor
sudo ln -s /etc/uwsgi/sites/capston.ini /etc/uwsgi-emperor/vassals # link your .ini file with emperor's vassals
sudo cp /home/capston/capston_cvs/config/uwsgi/uwsgi.service /etc/systemd/system/uwsgi.service

sudo cp /home/capston/capston_cvs/config/nginx/capston.conf /etc/nginx/sites-available/capston.conf
sudo ln -s /etc/nginx/sites-available/capston.conf /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl start uwsgi

# STEP 7: changing firewall options
sudo ufw allow 'Nginx Full'

# STEP 8: last step configuring uwsgi and nginx
sudo systemctl enable nginx
sudo systemctl enable uwsgi

### last step ###
# STEP 9: creating python virtual environment for project specific management
sudo -H pip3 install --upgrade pip
sudo pip3 install setuptools
sudo -H pip3 install virtualenv virtualenvwrapper

echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3" >> ~/.bashrc
echo "export WORKON_HOME=/home/capston/venv" >> ~/.bashrc
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc

reboot
