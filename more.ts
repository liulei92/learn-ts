// 类型别名和类型断言


// type aliases 类型别名
type PlusType = (x: number, y: number) => number
function sum(x: number, y: number): number {
  return x + y
}

const sum2: (x: number, y: number) => number = sum
const sum3: PlusType = sum

// 联合类型 |
type NameResolver = () => string
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver): string {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// 交叉类型 &



// type assertion 类型断言，只是告知 代码可以执行，但并不是改变原值的类型，此外 不可以断言为联合类型之外的类型
// 断言 可以是 <>语法 也可是 as语法
function getLenth(input: string | number): number {
  // input.length

  // const str = input as String
  // if (str.length) {
  //   return str.length
  // } else {
  //   const number = input as Number
  //   return number.toString().length
  // }

  // 同上
  //   if ((<string>input).length) {
  //     return (<string>input).length
  //   } else {
  //     return input.toString().length
  //   }
  //   同上
  if ((input as string).length) {
    return (<string>input).length
  } else {
    return input.toString().length
  }
}

// 高级用法
// Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

interface Todo {
  title: string;
  description: string;
}


function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

let kiki: Partial<Todo>= {
    title: '1',
    description: '2'
}

// jQuery
