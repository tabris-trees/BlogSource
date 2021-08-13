---
title: Fortran语言学习——循环
tags:
  - Fortran
  - 编程
  - 循环语法
date: 2021-08-12 10:19:52
index_img: https://i.loli.net/2021/08/12/EL1VYP8nebFrvdS.png
categories:
- [笔记,编程,Fortran]
descripte: 在Fortran中使用循环语法
---

![logo-fortran](https://file.tabirstrees.top/blogfile/logo-fortran.png)

# 🎉DO结构

![DO结构](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210710211357.png)

在我们的程序编写过程中，经常会遇到需要将一部分代码重复很多遍的情况，为了使得代码简单提高可读性，可以用循环结构来进行处理，在Fortran中最常见的循环结构就是如上图所示的DO循环.

DO循环由计数器（用来决定执行循环次数的变量）的初值，终值以及增量三个部分组成（Fortran 90之后），每进行一次循环，计数器就会累加上前面设置的增量，当计数器超过终值时循环就会结束.

计数器的各项设定既可以用常量也可以用变量指定.下面是使用DO循环的一个例子（计算2+4+6+8+10）

```Fortran
program ex0602
implicit none
    integer, parameter : : limit=10 !计数器的上限
    integer counter !计数器
    integer :: ans = 0 !拿来累加使用
    do counter=2, limit ,2
        ans = ans + counter
    end do
    write(*,*) ans
    stop
end
```

对于Fortran 77及以前版本的代码来说，没有直接使用`end do`来结束循环的说法（但是仍然有人在使用），而必须要在DO后面写清楚循环到哪一行结束.即`do 结束的行代码, 计数器变量初值, 终值, 增量`，同时在循环结束的那一行设置好行代码（通常来说这一行的代码不需要可执行的意义，正好可以用我们前一节学习的`continue`命令.）.

当结构中的**增量**使用**负数**时，终值需要比初值小，并且终止条件会变成计数器的值比终值小时就会结束循环.

同时，结构中初值，终值，增量等如果使用变量指定时，只会在循环开始时进行一次读取，在循环过程中改变变量的值对循环是不会产生影响的，例如：

```Fortran
s=1
e=10
inc=1
do i=s, e, inc
    s=5
    e=1
    inc=-1
    write(*,*) i
end do
```

# 🎉DO WHILE 结构

某些时候我们会遇到更加复杂的情况，循环变量的增加可能不是线性的，或者需要在循环过程中根据情况特别指定增加方式，这个时候我们可以使用一个逻辑判断来进行循环的指定（当该判断的逻辑值为1时则循环，逻辑值为0时停止循环，即直到不满足条件为止一直循环下去）：

```Fortran
do whilw (逻辑运算) ! 逻辑运算成立时,会一直重复执行该循环
    ...
    ...
end do ! 结束循环的命令
```
相对于`DO`结构的循环而言,该结构最大的优势就是可以在循环过程中改变循环变量的值,这样就适应了更加复杂的情况.

# 🎊循环的流程控制

主要是介绍两个与循环有关的命令:`CYCLE`,`EXIT`,类似于Python中的`continue`以及`break`.

## 🎨CYCLE

`CYCLE`命令可以直接跳过循环的某一个部分,也就是说`CYCLE`后面的代码将会不被执行而直接跳入到下一个循环中.比如:

```Fortran
do floor=1,9,1
    if (floor = 4) cycle
    write(*,*) floor
end do
```
执行结构将会列出从1到9的数字(除了4以外),因为当**floor=4**时被`cycle`语句跳过执行`write(*,*) floor`.

## 🎨EXIT

使用`EXIT`命令将跳出整个循环,也就是说当出现`EXIT`后循环将不再执行,通常出现在你并不知道需要执行多少次循环,于是设置为永久循环的情况:

```Fortran
do while( .true. ) ! 如果没有exit命令程序将永远执行下去
    write(*,*) 'weight:'
    read(*,*) guess
    if (abs(guess-weight) < error ) exit
end do !前面已经预先声明好了以上出现的三个变量.
```

以上,当`guess`与`weight`的值相差在误差范围内时,循环结束.

---
{% note success %}
在Fortran中还可以为循环署名,这样可以明确最后的`end do`命令是对哪一个循环执行的:
```Fortran
outter: do i=1,3 ! 该循环署名为outter
    inner: do j=1,3 ! 该循环署名为inner
        write(*,"('(',i2,',',i2,')')") i,j
    end do inner ! 结束内循环inner
end do outter ! 结束外循环outter
```
{% endnote %}