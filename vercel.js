{
  "version": 2,
  "builds": [
    {
      "src": "main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.js"
    }
  ]
}
