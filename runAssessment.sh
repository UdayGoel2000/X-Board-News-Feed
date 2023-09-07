# setup for pnpm to pickup npm in script
shopt -s expand_aliases
. ~/.bash_aliases

# Override baseUrl in cypress.json
# https://docs.cypress.io/guides/references/configuration.html#Environment-Variables
export CYPRESS_BASE_URL=http://localhost:8081

FE_PORT=8081
FE_NODE_DIR="$PWD"

# exit on non-zero return code
set -e

# kill descendants on exit
# https://stackoverflow.com/a/2173421
# trap "echo 'Cleaning up resources' && trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT


# Alternatively kill any process running on the required port
# lsof -ti tcp:$FE_PORT | xargs kill

if netstat -tna | grep 'LISTEN\>' | grep -q $FE_PORT;
then
  lsof -ti tcp:$FE_PORT | xargs kill
  echo "Killed application running on $FE_PORT"
fi

cd $PWD && npm install http-server && nohup ./node_modules/http-server/bin/http-server -p 8081 &

while ! netstat -tna | grep 'LISTEN\>' | grep -q $FE_PORT; do
  echo "waiting for http server to start on port $FE_PORT"
  sleep 2 # time in seconds, tune it as needed
done

# 3. Run assessment
cd $PWD/assessment && npm install && npm run test
pkill http-server
