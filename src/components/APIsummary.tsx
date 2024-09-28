import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdown = `
# Hello!

Thank you for taking the time to review my assignment! The task required outlining how to implement the necessary functionality. However, due to some confusion, I reached out via email for clarification but haven't received a response. Therefore, I've included a complete overview of the APIs below, even though not all APIs are rendered in this web application.

## API Overview

This application provides several endpoints to manage special and standard hours:

### Endpoints: 

- **GET /api/hours/today** - Retrieves today's hours.
- **GET /api/hours/date?date={date}** - Retrieves hours for a specified date (format: yyyy/MM/dd).
- **GET /api/hours/standard** - Retrieves all standard hours.
- **POST /api/hours/special** - Adds special hours with validation.
- **PUT /api/hours/special/{id}** - Updates special hours by ID.
- **GET /api/hours/special/upcoming** - Retrieves upcoming special hours.
- **DELETE /api/hours/special/{id}** - Deletes special hours by ID.
- **POST /api/hours/standard** - Sets standard hours.

### Validation

Each endpoint includes validation to ensure data integrity:

- Dates cannot be in the past.
- Time values must not be null.
- Special hour messages are limited to 100 characters.
- Duplicate special hours for a given date are not allowed.

### Implementation

For the backend, I set up a clean architecture using a **DTO** to handle data transfers. The **Entity** classes define the structure of our database tables, ensuring everything is well organized. 

The **Service** layer contains all the business logic, making sure we validate inputs and manage data operations. The **Controller** layer is where the magic happens—it manages the API endpoints, processes incoming requests, and formats the responses in a way that’s easy to work with.

The application connects to a PostgreSQL database, which allows for efficient data storage and retrieval. Each API call hits the service layer, where we validate the input, fetch the required data from the database, and return it in a nicely structured format.

Thank you for your time, and have a great day!
`;

const ApiSummary: React.FC = () => {
    return (
        <div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};

export default ApiSummary;
