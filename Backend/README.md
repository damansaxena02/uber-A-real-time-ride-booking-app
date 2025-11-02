# User Registration Endpoint Documentation

## POST `/users/register`

Registers a new user in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional, min 3 chars if provided)"
  },
  "email": "string (valid email, min 10 chars, required)",
  "password": "string (min 6 chars, required)"
}
```# User Registration Endpoint Documentation

## POST `/users/register`

Registers a new user in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional, min 3 chars if provided)"
  },
  "email": "string (valid email, min 10 chars, required)",
  "password": "string (min 6 chars, required)"
}
```
#### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

---

### **Responses**

#### **201 Created**

- **Description:** User registered successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields).
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required fields must be provided and valid.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

---

## POST `/users/login`

Authenticates a user and returns a JWT token.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

---

### **Responses**

#### **200 OK**

- **Description:** User authenticated successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields).
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **401 Unauthorized**

- **Description:** Invalid email or password.
- **Body:**
  ```json
  {
    "message": "invalid email or password"
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required fields must be provided and valid.
- The response includes a JWT token for authentication.

---

## GET `/users/profile`

Returns the authenticated user's profile information.

---

### **Headers**

- `Authorization: Bearer <jwt_token>` (or cookie with token)

---

### **Responses**

#### **200 OK**

- **Description:** Returns the user's profile.
- **Body:**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
  ```

#### **401 Unauthorized**

- **Description:** Missing or invalid authentication token.
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### **Notes**

- Requires authentication via JWT token.

---

## GET `/users/logout`

Logs out the authenticated user by blacklisting the token and clearing the cookie.
# Captain Endpoints Documentation

## POST `/captains/register`

Registers a new captain (driver) in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional, min 3 chars if provided)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (one of: car, motorcycle, auto, required)"
  }
}
```

#### Example

```json
{
  "fullname": {
    "firstname": "Amit",
    "lastname": "Sharma"
  },
  "email": "amitsharma@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "DL01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### **Responses**

#### **201 Created**

- **Description:** Captain registered successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Amit",
        "lastname": "Sharma"
      },
      "email": "amitsharma@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "DL01AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields) or captain already exists.
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "captain already exist"
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required# Captain Endpoints Documentation

## POST `/captains/register`

Registers a new captain (driver) in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional, min 3 chars if provided)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (one of: car, motorcycle, auto, required)"
  }
}
```

#### Example

```json
{
  "fullname": {
    "firstname": "Amit",
    "lastname": "Sharma"
  },
  "email": "amitsharma@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "DL01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### **Responses**

#### **201 Created**

- **Description:** Captain registered successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Amit",
        "lastname": "Sharma"
      },
      "email": "amitsharma@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "DL01AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields) or captain already exists.
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "captain already exist"
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required
---

### **Headers**

- `Authorization: Bearer <jwt_token>` (or cookie with token)

---

### **Responses**

#### **200 OK**

- **Description:** User logged out successfully.
- **Body:**
  ```json
  {
    "message": "logged out successfully"
  }
  ```

#### **401 Unauthorized**

- **Description:** Missing or invalid authentication token.
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### **Notes**

- Requires authentication via JWT token.
- The token is invalidated
#### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

---

### **Responses**

#### **201 Created**

- **Description:** User registered successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields).
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required fields must be provided and valid.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

---## POST `/users/login`

Authenticates a user and returns a JWT token.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

---

### **Responses**

#### **200 OK**

- **Description:** User authenticated successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields).
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **401 Unauthorized**

- **Description:** Invalid email or password.
- **Body:**
  ```json
  {
    "message": "invalid email or password"
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required fields must be provided and valid.
- The response includes a JWT token for authentication.

---## POST `/users/login`

Authenticates a user and returns a JWT token.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

---

### **Responses**

#### **200 OK**

- **Description:** User authenticated successfully.
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### **400 Bad Request**

- **Description:** Validation failed (missing or invalid fields).
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### **401 Unauthorized**

- **Description:** Invalid email or password.
- **Body:**
  ```json
  {
    "message": "invalid email or password"
  }
  ```

#### **500 Internal Server Error**

- **Description:** Unexpected server error.

---

### **Notes**

- All required fields must be provided and valid.
- The response includes a JWT token for authentication.

---