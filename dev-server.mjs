'use strict';

// ==========================================================================
// 开发用静态文件服务器（Node 内置模块，零依赖）
// 用法：node dev-server.mjs [端口]
// 说明：仅供本地预览官网使用；GitHub Pages 部署不需要此文件
// ==========================================================================

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

// 站点根目录（本文件所在目录）
const ROOT = normalize(fileURLToPath(new URL('.', import.meta.url)));
const PORT = Number(process.argv[2]) || 8000;

// 常见 MIME 类型映射
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
};

const server = createServer(async (req, res) => {
    try {
        const urlPath = decodeURIComponent(
            new URL(req.url, 'http://localhost').pathname
        );
        // 根路径默认返回 index.html
        const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
        const filePath = normalize(join(ROOT, rel));

        // 防止路径穿越到站点根目录之外
        if (!filePath.startsWith(ROOT)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        const data = await readFile(filePath);
        res.writeHead(200, {
            'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
        });
        res.end(data);
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`[dev-server] http://127.0.0.1:${PORT}/  (root: ${ROOT})`);
});
