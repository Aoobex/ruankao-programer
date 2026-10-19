window.RK_DATA = window.RK_DATA || {};
window.RK_DATA.modules = (window.RK_DATA.modules || []).concat([
  {
    "id": "pmx",
    "name": "下午题例题精讲",
    "day": 5,
    "weight": 20,
    "priority": "high",
    "intro": "下午卷 4 道必答 + 1 道选答。这 6 道例题把最常见题型的解法拆开讲，看完就会套。",
    "cards": [
      {
        "t": "例题1 · 流程图：求数组最大值及其下标",
        "b": [
          "说明：输入 n 个数存入数组 a，输出最大值 max 及它的下标 pos",
          "第 1 空想初始化：max 应先等于第一个元素 a[0]，pos 先等于 0",
          "第 2 空想循环：i 从 1 开始（0 已经给 max 了），条件 i<n",
          "第 3 空想判断：a[i]>max 才更新（用 > 不用 >=，否则下标会取最后一个）",
          "第 4 空想更新：max=a[i] 和 pos=i 必须成对出现"
        ],
        "code": "输入 n\n输入 a[0..n-1]\nmax ← a[0] ;  pos ← 0 ;  i ← 1\n   ↓\n ┌─────── i < n ───────┐   否 → 输出 max, pos（结束）\n │ 是                   │\n │  a[i] > max ? ──否──┐│\n │    │是              ││\n │  max ← a[i]         ││\n │  pos ← i            ││\n │    ↓                ││\n └─ i ← i + 1 ←─────────┘│\n        ←─────────────────┘",
        "tip": "空在哪就问自己：这里是初始化、条件、还是更新？三类答案各有固定长相。"
      },
      {
        "t": "例题2 · C 程序填空：数组逆置",
        "b": [
          "思路：用两个下标 i 从头、j 从尾向中间靠，交换二者",
          "循环条件写 i<j（写成 i<=j 会多换一次，结果其实一样，但不规范）",
          "交换必须借助临时变量 t：t=a[i]; a[i]=a[j]; a[j]=t;",
          "别忘 i++ 和 j-- 同时进行，否则死循环"
        ],
        "code": "void reverse(int a[], int n){\n    int i = 0, j = n - 1, t;\n    while ( i < j ) {          /* (1) */\n        t = a[i];              /* (2) */\n        a[i] = a[j];\n        a[j] = t;              /* (3) */\n        i++;                   /* (4) */\n        j--;\n    }\n}",
        "tip": "答案：(1) i<j  (2) t=a[i]  (3) a[j]=t  (4) i++（j--）"
      },
      {
        "t": "例题3 · C 程序填空：尾插法建表并求和",
        "b": [
          "尾插法保序：新结点接在 tail 后面，然后 tail 移动到新结点",
          "head 为 NULL 表示空表，此时新结点就是头结点",
          "遍历求和用 p=p->next 推进，注意用 p!=NULL 判定",
          "malloc 后一定要给 data 和 next 都赋值，next 先置 NULL"
        ],
        "code": "struct Node { int data; struct Node *next; };\n\nint sumList(void){\n    struct Node *head = NULL, *tail = NULL, *p;\n    int x, s = 0;\n    scanf(\"%d\", &x);\n    while (x > 0) {\n        p = (struct Node *)malloc(sizeof(struct Node));\n        p->data = x;\n        p->next = NULL;                    /* (1) */\n        if (head == NULL) head = p;        /* (2) */\n        else tail->next = p;               /* (3) */\n        tail = p;                          /* (4) */\n        scanf(\"%d\", &x);\n    }\n    for (p = head; p != NULL; p = p->next)  /* (5) */\n        s += p->data;\n    return s;\n}",
        "tip": "链表题画三个方框就能推：head 不动、tail 一直指最后一个、p 做临时工。"
      },
      {
        "t": "例题4 · C 程序填空：递归求二叉树的深度",
        "b": [
          "递归三件套：终止条件（空树深度 0）、递归调用（左右子树）、合并结果",
          "合并用三目：左深 > 右深 ? 左深+1 : 右深+1",
          "一定要处理 NULL，否则解引用空指针崩溃",
          "递归本质是栈，深度多大就压多少层"
        ],
        "code": "typedef struct BiTNode {\n    int data;\n    struct BiTNode *lchild, *rchild;\n} BiTNode;\n\nint depth(BiTNode *t){\n    int l, r;\n    if (t == NULL) return 0;               /* (1) 终止条件 */\n    l = depth(t->lchild);                  /* (2) */\n    r = depth(t->rchild);                  /* (3) */\n    return (l > r ? l : r) + 1;            /* (4) */\n}",
        "tip": "看到递归空，答案几乎都是 NULL 判断、自身调用、结果合并这三样。"
      },
      {
        "t": "例题5 · 读程序写结果：指针与数组",
        "b": [
          "先列变量表：a[0..4]、p、*p 各一行",
          "p=a 表示 p 指向 a[0]，此后 p+1 就是 a[1]",
          "*(p+i) 等价 a[i]，两者可以互相翻译",
          "输出按题目格式写，多个 printf 连在一起不断行"
        ],
        "code": "int a[5] = {1, 2, 3, 4, 5}, *p = a, s = 0, i;\nfor (i = 0; i < 5; i += 2)\n    s += *(p + i);\nprintf(\"%d\", s);",
        "tip": "i=0,2,4 → a[0]+a[2]+a[4]=1+3+5=9。写结果题只要耐心展开，不要猜。"
      },
      {
        "t": "例题6 · Java 填空：继承与多态",
        "b": [
          "继承用 extends，实现接口用 implements，两者都不要写成 inherits",
          "子类构造方法第一行调用父类构造：super(参数)",
          "重写父类方法时加 @Override 注解（不影响运行，但考试爱考）",
          "父类引用指向子类对象，调用被重写的方法时执行子类版本"
        ],
        "code": "abstract class Shape {\n    protected String name;\n    Shape(String name){ this.name = name; }        /* (1) */\n    abstract double area();                        /* (2) 抽象方法 */\n}\n\nclass Circle extends Shape {                       /* (3) 继承 */\n    private double r;\n    Circle(double r){ super(\"圆形\"); this.r = r; }   /* (4) 调用父类构造 */\n    double area(){ return 3.14159 * r * r; }       /* (5) 重写 */\n}\n\npublic class Main {\n    public static void main(String[] args){\n        Shape s = new Circle(2.0);                 /* (6) 多态 */\n        System.out.println(s.area());\n    }\n}",
        "tip": "Java 题答案极短，基本就是 super / extends / implements / @Override 几个词。"
      }
    ]
  }
]);
window.RK_DATA.questions = (window.RK_DATA.questions || []).concat([]);
