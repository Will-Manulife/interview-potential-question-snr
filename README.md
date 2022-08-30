# React: Country Search

## Environment

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://www.loom.com/share/b3fcbefb6df74ea184b59d3c358b8789)

## Functionality Requirements

The component must have the following functionalities:

- The input should initially be empty.
- If no value is entered, clicking on the 'Search Country' button should not do
  anything.
- Clicking on the 'Search Country' button should trigger an API call to
  `https://jsonmock.hackerrank.com/api/countries?name=<name_of_country>`.
- This API will return a paginated set of data, though we only ever need what is
  returned in the inital call and do NOT need to access other pages of data.
- Within the returned data is a `name` field, representing the name of the
  country. When the API returns data, this name should be rendered as a title
  below the input & button, using a `<h1>` tag, with a `data-testid` of
  `country-name`.
- Additionally, the returned data contains an array of `borders`, for each of
  these bordering country codes, please create a `<p>` tag under the country
  name, containing each of the bordering country codes. Each of these should
  have a `data-testid` of `country-border`.
- Please note that the country name and bordering countries list should should
  only be rendered if a country has been successfully found (i.e. the API
  returns a country with bordering countries). So initially when app is mounted,
  since no countries have been searched, both the country name and any bordering
  countries should not be rendered.
- All the values rendered should be below the button.

## Testing Requirements

- Input should have data-testid attribute 'app-input'.
- Button should have data-testid attribute 'submit-button'.
- Country name should have data-testid attribute 'country-name'.
- Bordering country codes should have data-testid attribute 'country-border'.

## Project Specifications

**Read Only Files**

- src/App.test.js

**Commands**

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm test
```
