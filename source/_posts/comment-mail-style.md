---
title: comment-mail-style
date: 2021-08-13 11:42:08
index_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/comment-mail-style20210813114545.png
banner_img:
tags:
- hexo
- web技术
categories: [资源,模板]
descripte: 评论邮件📧通知样式模板(很丑,慎入!!!)
---

{% note primary %}
最近更换了评论系统为[Twikoo](https://twikoo.js.org/)（很好用，推荐大家使用）。完了之后感觉它的评论邮件通知样式有点不太好看，于是自己折腾了一个<span class='heimu'>也不是很好看的</span>自己弄的样式，分享出来<span class='heimu'>接受批斗</span>！
{% endnote %}

---

首先上代码：

```html
<div class="nui-fClear sR0"> 
  <br> 

  <table style="margin: auto; width: 340px; height: 500px;">
   <tbody>
    <tr>
     <td style="background: #f5f7f6;padding: 10px;border-radius: 5px;">
      <div style="
    display: -webkit-box;
    -webkit-box-pack: center;
"><img src="https://file.tabirstrees.top/blogfile/piano%20xun.jpg" alt="haokan" width="100%"></div>
      <div style="background-color:rgb(255, 233, 233);background-position: center;border-left: 3px solid #414040;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;width:500px;color:#030303;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;font-size:12px;margin: auto;"> 
       
       <h2 style="border-bottom:1px solid rgb(0, 0, 0);font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"><span style="color: #f59200;font-weight: bold;">&gt; </span>您在 <a style="text-decoration:none;color: #f59200;" href="${SITE_URL}">${SITE_NAME}</a> 博客上的留言有回复啦！</h2> 
       <div style="background-color: rgb(208, 212, 247); padding:5px 12px 5px 12px;margin-top:18px;border-radius: 3px;"> 
        <p>${PARENT_NICK} 同学，您曾在<strong>${SITE_NAME}</strong>上发表评论:</p> 
        <div class="comment">${PARENT_COMMENT}</div> 
        <p>${NICK} 给您的回复如下:</p> 
        <div class="comment">${COMMENT}</div> 
        <p>您可以点击 <a style="text-decoration:none; color:#f59200" href="${POST_URL}">查看回复的完整內容 </a>，欢迎再次光临 <a style="text-decoration:none; color:#f59200" href="${SITE_URL}">${SITE_NAME}</a>。</p> 
       </div> 
      </div> </td>
    </tr>
   </tbody>
  </table> 
  <br>
  <br> 
 </div>

 <style>
   .comment {
    background-color: #ffffff;
    border: 0px solid #DDD;
    padding: 10px 15px;
    margin:18px 0;
    border-radius: 5px;
   }
 </style>
```

---

然后是效果图:

![comment-mail-style评论邮件通知](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/comment-mail-style评论邮件通知.jpg)

---

{% note success %}
感觉还是太丑了,还是html和css的基础不太好,有时间得再好好学一学。大家有好看的模板也可以推荐给我啊😂！
{% endnote %}