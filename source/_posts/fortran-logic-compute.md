---
title: Fortran语言学习——流程控制与逻辑运算
tags:
  - 编程
  - Fortran
date: 2021-07-07 22:20:40
index_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210707235432.png
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210707235432.png
categories:
- [笔记,编程,Fortran]
description: Fortran的流程判断,给自己看的
---

![Fortran](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210707235432.png)

{% note primary %}
我们假设大家都有一定的编程基础，至少知道编程过程中流程控制是什么意思（<span class="heimu">其实也没啥意思，就是条件语句之类的</span>）。另外把实际的例子的代码省去，这样更加精简的作为字典或者文档查询更加方便。
{% endnote %}

# 1.IF语句

首先第一个我们需要接触的就是if条件语句，在Fortran语言中一般这样写：
```Fortran
if (逻辑判断式) then
    ...
    ...
    ...
end if

```
举个书上的例子，我们写一个速度超过一百就会发出警报的简单程序：
```Fortran
if(speed>100)then
    ! speed > 100时才会执行下面的语句
    write(*,*)"Slow down."
end if
stop
```
注意该程序知识一部分而已，前面变量的申明还是要照样做的。另外除此之外还可以简写成如下的形式：
```Fortran
if (speed>100) write(*,*) "Slow down."
```

## 条件分支

除此之外呢，我们可能还需要设置不满足条件时应该执行的语句，或者是有其他很多种情况的分支，这个时候就需要这么写：

```Fortran
if (条件1) then ! 情况1
    ...
    ...
else if (条件2) then ! 情况2
    ...
    ...
else if (条件3) then ! 情况3
    ...
    ...
...
else ! 以上情况都不满足的情况
    ...
    ...
end if
```

## 逻辑判断符号以及集合判断符号

另外补充以下在Fortran中表示逻辑判断以及集合判断的方式:


代码 | 表示含义 
:-------:|:--------:
 `==` | 相等 
 `/=` | 不等于 
 `>` | 大于 
 `>=` | 大于等于 
 `<` | 小于 
 `<=` | 小于等于 
 `.and.` | 交集 
 `.or.` | 并集 
 `.not.` | 不成立 
 `.eqv.` | 逻辑运算相等 
 `.neqv.` | 逻辑运算不相等 


以上，逻辑判断的运算等级高于集合运算的等级，同时出现时先执行逻辑判断（大于小于等于之类的）的语句。

## 嵌套使用 

当存在if语句的嵌套使用时，可以这样：

```fortran
if (...) then ! 第一层
	if (...) then ! 第二层
		if (...) then ! 第三层主条件
			...
		else if (...) then ! 第三层次条件
			...
		else ! 第三层其余情况
			...
		end if ! 第三层结束
	end if ! 第二层结束
end if ! 第一层结束
```

# 2.浮点数以及字符的逻辑运算

## 浮点数的逻辑判断

我们知道，由于计算机运行方式以及内存情况的限制，当我们进行浮点数之间的计算时通常是带有误差的，比如：$a=\sqrt{b}^2-b = 0$在实际的运算过程中可能会出现$a$不等于0的情况，这是因为计算机在计算浮点数时的有效位数的问题造成的。举个例子，$\sqrt{3}$在计算时只能采用有限的位数来保存，这个时候就会出现误差，再将这个存在误差的数字作幂次运算，等到的结果必然不会是3，而是一个接近3的数字。

如果我们需要对类似这样的情况作出判断，（判断$\sqrt{b}^2-b$是否等于0），就需要对我们的结果预留出一些误差的空间。这样，我们可以把上面的过程写成如下的形式：

```fortran
program example
implicit none
	real :: b = 4.0
	real :: a
	real, parameter :: e = 0.0001 ! 表示误差的范围
	a = sqrt(b)**2-b
	
	if (abs(a-0.0) <= e) then
		write(*,*) "a等于0！"
	else
		write(*,*) "a不等于0！"
	end if

	stop
end
```

## 字符的逻辑判断

和Python一样，字符甚至字符串之间也是可以用来做逻辑判断的，这实际上使用的字符转换成ASCII码之后的数值进行的逻辑判断。比如说判断`'A' < 'a'`为`true`是因为a的ASCII码为97，A的ASCII码为65。

需要注意的是，当字符串作比较时，实际上比较的是第一个字符的ASCII码，如果第一个字符相同就比较第二个字符，依此类推。

# SELECT CASE语句

实际上，在我们需要使用多重判断时，有一种可以代替`IF ... ELSE IF ... `的语句，那就是SELECT　CASE语句，下面是该语句的用法：

```Fortran
select case(变量) !　这里的变量是指需要进行判断的变量
case (数值1)
...... ! 当变量的数值等于数值1时，就执行该语句
case (数值2)
...... ! 变量等于数值2时，执行该语句
...
case default
...... ! 默认情况下，即变量不等于任何数值时，执行该语句
end select
```

`slecet default`模块不是必要的，在`case`里面的数值设置可以设置成范围，即类似`2：5`表示2~5的数值范围，同时也支持类似`1，3，5`表示变量值等于三者中的任何一个时都会执行其所属的语句。

值得注意的是，使用`select case`语句会有一些限制：

1. 只能使用整数、字符、以及逻辑变量类型的变量，对于浮点数和复数就只能用`if ... else if `的结构；
2. 每一个case中所使用的数值必须是固定的常量，而不能是变量。

# 其他控制流程

## GOTO命令

实际上，GOTO语法是Fortran 77时代；留下来的“旧时代”的语法，一般不建议使用，因为它会破坏代码的结构，导致代码的阅读变得比较困难，但是某些上世纪写的程序中还会留有这样的结构，所以仍然需要了解。

在Fortran语言中，可以给每一行代码赋予一个特定的编号，利用GOTO命令就可以提供给程序员一个可以使程序任意跳跃到所赋值编号的那一行程序所在位置来执行的能力。

```Fortran
	  PROGRAM ex0514
	  IMPLICIT NONE
	  REAL height ! 记录身高
	  REAL weight ! 记录体重

	  WRITE(*,*) "height:"
	  READ (*,*)	height ! 读入身高
	  WRITE(*,*) "weight:"
	  READ (*,*)	weight ! 读入体重

	  IF ( weight > height-100 ) GOTO 200
	  ! 上面不成立，没有跳到200才会执行这里
100   WRITE(*,*) "Under control."
	  GOTO 300 ! 下一行不能执行所以要跳到300 .
200	  WRITE(*,*) "Too fat!"

300   STOP
END
```

如果GOTO结构可以用得比较巧妙，这样的话可以利用`IF`+`GOTO`结构来写一个类似循环的过程，或者利用类似`GOTO(10,20,30) a`（其中a表示变量，用以指代前面括号中的列表的序列切片，即1表示10，2表示20，3表示30）的结构进行有选择的跳转。<span class = "heimu">看不懂也没关系，反正就是不建议使用就对了</span>

{% note danger %}
最后再强调一遍，虽然GOTO结构看起来很强大，但是并不建议使用，因为这会使得代码的结构混乱，不便于阅读和维护。
{% endnote %}

## PAUSE, CONTINUE, STOP

PAUSE 暂停，表示程序执行到该代码之后会暂停，知道用户按下Enter键之后程序才会继续执行。可以应用到程序需要做很多页的输出时，在每一页设置暂停，直到用户看完每一页的内容之后再按Enter键进行翻页。

CONTINUE 继续，没什么用，Fortran 90之后就不怎么使用了，基本上可以不管，因为它没有什么实际意义，只是为了方便阅读而已。

STOP 停止，很明显，执行完该代码程序就停止了，可以用来作为程序得到不合理的输入时将程序终止。

---

研究生通知书到了，趁这里没人，独自高兴一波hahaha！
![1625667151163](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/1625667151163.jpg)