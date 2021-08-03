---
title: Latex 论文排版相关学习
date: 2020-08-28 10:20:48
index_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200828160435.png
banner_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20161123111920_M2RkP.thumb.700_0.jpeg
math: ture
tags:
- Latex
- 论文排版
categories:
- [学习,笔记,编程,LaTex]
descripte: LaTex简介
---

# 1. 一点点关于Latex的介绍

![20200828160435](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200828160435.png)

Latex是一款排版软件，诸如教材、报纸、书信等纸质印刷相关的排版都是可以做的。一般人使用Latex最多的地方是论文的写作，特别是涉及到大量公式的数学物理方面的科技论文，这方面目前有很多网上流行的模板，我们只需要在了解简单的Latex基础操作的基础上带入模板就好，所以还是非常方便的。
> 有很多 Geeks 或者 LaTeX's Fanatical Fans 过分地强调了 LaTeX 的一些并非重点的特性，以至于很多初学者会觉得 LaTeX 很神秘很复杂，从而引发了初学者的畏难情绪甚至是负面情绪。尽管这些 Fans 说得并没有错，我是说在事实上，但是他们的表达方式和内心态度却间接阻碍了 LaTeX 的发展，我想这也是和他们的初衷相悖的。————Liam Huang[^1]

# 2. Latex写作的进行

## 2.1 准备知识

Latex中以`%`作为注释开头，也就是不会输出`%`后直到行末的所有内容，同时不会影响最终的排版效果，仅供人们在阅读源代码是的注释。至于数学意义上的“%”字符，需要在`%`之前加上`\`进行转义（escape）。即：`\%`。除此之外还有很多特殊字符的使用需要各位注意:
>![20200828115548](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200828115548.png)

当我们需要对我们的内容做出明确控制时，我们需要调用控制序列来解决问题，类似于其他编程语言中的函数。比如我们需要在第一行指明文档类型，需要使用:`\documentclass[]{article}`，这就是一个控制序列（命令、标记），以`\`开头，以第一个**空格或者非字母的字符**结束的一串文字。`{}`中是这个控制序列的必要参数(此处为‘article’，其作用是调用名为“article”的文档类），部分控制序列还会有方括号`[]`，表示可选参数。
>所谓的文档类，是TeX系统预设或者用户自己给定的一些格式的集合，不同的文档类对应了不同的输出效果。

TeX中的控制序列包括了两种，一种是一个控制序列单独使用，例如`\documentclass[]{}`等；另一种是需要两个配套的控制序列成对出现，通常是`\begin`和`\end`，这两个控制序列以及其中间的内容被称为_环境_。他们之后的第一个必要参数总是一致的，被称为环境名。
只有在`document`**环境**中的内容才能够被输出到文档中去或是作为控制序列对文档产生影响。也就是说，在`\end{document}`之后插入的内容都是无效的。

在从`\documentclass{article}`到`\begin{document}`之间的部分被称为“导言区(preamble)”，你可以将导言区理解为使用某些特殊的控制序列对整篇文章的格式进行设置的区域，比如我们可以在导言区引用一些额外的宏包以及设置页面大小、页眉页脚、章节标题样式等等[^2]。

另外，类似于markdown文件，TeX中换行是需要两次换行才能起效（需要一个空行），否则会被处理成一个简单的空格，且命令后面的空格会被忽略，需要使用`\`进行转义。为了将命令（控制序列）的范围进行限制，需要使用`{}`将命令内容包括起来[^3]，如：`\frac{a}{b}`表示：
$$\frac{a}{b}$$

## 2.2 导言区控制序列

* `\documentclass[]{}`规定了使用的文档模板，是文件必须的命令，可供选择的必要参数有：article、book、report、beamer等TeX自带模板或使用者自己准备的一系列模板；可选参数主要定义打印输出时的编码、纸张等条件。如：`\documentclass[UTF8,a4paper]{article}`
* `\usepackage{}`可以用来引用宏包，常用的有：`graphicx`——插图；`amsmath`——一些方便的公式、符号命令等"
* 除此之外还涉及到标题、作者以及日期等等分别用以下的控制序列进行控制：`\title{}`、`\author{}`、`\date{}`，这些内容在导言区设置好后可以利用`\maketitle`控制序列在环境区域内按照特定格式输出

以下是演示：
```
\documentclass[UTF8]{ctexart}
\title{你好，world!}
\author{Liam}
\date{\today}
\begin{document}
\maketitle
你好，world!
\end{document}
```
![20200828144122](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200828144122.png)

## 2.3 章节和段落

在文档类 "article/ctexart" 中，定义了五个控制序列来调整行文组织结构。他们分别是

* `section{}`
* `subsection{}`
* `subsubsection{}`
* `paragraph{}`
* `subparagraph{}`
  
在"report/ctexrep"文档类中，还有`\chapter{·}`；"book/ctexbook"文档类中，还定义了`\part{·}`。取决于各种文档类（模板）中所定义的章节控制序列。

以下是演示：
```
\documentclass[UTF8]{ctexart}
\title{你好，world!}
\author{Liam}
\date{\today}
\begin{document}
\maketitle
\section{你好中国}
中国在East Asia.
\subsection{Hello Beijing}
北京是capital of China.
\subsubsection{Hello Dongcheng District}
\paragraph{Tian'anmen Square}
is in the center of Beijing
\subparagraph{Chairman Mao}
is in the center of 天安门广场。
\subsection{Hello 山东}
\paragraph{山东大学} is one of the best university in 山东。
\end{document}
```
![20200828145319](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200828145319.png)

## 2.4 插入数学公式、图片或表格

### 2.4.1 数学公式插入

LaTex相对于Word最优秀的地方莫过于他对于数学公式的渲染非常出色，不用我们刻意去调整数学公式的排版，只需要我们输入类似于编程语言的伪代码，系统便可以自己将伪代码转化为我们需要的数学表达。同时大部分的数值计算软件或者编程软件都自带了可以将计算结果转化为TeX语言的函数，甚至可以在Latex系统中嵌入Mathematica进行科学计算，不过这都是进阶内容了。目前姑且还用不到。以上这些足以说明Tex在论文排版中的优越地位！

数学公式或者图片的插入需要在导言区引用之前提到过的宏包，即：
```
\uespackage{amsmath}
```

文本中数学公式的引用主要有两种方式：行内模式 (inline) 和行间模式 (display)。前者在正文的行文中，插入数学公式；后者独立排列单独成行，并自动居中。

* 行内公式：
  * `$...$`
  * `\(...\)`
  * `\begin{math} ... \end{math}`
* 行间公式：
  * `\[ ... \]`     （无编号）
  * `$$ ... $$`     （无编号，会改变行文的默认行间距，不推荐）
  * `\begin{displaymath} ... \end{displaymath}`     （无编号）
  * `\begin{equation*} ... \end{equation*}`     （无编号）
  * `\begin{equation}...\end{equation}`     （有编号）

至于各种数学符号的表达以及特殊字符的控制序列由于太多，不好整理，可以参看[此处](https://blog.csdn.net/GarfieldEr007/article/details/51646604)或者[这里](https://blog.csdn.net/lanxuezaipiao/article/details/44341645)。

### 2.4.2 图片插入

插入图片的方式比较多，这里推荐上述graphicx宏包中的`\includegraphics`命令进行操作：

```
\documentclass{article}
\usepackage{graphicx}
\begin{document}
\includegraphics{a.jpg} % 名为“a.jpg”的文件与TeX源文件同目录
\end{document}
```

如果图片超过了输出文件的纸张大小，或者效果不太好的时候可以用 `\includegraphics` 控制序列的可选参数来控制。比如：

```
\includegraphics[width = .8\textwidth]{a.jpg}
```

在[此处](http://texdoc.net/texmf-dist/doc/latex/graphics/graphicx.pdf)可以获取到关于上述宏包的文档。

### 2.4.3 表格插入

tabular 环境提供了最简单的表格功能。它用 \hline 命令表示横线，在列格式中用 | 表示竖线；用 & 来分列，用 \\ 来换行；每列可以采用居左、居中、居右等横向对齐方式，分别用 l、c、r 来表示[^1]。

以下是演示：
```
\begin{tabular}{|l|c|r|}
 \hline
操作系统& 发行版& 编辑器\\
 \hline
Windows & MikTeX & TexMakerX \\
 \hline
Unix/Linux & teTeX & Kile \\
 \hline
Mac OS & MacTeX & TeXShop \\
 \hline
通用& TeX Live & TeXworks \\
 \hline
\end{tabular}
```
![20200828153609](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20200828153609.png)

有时候我们会遇到表格或者图片的位置不好确定，这个时候我们可以把它们设置为“浮动体”，具体可以参见[此处](https://liam.page/2014/09/08/latex-introduction/#%E6%B5%AE%E5%8A%A8%E4%BD%93)

# 3. 版面调整

版面设置一般采用各种宏包进行设置，使用较多的包有：`geometry`（页边距）、`fancyhdr`（页眉页脚）、`indentfirst`（首行缩进）以及`setspace`（行间距）。一些自带的控制序列也可以用来进行版面设置，比如段间距的设置可以用`\parskip`调整。

诸如此类的版面调整的命令由于各位大佬做的宏包太多，加上每个人使用系统或者习惯上的区别，整理起来有很大的困难，最好的办法是边用边学，并且逐渐形成自己的习惯。正所谓熟能生巧，在不断运用的过程中就能够找到最适合自己的哪一种办法，这里提供一些可以达到目的的简单方法。另外提供一下相关方面的博客以供参考。

* [一份其实很短的Latex文档——Liam Huang ](https://liam.page/2014/09/08/latex-introduction/#%E7%89%88%E9%9D%A2%E8%AE%BE%E7%BD%AE)
* [LaTeX入门(七)——页面设置——勥巭炛](https://zhuanlan.zhihu.com/p/56405574)
* [17LaTeX学习系列之---LaTeX的版面设计——张一根](https://www.jianshu.com/p/da10bc1c497a)

# 4. 参考文献（文档）

[^1]: https://liam.page/2014/09/08/latex-introduction/
[^2]: http://liuchengxu.org/blog-cn/posts/quick-latex/
[^3]: http://www.math.pku.edu.cn/teachers/lidf/docs/textrick/tricks.pdf
[^4]: https://www.jianshu.com/p/da10bc1c497a
[^5]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjQueDxs73rAhVOqZ4KHSD_BMgQFjACegQIBRAB&url=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F56405574&usg=AOvVaw1j3bECgHAB5XTcdABhOEDL

{% note success %}
1. https://liam.page/2014/09/08/latex-introduction/
2. http://liuchengxu.org/blog-cn/posts/quick-latex/
3. http://www.math.pku.edu.cn/teachers/lidf/docs/textrick/tricks.pdf
4. https://www.jianshu.com/p/da10bc1c497a
5. https://zhuanlan.zhihu.com/p/56405574
{% endnote %}

# 5. 补张图

哈哈哈哈哈O(∩_∩)O😎😎😎

![1598496066545](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/1598496066545.jpeg)