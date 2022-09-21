---
title: Kappa 分布简单介绍
date: 2022-07-08 17:20:05
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/4.jpg
tags:
- 等离子体物理
- Kappa分布
- 非热平衡
- 随机数生成
categories: [笔记,等离子体物理]
description: Kappa速度分布函数解读，速成功法！！！（￣︶￣）↗　
---

# Kappa 分布简单介绍 🍓

非热平衡分布（Non-thermal distributions）被证明在太阳风和空间等离子体中是非常常见的，相对于 Maxwellian 分布这种分布具有一个超热部分（superthermal tails）。在宇宙中任何低密度（<span style='background: yellow'>意味着碰撞可以忽略不计</span>）等离子体中这种分布都是有可能存在的。前人建立了一个带参数 $\kappa$ 的分布函数族来描述所有的 <span style='background: pink'>Non-thermal distributions</span>：

$$
\begin{equation}
    \begin{aligned}
        f_{i}^{\kappa}(r, v)=\frac{n_{i}}{\left(\pi \kappa \theta_{\kappa i}^{2}\right)^{3 / 2}} \frac{\Gamma(\kappa+1)}{\Gamma(\kappa-1 / 2) \Gamma(3 / 2)}\left(1+\frac{v^{2}}{\kappa \theta_{\kappa i}^{2}}\right)^{-(\kappa+1)}
    \end{aligned}
\end{equation}
$$

其中，$\theta$ 是在该分布下的热速度，可以通过下式求得：

$$
\begin{equation}
    \begin{aligned}
        \theta_{\kappa i} = \sqrt{(2 \kappa-3) \frac{K_B T_i}{\kappa m_i} }
    \end{aligned}
\end{equation}
$$

要求 $\kappa > \frac{3}{2}$ ，当 $\kappa \to \infty$ 上面的式子就变成 Maxwellian 分布。

我们把这个分布称作 <span style='background: pink'>**Kappa 分布** 或者 **广义洛伦兹速度分布** </span> ，Kappa 分布相对 Maxwellian 分布来说在尾部的能量更高，并且粒子的速度呈幂方衰减。

![KappaDistribution-20220623170840](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/KappaDistribution-20220623170840.png)

<span style='font-weight:bold' id='t1'>Tab 1. </span> Comparison of different analytical expressions for a Maxwellian and a Kappa VDF

Parameter | Maxwellian | Kappa
----------|------------|------
Number density | $n(r) = n_0 \exp{-\frac{R(r)}{\theta^2}}$ | $ n(r)=n_{0}\left(1+\frac{R(r)}{\kappa \theta^{2}}\right)^{-\kappa+1 / 2} $
Temperature | $T(r) = T_0$ | $ T(r)=T_{0} \frac{\kappa}{K-3 / 2}\left(1+\frac{R(r)}{\kappa \theta^{2}}\right) $
Escaping flux | $ F(r)=\frac{n_{0} \theta\left(1+v_{\mathrm{e}}^{2} / \theta^{2}\right)}{2 \pi^{1 / 2}} \exp \left(-\frac{v_{\mathrm{e}}^{2}}{\theta^{2}}\right) $ | $ F(r)=\frac{n_{0} A_{\mathrm{k}} \theta\left(1+v_{\mathrm{e}}^{2} / \theta^{2}\right)}{4(\kappa-1) \kappa^{1 / 2}\left[1+v_{\mathrm{e}}^{2} /\left(\kappa \theta^{2}\right)\right]^{\kappa}} $

在了解这些之后实际上就可以开始关于Kappa分布的相关研究了，我们关注的是这样的速度分布函数的粒子和各种等离子体波相互作用的结果。但是，实际上这种速度分布的形成也与这个相互作用的过程有很大的关系。

# 空间等离子体 Kappa 分布的形成 🍌

很多的理论和猜想来说明 Kappa 分布到底是如何产生的，各种理论之间相差可能很远，大家各持自见，以下介绍一些本文主要参考的综述文章中提到的想法，也许能够激发出一些科学的思想。

Scudder 和 Olbert 首次提出了由于太阳风的扩张膨胀引起的不均匀性以及超热（ $E > 7k_B T$ ）电子的库伦碰撞减少，自然地产生了非热（ non-thermal ）分布。

Hasegawa 等人（ 1985 ）展示了等离子体在超热辐射带中会由于光子导致的库仑场涨落引起速度空间扩散的增强，这种增强会产生幂律（ power-law ）分布。

Collier 在速度空间用随机游走的方式产生 Kappa 样式的分布函数，并用 Kappa 分布函数来研究了超热分布的绝热输运。同时他也证明了空间等离子体是能量不固定的动力学系统，因此最大熵的理论不应该对空间等离子体适用。

从理论上来说，类 Kappa 分布可以作为非广延 Tsallis 统计理论的熵推广的结果，<span style='background: pink'>物理上和库伦势、湍流以及间歇现象的长程性质有关</span>（physically related to the long-range nature of the Coulomb potential, turbulence and intermittency）。Kappa 分布与通过最大化 Tsallis 熵得到的 q 分布是等价的，收到长程作用和相关性的影响，系统天然地和非麦克斯韦分布有关（Leubner，2002，2004，2008）。09年 Livadiotis 和 McComas 也同样验证了 Kappa 分布可以天然地从 Tsallis 统计中得到，从而为复杂系统的描述提供了坚实的基础 （<span class='mohu'> McComas 大佬在13年写了一篇名为 _Understanding Kappa Distributions: A Toolbox for Space Science and Astrophysics_ 的综述，也是从非广延统计力学出发的，同样值得一看</span>）。

Vocks 等人说高频哨声波与电子的共振相互作用可以明显地影响速度空间扩散，从而形成在高能量段呈现各向同性的分布，实际上就是电子在准静态背景磁场下可以通过与线性波进行回旋共振或者瞬时阻尼（朗道共振）获得能量，这也可以用来解释地球前激波以及太阳耀斑中的磁流体波加速粒子的情况。

同时有研究证明在低频（不满足回旋共振的条件）大幅（large amplitude）波动存在时，非线性朗道阻尼作用也可以能量化粒子（<span class='mohu'>好家伙，咱就是干这个的O(∩_∩)O哈哈~</span>）。Fisk 和 Gloeckler 发现压缩湍流中的等离子体的随机加热可以产生幂律分布的特征，类似的，碰撞阻尼加热，热流（heat flows）以及温度各向异性的存在都有可能产生超热尾端状（superthermal tails）的速度分布。

本着类似的原则，Summers（1999）以及 Shizgal（2007）等人通过研究准线性波粒相互作用或者库伦碰撞的速度空间扩散系数（与速度（velocitis）超过热速度的粒子速率（speed）成反比）时考虑 Fokker-Plank（FP）方程的稳定解得到了 Kappa 分布。

同样的，一维静电弗拉索夫（Vlasov）模型也被提出来用以产生 Kappa 分布，另外，低频波与双麦克斯韦分布的均匀磁化等离子体不稳定性的相关问题也被作为 Kappa 分布的可能产生机制研究过。

综上所述，产生 Kappa 分布—— <span style='background: yellow'>超热尾端分布特征</span> 的机制可能有很多（也许大家都是正确的），这些都与等离子体的加热、加速或者更加深刻的物理内涵有关系。**但不管怎么样，Kappa 分布都是一种生成我们在空间中所观测到的幂律分布等离子体的非常有用的数学工具，所以对于我们来说更重要的是如何用它来研究更多我们还没有弄清楚的物理过程。**

{% note success %}
以上这一部分的内容基本上只是将 Pierrard 等人的文章翻译了一遍，并未做太多的整理，原文将会在参考文献中提供。
{% endnote %}

# 在程序中生成服从 Kappa 分布的随机数 🍎

Kappa 分布的分布函数看起来是如此的复杂，它甚至在做三维的速度空间积分时没办法分解变量化成多个单变量积分的形式（<span class='mohu'>Maxwellian 分布就可以！</span>）。就算是简单的一维的分布，Maxwellian 分布可以直接调用各个语言函数库中的正态分布命令，比如 MATLAB 中的 `normrnd()` ，而 Kappa 分布却无从下手。不过好在人家本来这些语言中的随机数都是人为产生的，我们当然可以自己写一个生成 Kappa 分布的程序来实现我们的目的。

首先，生成一个任意分布的随机数主要有两种方法：

- 变换法
- 接受拒绝法

简单解释一下变换法就是通过分布函数单调递增的特性，先生成一堆均匀分布（0 ~ 1之间）的随机数（这个命令每个语言必定都有），再利用反函数讲这些随机数转换为按照我们所要求的分布的随机数（也就是反函数的反函数就是原函数的想法）；接受拒绝法要我们先生成一个可以直接生成的近似分布的随机数种群，要求这个近似的分布函数在每一点都要大于原分布函数的函数值，在生成一个0 ~ 1之间的均匀分布的随机数种群，如果均匀分布的随机数种群小于近似分布种群与要求分布之间的误差就接受近似分布种群，否则拒绝，重复多次即可。<span class='mohu'>（**大概就是这样，并不完全准确，具体的还是推荐Google一下**）</span>

一般来说，Kappa 分布这样的复杂分布只能是按照接受-拒绝法这种劳神费力的方式来生成，但是呢！有人（Abdul et al. 2014, 2015, 2021）发现 Kappa 分布和统计学中常用的 <span style='background: yellow'>Student t 分布</span> 在本质上是等价的（只需要做个小小的无伤大雅的变换）。

对于一维的 Kappa 分布（均值为0）：

$$
\begin{equation}
    \begin{aligned}
        f\left(v_{x}\right)=\left(\pi \kappa \theta^{2}\right)^{-1 / 2} \frac{\Gamma(\kappa)}{\Gamma(\kappa-1 / 2)}\left(1+\frac{v_{x}^{2}}{\kappa \theta^{2}}\right)^{-\kappa}
    \end{aligned}
\end{equation}
$$

和一维的 Student t 分布：

$$
\begin{equation}
    \begin{aligned}
        p(t)=\frac{1}{\sqrt{(v \pi)} \sigma} \frac{\Gamma\left(\frac{v+1}{2}\right)}{\Gamma\left(\frac{v}{2}\right)}\left[1+\frac{1}{v}\left(\frac{t-\mu}{\sigma}\right)^{2}\right]^{-\frac{1}{2}(v+1)}
    \end{aligned}
\end{equation}
$$

通过变换：$\nu  = 2 \kappa - 1$，可以证明两者其实是一致的。

进一步的，方差 $\sigma^2$ 对应的变换为：

$$
\begin{equation}
    \begin{aligned}
        \sigma^{2}=\frac{\kappa \theta^{2}}{2 \kappa-1}
    \end{aligned}
\end{equation}
$$

这样，我们就可以通过生成 Student t 分布来生成 Kappa 分布。非常幸运的是，Student t 分布在统计学中被研究得很深入，我们可以通过两个在 $\left[0,1\right]$ 内均匀分布的两个随机数种群 $a_1, a_2$ 就可以得到我们想要的分布：

$$
\begin{equation}
    \begin{aligned}
        b&=\sqrt{v\left(a_{1}^{-2 / v}-1\right) \cos \left(2 \pi a_{2}\right)} \\
        c_{t}&=\mu+\sigma b
    \end{aligned}
\end{equation}
$$

其中，均值通常取 0 ，表示整体的静止。

下面贴出根据上述理论写的 MATLAB 代码：

```MATLAB
function randnumber = rand_kappa(vth, kappa, n)
% Generate the random number which follow the Kappa distribution
% The kappa velocity loader
% inputs are the initial thermal velocity (vth) and the kappa indicie (kp) 
% and the dimension(n) of the velocity data.

mu = 0;
nu = (2*kappa) - 1;

a1 = rand(1,n);
a2 = rand(1,n);
% a1 = 1e-10;

% sigma = sqrt((kappa - 1.5)/(kappa - 0.5)) * vth;
sigma = sqrt((kappa)/(2*kappa - 1)) * vth;
y = sqrt(nu .* (a1.^(-2/nu)-1)).*cos(2*pi.*a2);
randnumber = mu + sigma.*y;
end
```

该程序生成的随机数统计结果和理论（Kappa 分布函数曲线）符合的很好，同时将其和 Maxwellian 分布作了个对比：

```MATLAB
n = 5000000;
count = 0;
x = zeros(1,n);
xsam = rand_kappa(5, 2, n);
mean_x = mean(xsam);
% x = rand_kappa(1,2,n);
for i = 1:length(xsam)
    if xsam(i) > -20 && xsam(i) < 20
        count = count+1;
        x(count) = xsam(i);
    end
end
x(x==0)=[];
figure(2);
clf;
histogram(x,40);
hold on;

v = linspace(-20,20,10000);
k = 2;
theta = 5;
f = (pi*k*theta^2)^(-1/2).*(gamma(k)/gamma(k-1/2)).*(1+v.^2./(k*theta^2)).^(-(k));
scale = n;
fp = scale*f;
plot(v,fp,'r','LineWidth',2);
title('Kappa distribution');
print(gcf,'4.jpg','-r600','-djpeg');
% figure(3);
% plot(v,f,'r','LineWidth',2);


%%
count2 = 0;
x2 = zeros(1,n);
xsam2 = normrnd(0,theta,1,n);
mean_x_2 = mean(xsam2);
for ii = 1:length(xsam2)
    if xsam2(ii) > -20 && xsam2(ii) < 20
        count2 = count2+1;
        x2(count2) = xsam2(ii);
    end
end
x2(x==0)=[];
figure(10);
clf;
histogram(x2,40);
hold on;

v2 = linspace(-20,20,10000);
f2 = (1/(2*pi*theta^2))^(1/2).*exp(-v2.^2./(2*theta^2));
scale = n;
fp2 = scale*f2;
plot(v2,fp2,'r','LineWidth',2);
title('Maxwellian distribution');
print(gcf,'3.jpg','-r600','-djpeg');

figure(11);
gcf;
plot(v2,fp2,v,fp);
legend('Maxwellian','Kappa');
```

![maxwellian](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/3.jpg)

![kappa](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/4.jpg)

三维形式和一维情况类似，这里直接贴出代码，具体的可以在参考文献中找到：

```MATLAB
function X = rand_kappa3(vth, kappa, n, dim, v0)
% Generate the random number which follow the 3-D Kappa distribution
% The kappa velocity loader
% inputs are the initial thermal velocity (vth), the kappa indicie (kp),
% the dimension(n) of the velocity data
% the dimension(dim) of your velocity space
% and the mean velocity(v0) vector

mu = v0;
nu = (2*kappa) - 1; % the freedom degree of student t distribution

sigma = sqrt(kappa/(2*kappa-1))*vth; % scaling parameter

Z = zeros(dim,n);
X = zeros(dim,n);
Chi_square = chi2rnd(nu,1,n); % generate the Chi-squared distribution random number

for i = 1:dim
    Z(i,:) = normrnd(mu(i),1,1,n); % three-dimensional standard normal distribution 
    % to be constructed, but the "vth" maybe some problem?
    X(i,:) = mu(i) + sigma*sqrt((nu./Chi_square)).*Z(i,:); % compute the 
    % student t distribution(Kappa distribution) with Chi-squared
    % distribution and standard normal distribution
end
end
```

# 参考文献 🍉

{% note default %}
[1]	L.-N. Hau, W.-Z. Fu. Mathematical and physical aspects of Kappa velocity distribution[J]. Physics of Plasmas, 2007, 14(11): 110702.
[2]	G. Livadiotis, D. J. McComas. Understanding Kappa Distributions: A Toolbox for Space Science and Astrophysics[J]. Space Science Reviews, 2013, 175(1): 183–214.
[3]	R. F. Abdul, R. L. Mace. One-dimensional particle-in-cell simulations of electrostatic Bernstein waves in plasmas with kappa velocity distributions[J]. Physics of Plasmas, American Institute of Physics, 2015, 22(10): 102107.
[4]	R. F. Abdul, R. L. Mace. A method to generate kappa distributed random deviates for particle-in-cell simulations[J]. Computer Physics Communications, 2014, 185(10): 2383–2386.
[5]	George Livadiotis. Kappa Distributions: Statistical Physics and Thermodynamics of Space and Astrophysical Plasmas[J]. Universe, 2018, 4(12): 144.
[6]	Kappa distributions: theory and applications in plasmas[M]. George Livadiotis. Amsterdam, Netherlands: Elsevier, 2017.
[7]	George Livadiotis. Kappa distribution in the presence of a potential energy[J]. Journal of Geophysical Research: Space Physics, 2015, 120(2): 880–903.
[8]	F. Nsengiyumva, R. L. Mace, M. A. Hellberg. Ion Bernstein waves in a plasma with a kappa velocity distribution[J]. Physics of Plasmas, American Institute of Physics, 2013, 20(10): 102107.
[9]	R. F. Abdul, A. P. Matthews, R. L. Mace. 2D particle-in-cell simulations of the electron temperature anisotropy driven whistler instability in plasmas having kappa velocity distributions[J]. Physics of Plasmas, 2021, 28(6): 062104.
[10]	G. Nicolaou, G. Livadiotis, C. J. Owen, 等. Determining the Kappa Distributions of Space Plasmas from Observations in a Limited Energy Range[J]. The Astrophysical Journal, 2018, 864(1): 3.
[11]	V. Pierrard, M. Lazar. Kappa Distributions: Theory and Applications in Space Plasmas[J]. Solar Physics, 2010, 267(1): 153–174.
[12]	J J Podesta. Plasma Dispersion Function for the Kappa Distribution[J]. 2004: 31.
[13]	Reginald Francis Abdul. 1-D Particle-in-cell simulations of plasmas with kappa velocity distributions[D]. University of KwaZulu-Natal, 2013.
{% endnote %}