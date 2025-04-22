CREATE ROOT FOLDER
1/ mdkdir doo -> cd doo -> code.

VITE
2/ npm create vite@latest client -- --template react-ts;
3/ cd client -> npm install, npm run dev

SERVER
4/ mkdir ../server && cd ../server
-> npm init -y
-> npm i express mongoose dotenv corse
-> npm i -D typescript ts-node-dev @types/node @types/express

5/ CREATE server/src/server.ts
-> cd server && mkdir src && cd src && code server.ts
-> go to server folder and run "npx tsc --init --rootDir src --outDir dist --esModuleInterop"

5/ Start server.ts inside server folder
-> import all important modules
-> fire up the server
-> connect to the mongoDB

6/ CREATE PROXY
-> Go to vite.config.js and add server: { proxy: { }}
