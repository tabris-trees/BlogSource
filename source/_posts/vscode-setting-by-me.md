---
date: 2024-10-12 18:32:18
title: vscode 配置过程记录
cover: 
tags:
- vscode
- 环境配置
categories: 
- [工作, 工具配置, 编辑器]
description: 我自己的 vscode 配置过程的记录，方便自己回忆查找，也为大家作个参考。
---

# 终端美化

{% note info  %}
vscode 原本的终端平平无奇，总觉得不是很顺眼，因此想着用 [`oh-my-posh`](https://ohmyposh.dev/) 进行美化一下。

主要参考连接：[美化你的 Windows Terminal (oh-my-posh)](https://medium.com/@weiyun0912/%E7%BE%8E%E5%8C%96%E4%BD%A0%E7%9A%84-windows-terminal-oh-my-posh-7f150d1497dc)
{% endnote %}

首先下载 `oh-my-posh` 软件，这里我们可以直接使用 Windows 的下载工具 `Winget` 在命令行中下载。

```PowerShell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

下载之后可以通过 `oh-my-posh` 查看是否安装成功，<span class='mohu'>如果出现相关的命令，而没有报错的话就代表安装成功了</span>

如果已经安装成功，可以直接用下面的命令来应用[官网](https://ohmyposh.dev/docs/themes)已经存在的主题：

```
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\jandedobbeleer.omp.json" | Invoke-Expression
```

这里的 `jandedobbeleer` 就是主题的名字，你也可以换成其他的主题名字。

![powershell效果图](https://image.tabirstrees.top/images/2025/02/22/image.png)


https://glitchbone.github.io/vscode-base16-term/#/atelier-forest-light

