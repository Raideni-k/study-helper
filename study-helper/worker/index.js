// worker/index.js
export default {
    async fetch(request, env) {
      const { goal, time } = await request.json();
      
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.DEEPSEEK_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "deepseek-r1-671b",
          messages: [{
            role: "user",
            content: `作为专业导师，请制定学习计划：
  目标：${goal}
  时间：${time}/天
  要求：分阶段、包含资源推荐、Markdown表格格式`
          }]
        })
      });
      
      return new Response(response.body, {
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    }
  }
  