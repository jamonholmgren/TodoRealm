# Realm React Native on React Native Live

I did a stream with Andrew Meyer from the Realm team (Mongo DB) on August 26, 2022, and we built a todo app on Realm React Native.

Stream link: [https://www.youtube.com/watch?v=vvZ5OMdEFqA](https://www.youtube.com/watch?v=vvZ5OMdEFqA)

To get this running, you'll need an ./app/secrets.ts file, and have the following shape:

```ts
const secrets = {
  atlasAppId: 'yourapp-name-here',
};

export default secrets;
```

You can get the app ID here: https://cloud.mongodb.com/

Watch the stream to see how to configure that.
