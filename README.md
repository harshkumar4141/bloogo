# Bloogo

A server-rendered blogging platform built with Express and MongoDB : users sign up, write posts with a cover image, and comment on each other's posts.

## Features

- **Authentication** : signup/signin/logout with sessions handled via JWT stored in an HTTP cookie
- **Custom password hashing** : passwords are hashed with `crypto`'s HMAC-SHA256 and a unique per-user salt, rather than a hashing library, as a way to understand what's actually happening under the hood of password security
- **Blog CRUD** : create posts with a title, body, and cover image (uploaded via Multer, stored on disk)
- **Comments** : threaded under each blog post, tied to both the post and the commenting user
- **Role modeling** : user schema supports `USER` and `ADMIN` roles (admin-specific permissions are a planned next step, not yet enforced)
- **Server-rendered views** : EJS templates, no separate frontend framework

## Tech Stack

- **Backend**: Node.js, Express 5
- **Database**: MongoDB with Mongoose
- **Auth**: JSON Web Tokens (jsonwebtoken), cookie-parser
- **File uploads**: Multer
- **Views**: EJS

## Project Structure

```
bloogo/
├── app.js                      # Entry point, mounts routes and DB connection
├── middlewares/
│   └── authentication.js       # Reads JWT cookie, attaches req.user if valid
├── services/
│   └── authentication.js       # Token creation and verification
├── models/
│   ├── user.js                 # User schema + password hashing logic
│   ├── blog.js                 # Blog post schema
│   └── comment.js              # Comment schema
├── routes/
│   ├── user.js                 # Signup, signin, logout
│   └── blog.js                 # Create/view posts, add comments
└── views/                      # EJS templates
```

## Getting Started

```bash
git clone https://github.com/harshkumar4141/bloogo.git
cd bloogo
npm install
```

Create a `.env` file in the project root:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run it:

```bash
npm run dev    # with nodemon
# or
npm start
```

## License

ISC
