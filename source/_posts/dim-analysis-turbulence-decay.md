---
draft: true
date: 2025-06-15 09:57:22
title: The dimension analysis of turbulence decay (湍流衰减的量纲分析)
cover: https://image.tabirstrees.top/images/2025/08/01/magnetic-turbulence.png
tags: 
 - 湍流
 - 磁流体力学
 - 等离子体
 - 幂律谱
 - 磁螺旋度
 - Turbulence
 - Helicity
categories: 
 - [科研, (非)螺旋湍流衰减]
description: 利用简单的数学推导螺旋或者非螺旋湍流的磁能衰减律。
---

## Dimensional analysis in Fluid Mechanism From Kolmogorov

In 1941, Kolmogorov published his famous paper includes the famous Kolmogorov power-law for turbulence energy spectrum $E(k, \epsilon, v) = C \epsilon^{2/3} k^{-5/3}$, which can be obtained by some simple dimensional analysis.

Here we derive it step-by-step.

First, we have already known the dimensions of quantities we need:
$$
\begin{equation}
    \begin{aligned}
        E(k) &\sim E/k \sim \mathrm{L^{3} \cdot T^{-2}}, \\ \epsilon &\sim E/s = \mathrm{L^2 \cdot T^{-3}}, \\ k &\sim 1/L = \mathrm{L^{-1}}.
    \end{aligned}
\end{equation}
$$

Then, we can establish the relationship of those dimensions with $E(k, \epsilon, v) = C \epsilon^{2/3} k^{-5/3}$ :
$$
\begin{equation}
    \begin{aligned}
        E(k, \epsilon, v) \sim C \epsilon^{\alpha} k^{\beta} &= C \left(\mathrm{L^2 \cdot T^{-3}}\right)^{\alpha} \cdot \left(\mathrm{L^{-1}}\right)^{\beta} \\ &= C L^{(2 \alpha - \beta)} \cdot T^{-3 \alpha} \sim \mathrm{L^{3} \cdot T^{-2}},
    \end{aligned}
\end{equation}
$$

then we can solve out that: $\alpha = 2/3$, and $\beta = 2 \times (2/3) - 3 = -5/3$. Here we get the classic **-5/3** power law in Fluid Mechanics. The main idea is we know energy spectrum is depending on energy dissipation rate and wave vector, so we can express $E(k)$ with $\epsilon$ and $k$, then the dimension analysis can be successfully carried on.

## Dimensional analysis in helical or non-helical turbulence

Turbulence in astrophysical environment in usually magnetic, the magnetic field line will be twist and kink with each other, so we need a topological quantity named **magnetic helicity** to evaluate the degree of twist and kink. The conception of helicity is also can be seen in pure Fluid Mechanics (**kinetic helicity**), which is representing the quantity that:
$$
\begin{equation}
    \begin{aligned}
        H_{v} = \int _{V} \mathcal{\vec{w}} \cdot \vec{v} = \int _{V} \left(\nabla \times \vec{v}\right) \cdot \vec{v}.
    \end{aligned}
\end{equation}
$$

In MagneticHydroDynamic(MHD), the magnetic helicity computed as:
$$
\begin{equation}
    \begin{aligned}
        \mathcal{H} = \int _{V} \vec{A} \cdot \vec{B}.
    \end{aligned}
\end{equation}
$$

Similar as the conception in pure Fluid, you can rewrite the magnetic field $\vec{B}$ as $\nabla \times \vec{A}$, but it's not important if you don't concern the potential, which maybe more essentially fundamental in physics(😆😆😆).

All you need to know is the total helicity($\mathcal{H}$) or mean magnetic helicity density($I_{\mathrm{M}} = \mathcal{H}/V$) can be regard as conserved, and it will govern the evolution of turbulence, either kinetic one or magnetic one, in helical turbulence.

The problem here concerns how the magnetic energy and the characteristic scale($\mathcal{E}_{\mathrm{M}}$ and $\xi_{\mathrm{M}}$) at which it is stored evolve over time. So, we can express the energy and energy characteristic scale in helical turbulence as:
$$
\begin{equation}
    \begin{aligned}
        \mathcal{E}_{\mathrm{M}}(t) &= \int E_{\mathrm{M}}(k, t) \mathrm{\,d}k = F_{\mathcal{E}_{\mathrm{M}}}(I_{\mathrm{M}}, t), \\ \xi_{\mathrm{M}}(t)&=\int k^{-1} E_{\mathrm{M}}(k, t) \mathrm{\,d} k / \mathcal{E}_{\mathrm{M}} = F_{\xi_{\mathrm{M}}}(I_{\mathrm{M}}, t).
    \end{aligned}
\end{equation}
$$

where $E_{\mathrm{M}}$ is the magnetic energy spectrum $Sp(B)$.

And then, we repeat the operation above handled pure FM, for magnetic energy, we have:
$$
\begin{equation}
    \begin{aligned}
        B &\sim v_{A} \sim L \cdot T^{-1}, \\ A &\sim \int _{V} B \sim L \cdot T^{-1} \cdot L^{1} = L^{2} \cdot T^{-1}, \\ \mathcal{E}_{\mathrm{M}} &\sim B^{2} \sim v_{A}^{2} \sim L^{2} \cdot T^{-2}, \\  I_{\mathrm{M}} &\sim \left(\int _{V} A \cdot B\right)/V \sim L^{2} \cdot T^{-1} \cdot L \cdot T^{-1} \cdot L^{3} \cdot L^{-3} = L^{3} \cdot T^{-2}.
    \end{aligned}
\end{equation}
$$

where $B \sim v_{A}$ is because of the definition of Alfv&eacute;n velocity: $v_{A} = \sqrt{B^{2}/\mu_{0}\rho} \sim B$. Then, we can write down the relationship of:
$$
\begin{equation}
    \begin{aligned}
        \mathcal{E}_{\mathrm{M}} &\sim L^{2} \cdot T^{-2} \sim C \left(L^{3} \cdot T^{-2}\right)^{\alpha} \cdot \left(T\right)^{\beta}.
    \end{aligned}
\end{equation}
$$

$\alpha$ and $\beta$ can be solved with $\alpha = 2/3$, $\beta = -2/3$. AKA, $\mathcal{E}_{\mathrm{M}} \propto t^{-2/3}$ can be obtained.

The same process can be taken to characteristic length of magnetic energy:
$$
\begin{equation}
    \begin{aligned}
        \xi_{\mathrm{M}} &\sim L~(\text{because it is a length}), \\
    &\sim C \left(L^{3} \cdot T^{-2}\right)^{\alpha} \cdot \left(T\right)^{\beta}.
    \end{aligned}
\end{equation}
$$

With some algebra, we have $\alpha = 1/3$ and $\beta = -2/3$. If you write them as $\mathcal{E}_{\mathrm{M}} \propto t^{-p}$ and $\xi_{\mathrm{M}} \propto t^{q}$, then we have $p=q=2/3$, that is the form in Axel's paper[1].

Magnetic helicity will be inefficient while there is no mean helicity, so we call it non-helical case, Hosking's integral is needed to control the turbulence evolving. You can find it from the several papers by Hosking[2-4]. Here we give the definition of this integral as:
$$
\begin{equation}
    \begin{aligned}
        I_{\mathrm{H}} = \int h(x) h(x+r) \mathrm{\,d}^{3}x
    \end{aligned},
\end{equation}
$$

where $h = A \cdot B$ is the magnetic helicity density. Then we can give the dimension of $I_{\mathrm{H}}$:
$$
\begin{equation}
    \begin{aligned}
        h &\sim A \cdot B \sim L^{3} \cdot T^{-2}, \\  
        I_{\mathrm{H}} &\sim h \cdot h \cdot x^{3} \sim L^{9} \cdot T^{-4}.
    \end{aligned}
\end{equation}
$$

Relationship of:
$$
\begin{equation}
    \begin{aligned}
        \mathcal{E}_{\mathrm{M}_{\mathrm{non-helical}}} &\sim L^{2} \cdot T^{-2} \sim C \left(L^{9} \cdot T^{-4}\right)^{\alpha} \cdot \left(T\right)^{\beta}, \\
        \xi_{\mathrm{M}_{\mathrm{non-helical}}} &\sim L \sim C \left(L^{9} \cdot T^{-4}\right)^{m} \cdot \left(T\right)^{n}.
    \end{aligned}
\end{equation}
$$

It can be easily solved that:
$$
\begin{equation}
    \begin{aligned}
        \alpha &= 2/9,~\beta = -10/9, \\
        m &= 1/9, n = 4/9.
    \end{aligned}
\end{equation}
$$

That is to say, for non-helical case, we have $\mathcal{E}_{\mathrm{M}} \propto t^{-p}$ and $\xi_{\mathrm{M}} \propto t^{q}$ with $p = 10/9,~q=4/9$.

Further, if we can know the initial state of helicity and magnetic energy for a magnetic turbulence like **cosmic primordial magnetic field** (it is the same as we know magnetic field initially), we can estimate the residual magnetic field in later time (nowadays cluster's magnetic field) with the above power law for time.

---

1. Brandenburg, A., Yi, L. & Wu, X. Inverse cascade from helical and nonhelical decaying columnar magnetic fields. Preprint at https://doi.org/10.48550/arXiv.2501.12200 (2025).
2. Hosking, D. N. & Schekochihin, A. A. Emergence of long-range correlations and thermal spectra in forced turbulence. Journal of Fluid Mechanics 973, A13 (2023).
3. Hosking, D. N. & Schekochihin, A. A. Cosmic-void observations reconciled with primordial magnetogenesis. Nat Commun 14, 7523 (2023).
4. Hosking, D. N. & Schekochihin, A. A. Reconnection-Controlled Decay of Magnetohydrodynamic Turbulence and the Role of Invariants. Phys. Rev. X 11, 041005 (2021).
