---
title: hexo+fluid主题添加二级导航
date: 2020-05-14 15:32:02
index_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/6418A1E7501871AF561B89A22AB13D3F.png
banner_img:
tags:
- hexo
- web技术
categories:
- [技术]
---

![6418A1E7501871AF561B89A22AB13D3F](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/6418A1E7501871AF561B89A22AB13D3F.png)

---
---
{% note info %}
使用hexo博客的fluid主题已经有一段时间了，因为打算写的内容很杂，所从很早开始就想要做一个二级导航出来，这段时间一直在折腾这个东西！前几天给网站加上了豆瓣的📕书评和🎦电影栏目，发现这样要是以后再加点什么东西导航栏就放不下了。所以痛定思痛决定开始弄二级导航（~~鬼知道我为了做这个东西连即将要到来的考试和难道爆炸的课程设计都不管了~~）
{% endnote %}

# 开始搞事情😄O(∩_∩)O
emmmmm，首先~~其实差不多只有这一步啦~~我们要做的就是更改文章生成的模板，fluid主题的话就打开主题目录下的`layout`文件夹中的`nav.ejs`文件，修改为如下的样式（其中注释的位置就是修改的主要位置，也是导航栏内容所在，你也可以按照自己的想法修改这个地方的内容）：
```
<nav id="navbar" class="navbar fixed-top  navbar-expand-lg navbar-dark scrolling-navbar">
  <div class="container">
    <a class="navbar-brand"
       href="<%- url_for() %>">&nbsp;<strong><%- theme.navbar.blog_title || config.title %></strong>&nbsp;</a>

    <button id="navbar-toggler-btn" class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <div class="animated-icon"><span></span><span></span><span></span></div>
    </button>

    <!-- Collapsible content -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto text-center">
        <% for(const each of theme.navbar.menu) { %>
          <% if (!each.link) continue %>
          <% var text = each.name || __(each.key + '.title') %>
          <% if (text.indexOf('.title') !== -1) {
            text = each.key
          } %>
          <li class="nav-item">
            <a class="nav-link" href="<%= url_for(each.link) %>">
              <%- each.icon ? '<i class="' + each.icon + '"></i>' : '' %>
              <%- text %></a>
<!--以上的部分是一级导航的部分-->
              <!--这里判断有没有二级菜单，有的话遍历出二级菜单（就是竖着的那部分）-->
              <% if (each.submenu) { %>
                <ul class="sub-menu">
                  <!--//遍历出二级菜单（就是竖着的那部分）-->
                  <% for (const submenu of each.submenu){ %>
                    <li>
                      <!--//a标签里当然是输出二级菜单的路径咯-->
                      <a href="<%- url_for(submenu.link) %>">
                        <!--//i标签里输出二级菜单的icon的class咯-->
                        <%- each.icon ? '<i class="' + submenu.icon + '"></i>' : '' %>
                        <!--//这里输出二级菜单名咯-->
                        <%= submenu.key %>
                      </a>
                    </li>
                  <% } %>
                </ul>
              <% } %>

          </li>
        <% } %>
        <% if(theme.search.enable) { %>
          <li class="nav-item" id="search-btn">
            <a class="nav-link" data-toggle="modal" data-target="#modalSearch">&nbsp;&nbsp;<i
                class="iconfont icon-search"></i>&nbsp;&nbsp;</a>
          </li>
        <% } %>
      </ul>
    </div>
  </div>
</nav>

```
# 修改css配置，让它好看点

如果不修改css配置其实也是可以的，只不过很丑就对了。

所以我们打开主题目录下`source/css/mian.styl`，本来应该在子项对应的部分添加，但是考虑到（~~好吧，╮(╯-╰)╭，其实是我懒~~）慢慢找实在是太麻烦了，所以我们直接在main文件里添加（这部分你可以先`hexo s`打开浏览器进行调试到你喜欢的样式，然后再复制相应的样式表到文件中）如下代码：
```
.sub-menu {
    display: none;
    position: relative;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: rgba(0,0,0,0.2);
    padding-left: 10px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: auto;
    height: auto;
    box-shadow: -6px 6px 8px black;
}
// 以上是控制二级菜单呼出的形式

.sub-menu .li {
    padding-top: 10px;
    padding-bottom: 10px;
}

.nav-item:hover .sub-menu {
    display: block;
}
// 控制鼠标停留在一级菜单上时呼出二级菜单

ul {
    list-style: none;
}

li.nav-item {
    padding: 0 15px;
}
```
这样我们的基本的配置就算是完成了，接下来就是二级菜单的写法！

# 配置文件中二级菜单的写法

打开主题配置文件`fluid_config.yml`，在菜单部分以“_分类_”菜单为例我们做如下的改动
submenu指定二级菜单，和一级菜单类似，**最后用[]括起来！！！**
```
navbar:
  blog_title:  # 导航栏左侧的标题，为空则按 hexo config.title 显示
  menu:  # 可自行增减，key 用来关联 languages/*.yml，如不存在关联则显示 key 本身的值；icon 是 css class，可以省略；增加 name 可以强制显示指定名称；submenu指定二级菜单，和一级菜单类似，最后用[]括起来！！！
    - { key: 'home', link: '/', icon: 'iconfont icon-home-fill' }
    - { key: 'archive', link: '/archives/', icon: 'iconfont icon-archive-fill' }
    - { key: 'category', link: '#', icon: 'iconfont icon-category-fill', submenu: [
      { key: '全部', link: '/categories/', icon: 'icofont-abc' },
      { key: '生活', link: '/categories/生活/', icon: 'icofont-love' },
      { key: '🖊笔记', link: '/categories/笔记/', icon: 'icofont-notebook' }
    ]}
    - { key: 'tag', link: '/tags/', icon: 'iconfont icon-tags-fill' }
    - { key: 'about', link: '/about/', icon: 'iconfont icon-user-fill' }
    #- { key: 'links', link: '/links/', icon: 'iconfont icon-link-fill' } # 友链页，把前面#去掉即可展示
```
这样我们就完成了一个主题的二级导航自定义，当然这样其实还是不太好看，可以自己用css进行调整。此外，针对不同的主题配置`config.yml`的不同写法情况，其实都是大同小异的，[可以点我去往某个大佬的空间看看，以作参考！！！<(￣︶￣)↗[GO!]](https://www.hojun.cn/2019/01/08/ck8irvkwx009qdwtu8ejla2mg/)。

以我的网站为例最终实现就是这样的效果：
![20200514170113](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200514170113.png)
![20200514170146](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200514170146.png)

哈哈哈哈，我觉得还是可以的！！！😁😁😁
{% note success %}
参考：

yaml基本语法及实现Hexo二级导航栏功能https://www.hojun.cn/2019/01/08/ck8irvkwx009qdwtu8ejla2mg/

为博客网站增加一个二级目录菜单https://sunhwee.com/posts/65d7181d.html

如何通过html和css完成下拉菜单的制作？https://www.zhihu.com/question/36356940

and so on ......
{% endnote %}
