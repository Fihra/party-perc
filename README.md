# Networked Drawing Application

_Created for Gray Area's [Creative Code Intensive](https://grayarea.org/creative-code-intensive). Last updated for fall 2025._

Building on our [simple node.js example](https://github.com/kjhollen/cci-node-express), this example adds socket.io to communicate real-time updates between connected users (clients) and the server.
The client side implements a very simple p5.js drawing app that sends mouse coordinates to the server when the mouse is dragged.
Then, the server sends those coordinates to all connected clients so that they can synchronize drawing.

[Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript.
This project uses the [Express](https://expressjs.com/) framework.

## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript.
If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `public/style.css`: The styling rules for the pages in your site.

← `public/client.js`: The JavaScript for the site's front-end. This connects to a socket to talk to the server and contains our p5.js code.

← `public/index.html`: This is the main index for the site. In other Glitch examples, you may see HTML templates with libraries like Handlebars instead of an index.html

← `server.js`: The **Node.js** server script for your new site. In this example, we set up some simple socket communication in addition to serving HTML, CSS, and JS files.

← `package.json`: The NPM packages for your project's dependencies.

## Originally built on Glitch

[Glitch](https://glitch.com) was a friendly community where people shared and hosted creative websites. Glitch shut down in summer 2025.
Some of the text in this file is adapted from their node start project README.

## Credits & thanks!

Example adapted from [The Coding Train](https://thecodingtrain.com/tracks/web-sockets-and-p5js).