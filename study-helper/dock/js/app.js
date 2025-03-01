// docs/app.js
const WORKER_URL = '你的Cloudflare Worker地址';

document.getElementById('planForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const goal = document.getElementById('goal').value;
    const time = document.getElementById('time').value;
    
    try {
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ goal, time })
        });
        
        const data = await response.json();
        const plan = data.choices[0].message.content;
        
        // 本地存储+展示
        localStorage.setItem('latestPlan', plan);
        document.getElementById('result').innerHTML = marked.parse(plan); // 需引入marked.js
        
    } catch (error) {
        alert('生成失败: ' + error.message);
    }
});
