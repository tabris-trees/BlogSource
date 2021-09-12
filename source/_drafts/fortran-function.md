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

