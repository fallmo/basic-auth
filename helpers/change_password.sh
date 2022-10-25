#!/bin/bash

echo "Change Basic Auth Password"

echo ""

read -p "input api url: " API_URL;

PS3="Select namespace: "

select NAMESPACE in accel other; do break; done

read -p "input username: " USERNAME;

read -s -p "input current password: " CURRENT_PASSWORD;

echo "";
echo "";

read -s -p "input NEW password: " NEW_PASSWORD;

echo "";

if [ "$CURRENT_PASSWORD"  == "$NEW_PASSWORD" ]; then echo "Error: Cannot change to the same password"; exit 1; fi;

read -s -p "confirm NEW password: " NEW_PASSWORD1;

echo "";

if [ "$NEW_PASSWORD"  != "$NEW_PASSWORD1" ]; then echo "Error: Passwords do not match"; exit 1; fi;

result=$(curl -X POST -u $USERNAME:$CURRENT_PASSWORD $API_URL/$NAMEPSACE/change_password  -o /dev/null -sw '%{http_code}' -H 'Content-Type: application/json' -d '{"new_password": "$NEW_PASSWORD"}');

if [ "$result" == "200" ]; then echo "Passwords Changed Successfully"; exit 0; else echo "Failed. Status Code: $result"; exit 1; fi;
