# got-lobstah

## Project setup

1. Fork, clone, and cd into the repo:
```
git clone https://github.com/shortdiv/got-lobstah.git
cd got-lobstah
```
3. Install Netlify CLI:
```
npm i netlify-cli -g
```
5. Unlink repo from existing Netlify site:
```
netlify unlink
```
6. Create a new Netlify site:
```
netlify init
```
Select "Create & configure a new site" and follow the instructions in the terminal to finish creating your new Netlify site.

7. Add FaunaDB:
```
netlify addons:create fauna
netlify addons:auth fauna 
```
The second command opens a browser window where you can login or sign up for a new Fauna account. Upon login, you will then see a modal asking if you want to import your database from Netlify and optionally rename it. Go ahead and rename it "got-lobstah", then click "Import"

8. Add Netlify environment variables. Logged into your Netlify account, click on the site we just created, then click on "site settings", then under "Build and Deploy", go to "Environment variables". Add a variable for the Yelp API key:

YELP_API_KEY

Feel free to use this value for the Yelp API key:

E9ws6kbLaQqKYFbjcT67QKcGa97K6X4TQg5OQCV6LKsGksRIFuj9ueQg9BCHHIYy5bnTmXPgHaq60f2clOmebW_1p_342TY4Q92gLsw_k8W8joF39wGNhYb3SKOxWXYx

Then create a variable for Fauna:

FAUNADB_SERVER_SECRET

9. To get the value for FAUNADB_SERVER_SECRET, go to dashboard.fauna.com, click on the database, then click on "Security" (in the left sidebar), then click "New key". Create a key and copy/paste the secret into the FAUNADB_SERVER_SECRET environment variable value in Netlify.

10. In dashboard.fauna.com, click on "Collections" (in the left sidebar). Click "New collection" to create a new collection named "ratings" 

11. Now we are ready to install and run our app locally:

```
yarn install
netlify dev
```

12. After it's running, go to localhost:8888. Try clicking on some stars to add a rating. You should see each rating saved as a new document in the "ratings" class in dashboard.fauna.com

## Other commands

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
