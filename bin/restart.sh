#!/usr/bin/env bash

ps -ef | grep cms | grep node | awk '{print $2}' | xargs sudo kill -9
sudo nohup npm start &
