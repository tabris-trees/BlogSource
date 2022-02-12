---
title: 木卫二内部结构研究与建模——课程作业报告
tags:
  - 木卫二
  - 行星内部结构
  - 行星科学
date: 2021-10-26 18:18:37
index_img: https://pic4.zhimg.com/v2-e3b6288242b3a98ac70516a38d00fb57_r.jpg
cover: https://pic4.zhimg.com/v2-e3b6288242b3a98ac70516a38d00fb57_r.jpg
categories: [科研,行星内部结构]
description: 利用Python程序研究木卫二可能的内部结构(*^_^*)
---

<center><font size = '6'>木卫二内部结构研究与建模</font></center>



​		<font size="3">**摘要**</font>	木卫二（Europa），木星的天然卫星之一，是四颗伽利略卫星中最小的一颗。目前的观测推测其主要由硅酸盐岩石构成，并具有水-冰地壳，和一个可能是铁-镍组成的核心。为了更进一步的研究木卫二的内部结构，我们根据行星内部物理参数的控制微分方程以及物质的状态方程建立了可靠的模型求解系统，采用数值方法对整个系统进行了由外向内求解，要求输入各层的质量分数得到每一层的厚度、质量压力以及密度随半径的变化情况。将该模型应用到地球的双层模型以及木卫二的三层模型中，与现有的观测资料以及前人的研究工作对了比较，均得到了比较好的吻合。最后根据最新的研究资料确定了水冰层的质量分数为 7.5% ，由此代入模型推断出核和幔的质量分数分别为 3.6%、88.9%，中心压力为 49 $\rm{kbar}$（4.9 $\rm{GPa}$）。

​		<font size="3">**关键词**</font>	木卫二， 内部模型， 核幔边界

#     

## 0 引言

​		木卫二，木星的四颗伽利略卫星中最小的一颗，一直以来，木卫二因其具有的液态海洋为地外生命的探索提供了新的素材而备受关注。其平均半径为1565.0±8.0 km，质量4.80 $\times$ 1022(~ 0.245 $M_⊕$)，平均密度(2989±46) $\rm{kg/m^3}$。归一化到$MR^2$的木卫二的主轴转动惯量为: $C/MR^2 = 0.347 \pm 0.014$. 伽利略卫星发现木卫二有一个很弱的由木星磁场变化引起的磁场.

​		基于多普勒探测器的观测资料,  Anderson 等人在1998年研究了木卫二的内部结构,  他们假设是一个具有金属内核、岩石地幔以及水冰混合外壳的三层圈层结构。在三层结构中，内核由$\rm{Fe}$或者$\rm{Fe-FeS}$组成，大约占到木卫二半径的$0\%$到$50\%$; 外部的水冰层大约有80到170 $\rm{km}$厚；中部的岩石层则由硅酸盐或者硅酸盐与金属的混合物组成。Anderson 等人的研究中同样给出了三个圈层大致的密度：金属核的密度超过4000$\rm{kg/m^3}$，地幔密度约为3000 ~ 3500$\rm{kg /m^3}$，水冰壳约900 - 1300$\rm{kg /m^3}$。

​		2011年时，中国科学院紫金山天文台的 Sheng JIN 等人按照研究系外行星的方法，先假定每个圈层可能的物质组成模型，通过一系列的自洽方程由内向外积分计算出模型对应的星球质量和半径，与实测数据进行进行对比，以此判断模型的准确度，其模型结果见表一所示：

<center><font size="2">表一 Sheng Jin 等人的研究模型及其结果</font></center>

![image-20220113161028705](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/image-20220113161028705.png)

​		近年来，伴随着朱诺探测器对木星的深入研究，Luis等人对伽利略探测器的射电跟踪数据进行了再分析，重新探讨了木卫二的引力场数据和内部结构，结果如表二所示：

<center><font size="2">表二 Luis 等人的研究与前人研究的对比</font></center>

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/image-20211229224059297.png" alt="image-20211229224059297" style="zoom: 100%;" />

​		本文将按照 JIN 等人使用的方法对木卫二的内部结构进行进一步的探讨，根据已有的研究以及观测数据对木卫二的内部结构给出更为合理的假设，并对该假设进行建模，将模型得到的结果与 Luis 等人对射电数据再分析的结果进行比对，判断假设的适用性。

## 1 模型

​		行星内部的物理参数可以被如下的方程表示：
球壳质量方程：
$$
\frac{\mathrm{d} m(r)}{\mathrm{d} r}=4 \pi r^{2} \rho(r) \tag{1}
$$
静水压力平衡方程：
$$
\frac{\mathrm{d} P(r)}{\mathrm{d} r}=\frac{-G m(r) \rho(r)}{r^{2}} \tag{2}
$$
以及状态方程：
$$
\rho(r0) = \rho_0 (1+\frac{K^\prime P(r0)}{K_0})^{\frac{1}{K^\prime}} \tag{3}
$$
或：
$$
P=\frac{3}{2} K_{0}\left[\eta^{\frac{7}{3}}-\eta^{\frac{5}{3}}\right]\left\{1+\frac{3}{4}\left(K_{0}^{\prime}-4\right)\left[\eta^{\frac{2}{3}}-1\right]\right\} \tag{4}
$$
其中，$\eta = \frac{\rho(r)}{\rho_0}$, $K_0$和$K^\prime_0$是等温体积模量以及其在标准状态下的一阶微分。

​		首先，对于三层模型，我们指定最外层的质量分数、核的初始质量分数以及其误差范围，系统的迭代从木卫二表面$(r = R_{\rm{planet}})$开始，当质量达到期望的质量分数时，自动从一层切换到下一层。当质量$M(r)$达到欧罗巴实际质量时或者半径迭代到零时，程序停止计算，判断质量或者半径的剩余是否满足计算精度要求，利用二分法自动调整自动调整核的质量分数，重新代入迭代方案进行求解，直到剩余满足模型的自洽条件（要求半径和质量同时迭代到零）。因此，我们可以通过确定壳层的质量分数得到一个合理的三层模型和相应的半径$R_P$，以及核、幔的特定质量比。模型考虑将星球内部结构分割成微分球壳，采用步长为500米的4阶 Runge-Kutta 算法进行计算。 

​		模型迭代方式所式（5）所示，在计算压力时将壳、幔和核分开，避免半径过小时质量的剩余引起压力、密度的异常增长：

$$
m_{i+1}=m_i−4\pi 𝑅_{i}^2 \rho_i \\
\\
𝑃_{i+1}^{壳、幔}=𝑃_i+\frac{𝐺 m_i \rho_i}{𝑅_i^2} \tag{5} \\
\\
𝑃_{i+1}^{核}=𝑃_i+4\pi𝐺𝑅_i \rho_i^2
$$

![迭代模式](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/迭代模式.png)

<center><font size="2">图一 模型迭代过程示意图</font></center>

## 2 结果

### 2.1 模型验证

​		在开始将我们的模型应用到木卫二之前，我们先利用已知信息较多的地球来简单检验一下模型的正确性。我们首先将地球简化成由橄榄石（$\rm{(Mg,Fe)_2SiO_4}$）地幔和铁核（$\rm{Fe}$）组成的两层模型，讨论两层模型时不需要指定壳层的质量分数，二分法可以直接找到满足约束条件的合适的质量分数，模型中给定的各种物质组成的热力学参数见下表：

<center><font size="2">表三 行星内部物质的热力学参数</font></center>

![](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/image-20220113152046921.png)

​		图二给出了模型计算的地球双层模型质量、压力以及密度随半径的变化。从图中可以看到模型计算出来的核幔边界在 3555 $\rm{km}$ 处，中心压力大致为370 $\rm{GPa}$，这两个结果与地球的实际情况（核幔边界 3470 $\rm{km}$，中心压力 379 $\rm{GPa}$）都可以较好地吻合。由此判断该模型结果比较可靠，可以用来对木卫二进行内部结构建模。

![地球质量压力](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/%E5%9C%B0%E7%90%83%E8%B4%A8%E9%87%8F%E5%8E%8B%E5%8A%9B.png)

![地球密度](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/地球密度.png)

<center><font size="2">图二 地球双层模型的计算结果</font></center>

### 2.2 木卫二模型计算结果

​		在验证模型的准确性之后，开始对木卫二内部结构的建模，假设木卫二深部具有与地球类似的物质组成：即整体由水冰壳（$\rm{H_2O}$）、硅酸盐地幔( $\rm{(Mg,Fe)_2SiO_4}$)以及铁核（$\rm{Fe}$）组成，其各自的热力学参数在地球双层模型中已经给出；同时为了准确的研究木卫二的内部结构，假设表面的水冰层的质量分数是固定的（表面比较容易测量，本文中确定为 10% ），用二分法求解内部的核、幔厚度以及其各自的质量分数。模型结果见图三：

![木卫二质量压力](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/木卫二质量压力.png)

![木卫二密度](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/木卫二密度.png)

<center><font size="2">图三 木卫二三层模型在水冰层质量分数为 10% 时的计算结果</font></center>

​		模型计算出来木卫二的壳幔边界在1398.5 $\rm{km}$处，幔占总质量的 76% ；核幔边界在597 $\rm{km}$处，核占总质量的 14%；木卫二中心压力大致为6.6 $\rm{GPa}$，与Sheng Jin等人在2012年用从内向外积分的模型结果非常接近。另外 luis 等人在 2021 年对木卫二表面的射电数据进行了贝叶斯反演，得到木卫二的水冰层占木卫二质量的 7.5% 左右，我们将该质量分数代入到模型中计算出其内部结构为 380 $\rm{km}$处为核幔边界，1442 $\rm{km}$处为壳幔边界，其中核占总质量的 3.6% ，幔占质量的 88.9% 左右，中心压力 4.9 $\rm{GPa}$，与张鸿等在2002年采用的双层模型的结果基本一致。

![木卫二质量压力2](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/木卫二质量压力2.png)

![木卫二密度2](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/木卫二密度2.png)

<center><font size="2">图四 木卫二三层模型在水冰层质量分数为 7.5% 时的计算结果</font></center>

## 3 总结与讨论

​		本文根据行星内部结构的控制微分方程以及物质的状态方程建立了求解行星内部结构的迭代方法，利用该方法建立了双层地球模型以及多层木卫二内部模型，结果与目前已有的观测以及前人的研究结果可以很好的吻合。

​		该方法由外向内迭代，由于行星表面的参数获取相对内部容易，模型初始条件可以比较容易获得，相比由内向外迭代的方法少了行星中心压力的假设以及模型的自洽耦合过程（该方法对内部模型求解和使内部模型自洽是同一过程），更简单，易理解；但该方法没有考虑温度以及压力本身对状态方程的影响，计算精度较低，近似假设较多，同时由外向内迭代会出现前述密度、压力突然增加（该方法中已经采用近似方法解决，但有待改进）的情况，另外采用二分法固定冰层的质量分数来求解剩余的质量分数效率低下，作用有限。

​		在此基础上，可以增加温度和压力对状态方程的影响，并且采用蒙特卡洛方法同时求解所有层的质量分数（需要增加新的约束）。

​		总的来说，经过不断的失败，最终还算是得到了较为可靠的模型（方法），但确实改进空间还非常大！

{% note primary %}
研究所使用到的代码全部放在Github上供大家参考，地址为：
https://github.com/tabris-trees/IMPC

另外提供最终汇报时所用到的PPT下载链接：https://njtecheducn-my.sharepoint.com/:p:/g/personal/2858795004_njtech_edu_cn/EeuJt5jPjv5NiwH6xCmPNnwBfaY5PdcNytpELsw_vgWF6A?e=AGdEDe

{% endnote %}

## 4 参考文献

1.	龚盛夏 & 黄乘利. 太阳系内类地行星内部结构模型研究进展. 天文学进展 31, 391–410 (2013).
2.	张鸿 & 张承志. 木卫二的内部结构模型和海洋层——伽利略探测的最新研究进展. 天文学进展 223–233 (2002).
3.	Zeng, L. & Seager, S. A Computational Tool to Interpret the Bulk Composition of Solid Exoplanets based on Mass and Radius Measurements. Publ. Astron. Soc. Pac. 120, 983–991 (2008).
4.	Nicole A. Spaun & James W. Head. A model of Europa’s crustal structure: Recent Galileo results and implications for an ocean. J. Geophys. Res. Planets 106, 7567–7576 (2001).
5.	Brugger, B., Mousis, O., Deleuil, M. & Deschamps, F. Constraints on Super-Earths Interiors from Stellar Abundances. Astrophys. J. 850, 93 (2017).
6.	Pappalardo, R. T., McKinnon, W. B. & Khurana, K. Europa. (University of Arizona Press, 2009).
7.	Anderson, J. D. et al. Europa’s Differentiated Internal Structure: Inferences from Four Galileo Encounters. Science (1998) doi:10/b3qmg9.
8.	Ransford, G. A., Finnerty, A. A. & Collerson, K. D. Europa’s petrological thermal history. Nature 289, 21–24 (1981).
9.	Marusiak, A. G. et al. Exploration of Icy Ocean Worlds Using Geophysical Approaches. Planet. Sci. J. 2, 150 (2021).
10.	F. Sohl, T. Spohn, D. Breuer, & K. Nagel. Implications from Galileo Observations on the Interior Structure and Chemistry of the Galilean Satellites. Icarus 157, 104–119 (2002).
11.	G Schubert, J D Anderson, T Spohn, & W B McKinnon. Interior Composition, Structure and Dynamics of the Galilean Satellites. in 27.
12.	Wagner, F. W., Sohl, F., Hussmann, H., Grott, M. & Rauer, H. Interior structure models of solid exoplanets using material laws in the infinite pressure limit. Icarus 214, 366–376 (2011).
13.	O. L. Kuskov & V. A. Kronrod. Internal structure of Europa and Callisto. Icarus 177, 550–569 (2005).
14.	Valencia, D., O’Connell, R. J. & Sasselov, D. Internal structure of massive terrestrial planets. Icarus 181, 545–554 (2006).
15.	Finnerty, A. A., Ransford, G. A., Pieri, D. C. & Collerson, K. D. Is Europa surface cracking due to thermal evolution? Nature 289, 24–27 (1981).
16.	F. Cammarano, V. Lekic, M. Manga, M. Panning, & B. Romanowicz. Long-period seismology on Europa: 1. Physically consistent interior models: LONG-PERIOD EUROPA SEISMOLOGY, 1. J. Geophys. Res. Planets 111, n/a-n/a (2006).
17.	Seager, S., Kuchner, M., Hier‐Majumder, C. A. & Militzer, B. Mass‐Radius Relationships for Solid Exoplanets. Astrophys. J. 669, 1279–1297 (2007).
18.	Sotin, C., Grasset, O. & Mocquet, A. Mass–radius curve for extrasolar Earth-like planets and ocean planets. Icarus 191, 337–351 (2007).
19.	Baraffe, I., Chabrier, G., Fortney, J. & Sotin, C. Planetary Internal Structures. in Protostars and Planets VI (University of Arizona Press, 2014). doi:10.2458/azu_uapress_9780816531240-ch033.
20.	Biersteker, J. B. et al. Revealing the Internal Structure of Europa with a Bayesian Approach to Magnetic Induction Studies. in 2654 (2021).
21.	Sotin, C., Jackson, J. M. & Seager, S. Terrestrial Planet Interiors. Exoplanets 375–395 (2010).
22.	Ghail, R. C. The composition and structure of Europa. Lunar Planet. Sci. 28, 407–408 (1997).
23.	Sheng Jin & JiangHui Ji. The internal structure models of Europa. Sci. China Phys. Mech. Astron. 55, 156–161 (2012).
24.	Luis Gomez Casajus et al. Updated Europa gravity field and interior structure from a reanalysis of Galileo tracking data. Icarus 358, 114187 (2021).
