1/ Connect to MongoDB
[DONE] -> create project
[DONE] -> create new cluster
[DONE] -> generate the URI code and connect to the DB
[DONE] -> create a new Schema for storing the messages
[DONE] -> Connect to the DB

2/ Put something on the frontend
[DONE] -> Create component - nav bar
[DONE] -> Create component - typing bar
[DONE] 3/ VITE_API_BASE_URL = /api -> .env inside client

3/ Think through the logic, what am I actually building...
What do I want?

5/ Create a call inside server.ts to make a call to an OpenAI API

###

0/ Create MVC -> How is the logic going to flow?
[DONE] -server
[DONE] -router
[DONE] -controller

1/ Make a connection to OpenAI API
[DONE]-Run a basic prompt and get it to work
[DONE] -> print the result on the frontend
-> stream the result on the frontend
-> improve systemPrompt

-> store the response and show it on the screen

2/ Store the result into our mongoDB
-> query as well as the response into the DB
-> prompt, message, (user - later)

STRETCH FEATURES:
1/ Authenticate the USER
2/ Store the chat history
3/ Styling:
-navbar, logo
-submit button icon
-darkmode / yellowmode
