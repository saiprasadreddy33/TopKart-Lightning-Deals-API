Lightning Deals API

This API provides endpoints for lightning deals, which are limited-time offers on specific products. Users can view available deals, get details about a specific deal, and place an order for a deal.
Technologies Used

    Node.js - a JavaScript runtime environment
    Express.js - a web application framework for Node.js
    Moment.js - a JavaScript library for working with dates and times
    JSON - a lightweight data interchange format

Installation

    Clone the repository: git clone https://github.com/example/lightning-deals-api.git
    Install dependencies: npm install
    Start the server: npm start

Usage
Endpoints

    GET /lightning-deals: Get all available lightning deals
    GET /lightning-deals/:id: Get details about a specific lightning deal
    POST /lightning-deals/:id/order: Place an order for a specific lightning deal

Request Headers

All endpoints require the following request header:

    Authorization: A JSON Web Token (JWT) obtained from the authentication server

Response Format

    GET /lightning-deals and GET /lightning-deals/:id: Returns a JSON object with the following properties:
        id: The unique identifier of the lightning deal
        name: The name of the product on sale
        description: A brief description of the product on sale
        price: The discounted price of the product on sale
        expiryTime: The date and time when the lightning deal expires in YYYY-MM-DD HH:mm:ss format
    POST /lightning-deals/:id/order: Returns a JSON object with a success message.

Error Responses

The API returns the following error responses:

    400 Bad Request: Returned if the requested lightning deal has expired.
    401 Unauthorized: Returned if the JWT is missing or invalid.
    404 Not Found: Returned if the requested lightning deal is not found.

License

This project is licensed under the MIT License - see the LICENSE file for details.