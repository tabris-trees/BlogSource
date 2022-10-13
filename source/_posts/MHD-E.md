---
title: 磁流体力学方程组的推导
date: 2022-10-13 23:39:17
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/MHD-E-20221013234420.png
tags:
- 等离子体物理
- 磁流体力学
categories: [笔记,等离子体物理]
description: 基于王晓钢老师的《等离子体物理》第一章的内容对等离子体流体描述的基本方程组进行大致推导
---

![科学网一三流体磁重联模型大尺度磁岛融合、激波、尾涡结果1-朱伯情的博文](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/MHD-E-20221013234420.png)

{% note primary %}
本文基于王晓钢老师的《等离子体物理》第一章的内容对等离子体流体描述的基本方程组进行大致推导，作为本人的学习笔记方便后续学习，也供相关领域的同学交流学习。
{% endnote %}

# 双流体模型

## 从动理论方程到磁流体方程

一般来说总是先学习等离子体的流体描述再学习动理学描述（按照国内的习惯），但实际上动理学的描述更加基本，更加触及物理本质。如果我们遵循朗道大佬的遗志，从物理的本质出发得到我们所关注的现象，动理学描述才是一开始我们应该接触的理论。所以我们这里假设大家都简单地了解过动理学描述的内容，至少知道速度分布函数与其宏观物理量之间的关系以及空间无碰撞等离子体最常使用的弗拉索夫（Vlasov）方程：

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial{f}}{\partial{t}}+\bm{\dot{r}} \cdot \nabla f + \bm{\dot{v}} \cdot \frac{\partial f}{\partial \bm{v}} = 0
    \end{aligned}
\end{equation}
$$

上述方程是对玻尔兹曼（Boltzmann）方程的简化，方程左边是对 $ f $ 的**全微分**，右边是碰撞项为零（造成的分布函数的变化）。对碰撞项采用不同的近似我们将的到不同的描述方程。

根据统计物理的理论，对上述 Vlasov 方程取速度的零阶矩积分：

$$
\begin{equation}
    \begin{aligned}
        \int \frac { \partial f } { \partial t } \mathrm{d} \bm{v}+ \int \bm{v} \cdot \frac { \partial f } { \partial \bm{r} } \mathrm{d} \bm{v} + \int \frac { q } { m } ( \bm{E} + \bm{v} \times \bm{B} ) \cdot \frac { \partial f } { \partial \bm{v} } \mathrm{d} \bm{v} = 0
    \end{aligned}
\end{equation}
$$


由于：

$$
\begin{equation}
    \begin{aligned}
        \int f \mathrm{d}\bm{v} &= n \\
        \int f \bm{v} \mathrm{d}\bm{v} &= n\bm{u}
    \end{aligned}
\end{equation}
$$

方程（2）的前两项可以很简单的给出：
$$
\begin{equation}
    \begin{gather*}
        \int \frac{\partial f}{\partial t} \mathrm{d}\bm{v} = \frac{\partial n}{\partial t} \\[8pt]
        \int \bm{v} \cdot \frac{\partial f}{\partial \bm{r}} \mathrm{d}\bm{v} = \frac{\partial }{\partial \bm{r}} \cdot (n\bm{u}) = \nabla \cdot (n\bm{u})
    \end{gather*}
\end{equation}
$$

将第三项拆开，首先来看含有 $\bm{E}$ 的项：

$$
\begin{equation}
    \begin{aligned}
        \int \frac{q}{m} \bm{E} \cdot \frac{\partial f}{\partial \bm{v}} \mathrm{d}\bm{v} = \frac{q}{m} \int \frac{\partial}{\partial \bm{v}} \cdot (f \bm{E})\ \mathrm{d}\bm{v} = \int_{\bm{S} \infty} f \bm{E} \cdot \mathrm{\bm{S}} = 0
    \end{aligned}
\end{equation}
$$

上述过程用到了在速度空间中的高斯定理，当 $v \rightarrow \infty$ 时，$f \rightarrow 0$ 的速度比 $v^{-2} \rightarrow 0$ 的速度更快对所有具有有限能量的分布是必要的，所以我们可以判断上式等于零。

对于（2）式中左边的最后一项我们可以做出定性的分析，$\bm{v} \times \bm{B}$ 与 $\partial /\partial \bm{v}$ 的矢量方向必定是垂直的，所以：

$$
\begin{equation}
    \begin{aligned}
        \int \frac{q}{m} (\bm{v} \times \bm{B}) \cdot \frac{\partial f}{\partial \bm{v}}\ \mathrm{d}\bm{v} = 0
    \end{aligned}
\end{equation}
$$

于是我们得到 **连续性方程**：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\frac{\partial n_\alpha}{\partial t} + \nabla \cdot (n_\alpha \bm{u}_\alpha) = 0}
    \end{aligned}
\end{equation}
$$

下标 $\alpha$ 表示不同种类的粒子。

基于同样的过程，对 Vlasov 方程取速度的二阶矩积分（方程的左右两边乘上 $m\bm{v}$ 然后积分）有：

$$
\begin{equation}
    \begin{aligned}
        m \int \bm{v} \frac{\partial f}{\partial t}\ \mathrm{d}\bm{v} + m \int \bm{v}(\bm{v} \cdot \nabla)f\ \mathrm{d}\bm{v} + q \int \bm{v} (\bm{E} + \bm{v} \times \bm{B}) \cdot \frac{\partial f}{\partial \bm{v}}\ \mathrm{d}\bm{v} = 0 
    \end{aligned}
\end{equation}
$$

对第一项和第三项有：

$$
\begin{equation}
    \begin{aligned}
        m \int \bm{v} \frac{\partial f}{\partial t}\ \mathrm{d}\bm{v} = m \frac{\partial (n \bm{u})}{\partial t}
    \end{aligned}
\end{equation}
$$

$$
\begin{equation}
    \begin{aligned}
        \int \bm{v} (\bm{E} + \bm{v} \times \bm{B}) \cdot \frac{\partial f}{\partial \bm{v}}\ \mathrm{d}\bm{v} &= \int \frac{\partial}{\partial \bm{v}} \cdot \left[f \bm{v}(\bm{E} + \bm{v} \times \bm{B})\right] \mathrm{d}\bm{v} \\[8pt]
        &- \int f \frac{\partial}{\partial \bm{v}} \cdot \left[\bm{v}(\bm{E}+\bm{v}\times\bm{B})\right] \mathrm{d}\bm{v} \\[8pt]
        &= \int \frac{\partial}{\partial \bm{v}} \cdot \left[f \bm{v}(\bm{E} + \bm{v} \times \bm{B})\right] \mathrm{d}\bm{v} \\[8pt]
        &- \int \left(\frac{\partial}{\partial \bm{v}} \cdot f \bm{v}\right)(\bm{E} + \bm{v} \times \bm{B}) \mathrm{d}\bm{v} \\[8pt]
        &- \int \left(f \bm{v} \cdot \frac{\partial}{\partial \bm{v}}\right)(\bm{E} + \bm{v} \times \bm{B}) \mathrm{d}\bm{v}
    \end{aligned}
\end{equation}
$$

与之前的分析类似，利用高斯定理可以得到前两个积分为零。又因为 $\partial/\partial \bm{v}$ 与 $\bm{v}$ 平行，即 $\bm{v} \cdot \partial/\partial \bm{v} = 1$，则：

$$
\begin{equation}
    \begin{aligned}
        q \int \bm{v} (\bm{E} + \bm{v} \times \bm{B}) \cdot \frac{\partial f}{\partial \bm{v}}\ \mathrm{d}\bm{v} &= -q \int f(\bm{E}+\bm{v}\times\bm{B})\mathrm{d}\bm{v} \\[8pt]
        &= -q n (\bm{E}+\bm{u}\times\bm{B})
    \end{aligned}
\end{equation}
$$

对（8）式中的第二项有：

$$
\begin{equation}
    \begin{aligned}
        m \int \bm{v}(\bm{v} \cdot \nabla)f\ \mathrm{d}\bm{v} = m \int \nabla \cdot (\bm{vv}) f \mathrm{d}\bm{v}-m \int \bm{v}(\nabla \cdot \bm{v})f\ \mathrm{d}\bm{v}
    \end{aligned}
\end{equation}
$$

但在六维相空间中，$\nabla$ 与 $\bm{v}$ 是无关的，所以 $\nabla \cdot \bm{v} = 0$。则上式变为：

$$
\begin{equation}
    \begin{aligned}
        m \int \bm{v}(\bm{v} \cdot \nabla)f\ \mathrm{d}\bm{v} = m \nabla \cdot \int f\bm{vv}\mathrm{d}\bm{v} = \nabla \cdot nm\overline{\bm{vv}}
    \end{aligned}
\end{equation}
$$

对等离子体中的每一个粒子速度分为随流体运动的平均流体速度 $\bm{u}$ 和热速度 $\bm{\theta }$，即 $\bm{v} = \bm{u}+\bm{\theta}$， 如此一来，（13）式变为：

$$
\begin{equation}
    \begin{aligned}
        \nabla \cdot nm\overline{\bm{vv}} = \nabla \cdot (nm\bm{uu}) + \nabla \cdot (nm\overline{\bm{\theta\theta}}) + \nabla \cdot (2nm\bm{u}\overline{\bm{\theta}})
    \end{aligned}
\end{equation}
$$

平均热速度 $\overline{\bm{\theta}}$ 显然为零，同时我们将 $nm\overline{\bm{\theta\theta}}$ 定义为 **压力张量** $\bm{P}$。则通过一阶矩积分我们得到：

$$
\begin{equation}
    \begin{aligned}
        m \frac{\partial (n \bm{u})}{\partial t} &+ \nabla \cdot (nm\bm{uu}) + \nabla \cdot \bm{P} - qn(\bm{E}+\bm{u}\times\bm{B}) \\[8pt]
        &= m \frac{\partial n}{\partial t} \bm{u} + nm \frac{\partial \bm{u}}{\partial t}+ (\nabla \cdot nm\bm{u}) \bm{u} \\[8pt]
        &+ nm\bm{u} \cdot \nabla \bm{u} +\nabla \cdot \bm{P} - qn(\bm{E}+\bm{u}\times\bm{B}) \\[8pt]
    \end{aligned}
\end{equation}
$$

上式中第一项和第三项可以用连续性方程相互抵消：

$$
\begin{equation}
    \begin{aligned}
        m \frac{\partial n}{\partial t} \bm{u} + (\nabla \cdot nm\bm{u}) \bm{u} = m \bm{u} \left( \frac{\partial n}{\partial t} + \nabla \cdot n\bm{u} \right) = 0
    \end{aligned}
\end{equation}
$$

再加上流体各向同性的假设，得到 **动量方程** ：

$$
\begin{equation}
    \begin{aligned}
        \boxed{n_\alpha m_\alpha \left( \frac{\partial\bm{u}_\alpha}{\partial t} + \bm{u}_\alpha \cdot \nabla \bm{u}_\alpha \right) = n_\alpha q_\alpha (\bm{E}+\bm{u}_\alpha \times \bm{B}) - \nabla \cdot \bm{P}_\alpha}
    \end{aligned}
\end{equation}
$$

**上述过程中我们可以看到，零阶矩得到的连续性方程中包含有一阶矩得到的动量方程中的项—— $\nabla \cdot (nm\bm{u})$ ，而动量方程中又包含了二阶矩得到的量—— $\nabla \cdot \bm{P}$ ，以此类推可以无限递推下去，各阶矩之间是相互耦合的，因此我们需要在二阶矩处做出截断。**

即不再进行动理学方程的二阶矩积分，而将动量方程中 $\nabla  \cdot \bm{P}$ 变成 $\nabla p_\alpha$，并利用下面的 **状态方程** 进行计算：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\frac{\partial p_\alpha}{\partial t} + \bm{u}_\alpha \cdot \nabla p_\alpha = - \gamma p_\alpha \nabla \cdot \bm{u}_\alpha}
    \end{aligned}
\end{equation}
$$

实际上这是绝热状态下状态方程的近似，具体可以参考热力学教材。

## 双流体模型

如果在上述过程中考虑碰撞项，动量方程（高斯单位制）将变成：

$$
\begin{equation}
    \begin{aligned}
        &n_\alpha m_\alpha\left(\frac{\partial \boldsymbol{u}_\alpha}{\partial t}+\boldsymbol{u}_\alpha \cdot \nabla \boldsymbol{u}_\alpha\right)= \\
        &\quad=-\nabla p_\alpha+n_\alpha q_\alpha\left[\boldsymbol{E}+\frac{\boldsymbol{u}_\alpha \times \boldsymbol{B}}{c}\right]-\sum_\beta \nu_{\alpha \beta} n_\alpha m_{\alpha} \boldsymbol{u}_{\alpha}
    \end{aligned}
\end{equation}
$$

动量方程中涉及到的 $\bm{E}$ 和 $\bm{B}$ 需要用控制电磁场的 Maxwell 方程组来进行闭合，根据不同的情况我们需要使用电磁方程组中不同的方程。考虑电磁场的波动时需要 **安培（Ampere）定律**：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\nabla \times \bm{B} = \frac{4 \pi}{c} \bm{J} \left(+ \frac{1}{c} \frac{\partial \bm{E}}{\partial t}\right) = \frac{4 \pi}{c} \sum_\alpha n_\alpha q_\alpha \bm{u}_\alpha \left(+ \frac{1}{c} \frac{\partial \bm{E}}{\partial t}\right)}
    \end{aligned}
\end{equation}
$$

**括号中的位移电流项在低频近似下通常被忽略，但在高频情况时位移电流项是非常重要的**。除此之外，还有对于磁场的 **高斯（Gaussian）定理**：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\nabla \cdot \bm{B} = 0}
    \end{aligned}
\end{equation}
$$

对于电场来说，如果仅仅研究静电问题则只需要使用 **泊松（Poisson）方程**：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\nabla \cdot \bm{E} = 4\pi \sum_\alpha n_\alpha q_\alpha}
    \end{aligned}
\end{equation}
$$

对于电磁模式则需要 **法拉第（Fayraday）定律**：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\nabla \times \bm{E} = -\frac{1}{c} \frac{\partial \bm{B}}{\partial t}}
    \end{aligned}
\end{equation}
$$

以上就是等离子体双流体模型的主要内容，在推倒过程中我们忽略了等离子体的各向异性，但在很多现实的等离子体过程中，各向异性的存在都是极其重要的。

# 电子磁流体模型

一般来说，双流体模型同时考察离子和电子的运动情况，但由于两者之间的质量差距（质子质量是电子质量的1836倍）导致两者物理量变化的时间尺度相差也很大，有时候电子完全改变自己的运动状态，但离子基本还没开始动，这在推导德拜长度的过程中也可以窥探一二。由于时间尺度的问题，在计算过程中对时间步长的要求需要很小，这样计算离子的运动就要很长的计算时间，但我们知道随着计算时间的增加计算的误差也在累积，最终导致计算存在很强的数值不稳定性。

在这样的背景下，我们干脆取极限情况下的近似，即 $m_e/m_i \to 0$，并且
1. **完全忽略掉离子的运动** 从而有：$\bm{J} = -n_e e \bm{u}_e$。同时如果忽略掉位移电流，在这种近似下我们可以推出：
$$
\begin{equation}
    \begin{aligned}
        \nabla \cdot \bm{J} = \nabla \cdot (\nabla \times \bm{B}) = \underbrace{- e \nabla \cdot (n_e \bm{u}_e)  = e \frac{\partial n_e}{\partial t}}_{\text{连续性方程}} = 0
    \end{aligned}
\end{equation}
$$
即电子的密度近似不随时间改变，若初始时刻电子分布是均匀的，那这种均匀状态将一直持续下去。在此基础上我们进一步假设

2. **电子是“不可压缩”的** ，即：$\nabla \cdot \bm{u}_e = 0$。这对于磁约束等离子体来说是合适的，这一假设直接保证了电子密度是不随空间分布变化的。

再引入哈密顿力学中的 **电子流体正则动量** $\bm{P}_e = m_e \bm{u}_e - e \bm{A}/c$，定义 $\nabla \times \bm{P}_e\equiv \bm{\Omega}_e$ 为“广义涡旋”，对动量方程（式（19））取旋度，加上前面的假设有：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\frac{\partial \bm{\Omega}_e}{\partial t} = \nabla \times (\bm{u}_e \times \bm{\Omega}_e) - \frac{e \nu_{ei}}{c} \rm{d}_e^2 \nabla^2 \bm{B}}
    \end{aligned}
\end{equation}
$$

其中，$\rm{d}_e$ 为电子“趋肤深度”，且：

$$
\begin{equation*}
    \begin{gather*}
        \bm{\Omega}_e = -e (1-\rm{d}_e^2 \nabla^2) \bm{B}/c \\[8pt]
        \rm{d}_e = c/\omega_{pe}
    \end{gather*}
\end{equation*}
$$

式（25）被称为“电子磁流体方程”。<span class='mohu'>看起来是挺复杂的，我也不知道为什么这么复杂，但</span>如果物理量变化的空间特征尺度远远大于电子的趋肤深度，即 $\rm{d}_e^2 \nabla^2 \ll 1,\ \bm{\Omega}_e \approx -e\bm{B}/c$，并忽略碰撞，上述方程可以被简化为：

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial \bm{B}}{\partial t} = \nabla \times (\bm{u}_e \times \bm{B})
    \end{aligned}
\end{equation}
$$

这种形式就和 **理想磁流体模型** 的欧姆（Ohm）定律很接近了，从形式上来说是一样的。

然而，在空间等离子体的某些情况中，磁场很弱，以至于电子作为流体不可压缩的假设是不成立的。这时就需要考虑原来的双流体方程并作 $m_i \to \infty$ 假设，这一假设不会改变原本的双流体方程 **除动量方程之外** 的其他方程的形式，而对于动量方程我们有：

$$
\begin{equation}
    \begin{aligned}
        n_e m_e \left(\frac{\partial \bm{u}_e}{\partial t}+\bm{u}_e \cdot \nabla\bm{u}_e\right) = -\nabla p_e - e n_e \left[\bm{E}+\frac{\bm{u}_e \times \bm{B}}{c}\right] + \frac{\nu_e m_e}{e} \bm{J}
    \end{aligned}
\end{equation}
$$

其中 $\bm{J} = -e n_e \bm{u}_e$，这被称为 **广义欧姆定律**，因为它给出了电场和电流之间的关系，将其改成与一般的欧姆定律更像的形式为：

$$
\begin{equation}
    \begin{aligned}
        \bm{E} + \frac{\bm{u}_e \times \bm{B}}{c} = - \frac{m_e \left(\frac{\partial}{\partial t}+\bm{u}_e \cdot \nabla\right) (e n_e \bm{u}_e)}{e^2 n_e} - \frac{\nabla p_e}{e n_e} + \frac{\nu_e m_e}{e^2 n_e} \bm{J}
    \end{aligned}
\end{equation}
$$

将等离子体电子振荡频率 $\omega_{pe} = e^2 n_e/4\pi m_e$ 以及电流 $\bm{J}$ 的表达式代入上式，并定义 $\eta \equiv 4\pi \nu_e/\omega_{pe}^2$，相当于 **电阻**，因此我们可以得到：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\bm{E} + \frac{\bm{u}_e \times \bm{B}}{c} = \eta \bm{J} - \frac{\nabla p_e}{e n_e} + \frac{4\pi}{\omega_{pe}^2} \left(\frac{\partial}{\partial t} + \bm{u}_e \cdot \nabla \right) \bm{J}}
    \end{aligned}
\end{equation}
$$

上式中左边第二项为 **霍尔效应项** ，等式右边分别为 **欧姆效应项**，**电子压强梯度项** 以及 **电子惯性项**。再加上之前双流体方程的其他等式（下标 $\alpha$ 全部换成 $e$）即组成完整的 **电子磁流体方程组**。

# 霍尔磁流体模型

在上述的双流体计算的困境中，针对时间尺度的不同我们还可以选择主要考虑离子的运动，假设电子的所有运动都是“瞬间完成的”，即对 $m_e/m_i\to 0$ 的近似中取 $m_e = 0$。这样我们通过双流体的电子动量方程得到的广义欧姆定律将没有电子惯性项：

$$
\begin{equation}
    \begin{aligned}
        \bm{E} + \frac{\bm{u}_e \times \bm{B}}{c} = -\frac{\nabla p_e}{e n_e} - \eta n_e e \bm{u}_e
    \end{aligned}
\end{equation}
$$

其中 $\eta$ 可以算是碰撞造成的“等效电阻”，因为电子质量的趋于零按照原本的定义算出来 $\eta$ 也为零，但实际的碰撞却还是存在的。可以发现，如果我们对上式取旋度就能得到式（26），也可以说是这个忽略了电子惯性项的模型显然满足特征尺度远大于电子趋肤深度的假设。

同时，根据 $\bm{J} = e(n_i \bm{u}_i - n_e \bm{u}_e)$ 以及电中性假设 $n_i \approx n_e$，上式我们可以写成：

$$
\begin{equation}
    \begin{aligned}
        \bm{E} + \left(\frac{\bm{u}_i \times \bm{B}}{c} - \frac{\bm{J} \times \bm{B}}{e n_e c}\right) = - \frac{\nabla p_e}{e n_e} - (\eta n_e e \bm{u}_i - \eta \bm{J})
    \end{aligned}
\end{equation}
$$

这就和离子的动量方程建立了联系：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\bm{E} + \frac{\bm{u}_i \times \bm{B}}{c} = \frac{\bm{J} \times \bm{B}}{e n_e c} - \frac{\nabla p_e}{e n_e} + \eta (\bm{J} - n_e e \bm{u}_i)}
    \end{aligned}
\end{equation}
$$

方程右边的第一项就是电磁学课本中的霍尔效应，因此我们将这个近似模型称为 **霍尔（Hall）磁流体模型**，通过对上式做量纲分析可以知道这个模型适用于离子的“惯性尺度”，即 $\rm{d_i} = c/\omega_{pi}\ (\gg \rm{d_e})$。

# 理想磁流体模型

## 磁流体模型的基本假设

 我们应当了解，磁流体描述只是对等离子体的一种近似描述，要做这些近似需要很多的前提条件，根据王晓钢老师的书的节奏，这里我们就来讨论一下这些暗含的假设。

1. 时间尺度的假设：在时间尺度上，要求等离子变化的时间尺度远远大于带电粒子之间“短程”相互作用的时间尺度，即 $\tau_{\alpha \alpha}, \tau_{\alpha \beta} \ll \tau_{\text{H}}$。这意味着需要较高的碰撞频率，也就是说碰撞频繁在磁流体时间尺度内等离子体处于局域热力学平衡，即等离子体压强的各向同性，$p$ 作为一个标量存在（这样才能在二阶矩的地方进行截断）。
   
2. 空间尺度的假设：由于磁流体的假设考虑的是流体元尺度（介观尺度）下的问题，所以粒子在背景磁场下的回旋运动在这里不会被考虑，因此我们需要假设等离子体的特征空间长度远大于带电粒子的回旋半径，同时在时间上还隐含着磁流体的特征时间远远大于带电粒子的回旋周期，即：
   $$
   \begin{equation}
    \begin{aligned}
        \rho_{e}/L_{\text{H}} \ll \rho_{i}/L_{\text{H}} \ll 1,\ \omega_{\text{H}} \ll \Omega_{c i} \ll \Omega_{c i}
    \end{aligned}
   \end{equation}
   $$

3. 等离子体假设：该假设要求德拜球内含有大量的粒子，等离子体整体呈现电中性，即：
   $$
   \begin{equation}
    \begin{aligned}
        n^{-1/3} \ll \lambda_{\rm{D}} \ll L_{\text{H}},\ \omega_{\text{H}} \ll \omega_{p e},\ \Rightarrow \sum_{\alpha} n_{\alpha} q_{\alpha} \to 0
    \end{aligned}
   \end{equation}
   $$这一假设比较复杂，它实际上是保证等离子体是弱耦合等离子体，但弱耦合等离子体有时也被假设成“无碰撞”等离子体，这时候就和前面的局域热力学平衡假设矛盾，需要进一步讨论，我们这里暂且不表。

4. 非相对论假设：这个比较简单，因为我们考虑的流体假设速度一般比较慢，不满足相对论条件，所以有：
   $$
   \begin{equation}
    \begin{aligned}
        \omega/k \sim L_{\text{H}}/\tau_{\text{H}} \sim V_{\text{typical}} \ll c \Rightarrow \frac{1}{c} \frac{\partial \bm{E}}{\partial t} \to 0
    \end{aligned}
   \end{equation}
   $$

## 理想磁流体力学方程组

这里我们将等离子体中的电子、离子成分看成是同一种流体，并利用局域电中性假设 $n_e = n_i = n$ 作出如下的假设：

* 等离子体质量密度：
  $$
  \begin{equation}
    \begin{aligned}
        \rho_{m} \equiv n (m_i + m_e) \approx n m_i
    \end{aligned}
  \end{equation}
  $$

* 等离子体流体速度：
  $$
  \begin{equation}
    \begin{aligned}
        \bm{u} = \frac{n_i m_i \bm{u}_i + n_e m_e \bm{u}_e}{n_i m_i + n_e m_e} = \bm{u}_i + \frac{m_e}{m_i} \bm{u}_e \approx \bm{u}_i
    \end{aligned}
  \end{equation}
  $$
  
* 等离子体压强：
  $$
  \begin{equation}
    \begin{aligned}
        p = n (T_e + T_i)
    \end{aligned}
  \end{equation}
  $$

* 等离子体电流：
  $$
  \begin{equation}
    \begin{aligned}
        \bm{J} = n e (\bm{u}_i - \bm{u}_e)
    \end{aligned}
  \end{equation}
  $$

利用上述四个方程对双流体方程的不同电荷分量进行求和，我们可以得到：

* 连续性方程：
  $$
  \begin{equation}
    \begin{aligned}
        \boxed{\frac{\partial n}{\partial t} + \nabla  \cdot (n \bm{u}) = 0}
    \end{aligned}
  \end{equation}
  $$

* 动量方程：
  $$
  \begin{equation}
    \begin{aligned}
        \boxed{n m_i \left( \frac{\partial \bm{u}}{\partial t} + \bm{u} \cdot \nabla \bm{u} \right) = \underbrace{- \nabla p + \frac{\bm{J} \times \bm{B}}{c} = - \nabla p + \frac{(\nabla \times \bm{B}) \times \bm{B}}{4 \pi}}_{\text{安培定律}}}
    \end{aligned}
  \end{equation}
  $$

同时，类似前面霍尔磁流体方程组的广义欧姆定律的推导我们可以有：

$$
\begin{equation}
    \begin{aligned}
        \bm{E} + \frac{\bm{u} \times \bm{B}}{c} = \frac{\bm{J} \times \bm{B}}{e n c} - \frac{\nabla p_e}{n e} + \eta \bm{J} + \frac{4 \pi}{\omega^2_{p e}} \left( \frac{\partial}{\partial t} + \bm{u}_e \cdot \nabla \right) \bm{J} - \frac{\nu_{e} m_e}{e} \bm{u} - \frac{m_e}{e} \left( \frac{\partial}{\partial t} + \bm{u}_e \cdot \nabla \right)  \bm{u}
    \end{aligned}
\end{equation}
$$

上式已经将 $\bm{u} \approx \bm{u}_i$ 代入，这就是最一般形式的广义欧姆定律，通常认为电流主要是由电子携带的，这样就可以忽略最后两项离子的贡献而得到最常用到的广义欧姆定律：

$$
\begin{equation}
    \begin{aligned}
        \bm{E} + \frac{\bm{u} \times \bm{B}}{c} = \frac{\bm{J} \times \bm{B}}{e n c} - \frac{\nabla p_e}{n e} + \eta \bm{J} + \frac{4 \pi}{\omega^2_{p e}} \left( \frac{\partial}{\partial t} + \bm{u}_e \cdot \nabla \right) \bm{J}
    \end{aligned}
\end{equation}
$$

忽略离子运动并假设电子不可压缩，对该方程取旋度就得到电子磁流体方程；忽略电子质量，即得到霍尔磁流体模型的广义欧姆定律。

所谓理想磁流体模型即在无碰撞近似下忽略方程右边的电阻项（欧姆效应项），同时考虑大尺度流体近似从而忽略右边所有的项得到：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\bm{E} + \frac{\bm{u} \times \bm{B}}{c} = 0}
    \end{aligned}
\end{equation}
$$

这就是理想磁流体模型的广义欧姆定律了。代入法拉第电磁定律得到：

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial  \bm{B}}{\partial t} = \nabla \times (\bm{u} \times \bm{B})
    \end{aligned}
\end{equation}
$$

加上状态方程：

$$
\begin{equation}
    \begin{aligned}
        \boxed{\frac{\partial p}{\partial t} + \bm{u} \cdot \nabla p = - \gamma p \nabla \cdot \bm{u}}
    \end{aligned}
\end{equation}
$$

就得到完整的 **理想磁流体（idea MHD）力学** 方程组了。