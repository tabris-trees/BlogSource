---
title: Fortran语言学习——循环
tags:
- Fortran
- 编程
- 循环语法
---

![logo-fortran](https://file.tabirstrees.top/blogfile/logo-fortran.png)

# DO结构

![DO结构](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210710211357.png)

在我们的程序编写过程中，经常会遇到需要将一部分代码重复很多遍的情况，为了使得代码简单提高可读性，可以用循环结构来进行处理，在Fortran中最常见的循环结构就是如上图所示的DO循环。

DO循环由计数器（用来决定执行循环次数的变量）的初值，终值以及增量三个部分组成（Fortran 90之后），每进行一次循环，计数器就会累加上前面设置的增量，当计数器超过终值时循环就会结束。

计数器的各项设定既可以用常量也可以用变量指定。下面是使用DO循环的一个例子（计算2+4+6+8+10）

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

对于Fortran 77及以前版本的代码来说，没有直接使用`end do`来结束循环的说法（但是仍然有人在使用），而必须要在DO后面写清楚循环到哪一行结束。即`do 结束的行代码, 计数器变量初值, 终值, 增量`，同时在循环结束的那一行设置好行代码（通常来说这一行的代码不需要可执行的意义，正好可以用我们前一节学习的`continue`命令。）。

当结构中的**增量**使用**负数**时，终值需要比初值小，并且终止条件会变成计数器的值比终值小时就会结束循环。

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

