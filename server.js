// TCP Chat Server - Web Application
// This server can be deployed online and accessed via URL!

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Store connected users
const users = new Map();
let userIdCounter = 0;

// WebSocket connection handler
wss.on('connection', (ws) => {
    const userId = ++userIdCounter;
    console.log(`[${new Date().toLocaleTimeString()}] New user connected: User #${userId}`);
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'system',
        message: 'Welcome to TCP Chat! Please enter your name.',
        timestamp: Date.now()
    }));
    
    let userName = null;
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            // Handle name registration
            if (!userName) {
                userName = message.text.trim() || `User${userId}`;
                users.set(userId, { ws, name: userName });
                
                console.log(`[${new Date().toLocaleTimeString()}] User #${userId} identified as: ${userName}`);
                
                // Send confirmation to user
                ws.send(JSON.stringify({
                    type: 'system',
                    message: `Welcome, ${userName}! You are connected as User #${userId}`,
                    timestamp: Date.now()
                }));
                
                // Broadcast to others
                broadcastToOthers(userId, {
                    type: 'join',
                    message: `${userName} joined the chat! 🎉`,
                    timestamp: Date.now()
                });
                
                // Send user list
                sendUserList(ws);
                return;
            }
            
            // Handle different message types
            switch (message.type) {
                case 'chat':
                    console.log(`[${new Date().toLocaleTimeString()}] ${userName}: ${message.text}`);
                    broadcastToAll({
                        type: 'chat',
                        userId: userId,
                        userName: userName,
                        message: message.text,
                        timestamp: Date.now()
                    });
                    break;
                    
                case 'list':
                    sendUserList(ws);
                    break;
                    
                default:
                    console.log(`Unknown message type: ${message.type}`);
            }
            
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
    
    ws.on('close', () => {
        if (userName) {
            console.log(`[${new Date().toLocaleTimeString()}] ${userName} (User #${userId}) disconnected`);
            
            users.delete(userId);
            
            // Notify others
            broadcastToAll({
                type: 'leave',
                message: `${userName} left the chat 👋`,
                timestamp: Date.now()
            });
        } else {
            console.log(`[${new Date().toLocaleTimeString()}] User #${userId} disconnected (never registered name)`);
        }
    });
    
    ws.on('error', (error) => {
        console.error(`[${new Date().toLocaleTimeString()}] WebSocket error for User #${userId}:`, error);
    });
});

// Broadcast to all connected users
function broadcastToAll(data) {
    const message = JSON.stringify(data);
    users.forEach(({ ws }) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}

// Broadcast to all except sender
function broadcastToOthers(senderId, data) {
    const message = JSON.stringify(data);
    users.forEach(({ ws }, id) => {
        if (id !== senderId && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}

// Send user list to a specific client
function sendUserList(ws) {
    const userList = Array.from(users.entries()).map(([id, { name }]) => ({
        id,
        name
    }));
    
    ws.send(JSON.stringify({
        type: 'userlist',
        users: userList,
        count: userList.length,
        timestamp: Date.now()
    }));
}

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        users: users.size,
        uptime: process.uptime()
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🌐 TCP CHAT SERVER - ONLINE');
    console.log('='.repeat(50));
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Local: http://localhost:${PORT}`);
    console.log(`✓ Ready to accept connections!`);
    console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
