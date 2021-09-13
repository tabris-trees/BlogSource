---
title: fortran-function
tags:
- 编程
- Fortran
---

{% note primary %}
程序中在不同地方常常需要重复使用某一个功能或者某一段程序代码，这个需求可以利用“函数”来实现。函数是“自定义函数”和“子程序”的统称。
{% endnote %}

# 子程序🎃

## 主体结构

子程序可以用来独立出某一段需要重复使用的代码，供其他地方调用。通常使用关键字`CALL`来进行调用。通常采用以下的结构写子程序：

```fortran
program main
    ...
    ... ! 主程序代码
    call sub1() ! 调用子程序1
    call sub2() ! 调用子程序2
    ...
end program

subroutine sub1()
    ...
    ... ! 子程序1代码
    ...
    return ! return代表子程序的运行停止，类似于主程序的stop，可以省略
end subroutine

subroutine sub2()
    ...
    ... ! 子程序2代码
    ...
end subroutine
```

子程序可以在任何地方被调用，甚至是自己调用自己，这就是所谓的**递归**。

## 变量的使用

变量对于一个程序来说尤为重要，在Fortran中，变量的使用相对于Python这样的新高级语言显得十分的麻烦，所以需要专门花时间讲清楚变量在子程序中的使用。

基本的结构可以按照以下的形式来进行操作：

```fortran
program main
    ...
    integer :: a,b ! 主程序中作变量声明
    call sub(a,b) ! 传递参数
end

subroutine sub(first,second) ! 设置参数
    integer :: first,second ! 子程序中作变量声明
    ... ! 子程序操作代码
end subroutine sub
```

可以看到这个用法和Python有着很大程度的不同，这是因为主程序与子程序之间传递参数的方式在不同的程序语言之间是不同的：Fortran中使用的是*传址调用*，C语言中使用*传值调用*，Python中使用的是混合方法，即对于可变对象使用传址调用，对不可变对象使用传值调用。

我们这里主要关注传址调用，意思是说经过传递的变量之间会使用同一处内存地址，所以我们可以利用传递在子程序中改变主程序的变量（**这个改变在主程序中也会得到反应**）。<span style='background: yellow;'>但是，值得注意的是，子程序和主程序中没有经过调用的变量之间一定是独立的，相互之间改变值是不会有影响的（除非是使用*全局变量*的形式）。</span>

---

# 自定义函数🍉

自定义函数和子程序大体上是相同的，除了以下两点：

- 调用自定义函数前需要先声明
- 自定义函数执行后会返回一个值（这一点在子程序中是不一定的，<span calss="heimu">也许我们可以说，Python的函数结构是将这两者合二为一来使用了</span>）

其主要的结构可以按照如下的形式来使用：

```fortran
program main
    real :: a,b
    real,external func1 ! external是为了声明func1作为一个函数存在
    ! 意思是自定义函数要返回一个数值，我们将这个数值的类型声明为某种特殊的变量
    ... func1(a,b) ... ! 调用函数的代码部分
    ...
end

function func1(first,second)
    real :: first,second
    real :: func1_result ! 这里是声明函数返回的数值的类型
    ... ! 函数的内部代码
    ...
    return
end 
```

{% note success %}
上述过程中已经包括了如何在函数中使用变量。同时还有一个不成文的“规定”：“传递给函数的变量，我们只需要使用或者读取它的数值就好了，不要去改变它的数据。”根据数学上函数的定义，我们传入的是“自变量”，输出的是“应变量”，自变量自然不可以随便改写值的大小。
{% endnote %}

---

# 全局变量（COMMON）🍎

`COMMON`是Fortran 77中使用“全局变量”的办法，用来定义一块共享的内存空间，其一般的结构如下：

```fortran
program main
implicit none
    integer a,b,c,d,e,f
    common a,b,c,d,e,f ! 将变量放入common空间中，以下类似
    common /group1/ first ! 对全局变量进行分组 分组1
    common /group2/ second ! 对全局变量进行分组 分组2
    ...
    ...
end program main

subroutine sub()
implicit none
    integer n1,n2,n3,n4,n5,n6
    common n1,n2,n3,n4,n5,n6 ! 按照顺序分别共享a,b,c,d,e,f的内存地址
    ! 这样会有类似于只需要取用第六个变量f的地址，但仍然要在f前设置五个用不着的变量来占位
    ! 为了避免上述问题，可以对全局变量进行分组
    common /group1/ num1 ! 取用group1中的first进行共享地址
    common /group2/ num2 ! 取用group2中的second进行共享地址
    ...
    ...
end subroutine sub

block data name ! name可以省略
    implicit none ! 最好不要省略这一行
    integer ... ! 声明变量
    real ...

    common ... ! 将变量放入common空间中，并进行赋值
    common /group1/ ...

    data var1,var2... ! 赋予初始值
    ...
    ...
end block data name ! 和此前一样，可以只写end或者end block data
```

{% note danger %}
需要注意的是：COMMON变量不能在主程序或者子程序中使用`DATA`来进行初始值的赋予，而是在`BLOCK DATA`中使用`DATA`命令来进行。另外全局变量不能声明常量，因此不能出现`PARAMETER`命令。

当然，任何时候都不要忘记变量的类型相互之间是否匹配！！！
{% endnote %}

---

# 函数中的变量🍑

这里的函数包括了自定义函数和子程序两种类似的结构，这一节主要是参数传递过程中的注意事项和部分特殊的参数传递过程。所谓注意事项，最重要的一点无非是要注意“<span style="background: yellow;">参数类型是否正确</span>”

## 数组参数

[数组](https://www.tabirstrees.top/2021/09/03/fortran-array/)中我们提到，数组类型的变量在内存中占用的是一整块连续空间，但在参数的传递时，实际传递时数组中某一个参数的内存地址，因此我们会有一些比较特殊的用法：

```fortran
program ex0816
implicit none
  integer :: a(5) = (/ 1,2,3,4,5 /)
  call ShowOne(a)   ! 传入a, 也就是传入数组a第1个元素的内存地址
  call ShowArray5(a)  
  call ShowArray3(a)  
  call ShowArray3( a(2) ) ! 传入a(2), 也就是传入数组a第2个元素的内存地址
  call ShowArray2X2(a)  
  stop
end

subroutine ShowOne(num)
implicit none
  integer :: num(1) ! 只取出参数地址中的第1个数字
  write(*,*) num
  return
end

subroutine ShowArray5(num)
implicit none
  integer :: num(5) ! 取出参数地址中的前5个数字,当成数组来使用
  write(*,*) num
  return
end

subroutine ShowArray3(num)
implicit none
  integer :: num(3) ! 取出参数地址中的前3个数字,当成数组来使用
  write(*,*) num
  return
end

subroutine ShowArray2X2(num)
implicit none
  integer :: num(2,2) ! 取出参数地址中的前4个数字,当成2X2数组来使用
  write(*,*) num(2,1), num(2,2)
  return
end
```

执行结果如下：

```terminal
           1
           1           2           3           4           5
           1           2           3
           2           3           4
           2           4
```

以上，自行体会。

另外，我们也有提到，数组变量在声明时需要指定其大小（使用一个常数），但是在函数中，如果数组是用来接收的参数时可以用变量来进行指定，甚至是不指定（用通配符`*`代替）。<span class="heimu">实际上，我们用来传递的变量早在数组进入子程序之前就已经分配好了内存空间了，因为使用*传址调用*时，在主程序中我们也需要定义一个使用同一个内存地址的变量。在函数中赋值数组的大小只是方便检查，不会去重新分配内存，所以可以省略。</span>同样的道理，对于任何需要指定大小或者长度的变量都有类似的情况存在。

## 变量的生存周期

函数中的变量只能在函数中存在（与主程序是独立的，且不包含所输入的参数），因此，通常情况下他们所能够存在的时间只有在这个子程序被执行的这一段时间。子程序结束后，他们就“死亡”了，所保存的数据也会跟着被释放掉。

在声明中加入`save`命令可以拯救这些变量、增加变量的生存周期、保留数据：

```fortran
integer,save :: count = 1
```

## 传递函数

函数的参数在传递时，除了可以出传送数字、字符等等数据外，还可以直接传递一个函数名称。这里涉及到前面提到的某个关键字`external`以及一个新的关键字`intrinsic`。只有在函数的声明中出现这两个关键字时才能将函数当作参数进行传递：

```fortran
program main
implicit none
    real,external :: func ! 声明一个外接（自定义）函数，一般情况下external可以省略
    real,intrinsic :: sin ! 声明一个Fortran内置的函数，一般情况下这一行都可以省略
    external :: sub ! 声明一个子程序，一般情况可省略

    call Execfunc(func) ! 传递一个external函数作为参数
    call Execfunc(sin) ! 传递一个intrinsic函数作为参数
    call Execfunc(sub) ! 传递一个子程序
end

subroutine Execfunc(f)
    implicit none
    real,external :: f ! 声明f是一个函数(或子程序)
    ...
    return
end

subroutine sub(var1)
    implicit none
    real :: var1 ! 正常的参数
    ...
end

function func(var2)
    implicit none
    real :: var2 ! 正常的参数
    ...
    return
end
```

---

# 参数的特殊使用方法🍇

## 参数属性

某些时候，我们希望我们传递进来的参数可以只读，它的值不能在函数中改变；或者某个参数一定要在函数中被重新设置数值。这种时候我们可以设置参数的属性，如下：

```fortran
subroutine sub(var1,var2)
    implicit none
    real,intent(in) :: var1 ! 声明（指定）var1参数是只读的
    real,intent(out) :: var2 ! 声明var2参数是需要被重写的
    ...
end
```

## 函数的使用接口（INTERFACE）

INTERFACE是主程序中的一段程序模块，用来清除说明函数所要调用以及返回的参数类型的“使用接口”。一般情况是不需要使用的，但在以下几种情况中是必要的：

- 函数返回值是数组时
- 指定参数位置来传递参数时
- 所调用的函数参数数目不固定时
- 输入指标参数时
- 函数返回值是指针时

之后会陆续讲到这几种情况的具体内容，先来看看你`INTERFACE`模块的基本结构：

```fortran
Interface
    function func_name
        implicit none
        real :: ...
        integer :: ... ! 该处只能说明参数和返回值的类型
    end [function [func_name]]

    subroutine sub_name
        implicit none
        integer :: ... ! 说明参数类型
    end [subroutine [sub_name]]
end [interface]
```

使用函数的“使用接口”是一件很麻烦的事情，如果需要使用的函数很多，整个代码看起来非常烦杂。此外你需要在每一个你会使用到相关函数（涉及到以上五种情况）的子程序或者主程序中写清楚该函数的`interface`才可以。下一节将会介绍module的使用，其可以较少这个麻烦。

## 不定个数的参数传递

一般来说，函数参数的个数都是由固定数目的，但在Fortran 90中可以使用`OPTIONAL`命令使某些参数变成可以“省略”的。

```fortran
integer,optional :: var
! 在子程序（函数）以及主程序的interface模块中使用
! optional命令进行声明表示参数var可以省略不传入
```

## 改变参数传递位置的方法

这一点类似Python，当你按照变量的名称进行传递参数时，是可以不按照相应位置进行传入的：

```fortran
subroutine sub(var1,var2,var3)
    ...
    ...
end

! 在调用该子程序时,按照变量名称传递参数
call sub(var3=3,var2=2,var1=1)
! 其等价于：
call sub(1,2,3)
```

{% note seccess %}
也许有时候我们需要设置函数参数的默认值，在Fortran中似乎没有什么好用的命令，但是通过在子程序中设置`if`结构依然可以做到相关的要求。即：做一个有无输入的逻辑判断，没有外界输入时就程序内部赋予一个默认值。
{% endnote %}

---

# 特殊的函数类型🍌

{% note primary %}
Fortran 90中，除了一般使用的正常函数之外，还可以特别指定成`RECURSIVE`、`PURE`、`ELEMENTAL`三种类型之一。`RECURSIVE`是让函数自己调用自己，也就是“递归”；后两者是用来做并行处理以及设置数组时使用的。
{% endnote %}

## 递归（`RECURSIVE`）

能够递归的函数需要有一个必要条件，<span style='background: yellow;'>递归函数每次被调用执行时，函数中所声明的局部变量（非传递进来的参数或者没有做`save`的变量）都会使用不同的内存地址</span>。简单的说就是每次调用函数时变量都是独立存在的。

```fortran
recursive integer function func(var) result(ans)
! 用recursive表示该函数可以递归
! result（ans）表示该函数的返回值用ans变量代替原来的fact
! result对于每一个自定义函数都可以使用，但是递归函数必须要有！
```

在不设置`recursive`的时候，也可以用一种“间接递归”的方法来完成递归，也就是现在函数中调用另外一个函数，再在这另一个函数中调用自己，但是这种方法在某些编译器环境下会出现错误，因为它会把每次调用函数的局部变量放在同一个内存地址。

## 内部函数

Fortran 90可以定义某些函数只能在特定的函数中被调用，其基本结构为：

```Fortran
program main \ subroutine sub \ function func
    ...
    ...
    contains ! contains后面开始写局部函数
        subroutine localsub ! 这里的函数只能在包含它的函数中被调用
            ...
            ...
        end subroutine

        function localfunc ! 同样只能在包含它的函数中被调用
            ...
            ...
        end function
end
```

## `PURE`函数

在函数声明前加上`pure`代码即可，但是使用pure函数有诸多限制：
  
- pure函数的参数必须都是只读`intent(in)`属性；
- pure子程序的每一个参数都要赋予属性；
- pure函数不能使用`save`；
- pure函数中所包含的内部函数也必须全都是pure函数
- pure函数中不能使用`stop` \ `print`及跟输入输出相关的命令（`read` \ `write` \ `open` \ `close` \ `backspace` \ `endfile` \ `rewind` \ `inquire`等等）
- pure函数只能读取不能改变全部变量的值

上面的这些限制，全部都是为防止在并行计算时出现一些奇怪的结果。比如说，同时执行A、B函数，两者都有在屏幕上输出信息的功能，这个时候就可能出现两个函数的结果混合在一起的错误结果。

## `ELEMENTAL`函数

使用方法和pure函数相同，也可以用来做并行计算，限制也与pure函数相同，除此之外它还多了一个功能，对数组进行设置（同时也多了一个限制：<span style='background: yellow;'>参数不能是数组</span>。），下面举个栗子🌰：

```fortran
integer a(10)
a=func(a)
! 如果func是一个elemental函数，这段程序与下面的循环等价：
do i=1,10
    a(i) = func(a(i))
end do
```

---

# MODULE🍒

## 主要结构

`module`可以用来封装程序模块，通常用来把程序中具备相关功能的函数和变量封装到一起。其语法如下：

```fortran
module module_name ! 对模块的定义必须放到最前面
    ...
    ...
end [module [module_name]]

program main
    use module_name ! 使用前面定义的模块
    implicit none
    ...
    ...
end

subroutine sub
    use module_name
    implicit none
    ...
    ...
end
```

上面的结构是在同一个文件中使用module模块，一般来说我们都是在一个代码文件中定义好所需要使用的函数和子程序，再在另一个文件中使用，这就类似于Python中的`import`模块的使用，这会在后面讲到。

## MODULE中的函数

在MODULE中编写函数，其结构如下：

```fortran
module module_name
    ... ! 先写声明相关程序代码
    ...
contains ! contains 后开始写函数
    subroutine sub_name
        ...
        ...
    end subroutine [sub_name] ! subroutine 不能省

    function func_name
        ...
        ...
    end function [func_name] ! function 不能省
end [module]
```

还有一个比较方便的一点是：在同一个MODULE中，函数可以直接使用其他地方所声明的变量：

```Fortran
module tool
    implicit none
    integer :: a ! 此处声明了a变量
    ...
    ...
contains
    subroutine add()
        implicit none
        a = a+1
    ...
    ......
```

## 一些不太常见的功能

### `ENTRY`

`ENTRY`：为函数提供一个新的入口，举个栗子🌰:

```fortran
program main
    implicit none

    call sub
    call mid

    stop
end

subroutine sub()
    implicit none

    write(*,*) "hello."
    entry mid() ! 提供另一个入口
    write(*,*) "Good morning!"

    return
end
```

其输出为：

```terminal
 hello.
 Good morning!
 Good morning!
```

### `RETURN`

特殊的`RETURN`：提供额外的折返点，举个栗子🌰：

```fortran
program main
    implicit none
    real num

    write(*,*)"please input a number："
    read(*,*)num
    call sub_return(num,*1,*2) ! 具体的折返点输入形式：‘*’ + 行代码
    write(*,*)"Default return"
    stop
    1 write(*,*)"Return 1"
    stop
    2 write(*,*)"Return 2"
    stop
end

subroutine sub_return(num,*,*) ! 后面的‘*’号表示输入的折返点参数，几个‘*’表示几个折返点
    implicit none
    real num

    if (num >= 1) then
        write(*,*)">=0"
        return ! 返回到默认的折返点
    else if (num < -1) then
        write(*,*) "<-1"
        return 1 ! 返回到特定的第一个折返点（行代码为1的位置）
    else
        write(*,*) "-1<=num<0"
        return 2 ! 返回到特定的第二个折返点（行代码为2的位置）
    end if
end subroutine
```

分别运行三次，输入不同的值，其运行结果为：

```terminal
>>>
 please input a number：
2
 >=0
 Default return
>>>
 please input a number：
-3
 <-1
 Return 1
>>>
 please input a number：
-0.5
 -1<=num<0
 Return 2
```

---

# 使用多个文件🥝

{% note primary %}
通常情况下，我们会把具有相关功能的函数编写到不同的文件中，这样做有以下几个好处：

- 独立文件中的函数，可以拿给其他的程序使用；
- 减少单个程序中的代码（此时与`MODULE`类似）；
- 可以加快编译速度，修改其中一个文件时，编译器只需要重新编译这一个文件就好了（这一点要和编译器的使用结合起来）。

{% endnote %}

## `INCLUDE`

`INCLUDE`命令可以在程序代码中插入另一个文件中的内容。现在假如我有两个文件：“mian.f90”以及“sub.f90”，后者中含有前者所需要使用的子程序代码，我们只需要在前者的代码中（**任何位置**）加入：

```Fortran
include 'sub.f90'
```

这样结果就相当于两个文件中的代码是写在同一个文件中的。

## 函数库

具有特殊功能的一组函数，可以编译成"*.LIB"来给其他人使用。这样的文件经过编译，没有办法读出里面的初始程序代码，但可以通过`use *.LIB`的方法来使用其中的各种函数（与Python的函数库类似）。

---

# 写在最后🍈

{% note seccess %}
五百多行，四天时间，这大概是我写的最多的一次了

![我顶得住](https://file.tabirstrees.top/blogfile/EMO-wodingdezhu.jpg)
{% endnote %}