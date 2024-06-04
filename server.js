// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/my-comment-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 댓글 스키마와 모델 설정
const commentSchema = new mongoose.Schema({
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// 댓글 생성 라우트
app.post('/comments', async (req, res) => {
    const { content, author } = req.body;
    try {
        const comment = new Comment({ content, author });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
