#!/bin/bash

# Récupérer le nom du conteneur
container_name="App-GPAO-Ressources"

# Récupérer l'ID du conteneur
container_id=$(docker ps -aqf "name=$container_name")

# Vérifier si le conteneur a été trouvé
if [ -n "$container_id" ]; then
    nb=$((RANDOM % 1000)) # Générer un nombre aléatoire entre 0 et 999
    container_name="$container_name$nb"
fi

docker run --name "$container_name" --rm -dit -w /app -v "$PWD:/app" -v "/usr/local/sbin:/usr/local/sbin" node:lts sh -c "yarn install && yarn run serve"
