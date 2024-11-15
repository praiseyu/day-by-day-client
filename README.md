# Day by Day

Day by Day is a digital photo journal app that integrates photos and text entries to create a rich, immersive memory-keeping experience. This app allows users to upload photos from their trips and add snippets of text that provide context and details to daily entries.

While traveling, it's easy to take photos or jot down memories in a journal. However, simply scrolling through old photos or re-reading journal entries often fails to fully capture the experience. Photo journals combine visuals with contextual text, offering an immersive way to revisit your travels and memories more vividly than a photo or written journal entry alone.

This app is designed for travelers who want to remember what they saw, ate, drank, and where they went on specific days during their trips. It’s perfect for those who don't want to spend a lot of time making a physical scrapbook or writing in a journal but still want a comprehensive log of their travels.

## Related Code

Back End Code: https://github.com/praiseyu/day-by-day-server

Live Website: https://daybydayjournal.netlify.app/

## Features

- **User Authentication:** Securely sign up and log in to access and manage your personal journal.
- **Photo Uploads:** Easily upload photos from your trips to cloud storage to create visual entries.
- **Daily Entries** Organize your journal by days, creating a comprehensive log of your travels.
- **Customizable Styles** Personalize your entries with custom border colors, text colors, and border widths.
- **Edit Entries** Quickly view and edit your entries to keep your journal up to date.
- **Trip List** Displays a list of all your trips and their respective start and end dates.
- **Trip Details** Shows the list of all the days on a trip and the entry status for each day so you can see which days you are missing entries for.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a .env file with the necessary environment variables (e.g., PORT, DB, CORS, CLOUDINARY, JWT_SECRET).

## Installation

Follow these steps to set up and run the project locally. The server and client repositories are separate. Follow these steps for each repository:

1. **Clone the repository**

```bash
git clone git@github.com:praiseyu/day-by-day-server.git
cd day-by-day-server
```
```bash
git clone git@github.com:praiseyu/day-by-day-client.git
cd day-by-day-client
```

2. **Install dependencies in each folder**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your environment variables:

In the client folder:

```plaintext
VITE_LOCALHOST=http://localhost:8080
```

In the server folder:

```plaintext
PORT=server_port || 8080
DB_HOST=db_host
DB_NAME=db_name
DB_USER=db_username
DB_PASSWORD=db_password
CORS_ORIGIN = front_end_url
CLOUDINARY_URL=cloudinary_url
API_KEY=cloudinary_api_key
API_SECRET=cloudinary_api_secret
CLOUD_NAME=cloudinary_cloud_name
JWT_SECRET=jwt_secret
```

4. **Connect the database and create schema**

This project uses MySQL. Create a connection with your database using your own host, username, password, and database name. 

Then, to create the database schema, in the server directory, run:

```bash
npm db:migrate
```

5. **Run the application**

To start the development server for the client-side, run:

```bash
npm run dev
```
To start a local server, run:

```bash
npm start
```

## API Reference

#### Sign up

```http
  POST /api/signup
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `email`    | `string` | **Required**. User's email           |
| `name`     | `string` | **Required**. User's name            |
| `password` | `string` | **Required**. Password (min 8 chars) |

#### Log in

```http
  POST /api/login
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `email`    | `string` | **Required**. User's email           |
| `password` | `string` | **Required**. Password (min 8 chars) |

#### Get user profile

```http
  GET /api/profile
```

**Requires authentication**

#### Get all trips

```http
  GET /api/trips
```

**Requires authentication**

#### Create a new trip

```http
  POST /api/trips
```

| Parameter    | Type     | Description                                 |
| :----------- | :------- | :------------------------------------------ |
| `trip_name`  | `string` | **Required**. Name of the trip              |
| `start_date` | `string` | **Required**. Start date (format: YYYY-MM-DD) |
| `end_date`   | `string` | End date (format: YYYY-MM-DD)               |

**Requires authentication**

#### Get trip by ID

```http
  GET /api/trips/${tripId}
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `tripId`  | `string` | **Required**. ID of the trip   |

**Requires authentication**

#### Delete trip by ID

```http
  DELETE /api/trips/${tripId}
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `tripId`  | `string` | **Required**. ID of the trip   |

**Requires authentication**

#### Get entries by trip ID

```http
  GET /api/entries/${tripId}
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `tripId`  | `string` | **Required**. ID of the trip   |

**Requires authentication**

#### Get entry

```http
  GET /api/entries/${tripId}/${entryDate}
```

| Parameter    | Type     | Description                    |
| :----------- | :------- | :----------------------------- |
| `tripId`     | `string` | **Required**. ID of the trip   |
| `entryDate`  | `string` | **Required**. Date of the entry |

**Requires authentication**

#### Add a new entry

```http
  POST /api/entries/${tripId}/${entryDate}
```

| Parameter    | Type     | Description                    |
| :----------- | :------- | :----------------------------- |
| `tripId`     | `string` | **Required**. ID of the trip   |
| `entryDate`  | `string` | **Required**. Date of the entry |

**Requires authentication**

#### Edit an entry

```http
  PUT /api/entries/${tripId}/${entryDate}
```

| Parameter    | Type     | Description                    |
| :----------- | :------- | :----------------------------- |
| `tripId`     | `string` | **Required**. ID of the trip   |
| `entryDate`  | `string` | **Required**. Date of the entry |

**Requires authentication**

#### Upload a photo

```http
  POST /api/${tripId}/${entryDate}/photos
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `tripId`     | `string` | **Required**. ID of the trip    |
| `entryDate`  | `string` | **Required**. Date of the entry |
| `image`      | `file`   | **Required**. Image file        |

**Requires authentication**

#### Get photos

```http
  GET /api/${tripId}/${entryDate}/photos
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `tripId`     | `string` | **Required**. ID of the trip    |
| `entryDate`  | `string` | **Required**. Date of the entry |

**Requires authentication**

#### Delete a photo

```http
  DELETE /api/${tripId}/${entryDate}/photos
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `tripId`     | `string` | **Required**. ID of the trip    |
| `entryDate`  | `string` | **Required**. Date of the entry |
| `public_id`  | `string` | **Required**. Public ID of the photo |

**Requires authentication**

#### Upload text

```http
  POST /api/${tripId}/${entryDate}/text
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `tripId`     | `string` | **Required**. ID of the trip    |
| `entryDate`  | `string` | **Required**. Date of the entry |
| `description`| `string` | **Required**. Description text  |

**Requires authentication**

#### Get text

```http
  GET /api/${tripId}/${entryDate}/text
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `tripId`     | `string` | **Required**. ID of the trip    |
| `entryDate`  | `string` | **Required**. Date of the entry |

**Requires authentication**
```
```
##Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`VITE_LOCALHOST`= http://localhost:8080


## Tech Stack

- HTML
- CSS
- JavaScript
- Sass
- React
- Knex
- Express
- MySQL
- Node.js

## Acknowledgements

These libraries were used to create this app: 

- Axios
- Dotenv
- React Router
- React Grid Layout
- React Dropzone
- React Colorful
- React Modal
- Sonner

## Screenshots

### Login Page
Login Page with error states shown when user does not enter the correct information.

![Login Page with Error State Shown](./docs/images/login.png)

### Signup Page
Signup Page showing active state when user clicks into the textbox. 

![Active State on Signup Page](./docs/images/signup.png)

### Dashboard (My Trips Page)
My Trips Page shows the user's name when logged in, the list of trips that they want to create logs for, and an add trip form below to add a new trip. There is also a logout button when a user is signed in so they can log out.

![My Trips Page (Dashboard)](./docs/images/authUserDashboard.png)

### Dashboard (My Trips Page) - Validation & Hover Effect
On the My Trips Page, it shows the hover effect when hovering over a trip as well as the form validation on the add trip form.

![Add New Trip Field Validation and Hover Effect on Trip List](./docs/images/dashboardHoverValidation.png)

### Dashboard (Toasts)
When a new trip is added, a toast pops up alerting the user to the new trip and the new trip is displayed in the list.

![Add Trip Toast Notification](./docs/images/addTripToast.png)

### Trip Details Page 
When a trip is clicked on, it takes the user to the Trip Details Page. This displays a list of all the days on their trip, if the user has submitted a log for that day yet, and a corresponding add/edit button so the user can create or update their entry. The title is highlighted at the top in purple and the option to go back to the My Trips Page is available as well as the Delete Trips button.

![Trip Details Page](./docs/images/tripDetailsPage.png)

### Trip Details Page (Delete Trips Functionality)
On the trip details page, when the delete button is pressed, a modal will pop up asking the user to confirm if they want to delete this trip or not. When clicked, the trip & its corresponding data is deleted from the database & photos from cloudinary. A toast notification will inform the user when a trip is deleted. 

![Delete Trip Modal](./docs/images/deleteTripModal.png)

### Add Entry Page (Uploading Photos)
When a user clicks the add entry button, they are taken to this layout, where they can click on tabs to add a daily log. The photos tab lets users upload photos to the layout. When a photo is uploaded, a preview of the image will display and the option to upload or cancel is available.

![Upload Photo Preview](./docs/images/uploadPreview.png)

Once uploaded, the photo will display in a gallery in the bottom of the tab as part of Today's Photos and it will be rendered onto the "journal page" as well. The buttons become a "New Upload" button and a disabled button that says "Uploaded". 

![Uploaded Photo Result](./docs/images/uploadedPhotoProcess.png)

When a photo is being uploaded, an "uploading..." toast will pop up and notify the user when the upload is complete.

![Uploading Photo Toast](./docs/images/uploadingPhotoToast.png)

### Add Entry Page (Deleting Photos)
In the photos tab, in the Today's Photos section, when a user clicks on a photo, they have the option to delete the photo. The delete modal will pop up asking the user for confirmation. 

![Delete Photo Modal](./docs/images/deletePhotoModal.png)

If the delete request is unsuccessful, a toast will notify the user.
![Delete Error Photo Toast](./docs/images/errorDeletePhotoToast.png)

If successful, the user will be notified with a toast, and in the following picture, the photo that was last uploaded had been deleted succesfully and is removed from the layout.

![Delete Photo Success Toast](./docs/images/successPhotoDeleteToast.png)

### Add Entry Page (Add Text & Move Items)
When the Text tab is clicked, it takes the user to the upload text function where they can type in anything and it will be added to the entry. The photos and text blocks can also be resized and moved anywhere on the "journal pages".

![Add text items and resize photos and text.](./docs/images/addText.png)

### Add Entry Page (Design Tab)
On the design tab, the user can customize the text colour, border colour of the photos, and the border width of the photos. When the colour swatch is clicked on, a colour picker will pop up and the user can choose any colour. Clicking outside of the colour picker closes it. The same functionality applies to the border colour option. 

![Editing Text Colour](./docs/images/editingTextColour.png)

When customizing colours and border width, once the user has selected different values, a reset button will appear, allowing the user to revert the values back to the default colours and a border width of 0.
![Entry Customization](./docs/images/customizedEntry.png)

### Add Entry Page (Save Photo Toast, Entry List Updated)
When the user clicks on save entry, the layout of the text & photos is saved. A toast will pop up informing the user of the successful entry save and then redirect them back to the Trip Details Page for that specific trip.

![Saving a New Entry](./docs/images/saveAddEntry.png)

The user gets redirected to the entry list after saving a new entry and the status for that day changes, informing the user that they have added an entry for that day already. Now they have the option to edit a previously saved entry or add a new entry for a different day. 

![Entry List Status](./docs/images/statusChangeAfterSave.png)

### Edit Entry Page
When the user has a previously saved entry, then can still edit it. The user can upload more photos and text as usual and customize the items. When the save button is clicked, a toast will pop up with a success or error message.

![Successful Edit and Save](./docs/images/successfulEditSave.png)

### Logout Redirect
The user can log out via the logout button and once clicked, a toast notification will confirm their log out and the page is redirected to the login page.

![Logout Message](./docs/images/logoutFunction.png)

## Lessons Learned
- Learning how to use a library or a feature is very time consuming. It felt like no progress was made after spending hours reading documentation and watching videos.
- Start as early as possible: I did not have a clear picture of what I wanted to do until the final week of the capstone.
- My capstone proposal roadmap was helpful as it was basically a to-do list of features I wanted to create. However, the order in which I ended up building this application not the way I had outlined in the proposal. Sometimes, I would start work on one feature, then realize I needed another feature before I could implement the one I was working on and had to change my workflow.
- I should document my work more clearly and regularly. While I had an on-going task list that I would keep adding to, I did not document the work I had already completed or what I had figured out that day. In future projects, I will be sure to outline both my completed work and future tasks each day.

## Next Steps
- Add delete functionality for text items
- Figure out how to constrain the react-layout grid vertically so photos cannot be moved past the "journal"
- Make the site responsive
- Connect with Spotify API so users can embed a song or playlist for an entry
- More informative toast styling
- Make the dates more "readable" and display as in this format: "Mon 13 Sept 2023" instead of 2023/09/13

## License

[MIT](https://choosealicense.com/licenses/mit/)
