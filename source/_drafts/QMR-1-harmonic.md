---
title: Quantum Mechanics Review —— quantum harmonic oscillator
tags:
---

{% note info modern %}
This is a series of articles reviewing several of the most important models and examples in quantum mechanics, which can also conveniently assist with final exams.
{% endnote %}

## Preparation

We know the Hamiltonian of classic harmonic oscillator is:

$$
\begin{equation}
    \begin{aligned}
        H=\frac{1}{2 m} p^{2}+\frac{1}{2} m \omega^{2} x^{2}
    \end{aligned}
\end{equation}
$$

Extend it to quantum mechanics, we have the quantum harmonic oscillator independent Schrodinger equation as:

$$
\begin{equation}
    \begin{aligned}
        \frac{p^{2}}{2 m} + \frac {1}{2}m\omega ^{2}x^{2} = 0
    \end{aligned}
\end{equation}
$$

It describes the motion of a particle with potential like $V(x)={1/2}m\omega ^{2}x^{2}$.

Now we need to handle this equation, with $\left(p=-i\hbar {d / dx}\right)$ above equation equals to:

$$
\begin{equation}
    \begin{aligned}
        \frac{-\hbar^{2}}{2 m} \frac{\mathrm{d}^{2}}{\mathrm{d}x^{2}} + \frac{1}{2} m \omega^{2} x^{2} = 0
    \end{aligned}
\end{equation}
$$

If you familiar with the mathematics, you will quickly find the solution of this equation, but now we should introduce a special method first used in quantum mechanics: <span style='color: #E63F32'>**algebraic method**</span>.

According to the mathematics in Hilbert space and the probabilistic interpretation of quantum mechanics, **if the Hamiltonian can be rewritten in terms of operators that form a known algebra, the eigenvalues and eigenstates can be obtained directly from the algebra, without solving differential equations**. So, if we can find an operator commuted with Hamiltonian, which we have already known it's eigenstates, we can solve the problem easily.

Here we do the following three things to finish the above procedure:

1. Try to factorize the Hamiltonian as a product of two operators.

2. Try to express the Hamiltonian in terms of a number operator.

3. Try to find operators that raise/lower energy.

That is to say, we want:

$$
\begin{equation}
    \begin{aligned}
        H = C \hat{a} \hat{b} + \text{Const}.
    \end{aligned}
\end{equation}
$$

Then, the Hamiltonian can factorize to $\hat{a}$ and $\hat{b}$, they can raise/lower energy, and $\hat{a} \hat{b}$ is the number operator we want. <span class='heimu'>Please think why it should be this form? This can be proved by pure math, and relative with the calculation of quantum harmonic oscillator.</span>

To match the above rules, we can simply define the two operator as:

$$
\begin{equation}
    \begin{aligned}
        a = m \hat{x} + n \hat{p}, \text{and } a^\dagger = m^* \hat{x} + n^* \hat{p}
    \end{aligned}
\end{equation}
$$

The Hamiltonian is in the formalism of $\hat{p}^{2}+\hat{x}^{2}$, so we can use $a a^\dagger$ and $a^\dagger a$ to construct our Hamiltonian(for convenience, here we present operation without *hat* symbol):

$$
\begin{equation}
    \begin{aligned}
        a a^\dagger &= (m x + n p) (m^* x + n^* p) \\
        &=m^{2} x^{2} + n^{2} p^{2} + mn^{*} xp + m^{*}npx
    \end{aligned}
\end{equation}
$$

With the commuter of $x$ and $p$: $[x, p]=xp - px = i\hbar$, we have:

$$
\begin{equation}
    \begin{aligned}
        a a^\dagger = m^{2} x^{2} + n^{2} p^{2} + (mn^{*}+m^{*}n)xp - i m^{*} n \hbar
    \end{aligned}
\end{equation}
$$

Similarly,

$$
\begin{equation}
    \begin{aligned}
        a^\dagger a = m^{2} x^{2} + n^{2} p^{2} + (m^{*}n+mn^{*})xp - i m n^{*} \hbar
    \end{aligned}
\end{equation}
$$

Compare them with the formula of we want, we can conclude that:

$$
\begin{equation}
    \begin{aligned}
        H &= C a a^\dagger + \text{Const. 1} \\
        &= B a^\dagger a + \text{Const. 2}
    \end{aligned}
\end{equation}
$$

With

$$
\begin{equation}
    \begin{aligned}
        &m^{2}  = \frac{m \omega^{2}}{2 C}, \\
        &n^{2} = \frac{1}{2 m B}, \\
        &C = B, \\
        &\text{Const. 1} = i C m^{*} n \hbar \\
        &\text{Const. 2} = i B m n^{*} \hbar \\
        &m^{*}n+mn^{*} = mn^{*}+nm^{*} = 0,
    \end{aligned}
\end{equation}
$$

The last one gives us $m^{*}n = - m n^{*}$, that means one of $n$ or $m$ should be pure imaginary and then another one must be real, here we define $n$ to be pure imaginary one, and $m$ is the real one.

Then, that gives $m = \sqrt{\frac{m \omega^{2}}{2 C}}$, $n = i \sqrt{\frac{1}{2 m B}}$, $i m n^{*} \hbar = - i m^{*} n \hbar$, and $\text{Const. 2} = - \text{Const. 1}$, so

$$
\begin{equation}
    \begin{aligned}
        H &= C a a^\dagger + \text{Const. 1} \\
        &= C a^\dagger a - \text{Const. 1} = C a a^\dagger - C[a, a^\dagger ] - \text{Const. 1} \\
        \Rightarrow~&C[a, a^\dagger] = -2 \text{Const. 1}
    \end{aligned}
\end{equation}
$$

To determine all the parameters we have, we can simply assume $[a, a^\dagger] = 1$, then we can have

$$
\begin{equation}
    \begin{aligned}
        & \text{Const. 1} = -\frac{C}{2} = i C m^{*} n \hbar= i C m n \hbar \\
        \Rightarrow~&m n = \frac{i}{2 \hbar} = \sqrt{\frac{m \omega^{2}}{2 C}} \left(i \sqrt{\frac{1}{2 m B}}\right) = \frac{i \omega}{2 C} \\
        \Rightarrow~&C = \hbar \omega \\
    \end{aligned}
\end{equation}
$$

Eventually,

$$
\begin{equation}
    \begin{aligned}
        m &= \sqrt{\frac{m \omega}{2 \hbar}}, n = i \sqrt{\frac{1}{2 \hbar m \omega}}, \\
        a &= \sqrt{\frac{m \omega}{2 \hbar}} x + i \sqrt{\frac{1}{2 \hbar m \omega}} p, a^\dagger = \sqrt{\frac{m \omega}{2 \hbar}} x - i \sqrt{\frac{1}{2 \hbar m \omega}} p, \\
        H &= \hbar \omega (a a^\dagger - \frac{1}{2}) = \hbar \omega (a^\dagger a + \frac{1}{2}).
    \end{aligned}
\end{equation}
$$

## Computation

Now, we have all the tools we need to solve quantum harmonic oscillator.

From the above content we know $[a^\dagger a, H] = 0$, so the eigenstates of $H$ is also eigenstates of $a^\dagger a$. We rewrite $a^\dagger a$ as $N$, and assume $N \psi_{n} = n \psi_{n}$, where the $\psi_{n}$ is eigenstates of $N$ and $H$. In this assumption, we can give the eigenvalues(energy) of $H$ easily:

$$
\begin{equation}
    \begin{aligned}
        E_{n} = \left(n+\frac{1}{2}\right) \hbar \omega 
    \end{aligned}
\end{equation}
$$

But information about $n$ and $\psi_{n}$ we still don't know. To get that we need to consider $a \psi_{n}$ and $a^\dagger \psi_{n}$. We said above the operator $a$ and $a^\dagger $ can raise/lower energy, now I will show you why and how does it change energy. 

First, we calculate the commuter of the two operators and number operator $N$ with $\left[a, a^\dagger \right] = 1$ :

$$
\begin{equation}
    \begin{aligned}
        \left[N, a\right] &= a^\dagger a a - a a^\dagger a = a^\dagger a a - \left(a^\dagger a + 1\right) a = -a, \\
        \left[N, a^\dagger \right] &= a^\dagger a a^\dagger  - a^\dagger  a^\dagger a = a^\dagger  a a^\dagger  - a^\dagger \left(a a^\dagger - 1\right) = a^\dagger.
    \end{aligned}
\end{equation}
$$

Then, if you want to know how operator changes state, you can select a known operator and it's known eigenstates, act the operator you want to know on the known eigenstates, then act the known operator again, to see the eigenvalues change, you can get some indication of how does it change the known eigenstates. So here we can do the operation as:

$$
\begin{equation}
    \begin{aligned}
        N a \psi_{n} = [a N + (-a)]\psi_{n} = a (N - 1) \psi_{n} = (n-1) a \psi_{n}
    \end{aligned}
\end{equation}
$$

It shows $a \psi_{n} \sim \psi_{n-1}$, because it will give the eigenvalue corresponding to $\psi_{n-1}$ when $N$ act on it. Similarly, we have $a^\dagger \psi_{n} \sim \psi_{n+1}$. If we change the operater $N$ to $H$,

$$
\begin{equation}
    \begin{aligned}
        H a \psi_{n} &= \left(\left(n + \frac{1}{2}\right) \hbar \omega - \hbar \omega\right) \psi_{n}, \\
        H a^\dagger \psi_{n} &= \left(\left(n + \frac{1}{2}\right) \hbar \omega + \hbar \omega\right) \psi_{n}
    \end{aligned}
\end{equation}
$$

Energy has been raised/lowered by acting the operator $a^\dagger $/$a$.