# learn-ts

[了不起的 TypeScript 入门教程](https://juejin.im/post/5edd8ad8f265da76fc45362c 'ts入门')

# 一、安装
## 1.安装 TypeScript
```
$ npm install -g typescript
```
## 2.编译 TypeScript 文件
```
$ tsc helloworld.ts
# helloworld.ts => helloworld.js
```

# 二、TypeScript 基础类型
类型|值
--|--
Boolean|boolean
Number|number
String|string
Array|[], Array<number>, string[]
Enum 枚举|数字枚举, 字符串枚举, 异构枚举
Any|any 任何类型
Unknown|unknown
Tuple 元组|类型数组
Void|无任何类型，常用于函数无返回值
Null|null
Undefined|undefined
Never|永不存在的值

# 三、TypeScript 断言
## 3.1 尖括号 语法
```
let a: any = 'haha this is a string'
let len: number = (<string>a).length
```

## 3.2 as 语法
```
len = (a as string).length
```

# 四、类型守卫
## 4.1 in 关键字
```
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Admin | Employee

function printEmployeeInfo(emp: UnknownEmployee) { 
  console.log("Name: " + emp.name)
  if ("privileges" in emp) { 
    console.log("privileges: " + emp.privileges)
  }
  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate)
  }
}

printEmployeeInfo({ name: '123', privileges: ['1']})
```

## 4.2 typeof 关键字
```
function padLeft(value: string, padding: string | number) { 
  if (typeof padding === 'number') {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === 'string') { 
    return padding + value;
  }
  throw new Error(`Expected string or numberm, got ${padding}.`)
}

注：typeof 类型保护只支持两种形式：typeof v === "typename" 和 typeof v !== typename，"typename" 必须是 "number"， "string"， "boolean" 或 "symbol"。 但是 TypeScript 并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护
```

## 4.3 instanceof 关键字

## 4.4 自定义类型保护的类型谓词

```
function isNumber(x: any): x is number { 
  return typeof x === 'number';
}

function isString(x: any): x is string { 
  return typeof x === 'string';
}
```

# 五、联合类型和类型别名

## 5.1 联合类型

```
const sayHello = (name: string | undefined) => {
    
}
```

## 5.2 可辨识联合

1. 可辨识
```
enum CarTransmission {
  Automatic = 200,
  Manual = 300
}

interface Motorcycle {
  vType: "motorcycle"; // 可资辨别的因素
  make: number; // year
}

interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission
}

interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}
```

2. 联合类型
```
type Vehicle = Motorcycle | Car | Truck;
```

3. 类型守卫

```
function evaluatePrice(vehicle: Vehicle) {
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
```

## 5.3 类型别名

```
type Message = string | string[]
let grreet = (message: Message) => { 
    // ***
}
```

# 六、交叉类型
将多个类型合并为一个类型。通过 & 符连接

```
interface IPerson {
  id: string;
  age: number;
}

interface IWorker {
  companyId: string;
}

type IStaff = IPerson & IWorker

const staff: IStaff = {
  id: 'E1000',
  age: 28,
  companyId: 'Sohu'
}
```

# 七、TypeScript 函数

## 7.1 TypeScript和JavaScript函数的区别

TypeScript|JavaScript
--|--
含有类型|无类型
箭头函数|箭头函数(ES2015)
函数类型|无函数类型
必填和可选参数|参数都是可选
默认参数|默认参数
剩余参数|剩余参数
函数重载|无函数重载

## 7.2 箭头函数

1. 常见语法
```
Array.forEach(item => console.log(item))
```

2. 使用示例
```
未使用箭头函数
function Book () {
  let self = this
  self.date = 2016
  setTimeout(function() {
    console.log(self)
    console.log(self.date)
  }, 1000)
}

使用箭头函数
function Book () {
  this.date = 2016
  setTimeout(() => {
    console.log(this)
    console.log(this.date)
  }, 1000)
}
```

## 7.3 参数类型和返回类型
```
function createUserId(name: string, id: number): string {
  return name + id
}
```

## 7.4 函数类型
```
let IdGenerator: (chars: string, nums: number) => string

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId
```

## 7.5 可选参数和默认参数
```
// 可选参数要放在普通参数的后面
function test(name: string = 'haha', id: number, age?: number): string {
  return name + id + (age || '')
}
```

## 7.6 剩余参数
```
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3)
```
## 7.7 函数重载

# 八、TypeScript数组
## 8.1 数组解构
```
let x: number;
let y: number;
let z: number;
[x,y,z] = [0,1,2,3]
```

## 8.2 数组展开运算符
```
let two_arr: {}[] = ['1', 2, { a: '1', b: false }]
let arr = [...two_arr, 3, 4, 5]
```

## 数组遍历
```
let colors: string[] = ['red', 'green', 'blue']
for (let i of colors) {
  console.log(i)
}
```

# 九、TypeScript对象
## 9.1 对象解构
```
let person = {
  name: 'haha',
  gender: 'Male'
}
let { name, gender } = person

// Map
type tPerson = {
  test: string;
  gender: string;
}

let person: tPerson = {
  test: 'haha',
  gender: 'Male'
}
let { test, gender } = person

let a: Map<tPerson | number | string, number> = new Map([
  [person, 1]
])

a.set({ test: '1', gender: '1' }, 1)
a.set(1, 1)
```

## 9.2 对象展开运算符

# 十、TypeScript接口

++ 在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类去实现。
TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。 ++

## 10.1 对象的形状
```
interface iPerson {
  name: string;
  age: number;
}

let haha: iPerson = {
  name: 'test',
  age: 22
}
```
## 10.2 可选 | 只读属性
```
interface iPerson {
  readonly country: string;
  name: string;
  age?: number;
}
```

++ 只读属性用于限制只能在对象刚刚创建的时候修改其值。此外 TypeScript 还提供了 ReadonlyArray<T> 类型，它与 Array<T> 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改 ++
```
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error
ro.push(1) // error
a = ro // error
```

# 十一、TypeScript类

## 11.1 类的属性与方法
```
class Greeter {
  // 静态属性
  static cnm: string = 'Greeter';
  // 成员属性
  greeting: string;

  // 构造函数
  constructor(message: string) { 
    this.greeting = message;
  }

  // 静态方法
  static getCNM() {
    return 'CNM is ' + this.cnm;
  }

  // 成员方法
  greet() { 
    return 'Hello, ' + this.greeting; 
  }
}

let greeter = new Greeter('world');

// 编译后
"use strict";
var Greeter = /** @class */ (function () {
    // 构造函数 - 执行初始化操作
    function Greeter(message) {
        this.greeting = message;
    }
    // 静态方法
    Greeter.getClassName = function () {
        return "Class name is Greeter";
    };
    // 成员方法
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    // 静态属性
    Greeter.cname = "Greeter";
    return Greeter;
}());
var greeter = new Greeter("world");
```

***js成员属性与静态属性，成员方法与静态方法有什么区别***

## 11.2 访问器

在 TypeScript 中，我们可以通过 getter 和 setter 方法来实现数据的封装和有效性校验，防止出现异常数据。

```
let passcode = "Hello TypeScript";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "Hello TypeScript") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Semlinker";
if (employee._fullName) {
  console.log(employee._fullName);
}
```
## 11.3 类的继承
```
在 ts中，使用extends来实现继承

class Animal {
  name: string;

  constructor(name: string) { 
    this.name = name
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters} m.`)
  }
}

class Snake extends Animal { 
  constructor(name: string) { 
    super(name);
  }

  move(distanceInMeters = 5) { 
    console.log('Slithering ...');
    super.move(distanceInMeters)
  }
}

let sam = new Snake('Sammy the Python')

sam.move()
```

## 11.4 ECMAScript 私有字段
* 私有字段以 # 字符开头，有时我们称之为私有名称；
* 每个私有字段名称都唯一地限定于其包含的类；
* 不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
* 私有字段不能在包含的类之外访问，甚至不能被检测到。
