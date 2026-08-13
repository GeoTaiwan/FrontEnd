# ⚡ 快速啟動指南

## 🚀 立即開始 (3步)

### 方式一：使用測試版本 (推薦) ✅
1. **打開文件**：用瀏覽器打開 `player_test.html`
2. **點擊播放**：點擊"播放"按鈕或按空白鍵
3. **享受音樂**：使用所有功能進行測試

✨ 優點：無需準備音樂文件，立即可用，包含5個測試音頻

---

### 方式二：使用主播放器 (需要音樂文件)
1. **準備音樂**：在 `music/` 文件夾中放入 `.mp3` 文件
2. **更新列表**：編輯 `player.js` 中的播放列表
3. **打開文件**：用瀏覽器打開 `25playerClaude.html`

---

## 📋 文件說明

| 文件 | 說明 | 大小 |
|------|------|------|
| `25playerClaude.html` | 主播放器 (需要音樂文件) | ~3KB |
| `player_test.html` | 測試播放器 (推薦使用) | ~15KB |
| `player.css` | 樣式文件 | ~12KB |
| `player.js` | 功能文件 | ~12KB |
| `README.md` | 完整文檔 | ~10KB |

---

## 🎮 快速操作

### 按鍵快捷
| 按鍵 | 功能 |
|------|------|
| `Space` | ▶️ 播放/暫停 |
| `→` | ⏩ 快轉10秒 |
| `←` | ⏪ 倒轉10秒 |
| `↑` | 🔊 增加音量 |
| `↓` | 🔉 減少音量 |

### 鼠標操作
- **進度條**：點擊任意位置快速跳轉
- **音量滑桿**：拖動調整音量
- **曲目選擇**：下拉菜單選曲

---

## 🧪 測試播放器特點

`player_test.html` 包含5個內置測試曲目：

1. **高音測試 (C5)** - 高頻率音音
2. **中音測試 (A4)** - 標準音樂頻率 (440Hz)
3. **低音測試 (C4)** - 低頻率音音
4. **多音組合** - 和弦 (A4, C#5, E5)
5. **白噪聲測試** - 白噪聲生成

所有音頻由 Web Audio API 即時生成，無需外部文件！

---

## 🎧 使用真實音樂

### 添加MP3文件

1. 在 `music/` 文件夾中放入你的 `.mp3` 文件
   ```
   music/
   ├── song1.mp3
   ├── song2.mp3
   └── song3.mp3
   ```

2. 編輯 `player.js`，修改 `playlist` 數組：
   ```javascript
   this.playlist = [
       {
           id: 1,
           title: '我的歌曲1',
           src: 'music/song1.mp3',
           duration: '3:45'
       },
       {
           id: 2,
           title: '我的歌曲2',
           src: 'music/song2.mp3',
           duration: '4:12'
       }
   ];
   ```

3. 使用 `25playerClaude.html`

---

## ⚙️ 常見設置

### 改變快進/快退時長
編輯 `player.js` 第 XX 行：
```javascript
this.skipAmount = 15;  // 改成15秒
```

### 改變默認音量
編輯 `player.js` 第 XX 行：
```javascript
this.defaultVolume = 50;  // 改成50%
```

### 改變配色
編輯 `player.css` 搜索 `#667eea` 並替換為你喜歡的顏色

### 改變字體
編輯 `player.css` 第一個 `body` 規則：
```css
font-family: '你的字體', sans-serif;
```

---

## 🎨 顏色主題推薦

### 深藍主題（當前）
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #667eea;
```

### 青綠主題
```css
background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
color: #00d4ff;
```

### 粉紅主題
```css
background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
color: #ff1493;
```

### 綠色主題
```css
background: linear-gradient(135deg, #00ff00 0%, #00aa00 100%);
color: #00aa00;
```

---

## 📱 手機支持

播放器已完全適配手機：
- 自動調整按鈕大小
- 觸摸友好的界面
- 響應式設計

直接在手機瀏覽器打開 HTML 文件即可！

---

## 🐛 故障排除

### 音樂無法播放
- ❌ 路徑錯誤 → 確認 `src: 'music/song.mp3'` 的路徑
- ❌ 格式不支持 → 使用 `.mp3` 格式
- ❌ CORS 錯誤 → 在本地或支持CORS的服務器上運行

### JavaScript 報錯
- 打開瀏覽器開發者工具 (F12)
- 查看 Console 標籤的錯誤信息
- 確保 HTML、CSS、JS 文件在同一文件夾

### 按鈕無反應
- 刷新頁面 (F5)
- 清除瀏覽器緩存 (Ctrl+Shift+Del)
- 確認 JavaScript 文件已正確引入

---

## 💡 進階技巧

### 在 VS Code 中實時預覽
1. 安裝 "Live Server" 擴展
2. 右鍵選擇 "Open with Live Server"
3. 自動打開瀏覽器預覽

### 部署到網絡
1. 上傳所有文件到服務器
2. 保持文件夾結構完整
3. 訪問 HTML 文件的 URL

### 與其他網頁集成
將此 HTML 嵌入 iframe：
```html
<iframe src="player.html" width="600" height="500"></iframe>
```

---

## 📞 問題反饋

遇到問題？
1. 查看 `README.md` 完整文檔
2. 檢查瀏覽器控制台錯誤
3. 確認所有文件正確放置

---

## 🎉 現在開始使用！

**立即打開 `player_test.html` 體驗播放器！**

祝您使用愉快！🎵
