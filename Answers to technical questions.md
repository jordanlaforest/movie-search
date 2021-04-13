# Answers to technical questions

## 1. How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

It probably took me a full 24hrs of dev time. I'm not a fan of the scrollbars for the movie overviews. It was my quick solution to stop the text from vertically stretching the card which would either stretch the poster image or cause blank space above and/or below. I think a better solution would be to fade it out and have a read more... link (that reads "Read more about {movieTitle}" for screen readers of course) to either expand it if I could get it to look nice or perhaps simply pop up a modal.

Another thing I would have liked to have added was a clear button for the refine/filter. The functionality is already there, you can just simply submit an empty string, but it doesn't provide the same user experience as a dedicated button.

Furthermore, a more usable app would make use of the API for refining the search, but the requirements suggested to me that this field should operate on the results returned by the first search. A specific filter might have only a few results to show after dozens of requests to the API.

## 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

I guess I have to say the spread/rest syntax as it's very useful when dealing with Redux state. It makes it very easy to copy and object while updating some of it's properties in the new object.

```
{
  ...state,
  property: 'Override one property while copying the rest of the object'
}
```

## 3. How would you track down a performance issue in production? Have you ever had to do this?

I've found Chrome Dev Tools to be a very good ressource for tracking down performance issues. I have not had to do it in production but I have for my project on GitHub titled draw-game. Drawing dispatched an action both to the store and to the server which then dispatched it to the other clients. There were hundreds of actions dispatched per second and I noticed considerable performance issues. The main culprit ended up being Redux Dev Tools logging the actions, but there was still some performance concerns so I was considering batching the actions to limit the number sent per second.

## 4. How would you improve the API that you just used?

I did not dive too deep into the API as I only needed one simple request but from what I saw it has quite a bit of features including the ability to append another request onto another to get more data from one API call and a robust search feature with many parameters and even the ability to specify ranges for some. So it's hard to suggest improvements. Maybe being able to set the amount of results per page/request. 

## 5. Please describe yourself using JSON.

```
{
  "name": "Jordan",
  "skills": [
    "React",
    "JavaScript",
    "JSON",
    "HTML",
    "CSS",
    "Redux",
    "Node.js",
    "SQL",
    "Git",
  ],
  "likes": [
    "poker",
    "video games",
    "guitar"
  ]
}
```