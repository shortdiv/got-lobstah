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

8. Add Netlify environment variables. Logged into your Netlify account, click on the site we just created, then click on "site settings", then under "Build and Deploy", go to "Environment variables". Add variables for the Yelp and Fauna API keys:

YELP_API_KEY

FAUNADB_SERVER_SECRET

In the next two steps, we will get the values for these two keys.

9. To get the value for YELP_API_KEY, go to [the Yelp developer's site](https://www.yelp.com/developers) and click on Yelp Fusion. This will take you to the Yelp Fusion page, where you will create your API key. Click on "Get Started", and "Create an App". In the create new app form, you will be prompted for information about your app. Once you do this, agree to Yelp API Terms of Use and Display Requirements. Then click the Submit button. Congratulations, you now have an API key. Paste the secret as the value for YELP_API_KEY that we created in the Netlify environment variables section in the last step.

10. To get the value for FAUNADB_SERVER_SECRET, go to [the FaunaDB Console](https://dashboard.fauna.com), click on the database we created in step #7, then click on "Security" (in the left sidebar), then click "New key". Create a key and copy/paste the secret into the FAUNADB_SERVER_SECRET environment variable value we created in Step #8.

11. In dashboard.fauna.com, click on "Collections" (in the left sidebar). Click "New collection" to create a new collection named "ratings" 

12. Now we are ready to install and run our app locally:

```
yarn install
netlify dev
```

13. After it's running, go to localhost:8888. Try clicking on some stars to add a rating. You should see each rating saved as a new document in the "ratings" class in dashboard.fauna.com

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
