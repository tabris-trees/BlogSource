---
title: 非线性动力学-概论
date: 2022-04-30 17:20:05
index_img: https://th.bing.com/th/id/R.02693e210dd0d676caabdf8b4be096ef?rik=kqdSE%2bLFfxDrgw&riu=http%3a%2f%2fs.cmpedu.com%2fimages%2fupload%2f2019%2f4%2f8%2f1558375971928(LT800).jpg&ehk=6nE8WBye5MTQblvmJTE3%2faR6fSghNCFyZ38y26H72ME%3d&risl=&pid=ImgRaw&r=0
cover: https://th.bing.com/th/id/R.02693e210dd0d676caabdf8b4be096ef?rik=kqdSE%2bLFfxDrgw&riu=http%3a%2f%2fs.cmpedu.com%2fimages%2fupload%2f2019%2f4%2f8%2f1558375971928(LT800).jpg&ehk=6nE8WBye5MTQblvmJTE3%2faR6fSghNCFyZ38y26H72ME%3d&risl=&pid=ImgRaw&r=0
tags:
- 非线性动力学
- Nonlinear
- 混沌
- 复杂性
categories: [笔记,非线性物理学]
description: 非线性物理学导读篇章❥(ゝω・✿ฺ)
---

{% note primary %}
**动力学**——一门研究系统随时间演化的学科，它告诉我们所考虑的系统是稳定到平衡点，做重复的周期运动还是做更复杂的随机运动。<span class='heimu'>世界的规律是简单的，但世界却是复杂的。越是深入的了解我们身处的这个世界，我们就越深刻的认识到世界的复杂性，并且这些出乎意料的复杂性往往来源于我们所熟知的某些简单的规律。也许，有时候从简单到复杂之间的规律才是对我们来说至关重要的东西。</span>
{% endnote %}

# 动力学简史

时间 | 科学家 | 贡献
---|-----|---
1666年 | 牛顿 | 发明微积分, 解释行星运动(微分方程的起源)
18世纪初 | | 微积分与经典力学的繁荣
19世纪初 | | 行星运动的分析研究(三体问题)
19世纪90年代 | 庞加莱 | 几何方法, 混沌存在的可能
1920-1960年 | Birkhoff | Hamiltonian 力学复杂行为
| Kolmogorov | 
| Arnol'd |
| Moser |
1963年 | 洛伦兹 | 简单对流模型的奇怪吸引子
20世纪70年代 | Ruelle、Takens | 湍流与混沌
| May | Logistic 映射中的混沌
| Feigenbaum | 一般性与重整化、混沌与相变的联系，混沌的实验研究
| Winfree | 生物学中的非线性振子
| Mandelbrot | 分形
20世纪80年代 | | 混沌、分形、振子及其应用的广泛研究

# 非线性的重要性

我们将动力学系统分为主要的两类：

- 微分方程
- 迭代映射(差分方程)

微分方程描述了系统在连续时间中的演化，而迭代映射则是离散时间的过程，两者在本质上都是描述系统如何随着时间变化。无论如何，现在我们将视角放到微分方程之上，<span class='heimu'>毕竟我们的世界本身还是一个连续的世界</span>。

现在考虑受迫简谐振子的方程：

$$
\begin{equation}
    \begin{aligned}
        m \frac{\mathrm{d}^2 x}{\mathrm{d} t^2}+b \frac{\mathrm{d} x}{\mathrm{d} t}+kx=0
    \end{aligned}
\end{equation}
$$

很明显，这是一个常微分方程，它只有一个自变量——时间 $t$。对于这样一个系统，我们有更一般的形式：

$$
\begin{equation}
    \begin{aligned}\begin{array}{c}
        \dot{x_1} = f_1(x_1,x_2,\cdots,x_n) \\
        \vdots \\
        \dot{x_n} = f_n(x_1,x_2,\cdots,x_n)
    \end{array}
    \end{aligned}
\end{equation}
$$

即将 $x_1$ 取为 $x$，$x_2$ 取为 $\mathrm{d} x/\mathrm{d} t$:

$$
\begin{equation}
    \begin{aligned}
        &\dot{x_1} = x_2 \\
        &\dot{x_2} = -\frac{b}{m} x_2-\frac{k}{m} x_1
    \end{aligned}
\end{equation}
$$

由于右端所有的 $x_i$ 都是一次项，我们称这个系统是线性的。与线性系统对立的是非线性系统，它表示那些右边的 $x_i$ 存在非一次项的情况，例如 $x_1 x_2,\ x_1^3,\ \cos{x_2} $ 之类的。对于钟摆运动的方程：

$$
\begin{equation}
    \begin{aligned}
        \ddot{x}+\frac{g}{L} \sin x=0
    \end{aligned}
\end{equation}
$$

我们可以将其改写成：

$$
\begin{equation}
    \begin{aligned}
        &\dot{x}_{1}=x_{2} \\
        &\dot{x}_{2}=-\frac{g}{L} \sin x_{1}
    \end{aligned}
\end{equation}
$$

右边出现了 $\sin x_1$ 项，所以这是一个非线性系统。对于这样的方程我们很难利用解析解求解，通常采用小角度逼近的做法近似求解，对于 $x \ll 1$，有 $\sin x \approx x$。如此一来问题就简化成了容易求解的线性问题。但是这种情况我们的物理被舍弃太多，对于大的 $x$（钟摆转到顶端的情况）我们就没办法这么去研究。

但实际上，钟摆的运动在我们看来是如此的简单，应该会有更简单的方法来解析求解这个问题。因此我们引入一种几何方法来解决这个问题，大概的意思就是：以方程一般形式中的两个自变量 $x_1$ 和 $x_2$ 为坐标轴构建出抽象空间，当确定一个初始位置（初始解）之后，我们所寻求的方程的解应该是在这个空间中沿曲线移动的点。

![nonlineardynamics1-1.2.1](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/nonlineardynamics1-20220429194507.png)

如同图1.2.1所示，我们将曲线称为<span style='background: yellow'>**轨迹**</span>，空间称为<span style='background: yellow'>**相空间**</span>，由于每一个点都有可能是初始条件，因此系统的轨迹应该是完全填满相空间的。

我们要做的事情是将上述过程反过来考虑，给定一个系统，我们画出轨迹，并从中提取出关于解的信息。很多情况下，几何推理有助于我们画出轨迹而无须对系统求解。

另外，我们把写成一般形式之后具有n个自变量的系统称为**n-维系统**或者**n-阶系统**，n代表了相空间的维数。

## 非自洽系统

所谓非自洽系统指的是在描述系统的方程中出现了对时间的依赖（函数中显含时间），例如受迫简谐振子方程 $m \ddot{x}+b\dot{x}+kx = F\cos{t}$ 如同之前一样，令 $x_1 = x$ 与 $x_2 = \dot{x}$ 以及 $x_3 = t$。那么原来的方程可以写成是：

$$
\begin{equation}
    \begin{aligned}
        &\dot{x}_{1}=x_{2} \\
        &\dot{x}_{2}=\frac{1}{m}\left(-k x_{1}-b x_{2}+F \cos x_{3}\right) \\
        &\dot{x}_{3}=1
    \end{aligned}
\end{equation}
$$

这样做相当于是将原本在二维相空间中运动的简谐振子转换到三维相空间中，如果不考虑时间的维度，我们画出来的相空间轨迹将会呈现出一直晃动的特征，不利于我们从中提取信息，所以我们通过对系统增加额外的维数来消除了其对时间的依赖性。在物理上，受迫简谐振子运动的**状态**实际上也是三维的，给定当前的状态，我们只需要知道三个量，$x$、$\dot{x}$ 以及 $t$ 就可以预测中未来时刻的状态，因此以上的做法对于我们利用几何方法研究系统是很自然的。

## 为什么非线性系统这么困难

在数学上，我们研究复杂问题（函数）时通常采用将其分解成一系列线性问题（函数）的叠加去近似原问题的方法，诸如我们所熟知的泰勒展开、傅里叶变换等都是这种思想的体现。各部分线性问题的求解通常是简单的，再将这些解重新整合成复杂问题的解，这样操作后，线性系统等于其各部分的精确和。

但在自然界中的事物存在各部分之间的相互影响、合作或者竞争，出现很多非线性作用。<span class='heimu'>在数学上，我们通常会要求展开的基函数是正交的，这样保证了展开后的各部分相互之间不存在影响，但自然界中的事物并不都是数学的理想造物，日常生活中的全部几乎都是非线性的，于是叠加原理出人意料的失效了。</span>想象你同时听到两首非常喜欢的歌，但是你的快乐却不会因此翻倍。我们可以放心大胆地说：“我们的世界是非线性的！”，也许这正是人类无法完全掌握我们所身处世界的原因所在。

# 世界的动力学视角

在旧世界的地图上，某些区域被标识着“此处有龙”以表示这些区域在地球上还尚未被探索。在现代科学中，非线性科学就是这样的一块区域，这些主题还有很多区域未被涉足，他们处于研究的极限地带，通常是那些我们现实生活中所需要面对的各种复杂现象，它将成为我们未来很重要的一个挑战。

![nonlineardynamics1-1.3.1](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/nonlineardynamics1-1.3.1.png)

我们可以所在的这个世界上的现象按照系统的维度和线性与否作如上图所示的划分，如同旧时代的新大陆探索者，我们要做的事情就是去那些还未被开垦过的土地深耕，寻找那些可能存在的规律，解开世界最深的谜底……