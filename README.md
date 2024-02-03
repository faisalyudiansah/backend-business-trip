# API Docs

## TechStack :
- Node JS (Express JS)
- Sequelize ORM
- PostgreSQL
- JWT
- bcryptjs

## Getting Started :
- clone and go to the server folder
- npm i
- set your database configuration in the config folder (development)
- npx sequelize db:drop
- npx sequelize db:create
- npx sequelize db:migrate
- npx sequelize db:seed:all
- npm run dev

## Endpoints :

List of endpoints for public :
- [POST /register](#post-register)
- [POST /login](#post-login)

List of endpoints with authentication (Access Token) :
- [POST /business](#post-business)
- [PUT /business/:idBusiness](#put-businessidbusiness)
- [DELETE /business/:idBusiness](#delete-businessidbusiness)
- [GET /business/search](#get-businesssearch)
    - `/business/search?location=las vegas`
    - `/business/search?open_now=<boolean>`
    - `/business/search?categories=italian`
    - `/business/search?limit=2`
    - `/business/search?sort_by=<review_count> | <rating>`

## Examples of available accounts (Get Access Token) :
- Body:
```json
{
    "email": "ronaldo@gmail.com",
    "password" : "12345"
}
OR
{
    "email": "messi@gmail.com",
    "password" : "12345"
}
```

&nbsp;

## POST /register
Description:
- Create account/add an user.

Request:
- Body:
```json
{
  "name": string (require),
  "email": string (require),
  "password": string (require),
}
```

_Response (201 - Created)_
```json
{
  "id": number,
  "email": string
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## POST /login
Description:
- Login account to get Access Token (You can use example accounts [Here](#examples-of-available-accounts-get-access-token)).

Request:
- Body:
```json
{
  "email": string (require),
  "password": string (require),
}
```

_Response (200 - OK)_
```json
{
  "access_token": string
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## POST /business
Description:
- Create a new business. You can copy the req.body below to try it

Request:
- headers: 
```json
{
    "access_token": "Bearer <your_access_token>" 
}
```

- Body:
```json
{
  "alias": "alfamartorito-park-new-york",
  "name": "Alfamartorito Park",
  "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/s_H7gm_Hwmz--O6bo1iU-A/o.jpg",
  "is_closed": true,
  "url": "https://www.yelp.com/biz/eleven-madison-park-new-york?adjust_creative=DSj6I8qbyHf-Zm2fGExuug&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=DSj6I8qbyHf-Zm2fGExuug",
  "Categories": [
    1,
    3
  ],
  "transactions": [
    "pickup"
  ],
  "price": "$",
  "phone": "+218892201",
  "display_phone": "(212) 889-0911",
  "Location": {
    "address1": "Jendral Sudirman",
    "address2": "",
    "address3": "",
    "city": "Jakarta",
    "zip_code": "13010",
    "country": "IDN",
    "state": "ID"
  },
  "coordinates": {
    "latitude": 40.7416907417333,
    "longitude": -73.9872074872255
  }
}
```

_Response (201 - Created)_
```json
{
  "message": "Alfamartorito Park successfully created"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Location is required"
}
OR
{
  "message": "Categories is required"
}
```

## PUT /business/:idBusiness
Description:
- Update / edit a business. You can copy the req.body below to try it (you need to know the ID from [GET /business/search](#get-businesssearch))

Request:
- headers: 
```json
{
    "access_token": "Bearer <your_access_token>" 
}
```

- params: 
```json
{
    "idBusiness": ID Business (required)
}
```

- Body:
```json
{
  "alias": "alfamart-park-new-york",
  "name": "Alfamart Park",
  "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/s_H7gm_Hwmz--O6bo1iU-A/o.jpg",
  "is_closed": true,
  "url": "https://www.yelp.com/biz/eleven-madison-park-new-york?adjust_creative=DSj6I8qbyHf-Zm2fGExuug&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=DSj6I8qbyHf-Zm2fGExuug",
  "Categories": [
    5,
    6
  ],
  "transactions": [
    "pickup"
  ],
  "price": "$",
  "phone": "+218892201",
  "display_phone": "(212) 889-0911",
  "Location": {
    "address1": "Jendral Sudirman",
    "address2": "",
    "address3": "",
    "city": "DKI Jakarta",
    "zip_code": "13010",
    "country": "IDN",
    "state": "ID"
  },
  "coordinates": {
    "latitude": 40.7416907417333,
    "longitude": -73.9872074872255
  }
}
```

_Response (200 - OK)_
```json
{
  "message": "Alfamart Park has been updated"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Location is required"
}
OR
{
  "message": "Categories is required"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Cannot found a business with that ID"
}
```

## DELETE /business/:idBusiness
Description:
- Delete a business. (you need to know the ID from [GET /business/search](#get-businesssearch))

Request:
- headers: 
```json
{
    "access_token": "Bearer <your_access_token>" 
}
```

- params: 
```json
{
    "idBusiness": ID Business (required)
}
```

_Response (200 - OK)_
```json
{
  "message": "Business success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Cannot found a business with that ID"
}
```

&nbsp;

## GET /business/search
Description:
- Get all businesses or search for specific business by : 
    - `/business/search?location=las vegas | location=new york`
    - `/business/search?open_now=<boolean>`
    - `/business/search?categories=italian | categories=pizza | categories=seafood`
    - `/business/search?limit=2`
    - `/business/search?sort_by=<review_count> | <rating>`

Request:
- headers: 
```json
{
    "access_token": "Bearer <your_access_token>" 
}
```

_Response (200 - OK)_
```json
{
  "businesses": [
    {
      "id": 1,
      "alias": "eleven-madison-park-new-york",
      "name": "Eleven Madison Park",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/s_H7gm_Hwmz--O6bo1iU-A/o.jpg",
      "is_closed": true,
      "url": "https://www.yelp.com/biz/eleven-madison-park-new-york?adjust_creative=DSj6I8qbyHf-Zm2fGExuug&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=DSj6I8qbyHf-Zm2fGExuug",
      "review_count": 2477,
      "rating": 3.5,
      "transactions": [
        "pickup"
      ],
      "price": "$$$$",
      "phone": "+12128890905",
      "display_phone": "(212) 889-0905",
      "distance": 4.07435,
      "Categories": [
        {
          "alias": "newamerican",
          "title": "New American"
        },
        {
          "alias": "french",
          "title": "French"
        },
        {
          "alias": "cocktailbars",
          "title": "Cocktail Bars"
        }
      ],
      "Location": {
        "address1": "11 Madison Ave",
        "address2": "",
        "address3": "",
        "city": "New York",
        "zip_code": "10010",
        "country": "US",
        "state": "NY",
        "display_address": [
          "11 Madison Ave",
          "New York, NY 10010, US"
        ]
      },
      "coordinates": {
        "latitude": 40.7416907417333,
        "longitude": -73.9872074872255
      }
    },
    {
      "id": 2,
      "alias": "julianas-brooklyn-3",
      "name": "Juliana's",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/od36nFW220aMFAnNP00ocw/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/julianas-brooklyn-3?adjust_creative=DSj6I8qbyHf-Zm2fGExuug&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=DSj6I8qbyHf-Zm2fGExuug",
      "review_count": 2747,
      "rating": 4,
      "transactions": [
        "delivery"
      ],
      "price": "$$",
      "phone": "+17185966700",
      "display_phone": "(718) 596-6700",
      "distance": 0.30857,
      "Categories": [
        {
          "alias": "pizza",
          "title": "Pizza"
        }
      ],
      "Location": {
        "address1": "19 Old Fulton St",
        "address2": "",
        "address3": "",
        "city": "Brooklyn",
        "zip_code": "11201",
        "country": "US",
        "state": "NY",
        "display_address": [
          "19 Old Fulton St",
          "Brooklyn, NY 11201, US"
        ]
      },
      "coordinates": {
        "latitude": 40.70274718768062,
        "longitude": -73.99343490196397
      }
    },
    ...,
  ],
  "total": 5,
  "region": {
    "center": {
      "longitude": -73.99429321289062,
      "latitude": 40.70544486444615
    }
  }
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```