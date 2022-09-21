---
title: Alfven 波 Kappa 离子非共振加热各向异性研究
tags:
  - 等离子体
  - 波粒相互作用
date: 2022-03-18 13:12:01
cover: https://pic4.zhimg.com/v2-3a14944ec6b1f6ebf7240431892a544f_r.jpg
categories: [科研,等离子体物理,理论]
description: 准线性理论推导阿尔芬波非共振加热过程中的温度各向异性(￣y▽￣)╭ Ohohoho.....
---


{% note primary %}
本文基于[Hai-Feng Liu et al 2016 ApJ 829 36](https://iopscience.iop.org/article/10.3847/0004-637X/829/1/36)的研究工作总结而成，算是对该文章的阅读笔记
{% endnote %}

# Introduction

很早以前人们就意识到波粒相互作用在日冕加热以及太阳风加速过程中的重要性，大量的研究从九十年代开始到现在一直没有停止过. 此外，

1. 1987年, McChesney等人展示了在低频阿尔芬波与粒子相互作用时, 离子位移和垂直方向的波长相当时会发生离子加热;
2. 2001年, Chen等人证明离子在大振幅(<span style='background: yellow;'>sufficiently large amplitude</span>)阿尔芬波作用下可以在分数倍回旋频率下被加热(<span style='background: yellow;'>stochastic heating</span>) <span class='heimu'>离子的轨迹在这个时候会因为电磁场的大幅涨落而变得随机</span> ;
3. <span style='background: pink;'>2010年时, Chandran等人预测随机加热不会太有效, 因为阿尔芬波的涨落在质子参考系中远离太阳, 这和数据观测(K13)的结果是一致的;</span>
4. 两千年左右, 原位观测发现存在两种不同的温度各向异性：
   1. 一种在同种离子中存在($T_{i \perp} \gg T_{i \parallel}$), 同时重离子会比质子快大约一个局地阿尔芬速度( $V_i \leqslant V_p + v_A$ );
   2. 还有一种不同离子之间的温度各向异性, 暗示了一种在 0.3-1 au 之间的波的活动性和的离子体积特性之间的关系.
5. 最近的观测发现地球附近的氦离子是质子温度的七倍. 什么导致了这样的温度各向异性依旧是一个开放的问题. 

$\kappa$ 分布在描述非热平衡的空间和天体物理等离子体过程时是非常有效的, 在该分布的表达式中我们可以通过将 $\kappa \rightarrow \infty$ 得到麦克斯韦分布的形式:

$$
\begin{equation}
    \begin{aligned}
        f_{\kappa}(v)=& \frac{N}{\left[(\kappa-3 / 2) \pi \theta^{2}\right]^{3 / 2}} \frac{\Gamma(\kappa+1)}{\Gamma(\kappa-1 / 2)} \\
        & \times\left(1+\frac{v^{2}}{(\kappa-3 / 2) \theta^{2}}\right)^{-(\kappa+1)}
    \end{aligned}
\end{equation}
$$

其中, $\theta$ 表示最可能的粒子速度( <span style='background: yellow;'>the most probable particle speed</span> ) <span class='heimu'>貌似可以理解为粒子的热速度...</span>. $\kappa$ 作为一个指数存在, 在低 $\kappa$ 等离子体中, 当涨落增强时, 电磁和静电场的色散关系展现出对谱指标( <span style='background: yellow;'>spectral index</span> ) $\kappa$ 强烈的依赖关系. $\kappa$ 分布被成功的应用于描述大量空间等离子体群, 比如内日球层, 太阳风, 行星磁层以及内外日鞘层.

下面我们来看看 $\kappa$ 分布的离子在阿尔芬波非共振相互作用下的离子加热, 温度各向异性以及差异流动等现象.

# Analytic Theory

现在考虑 $\beta = 0.01$ 的等离子体在沿背景磁场传播的左手极化单支阿尔芬波的作用下的加热现象. 波的电磁场可以被认为是满足固定变化的( Test Particle Simulation ), 离子的运动方程可以被概括为:

$$
\begin{equation}
    \frac{d (\vec{v_0} + \vec{v_1})}{d t} = \frac{d \vec{v}}{d t} = \frac{q_i}{m_i} [v_1 \times (\vec{B_0} + \delta \vec{B_w}) + \delta \vec{E_w}]
\end{equation}
$$

$$
\begin{equation}
    \frac{d \vec{r}}{d t} = v
\end{equation}
$$

电磁场可以被以下的方程概括:

$$
\begin{equation}
    \delta \vec{B_w} = B_k [\cos{\phi_k - \mathrm{i} \sin{\phi_k}}]
\end{equation}
$$

$$
\begin{equation}
    \delta \vec{E_w} = - v_A \vec{i_z} \times \delta \vec{B_w}
\end{equation}
$$

为了更好的应用准线性理论, 我们将上式中出现的矢量分解到垂直磁场和平行磁场的两个方向上, 也就是: $\vec{u_{\perp}} = (v_x + \mathrm{i} v_y) \hat{\perp}$ 以及 $\vec{v_{\parallel}} = v_z \hat{\parallel}$ , 这样的话对 $(2)$ 式中左边我们得到:

$$
\begin{equation}
    \frac{d \vec{v}}{d t} = \frac{d (v_x \hat{x} + v_y \hat{y} + v_z \hat{z})}{d t} = \frac{d u_\perp}{d t} \hat{\perp} + \frac{d v_\parallel}{d t} \hat{\parallel}
\end{equation}
$$

对 $(2)$ 式中右边第一项得到:

$$
\begin{equation}\begin{aligned}
    \frac{q_i}{m_i} &[\vec{v_1} \times (\vec{B_0} + \delta \vec{B_w})] = \frac{q_i}{m_i} \left | \begin{matrix}
        \hat{x} & \hat{y} & \hat{z} \\
        v_x & v_y & v_z \\
        B_k \cos{\phi_k} & - B_k \sin{\phi_k} & B_0
    \end{matrix}\right | \\
    = &\frac{q_i}{m_i} [(B_0 v_y + B_k v_z \sin{\phi_k}) \hat{x} + (-B_0 v_x + B_k v_z \cos{\phi_k}) \hat{y} \\
    &- B_k (v_x \sin{\phi_k} + v_y \cos{\phi_k}) \hat{z}] \\
    = &\frac{q_i B_0}{m_i} (v_y \hat{x} - v_x \hat{y}) + \frac{q_i B_k v_z}{m_i} (\sin{\phi_k} \hat{x} + \cos{\phi_k} \hat{y}) \\
    &- \frac{q_i B_k}{m_i} (v_x \sin{\phi_k} + v_y \cos{\phi_k}) \hat{z} \\
    = &\{\frac{q_i B_0}{m_i} (v_y - \mathrm{i} v_x) + \frac{q_i B_k v_z}{m_i} (\sin{\phi_k} + \mathrm{i} \cos{\phi_k})\} \hat{\perp} \\
    &- \frac{q_i B_k}{m_i} (v_x \sin{\phi_k} + v_y \cos{\phi_k}) \hat{\parallel} \\
    = &\{- \mathrm{i} \Omega^i_0 u_{\perp} + \mathrm{i} \Omega^i_k v_{\parallel} \mathrm{e}^{-\mathrm{i} \phi_k}\} \hat{\perp} - \mathrm{Im}(u_{\perp} \Omega^i_k \mathrm{e}^{\mathrm{i} \phi_k}) \hat{\parallel}
\end{aligned}\end{equation}
$$

其中, $\hat{}$ 表示取单位矢量; $\Omega$ 表示相应粒子在相应磁场中的回旋频率.

对 $(2)$ 式中右边第二项我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        \frac{q_i}{m_i} \delta \vec{E_w} = &\frac{q_i}{m_i} (- \vec{v_A} \times \delta \vec{B_w}) \\
        = & \left | \begin{matrix}
            \hat{x} & \hat{y} & \hat{z} \\
            0 & 0 & -v_A \\
            B_k \cos{\phi_k} & - B_k \sin{\phi_k} & 0 
        \end{matrix} \right | \\
        = &- \frac{q_i v_A B_k}{m_i} (\sin{\phi_k} \hat{x} - \cos{\phi_k} \hat{y}) \\
        = &- \frac{q_i v_A B_k}{m_i} (\sin{\phi_k} - \mathrm{i}\cos{\phi_k}) \hat{\perp} \\
        = &-\mathrm{i} \Omega^i_k v_A \mathrm{e}^{- \mathrm{i} \phi_k} \hat{\perp}
    \end{aligned}
\end{equation}
$$

如此一来, 联立 $(2), (6), (7)$ 以及 $(8)$ 式, 可以得到如下的在<span style='background: yellow'>guiding center</span>参考系中的运动方程:

$$
\begin{equation}
    \frac{d u_{\perp}}{d t} + \mathrm{i} \Omega^i_0 u_{\perp} = \mathrm{i} \Omega^i_k (v_{\parallel} - v_A) \mathrm{e}^{- \mathrm{i} \phi_k}
\end{equation}
$$

$$
\begin{equation}
    \frac{d v_{\parallel}}{d t} = - \mathrm{Im}(u_{\perp} \Omega^i_k \mathrm{e}^{\mathrm{i} \phi_k})
\end{equation}
$$

$$
\begin{equation}
    \frac{d z}{d t} = v_{\parallel}
\end{equation}
$$

根据之前的研究, 我们知道由于离子被波拾起( <span style='background: yellow'>pick up</span> ), 离子的速度最终会逐渐趋向于一个固定的渐进值. 也就是说, $\frac{d \vec{v}}{d t} = 0$ , 这样公式 $(9), (10)$ 可以被写成:

$$
\begin{equation}
    \mathrm{i} \Omega^i_0 u_{\perp} = \mathrm{i} (v_{\parallel} - v_A) \Omega^i_k \mathrm{e}^{- \mathrm{i} \phi_k}
\end{equation}
$$

$$
\begin{equation}
    \mathrm{Im}(u_{\perp} \Omega^i_k \mathrm{e}^{\mathrm{i} \phi_k}) = 0
\end{equation}
$$

考虑公式 $(12)$ 的矢量方向, 左右两边可以变个形:

$$
\begin{equation}
    \vec{u_{\perp}} = \frac{\Omega^i_k \mathrm{e}^{- \mathrm{i} \phi_k}}{\mathrm{i} \Omega^i_0} \mathrm{i} (v_{\parallel} - v_A) \vec{\perp} = \frac{\delta \vec{B_w}}{\vec{B_0}} (\vec{v_{\parallel}} - \vec{v_A})
\end{equation}
$$

平方之后就可以得到:

$$
\begin{equation}
    |\vec{u_{\perp}}|^2 = \frac{\delta \vec{B_w}^2}{\vec{B_0}^2} (\vec{v_{\parallel}} - \vec{v_A})^2
\end{equation}
$$

{% hideToggle 一段不知道正确与否的推导，对文章整体没有影响 %}
因为 $u_{\perp}, \Omega^i_k$ 都是实数, 根据 $(13)$ , 有:

$$
\begin{aligned}
    \mathrm{Im}(u_{\perp} \Omega^i_k \mathrm{e}^{\mathrm{i} \phi_k}) &= \mathrm{Im}(u_{\perp} \Omega^i_k \cos{\phi_k} + \mathrm{i} u_{\perp} \Omega^i_k \sin{\phi_k}) = 0 \\
    \Rightarrow &\sin{\phi_k} = 0 \\
    \Rightarrow &\phi_k = n \pi \\
    \Rightarrow &\cos^2{\phi_k} = 1
\end{aligned} 
$$

{% endhideToggle %}



假设 $\frac{B_k^2}{B_0^2}$ 足够小, 并且 $v_{\parallel} \ll v_A$ 是合理的, 那么 $(15)$ 变成:

$$
\begin{equation}
    |\vec{u_{\perp}}|^2 = \frac{\vec{B_w}^2 \vec{v_A^2}}{\vec{B_0}^2}
\end{equation}
$$

对于 $\kappa$ 分布的离子来说, 其初始温度可以被表示为: $T_{\kappa i}=\left[2 \kappa_{i} \theta_{i}^{2} /\left(2 \kappa_{i}-3\right)\right]\left(m_{i} / 2 k_{B}\right)$ , 这样相应的离子垂直方向上的温度为:

$$
\begin{equation}
T_{\perp i}=T_{\kappa i}\left(1+\frac{2 \kappa_{i}-3}{2 \kappa_{i}} \frac{B_{k}^{2}}{\beta_{i} B_{0}^{2}}\right)
\end{equation}
$$

其中, $\beta_i = (\theta_i/v_A)^2$. 可以肯定的是对于非色散的电磁波来说, 存在这样一个参考系, 其中波速是稳定的,每个粒子的能量守恒. 当这些条件考虑到其中时, 到达渐进状态的平行方向的离子温度可以被写成:

$$
\begin{equation}
T_{\parallel i}=T_{\kappa i}\left(1+\frac{2 \kappa_{i} - 3}{2 \kappa_{i}} \frac{B_{k}^{4}}{\beta_{i} B_{0}^{4}}\right)
\end{equation}
$$

那么, 到渐进状态两个方向上的各向异性就可以被表示为:

$$
\begin{equation}
    \frac{T_{\perp i}}{T_{\parallel i}}=\frac{1+\frac{2 \kappa_{i}-3}{2 \kappa_{i}} \frac{B_{k}^{2}}{\beta_{i} B_{0}^{2}}}{1+\frac{2 \kappa_{i}-3}{2 \kappa_{i}} \frac{B_{k}^{4}}{\beta_{i} B_{0}^{4}}}
\end{equation}
$$

Alpha 离子($\mathrm{H^{+2}_e}$)和质子($\mathrm{H^+}$)之间的垂直温度各向异性(<span class='mohu'>两种离子之间的垂直温度之比</span>)为:

$$
\frac{T_{\perp \alpha}}{T_{\perp p}}=\frac{T_{\kappa \alpha}\left(1+\frac{2 \kappa_{\alpha}-3}{2 \kappa_{\alpha}} \frac{B_{k}^{2}}{\beta_{\alpha} B_{0}^{2}}\right)}{T_{\kappa p}\left(1+\frac{2 \kappa_{p}-3}{2 \kappa_{p}} \frac{B_{k}^{2}}{\beta_{p} B_{0}^{2}}\right)}
$$

这样, 我们就从理论上推导出了在低频阿尔芬波对离子流进行加热时相同离子内的温度各向异性以及不同离子之间的垂直温度差异性.

这与模拟得到的结果以及在探测器数据中分析出来的结果是吻合的:

![wpinteraction-anisotropy1](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/wpinteraction-anisotropy1.png)

![wpinteraction-anisotropy2](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/wpinteraction-anisotropy2.png)