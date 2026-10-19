window.RK_DATA = window.RK_DATA || {};
window.RK_DATA.modules = (window.RK_DATA.modules || []).concat([
  {
    "id": "net",
    "name": "网络基础",
    "day": 4,
    "weight": 9,
    "priority": "high",
    "intro": "上午 8-11 分，性价比最高：OSI 七层、TCP/IP、IP 与子网、端口号死记。",
    "cards": [
      {
        "t": "OSI 七层（从下往上）",
        "b": [
          "物理层→数据链路层→网络层→传输层→会话层→表示层→应用层",
          "口诀：物数网传会表应",
          "物理层传比特，链路层传帧，网络层传分组（IP），传输层传报文段（TCP）",
          "各层设备：中继器/集线器(物理)、交换机/网桥(链路)、路由器(网络)、网关(高层)"
        ],
        "tip": "考法：给一个协议问属于哪层。先判断它是传输数据还是找路。"
      },
      {
        "t": "TCP/IP 四层与协议归属",
        "b": [
          "应用层：HTTP(80)、HTTPS(443)、FTP(21/20)、SMTP(25)、POP3(110)、DNS(53)、DHCP(67/68)、Telnet(23)、SNMP(161)",
          "传输层：TCP（可靠、面向连接）、UDP（不可靠、无连接、开销小）",
          "网际层：IP、ICMP（ping）、ARP（IP→MAC）、RARP、IGMP",
          "网络接口层：以太网、令牌环"
        ],
        "tip": "ARP 常被误认为链路层，其实在网际层；DNS 既用 UDP(53) 也用 TCP(53)。"
      },
      {
        "t": "TCP 与 UDP 对比",
        "b": [
          "TCP：面向连接、可靠、有序、有流量控制与拥塞控制、开销大",
          "UDP：无连接、不可靠、无拥塞控制、实时性好、开销小",
          "TCP 适用：网页、文件传输、邮件；UDP 适用：视频/音频直播、DNS 查询、TFTP",
          "TCP 三次握手建连接、四次挥手断连接"
        ],
        "tip": "看到'实时''直播''不重传'就选 UDP。"
      },
      {
        "t": "IP 地址与分类",
        "b": [
          "IPv4 32 位，点分十进制；IPv6 128 位",
          "A 类 1-126，默认掩码 /8；B 类 128-191，/16；C 类 192-223，/24",
          "私有地址：10.0.0.0/8、172.16.0.0/12、192.168.0.0/16",
          "回环 127.0.0.1；169.254.x.x 是自动私有地址（拿不到 DHCP）"
        ],
        "tip": "首字节 127 是回环，不是 A 类可用地址；224 以上是组播/保留。"
      },
      {
        "t": "子网划分必会算法",
        "b": [
          "子网掩码 /n 表示前 n 位是网络位，主机位 = 32-n",
          "每个子网可用主机数 = 2^(32-n) - 2（去掉网络地址和广播地址）",
          "块大小 = 256 - 掩码中变化的那一段（如 /27 掩码 224，块大小 32）",
          "/27 → 掩码 255.255.255.224，每个子网 32 个地址、30 台主机"
        ],
        "tip": "常考：给 192.168.1.0/27 问可用主机数 → 30。别忘减 2。"
      },
      {
        "t": "常见端口号（背）",
        "b": [
          "FTP 20(数据)/21(控制)、Telnet 23、SMTP 25、DNS 53",
          "HTTP 80、POP3 110、HTTPS 443、SNMP 161",
          "SQL Server 1433、MySQL 3306、Oracle 1521、RDP 3389"
        ],
        "tip": "只考选择题，见到端口直接对应协议，不用理解。"
      },
      {
        "t": "网络拓扑与设备",
        "b": [
          "总线型：一根线，冲突多，已淘汰；星型：中心节点故障全网瘫",
          "环型：令牌传递；网状：可靠性最高、成本最高",
          "交换机工作在链路层，按 MAC 转发，能隔离冲突域",
          "路由器工作在网络层，按 IP 转发，能隔离广播域"
        ],
        "tip": "问'隔离广播域'必答路由器（或 VLAN）。"
      },
      {
        "t": "域名与 URL",
        "b": [
          "DNS 把域名解析成 IP，查询顺序：本地 hosts → 本地 DNS → 根 → 顶级 → 权威",
          "URL 组成：协议://主机[:端口]/路径/文件名?参数#锚点",
          "顶级域名：.com 商业、.org 组织、.edu 教育、.gov 政府、.cn 中国",
          "HTTP 默认端口 80，可省略不写"
        ],
        "tip": "URL 题常问'哪部分是主机名'，看 // 后到第一个 / 之间。"
      },
      {
        "t": "网络安全与加密",
        "b": [
          "对称加密：DES、3DES、AES、RC4 —— 快，密钥分发难",
          "非对称加密：RSA、ECC、DSA —— 慢，可解决密钥分发与数字签名",
          "哈希：MD5(128位)、SHA-1(160位)，不可逆，用于完整性",
          "数字签名用私钥签、公钥验；数字证书由 CA 签发，防伪造公钥"
        ],
        "tip": "记住一句话：加密用对方公钥，签名用自己私钥。"
      },
      {
        "t": "防火墙与攻击类型",
        "b": [
          "防火墙：包过滤、应用代理、状态检测；部署在内网与外网之间",
          "DMZ 隔离对外服务器；IDS 检测入侵（被动），IPS 阻断（主动）",
          "常见攻击：DDoS（流量淹没）、ARP 欺骗、SQL 注入、钓鱼、木马",
          "病毒特性：传染性、隐蔽性、潜伏性、破坏性、可触发性"
        ],
        "tip": "问'被动监听不阻断'选 IDS。"
      },
      {
        "t": "HTML 与浏览器常识",
        "b": [
          "HTML 是标记语言，不是编程语言；标签成对出现，属性写在开始标签",
          "<a href> 超链接、<img src> 图片、<table> 表格、<form> 表单",
          "静态页面 HTML/CSS/JS；动态页面需服务器端程序（JSP/PHP/ASP）",
          "B/S 架构客户端只需浏览器，C/S 需装客户端"
        ],
        "tip": "考'浏览器向服务器请求网页用什么协议'→ HTTP。"
      },
      {
        "t": "网络性能与传输介质",
        "b": [
          "带宽单位 bps（比特/秒），下载速度 B/s 要除以 8",
          "双绞线 100 米内；光纤传输远、抗干扰、带宽高",
          "同轴电缆、双绞线（UTP/STP）、光纤、无线（Wi-Fi/蓝牙）",
          "信道复用：频分 FDM、时分 TDM、波分 WDM、码分 CDMA"
        ],
        "tip": "100Mbps 理论下载约 12.5MB/s，选项里常有 100MB/s 的坑。"
      },
      {
        "t": "局域网与以太网",
        "b": [
          "以太网使用 CSMA/CD（总线）或全双工交换（无冲突）",
          "MAC 地址 48 位，前 24 位是厂商编号",
          "VLAN 在交换机上逻辑划分广播域",
          "无线局域网标准 802.11，蓝牙 802.15，WiMAX 802.16"
        ],
        "tip": "MAC 48 位、IPv4 32 位、IPv6 128 位，三个数字必背。"
      },
      {
        "t": "网络命令（下午/上午都可能考）",
        "b": [
          "ping 测连通性（ICMP）；ipconfig 看本机 IP；tracert 路由跟踪",
          "netstat 看端口连接；nslookup 查 DNS 解析",
          "telnet IP 端口 测端口是否开放"
        ],
        "tip": "看到'测试到某主机是否可达'→ ping。"
      }
    ]
  },
  {
    "id": "en",
    "name": "专业英语",
    "day": 5,
    "weight": 5,
    "priority": "mid",
    "intro": "固定 5 分，全靠词汇 + 套路。认识 200 个高频词就能拿 3-4 分。",
    "cards": [
      {
        "t": "题干高频动词",
        "b": [
          "implement 实现 / execute 执行 / compile 编译 / interpret 解释",
          "allocate 分配 / retrieve 检索 / encrypt 加密 / decrypt 解密",
          "verify 验证 / validate 校验 / optimize 优化 / migrate 迁移",
          "configure 配置 / deploy 部署 / integrate 集成 / maintain 维护"
        ],
        "tip": "选项里出现同义动词时，看主语是人还是程序。"
      },
      {
        "t": "名词与概念",
        "b": [
          "algorithm 算法、array 数组、pointer 指针、queue 队列、stack 栈",
          "database 数据库、table 表、record 记录、field 字段、index 索引",
          "protocol 协议、bandwidth 带宽、router 路由器、packet 数据包",
          "requirement 需求、specification 规格说明、module 模块、interface 接口"
        ],
        "tip": "英语题很多是教材原句改写，术语认识就能选。"
      },
      {
        "t": "软件工程英语",
        "b": [
          "life cycle 生命周期、waterfall 瀑布、iteration 迭代、agile 敏捷",
          "testing 测试、debug 调试、defect 缺陷、regression 回归",
          "coupling 耦合、cohesion 内聚、encapsulation 封装、inheritance 继承",
          "polymorphism 多态、abstraction 抽象、overload 重载、override 重写"
        ],
        "tip": "coupling 越低越好，cohesion 越高越好——英文题也这么问。"
      },
      {
        "t": "操作系统英语",
        "b": [
          "process 进程、thread 线程、deadlock 死锁、semaphore 信号量",
          "virtual memory 虚拟内存、page 页、cache 高速缓存、interrupt 中断",
          "scheduling 调度、synchronization 同步、mutual exclusion 互斥",
          "file system 文件系统、directory 目录、permission 权限"
        ],
        "tip": "看到 mutual exclusion 就想到互斥信号量初值 1。"
      },
      {
        "t": "做题套路（不会也能蒙）",
        "b": [
          "先读题干找主语：是'程序员做'还是'程序做'",
          "看空格前后搭配：to ___ 后接动词原形，a ___ 后接名词单数",
          "四个选项有两个反义，答案常在其中一个",
          "整段讲某技术优点，空格大概率填 enable/improve/reduce"
        ],
        "tip": "5 分题不要恋战，2 分钟内做完，把时间留给计算题。"
      },
      {
        "t": "常见句式翻译",
        "b": [
          "is used to 被用来…；consists of 由…组成；refers to 指的是",
          "in order to 为了；such as 例如；rather than 而不是",
          "the number of …的数量（谓语用单数）；a number of 许多（谓语用复数）",
          "not only … but also 不仅…而且"
        ],
        "tip": "'rather than' 前后是对比关系，常考作者态度。"
      }
    ]
  },
  {
    "id": "office",
    "name": "办公软件与信息处理",
    "day": 5,
    "weight": 4,
    "priority": "low",
    "intro": "2-4 分白给分：Excel 函数、Word 操作、信息与数据概念。",
    "cards": [
      {
        "t": "Excel 必考函数",
        "b": [
          "SUM 求和、AVERAGE 平均、MAX/MIN、COUNT 数字个数、COUNTA 非空个数",
          "IF(条件, 真值, 假值)，可嵌套",
          "SUMIF(区域, 条件, 求和区域)、COUNTIF(区域, 条件)",
          "VLOOKUP(查找值, 区域, 列号, 0精确/1近似)",
          "RANK(数值, 区域, 0降序)"
        ],
        "tip": "COUNT 只数数字，COUNTA 数非空单元格——最爱考的区别。"
      },
      {
        "t": "Excel 引用与操作",
        "b": [
          "相对引用 A1、绝对引用 $A$1、混合引用 $A1 / A$1",
          "F4 切换引用方式；拖动公式时绝对引用不变",
          "排序、筛选、分类汇总、数据透视表",
          "图表：柱形比大小、折线看趋势、饼图看占比"
        ],
        "tip": "复制公式后结果不变 → 用了绝对引用 $。"
      },
      {
        "t": "Word 常用操作",
        "b": [
          "样式统一格式；大纲视图看结构；邮件合并批量生成",
          "页眉页脚、分节符（不同节可设不同页码）、目录自动生成",
          "查找替换支持通配符；批注与修订留痕",
          "打印前用打印预览；缩放不影响实际排版"
        ],
        "tip": "问'如何让前几页不显示页码'→ 插入分节符并断开链接。"
      },
      {
        "t": "信息与数据",
        "b": [
          "数据是原始记录，信息是加工后有意义的数据，知识是规律",
          "信息特征：客观性、时效性、共享性、可传递性、可加工性",
          "数据处理三阶段：收集→加工→输出",
          "大数据 4V：Volume 大量、Velocity 高速、Variety 多样、Value 价值"
        ],
        "tip": "'数据=信息'是错的，考试常在这里挖坑。"
      },
      {
        "t": "新技术名词",
        "b": [
          "云计算：IaaS 基础设施、PaaS 平台、SaaS 软件",
          "物联网：感知层、网络层、应用层",
          "区块链：去中心化、不可篡改、分布式账本",
          "人工智能：机器学习、深度学习、神经网络、NLP、计算机视觉"
        ],
        "tip": "SaaS 最贴近用户（如在线邮箱），IaaS 最底层（如云主机）。"
      },
      {
        "t": "多媒体文件格式速记",
        "b": [
          "图像：BMP 无损大、JPG 有损小、GIF 支持动图与透明、PNG 无损带透明",
          "音频：WAV 无损大、MP3 有损、MIDI 只存指令不存声音",
          "视频：AVI、MP4、RMVB、MOV；流媒体 RM/RMVB",
          "文档：DOC/DOCX、PDF 跨平台、TXT 纯文本"
        ],
        "tip": "MIDI 文件极小，因为记录的是'怎么弹'不是'声音本身'。"
      }
    ]
  }
]);
window.RK_DATA.questions = (window.RK_DATA.questions || []).concat([
  {
    "id": "nt-001",
    "m": "net",
    "q": "在 OSI 参考模型中，负责端到端可靠传输、进行流量控制的是（ ）。",
    "o": [
      "传输层",
      "网络层",
      "会话层",
      "数据链路层"
    ],
    "a": 0,
    "e": "传输层（TCP）负责端到端可靠传输与流量控制；网络层只负责寻址和路由，不保证可靠。",
    "tag": "OSI七层",
    "lv": 1
  },
  {
    "id": "nt-002",
    "m": "net",
    "q": "下列协议中，工作在应用层的是（ ）。",
    "o": [
      "ARP",
      "SMTP",
      "ICMP",
      "TCP"
    ],
    "a": 1,
    "e": "SMTP 是邮件发送协议，属应用层；ARP、ICMP 属网际层，TCP 属传输层。",
    "tag": "协议分层",
    "lv": 1
  },
  {
    "id": "nt-003",
    "m": "net",
    "q": "IP 地址 192.168.1.100 属于（ ）地址。",
    "o": [
      "A 类公网",
      "B 类公网",
      "C 类私有",
      "组播"
    ],
    "a": 2,
    "e": "192.168.0.0/16 是私有地址段，首字节 192 属 C 类，故为 C 类私有地址。",
    "tag": "IP分类",
    "lv": 1
  },
  {
    "id": "nt-004",
    "m": "net",
    "q": "某网络使用子网掩码 255.255.255.224，则每个子网可分配的主机地址数是（ ）。",
    "o": [
      "62",
      "32",
      "14",
      "30"
    ],
    "a": 3,
    "e": "224=11100000，主机位 5 位，2^5-2=30，要减去网络地址和广播地址。",
    "tag": "子网划分",
    "lv": 2
  },
  {
    "id": "nt-005",
    "m": "net",
    "q": "主机 A 要判断主机 B 是否可达，最合适的命令是（ ）。",
    "o": [
      "ping",
      "ipconfig",
      "netstat",
      "nslookup"
    ],
    "a": 0,
    "e": "ping 基于 ICMP 回显请求测试连通性；ipconfig 看本机配置，netstat 看连接，nslookup 查 DNS。",
    "tag": "网络命令",
    "lv": 1
  },
  {
    "id": "nt-006",
    "m": "net",
    "q": "HTTPS 默认使用的端口号是（ ）。",
    "o": [
      "21",
      "443",
      "80",
      "8080"
    ],
    "a": 1,
    "e": "HTTPS=HTTP+SSL/TLS，默认 443；80 是 HTTP，21 是 FTP 控制端口。",
    "tag": "端口号",
    "lv": 1
  },
  {
    "id": "nt-007",
    "m": "net",
    "q": "下列关于 UDP 的描述，正确的是（ ）。",
    "o": [
      "面向连接、可靠传输",
      "提供流量控制",
      "无连接、开销小、实时性好",
      "必须三次握手"
    ],
    "a": 2,
    "e": "UDP 无连接、不保证可靠、无流量控制，但开销小、延迟低，适合音视频与 DNS 查询。",
    "tag": "TCP/UDP",
    "lv": 1
  },
  {
    "id": "nt-008",
    "m": "net",
    "q": "能隔离广播域的设备是（ ）。",
    "o": [
      "集线器",
      "网桥",
      "交换机",
      "路由器"
    ],
    "a": 3,
    "e": "路由器按 IP 转发，不转发广播包，可隔离广播域；交换机只能隔离冲突域。",
    "tag": "网络设备",
    "lv": 2
  },
  {
    "id": "nt-009",
    "m": "net",
    "q": "将域名解析为 IP 地址的协议是（ ）。",
    "o": [
      "DNS",
      "DHCP",
      "ARP",
      "SNMP"
    ],
    "a": 0,
    "e": "DNS 做域名→IP 解析；DHCP 分配 IP，ARP 做 IP→MAC，SNMP 用于网络管理。",
    "tag": "DNS",
    "lv": 1
  },
  {
    "id": "nt-010",
    "m": "net",
    "q": "使用 RSA 算法进行数字签名时，签名者应使用（ ）。",
    "o": [
      "自己的公钥",
      "自己的私钥",
      "对方的公钥",
      "对方的私钥"
    ],
    "a": 1,
    "e": "签名用签名者私钥，验证用签名者公钥；加密才用对方公钥。",
    "tag": "数字签名",
    "lv": 2
  },
  {
    "id": "nt-011",
    "m": "net",
    "q": "下列属于对称加密算法的是（ ）。",
    "o": [
      "RSA",
      "ECC",
      "AES",
      "DSA"
    ],
    "a": 2,
    "e": "AES 是对称加密；RSA、ECC、DSA 都是非对称算法。",
    "tag": "加密算法",
    "lv": 1
  },
  {
    "id": "nt-012",
    "m": "net",
    "q": "IPv4 地址由（ ）位二进制数组成。",
    "o": [
      "16",
      "128",
      "48",
      "32"
    ],
    "a": 3,
    "e": "IPv4 为 32 位，IPv6 为 128 位，MAC 地址为 48 位。",
    "tag": "IP地址",
    "lv": 1
  },
  {
    "id": "nt-013",
    "m": "net",
    "q": "在 URL “http://www.test.com:8080/news/index.html” 中，主机名是（ ）。",
    "o": [
      "www.test.com",
      "http",
      "8080",
      "news/index.html"
    ],
    "a": 0,
    "e": "URL 结构为 协议://主机:端口/路径，// 与 : 之间即主机名。",
    "tag": "URL",
    "lv": 1
  },
  {
    "id": "nt-014",
    "m": "net",
    "q": "下列关于 IP 地址 127.0.0.1 的说法，正确的是（ ）。",
    "o": [
      "是 A 类公网地址",
      "是本机回环地址",
      "是广播地址",
      "是私有地址 10 段"
    ],
    "a": 1,
    "e": "127.0.0.1 是回环地址，用于本机测试，数据不出网卡。",
    "tag": "IP地址",
    "lv": 2
  },
  {
    "id": "nt-015",
    "m": "net",
    "q": "100Mbps 的网络，理论最大下载速度约为（ ）。",
    "o": [
      "100MB/s",
      "10MB/s",
      "12.5MB/s",
      "1.25MB/s"
    ],
    "a": 2,
    "e": "bps 是比特每秒，字节要除以 8：100/8=12.5MB/s。",
    "tag": "带宽换算",
    "lv": 2
  },
  {
    "id": "nt-016",
    "m": "net",
    "q": "以太网中用于唯一标识网卡的地址是（ ）。",
    "o": [
      "IP 地址",
      "域名",
      "端口号",
      "MAC 地址"
    ],
    "a": 3,
    "e": "MAC 地址 48 位，固化在网卡上；IP 是可变的逻辑地址。",
    "tag": "MAC",
    "lv": 1
  },
  {
    "id": "nt-017",
    "m": "net",
    "q": "下列拓扑结构中，可靠性最高的是（ ）。",
    "o": [
      "网状",
      "星型",
      "环型",
      "总线型"
    ],
    "a": 0,
    "e": "网状结构任意节点间有多条路径，单点故障不影响整体，但成本最高。",
    "tag": "拓扑结构",
    "lv": 1
  },
  {
    "id": "nt-018",
    "m": "net",
    "q": "防火墙的主要部署位置是（ ）。",
    "o": [
      "内网主机上",
      "内网与外网之间",
      "交换机内部",
      "数据库服务器上"
    ],
    "a": 1,
    "e": "防火墙部署在网络边界，控制进出流量；主机防护是杀毒软件/主机防火墙。",
    "tag": "防火墙",
    "lv": 1
  },
  {
    "id": "nt-019",
    "m": "net",
    "q": "某主机 IP 为 172.16.5.10/20，其子网掩码是（ ）。",
    "o": [
      "255.255.0.0",
      "255.255.255.0",
      "255.255.240.0",
      "255.255.248.0"
    ],
    "a": 2,
    "e": "/20 表示前 20 位为 1，第三字节高 4 位为 1：11110000=240，即 255.255.240.0。",
    "tag": "子网掩码",
    "lv": 2
  },
  {
    "id": "nt-020",
    "m": "net",
    "q": "ARP 协议的作用是（ ）。",
    "o": [
      "分配 IP 地址",
      "把 MAC 解析为 IP",
      "把域名解析为 IP",
      "把 IP 地址解析为 MAC 地址"
    ],
    "a": 3,
    "e": "ARP 由 IP 求 MAC；RARP 相反；DNS 解析域名；DHCP 分配 IP。",
    "tag": "ARP",
    "lv": 1
  },
  {
    "id": "nt-021",
    "m": "net",
    "q": "下列不属于计算机病毒特征的是（ ）。",
    "o": [
      "自愈性",
      "潜伏性",
      "可触发性",
      "传染性"
    ],
    "a": 0,
    "e": "病毒特征为传染性、隐蔽性、潜伏性、破坏性、可触发性，没有自愈性。",
    "tag": "计算机病毒",
    "lv": 1
  },
  {
    "id": "nt-022",
    "m": "net",
    "q": "HTTP 协议默认使用的端口是（ ）。",
    "o": [
      "25",
      "80",
      "53",
      "110"
    ],
    "a": 1,
    "e": "HTTP 默认 80，HTTPS 443；25 是 SMTP，53 是 DNS，110 是 POP3。",
    "tag": "端口号",
    "lv": 1
  },
  {
    "id": "nt-023",
    "m": "net",
    "q": "在 TCP/IP 模型中，ICMP 协议属于（ ）。",
    "o": [
      "应用层",
      "传输层",
      "网际层",
      "网络接口层"
    ],
    "a": 2,
    "e": "ICMP 与 IP 同层，属网际层，用于传递差错与控制报文（ping 就用它）。",
    "tag": "协议分层",
    "lv": 2
  },
  {
    "id": "nt-024",
    "m": "net",
    "q": "浏览器与 Web 服务器之间传输网页使用的协议是（ ）。",
    "o": [
      "FTP",
      "SMTP",
      "SNMP",
      "HTTP"
    ],
    "a": 3,
    "e": "HTTP 是超文本传输协议；FTP 传文件，SMTP 发邮件，SNMP 做网络管理。",
    "tag": "HTTP",
    "lv": 1
  },
  {
    "id": "nt-025",
    "m": "net",
    "q": "CIDR 地址块 192.168.1.0/26 中共有（ ）个可用主机地址。",
    "o": [
      "62",
      "64",
      "30",
      "126"
    ],
    "a": 0,
    "e": "主机位 32-26=6 位，2^6-2=62，需减去网络地址与广播地址。",
    "tag": "子网划分",
    "lv": 2
  },
  {
    "id": "nt-026",
    "m": "net",
    "q": "用于检测网络入侵但不主动阻断流量的设备是（ ）。",
    "o": [
      "防火墙",
      "IDS",
      "IPS",
      "VPN"
    ],
    "a": 1,
    "e": "IDS 只检测告警（被动），IPS 可主动阻断；防火墙做访问控制。",
    "tag": "安全设备",
    "lv": 2
  },
  {
    "id": "nt-027",
    "m": "net",
    "q": "HTML 中用于定义超链接的标签是（ ）。",
    "o": [
      "<img>",
      "<p>",
      "<a>",
      "<table>"
    ],
    "a": 2,
    "e": "<a href=\"...\"> 定义超链接；<img> 插图，<p> 段落，<table> 表格。",
    "tag": "HTML",
    "lv": 1
  },
  {
    "id": "nt-028",
    "m": "net",
    "q": "在 B/S 架构中，客户端需要安装的是（ ）。",
    "o": [
      "专用客户端软件",
      "应用服务器",
      "数据库",
      "浏览器"
    ],
    "a": 3,
    "e": "B/S（Browser/Server）只需浏览器；C/S 才需安装专用客户端。",
    "tag": "B/S架构",
    "lv": 1
  },
  {
    "id": "nt-029",
    "m": "net",
    "q": "下列地址中，属于私有 IP 地址的是（ ）。",
    "o": [
      "172.20.1.1",
      "8.8.8.8",
      "202.96.1.1",
      "224.0.0.1"
    ],
    "a": 0,
    "e": "私有段为 10/8、172.16-172.31、192.168/16；172.20.1.1 在第二段范围内。",
    "tag": "私有地址",
    "lv": 2
  },
  {
    "id": "nt-030",
    "m": "net",
    "q": "TCP 建立连接需要（ ）次握手。",
    "o": [
      "2",
      "3",
      "4",
      "1"
    ],
    "a": 1,
    "e": "TCP 三次握手建连接、四次挥手断连接，用于同步序号并确认双方收发能力。",
    "tag": "TCP",
    "lv": 1
  },
  {
    "id": "en-001",
    "m": "en",
    "q": "A ____ is a set of instructions that tells the computer what to do.",
    "o": [
      "package",
      "protocol",
      "program",
      "process"
    ],
    "a": 2,
    "e": "program 程序=一组指令；protocol 协议，package 包，process 进程。",
    "tag": "词汇",
    "lv": 1
  },
  {
    "id": "en-002",
    "m": "en",
    "q": "In software engineering, ____ refers to the degree to which the elements inside a module belong together.",
    "o": [
      "coupling",
      "abstraction",
      "inheritance",
      "cohesion"
    ],
    "a": 3,
    "e": "cohesion 内聚指模块内部元素的关联程度；coupling 是模块间的耦合。",
    "tag": "软件工程",
    "lv": 1
  },
  {
    "id": "en-003",
    "m": "en",
    "q": "The process of finding and fixing errors in a program is called ____.",
    "o": [
      "debugging",
      "compiling",
      "encoding",
      "deploying"
    ],
    "a": 0,
    "e": "debugging 调试=找错并修正；compiling 编译，encoding 编码，deploying 部署。",
    "tag": "词汇",
    "lv": 1
  },
  {
    "id": "en-004",
    "m": "en",
    "q": "A ____ translates a program written in a high-level language into machine code before execution.",
    "o": [
      "interpreter",
      "compiler",
      "linker",
      "loader"
    ],
    "a": 1,
    "e": "compiler 编译器先整体翻译再执行；interpreter 解释器逐句翻译执行。",
    "tag": "语言处理",
    "lv": 2
  },
  {
    "id": "en-005",
    "m": "en",
    "q": "____ is a temporary storage area that holds frequently used data for faster access.",
    "o": [
      "Disk",
      "Register",
      "Cache",
      "Buffer"
    ],
    "a": 2,
    "e": "Cache 高速缓存存放常用数据以加快访问；register 在 CPU 内更快但更小。",
    "tag": "存储",
    "lv": 1
  },
  {
    "id": "en-006",
    "m": "en",
    "q": "In an object-oriented language, ____ allows a subclass to provide a specific implementation of a method already defined in its superclass.",
    "o": [
      "overloading",
      "iteration",
      "encapsulation",
      "overriding"
    ],
    "a": 3,
    "e": "overriding 重写=子类重新实现父类同名同参方法；overloading 是同名不同参。",
    "tag": "面向对象",
    "lv": 2
  },
  {
    "id": "en-007",
    "m": "en",
    "q": "A ____ is a collection of related data organized for easy retrieval.",
    "o": [
      "database",
      "spreadsheet",
      "document",
      "directory"
    ],
    "a": 0,
    "e": "database 数据库=按一定结构组织、便于检索的相关数据集合。",
    "tag": "数据库",
    "lv": 1
  },
  {
    "id": "en-008",
    "m": "en",
    "q": "The ____ layer of the OSI model is responsible for routing packets between networks.",
    "o": [
      "transport",
      "network",
      "data link",
      "session"
    ],
    "a": 1,
    "e": "network layer 网络层负责分组路由与寻址（IP 层）。",
    "tag": "网络",
    "lv": 2
  },
  {
    "id": "en-009",
    "m": "en",
    "q": "____ testing checks the internal logic and structure of a program.",
    "o": [
      "Black-box",
      "Alpha",
      "White-box",
      "Beta"
    ],
    "a": 2,
    "e": "white-box 白盒测试看内部逻辑结构；black-box 只看输入输出。",
    "tag": "测试",
    "lv": 1
  },
  {
    "id": "en-010",
    "m": "en",
    "q": "A ____ occurs when two or more processes wait for each other to release resources.",
    "o": [
      "overflow",
      "interrupt",
      "exception",
      "deadlock"
    ],
    "a": 3,
    "e": "deadlock 死锁=进程互相等待对方释放资源，都无法推进。",
    "tag": "操作系统",
    "lv": 1
  },
  {
    "id": "en-011",
    "m": "en",
    "q": "Which of the following is NOT a characteristic of a good algorithm?",
    "o": [
      "Ambiguity",
      "Definiteness",
      "Effectiveness",
      "Finiteness"
    ],
    "a": 0,
    "e": "算法五特性：有穷性、确定性、可行性、输入、输出；Ambiguity（歧义）恰恰要避免。",
    "tag": "算法",
    "lv": 2
  },
  {
    "id": "en-012",
    "m": "en",
    "q": "____ is the process of converting plain text into unreadable form to protect it.",
    "o": [
      "Compression",
      "Encryption",
      "Translation",
      "Compilation"
    ],
    "a": 1,
    "e": "encryption 加密把明文变为密文；compression 是压缩。",
    "tag": "安全",
    "lv": 1
  },
  {
    "id": "of-001",
    "m": "office",
    "q": "在 Excel 中，要统计 A1:A10 区域中数字单元格的个数，应使用（ ）。",
    "o": [
      "COUNTA",
      "SUM",
      "COUNT",
      "COUNTBLANK"
    ],
    "a": 2,
    "e": "COUNT 只统计数字；COUNTA 统计非空单元格（含文本），二者最易混淆。",
    "tag": "Excel函数",
    "lv": 1
  },
  {
    "id": "of-002",
    "m": "office",
    "q": "Excel 中公式 =$A$1+B1 复制到 C3 单元格后，变为（ ）。",
    "o": [
      "=$A$1+B3",
      "=$A$3+B3",
      "=A1+B1",
      "=$A$1+D3"
    ],
    "a": 3,
    "e": "绝对引用 $A$1 不变；相对引用 B1 右移 2 列下移 2 行变为 D3。",
    "tag": "单元格引用",
    "lv": 2
  },
  {
    "id": "of-003",
    "m": "office",
    "q": "Excel 中若要按条件求和，应使用函数（ ）。",
    "o": [
      "SUMIF",
      "SUM",
      "COUNTIF",
      "IF"
    ],
    "a": 0,
    "e": "SUMIF(条件区域,条件,求和区域) 条件求和；COUNTIF 是条件计数。",
    "tag": "Excel函数",
    "lv": 1
  },
  {
    "id": "of-004",
    "m": "office",
    "q": "在 Word 中，要使文档不同部分使用不同的页码格式，应插入（ ）。",
    "o": [
      "分页符",
      "分节符",
      "换行符",
      "段落标记"
    ],
    "a": 1,
    "e": "分节符把文档分成独立节，每节可单独设置页码、页眉页脚。",
    "tag": "Word",
    "lv": 2
  },
  {
    "id": "of-005",
    "m": "office",
    "q": "下列关于数据与信息的说法，正确的是（ ）。",
    "o": [
      "数据就是信息",
      "信息是数据的载体",
      "信息是加工后有意义的数据",
      "数据不能表示信息"
    ],
    "a": 2,
    "e": "数据是原始记录，信息是经过加工、对决策有意义的数据。",
    "tag": "信息基础",
    "lv": 1
  },
  {
    "id": "of-006",
    "m": "office",
    "q": "云计算服务中，向用户提供软件应用服务的是（ ）。",
    "o": [
      "IaaS",
      "PaaS",
      "DaaS",
      "SaaS"
    ],
    "a": 3,
    "e": "SaaS 软件即服务（如在线邮箱）；PaaS 提供开发平台，IaaS 提供基础设施。",
    "tag": "云计算",
    "lv": 1
  },
  {
    "id": "of-007",
    "m": "office",
    "q": "下列图像文件格式中，支持动画且支持透明背景的是（ ）。",
    "o": [
      "GIF",
      "JPG",
      "BMP",
      "TIFF"
    ],
    "a": 0,
    "e": "GIF 支持多帧动画和 1 位透明；BMP 无损但体积大，JPG 有损不支持透明。",
    "tag": "图像格式",
    "lv": 1
  },
  {
    "id": "of-008",
    "m": "office",
    "q": "MIDI 文件体积远小于 WAV，主要原因是（ ）。",
    "o": [
      "采用了更高的压缩比",
      "记录的是演奏指令而非声音波形",
      "采样频率更低",
      "只支持单声道"
    ],
    "a": 1,
    "e": "MIDI 记录音色、音高、时值等指令，由合成器发声，不存波形数据。",
    "tag": "音频格式",
    "lv": 2
  },
  {
    "id": "of-009",
    "m": "office",
    "q": "大数据的“4V”特征不包括（ ）。",
    "o": [
      "Volume 大量",
      "Velocity 高速",
      "Visibility 可视",
      "Variety 多样"
    ],
    "a": 2,
    "e": "4V 为 Volume、Velocity、Variety、Value（价值），没有 Visibility。",
    "tag": "大数据",
    "lv": 1
  },
  {
    "id": "of-010",
    "m": "office",
    "q": "在 Excel 中，要求 A1:A10 中的最大值，应使用（ ）。",
    "o": [
      "SUM(A1:A10)",
      "MIN(A1:A10)",
      "LARGE(A1:A10,1) 以外都不行",
      "MAX(A1:A10)"
    ],
    "a": 3,
    "e": "MAX 返回区域最大值；MIN 是最小值，SUM 是求和。",
    "tag": "Excel函数",
    "lv": 1
  },
  {
    "id": "of-011",
    "m": "office",
    "q": "物联网体系结构通常不包括（ ）。",
    "o": [
      "编译层",
      "网络层",
      "应用层",
      "感知层"
    ],
    "a": 0,
    "e": "物联网分感知层、网络层、应用层三层，没有编译层。",
    "tag": "物联网",
    "lv": 1
  },
  {
    "id": "of-012",
    "m": "office",
    "q": "区块链的核心特征不包括（ ）。",
    "o": [
      "去中心化",
      "中心化清算",
      "分布式账本",
      "数据不可篡改"
    ],
    "a": 1,
    "e": "区块链强调去中心化、不可篡改、可追溯、分布式账本，与中心化清算相反。",
    "tag": "区块链",
    "lv": 1
  }
]);
