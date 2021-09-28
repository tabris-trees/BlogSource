---
title: Fortran语言学习——文件
tags:
  - 编程
  - Fortran
date: 2021-09-28 16:21:09
index_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210707235432.png
banner_img:
categories: [笔记,编程,Fortran]
descripte: 在Fortran中使用文件！！！
---


{% note primary %}
计算机有两项功能，一项是计算、处理数据；一项是保存数据。前面的内容都是在讨论如何处理数据，现在来讨论如何保存数据。

数据的保存主要是依赖于文件，程序将数据写入文件，就可以将这些数据长久的保存，直到文件被更改或者销毁。
{% endnote %}

# 文件读取的概念🍉

Fortran中文件读取有“顺序读取”和“直接读取”两种：

1. 顺序读取：指的是读取文件时按照文件中数据的顺序从头开始，依次往下读取，如同听录音带一样。这是最简单的方法，足以应付绝大多数情况；
2. 直接读取：指读取文件时可以任意跳到文件的任何一个位置开始读写，类似于DVD，可以直接欣赏某一个部分。

保存文件同样可以有两种方法：

1. 文本文件：所有的数据都是容易阅读的字符或者符号，可以使用文本编辑器打开；
2. 二进制文件：数据被保存为二进制代码（全是数字0和1组成），需要专门的软件打开。

相对来说，二进制的文件读取速度更快，它的保存格式与数据在内存中的格式是一致的，不像文本格式需要经过转换；其次，二进制的文件更加省空间，很简单，计算机底层的结构就是二进制，自然具有各方面的优势。

---

# 文件的操作🍈

{% note primary %}
该部分的内容很多，只需要记住常见命令即可，很多命令基本不会用到。
{% endnote %}

## `OPEN`的使用

`open`的使用与`write(*,*)`以及`read(*,*)`中的第一个*号（输入\输出的位置，默认是键盘\屏幕）有关：

```Fortran
open(unit=10,file='hello.txt')
! unit=N用来给后面的文件指定一个代码（N），file则表示打开的文件
! 文件不存在时则创建一个新文件
write(10,*) "hello,World!"
! 如此一来，"hello,World!"这个字符串就被保存到文件hello.txt中了
```

`open`的详细参数非常之多，这里列出比较常见的：

1. unit=number，number必须是一个正整数，可以是变量，尽量不要用1，2，5，6（<span style='background: yellow;'>1，5是默认输入的位置，即键盘；2，6是默认输出的位置，即屏幕</span>）；
2. file='filename'，很简单，文件名，注意要符合操作系统的文件命名习惯；
3. form='formatted'（ **'文本格式'** 保存）\'unformatted'（ **'二进制格式'** 保存）,默认'**文本格式**'；
4. status='new'（打开新文件）\'old'（打开旧文件）\'replace'（文件若已经存在，则替换原文件，不存在则新建）\'scratch'（暂时文件，此时不用指定文件名，程序结束文件会被自动删除）\'unkown'（由编译器自定义，一般相当于'replace'），默认'unkown'；
5. access='sequential'（ **'顺序读取'** 文件）\'direct'（ **'直接读取'** 文件），默认 **'顺序读取'** ；
6. err=label，文件打开错误时，程序会跳转到label所指的行代码继续执行；
7. iostat=var，将文件打开的状态赋值给var变量（这意味着要对其进行声明）：

      - var > 0 : 读取操作发生错误；
      - var < 0 : 文件终了；
      - var = 0 : 文件读取正常。

1. action='read'（**只读**）\'write'（**只写**）\'readwrite'（**读写皆可**，默认）。

## `WRITE`，`READ`的使用

`read`和`write`的详细是类似的，所以放到一起介绍：

1. unit=number，和`open`的`unit`联系起来，用来指定输出\输入的位置；
2. fmt=format，指定输入输出的格式；
3. nml=namelist，指定读写某个namelist的内容（namelist的含义需要到后面介绍）；
4. rec=record，在直接读取文件中，设置索要读写的文件模块的位置；
5. iostat\err\end，用法和`open`一样；
6. advance=yes（默认状态，每读写一次会向下移动一行）\no（暂停自动换行）。

## 查询文件的状态`INQUIRE`

`inquire`命令主要用来查询文件此时的状态，其同样支持很多参数：

1. UNIT=number，文件代号；
2. FILE=filename，文件名；
3. IOSTAT=stat，查询文件读取情况，会设置一个整数给后面的变量：
   
      - stat>0   文件读取操作错误
      - stat=0   文件读取操作正常
      - stat<0   文件终了

1. ERR=errlabel，发生错误时会转移到复制的代码行继续执行程序；
2. EXIST=exist，检查文件是否存在，返回布尔变量，真表示存在，假值表示不存在；
3. OPEND=opened，检查文件是否用已经用open打开，返回布尔变量，真表示已经打开，假表示尚未打开；
4. NUMBER=number，用文件名来查询这个文件所给定的代码；
5. NAMED=named，查询文件是否取了名字，也就是检查文件是否为临时保存盘，返回值为逻辑数；
6. ACCESS=access，检查文件的读取格式，返回一个字符串；
7.  SEQUENTIAL=sequential，查看文件是否使用顺序格式，会返回一个字符串；
8.  DIRECT＝direct，查看文件是否使用直接格式，会返回一个字符串；
9.  FORM=form，查看文件的保存方法，返回字符串；
10. FORMATTED=fmt，查看文件是否是文本文件，返回字符串；
11. UNFORMATTED=fmt，查看文件是否是二进制文件，返回字符串；
12. RECL=length，返回open文件时recl栏的设置值
13. NEXTREC=nr，返回下一次文件读写的位置；
14. BLANK=blank，返回值是字符串，用来查看open文件时的blank参数所给定的字符串值；
    
**以下是fortran 90的添加功能：**

18. POSITION=position，返回打开文件时position字段所给定的字符串, 可能是'REWIND','APPEND','ASIS', 'UNDEFINED'
19. ACTION=action，返回打开文件时action 字段所赋值的字符串，可能是'READ', 'WRITE','READWRITE'。
20. READ=read,返回字符串，检查文件是否为只读文件；
21. WRITE=write，返回一个字符串，检查文件是否可写入；
22. READWRITE=readwrite 返回一个字符串，检查文件是否可以同时读及写；
23. DELIM=delim，返回打开文件时，DELIM字段所设置的字符串，返回值可以是：'APOSTROPHE', 'QUOTE', 'NONE', 'UNDEFINED'；
24. PAD=pad，返回打开文件时PAD字段所设置的字符串，返回值可以是：'YES', 'NO'。

**其他文件运行命令：**

1. BACKSPACE(UNIT=number, ERR=errlabel, IOSTAT=iostat)，把文件读写位置退回一步；
2. ENDFILE(UNNIT=number, ERR=errlabel, IOSTAT=iostat)，使用这个命令会把目前文件的读写位置变成文件的结尾；
3. REWIND(UNIT=number, ERR=errlabel, IOSTAT=iostat)，把文件的读写位置倒回到文件开头；
4. CLOSE(UNIT=number, STATUS=string, ERR=errlabel, IOSTAT=)，把文件关闭，不要进行读写操作；
   
      - STAT='KEEP'      会在文件关闭后，保留这个文件。是默认状态。
      - STAT='DELETE'    在文件关闭后，消除这个文件。

{% note danger %}
- 程序结束时候会自动关闭文件，不过最好要养成自己关闭文件的习惯。
- 在读文件的时候要懂得略掉一些没有必要的数据，如文件中的注释行。
- 自由格式的数据文件读取（可以先读入前面的判断字符，结合select case或其他方法判断读入的数据）在open,read,write时使用不同的unit值，就可以打开多个文件。最好不要同时打开很多个文件。
{% endnote %}

---

# 读取文件方式的操作🍇

顺序文件在读写时，只能从头开始一步一步向下进行。改变文件读写位置时，只能一步一步地进退，或者直接移回文件开头。

直接读取文件的意思是把文件的空间、内容事先分区成好几个同样大小的小模块，这些模块会自动按照顺序编号，读取文件时，要先赋值文件读写位置在第几个模块（`read`命令中的`rec`参数）

---

# 二进制文件的操作🍒

二进制文件由于是按照计算机内存保存数据的方式对数据进行保存的，所以会存在和文本文件字符数不一致的问题：也就是`open`命令中`recl`（表示输出长度）所设置的整数 n 的值所代表的大小会因为编辑器的不同而不同，不过都是可以经过设置而改变的。

另外，二进制文件通常是一串紧密的数字，也就没有必要为了增加可读性而在数据之间使用区分符号，因为二进制文件没有可读性可言。

{% note success %}
二进制文件相对于文本文件来说不会存在数据损失的情况（主要是在保存数字时），所以当需要存放“**精确**”且“**大量**”的数据时建议使用二进制进行保存
{% endnote %}

---

# Internal File（内部文件）🥥

所谓内部文件就是<span style='background: yellow;'>使用写入文件的方法，把数据写到一个字符串变量中</span>。举个栗子🌰：

```fortran
a=2
b=3
character (len=20) :: string
write (unit=string, fmt="(I2,'+',I2,'=',I2)") a, b, a+b !把字符串变量当作输出的目的。
write(*, *) string
```

结果是: 
         
```terminal
2+ 3= 5
```

还可以经过`read`命令从字符串读入数据：

```fortran
integer :: a
character (len=20) :: string="123"
read(string, *) a
write(*, *) a
```

在某些情况下使用内部文件来设置数据有十分必要的好处：

使用`read`命令从键盘输入数据时，如果用户输入错误的数据，会导致死机。比如如需要输入整数时却输入英文字母，就可能会死机。比较好的处理办法是，程序先暂时把数据当作字符串读入，检查字符串中是否含有不合理的字符，如果字符串中都是0～9的数字字符，就把字符串转成整数，不然就请用户在输入一次。

另外，内部文件还可应用在动态改变输出格式，输出格式可以事先存放在字符串中，程序进行时，动态改变字符串内容就可以改变输出格式。

---

# `NAMELIST`🍓

`NAMELIST`是一种特殊的输入输出方法，可以把一组相关变量封装到一起，输入/输出变量时是需要在`read`/`write`的`nml`字段中设置需要使用哪一个 namelist 即可。其使用方法类似于变量，需要做声明：

```Fortran
namelist /nl_name/ var1,var2,...
! 使用namelist必须要对其取一个名字
write(*,nml=nl_name) ! 输出nl_name这个 namelist
```

输出 namelist 时不能带有格式，因为其格式在编译器中已经设置好了，由编译器决定，一般来说是：

```terminal
&nl_name （&符号 + namelist的名字）
A       =           1,  （输出变量的名称、等号、内容）
B       =           2,  （变量之间用逗号或者空格进行分隔）
C       =           3
/  （最后用除号结束）
```

输入时也要按照类似的格式进行输入：

```terminal
&nl_name a=1 b=2 c=3 /
```

输入时可以不输入所有的变量，也可以不按照顺序输入变量，甚至可以重复输入变量的值（以最后一次输入的值为准）。