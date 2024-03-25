For the SBA 308, I was required to make a script that gathers data, processes it, and then outputs 
a consistent result as described by a specification. This is a very typical situation in industry, and this particular scenario has been modified from a real application.

The results are supposed to make recreate the following:
const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}

Since there's only two files: app.js and index.html, the instructions for seeing the results for this project are:
1. Go Live on the index.html page with the app.js page linked
2. (On Google Chrome) Right click then hit Inspect
3. Go to Console
4. Results should look like this:![Screenshot 2024-03-24 222935](https://github.com/VincentBui0/SBA308/assets/107823093/3170a4d9-de79-49c4-ad0d-cea821ff25b5)

