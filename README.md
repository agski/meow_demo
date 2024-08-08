Single page next.js app that allows substring searching for users by name.
Clicking on a table row reveals additional user info.
Users table updates when a name filter is passed into the input box.
Runs off a json blob of user data.
![Screenshot 2024-08-07 223730](https://github.com/user-attachments/assets/59937275-2390-44a2-b1df-7f4953c3a1ce)



Backend built according to hexagon pattern, code found in src directory:
https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749

Two API routes:
 - /users?filter={NAME}
 - /users/{ID}

Setup:
- install node: https://nodejs.org/en
- from project root: npm run dev
- navigate to localhost:3000
