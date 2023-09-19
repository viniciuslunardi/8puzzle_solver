#!/bin/bash
node index.js

pid=$!

sleep 5

kill -s SIGINT $pid
