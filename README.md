# About Drinktionary
 Drinktionary is envisioned as a resource platform to access new and exciting cocktails and drinks. Users can browse through many cocktails: either browse alphabetically, or use our randomizer tool. Users can search drinks by category and choose how many results to show. The goal Drinktionary is to provide user-friendly access to new drink and cocktail ideas, no matter what the occasion. Make sure to enter your date of birth correctly to gain access to the app and please drink responsibly!

## Local Setup

1. `git clone` this repo into your desired local directory
2. `cd` into the root directory
3. Run `yarn install` to install all project packages
5. Run `yarn dev` to start app locally


## Expected Result
### Interactivity

App is protected by date of birth calculator ensuring only users above 19 years of age enter site:
![image](https://user-images.githubusercontent.com/47255795/205281967-cbb3910a-4897-4c37-b33f-25195cdb3467.png)

Users can filter by categoryor alphabetically, additionally users can select how many results to show. Users can also make use of the randomizer to get a fully random drink, or even a random drink within a category. 
![image](https://user-images.githubusercontent.com/47255795/205282839-ed71a5f0-f8df-4e5e-b0a4-9099527ffd08.png)

### Performance
 All API calls are handled with consideration for both server, client, and the app. The app is lightning quick making use of conditional rendering to update state as soon as data is available, the app does the heavy lifting where possible to render lists of drinks based off one API call rather than making multiple, where possible. Further work on this app would be beneficial to create a cache for API calls to limit the memory and API load for making duplicate API calls.

### Accessibility
Breakpoints allow mobile users and desktop users both to enjoy the app. Additionally users are given smooth UX to make life easier: scroll to top button helps avoid long scrolls when users select to show more drinks at once.
![image](https://user-images.githubusercontent.com/47255795/205283870-ffb8f8fb-8fae-4ec8-8736-acaf97fab775.png)
![image](https://user-images.githubusercontent.com/47255795/205283947-b2d569fa-8667-4ee0-ade9-0671f60b1a7e.png)


### Responsiveness
Responsive for all users to enjoy; breakpoints and responsive design ensure the app is functional on mobile devices and desktop devices.
![image](https://user-images.githubusercontent.com/47255795/205282243-68ba4903-03d3-4169-a34d-53e57ca2b428.png)
![image](https://user-images.githubusercontent.com/47255795/205282404-53acbc5d-1e25-41fa-812f-b7fcf72bb3d3.png)

### Visual Layout and Design
Designed to be simple and easy to use while ppaying special attention to user experience and ease of use. Visually all components are easily visible with no overlap or crowding of components. All information and function is useful and easy to access.
