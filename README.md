## Правила и регламент

- [Экзамен: правила, рекомендации и порядок проведения](https://hexly.notion.site/d9289c18871c44508bc7c7f05a51d94f)

## Задание

Ваша задача написать валидатор, в котором есть ряд методов и свойств и экспортировать его из файла *src/index.js*. Валидатор позволяет проверять аргументы на соответствие необходимым условиям, которые были заданы с помощью методов валидатора.

Пример использования:

```javascript
// создаем экземпляр валидатора
const v = new Validator();
// определяем метод для валидации строк и связываем его с валидатором, обращаясь к нему через переменную.
const schema = v.string();

// проверяем данные на соответствие строковому типу, с помощью метода isValid()
schema.isValid('Hexlet'); // true
schema.isValid(''); // true
schema.isValid(null); // false
schema.isValid(123); // false
```

### Примечания

Вы можете самостоятельно протестировать работу валидатора. В каталоге *src* разрешено использовать любые файлы и создавать новые, если это делает вашу разработку более удобной.

Для тестирования валидатора, достаточно создать экземпляр валидатора, настроить валидацию с помощью методов и вызвать метод `validate()` с необходимым аргументом, после чего написать в терминале:

```bash
node src/index.js
```

## 1 задача

Вам необходимо создать валидатор, который способен принимать аргумент и проводить его проверку на соответствие определенным условиям. В данной задаче мы ограничиваемся валидацией строк. Для этого в вашем валидаторе должен быть метод `string()`, который создает экземпляр валидатора чисел. Этот экземпляр обладает методом `isValid()`, который принимает данные на вход и возвращает значение true или false в зависимости от того, являются ли входные данные строкой.

```javascript
const v = new Validator();
const schema = v.string();

schema.isValid(null); // false
schema.isValid(''); // true
schema.isValid(true); // false
schema.isValid('123'); // true
schema.isValid(0); // false
```

## 2 задача

Вам необходимо расширить функциональность валидатора строк, добавив метод `hasSpaces()`. Этот метод возвращает значение true, в том случае, если на вход нам пришла строка, которая содержит хотя бы один пробел. Иначе возвращается false.

```javascript
const v = new Validator();

const schema = v.string().hasSpaces();
schema1.isValid([]); // false;
schema1.isValid(' '); // true;
schema1.isValid('Hexlet'); // false;
```

## 3 задача

Вам необходимо добавить валидатор функций, с помощью метода `function()`. Этот валидатор с помощью метода `isValid()` проверяет входящие данные на соответствие тому, что они являются функцией. Также в данный валидатор нужно добавить метод `callWith()`, который позволит вызывать функцию в переданном контексте. И метод  `expect()`, который позволяет проверить, что наша функция вернула нам заданное значение.

```javascript
const v = new Validator();
const schema1 = v.function(); 

schema1.isValid(()=>{}); // true;
schema1.isValid({}); // false;
schema1.isValid(console.log); // true;

const schema2 = v.function().expect('1'); 
schema1.isValid(()=>'1'); // true;
schema1.isValid(()=>1); // false;
schema1.isValid(1); // false;

const schema3 = v.function().callWith({prop: 1}).expect('1'); 
schema1.isValid(()=>'1'); // true;
schema1.isValid(()=>1); // false;
schema1.isValid(function () { return this.prop }); // true;
```

## 4 задача

Вам необходимо расширить экземпляр валидатора функций, с помощью метода `arguments()`, который принимает неограниченное количество аргументов, с которыми вызывает функцию.

```javascript
const v = new Validator();
const schema = v.function().arguments(1, 2, 3, 4, 5, 6, 7).expect(1); 

schema.isValid((args) => Math.min(...args)); // true;
schema.isValid(() =>1 ); // true;
schema.isValid(function () { return this.prop }); // false;
```

## 5 задача

Вам необходимо создать валидатор полей объекта, используя методы, представленные в предыдущих задачах. Для этого необходимо создать метод `object()`, который проверяет не сам объект, а данные внутри него на соответствием заданным валидаторам. Метод `Validator.object()` должен содержать метод `shape()`, позволяющий задать поля, подлежащие валидации, для объекта. Метод `shape()` принимает объект, в котором ключи представляют поля, которые требуется проверить, а значения - экземпляры валидаторов. Валидация должна работать с объектами любой вложенности.

```javascript
const v = new Validator();

const schema = v.object().shape({
  string: v.string(),
  obj: {
    func: v.function(),
    innerObj: {
      string: v.string().hasSpaces(),
      deepestObj: {
        func: v.function().arguments('hello').expect('hell'),
      }
    }
  }
});

schema.isValid({ 
  string: '54', 
    obj: { 
      func: ()=>{}, 
      innerObj: { string: 'he he he', 
        deepestObj: { 
          func: (arg) => arg.slice(0, arg.length-2)
        }
      }
    }
}); // true
