---
date: 2023-06-22 14:59:07
title: TORIC 简单介绍
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-20230622161043.png
tags: 
- 聚变
- 离子回旋加热
- 数值模拟
- 程序
categories: [科研, 等离子体物理, 模拟]
description: TORIC 程序是一个计算模拟 ICRF(离子回旋频段) 甚至可以模拟低杂波的全波解程序, 本文是其一个简单的中文手册.
---

<center><div style='height:2mm;'></div><div>伍先树, 李景春<br>南方科技大学&ensp;地球与空间科学系<br>2023-06-20</div></center>

{% note info %}
TORIC 程序是一个计算模拟 ICRF(离子回旋频段) 甚至可以模拟低杂波的全波解程序, 由德国马普研究所下的等离子体研究所的 M, Brambilla 及其合作者共同开发完成，现在的接替 Brambilla 的主要开发者为Roberto Bilato. TORIC 可以被用来求解任意轴对称环几何位形下以及有限拉莫尔半径近似下的离子回旋波段的麦克斯韦波方程.
<p style="text-align:right">&mdash;&mdash;郑振 2021</p>
{% endnote %}

---

## TORIC 输入文件

运行 TORIC 程序需要名为 `torica.inp` 的 namelist 文件. 文件包含的内容很多, 分别涉及到不同的板块. 具体的细节可以在 [官方手册页面](https://users.euro-fusion.org/expert/transp/Toric/Manual/frame.htm) 找到. 以下是用实际文件对重要参数(需要经常修改)做一些简单的说明:

### toric_mode

设置程序的运行模式, 该部分内容由主程序 `t4_aamian.F` 读取, 对应不同模式的计算.

```input
 &toric_mode
!
!  Read by the program calling toric
!
     toricmode = "equil" # Producing an equilibrium file with i2mex
!      toricmode = "toric" # Using TORIC to solve the wave equations.
!     toricmode = 'sumnph' # Superposing the results for several toroidal modes 
!     toricmode = "ssfpql" # The quasilinear Fokker-Planck solver SSFPQL
!     toricmode = "fppmod"
!     toricmode = 'diagns' # Using TORIC in the diagnostic mode.
!
!  Accepted values: "equil", "toric", "ssfpql", "sumnph",
!                   "qldce", ""fppmod", "diagns"
!
  /
```

各模式主要的功能上面的代码注释中已经简单介绍了, 我们运行程序时一般只用前两种模式, `equigs` 模式用于准备 `toric` 模式下程序运行所需的平衡文件. 其余模式在 `toric` 模式下会按照需要依次运行(通过设置对应的参数而被调用).

### toricainp

用于存放控制 TORIC 运行的数据 (Parameters for resolution, antenna, output) 的地方, 通过 `hf_read` 读取:

```input
 &toricainp
!
!  Read from subroutine hfread, "contained" in t4_torica
!
       isol   = 1,
!             mode of operation of the TORIC code
!             =  0  Explorative(diagnostic) mode:                                
!                      Magnetic configuration                        
!                      Density & temperature profiles,               
!                      Dielectric properties vs X                    
!                      Dielectric properties vs TH (IPLTHT = 1)      
!             =  1  Run mode, Maxwellian plasmas
!                      Construction and inversion of the stiffness   
!                      matrix; results are printed, plotted, and     
!                      written on disk if required.   
!             =  2  Run mode, with non-maxwellian minority
!                      In this case, the namelist /qlmininp/ must specify
!                      the minority species and the file where the 
!                      data from the run of SSFPQL are to be read.
!
!                   Note: always check vacuum extrapolation with
!                   isol = -1 before using a new configuration!
       nvrb   =   3,
! --------------------------------------------------------------------
!  Definition of the variables and mesh for the run
! --------------------------------------------------------------------
!            Number of components of the electric field:
!            NVRB = 2 - parallel field omitted (for comparison
!                       with old codes omitting E_//.)
!            NVRB = 3 - parallel field evaluated (normal option)
       nelm   = 450,
!            Number of radial finite elements
       ntt    =  512,
!            Number of points in the poloidal angle (theta) mesh:
!            must be a power of 2 (FFT) and satisfy NTT >= 2*NMOD+1
       nmod   =  255,
!            Number of modes in the solution  (preferably odd):
!            NOTE: to optimize use of the information in the poloidal 
!            mesh the best choice is NMOD = NTT/2-1 (see below).
!            A value of NMOD << NTT/2-1 can lead to inaccuracies.
!
!           Example: With MASTCH=1 the largest job accepted by the 
!            IPP IBMaix or a normal laptop has (about): 
!                   NTT = 64, NMOD = 31, NELM = 450.
!
!           nelm = 200, ntt = 256, nmod = 127 can perform well
!           on the TianHe cluster. 
! --------------------------------------------------------------------
       nptvac =  50,
       mxmvac =  15,
!                         It is recommented not to exceed MXMVAC = 15
! --------------------------------------------------------------------
!  H.F. and antenna parameters
! --------------------------------------------------------------------
       freqcy = 16.0E6,
!            Applied frequency, in hz.
       nphi   =  18,
!            Toroidal mode number.
       antlen = 50,
!            Length of the antenna in the poloidal direction (cm)
       antlc  = 1.2,
!            Effective propagation constant of the antenna.
!             ANTLC > 0 - the current ends abruptly at the feeders
!             ANTLC < 0 - the current goes to zero at the feeders
!                         (works only with a large value of ntt).
!             ANTLC = -999. - poloidally uniform excitation
       theant = 0.,
!            poloidal position of the central point of the antenna 
!             (degrees from the outer equatorial plane)
! --------------------------------------------------------------------
       iflr   = 1,
       ibweld = 2,

       ibpol  = 1,
       iqtor  = 1,
       icoll  = 0,
       enhcol = 1.,
!                        Must be very large (10^5) to have any effect
       imdedg = 2,
       iezvac = 1,
       icosig = 0,
!                        Use ICOSIG <> 0 only in exceptional cases!
       iregax = 1,
!                        IREGAX=1 and intchb > 0 recommended when
!                        IBW are propagative near the magnetic axis
       mastch = 1,
       lenwrd = 8,
! ----------------------------------------------------------------------
! Input of parameters for the control of the output:
! ----------------------------------------------------------------------
       iout   = 1,
!             printed output control:
!              = 0  normal output.
!              = 1  detailed output.
!              = 2  complete output: includes radial behaviour of the
!                   Fourier coefficients of the electric field.
       iwdisk = 1,
!             output on disk (fort.9, only with ISOL=1)
!              = 0  skipped
!              = 1  done (specify file name in the JCL job)
       idlout = 1,
!             output for IDL plots 
!             IDLOUT = 0   skipped
!             IDLOUT > 0   executed (normal setting)
       ipltht = 1,
!            plot of dielectric tensor as function of theta
!            on selected magnetic surfaces
       io_ncdf = 1,
!            The output for plots is made in netcdf format
!            At present only available for ISOL = 1 or 2
! ----------------------------------------------------------------------
       zeff = 1.5,
!                      If Zeff is >= 1._r8 it will be used throughout
!                                  < 1._r8  it will be reevaluated.
       iclres = 0
!                      iclres = 1 adds collisions around isolated ion-ion 
!                                 resonances. Use with care!
!                      dnures = Width (cm) / tnures = strength (a.u.)
       dnures = 5.0
       tnures = 10.0
!
       scratchpath = '/tmp/'
       timing_on = .true.
       pcblock = 4
 /
```

<span style='background: pink'>以上参数中被框起来作了详细说明的部分都是经常需要更改的参数.</span>

### equidata

设置控制平衡的参数(包括 equigs, profnt 等文件)的位置.

首先是总体的控制参数, 其中比较重要的有: `igsmhd`, `dist_plawall(1/2/3/4)`, `idprof`, `inputpath`, `profnt_file` 以及 `equil_file`

```input
 &equidata
!
!  Read from subroutine t4_equi_master in module t4_mod_equil
!
      igsmhd = 1,
!                               = 1: from file produced by i2mex
!                               = 0: analytic
!
      intchb = 7
!                               <=0: spline interpolation
!                               >0: chebyshev interpolation
!                                   of order m = min(12, max(5,intchb))
      dist_plafars = 0.
!                               Distance plasma-faraday shield (cm)
!                               (counted from scrape-off edge)
      dist_plaant = 5.0
!                               Distance plasma-antenna (cm)
!                               (idem, .ge. dist_plafars)
      dist_plawall(1) = 12.0
      dist_plawall(2) = 16.
      dist_plawall(3) =  8.
      dist_plawall(4) = 16.
!                              Distance plasma-wall (cm)
!                              (1-4) : outer, up, inner, down
!                              (must be > dist_plaant)
      idprof = 0
!                              =  1 : Profiles from external file
!                              =  0 : analytic profiles
!
      inputpath   = './'
      profnt_file = 'profnt_62585.02800'
!            where the file of profile data.
      equil_file  = 'equigs_038204.data'
!            where the equigs file prepared by toricmode = "equil".
!
```

如果上面的参数中设置了 `igsmhd = 0` 或者 `idprof = 0`, 那么还需要对应解析计算的参数:

```input
! ------------------------------------------------------------------------
!  The following data are used only with a default analytic equilibrium
!  (igsmhd = 0).
!
      rtor   = 167.0        ! Major radius (cm)
      rplasm = 44.0         ! Plasma radius (cm)
!
      ashift = 5.0          ! Shafranov Shift
      aellip = 1.00         ! Ellipticity on axis
      sellip = 1.60         ! Ellipticity at separatrix
      strian = -0.22        ! Triangularity at separatrix
      iudsym = 1
      azvert = 0.0
      strigz = 0.0
      sp_xs1 = 0.0
!
      bzero  = 1.97         ! Magnetic field at the geometric center
      aicurr = 830.         ! Toroidal current (kA)
      ppjte = 2.0
      ppjti = 1.5
!
! -----------------------------------------------------------------------
!  The following data are used only with analytic profiles (iprodf = 0)
!
      nspec  = 2
!                               Number of ion species
!                               Should not exceed parameter nspmx
      mainsp = 1             ! Reference species (for charge neutrality)

      atm(1) = 2.            ! Atomic mass
      atm(2) = 3.
!     atm(3) = 2. 
!     atm(4) = 16.

      azi(1) = 1.            ! Atomic charge
      azi(2) = 2.
!     azi(3) = 1.
!     azi(4) = 7.

      aconc(2) = 0.22        ! Concentrations (n_i/n_e)
!     aconc(3) = 0.02  
!     aconc(4) = 0.0045

      denec  = 5.0E13        ! Central electron density (cm^-3)
      tempec = 4          ! Central electron temperature (keV)

      tempic(1) = 3.5      ! Central ion temperature (keV)
      tempic(2) = 3.5 
!     tempic(3) = 8.0  

      ppnei = 2.0            ! Inner power in the density profile
      ppnee = 0.500          ! Outer power in the density profile

      pptei = 2.0       ! Inner power in the electron temperature profile
      pptee = 0.5       ! Outer power in the electron temperature profile

      pptii(1) = 2.0    ! Inner power in the ion temperature profile
      pptie(1) = 0.5    ! Outer power in the ion temperature profile
      pptii(2) = 2.0  
      pptie(2) = 0.5  
!     pptii(3) = 4.0  
!     pptie(3) = 1.5  

      dnsepr = 0.5E13,    ! Density at the last closed surface
      tesepr = 0.20,      ! Electron temperature at the last closed surface
      tisepr(1) = 0.20,   ! Ion temperature at the last closed surface
      tisepr(2) = 0.20,
!     tisepr(3) = 10.,

      so_thickness = 0., ! Scrape-off thickness (cm)
      gldn   = 3.0,      ! Density gradient length in scrape-off
      glte   = 3.,       ! Electron temperature gradient length in scrape-off
      glti(1)   = 3.,    ! Ion temperature gradient length in scrape-off
      glti(2)   = 3.,
/
```

### gfreadinp

用于设置 gfile 文件的位置, 只在 `toricmode = "equil"` 时会被读取.

```input
 &gfreadinp
!
! Read from subroutine gfread in module t4_mod_toi2mex
!
    gfile= 'H2DNv3_2g033332.00000'
!
    nmhd     = 165              ! number of radial psi points default=201
    ntheta   = 129              ! number of "theta" points default = 129

    i2mex_LAST_NORM_SURFACE_IS = 0.95
!                               ! Name speaks for itself
    ic1 = 2                     ! index of first (non-singular) surface
    inc = -1                    ! index of last surface
!                               ! (-1: makes it equal to npsi)
    imom1 =  10                 ! Number of Fourier modes per mag. surface
 /
```

一般来说只需要设置 gfile 文件相对于前文 `inputpath` 参数的相对路径即可, 另外一些自定义的参数可以在官方文件中查找对应的解释.

### ssfpqlinp, qlmininp, tofppmodinp, diaginp

剩下的设置基本不需要更改, 具体的细节也可以在官方文档中找到. 只将以上部分的内容改成不同案例对应的参数已经足够正常的程序运行了.

---

## 实际案例

接下来用 <span style='background: yellow'>和龙-2</span> 的平衡位形(<span style='background: #B6D1F9'>H2DNv3_2g033332.00000</span>)和典型的密度、温度剖面(<span style='background: #B6D1F9'>剖面1002-ti=1.5te.xlsx</span>)来计算一个实例.

### 用 i2mex 生成平衡文件

第一步需要使用 i2mex 程序将通常的 gfile 文件转化为 TORIC 程序求解波动方程时需要的 equigs 文件. 这一步只需要在 torica.inp 文件中对应位置处设置:

```input
    toricmode = "equil"
```

```input
    gfile= 'H2DNv3_2g033332.00000'
```

通过 `sbatch runth_Ptoric` 命令提交任务后等待程序运行, 之后会生成 `fort.22` 文件, 该文件就是 TORIC 运行所需的平衡文件, 下图是其和 gfile 文件的区别:

<center>
<table><tr>
<td><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulgfile.png" width="400" border=1/></td>
<td><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulequigs.png" width="400" border=1/></td>
</tr></table>
</center>

<center id='f1'><span style='font-weight:bold'>Fig 1. The left is "gfile" file and the right one is the "equigs" file used in TORIC</span></center>

这里如果我们直接将 `fort.22` 文件放进 `torica.inp` 对应的位置可能会引起报错, 最好先改成 `XXX.dat` 的文件名格式.

### 准备剖面文件

平衡文件准备好之后, 还需要按照 TORIC 读取剖面文件的方式准备剖面文件, 根据手册, 读取剖面文件的程序用以下格式(伪代码)进行:

```Fortran
 read(lun22,'(A10,4i4)')  var_name, nprodt, nspec, mainsp,
     &                            kdiff_itemp
 
   var_name    (for legibility)
   nprodt      number of points in the radial variable psi
   nspec       number of ion species
   mainsp      species to be used to impose charge neutrality
   kdiff_itemp Control of individual ion temperature profiles
               = 0 - All ion species have the same temperature
                     (the file contains only one T_i profile)
               = 1 - Each ion species has a different temperature
                     (the file must contain NSPEC t_i profiles)
 
         do  isp=1,nspec
            read(lun22,'(2i4)')  iatm, iazi
            atm(isp) = iatm
            azi(isp) = iazi
         enddo
 
   atm(i)      Atomic mass of soecies i
   azi(i)      Atomic charge of species i
 
         read(lun22,'(A10)')  var_name
         read(lun22,'(5E16.9)')  tbpsi
 
   tbpsi:      mesh points in the radial variable psi
 
         read(lun22,'(A10)')  var_name
         read(lun22,'(5E16.9)')  tbne
 
   tbne:       electron density profile (cm^-3) on the mesh tbpsi
 
         read(lun22,'(A10)')  var_name
         read(lun22,'(5E16.9)')  tbte
 
   tbte:     electron temperature (keV) on the mesh tbpsi
 
         do isp=1,nspec
            if(isp .eq. mainsp)  cycle
            read(lun22,'(A10)')  var_name
            read(lun22,'(5E16.9)')  tbni(1:nprodt,isp)
         enddo
 
   tbni(isp)   ion density profile (cm^-3) on the mesh tbpsi
               NOTE: the profile of MAINSP is evaluated by TORIC
                     imposing charge neutrality
 
         do isp=1,nsptmp
            read(lun22,'(A10)')  var_name
            read(lun22,'(5E16.9)')  tbti(1:nprodt,isp)
         enddo
 
   tbti:     ion temperature (keV) on the mesh tbpsi
             NOTE: TORIC sets nsptmp = 1     if kdiff_itemp = 0
                              nsptmp = nspec if kdiff_itemp = 1
```

<span style='background: pink'>值得注意的是, 文件的第一行在</span> `var_name` <span style='background: pink'>后应该还有五个参数而非四个, 如果按照手册中的四个参数进行剖面文件的准备将会报错</span>, 经过查看源代码 `t4_mod_profnt.F`, 确认了第一行的参数应该是:

```Fortran
 read(lun22,'(A10,5i4)')  var_name, nprodt, nspec, mainsp,
     &                            kdiff_idens, kdiff_itemp
 
   var_name    (for legibility)
   nprodt      number of points in the radial variable psi
   nspec       number of ion species
   mainsp      species to be used to impose charge neutrality
   kdiff_idens Control of individual ion density profiles
   kdiff_itemp Control of individual ion temperature profiles
```

这里我们也简单的写了一个对应的 Python 脚本来进行剖面文件的准备:

```Python
## 引入需要的函数库
import pandas as pd
import fortranformat as ff
import numpy as np


## 读取 xlsx 文件
path = "profile.xlsx"
df1 = pd.read_excel(path, header=0)
psi = df1.iloc[:, [0]].values
ne = (df1.iloc[:, [2]].values) * 1e19 / 1e6
ni = df1.iloc[:, [3]].values / 1e6
Te = df1.iloc[:, [4]].values
Ti = df1.iloc[:, [5]].values
i_charge = [1, 3]
i_mass = [1, 11]

# 加入少子的情形
i_X = [0.06]
n_minority = ne * np.array(i_X)
n_main = (
    ne - np.reshape(np.sum(np.array(i_charge[1:]) * n_minority, 1), (201, 1))
) / np.array(i_charge[0])


## 写入文件
pf = open("profnt_ENN_test_0.06.dat", "w+")
# first line: filename;number of point node;ion specise;main ions;temperature setup
linewrite1 = ff.FortranRecordWriter("(A10,5i4)")
line1 = linewrite1.write(["Prof_ENN", 201, 2, 1, 1, 1])
pf.writelines(line1 + "\n")
# mass and charge of each ion
linewrite2 = ff.FortranRecordWriter("(2i4)")
line2 = linewrite2.write([1, 1, 11, 3])
pf.writelines(line2 + "\n")
# linewrite_h = ff.FortranRecordWriter("(A10)")
# psi
# pf.writelines(linewrite_h.write(["Psi"]) + "\n")
pf.writelines("Psi" + "\n")
number_writer = ff.FortranRecordWriter("(5E16.9)")
psiwrite = number_writer.write(psi)
pf.writelines(psiwrite + "\n")
# ne
# pf.writelines("ne [cm^-3]\n")
# pf.writelines(linewrite_h.write(["ne [cm^-3]"]) + "\n")
pf.writelines("ne [cm^-3]" + "\n")
newrite = number_writer.write(ne)
pf.writelines(newrite + "\n")
# Te
# pf.writelines("Te [keV]\n")
# pf.writelines(linewrite_h.write(["Te [keV]"]) + "\n")
pf.writelines("Te [keV]" + "\n")
tewrite = number_writer.write(Te)
pf.writelines(tewrite + "\n")
# ni
# pf.writelines("ni_D [cm^-3]\n")
# pf.writelines(linewrite_h.write(["nD [cm^-3]"]) + "\n")
pf.writelines("nD [cm^-3]" + "\n")
niwrite = number_writer.write(list(n_main))
pf.writelines(niwrite + "\n")
# Te
# pf.writelines("Te [keV]\n")
# pf.writelines(linewrite_h.write(["TD [keV]"]) + "\n")
pf.writelines("TD [keV]" + "\n")
tiwrite = number_writer.write(Ti)
pf.writelines(tiwrite + "\n")

pf.writelines("nH [cm^-3]" + "\n")
niwrite = number_writer.write(list(n_minority))
pf.writelines(niwrite + "\n")
# Te
# pf.writelines("Te [keV]\n")
# pf.writelines(linewrite_h.write(["TD [keV]"]) + "\n")
pf.writelines("TH [keV]" + "\n")
tiwrite = number_writer.write(Ti)
pf.writelines(tiwrite + "\n")

pf.close()
```

最终得到的文件形式如图所示:

<img alt="picture 3" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulprofnt.png" />

<center id='f2'><span style='font-weight:bold'>Fig 2. The preview of profile data used in TORIC</span></center>

这里我们采用 H(B11) 作为加热场景, 少子浓度设置为 6%.

### 设置输入文件 `torica.inp`

此处为了简单起见, 我们仅针对 <span style='background: yellow'>和龙-2</span> 的天线频率以及网格划分进行修改, 根据 <span style='background: yellow'>和龙-2</span> 的基本参数估算各离子的共振线, 得到得结果如图所示:

![picture 4](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-resonanceline.png)
<center id='f3'><span style='font-weight:bold'>Fig 3. The resonance line of different particles.</span></center>

可以看到对于 H(B11) 体系要保证在中心位置处吸收需要频率大概位于 50MHz(H 基频) 或者 30MHz(B11 谐频), 这里我们先选取 30MHz 作为天线的发射频率. 因此在上面的输入文件中我们只修改以下几个部分:

```
      toricmode = "toric",
            .
            .
            .
      nvrb   =   3,
      nelm   = 450,
      ntt    =  256,
      nmod   =  127,
            .
            .
            .
      freqcy = 30.0E6,
      nphi   =  18,
      antlen = 50,
      antlc  = 1.2,
      theant = 0.,
            .
            .
            .
      inputpath   = './'
      profnt_file = 'profnt_ENN_test_0.06.dat'
      equil_file  = 'equigs.dat'
```

其他参数保持原来的设置不变, 然后提交任务运行. 最终会生成三个文件: `fort.9`, `fort.10` 以及 `fort.21`. `fort.9` 是写入到文件中的程序输出(netCDF格式), `fort.10` 是文本格式的用于画图的数据文件, `fort.21` 是 netCDF 格式的画图数据文件.

通过读取 `fort.21` 中的结果绘制图件, 我们可以得到以下的结果:

<img alt="picture 4" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulEplusandabsor.png" />
<!-- <img alt="picture 4" src="images/manulEplusandabsor_main.png" />   -->
<center id='f4'><span style='font-weight:bold'>Fig 4. The contour plot of the result.</span></center>

<img alt="picture 5" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulabsor_profile.png" />  
<center id='f5'><span style='font-weight:bold'>Fig 5. Power absorption by different
particles along the radius direction.</span></center>

<img alt="picture 6" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcurrentdrive.png" />  
<center id='f6'><span style='font-weight:bold'>Fig 6. Current Density Induced by Waves.</span></center>

这里可以看到离子吸收并没有在中心位置, 结合图3考虑可能是波频率设置的不太恰当, 因为这里只是运行 TORIC 程序的一个简单示例, 就不对此展开深入的分析.

---

## 考虑离子尾部能量的情况

某些时候我们还需要考虑离子吸收能量之后形成超热尾部分布(suprathermal minority tails)的情况, 这需要在已经完成前述计算过程的基础上的通过调用 `SSFPQL` 模块求解准线性 Fokker-Planck 方程来估计离子的分布, 然后再一次迭代进 `TORIC` 主模块中计算.

由于我们此前对 <span style='background: yellow'>和龙-2</span> 的计算中离子没有产生超热尾端的分布(<span class='heimu'>也有可能是计算过程中出现了失误</span>), 所以这里采用做程序 BENCHMARK 时所用的 <span style='background: yellow'>CFETR</span> (He3)-D-T 加热体系(Chengyi Song et al. 2021)来举例. 模拟使用的参数以及结果如图7~图9所示:

<center><img alt="picture 1" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcfetr_parameters.png" /></center>  
<center id='f7'><span style='font-weight:bold'>Fig 7. The parameters of simulation for CFETR.</span></center>

<img alt="picture 2" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcfetr_eplus.png"/>
<center id='f8'><span style='font-weight:bold'>Fig 8. The contour plot of the results for CFETR.</span></center>  

<center><img alt="picture 3" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcfetr_absor.png"/></center>  
<center id='f9'><span style='font-weight:bold'>Fig 9. Power absorption by different particles along the radius direction for CFETR.</span></center>

### 通过 `SSFPQL` 计算离子分布

首先是在原有计算结果的基础上调用 `SSFPQL` 模块, 实际上该模块是通过读取前面讲到的 `fort.9` 文件(netCDF 格式的输出文件)来与 `TORIC` 主程序耦合, 这里我们需要在 `torica.inp` 中设置 `/ssfpqlinp/` 部分的参数, 在此案例中如下:

```input
! *********************************************************************
!   Namelist entries needed by SSFPQL (quasilinear solver for the ions)
! *********************************************************************
!
!     namelist /ssfpqlinp/
!    &    power, iex_sumnph, joutql, nrdpsi, legmod, idlout, iwrdql,
!    &    path_to_t4data, t4data_file, timing_on
!
! -------------------------------------------------------------------- !
 &ssfpqlinp
!
!  Read by subroutine t4_ssfpql in module t4_mod_ssfpql
!
      power = 3.6,
!                             Total absorbed power (MW)
      emxfac(1) = 200.,
      emxfac(2) = 100.,
!                             multipliers of T_i in the definition 
!                             of the max energy in the velocity mesh
      iex_sumnph = 0,
!                             Control of input from TORIC
!                             = 0 - only one toroidal mode
!                             = 1 - weighted superposition of several toroidal modes
!                             (performed by t4_sumnph, with its own namelist)
      joutql = 1,
!                             Control of printed output:
!                             = 0 - essential results (recommended)
!                             = 1 - detailed results
      nrdpsi = 46,
!                             Number of radial points (uniform in psi) where
!                             the qlfp equation for ions is to be solved.
      legmod = 6,
!                             number of Legendre polynomials in the ion
!                             distribution functions
!                             Recommended: 5 <= legmod <= 7
      nptu   = 201,

      idlout = 1,
!                             Plots of distribution functions, power profiles, etc.
!                             = 1 - done
!                             = 0 - skipped.
      iwdisk = 1,
!                             1 - netCDF format
!                             -1 - binary
      path_to_t4data  = './'
!                             output of toricmode = "toric" (named "fort.9")
      t4data_file     = 'fort.9'
      iwrdql = 1,
!                             Output for iteration by TORIC with nonMaxwellian
!                             minority distribution.
      timing_on = .true.
!                             Control of time trace:
!                             .true.  - time tracing on
!                             .false. - time tracing off
 /
! -------------------------------------------------------------------- ! 
```

同时需要把运行模式改成对应的设置, 即:

```input
toricmode = ssfpql,
```

提交任务后会得到两个文件, `fort.8` 以及 `fort.12`. 前者是后续程序运行的输入文件, 后者是任务输出文件, 两者都是文本格式, 可以直接打开. 因为要用到 `fort.8`, 一般要对其进行查看, 我们的案例中如图10所示:

<center>
<table><tr>
<td><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulfort8left.png" width="400" border=1/></td>
<td><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulfort8right.png" width="400" border=1/></td>
</tr></table>
</center>
<center id='f10'><span style='font-weight:bold'>Fig 10. The input file for 'isol = 2' to read the minority non-maxwellian profile.</span></center>

<span style='background: pink'>需要注意的是,</span> fort.8 <span style='background: pink'>文件中起始位置通常是主要离子(文件开头的两个数字分别表示离子种类(nspec)和剖面网格, 主离子的离子种类为 1)的非麦克斯韦分布的剖面(左图), 而后续的</span> `QLMINH` <span style='background: pink'>模块需要少子(nspec = 2)的非麦克斯韦剖面, 因此需要删掉前面主离子的部分内容(右图)</span>

### 再次运行 TORIC 主程序得到结果

得到少子的非麦克斯韦剖面后, 就可以再次以 `isol = 2` 的运行模式再次运行 TORIC 主程序得到结果, 此时还需要设置读取的少子剖面文件的位置, 对 `torica.inp` 做如下更改:

```input
      toricmode = "toric",
            .
            .
            .
          isol  = 2,
            .
            .
            .
&qlmininp
!
!  Read by subroutione t4_qlm_init in t4_mod_qlminh
!
      path_to_qldata = './'
      qlmin_file = 'fort.8'
!            The path of input (non-maxwellian profile for minority)
 /
```

重新运行之后得到三个文件(`fort.9/10/21`), 并利用 `fort.21` 画图, 如图所示:

<center><img alt="picture 6" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcfetreplustail.png"/></center> 
<center id='f11'><span style='font-weight:bold'>Fig 11. The contour plot of the results for CFETR when the minority superthermal tail has been considered.</span></center> 

<center><img alt="picture 7" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcfetrabsortail.png"/></center>  
<center id='f12'><span style='font-weight:bold'>Fig 12. Power absorption by different particles along the radius direction for CFETR when the minority superthermal tail has been considered.</span></center>

<center><img alt="picture 8" src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/TORIC-manulcfetrcdtail.png"/></center>  
<center id='f13'><span style='font-weight:bold'>Fig 13. Current Driven by different waves along the radius direction for CFETR when the minority superthermal tail has been considered.</span></center>

由于只是作为演示, 这里的结果就不做具体分析.

---

以上就是 TORIC 程序的一个简单介绍, 这个类似于文档的东西是给了解相关领域(托克马克磁约束聚变离子回旋加热)的人准备的, 实际上只是一个简化版本的程序操作手册, 给有需要的人提供参考<span class='mohu'>(互联网上实在是找不到类似的东西, 同时有项目需要写这么一份文档, 所以分享出来. 真正做这个领域, 需要这份文档的人应该比较少才对.)</span>.