window.RK_DATA = window.RK_DATA || {};
window.RK_DATA.modules = (window.RK_DATA.modules || []).concat([
  {
    "id": "java",
    "name": "Java 速成（下午选答）",
    "day": 5,
    "weight": 15,
    "priority": "mid",
    "intro": "下午第 5/6 题二选一。零基础选 Java：语法死板、填空有套路、不考指针。",
    "cards": [
      {
        "t": "最小可运行程序",
        "b": [
          "public class Main{ public static void main(String[] args){ … } }",
          "类名必须与文件名一致；每条语句以分号结尾",
          "输出 System.out.println(内容); 换行；print 不换行",
          "Java 区分大小写，String 首字母大写"
        ],
        "tip": "main 的签名一个字都不能错：public static void main(String[] args)。"
      },
      {
        "t": "基本类型与字符串",
        "b": [
          "int 4 字节、long 8、double 8、float 4、char 2、boolean 1位",
          "String 是类不是基本类型，用双引号，比较内容用 equals",
          "s.length() 求长度、s.charAt(i) 取字符、s.substring(a,b) 左闭右开",
          "字符串拼接用 +，与数字相加会自动转字符串"
        ],
        "tip": "== 比地址，equals 比内容。字符串比较永远用 equals。"
      },
      {
        "t": "数组",
        "b": [
          "int[] a = new int[5]; 默认值 0",
          "int[] a = {1,2,3}; 长度 a.length（没有括号）",
          "下标 0~length-1，越界抛 ArrayIndexOutOfBoundsException",
          "二维 int[][] m = new int[3][4]; m.length 是行数"
        ],
        "tip": "Java 的 length 是属性不是方法：a.length，不加 ()。"
      },
      {
        "t": "类、对象、构造方法",
        "b": [
          "class Student{ String name; int age; }",
          "创建对象 Student s = new Student();",
          "构造方法名与类名相同、无返回类型，可重载",
          "this.name = name; 区分成员变量与形参",
          "private 成员只能本类访问，用 get/set 暴露"
        ],
        "tip": "看到 this.x = x 就知道是构造方法或 setter，这是填空高频。"
      },
      {
        "t": "继承与多态",
        "b": [
          "class Dog extends Animal 表示继承，Java 单继承",
          "子类构造方法第一行默认调用 super()，可显式传参",
          "重写（override）：子类方法名、参数、返回类型与父类相同",
          "父类引用指向子类对象：Animal a = new Dog(); 调用的是子类重写方法",
          "抽象方法 abstract void f(); 所在类必须是 abstract class"
        ],
        "tip": "多态一句话：编译看左边，运行看右边。"
      },
      {
        "t": "接口与实现",
        "b": [
          "interface Shape{ double area(); } 方法默认 public abstract",
          "class Circle implements Shape{ … } 必须实现全部方法",
          "接口可多实现（implements A,B），弥补单继承",
          "接口里的变量默认 public static final（常量）"
        ],
        "tip": "extends 用于类继承类、接口继承接口；implements 用于类实现接口。"
      },
      {
        "t": "异常处理",
        "b": [
          "try{ 可能出错的代码 } catch(Exception e){ 处理 } finally{ 一定执行 }",
          "throws 声明可能抛出的异常，throw 主动抛出",
          "NullPointerException 空指针、ArithmeticException 除零",
          "数组越界、类型转换失败都抛运行时异常"
        ],
        "tip": "finally 无论是否异常都会执行，常用于关闭资源。"
      },
      {
        "t": "集合（会读就行）",
        "b": [
          "ArrayList<E> 可变长数组：add、get(i)、size()、remove",
          "HashMap<K,V>：put、get、containsKey、keySet",
          "遍历 for(E e : list) 是增强 for 循环",
          "泛型 <> 里只能写引用类型，如 ArrayList<Integer>"
        ],
        "tip": "下午题很少考集合细节，认识 add/get/size 足够读懂代码。"
      }
    ]
  }
]);
window.RK_DATA.questions = (window.RK_DATA.questions || []).concat([
  {
    "id": "jv-001",
    "m": "java",
    "q": "Java 程序的主方法是（ ）。",
    "o": [
      "public static void main(String[] args)",
      "public void main(String[] args)",
      "static main(String args)",
      "public static main()"
    ],
    "a": 0,
    "e": "入口方法必须是 public static void main(String[] args)，缺一不可。",
    "tag": "程序结构",
    "lv": 1
  },
  {
    "id": "jv-002",
    "m": "java",
    "q": "比较两个字符串内容是否相同，应使用（ ）。",
    "o": [
      "==",
      "equals()",
      "compare()",
      "="
    ],
    "a": 1,
    "e": "== 比较引用地址，equals 比较内容；Java 字符串比较必须用 equals。",
    "tag": "String",
    "lv": 1
  },
  {
    "id": "jv-003",
    "m": "java",
    "q": "若有 int[] a=new int[5]; 则 a.length 的值是（ ）。",
    "o": [
      "4",
      "6",
      "5",
      "编译错误"
    ],
    "a": 2,
    "e": "new int[5] 创建长度 5 的数组，下标 0~4，length 为 5。",
    "tag": "数组",
    "lv": 1
  },
  {
    "id": "jv-004",
    "m": "java",
    "q": "Java 中实现继承的关键字是（ ）。",
    "o": [
      "implements",
      "super",
      "inherits",
      "extends"
    ],
    "a": 3,
    "e": "类继承类用 extends；实现接口用 implements；super 调用父类成员。",
    "tag": "继承",
    "lv": 1
  },
  {
    "id": "jv-005",
    "m": "java",
    "q": "下列属于 Java 合法标识符的是（ ）。",
    "o": [
      "_count",
      "my-name",
      "2name",
      "class"
    ],
    "a": 0,
    "e": "标识符不能以数字开头、不能含减号、不能是关键字；_count 合法。",
    "tag": "标识符",
    "lv": 1
  },
  {
    "id": "jv-006",
    "m": "java",
    "q": "接口中的方法默认的访问修饰符是（ ）。",
    "o": [
      "private",
      "public abstract",
      "protected",
      "default"
    ],
    "a": 1,
    "e": "接口方法默认 public abstract（Java 8 起可有 default 方法，但默认修饰仍是 public）。",
    "tag": "接口",
    "lv": 2
  },
  {
    "id": "jv-007",
    "m": "java",
    "q": "下列关于构造方法的说法，正确的是（ ）。",
    "o": [
      "有返回值类型",
      "不能被重载",
      "方法名与类名相同",
      "必须用 void 声明"
    ],
    "a": 2,
    "e": "构造方法名与类名相同、无返回类型（连 void 都不写），可以重载。",
    "tag": "构造方法",
    "lv": 1
  },
  {
    "id": "jv-008",
    "m": "java",
    "q": "执行 String s=\"abc\"; 后 s.length() 的值是（ ）。",
    "o": [
      "2",
      "编译错误",
      "4",
      "3"
    ],
    "a": 3,
    "e": "length() 返回字符个数，abc 为 3；注意 String 用 length()，数组用 length。",
    "tag": "String",
    "lv": 1
  },
  {
    "id": "jv-009",
    "m": "java",
    "q": "Java 中用于捕获异常的关键字组合是（ ）。",
    "o": [
      "try…catch",
      "if…else",
      "do…while",
      "switch…case"
    ],
    "a": 0,
    "e": "try 包裹可能出错的代码，catch 捕获并处理异常，finally 收尾。",
    "tag": "异常",
    "lv": 1
  },
  {
    "id": "jv-010",
    "m": "java",
    "q": "若有 Animal a = new Dog(); 且 Dog 重写了 speak()，则 a.speak() 调用的是（ ）。",
    "o": [
      "Animal 的 speak",
      "Dog 的 speak",
      "编译错误",
      "随机一个"
    ],
    "a": 1,
    "e": "多态：编译看引用类型，运行看实际对象类型，故调用 Dog 重写后的方法。",
    "tag": "多态",
    "lv": 2
  },
  {
    "id": "jv-011",
    "m": "java",
    "q": "下列代码输出（ ）。\nint s=0;\nfor(int i=1;i<=4;i++) s+=i;\nSystem.out.println(s);",
    "o": [
      "4",
      "6",
      "10",
      "24"
    ],
    "a": 2,
    "e": "1+2+3+4=10。",
    "tag": "循环",
    "lv": 1
  },
  {
    "id": "jv-012",
    "m": "java",
    "q": "Java 中 int 类型占用的字节数是（ ）。",
    "o": [
      "1",
      "2",
      "8",
      "4"
    ],
    "a": 3,
    "e": "Java 基本类型长度固定：int 4 字节、long 8、short 2、byte 1。",
    "tag": "数据类型",
    "lv": 1
  },
  {
    "id": "jv-013",
    "m": "java",
    "q": "下列关于抽象类的说法，正确的是（ ）。",
    "o": [
      "含抽象方法的类必须声明为 abstract",
      "可以直接实例化",
      "不能有构造方法",
      "只能有一个子类"
    ],
    "a": 0,
    "e": "含抽象方法的类必须声明 abstract，不能直接 new，但可以有构造方法供子类调用。",
    "tag": "抽象类",
    "lv": 2
  },
  {
    "id": "jv-014",
    "m": "java",
    "q": "若有 int[] a={3,1,2}; 执行 Arrays.sort(a) 后 a[0] 的值是（ ）。",
    "o": [
      "3",
      "1",
      "2",
      "0"
    ],
    "a": 1,
    "e": "Arrays.sort 升序排序，结果 {1,2,3}，a[0]=1。",
    "tag": "数组排序",
    "lv": 1
  },
  {
    "id": "jv-015",
    "m": "java",
    "q": "下列代码输出（ ）。\nString s=\"12\";\nint x=3;\nSystem.out.println(s+x);",
    "o": [
      "15",
      "12+3",
      "123",
      "编译错误"
    ],
    "a": 2,
    "e": "字符串与数字用 + 拼接时，数字自动转字符串，结果为 \"123\"。",
    "tag": "字符串拼接",
    "lv": 2
  },
  {
    "id": "jv-016",
    "m": "java",
    "q": "Java 中包的关键字是（ ）。",
    "o": [
      "import",
      "namespace",
      "using",
      "package"
    ],
    "a": 3,
    "e": "package 声明当前类所在包；import 引入其他包中的类。",
    "tag": "包",
    "lv": 1
  }
]);
