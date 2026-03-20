# 💬 TCP Chat Application - Real-Time Communication

A real-time chat application built with **Node.js**, **WebSocket**, and **TCP** concepts from "Understanding Distributed Systems" book.

## 🌟 Features

- ✅ **Real-time messaging** - Instant communication with WebSocket
- ✅ **Multiple users** - Chat with many friends at once
- ✅ **User presence** - See who's online
- ✅ **Beautiful UI** - Modern, responsive design
- ✅ **Easy deployment** - Deploy to cloud and get a URL
- ✅ **No installation** - Friends just visit your URL!

---

## 🚀 Quick Start

### Run Locally:

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Open browser
http://localhost:3000
```

### Deploy Online (Get a URL):

See **DEPLOYMENT_GUIDE.md** for complete instructions!

**Recommended:** Deploy to Render.com (100% free, easy setup)

---

## 📁 Project Structure

```
tcp-chat-app/
├── server.js              # WebSocket server
├── package.json           # Dependencies
├── public/
│   └── index.html         # Chat interface
├── DEPLOYMENT_GUIDE.md    # How to deploy online
└── README.md             # This file
```

---

## 🎯 How It Works

### TCP/WebSocket Communication:

1. **Connection** - Client connects via WebSocket (over TCP)
2. **Registration** - User enters name
3. **Broadcasting** - Messages sent to all connected users
4. **Real-time** - No page refresh needed!

### Technical Concepts (from the book):

- **TCP Connection** - Reliable, ordered communication
- **3-Way Handshake** - WebSocket connection establishment
- **Full-Duplex** - Bidirectional real-time communication
- **Event-Driven** - Asynchronous message handling

---

## 💻 Usage

### For Server Host:
1. Deploy app to get URL (see DEPLOYMENT_GUIDE.md)
2. Share URL with friends
3. Example: `https://my-chat-app.onrender.com`

### For Friends:
1. Click the URL
2. Enter your name
3. Start chatting!

No app installation needed! Works in any browser!

---

##  📝 License

MIT License - Free to use and modify!

---

## 🎉 Ready to Deploy?

1. Read `DEPLOYMENT_GUIDE.md`
2. Choose a platform (Render recommended)
3. Deploy in 5 minutes
4. Share URL with friends!

**Have fun chatting!** 💬🚀

---

**Made with ❤️ for Understanding Distributed Systems**
