import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdown = `
# Hello!

Thank you for checking out my assignment! The assignment instructed only to outline how to implement the necessary functionality. However, due to some confusion, I reached out via email for clarification but haven't received a response. Thus, I provided a complete overview of the APIs as outlined below.

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

- Validates that dates are not in the past.
- Checks that time values are not null.
- Ensures special hour messages do not exceed 100 characters.
- Confirms that special hours for a given date do not already exist.
### Implementation

The **controller** manages the endpoints, handling requests and responses with appropriate HTTP status codes. The **service layer** encapsulates the business logic, ensuring data validation and retrieval from the database.

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
